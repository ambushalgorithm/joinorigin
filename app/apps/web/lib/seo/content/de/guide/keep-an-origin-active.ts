import type { GuideContent } from '../../types';

/**
 * „So hältst du eine Community aktiv“ — zeitlose L1-Anleitung (Design §6.1,
 * TASK-326).
 *
 * Neu auf das digitale Verbinden→Beitreten→Raum-Modell ausgerichtet: Der Raum
 * und seine Aktivität (die den Feed speist) sind die Bindungsfläche — die
 * Community lebt zwischen Treffen im Raum, und Präsenz-Events sind eine
 * nachgelagerte Konsequenz. Der JoinOrigin-Wert ist in die Einleitung und
 * jeden Schritt eingewoben (pro Schritt `joinOriginNote`), mit ehrlicher
 * Rahmung — JoinOrigin verwaltet keine Communities und besetzt keine Events.
 * Einzelnes H1, Schritt-für-Schritt-Struktur, FAQ 1:1 in
 * `FAQPage`-JSON-LD gespiegelt. „Raum“ ist an den Matrix-Raum (§6.3)
 * gebunden.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'keep-an-origin-active',
  title: 'So hältst du eine Community aktiv & engagiert | JoinOrigin',
  description:
    'Halte deine Community aktiv — ob sie neu ist und ihren Rhythmus findet oder etabliert und in Stille driftet — nutze Raum und Feed als Bindungsfläche, baue Rituale auf, teile die Organisator:innen-Last und schaffe kleine Beitragswege. Praktische Schritte von JoinOrigin.',
  intro: [
    'Die meisten Communities sterben nicht an einem schlechten Start; sie sterben an Stille — in dem Moment, in dem Menschen sich nicht mehr verbunden fühlen und leise davondriften. Eine Community aktiv zu halten ist daher ein Menschen-verbinden-Problem: Menschen bleiben, wenn sie sich zugehörig fühlen, und sie fühlen sich zugehörig, wenn es einen sichtbaren, organisierten Ort gibt, an dem die Community lebt. Genau das ist JoinOrigin — und dieselben Mechanismen gelten, ob die Community ein paar Wochen alt ist und ihren Rhythmus noch findet oder Jahre alt und in Stille gedriftet.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden, zu starten und zu organisieren — und in seinem digitalen Modell ist der Raum die Bindungsfläche: ein von der ersteller:in kontrollierter Matrix-Raum, in dem Rituale, Updates und Beiträge sichtbar bleiben und dessen Aktivität in den Feed fließt, der Mitglieder zwischen Treffen verbunden hält. Präsenz-Events bleiben eine nachgelagerte Konsequenz einer geformten Community, nie der Kern — der Raum und sein Feed sind das, was die Community Tag für Tag am Leben hält. JoinOrigin verwaltet keine Communities und besetzt keine Events — die Plattform hält Communities zwischen Treffen verbunden, und das Organisieren ist dein Teil.',
    'Diese Anleitung deckt die praktischen Mechanismen einer gesunden, aktiven Community ab — von den ersten Wochen nach dem Start bis zu einer Community, die seit Jahren läuft: Rituale etablieren, die Teilnahme zur Gewohnheit machen, gemeinsame Artefakte im Raum schaffen, die Organisator:innen-Last verteilen, damit keine einzelne Person ausbrennt, kleine Beitragswege öffnen, damit jedes Mitglied Wert beisteuern kann, und die Signale messen, die dir sagen, ob die Community wirklich lebt. Jeder Schritt zeigt, wie JoinOrigin hilft.',
  ],
  dataPoints: [
    'Wiederkehrende Rituale — ein fester Raum-Rhythmus, ein regelmäßiges Format, ein gemeinsames Artefakt — verwandeln Interesse in Gewohnheit.',
    'Raum-Aktivität zwischen Treffen hält Mitglieder verbunden; Stille treibt sie weg.',
    'Kleine Beitragswege (eine angeheftete Notiz, eine wechselnde Moderation, eine Mitglieder-Highlight) geben Mitgliedern Eigentumsgefühl.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden, zu starten und zu organisieren; es verwaltet keine Communities und besetzt keine Events.',
  ],
  faq: [
    {
      question: 'Wie oft sollte sich eine aktive Community treffen?',
      answer:
        'Monatlich ist die nachhaltigste Basislinie für Präsenz-Treffen; der Raum sollte wöchentlich aktiv sein — Check-ins, Updates und kleine Gespräche. Konsistenz zählt mehr als Häufigkeit: Ein zuverlässiger wöchentlicher Raum-Rhythmus schlägt einen sporadischen.',
    },
    {
      question: 'Was tue ich, wenn das Engagement sinkt?',
      answer:
        'Paniere nicht und starte keine große Kampagne. Frage Mitglieder direkt, was sie brauchen, poste eine einfache Frage im Raum, veranstalte ein kleineres und einfacheres Treffen und delegiere eine Rolle an ein Mitglied. Kleine, responsive Änderungen beleben das Engagement schneller als Masse.',
    },
    {
      question: 'Wie halte ich Mitglieder zwischen Treffen engagiert?',
      answer:
        'Schaffe Berührungspunkte mit geringem Aufwand im Raum: ein gemeinsames Dokument, ein Mitglieder-Highlight, einen regelmäßigen Check-in-Thread oder ein „Wer arbeitet woran“-Update. Das Ziel ist ein sichtbarer Herzschlag im Raum und in seinem Feed, nicht konstante Benachrichtigungen.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, meine Community aktiv zu halten?',
      answer:
        'Ja. JoinOrigin hilft Menschen, Communities zu finden, zu starten und zu organisieren — ein Raum und Feed, in dem die Community zwischen Treffen sichtbar bleibt. Die Praktiken dieser Anleitung — Rituale, geteilte Rollen und kleine Beiträge — funktionieren auf der Plattform und mit den Tools, die du bereits hast.',
    },
  ],
  sections: [
    'Definiere ein Kernritual. Wähle eine wiederkehrende Praxis, auf die sich alle verlassen können: ein monatliches Treffen, ein wöchentliches Check-in, eine gemeinsame Lektüre oder ein Projekt-Update. Rituale schaffen den Herzschlag, der eine Community am Leben hält — und in einer digital-first Community findet das Ritual im Raum statt. Auf JoinOrigin ist der Rhythmus einer Community in einem organisierten Raum sichtbar — Mitglieder kennen immer das nächste Ritual. Wähle eine wiederkehrende Praxis und schütze sie.',
    'Schaffe ein gemeinsames Artefakt im Raum. Beginne eine angeheftete Notiz oder ein Dokument, das festhält, was die Community tut — Treffen-Notizen, Mitglieder-Vorstellungen, Projekt-Updates. Ein lebendiges Artefakt hält Mitglieder zwischen Treffen orientiert. JoinOrigin ist der gemeinsame Raum, in dem Notizen, Vorstellungen und Updates neben der Community leben — ein von Natur aus lebendiges Artefakt. Hefte ein einfaches gemeinsames Dokument im Raum an.',
    'Verteile die Organisator:innen-Last. Rekrutiere zwei oder drei Co-Moderator:innen oder Helfer:innen und rotiere kleine Rollen: Begrüßen, Notizen schreiben, Themen wählen, Ortskontakt. Geteiltes Eigentum ist der beste Schutz gegen Ausbrennen. JoinOrigin besetzt oder verwaltet keine Communities — geteiltes Eigentum musst du aufbauen. Die Plattform gibt Helfer:innen und Organisator:innen einen Raum zur Koordination. Rekrutiere zwei oder drei Co-Moderator:innen und rotiere die Rollen.',
    'Öffne kleine Beitragswege. Gib Mitgliedern Wege, Wert beizutragen, ohne große Verpflichtungen: ein Mitglieder-Highlight, eine wechselnde Diskussionsleitung, eine gemeinsame Playlist oder Leseliste oder einen angehefteten „Hilfe gesucht“-Bereich im Raum. Auf JoinOrigin haben Mitglieder sichtbare Beitragswege — eine Community, in der es leicht ist, Wert zu schaffen. Mitglieder-Highlights und wechselnde Leitungen schaffen dasselbe Eigentumsgefühl.',
    'Halte einen vorhersehbaren Kommunikationsrhythmus im Raum. Sende ein kurzes Update pro Woche oder Monat nach festem Zeitplan, gepostet im Raum und in den Feed fließend. Vorhersehbarkeit baut Vertrauen; Stille baut Drift. JoinOrigin hält den Herzschlag der Community in einem Raum — ein Update, nach Zeitplan, wo alle es sehen können. Ein kurzes wöchentliches Update baut Vertrauen auf.',
    'Beobachte die Engagement-Signale. Verfolge Raum-Aktivität, wiederholte Teilnahme und Beitragsrate. Eine gesunde Community wächst ihre Wiederholungsrate, bevor sie ihre Gesamtgröße wächst — konzentriere dich auf die Mitglieder, die in den Raum zurückkehren. Auf JoinOrigin können Organisator:innen in einem organisierten Raum und Feed sehen, wie ihre Community läuft. Verfolge Aktivität, wiederholte Teilnahme und Beitragsrate mit einem einfachen Blatt.',
    'Frage regelmäßig im Raum nach Feedback. Nutze eine einfache Ein-Fragen-Umfrage nach jedem Treffen: Was hat dir gefallen, was würdest du ändern. Handle nach den Antworten und sag der Community, was du geändert hast. JoinOrigin sammelt und bewahrt Feedback bei der Community, zu der es gehört — im Raum. Eine Ein-Fragen-Umfrage nach jedem Treffen funktioniert — handle dann nach den Antworten.',
    'Passe das Format an, während die Community reift. Was für zehn Mitglieder funktioniert hat, passt vielleicht nicht für fünfzig. Überarbeite Format, Ort und Takt vierteljährlich und entwickle dich bewusst weiter, statt aus Gewohnheit festzuhalten. JoinOrigin hilft Communities, sich zu entwickeln — ein Raum, in dem Formatänderungen und Ankündigungen alle erreichen. Überarbeite dein Format und deinen Ort vierteljährlich mit Absicht.',
  ],
  steps: [
    {
      title: 'Definiere ein Kernritual',
      body: 'Wähle eine wiederkehrende Praxis, auf die sich alle verlassen können: ein monatliches Treffen, ein wöchentliches Check-in, eine gemeinsame Lektüre oder ein Projekt-Update. Rituale schaffen den Herzschlag, der eine Community am Leben hält — und in einer digital-first Community findet das Ritual im Raum statt.',
      joinOriginNote:
        'Auf JoinOrigin ist der Rhythmus einer Community in einem organisierten Raum sichtbar — Mitglieder kennen immer das nächste Ritual. Wähle eine wiederkehrende Praxis und schütze sie.',
    },
    {
      title: 'Schaffe ein gemeinsames Artefakt im Raum',
      body: 'Beginne eine angeheftete Notiz oder ein Dokument, das festhält, was die Community tut — Treffen-Notizen, Mitglieder-Vorstellungen, Projekt-Updates. Ein lebendiges Artefakt hält Mitglieder zwischen Treffen orientiert.',
      joinOriginNote:
        'JoinOrigin ist der gemeinsame Raum, in dem Notizen, Vorstellungen und Updates neben der Community leben — ein von Natur aus lebendiges Artefakt. Hefte ein einfaches gemeinsames Dokument im Raum an.',
    },
    {
      title: 'Verteile die Organisator:innen-Last',
      body: 'Rekrutiere zwei oder drei Co-Moderator:innen oder Helfer:innen und rotiere kleine Rollen: Begrüßen, Notizen schreiben, Themen wählen, Ortskontakt. Geteiltes Eigentum ist der beste Schutz gegen Ausbrennen.',
      joinOriginNote:
        'JoinOrigin besetzt oder verwaltet keine Communities — geteiltes Eigentum musst du aufbauen. Die Plattform gibt Helfer:innen und Organisator:innen einen Raum zur Koordination. Rekrutiere zwei oder drei Co-Moderator:innen und rotiere die Rollen.',
    },
    {
      title: 'Öffne kleine Beitragswege',
      body: 'Gib Mitgliedern Wege, Wert beizutragen, ohne große Verpflichtungen: ein Mitglieder-Highlight, eine wechselnde Diskussionsleitung, eine gemeinsame Playlist oder Leseliste oder einen angehefteten „Hilfe gesucht“-Bereich im Raum.',
      joinOriginNote:
        'Auf JoinOrigin haben Mitglieder sichtbare Beitragswege — eine Community, in der es leicht ist, Wert zu schaffen. Mitglieder-Highlights und wechselnde Leitungen schaffen dasselbe Eigentumsgefühl.',
    },
    {
      title: 'Halte einen vorhersehbaren Kommunikationsrhythmus im Raum',
      body: 'Sende ein kurzes Update pro Woche oder Monat nach festem Zeitplan, gepostet im Raum und in den Feed fließend. Vorhersehbarkeit baut Vertrauen; Stille baut Drift.',
      joinOriginNote:
        'JoinOrigin hält den Herzschlag der Community in einem Raum — ein Update, nach Zeitplan, wo alle es sehen können. Ein kurzes wöchentliches Update baut Vertrauen auf.',
    },
    {
      title: 'Beobachte die Engagement-Signale',
      body: 'Verfolge Raum-Aktivität, wiederholte Teilnahme und Beitragsrate. Eine gesunde Community wächst ihre Wiederholungsrate, bevor sie ihre Gesamtgröße wächst — konzentriere dich auf die Mitglieder, die in den Raum zurückkehren.',
      joinOriginNote:
        'Auf JoinOrigin können Organisator:innen in einem organisierten Raum und Feed sehen, wie ihre Community läuft. Verfolge Aktivität, wiederholte Teilnahme und Beitragsrate mit einem einfachen Blatt.',
    },
    {
      title: 'Frage regelmäßig im Raum nach Feedback',
      body: 'Nutze eine einfache Ein-Fragen-Umfrage nach jedem Treffen: Was hat dir gefallen, was würdest du ändern. Handle nach den Antworten und sag der Community, was du geändert hast.',
      joinOriginNote:
        'JoinOrigin sammelt und bewahrt Feedback bei der Community, zu der es gehört — im Raum. Eine Ein-Fragen-Umfrage nach jedem Treffen funktioniert — handle dann nach den Antworten.',
    },
    {
      title: 'Passe das Format an, während die Community reift',
      body: 'Was für zehn Mitglieder funktioniert hat, passt vielleicht nicht für fünfzig. Überarbeite Format, Ort und Takt vierteljährlich und entwickle dich bewusst weiter, statt aus Gewohnheit festzuhalten.',
      joinOriginNote:
        'JoinOrigin hilft Communities, sich zu entwickeln — ein Raum, in dem Formatänderungen und Ankündigungen alle erreichen. Überarbeite dein Format und deinen Ort vierteljährlich mit Absicht.',
    },
  ],
};

export default content;
