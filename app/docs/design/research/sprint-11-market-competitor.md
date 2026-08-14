# Sprint 11 — Market & Competitor Research: How Community Platforms Do Programmatic/Content SEO for Community Discovery

> **Parent:** [`../../README.md`](../../README.md) · **Design docs index:** [`../README.md`](../README.md) · **Research series:** [`./README.md`](./README.md) · **Consumer:** `arch-seo-content-engine` (TASK-303) · **Related research:** `sprint-11-programmatic-seo.md` (TASK-297) · `sprint-11-content-strategy.md` (TASK-299)

## 1. Purpose

This report is the **market-competitor findings** input to the Sprint 11 SEO Content
Engine design (Story 1, research-only — no implementation). It answers three questions
for JoinOrigin's planned hybrid programmatic location pages (`/location/<country>/<region>/<city>`
+ city×group-type variants), how-to guides, idea pages, and topic hubs:

1. **How do Circle, Mighty Networks, Meetup, Reddit, Substack, and local Facebook Groups
   actually do content/programmatic SEO for community discovery?**
2. **What actually ranks for community-discovery intent, and what gets flagged as
   spam/doorway/content-farm?**
3. **What virality mechanics and content-engagement loops do these platforms use, and
   which are transferable to a pre-launch JoinOrigin?**

Scope: competitor evidence + best-opinion recommendations only. The architect
(TASK-303) synthesizes this with the other six research reports into the Sprint 12
solution design. **No implementation files were touched.**

### 1.1 Method & source quality

Evidence was gathered live (Aug 2026) from: Google Search Central official spam
policies; Ahrefs blog (programmatic SEO, location landing pages, Reddit SEO);
Semrush blog (programmatic SEO); Substack's official on-platform SEO guide; Meetup's
live topic/find pages; Mighty Networks' official docs + a third-party teardown;
SEO Sherpa community-SEO guide; and DuckDuckGo-indexed practitioner evidence for
Facebook Groups indexing. Sources are cited inline with `[S#]` and listed in §10.

---

## 2. Executive Summary — Best Opinion (read this first)

