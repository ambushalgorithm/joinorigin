import { getT } from '@joinorigin/i18n';

import { getServerDictionary } from '../lib/i18n-server';
import { exampleCommunityTarget } from '../lib/seo/exampleCommunities';
import { getServerCountry } from '../lib/seo/geo';
import ChipMarquee from './ChipMarquee';

/**
 * Server wrapper for the example-communities marquee (Story E, TASK-536).
 *
 * Reads the geo country + active locale server-side and resolves the target
 * content-rich community page (`lib/seo/exampleCommunities.ts` — closest
 * country to the visitor, then the largest content-rich community within it;
 * locale-language default when geo is absent), then renders the client
 * `ChipMarquee` with the registry-exact localized path.
 *
 * Encapsulating the server reads here means the locale page wrappers never
 * need changes to gain geo-aware chips — a server surface can drop
 * `<ChipMarqueeServer />` anywhere it renders the "Example communities"
 * section. The component must be rendered from a server component (it reads
 * `next/headers`); the client marquee itself never imports the geo snapshot,
 * so the 12 MB `locations.json` stays out of client bundles (RC1,
 * `docs/design/sprint-22-nav-perf-baseline.md`).
 */
export async function ChipMarqueeServer() {
  const [{ locale, dictionary }, country] = await Promise.all([
    getServerDictionary(),
    getServerCountry(),
  ]);
  const intro = getT(dictionary)('community.examplesIntro');
  const target = exampleCommunityTarget(locale, country);
  return <ChipMarquee intro={intro} country={country} targetPath={target?.path ?? null} />;
}

export default ChipMarqueeServer;
