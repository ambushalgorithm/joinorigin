import type { GuideContent } from '../../types';

/**
 * "How to Organize a Meetup" — L1 evergreen guide (design §6.1, TASK-326).
 *
 * Re-centered: meetups are what a group does AFTER forming — the digital
 * connect→join→room path comes first (publish group → room auto-created →
 * members join via link), and the in-person meetup is a downstream
 * consequence. JoinOrigin value is woven into the intro and every step
 * (per-step `joinOriginNote`), with honest framing — JoinOrigin
 * does not book venues or staff events. Single H1, step-by-step structure,
 * FAQ mirrored 1:1 in `FAQPage` JSON-LD. "Room" is pinned to the Matrix room
 * (§6.3) — physical venues are described as venues/spaces, never "rooms".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'organize-a-meetup',
  title: 'How to Organize a Meetup: Venues, Agenda & Promotion | JoinOrigin',
  description:
    'Organize a meetup once your group has formed — whether it was founded last month or has been meeting for years — choose a format, book a venue, build an agenda, promote it, and run the night. A practical checklist from JoinOrigin.',
  intro: [
    'A meetup is a recurring in-person event where people gather around a shared interest — and on JoinOrigin it is a natural next step after communicating in the room. The digital path comes first: people find and join a group through a link, and the group’s room becomes the place where members talk, plan, and stay connected between gatherings. The in-person meetup is the next step of that formed community — whether the group was founded last month or has been meeting informally for years, the room gives it one organized home from which a meetup can grow.',
    'JoinOrigin is a community OS designed to help people find communities to join and start their own — so a meetup has a home where interested members can discover the group, join its room, and coordinate the gathering instead of depending on one person’s contact list. JoinOrigin does not book venues or staff events — the entire purpose of the platform is connecting people who share an interest, and the gathering itself is yours to run.',
    'This guide covers the full lifecycle of a meetup after the group exists — for a newly formed group and for one that has been gathering for years: choosing a format that fits your audience, finding and booking a venue without breaking the budget, building an agenda with a clear start and end, promoting the event where your audience actually looks, and running the night so that attendees leave wanting the next one. Every step includes a note on how JoinOrigin helps — and the first step is about the digital group, because without a group and its room there is no community to meet.',
  ],
  dataPoints: [
    'A simple meetup needs only three things: a format, a venue, and a promotion channel.',
    'Evening meetups on weekdays and weekend morning sessions are the most common recurring formats.',
    'Most venues — libraries, cafés, coworking spaces — offer free or low-cost spaces for community events.',
    'JoinOrigin is a community OS designed to help people find or start communities; it does not book venues or staff events.',
  ],
  faq: [
    {
      question: 'How far in advance should I promote a meetup?',
      answer:
        'Two to three weeks is a good balance: early enough for people to plan, short enough to keep urgency. Announce it in the group’s room first, then share the event where your audience gathers. Send a reminder two days before and again on the day of the event.',
    },
    {
      question: 'What if only a few people show up?',
      answer:
        'That is normal, especially early on. Run the session for whoever is there, collect their feedback in the room, and use the next edition to improve promotion. Consistency matters more than any single turnout.',
    },
    {
      question: 'Do meetups need a formal agenda?',
      answer:
        'Yes, a light one. A clear start, a short introduction round, one main activity or talk, and a defined end time make attendees feel their time was respected — which is what brings them back.',
    },
    {
      question: 'Can JoinOrigin help me organize meetups?',
      answer:
        'Yes. JoinOrigin helps people find and start communities — one organized digital home where a group’s room is where members coordinate and where a meetup can be discovered. JoinOrigin does not organize events itself, so the practical steps in this guide are yours to run.',
    },
  ],
  sections: [
    'Form the group and open its room first. A meetup is what a group does after it forms — so start with the digital core: publish the group, let its room be auto-created, and invite members through a link. Publishing a group on JoinOrigin auto-creates its room, a creator-controlled space where members plan and stay connected. Set up your group and its room in the tools you already use before you plan a single event if you prefer.',
    'Choose a format that fits your audience. Decide between a talk, a workshop, a discussion circle, a social mixer, or a working session. Match the format to what the audience wants — learning, connection, or progress on shared work. On JoinOrigin members can see a community’s format before joining — which attracts the right people and sets expectations. Choose a format your audience will actually show up for.',
    'Pick a date and cadence. Weekday evenings and weekend mornings work best for most audiences. Choose a recurring slot — monthly is standard — and guard it like an appointment so people can build a habit. JoinOrigin makes a community’s rhythm visible in one place, so members know the next date without hunting for it. Guard your recurring slot like an appointment.',
    'Book a venue early. Libraries, cafés, coworking lounges, community centers, and parks host community events at low or no cost. Confirm the capacity, opening hours, and any booking requirements in writing. JoinOrigin does not book venues or coordinate physical spaces — its design focus is connecting people in the digital room. Confirm capacity and opening hours directly with the venue in writing.',
    'Draft a light agenda. Keep it simple: welcome and intro, main activity, open discussion, closing and next date. Estimate 60–90 minutes total and publish the agenda with the event listing and in the room. JoinOrigin is a community OS where shared artifacts like agendas and notes live next to the community. A simple published agenda does the job.',
    'Promote where your audience already is. Share the event in niche groups, local newsletters, community boards, and relevant social channels — and point everyone at the group’s join link so attendees become members, not one-night guests. JoinOrigin is the place where people looking for a community find it and join through a link. Promote in the niche groups and newsletters where your audience already gathers, and share the join link with every attendee.',
    'Run the night with a clear rhythm. Open on time, greet latecomers, keep the main activity on track, and close by announcing the next date. End on time — it is the strongest signal of respect. JoinOrigin does not staff events — the experience is yours. The platform keeps the community’s story in one organized room — the promise, the rhythm, and the people. Ending on time is the strongest signal of respect.',
    'Follow up within 24 hours in the room. Thank attendees, share any links or notes, and invite feedback where the whole group can see it. The follow-up is what turns a single event into a recurring community. JoinOrigin gives a community a persistent room where the recap, next date, and feedback live — turning a single event into a recurring community. Get discovered and keep the momentum going.',
  ],
  steps: [
    {
      title: 'Form the group and open its room first',
      body: 'A meetup is what a group does after it forms — so start with the digital core: publish the group, let its room be auto-created, and invite members through a link.',
      joinOriginNote:
        'Publishing a group on JoinOrigin auto-creates its room, a creator-controlled space where members plan and stay connected. Set up your group and its room in the tools you already use before you plan a single event if you prefer.',
    },
    {
      title: 'Choose a format that fits your audience',
      body: 'Decide between a talk, a workshop, a discussion circle, a social mixer, or a working session. Match the format to what the audience wants — learning, connection, or progress on shared work.',
      joinOriginNote:
        'On JoinOrigin members can see a community’s format before joining — which attracts the right people and sets expectations. Choose a format your audience will actually show up for.',
    },
    {
      title: 'Pick a date and cadence',
      body: 'Weekday evenings and weekend mornings work best for most audiences. Choose a recurring slot — monthly is standard — and guard it like an appointment so people can build a habit.',
      joinOriginNote:
        'JoinOrigin makes a community’s rhythm visible in one place, so members know the next date without hunting for it. Guard your recurring slot like an appointment.',
    },
    {
      title: 'Book a venue early',
      body: 'Libraries, cafés, coworking lounges, community centers, and parks host community events at low or no cost. Confirm the capacity, opening hours, and any booking requirements in writing.',
      joinOriginNote:
        'JoinOrigin does not book venues or coordinate physical spaces — its design focus is connecting people in the digital room. Confirm capacity and opening hours directly with the venue in writing.',
    },
    {
      title: 'Draft a light agenda',
      body: 'Keep it simple: welcome and intro, main activity, open discussion, closing and next date. Estimate 60–90 minutes total and publish the agenda with the event listing and in the room.',
      joinOriginNote:
        'JoinOrigin is a community OS where shared artifacts like agendas and notes live next to the community. A simple published agenda does the job.',
    },
    {
      title: 'Promote where your audience already is',
      body: 'Share the event in niche groups, local newsletters, community boards, and relevant social channels — and point everyone at the group’s join link so attendees become members, not one-night guests.',
      joinOriginNote:
        'JoinOrigin is the place where people looking for a community find it and join through a link. Promote in the niche groups and newsletters where your audience already gathers, and share the join link with every attendee.',
    },
    {
      title: 'Run the night with a clear rhythm',
      body: 'Open on time, greet latecomers, keep the main activity on track, and close by announcing the next date. End on time — it is the strongest signal of respect.',
      joinOriginNote:
        'JoinOrigin does not staff events — the experience is yours. The platform keeps the community’s story in one organized room — the promise, the rhythm, and the people. Ending on time is the strongest signal of respect.',
    },
    {
      title: 'Follow up within 24 hours in the room',
      body: 'Thank attendees, share any links or notes, and invite feedback where the whole group can see it. The follow-up is what turns a single event into a recurring community.',
      joinOriginNote:
        'JoinOrigin gives a community a persistent room where the recap, next date, and feedback live — turning a single event into a recurring community. Get discovered and keep the momentum going.',
    },
  ],
};

export default content;
