import type { GuideContent } from '../../types';

/**
 * "How to Keep a Community Active" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'keep-a-community-active',
  title: 'How to Keep a Community Active & Engaged | JoinOrigin',
  description:
    'Keep your community active between events — build rituals, share the organizer load, and create spaces for small contributions. Practical steps from JoinOrigin.',
  intro:
    'Most communities do not die from a bad launch; they die from silence between events. The honeymoon period — the first few meetings where everyone is excited — masks the harder problem of sustaining engagement week after week. Keeping a community active is not about producing more content or running bigger events; it is about designing a rhythm that gives people a reason to show up, contribute, and feel that they belong. This guide covers the practical mechanics of a healthy, active community: establishing rituals that make participation a habit, distributing the organizer load so no single person burns out, creating small contribution paths so every member can add value, and measuring the signals that tell you whether the community is actually alive. The honest truth is that an active community is the product of many small, consistent choices — a posted agenda, a shared note, a regular check-in — rather than one dramatic campaign. None of this requires a platform, and it all works today with tools you already have.',
  dataPoints: [
    'Recurring rituals — a fixed meeting day, a regular format, a shared artifact — convert interest into habit.',
    'Distributing roles across several organizers prevents burnout and keeps the community running when one person is busy.',
    'Small contribution paths (a shared doc, a rotating host, a member spotlight) make members feel ownership.',
    'JoinOrigin is a waitlist platform that will help people find or start communities; it does not manage communities or staff events.',
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
        'JoinOrigin is building a platform to help people find, start, and organize communities, but it is still on a waitlist. The practices in this guide — rituals, shared roles, and small contributions — work today without any platform.',
    },
  ],
  sections: [
    'Define a core ritual. Pick one recurring practice that everyone can rely on: a monthly meeting, a weekly check-in, a shared reading, or a project update. Rituals create the heartbeat that keeps a community alive.',
    'Create a shared artifact. Start a document or channel that captures what the community is doing — meeting notes, member intros, project updates. A living artifact keeps members oriented between events.',
    'Distribute the organizer load. Recruit two or three co-hosts or helpers and rotate small roles: welcoming, note-taking, topic selection, venue contact. Shared ownership is the best defense against burnout.',
    'Open small contribution paths. Give members ways to add value without big commitments: a member spotlight, a rotating discussion lead, a shared playlist or reading list, or a “help wanted” channel.',
    'Keep a predictable communication rhythm. Send one short update per week or per month on a fixed schedule. Predictability builds trust; silence builds drift.',
    'Watch the engagement signals. Track attendance, repeat attendance, and contribution rate. A healthy community grows its repeat rate before its total size — focus on the members who come back.',
    'Ask for feedback regularly. Use a simple one-question survey after each gathering: what did you like, what would you change. Act on the answers and tell the community what you changed.',
    'Adapt the format as the community matures. What worked for ten members may not fit fifty. Revisit the format, venue, and cadence quarterly, and evolve deliberately instead of holding on out of habit.',
  ],
  steps: [
    {
      title: 'Define a core ritual',
      body: 'Pick one recurring practice that everyone can rely on: a monthly meeting, a weekly check-in, a shared reading, or a project update. Rituals create the heartbeat that keeps a community alive.',
    },
    {
      title: 'Create a shared artifact',
      body: 'Start a document or channel that captures what the community is doing — meeting notes, member intros, project updates. A living artifact keeps members oriented between events.',
    },
    {
      title: 'Distribute the organizer load',
      body: 'Recruit two or three co-hosts or helpers and rotate small roles: welcoming, note-taking, topic selection, venue contact. Shared ownership is the best defense against burnout.',
    },
    {
      title: 'Open small contribution paths',
      body: 'Give members ways to add value without big commitments: a member spotlight, a rotating discussion lead, a shared playlist or reading list, or a “help wanted” channel.',
    },
    {
      title: 'Keep a predictable communication rhythm',
      body: 'Send one short update per week or per month on a fixed schedule. Predictability builds trust; silence builds drift.',
    },
    {
      title: 'Watch the engagement signals',
      body: 'Track attendance, repeat attendance, and contribution rate. A healthy community grows its repeat rate before its total size — focus on the members who come back.',
    },
    {
      title: 'Ask for feedback regularly',
      body: 'Use a simple one-question survey after each gathering: what did you like, what would you change. Act on the answers and tell the community what you changed.',
    },
    {
      title: 'Adapt the format as the community matures',
      body: 'What worked for ten members may not fit fifty. Revisit the format, venue, and cadence quarterly, and evolve deliberately instead of holding on out of habit.',
    },
  ],
};

export default content;
