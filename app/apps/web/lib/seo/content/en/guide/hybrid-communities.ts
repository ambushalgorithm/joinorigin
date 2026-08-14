import type { GuideContent } from '../../types';

/**
 * "Hybrid Communities" — L1 evergreen guide (design §6.2).
 *
 * Definitional intro + step-by-step structure + FAQ (mirrored 1:1 in
 * `FAQPage` JSON-LD by the page wrapper). Honest, evergreen, no
 * date-stamped framing, no fabricated member counts or local-office claims.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'hybrid-communities',
  title: 'Hybrid Communities: How to Run In-Person + Online Together | JoinOrigin',
  description:
    'Run a hybrid community that serves both in-person and online members — choose the right tools, design equal participation, and keep both audiences engaged. From JoinOrigin.',
  intro:
    'A hybrid community brings people together in two places at once — physically in a room and virtually through a screen — and done well, it combines the depth of face-to-face connection with the reach of online participation. Done poorly, it produces a room full of people talking to each other while the online audience watches like spectators. The difference is design, not technology: hybrid works when both audiences have a real voice, when the tools are simple enough that nobody fumbles, and when the format treats remote members as equal participants rather than passive viewers. This guide covers the practical decisions that make hybrid communities succeed: choosing a format and tools that fit the audience, designing the event so in-person and online members share the same experience, managing the room so neither side dominates, and building a persistent online space that keeps the community alive between gatherings. The honest advice is to start simpler than you think you need — a single video call linked to a small physical room beats a complex studio setup that nobody can operate.',
  dataPoints: [
    'A hybrid community is one community with two entry points, not two audiences to serve separately.',
    'Simple, reliable tools — one video link, one shared document — reduce the friction that kills hybrid events.',
    'Giving remote members an equal voice in discussion is the difference between hybrid and a broadcast.',
    'JoinOrigin is a waitlist platform that will help people find or start communities; it does not provide event tools or staff hybrid events.',
  ],
  faq: [
    {
      question: 'When should a community go hybrid?',
      answer:
        'When part of your audience reliably cannot attend in person — because of distance, schedule, or mobility — and the community still wants one shared identity. If everyone can meet locally, in-person-only is simpler and often better.',
    },
    {
      question: 'What is the minimum tool setup for a hybrid event?',
      answer:
        'One video call link for remote members, one shared document for notes, and one person responsible for bridging the two. More tools add more failure points; start minimal and add only what the community asks for.',
    },
    {
      question: 'How do I keep remote members from feeling like spectators?',
      answer:
        'Design for equal participation: run a hybrid introduction round, call on remote members explicitly, share the screen for any visuals, and use a shared doc where both sides can write. Assign one person to watch the remote room continuously.',
    },
    {
      question: 'Can JoinOrigin help me run a hybrid community?',
      answer:
        'JoinOrigin is building a platform to help people find and start communities, but it is still on a waitlist and does not provide event tooling. The practical hybrid practices in this guide work today with tools you already have.',
    },
  ],
  sections: [
    'Decide whether hybrid is the right model. Go hybrid when a meaningful share of your audience cannot attend in person. If most members can meet locally, in-person-only is usually stronger — hybrid adds complexity you should not take on without a reason.',
    'Choose one reliable video tool and one shared document. Keep the stack minimal: a video call link for remote members, a doc for notes and shared links, and one calendar entry. Complexity is the enemy of consistent hybrid events.',
    'Design the agenda for two audiences. Run an introduction round that includes remote members by name, keep visuals on a shared screen, and leave space for the online room to speak. A hybrid agenda names both audiences explicitly.',
    'Assign a bridge person. One person watches the remote room: greets late joiners, calls on remote hands, and relays what the room misses. Without a bridge, the online audience becomes spectators.',
    'Manage the room so both sides participate. Ask in-person members to speak one at a time and repeat questions for the mic, seat people near the camera, and alternate turns between the room and the call.',
    'Build a persistent online space. The community lives between events in a channel or group where remote and local members share updates, ask questions, and plan together. Hybrid is not one event format — it is an ongoing shared space.',
    'Capture and share the output. Post notes, recordings, and next steps in the shared space after each event. A visible artifact keeps both audiences connected and makes the community feel productive.',
    'Review and simplify regularly. After each cycle, ask both audiences what worked. Drop tools and steps that nobody uses — the goal is a hybrid community that feels effortless, not a production.',
  ],
  steps: [
    {
      title: 'Decide whether hybrid is the right model',
      body: 'Go hybrid when a meaningful share of your audience cannot attend in person. If most members can meet locally, in-person-only is usually stronger — hybrid adds complexity you should not take on without a reason.',
    },
    {
      title: 'Choose one reliable video tool and one shared document',
      body: 'Keep the stack minimal: a video call link for remote members, a doc for notes and shared links, and one calendar entry. Complexity is the enemy of consistent hybrid events.',
    },
    {
      title: 'Design the agenda for two audiences',
      body: 'Run an introduction round that includes remote members by name, keep visuals on a shared screen, and leave space for the online room to speak. A hybrid agenda names both audiences explicitly.',
    },
    {
      title: 'Assign a bridge person',
      body: 'One person watches the remote room: greets late joiners, calls on remote hands, and relays what the room misses. Without a bridge, the online audience becomes spectators.',
    },
    {
      title: 'Manage the room so both sides participate',
      body: 'Ask in-person members to speak one at a time and repeat questions for the mic, seat people near the camera, and alternate turns between the room and the call.',
    },
    {
      title: 'Build a persistent online space',
      body: 'The community lives between events in a channel or group where remote and local members share updates, ask questions, and plan together. Hybrid is not one event format — it is an ongoing shared space.',
    },
    {
      title: 'Capture and share the output',
      body: 'Post notes, recordings, and next steps in the shared space after each event. A visible artifact keeps both audiences connected and makes the community feel productive.',
    },
    {
      title: 'Review and simplify regularly',
      body: 'After each cycle, ask both audiences what worked. Drop tools and steps that nobody uses — the goal is a hybrid community that feels effortless, not a production.',
    },
  ],
};

export default content;
