import type { GuideContent } from '../../types';

/**
 * „So erstellst du eine Gruppe“ — zeitlose L1-Anleitung (Design §6.1,
 * TASK-353).
 *
 * Geschrieben gegen den Produkt-Screenflow §2 Kernkreislauf: Gruppe
 * veröffentlichen → öffentliche Gruppenseite → Beitritt per Link → Raum wird
 * BEIM VERÖFFENTLICHEN automatisch erstellt → ersteller:in kontrolliert den
 * Raum → Feed/Einladungs-Wachstum. Eine Gruppe ist eine Community: Die
 * öffentliche Seite nennt das Versprechen, der Raum ist der Ort, an dem
 * Mitglieder sich verbinden, und Mitglieder treten über einen Link bei. Die
 * Plattform ist live: Eine Gruppe zu erstellen veröffentlicht ihre Seite und
 * öffnet ihren Raum jetzt. „Raum“ ist an den Matrix-Raum (§6.3) gebunden.
 * Der Satz wird im verfassten Text nie verwendet.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'create-a-group',
  title: 'So erstellst du eine Gruppe: Veröffentliche sie und öffne ihren Raum | JoinOrigin',
  description:
    'Erstelle eine Gruppe auf JoinOrigin — veröffentliche eine Gruppenseite, öffne ihren Raum automatisch und lade Mitglieder über einen Beitrittslink ein. Praktische Schritte von JoinOrigin.',
  intro: [
    'Jede Community — ob brandneu oder seit Monaten informell zusammen — läuft auf denselben zwei Bewegungen: entscheiden, für wen sie ist, und diesen Menschen einen klaren Ort zum Verbinden geben. Eine Gruppe ohne Zuhause formt sich nie richtig; Interesse verstreut sich über Nachrichten, Tabellen und einmalige Gespräche, und nichts bleibt hängen. Die Gruppenseite und ihr Raum sind dieses Zuhause, und sie gut zu erstellen ist der Unterschied zwischen einer echten Community und einer Liste von Namen.',
    'Der JoinOrigin-Kreislauf funktioniert so: Du veröffentlichst eine Gruppe, ihre öffentliche Seite erscheint, und ihr Raum wird im Moment des Veröffentlichens automatisch erstellt. Menschen entdecken die Gruppe über Entdecken oder folgen einem Beitrittslink, das Beitreten ist ein einziger Klick, und sie landen im Raum — einem von der ersteller:in kontrollierten Matrix-Raum, in dem die Community tatsächlich lebt. Die ersteller:in besitzt den Raum von der ersten Sekunde an und kontrolliert, wer beitritt und wie die Gruppe funktioniert.',
    'Diese Anleitung deckt den ganzen Weg ab — ob die Gruppe neu ist oder bereits auf Papier existiert: Zielgruppe und Zweck wählen, eine Gruppenseite schreiben, die Menschen finden können, die Gruppe veröffentlichen und ihren Raum öffnen, als ersteller:in Erwartungen setzen, den Beitrittslink teilen, die ersten Mitglieder einladen, die ersten Gespräche beginnen und den Raum aktiv halten, damit die Gruppe weiter wächst.',
  ],
  dataPoints: [
    'Die klarsten Gruppen beginnen mit einer Zielgruppe und einem Versprechen — Spezifität ist eine Wachstumsfunktion.',
    'Auf JoinOrigin erstellt das Veröffentlichen einer Gruppe automatisch ihren Raum — die Community hat von der ersten Sekunde an einen Ort zum Verbinden.',
    'Ein Beitrittslink ist die einfachste Einladung: ein Link, ein Klick, und ein neues Mitglied ist im Raum.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen hilft, Gruppen zu finden, beizutreten und zu gründen — veröffentliche deine Gruppe und ihr Raum öffnet sich sofort.',
  ],
  faq: [
    {
      question: 'Was ist der Unterschied zwischen einer Gruppe und einer Community?',
      answer:
        'Auf JoinOrigin sind sie dasselbe Objekt. Eine Gruppe (oder Community) ist ein veröffentlichtes, beitrittsfähiges Objekt mit einer öffentlichen Seite und einem Raum. Die Gruppenseite nennt das Versprechen; der Raum ist der Ort, an dem Mitglieder sich verbinden. Communities bekommen einen Matrix-Space, der die Räume der Gruppe hält, und der Hauptraum ist der Ort, an dem die Gruppe lebt.',
    },
    {
      question: 'Wann wird der Gruppenraum erstellt?',
      answer:
        'Der Raum wird automatisch in dem Moment erstellt, in dem du die Gruppe veröffentlichst — es gibt nie einen separaten Schritt „Chat später erstellen“. Die ersteller:in besitzt den Raum von der ersten Sekunde an und kann in Element einladen, entfernen und Rollen zuweisen. Du kannst dieselbe Form auch mit Tools aufbauen, die du bereits nutzt.',
    },
    {
      question: 'Wie treten Mitglieder meiner Gruppe bei?',
      answer:
        'Beitreten ist eine einzelne Aktion: Klicken auf Beitreten auf der öffentlichen Gruppenseite oder Folgen eines direkten Einladungslinks von einem Mitglied. Beitretende landen im Raum der Gruppe. Das zuverlässigste frühe Wachstum ist persönlich — den Beitrittslink mit Menschen zu teilen, die zur Zielgruppe passen, und sie zu bitten, weitere mitzubringen.',
    },
    {
      question: 'Was sollte die Gruppenseite sagen?',
      answer:
        'Ein Satz dazu, für wen die Gruppe ist, ein Satz dazu, was im Raum passiert, und was ein Mitglied vom Beitritt hat. Bleib spezifisch — „neue Gründer:innen in Brooklyn“ schlägt „Menschen, die Wirtschaft mögen“. Die Seite ist das Versprechen, das entscheidet, ob jemand auf Beitreten klickt.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, heute eine Gruppe zu erstellen?',
      answer:
        'Ja. Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt Seite und Raum atomar — der Raum öffnet sich in dem Moment, in dem du veröffentlichst, und du kontrollierst ihn von Anfang an. Veröffentliche die Gruppe und öffne einen Raum für Mitglieder; jedes neue Mitglied, das du einlädst, erweitert deine Reichweite.',
    },
  ],
  sections: [
    'Wähle Zielgruppe und Zweck. Entscheide, für wen die Gruppe ist und wofür sie existiert — eine Zielgruppe, ein Versprechen und ein erfolgreiches Mitglied, das du beschreiben kannst. JoinOrigin ist auf auffindbare Gruppenseiten ausgelegt, und die klarsten Gruppen nennen Zielgruppe und Zweck vorab. Schreibe für beides einen Satz und halte sie vor jeder Einladung präsent.',
    'Schreibe eine Gruppenseite, die Menschen finden können. Die Seite sollte nennen, für wen die Gruppe ist, was im Raum passiert und was Mitglieder vom Beitritt haben. Bleib spezifisch und ehrlich. Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Veröffentliche die Beschreibung und teste sie an ein paar Menschen, die zur Zielgruppe passen.',
    'Veröffentliche die Gruppe und öffne ihren Raum. Das Veröffentlichen ist der Moment, in dem die Gruppe real wird: eine öffentliche Seite plus ein Raum, in dem Mitglieder sich verbinden. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn. Auf JoinOrigin sind Seite, Raum und Beitrittslink eine einzige Veröffentlichung. Erstelle Seite und Raum lieber in den Tools, die deine Gruppe bereits nutzt.',
    'Setze Erwartungen als ersteller:in. Als Rauminhaber:in entscheidest du, wie die Gruppe funktioniert: was Mitglieder posten können, was die Regeln sind und wie neue Menschen willkommen geheißen werden. Ersteller:innen-Kontrolle ist Standard-Matrix-Raumbesitz — einladen, entfernen, Rollen zuweisen, anheften, archivieren. JoinOrigin setzt deine Regeln nicht für dich; das Design gibt dir die Kontrollen. Schreibe die Erwartungen an den Raum auf und hefte sie dort an, wo Mitglieder sie sehen können.',
    'Teile den Beitrittslink. Der Beitrittslink ist der kürzeste Weg von Interesse zu Mitgliedschaft: ein Link, ein Klick, und ein neues Mitglied landet im Raum. Setze ihn überall hin, wo die richtigen Menschen sich treffen. Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Gruppe erledigt die Arbeit.',
    'Lade die ersten Mitglieder persönlich ein. Persönliche Einladungen konvertieren weit besser als öffentliche Beiträge. Schreib Freund:innen, Kolleg:innen und Bekannten, die zur Zielgruppe passen, teile den Beitrittslink und bitte sie, eine weitere Person mitzubringen. JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Gruppe suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jedes Mitglied wird zu einem Kanal in sein eigenes Netzwerk.',
    'Beginne die ersten Gespräche im Raum. Die ersten Gespräche setzen die Kultur. Eröffne mit einem klaren Impuls — Vorstellungen, ein gemeinsames Ziel oder ein erstes Thema — und antworte auf jede Nachricht. JoinOrigin führt deine Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt der Gruppe einen Raum, in dem Mitglieder sich verbinden, und die ersteller:in besitzt ihn. Sei in den ersten Wochen das aktivste Mitglied.',
    'Halte den Raum aktiv und wachsend. Halte einen Rhythmus — ein wöchentliches Thema, ein wiederkehrendes Check-in oder ein festes Update — damit Mitglieder einen Grund haben, zurückzukehren. Wachstum potenziert sich, wenn jedes Mitglied die Gruppe in einem Satz beschreiben und ihren Beitrittslink teilen kann. JoinOrigin hält deine Gruppenseite und ihren Raum verbunden, während die Gruppe wächst — ein Ort, an dem Versprechen, Raum und Menschen sichtbar sind. Werde entdeckt und wachse.',
  ],
  steps: [
    {
      title: 'Wähle Zielgruppe und Zweck',
      body: 'Entscheide, für wen die Gruppe ist und wofür sie existiert — eine Zielgruppe, ein Versprechen und ein erfolgreiches Mitglied, das du beschreiben kannst.',
      joinOriginNote:
        'JoinOrigin ist auf auffindbare Gruppenseiten ausgelegt, und die klarsten Gruppen nennen Zielgruppe und Zweck vorab. Schreibe für beides einen Satz und halte sie vor jeder Einladung präsent.',
    },
    {
      title: 'Schreibe eine Gruppenseite, die Menschen finden können',
      body: 'Die Seite sollte nennen, für wen die Gruppe ist, was im Raum passiert und was Mitglieder vom Beitritt haben. Bleib spezifisch und ehrlich.',
      joinOriginNote:
        'Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Veröffentliche die Beschreibung und teste sie an ein paar Menschen, die zur Zielgruppe passen.',
    },
    {
      title: 'Veröffentliche die Gruppe und öffne ihren Raum',
      body: 'Das Veröffentlichen ist der Moment, in dem die Gruppe real wird: eine öffentliche Seite plus ein Raum, in dem Mitglieder sich verbinden. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn.',
      joinOriginNote:
        'Auf JoinOrigin sind Seite, Raum und Beitrittslink eine einzige Veröffentlichung. Erstelle Seite und Raum lieber in den Tools, die deine Gruppe bereits nutzt.',
    },
    {
      title: 'Setze Erwartungen als ersteller:in',
      body: 'Als Rauminhaber:in entscheidest du, wie die Gruppe funktioniert: was Mitglieder posten können, was die Regeln sind und wie neue Menschen willkommen geheißen werden. Ersteller:innen-Kontrolle ist Standard-Matrix-Raumbesitz — einladen, entfernen, Rollen zuweisen, anheften, archivieren.',
      joinOriginNote:
        'JoinOrigin setzt deine Regeln nicht für dich; das Design gibt dir die Kontrollen. Schreibe die Erwartungen an den Raum auf und hefte sie dort an, wo Mitglieder sie sehen können.',
    },
    {
      title: 'Teile den Beitrittslink',
      body: 'Der Beitrittslink ist der kürzeste Weg von Interesse zu Mitgliedschaft: ein Link, ein Klick, und ein neues Mitglied landet im Raum. Setze ihn überall hin, wo die richtigen Menschen sich treffen.',
      joinOriginNote:
        'Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deiner Gruppe erledigt die Arbeit.',
    },
    {
      title: 'Lade die ersten Mitglieder persönlich ein',
      body: 'Persönliche Einladungen konvertieren weit besser als öffentliche Beiträge. Schreib Freund:innen, Kolleg:innen und Bekannten, die zur Zielgruppe passen, teile den Beitrittslink und bitte sie, eine weitere Person mitzubringen.',
      joinOriginNote:
        'JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Gruppe suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jedes Mitglied wird zu einem Kanal in sein eigenes Netzwerk.',
    },
    {
      title: 'Beginne die ersten Gespräche im Raum',
      body: 'Die ersten Gespräche setzen die Kultur. Eröffne mit einem klaren Impuls — Vorstellungen, ein gemeinsames Ziel oder ein erstes Thema — und antworte auf jede Nachricht.',
      joinOriginNote:
        'JoinOrigin führt deine Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt der Gruppe einen Raum, in dem Mitglieder sich verbinden, und die ersteller:in besitzt ihn. Sei in den ersten Wochen das aktivste Mitglied.',
    },
    {
      title: 'Halte den Raum aktiv und wachsend',
      body: 'Halte einen Rhythmus — ein wöchentliches Thema, ein wiederkehrendes Check-in oder ein festes Update — damit Mitglieder einen Grund haben, zurückzukehren. Wachstum potenziert sich, wenn jedes Mitglied die Gruppe in einem Satz beschreiben und ihren Beitrittslink teilen kann.',
      joinOriginNote:
        'JoinOrigin hält deine Gruppenseite und ihren Raum verbunden, während die Gruppe wächst — ein Ort, an dem Versprechen, Raum und Menschen sichtbar sind. Werde entdeckt und wachse.',
    },
  ],
};

export default content;
