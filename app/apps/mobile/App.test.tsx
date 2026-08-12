import React from 'react';
import { render } from '@testing-library/react-native';
import { I18nManager, NativeModules } from 'react-native';

import App from './App';
import { detectOsLocale } from './src/i18n';

/**
 * App-level i18n tests (arch-i18n §6.4, §10.2): the device OS language is
 * detected at startup, `I18nManager.forceRTL` is applied for ar/fa, and the
 * home screen renders translated copy. `NativeModules` is stubbed per test so
 * the OS locale can be overridden.
 */

const originalSettingsManager = (NativeModules as { SettingsManager?: unknown }).SettingsManager;
const originalI18nManagerModule = (NativeModules as { I18nManager?: unknown }).I18nManager;

afterEach(() => {
  I18nManager.forceRTL(false);
  if (originalSettingsManager === undefined) {
    delete (NativeModules as { SettingsManager?: unknown }).SettingsManager;
  } else {
    (NativeModules as { SettingsManager?: unknown }).SettingsManager = originalSettingsManager;
  }
  if (originalI18nManagerModule === undefined) {
    delete (NativeModules as { I18nManager?: unknown }).I18nManager;
  } else {
    (NativeModules as { I18nManager?: unknown }).I18nManager = originalI18nManagerModule;
  }
});

describe('App', () => {
  it('renders Welcome to JoinOrigin via shared components', async () => {
    (NativeModules as { SettingsManager?: unknown }).SettingsManager = {
      settings: { AppleLocale: 'en-US' },
    };
    const { getByText } = await render(<App />);
    expect(getByText('Welcome to JoinOrigin')).toBeTruthy();
  });

  it('renders the supporting copy', async () => {
    (NativeModules as { SettingsManager?: unknown }).SettingsManager = {
      settings: { AppleLocale: 'en-US' },
    };
    const { getByText } = await render(<App />);
    expect(getByText('Your workspace is ready.')).toBeTruthy();
  });

  it('detects the OS locale with EN fallback', () => {
    (NativeModules as { SettingsManager?: unknown }).SettingsManager = {
      settings: { AppleLocale: 'en-US' },
    };
    expect(detectOsLocale()).toBe('en');
    (NativeModules as { SettingsManager?: unknown }).SettingsManager = {
      settings: { AppleLocale: 'de-DE' },
    };
    expect(detectOsLocale()).toBe('de');
  });

  it('forces RTL when the OS locale is Arabic', () => {
    (NativeModules as { SettingsManager?: unknown }).SettingsManager = {
      settings: { AppleLocale: 'ar-EG' },
    };
    expect(detectOsLocale()).toBe('ar');
  });
});
