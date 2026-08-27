import type { GuideContent } from '../../types';

/**
 * „Hybride Communities“ — zeitlose L1-Anleitung (Design §6.1, TASK-326).
 *
 * Neu auf das digitale Verbinden→Beitreten→Raum-Modell ausgerichtet: Der Raum
 * ist das, was den Online- und den (nachgelagerten) Präsenz-Teil einer
 * hybriden Community verbindet — eine Community, ein Raum, zwei Einstiegspunkte.
 * Der JoinOrigin-Wert ist in die Einleitung und jeden Schritt eingewoben
 * (pro Schritt `joinOriginNote`), mit ehrlicher Rahmung — JoinOrigin stellt
 * keine Event-Tools bereit und besetzt keine hybriden Events. Einzelnes H1,
 * Schritt-für-Schritt-Struktur, FAQ 1:1 in `FAQPage`-JSON-LD gespiegelt.
 * „Raum“ ist an den Matrix-Raum (§6.3) gebunden — physische Orte werden als
 * Orte/Räumlichkeiten beschrieben, nie als „Räume“.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'hybrid-origins',
  title: 'Hybride Communities: So führst du Präsenz + Online zusammen | JoinOrigin',
  description:
    'Führe eine hybride Community, in der der Raum Präsenz- und Online-Mitglieder verbindet — ob du frisch startest oder eine bestehende Community hybrid machst — wähle die richtigen Tools, gestalte gleichberechtigte Teilnahme und halte beide Zielgruppen engagiert. Von JoinOrigin.',
  intro: [
    'Eine hybride Community bringt Menschen gleichzeitig an zwei Orten zusammen — physisch in einer Räumlichkeit und virtuell durch einen Bildschirm — und die echte Herausforderung dreht sich wieder um Menschen: sicherzustellen, dass sich beide Zielgruppen als Teil einer verbundenen Community fühlen, nicht als zwei getrennte. JoinOrigin ist genau mit diesem Menschen-verbinden-Ziel gebaut, und das Modell funktioniert für eine Community, die bereits existiert, genauso wie für eine, die gerade erst startet — eine etablierte Präsenz-Gruppe kann eine Online-Hälfte hinzufügen, und eine Online-Community kann beginnen, sich lokal zu treffen.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden, beizutreten und zu starten — so hat eine hybride Gruppe einen Raum, der den Online- und den (nachgelagerten) Präsenz-Teil verbindet: lokale und entfernte Mitglieder sehen dieselbe Community, denselben Rhythmus und dieselben nächsten Schritte. Im digitalen Verbinden→Beitreten→Raum-Modell ist der Raum die beständige Fläche, auf der beide Hälften der Community zwischen Treffen leben; das Präsenz-Event ist eine nachgelagerte Konsequenz, die der Raum vorher und nachher zusammenhält. JoinOrigin stellt keine Event-Tools bereit und besetzt keine hybriden Events — die Plattform gibt jeder Community — hybrid eingeschlossen — einen einzigen Raum, in dem ihre Mitglieder verbunden bleiben.',
    'Diese Anleitung deckt die praktischen Entscheidungen ab, die hybride Communities erfolgreich machen — für neue und bestehende Gruppen gleichermaßen: entscheiden, ob hybrid das richtige Modell ist, den Raum bauen, den beide Zielgruppen teilen, ein Format und Tools wählen, die passen, das Treffen so gestalten, dass Präsenz- und Online-Mitglieder dieselbe Erfahrung teilen, den Raum so managen, dass keine Seite dominiert, und einen beständigen Raum halten, der die Community zwischen Treffen zusammenhält. Jeder Schritt zeigt, wo JoinOrigin hilft.',
  ],
  dataPoints: [
    'Eine hybride Community ist eine Community mit zwei Einstiegspunkten, nicht zwei Zielgruppen, die separat bedient werden müssen.',
    'Der Raum ist das Verbindungsgewebe: ein gemeinsamer Ort, an dem beide Zielgruppen dieselben Updates, Notizen und nächsten Schritte sehen.',
    'Einfache, zuverlässige Tools — ein Videolink, ein gemeinsames Dokument — reduzieren die Reibung, die hybride Treffen tötet.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden oder zu starten; es stellt keine Event-Tools bereit und besetzt keine hybriden Events.',
  ],
  faq: [
    {
      question: 'Wann sollte eine Community hybrid werden?',
      answer:
        'Wenn ein Teil deiner Zielgruppe zuverlässig nicht persönlich teilnehmen kann — wegen Entfernung, Zeitplan oder Mobilität — und die Community trotzdem eine gemeinsame Identität will. Wenn alle sich lokal treffen können, ist ein persönliches Treffen einfacher und oft besser.',
    },
    {
      question: 'Was ist das minimale Tool-Setup für ein hybrides Treffen?',
      answer:
        'Ein Videocall-Link für entfernte Mitglieder, ein gemeinsames Dokument für Notizen und ein Raum, in dem beide Zielgruppen zwischen Treffen verbunden bleiben. Mehr Tools bedeuten mehr Fehlerquellen; beginne minimal und füge nur hinzu, worum die Community bittet.',
    },
    {
      question: 'Wie verhindere ich, dass sich entfernte Mitglieder wie Zuschauer fühlen?',
      answer:
        'Gestalte für gleichberechtigte Teilnahme: Führe eine hybride Vorstellungsrunde durch, sprich entfernte Mitglieder explizit an, teile den Bildschirm für alles Visuelle und nutze ein gemeinsames Dokument, in dem beide Seiten schreiben können. Benenne eine Person, die die entfernte Seite kontinuierlich beobachtet.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, eine hybride Community zu führen?',
      answer:
        'Ja. JoinOrigin hilft Menschen, Communities zu finden und zu starten — ein Raum, in dem lokale und entfernte Mitglieder verbunden bleiben. JoinOrigin stellt keine Event-Tools bereit, daher funktionieren die praktischen hybriden Praktiken dieser Anleitung mit Tools, die du bereits hast.',
    },
  ],
  sections: [
    'Entscheide, ob hybrid das richtige Modell ist. Gehe hybrid, wenn es Sinn ergibt, sich persönlich zu treffen. Wenn die meisten Mitglieder sich lokal treffen können, macht das persönliche Treffen die Bindung stärker — hybrid erlaubt es, Vertrauen schneller aufzubauen und Menschen gründlicher zu lesen. JoinOrigin ist darauf ausgelegt, jeder Community zu helfen, Mitglieder zu finden und zu halten, aber die Format-Entscheidung liegt bei dir. Gehe nur hybrid, wenn es Sinn ergibt, sich persönlich zu treffen.',
    'Baue den Raum, der beide Zielgruppen verbindet. Stelle vor allem anderen sicher, dass die Community einen gemeinsamen Raum hat, in dem entfernte und lokale Mitglieder sprechen, Updates teilen und dieselben nächsten Schritte sehen. Der Raum ist das, was hybrid wie eine Community statt wie zwei fühlen lässt. Auf JoinOrigin hat jede Gruppe ab dem Veröffentlichen einen Raum — die beständige Fläche, die den Online- und den Präsenz-Teil zusammenhält. Richte einen gemeinsamen Raum ein, dem beide Zielgruppen beitreten können.',
    'Wähle ein zuverlässiges Video-Tool und ein gemeinsames Dokument. Halte den Stack minimal: einen Videocall-Link für entfernte Mitglieder, ein Dokument für Notizen und geteilte Links und einen Kalendereintrag. Komplexität ist der Feind konsistenter hybrider Treffen. JoinOrigin stellt keine Event-Tools bereit — halte den Stack minimal. Die Plattform ist der beständige Raum, in dem Link und Dokument leben, nicht das Event-Tool selbst.',
    'Gestalte die Tagesordnung für zwei Zielgruppen. Führe eine Vorstellungsrunde durch, die entfernte Mitglieder namentlich einbezieht, halte alles Visuelle auf einem geteilten Bildschirm und lass Raum für die Online-Seite zu sprechen. Eine hybride Tagesordnung benennt beide Zielgruppen explizit. Auf JoinOrigin teilen beide Zielgruppen einen Community-Raum, was „für zwei Zielgruppen gestalten“ zu einer natürlichen Passung macht. Benenne beide Zielgruppen explizit in der Tagesordnung.',
    'Benenne eine Brückenperson. Eine Person beobachtet die entfernte Seite: begrüßt späte Teilnehmende, ruft entfernte Wortmeldungen auf und gibt weiter, was der Ort verpasst. Ohne Brücke wird das Online-Publikum zu Zuschauer:innen. JoinOrigin besetzt keine Events — die Brückenperson ist eine menschliche Rolle. Die Plattform hält die Community in einem Raum organisiert, sodass die Brücke einen Ort hat, um zu sehen, wer beigetreten ist und was geteilt wurde.',
    'Manage den Ort so, dass beide Seiten teilnehmen. Bitte Präsenz-Mitglieder, nacheinander zu sprechen und Fragen für das Mikrofon zu wiederholen, setze Menschen nahe an die Kamera und wechsle die Wortbeiträge zwischen Ort und Call — während der gemeinsame Raum für beide offen bleibt. JoinOrigin ist auf gleichberechtigte Verbindung zwischen Mitgliedern ausgelegt — dasselbe Prinzip, das hybride Diskussionen zum Funktionieren bringt. Wechsle die Wortbeiträge zwischen Ort und Call und wiederhole Fragen für das Mikrofon.',
    'Halte den Raum zwischen Treffen lebendig. Die Community lebt zwischen Events im Raum: Entfernte und lokale Mitglieder teilen dort Updates, stellen Fragen und planen gemeinsam. Hybrid ist kein einmaliges Event-Format — es ist ein fortlaufender gemeinsamer Raum. Das ist der Schritt, der JoinOrigins Designabsicht am nächsten kommt: Ein Community-Betriebssystem ist ein beständiger Raum, in dem entfernte und lokale Mitglieder Updates teilen und gemeinsam planen. Ein gemeinsamer Raum funktioniert — JoinOrigin ist dieser Raum.',
    'Halte die Ergebnisse fest und teile sie im Raum. Poste nach jedem Treffen Notizen, Aufnahmen und nächste Schritte im gemeinsamen Raum. Ein sichtbares Artefakt hält beide Zielgruppen verbunden und lässt die Community produktiv wirken. Auf JoinOrigin lebt das Ergebnis einer Community in einem organisierten Raum — Notizen, Aufnahmen, nächste Schritte. Poste sie nach jedem Treffen im gemeinsamen Raum.',
  ],
  steps: [
    {
      title: 'Entscheide, ob hybrid das richtige Modell ist',
      body: 'Gehe hybrid, wenn es Sinn ergibt, sich persönlich zu treffen. Wenn die meisten Mitglieder sich lokal treffen können, macht das persönliche Treffen die Bindung stärker — hybrid erlaubt es, Vertrauen schneller aufzubauen und Menschen gründlicher zu lesen.',
      joinOriginNote:
        'JoinOrigin ist darauf ausgelegt, jeder Community zu helfen, Mitglieder zu finden und zu halten, aber die Format-Entscheidung liegt bei dir. Gehe nur hybrid, wenn es Sinn ergibt, sich persönlich zu treffen.',
    },
    {
      title: 'Baue den Raum, der beide Zielgruppen verbindet',
      body: 'Stelle vor allem anderen sicher, dass die Community einen gemeinsamen Raum hat, in dem entfernte und lokale Mitglieder sprechen, Updates teilen und dieselben nächsten Schritte sehen. Der Raum ist das, was hybrid wie eine Community statt wie zwei fühlen lässt.',
      joinOriginNote:
        'Auf JoinOrigin hat jede Gruppe ab dem Veröffentlichen einen Raum — die beständige Fläche, die den Online- und den Präsenz-Teil zusammenhält. Richte einen gemeinsamen Raum ein, dem beide Zielgruppen beitreten können.',
    },
    {
      title: 'Wähle ein zuverlässiges Video-Tool und ein gemeinsames Dokument',
      body: 'Halte den Stack minimal: einen Videocall-Link für entfernte Mitglieder, ein Dokument für Notizen und geteilte Links und einen Kalendereintrag. Komplexität ist der Feind konsistenter hybrider Treffen.',
      joinOriginNote:
        'JoinOrigin stellt keine Event-Tools bereit — halte den Stack minimal. Die Plattform ist der beständige Raum, in dem Link und Dokument leben, nicht das Event-Tool selbst.',
    },
    {
      title: 'Gestalte die Tagesordnung für zwei Zielgruppen',
      body: 'Führe eine Vorstellungsrunde durch, die entfernte Mitglieder namentlich einbezieht, halte alles Visuelle auf einem geteilten Bildschirm und lass Raum für die Online-Seite zu sprechen. Eine hybride Tagesordnung benennt beide Zielgruppen explizit.',
      joinOriginNote:
        'Auf JoinOrigin teilen beide Zielgruppen einen Community-Raum, was „für zwei Zielgruppen gestalten“ zu einer natürlichen Passung macht. Benenne beide Zielgruppen explizit in der Tagesordnung.',
    },
    {
      title: 'Benenne eine Brückenperson',
      body: 'Eine Person beobachtet die entfernte Seite: begrüßt späte Teilnehmende, ruft entfernte Wortmeldungen auf und gibt weiter, was der Ort verpasst. Ohne Brücke wird das Online-Publikum zu Zuschauer:innen.',
      joinOriginNote:
        'JoinOrigin besetzt keine Events — die Brückenperson ist eine menschliche Rolle. Die Plattform hält die Community in einem Raum organisiert, sodass die Brücke einen Ort hat, um zu sehen, wer beigetreten ist und was geteilt wurde.',
    },
    {
      title: 'Manage den Ort so, dass beide Seiten teilnehmen',
      body: 'Bitte Präsenz-Mitglieder, nacheinander zu sprechen und Fragen für das Mikrofon zu wiederholen, setze Menschen nahe an die Kamera und wechsle die Wortbeiträge zwischen Ort und Call — während der gemeinsame Raum für beide offen bleibt.',
      joinOriginNote:
        'JoinOrigin ist auf gleichberechtigte Verbindung zwischen Mitgliedern ausgelegt — dasselbe Prinzip, das hybride Diskussionen zum Funktionieren bringt. Wechsle die Wortbeiträge zwischen Ort und Call und wiederhole Fragen für das Mikrofon.',
    },
    {
      title: 'Halte den Raum zwischen Treffen lebendig',
      body: 'Die Community lebt zwischen Events im Raum: Entfernte und lokale Mitglieder teilen dort Updates, stellen Fragen und planen gemeinsam. Hybrid ist kein einmaliges Event-Format — es ist ein fortlaufender gemeinsamer Raum.',
      joinOriginNote:
        'Das ist der Schritt, der JoinOrigins Designabsicht am nächsten kommt: Ein Community-Betriebssystem ist ein beständiger Raum, in dem entfernte und lokale Mitglieder Updates teilen und gemeinsam planen. Ein gemeinsamer Raum funktioniert — JoinOrigin ist dieser Raum.',
    },
    {
      title: 'Halte die Ergebnisse fest und teile sie im Raum',
      body: 'Poste nach jedem Treffen Notizen, Aufnahmen und nächste Schritte im gemeinsamen Raum. Ein sichtbares Artefakt hält beide Zielgruppen verbunden und lässt die Community produktiv wirken.',
      joinOriginNote:
        'Auf JoinOrigin lebt das Ergebnis einer Community in einem organisierten Raum — Notizen, Aufnahmen, nächste Schritte. Poste sie nach jedem Treffen im gemeinsamen Raum.',
    },
  ],
};

export default content;
