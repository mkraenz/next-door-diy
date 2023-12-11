import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

type FirebaseState = {
  auth: Auth;
};

const defaultFirebaseState: FirebaseState = {
  auth: {} as Auth,
};

const FirebaseContext = createContext<FirebaseState>(defaultFirebaseState);

export const useTheme = () => useContext(FirebaseContext);

export const FirebaseProvider: FC<
  PropsWithChildren<{ app: FirebaseApp; analytics: Analytics }>
> = ({ children, app }) => {
  const { auth } = useMemo(() => ({ auth: getAuth(app) }), [app]);

  return (
    <FirebaseContext.Provider value={{ auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
