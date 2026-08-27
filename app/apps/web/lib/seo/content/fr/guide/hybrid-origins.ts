import type { GuideContent } from '../../types';

/**
 * « Communautés hybrides » — guide intemporel L1 (design §6.1, TASK-326).
 *
 * Traduction française du contenu EN. Recentré sur le modèle numérique
 * connecter→rejoindre→salon : le salon connecte les parties en ligne et
 * (en aval) en présentiel d'une communauté hybride — une communauté, un
 * salon, deux points d'entrée. JoinOrigin ne fournit pas d'outils
 * d'événements et n'organise pas d'événements hybrides. « Salon » désigne
 * le salon Matrix (§6.3) — les lieux physiques sont décrits comme des
 * lieux/espaces, jamais des « salons ».
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'hybrid-origins',
  title: 'Communautés hybrides : comment animer le présentiel et l’en ligne ensemble | JoinOrigin',
  description:
    'Animez une communauté hybride où le salon connecte les membres en présentiel et en ligne — que vous démarriez de zéro ou rendiez hybride une communauté existante, choisissez les bons outils, concevez une participation égale et gardez les deux publics engagés. De JoinOrigin.',
  intro: [
    'Une communauté hybride réunit les gens dans deux endroits à la fois — physiquement dans un lieu et virtuellement à travers un écran — et le vrai défi porte encore sur les personnes : s’assurer que les deux publics se sentent membres d’une seule communauté connectée, et non de deux communautés séparées. JoinOrigin est construit exactement avec cet objectif de mise en relation, et le modèle fonctionne aussi bien pour une communauté qui existe déjà que pour une qui démarre tout juste — un groupe établi en présentiel peut ajouter une moitié en ligne, et une communauté en ligne peut commencer à se réunir localement.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver, rejoindre et créer des communautés — donc un groupe hybride a un seul salon qui connecte les parties en ligne et (en aval) en présentiel : les membres locaux et distants voient la même communauté, le même rythme et les mêmes prochaines étapes. Dans le modèle numérique connecter→rejoindre→salon, le salon est la surface persistante où les deux moitiés de la communauté vivent entre les rassemblements ; l’événement en présentiel est une conséquence en aval que le salon tient ensemble avant et après. JoinOrigin ne fournit pas d’outils d’événements et n’organise pas d’événements hybrides — la plateforme donne à toute communauté — hybride comprise — un seul salon où ses membres restent connectés.',
    'Ce guide couvre les décisions pratiques qui font réussir les communautés hybrides — pour les nouveaux groupes comme pour les groupes existants : décider si l’hybride est le bon modèle, construire le salon que les deux publics partagent, choisir un format et des outils adaptés, concevoir le rassemblement pour que les membres en présentiel et en ligne vivent la même expérience, gérer l’espace pour qu’aucun côté ne domine, et garder un salon persistant qui tient la communauté ensemble entre les rassemblements. Chaque étape montre où JoinOrigin aide.',
  ],
  dataPoints: [
    'Une communauté hybride est une communauté avec deux points d’entrée, pas deux publics à servir séparément.',
    'Le salon est le tissu conjonctif : un endroit partagé où les deux publics voient les mêmes mises à jour, notes et prochaines étapes.',
    'Des outils simples et fiables — un lien vidéo, un document partagé — réduisent le frottement qui tue les rassemblements hybrides.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver ou créer des communautés ; il ne fournit pas d’outils d’événements et n’organise pas d’événements hybrides.',
  ],
  faq: [
    {
      question: 'Quand une communauté devrait-elle devenir hybride ?',
      answer:
        'Quand une partie de votre public ne peut pas assister en présentiel — en raison de la distance, de l’emploi du temps ou de la mobilité — et que la communauté veut quand même une identité partagée. Si tout le monde peut se réunir localement, le présentiel est plus simple et souvent meilleur.',
    },
    {
      question: 'Quelle est la configuration minimale d’outils pour un rassemblement hybride ?',
      answer:
        'Un lien d’appel vidéo pour les membres à distance, un document partagé pour les notes et un salon où les deux publics restent connectés entre les rassemblements. Plus d’outils ajoutent plus de points de défaillance ; commencez minimal et n’ajoutez que ce que la communauté demande.',
    },
    {
      question: 'Comment empêcher les membres à distance de se sentir spectateurs ?',
      answer:
        'Concevez pour une participation égale : faites un tour de présentation hybride, appelez explicitement les membres à distance, partagez l’écran pour tout visuel et utilisez un document partagé où les deux côtés peuvent écrire. Désignez une personne pour surveiller en continu le côté distant.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à animer une communauté hybride ?',
      answer:
        'Oui. JoinOrigin aide les personnes à trouver et à créer des communautés — un salon où les membres locaux et distants restent connectés. JoinOrigin ne fournit pas d’outillage d’événements, donc les pratiques hybrides pratiques de ce guide fonctionnent avec les outils que vous possédez déjà.',
    },
  ],
  sections: [
    'Décidez si l’hybride est le bon modèle. Passez à l’hybride quand il a du sens de se réunir en présentiel. Si la plupart des membres peuvent se réunir localement, le présentiel renforce le lien — l’hybride permet de bâtir la confiance plus vite et de lire les gens plus à fond. JoinOrigin est conçu pour aider toute communauté à trouver et garder des membres, mais la décision de format vous appartient. Passez à l’hybride seulement quand il a du sens de se réunir en présentiel.',
    'Construisez le salon qui connecte les deux publics. Avant toute chose, assurez-vous que la communauté a un salon partagé où les membres distants et locaux discutent, partagent des mises à jour et voient les mêmes prochaines étapes. Le salon est ce qui fait que l’hybride ressemble à une communauté plutôt qu’à deux. Sur JoinOrigin, chaque groupe a un salon dès la publication — la surface persistante qui tient ensemble les parties en ligne et en présentiel. Configurez un salon partagé que les deux publics peuvent rejoindre.',
    'Choisissez un outil vidéo fiable et un document partagé. Gardez la pile minimale : un lien d’appel vidéo pour les membres à distance, un document pour les notes et les liens partagés, et une entrée de calendrier. La complexité est l’ennemie des rassemblements hybrides réguliers. JoinOrigin ne fournit pas d’outillage d’événements — gardez la pile minimale. La plateforme est le salon persistant où le lien et le document vivent, pas l’outil d’événement lui-même.',
    'Concevez l’ordre du jour pour deux publics. Faites un tour de présentation qui inclut les membres à distance par leur nom, gardez les visuels sur un écran partagé et laissez de la place au côté en ligne pour parler. Un ordre du jour hybride nomme explicitement les deux publics. Sur JoinOrigin, les deux publics partagent un seul salon communautaire, ce qui rend « concevoir pour deux publics » naturel. Nommez explicitement les deux publics dans l’ordre du jour.',
    'Désignez une personne-pont. Une personne surveille le côté distant : accueille les retardataires, donne la parole aux mains levées à distance et relaie ce que le lieu ne capte pas. Sans pont, le public en ligne devient spectateur. JoinOrigin n’organise pas les événements — la personne-pont est un rôle humain. La plateforme garde la communauté organisée dans un salon pour que le pont ait un seul endroit pour voir qui a rejoint et ce qui a été partagé.',
    'Gérez l’espace pour que les deux côtés participent. Demandez aux membres en présentiel de parler un à la fois et de répéter les questions pour le micro, placez les gens près de la caméra et alternez les tours entre le lieu et l’appel — le salon partagé restant ouvert pour les deux. JoinOrigin est conçu autour d’une connexion égale entre les membres — le même principe qui fait fonctionner la discussion hybride. Alternez les tours entre le lieu et l’appel et répétez les questions pour le micro.',
    'Gardez le salon vivant entre les rassemblements. La communauté vit dans le salon entre les événements : les membres distants et locaux partagent des mises à jour, posent des questions et planifient ensemble là-bas. L’hybride n’est pas un format d’événement — c’est un espace partagé continu. C’est l’étape la plus proche de l’intention de conception de JoinOrigin : un système d’exploitation communautaire est un salon persistant où les membres distants et locaux partagent des mises à jour et planifient ensemble. Un salon partagé fonctionne — JoinOrigin est cet espace.',
    'Capturez et partagez le résultat dans le salon. Publiez les notes, enregistrements et prochaines étapes dans le salon partagé après chaque rassemblement. Un artefact visible garde les deux publics connectés et donne à la communauté le sentiment d’être productive. Sur JoinOrigin, le résultat d’une communauté vit dans un salon organisé — notes, enregistrements, prochaines étapes. Publiez-les dans le salon partagé après chaque rassemblement.',
  ],
  steps: [
    {
      title: 'Décidez si l’hybride est le bon modèle',
      body: 'Passez à l’hybride quand il a du sens de se réunir en présentiel. Si la plupart des membres peuvent se réunir localement, le présentiel renforce le lien — l’hybride permet de bâtir la confiance plus vite et de lire les gens plus à fond.',
      joinOriginNote:
        'JoinOrigin est conçu pour aider toute communauté à trouver et garder des membres, mais la décision de format vous appartient. Passez à l’hybride seulement quand il a du sens de se réunir en présentiel.',
    },
    {
      title: 'Construisez le salon qui connecte les deux publics',
      body: 'Avant toute chose, assurez-vous que la communauté a un salon partagé où les membres distants et locaux discutent, partagent des mises à jour et voient les mêmes prochaines étapes. Le salon est ce qui fait que l’hybride ressemble à une communauté plutôt qu’à deux.',
      joinOriginNote:
        'Sur JoinOrigin, chaque groupe a un salon dès la publication — la surface persistante qui tient ensemble les parties en ligne et en présentiel. Configurez un salon partagé que les deux publics peuvent rejoindre.',
    },
    {
      title: 'Choisissez un outil vidéo fiable et un document partagé',
      body: 'Gardez la pile minimale : un lien d’appel vidéo pour les membres à distance, un document pour les notes et les liens partagés, et une entrée de calendrier. La complexité est l’ennemie des rassemblements hybrides réguliers.',
      joinOriginNote:
        'JoinOrigin ne fournit pas d’outillage d’événements — gardez la pile minimale. La plateforme est le salon persistant où le lien et le document vivent, pas l’outil d’événement lui-même.',
    },
    {
      title: 'Concevez l’ordre du jour pour deux publics',
      body: 'Faites un tour de présentation qui inclut les membres à distance par leur nom, gardez les visuels sur un écran partagé et laissez de la place au côté en ligne pour parler. Un ordre du jour hybride nomme explicitement les deux publics.',
      joinOriginNote:
        'Sur JoinOrigin, les deux publics partagent un seul salon communautaire, ce qui rend « concevoir pour deux publics » naturel. Nommez explicitement les deux publics dans l’ordre du jour.',
    },
    {
      title: 'Désignez une personne-pont',
      body: 'Une personne surveille le côté distant : accueille les retardataires, donne la parole aux mains levées à distance et relaie ce que le lieu ne capte pas. Sans pont, le public en ligne devient spectateur.',
      joinOriginNote:
        'JoinOrigin n’organise pas les événements — la personne-pont est un rôle humain. La plateforme garde la communauté organisée dans un salon pour que le pont ait un seul endroit pour voir qui a rejoint et ce qui a été partagé.',
    },
    {
      title: 'Gérez l’espace pour que les deux côtés participent',
      body: 'Demandez aux membres en présentiel de parler un à la fois et de répéter les questions pour le micro, placez les gens près de la caméra et alternez les tours entre le lieu et l’appel — le salon partagé restant ouvert pour les deux.',
      joinOriginNote:
        'JoinOrigin est conçu autour d’une connexion égale entre les membres — le même principe qui fait fonctionner la discussion hybride. Alternez les tours entre le lieu et l’appel et répétez les questions pour le micro.',
    },
    {
      title: 'Gardez le salon vivant entre les rassemblements',
      body: 'La communauté vit dans le salon entre les événements : les membres distants et locaux partagent des mises à jour, posent des questions et planifient ensemble là-bas. L’hybride n’est pas un format d’événement — c’est un espace partagé continu.',
      joinOriginNote:
        'C’est l’étape la plus proche de l’intention de conception de JoinOrigin : un système d’exploitation communautaire est un salon persistant où les membres distants et locaux partagent des mises à jour et planifient ensemble. Un salon partagé fonctionne — JoinOrigin est cet espace.',
    },
    {
      title: 'Capturez et partagez le résultat dans le salon',
      body: 'Publiez les notes, enregistrements et prochaines étapes dans le salon partagé après chaque rassemblement. Un artefact visible garde les deux publics connectés et donne à la communauté le sentiment d’être productive.',
      joinOriginNote:
        'Sur JoinOrigin, le résultat d’une communauté vit dans un salon organisé — notes, enregistrements, prochaines étapes. Publiez-les dans le salon partagé après chaque rassemblement.',
    },
  ],
};

export default content;
