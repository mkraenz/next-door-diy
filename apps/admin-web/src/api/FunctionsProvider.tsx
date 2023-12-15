import { httpsCallable } from 'firebase/functions';
import { FC, PropsWithChildren, createContext, useCallback } from 'react';
import { useFirebase } from '../hooks/firebase';

type FirebaseFunctionsState = {
  createSubscription: ReturnType<
    typeof httpsCallable<never, { success: true }>
  >;
};

const defaultState: FirebaseFunctionsState = {
  createSubscription: () => {
    throw new Error(
      'default state. Did you wrap your component in a provider?'
    );
  },
};

export const FirebaseFunctionsContext =
  createContext<FirebaseFunctionsState>(defaultState);

const FirebaseFunctionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { functions } = useFirebase();
  const createSubscription = useCallback(
    httpsCallable<never, { success: true }>(functions, 'createSubscription'),
    [functions]
  );
  return (
    <FirebaseFunctionsContext.Provider value={{ createSubscription }}>
      {children}
    </FirebaseFunctionsContext.Provider>
  );
};

export default FirebaseFunctionsProvider;
