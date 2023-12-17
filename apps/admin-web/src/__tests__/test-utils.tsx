import { Store } from '@reduxjs/toolkit';
import { cleanup, render } from '@testing-library/react';
import { I18nextProvider, I18nextProviderProps } from 'react-i18next';
import { Provider } from 'react-redux';
import { afterEach } from 'vitest';
import createI18n from '../localization/i18n';

let i18n: I18nextProviderProps['i18n'];
beforeEach(async () => {
  i18n = createI18n();
  await i18n.init();
});

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options: { store?: Store } = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => {
      if (options.store)
        return (
          <Provider store={options.store}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </Provider>
        );
      return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    },
    ...options,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
