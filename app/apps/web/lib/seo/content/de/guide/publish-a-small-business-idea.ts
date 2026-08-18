import type { GuideContent } from '../../types';

/**
 * „So veröffentlichst du eine Kleinunternehmens-Idee“ — zeitlose L1-Anleitung
 * (Design §6.1, TASK-353).
 *
 * Geschrieben gegen den Produkt-Screenflow §2 Kernkreislauf: Kleinunterneh-
 * mens-Idee veröffentlichen → öffentliche Ideenseite → Beitritt per Link →
 * Raum wird BEIM VERÖFFENTLICHEN automatisch erstellt → ersteller:in
 * kontrolliert den Raum → Feed/Einladungs-Wachstum. Die Ideenseite ist das
 * Schaufenster-Versprechen; der Raum ist der Ort, an dem Kund:innen,
 * Mitgestalter:innen und frühe Überzeugte sich um das Unternehmen versammeln.
 * Die Plattform ist live: Das Veröffentlichen einer Idee erstellt ihre Seite
 * und ihren Raum jetzt. „Raum“ ist an den Matrix-Raum (§6.3) gebunden. Der
 * Satz wird im verfassten Text nie verwendet.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'publish-a-small-business-idea',
  title: 'So veröffentlichst du eine Kleinunternehmens-Idee: Ideenseite + Raum | JoinOrigin',
  description:
    'Veröffentliche eine Kleinunternehmens-Idee auf JoinOrigin — ob du ein neues Vorhaben startest oder ein bestehendes Unternehmen teilt, was es anbietet — schreibe eine öffentliche Ideenseite, öffne ihren Raum automatisch und lade Kund:innen und Mitgestalter:innen ein, die sehen wollen, dass es passiert. Praktische Schritte von JoinOrigin.',
  intro: [
    'Kleine Unternehmen beginnen oft auf dieselbe Weise — jemand bemerkt ein echtes Problem in seinem Viertel, am Arbeitsplatz oder im Hobby und kann nicht aufhören, über die Lösung nachzudenken — aber viele andere operieren bereits: ein Laufgeschäft, ein funktionierender Dienst, ein Produkt mit Kund:innen. Ob dein Unternehmen noch ein Funke ist oder bereits Menschen bedient, der nächste Schritt ist derselbe: Verwandle das, was du hast, in etwas, das andere sehen, darauf reagieren und dem sie beitreten können. Ein kleines Unternehmen braucht ein öffentliches Zuhause, und es braucht Menschen darum — bevor es ein Schaufenster braucht, und lange nachdem eines existiert.',
    'Der JoinOrigin-Kreislauf funktioniert so: Du veröffentlichst eine Kleinunternehmens-Idee, ihre öffentliche Ideenseite erscheint, und ihr Raum wird im Moment des Veröffentlichens automatisch erstellt. Menschen entdecken die Seite oder folgen einem Link, das Beitreten ist ein einziger Klick, und sie landen im Raum — einem von der ersteller:in kontrollierten Matrix-Raum, in dem Kund:innen, Mitgestalter:innen und frühe Überzeugte Fragen stellen, Feedback teilen und sich einbringen können. Die ersteller:in besitzt den Raum von der ersten Sekunde an und entscheidet, wer beitritt und was darin passiert.',
    'Diese Anleitung führt durch das Veröffentlichen einer Kleinunternehmens-Idee, wie du ein Geschäft eröffnen würdest: die Kund:in und das Problem benennen, die Ideenseite wie ein Schaufenster schreiben, sie veröffentlichen und den Raum öffnen, die Seite mit deinem lokalen Netzwerk teilen, frühe Kund:innen und Mitgestalter:innen einladen, im Raum zuhören, das Angebot aus echtem Feedback verbessern und den Raum zu deiner ersten Kundenbasis ausbauen.',
  ],
  dataPoints: [
    'Die klarsten Kleinunternehmens-Ideen beginnen mit einer benannten Kund:in und einem konkreten Problem, nicht mit einem allgemeinen Publikum.',
    'Auf JoinOrigin erstellt das Veröffentlichen einer Idee automatisch ihren Raum — das Unternehmen hat von Anfang an einen Ort für Kund:innen und Mitgestalter:innen.',
    'Ein Beitrittslink ist die einfachste Einladung: ein Link, ein Klick, und eine interessierte Person ist im Raum.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen hilft, Ideen und die Menschen dahinter zu finden — veröffentliche deine Idee und ihr Raum öffnet sich sofort.',
  ],
  faq: [
    {
      question: 'Wie unterscheidet sich eine Kleinunternehmens-Idee von einer normalen Ideenseite?',
      answer:
        'Das Seitenformat ist dasselbe, aber das Versprechen ist schärfer: eine Kund:in, ein Problem und ein Angebot. Wo eine allgemeine Idee Mitgestalter:innen einlädt, lädt eine Kleinunternehmens-Ideenseite frühe Kund:innen und lokale Überzeugte ein — Menschen, die tatsächlich kaufen, weiterempfehlen oder dir helfen würden, zu starten oder das zu vergrößern, was bereits läuft.',
    },
    {
      question: 'Wann wird der Raum für meine Geschäftsidee erstellt?',
      answer:
        'Der Raum wird automatisch in dem Moment erstellt, in dem du die Idee veröffentlichst. Die ersteller:in besitzt den Raum von der ersten Sekunde an und kann in Element einladen, entfernen und Rollen zuweisen. Du kannst auch mit den Tools, die du bereits nutzt, einen Raum öffnen und die Menschen einladen, denen das Problem wichtig ist.',
    },
    {
      question: 'Wer sollte einer Kleinunternehmens-Idee-Raum beitreten?',
      answer:
        'Frühe Kund:innen, Menschen mit der Fähigkeit, die dir fehlt, und Einheimische, die dich weiterempfehlen können. Der Raum ist der Ort, an dem du Nachfrage testest, das Angebot verfeinerst und die ersten Überzeugten findest — bevor du Geld für Lagerbestand, Mieten oder Marketing ausgibst.',
    },
    {
      question: 'Was sollte die Ideenseite versprechen?',
      answer:
        'Eine benannte Kund:in, ein Problem und was du anzubieten planst. Sei ehrlich über die Phase — „Ich teste diese Idee und möchte mit Menschen sprechen, die dieses Problem spüren“ ist ein starkes Versprechen. Die Seite entscheidet, ob die richtigen Menschen auf Beitreten klicken.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, heute eine Kleinunternehmens-Idee zu veröffentlichen?',
      answer:
        'Ja. Eine Idee auf JoinOrigin zu veröffentlichen erstellt Seite und Raum atomar — der Raum öffnet sich in dem Moment, in dem du veröffentlichst, und du kontrollierst ihn von Anfang an. Veröffentliche die Idee öffentlich und öffne einen Raum für Diskussion; jedes neue Mitglied, das du einlädst, erweitert deine Reichweite.',
    },
  ],
  sections: [
    'Benenne die Kund:in und das Problem. Bevor du etwas schreibst, benenne die konkrete Person, die dieses Problem spürt, und beschreibe das Problem in ihren Worten. Ein kleines Unternehmen gelingt, wenn es ein echtes Bedürfnis gut erfüllt. JoinOrigin ist auf auffindbare Ideenseiten ausgelegt, und die klarsten Seiten beginnen mit einer benannten Kund:in. Schreibe Kund:in und Problem auf und teste sie an drei Menschen, die passen.',
    'Schreibe die Ideenseite wie ein Schaufenster. Die Seite sollte zeigen, was du anbietest, für wen es ist, was es an Zeit oder Geld kostet und in welcher Phase die Idee steht. Bleib konkret — ein Pop-up, ein Produkt, ein Dienst, ein Laden. Eine Idee auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Schreibe die Seite als kurzen öffentlichen Beitrag und verfeinere sie mit Feedback.',
    'Veröffentliche die Idee und öffne ihren Raum. Das Veröffentlichen ist der Moment, in dem die Geschäftsidee auffindbar wird. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn. Auf JoinOrigin sind Seite, Raum und Beitrittslink eine einzige Veröffentlichung. Veröffentliche die Idee öffentlich und öffne einen Raum für das Gespräch darum.',
    'Teile die Seite mit deinem lokalen Netzwerk. Kleine Unternehmen wachsen durch lokale Reichweite. Teile die Ideenseite mit Nachbar:innen, Kolleg:innen, lokalen Gruppen und allen, die das Problem aus erster Hand kennen. Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Idee erledigt die Arbeit.',
    'Lade frühe Kund:innen und Mitgestalter:innen ein. Lade die Menschen ein, die tatsächlich kaufen oder helfen würden: potenzielle Kund:innen, jemanden mit einer Fähigkeit, die dir fehlt, eine:n Mentor:in oder eine:n lokale:n Organisator:in. JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Idee suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jede beitretende Person wird zu einem Kanal in ihr eigenes Netzwerk.',
    'Höre im Raum zu. Frag Beitretende, wie sie das Angebot nutzen würden, was sie zahlen würden und was sie aufhält. Der Raum ist der Ort, an dem echte Nachfrage sichtbar wird — oder nicht. JoinOrigin führt diese Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt der Geschäftsidee einen Raum, in dem Interesse zu Feedback wird, und die ersteller:in besitzt diesen Raum. Frage Mitglieder direkt im Raum.',
    'Verfeinere das Angebot aus echtem Feedback. Passe Preis, Umfang, Kanal oder Versprechen an das an, was Beitretende sagen. Kleine Unternehmen entstehen in kleinen Iterationen. JoinOrigin bewahrt das gemeinsame Gedächtnis einer Idee an einem Ort — Notizen, Entscheidungen und Feedback im Raum — damit Verbesserung sichtbar statt verloren ist. Ändere jeweils eine Sache und beobachte die Reaktion.',
    'Baue den Raum zu deiner ersten Kundenbasis aus. Lade weiter ein, teile weiter Updates und halte den Raum lebendig, während das Angebot konkreter wird. Die Menschen im Raum sind deine ersten Kund:innen und deine ersten Fürsprecher:innen. JoinOrigin hält deine Ideenseite und ihren Raum verbunden, während das Unternehmen wächst — ein Ort, an dem Versprechen, Gespräch und Menschen sichtbar sind. Werde entdeckt und wachse.',
  ],
  steps: [
    {
      title: 'Benenne die Kund:in und das Problem',
      body: 'Bevor du etwas schreibst, benenne die konkrete Person, die dieses Problem spürt, und beschreibe das Problem in ihren Worten. Ein kleines Unternehmen gelingt, wenn es ein echtes Bedürfnis gut erfüllt.',
      joinOriginNote:
        'JoinOrigin ist auf auffindbare Ideenseiten ausgelegt, und die klarsten Seiten beginnen mit einer benannten Kund:in. Schreibe Kund:in und Problem auf und teste sie an drei Menschen, die passen.',
    },
    {
      title: 'Schreibe die Ideenseite wie ein Schaufenster',
      body: 'Die Seite sollte zeigen, was du anbietest, für wen es ist, was es an Zeit oder Geld kostet und in welcher Phase die Idee steht. Bleib konkret — ein Pop-up, ein Produkt, ein Dienst, ein Laden.',
      joinOriginNote:
        'Eine Idee auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Schreibe die Seite als kurzen öffentlichen Beitrag und verfeinere sie mit Feedback.',
    },
    {
      title: 'Veröffentliche die Idee und öffne ihren Raum',
      body: 'Das Veröffentlichen ist der Moment, in dem die Geschäftsidee auffindbar wird. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn.',
      joinOriginNote:
        'Auf JoinOrigin sind Seite, Raum und Beitrittslink eine einzige Veröffentlichung. Veröffentliche die Idee öffentlich und öffne einen Raum für das Gespräch darum.',
    },
    {
      title: 'Teile die Seite mit deinem lokalen Netzwerk',
      body: 'Kleine Unternehmen wachsen durch lokale Reichweite. Teile die Ideenseite mit Nachbar:innen, Kolleg:innen, lokalen Gruppen und allen, die das Problem aus erster Hand kennen.',
      joinOriginNote:
        'Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Idee erledigt die Arbeit.',
    },
    {
      title: 'Lade frühe Kund:innen und Mitgestalter:innen ein',
      body: 'Lade die Menschen ein, die tatsächlich kaufen oder helfen würden: potenzielle Kund:innen, jemanden mit einer Fähigkeit, die dir fehlt, eine:n Mentor:in oder eine:n lokale:n Organisator:in.',
      joinOriginNote:
        'JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Idee suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jede beitretende Person wird zu einem Kanal in ihr eigenes Netzwerk.',
    },
    {
      title: 'Höre im Raum zu',
      body: 'Frag Beitretende, wie sie das Angebot nutzen würden, was sie zahlen würden und was sie aufhält. Der Raum ist der Ort, an dem echte Nachfrage sichtbar wird — oder nicht.',
      joinOriginNote:
        'JoinOrigin führt diese Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt der Geschäftsidee einen Raum, in dem Interesse zu Feedback wird, und die ersteller:in besitzt diesen Raum. Frage Mitglieder direkt im Raum.',
    },
    {
      title: 'Verfeinere das Angebot aus echtem Feedback',
      body: 'Passe Preis, Umfang, Kanal oder Versprechen an das an, was Beitretende sagen. Kleine Unternehmen entstehen in kleinen Iterationen.',
      joinOriginNote:
        'JoinOrigin bewahrt das gemeinsame Gedächtnis einer Idee an einem Ort — Notizen, Entscheidungen und Feedback im Raum — damit Verbesserung sichtbar statt verloren ist. Ändere jeweils eine Sache und beobachte die Reaktion.',
    },
    {
      title: 'Baue den Raum zu deiner ersten Kundenbasis aus',
      body: 'Lade weiter ein, teile weiter Updates und halte den Raum lebendig, während das Angebot konkreter wird. Die Menschen im Raum sind deine ersten Kund:innen und deine ersten Fürsprecher:innen.',
      joinOriginNote:
        'JoinOrigin hält deine Ideenseite und ihren Raum verbunden, während das Unternehmen wächst — ein Ort, an dem Versprechen, Gespräch und Menschen sichtbar sind. Werde entdeckt und wachse.',
    },
  ],
};

export default content;
