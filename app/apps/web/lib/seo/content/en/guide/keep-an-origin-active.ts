import type { GuideContent } from '../../types';

/**
 * "How to Keep a Community Active" — L1 evergreen guide (design §6.1,
 * TASK-326).
 *
 * Re-centered on the digital connect→join→room model: the room and its
 * activity (feeding the feed) are the retention surface — the community
 * lives in the room between gatherings, and in-person events are a
 * downstream consequence. JoinOrigin value is woven into the intro and
 * every step (per-step `joinOriginNote`), with honest framing
 * — JoinOrigin does not manage communities or staff events. Single H1,
 * step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD. "Room" is
 * pinned to the Matrix room (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'keep-an-origin-active',
  title: 'How to Keep an Origin Active & Engaged | JoinOrigin',
  heading: 'How to Keep an Origin Active & Engaged',
  description:
    'Keep your community active — whether it is new and finding its rhythm or established and drifting — use the room and its feed as the retention surface, build rituals, share the organizer load, and create small contribution paths. Practical steps from JoinOrigin.',
  intro: [
    'Most communities do not die from a bad launch; they die from silence — the moment when people stop feeling connected and quietly drift away. Keeping a community active is therefore a connecting-people problem: people stay when they feel they belong, and they feel they belong when there is a visible, organized place where the community lives. That is exactly what JoinOrigin is — and the same mechanics apply whether the community is a few weeks old and still finding its rhythm or years old and drifting into quiet.',
    'JoinOrigin is a community OS designed to help people find, start, and organize communities — and in its digital model the room is the retention surface: a creator-controlled Matrix room where rituals, updates, and contributions stay visible, and whose activity flows into the feed that keeps members connected between gatherings. In-person events remain a downstream consequence of a formed community, never the core — the room and its feed are what keep the community alive day to day. JoinOrigin does not manage communities or staff events — the platform keeps communities connected between gatherings, and the organizing is yours.',
    'This guide covers the practical mechanics of a healthy, active community — from the first weeks after launch to a community that has been running for years: establishing rituals that make participation a habit, creating shared artifacts in the room, distributing the organizer load so no single person burns out, opening small contribution paths so every member can add value, and measuring the signals that tell you whether the community is actually alive. Every step maps to how JoinOrigin helps.',
  ],
  dataPoints: [
    'Recurring rituals — a fixed room rhythm, a regular format, a shared artifact — convert interest into habit.',
    'Room activity between gatherings is what keeps members feeling connected; silence is what drives them away.',
    'Small contribution paths (a pinned note, a rotating host, a member spotlight) make members feel ownership.',
    'JoinOrigin is a community OS designed to help people find, start, and organize communities; it does not manage communities or staff events.',
  ],
  faq: [
    {
      question: 'How often should an active community gather?',
      answer:
        'Monthly is the most sustainable baseline for in-person gatherings; the room should be active weekly — check-ins, updates, and small conversations. Consistency matters more than frequency: a reliable weekly room rhythm beats a sporadic one.',
    },
    {
      question: 'What do I do when engagement drops?',
      answer:
        'Do not panic or launch a big campaign. Ask members directly what they need, post one simple question in the room, run one smaller and simpler gathering, and delegate one role to a member. Small, responsive changes revive engagement faster than volume.',
    },
    {
      question: 'How do I keep members engaged between gatherings?',
      answer:
        'Create low-effort touchpoints in the room: a shared document, a member spotlight, a regular check-in thread, or a “who is working on what” update. The goal is a visible heartbeat in the room and its feed, not constant notifications.',
    },
    {
      question: 'Can JoinOrigin help me keep my community active?',
      answer:
        'Yes. JoinOrigin helps people find, start, and organize communities — one room and feed where the community stays visible between gatherings. The practices in this guide — rituals, shared roles, and small contributions — work on the platform and with the tools you already have.',
    },
  ],
  sections: [
    'Define a core ritual. Pick one recurring practice that everyone can rely on: a monthly meeting, a weekly check-in, a shared reading, or a project update. Rituals create the heartbeat that keeps a community alive — and in a digital-first community the ritual happens in the room. On JoinOrigin a community’s rhythm is visible in one organized room — members always know the next ritual. Pick one recurring practice and guard it.',
    'Create a shared artifact in the room. Start a pinned note or document that captures what the community is doing — meeting notes, member intros, project updates. A living artifact keeps members oriented between gatherings. JoinOrigin is the shared room where notes, intros, and updates live alongside the community — a living artifact by design. Pin a simple shared document in the room.',
    'Distribute the organizer load. Recruit two or three co-hosts or helpers and rotate small roles: welcoming, note-taking, topic selection, venue contact. Shared ownership is the best defense against burnout. JoinOrigin does not staff or manage communities — shared ownership is yours to build. The platform gives helpers and organizers one room to coordinate in. Recruit two or three co-hosts and rotate roles.',
    'Open small contribution paths. Give members ways to add value without big commitments: a member spotlight, a rotating discussion lead, a shared playlist or reading list, or a pinned “help wanted” section in the room. On JoinOrigin members have visible ways to contribute — a community where adding value is easy. Member spotlights and rotating leads create the same ownership.',
    'Keep a predictable communication rhythm in the room. Send one short update per week or per month on a fixed schedule, posted in the room and flowing to the feed. Predictability builds trust; silence builds drift. JoinOrigin keeps the community’s heartbeat in one room — one update, on a schedule, where everyone can see it. One short weekly update builds trust.',
    'Watch the engagement signals. Track room activity, repeat attendance, and contribution rate. A healthy community grows its repeat rate before its total size — focus on the members who come back to the room. On JoinOrigin organizers can see how their community is doing in one organized room and feed. Track activity, repeat attendance, and contribution rate with a simple sheet.',
    'Ask for feedback regularly in the room. Use a simple one-question survey after each gathering: what did you like, what would you change. Act on the answers and tell the community what you changed. JoinOrigin collects and keeps feedback with the community it belongs to — in the room. A one-question survey after each gathering works — then act on the answers.',
    'Adapt the format as the community matures. What worked for ten members may not fit fifty. Revisit the format, venue, and cadence quarterly, and evolve deliberately instead of holding on out of habit. JoinOrigin helps communities evolve — one room where format changes and announcements reach everyone. Revisit your format and venue quarterly on purpose.',
  ],
  steps: [
    {
      title: 'Define a core ritual',
      body: 'Pick one recurring practice that everyone can rely on: a monthly meeting, a weekly check-in, a shared reading, or a project update. Rituals create the heartbeat that keeps a community alive — and in a digital-first community the ritual happens in the room.',
      joinOriginNote:
        'On JoinOrigin a community’s rhythm is visible in one organized room — members always know the next ritual. Pick one recurring practice and guard it.',
    },
    {
      title: 'Create a shared artifact in the room',
      body: 'Start a pinned note or document that captures what the community is doing — meeting notes, member intros, project updates. A living artifact keeps members oriented between gatherings.',
      joinOriginNote:
        'JoinOrigin is the shared room where notes, intros, and updates live alongside the community — a living artifact by design. Pin a simple shared document in the room.',
    },
    {
      title: 'Distribute the organizer load',
      body: 'Recruit two or three co-hosts or helpers and rotate small roles: welcoming, note-taking, topic selection, venue contact. Shared ownership is the best defense against burnout.',
      joinOriginNote:
        'JoinOrigin does not staff or manage communities — shared ownership is yours to build. The platform gives helpers and organizers one room to coordinate in. Recruit two or three co-hosts and rotate roles.',
    },
    {
      title: 'Open small contribution paths',
      body: 'Give members ways to add value without big commitments: a member spotlight, a rotating discussion lead, a shared playlist or reading list, or a pinned “help wanted” section in the room.',
      joinOriginNote:
        'On JoinOrigin members have visible ways to contribute — a community where adding value is easy. Member spotlights and rotating leads create the same ownership.',
    },
    {
      title: 'Keep a predictable communication rhythm in the room',
      body: 'Send one short update per week or per month on a fixed schedule, posted in the room and flowing to the feed. Predictability builds trust; silence builds drift.',
      joinOriginNote:
        'JoinOrigin keeps the community’s heartbeat in one room — one update, on a schedule, where everyone can see it. One short weekly update builds trust.',
    },
    {
      title: 'Watch the engagement signals',
      body: 'Track room activity, repeat attendance, and contribution rate. A healthy community grows its repeat rate before its total size — focus on the members who come back to the room.',
      joinOriginNote:
        'On JoinOrigin organizers can see how their community is doing in one organized room and feed. Track activity, repeat attendance, and contribution rate with a simple sheet.',
    },
    {
      title: 'Ask for feedback regularly in the room',
      body: 'Use a simple one-question survey after each gathering: what did you like, what would you change. Act on the answers and tell the community what you changed.',
      joinOriginNote:
        'JoinOrigin collects and keeps feedback with the community it belongs to — in the room. A one-question survey after each gathering works — then act on the answers.',
    },
    {
      title: 'Adapt the format as the community matures',
      body: 'What worked for ten members may not fit fifty. Revisit the format, venue, and cadence quarterly, and evolve deliberately instead of holding on out of habit.',
      joinOriginNote:
        'JoinOrigin helps communities evolve — one room where format changes and announcements reach everyone. Revisit your format and venue quarterly on purpose.',
    },
  ],
};

export default content;
