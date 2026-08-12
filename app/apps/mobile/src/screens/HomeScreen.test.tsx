import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary, type Locale } from '@joinorigin/i18n';

import HomeScreen from './HomeScreen';

function renderScreen(locale: Locale = 'en') {
  return render(
    <ThemeProvider theme={theme}>
      <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
        <HomeScreen />
      </I18nProvider>
    </ThemeProvider>,
  );
}

describe('HomeScreen', () => {
  it('renders the Welcome to JoinOrigin heading', async () => {
    const { getByText } = await renderScreen();
    expect(getByText('Welcome to JoinOrigin')).toBeTruthy();
  });

  it('renders the supporting copy', async () => {
    const { getByText } = await renderScreen();
    expect(getByText('Your workspace is ready.')).toBeTruthy();
  });

  it('renders the Welcome badge', async () => {
    const { getByText } = await renderScreen();
    expect(getByText('Welcome')).toBeTruthy();
  });

  it('renders translated copy for a locale override (arch-i18n §10.2)', async () => {
    const { getByText } = await renderScreen('es');
    // Spanish mobile.home.title — verify the localized string renders.
    expect(getByText('Bienvenido a JoinOrigin')).toBeTruthy();
    expect(getByText('Bienvenido')).toBeTruthy();
  });
});
