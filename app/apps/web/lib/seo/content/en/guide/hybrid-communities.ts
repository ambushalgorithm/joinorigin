import type { GuideContent } from '../../types';

/**
 * "Hybrid Communities" — L1 evergreen guide (design §6.2, TASK-320).
 *
 * Leads with how JoinOrigin solves the connecting-people problem behind
 * hybrid groups: one community, two entry points, connected in a shared
 * home. JoinOrigin value is woven into the intro and every step (per-step
 * `joinOriginNote`), with honest early-access framing — JoinOrigin does not
 * provide event tools or staff hybrid events. Single H1, step-by-step
 * structure, FAQ mirrored 1:1 in `FAQPage` JSON-LD.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'en',
  slug: 'hybrid-communities',
  title: 'Hybrid Communities: How to Run In-Person + Online Together | JoinOrigin',
  description:
    'Run a hybrid community that serves both in-person and online members — choose the right tools, design equal participation, and keep both audiences engaged. From JoinOrigin.',
  intro:
    'A hybrid community brings people together in two places at once — physically in a room and virtually through a screen — and the real challenge is again about people: making sure both audiences feel like they belong to one connected community, not two separate ones. JoinOrigin is being built with exactly that connecting-people goal. JoinOrigin is a community OS in early access, designed to help people find, join, and start communities — so a hybrid group has one organized home where local and remote members see the same community, the same rhythm, and the same next steps. JoinOrigin does not provide event tools or staff hybrid events, and early access is still on the waitlist, but the platform’s design intent is to give any community — hybrid included — a single place where its members stay connected between gatherings. This guide covers the practical decisions that make hybrid communities succeed: choosing a format and tools that fit the audience, designing the event so in-person and online members share the same experience, managing the room so neither side dominates, and building a persistent online space that keeps the community alive between gatherings. Every step shows where JoinOrigin is designed to help.',
  dataPoints: [
    'A hybrid community is one community with two entry points, not two audiences to serve separately.',
    'Simple, reliable tools — one video link, one shared document — reduce the friction that kills hybrid events.',
    'Giving remote members an equal voice in discussion is the difference between hybrid and a broadcast.',
    'JoinOrigin is a waitlist community OS designed to help people find or start communities; it does not provide event tools or staff hybrid events.',
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
        'JoinOrigin is being built to help people find and start communities — one shared home where local and remote members stay connected — but it is still on a waitlist and does not provide event tooling. The practical hybrid practices in this guide work today with tools you already have.',
    },
  ],
  sections: [
    'Decide whether hybrid is the right model. Go hybrid when a meaningful share of your audience cannot attend in person. If most members can meet locally, in-person-only is usually stronger — hybrid adds complexity you should not take on without a reason. JoinOrigin is designed to help any community find and keep members, but the format decision is yours. Today, go hybrid only when a meaningful share of your audience cannot attend in person.',
    'Choose one reliable video tool and one shared document. Keep the stack minimal: a video call link for remote members, a doc for notes and shared links, and one calendar entry. Complexity is the enemy of consistent hybrid events. JoinOrigin does not provide event tooling — keep the stack minimal today. The platform is designed to be the persistent shared home where the link and doc live, not the event tool itself.',
    'Design the agenda for two audiences. Run an introduction round that includes remote members by name, keep visuals on a shared screen, and leave space for the online room to speak. A hybrid agenda names both audiences explicitly. JoinOrigin is being built so both audiences share one community space, which makes “design for two audiences” a natural fit. Today, name both audiences explicitly in the agenda.',
    'Assign a bridge person. One person watches the remote room: greets late joiners, calls on remote hands, and relays what the room misses. Without a bridge, the online audience becomes spectators. JoinOrigin does not staff events — the bridge person is a human role. The platform is designed to keep the community organized so the bridge has one place to see who joined and what was shared.',
    'Manage the room so both sides participate. Ask in-person members to speak one at a time and repeat questions for the mic, seat people near the camera, and alternate turns between the room and the call. JoinOrigin is designed around equal connection between members — the same principle that makes hybrid discussion work. Today, alternate turns between the room and the call and repeat questions for the mic.',
    'Build a persistent online space. The community lives between events in a channel or group where remote and local members share updates, ask questions, and plan together. Hybrid is not one event format — it is an ongoing shared space. This is the step closest to JoinOrigin’s design intent: a community OS is a persistent online home where remote and local members share updates and plan together. Today, a channel or group works — JoinOrigin is designed to be that space.',
    'Capture and share the output. Post notes, recordings, and next steps in the shared space after each event. A visible artifact keeps both audiences connected and makes the community feel productive. JoinOrigin is being built so a community’s output lives in one organized place — notes, recordings, next steps. Today, post them in the shared space after each event.',
    'Review and simplify regularly. After each cycle, ask both audiences what worked. Drop tools and steps that nobody uses — the goal is a hybrid community that feels effortless, not a production. JoinOrigin is designed to help communities evolve deliberately — one home where changes are visible to both audiences. Today, ask both audiences what worked and drop what nobody uses.',
  ],
  steps: [
    {
      title: 'Decide whether hybrid is the right model',
      body: 'Go hybrid when a meaningful share of your audience cannot attend in person. If most members can meet locally, in-person-only is usually stronger — hybrid adds complexity you should not take on without a reason.',
      joinOriginNote:
        'JoinOrigin is designed to help any community find and keep members, but the format decision is yours. Today, go hybrid only when a meaningful share of your audience cannot attend in person.',
    },
    {
      title: 'Choose one reliable video tool and one shared document',
      body: 'Keep the stack minimal: a video call link for remote members, a doc for notes and shared links, and one calendar entry. Complexity is the enemy of consistent hybrid events.',
      joinOriginNote:
        'JoinOrigin does not provide event tooling — keep the stack minimal today. The platform is designed to be the persistent shared home where the link and doc live, not the event tool itself.',
    },
    {
      title: 'Design the agenda for two audiences',
      body: 'Run an introduction round that includes remote members by name, keep visuals on a shared screen, and leave space for the online room to speak. A hybrid agenda names both audiences explicitly.',
      joinOriginNote:
        'JoinOrigin is being built so both audiences share one community space, which makes “design for two audiences” a natural fit. Today, name both audiences explicitly in the agenda.',
    },
    {
      title: 'Assign a bridge person',
      body: 'One person watches the remote room: greets late joiners, calls on remote hands, and relays what the room misses. Without a bridge, the online audience becomes spectators.',
      joinOriginNote:
        'JoinOrigin does not staff events — the bridge person is a human role. The platform is designed to keep the community organized so the bridge has one place to see who joined and what was shared.',
    },
    {
      title: 'Manage the room so both sides participate',
      body: 'Ask in-person members to speak one at a time and repeat questions for the mic, seat people near the camera, and alternate turns between the room and the call.',
      joinOriginNote:
        'JoinOrigin is designed around equal connection between members — the same principle that makes hybrid discussion work. Today, alternate turns between the room and the call and repeat questions for the mic.',
    },
    {
      title: 'Build a persistent online space',
      body: 'The community lives between events in a channel or group where remote and local members share updates, ask questions, and plan together. Hybrid is not one event format — it is an ongoing shared space.',
      joinOriginNote:
        'This is the step closest to JoinOrigin’s design intent: a community OS is a persistent online home where remote and local members share updates and plan together. Today, a channel or group works — JoinOrigin is designed to be that space.',
    },
    {
      title: 'Capture and share the output',
      body: 'Post notes, recordings, and next steps in the shared space after each event. A visible artifact keeps both audiences connected and makes the community feel productive.',
      joinOriginNote:
        'JoinOrigin is being built so a community’s output lives in one organized place — notes, recordings, next steps. Today, post them in the shared space after each event.',
    },
    {
      title: 'Review and simplify regularly',
      body: 'After each cycle, ask both audiences what worked. Drop tools and steps that nobody uses — the goal is a hybrid community that feels effortless, not a production.',
      joinOriginNote:
        'JoinOrigin is designed to help communities evolve deliberately — one home where changes are visible to both audiences. Today, ask both audiences what worked and drop what nobody uses.',
    },
  ],
};

export default content;
