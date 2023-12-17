import { ChakraProvider } from '@chakra-ui/react';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import DatabaseProvider from './api/DatabaseProvider';
import FirebaseFunctionsProvider from './api/FunctionsProvider';
import { AuthProvider } from './auth/AuthProvider';
import { router } from './common/router';
import { FirebaseProvider } from './components/FirebaseProvider';
import createI18n from './localization/i18n';
import { store } from './store';
import { theme } from './theme';

const firebaseConfig: FirebaseOptions = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG
);

const app = initializeApp(firebaseConfig);
// we want to initialize analytics before any react code in case an error happens.
const analytics = getAnalytics(app);

const i18n = createI18n();

const App = () => {
  return (
    <Provider store={store}>
      <FirebaseProvider app={app} analytics={analytics}>
        <AuthProvider>
          <DatabaseProvider>
            <FirebaseFunctionsProvider>
              <ChakraProvider theme={theme}>
                <I18nextProvider i18n={i18n} defaultNS={'translation'}>
                  <RouterProvider router={router} />
                </I18nextProvider>
              </ChakraProvider>
            </FirebaseFunctionsProvider>
          </DatabaseProvider>
        </AuthProvider>
      </FirebaseProvider>
    </Provider>
  );
};

export default App;
