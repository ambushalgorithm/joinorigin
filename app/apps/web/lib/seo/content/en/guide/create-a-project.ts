import type { GuideContent } from '../../types';

/**
 * "How to Create a Project" — L1 evergreen guide (design §6.1, TASK-353).
 *
 * Written against the product screen-flow §2 core loop: a formed group moves
 * from conversation to shared work by publishing a project; the project page
 * is public, its room is auto-created ON PUBLISH, the creator controls the
 * room, and progress flows into the feed. The platform is live: publishing a
 * project opens its page and room now. "Room" is pinned to the Matrix room
 * (§6.3). The phrase is never used in the authored copy.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'create-a-project',
  title: 'How to Create a Project: Turn Group Momentum Into Shared Work | JoinOrigin',
  description:
    'Create a project on JoinOrigin — whether it is a brand-new idea or work that is already underway — publish a shared project page, open its room automatically, and turn a group’s conversation into work that ships. Practical steps from JoinOrigin.',
  intro: [
    'A group that only talks eventually stalls. The difference between a community that feels alive and one that fades is shared work — a project with a name, a goal, and a place where progress is visible. Turning a conversation into a project is a connecting-people problem too: you need the right people, the right commitment, and one clear place to work together. The same holds when the project already exists — scattered across files, messages, and one person’s to-do list — it still needs a visible home and the right people around it.',
    'The JoinOrigin flow handles that move: a formed group publishes a project, and the project page appears publicly with its room auto-created at the moment of publishing. Members join the project room through a link, the creator controls it as room owner, and updates from the room flow into the feed so the whole network can see the work. The project room opens the moment you publish — no setup step in between.',
    'This guide walks from the first spark to a working rhythm — whether the project is brand new or already underway: starting from an existing group and its room, defining a scope that can actually ship, writing the project page, publishing it and opening the room, inviting the working team, agreeing on roles and a first milestone, moving real work into the room, and sharing progress to build momentum.',
  ],
  dataPoints: [
    'Projects with a public page and a clear first milestone are easier to staff — people join work they can see.',
    'On JoinOrigin, publishing a project auto-creates its room — the working space exists from the same moment as the page.',
    'A project room gives the work one home: decisions, files, and progress visible to everyone who joins.',
    'JoinOrigin is a community OS that helps formed groups turn conversations into projects — publish your project and its room opens immediately.',
  ],
  faq: [
    {
      question: 'What makes a group ready to start a project?',
      answer:
        'A group is ready when a few members share a concrete outcome and are willing to commit time. You do not need a big team — three committed people with one clear milestone beat a dozen curious members. Publish the project when the conversation repeats: “we should actually do this.”',
    },
    {
      question: 'When is the project room created?',
      answer:
        'The room is auto-created the moment you publish the project. The creator owns the room from the start and can invite the working team, assign roles, and keep the work organized inside Element. You can also create the same shape with the tools your group already uses.',
    },
    {
      question: 'How is a project different from an idea?',
      answer:
        'An idea is a proposal around which people gather — its room is where interest and fit are tested. A project is the shared work a formed group commits to, with a page, a room, and a milestone. Publish an idea first when you need people; publish a project when you already have them.',
    },
    {
      question: 'What should the first milestone be?',
      answer:
        'Small and completable — a working draft, a pilot, a first version, or a finished deliverable within a few weeks. A short first milestone builds trust in the group and makes the project real to new joiners. You can always expand after the first win.',
    },
    {
      question: 'Can JoinOrigin help a group start a project today?',
      answer:
        'Yes. Publishing a project on JoinOrigin creates its page and room atomically — the room opens the moment you publish, and the creator controls it. Pick the group’s goal, create a shared project home, and open a room for the work; every new member you invite expands your reach.',
    },
  ],
  sections: [
    'Start from an existing group and its room. A project grows from a group that already has trust and momentum. Look at the conversations in the group’s room and find the recurring need — the thing members keep saying “we should do.” JoinOrigin keeps a community living in a creator-controlled room, and the project is the next layer on top of that room. Name the recurring need in the group and test whether anyone wants to act on it.',
    'Define a scope that can actually ship. Write down what the project will produce, for whom, and in what timeframe. Keep the first version small enough that the group can finish it. JoinOrigin is designed around projects with public pages — a clear scope is what makes the page readable and the room focused. One sentence that says what ships and when is enough to start.',
    'Write the project page. The page should state the project’s goal, the problem it solves, who is working on it, and what it needs. Be honest about the stage — an early draft is fine. Publishing a project on JoinOrigin auto-creates its page and room, with the creator controlling the room from the start. Publish the project description somewhere the group can point people to.',
    'Publish the project and open its room. Publishing is what makes the project real: a public page plus a room where the work lives. On JoinOrigin, the room is auto-created at the same moment — there is no separate setup step, and the creator owns it. On JoinOrigin the page, the room, and the working team are one publish. Create the page and the room in the tools your group already uses if you prefer.',
    'Invite the working team into the room. Invite the people who will actually do the work — a small, committed team is better than a large audience. Share the join link and ask each person to confirm their time. Joining on JoinOrigin is a single action — clicking Join on the project page or following a direct invite link from a member. One clear link to the project room does the job.',
    'Agree on roles and a first milestone. Name who owns what, how often the group checks in, and the first milestone everyone is working toward. Write it down where the whole team can see it. JoinOrigin does not assign roles for you — creator control means you decide. The platform keeps the roles and milestone visible in the project room. A short written plan in the room is enough.',
    'Move real work into the room. Replace “we should” with “here is the draft,” “here is the decision,” and “here is the next task.” Keep progress in one visible place so everyone can follow. JoinOrigin keeps a project’s room holding the work — decisions, files, and updates — instead of scattering them across private messages. Keep the working artifacts in the shared room from the first week.',
    'Share progress to build momentum. Post updates as the project advances, celebrate the milestone when it lands, and invite the wider group to join or follow. Progress in the feed turns a project into proof the community ships. Room updates flow into the feed on JoinOrigin — the growth loop where each new member expands the discovery surface. Get discovered and grow.',
  ],
  steps: [
    {
      title: 'Start from an existing group and its room',
      body: 'A project grows from a group that already has trust and momentum. Look at the conversations in the group’s room and find the recurring need — the thing members keep saying “we should do.”',
      joinOriginNote:
        'JoinOrigin keeps a community living in a creator-controlled room, and the project is the next layer on top of that room. Name the recurring need in the group and test whether anyone wants to act on it.',
    },
    {
      title: 'Define a scope that can actually ship',
      body: 'Write down what the project will produce, for whom, and in what timeframe. Keep the first version small enough that the group can finish it.',
      joinOriginNote:
        'JoinOrigin is designed around projects with public pages — a clear scope is what makes the page readable and the room focused. One sentence that says what ships and when is enough to start.',
    },
    {
      title: 'Write the project page',
      body: 'The page should state the project’s goal, the problem it solves, who is working on it, and what it needs. Be honest about the stage — an early draft is fine.',
      joinOriginNote:
        'Publishing a project on JoinOrigin auto-creates its page and room, with the creator controlling the room from the start. Publish the project description somewhere the group can point people to.',
    },
    {
      title: 'Publish the project and open its room',
      body: 'Publishing is what makes the project real: a public page plus a room where the work lives. On JoinOrigin, the room is auto-created at the same moment — there is no separate setup step, and the creator owns it.',
      joinOriginNote:
        'On JoinOrigin the page, the room, and the working team are one publish. Create the page and the room in the tools your group already uses if you prefer.',
    },
    {
      title: 'Invite the working team into the room',
      body: 'Invite the people who will actually do the work — a small, committed team is better than a large audience. Share the join link and ask each person to confirm their time.',
      joinOriginNote:
        'Joining on JoinOrigin is a single action — clicking Join on the project page or following a direct invite link from a member. One clear link to the project room does the job.',
    },
    {
      title: 'Agree on roles and a first milestone',
      body: 'Name who owns what, how often the group checks in, and the first milestone everyone is working toward. Write it down where the whole team can see it.',
      joinOriginNote:
        'JoinOrigin does not assign roles for you — creator control means you decide. The platform keeps the roles and milestone visible in the project room. A short written plan in the room is enough.',
    },
    {
      title: 'Move real work into the room',
      body: 'Replace “we should” with “here is the draft,” “here is the decision,” and “here is the next task.” Keep progress in one visible place so everyone can follow.',
      joinOriginNote:
        'JoinOrigin keeps a project’s room holding the work — decisions, files, and updates — instead of scattering them across private messages. Keep the working artifacts in the shared room from the first week.',
    },
    {
      title: 'Share progress to build momentum',
      body: 'Post updates as the project advances, celebrate the milestone when it lands, and invite the wider group to join or follow. Progress in the feed turns a project into proof the community ships.',
      joinOriginNote:
        'Room updates flow into the feed on JoinOrigin — the growth loop where each new member expands the discovery surface. Get discovered and grow.',
    },
  ],
};

export default content;
