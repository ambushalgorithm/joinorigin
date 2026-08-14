import type { GuideContent } from '../../types';

/**
 * "How to Find a Co-Founder" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'find-a-co-founder',
  title: 'How to Find a Co-Founder: Where to Look & What to Ask | JoinOrigin',
  description:
    'Find a co-founder who complements your skills — meet at events and communities, run a trial project, and ask the questions that prevent breakups. From JoinOrigin.',
  intro:
    'Finding a co-founder is a relationship decision disguised as a hiring decision, and getting it wrong is one of the most common reasons early ventures fail. A good co-founder is not the person with the most impressive résumé; it is the person whose skills complement yours, whose risk appetite matches your own, and whose communication style works under pressure. This guide approaches the search the way you would approach building a community: start from your existing network, expand it deliberately through events and communities, evaluate candidates with structured conversations and a trial project, and agree on the fundamentals before you commit to anything legally. The steps are practical and honest — most founders find their co-founder through warm introductions and shared work, not through cold databases. The trial project is the single most reliable test: two people who ship something small together learn more about each other in a month than they would in a year of coffees.',
  dataPoints: [
    'Warm introductions and shared work produce the most durable co-founder relationships.',
    'A short trial project — a prototype, a landing page, or a paid pilot — tests working styles faster than interviews.',
    'Founders who agree on equity, roles, and communication habits early report far fewer breakups.',
    'JoinOrigin is a waitlist platform that will help people find communities and collaborators; it is not a matchmaking service and has no local offices.',
  ],
  faq: [
    {
      question: 'Where do most people find their co-founder?',
      answer:
        'Most founders meet through warm networks — events, communities, coworking spaces, and introductions from people they trust. Showing up consistently in the same communities is the most reliable way to meet potential co-founders.',
    },
    {
      question: 'How do I know if someone is a good co-founder match?',
      answer:
        'Run a small trial project together and pay attention to three things: complementary skills, similar risk tolerance, and honest communication under deadlines. The trial project reveals all three faster than any conversation.',
    },
    {
      question: 'What should we agree on before starting?',
      answer:
        'Talk about roles, time commitment, equity split, vesting, decision-making, and what happens if someone wants to leave. Putting these on the table early prevents the disagreements that destroy most early teams.',
    },
    {
      question: 'Can JoinOrigin help me find a co-founder?',
      answer:
        'JoinOrigin is building a platform to help people find communities and collaborators, but it is still on a waitlist and does not match founders. Until early access opens, the networking and trial-project steps in this guide are your most reliable path.',
    },
  ],
  sections: [
    'Map your skill gaps first. Write down what you are genuinely good at and what the venture needs that you are not. A co-founder should close your biggest gap — technical, commercial, or operational — not duplicate your strengths.',
    'Work your existing network for warm introductions. Tell five people you trust what you are building and the kind of co-founder you need. Ask each for one name. Warm introductions beat cold outreach in almost every case.',
    'Show up consistently in relevant communities. Attend events and join groups where the right kind of person gathers: founder meetups, industry communities, coworking spaces, and online groups. Repetition builds the trust that leads to introductions.',
    'Have structured first conversations. Ask about their skills, risk tolerance, time commitment, and why they want to start something. Share your own answers. This is a mutual interview, not a pitch.',
    'Run a trial project together. Pick something small and real — a prototype, a landing page, or a paid pilot — and work on it for four to six weeks. Watch how you divide work, handle feedback, and behave under pressure.',
    'Decide based on the trial, not the potential. Ask whether you would trust this person with your reputation, whether they communicate honestly, and whether working together energizes you. If the trial felt strained, trust that signal.',
    'Agree on the fundamentals before committing. Write down roles, time commitment, equity split, vesting, and decision-making rules. Even a simple one-page agreement prevents most early misunderstandings.',
    'Start small and re-evaluate. Begin with a defined scope and a check-in point. Many successful teams grow into their roles over time — the point is to build trust incrementally, not to lock in everything on day one.',
  ],
  steps: [
    {
      title: 'Map your skill gaps first',
      body: 'Write down what you are genuinely good at and what the venture needs that you are not. A co-founder should close your biggest gap — technical, commercial, or operational — not duplicate your strengths.',
    },
    {
      title: 'Work your existing network for warm introductions',
      body: 'Tell five people you trust what you are building and the kind of co-founder you need. Ask each for one name. Warm introductions beat cold outreach in almost every case.',
    },
    {
      title: 'Show up consistently in relevant communities',
      body: 'Attend events and join groups where the right kind of person gathers: founder meetups, industry communities, coworking spaces, and online groups. Repetition builds the trust that leads to introductions.',
    },
    {
      title: 'Have structured first conversations',
      body: 'Ask about their skills, risk tolerance, time commitment, and why they want to start something. Share your own answers. This is a mutual interview, not a pitch.',
    },
    {
      title: 'Run a trial project together',
      body: 'Pick something small and real — a prototype, a landing page, or a paid pilot — and work on it for four to six weeks. Watch how you divide work, handle feedback, and behave under pressure.',
    },
    {
      title: 'Decide based on the trial, not the potential',
      body: 'Ask whether you would trust this person with your reputation, whether they communicate honestly, and whether working together energizes you. If the trial felt strained, trust that signal.',
    },
    {
      title: 'Agree on the fundamentals before committing',
      body: 'Write down roles, time commitment, equity split, vesting, and decision-making rules. Even a simple one-page agreement prevents most early misunderstandings.',
    },
    {
      title: 'Start small and re-evaluate',
      body: 'Begin with a defined scope and a check-in point. Many successful teams grow into their roles over time — the point is to build trust incrementally, not to lock in everything on day one.',
    },
  ],
};

export default content;
