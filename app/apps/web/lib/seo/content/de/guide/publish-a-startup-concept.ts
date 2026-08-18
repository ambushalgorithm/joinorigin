import type { GuideContent } from '../../types';

/**
 * „So veröffentlichst du ein Startup-Konzept“ — zeitlose L1-Anleitung
 * (Design §6.1, TASK-353).
 *
 * Geschrieben gegen den Produkt-Screenflow §2 Kernkreislauf: Startup-Konzept
 * veröffentlichen → öffentliche Ideenseite → Beitritt per Link → Raum wird
 * BEIM VERÖFFENTLICHEN automatisch erstellt → ersteller:in kontrolliert den
 * Raum → Feed/Einladungs-Wachstum. Die Ideenseite ist das öffentliche
 * Versprechen des Konzepts; der Raum ist der Ort, an dem frühe Überzeugte,
 * potenzielle Co-Gründer:innen und erste Tester:innen sich um das Startup
 * versammeln. Die Plattform ist live: Das Veröffentlichen eines Konzepts
 * erstellt seine Seite und seinen Raum jetzt. „Raum“ ist an den Matrix-Raum
 * (§6.3) gebunden. Der Satz wird im verfassten Text nie verwendet.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'publish-a-startup-concept',
  title: 'So veröffentlichst du ein Startup-Konzept: Ideenseite + Raum | JoinOrigin',
  description:
    'Veröffentliche ein Startup-Konzept auf JoinOrigin — ob du in der Ideenphase bist oder bereits ein Unternehmen führst — schreibe eine öffentliche Ideenseite, öffne ihren Raum automatisch und versammle frühe Überzeugte, Co-Gründer:innen und erste Tester:innen um die Idee. Praktische Schritte von JoinOrigin.',
  intro: [
    'Jedes Startup — ob noch ein Konzept auf Papier oder bereits mit Kund:innen operierend — braucht Menschen mehr als Kapital: eine:n Gründer:in, der es bauen kann, ein Team, das es liefern kann, und Nutzer:innen, die es testen. Ein Startup, das niemand finden kann, versammelt nichts davon. Das Konzept als auffindbare Ideenseite zu veröffentlichen und dann einen Raum zu öffnen, in dem das Gespräch stattfinden kann, ist der ehrliche erste Schritt beim Aufbau eines Startups — nicht das Deck, nicht das Logo, nicht der Pitch — und es funktioniert genauso für ein bestehendes Unternehmen, das mehr Überzeugte, Co-Gründer:innen und Tester:innen um das herum will, was es baut.',
    'Der JoinOrigin-Kreislauf funktioniert so: Du veröffentlichst ein Startup-Konzept, seine öffentliche Ideenseite erscheint, und sein Raum wird im Moment des Veröffentlichens automatisch erstellt. Menschen entdecken die Seite oder folgen einem Link, das Beitreten ist ein einziger Klick, und sie landen im Raum — einem von der ersteller:in kontrollierten Matrix-Raum, in dem frühe Überzeugte Fragen stellen, potenzielle Co-Gründer:innen die Passung testen und erste Nutzer:innen Feedback geben können. Die ersteller:in besitzt den Raum von der ersten Sekunde an und entscheidet, wer beitritt und was darin passiert.',
    'Diese Anleitung führt durch das Veröffentlichen eines Startup-Konzepts wie eine:n Betreiber:in — ob das Konzept brandneu ist oder das Unternehmen bereits läuft: das Konzept in einen Satz verdichten, die Seite mit ehrlichen Signalen schreiben, sie veröffentlichen und den Raum öffnen, sie mit Gründer:innen-Communities teilen, frühe Überzeugte und Tester:innen einladen, strukturierte Gespräche führen, den Raum zum Formen eines Trial-Teams nutzen und den Raum in den Feed speisen, während das Konzept validiert wird.',
  ],
  dataPoints: [
    'Ein Startup-Konzept, in einen Satz verdichtet, ist leichter zu teilen, zu testen und zu besetzen als ein langer Businessplan.',
    'Auf JoinOrigin erstellt das Veröffentlichen eines Konzepts automatisch seinen Raum — das Startup hat von Anfang an einen Ort für Überzeugte und Tester:innen.',
    'Ein Beitrittslink ist die einfachste Einladung: ein Link, ein Klick, und eine interessierte Person ist im Raum.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen hilft, Ideen und die Menschen dahinter zu finden — veröffentliche dein Konzept und sein Raum öffnet sich sofort.',
  ],
  faq: [
    {
      question:
        'Wie unterscheidet sich ein Startup-Konzept von einer Kleinunternehmens-Ideenseite?',
      answer:
        'Das Seitenformat ist dasselbe, aber der Schwerpunkt verschiebt sich: Eine Kleinunternehmens-Idee dreht sich um eine Kund:in und ein Angebot, während ein Startup-Konzept sich um ein ambitioniertes Problem und das Team dreht, das es lösen muss. Eine Startup-Seite zieht frühe Überzeugte, potenzielle Co-Gründer:innen und erste Tester:innen an statt lokaler Kund:innen.',
    },
    {
      question: 'Wann wird der Raum für mein Startup-Konzept erstellt?',
      answer:
        'Der Raum wird automatisch in dem Moment erstellt, in dem du das Konzept veröffentlichst. Die ersteller:in besitzt den Raum von der ersten Sekunde an und kann in Element einladen, entfernen und Rollen zuweisen. Du kannst auch mit den Tools, die du bereits nutzt, einen Raum öffnen und die Menschen einladen, die den Ehrgeiz teilen.',
    },
    {
      question: 'Wer sollte einem Startup-Konzept-Raum beitreten?',
      answer:
        'Frühe Überzeugte, die das Problem teilen, potenzielle Co-Gründer:innen, die die Passung testen, und erste Nutzer:innen, die bereit sind, eine grobe Version auszuprobieren. Der Raum ist der Ort, an dem du die Menschen findest, die aus einem Konzept ein Team machen — dieselben Menschen, die warme Empfehlungen Monate gebraucht hätten, um sie zu erreichen.',
    },
    {
      question: 'Was macht eine gute Startup-Konzept-Seite aus?',
      answer:
        'Ein ehrlicher Satz zum Problem und zum Ansatz, die Phase des Konzepts und die konkrete Hilfe, die du brauchst — eine:n Builder:in, eine:n Designer:in, eine:n Fachexpert:in, erste Tester:innen. Ehrlichkeit über die Phase zieht die richtigen Menschen an; Übertreibung zieht niemanden an.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, heute ein Startup-Konzept zu veröffentlichen?',
      answer:
        'Ja. Ein Konzept auf JoinOrigin zu veröffentlichen erstellt Seite und Raum atomar — der Raum öffnet sich in dem Moment, in dem du veröffentlichst, und du kontrollierst ihn von Anfang an. Veröffentliche das Konzept öffentlich und öffne einen Raum für Diskussion; jedes neue Mitglied, das du einlädst, erweitert deine Reichweite.',
    },
  ],
  sections: [
    'Verdichte das Konzept in einen Satz. Reduziere das Startup auf seinen Kern: das Problem, den Ansatz und für wen es ist. Wenn du es nicht in einem Satz sagen kannst, ist das Konzept nicht bereit zur Veröffentlichung. JoinOrigin ist auf auffindbare Ideenseiten ausgelegt, und ein Ein-Satz-Pitch ist der Kern der Seite. Schreibe den Satz auf und teste ihn an drei Menschen, die das Problem verstehen.',
    'Schreibe die Seite mit ehrlichen Signalen. Nenne das Problem, den Ansatz, die Phase — Idee, Prototyp oder Produkt — und die konkrete Hilfe, die du brauchst. Ehrlichkeit zieht die richtigen Menschen an. Ein Konzept auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Schreibe die Seite als kurzen öffentlichen Beitrag und iteriere mit Feedback.',
    'Veröffentliche das Konzept und öffne seinen Raum. Das Veröffentlichen ist der Moment, in dem das Konzept auffindbar wird. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn. Auf JoinOrigin sind Seite, Raum und Beitrittslink eine einzige Veröffentlichung. Veröffentliche das Konzept öffentlich und öffne einen Raum für das Gespräch darum.',
    'Teile das Konzept mit Gründer:innen-Communities. Startups wachsen durch Gründer:innen-Netzwerke. Teile die Ideenseite mit Gründer:innen-Gruppen, Startup-Communities, Acceleratoren und allen, die das Problem kennen. Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deinem Konzept erledigt die Arbeit.',
    'Lade frühe Überzeugte und Tester:innen ein. Lade die Menschen ein, die den Ehrgeiz teilen: potenzielle Co-Gründer:innen, Fachexpert:innen und Nutzer:innen, die bereit sind, eine grobe Version auszuprobieren. JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Idee suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jede beitretende Person wird zu einem Kanal in ihr eigenes Netzwerk.',
    'Führe strukturierte Gespräche im Raum. Frag Beitretende, was sie begeistert, was sie beunruhigt und was sie zuerst tun würden. Ein Startup-Raum ist ein fortlaufendes Interview — die Antworten formen das Konzept. JoinOrigin führt diese Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt dem Konzept einen Raum, in dem Interesse zu Erkenntnis wird, und die ersteller:in besitzt diesen Raum. Führe die Gespräche direkt im Raum.',
    'Nutze den Raum, um ein Trial-Team zu formen. Wenn die richtigen Menschen auftauchen, schlage einen kleinen Test vor — einen Prototyp, eine Landingpage oder eine Arbeitssitzung — und sieh, wie das Team zusammenarbeitet. JoinOrigin gibt Communities einen gemeinsamen Raum für ihre Arbeit und Projekte, ein natürlicher Ort, an dem ein Test entstehen kann. Ein kleiner echter Prototyp ist der zuverlässigste Passungstest.',
    'Speise den Raum in den Feed, während du validierst. Poste weiter Updates, halte den Raum lebendig und lass den Schwung des Konzepts für ein größeres Netzwerk sichtbar werden. Der Feed macht aus einem Konzept einen Beweis, dass Menschen sich kümmern. Auf JoinOrigin fließen Raum-Updates in den Feed — die Wachstumsschleife, in der jedes neue Mitglied die Entdeckungsfläche erweitert. Werde entdeckt und wachse.',
  ],
  steps: [
    {
      title: 'Verdichte das Konzept in einen Satz',
      body: 'Reduziere das Startup auf seinen Kern: das Problem, den Ansatz und für wen es ist. Wenn du es nicht in einem Satz sagen kannst, ist das Konzept nicht bereit zur Veröffentlichung.',
      joinOriginNote:
        'JoinOrigin ist auf auffindbare Ideenseiten ausgelegt, und ein Ein-Satz-Pitch ist der Kern der Seite. Schreibe den Satz auf und teste ihn an drei Menschen, die das Problem verstehen.',
    },
    {
      title: 'Schreibe die Seite mit ehrlichen Signalen',
      body: 'Nenne das Problem, den Ansatz, die Phase — Idee, Prototyp oder Produkt — und die konkrete Hilfe, die du brauchst. Ehrlichkeit zieht die richtigen Menschen an.',
      joinOriginNote:
        'Ein Konzept auf JoinOrigin zu veröffentlichen erstellt Seite und Raum automatisch, wobei die ersteller:in den Raum von Anfang an kontrolliert. Schreibe die Seite als kurzen öffentlichen Beitrag und iteriere mit Feedback.',
    },
    {
      title: 'Veröffentliche das Konzept und öffne seinen Raum',
      body: 'Das Veröffentlichen ist der Moment, in dem das Konzept auffindbar wird. Auf JoinOrigin wird der Raum im selben Moment automatisch erstellt — es gibt keinen separaten Einrichtungsschritt, und die ersteller:in besitzt ihn.',
      joinOriginNote:
        'Auf JoinOrigin sind Seite, Raum und Beitrittslink eine einzige Veröffentlichung. Veröffentliche das Konzept öffentlich und öffne einen Raum für das Gespräch darum.',
    },
    {
      title: 'Teile das Konzept mit Gründer:innen-Communities',
      body: 'Startups wachsen durch Gründer:innen-Netzwerke. Teile die Ideenseite mit Gründer:innen-Gruppen, Startup-Communities, Acceleratoren und allen, die das Problem kennen.',
      joinOriginNote:
        'Beitreten auf JoinOrigin ist eine einzelne Aktion — Klicken auf Beitreten auf der öffentlichen Seite oder Folgen eines direkten Einladungslinks von einem Mitglied. Ein kurzer, klarer Link zu deinem Konzept erledigt die Arbeit.',
    },
    {
      title: 'Lade frühe Überzeugte und Tester:innen ein',
      body: 'Lade die Menschen ein, die den Ehrgeiz teilen: potenzielle Co-Gründer:innen, Fachexpert:innen und Nutzer:innen, die bereit sind, eine grobe Version auszuprobieren.',
      joinOriginNote:
        'JoinOrigin macht das Entdecken einfacher — ein Ort, an dem Menschen, die eine Idee suchen, deine finden und über einen Link beitreten können. Persönliche Einladungen leisten weiterhin die schwere Arbeit, und jede beitretende Person wird zu einem Kanal in ihr eigenes Netzwerk.',
    },
    {
      title: 'Führe strukturierte Gespräche im Raum',
      body: 'Frag Beitretende, was sie begeistert, was sie beunruhigt und was sie zuerst tun würden. Ein Startup-Raum ist ein fortlaufendes Interview — die Antworten formen das Konzept.',
      joinOriginNote:
        'JoinOrigin führt diese Gespräche nicht; der Raum gehört dir, um ihn zu gestalten. Die Plattform gibt dem Konzept einen Raum, in dem Interesse zu Erkenntnis wird, und die ersteller:in besitzt diesen Raum. Führe die Gespräche direkt im Raum.',
    },
    {
      title: 'Nutze den Raum, um ein Trial-Team zu formen',
      body: 'Wenn die richtigen Menschen auftauchen, schlage einen kleinen Test vor — einen Prototyp, eine Landingpage oder eine Arbeitssitzung — und sieh, wie das Team zusammenarbeitet.',
      joinOriginNote:
        'JoinOrigin gibt Communities einen gemeinsamen Raum für ihre Arbeit und Projekte, ein natürlicher Ort, an dem ein Test entstehen kann. Ein kleiner echter Prototyp ist der zuverlässigste Passungstest.',
    },
    {
      title: 'Speise den Raum in den Feed, während du validierst',
      body: 'Poste weiter Updates, halte den Raum lebendig und lass den Schwung des Konzepts für ein größeres Netzwerk sichtbar werden. Der Feed macht aus einem Konzept einen Beweis, dass Menschen sich kümmern.',
      joinOriginNote:
        'Auf JoinOrigin fließen Raum-Updates in den Feed — die Wachstumsschleife, in der jedes neue Mitglied die Entdeckungsfläche erweitert. Werde entdeckt und wachse.',
    },
  ],
};

export default content;