**Finding 1 — Community-discovery SEO is a two-layer game, and the layers are different.**
Every successful platform separates a **crawlable "discovery layer"** (category/topic/
location landing pages, group profiles, public posts) from a **gated "experience layer"**
(discussions, member feeds, courses). Google only sees and ranks the discovery layer.
Circle, Mighty Networks, and private Facebook Groups are *weak at the discovery layer by
design* (login-walled → little organic indexable content → SEO must happen off-platform
on the vendor's marketing site). Meetup, Reddit, and Substack are *strong at the
discovery layer by design* (public, crawlable, user-generated at scale). **JoinOrigin's
edge is that its programmatic content engine IS the discovery layer — a first-class
owned domain rather than a rented walled garden.** [S1][S2][S3][S7][S9][S10]

**Finding 2 — The platforms that win at community discovery SEO all run the same
playbook: "template × unique local data × real intent."** Meetup publishes
location×topic×type pages from live group data; Reddit publishes every subreddit and
post; Substack publishes every article archive; Mighty Networks publishes name
generators and resource pages from tool data. The pages that rank carry **real,
differentiated, intent-matching substance** (event lists, member counts, group names,
answers) — not boilerplate. [S3][S4][S5][S7][S9]

**Finding 3 — Google's line between "programmatic" and "spam/doorway/content-farm"
is explicit and enforceable.** The spam policies name the exact patterns that kill
programmatic projects: **doorway abuse** (multiple near-identical pages funneling to
one destination), **scaled content abuse** (mass pages with little added value,
including AI-generated synonymized variations), **thin content**, and **keyword
stuffing** (city/region blocks with no substance). John Mueller's caution is direct:
"*Programmatic SEO is often a fancy banner for spam.*" The differentiator Google
states is **data + relevancy** — the pages must independently answer the query. [S1][S3][S4]

**Finding 4 — Community-discovery queries are increasingly answered by UGC and
"Discussions and forums" SERP features, not classic directories.** Google's helpful
content update rewards first-person experience; Reddit now ranks **#2 in US organic
traffic (≈727M visits/mo)**, has a dedicated Discussions & Forums SERP feature, and
licenses its data to Google ($60M/yr) and OpenAI ($203M aggregate). Substack and
Meetup also earn position on this intent. **The winning join: programmatic discovery
pages that are themselves community-touchable** (member counts, group listings,
event-style data, Q&A), not static brochures. [S4][S7][S9]

**Finding 5 — Virality on these platforms is loop-based, and every loop starts from
a public page.** Meetup: search → join group → RSVP → event → new members post →
more searchable content. Reddit: search → read thread → upvote/comment → thread ranks
higher → more search traffic. Substack: search → read post → subscribe → email →
restack/recommend → new readers. Facebook Groups: public posts indexed (July 2025
Meta change) → discover → request join → post → more indexed content. **For a
pre-launch product, the SEO Content Engine is the seed of every loop: it generates
the first public pages that get indexed, rank, and convert to waitlist signups.** [S4][S5][S7][S9][S11]

**Finding 6 — Recommendation for JoinOrigin (detailed in §8):** build the discovery
layer as **programmatic location×group-type pages + evergreen how-to/idea/topic hub
pages on the owned domain**, seeded with real geodata and real (eventually live)
community data, with every page carrying unique local substance, an internal-link
mesh, JSON-LD, and a waitlist CTA. Do **not** copy Circle's/Mighty Networks'
login-walled indexing model; do **not** copy mass-produced "content farm" location
pages. Rank ambition: long-tail "community/group/meetup in [city]" intent, which the
competitors under-serve because they either gate content (Circle/MN/FB) or scatter it
across subdomains (Substack/Meetup).

---

## 3. Platform-by-Platform: How Each Competitor Does Community-Discovery SEO

### 3.1 Meetup — the closest structural analogue (location × topic × type)

**What they do:** Meetup is a live, crawlable directory. The find experience is
literally `"Events near {city}"` plus a **category rail** (Social Activities, Tech,
Sports & Fitness, Career & Business, …) — i.e., a **location × category matrix**
generated from live group/event data. Topic pages are programmatic: e.g.
`/topics/seo-search-engine-optimization/` shows "Meet other local people interested in
SEO… Join a SEO group" with member counts (781,835 members, 1,034 groups), related
topics, largest groups, newest groups. Group pages show members, ratings, upcoming
events. City pages (`/cities/`) and a public sitemap complete the mesh. [S5][S6]

**What actually ranks:** branded group URLs (`meetup.com/{group-slug}`), topic pages,
and event pages — all generated from **real, current, location-anchored data** (member
counts, RSVP counts, dates, venues, ratings). Google trusts them because the data is
live, unique per page, and exactly matches "what meetups are in {city} / {topic}"
intent.

**Why it works (and its flaw):** Live data = freshness + uniqueness; no thin content
because every page differs. **Flaw:** Meetup doesn't write guides/hubs; its SEO is
100% UGC-directory. It ranks for navigational/transactional intent but loses
informational intent ("how to start a meetup") to blogs. **JoinOrigin opportunity:**
cover both — directory pages AND evergreen how-to/idea/topic content, on one domain.

### 3.2 Reddit — the UGC-SEO juggernaut (and the anti-pattern warning)

**What they do:** Reddit publishes essentially everything publicly: every subreddit,
every post, every comment, every vote count is crawlable and indexable. This is
"community SEO at scale" — a continuously self-updating content engine where threads
naturally target long-tail conversational queries. Google now features **Discussions
and forums** blocks; Reddit is **#2 US site by SEO traffic (≈727M visits/mo)** and the
second-most-cited domain in AI answers (≈1.2B visits/mo), supported by **$60M/yr
Google + $203M aggregate AI licensing** (OpenAI etc.). [S4][S9]

**What ranks:** question-form threads, experience-based answers, subreddit
landing pages — exactly what the helpful-content update rewards (first-person
experience beats polished-but-generic pages).

**Anti-pattern warning (critical for us):** Reddit itself and the SEO industry are
explicit that **manufactured sentiment, astroturfing, and self-promotional posts get
banned/burned** — the 2025 Trap Plan astroturfing scandal (100+ fake posts across
r/pcmasterrace, r/PlayStation5, etc.) is the canonical cautionary tale. For JoinOrigin
this means: **do not seed fake communities or fake member counts on programmatic
pages.** Real or clearly-labeled data only; fabricated social proof is a reputation
and Google-quality liability. [S9]

### 3.3 Substack — "renting domain authority," article-level SEO

**What they do:** Substack publishes every article archive publicly and gives writers
per-post **SEO title, meta description, URL slug, and social preview** controls. The
platform explicitly markets "**borrowing Substack's strong SEO reputation**" (high
domain authority) and pushes **inbound links** ("link to your publication everywhere")
as the top ranking lever. Discovery also runs through its own recommendation
engine/network. [S7][S8]

**What ranks:** individual articles (not the publication hub). Evidence across the
ecosystem is consistent: "Google isn't ranking your publication because it's on
Substack — it's ranking individual articles on their own merits." [S8]

**Why it matters for JoinOrigin:** (1) shows **per-page granular SEO control is
mandatory** for a programmatic engine; (2) shows **domain authority is a real
constraint** — Substack borrows its parent domain's authority; a brand-new
joinorigin domain must earn authority through topical depth + links, not hope;
(3) shows the **email/read-loop virality model** (subscribe → email → read → share/
restack → new subscriber) that a waitlist can mimic. [S7][S8]

### 3.4 Circle — intentionally NOT discoverable; SEO happens outside the platform

**What they do:** Circle (community platform for courses/communities) is, by design,
a walled garden: discussions live behind logins, so **Google can't index most of the
value**. Circle's own help center documents SEO customization (meta tags/OG for feed,
spaces, posts, events), but third-party analysis is blunt: "With Circle, SEO tends to
happen **outside** the platform." Circle's own discovery play is **Circle Discover**
(a marketplace for finding communities, `circle.so/discover` / `discover.circle.so`) —
i.e., an *internal* directory, not Google SEO. [S1][S2][S10]

