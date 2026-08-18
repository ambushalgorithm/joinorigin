import type { GuideContent } from '../../types';

/**
 * „So veröffentlichst du eine Idee“ — zeitlose L1-Anleitung (Design §6.1,
 * TASK-353).
 *
 * Geschrieben gegen den Produkt-Screenflow §2 Kernkreislauf: Entdecken →
 * öffentliche Ideenseite → Beitritt per Link → Raum wird BEIM VERÖFFENTLICHEN
 * automatisch erstellt → die ersteller:in kontrolliert den Raum → Feed/
 * Einladungs-Wachstum. Die Ideenseite ist das öffentliche Versprechen; der
 * Raum ist der Ort, an dem interessierte Menschen zusammenkommen und sich
 * austauschen. Die Plattform ist live: Das Veröffentlichen einer Idee
 * erstellt Seite und Raum jetzt sofort. „Raum“ ist an den Matrix-Raum
 * (§6.3) gebunden. Der Satz wird im verfassten Text nie verwendet.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'publish-an-idea',
  title:
    'So veröffentlichst du eine Idee: Verwandle einen Funken in eine auffindbare Ideenseite | JoinOrigin',
  description:
    'Veröffentliche eine Idee auf JoinOrigin — ob es ein neuer Funke ist oder ein bestehendes Projekt, das Menschen finden sollen — schreibe eine öffentliche Ideenseite, lasse ihren Raum automatisch öffnen und lade die Menschen ein, die mit dir bauen wollen. Praktische Schritte von JoinOrigin.',
  intro: [
    'Die meisten Ideen sterben in Entwürfen — eine Notiz auf dem Handy, ein halb erinnertes Gespräch, ein Dokument, das niemand sonst je gesehen hat. Der Grund ist selten, dass die Idee schlecht ist. Sondern dass niemand sie finden konnte, und die richtigen Menschen zu finden ist das gesamte Spiel. Genau dieses Menschen-verbinden-Problem löst JoinOrigin — ob die Idee ein frischer Funke ist oder ein bestehendes Projekt, das sich ohne ein auffindbares Zuhause leise weiterentwickelt hat.',
    'Der JoinOrigin-Kreislauf funktioniert so: Du veröffentlichst eine Idee, eine öffentliche Ideenseite erscheint, und ihr Raum wird im Moment des Veröffentlichens automatisch erstellt. Menschen entdecken die Seite über Entdecken oder folgen einem Link, den du teilst, und der Beitritt ist ein einziger Klick. Sie landen im Raum — einem von der ersteller:in kontrollierten Matrix-Raum, in dem das Gespräch um die Idee tatsächlich stattfindet. Die ersteller:in besitzt den Raum von der ersten Sekunde an und entscheidet, wer beitritt und was darin passiert.',
    'Diese Anleitung führt durch den ganzen Weg: die Idee zu einem klaren Satz verdichten, eine Seite schreiben, die Menschen finden können, sie veröffentlichen und den Raum öffnen, den Beitrittslink teilen, die ersten interessierten Menschen einladen, das erste Gespräch moderieren, die Idee aus echtem Feedback verbessern und die Idee auffindbar halten, während sie wächst. Sie funktioniert für jede Idee — ein kleines Unternehmen, ein Startup, einen Buchclub, ein Community-Projekt, ein Produkt, das es noch nicht gibt, oder ein Projekt, das bereits existiert und mehr Menschen um sich braucht.',
  ],
  dataPoints: [
    'Ein einzigartiger Satz zur Idee ist auffindbarer als ein langes Dokument — Klarheit ist eine Entdeckungsfunktion.',
    'Auf JoinOrigin erstellt das Veröffentlichen einer Idee automatisch ihren Raum — es gibt nie einen separaten Schritt „Chat später erstellen“.',
    'Ein Beitrittslink ist die einfachste Einladung: ein Link, ein Klick, und eine interessierte Person ist im Raum.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen hilft, Ideen und die Menschen dahinter zu finden — veröffentliche deine Idee und ihr Raum öffnet sich sofort.',
  ],
  faq: [
    {
      question: 'Was genau ist eine Ideenseite?',
      answer:
        'Eine Ideenseite ist das öffentliche, auffindbare Zuhause einer Idee auf JoinOrigin — eine klare Seite, die sagt, was die Idee ist, warum sie wichtig ist und für wen sie gedacht ist, mit einer Beitritts-Aktion. Menschen entdecken sie über Entdecken oder einen geteilten Link, und der Beitritt führt sie in den Raum der Idee.',
    },
    {
      question: 'Wann wird der Raum erstellt?',
      answer:
        'Der Raum wird automatisch in dem Moment erstellt, in dem du die Idee veröffentlichst. Die ersteller:in besitzt den Raum von der ersten Sekunde an und kann in Element einladen, entfernen und Rollen zuweisen. Du kannst dieselbe Form — eine öffentliche Seite plus einen Raum — auch mit Tools aufbauen, die du bereits nutzt.',
    },
    {
      question: 'Wie finden Menschen meine Idee?',
      answer:
        'Durch Entdeckung und Teilen: Eine Ideenseite ist auffindbar und erscheint unter Entdecken, und jeder Beitrittslink, den du teilst, führt direkt zu ihr. Der zuverlässigste frühe Traffic ist persönlich — die Seite und ihren Link mit Menschen zu teilen, denen das Problem bereits wichtig ist.',
    },
    {
      question: 'Was ist der Unterschied zwischen einer Idee und einem Projekt?',
      answer:
        'Eine Idee ist ein Vorschlag, um den sich Menschen versammeln — der Raum ist der Ort, an dem Interessierte sprechen und die Passung testen. Ein Projekt ist das, was eine geformte Gruppe gemeinsam zu tun beginnt, mit eigener Projektseite und eigenem Raum. Veröffentliche zuerst die Idee; das Projekt folgt, wenn sich Menschen verpflichten.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, heute eine Idee zu veröffentlichen?',
      answer:
        'Ja. Eine Idee auf JoinOrigin zu veröffentlichen erstellt Seite und Raum atomar — der Raum öffnet sich in dem Moment, in dem du veröffentlichst, und du kontrollierst ihn von Anfang an. Veröffentliche deine Idee und öffne einen Raum für Diskussion; jedes neue Mitglied, das du einlädst, erweitert deine Reichweite.',
    },
  ],
  sections: [
    'Definiere die Idee in einem klaren Satz. Verdichte die Idee zu einem einzigen Satz: für wen sie ist, was sie verändert und warum sie wichtig ist. Wenn du sie nicht in einem Satz sagen kannst, bist du nicht bereit, sie zu veröffentlichen. JoinOrigin ist auf auffindbare Ideenseiten ausgelegt — ein Ein-Satz-Pitch ist der Kern der Seite und der Satz, nach dem Menschen suchen werden. Schreibe den Satz auf und teste ihn an drei Menschen, bevor du weitergehst.',
    'Schreibe die Ideenseite mit einem Versprechen und einem Bedarf. Die Seite sollte die Idee nennen, warum sie wichtig ist, was sie braucht und wen du einladen möchtest. Sei ehrlich darüber, wo die Idee steht — ein Funke, ein Prototyp, ein Produkt. JoinOrigin erstellt Seite und Raum automatisch, wenn du eine Idee veröffentlichst; die ersteller:in kontrolliert den Raum von Anfang an und kann in Element einladen, entfernen und Rollen zuweisen. Veröffentliche die Idee und öffne einen Raum für Diskussion darum.',
    'Veröffentliche die Idee und lasse ihren Raum öffnen. Das Veröffentlichen ist der Moment, in dem die Idee auffindbar wird. Auf JoinOrigin erstellt das Veröffentlichen automatisch den Raum — es gibt nie einen Schritt „Chat später erstellen“, und die ersteller:in besitzt den Raum von der ersten Sekunde an. Auf JoinOrigin sind die Ideenseite und ihr Raum eine einzige atomare Veröffentlichung. Du kannst die Seite auch öffentlich teilen und den Raum in den Tools einrichten, die du bereits nutzt.',
    'Teile den Beitrittslink. Der Beitrittslink ist der kürzeste Weg von Interesse zu Verbindung: ein Link, ein Klick, und eine interessierte Person landet im Raum. Setze ihn überall hin, wo die richtigen Menschen sich treffen. Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Idee erledigt die Arbeit.',
    'Lade die ersten interessierten Menschen persönlich ein. Persönliche Einladungen konvertieren besser als öffentliche Beiträge. Schreib Menschen, die zur Zielgruppe der Idee passen, teile den Beitrittslink und bitte sie, je eine weitere Person mitzubringen, die interessiert sein könnte. JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Idee suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jede beitretende Person wird zu einem Kanal in ihr eigenes Netzwerk.',
    'Moderiere das erste Gespräch im Raum. Die ersten Gespräche entscheiden, ob eine Idee Schwung hat. Eröffne den Raum mit einem klaren Impuls — was ist das Problem, was ist der erste Schritt, was bringt jede:r von euch mit — und lass die Menschen antworten. JoinOrigin führt diese Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt der Idee einen Raum, in dem Interesse zu Gespräch wird, und die ersteller:in besitzt diesen Raum. Beginne das Gespräch dort, wo deine Menschen bereits sind.',
    'Sammle Feedback und verbessere die Idee. Frag Beitretende, was sie begeistert, was sie beunruhigt und was sie zuerst tun würden. Passe Pitch, Umfang oder nächsten Schritt an ihre Antworten an. JoinOrigin bewahrt das gemeinsame Gedächtnis einer Idee an einem Ort — Notizen, Entscheidungen und Feedback im Raum — damit Verbesserung sichtbar statt verloren ist. Frage Mitglieder nach der ersten Woche direkt im Raum.',
    'Halte die Idee auffindbar, während sie wächst. Überarbeite die Seite, während sich die Idee entwickelt — aktualisiere Versprechen, Bedarfe und nächsten Schritt, damit neue Beitretende immer die aktuelle Version sehen. Wachstum potenziert sich, wenn jedes Mitglied die Idee in einem Satz beschreiben und ihren Beitrittslink teilen kann. JoinOrigin hält deine Ideenseite und ihren Raum verbunden, während das Interesse wächst — ein Ort, an dem Versprechen, Gespräch und Menschen sichtbar sind. Werde entdeckt und wachse.',
  ],
  steps: [
    {
      title: 'Definiere die Idee in einem klaren Satz',
      body: 'Verdichte die Idee zu einem einzigen Satz: für wen sie ist, was sie verändert und warum sie wichtig ist. Wenn du sie nicht in einem Satz sagen kannst, bist du nicht bereit, sie zu veröffentlichen.',
      joinOriginNote:
        'JoinOrigin ist auf auffindbare Ideenseiten ausgelegt — ein Ein-Satz-Pitch ist der Kern der Seite und der Satz, nach dem Menschen suchen werden. Schreibe den Satz auf und teste ihn an drei Menschen, bevor du weitergehst.',
    },
    {
      title: 'Schreibe die Ideenseite mit einem Versprechen und einem Bedarf',
      body: 'Die Seite sollte die Idee nennen, warum sie wichtig ist, was sie braucht und wen du einladen möchtest. Sei ehrlich darüber, wo die Idee steht — ein Funke, ein Prototyp, ein Produkt.',
      joinOriginNote:
        'JoinOrigin erstellt Seite und Raum automatisch, wenn du eine Idee veröffentlichst; die ersteller:in kontrolliert den Raum von Anfang an und kann in Element einladen, entfernen und Rollen zuweisen. Veröffentliche die Idee und öffne einen Raum für Diskussion darum.',
    },
    {
      title: 'Veröffentliche die Idee und lasse ihren Raum öffnen',
      body: 'Das Veröffentlichen ist der Moment, in dem die Idee auffindbar wird. Auf JoinOrigin erstellt das Veröffentlichen automatisch den Raum — es gibt nie einen Schritt „Chat später erstellen“, und die ersteller:in besitzt den Raum von der ersten Sekunde an.',
      joinOriginNote:
        'Auf JoinOrigin sind die Ideenseite und ihr Raum eine einzige atomare Veröffentlichung. Du kannst die Seite auch öffentlich teilen und den Raum in den Tools einrichten, die du bereits nutzt.',
    },
    {
      title: 'Teile den Beitrittslink',
      body: 'Der Beitrittslink ist der kürzeste Weg von Interesse zu Verbindung: ein Link, ein Klick, und eine interessierte Person landet im Raum. Setze ihn überall hin, wo die richtigen Menschen sich treffen.',
      joinOriginNote:
        'Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Idee erledigt die Arbeit.',
    },
    {
      title: 'Lade die ersten interessierten Menschen persönlich ein',
      body: 'Persönliche Einladungen konvertieren besser als öffentliche Beiträge. Schreib Menschen, die zur Zielgruppe der Idee passen, teile den Beitrittslink und bitte sie, je eine weitere Person mitzubringen, die interessiert sein könnte.',
      joinOriginNote:
        'JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Idee suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jede beitretende Person wird zu einem Kanal in ihr eigenes Netzwerk.',
    },
    {
      title: 'Moderiere das erste Gespräch im Raum',
      body: 'Die ersten Gespräche entscheiden, ob eine Idee Schwung hat. Eröffne den Raum mit einem klaren Impuls — was ist das Problem, was ist der erste Schritt, was bringt jede:r von euch mit — und lass die Menschen antworten.',
      joinOriginNote:
        'JoinOrigin führt diese Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt der Idee einen Raum, in dem Interesse zu Gespräch wird, und die ersteller:in besitzt diesen Raum. Beginne das Gespräch dort, wo deine Menschen bereits sind.',
    },
    {
      title: 'Sammle Feedback und verbessere die Idee',
      body: 'Frag Beitretende, was sie begeistert, was sie beunruhigt und was sie zuerst tun würden. Passe Pitch, Umfang oder nächsten Schritt an ihre Antworten an.',
      joinOriginNote:
        'JoinOrigin bewahrt das gemeinsame Gedächtnis einer Idee an einem Ort — Notizen, Entscheidungen und Feedback im Raum — damit Verbesserung sichtbar statt verloren ist. Frage Mitglieder nach der ersten Woche direkt im Raum.',
    },
    {
      title: 'Halte die Idee auffindbar, während sie wächst',
      body: 'Überarbeite die Seite, während sich die Idee entwickelt — aktualisiere Versprechen, Bedarfe und nächsten Schritt, damit neue Beitretende immer die aktuelle Version sehen. Wachstum potenziert sich, wenn jedes Mitglied die Idee in einem Satz beschreiben und ihren Beitrittslink teilen kann.',
      joinOriginNote:
        'JoinOrigin hält deine Ideenseite und ihren Raum verbunden, während das Interesse wächst — ein Ort, an dem Versprechen, Gespräch und Menschen sichtbar sind. Werde entdeckt und wachse.',
    },
  ],
};

export default content;
