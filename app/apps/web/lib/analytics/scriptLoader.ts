/**
 * Centralized script injection helper for the analytics subsystem.
 *
 * All vendor-script DOM injection goes through `loadScript` so tests can stub
 * it in one place and the adapters stay free of DOM code.
 *
 * Contract rules (design §2.5):
 * - Idempotent: injecting the same `src` twice is a no-op (StrictMode /
 *   HMR double-mount must not inject duplicate scripts).
 * - Never throws and never rejects on load failure — analytics must never
 *   break the page (degrades silently to `console.debug` by the caller).
 * - No-op (resolves immediately) when `document` is unavailable (SSR/tests).
 */

export interface ScriptAttributes {
  /** HTML attributes applied to the injected <script>, e.g. `data-domain`. */
  [key: string]: string | undefined;
}

const INJECTED_ATTR = 'data-analytics-injected';

/**
 * Inject a `<script src>` element with the given attributes (e.g.
 * `{ defer: '' }` or `{ async: '' }`).
 *
 * Resolves once the script has loaded (or failed — errors are swallowed so
 * analytics never breaks the page). Resolves immediately if the script was
 * already injected, if the src is invalid, or when `document` is undefined.
 */
export function loadScript(src: string, attributes: ScriptAttributes = {}): Promise<void> {
  return new Promise<void>((resolve) => {
    if (typeof document === 'undefined' || typeof document.head === 'undefined') {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[${INJECTED_ATTR}="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.setAttribute(INJECTED_ATTR, src);
    for (const [key, value] of Object.entries(attributes)) {
      if (value === undefined) {
        continue;
      }
      if (key === 'defer') {
        script.defer = true;
      } else if (key === 'async') {
        script.async = true;
      } else {
        script.setAttribute(key, value);
      }
    }
    // Plain scripts default to async so analytics never blocks rendering.
    if (attributes.defer === undefined && attributes.async === undefined) {
      script.async = true;
    }

    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => resolve(), { once: true });

    document.head.appendChild(script);
  });
}
