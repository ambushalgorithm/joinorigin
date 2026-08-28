import type { GuideContent } from '../../types';

/**
 * „So findest du eine:n Co-Gründer:in“ — zeitlose L1-Anleitung
 * (Design §6.1, TASK-326).
 *
 * Neu auf das digitale Verbinden→Beitreten→Raum-Modell ausgerichtet: Eine
 * Ideenseite wird veröffentlicht, ihr Raum wird automatisch erstellt, und
 * Co-Gründer:innen-Gespräche finden in diesem Raum statt — der digitale Ort,
 * an dem Kandidat:innen die Idee finden, Fragen stellen und zusammenarbeiten
 * können. Der JoinOrigin-Wert ist in die Einleitung und jeden Schritt
 * eingewoben (pro Schritt `joinOriginNote`), mit ehrlicher Rahmung —
 * JoinOrigin ist kein Matchmaking-Dienst und matched keine Gründer:innen.
 * Einzelnes H1, Schritt-für-Schritt-Struktur, FAQ 1:1 in `FAQPage`-JSON-LD
 * gespiegelt. „Raum“ ist an den Matrix-Raum (§6.3) gebunden.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'find-a-co-founder',
  title: 'So findest du eine:n Co-Gründer:in: Wo du suchen & was du fragen solltest | JoinOrigin',
  description:
    'Finde eine:n Co-Gründer:in, der:die deine Fähigkeiten ergänzt — ob du startest oder ein bestehendes Vorhaben ausbaust — veröffentliche eine Ideenseite, treffe dich in Origins und ihren Räumen, führe ein Testprojekt durch und stelle die Fragen, die Trennungen verhindern. Von JoinOrigin.',
  intro: [
    'Eine:n Co-Gründer:in zu finden ist eine Beziehungsentscheidung im Gewand einer Einstellungsentscheidung, und im Kern ist es wieder ein Menschen-verbinden-Problem: Die richtige Person ist oft nur eine warme Empfehlung entfernt, irgendwo in einer Community, die du noch nicht entdeckt hast. Genau dabei hilft JoinOrigin — und es ist dasselbe Problem, ob du noch in der Ideenphase bist oder ein bestehendes Unternehmen führst, das eine:n Partner:in für den nächsten Schritt braucht.',
    'JoinOrigin ist ein Community-Betriebssystem, das um den digitalen Verbinden→Beitreten→Raum-Kreislauf gebaut ist: Du veröffentlichst eine Idee, ihr Raum wird automatisch erstellt, und Menschen, die die Idee teilen, können beitreten und in diesem Raum sprechen. Die Ideenseite ist das öffentliche Versprechen, und der Raum ist der Ort, an dem Co-Gründer:innen-Gespräche tatsächlich stattfinden — ein von der ersteller:in kontrollierter Matrix-Raum, in dem interessierte Menschen Fragen stellen, Notizen teilen und die Passung testen können, bevor sich jemand verpflichtet. JoinOrigin ist kein Matchmaking-Dienst, es matched keine Gründer:innen, und es hat keine lokalen Büros. Der Wert der Plattform — Menschen um gemeinsame Interessen zu verbinden — passt direkt auf die Art, wie die meisten Gründer:innen tatsächlich ihre:n Co-Gründer:in finden: über Origins, Räume und warme Empfehlungen.',
    'Diese Anleitung nähert sich der Suche so, wie du den Aufbau einer Community angehen würdest: mit deinem bestehenden Netzwerk beginnen, eine auffindbare Idee veröffentlichen, bewusst über Origins und ihre Räume expandieren, Kandidat:innen mit strukturierten Gesprächen und einem Testprojekt bewerten und die Grundlagen vereinbaren, bevor du dich rechtlich irgendetwas verpflichtest. Die Schritte sind praktisch und ehrlich, und jeder zeigt, wo JoinOrigin hilft.',
  ],
  dataPoints: [
    'Warme Empfehlungen und gemeinsame Arbeit erzeugen die dauerhaftesten Co-Gründer:innen-Beziehungen.',
    'Eine veröffentlichte Ideenseite mit Raum gibt interessierten Menschen einen echten Ort, die Idee zu finden und ein Gespräch zu beginnen.',
    'Ein kurzes Testprojekt — ein Prototyp, eine Landingpage oder ein bezahlter Pilot — testet Arbeitsweisen schneller als Interviews.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Origins und Mitgestalter:innen zu finden; es ist kein Matchmaking-Dienst und hat keine lokalen Büros.',
  ],
  faq: [
    {
      question: 'Wo finden die meisten Menschen ihre:n Co-Gründer:in?',
      answer:
        'Die meisten Gründer:innen treffen sich über warme Netzwerke — Events, Origins, Räume und Empfehlungen von Menschen, denen sie vertrauen. Eine Idee zu veröffentlichen, die Menschen finden können, und dann konsequent in denselben Origins und ihren Räumen aufzutauchen, ist der zuverlässigste Weg, potenzielle Co-Gründer:innen kennenzulernen.',
    },
    {
      question: 'Woher weiß ich, ob jemand gut zu mir passt?',
      answer:
        'Führt gemeinsam ein kleines Testprojekt durch und achtet auf drei Dinge: sich ergänzende Fähigkeiten, ähnliche Risikotoleranz und ehrliche Kommunikation unter Deadlines. Das Testprojekt offenbart alle drei schneller als jedes Gespräch.',
    },
    {
      question: 'Was sollten wir vor dem Start vereinbaren?',
      answer:
        'Sprecht über Rollen, Zeitaufwand, Aktienaufteilung, Vesting, Entscheidungsfindung und was passiert, wenn jemand gehen will. Diese Dinge früh auf den Tisch zu legen verhindert die Meinungsverschiedenheiten, die die meisten frühen Teams zerstören.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, eine:n Co-Gründer:in zu finden?',
      answer:
        'JoinOrigin hilft Menschen, Origins und Mitgestalter:innen zu finden — einschließlich der Art von Origins, in denen Gründer:innen sich treffen — mit einer Ideenseite und einem Raum, in dem Gespräche stattfinden können. JoinOrigin matched keine Gründer:innen, daher sind die Vernetzungs- und Testprojekt-Schritte dieser Anleitung dein zuverlässigster Weg.',
    },
  ],
  sections: [
    'Kartiere zuerst deine Fähigkeitslücken. Schreibe auf, worin du wirklich gut bist und was das Vorhaben braucht, das du nicht bist. Eine:r Co-Gründer:in sollte deine größte Lücke schließen — technisch, kommerziell oder operativ — nicht deine Stärken duplizieren. JoinOrigin ist um Profile, Ideen und Communities gebaut, nicht um Matching — daher ist der ehrliche Rat derselbe wie immer: Wisse, welche Lücke du schließen musst, bevor du suchst. Schreibe deine Stärken und die Bedürfnisse des Vorhabens auf.',
    'Veröffentliche deine Idee und öffne ihren Raum. Eine Idee, die niemand finden kann, zieht keine:n Co-Gründer:in an. Veröffentliche eine klare Ideenseite — was du baust, warum und welche Art von Person du brauchst — und lass ihren Raum automatisch erstellen, damit interessierte Menschen einen Ort zum Sprechen haben. Eine Idee auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum, den Ort, an dem Co-Gründer:innen-Gespräche stattfinden. Veröffentliche deine Idee irgendwo öffentlich und öffne einen Raum für Diskussion darum.',
    'Arbeite dein bestehendes Netzwerk für warme Empfehlungen. Sag fünf Menschen, denen du vertraust, was du baust und welche Art von Co-Gründer:in du brauchst. Bitte jede:n um einen Namen. Warme Empfehlungen schlagen kalte Ansprache in fast jedem Fall. JoinOrigin macht Origins auffindbar, was dein warmes Netzwerk im Laufe der Zeit erweitert — und jede Empfehlung kann zu einem Raum führen, in dem das echte Gespräch stattfindet. Sag fünf Menschen, denen du vertraust, genau, welche Art von Co-Gründer:in du brauchst.',
    'Tauche konsequent in relevanten Origins und ihren Räumen auf. Besuche Events und tritt Gruppen bei, in denen die richtige Art von Mensch sich versammelt: Gründer:innen-Meetups, Branchen-Communities, Coworking-Spaces und Online-Räume. Wiederholung baut das Vertrauen auf, das zu Empfehlungen führt. JoinOrigin hilft Menschen, die Origins zu finden, die zu ihren Zielen passen — die Art von Ort, an dem Gründer:innen sich treffen — und ihren Räumen beizutreten. Wähle die Meetups und Räume, in denen die richtigen Menschen bereits zusammenkommen, und tauche weiter auf.',
    'Führe strukturierte erste Gespräche. Frag nach ihren Fähigkeiten, ihrer Risikotoleranz, ihrem Zeitaufwand und warum sie etwas starten oder ausbauen wollen. Teile deine eigenen Antworten. Das ist ein gegenseitiges Interview, kein Pitch. JoinOrigin matched keine Gründer:innen und führt keine Gespräche — das gegenseitige Interview ist deins. Die Plattform bringt dich in dieselben Origins und Räume wie potenzielle Mitgestalter:innen — der Rest liegt bei dir.',
    'Führt gemeinsam ein Testprojekt durch. Wähle etwas Kleines und Echtes — einen Prototyp, eine Landingpage oder einen bezahlten Pilot — und arbeite vier bis sechs Wochen daran. Beobachte, wie ihr Arbeit aufteilt, mit Feedback umgeht und unter Druck agiert. JoinOrigin gibt Origins einen gemeinsamen Raum für ihre Arbeit und Projekte — ein natürlicher Ort, an dem ein Testprojekt entstehen kann. Ein kleiner echter Prototyp ist der zuverlässigste Test.',
    'Entscheide auf Basis des Tests, nicht des Potenzials. Frag dich, ob du dieser Person deine Reputation anvertrauen würdest, ob sie ehrlich kommuniziert und ob die Zusammenarbeit dich Energie gibt. Wenn sich der Test angespannt anfühlte, vertraue diesem Signal. JoinOrigin trifft die Entscheidung nicht für dich. Sein ehrlicher Wert ist der Community- und Raum-Kontext, in dem du Kandidat:innen treffen und mit ihnen arbeiten kannst — der Test sagt dir trotzdem die Wahrheit.',
    'Vereinbare die Grundlagen, bevor du dich verpflichtest. Schreibe Rollen, Zeitaufwand, Aktienaufteilung, Vesting und Entscheidungsregeln auf. Selbst eine einseitige Vereinbarung verhindert die meisten frühen Missverständnisse. JoinOrigin ist ein Community-Betriebssystem — ein organisierter Ort, an dem Vereinbarungen, Rollen und Projektnotizen neben dem Ideenraum leben können. Selbst eine einseitige schriftliche Vereinbarung verhindert die meisten frühen Missverständnisse.',
  ],
  steps: [
    {
      title: 'Kartiere zuerst deine Fähigkeitslücken',
      body: 'Schreibe auf, worin du wirklich gut bist und was das Vorhaben braucht, das du nicht bist. Eine:r Co-Gründer:in sollte deine größte Lücke schließen — technisch, kommerziell oder operativ — nicht deine Stärken duplizieren.',
      joinOriginNote:
        'JoinOrigin ist um Profile, Ideen und Communities gebaut, nicht um Matching — daher ist der ehrliche Rat derselbe wie immer: Wisse, welche Lücke du schließen musst, bevor du suchst. Schreibe deine Stärken und die Bedürfnisse des Vorhabens auf.',
    },
    {
      title: 'Veröffentliche deine Idee und öffne ihren Raum',
      body: 'Eine Idee, die niemand finden kann, zieht keine:n Co-Gründer:in an. Veröffentliche eine klare Ideenseite — was du baust, warum und welche Art von Person du brauchst — und lass ihren Raum automatisch erstellen, damit interessierte Menschen einen Ort zum Sprechen haben.',
      joinOriginNote:
        'Eine Idee auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum, den Ort, an dem Co-Gründer:innen-Gespräche stattfinden. Veröffentliche deine Idee irgendwo öffentlich und öffne einen Raum für Diskussion darum.',
    },
    {
      title: 'Arbeite dein bestehendes Netzwerk für warme Empfehlungen',
      body: 'Sag fünf Menschen, denen du vertraust, was du baust und welche Art von Co-Gründer:in du brauchst. Bitte jede:n um einen Namen. Warme Empfehlungen schlagen kalte Ansprache in fast jedem Fall.',
      joinOriginNote:
        'JoinOrigin macht Origins auffindbar, was dein warmes Netzwerk im Laufe der Zeit erweitert — und jede Empfehlung kann zu einem Raum führen, in dem das echte Gespräch stattfindet. Sag fünf Menschen, denen du vertraust, genau, welche Art von Co-Gründer:in du brauchst.',
    },
    {
      title: 'Tauche konsequent in relevanten Origins und ihren Räumen auf',
      body: 'Besuche Events und tritt Gruppen bei, in denen die richtige Art von Mensch sich versammelt: Gründer:innen-Meetups, Branchen-Communities, Coworking-Spaces und Online-Räume. Wiederholung baut das Vertrauen auf, das zu Empfehlungen führt.',
      joinOriginNote:
        'JoinOrigin hilft Menschen, die Origins zu finden, die zu ihren Zielen passen — die Art von Ort, an dem Gründer:innen sich treffen — und ihren Räumen beizutreten. Wähle die Meetups und Räume, in denen die richtigen Menschen bereits zusammenkommen, und tauche weiter auf.',
    },
    {
      title: 'Führe strukturierte erste Gespräche',
      body: 'Frag nach ihren Fähigkeiten, ihrer Risikotoleranz, ihrem Zeitaufwand und warum sie etwas starten oder ausbauen wollen. Teile deine eigenen Antworten. Das ist ein gegenseitiges Interview, kein Pitch.',
      joinOriginNote:
        'JoinOrigin matched keine Gründer:innen und führt keine Gespräche — das gegenseitige Interview ist deins. Die Plattform bringt dich in dieselben Origins und Räume wie potenzielle Mitgestalter:innen — der Rest liegt bei dir.',
    },
    {
      title: 'Führt gemeinsam ein Testprojekt durch',
      body: 'Wähle etwas Kleines und Echtes — einen Prototyp, eine Landingpage oder einen bezahlten Pilot — und arbeite vier bis sechs Wochen daran. Beobachte, wie ihr Arbeit aufteilt, mit Feedback umgeht und unter Druck agiert.',
      joinOriginNote:
        'JoinOrigin gibt Origins einen gemeinsamen Raum für ihre Arbeit und Projekte — ein natürlicher Ort, an dem ein Testprojekt entstehen kann. Ein kleiner echter Prototyp ist der zuverlässigste Test.',
    },
    {
      title: 'Entscheide auf Basis des Tests, nicht des Potenzials',
      body: 'Frag dich, ob du dieser Person deine Reputation anvertrauen würdest, ob sie ehrlich kommuniziert und ob die Zusammenarbeit dich Energie gibt. Wenn sich der Test angespannt anfühlte, vertraue diesem Signal.',
      joinOriginNote:
        'JoinOrigin trifft die Entscheidung nicht für dich. Sein ehrlicher Wert ist der Community- und Raum-Kontext, in dem du Kandidat:innen treffen und mit ihnen arbeiten kannst — der Test sagt dir trotzdem die Wahrheit.',
    },
    {
      title: 'Vereinbare die Grundlagen, bevor du dich verpflichtest',
      body: 'Schreibe Rollen, Zeitaufwand, Aktienaufteilung, Vesting und Entscheidungsregeln auf. Selbst eine einseitige Vereinbarung verhindert die meisten frühen Missverständnisse.',
      joinOriginNote:
        'JoinOrigin ist ein Community-Betriebssystem — ein organisierter Ort, an dem Vereinbarungen, Rollen und Projektnotizen neben dem Ideenraum leben können. Selbst eine einseitige schriftliche Vereinbarung verhindert die meisten frühen Missverständnisse.',
    },
  ],
};

export default content;
