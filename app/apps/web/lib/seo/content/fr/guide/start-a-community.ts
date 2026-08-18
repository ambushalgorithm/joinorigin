import type { GuideContent } from '../../types';

/**
 * « Comment créer une communauté » — guide intemporel L1 (design §6.1,
 * TASK-326).
 *
 * Traduction française du contenu EN. Recentré sur le modèle numérique
 * connecter→rejoindre→salon : publier le groupe → salon auto-créé à la
 * publication → les membres rejoignent via un lien ; les conseils de lieu et
 * de format restent une conséquence en aval, jamais le cœur. La valeur de
 * JoinOrigin est tissée dans l'intro et chaque étape (note joinOriginNote par
 * étape), avec un cadrage honnête — JoinOrigin n'organise pas d'événements
 * locaux. « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'start-a-community',
  title: 'Comment créer une communauté : un guide pas à pas | JoinOrigin',
  description:
    'Apprenez à créer une communauté — ou à donner à une communauté existante un foyer numérique unique — publiez un groupe, ouvrez son salon et faites entrer les membres via un lien d’invitation. Étapes pratiques de JoinOrigin.',
  intro: [
    'La partie la plus difficile de la création d’une communauté est rarement le lieu, l’ordre du jour ou le budget — c’est trouver les premières personnes qui partagent votre intérêt et leur donner un endroit clair pour se connecter. C’est exactement le problème que JoinOrigin résout.',
    'JoinOrigin est un système d’exploitation communautaire construit autour de la boucle numérique : vous publiez un groupe, son salon est auto-créé, et les membres rejoignent via un lien. Le salon est l’endroit où la communauté vit réellement — un salon Matrix contrôlé par le créateur où les membres discutent, partagent des mises à jour et planifient ensemble dès le premier jour, au lieu de se disperser entre tableurs, messages épars et formulaires d’inscription. Les événements en présentiel n’existent qu’en conséquence en aval : une fois un groupe formé et son salon vivant, les membres peuvent choisir de se réunir en personne — et JoinOrigin n’organise pas d’événements locaux. Le but entier de la plateforme est de connecter des personnes qui ne se seraient jamais rencontrées autrement, c’est pourquoi chaque étape de ce guide correspond à quelque chose que JoinOrigin facilite.',
    'L’approche fonctionne pour tout type de communauté : un cercle de fondateurs, un club de lecture, un groupe de course local, un réseau de petites entreprises ou une communauté professionnelle en ligne — et elle fonctionne que vous partiez de zéro ou que vous officialisiez un groupe qui se réunit déjà informellement. Le principe central est simple — les gens rejoignent à cause d’une promesse claire, et ils restent parce que l’expérience tient fidèlement cette promesse. Vous n’avez pas besoin d’un gros budget, d’un lieu ou d’un public existant pour commencer ; vous avez besoin d’un objectif clair, d’une première étape réaliste et de la discipline de la répéter.',
  ],
  dataPoints: [
    'La plupart des communautés qui réussissent commencent avec un public étroit et précis plutôt que « tous les intéressés ».',
    'Publier un groupe crée son salon instantanément — il n’y a jamais d’étape « créer la discussion plus tard ».',
    'Un lien d’invitation est l’invitation la plus simple : un lien, un clic, et un nouveau membre est dans le salon.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver ou créer des communautés — il n’organise pas d’événements locaux et ne revendique pas de personnel local.',
  ],
  faq: [
    {
      question: 'Combien de temps faut-il pour créer une communauté ?',
      answer:
        'Vous pouvez publier un groupe et ouvrir son salon en quelques semaines si vous gardez le périmètre réduit : un objectif, un lien d’invitation et un flux régulier d’invitations personnelles. La communauté elle-même prend quelques mois de participation régulière dans le salon avant de sembler établie.',
    },
    {
      question: 'Ai-je besoin d’argent ou d’un lieu pour commencer ?',
      answer:
        'Non. Le cœur numérique d’une communauté — un groupe publié et son salon — ne coûte rien et ne nécessite aucun lieu. Beaucoup de groupes choisissent ensuite de se réunir en personne ; les bibliothèques, cafés, parcs et salons de coworking accueillent les premiers rassemblements gratuitement dans la plupart des villes.',
    },
    {
      question: 'Quelle est l’erreur la plus courante au démarrage d’une communauté ?',
      answer:
        'Essayer de servir tout le monde. Une communauté à l’objectif vague attire peu de membres engagés. Définissez un public précis et un résultat clair, mettez-les sur la page du groupe et laissez la communauté évoluer à partir de là.',
    },
    {
      question: 'Comment JoinOrigin peut-il m’aider à créer une communauté ?',
      answer:
        'Publier un groupe sur JoinOrigin auto-crée son salon et les membres rejoignent via un lien — un foyer numérique organisé pour l’objectif, les personnes et les conversations d’une communauté. JoinOrigin n’organise pas d’événements locaux, donc les étapes pratiques de ce guide fonctionnent sur la plateforme et avec les outils que vous possédez déjà.',
    },
  ],
  sections: [
    'Définissez un objectif clair. Décidez à qui s’adresse la communauté, quel problème elle résout et à quoi ressemble un membre réussi. Écrivez une mission d’une phrase comme « un groupe pour les nouveaux fondateurs de Brooklyn afin de partager les leçons des premières étapes ». JoinOrigin donne un foyer à votre objectif — une page de groupe publique où la mission, le public et la promesse sont visibles pour quiconque cherche un groupe comme le vôtre. Écrivez la mission et gardez-la devant chaque invitation.',
    'Publiez le groupe et ouvrez son salon. Le cœur numérique d’une communauté est un groupe publié avec un salon où les membres peuvent discuter. Sur JoinOrigin, publier un groupe auto-crée son salon — le créateur le possède dès la seconde zéro et peut inviter, retirer et attribuer des rôles dans Element. Sur JoinOrigin, il n’y a pas d’étape « créer la discussion plus tard » : publiez le groupe et le salon existe immédiatement, avec le créateur comme propriétaire du salon. Configurez le foyer du groupe et son salon avec les outils que vous utilisez déjà si vous préférez.',
    'Partagez votre lien d’invitation. Un lien d’invitation est l’invitation la plus simple qui soit : un lien, un clic, et un nouveau membre arrive dans le salon. Mettez le lien partout — votre page de groupe, vos messages personnels et les endroits où votre public se rassemble déjà. Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre groupe suffit.',
    'Invitez personnellement vos dix premières personnes. Les invitations personnelles convertissent bien mieux que les publications publiques. Écrivez aux amis, collègues et connaissances qui correspondent au public, partagez le lien d’invitation et demandez-leur d’amener une autre personne. JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une communauté peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque membre que vous invitez devient un canal vers son propre réseau.',
    'Choisissez un format et une cadence (un choix en aval). Une fois le groupe en formation, choisissez un format récurrent — une discussion mensuelle, une séance de travail hebdomadaire, une conférence ou une marche sociale. Le récurrent bat l’événement ponctuel parce que les habitudes sont ce qui transforme les inconnus en membres. C’est un choix en aval : le groupe peut se réunir en personne plus tard, mais le salon est déjà le foyer de la communauté. Sur JoinOrigin, les organisateurs peuvent décrire leur format une fois et les membres peuvent voir à quoi s’attendre avant de rejoindre — ce qui réduit l’hésitation qui arrête les débutants. Choisissez votre format et énoncez-le dans chaque invitation.',
    'Organisez un excellent premier rassemblement. Si les membres choisissent de se réunir en personne — arrivez tôt, accueillez chaque personne, faites un court tour de présentation et terminez par une prochaine date claire. L’objectif de la première réunion n’est pas la taille ; c’est que tout le monde parte en ayant envie de revenir. JoinOrigin n’organise pas et n’encadre pas les rassemblements — l’expérience vous appartient de concevoir. La plateforme aide la communauté à se former autour d’elle : un salon partagé où la date, le compte-rendu et les prochaines étapes vivent.',
    'Recueillez des retours et itérez. Après les premières semaines, demandez aux membres ce qu’ils veulent en plus ou en moins — dans le salon et aux rassemblements. Ajustez le format, l’heure ou le lieu selon leurs réponses, pas selon ce que vous aviez imaginé. JoinOrigin conserve la mémoire partagée d’une communauté au même endroit — notes, décisions et demandes des membres — pour que l’itération soit visible au lieu d’être perdue. Interrogez directement les membres dans le salon après chaque rassemblement.',
    'Publiez un rythme régulier et grandissez lentement. Gardez le même jour et le même format pendant plusieurs mois avant d’élargir. La croissance se compose par les recommandations quand chaque membre peut décrire ce qu’est la communauté en une phrase et partager son lien d’invitation. JoinOrigin aide votre communauté à rester découvrable et connectée à mesure qu’elle grandit — un seul endroit où le rythme, la promesse, le salon et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
  ],
  steps: [
    {
      title: 'Définissez un objectif clair',
      body: 'Décidez à qui s’adresse la communauté, quel problème elle résout et à quoi ressemble un membre réussi. Écrivez une mission d’une phrase comme « un groupe pour les nouveaux fondateurs de Brooklyn afin de partager les leçons des premières étapes ».',
      joinOriginNote:
        'JoinOrigin donne un foyer à votre objectif — une page de groupe publique où la mission, le public et la promesse sont visibles pour quiconque cherche un groupe comme le vôtre. Écrivez la mission et gardez-la devant chaque invitation.',
    },
    {
      title: 'Publiez le groupe et ouvrez son salon',
      body: 'Le cœur numérique d’une communauté est un groupe publié avec un salon où les membres peuvent discuter. Sur JoinOrigin, publier un groupe auto-crée son salon — le créateur le possède dès la seconde zéro et peut inviter, retirer et attribuer des rôles dans Element.',
      joinOriginNote:
        'Sur JoinOrigin, il n’y a pas d’étape « créer la discussion plus tard » : publiez le groupe et le salon existe immédiatement, avec le créateur comme propriétaire du salon. Configurez le foyer du groupe et son salon avec les outils que vous utilisez déjà si vous préférez.',
    },
    {
      title: 'Partagez votre lien d’invitation',
      body: 'Un lien d’invitation est l’invitation la plus simple qui soit : un lien, un clic, et un nouveau membre arrive dans le salon. Mettez le lien partout — votre page de groupe, vos messages personnels et les endroits où votre public se rassemble déjà.',
      joinOriginNote:
        'Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page publique ou suivre un lien d’invitation direct d’un membre. Un lien court et clair vers votre groupe suffit.',
    },
    {
      title: 'Invitez personnellement vos dix premières personnes',
      body: 'Les invitations personnelles convertissent bien mieux que les publications publiques. Écrivez aux amis, collègues et connaissances qui correspondent au public, partagez le lien d’invitation et demandez-leur d’amener une autre personne.',
      joinOriginNote:
        'JoinOrigin facilite la découverte — un endroit où les personnes qui cherchent une communauté peuvent trouver la vôtre et rejoindre via un lien. Les invitations personnelles font toujours le gros du travail, et chaque membre que vous invitez devient un canal vers son propre réseau.',
    },
    {
      title: 'Choisissez un format et une cadence (un choix en aval)',
      body: 'Une fois le groupe en formation, choisissez un format récurrent — une discussion mensuelle, une séance de travail hebdomadaire, une conférence ou une marche sociale. Le récurrent bat l’événement ponctuel parce que les habitudes sont ce qui transforme les inconnus en membres. C’est un choix en aval : le groupe peut se réunir en personne plus tard, mais le salon est déjà le foyer de la communauté.',
      joinOriginNote:
        'Sur JoinOrigin, les organisateurs peuvent décrire leur format une fois et les membres peuvent voir à quoi s’attendre avant de rejoindre — ce qui réduit l’hésitation qui arrête les débutants. Choisissez votre format et énoncez-le dans chaque invitation.',
    },
    {
      title: 'Organisez un excellent premier rassemblement',
      body: 'Si les membres choisissent de se réunir en personne — arrivez tôt, accueillez chaque personne, faites un court tour de présentation et terminez par une prochaine date claire. L’objectif de la première réunion n’est pas la taille ; c’est que tout le monde parte en ayant envie de revenir.',
      joinOriginNote:
        'JoinOrigin n’organise pas et n’encadre pas les rassemblements — l’expérience vous appartient de concevoir. La plateforme aide la communauté à se former autour d’elle : un salon partagé où la date, le compte-rendu et les prochaines étapes vivent.',
    },
    {
      title: 'Recueillez des retours et itérez',
      body: 'Après les premières semaines, demandez aux membres ce qu’ils veulent en plus ou en moins — dans le salon et aux rassemblements. Ajustez le format, l’heure ou le lieu selon leurs réponses, pas selon ce que vous aviez imaginé.',
      joinOriginNote:
        'JoinOrigin conserve la mémoire partagée d’une communauté au même endroit — notes, décisions et demandes des membres — pour que l’itération soit visible au lieu d’être perdue. Interrogez directement les membres dans le salon après chaque rassemblement.',
    },
    {
      title: 'Publiez un rythme régulier et grandissez lentement',
      body: 'Gardez le même jour et le même format pendant plusieurs mois avant d’élargir. La croissance se compose par les recommandations quand chaque membre peut décrire ce qu’est la communauté en une phrase et partager son lien d’invitation.',
      joinOriginNote:
        'JoinOrigin aide votre communauté à rester découvrable et connectée à mesure qu’elle grandit — un seul endroit où le rythme, la promesse, le salon et les personnes sont visibles. Faites-vous découvrir et développez-vous.',
    },
  ],
};

export default content;
