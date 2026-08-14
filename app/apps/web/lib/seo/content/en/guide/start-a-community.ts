import type { GuideContent } from '../../types';

/**
 * "How to Start a Community" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'start-a-community',
  title: 'How to Start a Community: A Step-by-Step Guide | JoinOrigin',
  description:
    'Learn how to start a community from scratch — define a purpose, find your first members, choose a format, and grow. Practical steps from JoinOrigin.',
  intro:
    'Starting a community is one of the most reliable ways to build a network of people who share an interest, a profession, or a goal — yet most first attempts stall because the organizer jumps into logistics before defining the why. This guide walks you through the entire journey from a blank page to a recurring gathering that people actually look forward to. The approach works for any community type: a meetup for founders, a book club, a local running group, a small business circle, or an online professional network. The core principle is simple — people join because of a clear promise, and they stay because the experience reliably delivers on that promise. You do not need a big budget, a venue, or an existing audience to begin; you need a clear purpose, a realistic first step, and the discipline to repeat it. The steps below are deliberately small so you can act today instead of waiting for the perfect plan. Each step builds on the last, and the honest advice throughout is that slow, consistent progress beats a dramatic launch that cannot be sustained.',
  dataPoints: [
    'Most successful communities begin with a narrow, specific audience rather than “everyone interested”.',
    'A first gathering can be held with zero budget in a public library, café, park, or coworking lounge.',
    'Communities that meet on a fixed, recurring cadence retain members far better than one-off events.',
    'JoinOrigin is a waitlist platform that will help people find or start communities — it does not run local events or claim local staff.',
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
        'JoinOrigin is building a platform to help people discover and start communities, but it is still on a waitlist and does not organize local events. The guides on this site give you practical, honest steps you can take today.',
    },
  ],
  sections: [
    'Define a clear purpose. Decide who the community is for, what problem it solves, and what a successful member looks like. Write a one-sentence mission such as “a monthly meetup for new founders in Brooklyn to share early-stage lessons”.',
    'Choose one format. Pick a recurring format that matches your audience: a monthly talk, a weekly coworking session, a discussion circle, or a social walk. Recurring beats one-off because habits are what turn strangers into members.',
    'Pick a free or low-cost venue. Libraries, cafés, parks, and coworking lounges host first gatherings in most cities. Ask the venue about regular slots so your community can build a rhythm from day one.',
    'Create a simple sign-up page. A single page with the purpose, format, date, and venue is enough. Share it in the places your audience already gathers — local newsletters, community boards, and niche online groups.',
    'Invite your first ten people personally. Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience and ask them to bring one other person.',
    'Run a great first gathering. Arrive early, greet every person, run a short introduction round, and end with a clear next date. The goal of the first meeting is not size — it is that everyone leaves wanting to return.',
    'Collect feedback and iterate. After the first two or three gatherings, ask members what they want more or less of. Adjust the format, time, or venue based on their answers, not on what you imagined.',
    'Publish a consistent rhythm and grow slowly. Keep the same day and format for several months before expanding. Growth compounds through referrals when every member can describe what the community is in one sentence.',
  ],
  steps: [
    {
      title: 'Define a clear purpose',
      body: 'Decide who the community is for, what problem it solves, and what a successful member looks like. Write a one-sentence mission such as “a monthly meetup for new founders in Brooklyn to share early-stage lessons”.',
    },
    {
      title: 'Choose one format',
      body: 'Pick a recurring format that matches your audience: a monthly talk, a weekly coworking session, a discussion circle, or a social walk. Recurring beats one-off because habits are what turn strangers into members.',
    },
    {
      title: 'Pick a free or low-cost venue',
      body: 'Libraries, cafés, parks, and coworking lounges host first gatherings in most cities. Ask the venue about regular slots so your community can build a rhythm from day one.',
    },
    {
      title: 'Create a simple sign-up page',
      body: 'A single page with the purpose, format, date, and venue is enough. Share it in the places your audience already gathers — local newsletters, community boards, and niche online groups.',
    },
    {
      title: 'Invite your first ten people personally',
      body: 'Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience and ask them to bring one other person.',
    },
    {
      title: 'Run a great first gathering',
      body: 'Arrive early, greet every person, run a short introduction round, and end with a clear next date. The goal of the first meeting is not size — it is that everyone leaves wanting to return.',
    },
    {
      title: 'Collect feedback and iterate',
      body: 'After the first two or three gatherings, ask members what they want more or less of. Adjust the format, time, or venue based on their answers, not on what you imagined.',
    },
    {
      title: 'Publish a consistent rhythm and grow slowly',
      body: 'Keep the same day and format for several months before expanding. Growth compounds through referrals when every member can describe what the community is in one sentence.',
    },
  ],
};

export default content;
