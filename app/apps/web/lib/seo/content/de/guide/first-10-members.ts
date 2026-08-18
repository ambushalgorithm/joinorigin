import type { GuideContent } from '../../types';

/**
 * „So gewinnst du deine ersten 10 Mitglieder“ — zeitlose L1-Anleitung
 * (Design §6.1, TASK-326).
 *
 * Neu auf das digitale Verbinden→Beitreten→Raum-Modell ausgerichtet: Der Raum
 * ist die Beitrittsfläche — Mitglieder kommen über Einladungslinks herein und
 * treten dem Raum der Gruppe bei, in dem die Community tatsächlich lebt. Der
 * JoinOrigin-Wert ist in die Einleitung und jeden Schritt eingewoben (pro
 * Schritt `joinOriginNote`), mit ehrlicher Rahmung — JoinOrigin rekrutiert
 * keine Mitglieder und veranstaltet keine Events. Einzelnes H1,
 * Schritt-für-Schritt-Struktur, FAQ 1:1 in `FAQPage`-JSON-LD gespiegelt.
 * „Raum“ ist an den Matrix-Raum (§6.3) gebunden.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'first-10-members',
  title:
    'So gewinnst du deine ersten 10 Mitglieder für eine neue oder wachsende Community | JoinOrigin',
  description:
    'Gewinne deine ersten 10 Mitglieder ohne großes Budget — ob du eine neue Community startest oder eine bestehende neu beflügelst — beginne mit deinem persönlichen Netzwerk, teile Einladungslinks und mache den Raum zum Ort, dem Menschen beitreten wollen. Praktische Schritte von JoinOrigin.',
  intro: [
    'Die ersten zehn Mitglieder sind am schwersten zu gewinnen und am wichtigsten, weil sie die Kultur einer Community definieren, bevor sie irgendeine Reputation hat, um Fremde anzuziehen — und sie sind genauso wertvoll, wenn eine bestehende Community ins Stocken geraten ist oder neu startet, weil ein engagierter Kern das ist, was aus einer ruhigen Gruppe eine lebendige macht. Dieses Erste-zehn-Problem ist im Kern ein Menschen-verbinden-Problem, und es ist das Kernproblem, das JoinOrigin löst.',
    'JoinOrigin ist ein Community-Betriebssystem, das um den digitalen Verbinden→Beitreten→Raum-Kreislauf gebaut ist: Du veröffentlichst eine Gruppe, ihr Raum wird automatisch erstellt, und Mitglieder treten über einen Link bei. Der Raum ist die Beitrittsfläche — jede Person, die auf Beitreten klickt oder einem Einladungslink folgt, landet im Raum der Gruppe, dem einen Ort, an dem die Community lebt und an dem neue Mitglieder sich sofort verbunden fühlen. JoinOrigin rekrutiert keine Mitglieder und veranstaltet keine Events — das ist dein Teil. Die Plattform macht Entdeckung und Beitritt deutlich einfacher; frühes Wachstum kommt trotzdem aus persönlicher Reichweite: den Menschen, die du direkt mit einem Link einlädst, denen, die sie mitbringen, und denen, die bleiben, weil sich der Raum lebendig anfühlt.',
    'Diese Anleitung zerlegt das Erste-zehn-Mitglieder-Problem in konkrete Schritte — ob du eine neue Community startest oder eine bestehende wiederbelebst: mit den Menschen beginnen, die du bereits kennst, deine Gruppe veröffentlichen, damit sie einen Raum zum Beitreten hat, persönlich mit Links einladen, ein erstes Treffen veranstalten, das Teilnehmende zu Fürsprecher:innen macht, und eine einfache Empfehlungs-Gewohnheit aufbauen, damit jedes Mitglied das nächste bringt — und jeder Schritt zeigt, wo JoinOrigin hilft.',
  ],
  dataPoints: [
    'Persönliche Einladungen konvertieren mit weit höherer Rate als öffentliche Beiträge oder bezahlte Anzeigen.',
    'Ein Einladungslink entfernt jede Barriere: ein Klick und ein neues Mitglied ist im Raum.',
    'Zehn aktive Mitglieder sind genug sozialer Beweis, dass die meisten Menschen eine Gruppe als echt und beitrittswürdig empfinden.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Communities zu finden oder zu starten — es rekrutiert keine Mitglieder und veranstaltet keine Events.',
  ],
  faq: [
    {
      question: 'Warum genau zehn Mitglieder?',
      answer:
        'Zehn ist ein Wendepunkt: Mit zehn Stammgästen hast du einen lebendigen Raum, einen zuverlässigen Kern für Diskussionen und genug sozialen Beweis, um Neuzugänge anzuziehen, die sonst zögern würden. Unter zehn fühlt sich der Raum fragil an.',
    },
    {
      question: 'Wie lange dauert es, die ersten zehn Mitglieder zu gewinnen?',
      answer:
        'Mit konsequenten persönlichen Einladungen und einem guten ersten Treffen erreichen die meisten Organisator:innen zehn engagierte Mitglieder innerhalb von drei bis sechs Wochen. Der Schlüssel ist, jede Woche einzuladen — Links teilen, nachfassen und den Raum aktiv halten — statt auf einen großen Start zu warten.',
    },
    {
      question: 'Was, wenn ich kein großes persönliches Netzwerk habe?',
      answer:
        'Beginne kleiner: Lade fünf Menschen ein, die du kennst, bitte jede:n, eine Person mitzubringen, und poste in zwei Nischen-Gruppen, in denen deine Zielgruppe sich bereits versammelt. Jedes Mitglied, das du behältst, wird zu einem Kanal in sein eigenes Netzwerk — und jede Einladung kann ein einfacher Link in den Raum sein.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, Mitglieder zu finden?',
      answer:
        'Ja. JoinOrigin hilft Menschen, Communities zu entdecken und zu starten — ein Ort, an dem Menschen, die eine Gruppe suchen, deine finden und über einen Link ihrem Raum beitreten können. Die Schritte dieser Anleitung — persönliche Einladungen und ein großartiges erstes Treffen — sind die zuverlässigsten Wege, deine ersten Mitglieder zu finden.',
    },
  ],
  sections: [
    'Liste fünfzig Menschen auf, die du bereits kennst. Schreibe alle auf, die zum Zweck der Community passen: Freund:innen, Kolleg:innen, Kommiliton:innen, frühere Arbeitskolleg:innen, Nachbar:innen und Online-Bekannte. Du brauchst etwa fünfmal so viele Namen wie die zehn, die du willst. JoinOrigin gibt deiner Community ein sichtbares Zuhause und einen auffindbaren Raum — aber die ersten Namen kommen trotzdem von Menschen, die du kennst. Liste fünfzig auf und behandle jede:n als persönliche Empfehlung.',
    'Veröffentliche deine Gruppe und öffne ihren Raum. Eine Community, auf die du nicht zeigen kannst, existiert noch nicht — und eine, deren Zuhause über Chats und Listen verstreut ist, ist fast so schwer zu vergrößern. Veröffentliche die Gruppe mit einer klaren Mission und lass ihren Raum automatisch erstellen, damit es einen echten Ort gibt, an dem Mitglieder landen. Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum — der Raum ist die Beitrittsfläche, und die ersteller:in besitzt ihn von Anfang an. Richte deine Gruppe und ihren Raum lieber in den Tools ein, die du bereits nutzt, bevor du jemanden einlädst.',
    'Lade persönlich mit einer konkreten Bitte und einem Link ein. Sende eine kurze Nachricht, die die Community, den ersten Termin oder das erste Gespräch und den Grund nennt, warum die Person es genießen würde — und füge den Beitrittslink hinzu. Persönliche Nachrichten schlagen generische Beiträge, und ein konkreter Termin schlägt ein vages Versprechen. JoinOrigin entfernt die Reibung des Beitritts, sobald Menschen dich gefunden haben — ein Link, ein Klick, in den Raum. Eine kurze persönliche Nachricht mit konkretem Termin und Link konvertiert besser als jeder öffentliche Beitrag.',
    'Bitte jede:n Eingeladene:n, eine Person mitzubringen. Mache es zu einem normalen Teil der Bitte: „Bring eine:n Freund:in mit, der:dem das gefallen könnte.“ Empfehlungs-Einladungen sind, wie kleine Netzwerke zu echten Communities werden. JoinOrigin gibt Mitgliedern ein teilbares Zuhause für die Community — so zeigen Empfehlungsgespräche auf einen echten Link und einen echten Raum. Mache „bring eine:n Freund:in“ zu einem Teil der Bitte und gib ihnen den Link zum Teilen.',
    'Veranstalte ein wirklich gutes erstes Treffen. Investiere deine Energie in die Erfahrung, nicht in die Teilnehmerzahl: ein warmer Empfang, ein klares Format und eine definierte Endzeit. Menschen, die das erste Treffen genießen, bringen die nächsten zehn mit. JoinOrigin veranstaltet keine Events — die Erfahrung liegt bei dir. Die Plattform hilft der Community, sich darum zu formen: ein Raum, auf den Mitglieder danach zeigen und die Verbindung fortsetzen können.',
    'Lade jede:n Teilnehmende:n in den Raum ein. Teile am Ende des Treffens den Beitrittslink und füge alle hinzu, die bleiben wollen. Der Raum ist der Ort, an dem die Community zwischen Treffen lebt — ein Mitglied, das dem Raum beigetreten ist, kehrt mit hoher Wahrscheinlichkeit zurück. JoinOrigin hält Mitgliedschaft und Kommunikation deiner Community in einem organisierten Raum statt auf einem Anmeldeblatt. Ein einfacher Link in den Raum hält die Nachbereitung möglich.',
    'Folge innerhalb von 24 Stunden mit einem nächsten Termin nach. Danke jeder:m Teilnehmenden, teile eine Zusammenfassung von einem Absatz und bestätige das nächste Treffen — im Raum, wo alle es sehen können. Die Nachbereitung ist der Moment, in dem aus einer einmaligen Teilnehmer:in ein Mitglied wird. Auf JoinOrigin hat eine Nachbereitung ein natürliches Zuhause — ein Ort, an dem Zusammenfassung und nächster Termin leben. Ein persönliches Dankeschön innerhalb von 24 Stunden verwandelt eine Teilnehmer:in in ein Mitglied.',
    'Mache das Einladen anderer trivial einfach. Gib Mitgliedern einen Satz, den sie wiederholen können, und einen Link, den sie teilen können: „Es ist ein monatliches Meetup für neue Gründer:innen, um Lektionen zu teilen — tritt hier bei.“ Eine klare, kurze Beschreibung ist das effektivste Rekrutierungswerkzeug. JoinOrigin lässt eine Community an einem Ort beschreiben, finden und beitreten — Mitglieder können Menschen auf den Raum verweisen, statt ihn zu erklären. Gib Mitgliedern einen Satz und einen Link, den sie wiederholen können.',
  ],
  steps: [
    {
      title: 'Liste fünfzig Menschen auf, die du bereits kennst',
      body: 'Schreibe alle auf, die zum Zweck der Community passen: Freund:innen, Kolleg:innen, Kommiliton:innen, frühere Arbeitskolleg:innen, Nachbar:innen und Online-Bekannte. Du brauchst etwa fünfmal so viele Namen wie die zehn, die du willst.',
      joinOriginNote:
        'JoinOrigin gibt deiner Community ein sichtbares Zuhause und einen auffindbaren Raum — aber die ersten Namen kommen trotzdem von Menschen, die du kennst. Liste fünfzig auf und behandle jede:n als persönliche Empfehlung.',
    },
    {
      title: 'Veröffentliche deine Gruppe und öffne ihren Raum',
      body: 'Eine Community, auf die du nicht zeigen kannst, existiert noch nicht — und eine, deren Zuhause über Chats und Listen verstreut ist, ist fast so schwer zu vergrößern. Veröffentliche die Gruppe mit einer klaren Mission und lass ihren Raum automatisch erstellen, damit es einen echten Ort gibt, an dem Mitglieder landen.',
      joinOriginNote:
        'Eine Gruppe auf JoinOrigin zu veröffentlichen erstellt automatisch ihren Raum — der Raum ist die Beitrittsfläche, und die ersteller:in besitzt ihn von Anfang an. Richte deine Gruppe und ihren Raum lieber in den Tools ein, die du bereits nutzt, bevor du jemanden einlädst.',
    },
    {
      title: 'Lade persönlich mit einer konkreten Bitte und einem Link ein',
      body: 'Sende eine kurze Nachricht, die die Community, den ersten Termin oder das erste Gespräch und den Grund nennt, warum die Person es genießen würde — und füge den Beitrittslink hinzu. Persönliche Nachrichten schlagen generische Beiträge, und ein konkreter Termin schlägt ein vages Versprechen.',
      joinOriginNote:
        'JoinOrigin entfernt die Reibung des Beitritts, sobald Menschen dich gefunden haben — ein Link, ein Klick, in den Raum. Eine kurze persönliche Nachricht mit konkretem Termin und Link konvertiert besser als jeder öffentliche Beitrag.',
    },
    {
      title: 'Bitte jede:n Eingeladene:n, eine Person mitzubringen',
      body: 'Mache es zu einem normalen Teil der Bitte: „Bring eine:n Freund:in mit, der:dem das gefallen könnte.“ Empfehlungs-Einladungen sind, wie kleine Netzwerke zu echten Communities werden.',
      joinOriginNote:
        'JoinOrigin gibt Mitgliedern ein teilbares Zuhause für die Community — so zeigen Empfehlungsgespräche auf einen echten Link und einen echten Raum. Mache „bring eine:n Freund:in“ zu einem Teil der Bitte und gib ihnen den Link zum Teilen.',
    },
    {
      title: 'Veranstalte ein wirklich gutes erstes Treffen',
      body: 'Investiere deine Energie in die Erfahrung, nicht in die Teilnehmerzahl: ein warmer Empfang, ein klares Format und eine definierte Endzeit. Menschen, die das erste Treffen genießen, bringen die nächsten zehn mit.',
      joinOriginNote:
        'JoinOrigin veranstaltet keine Events — die Erfahrung liegt bei dir. Die Plattform hilft der Community, sich darum zu formen: ein Raum, auf den Mitglieder danach zeigen und die Verbindung fortsetzen können.',
    },
    {
      title: 'Lade jede:n Teilnehmende:n in den Raum ein',
      body: 'Teile am Ende des Treffens den Beitrittslink und füge alle hinzu, die bleiben wollen. Der Raum ist der Ort, an dem die Community zwischen Treffen lebt — ein Mitglied, das dem Raum beigetreten ist, kehrt mit hoher Wahrscheinlichkeit zurück.',
      joinOriginNote:
        'JoinOrigin hält Mitgliedschaft und Kommunikation deiner Community in einem organisierten Raum statt auf einem Anmeldeblatt. Ein einfacher Link in den Raum hält die Nachbereitung möglich.',
    },
    {
      title: 'Folge innerhalb von 24 Stunden mit einem nächsten Termin nach',
      body: 'Danke jeder:m Teilnehmenden, teile eine Zusammenfassung von einem Absatz und bestätige das nächste Treffen — im Raum, wo alle es sehen können. Die Nachbereitung ist der Moment, in dem aus einer einmaligen Teilnehmer:in ein Mitglied wird.',
      joinOriginNote:
        'Auf JoinOrigin hat eine Nachbereitung ein natürliches Zuhause — ein Ort, an dem Zusammenfassung und nächster Termin leben. Ein persönliches Dankeschön innerhalb von 24 Stunden verwandelt eine Teilnehmer:in in ein Mitglied.',
    },
    {
      title: 'Mache das Einladen anderer trivial einfach',
      body: 'Gib Mitgliedern einen Satz, den sie wiederholen können, und einen Link, den sie teilen können: „Es ist ein monatliches Meetup für neue Gründer:innen, um Lektionen zu teilen — tritt hier bei.“ Eine klare, kurze Beschreibung ist das effektivste Rekrutierungswerkzeug.',
      joinOriginNote:
        'JoinOrigin lässt eine Community an einem Ort beschreiben, finden und beitreten — Mitglieder können Menschen auf den Raum verweisen, statt ihn zu erklären. Gib Mitgliedern einen Satz und einen Link, den sie wiederholen können.',
    },
  ],
};

export default content;
