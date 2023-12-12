import {
  User,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFirebase } from "../components/FirebaseProvider";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

type Credentials = { email: string; password: string };
type AuthState = {
  user: User | null;
  createAccount: (credentials: Credentials) => void;
  signIn: (credentials: Credentials) => void;
  loading: boolean;
  initiated: boolean;
  error: null | (Error & { code?: string | number });
  authenticated: boolean;
  signOut: () => void;
};

const defaultAuthState: AuthState = {
  user: null,
  createAccount: () => {},
  signIn: () => {},
  loading: false,
  initiated: false,
  error: null,
  authenticated: false,
  signOut: () => {},
};

const AuthContext = createContext<AuthState>(defaultAuthState);

export const useTheme = () => useContext(AuthContext);

/** IMPORTANT: Use within a FirebaseProvider. */
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { auth } = useFirebase();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [initiated, setInitiated] = useState(false);
  console.log({ initiated });
  useEffect(() => {
    // without this, auth.currentUser will be null on first render and thus users will always be logged out
    const waitForInitialAuthState = async () => {
      await auth.authStateReady();
      setInitiated(true);
    };
    waitForInitialAuthState();
  }, [setLoading, auth]);

  const clearError = () => setError(null);
  const createAccount = async ({ email, password }: Credentials) => {
    try {
      setLoading(true);
      clearError();
      await createUserWithEmailAndPassword(auth, email, password);
      clearError();
    } catch (err) {
      const error = err as Error & { code?: string | number };
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      clearError();
      await firebaseSignOut(auth);
      clearError();
    } catch (err) {
      const error = err as Error & { code?: string | number };
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, password }: Credentials) => {
    debugger;
    try {
      setLoading(true);
      clearError();
      await signInWithEmailAndPassword(auth, email, password);
      clearError();
    } catch (err) {
      const error = err as Error & { code?: string | number };
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.currentUser,
        authenticated: Boolean(auth.currentUser),
        createAccount,
        signIn,
        error,
        loading,
        signOut,
        initiated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
