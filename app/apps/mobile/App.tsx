import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import HomeScreen from './src/screens/HomeScreen';
import { applyRtl, detectOsLocale } from './src/i18n';

/**
 * JoinOrigin mobile app — i18n mount (arch-i18n §6.4, §8.3).
 *
 * The device OS language is resolved at startup, the RTL direction is forced
 * via `I18nManager` (ar/fa), and the shared `I18nProvider` seeds the active
 * locale dictionary so `HomeScreen` renders translated copy immediately.
 * Metro bundles all locale JSONs, so the static dictionary lookup is
 * synchronous (arch-i18n §3.3).
 */
export default function App() {
  const locale = React.useMemo(() => {
    const resolved = detectOsLocale();
    applyRtl(resolved);
    return resolved;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
        <HomeScreen />
      </I18nProvider>
    </ThemeProvider>
  );
}
