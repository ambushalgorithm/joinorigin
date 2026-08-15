import type { GuideContent } from '../../types';

/**
 * "Community Moderation" — L1 evergreen guide (design §6.1, TASK-326).
 *
 * Re-centered on the digital connect→join→room model: creator control IS
 * Matrix room ownership (D2) — invite/remove members, assign roles, edit
 * room settings, pin messages, archive the room — enforced natively in
 * Element. JoinOrigin value is woven into the intro and every step
 * (per-step `joinOriginNote`), with honest early-access framing — JoinOrigin
 * does not moderate third-party communities or provide moderation staff.
 * Single H1, step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 * "Room" is pinned to the Matrix room (§6.3) — private/incident spaces are
 * described as rooms/DMs, never "channels".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'moderation',
  title: 'Community Moderation: How to Keep Groups Healthy & Welcoming | JoinOrigin',
  description:
    'Moderate a community with clear rules, early action, and de-escalation — creator control is Matrix room ownership, with roles enforced in Element. Practical steps from JoinOrigin.',
  intro:
    'Every community that grows will eventually face a moment that tests its culture — a heated argument, a spammer, a member who makes others uncomfortable, or a misunderstanding that spirals. Moderation is the practice of protecting the space so the community can stay welcoming, and it only becomes necessary because communities are made of people connecting with each other. That connecting is the core problem JoinOrigin is being built to help with. JoinOrigin is a community OS in early access, designed to help people find, start, and organize communities — and in its digital model, a community lives in a creator-controlled room. Creator control is standard Matrix room ownership (D2): the creator can invite and remove members, assign roles, edit room settings, pin messages, and archive the room — all enforced natively inside Element, the default chat client, with no custom permission system. That ownership is the backbone of moderation on JoinOrigin: the creator decides who belongs, what the rules are, and what happens when a rule is broken. JoinOrigin does not moderate third-party communities and does not provide moderation staff; early access is still on the waitlist. But the platform is designed around healthy community structure, and the practices in this guide are the human practices every organizer needs regardless of tooling. This guide lays out a practical moderation system: written community rules that are short and specific, a clear enforcement path with warnings before removals, techniques for de-escalating tense situations, and honest advice about when to involve members and when to act alone. Every step shows where JoinOrigin is designed to help.',
  dataPoints: [
    'Clear, written community rules reduce conflict by setting expectations before incidents happen.',
    'Creator control on JoinOrigin is Matrix room ownership (D2): invite/remove, roles, settings, pin, archive.',
    'A staged enforcement path — warn, then limit, then remove — is fairer and easier to defend than instant bans.',
    'JoinOrigin is a waitlist community OS designed to help people find, start, and organize communities; it does not moderate third-party communities or provide moderation staff.',
  ],
  faq: [
    {
      question: 'Do small communities really need moderation rules?',
      answer:
        'Yes, and the earlier the better. Two or three short rules written before a conflict happens are far easier to apply than rules invented after one. Small communities have fewer incidents, but the ones they have are just as painful.',
    },
    {
      question: 'Should moderators act publicly or privately?',
      answer:
        'Privately first. Reach out one-on-one, restate the rule and the impact, and give the person a chance to adjust. Public callouts tend to escalate. Keep a public record of the rules, but apply them in private — in a DM or a private room.',
    },
    {
      question: 'When should I remove someone from the community?',
      answer:
        'After clear warnings have not worked, or immediately for behavior that endangers members — harassment, threats, or doxxing. The test is whether the person is actively making the space unsafe for others. On JoinOrigin, removal is the room owner removing a member from the room.',
    },
    {
      question: 'Can JoinOrigin help me moderate my community?',
      answer:
        'JoinOrigin is being built as a community OS where creator control is Matrix room ownership — invite/remove, roles, settings, pin, and archive enforced in Element — but it is still on a waitlist and does not moderate communities. The practices in this guide — clear rules, staged enforcement, calm de-escalation — work today in any space.',
    },
  ],
  sections: [
    'Write three to five clear rules. Keep them short, specific, and positive: “Be respectful”, “Stay on topic”, “No spam or self-promotion”, “Disagree with ideas, not people”. Post them where every new member will see them — ideally pinned in the room. JoinOrigin is being built so a community’s rules and values are visible in its room from day one — new members see them before they join. Today, pin your short rules where every new member will see them.',
    'Set the tone as the room owner. Model the behavior you want — welcome newcomers, thank contributors, and address problems calmly. The creator’s example sets the cultural floor for the community. JoinOrigin does not police communities — the tone is set by creators and members. The platform is designed to make welcoming behavior visible; today, model the behavior you want in the room.',
    'Own the room like the creator you are. Creator control on JoinOrigin is Matrix room ownership (D2): invite and remove members, assign roles, edit room settings, pin messages, and archive the room — enforced natively in Element. Knowing these controls is the technical half of moderation. JoinOrigin is designed so the creator has full ownership of the room from publish (D1), with no custom permission system. Today, learn the moderation controls of the platform you use and designate one clear owner.',
    'Agree on an enforcement path. Define a staged response: private warning, then limits (muted, limited posting — often a role change), then removal for repeated or severe violations. Consistent escalation is fairer than improvisation. JoinOrigin is designed so roles are standard Matrix roles in Element — mute, ban, and role assignment are native actions. Today, write down the enforcement path and stick to it.',
    'Act early and calmly. Address the first sign of a problem privately, before it becomes a public incident. Early, calm intervention is the cheapest moderation there is. JoinOrigin does not moderate for you — early, calm intervention is a human skill. The platform’s design intent is a room where issues surface visibly, so they are caught early. Today, reach out privately at the first sign.',
    'Learn de-escalation techniques. When tensions rise, slow the conversation down: acknowledge the feeling, restate the disagreement neutrally, ask for the underlying point, and suggest a pause or a private room for the heat. JoinOrigin is being built to keep community interactions organized and calm by design, but de-escalation remains a human craft. Today, slow the conversation down and move heat to a private room.',
    'Keep a record of significant incidents. Note what happened, what you did, and why. A simple log helps you stay consistent, learn from patterns, and defend decisions when a member asks why. JoinOrigin is designed as a community OS where the community’s history lives in one place — a natural home for an incident log. Today, a simple note of what happened and why keeps you consistent.',
    'Share the load with co-moderators. Recruit one or two trusted members and agree on the rules of enforcement. A community that depends on a single moderator becomes fragile and biased. JoinOrigin does not provide moderation staff — co-moderators are fellow members. The platform is designed so creators can assign roles to co-moderators in Element — native Matrix roles, no custom system. Today, recruit one or two trusted members and give them clear roles.',
  ],
  steps: [
    {
      title: 'Write three to five clear rules',
      body: 'Keep them short, specific, and positive: “Be respectful”, “Stay on topic”, “No spam or self-promotion”, “Disagree with ideas, not people”. Post them where every new member will see them — ideally pinned in the room.',
      joinOriginNote:
        'JoinOrigin is being built so a community’s rules and values are visible in its room from day one — new members see them before they join. Today, pin your short rules where every new member will see them.',
    },
    {
      title: 'Set the tone as the room owner',
      body: 'Model the behavior you want — welcome newcomers, thank contributors, and address problems calmly. The creator’s example sets the cultural floor for the community.',
      joinOriginNote:
        'JoinOrigin does not police communities — the tone is set by creators and members. The platform is designed to make welcoming behavior visible; today, model the behavior you want in the room.',
    },
    {
      title: 'Own the room like the creator you are',
      body: 'Creator control on JoinOrigin is Matrix room ownership (D2): invite and remove members, assign roles, edit room settings, pin messages, and archive the room — enforced natively in Element. Knowing these controls is the technical half of moderation.',
      joinOriginNote:
        'JoinOrigin is designed so the creator has full ownership of the room from publish (D1), with no custom permission system. Today, learn the moderation controls of the platform you use and designate one clear owner.',
    },
    {
      title: 'Agree on an enforcement path',
      body: 'Define a staged response: private warning, then limits (muted, limited posting — often a role change), then removal for repeated or severe violations. Consistent escalation is fairer than improvisation.',
      joinOriginNote:
        'JoinOrigin is designed so roles are standard Matrix roles in Element — mute, ban, and role assignment are native actions. Today, write down the enforcement path and stick to it.',
    },
    {
      title: 'Act early and calmly',
      body: 'Address the first sign of a problem privately, before it becomes a public incident. Early, calm intervention is the cheapest moderation there is.',
      joinOriginNote:
        'JoinOrigin does not moderate for you — early, calm intervention is a human skill. The platform’s design intent is a room where issues surface visibly, so they are caught early. Today, reach out privately at the first sign.',
    },
    {
      title: 'Learn de-escalation techniques',
      body: 'When tensions rise, slow the conversation down: acknowledge the feeling, restate the disagreement neutrally, ask for the underlying point, and suggest a pause or a private room for the heat.',
      joinOriginNote:
        'JoinOrigin is being built to keep community interactions organized and calm by design, but de-escalation remains a human craft. Today, slow the conversation down and move heat to a private room.',
    },
    {
      title: 'Keep a record of significant incidents',
      body: 'Note what happened, what you did, and why. A simple log helps you stay consistent, learn from patterns, and defend decisions when a member asks why.',
      joinOriginNote:
        'JoinOrigin is designed as a community OS where the community’s history lives in one place — a natural home for an incident log. Today, a simple note of what happened and why keeps you consistent.',
    },
    {
      title: 'Share the load with co-moderators',
      body: 'Recruit one or two trusted members and agree on the rules of enforcement. A community that depends on a single moderator becomes fragile and biased.',
      joinOriginNote:
        'JoinOrigin does not provide moderation staff — co-moderators are fellow members. The platform is designed so creators can assign roles to co-moderators in Element — native Matrix roles, no custom system. Today, recruit one or two trusted members and give them clear roles.',
    },
  ],
};

export default content;
