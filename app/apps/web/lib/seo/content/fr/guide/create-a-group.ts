import type { GuideContent } from '../../types';

/**
 * « Comment créer un groupe » — guide intemporel L1 (design §6.1, TASK-353).
 *
 * Traduction française du contenu EN. Écrit sur le flux d'écran produit §2 :
 * publier un groupe → page publique → Rejoindre via lien → salon auto-créé
 * À LA PUBLICATION → le créateur contrôle le salon → croissance fil/invitations.
 * Un groupe est une communauté : la page publique énonce la promesse, le salon
 * est l'endroit où les membres se connectent, et les membres rejoignent via un lien.
 * « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'create-a-group',
  title: 'Comment créer un groupe : le publier et ouvrir son salon | JoinOrigin',
  description:
    'Créez un groupe sur JoinOrigin — publiez une page de groupe, ouvrez son salon automatiquement et invitez des membres via un lien d’invitation. Étapes pratiques de JoinOrigin.',
  intro: [
    'Chaque communauté — qu’elle soit toute nouvelle ou qu’elle se réunisse déjà informellement depuis des mois — repose sur les deux mêmes gestes : décider à qui elle s’adresse, et donner à ces personnes un endroit clair pour se connecter. Un groupe sans foyer ne se forme jamais vraiment ; l’intérêt se disperse entre messages, tableurs et conversations ponctuelles, et rien ne prend racine. La page du groupe et son salon sont ce foyer, et bien les créer fait la différence entre une vraie communauté et une liste de noms.',
    'La boucle JoinOrigin fonctionne ainsi : vous publiez un groupe, sa page publique apparaît, et son salon est auto-créé au moment de la publication. Les personnes découvrent le groupe via Explorer ou suivent un lien d’invitation, rejoindre se fait en un clic, et elles arrivent dans le salon — un salon Matrix contrôlé par le créateur où la communauté vit réellement. Le créateur possède le salon dès la seconde zéro et contrôle qui rejoint et comment le groupe fonctionne.',
    'Ce guide couvre tout le chemin — que le groupe soit nouveau ou existe déjà sur le papier : choisir le public et l’objectif, écrire une page de groupe que les gens peuvent trouver, publier le groupe et ouvrir son salon, définir les attentes en tant que créateur, partager le lien d’invitation, inviter les premiers membres, lancer les premières conversations et garder le salon actif pour que le groupe continue de grandir.',
  ],
  dataPoints: [
    'Les groupes les plus clairs commencent avec un public et une promesse — la spécificité est une fonctionnalité de croissance.',
    'Sur JoinOrigin, publier un groupe auto-crée son salon — la communauté a un endroit pour se connecter dès la seconde zéro.',
    'Un lien d’invitation est l’invitation la plus simple : un lien, un clic, et un nouveau membre est dans le salon.',
    'JoinOrigin est un système d’exploitation communautaire qui aide les personnes à trouver, rejoindre et créer des groupes — publiez votre groupe et son salon s’ouvre immédiatement.',
  ],
  faq: [
    {
      question: 'Quelle est la différence entre un groupe et une communauté ?',
      answer:
        'Sur JoinOrigin, ce sont les mêmes objets. Un groupe (ou une communauté) est un objet publié et joignable, avec une page publique et un salon. La page du groupe énonce la promesse ; le salon est l’endroit où les membres se connectent. Les communautés disposent d’un Espace Matrix qui contient les salons du groupe, et le salon principal est l’endroit où vit le groupe.',
    },
    {
      question: 'Quand le salon du groupe est-il créé ?',
      answer:
        'Le salon est auto-créé au moment où vous publiez le groupe — il n’y a jamais d’étape séparée « créer la discussion plus tard ». Le créateur possède le salon dès la seconde zéro et peut inviter, retirer et attribuer des rôles dans Element. Vous pouvez aussi mettre en place la même structure avec les outils que vous utilisez déjà.',
    },
    {
      question: 'Comment les membres rejoignent-ils mon groupe ?',
      answer:
        'Rejoindre est une action unique : cliquer sur Rejoindre sur la page publique du groupe, ou suivre un lien d’invitation direct d’un membre. Les personnes qui rejoignent arrivent dans le salon du groupe. La croissance précoce la plus fiable reste personnelle — partager le lien d’invitation avec des personnes du public cible et leur demander d’en amener d’autres.',
    },
    {
      question: 'Que doit dire la page du groupe ?',
      answer:
        'Une phrase sur à qui s’adresse le groupe, une phrase sur ce qui se passe dans le salon, et ce qu’un membre gagne en rejoignant. Restez précis — « nouveaux fondateurs à Brooklyn » vaut mieux que « personnes intéressées par les affaires ». La page est la promesse qui décide si quelqu’un clique sur Rejoindre.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à créer un groupe dès aujourd’hui ?',
      answer:
        'Oui. Publier un groupe sur JoinOrigin crée sa page et son salon de manière atomique — le salon s’ouvre au moment où vous publiez, et vous le contrôlez dès le début. Publiez le groupe et ouvrez un salon pour les membres ; chaque nouveau membre que vous invitez étend votre portée.',
    },
  ],
  sections: [
    'Choisissez le public et l’objectif. Décidez à qui s’adresse le groupe et à quoi il existe — un public, une promesse, et un membre réussi que vous savez décrire. JoinOrigin est conçu autour de pages de groupes découvrables, et les groupes les plus clairs énoncent leur public et leur objectif dès le départ. Écrivez une phrase pour chacun et gardez-les devant chaque invitation.',
    'Écrivez une page de groupe que les gens peuvent trouver. La page doit indiquer à qui s’adresse le groupe, ce qui se passe dans le salon et ce que les membres gagnent en rejoignant. Restez précis et honnête. Publier un groupe sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Publiez la description et testez-la sur quelques personnes du public cible.',
    'Publiez le groupe et ouvrez son salon. Publier est le moment où le groupe devient réel : une page publique plus un salon où les membres se connectent. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède. Sur JoinOrigin, la page, le salon et le lien d’invitation sont une seule publication. Créez la page et le salon avec les outils que votre groupe utilise déjà si vous préférez.',
    'Définissez les attentes en tant que créateur. En tant que propriétaire du salon, décidez comment fonctionne le groupe : ce que les membres peuvent publier, quelles sont les règles et comment les nouvelles personnes sont accueillies. Le contrôle du créateur est la propriété standard d’un salon Matrix — inviter, retirer, attribuer des rôles, épingler, archiver. JoinOrigin ne définit pas vos règles à votre place ; la conception vous donne les commandes. Écrivez les attentes du salon et épinglez-les là où les membres peuvent les voir.',
    'Partagez le lien d’invitation. Le lien d’invitation est le chemin le plus court entre l’intérêt et l’adhésion : un lien, un clic, et un nouveau membre arrive dans le salon. Mettez-le partout où se rassemblent les bonnes personnes. Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre groupe suffit.',
    'Invitez personnellement les premiers membres. Les invitations personnelles convertissent bien mieux que les publications publiques. Écrivez aux amis, collègues et connaissances qui correspondent au public, partagez le lien d’invitation et demandez-leur d’amener une autre personne. JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent un groupe peuvent trouver le vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque membre devient un canal vers son propre réseau.',
    'Lancez les premières conversations dans le salon. Les premières conversations posent la culture. Ouvrez avec une invite claire — présentations, un objectif commun ou un premier sujet — et répondez à chaque message. JoinOrigin ne mène pas vos conversations ; le salon vous appartient. La plateforme donne au groupe un salon où les membres se connectent, et le créateur le possède. Soyez le membre le plus actif pendant les premières semaines.',
    'Gardez le salon actif et en croissance. Gardez un rythme — un sujet hebdomadaire, un point régulier ou une mise à jour permanente — pour que les membres aient une raison de revenir. La croissance se compose quand chaque membre peut décrire le groupe en une phrase et partager son lien d’invitation. JoinOrigin garde votre page de groupe et votre salon connectés à mesure que le groupe grandit — un seul endroit où la promesse, le salon et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
  ],
  steps: [
    {
      title: 'Choisissez le public et l’objectif',
      body: 'Décidez à qui s’adresse le groupe et à quoi il existe — un public, une promesse, et un membre réussi que vous savez décrire.',
      joinOriginNote:
        'JoinOrigin est conçu autour de pages de groupes découvrables, et les groupes les plus clairs énoncent leur public et leur objectif dès le départ. Écrivez une phrase pour chacun et gardez-les devant chaque invitation.',
    },
    {
      title: 'Écrivez une page de groupe que les gens peuvent trouver',
      body: 'La page doit indiquer à qui s’adresse le groupe, ce qui se passe dans le salon et ce que les membres gagnent en rejoignant. Restez précis et honnête.',
      joinOriginNote:
        'Publier un groupe sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Publiez la description et testez-la sur quelques personnes du public cible.',
    },
    {
      title: 'Publiez le groupe et ouvrez son salon',
      body: 'Publier est le moment où le groupe devient réel : une page publique plus un salon où les membres se connectent. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède.',
      joinOriginNote:
        'Sur JoinOrigin, la page, le salon et le lien d’invitation sont une seule publication. Créez la page et le salon avec les outils que votre groupe utilise déjà si vous préférez.',
    },
    {
      title: 'Définissez les attentes en tant que créateur',
      body: 'En tant que propriétaire du salon, décidez comment fonctionne le groupe : ce que les membres peuvent publier, quelles sont les règles et comment les nouvelles personnes sont accueillies. Le contrôle du créateur est la propriété standard d’un salon Matrix — inviter, retirer, attribuer des rôles, épingler, archiver.',
      joinOriginNote:
        'JoinOrigin ne définit pas vos règles à votre place ; la conception vous donne les commandes. Écrivez les attentes du salon et épinglez-les là où les membres peuvent les voir.',
    },
    {
      title: 'Partagez le lien d’invitation',
      body: 'Le lien d’invitation est le chemin le plus court entre l’intérêt et l’adhésion : un lien, un clic, et un nouveau membre arrive dans le salon. Mettez-le partout où se rassemblent les bonnes personnes.',
      joinOriginNote:
        'Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre groupe suffit.',
    },
    {
      title: 'Invitez personnellement les premiers membres',
      body: 'Les invitations personnelles convertissent bien mieux que les publications publiques. Écrivez aux amis, collègues et connaissances qui correspondent au public, partagez le lien d’invitation et demandez-leur d’amener une autre personne.',
      joinOriginNote:
        'JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent un groupe peuvent trouver le vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque membre devient un canal vers son propre réseau.',
    },
    {
      title: 'Lancez les premières conversations dans le salon',
      body: 'Les premières conversations posent la culture. Ouvrez avec une invite claire — présentations, un objectif commun ou un premier sujet — et répondez à chaque message.',
      joinOriginNote:
        'JoinOrigin ne mène pas vos conversations ; le salon vous appartient. La plateforme donne au groupe un salon où les membres se connectent, et le créateur le possède. Soyez le membre le plus actif pendant les premières semaines.',
    },
    {
      title: 'Gardez le salon actif et en croissance',
      body: 'Gardez un rythme — un sujet hebdomadaire, un point régulier ou une mise à jour permanente — pour que les membres aient une raison de revenir. La croissance se compose quand chaque membre peut décrire le groupe en une phrase et partager son lien d’invitation.',
      joinOriginNote:
        'JoinOrigin garde votre page de groupe et votre salon connectés à mesure que le groupe grandit — un seul endroit où la promesse, le salon et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
    },
  ],
};

export default content;
