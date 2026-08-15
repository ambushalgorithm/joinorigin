import type { GuideContent } from '../../types';

/**
 * "How to Publish an Idea" — L1 evergreen guide (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: Discover → Idea
 * public page → Join via link → Room auto-created ON PUBLISH (D1) → creator
 * controls the room (D2) → feed/invite growth. The idea page is the public
 * promise; the room is where interested people gather and talk. Honest
 * waitlist framing only — the platform is still on the waitlist and these
 * features are not built yet, so the steps work today with existing tools.
 * "Room" is pinned to the Matrix room (§6.3). The phrase is never used in the authored copy.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'publish-an-idea',
  title: 'How to Publish an Idea: Turn a Spark Into a Findable Idea Page | JoinOrigin',
  description:
    'Publish an idea on JoinOrigin — write a public idea page, let its room open automatically, and invite the people who want to build it with you. Practical steps from JoinOrigin.',
  intro: [
    'Most ideas die in drafts — a note on a phone, a half-remembered conversation, a document no one else has ever seen. The reason is rarely that the idea is bad. It is that no one could find it, and finding the right people is the entire game. That connecting-people problem is exactly what JoinOrigin is being built to solve.',
    'The JoinOrigin design follows one loop: you publish an idea, a public idea page appears, and its room is auto-created at the moment of publishing (D1). People discover the page through Explore, or follow a link you share, and joining is a single click. They land in the room — a creator-controlled Matrix room where the conversation around the idea actually happens. JoinOrigin is still on the waitlist and these features are not built yet, so the practical steps in this guide work today with the tools you already have; the design simply shows you where the platform intends to help.',
    'This guide walks through the whole path: compressing the idea into one clear sentence, writing a page people can find, publishing it and opening the room, sharing the join link, inviting the first interested people, hosting the first conversation, refining the idea from real feedback, and keeping the idea findable as it grows. It works for any idea — a small business, a startup, a book club, a community project, or a product that does not exist yet.',
  ],
  dataPoints: [
    'A one-sentence idea pitch is more findable than a long document — clarity is a discovery feature.',
    'In the JoinOrigin design, publishing an idea auto-creates its room (D1) — there is never a separate “create the chat later” step.',
    'A join link is the simplest invitation: one link, one click, and an interested person is in the room.',
    'JoinOrigin is a waitlist community OS being designed to help people find ideas and the people behind them — the features described here are not built yet.',
  ],
  faq: [
    {
      question: 'What exactly is an idea page?',
      answer:
        'An idea page is the public, indexable home of an idea on JoinOrigin — a clear page stating what the idea is, why it matters, and who it is for, with a Join action. People discover it through Explore or a shared link, and joining leads them to the idea’s room.',
    },
    {
      question: 'When does the room get created?',
      answer:
        'In the JoinOrigin design, the room is auto-created the moment you publish the idea (D1). The creator owns the room from second zero and can invite, remove, and assign roles inside Element. Until the platform opens, you can set up the same shape — a public page plus a room — with tools you already use.',
    },
    {
      question: 'How do people find my idea?',
      answer:
        'Through discovery and sharing: an idea page is indexable and appears in Explore, and every join link you share points straight to it. The most reliable early traffic is personal — sharing the page and its link with people who already care about the problem.',
    },
    {
      question: 'What is the difference between an idea and a project?',
      answer:
        'An idea is a proposal around which people gather — the room is where interested people talk and test fit. A project is what a formed group starts doing together, with its own project page and room. Publish the idea first; the project follows when people commit.',
    },
    {
      question: 'Can JoinOrigin help me publish an idea today?',
      answer:
        'JoinOrigin is being designed so that publishing an idea creates its page and room atomically — but the platform is still on the waitlist and the features are not built yet. Today, publish your idea somewhere public and open a room for discussion; joining the waitlist keeps you first in line when the platform opens.',
    },
  ],
  sections: [
    'Define the idea in one clear sentence. Compress the idea into a single sentence: who it is for, what it changes, and why it matters. If you cannot say it in one sentence, you are not ready to publish it. JoinOrigin is designed around findable idea pages — a one-sentence pitch is the core of the page and the phrase people will search for. Until the platform opens, write the sentence down and test it on three people before you go further.',
    'Write the idea page with a promise and a need. The page should state the idea, why it matters, what it needs, and who you want to join. Be honest about where the idea is — a spark, a prototype, a product. JoinOrigin is being built so that publishing an idea auto-creates its page and room (D1); the creator controls the room from the start and can invite, remove, and assign roles inside Element. Until the platform opens, publish the idea somewhere public and open a room for discussion around it.',
    'Publish the idea and let its room open. Publishing is the moment the idea becomes findable. In the JoinOrigin model, publishing auto-creates the room (D1) — there is never a “create the chat later” step, and the creator owns the room from second zero. JoinOrigin is being designed so the idea page and its room are one atomic publish. Today, publishing can mean sharing the page publicly and setting up the room in the tools you already use.',
    'Share the join link. The join link is the shortest path from interest to connection: one link, one click, and an interested person lands in the room. Put it everywhere the right people gather. JoinOrigin is designed so joining is a single action — clicking Join on the public page or following a direct invite link from a member. Until the platform opens, one short, clear link to your idea does the same job.',
    'Invite the first interested people personally. Personal invitations convert better than public posts. Message people who fit the idea’s audience, share the join link, and ask them to bring one other person who might care. JoinOrigin is being built to make discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting today, and every joiner becomes a channel to their own network.',
    'Host the first conversation in the room. The first few conversations decide whether an idea has momentum. Open the room with a clear prompt — what is the problem, what is the first step, what do you each bring — and let people respond. JoinOrigin does not run these conversations; the room is yours to shape. The platform is designed to give the idea one room where interest becomes conversation, and the creator owns that room (D2). Today, start the conversation wherever your people already are.',
    'Collect feedback and refine the idea. Ask joiners what excites them, what worries them, and what they would do first. Adjust the pitch, the scope, or the next step based on their answers. JoinOrigin is being built to keep an idea’s shared memory in one place — notes, decisions, and feedback in the room — so refinement is visible instead of lost. Today, ask members directly in the room after the first week.',
    'Keep the idea findable as it grows. Revisit the page as the idea develops — update the promise, the needs, and the next step so new joiners always see the current version. Growth compounds when every member can describe the idea in one sentence and share its join link. JoinOrigin is designed to keep your idea page and its room connected as interest grows — one place where the promise, the conversation, and the people are visible. Joining the waitlist keeps you informed as the platform opens.',
  ],
  steps: [
    {
      title: 'Define the idea in one clear sentence',
      body: 'Compress the idea into a single sentence: who it is for, what it changes, and why it matters. If you cannot say it in one sentence, you are not ready to publish it.',
      joinOriginNote:
        'JoinOrigin is designed around findable idea pages — a one-sentence pitch is the core of the page and the phrase people will search for. Until the platform opens, write the sentence down and test it on three people before you go further.',
    },
    {
      title: 'Write the idea page with a promise and a need',
      body: 'The page should state the idea, why it matters, what it needs, and who you want to join. Be honest about where the idea is — a spark, a prototype, a product.',
      joinOriginNote:
        'JoinOrigin is being built so that publishing an idea auto-creates its page and room (D1); the creator controls the room from the start and can invite, remove, and assign roles inside Element. Until the platform opens, publish the idea somewhere public and open a room for discussion around it.',
    },
    {
      title: 'Publish the idea and let its room open',
      body: 'Publishing is the moment the idea becomes findable. In the JoinOrigin model, publishing auto-creates the room (D1) — there is never a “create the chat later” step, and the creator owns the room from second zero.',
      joinOriginNote:
        'JoinOrigin is being designed so the idea page and its room are one atomic publish. Today, publishing can mean sharing the page publicly and setting up the room in the tools you already use.',
    },
    {
      title: 'Share the join link',
      body: 'The join link is the shortest path from interest to connection: one link, one click, and an interested person lands in the room. Put it everywhere the right people gather.',
      joinOriginNote:
        'JoinOrigin is designed so joining is a single action — clicking Join on the public page or following a direct invite link from a member. Until the platform opens, one short, clear link to your idea does the same job.',
    },
    {
      title: 'Invite the first interested people personally',
      body: 'Personal invitations convert better than public posts. Message people who fit the idea’s audience, share the join link, and ask them to bring one other person who might care.',
      joinOriginNote:
        'JoinOrigin is being built to make discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting today, and every joiner becomes a channel to their own network.',
    },
    {
      title: 'Host the first conversation in the room',
      body: 'The first few conversations decide whether an idea has momentum. Open the room with a clear prompt — what is the problem, what is the first step, what do you each bring — and let people respond.',
      joinOriginNote:
        'JoinOrigin does not run these conversations; the room is yours to shape. The platform is designed to give the idea one room where interest becomes conversation, and the creator owns that room (D2). Today, start the conversation wherever your people already are.',
    },
    {
      title: 'Collect feedback and refine the idea',
      body: 'Ask joiners what excites them, what worries them, and what they would do first. Adjust the pitch, the scope, or the next step based on their answers.',
      joinOriginNote:
        'JoinOrigin is being built to keep an idea’s shared memory in one place — notes, decisions, and feedback in the room — so refinement is visible instead of lost. Today, ask members directly in the room after the first week.',
    },
    {
      title: 'Keep the idea findable as it grows',
      body: 'Revisit the page as the idea develops — update the promise, the needs, and the next step so new joiners always see the current version. Growth compounds when every member can describe the idea in one sentence and share its join link.',
      joinOriginNote:
        'JoinOrigin is designed to keep your idea page and its room connected as interest grows — one place where the promise, the conversation, and the people are visible. Joining the waitlist keeps you informed as the platform opens.',
    },
  ],
};

export default content;
