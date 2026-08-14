import type { GuideContent } from '../../types';

/**
 * "How to Keep a Community Active" — L1 evergreen guide (design §6.2,
 * TASK-320).
 *
 * Leads with how JoinOrigin solves the connecting-people problem behind
 * sustained engagement: one visible, organized home where the community
 * lives between events. JoinOrigin value is woven into the intro and every
 * step (per-step `joinOriginNote`), with honest early-access framing —
 * JoinOrigin does not manage communities or staff events. Single H1,
 * step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'keep-a-community-active',
  title: 'How to Keep a Community Active & Engaged | JoinOrigin',
  description:
    'Keep your community active between events — build rituals, share the organizer load, and create spaces for small contributions. Practical steps from JoinOrigin.',
  intro:
    'Most communities do not die from a bad launch; they die from silence between events — the moment when people stop feeling connected and quietly drift away. Keeping a community active is therefore a connecting-people problem: people stay when they feel they belong, and they feel they belong when there is a visible, organized place where the community lives. That is exactly what JoinOrigin is being built to be. JoinOrigin is a community OS in early access, designed to help people find, start, and organize communities — one shared home where rituals, updates, and contributions stay visible instead of scattering across group chats and shared drives. JoinOrigin does not manage communities or staff events, and early access is still on the waitlist, but the platform’s entire design intent is to keep communities connected between gatherings. This guide covers the practical mechanics of a healthy, active community: establishing rituals that make participation a habit, creating shared artifacts, distributing the organizer load so no single person burns out, opening small contribution paths so every member can add value, and measuring the signals that tell you whether the community is actually alive. Every step maps to how JoinOrigin is designed to help.',
  dataPoints: [
    'Recurring rituals — a fixed meeting day, a regular format, a shared artifact — convert interest into habit.',
    'Distributing roles across several organizers prevents burnout and keeps the community running when one person is busy.',
    'Small contribution paths (a shared doc, a rotating host, a member spotlight) make members feel ownership.',
    'JoinOrigin is a waitlist community OS designed to help people find, start, and organize communities; it does not manage communities or staff events.',
  ],
  faq: [
    {
      question: 'How often should an active community meet?',
      answer:
        'Monthly is the most sustainable baseline for in-person groups; weekly works for online communities and small local circles. Consistency matters more than frequency — a reliable monthly date beats a sporadic weekly one.',
    },
    {
      question: 'What do I do when engagement drops?',
      answer:
        'Do not panic or launch a big campaign. Ask members directly what they need, run one smaller and simpler gathering, and delegate one role to a member. Small, responsive changes revive engagement faster than volume.',
    },
    {
      question: 'How do I keep members engaged between events?',
      answer:
        'Create low-effort touchpoints: a shared document, a member spotlight, a regular check-in thread, or a “who is working on what” update. The goal is a visible heartbeat between events, not constant notifications.',
    },
    {
      question: 'Can JoinOrigin help me keep my community active?',
      answer:
        'JoinOrigin is being built to help people find, start, and organize communities — one shared home where the community stays visible between events — but it is still on a waitlist. The practices in this guide — rituals, shared roles, and small contributions — work today without any platform.',
    },
  ],
  sections: [
    'Define a core ritual. Pick one recurring practice that everyone can rely on: a monthly meeting, a weekly check-in, a shared reading, or a project update. Rituals create the heartbeat that keeps a community alive. JoinOrigin is being built so a community’s rhythm is visible in one organized place — members always know the next ritual. Today, pick one recurring practice and guard it.',
    'Create a shared artifact. Start a document or channel that captures what the community is doing — meeting notes, member intros, project updates. A living artifact keeps members oriented between events. JoinOrigin is designed to be the shared home where notes, intros, and updates live alongside the community — a living artifact by design. Today, a simple shared document works.',
    'Distribute the organizer load. Recruit two or three co-hosts or helpers and rotate small roles: welcoming, note-taking, topic selection, venue contact. Shared ownership is the best defense against burnout. JoinOrigin does not staff or manage communities — shared ownership is yours to build. The platform is designed to give helpers and organizers one place to coordinate. Today, recruit two or three co-hosts and rotate roles.',
    'Open small contribution paths. Give members ways to add value without big commitments: a member spotlight, a rotating discussion lead, a shared playlist or reading list, or a “help wanted” channel. JoinOrigin is being built so members have visible ways to contribute — a community where adding value is easy. Today, member spotlights and rotating leads create the same ownership.',
    'Keep a predictable communication rhythm. Send one short update per week or per month on a fixed schedule. Predictability builds trust; silence builds drift. JoinOrigin is designed to keep the community’s heartbeat in one place — one update, on a schedule, where everyone can see it. Today, one short weekly update builds trust.',
    'Watch the engagement signals. Track attendance, repeat attendance, and contribution rate. A healthy community grows its repeat rate before its total size — focus on the members who come back. JoinOrigin is being built so organizers can see how their community is doing in one organized space. Today, track attendance, repeat attendance, and contribution rate with a simple sheet.',
    'Ask for feedback regularly. Use a simple one-question survey after each gathering: what did you like, what would you change. Act on the answers and tell the community what you changed. JoinOrigin is designed to collect and keep feedback with the community it belongs to. Today, a one-question survey after each gathering works — then act on the answers.',
    'Adapt the format as the community matures. What worked for ten members may not fit fifty. Revisit the format, venue, and cadence quarterly, and evolve deliberately instead of holding on out of habit. JoinOrigin is designed to help communities evolve — one home where format changes and announcements reach everyone. Today, revisit your format and venue quarterly on purpose.',
  ],
  steps: [
    {
      title: 'Define a core ritual',
      body: 'Pick one recurring practice that everyone can rely on: a monthly meeting, a weekly check-in, a shared reading, or a project update. Rituals create the heartbeat that keeps a community alive.',
      joinOriginNote:
        'JoinOrigin is being built so a community’s rhythm is visible in one organized place — members always know the next ritual. Today, pick one recurring practice and guard it.',
    },
    {
      title: 'Create a shared artifact',
      body: 'Start a document or channel that captures what the community is doing — meeting notes, member intros, project updates. A living artifact keeps members oriented between events.',
      joinOriginNote:
        'JoinOrigin is designed to be the shared home where notes, intros, and updates live alongside the community — a living artifact by design. Today, a simple shared document works.',
    },
    {
      title: 'Distribute the organizer load',
      body: 'Recruit two or three co-hosts or helpers and rotate small roles: welcoming, note-taking, topic selection, venue contact. Shared ownership is the best defense against burnout.',
      joinOriginNote:
        'JoinOrigin does not staff or manage communities — shared ownership is yours to build. The platform is designed to give helpers and organizers one place to coordinate. Today, recruit two or three co-hosts and rotate roles.',
    },
    {
      title: 'Open small contribution paths',
      body: 'Give members ways to add value without big commitments: a member spotlight, a rotating discussion lead, a shared playlist or reading list, or a “help wanted” channel.',
      joinOriginNote:
        'JoinOrigin is being built so members have visible ways to contribute — a community where adding value is easy. Today, member spotlights and rotating leads create the same ownership.',
    },
    {
      title: 'Keep a predictable communication rhythm',
      body: 'Send one short update per week or per month on a fixed schedule. Predictability builds trust; silence builds drift.',
      joinOriginNote:
        'JoinOrigin is designed to keep the community’s heartbeat in one place — one update, on a schedule, where everyone can see it. Today, one short weekly update builds trust.',
    },
    {
      title: 'Watch the engagement signals',
      body: 'Track attendance, repeat attendance, and contribution rate. A healthy community grows its repeat rate before its total size — focus on the members who come back.',
      joinOriginNote:
        'JoinOrigin is being built so organizers can see how their community is doing in one organized space. Today, track attendance, repeat attendance, and contribution rate with a simple sheet.',
    },
    {
      title: 'Ask for feedback regularly',
      body: 'Use a simple one-question survey after each gathering: what did you like, what would you change. Act on the answers and tell the community what you changed.',
      joinOriginNote:
        'JoinOrigin is designed to collect and keep feedback with the community it belongs to. Today, a one-question survey after each gathering works — then act on the answers.',
    },
    {
      title: 'Adapt the format as the community matures',
      body: 'What worked for ten members may not fit fifty. Revisit the format, venue, and cadence quarterly, and evolve deliberately instead of holding on out of habit.',
      joinOriginNote:
        'JoinOrigin is designed to help communities evolve — one home where format changes and announcements reach everyone. Today, revisit your format and venue quarterly on purpose.',
    },
  ],
};

export default content;
