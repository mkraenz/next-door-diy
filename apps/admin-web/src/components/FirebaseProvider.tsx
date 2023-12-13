import { Analytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { FC, PropsWithChildren, createContext, useMemo } from 'react';

type FirebaseState = {
    auth: Auth;
};

const defaultFirebaseState: FirebaseState = {
    auth: {} as Auth,
};

export const FirebaseContext =
    createContext<FirebaseState>(defaultFirebaseState);

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
