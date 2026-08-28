import type { GuideContent } from '../../types';

/**
 * „So startest du ein Origin“ — zeitlose L1-Anleitung (Design §6.1,
 * TASK-326).
 *
 * Neu auf das digitale Verbinden→Beitreten→Raum-Modell ausgerichtet: Gruppe
 * veröffentlichen → Raum wird beim Veröffentlichen automatisch erstellt →
 * Mitglieder treten per Link bei; Hinweise zu Ort/Format bleiben eine
 * nachgelagerte Konsequenz, nie der Kern. Der JoinOrigin-Wert ist in die
 * Einleitung und jeden Schritt eingewoben (pro Schritt `joinOriginNote`),
 * mit ehrlicher Rahmung — JoinOrigin führt keine lokalen Events durch.
 * Einzelnes H1, Schritt-für-Schritt-Struktur, FAQ 1:1 in
 * `FAQPage`-JSON-LD gespiegelt. „Raum“ ist an den Matrix-Raum (§6.3)
 * gebunden.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'start-an-origin',
  title: 'So startest du ein Origin: Eine Schritt-für-Schritt-Anleitung | JoinOrigin',
  description:
    'Lerne, wie du ein Origin startest — oder einem bestehenden ein einziges digitales Zuhause gibst — veröffentliche eine Gruppe, öffne ihren Raum und bringe Mitglieder über einen Beitrittslink herein. Praktische Schritte von JoinOrigin.',
  intro: [
    'Der schwerste Teil beim Starten eines Origins ist selten der Ort, die Tagesordnung oder das Budget — es ist, die ersten Menschen zu finden, die dein Interesse teilen, und ihnen einen klaren Ort zum Verbinden zu geben. Genau das löst JoinOrigin.',
    'JoinOrigin ist ein Community-Betriebssystem, das um den digitalen Kreislauf gebaut ist: Du veröffentlichst eine Gruppe, ihr Raum wird automatisch erstellt, und Mitglieder treten über einen Link bei. Der Raum ist der Ort, an dem die Community tatsächlich lebt — ein von der ersteller:in kontrollierter Matrix-Raum, in dem Mitglieder von Tag eins an sprechen, Updates teilen und gemeinsam planen, statt sich über Tabellen, verstreute Nachrichten und Anmeldeformulare zu verteilen. Präsenz-Events existieren nur als nachgelagerte Konsequenz: Sobald eine Gruppe geformt ist und ihr Raum lebt, können Mitglieder sich entscheiden, sich persönlich zu treffen — und JoinOrigin führt keine lokalen Events durch. Der ganze Sinn der Plattform ist es, Menschen zu verbinden, die sich sonst nie begegnet wären, weshalb jeder Schritt dieser Anleitung zu etwas passt, bei dem JoinOrigin hilft.',
    'Der Ansatz funktioniert für jeden Community-Typ: einen Gründer:innen-Kreis, einen Buchclub, eine lokale Laufgruppe, ein Kleinunternehmer-Netzwerk oder eine Online-Berufs-Community — und er funktioniert, ob du bei null startest oder eine Gruppe formalisierst, die sich bereits informell trifft. Das Kernprinzip ist einfach — Menschen treten wegen eines klaren Versprechens bei, und sie bleiben, weil die Erfahrung dieses Versprechen zuverlässig einlöst. Du brauchst kein großes Budget, keinen Ort und kein bestehendes Publikum, um zu beginnen; du brauchst einen klaren Zweck, einen realistischen ersten Schritt und die Disziplin, ihn zu wiederholen.',
  ],
  dataPoints: [
    'Die meisten erfolgreichen Communities beginnen mit einer engen, spezifischen Zielgruppe statt mit „allen Interessierten“.',
    'Eine Gruppe zu veröffentlichen erstellt ihren Raum sofort — es gibt nie einen Schritt „Chat später erstellen“.',
    'Ein Beitrittslink ist die einfachste Einladung: ein Link, ein Klick, und ein neues Mitglied ist im Raum.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Origins zu finden oder zu starten — es führt keine lokalen Events durch und behauptet keine lokalen Mitarbeitenden.',
  ],
  faq: [
    {
      question: 'Wie lange dauert es, ein Origin zu starten?',
      answer:
        'Du kannst eine Gruppe veröffentlichen und ihren Raum innerhalb weniger Wochen öffnen, wenn du den Umfang klein hältst: ein Zweck, ein Beitrittslink und ein stetiger Strom persönlicher Einladungen. Das Origin selbst braucht ein paar Monate konsequenter Teilnahme im Raum, bevor es sich etabliert anfühlt.',
    },
    {
      question: 'Brauche ich Geld oder einen Ort zum Starten?',
      answer:
        'Nein. Der digitale Kern einer Community — eine veröffentlichte Gruppe und ihr Raum — kostet nichts und braucht keinen Ort. Viele Gruppen entscheiden sich später, sich persönlich zu treffen; Bibliotheken, Cafés, Parks und Coworking-Lounges veranstalten erste Treffen in den meisten Städten kostenlos.',
    },
    {
      question: 'Was ist der häufigste Fehler beim Starten eines Origins?',
      answer:
        'Allen dienen zu wollen. Ein Origin mit vagem Zweck zieht wenige engagierte Mitglieder an. Definiere eine konkrete Zielgruppe und ein klares Ergebnis, setze es auf die Gruppenseite und lass das Origin sich von dort entwickeln.',
    },
    {
      question: 'Wie kann JoinOrigin mir helfen, ein Origin zu starten?',
      answer:
        'Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum, und Mitglieder treten über einen Link bei — ein organisiertes digitales Zuhause für Zweck, Menschen und Gespräch eines Origins. JoinOrigin führt keine lokalen Events durch, daher funktionieren die praktischen Schritte dieser Anleitung auf der Plattform und mit den Tools, die du bereits hast.',
    },
  ],
  sections: [
    'Definiere einen klaren Zweck. Entscheide, für wen das Origin ist, welches Problem es löst und wie ein erfolgreiches Mitglied aussieht. Schreibe eine Mission in einem Satz, etwa „eine Gruppe für neue Gründer:innen in Brooklyn, um frühe Lektionen zu teilen“. JoinOrigin gibt deinem Zweck ein Zuhause — eine öffentliche Gruppenseite, auf der Mission, Zielgruppe und Versprechen für alle sichtbar sind, die nach einer Gruppe wie deiner suchen. Schreibe die Mission auf und halte sie vor jeder Einladung präsent.',
    'Veröffentliche die Gruppe und öffne ihren Raum. Der digitale Kern einer Community ist eine veröffentlichte Gruppe mit einem Raum, in dem Mitglieder sprechen können. Auf JoinOrigin erstellt das Veröffentlichen einer Gruppe automatisch ihren Raum — die ersteller:in besitzt ihn von der ersten Sekunde an und kann in Element einladen, entfernen und Rollen zuweisen. Auf JoinOrigin gibt es keinen Schritt „Chat später erstellen“: Veröffentliche die Gruppe und der Raum existiert sofort, mit der ersteller:in als Rauminhaber:in. Richte das Gruppen-Zuhause und seinen Raum lieber in den Tools ein, die du bereits nutzt.',
    'Teile deinen Beitrittslink. Ein Beitrittslink ist die einfachste Einladung überhaupt: ein Link, ein Klick, und ein neues Mitglied landet im Raum. Setze den Link überall hin — deine Gruppenseite, persönliche Nachrichten und die Orte, an denen deine Zielgruppe sich bereits versammelt. Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Gruppe erledigt die Arbeit.',
    'Lade deine ersten zehn Menschen persönlich ein. Persönliche Einladungen konvertieren weit besser als öffentliche Beiträge. Schreib Freund:innen, Kolleg:innen und Bekannten, die zur Zielgruppe passen, teile den Beitrittslink und bitte sie, eine weitere Person mitzubringen. JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die ein Origin suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jedes Mitglied, das du einlädst, wird zu einem Kanal in sein eigenes Netzwerk.',
    'Wähle ein Format und einen Rhythmus (eine nachgelagerte Entscheidung). Sobald sich die Gruppe formt, wähle ein wiederkehrendes Format — eine monatliche Diskussion, eine wöchentliche Arbeitssitzung, einen Vortrag oder einen sozialen Spaziergang. Wiederkehrend schlägt einmalig, weil Gewohnheiten Fremde in Mitglieder verwandeln. Das ist eine nachgelagerte Entscheidung: Die Gruppe kann sich später persönlich treffen, aber der Raum ist bereits das Zuhause der Community. Auf JoinOrigin können Organisator:innen ihr Format einmal beschreiben, und Mitglieder sehen vor dem Beitritt, was sie erwartet — das reduziert die Hemmschwelle, die Erstteilnehmende stoppt. Wähle dein Format und nenne es in jeder Einladung.',
    'Veranstalte ein großartiges erstes Treffen. Wenn Mitglieder sich entscheiden, sich persönlich zu treffen — komm früh, begrüße jede Person, mache eine kurze Vorstellungsrunde und beende mit einem klaren nächsten Termin. Das Ziel des ersten Treffens ist nicht die Größe; es ist, dass alle gehen wollen, wiederzukommen. JoinOrigin besetzt oder leitet keine Treffen — die Erfahrung liegt bei dir. Die Plattform hilft der Community, sich darum zu formen: ein gemeinsamer Raum, in dem Termin, Zusammenfassung und nächste Schritte leben.',
    'Sammle Feedback und iteriere. Frag Mitglieder nach den ersten Wochen, was sie mehr oder weniger wollen — im Raum und bei Treffen. Passe Format, Zeit oder Ort an ihre Antworten an, nicht an das, was du dir vorgestellt hast. JoinOrigin bewahrt das gemeinsame Gedächtnis einer Community an einem Ort — Notizen, Entscheidungen und das, worum Mitglieder gebeten haben — damit Iteration sichtbar statt verloren ist. Frage Mitglieder nach jedem Treffen direkt im Raum.',
    'Veröffentliche einen konsistenten Rhythmus und wachse langsam. Halte denselben Tag und dasselbe Format mehrere Monate, bevor du erweiterst. Wachstum potenziert sich durch Empfehlungen, wenn jedes Mitglied in einem Satz beschreiben kann, was die Community ist, und ihren Beitrittslink teilen kann. JoinOrigin hilft deiner Community, auffindbar und verbunden zu bleiben, während sie wächst — ein Ort, an dem Rhythmus, Versprechen, Raum und Menschen sichtbar sind. Werde entdeckt und wachse.',
  ],
  steps: [
    {
      title: 'Definiere einen klaren Zweck',
      body: 'Entscheide, für wen die Community ist, welches Problem sie löst und wie ein erfolgreiches Mitglied aussieht. Schreibe eine Mission in einem Satz, etwa „eine Gruppe für neue Gründer:innen in Brooklyn, um frühe Lektionen zu teilen“.',
      joinOriginNote:
        'JoinOrigin gibt deinem Zweck ein Zuhause — eine öffentliche Gruppenseite, auf der Mission, Zielgruppe und Versprechen für alle sichtbar sind, die nach einer Gruppe wie deiner suchen. Schreibe die Mission auf und halte sie vor jeder Einladung präsent.',
    },
    {
      title: 'Veröffentliche die Gruppe und öffne ihren Raum',
      body: 'Der digitale Kern einer Community ist eine veröffentlichte Gruppe mit einem Raum, in dem Mitglieder sprechen können. Auf JoinOrigin erstellt das Veröffentlichen einer Gruppe automatisch ihren Raum — die ersteller:in besitzt ihn von der ersten Sekunde an und kann in Element einladen, entfernen und Rollen zuweisen.',
      joinOriginNote:
        'Auf JoinOrigin gibt es keinen Schritt „Chat später erstellen“: Veröffentliche die Gruppe und der Raum existiert sofort, mit der ersteller:in als Rauminhaber:in. Richte das Gruppen-Zuhause und seinen Raum lieber in den Tools ein, die du bereits nutzt.',
    },
    {
      title: 'Teile deinen Beitrittslink',
      body: 'Ein Beitrittslink ist die einfachste Einladung überhaupt: ein Link, ein Klick, und ein neues Mitglied landet im Raum. Setze den Link überall hin — deine Gruppenseite, persönliche Nachrichten und die Orte, an denen deine Zielgruppe sich bereits versammelt.',
      joinOriginNote:
        'Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Gruppe erledigt die Arbeit.',
    },
    {
      title: 'Lade deine ersten zehn Menschen persönlich ein',
      body: 'Persönliche Einladungen konvertieren weit besser als öffentliche Beiträge. Schreib Freund:innen, Kolleg:innen und Bekannten, die zur Zielgruppe passen, teile den Beitrittslink und bitte sie, eine weitere Person mitzubringen.',
      joinOriginNote:
        'JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die ein Origin suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jedes Mitglied, das du einlädst, wird zu einem Kanal in sein eigenes Netzwerk.',
    },
    {
      title: 'Wähle ein Format und einen Rhythmus (eine nachgelagerte Entscheidung)',
      body: 'Sobald sich die Gruppe formt, wähle ein wiederkehrendes Format — eine monatliche Diskussion, eine wöchentliche Arbeitssitzung, einen Vortrag oder einen sozialen Spaziergang. Wiederkehrend schlägt einmalig, weil Gewohnheiten Fremde in Mitglieder verwandeln. Das ist eine nachgelagerte Entscheidung: Die Gruppe kann sich später persönlich treffen, aber der Raum ist bereits das Zuhause der Community.',
      joinOriginNote:
        'Auf JoinOrigin können Organisator:innen ihr Format einmal beschreiben, und Mitglieder sehen vor dem Beitritt, was sie erwartet — das reduziert die Hemmschwelle, die Erstteilnehmende stoppt. Wähle dein Format und nenne es in jeder Einladung.',
    },
    {
      title: 'Veranstalte ein großartiges erstes Treffen',
      body: 'Wenn Mitglieder sich entscheiden, sich persönlich zu treffen — komm früh, begrüße jede Person, mache eine kurze Vorstellungsrunde und beende mit einem klaren nächsten Termin. Das Ziel des ersten Treffens ist nicht die Größe; es ist, dass alle gehen wollen, wiederzukommen.',
      joinOriginNote:
        'JoinOrigin besetzt oder leitet keine Treffen — die Erfahrung liegt bei dir. Die Plattform hilft der Community, sich darum zu formen: ein gemeinsamer Raum, in dem Termin, Zusammenfassung und nächste Schritte leben.',
    },
    {
      title: 'Sammle Feedback und iteriere',
      body: 'Frag Mitglieder nach den ersten Wochen, was sie mehr oder weniger wollen — im Raum und bei Treffen. Passe Format, Zeit oder Ort an ihre Antworten an, nicht an das, was du dir vorgestellt hast.',
      joinOriginNote:
        'JoinOrigin bewahrt das gemeinsame Gedächtnis einer Community an einem Ort — Notizen, Entscheidungen und das, worum Mitglieder gebeten haben — damit Iteration sichtbar statt verloren ist. Frage Mitglieder nach jedem Treffen direkt im Raum.',
    },
    {
      title: 'Veröffentliche einen konsistenten Rhythmus und wachse langsam',
      body: 'Halte denselben Tag und dasselbe Format mehrere Monate, bevor du erweiterst. Wachstum potenziert sich durch Empfehlungen, wenn jedes Mitglied in einem Satz beschreiben kann, was die Community ist, und ihren Beitrittslink teilen kann.',
      joinOriginNote:
        'JoinOrigin hilft deiner Community, auffindbar und verbunden zu bleiben, während sie wächst — ein Ort, an dem Rhythmus, Versprechen, Raum und Menschen sichtbar sind. Werde entdeckt und wachse.',
    },
  ],
};

export default content;
