import type { GuideContent } from '../../types';

/**
 * "How to Publish a Startup Concept" — L1 evergreen guide
 * (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: publish a startup
 * concept → idea public page → Join via link → room auto-created ON PUBLISH
 * → creator controls the room → feed/invite growth. The idea page
 * is the concept's public promise; the room is where early believers,
 * potential co-founders, and first testers gather around the startup. The
 * platform is live: publishing a concept creates its page and room now.
 * "Room" is pinned to the Matrix room (§6.3). The phrase is never used in
 * the authored copy.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'publish-a-startup-concept',
  title: 'How to Publish a Startup Concept: Idea Page + Room | JoinOrigin',
  description:
    'Publish a startup concept on JoinOrigin — write a public idea page, open its room automatically, and gather early believers, co-founders, and first testers around the idea. Practical steps from JoinOrigin.',
  intro: [
    'Every startup begins as a concept that needs people more than it needs capital: a founder who can build it, a team that can ship it, and users who will test it. A concept no one can find gathers none of those. Publishing the concept as a findable idea page, then opening a room where the conversation can happen, is the honest first step of building a startup — not the deck, not the logo, not the pitch.',
    'The JoinOrigin loop works like this: you publish a startup concept, its public idea page appears, and its room is auto-created at the moment of publishing. People discover the page or follow a link, joining is a single click, and they land in the room — a creator-controlled Matrix room where early believers can ask questions, potential co-founders can test fit, and first users can give feedback. The creator owns the room from second zero and decides who joins and what happens inside.',
    'This guide walks through publishing a startup concept like an operator: compressing the concept into one sentence, writing the page with honest signals, publishing it and opening the room, sharing it with founder communities, inviting early believers and testers, running structured conversations, using the room to form a trial team, and feeding the room into the feed as the concept is validated.',
  ],
  dataPoints: [
    'A startup concept compressed into one sentence is easier to share, test, and staff than a long business plan.',
    'On JoinOrigin, publishing a concept auto-creates its room — the startup has a place for believers and testers from the start.',
    'A join link is the simplest invitation: one link, one click, and an interested person is in the room.',
    'JoinOrigin is a community OS that helps people find ideas and the people behind them — publish your concept and its room opens immediately.',
  ],
  faq: [
    {
      question: 'How is a startup concept different from a small business idea page?',
      answer:
        'The page format is the same, but the emphasis shifts: a small business idea centers on a customer and an offer, while a startup concept centers on an ambitious problem and the team needed to solve it. A startup page attracts early believers, potential co-founders, and first testers rather than local customers.',
    },
    {
      question: 'When is the room created for my startup concept?',
      answer:
        'The room is auto-created the moment you publish the concept. The creator owns the room from second zero and can invite, remove, and assign roles inside Element. You can also open a room with the tools you already use and invite the people who share the ambition.',
    },
    {
      question: 'Who should join a startup concept room?',
      answer:
        'Early believers who share the problem, potential co-founders testing fit, and first users willing to try a rough version. The room is where you find the people who turn a concept into a team — the same people warm introductions would take months to reach.',
    },
    {
      question: 'What makes a good startup concept page?',
      answer:
        'One honest sentence about the problem and the approach, the stage of the concept, and the specific help you need — a builder, a designer, a domain expert, first testers. Honesty about the stage attracts the right people; overclaiming attracts no one.',
    },
    {
      question: 'Can JoinOrigin help me publish a startup concept today?',
      answer:
        'Yes. Publishing a concept on JoinOrigin creates its page and room atomically — the room opens the moment you publish, and you control it from the start. Publish the concept somewhere public and open a room for discussion; every new member you invite expands your reach.',
    },
  ],
  sections: [
    'Compress the concept into one sentence. Reduce the startup to its core: the problem, the approach, and who it is for. If you cannot say it in one sentence, the concept is not ready to publish. JoinOrigin is designed around findable idea pages, and a one-sentence pitch is the core of the page. Write the sentence down and test it on three people who understand the problem.',
    'Write the page with honest signals. State the problem, the approach, the stage — idea, prototype, or product — and the specific help you need. Honesty attracts the right people. Publishing a concept on JoinOrigin auto-creates its page and room, with the creator controlling the room from the start. Draft the page as a short public post and iterate with feedback.',
    'Publish the concept and open its room. Publishing is the moment the concept becomes findable. On JoinOrigin, the room is auto-created at the same moment — there is no separate setup step, and the creator owns it. On JoinOrigin the page, the room, and the join link are one publish. Publish the concept publicly and open a room for the conversation around it.',
    'Share the concept with founder communities. Startups grow through founder networks. Share the idea page with founder groups, startup communities, accelerators, and anyone who knows the problem. Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your concept does the job.',
    'Invite early believers and testers. Invite the people who share the ambition: potential co-founders, domain experts, and users willing to try a rough version. JoinOrigin makes discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting, and every joiner becomes a channel to their own network.',
    'Run structured conversations in the room. Ask joiners what excites them, what worries them, and what they would do first. A startup room is a continuous interview — the answers shape the concept. JoinOrigin does not run these conversations; the room is yours to shape. The platform gives the concept one room where interest becomes insight, and the creator owns that room. Run the conversations directly in the room.',
    'Use the room to form a trial team. When the right people show up, propose a small trial — a prototype, a landing page, or a working session — and see how the team works together. JoinOrigin gives communities a shared room for their work and projects, which is a natural place for a trial to surface. A small real prototype is the most reliable test of fit.',
    'Feed the room into the feed as you validate. Keep posting updates, keep the room alive, and let the concept’s momentum become visible to a wider network. The feed turns a concept into proof that people care. On JoinOrigin room updates flow into the feed — the growth loop where each new member expands the discovery surface. Get discovered and grow.',
  ],
  steps: [
    {
      title: 'Compress the concept into one sentence',
      body: 'Reduce the startup to its core: the problem, the approach, and who it is for. If you cannot say it in one sentence, the concept is not ready to publish.',
      joinOriginNote:
        'JoinOrigin is designed around findable idea pages, and a one-sentence pitch is the core of the page. Write the sentence down and test it on three people who understand the problem.',
    },
    {
      title: 'Write the page with honest signals',
      body: 'State the problem, the approach, the stage — idea, prototype, or product — and the specific help you need. Honesty attracts the right people.',
      joinOriginNote:
        'Publishing a concept on JoinOrigin auto-creates its page and room, with the creator controlling the room from the start. Draft the page as a short public post and iterate with feedback.',
    },
    {
      title: 'Publish the concept and open its room',
      body: 'Publishing is the moment the concept becomes findable. On JoinOrigin, the room is auto-created at the same moment — there is no separate setup step, and the creator owns it.',
      joinOriginNote:
        'On JoinOrigin the page, the room, and the join link are one publish. Publish the concept publicly and open a room for the conversation around it.',
    },
    {
      title: 'Share the concept with founder communities',
      body: 'Startups grow through founder networks. Share the idea page with founder groups, startup communities, accelerators, and anyone who knows the problem.',
      joinOriginNote:
        'Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your concept does the job.',
    },
    {
      title: 'Invite early believers and testers',
      body: 'Invite the people who share the ambition: potential co-founders, domain experts, and users willing to try a rough version.',
      joinOriginNote:
        'JoinOrigin makes discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting, and every joiner becomes a channel to their own network.',
    },
    {
      title: 'Run structured conversations in the room',
      body: 'Ask joiners what excites them, what worries them, and what they would do first. A startup room is a continuous interview — the answers shape the concept.',
      joinOriginNote:
        'JoinOrigin does not run these conversations; the room is yours to shape. The platform gives the concept one room where interest becomes insight, and the creator owns that room. Run the conversations directly in the room.',
    },
    {
      title: 'Use the room to form a trial team',
      body: 'When the right people show up, propose a small trial — a prototype, a landing page, or a working session — and see how the team works together.',
      joinOriginNote:
        'JoinOrigin gives communities a shared room for their work and projects, which is a natural place for a trial to surface. A small real prototype is the most reliable test of fit.',
    },
    {
      title: 'Feed the room into the feed as you validate',
      body: 'Keep posting updates, keep the room alive, and let the concept’s momentum become visible to a wider network. The feed turns a concept into proof that people care.',
      joinOriginNote:
        'On JoinOrigin room updates flow into the feed — the growth loop where each new member expands the discovery surface. Get discovered and grow.',
    },
  ],
};

export default content;
