import { Database, get, push, ref, set } from 'firebase/database';
import { FC, PropsWithChildren, createContext, useMemo } from 'react';
import { useFirebase } from '../hooks/firebase';
import { User } from './database.types';

type DatabaseState = {
  createUser: (user: WithoutAutogenProps<User>) => Promise<User>;
  listUsers: () => Promise<User[]>;
};

const defaultDatabaseState: DatabaseState = {
  createUser: () =>
    console.warn('defaultDatabaseState') as unknown as Promise<User>,
  listUsers: () =>
    console.warn('defaultDatabaseState') as unknown as Promise<User[]>,
};

export const DatabaseContext =
  createContext<DatabaseState>(defaultDatabaseState);

type WithoutAutogenProps<T> = Omit<T, 'id' | 'createdAt'>;

const userRoot = '/users/';

const createUser_ =
  (db: Database) => async (user: WithoutAutogenProps<User>) => {
    const child = push(ref(db, userRoot));
    const userForSaving = {
      ...user,
      id: child.key ?? '',
      createdAt: new Date().toISOString(),
    };
    await set(child, userForSaving);
    return userForSaving;
  };

const listUsers_ = (db: Database) => async () => {
  const snapshot = await get(ref(db, userRoot));
  if (snapshot.exists()) {
    return Object.values(snapshot.val() as { [key: string]: User });
  }
  return [] as User[];
};

const DatabaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const { db } = useFirebase();
  const { createUser, listUsers } = useMemo(() => {
    return {
      listUsers: listUsers_(db),
      createUser: createUser_(db),
    };
  }, [db]);
  return (
    <DatabaseContext.Provider value={{ createUser, listUsers }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
