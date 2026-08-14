import type { GuideContent } from '../../types';

/**
 * "Community Moderation" — L1 evergreen guide (design §6.2, TASK-320).
 *
 * Leads with how JoinOrigin solves the connecting-people problem that makes
 * moderation necessary — communities are people connecting — and the
 * platform's design around healthy community structure. JoinOrigin value is
 * woven into the intro and every step (per-step `joinOriginNote`), with
 * honest early-access framing — JoinOrigin does not moderate third-party
 * communities or provide moderation staff. Single H1, step-by-step
 * structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'moderation',
  title: 'Community Moderation: How to Keep Groups Healthy & Welcoming | JoinOrigin',
  description:
    'Moderate a community with clear rules, early action, and de-escalation — protect the space without becoming the police. Practical steps from JoinOrigin.',
  intro:
    'Every community that grows will eventually face a moment that tests its culture — a heated argument, a spammer, a member who makes others uncomfortable, or a misunderstanding that spirals. Moderation is the practice of protecting the space so the community can stay welcoming, and it only becomes necessary because communities are made of people connecting with each other. That connecting is the core problem JoinOrigin is being built to help with. JoinOrigin is a community OS in early access, designed to help people find, start, and organize communities — which means a community on JoinOrigin is a place where members gather around a shared purpose, and where clear rules and healthy norms matter from day one. JoinOrigin does not moderate third-party communities and does not provide moderation staff; early access is still on the waitlist. But the platform is designed around healthy community structure, and the practices in this guide are the human practices every organizer needs regardless of tooling. This guide lays out a practical moderation system: written community rules that are short and specific, a clear enforcement path with warnings before bans, techniques for de-escalating tense situations, and honest advice about when to involve members and when to act alone. Every step shows where JoinOrigin is designed to help.',
  dataPoints: [
    'Clear, written community rules reduce conflict by setting expectations before incidents happen.',
    'A staged enforcement path — warn, then limit, then remove — is fairer and easier to defend than instant bans.',
    'Early, calm intervention prevents most conflicts from escalating into public drama.',
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
        'Privately first. Reach out one-on-one, restate the rule and the impact, and give the person a chance to adjust. Public callouts tend to escalate. Keep a public record of the rules, but apply them in private.',
    },
    {
      question: 'When should I remove someone from the community?',
      answer:
        'After clear warnings have not worked, or immediately for behavior that endangers members — harassment, threats, or doxxing. The test is whether the person is actively making the space unsafe for others.',
    },
    {
      question: 'Can JoinOrigin help me moderate my community?',
      answer:
        'JoinOrigin is being built as a community OS where rules and community structure are visible from day one, but it is still on a waitlist and does not moderate communities. The practices in this guide — clear rules, staged enforcement, calm de-escalation — work today in any space.',
    },
  ],
  sections: [
    'Write three to five clear rules. Keep them short, specific, and positive: “Be respectful”, “Stay on topic”, “No spam or self-promotion”, “Disagree with ideas, not people”. Post them where every new member will see them. JoinOrigin is being built so a community’s rules and values are visible in its home from day one — new members see them before they join. Today, post your short rules where every new member will see them.',
    'Set the tone as the organizer. Model the behavior you want — welcome newcomers, thank contributors, and address problems calmly. The organizer’s example sets the cultural floor for the community. JoinOrigin does not police communities — the tone is set by organizers and members. The platform is designed to make welcoming behavior visible; today, model the behavior you want.',
    'Agree on an enforcement path. Define a staged response: private warning, then limits (muted, limited posting), then removal for repeated or severe violations. Consistent escalation is fairer than improvisation. JoinOrigin is designed to help organizers run their communities — a staged, consistent response is the fair approach with or without tooling. Today, write down the enforcement path and stick to it.',
    'Act early and calmly. Address the first sign of a problem privately, before it becomes a public incident. Early, calm intervention is the cheapest moderation there is. JoinOrigin does not moderate for you — early, calm intervention is a human skill. The platform’s design intent is a community space where issues surface visibly, so they are caught early. Today, reach out privately at the first sign.',
    'Learn de-escalation techniques. When tensions rise, slow the conversation down: acknowledge the feeling, restate the disagreement neutrally, ask for the underlying point, and suggest a pause or a private channel for the heat. JoinOrigin is being built to keep community interactions organized and calm by design, but de-escalation remains a human craft. Today, slow the conversation down and move heat to a private channel.',
    'Keep a record of significant incidents. Note what happened, what you did, and why. A simple log helps you stay consistent, learn from patterns, and defend decisions when a member asks why. JoinOrigin is designed as a community OS where the community’s history lives in one place — a natural home for an incident log. Today, a simple note of what happened and why keeps you consistent.',
    'Share the load with co-moderators. Recruit one or two trusted members and agree on the rules of enforcement. A community that depends on a single moderator becomes fragile and biased. JoinOrigin does not provide moderation staff — co-moderators are fellow members. The platform is designed so organizers can coordinate roles in one place. Today, recruit one or two trusted members.',
    'Review the rules as the community grows. What fit ten members may not fit fifty. Revisit the rules with the community, adjust them openly, and retire rules that no longer serve the space. JoinOrigin is designed to help communities evolve — rule changes announced in one shared home reach everyone. Today, revisit the rules openly and retire what no longer serves the space.',
  ],
  steps: [
    {
      title: 'Write three to five clear rules',
      body: 'Keep them short, specific, and positive: “Be respectful”, “Stay on topic”, “No spam or self-promotion”, “Disagree with ideas, not people”. Post them where every new member will see them.',
      joinOriginNote:
        'JoinOrigin is being built so a community’s rules and values are visible in its home from day one — new members see them before they join. Today, post your short rules where every new member will see them.',
    },
    {
      title: 'Set the tone as the organizer',
      body: 'Model the behavior you want — welcome newcomers, thank contributors, and address problems calmly. The organizer’s example sets the cultural floor for the community.',
      joinOriginNote:
        'JoinOrigin does not police communities — the tone is set by organizers and members. The platform is designed to make welcoming behavior visible; today, model the behavior you want.',
    },
    {
      title: 'Agree on an enforcement path',
      body: 'Define a staged response: private warning, then limits (muted, limited posting), then removal for repeated or severe violations. Consistent escalation is fairer than improvisation.',
      joinOriginNote:
        'JoinOrigin is designed to help organizers run their communities — a staged, consistent response is the fair approach with or without tooling. Today, write down the enforcement path and stick to it.',
    },
    {
      title: 'Act early and calmly',
      body: 'Address the first sign of a problem privately, before it becomes a public incident. Early, calm intervention is the cheapest moderation there is.',
      joinOriginNote:
        'JoinOrigin does not moderate for you — early, calm intervention is a human skill. The platform’s design intent is a community space where issues surface visibly, so they are caught early. Today, reach out privately at the first sign.',
    },
    {
      title: 'Learn de-escalation techniques',
      body: 'When tensions rise, slow the conversation down: acknowledge the feeling, restate the disagreement neutrally, ask for the underlying point, and suggest a pause or a private channel for the heat.',
      joinOriginNote:
        'JoinOrigin is being built to keep community interactions organized and calm by design, but de-escalation remains a human craft. Today, slow the conversation down and move heat to a private channel.',
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
        'JoinOrigin does not provide moderation staff — co-moderators are fellow members. The platform is designed so organizers can coordinate roles in one place. Today, recruit one or two trusted members.',
    },
    {
      title: 'Review the rules as the community grows',
      body: 'What fit ten members may not fit fifty. Revisit the rules with the community, adjust them openly, and retire rules that no longer serve the space.',
      joinOriginNote:
        'JoinOrigin is designed to help communities evolve — rule changes announced in one shared home reach everyone. Today, revisit the rules openly and retire what no longer serves the space.',
    },
  ],
};

export default content;
