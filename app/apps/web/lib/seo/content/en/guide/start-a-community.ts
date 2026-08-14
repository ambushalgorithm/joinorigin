import type { GuideContent } from '../../types';

/**
 * "How to Start a Community" — L1 evergreen guide (design §6.2, TASK-320).
 *
 * Leads with how JoinOrigin solves the connecting-people problem: finding
 * or starting a community. JoinOrigin value is woven into the intro and
 * every step (per-step `joinOriginNote`), with honest early-access framing
 * — JoinOrigin is on a waitlist and does not run local events. Single H1,
 * step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'start-a-community',
  title: 'How to Start a Community: A Step-by-Step Guide | JoinOrigin',
  description:
    'Learn how to start a community from scratch — define a purpose, find your first members, choose a format, and grow. Practical steps from JoinOrigin, with how the platform is designed to help.',
  intro:
    'The hardest part of starting a community is rarely the venue, the agenda, or the budget — it is finding the first people who share your interest and giving them one clear place to gather. That is exactly the problem JoinOrigin is being built to solve. JoinOrigin is a community OS in early access, designed to help people find communities to join and start their own: a single organized home where your purpose, members, and events come together instead of scattering across spreadsheets, chat threads, and sign-up forms. While early access is still on the waitlist and JoinOrigin does not run local events, the entire point of the platform is connecting people who would otherwise never meet — which is why every step in this guide maps to something JoinOrigin is designed to help with. The approach works for any community type: a meetup for founders, a book club, a local running group, a small business circle, or an online professional network. The core principle is simple — people join because of a clear promise, and they stay because the experience reliably delivers on that promise. You do not need a big budget, a venue, or an existing audience to begin; you need a clear purpose, a realistic first step, and the discipline to repeat it. Each step below is deliberately small so you can act today, and the honest advice throughout is that slow, consistent progress beats a dramatic launch that cannot be sustained.',
  dataPoints: [
    'Most successful communities begin with a narrow, specific audience rather than “everyone interested”.',
    'A first gathering can be held with zero budget in a public library, café, park, or coworking lounge.',
    'Communities that meet on a fixed, recurring cadence retain members far better than one-off events.',
    'JoinOrigin is a waitlist community OS being designed to help people find or start communities — it does not run local events or claim local staff.',
  ],
  faq: [
    {
      question: 'How long does it take to start a community?',
      answer:
        'You can host a first gathering within a few weeks if you keep the scope small: one purpose, one format, one venue, and a simple sign-up page. The community itself takes a few months of consistent meetings before it feels established.',
    },
    {
      question: 'Do I need money or a venue to start?',
      answer:
        'No. Libraries, coffee shops, parks, coworking lounges, and community centers host first gatherings for free in most cities. Many successful communities start with five to ten people in a public space before moving to paid venues.',
    },
    {
      question: 'What is the most common mistake when starting a community?',
      answer:
        'Trying to serve everyone. A community with a vague purpose attracts few committed members. Define one specific audience and one clear outcome, then let the community evolve from there.',
    },
    {
      question: 'How can JoinOrigin help me start a community?',
      answer:
        'JoinOrigin is being built to help people discover and start communities — one organized home for a community’s purpose, members, and events. It is still on a waitlist and does not organize local events, so the practical steps in this guide work today, and joining the waitlist keeps you first in line for early access.',
    },
  ],
  sections: [
    'Define a clear purpose. Decide who the community is for, what problem it solves, and what a successful member looks like. Write a one-sentence mission such as “a monthly meetup for new founders in Brooklyn to share early-stage lessons”. JoinOrigin is designed to give your purpose a home — a community page where the mission, audience, and promise are visible to anyone searching for a group like yours. Until early access opens, write the mission down and keep it in front of every invitation.',
    'Choose one format. Pick a recurring format that matches your audience: a monthly talk, a weekly coworking session, a discussion circle, or a social walk. Recurring beats one-off because habits are what turn strangers into members. JoinOrigin is being built so organizers can describe their format once and members can see what to expect before they join — which reduces the hesitation that stops first-timers. Today, choose your format and state it in every invite.',
    'Pick a free or low-cost venue. Libraries, cafés, parks, and coworking lounges host first gatherings in most cities. Ask the venue about regular slots so your community can build a rhythm from day one. JoinOrigin does not book venues or run events — what it is designed to help with is connecting people: when early access opens, members who find your community can see where and how it gathers. For now, ask venues directly about free slots.',
    'Create a simple sign-up page. A single page with the purpose, format, date, and venue is enough. Share it in the places your audience already gathers — local newsletters, community boards, and niche online groups. JoinOrigin is designed to replace scattered sign-up links with one organized community home where people can find your group and join in a single place. Until then, a single page with purpose, format, date, and venue is enough.',
    'Invite your first ten people personally. Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience and ask them to bring one other person. JoinOrigin is being built to make discovery easier — a place where people looking for a community can find yours. Personal invitations still do the heavy lifting today, and every member you invite becomes a channel to their own network.',
    'Run a great first gathering. Arrive early, greet every person, run a short introduction round, and end with a clear next date. The goal of the first meeting is not size — it is that everyone leaves wanting to return. JoinOrigin does not staff or run gatherings — the experience is yours to design. The platform is designed to help the community form around it: one shared home where the date, recap, and next steps live.',
    'Collect feedback and iterate. After the first two or three gatherings, ask members what they want more or less of. Adjust the format, time, or venue based on their answers, not on what you imagined. JoinOrigin is being built to keep a community’s shared memory in one place — notes, decisions, and what members asked for — so iteration is visible instead of lost. Today, ask members directly after each gathering.',
    'Publish a consistent rhythm and grow slowly. Keep the same day and format for several months before expanding. Growth compounds through referrals when every member can describe what the community is in one sentence. JoinOrigin is designed to help your community stay findable and connected as it grows — one place where the rhythm, the promise, and the people are visible. Joining the waitlist keeps you informed as early access opens.',
  ],
  steps: [
    {
      title: 'Define a clear purpose',
      body: 'Decide who the community is for, what problem it solves, and what a successful member looks like. Write a one-sentence mission such as “a monthly meetup for new founders in Brooklyn to share early-stage lessons”.',
      joinOriginNote:
        'JoinOrigin is designed to give your purpose a home — a community page where the mission, audience, and promise are visible to anyone searching for a group like yours. Until early access opens, write the mission down and keep it in front of every invitation.',
    },
    {
      title: 'Choose one format',
      body: 'Pick a recurring format that matches your audience: a monthly talk, a weekly coworking session, a discussion circle, or a social walk. Recurring beats one-off because habits are what turn strangers into members.',
      joinOriginNote:
        'JoinOrigin is being built so organizers can describe their format once and members can see what to expect before they join — which reduces the hesitation that stops first-timers. Today, choose your format and state it in every invite.',
    },
    {
      title: 'Pick a free or low-cost venue',
      body: 'Libraries, cafés, parks, and coworking lounges host first gatherings in most cities. Ask the venue about regular slots so your community can build a rhythm from day one.',
      joinOriginNote:
        'JoinOrigin does not book venues or run events — what it is designed to help with is connecting people: when early access opens, members who find your community can see where and how it gathers. For now, ask venues directly about free slots.',
    },
    {
      title: 'Create a simple sign-up page',
      body: 'A single page with the purpose, format, date, and venue is enough. Share it in the places your audience already gathers — local newsletters, community boards, and niche online groups.',
      joinOriginNote:
        'JoinOrigin is designed to replace scattered sign-up links with one organized community home where people can find your group and join in a single place. Until then, a single page with purpose, format, date, and venue is enough.',
    },
    {
      title: 'Invite your first ten people personally',
      body: 'Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience and ask them to bring one other person.',
      joinOriginNote:
        'JoinOrigin is being built to make discovery easier — a place where people looking for a community can find yours. Personal invitations still do the heavy lifting today, and every member you invite becomes a channel to their own network.',
    },
    {
      title: 'Run a great first gathering',
      body: 'Arrive early, greet every person, run a short introduction round, and end with a clear next date. The goal of the first meeting is not size — it is that everyone leaves wanting to return.',
      joinOriginNote:
        'JoinOrigin does not staff or run gatherings — the experience is yours to design. The platform is designed to help the community form around it: one shared home where the date, recap, and next steps live.',
    },
    {
      title: 'Collect feedback and iterate',
      body: 'After the first two or three gatherings, ask members what they want more or less of. Adjust the format, time, or venue based on their answers, not on what you imagined.',
      joinOriginNote:
        'JoinOrigin is being built to keep a community’s shared memory in one place — notes, decisions, and what members asked for — so iteration is visible instead of lost. Today, ask members directly after each gathering.',
    },
    {
      title: 'Publish a consistent rhythm and grow slowly',
      body: 'Keep the same day and format for several months before expanding. Growth compounds through referrals when every member can describe what the community is in one sentence.',
      joinOriginNote:
        'JoinOrigin is designed to help your community stay findable and connected as it grows — one place where the rhythm, the promise, and the people are visible. Joining the waitlist keeps you informed as early access opens.',
    },
  ],
};

export default content;
