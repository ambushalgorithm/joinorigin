import type { GuideContent } from '../../types';

/**
 * "How to Start a Community" — L1 evergreen guide (design §6.1, TASK-326).
 *
 * Re-centered on the digital connect→join→room model: publish the group →
 * room auto-created on publish → members join via link; venue/format
 * guidance stays as a downstream consequence, never the core. JoinOrigin
 * value is woven into the intro and every step (per-step `joinOriginNote`),
 * with honest framing — JoinOrigin does not run local events. Single H1,
 * step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD. "Room" is
 * pinned to the Matrix room (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'start-a-community',
  title: 'How to Start a Community: A Step-by-Step Guide | JoinOrigin',
  description:
    'Learn how to start a community from scratch — publish a group, open its room, and bring members in through a join link. Practical steps from JoinOrigin.',
  intro: [
    'The hardest part of starting a community is rarely the venue, the agenda, or the budget — it is finding the first people who share your interest and giving them one clear place to connect. That is exactly the problem JoinOrigin solves.',
    'JoinOrigin is a community OS built around the digital loop: you publish a group, its room is auto-created, and members join through a link. The room is where the community actually lives — a creator-controlled Matrix room where members talk, share updates, and plan together from day one, instead of scattering across spreadsheets, scattered messages, and sign-up forms. In-person events exist only as a downstream consequence: once a group forms and its room is alive, members may choose to meet in person — and JoinOrigin does not run local events. The entire point of the platform is connecting people who would otherwise never meet, which is why every step in this guide maps to something JoinOrigin helps with.',
    'The approach works for any community type: a founder circle, a book club, a local running group, a small business network, or an online professional community. The core principle is simple — people join because of a clear promise, and they stay because the experience reliably delivers on that promise. You do not need a big budget, a venue, or an existing audience to begin; you need a clear purpose, a realistic first step, and the discipline to repeat it.',
  ],
  dataPoints: [
    'Most successful communities begin with a narrow, specific audience rather than “everyone interested”.',
    'Publishing a group creates its room instantly — there is never a “create the chat later” step.',
    'A join link is the simplest invitation: one link, one click, and a new member is in the room.',
    'JoinOrigin is a community OS designed to help people find or start communities — it does not run local events or claim local staff.',
  ],
  faq: [
    {
      question: 'How long does it take to start a community?',
      answer:
        'You can publish a group and open its room within a few weeks if you keep the scope small: one purpose, one join link, and a steady stream of personal invitations. The community itself takes a few months of consistent participation in the room before it feels established.',
    },
    {
      question: 'Do I need money or a venue to start?',
      answer:
        'No. The digital core of a community — a published group and its room — costs nothing and needs no venue. Many groups later choose to meet in person; libraries, coffee shops, parks, and coworking lounges host first gatherings for free in most cities.',
    },
    {
      question: 'What is the most common mistake when starting a community?',
      answer:
        'Trying to serve everyone. A community with a vague purpose attracts few committed members. Define one specific audience and one clear outcome, put it on the group page, and let the community evolve from there.',
    },
    {
      question: 'How can JoinOrigin help me start a community?',
      answer:
        'Publishing a group on JoinOrigin auto-creates its room and members join through a link — one organized digital home for a community’s purpose, people, and conversation. JoinOrigin does not run local events, so the practical steps in this guide work on the platform and with the tools you already have.',
    },
  ],
  sections: [
    'Define a clear purpose. Decide who the community is for, what problem it solves, and what a successful member looks like. Write a one-sentence mission such as “a group for new founders in Brooklyn to share early-stage lessons”. JoinOrigin gives your purpose a home — a public group page where the mission, audience, and promise are visible to anyone searching for a group like yours. Write the mission down and keep it in front of every invitation.',
    'Publish the group and open its room. The digital core of a community is a published group with a room where members can talk. On JoinOrigin, publishing a group auto-creates its room — the creator owns it from second zero and can invite, remove, and assign roles inside Element. On JoinOrigin there is no “create the chat later” step: publish the group and the room exists immediately, with the creator as room owner. Set up the group home and its room in the tools you already use if you prefer.',
    'Share your join link. A join link is the simplest invitation there is: one link, one click, and a new member lands in the room. Put the link everywhere — your group page, personal messages, and the places your audience already gathers. Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your group does the job.',
    'Invite your first ten people personally. Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience, share the join link, and ask them to bring one other person. JoinOrigin makes discovery easier — a place where people looking for a community can find yours and join through a link. Personal invitations still do the heavy lifting, and every member you invite becomes a channel to their own network.',
    'Choose a format and cadence (a downstream choice). Once the group is forming, pick a recurring format — a monthly discussion, a weekly working session, a talk, or a social walk. Recurring beats one-off because habits are what turn strangers into members. This is a downstream choice: the group can gather in person later, but the room is already the community’s home. On JoinOrigin organizers can describe their format once and members can see what to expect before they join — which reduces the hesitation that stops first-timers. Choose your format and state it in every invite.',
    'Run a great first gathering. If members choose to meet in person — arrive early, greet every person, run a short introduction round, and end with a clear next date. The goal of the first meeting is not size; it is that everyone leaves wanting to return. JoinOrigin does not staff or run gatherings — the experience is yours to design. The platform helps the community form around it: one shared room where the date, recap, and next steps live.',
    'Collect feedback and iterate. After the first weeks, ask members what they want more or less of — in the room and at gatherings. Adjust the format, time, or venue based on their answers, not on what you imagined. JoinOrigin keeps a community’s shared memory in one place — notes, decisions, and what members asked for — so iteration is visible instead of lost. Ask members directly in the room after each gathering.',
    'Publish a consistent rhythm and grow slowly. Keep the same day and format for several months before expanding. Growth compounds through referrals when every member can describe what the community is in one sentence and share its join link. JoinOrigin helps your community stay findable and connected as it grows — one place where the rhythm, the promise, the room, and the people are visible. Get discovered and grow.',
  ],
  steps: [
    {
      title: 'Define a clear purpose',
      body: 'Decide who the community is for, what problem it solves, and what a successful member looks like. Write a one-sentence mission such as “a group for new founders in Brooklyn to share early-stage lessons”.',
      joinOriginNote:
        'JoinOrigin gives your purpose a home — a public group page where the mission, audience, and promise are visible to anyone searching for a group like yours. Write the mission down and keep it in front of every invitation.',
    },
    {
      title: 'Publish the group and open its room',
      body: 'The digital core of a community is a published group with a room where members can talk. On JoinOrigin, publishing a group auto-creates its room — the creator owns it from second zero and can invite, remove, and assign roles inside Element.',
      joinOriginNote:
        'On JoinOrigin there is no “create the chat later” step: publish the group and the room exists immediately, with the creator as room owner. Set up the group home and its room in the tools you already use if you prefer.',
    },
    {
      title: 'Share your join link',
      body: 'A join link is the simplest invitation there is: one link, one click, and a new member lands in the room. Put the link everywhere — your group page, personal messages, and the places your audience already gathers.',
      joinOriginNote:
        'Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your group does the job.',
    },
    {
      title: 'Invite your first ten people personally',
      body: 'Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience, share the join link, and ask them to bring one other person.',
      joinOriginNote:
        'JoinOrigin makes discovery easier — a place where people looking for a community can find yours and join through a link. Personal invitations still do the heavy lifting, and every member you invite becomes a channel to their own network.',
    },
    {
      title: 'Choose a format and cadence (a downstream choice)',
      body: 'Once the group is forming, pick a recurring format — a monthly discussion, a weekly working session, a talk, or a social walk. Recurring beats one-off because habits are what turn strangers into members. This is a downstream choice: the group can gather in person later, but the room is already the community’s home.',
      joinOriginNote:
        'On JoinOrigin organizers can describe their format once and members can see what to expect before they join — which reduces the hesitation that stops first-timers. Choose your format and state it in every invite.',
    },
    {
      title: 'Run a great first gathering',
      body: 'If members choose to meet in person — arrive early, greet every person, run a short introduction round, and end with a clear next date. The goal of the first meeting is not size; it is that everyone leaves wanting to return.',
      joinOriginNote:
        'JoinOrigin does not staff or run gatherings — the experience is yours to design. The platform helps the community form around it: one shared room where the date, recap, and next steps live.',
    },
    {
      title: 'Collect feedback and iterate',
      body: 'After the first weeks, ask members what they want more or less of — in the room and at gatherings. Adjust the format, time, or venue based on their answers, not on what you imagined.',
      joinOriginNote:
        'JoinOrigin keeps a community’s shared memory in one place — notes, decisions, and what members asked for — so iteration is visible instead of lost. Ask members directly in the room after each gathering.',
    },
    {
      title: 'Publish a consistent rhythm and grow slowly',
      body: 'Keep the same day and format for several months before expanding. Growth compounds through referrals when every member can describe what the community is in one sentence and share its join link.',
      joinOriginNote:
        'JoinOrigin helps your community stay findable and connected as it grows — one place where the rhythm, the promise, the room, and the people are visible. Get discovered and grow.',
    },
  ],
};

export default content;
