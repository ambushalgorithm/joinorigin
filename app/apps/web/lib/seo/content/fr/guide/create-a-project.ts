import type { GuideContent } from '../../types';

/**
 * « Comment créer un projet » — guide intemporel L1 (design §6.1, TASK-353).
 *
 * Traduction française du contenu EN. Écrit sur le flux d'écran produit §2 :
 * un groupe formé passe de la conversation au travail partagé en publiant un
 * projet ; la page du projet est publique, son salon est auto-créé À LA
 * PUBLICATION, le créateur contrôle le salon, et les progrès alimentent le fil.
 * « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'create-a-project',
  title: 'Comment créer un projet : transformer l’élan d’un groupe en travail partagé | JoinOrigin',
  description:
    'Créez un projet sur JoinOrigin — qu’il s’agisse d’une toute nouvelle idée ou d’un travail déjà en cours — publiez une page de projet partagée, ouvrez son salon automatiquement et transformez la conversation d’un groupe en travail qui aboutit. Étapes pratiques de JoinOrigin.',
  intro: [
    'Un groupe qui ne fait que parler finit par s’essouffler. La différence entre une communauté qui semble vivante et une qui s’éteint, c’est le travail partagé — un projet avec un nom, un objectif et un endroit où les progrès sont visibles. Transformer une conversation en projet est aussi un problème de mise en relation : il vous faut les bonnes personnes, le bon engagement et un endroit clair pour travailler ensemble. Il en va de même quand le projet existe déjà — dispersé entre fichiers, messages et la liste de tâches d’une seule personne — il lui faut un foyer visible et les bonnes personnes autour.',
    'Le flux JoinOrigin gère ce passage : un groupe formé publie un projet, et la page du projet apparaît publiquement avec son salon auto-créé au moment de la publication. Les membres rejoignent le salon du projet via un lien, le créateur le contrôle en tant que propriétaire du salon, et les mises à jour du salon alimentent le fil pour que tout le réseau voie le travail. Le salon du projet s’ouvre au moment où vous publiez — aucune étape de configuration entre les deux.',
    'Ce guide va de la première étincelle à un rythme de travail — que le projet soit tout nouveau ou déjà en cours : partir d’un groupe existant et de son salon, définir un périmètre qui peut réellement aboutir, rédiger la page du projet, la publier et ouvrir le salon, inviter l’équipe de travail, convenir des rôles et d’un premier jalon, faire entrer le vrai travail dans le salon et partager les progrès pour créer de l’élan.',
  ],
  dataPoints: [
    'Les projets avec une page publique et un premier jalon clair sont plus faciles à pourvoir — les personnes rejoignent un travail qu’elles peuvent voir.',
    'Sur JoinOrigin, publier un projet auto-crée son salon — l’espace de travail existe dès le même moment que la page.',
    'Un salon de projet donne au travail un seul foyer : décisions, fichiers et progrès visibles pour tous ceux qui rejoignent.',
    'JoinOrigin est un système d’exploitation communautaire qui aide les groupes formés à transformer leurs conversations en projets — publiez votre projet et son salon s’ouvre immédiatement.',
  ],
  faq: [
    {
      question: 'Qu’est-ce qui rend un groupe prêt à lancer un projet ?',
      answer:
        'Un groupe est prêt quand quelques membres partagent un résultat concret et sont disposés à y consacrer du temps. Vous n’avez pas besoin d’une grande équipe — trois personnes engagées avec un jalon clair valent mieux qu’une douzaine de membres curieux. Publiez le projet quand la conversation se répète : « on devrait vraiment le faire ».',
    },
    {
      question: 'Quand le salon du projet est-il créé ?',
      answer:
        'Le salon est auto-créé au moment où vous publiez le projet. Le créateur possède le salon dès le début et peut inviter l’équipe de travail, attribuer des rôles et garder le travail organisé dans Element. Vous pouvez aussi créer la même structure avec les outils que votre groupe utilise déjà.',
    },
    {
      question: 'En quoi un projet diffère-t-il d’une idée ?',
      answer:
        'Une idée est une proposition autour de laquelle les gens se rassemblent — son salon est l’endroit où l’intérêt et la pertinence sont testés. Un projet est le travail partagé auquel un groupe formé s’engage, avec une page, un salon et un jalon. Publiez d’abord une idée quand vous avez besoin de personnes ; publiez un projet quand vous les avez déjà.',
    },
    {
      question: 'Quel devrait être le premier jalon ?',
      answer:
        'Petit et réalisable — une première ébauche, un pilote, une première version ou un livrable terminé en quelques semaines. Un premier jalon court renforce la confiance dans le groupe et rend le projet réel pour les nouveaux venus. Vous pourrez toujours élargir après la première victoire.',
    },
    {
      question: 'JoinOrigin peut-il aider un groupe à lancer un projet dès aujourd’hui ?',
      answer:
        'Oui. Publier un projet sur JoinOrigin crée sa page et son salon de manière atomique — le salon s’ouvre au moment où vous publiez, et le créateur le contrôle. Choisissez l’objectif du groupe, créez un foyer de projet partagé et ouvrez un salon pour le travail ; chaque nouveau membre que vous invitez étend votre portée.',
    },
  ],
  sections: [
    'Partez d’un groupe existant et de son salon. Un projet naît d’un groupe qui possède déjà confiance et élan. Regardez les conversations dans le salon du groupe et trouvez le besoin récurrent — la chose que les membres répètent « on devrait le faire ». JoinOrigin fait vivre une communauté dans un salon contrôlé par le créateur, et le projet est la couche suivante par-dessus ce salon. Nommez le besoin récurrent dans le groupe et testez si quelqu’un veut agir.',
    'Définissez un périmètre qui peut réellement aboutir. Écrivez ce que le projet produira, pour qui et dans quel délai. Gardez la première version assez petite pour que le groupe puisse la terminer. JoinOrigin est conçu autour de projets avec des pages publiques — un périmètre clair est ce qui rend la page lisible et le salon concentré. Une phrase qui dit ce qui est livré et quand suffit pour démarrer.',
    'Rédigez la page du projet. La page doit indiquer l’objectif du projet, le problème qu’il résout, qui y travaille et ce dont il a besoin. Soyez honnête sur le stade — une première ébauche est parfaitement acceptable. Publier un projet sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Publiez la description du projet là où le groupe peut y renvoyer les personnes.',
    'Publiez le projet et ouvrez son salon. Publier est ce qui rend le projet réel : une page publique plus un salon où vit le travail. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède. Sur JoinOrigin, la page, le salon et l’équipe de travail sont une seule publication. Créez la page et le salon avec les outils que votre groupe utilise déjà si vous préférez.',
    'Invitez l’équipe de travail dans le salon. Invitez les personnes qui feront réellement le travail — une petite équipe engagée vaut mieux qu’un large public. Partagez le lien d’invitation et demandez à chaque personne de confirmer son temps. Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page du projet ou suivre un lien d’invitation direct d’un membre. Un lien clair vers le salon du projet suffit.',
    'Convenez des rôles et d’un premier jalon. Nommez qui possède quoi, à quelle fréquence le groupe fait le point et le premier jalon vers lequel tout le monde travaille. Écrivez-le là où toute l’équipe peut le voir. JoinOrigin n’attribue pas les rôles à votre place — le contrôle du créateur signifie que vous décidez. La plateforme garde les rôles et le jalon visibles dans le salon du projet. Un court plan écrit dans le salon suffit.',
    'Faites entrer le vrai travail dans le salon. Remplacez « on devrait » par « voici l’ébauche », « voici la décision » et « voici la prochaine tâche ». Gardez les progrès dans un endroit visible pour que tout le monde puisse suivre. JoinOrigin garde le salon d’un projet porteur du travail — décisions, fichiers et mises à jour — au lieu de les disperser dans des messages privés. Gardez les livrables de travail dans le salon partagé dès la première semaine.',
    'Partagez les progrès pour créer de l’élan. Publiez des mises à jour à mesure que le projet avance, célébrez le jalon quand il arrive et invitez le groupe élargi à rejoindre ou à suivre. Les progrès dans le fil transforment un projet en preuve que la communauté livre. Les mises à jour du salon alimentent le fil sur JoinOrigin — la boucle de croissance où chaque nouveau membre étend la surface de découverte. Faites-vous découvrir et développez-vous.',
  ],
  steps: [
    {
      title: 'Partez d’un groupe existant et de son salon',
      body: 'Un projet naît d’un groupe qui possède déjà confiance et élan. Regardez les conversations dans le salon du groupe et trouvez le besoin récurrent — la chose que les membres répètent « on devrait le faire ».',
      joinOriginNote:
        'JoinOrigin fait vivre une communauté dans un salon contrôlé par le créateur, et le projet est la couche suivante par-dessus ce salon. Nommez le besoin récurrent dans le groupe et testez si quelqu’un veut agir.',
    },
    {
      title: 'Définissez un périmètre qui peut réellement aboutir',
      body: 'Écrivez ce que le projet produira, pour qui et dans quel délai. Gardez la première version assez petite pour que le groupe puisse la terminer.',
      joinOriginNote:
        'JoinOrigin est conçu autour de projets avec des pages publiques — un périmètre clair est ce qui rend la page lisible et le salon concentré. Une phrase qui dit ce qui est livré et quand suffit pour démarrer.',
    },
    {
      title: 'Rédigez la page du projet',
      body: 'La page doit indiquer l’objectif du projet, le problème qu’il résout, qui y travaille et ce dont il a besoin. Soyez honnête sur le stade — une première ébauche est parfaitement acceptable.',
      joinOriginNote:
        'Publier un projet sur JoinOrigin auto-crée sa page et son salon, le créateur contrôlant le salon dès le début. Publiez la description du projet là où le groupe peut y renvoyer les personnes.',
    },
    {
      title: 'Publiez le projet et ouvrez son salon',
      body: 'Publier est ce qui rend le projet réel : une page publique plus un salon où vit le travail. Sur JoinOrigin, le salon est auto-créé au même moment — il n’y a pas d’étape de configuration séparée, et le créateur le possède.',
      joinOriginNote:
        'Sur JoinOrigin, la page, le salon et l’équipe de travail sont une seule publication. Créez la page et le salon avec les outils que votre groupe utilise déjà si vous préférez.',
    },
    {
      title: 'Invitez l’équipe de travail dans le salon',
      body: 'Invitez les personnes qui feront réellement le travail — une petite équipe engagée vaut mieux qu’un large public. Partagez le lien d’invitation et demandez à chaque personne de confirmer son temps.',
      joinOriginNote:
        'Rejoindre sur JoinOrigin est une action unique — cliquer sur Rejoindre sur la page du projet ou suivre un lien d’invitation direct d’un membre. Un lien clair vers le salon du projet suffit.',
    },
    {
      title: 'Convenez des rôles et d’un premier jalon',
      body: 'Nommez qui possède quoi, à quelle fréquence le groupe fait le point et le premier jalon vers lequel tout le monde travaille. Écrivez-le là où toute l’équipe peut le voir.',
      joinOriginNote:
        'JoinOrigin n’attribue pas les rôles à votre place — le contrôle du créateur signifie que vous décidez. La plateforme garde les rôles et le jalon visibles dans le salon du projet. Un court plan écrit dans le salon suffit.',
    },
    {
      title: 'Faites entrer le vrai travail dans le salon',
      body: 'Remplacez « on devrait » par « voici l’ébauche », « voici la décision » et « voici la prochaine tâche ». Gardez les progrès dans un endroit visible pour que tout le monde puisse suivre.',
      joinOriginNote:
        'JoinOrigin garde le salon d’un projet porteur du travail — décisions, fichiers et mises à jour — au lieu de les disperser dans des messages privés. Gardez les livrables de travail dans le salon partagé dès la première semaine.',
    },
    {
      title: 'Partagez les progrès pour créer de l’élan',
      body: 'Publiez des mises à jour à mesure que le projet avance, célébrez le jalon quand il arrive et invitez le groupe élargi à rejoindre ou à suivre. Les progrès dans le fil transforment un projet en preuve que la communauté livre.',
      joinOriginNote:
        'Les mises à jour du salon alimentent le fil sur JoinOrigin — la boucle de croissance où chaque nouveau membre étend la surface de découverte. Faites-vous découvrir et développez-vous.',
    },
  ],
};

export default content;
