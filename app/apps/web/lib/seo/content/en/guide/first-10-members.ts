import type { GuideContent } from '../../types';

/**
 * "How to Get Your First 10 Members" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'first-10-members',
  title: 'How to Get Your First 10 Members for a New Community | JoinOrigin',
  description:
    'Get your first 10 members without a big budget — start from your personal network, run one great event, and make it easy to invite others. Practical steps from JoinOrigin.',
  intro:
    'The first ten members are the hardest to get and the most important, because they define the culture of a community before it has any reputation to attract strangers. Most new communities fail at this stage not because the idea is bad, but because the organizer expects the audience to discover the group on their own. The reality is that early growth comes from personal reach, not from platforms: the people who join first are the ones you directly invite, the ones they bring, and the ones who attend a genuinely good first event and decide to stay. This guide breaks the first-ten-members problem into concrete steps — starting from the people you already know, running a first gathering that converts attendees into promoters, and building a simple referral habit so each member brings the next. It is honest about the effort involved: ten committed members usually take a few weeks of consistent invitations, not a single viral post. But once you have ten people who show up and invite others, the community has enough social proof to start growing on its own.',
  dataPoints: [
    'Personal invitations convert at a far higher rate than public posts or paid ads.',
    'A single well-run first gathering can turn casual attendees into regular members.',
    'Ten active members is enough social proof for most people to feel a group is real and worth joining.',
    'JoinOrigin is a waitlist platform that will help people find or start communities — it does not recruit members or run events.',
  ],
  faq: [
    {
      question: 'Why ten members specifically?',
      answer:
        'Ten is a tipping point: with ten regulars you have a lively room, a reliable core for discussion, and enough social proof to attract newcomers who would otherwise hesitate. Below ten, the group feels fragile.',
    },
    {
      question: 'How long does it take to get the first ten members?',
      answer:
        'With consistent personal invitations and a good first event, most organizers reach ten committed members within three to six weeks. The key is to invite every week, not to wait for a big launch.',
    },
    {
      question: 'What if I do not have a big personal network?',
      answer:
        'Start smaller: invite five people you know, ask each to bring one person, and post in two niche groups where your audience already gathers. Every member you retain becomes a channel to their own network.',
    },
    {
      question: 'Can JoinOrigin help me find members?',
      answer:
        'JoinOrigin is building a platform to help people discover and start communities, but it is still on a waitlist. Until early access opens, the steps in this guide — personal invitations and a great first event — are the most reliable ways to find your first members.',
    },
  ],
  sections: [
    'List fifty people you already know. Write down anyone who fits the community’s purpose: friends, colleagues, classmates, former coworkers, neighbors, and online acquaintances. You need about five times more names than the ten you want.',
    'Invite personally with a specific ask. Send a short message naming the community, the first date, and why you think they would enjoy it. Personal messages beat generic posts, and a specific date beats “coming soon”.',
    'Ask every invitee to bring one person. Make it a normal part of the ask: “Bring a friend who might like this.” Referral invitations are how small networks compound into real communities.',
    'Run one genuinely good first event. Spend your energy on the experience, not the headcount: a warm welcome, a clear format, and a defined end time. People who enjoy the first event will bring the next ten.',
    'Capture contact details at the event. Use a simple sign-up sheet or a one-line form so you can follow up after the gathering. A community without a contact list cannot send a second invitation.',
    'Follow up within 24 hours with a next date. Thank each attendee, share a one-paragraph recap, and confirm the next gathering. The follow-up is where a one-time attendee becomes a member.',
    'Make it trivially easy to invite others. Give members one sentence they can repeat: “It’s a monthly meetup for new founders to share lessons.” A clear, short description is the most effective recruitment tool.',
    'Repeat the weekly invitation rhythm until ten are committed. Do not stop after the first event. Keep inviting, keep following up, and keep the date consistent until the group reaches its tipping point.',
  ],
  steps: [
    {
      title: 'List fifty people you already know',
      body: 'Write down anyone who fits the community’s purpose: friends, colleagues, classmates, former coworkers, neighbors, and online acquaintances. You need about five times more names than the ten you want.',
    },
    {
      title: 'Invite personally with a specific ask',
      body: 'Send a short message naming the community, the first date, and why you think they would enjoy it. Personal messages beat generic posts, and a specific date beats “coming soon”.',
    },
    {
      title: 'Ask every invitee to bring one person',
      body: 'Make it a normal part of the ask: “Bring a friend who might like this.” Referral invitations are how small networks compound into real communities.',
    },
    {
      title: 'Run one genuinely good first event',
      body: 'Spend your energy on the experience, not the headcount: a warm welcome, a clear format, and a defined end time. People who enjoy the first event will bring the next ten.',
    },
    {
      title: 'Capture contact details at the event',
      body: 'Use a simple sign-up sheet or a one-line form so you can follow up after the gathering. A community without a contact list cannot send a second invitation.',
    },
    {
      title: 'Follow up within 24 hours with a next date',
      body: 'Thank each attendee, share a one-paragraph recap, and confirm the next gathering. The follow-up is where a one-time attendee becomes a member.',
    },
    {
      title: 'Make it trivially easy to invite others',
      body: 'Give members one sentence they can repeat: “It’s a monthly meetup for new founders to share lessons.” A clear, short description is the most effective recruitment tool.',
    },
    {
      title: 'Repeat the weekly invitation rhythm until ten are committed',
      body: 'Do not stop after the first event. Keep inviting, keep following up, and keep the date consistent until the group reaches its tipping point.',
    },
  ],
};

export default content;
