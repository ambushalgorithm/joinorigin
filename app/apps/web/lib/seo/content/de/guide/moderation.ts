import type { GuideContent } from '../../types';

/**
 * „Community-Moderation“ — zeitlose L1-Anleitung (Design §6.1, TASK-326).
 *
 * Neu auf das digitale Verbinden→Beitreten→Raum-Modell ausgerichtet:
 * Ersteller:innen-Kontrolle IST Matrix-Raumbesitz — Mitglieder einladen/
 * entfernen, Rollen zuweisen, Raum-Einstellungen bearbeiten, Nachrichten
 * anheften, den Raum archivieren — nativ in Element durchgesetzt. Der
 * JoinOrigin-Wert ist in die Einleitung und jeden Schritt eingewoben (pro
 * Schritt `joinOriginNote`), mit ehrlicher Rahmung — JoinOrigin moderiert
 * keine Dritt-Communities und stellt kein Moderationspersonal. Einzelnes H1,
 * Schritt-für-Schritt-Struktur, FAQ 1:1 in `FAQPage`-JSON-LD gespiegelt.
 * „Raum“ ist an den Matrix-Raum (§6.3) gebunden — private/Vorfalls-Räume
 * werden als Räume/DMs beschrieben, nie als „Kanäle“.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'de',
  slug: 'moderation',
  title: 'Origin-Moderation: So hältst du Gruppen gesund & einladend | JoinOrigin',
  description:
    'Moderiere ein Origin mit klaren Regeln, frühem Handeln und Deeskalation — ob du eine brandneue Gruppe einrichtest oder die Kultur eines etablierten reparierst — Ersteller:innen-Kontrolle ist Matrix-Raumbesitz, mit Rollen, die in Element durchgesetzt werden. Praktische Schritte von JoinOrigin.',
  intro: [
    'Jede Community, die wächst, steht irgendwann vor einem Moment, der ihre Kultur testet — ein hitziger Streit, ein Spammer, ein Mitglied, das andere unwohl macht, oder ein Missverständnis, das eskaliert. Moderation ist die Praxis, den Raum zu schützen, damit die Community einladend bleiben kann, und sie wird nur nötig, weil Communities aus Menschen bestehen, die sich miteinander verbinden. Dieses Verbinden ist das Kernproblem, bei dem JoinOrigin hilft — und die Praktiken gelten genauso für eine etablierte Community, die ihre Kultur repariert, wie für eine neue Gruppe, die Erwartungen setzt, bevor das erste Mitglied kommt.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Origins zu finden, zu starten und zu organisieren — und in seinem digitalen Modell lebt eine Community in einem von der ersteller:in kontrollierten Raum. Ersteller:innen-Kontrolle ist Standard-Matrix-Raumbesitz: Die ersteller:in kann Mitglieder einladen und entfernen, Rollen zuweisen, Raum-Einstellungen bearbeiten, Nachrichten anheften und den Raum archivieren — alles nativ in Element, dem Standard-Chat-Client, durchgesetzt, ohne eigenes Berechtigungssystem. Dieser Besitz ist das Rückgrat der Moderation auf JoinOrigin: Die ersteller:in entscheidet, wer dazugehört, was die Regeln sind und was passiert, wenn eine Regel gebrochen wird. JoinOrigin moderiert keine Dritt-Communities und stellt kein Moderationspersonal. Die Plattform ist auf gesunde Community-Struktur ausgelegt, und die Praktiken dieser Anleitung sind die menschlichen Praktiken, die jede:r Organisator:in braucht.',
    'Diese Anleitung legt ein praktisches Moderationssystem dar — ob deine Community brandneu ist oder jahrelange Geschichte aufzuarbeiten hat: schriftliche Community-Regeln, die kurz und konkret sind, ein klarer Durchsetzungsweg mit Verwarnungen vor Entfernungen, Techniken zur Deeskalation angespannter Situationen und ehrliche Ratschläge dazu, wann du Mitglieder einbeziehst und wann du allein handelst. Jeder Schritt zeigt, wo JoinOrigin hilft.',
  ],
  dataPoints: [
    'Klare, schriftliche Community-Regeln reduzieren Konflikte, indem sie Erwartungen vor Vorfällen setzen.',
    'Ersteller:innen-Kontrolle auf JoinOrigin ist Matrix-Raumbesitz: einladen/entfernen, Rollen, Einstellungen, anheften, archivieren.',
    'Ein gestufter Durchsetzungsweg — warnen, dann einschränken, dann entfernen — ist fairer und leichter zu verteidigen als Sofort-Banns.',
    'JoinOrigin ist ein Community-Betriebssystem, das Menschen helfen soll, Origins zu finden, zu starten und zu organisieren; es moderiert keine Dritt-Communities und stellt kein Moderationspersonal.',
  ],
  faq: [
    {
      question: 'Brauchen kleine Communities wirklich Moderationsregeln?',
      answer:
        'Ja, und je früher, desto besser. Zwei oder drei kurze Regeln, die vor einem Konflikt geschrieben wurden, sind weit leichter anzuwenden als Regeln, die nach einem erfunden werden. Kleine Communities haben weniger Vorfälle, aber die, die sie haben, tun genauso weh.',
    },
    {
      question: 'Sollten Moderator:innen öffentlich oder privat handeln?',
      answer:
        'Zuerst privat. Sprich eins zu eins an, wiederhole die Regel und die Auswirkung und gib der Person eine Chance, sich anzupassen. Öffentliche Anprangerungen tendieren zur Eskalation. Halte die Regeln öffentlich, aber wende sie privat an — in einer DM oder einem privaten Raum.',
    },
    {
      question: 'Wann sollte ich jemanden aus der Community entfernen?',
      answer:
        'Nachdem klare Verwarnungen nicht gewirkt haben, oder sofort bei Verhalten, das Mitglieder gefährdet — Belästigung, Drohungen oder Doxxing. Der Test ist, ob die Person den Raum für andere aktiv unsicher macht. Auf JoinOrigin ist Entfernen das Entfernen eines Mitglieds aus dem Raum durch die Rauminhaber:in.',
    },
    {
      question: 'Kann JoinOrigin mir helfen, mein Origin zu moderieren?',
      answer:
        'Ja. JoinOrigin ist ein Community-Betriebssystem, in dem Ersteller:innen-Kontrolle Matrix-Raumbesitz ist — einladen/entfernen, Rollen, Einstellungen, anheften und archivieren, in Element durchgesetzt. JoinOrigin moderiert keine Communities, daher sind die Praktiken dieser Anleitung — klare Regeln, gestufte Durchsetzung, ruhige Deeskalation — dein Part.',
    },
  ],
  sections: [
    'Schreibe drei bis fünf klare Regeln. Halte sie kurz, konkret und positiv: „Sei respektvoll“, „Bleib beim Thema“, „Kein Spam oder Eigenwerbung“, „Widersprich Ideen, nicht Menschen“. Poste sie dort, wo jedes neue Mitglied sie sehen wird — idealerweise im Raum angeheftet. Auf JoinOrigin sind die Regeln und Werte einer Community ab Tag eins in ihrem Raum sichtbar — neue Mitglieder sehen sie, bevor sie beitreten. Hefte deine kurzen Regeln dort an, wo jedes neue Mitglied sie sehen wird.',
    'Setze den Ton als Rauminhaber:in. Lebe das Verhalten vor, das du willst — begrüße Neuzugänge, danke Mitwirkenden und sprich Probleme ruhig an. Das Beispiel der ersteller:in setzt die kulturelle Grundlinie der Community. JoinOrigin poliziert keine Communities — den Ton setzen ersteller:innen und Mitglieder. Die Plattform macht einladendes Verhalten sichtbar; lebe das Verhalten, das du willst, im Raum vor.',
    'Besitze den Raum wie die ersteller:in, die du bist. Ersteller:innen-Kontrolle auf JoinOrigin ist Matrix-Raumbesitz: Mitglieder einladen und entfernen, Rollen zuweisen, Raum-Einstellungen bearbeiten, Nachrichten anheften und den Raum archivieren — nativ in Element durchgesetzt. Diese Kontrollen zu kennen ist die technische Hälfte der Moderation. JoinOrigin gibt der ersteller:in ab dem Veröffentlichen vollen Besitz des Raums, ohne eigenes Berechtigungssystem. Lerne die Moderationskontrollen der Plattform, die du nutzt, und benenne eine:n klare:n Inhaber:in.',
    'Vereinbare einen Durchsetzungsweg. Definiere eine gestufte Reaktion: private Verwarnung, dann Einschränkungen (stummgeschaltet, eingeschränktes Posten — oft eine Rollenänderung), dann Entfernung bei wiederholten oder schweren Verstößen. Konsequente Eskalation ist fairer als Improvisation. Auf JoinOrigin sind Rollen Standard-Matrix-Rollen in Element — Stummschalten, Bannen und Rollenzuweisung sind native Aktionen. Schreibe den Durchsetzungsweg auf und halte dich daran.',
    'Handle früh und ruhig. Sprich das erste Anzeichen eines Problems privat an, bevor es zu einem öffentlichen Vorfall wird. Frühes, ruhiges Eingreifen ist die billigste Moderation, die es gibt. JoinOrigin moderiert nicht für dich — frühes, ruhiges Eingreifen ist eine menschliche Fähigkeit. Die Plattform ist so gestaltet, dass Probleme sichtbar im Raum auftauchen, und sie werden früh erkannt. Sprich beim ersten Anzeichen privat an.',
    'Lerne Deeskalationstechniken. Wenn Spannungen steigen, verlangsame das Gespräch: Erkenne das Gefühl an, wiederhole die Meinungsverschiedenheit neutral, frage nach dem zugrunde liegenden Punkt und schlage eine Pause oder einen privaten Raum für die Hitze vor. JoinOrigin hält Community-Interaktionen von Natur aus organisiert und ruhig, aber Deeskalation bleibt ein menschliches Handwerk. Verlangsame das Gespräch und bringe die Hitze in einen privaten Raum.',
    'Führe ein Protokoll über bedeutende Vorfälle. Notiere, was passiert ist, was du getan hast und warum. Ein einfaches Log hilft dir, konsistent zu bleiben, aus Mustern zu lernen und Entscheidungen zu verteidigen, wenn ein Mitglied fragt, warum. JoinOrigin ist ein Community-Betriebssystem, in dem die Geschichte der Community an einem Ort lebt — ein natürliches Zuhause für ein Vorfalls-Log. Eine einfache Notiz darüber, was passiert ist und warum, hält dich konsistent.',
    'Teile die Last mit Co-Moderator:innen. Rekrutiere ein oder zwei vertrauenswürdige Mitglieder und vereinbart die Durchsetzungsregeln. Eine Community, die von einem einzigen Moderator abhängt, wird fragil und voreingenommen. JoinOrigin stellt kein Moderationspersonal — Co-Moderator:innen sind Mitmitglieder. Ersteller:innen weisen Co-Moderator:innen Rollen in Element zu — native Matrix-Rollen, kein eigenes System. Rekrutiere ein oder zwei vertrauenswürdige Mitglieder und gib ihnen klare Rollen.',
  ],
  steps: [
    {
      title: 'Schreibe drei bis fünf klare Regeln',
      body: 'Halte sie kurz, konkret und positiv: „Sei respektvoll“, „Bleib beim Thema“, „Kein Spam oder Eigenwerbung“, „Widersprich Ideen, nicht Menschen“. Poste sie dort, wo jedes neue Mitglied sie sehen wird — idealerweise im Raum angeheftet.',
      joinOriginNote:
        'Auf JoinOrigin sind die Regeln und Werte einer Community ab Tag eins in ihrem Raum sichtbar — neue Mitglieder sehen sie, bevor sie beitreten. Hefte deine kurzen Regeln dort an, wo jedes neue Mitglied sie sehen wird.',
    },
    {
      title: 'Setze den Ton als Rauminhaber:in',
      body: 'Lebe das Verhalten vor, das du willst — begrüße Neuzugänge, danke Mitwirkenden und sprich Probleme ruhig an. Das Beispiel der ersteller:in setzt die kulturelle Grundlinie der Community.',
      joinOriginNote:
        'JoinOrigin poliziert keine Communities — den Ton setzen ersteller:innen und Mitglieder. Die Plattform macht einladendes Verhalten sichtbar; lebe das Verhalten, das du willst, im Raum vor.',
    },
    {
      title: 'Besitze den Raum wie die ersteller:in, die du bist',
      body: 'Ersteller:innen-Kontrolle auf JoinOrigin ist Matrix-Raumbesitz: Mitglieder einladen und entfernen, Rollen zuweisen, Raum-Einstellungen bearbeiten, Nachrichten anheften und den Raum archivieren — nativ in Element durchgesetzt. Diese Kontrollen zu kennen ist die technische Hälfte der Moderation.',
      joinOriginNote:
        'JoinOrigin gibt der ersteller:in ab dem Veröffentlichen vollen Besitz des Raums, ohne eigenes Berechtigungssystem. Lerne die Moderationskontrollen der Plattform, die du nutzt, und benenne eine:n klare:n Inhaber:in.',
    },
    {
      title: 'Vereinbare einen Durchsetzungsweg',
      body: 'Definiere eine gestufte Reaktion: private Verwarnung, dann Einschränkungen (stummgeschaltet, eingeschränktes Posten — oft eine Rollenänderung), dann Entfernung bei wiederholten oder schweren Verstößen. Konsequente Eskalation ist fairer als Improvisation.',
      joinOriginNote:
        'Auf JoinOrigin sind Rollen Standard-Matrix-Rollen in Element — Stummschalten, Bannen und Rollenzuweisung sind native Aktionen. Schreibe den Durchsetzungsweg auf und halte dich daran.',
    },
    {
      title: 'Handle früh und ruhig',
      body: 'Sprich das erste Anzeichen eines Problems privat an, bevor es zu einem öffentlichen Vorfall wird. Frühes, ruhiges Eingreifen ist die billigste Moderation, die es gibt.',
      joinOriginNote:
        'JoinOrigin moderiert nicht für dich — frühes, ruhiges Eingreifen ist eine menschliche Fähigkeit. Die Plattform ist so gestaltet, dass Probleme sichtbar im Raum auftauchen, und sie werden früh erkannt. Sprich beim ersten Anzeichen privat an.',
    },
    {
      title: 'Lerne Deeskalationstechniken',
      body: 'Wenn Spannungen steigen, verlangsame das Gespräch: Erkenne das Gefühl an, wiederhole die Meinungsverschiedenheit neutral, frage nach dem zugrunde liegenden Punkt und schlage eine Pause oder einen privaten Raum für die Hitze vor.',
      joinOriginNote:
        'JoinOrigin hält Community-Interaktionen von Natur aus organisiert und ruhig, aber Deeskalation bleibt ein menschliches Handwerk. Verlangsame das Gespräch und bringe die Hitze in einen privaten Raum.',
    },
    {
      title: 'Führe ein Protokoll über bedeutende Vorfälle',
      body: 'Notiere, was passiert ist, was du getan hast und warum. Ein einfaches Log hilft dir, konsistent zu bleiben, aus Mustern zu lernen und Entscheidungen zu verteidigen, wenn ein Mitglied fragt, warum.',
      joinOriginNote:
        'JoinOrigin ist ein Community-Betriebssystem, in dem die Geschichte der Community an einem Ort lebt — ein natürliches Zuhause für ein Vorfalls-Log. Eine einfache Notiz darüber, was passiert ist und warum, hält dich konsistent.',
    },
    {
      title: 'Teile die Last mit Co-Moderator:innen',
      body: 'Rekrutiere ein oder zwei vertrauenswürdige Mitglieder und vereinbart die Durchsetzungsregeln. Eine Community, die von einem einzigen Moderator abhängt, wird fragil und voreingenommen.',
      joinOriginNote:
        'JoinOrigin stellt kein Moderationspersonal — Co-Moderator:innen sind Mitmitglieder. Ersteller:innen weisen Co-Moderator:innen Rollen in Element zu — native Matrix-Rollen, kein eigenes System. Rekrutiere ein oder zwei vertrauenswürdige Mitglieder und gib ihnen klare Rollen.',
    },
  ],
};

export default content;
