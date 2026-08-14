import type { GuideContent } from '../../types';

/**
 * "How to Organize a Meetup" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'organize-a-meetup',
  title: 'How to Organize a Meetup: Venues, Agenda & Promotion | JoinOrigin',
  description:
    'Organize a meetup from start to finish — choose a format, book a venue, build an agenda, promote it, and run the night. A practical checklist from JoinOrigin.',
  intro:
    'A meetup is a recurring event where people gather around a shared interest, and it remains one of the most effective ways to build a community because it converts passive interest into face-to-face connection. Organizing one well is not complicated, but it does require attention to a few details that separate a memorable evening from a forgettable one. This guide covers the full lifecycle of a meetup: choosing a format that fits your audience, finding and booking a venue without breaking the budget, building an agenda with a clear start and end, promoting the event where your audience actually looks, and running the night so that attendees leave wanting the next one. You do not need to be a professional event planner — most successful meetups start as a handful of people in a café or coworking lounge with a simple agenda. What you do need is a clear promise to attendees, a reliable date, and the discipline to follow a repeatable checklist so every edition gets a little better than the last.',
  dataPoints: [
    'A simple meetup needs only three things: a format, a venue, and a promotion channel.',
    'Evening meetups on weekdays and weekend morning sessions are the most common recurring formats.',
    'Most venues — libraries, cafés, coworking spaces — offer free or low-cost rooms for community events.',
    'JoinOrigin is a waitlist platform that will help people find or start communities; it does not book venues or staff events.',
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
        'JoinOrigin is building a platform to help people find and start communities, but it is still on a waitlist and does not organize events itself. The practical steps in this guide work today without any platform.',
    },
  ],
  sections: [
    'Choose a format that fits your audience. Decide between a talk, a workshop, a discussion circle, a social mixer, or a working session. Match the format to what the audience wants — learning, connection, or progress on shared work.',
    'Pick a date and cadence. Weekday evenings and weekend mornings work best for most audiences. Choose a recurring slot — monthly is standard — and guard it like an appointment so people can build a habit.',
    'Book a venue early. Libraries, cafés, coworking lounges, community centers, and parks host community events at low or no cost. Confirm the capacity, opening hours, and any booking requirements in writing.',
    'Draft a light agenda. Keep it simple: welcome and intro, main activity, open discussion, closing and next date. Estimate 60–90 minutes total and publish the agenda with the event listing.',
    'Promote where your audience already is. Share the event in niche groups, local newsletters, community boards, and relevant social channels. Use a short, specific description that states who it is for.',
    'Prepare the room. Arrive 15–30 minutes early, arrange seating, test any presentation gear, and put up a small sign. A welcoming room does more for attendance than a polished slide deck.',
    'Run the night with a clear rhythm. Open on time, greet latecomers, keep the main activity on track, and close by announcing the next date. End on time — it is the strongest signal of respect.',
    'Follow up within 24 hours. Thank attendees, share any links or notes, and invite feedback. The follow-up is what turns a single event into a recurring community.',
  ],
  steps: [
    {
      title: 'Choose a format that fits your audience',
      body: 'Decide between a talk, a workshop, a discussion circle, a social mixer, or a working session. Match the format to what the audience wants — learning, connection, or progress on shared work.',
    },
    {
      title: 'Pick a date and cadence',
      body: 'Weekday evenings and weekend mornings work best for most audiences. Choose a recurring slot — monthly is standard — and guard it like an appointment so people can build a habit.',
    },
    {
      title: 'Book a venue early',
      body: 'Libraries, cafés, coworking lounges, community centers, and parks host community events at low or no cost. Confirm the capacity, opening hours, and any booking requirements in writing.',
    },
    {
      title: 'Draft a light agenda',
      body: 'Keep it simple: welcome and intro, main activity, open discussion, closing and next date. Estimate 60–90 minutes total and publish the agenda with the event listing.',
    },
    {
      title: 'Promote where your audience already is',
      body: 'Share the event in niche groups, local newsletters, community boards, and relevant social channels. Use a short, specific description that states who it is for.',
    },
    {
      title: 'Prepare the room',
      body: 'Arrive 15–30 minutes early, arrange seating, test any presentation gear, and put up a small sign. A welcoming room does more for attendance than a polished slide deck.',
    },
    {
      title: 'Run the night with a clear rhythm',
      body: 'Open on time, greet latecomers, keep the main activity on track, and close by announcing the next date. End on time — it is the strongest signal of respect.',
    },
    {
      title: 'Follow up within 24 hours',
      body: 'Thank attendees, share any links or notes, and invite feedback. The follow-up is what turns a single event into a recurring community.',
    },
  ],
};

export default content;
