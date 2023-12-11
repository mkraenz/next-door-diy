// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import { AuthProvider } from "./auth/AuthContext";
import AuthenticatedApp from "./auth/AuthenticatedApp";
import { FirebaseProvider } from "./components/FirebaseProvider";
import { store } from "./store";
import Test from "./test/Test";
import { theme } from "./theme";

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyAAnOz7BKrcElsArn6Ry77j72tGjvbXphU",
  authDomain: "next-door-diy.firebaseapp.com",
  projectId: "next-door-diy",
  storageBucket: "next-door-diy.appspot.com",
  messagingSenderId: "868016783697",
  appId: "1:868016783697:web:a721f16ac178f06f925370",
  measurementId: "G-PWK2HF9GVW",
};
const app = initializeApp(firebaseConfig);
// we want to initialize analytics before any react code in case an error happens.
const analytics = getAnalytics(app);

const App = () => {
  return (
    <Provider store={store}>
      <FirebaseProvider app={app} analytics={analytics}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <AuthenticatedApp>
              <Test />
            </AuthenticatedApp>
          </ChakraProvider>
        </AuthProvider>
      </FirebaseProvider>
    </Provider>
  );
};

export default App;
