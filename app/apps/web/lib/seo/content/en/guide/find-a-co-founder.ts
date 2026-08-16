import type { GuideContent } from '../../types';

/**
 * "How to Find a Co-Founder" — L1 evergreen guide (design §6.1, TASK-326).
 *
 * Re-centered on the digital connect→join→room model: an idea page is
 * published, its room is auto-created, and co-founder conversations happen
 * in that room — the digital place where candidates can find the idea,
 * ask questions, and work together. JoinOrigin value is woven into the
 * intro and every step (per-step `joinOriginNote`), with honest framing —
 * JoinOrigin is not a matchmaking service and does not match founders.
 * Single H1, step-by-step structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 * "Room" is pinned to the Matrix room (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'find-a-co-founder',
  title: 'How to Find a Co-Founder: Where to Look & What to Ask | JoinOrigin',
  description:
    'Find a co-founder who complements your skills — publish an idea page, meet in communities and their rooms, run a trial project, and ask the questions that prevent breakups. From JoinOrigin.',
  intro: [
    'Finding a co-founder is a relationship decision disguised as a hiring decision, and at its core it is another connecting-people problem: the right person is often one warm introduction away, somewhere in a community you have not discovered yet. That is the problem JoinOrigin helps with.',
    'JoinOrigin is a community OS built around the digital connect→join→room loop: you publish an idea, its room is auto-created, and people who share the idea can join and talk in that room. The idea page is the public promise and the room is where co-founder conversations actually happen — a creator-controlled Matrix room where interested people can ask questions, share notes, and test fit before anyone commits. JoinOrigin is not a matchmaking service, it does not match founders, and it has no local offices. The platform’s value — connecting people around shared interests — maps directly onto the way most founders actually find their co-founder: through communities, rooms, and warm introductions.',
    'This guide approaches the search the way you would approach building a community: start from your existing network, publish an idea people can find, expand deliberately through communities and their rooms, evaluate candidates with structured conversations and a trial project, and agree on the fundamentals before you commit to anything legally. The steps are practical and honest, and each one shows where JoinOrigin helps.',
  ],
  dataPoints: [
    'Warm introductions and shared work produce the most durable co-founder relationships.',
    'A published idea page with a room gives interested people a real place to find the idea and start a conversation.',
    'A short trial project — a prototype, a landing page, or a paid pilot — tests working styles faster than interviews.',
    'JoinOrigin is a community OS designed to help people find communities and collaborators; it is not a matchmaking service and has no local offices.',
  ],
  faq: [
    {
      question: 'Where do most people find their co-founder?',
      answer:
        'Most founders meet through warm networks — events, communities, rooms, and introductions from people they trust. Publishing an idea people can find, then showing up consistently in the same communities and their rooms, is the most reliable way to meet potential co-founders.',
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
        'JoinOrigin helps people find communities and collaborators — including the kind of communities where founders meet — with an idea page and a room where conversations can happen. JoinOrigin does not match founders, so the networking and trial-project steps in this guide are your most reliable path.',
    },
  ],
  sections: [
    'Map your skill gaps first. Write down what you are genuinely good at and what the venture needs that you are not. A co-founder should close your biggest gap — technical, commercial, or operational — not duplicate your strengths. JoinOrigin is built around profiles, ideas, and communities, not matching — so the honest advice is the same as ever: know what gap you need to close before you look. Write your strengths and the venture’s needs down.',
    'Publish your idea and open its room. An idea no one can find attracts no co-founder. Publish a clear idea page — what you are building, why, and the kind of person you need — and let its room be auto-created so interested people have a place to talk. Publishing an idea on JoinOrigin auto-creates its room, the place where co-founder conversations happen. Publish your idea somewhere public and open a room for discussion around it.',
    'Work your existing network for warm introductions. Tell five people you trust what you are building and the kind of co-founder you need. Ask each for one name. Warm introductions beat cold outreach in almost every case. JoinOrigin makes communities findable, which expands your warm network over time — and each introduction can lead to a room where the real conversation happens. Tell five people you trust exactly what kind of co-founder you need.',
    'Show up consistently in relevant communities and their rooms. Attend events and join groups where the right kind of person gathers: founder meetups, industry communities, coworking spaces, and online rooms. Repetition builds the trust that leads to introductions. JoinOrigin helps people find the communities that match their goals — the kind of place where founders meet — and join their rooms. Pick the meetups and rooms where the right people already gather and keep showing up.',
    'Have structured first conversations. Ask about their skills, risk tolerance, time commitment, and why they want to start something. Share your own answers. This is a mutual interview, not a pitch. JoinOrigin does not match founders or run conversations — the mutual interview is yours. The platform puts you in the same communities and rooms as potential collaborators — the rest is up to you.',
    'Run a trial project together. Pick something small and real — a prototype, a landing page, or a paid pilot — and work on it for four to six weeks. Watch how you divide work, handle feedback, and behave under pressure. JoinOrigin gives communities a shared room for their work and projects — which is a natural place for a trial project to surface. A small real prototype is the most reliable test.',
    'Decide based on the trial, not the potential. Ask whether you would trust this person with your reputation, whether they communicate honestly, and whether working together energizes you. If the trial felt strained, trust that signal. JoinOrigin does not make the decision for you. Its honest value is the community and room context that lets you meet and work with candidates — the trial still tells you the truth.',
    'Agree on the fundamentals before committing. Write down roles, time commitment, equity split, vesting, and decision-making rules. Even a simple one-page agreement prevents most early misunderstandings. JoinOrigin is a community OS — one organized space where agreements, roles, and project notes can live alongside the idea room. Even a one-page written agreement prevents most early misunderstandings.',
  ],
  steps: [
    {
      title: 'Map your skill gaps first',
      body: 'Write down what you are genuinely good at and what the venture needs that you are not. A co-founder should close your biggest gap — technical, commercial, or operational — not duplicate your strengths.',
      joinOriginNote:
        'JoinOrigin is built around profiles, ideas, and communities, not matching — so the honest advice is the same as ever: know what gap you need to close before you look. Write your strengths and the venture’s needs down.',
    },
    {
      title: 'Publish your idea and open its room',
      body: 'An idea no one can find attracts no co-founder. Publish a clear idea page — what you are building, why, and the kind of person you need — and let its room be auto-created so interested people have a place to talk.',
      joinOriginNote:
        'Publishing an idea on JoinOrigin auto-creates its room, the place where co-founder conversations happen. Publish your idea somewhere public and open a room for discussion around it.',
    },
    {
      title: 'Work your existing network for warm introductions',
      body: 'Tell five people you trust what you are building and the kind of co-founder you need. Ask each for one name. Warm introductions beat cold outreach in almost every case.',
      joinOriginNote:
        'JoinOrigin makes communities findable, which expands your warm network over time — and each introduction can lead to a room where the real conversation happens. Tell five people you trust exactly what kind of co-founder you need.',
    },
    {
      title: 'Show up consistently in relevant communities and their rooms',
      body: 'Attend events and join groups where the right kind of person gathers: founder meetups, industry communities, coworking spaces, and online rooms. Repetition builds the trust that leads to introductions.',
      joinOriginNote:
        'JoinOrigin helps people find the communities that match their goals — the kind of place where founders meet — and join their rooms. Pick the meetups and rooms where the right people already gather and keep showing up.',
    },
    {
      title: 'Have structured first conversations',
      body: 'Ask about their skills, risk tolerance, time commitment, and why they want to start something. Share your own answers. This is a mutual interview, not a pitch.',
      joinOriginNote:
        'JoinOrigin does not match founders or run conversations — the mutual interview is yours. The platform puts you in the same communities and rooms as potential collaborators — the rest is up to you.',
    },
    {
      title: 'Run a trial project together',
      body: 'Pick something small and real — a prototype, a landing page, or a paid pilot — and work on it for four to six weeks. Watch how you divide work, handle feedback, and behave under pressure.',
      joinOriginNote:
        'JoinOrigin gives communities a shared room for their work and projects — which is a natural place for a trial project to surface. A small real prototype is the most reliable test.',
    },
    {
      title: 'Decide based on the trial, not the potential',
      body: 'Ask whether you would trust this person with your reputation, whether they communicate honestly, and whether working together energizes you. If the trial felt strained, trust that signal.',
      joinOriginNote:
        'JoinOrigin does not make the decision for you. Its honest value is the community and room context that lets you meet and work with candidates — the trial still tells you the truth.',
    },
    {
      title: 'Agree on the fundamentals before committing',
      body: 'Write down roles, time commitment, equity split, vesting, and decision-making rules. Even a simple one-page agreement prevents most early misunderstandings.',
      joinOriginNote:
        'JoinOrigin is a community OS — one organized space where agreements, roles, and project notes can live alongside the idea room. Even a one-page written agreement prevents most early misunderstandings.',
    },
  ],
};

export default content;