**What ranks:** Circle's marketing site (circle.so), individual communities' public
landing pages, and marketplace listings — not the community conversations.

**Why it matters for JoinOrigin:** this is the **anti-model** for the discovery layer.
If JoinOrigin gates community content behind signup, its organic discovery surface
collapses to a few landing pages. Our programmatic engine must stay **public and
crawlable**; gate the *experience* (join, post, chat), not the *discovery evidence*
(what communities exist, what's happening, who's involved).

### 3.5 Mighty Networks — platform SEO docs confirm the "only landing page gets indexed" rule

**What they do:** Mighty Networks hosts communities ("networks") with paid plans. Their
own docs are explicit: **"If your Mighty Network is accessible through plans, only the
landing page will be indexed in search engines."** Privacy setting "Anyone" → network
appears in Mighty search + app discovery and *can* be indexed; "Only invited people" →
**hidden from search, not listed in discovery, cannot be indexed**. Third-party teardown
(Concurate, 2025): mighty networks.com pulls **76K+ organic visits/mo, DR 84, 505K
backlinks**, mostly from **topical resource + tool pages** (Group Name Generator,
Project Name Generator, Patreon Alternatives, Membership Site Platforms, High Ticket
Sales) — i.e., **programmatic utility/name-generator pages + comparison/alternative
pages** are its top organic draws, not its communities. [S10][S12]

**What ranks:** the platform's own marketing domain (generators, resources,
alternatives pages) and individual networks' landing pages. Community interiors:
mostly noindexed behind plans.

**Why it matters for JoinOrigin:** (1) **confirms the "public discovery layer vs gated
experience" split**; (2) shows **programmatic utility pages (generators/tools) can
earn massive organic traffic with near-zero maintenance** — a tactic JoinOrigin could
borrow (e.g., "community name generator," "meetup idea generator"); (3) shows
**"alternative/comparison" pages are high-intent winners** for a category (e.g.,
"Circle vs Mighty Networks vs …") — JoinOrigin can own "community platform
alternatives" intent. [S10][S12]

### 3.6 Local Facebook Groups — previously invisible, now partially indexable

**What they do:** local FB groups are the dominant real-world "local community"
surface, but until mid-2025 they were largely invisible to Google (login wall).
**Meta's July 2025 indexing update** allows Google (and other engines) to index
**public** Facebook/Instagram posts — turning "public FB group posts" into potential
SERP assets; **private groups remain invisible**. Practitioner tests show public group
posts *can* appear for local-phrase queries, but indexing is inconsistent (the
"ghosting" problem is well-documented). [S11]

