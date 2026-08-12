import type { ReactElement } from 'react';
import { render } from '@testing-library/react';

import { I18nProvider, getDictionary, type Locale } from '@joinorigin/i18n';

/**
 * Test helper — render a page/view inside the i18n provider so client
 * components using `useI18n()` work in isolation (the root layout normally
 * mounts the provider). The dictionary comes from the static registry, the
 * same source the server layout seeds on real requests.
 */
export function renderWithI18n(ui: ReactElement, locale: Locale = 'en') {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      {ui}
    </I18nProvider>,
  );
}
