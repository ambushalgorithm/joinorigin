import type { GuideContent } from '../../types';

/**
 * « Comment organiser un meetup » — guide intemporel L1 (design §6.1,
 * TASK-326).
 *
 * Traduction française du contenu EN. Recentré : les meetups sont ce qu'un
 * groupe fait APRÈS s'être formé — le chemin numérique connecter→rejoindre→salon
 * vient d'abord (publier le groupe → salon auto-créé → membres rejoignent via
 * un lien), et le meetup en présentiel est une conséquence en aval. JoinOrigin
 * ne réserve pas de lieux et n'organise pas d'événements. « Salon » désigne le
 * salon Matrix (§6.3) — les lieux physiques sont décrits comme des
 * lieux/espaces, jamais des « salons ».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'organize-a-meetup',
  title: 'Comment organiser un meetup : lieux, ordre du jour et promotion | JoinOrigin',
  description:
    'Organisez un meetup une fois votre groupe formé — qu’il ait été fondé le mois dernier ou qu’il se réunisse depuis des années — choisissez un format, réservez un lieu, construisez un ordre du jour, faites-en la promotion et animez la soirée. Une liste de contrôle pratique de JoinOrigin.',
  intro: [
    'Un meetup est un événement récurrent en présentiel où les gens se rassemblent autour d’un intérêt partagé — et sur JoinOrigin, c’est une étape naturelle après avoir communiqué dans le salon. Le chemin numérique vient d’abord : les gens trouvent et rejoignent un groupe via un lien, et le salon du groupe devient l’endroit où les membres discutent, planifient et restent connectés entre les rassemblements. Le meetup en présentiel est l’étape suivante de cette communauté formée — que le groupe ait été fondé le mois dernier ou se réunisse informellement depuis des années, le salon lui donne un foyer organisé d’où un meetup peut naître.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver des Origins à rejoindre et à créer les leurs — donc un meetup a un foyer où les membres intéressés peuvent découvrir le groupe, rejoindre son salon et coordonner le rassemblement au lieu de dépendre de la liste de contacts d’une seule personne. JoinOrigin ne réserve pas de lieux et n’organise pas d’événements — l’objectif entier de la plateforme est de connecter des personnes qui partagent un intérêt, et le rassemblement lui-même vous appartient.',
    'Ce guide couvre le cycle de vie complet d’un meetup une fois le groupe existant — pour un groupe nouvellement formé comme pour un groupe qui se réunit depuis des années : choisir un format adapté à votre public, trouver et réserver un lieu sans exploser le budget, construire un ordre du jour avec un début et une fin clairs, promouvoir l’événement là où votre public regarde réellement, et animer la soirée pour que les participants aient envie de la suivante. Chaque étape inclut une note sur la façon dont JoinOrigin aide — et la première étape concerne le groupe numérique, car sans groupe et sans salon, il n’y a pas de communauté à réunir.',
  ],
  dataPoints: [
    'Un meetup simple n’a besoin que de trois choses : un format, un lieu et un canal de promotion.',
    'Les meetups du soir en semaine et les séances du week-end matin sont les formats récurrents les plus courants.',
    'La plupart des lieux — bibliothèques, cafés, espaces de coworking — offrent des espaces gratuits ou à faible coût pour les événements communautaires.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver ou créer des Origins ; il ne réserve pas de lieux et n’organise pas d’événements.',
  ],
  faq: [
    {
      question: 'Combien de temps à l’avance devrais-je promouvoir un meetup ?',
      answer:
        'Deux à trois semaines est un bon équilibre : assez tôt pour que les gens planifient, assez court pour garder l’urgence. Annoncez d’abord dans le salon du groupe, puis partagez l’événement là où votre public se rassemble. Envoyez un rappel deux jours avant et encore le jour de l’événement.',
    },
    {
      question: 'Et si seulement quelques personnes se présentent ?',
      answer:
        'C’est normal, surtout au début. Animez la séance pour ceux qui sont là, recueillez leurs retours dans le salon et utilisez l’édition suivante pour améliorer la promotion. La régularité compte plus que n’importe quelle participation ponctuelle.',
    },
    {
      question: 'Les meetups ont-ils besoin d’un ordre du jour formel ?',
      answer:
        'Oui, un ordre du jour léger. Un début clair, un court tour de présentation, une activité ou une conférence principale et une heure de fin définie font sentir aux participants que leur temps a été respecté — c’est ce qui les fait revenir.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à organiser des meetups ?',
      answer:
        'Oui. JoinOrigin aide les personnes à trouver et à créer des Origins — un foyer numérique organisé où le salon d’un groupe est l’endroit où les membres se coordonnent et où un meetup peut être découvert. JoinOrigin n’organise pas les événements lui-même, donc les étapes pratiques de ce guide vous appartiennent.',
    },
  ],
  sections: [
    'Formez d’abord le groupe et ouvrez son salon. Un meetup est ce qu’un groupe fait après s’être formé — commencez donc par le cœur numérique : publiez le groupe, laissez son salon être auto-créé et invitez des membres via un lien. Publier un groupe sur JoinOrigin auto-crée son salon, un espace contrôlé par le créateur où les membres planifient et restent connectés. Configurez votre groupe et son salon avec les outils que vous utilisez déjà avant de planifier un seul événement si vous préférez.',
    'Choisissez un format adapté à votre public. Décidez entre une conférence, un atelier, un cercle de discussion, un mixeur social ou une séance de travail. Faites correspondre le format à ce que le public veut — apprendre, se connecter ou progresser sur un travail partagé. Sur JoinOrigin, les membres peuvent voir le format d’une communauté avant de rejoindre — ce qui attire les bonnes personnes et définit les attentes. Choisissez un format pour lequel votre public viendra réellement.',
    'Choisissez une date et une cadence. Les soirées en semaine et les matins du week-end fonctionnent le mieux pour la plupart des publics. Choisissez un créneau récurrent — mensuel est la norme — et protégez-le comme un rendez-vous pour que les gens puissent prendre l’habitude. JoinOrigin rend le rythme d’une communauté visible au même endroit, pour que les membres connaissent la prochaine date sans la chercher. Protégez votre créneau récurrent comme un rendez-vous.',
    'Réservez un lieu tôt. Les bibliothèques, cafés, salons de coworking, centres communautaires et parcs accueillent des événements communautaires à faible coût ou gratuitement. Confirmez la capacité, les horaires d’ouverture et toute exigence de réservation par écrit. JoinOrigin ne réserve pas de lieux et ne coordonne pas les espaces physiques — sa conception est centrée sur la connexion des personnes dans le salon numérique. Confirmez la capacité et les horaires d’ouverture directement avec le lieu, par écrit.',
    'Rédigez un ordre du jour léger. Gardez-le simple : accueil et présentation, activité principale, discussion ouverte, clôture et prochaine date. Estimez 60 à 90 minutes au total et publiez l’ordre du jour avec la liste de l’événement et dans le salon. JoinOrigin est un système d’exploitation communautaire où les artefacts partagés comme les ordres du jour et les notes vivent à côté de la communauté. Un simple ordre du jour publié fait le travail.',
    'Faites la promotion là où votre public est déjà. Partagez l’événement dans des groupes de niche, des lettres d’information locales, des tableaux communautaires et des canaux sociaux pertinents — et pointez tout le monde vers le lien d’invitation du groupe pour que les participants deviennent des membres, pas des invités d’une nuit. JoinOrigin est l’endroit où les personnes qui cherchent une communauté la trouvent et la rejoignent via un lien. Faites la promotion dans les groupes de niche et les lettres d’information où votre public se rassemble déjà, et partagez le lien d’invitation avec chaque participant.',
    'Animez la soirée avec un rythme clair. Commencez à l’heure, accueillez les retardataires, gardez l’activité principale sur les rails et terminez en annonçant la prochaine date. Terminez à l’heure — c’est le signal de respect le plus fort. JoinOrigin n’organise pas les événements — l’expérience vous appartient. La plateforme garde l’histoire de la communauté dans un salon organisé — la promesse, le rythme et les personnes. Terminer à l’heure est le signal de respect le plus fort.',
    'Faites un suivi sous 24 heures dans le salon. Remerciez les participants, partagez les liens ou notes et invitez aux retours là où tout le groupe peut les voir. Le suivi est ce qui transforme un événement ponctuel en communauté récurrente. JoinOrigin donne à une communauté un salon persistant où le compte-rendu, la prochaine date et les retours vivent — transformant un événement ponctuel en communauté récurrente. Faites-vous découvrir et gardez l’élan.',
  ],
  steps: [
    {
      title: 'Formez d’abord le groupe et ouvrez son salon',
      body: 'Un meetup est ce qu’un groupe fait après s’être formé — commencez donc par le cœur numérique : publiez le groupe, laissez son salon être auto-créé et invitez des membres via un lien.',
      joinOriginNote:
        'Publier un groupe sur JoinOrigin auto-crée son salon, un espace contrôlé par le créateur où les membres planifient et restent connectés. Configurez votre groupe et son salon avec les outils que vous utilisez déjà avant de planifier un seul événement si vous préférez.',
    },
    {
      title: 'Choisissez un format adapté à votre public',
      body: 'Décidez entre une conférence, un atelier, un cercle de discussion, un mixeur social ou une séance de travail. Faites correspondre le format à ce que le public veut — apprendre, se connecter ou progresser sur un travail partagé.',
      joinOriginNote:
        'Sur JoinOrigin, les membres peuvent voir le format d’une communauté avant de rejoindre — ce qui attire les bonnes personnes et définit les attentes. Choisissez un format pour lequel votre public viendra réellement.',
    },
    {
      title: 'Choisissez une date et une cadence',
      body: 'Les soirées en semaine et les matins du week-end fonctionnent le mieux pour la plupart des publics. Choisissez un créneau récurrent — mensuel est la norme — et protégez-le comme un rendez-vous pour que les gens puissent prendre l’habitude.',
      joinOriginNote:
        'JoinOrigin rend le rythme d’une communauté visible au même endroit, pour que les membres connaissent la prochaine date sans la chercher. Protégez votre créneau récurrent comme un rendez-vous.',
    },
    {
      title: 'Réservez un lieu tôt',
      body: 'Les bibliothèques, cafés, salons de coworking, centres communautaires et parcs accueillent des événements communautaires à faible coût ou gratuitement. Confirmez la capacité, les horaires d’ouverture et toute exigence de réservation par écrit.',
      joinOriginNote:
        'JoinOrigin ne réserve pas de lieux et ne coordonne pas les espaces physiques — sa conception est centrée sur la connexion des personnes dans le salon numérique. Confirmez la capacité et les horaires d’ouverture directement avec le lieu, par écrit.',
    },
    {
      title: 'Rédigez un ordre du jour léger',
      body: 'Gardez-le simple : accueil et présentation, activité principale, discussion ouverte, clôture et prochaine date. Estimez 60 à 90 minutes au total et publiez l’ordre du jour avec la liste de l’événement et dans le salon.',
      joinOriginNote:
        'JoinOrigin est un système d’exploitation communautaire où les artefacts partagés comme les ordres du jour et les notes vivent à côté de la communauté. Un simple ordre du jour publié fait le travail.',
    },
    {
      title: 'Faites la promotion là où votre public est déjà',
      body: 'Partagez l’événement dans des groupes de niche, des lettres d’information locales, des tableaux communautaires et des canaux sociaux pertinents — et pointez tout le monde vers le lien d’invitation du groupe pour que les participants deviennent des membres, pas des invités d’une nuit.',
      joinOriginNote:
        'JoinOrigin est l’endroit où les personnes qui cherchent une communauté la trouvent et la rejoignent via un lien. Faites la promotion dans les groupes de niche et les lettres d’information où votre public se rassemble déjà, et partagez le lien d’invitation avec chaque participant.',
    },
    {
      title: 'Animez la soirée avec un rythme clair',
      body: 'Commencez à l’heure, accueillez les retardataires, gardez l’activité principale sur les rails et terminez en annonçant la prochaine date. Terminez à l’heure — c’est le signal de respect le plus fort.',
      joinOriginNote:
        'JoinOrigin n’organise pas les événements — l’expérience vous appartient. La plateforme garde l’histoire de la communauté dans un salon organisé — la promesse, le rythme et les personnes. Terminer à l’heure est le signal de respect le plus fort.',
    },
    {
      title: 'Faites un suivi sous 24 heures dans le salon',
      body: 'Remerciez les participants, partagez les liens ou notes et invitez aux retours là où tout le groupe peut les voir. Le suivi est ce qui transforme un événement ponctuel en communauté récurrente.',
      joinOriginNote:
        'JoinOrigin donne à une communauté un salon persistant où le compte-rendu, la prochaine date et les retours vivent — transformant un événement ponctuel en communauté récurrente. Faites-vous découvrir et gardez l’élan.',
    },
  ],
};

export default content;