**What ranks:** public group posts/pages occasionally; **most local-group discovery
still happens inside Facebook's own search**, not Google.

**Why it matters for JoinOrigin:** local communities are high-demand but
Google-under-served. JoinOrigin's location pages can capture the **"local [interest]
group/community [city]"** queries that FB groups cannot reliably answer in Google —
that is a concrete, winnable gap. Also: FB's model shows the **"public surface +
private container"** pattern that our "public discovery pages + gated membership"
design should mirror.

---

## 4. What Actually Ranks for Community-Discovery Intent

Synthesizing the evidence, the page types that consistently win for community
discovery intent are:

| Intent class | Example query | What ranks | Evidence |
|---|---|---|---|
| Directory/navigational | "tech meetups in Berlin", "SEO meetup group" | Meetup topic/group/event pages; Reddit subreddits; FB public group pages | [S5][S6][S9][S11] |
| Category/topic hubs | "communities for startup founders", "best communities for X" | Reddit/Quora threads; community directories; AI answers citing communities | [S1][S4][S9] |
| How-to/informational | "how to start a community / meetup", "first 10 members" | Publisher blogs; Substack articles; resource hubs (Mighty Networks) | [S7][S8][S10][S12] |
| Comparison/decision | "Circle vs Mighty Networks", "membership platform alternatives" | Comparison pages (Mighty Networks' top organic keyword cluster) | [S12] |
| Utility/tools | "community name generator", "group name generator" | Programmatic generator pages (Mighty Networks top traffic pages) | [S12] |
| Local service/community | "communities in [city]", "groups for [hobby] [city]" | Location pages with unique local data; increasingly UGC/discussion | [S3][S4][S5][S11] |

**Common denominator of the winners:** each ranking page **uniquely satisfies the
query with live or real data** — member counts, event dates, group names, answers,
tool outputs, or genuinely distinct editorial content. Pages that merely restate the
keyword with different city names do not win (see §5). [S3][S4]

---

## 5. What Gets Flagged as Spam / Doorway / Content-Farm

Google's **Spam Policies** (official, May 2026 revision) name the exact violations
that programmatic engines must avoid [S3]:

| Violation | Definition (Google) | Relevance to a city×group-type programmatic engine |
|---|---|---|
| **Doorway abuse** | "Having multiple domain names or **pages targeted at specific regions or cities that funnel users to one page**"; "Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy" | THE core risk. City pages that all say the same thing with the city swapped → doorway. Must differ in substance (real group/community/event/venue data, unique copy per city). |
| **Scaled content abuse** | "Many pages generated for the primary purpose of manipulating search rankings… large amounts of unoriginal content that provides little to no value… no matter how it's created" (explicitly includes **AI-generated synonymized/translated variants** and scraped/stitched content) | THE second core risk. Mass-producing "communities in {city}" with AI boilerplate → scaled content abuse. Every page needs unique value (real data, localized editorial, genuine utility). |
| **Thin content** | pages with little to no added value | The floor every programmatic page must clear (see §8 quality thresholds). |
| **Keyword stuffing** | "Blocks of text that list cities and regions that a web page is trying to rank for" | Directly names the classic city-page anti-pattern (footer/body city blocks). Forbidden. |
| **Hidden text/links** | off-screen keyword text | Any SEO-only hidden city lists = hidden text. Forbidden. |
| **Site reputation abuse** | third-party content on a strong host purely to rank | Not our pattern, but a caution if we ever syndicate low-value guest content. |
| **Cloaking / sneaky redirects** | different content to bots vs users | Any JS-gated content Google can't render must not be "hidden" from crawlers; keep SSR crawlable. |

**Practitioner-consistent line:** Ahrefs' guide: "Programmatic SEO is often a fancy
banner for spam" (John Mueller) — but "the answer often boils down to **data and
relevancy**"; sites like Wise/Zapier/Zillow succeed on product-relevant data in a
useful format. Semrush adds the operational risks: **indexation issues** (near-duplicate
pages get deindexed/not-indexed) and **penalty risk** from low-value volume. Ahrefs'
location-page guide explicitly warns Google dislikes: **mass-produced local pages,
location pages for areas with no tangible presence, duplicated content with only the
location swapped, and regurgitated Wikipedia history**. [S3][S4][S13]

---

## 6. Virality Mechanics & Content-Engagement Loops

Each competitor runs a loop that compounds public content into growth. The loops are
the *reason* the public content layer exists.

### 6.1 The loops

| Platform | Loop | Public anchor | Feeds back into |
|---|---|---|---|
| Meetup | Search → join group → RSVP → attend → post/rate → new events/groups | group/topic/event pages | more directory pages, more long-tail queries |
| Reddit | Search → read thread → upvote/comment → thread rises → shared/cited → more reads | posts/subreddits | more UGC, more AI/Google citations |
| Substack | Search → read post → subscribe → email → open → restack/recommend → new readers | article archive | email list, recommendation network |
| Circle/MN | (mostly) internal discovery/marketplace + paid ads; minimal Google loop | landing page | marketplace listings |
| FB Groups | In-app discovery + (now) partial Google indexing of public posts | public group/posts | join requests → posts → more indexed content |

### 6.2 Transferable virality mechanics for a pre-launch JoinOrigin

1. **The "search → join" loop (Meetup-style):** programmatic location/topic pages are
   the entry; every page ends in a waitlist/join CTA. As real groups appear, their
   data enriches the pages → more search traffic → more signups. **Design the engine
   so live community data slots into the templates later** (start with geodata +
   editorial, upgrade with real groups).
2. **The "shareable artifact" loop (Substack/Reddit-style):** each how-to/idea page
   should be genuinely shareable (quotable stats, actionable checklists, OG images)
   so organic shares and links compound. Links back to the site are the authority
   engine for a new domain.
3. **The "freshness" loop (Reddit/Meetup-style):** continuously refreshed data
   (events, groups, member counts — later; geodata recency, new guides — now) keeps
   pages fresh, which is a ranking + AI-citation signal.
4. **Email/waitlist loop (Substack-style):** every page's CTA feeds the waitlist;
   the waitlist becomes the launch list and the first community seed.

---

## 7. Competitive Gaps JoinOrigin Can Win

1. **Local community discovery in Google is under-served.** Meetup covers events but
   not "communities"; FB groups are inconsistently indexed; Circle/MN gate content.
   A **clean, crawlable location×group-type directory on an owned domain** has a real
   opening.
2. **Informational intent is unowned by the directories.** Meetup/Reddit rank for
   questions via UGC, but no single platform owns "how to start/run a community" as
   structured, local-aware content. JoinOrigin's how-to/idea/topic hub can own it.
3. **Programmatic utility + comparison pages are proven winners (Mighty Networks
   evidence).** Name/idea generators and "community platform alternatives" pages are
   high-traffic, low-competition, and perfectly on-brand for JoinOrigin.
4. **AI/GEO: being cited in AI answers is now as important as ranking.** The engines
   that win citations are the ones with parseable, experience-based, structured
   content (Reddit #2; Substack; communities). JoinOrigin's pages should be
   AI-citation-ready from day one (semantic HTML, FAQ JSON-LD, clean prose) per the
   Sprint 4 SEO architecture. [S4][S9]

---

## 8. Recommendations for the JoinOrigin SEO Content Engine

1. **Model the discovery layer on Meetup + Reddit, not Circle/MN/FB.** Build public,
   crawlable, SSR-rendered location×group-type pages on the owned domain. Gate the
   *experience*, never the *discovery evidence*. [S5][S9][S10][S12]
2. **Every page must clear the "unique substance" bar or it must not be published.**
   Per Google: data + relevancy is the difference between programmatic and spam.
   Minimum per page: unique localized editorial ≥ some quality threshold (see
   TASK-297 programmatic-seo research), real geodata context, an internal-link mesh,
   and — as soon as available — live community data (groups/members/events). [S3][S4][S13]
3. **Never publish fabricated social proof.** No fake member counts, no fake
   communities, no seeded fake reviews — Reddit's astroturfing scandals and Google's
   site-reputation/quality systems both punish it. Real data only; clearly-labeled
   placeholders ("coming soon") are fine. [S9]
4. **Ship the full intent stack, not just directory pages:** location×group-type
   directory pages (Meetup-style) + how-to guides + idea pages + topic hubs +
   programmatic utility tools (name/idea generators) + comparison pages
   ("alternatives"). This mirrors the winning mix across Meetup, Mighty Networks, and
   Substack and gives JoinOrigin multiple entry points into the funnel. [S3][S5][S7][S12]
5. **Treat domain authority as a first-class constraint.** Substack's lesson: new
   domains don't rank on template quality alone. Budget for link acquisition
   (PR/outreach, genuinely shareable content, directory listings) and topical depth.
   [S7][S8]
6. **Localize per the EN-first strategy, but respect Google's multilingual rules:**
   each localized page must be a real, useful page (not an auto-translated synonym
   variant — explicitly flagged in scaled-content abuse). See TASK-300/TASK-302
   research for the localization/MT trade-offs. [S3]
7. **Design the engine for later "live data" enrichment.** Start with geodata +
   editorial (Sprint 12 scope); the templates should accept real community/event data
   when JoinOrigin launches, converting the directory from "planned" to "live" —
   the Meetup/Reddit freshness loop. [S5][S9]
8. **Prioritize flagship cities with manual polish first.** The Ahrefs location-page
   evidence is clear: Google demotes mass-produced local pages; the winners show real
   local presence. Manually polish the first N flagship cities (see TASK-299 content
   strategy), then scale templates only where data supports uniqueness. [S4][S13]
9. **Every page = waitlist CTA + shareable artifact + JSON-LD**, wired to the existing
   Sprint 4 SEO/analytics architecture (sitemap, llms.txt, FAQPage/Organization
   schema) so the engine participates in both Google and AI/GEO discovery. [S4]

---

## 9. Key Risks & Mitigations

| Risk | Evidence | Mitigation |
|---|---|---|
| Doorway-page penalty from near-identical city pages | Google spam policy: "pages targeted at specific regions or cities that funnel users to one page" [S3] | Unique substance per page; no boilerplate; no city-list keyword stuffing; browsable hierarchy with internal links |
| Scaled-content abuse (incl. AI-generated synonym/translation variants) | Google spam policy [S3] | Human-edited editorial seed + quality thresholds; no MT-only pages without review (see TASK-302) |
| Indexation collapse (thousands of pages not indexed) | Semrush: near-duplicate pages get deindexed [S4] | Conservative page count first (flagship cities); unique data per page; sitemap hygiene; monitor GSC |
| Thin content drag on whole-site quality | Ahrefs/Semrush [S3][S4] | Don't publish pages that can't clear the bar; use noindex for placeholder/empty states |
| Fake social proof → reputation/quality hit | Reddit astroturfing case [S9] | Real data only; "coming soon" labels; no fake counts |
| New-domain authority deficit | Substack lesson [S8] | Link acquisition budget; topical depth; utility pages that earn links; consistent crawlable publishing |

---

## 10. Sources

| ID | Source | Date | Key claim used |
|---|---|---|---|
| S1 | SEO Sherpa — "Community SEO: How to Rank with Skool, Circle & UGC" (`seosherpa.com/community-seo/`) | 2026-05-20 | Circle/Skool indexability: content behind logins invisible; SEO happens outside Circle; public entry points critical; "best communities for X" AI queries; UGC at scale/freshness/engagement loops |
| S2 | Circle help center + Discover (`circle.so/discover`, `discover.circle.so`, help-en.circle.so) | 2026-08 | Circle SEO customization (meta/OG per feed/space/post/event); Circle Discover internal marketplace model |
| S3 | Google Search Central — "Spam policies for Google web search" (`developers.google.com/search/docs/essentials/spam-policies`) | 2026-05-15 rev | Doorway abuse, scaled content abuse, thin content, keyword stuffing, hidden text, site reputation abuse definitions |
| S4 | Ahrefs Blog — "Programmatic SEO, Explained for Beginners" + Semrush — "What Is Programmatic SEO?" (`ahrefs.com/blog/programmatic-seo/`, `semrush.com/blog/programmatic-seo/`) | 2023-10 / 2025-05 | Data+relevancy = programmatic vs spam; John Mueller quote; Wise/Zapier/Zillow/Nomadlist/Yelp/Tripadvisor evidence; indexation + penalty risks |
| S5 | Meetup live pages (`meetup.com/find/`, `meetup.com/topics/seo-search-engine-optimization/`, `meetup.com/topics/`, `meetup.com/cities/`, `meetup.com/sitemap`) | 2026-08 | Location×category×type discovery matrix; topic page anatomy (member counts, related topics, largest/newest groups); city pages; sitemap |
| S6 | Meetup help — group/event ratings public visibility | 2025-03-26 | Social proof (ratings/reviews) public on group + event pages — trust signals in directory SEO |
| S7 | Substack official — "A guide to SEO on Substack" (`on.substack.com/p/substack-seo-guide`) | 2023-02-15 | Per-post SEO title/desc/URL/social preview; "borrow Substack's strong SEO reputation"; inbound links = top ranking lever; link everywhere |
| S8 | Practitioner Substack-SEO evidence (Adrienne Coach; Corporate Maze; superblog.ai — found via DDG) | 2026 | "Google ranks individual articles, not the publication"; domain-authority subletting; reverse search-intent growth loop |
| S9 | Ahrefs Blog — "How to Use Reddit for SEO (The Right Way)" (`ahrefs.com/blog/reddit-seo/`) | 2026-07-01 | Reddit #2 US SEO traffic (727M), #2 AI-cited (1.2B); $60M/yr Google + $203M AI licensing; Discussions & Forums SERP feature; astroturfing/Trap Plan cautionary tale; UGC freshness/engagement loops |
| S10 | Mighty Networks official docs — "How does SEO work for my Mighty Network?" + privacy settings (`docs.mightynetworks.com`) | 2026-08 | "If accessible through plans, only the landing page will be indexed"; Anyone=indexable, invite-only=not; platform SEO is landing-page-only |
| S11 | Meta/FB indexing evidence (Neal Schaffer; Brandminded; GitHub gist NovCog; salazardigital — via DDG) | 2025-07/2026 | Meta July 2025 update: Google can index public FB/IG posts; public groups indexable, private invisible; local-phrase tests + "ghosting" inconsistency |
| S12 | Concurate — "Mighty Networks Marketing Strategy Playbook" (`concurate.com/company/mighty-networks-marketing-strategy/`) | 2025-11 | MN: 76K+ organic/mo, DR 84, 505K backlinks; top pages = group/project/event name generators + Patreon/Teachable alternatives + membership-platform resources |
| S13 | Ahrefs Blog — "Location Landing Pages: 6 Crucial Elements of Local Visibility" (`ahrefs.com/blog/location-pages/`) | 2023-12-22 | What Google dislikes (mass-produced local pages, no tangible presence, duplicated content, Wikipedia regurgitation); location-page anatomy (URL structure, title, above-fold, maps/photos, service links, social proof) |

---

## 11. Open Questions for the Architect (TASK-303)

1. Should the engine ship **utility generators** (community/group/event name
   generators) in Sprint 12, or defer to Sprint 13? (Evidence: Mighty Networks' top
   traffic pages are generators [S12] — high ROI, low content risk.)
2. What is the **minimum unique-substance threshold** per city page before publishing
   (word count, unique data points, manual-polish flags)? Coordinates with TASK-297.
3. Do we include **comparison pages** ("community platform alternatives") — high
   intent but they put competitor brand names on the site; needs product/brand
   sign-off.
4. **Localization sequencing:** EN-first is approved; when MT-on-demand is added, how
   do we prevent auto-translated variants from triggering scaled-content abuse [S3]?
   (Coordinates with TASK-302.)
5. **Later live-data hook:** is the Sprint 12 template contract ready for
   real group/event/member data injection post-launch (the Meetup/Reddit freshness
   loop [S5][S9])?

---

## Navigation Footer

- **Up:** [`../README.md`](../README.md) (design index) · [`../../README.md`](../../README.md) (docs index)
- **Siblings (Sprint 11 research):** `sprint-11-programmatic-seo.md` · `sprint-11-geodata.md` · `sprint-11-content-strategy.md` · `sprint-11-localization.md` · `sprint-11-tech-feasibility.md` · `sprint-11-translation-services.md`
- **Consumer:** `arch-seo-content-engine` (TASK-303) → `../sprint-11-seo-content-engine.md`
