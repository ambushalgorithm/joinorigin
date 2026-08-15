import type { GuideContent } from '../../types';

/**
 * "How to Publish a Startup Concept" — L1 evergreen guide
 * (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: publish a startup
 * concept → idea public page → Join via link → room auto-created ON PUBLISH
 * (D1) → creator controls the room (D2) → feed/invite growth. The idea page
 * is the concept's public promise; the room is where early believers,
 * potential co-founders, and first testers gather around the startup. Honest
 * waitlist framing only — the platform is still on the waitlist and these
 * features are not built yet. "Room" is pinned to the Matrix room (§6.3).
 * The phrase is never used in the authored copy.
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
    'JoinOrigin is being designed around the digital loop: you publish a startup concept, its public idea page appears, and its room is auto-created at the moment of publishing (D1). People discover the page or follow a link, joining is a single click, and they land in the room — a creator-controlled Matrix room where early believers can ask questions, potential co-founders can test fit, and first users can give feedback. JoinOrigin is still on the waitlist and these features are not built yet, so the practical steps in this guide work today with the tools you already have.',
    'This guide walks through publishing a startup concept like an operator: compressing the concept into one sentence, writing the page with honest signals, publishing it and opening the room, sharing it with founder communities, inviting early believers and testers, running structured conversations, using the room to form a trial team, and feeding the room into the feed as the concept is validated.',
  ],
  dataPoints: [
    'A startup concept compressed into one sentence is easier to share, test, and staff than a long business plan.',
    'In the JoinOrigin design, publishing a concept auto-creates its room (D1) — the startup has a place for believers and testers from the start.',
    'A join link is the simplest invitation: one link, one click, and an interested person is in the room.',
    'JoinOrigin is a waitlist community OS being designed to help people find ideas and the people behind them — the features described here are not built yet.',
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
        'In the JoinOrigin design, the room is auto-created the moment you publish the concept (D1). The creator owns the room from second zero and can invite, remove, and assign roles inside Element. Until the platform opens, open a room with the tools you already use and invite the people who share the ambition.',
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
        'JoinOrigin is being designed so that publishing a concept creates its page and room atomically — but the platform is still on the waitlist and the features are not built yet. Today, publish the concept somewhere public and open a room for discussion; joining the waitlist keeps you informed as the platform opens.',
    },
  ],
  sections: [
    'Compress the concept into one sentence. Reduce the startup to its core: the problem, the approach, and who it is for. If you cannot say it in one sentence, the concept is not ready to publish. JoinOrigin is designed around findable idea pages, and a one-sentence pitch is the core of the page. Until the platform opens, write the sentence down and test it on three people who understand the problem.',
    'Write the page with honest signals. State the problem, the approach, the stage — idea, prototype, or product — and the specific help you need. Honesty attracts the right people. JoinOrigin is being built so that publishing a concept auto-creates its page and room (D1), with the creator controlling the room from the start. Today, draft the page as a short public post and iterate with feedback.',
    'Publish the concept and open its room. Publishing is the moment the concept becomes findable. In the JoinOrigin model, the room is auto-created at the same moment (D1) — there is no separate setup step, and the creator owns it. JoinOrigin is being designed so the page, the room, and the join link are one publish. Today, publish the concept publicly and open a room for the conversation around it.',
    'Share the concept with founder communities. Startups grow through founder networks. Share the idea page with founder groups, startup communities, accelerators, and anyone who knows the problem. JoinOrigin is designed so joining is a single action — clicking Join on the public page or following a direct invite link from a member. Until the platform opens, one short, clear link to your concept does the same job.',
    'Invite early believers and testers. Invite the people who share the ambition: potential co-founders, domain experts, and users willing to try a rough version. JoinOrigin is being built to make discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting today, and every joiner becomes a channel to their own network.',
    'Run structured conversations in the room. Ask joiners what excites them, what worries them, and what they would do first. A startup room is a continuous interview — the answers shape the concept. JoinOrigin does not run these conversations; the room is yours to shape. The platform is designed to give the concept one room where interest becomes insight, and the creator owns that room (D2). Today, run the conversations directly in the room.',
    'Use the room to form a trial team. When the right people show up, propose a small trial — a prototype, a landing page, or a working session — and see how the team works together. JoinOrigin is being built so communities have a shared room for their work and projects, which is a natural place for a trial to surface. Today, a small real prototype is the most reliable test of fit.',
    'Feed the room into the feed as you validate. Keep posting updates, keep the room alive, and let the concept’s momentum become visible to a wider network. The feed turns a concept into proof that people care. JoinOrigin is designed so room updates flow into the feed — the growth loop where each new member expands the discovery surface. Joining the waitlist keeps you informed as the platform opens.',
  ],
  steps: [
    {
      title: 'Compress the concept into one sentence',
      body: 'Reduce the startup to its core: the problem, the approach, and who it is for. If you cannot say it in one sentence, the concept is not ready to publish.',
      joinOriginNote:
        'JoinOrigin is designed around findable idea pages, and a one-sentence pitch is the core of the page. Until the platform opens, write the sentence down and test it on three people who understand the problem.',
    },
    {
      title: 'Write the page with honest signals',
      body: 'State the problem, the approach, the stage — idea, prototype, or product — and the specific help you need. Honesty attracts the right people.',
      joinOriginNote:
        'JoinOrigin is being built so that publishing a concept auto-creates its page and room (D1), with the creator controlling the room from the start. Today, draft the page as a short public post and iterate with feedback.',
    },
    {
      title: 'Publish the concept and open its room',
      body: 'Publishing is the moment the concept becomes findable. In the JoinOrigin model, the room is auto-created at the same moment (D1) — there is no separate setup step, and the creator owns it.',
      joinOriginNote:
        'JoinOrigin is being designed so the page, the room, and the join link are one publish. Today, publish the concept publicly and open a room for the conversation around it.',
    },
    {
      title: 'Share the concept with founder communities',
      body: 'Startups grow through founder networks. Share the idea page with founder groups, startup communities, accelerators, and anyone who knows the problem.',
      joinOriginNote:
        'JoinOrigin is designed so joining is a single action — clicking Join on the public page or following a direct invite link from a member. Until the platform opens, one short, clear link to your concept does the same job.',
    },
    {
      title: 'Invite early believers and testers',
      body: 'Invite the people who share the ambition: potential co-founders, domain experts, and users willing to try a rough version.',
      joinOriginNote:
        'JoinOrigin is being built to make discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting today, and every joiner becomes a channel to their own network.',
    },
    {
      title: 'Run structured conversations in the room',
      body: 'Ask joiners what excites them, what worries them, and what they would do first. A startup room is a continuous interview — the answers shape the concept.',
      joinOriginNote:
        'JoinOrigin does not run these conversations; the room is yours to shape. The platform is designed to give the concept one room where interest becomes insight, and the creator owns that room (D2). Today, run the conversations directly in the room.',
    },
    {
      title: 'Use the room to form a trial team',
      body: 'When the right people show up, propose a small trial — a prototype, a landing page, or a working session — and see how the team works together.',
      joinOriginNote:
        'JoinOrigin is being built so communities have a shared room for their work and projects, which is a natural place for a trial to surface. Today, a small real prototype is the most reliable test of fit.',
    },
    {
      title: 'Feed the room into the feed as you validate',
      body: 'Keep posting updates, keep the room alive, and let the concept’s momentum become visible to a wider network. The feed turns a concept into proof that people care.',
      joinOriginNote:
        'JoinOrigin is designed so room updates flow into the feed — the growth loop where each new member expands the discovery surface. Joining the waitlist keeps you informed as the platform opens.',
    },
  ],
};

export default content;
