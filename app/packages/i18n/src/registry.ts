import ar from '../locales/ar.json';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fa from '../locales/fa.json';
import fr from '../locales/fr.json';
import hi from '../locales/hi.json';
import id from '../locales/id.json';
import it from '../locales/it.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import ptBR from '../locales/pt-BR.json';
import ru from '../locales/ru.json';
import th from '../locales/th.json';
import tr from '../locales/tr.json';
import uk from '../locales/uk.json';
import vi from '../locales/vi.json';
import zhCN from '../locales/zh-CN.json';
import zhTW from '../locales/zh-TW.json';

import type { Dictionary } from './types';
import type { Locale } from './resolve';

/**
 * Static dictionary registry — synchronously available on the server (web
 * RSC/layouts/FAQ JSON-LD) and on mobile (Metro bundles all JSON, arch-i18n
 * §3.3). The web client does NOT import this module (it would pull every
 * locale into the initial bundle); it uses `loadDictionary` dynamic imports
 * instead, seeded by the server-provided dictionary prop.
 */

export const STATIC_DICTIONARIES: Record<Locale, Dictionary> = {
  ar,
  de,
  en,
  es,
  fa,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  nl,
  pl,
  'pt-BR': ptBR,
  ru,
  th,
  tr,
  uk,
  vi,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};
