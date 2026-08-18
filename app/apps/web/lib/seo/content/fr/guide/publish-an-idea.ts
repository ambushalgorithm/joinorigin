import type { GuideContent } from '../../types';

/**
 * « Comment publier une idée » — guide intemporel L1 (design §6.1, TASK-353).
 *
 * Traduction française du contenu EN. Écrit sur le flux d'écran produit §2 :
 * Découvrir → page publique d'idée → Rejoindre via lien → salon auto-créé
 * À LA PUBLICATION → le créateur contrôle le salon → croissance fil/invitations.
 * « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'publish-an-idea',
  title:
    'Comment publier une idée : transformer une étincelle en page d’idée découvrable | JoinOrigin',
  description:
    'Publiez une idée sur JoinOrigin — qu’il s’agisse d’une nouvelle étincelle ou d’un projet existant que vous voulez faire découvrir — rédigez une page d’idée publique, laissez son salon s’ouvrir automatiquement et invitez les personnes qui veulent la construire avec vous. Étapes pratiques de JoinOrigin.',
  intro: [
    'La plupart des idées meurent dans les brouillons — une note sur un téléphone, une conversation à moitié oubliée, un document que personne d’autre n’a jamais vu. La raison tient rarement au fait que l’idée est mauvaise : c’est que personne ne pouvait la trouver, et trouver les bonnes personnes est tout le jeu. Ce problème de mise en relation est exactement ce que JoinOrigin résout — que l’idée soit une étincelle toute fraîche ou un projet existant qui avance discrètement sans foyer découvrable.',
    'La boucle JoinOrigin fonctionne ainsi : vous publiez une idée, une page d’idée publique apparaît, et son salon est auto-créé au moment de la publication. Les personnes découvrent la page via Explorer ou suivent un lien que vous partagez, et rejoindre se fait en un clic. Elles arrivent dans le salon — un salon Matrix contrôlé par le créateur où la conversation autour de l’idée a réellement lieu. Le créateur possède le salon dès la seconde zéro et décide qui rejoint et ce qui se passe à l’intérieur.',
    'Ce guide parcourt tout le chemin : compresser l’idée en une phrase claire, écrire une page que les gens peuvent trouver, la publier et ouvrir le salon, partager le lien d’invitation, inviter les premières personnes intéressées, animer la première conversation, affiner l’idée à partir de retours réels et garder l’idée découvrable à mesure qu’elle grandit. Cela fonctionne pour toute idée — une petite entreprise, une start-up, un club de lecture, un projet communautaire, un produit qui n’existe pas encore, ou un projet qui existe déjà et a besoin de plus de monde autour.',
  ],
  dataPoints: [
    'Une idée résumée en une phrase est plus découvrable qu’un long document — la clarté est une fonctionnalité de découverte.',
    'Sur JoinOrigin, publier une idée auto-crée son salon — il n’y a jamais d’étape séparée « créer la discussion plus tard ».',
    'Un lien d’invitation est l’invitation la plus simple : un lien, un clic, et une personne intéressée est dans le salon.',
    'JoinOrigin est un système d’exploitation communautaire qui aide les personnes à trouver des idées et les personnes qui les portent — publiez votre idée et son salon s’ouvre immédiatement.',
  ],
  faq: [
    {
      question: 'Qu’est-ce qu’une page d’idée exactement ?',
      answer:
        'Une page d’idée est le foyer public et indexable d’une idée sur JoinOrigin — une page claire qui indique ce qu’est l’idée, pourquoi elle compte et à qui elle s’adresse, avec une action Rejoindre. Les personnes la découvrent via Explorer ou un lien partagé, et rejoindre les mène au salon de l’idée.',
    },
    {
      question: 'Quand le salon est-il créé ?',
      answer:
        'Le salon est auto-créé au moment où vous publiez l’idée. Le créateur possède le salon dès la seconde zéro et peut inviter, retirer et attribuer des rôles dans Element. Vous pouvez aussi mettre en place la même structure — une page publique plus un salon — avec les outils que vous utilisez déjà.',
    },
    {
      question: 'Comment les gens trouvent-ils mon idée ?',
      answer:
        'Par la découverte et le partage : une page d’idée est indexable et apparaît dans Explorer, et chaque lien d’invitation que vous partagez y mène directement. Le trafic précoce le plus fiable reste personnel — partager la page et son lien avec des personnes qui se soucient déjà du problème.',
    },
    {
      question: 'Quelle est la différence entre une idée et un projet ?',
      answer:
        'Une idée est une proposition autour de laquelle les gens se rassemblent — le salon est l’endroit où les personnes intéressées discutent et testent la pertinence. Un projet est ce qu’un groupe formé commence à faire ensemble, avec sa propre page et son propre salon. Publiez l’idée d’abord ; le projet suit quand les personnes s’engagent.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à publier une idée dès aujourd’hui ?',
      answer:
        'Oui. Publier une idée sur JoinOrigin crée sa page et son salon de manière atomique — le salon s’ouvre au moment où vous publiez, et vous le contrôlez dès le début. Publiez votre idée et ouvrez un salon de discussion ; chaque nouveau membre que vous invitez étend votre portée.',
    },
  ],
  sections: [
    'Définissez l’idée en une phrase claire. Compressez l’idée en une seule phrase : à qui elle s’adresse, ce qu’elle change et pourquoi elle compte. Si vous ne pouvez pas la dire en une phrase, vous n’êtes pas prêt à la publier. JoinOrigin est conçu autour de pages d’idées découvrables — un pitch d’une phrase est le cœur de la page et la phrase que les gens chercheront. Écrivez la phrase et testez-la sur trois personnes avant d’aller plus loin.',
    'Rédigez la page d’idée avec une promesse et un besoin. La page doit énoncer l’idée, pourquoi elle compte, ce dont elle a besoin et qui vous voulez voir rejoindre. Soyez honnête sur le stade de l’idée — une étincelle, un prototype, un produit. JoinOrigin auto-crée la page et le salon quand vous publiez une idée ; le créateur contrôle le salon dès le début et peut inviter, retirer et attribuer des rôles dans Element. Publiez l’idée et ouvrez un salon de discussion autour d’elle.',
    'Publiez l’idée et laissez son salon s’ouvrir. Publier est le moment où l’idée devient découvrable. Sur JoinOrigin, publier auto-crée le salon — il n’y a jamais d’étape « créer la discussion plus tard », et le créateur possède le salon dès la seconde zéro. Sur JoinOrigin, la page d’idée et son salon sont une seule publication atomique. Vous pouvez aussi partager la page publiquement et configurer le salon avec les outils que vous utilisez déjà.',
    'Partagez le lien d’invitation. Le lien d’invitation est le chemin le plus court entre l’intérêt et la connexion : un lien, un clic, et une personne intéressée arrive dans le salon. Mettez-le partout où se rassemblent les bonnes personnes. Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre idée suffit.',
    'Invitez personnellement les premières personnes intéressées. Les invitations personnelles convertissent mieux que les publications publiques. Écrivez aux personnes qui correspondent au public de l’idée, partagez le lien d’invitation et demandez-leur d’amener une autre personne susceptible d’être intéressée. JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une idée peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque personne qui rejoint devient un canal vers son propre réseau.',
    'Animez la première conversation dans le salon. Les premières conversations décident si une idée a de l’élan. Ouvrez le salon avec une invite claire — quel est le problème, quelle est la première étape, qu’apportez-vous chacun — et laissez les personnes répondre. JoinOrigin ne mène pas ces conversations ; le salon vous appartient. La plateforme donne à l’idée un salon où l’intérêt devient conversation, et le créateur possède ce salon. Commencez la conversation là où vos personnes sont déjà.',
    'Recueillez des retours et affinez l’idée. Demandez aux personnes qui rejoignent ce qui les enthousiasme, ce qui les inquiète et ce qu’elles feraient en premier. Ajustez le pitch, le périmètre ou la prochaine étape selon leurs réponses. JoinOrigin conserve la mémoire partagée d’une idée au même endroit — notes, décisions et retours dans le salon — pour que le raffinement soit visible au lieu d’être perdu. Interrogez directement les membres dans le salon après la première semaine.',
    'Gardez l’idée découvrable à mesure qu’elle grandit. Revenez à la page à mesure que l’idée évolue — mettez à jour la promesse, les besoins et la prochaine étape pour que les nouveaux venus voient toujours la version actuelle. La croissance se compose quand chaque membre peut décrire l’idée en une phrase et partager son lien d’invitation. JoinOrigin garde votre page d’idée et son salon connectés à mesure que l’intérêt grandit — un seul endroit où la promesse, la conversation et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
  ],
  steps: [
    {
      title: 'Définissez l’idée en une phrase claire',
      body: 'Compressez l’idée en une seule phrase : à qui elle s’adresse, ce qu’elle change et pourquoi elle compte. Si vous ne pouvez pas la dire en une phrase, vous n’êtes pas prêt à la publier.',
      joinOriginNote:
        'JoinOrigin est conçu autour de pages d’idées découvrables — un pitch d’une phrase est le cœur de la page et la phrase que les gens chercheront. Écrivez la phrase et testez-la sur trois personnes avant d’aller plus loin.',
    },
    {
      title: 'Rédigez la page d’idée avec une promesse et un besoin',
      body: 'La page doit énoncer l’idée, pourquoi elle compte, ce dont elle a besoin et qui vous voulez voir rejoindre. Soyez honnête sur le stade de l’idée — une étincelle, un prototype, un produit.',
      joinOriginNote:
        'JoinOrigin auto-crée la page et le salon quand vous publiez une idée ; le créateur contrôle le salon dès le début et peut inviter, retirer et attribuer des rôles dans Element. Publiez l’idée et ouvrez un salon de discussion autour d’elle.',
    },
    {
      title: 'Publiez l’idée et laissez son salon s’ouvrir',
      body: 'Publier est le moment où l’idée devient découvrable. Sur JoinOrigin, publier auto-crée le salon — il n’y a jamais d’étape « créer la discussion plus tard », et le créateur possède le salon dès la seconde zéro.',
      joinOriginNote:
        'Sur JoinOrigin, la page d’idée et son salon sont une seule publication atomique. Vous pouvez aussi partager la page publiquement et configurer le salon avec les outils que vous utilisez déjà.',
    },
    {
      title: 'Partagez le lien d’invitation',
      body: 'Le lien d’invitation est le chemin le plus court entre l’intérêt et la connexion : un lien, un clic, et une personne intéressée arrive dans le salon. Mettez-le partout où se rassemblent les bonnes personnes.',
      joinOriginNote:
        'Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre idée suffit.',
    },
    {
      title: 'Invitez personnellement les premières personnes intéressées',
      body: 'Les invitations personnelles convertissent mieux que les publications publiques. Écrivez aux personnes qui correspondent au public de l’idée, partagez le lien d’invitation et demandez-leur d’amener une autre personne susceptible d’être intéressée.',
      joinOriginNote:
        'JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une idée peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque personne qui rejoint devient un canal vers son propre réseau.',
    },
    {
      title: 'Animez la première conversation dans le salon',
      body: 'Les premières conversations décident si une idée a de l’élan. Ouvrez le salon avec une invite claire — quel est le problème, quelle est la première étape, qu’apportez-vous chacun — et laissez les personnes répondre.',
      joinOriginNote:
        'JoinOrigin ne mène pas ces conversations ; le salon vous appartient. La plateforme donne à l’idée un salon où l’intérêt devient conversation, et le créateur possède ce salon. Commencez la conversation là où vos personnes sont déjà.',
    },
    {
      title: 'Recueillez des retours et affinez l’idée',
      body: 'Demandez aux personnes qui rejoignent ce qui les enthousiasme, ce qui les inquiète et ce qu’elles feraient en premier. Ajustez le pitch, le périmètre ou la prochaine étape selon leurs réponses.',
      joinOriginNote:
        'JoinOrigin conserve la mémoire partagée d’une idée au même endroit — notes, décisions et retours dans le salon — pour que le raffinement soit visible au lieu d’être perdu. Interrogez directement les membres dans le salon après la première semaine.',
    },
    {
      title: 'Gardez l’idée découvrable à mesure qu’elle grandit',
      body: 'Revenez à la page à mesure que l’idée évolue — mettez à jour la promesse, les besoins et la prochaine étape pour que les nouveaux venus voient toujours la version actuelle. La croissance se compose quand chaque membre peut décrire l’idée en une phrase et partager son lien d’invitation.',
      joinOriginNote:
        'JoinOrigin garde votre page d’idée et son salon connectés à mesure que l’intérêt grandit — un seul endroit où la promesse, la conversation et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
    },
  ],
};

export default content;
