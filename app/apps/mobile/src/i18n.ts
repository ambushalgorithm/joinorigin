import { I18nManager, NativeModules, Platform } from 'react-native';

import { getDir, resolveLocale, type Locale } from '@joinorigin/i18n';

/**
 * Mobile locale resolution (arch-i18n §6.4).
 *
 * - `detectOsLocale` reads the device OS language: iOS
 *   `NativeModules.SettingsManager.settings.AppleLocale` (or
 *   `AppleLanguages[0]`), Android
 *   `NativeModules.I18nManager.localeIdentifier` (or
 *   `I18nManager.getConstants().localeIdentifier`), then normalizes through
 *   the shared `resolveLocale` (EN fallback).
 * - `applyRtl` forces React Native's I18nManager direction for `ar`/`fa`
 *   (arch-i18n §8.3). Known RN caveat: on Android a native restart is needed
 *   for the RTL flip to fully take effect; on iOS it applies immediately.
 */

export function detectOsLocale(): Locale {
  try {
    let raw: string | undefined;
    if (Platform.OS === 'ios') {
      const settings = NativeModules.SettingsManager?.settings as
        { AppleLocale?: string; AppleLanguages?: string[] } | undefined;
      raw = settings?.AppleLocale ?? settings?.AppleLanguages?.[0];
    } else {
      const i18nManager = NativeModules.I18nManager as { localeIdentifier?: string } | undefined;
      raw = i18nManager?.localeIdentifier ?? I18nManager.getConstants()?.localeIdentifier;
    }
    return resolveLocale(raw);
  } catch {
    return 'en';
  }
}

/** Apply the active locale's direction (RTL for ar/fa). */
export function applyRtl(locale: Locale): void {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(getDir(locale) === 'rtl');
}
