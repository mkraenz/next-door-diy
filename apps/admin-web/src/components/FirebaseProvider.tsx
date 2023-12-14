import { Analytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import { FC, PropsWithChildren, createContext, useMemo } from 'react';

type FirebaseState = {
  auth: Auth;
  db: Database;
};

const defaultFirebaseState: FirebaseState = {
  auth: {} as Auth,
  db: {} as Database,
};

export const FirebaseContext =
  createContext<FirebaseState>(defaultFirebaseState);

export const FirebaseProvider: FC<
  PropsWithChildren<{ app: FirebaseApp; analytics: Analytics }>
> = ({ children, app }) => {
  const { auth, db } = useMemo(
    () => ({ auth: getAuth(app), db: getDatabase(app) }),
    [app]
  );

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};
