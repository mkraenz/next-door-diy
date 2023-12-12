import { ChakraProvider } from "@chakra-ui/react";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import AuthenticatedApp from "./auth/AuthenticatedApp";
import { FirebaseProvider } from "./components/FirebaseProvider";
import createI18n from "./localization/i18n";
import { router } from "./router";
import { store } from "./store";
import { theme } from "./theme";

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

const i18n = createI18n();

const App = () => {
  return (
    <Provider store={store}>
      <FirebaseProvider app={app} analytics={analytics}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <I18nextProvider i18n={i18n} defaultNS={"translation"}>
              <AuthenticatedApp>
                <RouterProvider router={router} />
              </AuthenticatedApp>
            </I18nextProvider>
          </ChakraProvider>
        </AuthProvider>
      </FirebaseProvider>
    </Provider>
  );
};

export default App;
