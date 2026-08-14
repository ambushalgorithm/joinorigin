import type { GuideContent } from '../../types';

/**
 * "How to Organize a Meetup" — L1 evergreen guide (design §6.2, TASK-320).
 *
 * Leads with how JoinOrigin solves the connecting-people problem behind a
 * meetup: finding the people who care about the topic. JoinOrigin value is
 * woven into the intro and every step (per-step `joinOriginNote`), with
 * honest early-access framing — JoinOrigin does not book venues or staff
 * events. Single H1, step-by-step structure, FAQ mirrored 1:1 in `FAQPage`
 * JSON-LD.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'organize-a-meetup',
  title: 'How to Organize a Meetup: Venues, Agenda & Promotion | JoinOrigin',
  description:
    'Organize a meetup from start to finish — choose a format, book a venue, build an agenda, promote it, and run the night. A practical checklist from JoinOrigin.',
  intro:
    'A meetup is a recurring event where people gather around a shared interest, and it remains one of the most effective ways to build a community because it converts passive interest into face-to-face connection. Organizing one well is really a people problem: finding the people who care about the topic, getting them in one room, and giving them a reason to come back. That is the problem JoinOrigin is being built to solve. JoinOrigin is a community OS in early access, designed to help people find communities to join and start their own — so a meetup has a home where interested members can discover it instead of depending on one person’s contact list. JoinOrigin does not book venues or staff events, and early access is still on the waitlist, but the entire purpose of the platform is connecting people who share an interest. This guide covers the full lifecycle of a meetup: choosing a format that fits your audience, finding and booking a venue without breaking the budget, building an agenda with a clear start and end, promoting the event where your audience actually looks, and running the night so that attendees leave wanting the next one. Every step includes a note on how JoinOrigin is designed to help.',
  dataPoints: [
    'A simple meetup needs only three things: a format, a venue, and a promotion channel.',
    'Evening meetups on weekdays and weekend morning sessions are the most common recurring formats.',
    'Most venues — libraries, cafés, coworking spaces — offer free or low-cost rooms for community events.',
    'JoinOrigin is a waitlist community OS designed to help people find or start communities; it does not book venues or staff events.',
  ],
  faq: [
    {
      question: 'How far in advance should I promote a meetup?',
      answer:
        'Two to three weeks is a good balance: early enough for people to plan, short enough to keep urgency. Send a reminder two days before and again on the day of the event.',
    },
    {
      question: 'What if only a few people show up?',
      answer:
        'That is normal, especially early on. Run the session for whoever is there, collect their feedback, and use the next edition to improve promotion. Consistency matters more than any single turnout.',
    },
    {
      question: 'Do meetups need a formal agenda?',
      answer:
        'Yes, a light one. A clear start, a short introduction round, one main activity or talk, and a defined end time make attendees feel their time was respected — which is what brings them back.',
    },
    {
      question: 'Can JoinOrigin help me organize meetups?',
      answer:
        'JoinOrigin is being built to help people find and start communities — one organized home where members can discover a meetup — but it is still on a waitlist and does not organize events itself. The practical steps in this guide work today without any platform.',
    },
  ],
  sections: [
    'Choose a format that fits your audience. Decide between a talk, a workshop, a discussion circle, a social mixer, or a working session. Match the format to what the audience wants — learning, connection, or progress on shared work. JoinOrigin is being built so members can see a community’s format before joining — which attracts the right people and sets expectations. Today, choose a format your audience will actually show up for.',
    'Pick a date and cadence. Weekday evenings and weekend mornings work best for most audiences. Choose a recurring slot — monthly is standard — and guard it like an appointment so people can build a habit. JoinOrigin is designed to make a community’s rhythm visible in one place, so members know the next date without hunting for it. Today, guard your recurring slot like an appointment.',
    'Book a venue early. Libraries, cafés, coworking lounges, community centers, and parks host community events at low or no cost. Confirm the capacity, opening hours, and any booking requirements in writing. JoinOrigin does not book venues or coordinate rooms — its design focus is connecting people. Until early access opens, confirm capacity and opening hours directly with the venue in writing.',
    'Draft a light agenda. Keep it simple: welcome and intro, main activity, open discussion, closing and next date. Estimate 60–90 minutes total and publish the agenda with the event listing. JoinOrigin is being built as a community OS where shared artifacts like agendas and notes live next to the community. Today, a simple published agenda does the job.',
    'Promote where your audience already is. Share the event in niche groups, local newsletters, community boards, and relevant social channels. Use a short, specific description that states who it is for. JoinOrigin is designed to be the place where people looking for a community find it. Today, promote in the niche groups and newsletters where your audience already gathers.',
    'Prepare the room. Arrive 15–30 minutes early, arrange seating, test any presentation gear, and put up a small sign. A welcoming room does more for attendance than a polished slide deck. JoinOrigin does not staff events — a welcoming room is on the organizer. The platform is designed to help the community around it stay connected before and after.',
    'Run the night with a clear rhythm. Open on time, greet latecomers, keep the main activity on track, and close by announcing the next date. End on time — it is the strongest signal of respect. JoinOrigin is being built to keep the community’s story in one organized space — the promise, the rhythm, and the people. Today, ending on time is the strongest signal of respect.',
    'Follow up within 24 hours. Thank attendees, share any links or notes, and invite feedback. The follow-up is what turns a single event into a recurring community. JoinOrigin is designed to give a community a persistent home where the recap, next date, and feedback live — turning a single event into a recurring community. Joining the waitlist keeps you first in line for early access.',
  ],
  steps: [
    {
      title: 'Choose a format that fits your audience',
      body: 'Decide between a talk, a workshop, a discussion circle, a social mixer, or a working session. Match the format to what the audience wants — learning, connection, or progress on shared work.',
      joinOriginNote:
        'JoinOrigin is being built so members can see a community’s format before joining — which attracts the right people and sets expectations. Today, choose a format your audience will actually show up for.',
    },
    {
      title: 'Pick a date and cadence',
      body: 'Weekday evenings and weekend mornings work best for most audiences. Choose a recurring slot — monthly is standard — and guard it like an appointment so people can build a habit.',
      joinOriginNote:
        'JoinOrigin is designed to make a community’s rhythm visible in one place, so members know the next date without hunting for it. Today, guard your recurring slot like an appointment.',
    },
    {
      title: 'Book a venue early',
      body: 'Libraries, cafés, coworking lounges, community centers, and parks host community events at low or no cost. Confirm the capacity, opening hours, and any booking requirements in writing.',
      joinOriginNote:
        'JoinOrigin does not book venues or coordinate rooms — its design focus is connecting people. Until early access opens, confirm capacity and opening hours directly with the venue in writing.',
    },
    {
      title: 'Draft a light agenda',
      body: 'Keep it simple: welcome and intro, main activity, open discussion, closing and next date. Estimate 60–90 minutes total and publish the agenda with the event listing.',
      joinOriginNote:
        'JoinOrigin is being built as a community OS where shared artifacts like agendas and notes live next to the community. Today, a simple published agenda does the job.',
    },
    {
      title: 'Promote where your audience already is',
      body: 'Share the event in niche groups, local newsletters, community boards, and relevant social channels. Use a short, specific description that states who it is for.',
      joinOriginNote:
        'JoinOrigin is designed to be the place where people looking for a community find it. Today, promote in the niche groups and newsletters where your audience already gathers.',
    },
    {
      title: 'Prepare the room',
      body: 'Arrive 15–30 minutes early, arrange seating, test any presentation gear, and put up a small sign. A welcoming room does more for attendance than a polished slide deck.',
      joinOriginNote:
        'JoinOrigin does not staff events — a welcoming room is on the organizer. The platform is designed to help the community around it stay connected before and after.',
    },
    {
      title: 'Run the night with a clear rhythm',
      body: 'Open on time, greet latecomers, keep the main activity on track, and close by announcing the next date. End on time — it is the strongest signal of respect.',
      joinOriginNote:
        'JoinOrigin is being built to keep the community’s story in one organized space — the promise, the rhythm, and the people. Today, ending on time is the strongest signal of respect.',
    },
    {
      title: 'Follow up within 24 hours',
      body: 'Thank attendees, share any links or notes, and invite feedback. The follow-up is what turns a single event into a recurring community.',
      joinOriginNote:
        'JoinOrigin is designed to give a community a persistent home where the recap, next date, and feedback live — turning a single event into a recurring community. Joining the waitlist keeps you first in line for early access.',
    },
  ],
};

export default content;
