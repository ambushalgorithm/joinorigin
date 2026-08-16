import type { GuideContent } from '../../types';

/**
 * "How to Publish a Small Business Idea" — L1 evergreen guide
 * (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: publish a small
 * business idea → idea public page → Join via link → room auto-created ON
 * PUBLISH → creator controls the room → feed/invite growth. The
 * idea page is the storefront promise; the room is where customers,
 * collaborators, and early believers gather around the business. The
 * platform is live: publishing an idea creates its page and room now.
 * "Room" is pinned to the Matrix room (§6.3). The phrase is never used in
 * the authored copy.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'publish-a-small-business-idea',
  title: 'How to Publish a Small Business Idea: Idea Page + Room | JoinOrigin',
  description:
    'Publish a small business idea on JoinOrigin — write a public idea page, open its room automatically, and invite customers and collaborators who want to see it happen. Practical steps from JoinOrigin.',
  intro: [
    'Most small businesses begin the same way: someone notices a real problem in their neighborhood, workplace, or hobby, and they cannot stop thinking about the fix. The next step is the fragile one — turning that spark into something other people can see, react to, and join. A small business idea needs a public home, and it needs people around it before it needs a storefront.',
    'The JoinOrigin loop works like this: you publish a small business idea, its public idea page appears, and its room is auto-created at the moment of publishing. People discover the page or follow a link, joining is a single click, and they land in the room — a creator-controlled Matrix room where customers, collaborators, and early believers can ask questions, share feedback, and get involved. The creator owns the room from second zero and decides who joins and what happens inside.',
    'This guide walks through publishing a small business idea the way you would open a shop: naming the customer and the problem, writing the idea page like a storefront, publishing it and opening the room, sharing the page with your local network, inviting early customers and collaborators, listening in the room, refining the offer from real feedback, and growing the room into your first customer base.',
  ],
  dataPoints: [
    'The clearest small business ideas start from one named customer and one specific problem, not a general audience.',
    'On JoinOrigin, publishing an idea auto-creates its room — the business has a place for customers and collaborators from the start.',
    'A join link is the simplest invitation: one link, one click, and an interested person is in the room.',
    'JoinOrigin is a community OS that helps people find ideas and the people behind them — publish your idea and its room opens immediately.',
  ],
  faq: [
    {
      question: 'How is a small business idea different from a regular idea page?',
      answer:
        'The page format is the same, but the promise is sharper: a customer, a problem, and an offer. Where a general idea invites collaborators, a small business idea page invites early customers and local believers — people who would actually buy, refer, or help you get started.',
    },
    {
      question: 'When is the room created for my business idea?',
      answer:
        'The room is auto-created the moment you publish the idea. The creator owns the room from second zero and can invite, remove, and assign roles inside Element. You can also open a room with the tools you already use and invite the people who care about the problem.',
    },
    {
      question: 'Who should join a small business idea room?',
      answer:
        'Early customers, people with the skill you are missing, and locals who can refer you. The room is where you test demand, refine the offer, and find the first believers — before you spend money on inventory, leases, or marketing.',
    },
    {
      question: 'What should the idea page promise?',
      answer:
        'One named customer, one problem, and what you plan to offer. Be honest about the stage — “I am testing this idea and want to talk to people who feel this problem” is a strong promise. The page decides whether the right people click Join.',
    },
    {
      question: 'Can JoinOrigin help me publish a small business idea today?',
      answer:
        'Yes. Publishing an idea on JoinOrigin creates its page and room atomically — the room opens the moment you publish, and you control it from the start. Publish the idea somewhere public and open a room for discussion; every new member you invite expands your reach.',
    },
  ],
  sections: [
    'Name the customer and the problem. Before you write anything, name the specific person who feels this problem and describe the problem in their words. A small business succeeds when it serves one real need well. JoinOrigin is designed around findable idea pages, and the clearest pages start from a named customer. Write the customer and problem down and test them on three people who fit.',
    'Write the idea page like a storefront. The page should show what you are offering, who it is for, what it costs in time or money, and what stage the idea is at. Keep it concrete — a pop-up, a product, a service, a shop. Publishing an idea on JoinOrigin auto-creates its page and room, with the creator controlling the room from the start. Draft the page as a short public post and refine it with feedback.',
    'Publish the idea and open its room. Publishing is the moment the business idea becomes findable. On JoinOrigin, the room is auto-created at the same moment — there is no separate setup step, and the creator owns it. On JoinOrigin the page, the room, and the join link are one publish. Publish the idea publicly and open a room for the conversation around it.',
    'Share the page with your local network. Small businesses grow through local reach. Share the idea page with neighbors, colleagues, local groups, and anyone who knows the problem firsthand. Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your idea does the job.',
    'Invite early customers and collaborators. Invite the people who would actually buy or help: potential customers, someone with a skill you are missing, a mentor, or a local organizer. JoinOrigin makes discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting, and every joiner becomes a channel to their own network.',
    'Listen in the room. Ask joiners how they would use the offer, what they would pay, and what stops them. The room is where real demand shows up — or does not. JoinOrigin does not run these conversations; the room is yours to shape. The platform gives the business idea one room where interest becomes feedback, and the creator owns that room. Ask members directly in the room.',
    'Refine the offer from real feedback. Adjust the price, the scope, the channel, or the promise based on what joiners say. Small businesses are built in small iterations. JoinOrigin keeps an idea’s shared memory in one place — notes, decisions, and feedback in the room — so refinement is visible instead of lost. Change one thing at a time and watch the response.',
    'Grow the room into your first customer base. Keep inviting, keep sharing updates, and keep the room alive as the offer firms up. The people in the room are your first customers and your first promoters. JoinOrigin keeps your idea page and its room connected as the business grows — one place where the promise, the conversation, and the people are visible. Get discovered and grow.',
  ],
  steps: [
    {
      title: 'Name the customer and the problem',
      body: 'Before you write anything, name the specific person who feels this problem and describe the problem in their words. A small business succeeds when it serves one real need well.',
      joinOriginNote:
        'JoinOrigin is designed around findable idea pages, and the clearest pages start from a named customer. Write the customer and problem down and test them on three people who fit.',
    },
    {
      title: 'Write the idea page like a storefront',
      body: 'The page should show what you are offering, who it is for, what it costs in time or money, and what stage the idea is at. Keep it concrete — a pop-up, a product, a service, a shop.',
      joinOriginNote:
        'Publishing an idea on JoinOrigin auto-creates its page and room, with the creator controlling the room from the start. Draft the page as a short public post and refine it with feedback.',
    },
    {
      title: 'Publish the idea and open its room',
      body: 'Publishing is the moment the business idea becomes findable. On JoinOrigin, the room is auto-created at the same moment — there is no separate setup step, and the creator owns it.',
      joinOriginNote:
        'On JoinOrigin the page, the room, and the join link are one publish. Publish the idea publicly and open a room for the conversation around it.',
    },
    {
      title: 'Share the page with your local network',
      body: 'Small businesses grow through local reach. Share the idea page with neighbors, colleagues, local groups, and anyone who knows the problem firsthand.',
      joinOriginNote:
        'Joining on JoinOrigin is a single action — clicking Join on the public page or following a direct invite link from a member. One short, clear link to your idea does the job.',
    },
    {
      title: 'Invite early customers and collaborators',
      body: 'Invite the people who would actually buy or help: potential customers, someone with a skill you are missing, a mentor, or a local organizer.',
      joinOriginNote:
        'JoinOrigin makes discovery easier — a place where people looking for an idea can find yours and join through a link. Personal invitations still do the heavy lifting, and every joiner becomes a channel to their own network.',
    },
    {
      title: 'Listen in the room',
      body: 'Ask joiners how they would use the offer, what they would pay, and what stops them. The room is where real demand shows up — or does not.',
      joinOriginNote:
        'JoinOrigin does not run these conversations; the room is yours to shape. The platform gives the business idea one room where interest becomes feedback, and the creator owns that room. Ask members directly in the room.',
    },
    {
      title: 'Refine the offer from real feedback',
      body: 'Adjust the price, the scope, the channel, or the promise based on what joiners say. Small businesses are built in small iterations.',
      joinOriginNote:
        'JoinOrigin keeps an idea’s shared memory in one place — notes, decisions, and feedback in the room — so refinement is visible instead of lost. Change one thing at a time and watch the response.',
    },
    {
      title: 'Grow the room into your first customer base',
      body: 'Keep inviting, keep sharing updates, and keep the room alive as the offer firms up. The people in the room are your first customers and your first promoters.',
      joinOriginNote:
        'JoinOrigin keeps your idea page and its room connected as the business grows — one place where the promise, the conversation, and the people are visible. Get discovered and grow.',
    },
  ],
};

export default content;
