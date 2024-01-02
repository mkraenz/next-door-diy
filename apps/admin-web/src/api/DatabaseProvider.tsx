import {
  Database,
  get,
  limitToLast,
  push,
  query,
  ref,
  set,
} from 'firebase/database';
import { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';
import { useFirebase } from '../hooks/firebase';
import { User } from './database.types';

type DatabaseState = {
  createUser: (user: WithoutAutogenProps<User>) => Promise<User>;
  listUsers: () => Promise<User[]>;
  deleteUser: (id: string) => Promise<void>;
  error: null | Error;
  loading: boolean;
};

const throwMissingProviderError = () => {
  throw new Error('You need to wrap your component in a DatabaseProvider');
};
const defaultDatabaseState: DatabaseState = {
  createUser: throwMissingProviderError,
  listUsers: throwMissingProviderError,
  deleteUser: throwMissingProviderError,
  error: null,
  loading: false,
};

export const DatabaseContext =
  createContext<DatabaseState>(defaultDatabaseState);

type WithoutAutogenProps<T> = Omit<T, 'id' | 'createdAt'>;

const userRoot = '/users/';

type Deps = {
  db: Database;
  setLoading: (val: boolean) => void;
  setError: (error: Error | null) => void;
};
const injectDeps =
  (deps: Deps) =>
  <U extends unknown[]>(fn: (deps: Deps) => (...args: U) => Promise<unknown>) =>
  async (...args: U) => {
    deps.setLoading(true);
    try {
      return await fn(deps)(...args);
    } catch (error) {
      if (error instanceof Error) deps.setError(error);
      else
        deps.setError(
          new Error(typeof error === 'string' ? error : JSON.stringify(error))
        );
    } finally {
      deps.setLoading(false);
    }
  };

const createUser_ =
  ({ db }: Pick<Deps, 'db'>) =>
  async (user: WithoutAutogenProps<User>) => {
    const child = push(ref(db, userRoot));
    if (!child.key)
      throw new Error(
        'child.key is nil. Please make sure you create a proper id'
      );
    const userForSaving = {
      ...user,
      id: child.key,
      createdAt: new Date().toISOString(),
    };
    await set(child, userForSaving);
    return userForSaving;
  };

const listUsers_ =
  ({ db }: Pick<Deps, 'db'>) =>
  // TODO offset
  async ({ limit } = { limit: 10 }) => {
    const q = query(ref(db, userRoot), limitToLast(limit));
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const val = snapshot.val() as { [key: string]: User };
      const users = Object.values(val).filter((user) => user?.id !== undefined);
      return users;
    }
    return [] as User[];
  };

const deleteUser_ =
  ({ db }: Pick<Deps, 'db'>) =>
  async (id: string) => {
    await set(ref(db, `${userRoot}${id}`), null);
  };

const DatabaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const { db } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const { createUser, listUsers, deleteUser } = useMemo(() => {
    const deps = { db, setLoading, setError };
    return {
      listUsers: injectDeps(deps)(listUsers_),
      createUser: injectDeps(deps)(createUser_),
      deleteUser: injectDeps(deps)(deleteUser_),
    };
  }, [db, setLoading]);
  return (
    <DatabaseContext.Provider
      // @ts-expect-error TODO #4
      value={{ createUser, listUsers, deleteUser, error, loading }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
