import type { GuideContent } from '../../types';

/**
 * "Community Moderation" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'moderation',
  title: 'Community Moderation: How to Keep Groups Healthy & Welcoming | JoinOrigin',
  description:
    'Moderate a community with clear rules, early action, and de-escalation — protect the space without becoming the police. Practical steps from JoinOrigin.',
  intro:
    'Every community that grows will eventually face a moment that tests its culture — a heated argument, a spammer, a member who makes others uncomfortable, or a misunderstanding that spirals. Moderation is the practice of protecting the space so the community can stay welcoming, and it is the difference between a group that people love and one they quietly leave. Good moderation is not about policing every message or banning freely; it is about being clear about what the community values, acting early and calmly when something crosses the line, and de-escalating conflict before it hardens into faction. This guide lays out a practical moderation system: written community rules that are short and specific, a clear enforcement path with warnings before bans, techniques for de-escalating tense situations, and honest advice about when to involve members and when to act alone. Moderation is a craft that improves with practice, and the goal is never perfect harmony — it is a space where people feel safe enough to contribute.',
  dataPoints: [
    'Clear, written community rules reduce conflict by setting expectations before incidents happen.',
    'A staged enforcement path — warn, then limit, then remove — is fairer and easier to defend than instant bans.',
    'Early, calm intervention prevents most conflicts from escalating into public drama.',
    'JoinOrigin is a waitlist platform that will help people find or start communities; it does not moderate third-party communities or provide moderation staff.',
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
        'JoinOrigin is building a platform that will include community tools, but it is still on a waitlist and does not moderate communities. The practices in this guide — clear rules, staged enforcement, calm de-escalation — work today in any space.',
    },
  ],
  sections: [
    'Write three to five clear rules. Keep them short, specific, and positive: “Be respectful”, “Stay on topic”, “No spam or self-promotion”, “Disagree with ideas, not people”. Post them where every new member will see them.',
    'Set the tone as the organizer. Model the behavior you want — welcome newcomers, thank contributors, and address problems calmly. The organizer’s example sets the cultural floor for the community.',
    'Agree on an enforcement path. Define a staged response: private warning, then limits (muted, limited posting), then removal for repeated or severe violations. Consistent escalation is fairer than improvisation.',
    'Act early and calmly. Address the first sign of a problem privately, before it becomes a public incident. Early, calm intervention is the cheapest moderation there is.',
    'Learn de-escalation techniques. When tensions rise, slow the conversation down: acknowledge the feeling, restate the disagreement neutrally, ask for the underlying point, and suggest a pause or a private channel for the heat.',
    'Keep a record of significant incidents. Note what happened, what you did, and why. A simple log helps you stay consistent, learn from patterns, and defend decisions when a member asks why.',
    'Share the load with co-moderators. Recruit one or two trusted members and agree on the rules of enforcement. A community that depends on a single moderator becomes fragile and biased.',
    'Review the rules as the community grows. What fit ten members may not fit fifty. Revisit the rules with the community, adjust them openly, and retire rules that no longer serve the space.',
  ],
  steps: [
    {
      title: 'Write three to five clear rules',
      body: 'Keep them short, specific, and positive: “Be respectful”, “Stay on topic”, “No spam or self-promotion”, “Disagree with ideas, not people”. Post them where every new member will see them.',
    },
    {
      title: 'Set the tone as the organizer',
      body: 'Model the behavior you want — welcome newcomers, thank contributors, and address problems calmly. The organizer’s example sets the cultural floor for the community.',
    },
    {
      title: 'Agree on an enforcement path',
      body: 'Define a staged response: private warning, then limits (muted, limited posting), then removal for repeated or severe violations. Consistent escalation is fairer than improvisation.',
    },
    {
      title: 'Act early and calmly',
      body: 'Address the first sign of a problem privately, before it becomes a public incident. Early, calm intervention is the cheapest moderation there is.',
    },
    {
      title: 'Learn de-escalation techniques',
      body: 'When tensions rise, slow the conversation down: acknowledge the feeling, restate the disagreement neutrally, ask for the underlying point, and suggest a pause or a private channel for the heat.',
    },
    {
      title: 'Keep a record of significant incidents',
      body: 'Note what happened, what you did, and why. A simple log helps you stay consistent, learn from patterns, and defend decisions when a member asks why.',
    },
    {
      title: 'Share the load with co-moderators',
      body: 'Recruit one or two trusted members and agree on the rules of enforcement. A community that depends on a single moderator becomes fragile and biased.',
    },
    {
      title: 'Review the rules as the community grows',
      body: 'What fit ten members may not fit fifty. Revisit the rules with the community, adjust them openly, and retire rules that no longer serve the space.',
    },
  ],
};

export default content;
