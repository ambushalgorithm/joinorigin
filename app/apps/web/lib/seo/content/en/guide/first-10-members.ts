import type { GuideContent } from '../../types';

/**
 * "How to Get Your First 10 Members" — L1 evergreen guide (design §6.2,
 * TASK-320).
 *
 * Leads with how JoinOrigin solves the connecting-people problem behind the
 * first-ten tipping point: discovery and joining. JoinOrigin value is woven
 * into the intro and every step (per-step `joinOriginNote`), with honest
 * early-access framing — JoinOrigin does not recruit members or run events.
 * Single H1, step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'first-10-members',
  title: 'How to Get Your First 10 Members for a New Community | JoinOrigin',
  description:
    'Get your first 10 members without a big budget — start from your personal network, run one great event, and make it easy to invite others. Practical steps from JoinOrigin.',
  intro:
    'The first ten members are the hardest to get and the most important, because they define the culture of a community before it has any reputation to attract strangers. That first-ten problem is fundamentally a connecting-people problem, and it is the core problem JoinOrigin is being built to solve. JoinOrigin is a community OS in early access, designed to help people find communities to join and start their own — so instead of hoping your audience stumbles on you, there is one place where people actively looking for a group like yours can find it. JoinOrigin does not recruit members or run events, and early access is still on the waitlist, but the entire design intent is to make discovery and joining dramatically easier. Until that opens, early growth comes from personal reach: the people you directly invite, the ones they bring, and the ones who attend a genuinely good first event and decide to stay. This guide breaks the first-ten-members problem into concrete steps — starting from the people you already know, running a first gathering that converts attendees into promoters, and building a simple referral habit so each member brings the next — and every step shows where JoinOrigin is designed to help once early access opens.',
  dataPoints: [
    'Personal invitations convert at a far higher rate than public posts or paid ads.',
    'A single well-run first gathering can turn casual attendees into regular members.',
    'Ten active members is enough social proof for most people to feel a group is real and worth joining.',
    'JoinOrigin is a waitlist community OS designed to help people find or start communities — it does not recruit members or run events.',
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
        'JoinOrigin is being built to help people discover and start communities — a place where people looking for a group can find yours — but it is still on a waitlist. Until early access opens, the steps in this guide — personal invitations and a great first event — are the most reliable ways to find your first members.',
    },
  ],
  sections: [
    'List fifty people you already know. Write down anyone who fits the community’s purpose: friends, colleagues, classmates, former coworkers, neighbors, and online acquaintances. You need about five times more names than the ten you want. JoinOrigin is being built so that your community has a visible home people can find — but the first names still come from people you know. List fifty and treat every one as a personal introduction.',
    'Invite personally with a specific ask. Send a short message naming the community, the first date, and why you think they would enjoy it. Personal messages beat generic posts, and a specific date beats “coming soon”. JoinOrigin is designed to remove the friction of joining once people find you. Today, a short personal message with a specific date converts better than any public post.',
    'Ask every invitee to bring one person. Make it a normal part of the ask: “Bring a friend who might like this.” Referral invitations are how small networks compound into real communities. JoinOrigin is being built to give members one shareable home for the community — so referral conversations point to a real place. Today, make “bring a friend” part of the ask.',
    'Run one genuinely good first event. Spend your energy on the experience, not the headcount: a warm welcome, a clear format, and a defined end time. People who enjoy the first event will bring the next ten. JoinOrigin does not run events — the experience is yours. The platform is designed to help the community form around the event: one place members can point to afterward.',
    'Capture contact details at the event. Use a simple sign-up sheet or a one-line form so you can follow up after the gathering. A community without a contact list cannot send a second invitation. JoinOrigin is designed to keep your community’s contact list and communication in one organized space instead of a sign-up sheet. Today, a simple sheet or one-line form keeps the follow-up possible.',
    'Follow up within 24 hours with a next date. Thank each attendee, share a one-paragraph recap, and confirm the next gathering. The follow-up is where a one-time attendee becomes a member. JoinOrigin is being built so a follow-up has a natural home — one place where the recap and next date live. Today, a personal thank-you within 24 hours is what converts an attendee into a member.',
    'Make it trivially easy to invite others. Give members one sentence they can repeat: “It’s a monthly meetup for new founders to share lessons.” A clear, short description is the most effective recruitment tool. JoinOrigin is designed so a community can be described and found in one place — members can point people to the community instead of explaining it. Today, give members one sentence they can repeat.',
    'Repeat the weekly invitation rhythm until ten are committed. Do not stop after the first event. Keep inviting, keep following up, and keep the date consistent until the group reaches its tipping point. JoinOrigin is being built to keep communities findable and connected as they grow. Until early access opens, keep inviting, keep following up, and keep the date consistent.',
  ],
  steps: [
    {
      title: 'List fifty people you already know',
      body: 'Write down anyone who fits the community’s purpose: friends, colleagues, classmates, former coworkers, neighbors, and online acquaintances. You need about five times more names than the ten you want.',
      joinOriginNote:
        'JoinOrigin is being built so that your community has a visible home people can find — but the first names still come from people you know. List fifty and treat every one as a personal introduction.',
    },
    {
      title: 'Invite personally with a specific ask',
      body: 'Send a short message naming the community, the first date, and why you think they would enjoy it. Personal messages beat generic posts, and a specific date beats “coming soon”.',
      joinOriginNote:
        'JoinOrigin is designed to remove the friction of joining once people find you. Today, a short personal message with a specific date converts better than any public post.',
    },
    {
      title: 'Ask every invitee to bring one person',
      body: 'Make it a normal part of the ask: “Bring a friend who might like this.” Referral invitations are how small networks compound into real communities.',
      joinOriginNote:
        'JoinOrigin is being built to give members one shareable home for the community — so referral conversations point to a real place. Today, make “bring a friend” part of the ask.',
    },
    {
      title: 'Run one genuinely good first event',
      body: 'Spend your energy on the experience, not the headcount: a warm welcome, a clear format, and a defined end time. People who enjoy the first event will bring the next ten.',
      joinOriginNote:
        'JoinOrigin does not run events — the experience is yours. The platform is designed to help the community form around the event: one place members can point to afterward.',
    },
    {
      title: 'Capture contact details at the event',
      body: 'Use a simple sign-up sheet or a one-line form so you can follow up after the gathering. A community without a contact list cannot send a second invitation.',
      joinOriginNote:
        'JoinOrigin is designed to keep your community’s contact list and communication in one organized space instead of a sign-up sheet. Today, a simple sheet or one-line form keeps the follow-up possible.',
    },
    {
      title: 'Follow up within 24 hours with a next date',
      body: 'Thank each attendee, share a one-paragraph recap, and confirm the next gathering. The follow-up is where a one-time attendee becomes a member.',
      joinOriginNote:
        'JoinOrigin is being built so a follow-up has a natural home — one place where the recap and next date live. Today, a personal thank-you within 24 hours is what converts an attendee into a member.',
    },
    {
      title: 'Make it trivially easy to invite others',
      body: 'Give members one sentence they can repeat: “It’s a monthly meetup for new founders to share lessons.” A clear, short description is the most effective recruitment tool.',
      joinOriginNote:
        'JoinOrigin is designed so a community can be described and found in one place — members can point people to the community instead of explaining it. Today, give members one sentence they can repeat.',
    },
    {
      title: 'Repeat the weekly invitation rhythm until ten are committed',
      body: 'Do not stop after the first event. Keep inviting, keep following up, and keep the date consistent until the group reaches its tipping point.',
      joinOriginNote:
        'JoinOrigin is being built to keep communities findable and connected as they grow. Until early access opens, keep inviting, keep following up, and keep the date consistent.',
    },
  ],
};

export default content;
