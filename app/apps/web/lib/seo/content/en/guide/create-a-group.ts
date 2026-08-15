import type { GuideContent } from '../../types';

/**
 * "How to Create a Group" — L1 evergreen guide (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: publish a group →
 * group public page → Join via link → room auto-created ON PUBLISH (D1) →
 * creator controls the room (D2) → feed/invite growth. A group is a
 * community: the public page states the promise, the room is where members
 * connect, and members join through a link. Honest waitlist framing only —
 * the platform is still on the waitlist and these features are not built
 * yet. "Room" is pinned to the Matrix room (§6.3). The phrase is never
 * used in the authored copy.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'create-a-group',
  title: 'How to Create a Group: Publish It and Open Its Room | JoinOrigin',
  description:
    'Create a group on JoinOrigin — publish a group page, open its room automatically, and invite members through a join link. Practical steps from JoinOrigin.',
  intro: [
    'Every community starts with the same two moves: deciding who it is for, and giving those people one clear place to connect. A group without a home never forms — interest scatters across messages, spreadsheets, and one-off conversations, and nothing sticks. The group page and its room are that home, and creating them well is the difference between a real community and a list of names.',
    'JoinOrigin is being designed around the digital loop: you publish a group, its public page appears, and its room is auto-created at the moment of publishing (D1). People discover the group through Explore or follow a join link, joining is a single click, and they land in the room — a creator-controlled Matrix room where the community actually lives. JoinOrigin is still on the waitlist and these features are not built yet, so the practical steps in this guide work today with the tools you already have; the design simply shows where the platform intends to help.',
    'This guide covers the whole path: choosing the audience and purpose, writing a group page people can find, publishing the group and opening its room, setting expectations as creator, sharing the join link, inviting the first members, starting the first conversations, and keeping the room active so the group keeps growing.',
  ],
  dataPoints: [
    'The clearest groups start with one audience and one promise — specificity is a growth feature.',
    'In the JoinOrigin design, publishing a group auto-creates its room (D1) — the community has a place to connect from second zero.',
    'A join link is the simplest invitation: one link, one click, and a new member is in the room.',
    'JoinOrigin is a waitlist community OS being designed to help people find, join, and start groups — the features described here are not built yet.',
  ],
  faq: [
    {
      question: 'What is the difference between a group and a community?',
      answer:
        'On JoinOrigin they are the same object. A group (or community) is a published, joinable object with a public page and a room. The group page states the promise; the room is where members connect. Communities get a Matrix Space that holds the group’s rooms, and the main room is where the group lives.',
    },
    {
      question: 'When is the group room created?',
      answer:
        'In the JoinOrigin design, the room is auto-created the moment you publish the group (D1) — there is never a separate “create the chat later” step. The creator owns the room from second zero and can invite, remove, and assign roles inside Element. Until the platform opens, set up the same shape with the tools you already use.',
    },
    {
      question: 'How do members join my group?',
      answer:
        'Joining is a single action: clicking Join on the group’s public page, or following a direct invite link from a member. Joiners land in the group’s room. The most reliable early growth is personal — sharing the join link with people who fit the audience and asking them to bring others.',
    },
    {
      question: 'What should the group page say?',
      answer:
        'One sentence on who the group is for, one sentence on what happens in the room, and what a member gets from joining. Keep it specific — “new founders in Brooklyn” beats “people who like business.” The page is the promise that decides whether someone clicks Join.',
    },
    {
      question: 'Can JoinOrigin help me create a group today?',
      answer:
        'JoinOrigin is being designed so that publishing a group creates its page and room atomically — but the platform is still on the waitlist and the features are not built yet. Today, publish the group somewhere public and open a room for members; joining the waitlist keeps you informed as the platform opens.',
    },
  ],
  sections: [
    'Choose the audience and purpose. Decide who the group is for and what it exists to do — one audience, one promise, and a successful member you can describe. JoinOrigin is designed around findable group pages, and the clearest groups state their audience and purpose up front. Until the platform opens, write one sentence for each and keep them in front of every invitation.',
    'Write a group page people can find. The page should state who the group is for, what happens in the room, and what members get from joining. Keep it specific and honest. JoinOrigin is being built so that publishing a group auto-creates its page and room (D1), with the creator controlling the room from the start. Today, publish the description somewhere public and test it on a few people who fit the audience.',
    'Publish the group and open its room. Publishing is the moment the group becomes real: a public page plus a room where members connect. In the JoinOrigin model, the room is auto-created at the same moment (D1) — there is no separate setup step, and the creator owns it. JoinOrigin is being designed so the page, the room, and the join link are one publish. Today, create the page and the room in the tools your group already uses.',
    'Set expectations as creator. As the room owner, decide how the group works: what members can post, what the rules are, and how new people are welcomed. Creator control is standard Matrix room ownership (D2) — invite, remove, assign roles, pin, archive. JoinOrigin does not set your rules for you; the design gives you the controls. Today, write the room’s expectations down and pin them where members can see.',
    'Share the join link. The join link is the shortest path from interest to membership: one link, one click, and a new member lands in the room. Put it everywhere the right people gather. JoinOrigin is designed so joining is a single action — clicking Join on the public page or following a direct invite link from a member. Until the platform opens, one short, clear link to your group does the same job.',
    'Invite the first members personally. Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience, share the join link, and ask them to bring one other person. JoinOrigin is being built to make discovery easier — a place where people looking for a group can find yours and join through a link. Personal invitations still do the heavy lifting today, and every member becomes a channel to their own network.',
    'Start the first conversations in the room. The first conversations set the culture. Open with a clear prompt — introductions, a shared goal, or a first topic — and respond to every message. JoinOrigin does not run your conversations; the room is yours to shape. The platform is designed to give the group one room where members connect, and the creator owns it. Today, be the most active member for the first few weeks.',
    'Keep the room active and growing. Keep a rhythm — a weekly topic, a recurring check-in, or a standing update — so members have a reason to return. Growth compounds when every member can describe the group in one sentence and share its join link. JoinOrigin is designed to keep your group page and room connected as the group grows — one place where the promise, the room, and the people are visible. Joining the waitlist keeps you informed as the platform opens.',
  ],
  steps: [
    {
      title: 'Choose the audience and purpose',
      body: 'Decide who the group is for and what it exists to do — one audience, one promise, and a successful member you can describe.',
      joinOriginNote:
        'JoinOrigin is designed around findable group pages, and the clearest groups state their audience and purpose up front. Until the platform opens, write one sentence for each and keep them in front of every invitation.',
    },
    {
      title: 'Write a group page people can find',
      body: 'The page should state who the group is for, what happens in the room, and what members get from joining. Keep it specific and honest.',
      joinOriginNote:
        'JoinOrigin is being built so that publishing a group auto-creates its page and room (D1), with the creator controlling the room from the start. Today, publish the description somewhere public and test it on a few people who fit the audience.',
    },
    {
      title: 'Publish the group and open its room',
      body: 'Publishing is the moment the group becomes real: a public page plus a room where members connect. In the JoinOrigin model, the room is auto-created at the same moment (D1) — there is no separate setup step, and the creator owns it.',
      joinOriginNote:
        'JoinOrigin is being designed so the page, the room, and the join link are one publish. Today, create the page and the room in the tools your group already uses.',
    },
    {
      title: 'Set expectations as creator',
      body: 'As the room owner, decide how the group works: what members can post, what the rules are, and how new people are welcomed. Creator control is standard Matrix room ownership (D2) — invite, remove, assign roles, pin, archive.',
      joinOriginNote:
        'JoinOrigin does not set your rules for you; the design gives you the controls. Today, write the room’s expectations down and pin them where members can see.',
    },
    {
      title: 'Share the join link',
      body: 'The join link is the shortest path from interest to membership: one link, one click, and a new member lands in the room. Put it everywhere the right people gather.',
      joinOriginNote:
        'JoinOrigin is designed so joining is a single action — clicking Join on the public page or following a direct invite link from a member. Until the platform opens, one short, clear link to your group does the same job.',
    },
    {
      title: 'Invite the first members personally',
      body: 'Personal invitations convert far better than public posts. Message friends, colleagues, and acquaintances who fit the audience, share the join link, and ask them to bring one other person.',
      joinOriginNote:
        'JoinOrigin is being built to make discovery easier — a place where people looking for a group can find yours and join through a link. Personal invitations still do the heavy lifting today, and every member becomes a channel to their own network.',
    },
    {
      title: 'Start the first conversations in the room',
      body: 'The first conversations set the culture. Open with a clear prompt — introductions, a shared goal, or a first topic — and respond to every message.',
      joinOriginNote:
        'JoinOrigin does not run your conversations; the room is yours to shape. The platform is designed to give the group one room where members connect, and the creator owns it. Today, be the most active member for the first few weeks.',
    },
    {
      title: 'Keep the room active and growing',
      body: 'Keep a rhythm — a weekly topic, a recurring check-in, or a standing update — so members have a reason to return. Growth compounds when every member can describe the group in one sentence and share its join link.',
      joinOriginNote:
        'JoinOrigin is designed to keep your group page and room connected as the group grows — one place where the promise, the room, and the people are visible. Joining the waitlist keeps you informed as the platform opens.',
    },
  ],
};

export default content;
