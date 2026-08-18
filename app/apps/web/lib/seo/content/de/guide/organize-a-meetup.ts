import type { GuideContent } from '../../types';

/**
 * „So organisierst du ein Meetup“ — zeitlose L1-Anleitung (Design §6.1,
 * TASK-326).
 *
 * Neu ausgerichtet: Meetups sind das, was eine Gruppe TUT, NACHDEM sie sich
 * geformt hat — der digitale Verbinden→Beitreten→Raum-Weg kommt zuerst
 * (Gruppe veröffentlichen → Raum wird automatisch erstellt → Mitglieder
 * treten per Link bei), und das Präsenz-Meetup ist eine nachgelagerte
 * Konsequenz. Der JoinOrigin-Wert ist in die Einleitung und jeden Schritt
 * eingewoben (pro Schritt `joinOriginNote`), mit ehrlicher Rahmung —
 * JoinOrigin bucht keine Orte und besetzt keine Events. Einzelnes H1,
 * Schritt-für-Schritt-Struktur, FAQ 1:1 in `FAQPage`-JSON-LD gespiegelt.
 * „Raum“ ist an den Matrix-Raum (§6.3) gebunden — physische Orte werden als
 * Orte/Räumlichkeiten beschrieben, nie als „Räume“.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'organize-a-meetup',
  title: 'So organisierst du ein Meetup: Orte, Tagesordnung & Bewerbung | JoinOrigin',
  description:
    'Organisiere ein Meetup, sobald deine Gruppe geformt ist — ob sie letzten Monat gegründet wurde oder sich seit Jahren trifft — wähle ein Format, buche einen Ort, baue eine Tagesordnung auf, bewirb es und führe den Abend durch. Eine praktische Checkliste von JoinOrigin.',
  intro: [
    'Ein Meetup ist ein wiederkehrendes Präsenz-Event, bei dem Menschen sich um ein gemeinsames Interesse versammeln — und auf JoinOrigin ist es ein natürlicher nächster Schritt nach der Kommunikation im Raum. Der digitale Weg kommt zuerst: Menschen finden eine Gruppe über einen Link und treten ihr bei, und der Raum der Gruppe wird der Ort, an dem Mitglieder zwischen Treffen sprechen, planen und verbunden bleiben. Das Präsenz-Meetup ist der nächste Schritt dieser geformten Community — ob die Gruppe letzten Monat gegründet wurde oder sich seit Jahren informell trifft, der Raum gibt ihr ein organisiertes Zuhause, aus dem ein Meetup wachsen kann.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden und eigene zu starten — so hat ein Meetup ein Zuhause, in dem interessierte Mitglieder die Gruppe entdecken, ihrem Raum beitreten und das Treffen koordinieren können, statt von der Kontaktliste einer Person abzuhängen. JoinOrigin bucht keine Orte und besetzt keine Events — der gesamte Zweck der Plattform ist es, Menschen zu verbinden, die ein Interesse teilen, und das Treffen selbst liegt bei dir.',
    'Diese Anleitung deckt den gesamten Lebenszyklus eines Meetups ab, nachdem die Gruppe existiert — für eine neu gegründete Gruppe und für eine, die sich seit Jahren trifft: ein Format wählen, das zu deiner Zielgruppe passt, einen Ort finden und buchen, ohne das Budget zu sprengen, eine Tagesordnung mit klarem Anfang und Ende bauen, das Event dort bewerben, wo deine Zielgruppe tatsächlich hinschaut, und den Abend so führen, dass Teilnehmende das nächste wollen. Jeder Schritt enthält eine Notiz dazu, wie JoinOrigin hilft — und der erste Schritt dreht sich um die digitale Gruppe, denn ohne Gruppe und Raum gibt es keine Community, die sich treffen kann.',
  ],
  dataPoints: [
    'Ein einfaches Meetup braucht nur drei Dinge: ein Format, einen Ort und einen Bewerbungskanal.',
    'Abend-Meetups unter der Woche und Wochenend-Morgen-Sessions sind die häufigsten wiederkehrenden Formate.',
    'Die meisten Orte — Bibliotheken, Cafés, Coworking-Spaces — bieten kostenlose oder günstige Flächen für Community-Events.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden oder zu starten; es bucht keine Orte und besetzt keine Events.',
  ],
  faq: [
    {
      question: 'Wie weit im Voraus sollte ich ein Meetup bewerben?',
      answer:
        'Zwei bis drei Wochen sind eine gute Balance: früh genug, damit Menschen planen können, kurz genug, um Dringlichkeit zu halten. Kündige es zuerst im Raum der Gruppe an, dann teile das Event dort, wo deine Zielgruppe sich versammelt. Sende zwei Tage vorher und noch einmal am Tag des Events eine Erinnerung.',
    },
    {
      question: 'Was, wenn nur wenige Leute auftauchen?',
      answer:
        'Das ist normal, besonders am Anfang. Führe die Session für die durch, die da sind, sammle ihr Feedback im Raum und nutze die nächste Ausgabe, um die Bewerbung zu verbessern. Konsistenz zählt mehr als jede einzelne Teilnehmerzahl.',
    },
    {
      question: 'Brauchen Meetups eine formale Tagesordnung?',
      answer:
        'Ja, eine leichte. Ein klarer Anfang, eine kurze Vorstellungsrunde, eine Hauptaktivität oder ein Vortrag und eine definierte Endzeit geben Teilnehmenden das Gefühl, dass ihre Zeit respektiert wurde — genau das bringt sie zurück.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, Meetups zu organisieren?',
      answer:
        'Ja. JoinOrigin hilft Menschen, Communities zu finden und zu starten — ein organisiertes digitales Zuhause, in dem der Raum der Gruppe der Ort ist, an dem Mitglieder koordinieren und ein Meetup entdeckt werden kann. JoinOrigin organisiert selbst keine Events, daher sind die praktischen Schritte dieser Anleitung dein Part.',
    },
  ],
  sections: [
    'Forme zuerst die Gruppe und öffne ihren Raum. Ein Meetup ist das, was eine Gruppe tut, nachdem sie sich geformt hat — also beginne mit dem digitalen Kern: veröffentliche die Gruppe, lass ihren Raum automatisch erstellen und lade Mitglieder über einen Link ein. Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum, einen von der ersteller:in kontrollierten Ort, an dem Mitglieder planen und verbunden bleiben. Richte deine Gruppe und ihren Raum lieber in den Tools ein, die du bereits nutzt, bevor du ein einziges Event planst.',
    'Wähle ein Format, das zu deiner Zielgruppe passt. Entscheide zwischen einem Vortrag, einem Workshop, einem Diskussionskreis, einem sozialen Mixer oder einer Arbeitssitzung. Passe das Format an das an, was die Zielgruppe will — Lernen, Verbindung oder Fortschritt bei gemeinsamer Arbeit. Auf JoinOrigin können Mitglieder das Format einer Community vor dem Beitritt sehen — das zieht die richtigen Menschen an und setzt Erwartungen. Wähle ein Format, für das deine Zielgruppe tatsächlich auftaucht.',
    'Wähle ein Datum und einen Rhythmus. Abende unter der Woche und Wochenend-Morgen funktionieren für die meisten Zielgruppen am besten. Wähle einen wiederkehrenden Slot — monatlich ist Standard — und schütze ihn wie einen Termin, damit Menschen eine Gewohnheit aufbauen können. JoinOrigin macht den Rhythmus einer Community an einem Ort sichtbar, sodass Mitglieder den nächsten Termin kennen, ohne danach suchen zu müssen. Schütze deinen wiederkehrenden Slot wie einen Termin.',
    'Buche früh einen Ort. Bibliotheken, Cafés, Coworking-Lounges, Gemeindezentren und Parks veranstalten Community-Events zu niedrigen oder keinen Kosten. Bestätige Kapazität, Öffnungszeiten und etwaige Buchungsanforderungen schriftlich. JoinOrigin bucht keine Orte und koordiniert keine physischen Räume — sein Designfokus liegt darauf, Menschen im digitalen Raum zu verbinden. Bestätige Kapazität und Öffnungszeiten direkt und schriftlich mit dem Ort.',
    'Entwirf eine leichte Tagesordnung. Halte sie einfach: Begrüßung und Einleitung, Hauptaktivität, offene Diskussion, Abschluss und nächster Termin. Plane insgesamt 60–90 Minuten und veröffentliche die Tagesordnung mit der Event-Ankündigung und im Raum. JoinOrigin ist ein Community-Betriebssystem, in dem gemeinsame Artefakte wie Tagesordnungen und Notizen neben der Community leben. Eine einfache veröffentlichte Tagesordnung erledigt die Arbeit.',
    'Bewirb dort, wo deine Zielgruppe bereits ist. Teile das Event in Nischen-Gruppen, lokalen Newslettern, Community-Pinnwänden und relevanten Social-Kanälen — und weise alle auf den Beitrittslink der Gruppe hin, damit Teilnehmende zu Mitgliedern werden statt zu Einmal-Gästen. JoinOrigin ist der Ort, an dem Menschen, die eine Community suchen, sie finden und über einen Link beitreten. Bewirb in den Nischen-Gruppen und Newslettern, in denen deine Zielgruppe sich bereits versammelt, und teile den Beitrittslink mit jeder:m Teilnehmenden.',
    'Führe den Abend mit klarem Rhythmus durch. Beginne pünktlich, begrüße Nachzügler:innen, halte die Hauptaktivität auf Kurs und schließe mit der Ankündigung des nächsten Termins. Ende pünktlich — es ist das stärkste Respekt-Signal. JoinOrigin besetzt keine Events — die Erfahrung liegt bei dir. Die Plattform hält die Geschichte der Community in einem organisierten Raum — das Versprechen, den Rhythmus und die Menschen. Pünktlich zu enden ist das stärkste Respekt-Signal.',
    'Folge innerhalb von 24 Stunden im Raum nach. Danke Teilnehmenden, teile Links oder Notizen und lade zu Feedback ein, wo die ganze Gruppe es sehen kann. Die Nachbereitung verwandelt ein einzelnes Event in eine wiederkehrende Community. JoinOrigin gibt einer Community einen beständigen Raum, in dem Zusammenfassung, nächster Termin und Feedback leben — ein einzelnes Event wird zur wiederkehrenden Community. Werde entdeckt und halte den Schwung.',
  ],
  steps: [
    {
      title: 'Forme zuerst die Gruppe und öffne ihren Raum',
      body: 'Ein Meetup ist das, was eine Gruppe tut, nachdem sie sich geformt hat — also beginne mit dem digitalen Kern: veröffentliche die Gruppe, lass ihren Raum automatisch erstellen und lade Mitglieder über einen Link ein.',
      joinOriginNote:
        'Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum, einen von der ersteller:in kontrollierten Ort, an dem Mitglieder planen und verbunden bleiben. Richte deine Gruppe und ihren Raum lieber in den Tools ein, die du bereits nutzt, bevor du ein einziges Event planst.',
    },
    {
      title: 'Wähle ein Format, das zu deiner Zielgruppe passt',
      body: 'Entscheide zwischen einem Vortrag, einem Workshop, einem Diskussionskreis, einem sozialen Mixer oder einer Arbeitssitzung. Passe das Format an das an, was die Zielgruppe will — Lernen, Verbindung oder Fortschritt bei gemeinsamer Arbeit.',
      joinOriginNote:
        'Auf JoinOrigin können Mitglieder das Format einer Community vor dem Beitritt sehen — das zieht die richtigen Menschen an und setzt Erwartungen. Wähle ein Format, für das deine Zielgruppe tatsächlich auftaucht.',
    },
    {
      title: 'Wähle ein Datum und einen Rhythmus',
      body: 'Abende unter der Woche und Wochenend-Morgen funktionieren für die meisten Zielgruppen am besten. Wähle einen wiederkehrenden Slot — monatlich ist Standard — und schütze ihn wie einen Termin, damit Menschen eine Gewohnheit aufbauen können.',
      joinOriginNote:
        'JoinOrigin macht den Rhythmus einer Community an einem Ort sichtbar, sodass Mitglieder den nächsten Termin kennen, ohne danach suchen zu müssen. Schütze deinen wiederkehrenden Slot wie einen Termin.',
    },
    {
      title: 'Buche früh einen Ort',
      body: 'Bibliotheken, Cafés, Coworking-Lounges, Gemeindezentren und Parks veranstalten Community-Events zu niedrigen oder keinen Kosten. Bestätige Kapazität, Öffnungszeiten und etwaige Buchungsanforderungen schriftlich.',
      joinOriginNote:
        'JoinOrigin bucht keine Orte und koordiniert keine physischen Räume — sein Designfokus liegt darauf, Menschen im digitalen Raum zu verbinden. Bestätige Kapazität und Öffnungszeiten direkt und schriftlich mit dem Ort.',
    },
    {
      title: 'Entwirf eine leichte Tagesordnung',
      body: 'Halte sie einfach: Begrüßung und Einleitung, Hauptaktivität, offene Diskussion, Abschluss und nächster Termin. Plane insgesamt 60–90 Minuten und veröffentliche die Tagesordnung mit der Event-Ankündigung und im Raum.',
      joinOriginNote:
        'JoinOrigin ist ein Community-Betriebssystem, in dem gemeinsame Artefakte wie Tagesordnungen und Notizen neben der Community leben. Eine einfache veröffentlichte Tagesordnung erledigt die Arbeit.',
    },
    {
      title: 'Bewirb dort, wo deine Zielgruppe bereits ist',
      body: 'Teile das Event in Nischen-Gruppen, lokalen Newslettern, Community-Pinnwänden und relevanten Social-Kanälen — und weise alle auf den Beitrittslink der Gruppe hin, damit Teilnehmende zu Mitgliedern werden statt zu Einmal-Gästen.',
      joinOriginNote:
        'JoinOrigin ist der Ort, an dem Menschen, die eine Community suchen, sie finden und über einen Link beitreten. Bewirb in den Nischen-Gruppen und Newslettern, in denen deine Zielgruppe sich bereits versammelt, und teile den Beitrittslink mit jeder:m Teilnehmenden.',
    },
    {
      title: 'Führe den Abend mit klarem Rhythmus durch',
      body: 'Beginne pünktlich, begrüße Nachzügler:innen, halte die Hauptaktivität auf Kurs und schließe mit der Ankündigung des nächsten Termins. Ende pünktlich — es ist das stärkste Respekt-Signal.',
      joinOriginNote:
        'JoinOrigin besetzt keine Events — die Erfahrung liegt bei dir. Die Plattform hält die Geschichte der Community in einem organisierten Raum — das Versprechen, den Rhythmus und die Menschen. Pünktlich zu enden ist das stärkste Respekt-Signal.',
    },
    {
      title: 'Folge innerhalb von 24 Stunden im Raum nach',
      body: 'Danke Teilnehmenden, teile Links oder Notizen und lade zu Feedback ein, wo die ganze Gruppe es sehen kann. Die Nachbereitung verwandelt ein einzelnes Event in eine wiederkehrende Community.',
      joinOriginNote:
        'JoinOrigin gibt einer Community einen beständigen Raum, in dem Zusammenfassung, nächster Termin und Feedback leben — ein einzelnes Event wird zur wiederkehrenden Community. Werde entdeckt und halte den Schwung.',
    },
  ],
};

export default content;
