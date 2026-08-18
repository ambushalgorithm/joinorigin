import type { GuideContent } from '../../types';

/**
 * "How to Publish an Idea" — L1 evergreen guide (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: Discover → Idea
 * public page → Join via link → Room auto-created ON PUBLISH → creator
 * controls the room → feed/invite growth. The idea page is the public
 * promise; the room is where interested people gather and talk. The
 * platform is live: publishing an idea creates its page and room now.
 * "Room" is pinned to the Matrix room (§6.3). The phrase is never used in the authored copy.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'publish-an-idea',
  title: 'How to Publish an Idea: Turn a Spark Into a Findable Idea Page | JoinOrigin',
  description:
    'Publish an idea on JoinOrigin — whether it is a new spark or an existing project you want people to find — write a public idea page, let its room open automatically, and invite the people who want to build it with you. Practical steps from JoinOrigin.',
  intro: [
    'Most ideas die in drafts — a note on a phone, a half-remembered conversation, a document no one else has ever seen. The reason is rarely that the idea is bad. It is that no one could find it, and finding the right people is the entire game. That connecting-people problem is exactly what JoinOrigin solves — whether the idea is a fresh spark or an existing project that has been quietly moving forward without a findable home.',
    'The JoinOrigin loop works like this: you publish an idea, a public idea page appears, and its room is auto-created at the moment of publishing. People discover the page through Explore or follow a link you share, and joining is a single click. They land in the room — a creator-controlled Matrix room where the conversation around the idea actually happens. The creator owns the room from second zero and decides who joins and what happens inside.',
    'This guide walks through the whole path: compressing the idea into one clear sentence, writing a page people can find, publishing it and opening the room, sharing the join link, inviting the first interested people, hosting the first conversation, refining the idea from real feedback, and keeping the idea findable as it grows. It works for any idea — a small business, a startup, a book club, a community project, a product that does not exist yet, or a project that already exists and needs more people around it.',
  ],
  dataPoints: [
    'A one-sentence idea pitch is more findable than a long document — clarity is a discovery feature.',
    'On JoinOrigin, publishing an idea auto-creates its room — there is never a separate “create the chat later” step.',
    'A join link is the simplest invitation: one link, one click, and an interested person is in the room.',
    'JoinOrigin is a community OS that helps people find ideas and the people behind them — publish your idea and its room opens immediately.',
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
        'The room is auto-created the moment you publish the idea. The creator owns the room from second zero and can invite, remove, and assign roles inside Element. You can also set up the same shape — a public page plus a room — with tools you already use.',
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
        'Yes. Publishing an idea on JoinOrigin creates its page and room atomically — the room opens the moment you publish, and you control it from the start. Publish your idea and open a room for discussion; every new member you invite expands your reach.',
    },
  ],
  sections: [
    'Define the idea in one clear sentence. Compress the idea into a single sentence: who it is for, what it changes, and why it matters. If you cannot say it in one sentence, you are not ready to publish it. JoinOrigin is designed around findable idea pages — a one-sentence pitch is the core of the page and the phrase people will search for. Write the sentence down and test it on three people before you go further.',
    'Write the idea page with a promise and a need. The page should state the idea, why it matters, what it needs, and who you want to join. Be honest about where the idea is — a spark, a prototype, a product. JoinOrigin auto-creates the page and room when you publish an idea; the creator controls the room from the start and can invite, remove, and assign roles inside Element. Publish the idea and open a room for discussion around it.',
    'Publish the idea and let its room open. Publishing is the moment the idea becomes findable. On JoinOrigin, publishing auto-creates the room — there is never a “create the chat later” step, and the creator owns the room from second zero. On JoinOrigin the idea page and its room are one atomic publish. You can also share the page publicly and set up the room in the tools you already use.',
    'Share the join link. The join link is the shortest path from interest to connection: one link, one click, and an interested person lands in the room. Put it everywhere the right people gather. Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your idea does the job.',
    'Invite the first interested people personally. Personal invitations convert better than public posts. Message people who fit the idea’s audience, share the join link, and ask them to bring one other person who might care. JoinOrigin makes discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting, and every joiner becomes a channel to their own network.',
    'Host the first conversation in the room. The first few conversations decide whether an idea has momentum. Open the room with a clear prompt — what is the problem, what is the first step, what do you each bring — and let people respond. JoinOrigin does not run these conversations; the room is yours to shape. The platform gives the idea one room where interest becomes conversation, and the creator owns that room. Start the conversation wherever your people already are.',
    'Collect feedback and refine the idea. Ask joiners what excites them, what worries them, and what they would do first. Adjust the pitch, the scope, or the next step based on their answers. JoinOrigin keeps an idea’s shared memory in one place — notes, decisions, and feedback in the room — so refinement is visible instead of lost. Ask members directly in the room after the first week.',
    'Keep the idea findable as it grows. Revisit the page as the idea develops — update the promise, the needs, and the next step so new joiners always see the current version. Growth compounds when every member can describe the idea in one sentence and share its join link. JoinOrigin keeps your idea page and its room connected as interest grows — one place where the promise, the conversation, and the people are visible. Get discovered and grow.',
  ],
  steps: [
    {
      title: 'Define the idea in one clear sentence',
      body: 'Compress the idea into a single sentence: who it is for, what it changes, and why it matters. If you cannot say it in one sentence, you are not ready to publish it.',
      joinOriginNote:
        'JoinOrigin is designed around findable idea pages — a one-sentence pitch is the core of the page and the phrase people will search for. Write the sentence down and test it on three people before you go further.',
    },
    {
      title: 'Write the idea page with a promise and a need',
      body: 'The page should state the idea, why it matters, what it needs, and who you want to join. Be honest about where the idea is — a spark, a prototype, a product.',
      joinOriginNote:
        'JoinOrigin auto-creates the page and room when you publish an idea; the creator controls the room from the start and can invite, remove, and assign roles inside Element. Publish the idea and open a room for discussion around it.',
    },
    {
      title: 'Publish the idea and let its room open',
      body: 'Publishing is the moment the idea becomes findable. On JoinOrigin, publishing auto-creates the room — there is never a “create the chat later” step, and the creator owns the room from second zero.',
      joinOriginNote:
        'On JoinOrigin the idea page and its room are one atomic publish. You can also share the page publicly and set up the room in the tools you already use.',
    },
    {
      title: 'Share the join link',
      body: 'The join link is the shortest path from interest to connection: one link, one click, and an interested person lands in the room. Put it everywhere the right people gather.',
      joinOriginNote:
        'Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your idea does the job.',
    },
    {
      title: 'Invite the first interested people personally',
      body: 'Personal invitations convert better than public posts. Message people who fit the idea’s audience, share the join link, and ask them to bring one other person who might care.',
      joinOriginNote:
        'JoinOrigin makes discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting, and every joiner becomes a channel to their own network.',
    },
    {
      title: 'Host the first conversation in the room',
      body: 'The first few conversations decide whether an idea has momentum. Open the room with a clear prompt — what is the problem, what is the first step, what do you each bring — and let people respond.',
      joinOriginNote:
        'JoinOrigin does not run these conversations; the room is yours to shape. The platform gives the idea one room where interest becomes conversation, and the creator owns that room. Start the conversation wherever your people already are.',
    },
    {
      title: 'Collect feedback and refine the idea',
      body: 'Ask joiners what excites them, what worries them, and what they would do first. Adjust the pitch, the scope, or the next step based on their answers.',
      joinOriginNote:
        'JoinOrigin keeps an idea’s shared memory in one place — notes, decisions, and feedback in the room — so refinement is visible instead of lost. Ask members directly in the room after the first week.',
    },
    {
      title: 'Keep the idea findable as it grows',
      body: 'Revisit the page as the idea develops — update the promise, the needs, and the next step so new joiners always see the current version. Growth compounds when every member can describe the idea in one sentence and share its join link.',
      joinOriginNote:
        'JoinOrigin keeps your idea page and its room connected as interest grows — one place where the promise, the conversation, and the people are visible. Get discovered and grow.',
    },
  ],
};

export default content;
