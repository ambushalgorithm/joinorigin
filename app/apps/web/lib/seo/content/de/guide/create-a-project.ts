import type { GuideContent } from '../../types';

/**
 * „So erstellst du ein Projekt“ — zeitlose L1-Anleitung (Design §6.1,
 * TASK-353).
 *
 * Geschrieben gegen den Produkt-Screenflow §2 Kernkreislauf: Eine geformte
 * Gruppe wechselt vom Gespräch zur gemeinsamen Arbeit, indem sie ein Projekt
 * veröffentlicht; die Projektseite ist öffentlich, ihr Raum wird BEIM
 * VERÖFFENTLICHEN automatisch erstellt, die ersteller:in kontrolliert den
 * Raum, und Fortschritt fließt in den Feed. Die Plattform ist live: Das
 * Veröffentlichen eines Projekts öffnet Seite und Raum jetzt sofort.
 * „Raum“ ist an den Matrix-Raum (§6.3) gebunden. Der Satz wird im
 * verfassten Text nie verwendet.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'create-a-project',
  title: 'So erstellst du ein Projekt: Verwandle Gruppen-Schwung in gemeinsame Arbeit | JoinOrigin',
  description:
    'Erstelle ein Projekt auf JoinOrigin — ob es eine brandneue Idee ist oder bereits laufende Arbeit — veröffentliche eine gemeinsame Projektseite, öffne ihren Raum automatisch und verwandle das Gespräch einer Gruppe in Arbeit, die geliefert wird. Praktische Schritte von JoinOrigin.',
  intro: [
    'Eine Gruppe, die nur redet, bleibt irgendwann stehen. Der Unterschied zwischen einer Community, die sich lebendig anfühlt, und einer, die verblasst, ist gemeinsame Arbeit — ein Projekt mit Namen, Ziel und einem Ort, an dem Fortschritt sichtbar ist. Ein Gespräch in ein Projekt zu verwandeln ist ebenfalls ein Menschen-verbinden-Problem: Du brauchst die richtigen Menschen, das richtige Engagement und einen klaren Ort, um zusammenzuarbeiten. Dasselbe gilt, wenn das Projekt bereits existiert — verstreut über Dateien, Nachrichten und die To-do-Liste einer Person — es braucht trotzdem ein sichtbares Zuhause und die richtigen Menschen darum.',
    'Der JoinOrigin-Flow übernimmt diesen Schritt: Eine geformte Gruppe veröffentlicht ein Projekt, und die Projektseite erscheint öffentlich, während ihr Raum im Moment des Veröffentlichens automatisch erstellt wird. Mitglieder treten über einen Link in den Projektraum ein, die ersteller:in kontrolliert ihn als Rauminhaber:in, und Updates aus dem Raum fließen in den Feed, sodass das gesamte Netzwerk die Arbeit sehen kann. Der Projektraum öffnet sich in dem Moment, in dem du veröffentlichst — kein Einrichtungsschritt dazwischen.',
    'Diese Anleitung führt vom ersten Funken zu einem funktionierenden Rhythmus — ob das Projekt brandneu ist oder bereits läuft: mit einer bestehenden Gruppe und ihrem Raum beginnen, einen Umfang definieren, der tatsächlich geliefert werden kann, die Projektseite schreiben, sie veröffentlichen und den Raum öffnen, das Arbeitsteam einladen, Rollen und einen ersten Meilenstein vereinbaren, echte Arbeit in den Raum bringen und Fortschritt teilen, um Schwung aufzubauen.',
  ],
  dataPoints: [
    'Projekte mit einer öffentlichen Seite und einem klaren ersten Meilenstein sind leichter zu besetzen — Menschen schließen sich Arbeit an, die sie sehen können.',
    'Auf JoinOrigin erstellt das Veröffentlichen eines Projekts automatisch seinen Raum — der Arbeitsraum existiert ab demselben Moment wie die Seite.',
    'Ein Projektraum gibt der Arbeit ein Zuhause: Entscheidungen, Dateien und Fortschritt sichtbar für alle, die beitreten.',
    'JoinOrigin ist ein Community-Betriebssystem, das geformten Gruppen hilft, Gespräche in Projekte zu verwandeln — veröffentliche dein Projekt und sein Raum öffnet sich sofort.',
  ],
  faq: [
    {
      question: 'Wann ist eine Gruppe bereit, ein Projekt zu starten?',
      answer:
        'Eine Gruppe ist bereit, wenn ein paar Mitglieder ein konkretes Ergebnis teilen und bereit sind, Zeit zu investieren. Du brauchst kein großes Team — drei engagierte Menschen mit einem klaren Meilenstein schlagen ein Dutzend neugieriger Mitglieder. Veröffentliche das Projekt, wenn sich das Gespräch wiederholt: „Das sollten wir wirklich machen.“',
    },
    {
      question: 'Wann wird der Projektraum erstellt?',
      answer:
        'Der Raum wird automatisch in dem Moment erstellt, in dem du das Projekt veröffentlichst. Die ersteller:in besitzt den Raum von Anfang an und kann das Arbeitsteam einladen, Rollen zuweisen und die Arbeit in Element organisiert halten. Du kannst dieselbe Form auch mit Tools erstellen, die deine Gruppe bereits nutzt.',
    },
    {
      question: 'Wie unterscheidet sich ein Projekt von einer Idee?',
      answer:
        'Eine Idee ist ein Vorschlag, um den sich Menschen versammeln — ihr Raum ist der Ort, an dem Interesse und Passung getestet werden. Ein Projekt ist die gemeinsame Arbeit, zu der sich eine geformte Gruppe verpflichtet, mit Seite, Raum und Meilenstein. Veröffentliche zuerst eine Idee, wenn du Menschen brauchst; veröffentliche ein Projekt, wenn du sie bereits hast.',
    },
    {
      question: 'Was sollte der erste Meilenstein sein?',
      answer:
        'Klein und abschließbar — ein Arbeitsentwurf, ein Pilot, eine erste Version oder ein fertiges Ergebnis innerhalb weniger Wochen. Ein kurzer erster Meilenstein baut Vertrauen in die Gruppe und macht das Projekt für neue Beitretende real. Nach dem ersten Erfolg kannst du immer erweitern.',
    },
    {
      question: 'Kann JoinOrigin einer Gruppe helfen, heute ein Projekt zu starten?',
      answer:
        'Ja. Ein Projekt auf JoinOrigin zu veröffentlichen erstellt Seite und Raum atomar — der Raum öffnet sich in dem Moment, in dem du veröffentlichst, und die ersteller:in kontrolliert ihn. Wähle das Ziel der Gruppe, erstelle ein gemeinsames Projekt-Zuhause und öffne einen Raum für die Arbeit; jedes neue Mitglied, das du einlädst, erweitert deine Reichweite.',
    },
  ],
  sections: [
    'Beginne mit einer bestehenden Gruppe und ihrem Raum. Ein Projekt wächst aus einer Gruppe, die bereits Vertrauen und Schwung hat. Schau dir die Gespräche im Raum der Gruppe an und finde das wiederkehrende Bedürfnis — die Sache, von der Mitglieder immer wieder sagen „das sollten wir machen“. JoinOrigin hält eine Community in einem von der ersteller:in kontrollierten Raum lebendig, und das Projekt ist die nächste Schicht auf diesem Raum. Benenne das wiederkehrende Bedürfnis in der Gruppe und teste, ob jemand darauf handeln möchte.',
    'Definiere einen Umfang, der tatsächlich geliefert werden kann. Schreibe auf, was das Projekt produzieren wird, für wen und in welchem Zeitrahmen. Halte die erste Version klein genug, dass die Gruppe sie abschließen kann. JoinOrigin ist auf Projekte mit öffentlichen Seiten ausgelegt — ein klarer Umfang macht die Seite lesbar und den Raum fokussiert. Ein Satz, der sagt, was wann geliefert wird, reicht zum Start.',
    'Schreibe die Projektseite. Die Seite sollte das Ziel des Projekts nennen, das Problem, das es löst, wer daran arbeitet und was es braucht. Sei ehrlich über die Phase — ein früher Entwurf ist in Ordnung. Ein Projekt auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Veröffentliche die Projektbeschreibung an einem Ort, auf den die Gruppe Menschen verweisen kann.',
    'Veröffentliche das Projekt und öffne seinen Raum. Das Veröffentlichen macht das Projekt real: eine öffentliche Seite plus ein Raum, in dem die Arbeit lebt. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn. Auf JoinOrigin sind Seite, Raum und Arbeitsteam eine einzige Veröffentlichung. Erstelle Seite und Raum lieber in den Tools, die deine Gruppe bereits nutzt.',
    'Lade das Arbeitsteam in den Raum ein. Lade die Menschen ein, die die Arbeit tatsächlich erledigen — ein kleines, engagiertes Team ist besser als ein großes Publikum. Teile den Beitrittslink und bitte jede Person, ihre Zeit zu bestätigen. Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der Projektseite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein klarer Link zum Projektraum erledigt die Arbeit.',
    'Vereinbare Rollen und einen ersten Meilenstein. Benenne, wer was besitzt, wie oft die Gruppe sich meldet und den ersten Meilenstein, auf den alle hinarbeiten. Schreibe es dort auf, wo das gesamte Team es sehen kann. JoinOrigin weist dir keine Rollen zu — ersteller:innen-Kontrolle bedeutet, dass du entscheidest. Die Plattform hält Rollen und Meilenstein im Projektraum sichtbar. Ein kurzer schriftlicher Plan im Raum reicht.',
    'Bringe echte Arbeit in den Raum. Ersetze „wir sollten“ durch „hier ist der Entwurf“, „hier ist die Entscheidung“ und „hier ist die nächste Aufgabe“. Halte den Fortschritt an einem sichtbaren Ort, damit alle folgen können. JoinOrigin hält den Raum eines Projekts als Träger der Arbeit — Entscheidungen, Dateien und Updates — statt sie über private Nachrichten zu verstreuen. Halte die Arbeitsartefakte ab der ersten Woche im gemeinsamen Raum.',
    'Teile Fortschritt, um Schwung aufzubauen. Poste Updates, während das Projekt voranschreitet, feiere den Meilenstein, wenn er erreicht wird, und lade die größere Gruppe ein, beizutreten oder zu folgen. Fortschritt im Feed macht ein Projekt zum Beweis, dass die Community liefert. Raum-Updates fließen auf JoinOrigin in den Feed — die Wachstumsschleife, in der jedes neue Mitglied die Entdeckungsfläche erweitert. Werde entdeckt und wachse.',
  ],
  steps: [
    {
      title: 'Beginne mit einer bestehenden Gruppe und ihrem Raum',
      body: 'Ein Projekt wächst aus einer Gruppe, die bereits Vertrauen und Schwung hat. Schau dir die Gespräche im Raum der Gruppe an und finde das wiederkehrende Bedürfnis — die Sache, von der Mitglieder immer wieder sagen „das sollten wir machen“.',
      joinOriginNote:
        'JoinOrigin hält eine Community in einem von der ersteller:in kontrollierten Raum lebendig, und das Projekt ist die nächste Schicht auf diesem Raum. Benenne das wiederkehrende Bedürfnis in der Gruppe und teste, ob jemand darauf handeln möchte.',
    },
    {
      title: 'Definiere einen Umfang, der tatsächlich geliefert werden kann',
      body: 'Schreibe auf, was das Projekt produzieren wird, für wen und in welchem Zeitrahmen. Halte die erste Version klein genug, dass die Gruppe sie abschließen kann.',
      joinOriginNote:
        'JoinOrigin ist auf Projekte mit öffentlichen Seiten ausgelegt — ein klarer Umfang macht die Seite lesbar und den Raum fokussiert. Ein Satz, der sagt, was wann geliefert wird, reicht zum Start.',
    },
    {
      title: 'Schreibe die Projektseite',
      body: 'Die Seite sollte das Ziel des Projekts nennen, das Problem, das es löst, wer daran arbeitet und was es braucht. Sei ehrlich über die Phase — ein früher Entwurf ist in Ordnung.',
      joinOriginNote:
        'Ein Projekt auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Veröffentliche die Projektbeschreibung an einem Ort, auf den die Gruppe Menschen verweisen kann.',
    },
    {
      title: 'Veröffentliche das Projekt und öffne seinen Raum',
      body: 'Das Veröffentlichen macht das Projekt real: eine öffentliche Seite plus ein Raum, in dem die Arbeit lebt. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn.',
      joinOriginNote:
        'Auf JoinOrigin sind Seite, Raum und Arbeitsteam eine einzige Veröffentlichung. Erstelle Seite und Raum lieber in den Tools, die deine Gruppe bereits nutzt.',
    },
    {
      title: 'Lade das Arbeitsteam in den Raum ein',
      body: 'Lade die Menschen ein, die die Arbeit tatsächlich erledigen — ein kleines, engagiertes Team ist besser als ein großes Publikum. Teile den Beitrittslink und bitte jede Person, ihre Zeit zu bestätigen.',
      joinOriginNote:
        'Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der Projektseite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein klarer Link zum Projektraum erledigt die Arbeit.',
    },
    {
      title: 'Vereinbare Rollen und einen ersten Meilenstein',
      body: 'Benenne, wer was besitzt, wie oft die Gruppe sich meldet und den ersten Meilenstein, auf den alle hinarbeiten. Schreibe es dort auf, wo das gesamte Team es sehen kann.',
      joinOriginNote:
        'JoinOrigin weist dir keine Rollen zu — ersteller:innen-Kontrolle bedeutet, dass du entscheidest. Die Plattform hält Rollen und Meilenstein im Projektraum sichtbar. Ein kurzer schriftlicher Plan im Raum reicht.',
    },
    {
      title: 'Bringe echte Arbeit in den Raum',
      body: 'Ersetze „wir sollten“ durch „hier ist der Entwurf“, „hier ist die Entscheidung“ und „hier ist die nächste Aufgabe“. Halte den Fortschritt an einem sichtbaren Ort, damit alle folgen können.',
      joinOriginNote:
        'JoinOrigin hält den Raum eines Projekts als Träger der Arbeit — Entscheidungen, Dateien und Updates — statt sie über private Nachrichten zu verstreuen. Halte die Arbeitsartefakte ab der ersten Woche im gemeinsamen Raum.',
    },
    {
      title: 'Teile Fortschritt, um Schwung aufzubauen',
      body: 'Poste Updates, während das Projekt voranschreitet, feiere den Meilenstein, wenn er erreicht wird, und lade die größere Gruppe ein, beizutreten oder zu folgen. Fortschritt im Feed macht ein Projekt zum Beweis, dass die Community liefert.',
      joinOriginNote:
        'Raum-Updates fließen auf JoinOrigin in den Feed — die Wachstumsschleife, in der jedes neue Mitglied die Entdeckungsfläche erweitert. Werde entdeckt und wachse.',
    },
  ],
};

export default content;
