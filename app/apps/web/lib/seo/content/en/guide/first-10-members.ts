import type { GuideContent } from '../../types';

/**
 * "How to Get Your First 10 Members" — L1 evergreen guide (design §6.1,
 * TASK-326).
 *
 * Re-centered on the digital connect→join→room model: the room is the
 * joining surface — members come in through invite links and join the
 * group’s room, where the community actually lives. JoinOrigin value is
 * woven into the intro and every step (per-step `joinOriginNote`), with
 * honest early-access framing — JoinOrigin does not recruit members or run
 * events. Single H1, step-by-step structure, FAQ mirrored 1:1 in `FAQPage`
 * JSON-LD. "Room" is pinned to the Matrix room (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'first-10-members',
  title: 'How to Get Your First 10 Members for a New Community | JoinOrigin',
  description:
    'Get your first 10 members without a big budget — start from your personal network, share invite links, and make the room the place people want to join. Practical steps from JoinOrigin.',
  intro:
    'The first ten members are the hardest to get and the most important, because they define the culture of a community before it has any reputation to attract strangers. That first-ten problem is fundamentally a connecting-people problem, and it is the core problem JoinOrigin is being built to solve. JoinOrigin is a community OS in early access, designed around the digital connect→join→room loop: you publish a group, its room is auto-created, and members join through a link. The room is the joining surface — every person who clicks Join or follows an invite link lands in the group’s room, the one place where the community lives and where new members feel immediately connected. JoinOrigin does not recruit members or run events, and early access is still on the waitlist, but the entire design intent is to make discovery and joining dramatically easier. Until that opens, early growth comes from personal reach: the people you directly invite with a link, the ones they bring, and the ones who stay because the room feels alive. This guide breaks the first-ten-members problem into concrete steps — starting from the people you already know, publishing your group so it has a room to join, inviting personally with links, running a first gathering that converts attendees into promoters, and building a simple referral habit so each member brings the next — and every step shows where JoinOrigin is designed to help once early access opens.',
  dataPoints: [
    'Personal invitations convert at a far higher rate than public posts or paid ads.',
    'An invite link removes every barrier: one click and a new member is in the room.',
    'Ten active members is enough social proof for most people to feel a group is real and worth joining.',
    'JoinOrigin is a waitlist community OS designed to help people find or start communities — it does not recruit members or run events.',
  ],
  faq: [
    {
      question: 'Why ten members specifically?',
      answer:
        'Ten is a tipping point: with ten regulars you have a lively room, a reliable core for discussion, and enough social proof to attract newcomers who would otherwise hesitate. Below ten, the room feels fragile.',
    },
    {
      question: 'How long does it take to get the first ten members?',
      answer:
        'With consistent personal invitations and a good first gathering, most organizers reach ten committed members within three to six weeks. The key is to invite every week — share links, follow up, and keep the room active — not to wait for a big launch.',
    },
    {
      question: 'What if I do not have a big personal network?',
      answer:
        'Start smaller: invite five people you know, ask each to bring one person, and post in two niche groups where your audience already gathers. Every member you retain becomes a channel to their own network — and every invitation can be a simple link into the room.',
    },
    {
      question: 'Can JoinOrigin help me find members?',
      answer:
        'JoinOrigin is being built to help people discover and start communities — a place where people looking for a group can find yours and join its room through a link — but it is still on a waitlist. Until early access opens, the steps in this guide — personal invitations and a great first gathering — are the most reliable ways to find your first members.',
    },
  ],
  sections: [
    'List fifty people you already know. Write down anyone who fits the community’s purpose: friends, colleagues, classmates, former coworkers, neighbors, and online acquaintances. You need about five times more names than the ten you want. JoinOrigin is being built so that your community has a visible home and a room people can find — but the first names still come from people you know. List fifty and treat every one as a personal introduction.',
    'Publish your group and open its room. A community you cannot point to does not exist yet. Publish the group with a clear mission, and let its room be auto-created so there is a real place for members to land. JoinOrigin is being built so that publishing a group auto-creates its room (D1) — the room is the joining surface, and the creator owns it from the start. Until early access opens, set up your group and its room in the tools you already use before you invite anyone.',
    'Invite personally with a specific ask and a link. Send a short message naming the community, the first date or first conversation, and why you think they would enjoy it — and include the join link. Personal messages beat generic posts, and a specific date beats “coming soon”. JoinOrigin is designed to remove the friction of joining once people find you — one link, one click, into the room. Today, a short personal message with a specific date and a link converts better than any public post.',
    'Ask every invitee to bring one person. Make it a normal part of the ask: “Bring a friend who might like this.” Referral invitations are how small networks compound into real communities. JoinOrigin is being built to give members one shareable home for the community — so referral conversations point to a real link and a real room. Today, make “bring a friend” part of the ask, and give them the link to share.',
    'Run one genuinely good first gathering. Spend your energy on the experience, not the headcount: a warm welcome, a clear format, and a defined end time. People who enjoy the first gathering will bring the next ten. JoinOrigin does not run events — the experience is yours. The platform is designed to help the community form around it: one room where members can point to afterward and keep the connection going.',
    'Invite every attendee into the room. At the end of the gathering, share the join link and add anyone who wants to stay. The room is where the community lives between gatherings — a member who joined the room is a member who is likely to return. JoinOrigin is designed to keep your community’s membership and communication in one organized room instead of a sign-up sheet. Today, a simple link into the room keeps the follow-up possible.',
    'Follow up within 24 hours with a next date. Thank each attendee, share a one-paragraph recap, and confirm the next gathering — in the room, where everyone can see it. The follow-up is where a one-time attendee becomes a member. JoinOrigin is being built so a follow-up has a natural home — one place where the recap and next date live. Today, a personal thank-you within 24 hours is what converts an attendee into a member.',
    'Make it trivially easy to invite others. Give members one sentence they can repeat and one link they can share: “It’s a monthly meetup for new founders to share lessons — join here.” A clear, short description is the most effective recruitment tool. JoinOrigin is designed so a community can be described, found, and joined in one place — members can point people to the room instead of explaining it. Today, give members one sentence and one link they can repeat.',
  ],
  steps: [
    {
      title: 'List fifty people you already know',
      body: 'Write down anyone who fits the community’s purpose: friends, colleagues, classmates, former coworkers, neighbors, and online acquaintances. You need about five times more names than the ten you want.',
      joinOriginNote:
        'JoinOrigin is being built so that your community has a visible home and a room people can find — but the first names still come from people you know. List fifty and treat every one as a personal introduction.',
    },
    {
      title: 'Publish your group and open its room',
      body: 'A community you cannot point to does not exist yet. Publish the group with a clear mission, and let its room be auto-created so there is a real place for members to land.',
      joinOriginNote:
        'JoinOrigin is being built so that publishing a group auto-creates its room (D1) — the room is the joining surface, and the creator owns it from the start. Until early access opens, set up your group and its room in the tools you already use before you invite anyone.',
    },
    {
      title: 'Invite personally with a specific ask and a link',
      body: 'Send a short message naming the community, the first date or first conversation, and why you think they would enjoy it — and include the join link. Personal messages beat generic posts, and a specific date beats “coming soon”.',
      joinOriginNote:
        'JoinOrigin is designed to remove the friction of joining once people find you — one link, one click, into the room. Today, a short personal message with a specific date and a link converts better than any public post.',
    },
    {
      title: 'Ask every invitee to bring one person',
      body: 'Make it a normal part of the ask: “Bring a friend who might like this.” Referral invitations are how small networks compound into real communities.',
      joinOriginNote:
        'JoinOrigin is being built to give members one shareable home for the community — so referral conversations point to a real link and a real room. Today, make “bring a friend” part of the ask, and give them the link to share.',
    },
    {
      title: 'Run one genuinely good first gathering',
      body: 'Spend your energy on the experience, not the headcount: a warm welcome, a clear format, and a defined end time. People who enjoy the first gathering will bring the next ten.',
      joinOriginNote:
        'JoinOrigin does not run events — the experience is yours. The platform is designed to help the community form around it: one room where members can point to afterward and keep the connection going.',
    },
    {
      title: 'Invite every attendee into the room',
      body: 'At the end of the gathering, share the join link and add anyone who wants to stay. The room is where the community lives between gatherings — a member who joined the room is a member who is likely to return.',
      joinOriginNote:
        'JoinOrigin is designed to keep your community’s membership and communication in one organized room instead of a sign-up sheet. Today, a simple link into the room keeps the follow-up possible.',
    },
    {
      title: 'Follow up within 24 hours with a next date',
      body: 'Thank each attendee, share a one-paragraph recap, and confirm the next gathering — in the room, where everyone can see it. The follow-up is where a one-time attendee becomes a member.',
      joinOriginNote:
        'JoinOrigin is being built so a follow-up has a natural home — one place where the recap and next date live. Today, a personal thank-you within 24 hours is what converts an attendee into a member.',
    },
    {
      title: 'Make it trivially easy to invite others',
      body: 'Give members one sentence they can repeat and one link they can share: “It’s a monthly meetup for new founders to share lessons — join here.” A clear, short description is the most effective recruitment tool.',
      joinOriginNote:
        'JoinOrigin is designed so a community can be described, found, and joined in one place — members can point people to the room instead of explaining it. Today, give members one sentence and one link they can repeat.',
    },
  ],
};

export default content;
