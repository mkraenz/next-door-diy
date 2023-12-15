import { Analytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import { Functions, getFunctions } from 'firebase/functions';
import { FC, PropsWithChildren, createContext, useMemo } from 'react';

type FirebaseState = {
  auth: Auth;
  db: Database;
  functions: Functions;
};

const defaultFirebaseState: FirebaseState = {
  auth: {} as Auth,
  db: {} as Database,
  functions: {} as Functions,
};

export const FirebaseContext =
  createContext<FirebaseState>(defaultFirebaseState);

export const FirebaseProvider: FC<
  PropsWithChildren<{ app: FirebaseApp; analytics: Analytics }>
> = ({ children, app }) => {
  const { auth, db, functions } = useMemo(
    () => ({
      // TODO should this be done on top level instead? Check by writing an actual test
      auth: getAuth(app),
      db: getDatabase(app),
      functions: getFunctions(app, 'europe-west1'),
    }),
    [app]
  );

  return (
    <FirebaseContext.Provider value={{ auth, db, functions }}>
      {children}
    </FirebaseContext.Provider>
  );
};
