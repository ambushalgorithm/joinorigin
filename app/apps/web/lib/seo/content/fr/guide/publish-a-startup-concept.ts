import type { GuideContent } from '../../types';

/**
 * « Comment publier un concept de start-up » — guide intemporel L1
 * (design §6.1, TASK-353).
 *
 * Traduction française du contenu EN. Écrit sur le flux d'écran produit §2 :
 * publier un concept de start-up → page publique → Rejoindre via lien →
 * salon auto-créé À LA PUBLICATION → le créateur contrôle le salon →
 * croissance fil/invitations. La page d'idée est la promesse publique du
 * concept ; le salon est l'endroit où les premiers croyants, cofondateurs
 * potentiels et premiers testeurs se rassemblent autour de la start-up.
 * « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'publish-a-startup-concept',
  title: 'Comment publier un concept de start-up : page d’idée + salon | JoinOrigin',
  description:
    'Publiez un concept de start-up sur JoinOrigin — que vous en soyez au stade de l’idée ou que vous dirigiez déjà une entreprise — rédigez une page d’idée publique, ouvrez son salon automatiquement et rassemblez les premiers croyants, cofondateurs et testeurs autour de l’idée. Étapes pratiques de JoinOrigin.',
  intro: [
    'Chaque start-up — qu’elle soit encore un concept sur le papier ou déjà en activité avec des clients — a besoin de personnes plus que de capital : un fondateur qui peut la construire, une équipe qui peut la livrer et des utilisateurs qui la testeront. Une start-up que personne ne peut trouver n’en rassemble aucune. Publier le concept comme une page d’idée découvrable, puis ouvrir un salon où la conversation peut avoir lieu, est la première étape honnête de la construction d’une start-up — pas le pitch deck, pas le logo, pas le pitch — et cela fonctionne tout aussi bien pour une entreprise existante qui veut plus de croyants, de cofondateurs et de testeurs autour de ce qu’elle construit.',
    'La boucle JoinOrigin fonctionne ainsi : vous publiez un concept de start-up, sa page d’idée publique apparaît, et son salon est auto-créé au moment de la publication. Les personnes découvrent la page ou suivent un lien, rejoindre se fait en un clic, et elles arrivent dans le salon — un salon Matrix contrôlé par le créateur où les premiers croyants peuvent poser des questions, les cofondateurs potentiels tester la compatibilité et les premiers utilisateurs donner leur avis. Le créateur possède le salon dès la seconde zéro et décide qui rejoint et ce qui se passe à l’intérieur.',
    'Ce guide parcourt la publication d’un concept de start-up comme un opérateur — que le concept soit tout nouveau ou que l’entreprise tourne déjà : compresser le concept en une phrase, écrire la page avec des signaux honnêtes, la publier et ouvrir le salon, la partager avec les communautés de fondateurs, inviter les premiers croyants et testeurs, mener des conversations structurées, utiliser le salon pour former une équipe d’essai et alimenter le fil à mesure que le concept est validé.',
  ],
  dataPoints: [
    'Un concept de start-up compressé en une phrase est plus facile à partager, tester et pourvoir qu’un long business plan.',
    'Sur JoinOrigin, publier un concept auto-crée son salon — la start-up a un endroit pour les croyants et testeurs dès le début.',
    'Un lien d’invitation est l’invitation la plus simple : un lien, un clic, et une personne intéressée est dans le salon.',
    'JoinOrigin est un système d’exploitation communautaire qui aide les personnes à trouver des idées et les personnes qui les portent — publiez votre concept et son salon s’ouvre immédiatement.',
  ],
  faq: [
    {
      question:
        'En quoi un concept de start-up diffère-t-il d’une page d’idée de petite entreprise ?',
      answer:
        'Le format de page est le même, mais l’accent change : une idée de petite entreprise est centrée sur un client et une offre, tandis qu’un concept de start-up est centré sur un problème ambitieux et l’équipe nécessaire pour le résoudre. Une page de start-up attire les premiers croyants, les cofondateurs potentiels et les premiers testeurs plutôt que des clients locaux.',
    },
    {
      question: 'Quand le salon est-il créé pour mon concept de start-up ?',
      answer:
        'Le salon est auto-créé au moment où vous publiez le concept. Le créateur possède le salon dès la seconde zéro et peut inviter, retirer et attribuer des rôles dans Element. Vous pouvez aussi ouvrir un salon avec les outils que vous utilisez déjà et inviter les personnes qui partagent l’ambition.',
    },
    {
      question: 'Qui devrait rejoindre le salon d’un concept de start-up ?',
      answer:
        'Les premiers croyants qui partagent le problème, les cofondateurs potentiels qui testent la compatibilité et les premiers utilisateurs prêts à essayer une version brute. Le salon est l’endroit où vous trouvez les personnes qui transforment un concept en équipe — les mêmes personnes que des présentations chaleureuses mettraient des mois à atteindre.',
    },
    {
      question: 'Qu’est-ce qui fait une bonne page de concept de start-up ?',
      answer:
        'Une phrase honnête sur le problème et l’approche, le stade du concept et l’aide précise dont vous avez besoin — un développeur, un designer, un expert du domaine, les premiers testeurs. L’honnêteté sur le stade attire les bonnes personnes ; les promesses exagérées n’attirent personne.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à publier un concept de start-up dès aujourd’hui ?',
      answer:
        'Oui. Publier un concept sur JoinOrigin crée sa page et son salon de manière atomique — le salon s’ouvre au moment où vous publiez, et vous le contrôlez dès le début. Publiez le concept quelque part de public et ouvrez un salon de discussion ; chaque nouveau membre que vous invitez étend votre portée.',
    },
  ],
  sections: [
    'Compressez le concept en une phrase. Réduisez la start-up à son cœur : le problème, l’approche et à qui elle s’adresse. Si vous ne pouvez pas le dire en une phrase, le concept n’est pas prêt à être publié. JoinOrigin est conçu autour de pages d’idées découvrables, et un pitch d’une phrase est le cœur de la page. Écrivez la phrase et testez-la sur trois personnes qui comprennent le problème.',
    'Écrivez la page avec des signaux honnêtes. Énoncez le problème, l’approche, le stade — idée, prototype ou produit — et l’aide précise dont vous avez besoin. L’honnêteté attire les bonnes personnes. Publier un concept sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Rédigez la page comme un court billet public et itérez avec les retours.',
    'Publiez le concept et ouvrez son salon. Publier est le moment où le concept devient découvrable. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède. Sur JoinOrigin, la page, le salon et le lien d’invitation sont une seule publication. Publiez le concept publiquement et ouvrez un salon pour la conversation autour d’elle.',
    'Partagez le concept avec les communautés de fondateurs. Les start-ups grandissent grâce aux réseaux de fondateurs. Partagez la page d’idée avec les groupes de fondateurs, les communautés de start-ups, les accélérateurs et toute personne qui connaît le problème. Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre concept suffit.',
    'Invitez les premiers croyants et testeurs. Invitez les personnes qui partagent l’ambition : cofondateurs potentiels, experts du domaine et utilisateurs prêts à essayer une version brute. JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une idée peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque personne qui rejoint devient un canal vers son propre réseau.',
    'Menez des conversations structurées dans le salon. Demandez aux personnes qui rejoignent ce qui les enthousiasme, ce qui les inquiète et ce qu’elles feraient en premier. Un salon de start-up est un entretien continu — les réponses façonnent le concept. JoinOrigin ne mène pas ces conversations ; le salon vous appartient. La plateforme donne au concept un salon où l’intérêt devient insight, et le créateur possède ce salon. Menez les conversations directement dans le salon.',
    'Utilisez le salon pour former une équipe d’essai. Quand les bonnes personnes se présentent, proposez un petit essai — un prototype, une page d’atterrissage ou une séance de travail — et voyez comment l’équipe travaille ensemble. JoinOrigin donne aux communautés un salon partagé pour leur travail et leurs projets, un endroit naturel pour qu’un essai émerge. Un petit prototype réel est le test de compatibilité le plus fiable.',
    'Alimentez le salon vers le fil à mesure que vous validez. Continuez à publier des mises à jour, gardez le salon vivant et laissez l’élan du concept devenir visible pour un réseau plus large. Le fil transforme un concept en preuve que les gens s’y intéressent. Sur JoinOrigin, les mises à jour du salon alimentent le fil — la boucle de croissance où chaque nouveau membre étend la surface de découverte. Faites-vous découvrir et développez-vous.',
  ],
  steps: [
    {
      title: 'Compressez le concept en une phrase',
      body: 'Réduisez la start-up à son cœur : le problème, l’approche et à qui elle s’adresse. Si vous ne pouvez pas le dire en une phrase, le concept n’est pas prêt à être publié.',
      joinOriginNote:
        'JoinOrigin est conçu autour de pages d’idées découvrables, et un pitch d’une phrase est le cœur de la page. Écrivez la phrase et testez-la sur trois personnes qui comprennent le problème.',
    },
    {
      title: 'Écrivez la page avec des signaux honnêtes',
      body: 'Énoncez le problème, l’approche, le stade — idée, prototype ou produit — et l’aide précise dont vous avez besoin. L’honnêteté attire les bonnes personnes.',
      joinOriginNote:
        'Publier un concept sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Rédigez la page comme un court billet public et itérez avec les retours.',
    },
    {
      title: 'Publiez le concept et ouvrez son salon',
      body: 'Publier est le moment où le concept devient découvrable. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède.',
      joinOriginNote:
        'Sur JoinOrigin, la page, le salon et le lien d’invitation sont une seule publication. Publiez le concept publiquement et ouvrez un salon pour la conversation autour d’elle.',
    },
    {
      title: 'Partagez le concept avec les communautés de fondateurs',
      body: 'Les start-ups grandissent grâce aux réseaux de fondateurs. Partagez la page d’idée avec les groupes de fondateurs, les communautés de start-ups, les accélérateurs et toute personne qui connaît le problème.',
      joinOriginNote:
        'Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre concept suffit.',
    },
    {
      title: 'Invitez les premiers croyants et testeurs',
      body: 'Invitez les personnes qui partagent l’ambition : cofondateurs potentiels, experts du domaine et utilisateurs prêts à essayer une version brute.',
      joinOriginNote:
        'JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une idée peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque personne qui rejoint devient un canal vers son propre réseau.',
    },
    {
      title: 'Menez des conversations structurées dans le salon',
      body: 'Demandez aux personnes qui rejoignent ce qui les enthousiasme, ce qui les inquiète et ce qu’elles feraient en premier. Un salon de start-up est un entretien continu — les réponses façonnent le concept.',
      joinOriginNote:
        'JoinOrigin ne mène pas ces conversations ; le salon vous appartient. La plateforme donne au concept un salon où l’intérêt devient insight, et le créateur possède ce salon. Menez les conversations directement dans le salon.',
    },
    {
      title: 'Utilisez le salon pour former une équipe d’essai',
      body: 'Quand les bonnes personnes se présentent, proposez un petit essai — un prototype, une page d’atterrissage ou une séance de travail — et voyez comment l’équipe travaille ensemble.',
      joinOriginNote:
        'JoinOrigin donne aux communautés un salon partagé pour leur travail et leurs projets, un endroit naturel pour qu’un essai émerge. Un petit prototype réel est le test de compatibilité le plus fiable.',
    },
    {
      title: 'Alimentez le salon vers le fil à mesure que vous validez',
      body: 'Continuez à publier des mises à jour, gardez le salon vivant et laissez l’élan du concept devenir visible pour un réseau plus large. Le fil transforme un concept en preuve que les gens s’y intéressent.',
      joinOriginNote:
        'Sur JoinOrigin, les mises à jour du salon alimentent le fil — la boucle de croissance où chaque nouveau membre étend la surface de découverte. Faites-vous découvrir et développez-vous.',
    },
  ],
};

export default content;
