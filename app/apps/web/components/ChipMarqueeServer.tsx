import { getT } from '@joinorigin/i18n';

import { getServerDictionary } from '../lib/i18n-server';
import {
  EXAMPLE_COMMUNITY_CHIP_KEYS,
  exampleCommunityChipTargets,
} from '../lib/seo/exampleCommunities';
import { getServerCountry } from '../lib/seo/geo';
import ChipMarquee, { type ChipTargets } from './ChipMarquee';

/**
 * Server wrapper for the example-communities marquee (Story B, TASK-546).
 *
 * Reads the geo country + active locale server-side and resolves the PER-CHIP
 * target map (`lib/seo/exampleCommunities.ts` — each chip maps to a
 * GROUP-TYPE VARIANT page of the closest-largest content-rich community to
 * the visitor: startupFounders→startup, smallBusinesses→small-business,
 * bookClubs|runClubs|peeWeeLeagues|communityOrganizations→meetup,
 * anyoneWithAnIdea→ideas; closest country to the visitor, then the largest
 * content-rich community within it; locale-language default when geo is
 * absent; deterministic committed-content fallback when the mapped variant
 * is not committed for the city/locale), then renders the client
 * `ChipMarquee` with each chip's own registry-exact localized path.
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
  const targets = exampleCommunityChipTargets(locale, country);
  let targetPaths: ChipTargets | null = null;
  if (targets) {
    targetPaths = {};
    for (const chip of EXAMPLE_COMMUNITY_CHIP_KEYS) {
      targetPaths[chip] = targets[chip].path;
    }
  }
  return <ChipMarquee intro={intro} country={country} targets={targetPaths} />;
}

export default ChipMarqueeServer;
