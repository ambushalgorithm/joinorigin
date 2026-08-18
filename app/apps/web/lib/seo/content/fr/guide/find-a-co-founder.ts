import type { GuideContent } from '../../types';

/**
 * « Comment trouver un cofondateur » — guide intemporel L1 (design §6.1,
 * TASK-326).
 *
 * Traduction française du contenu EN. Recentré sur le modèle numérique
 * connecter→rejoindre→salon : une page d'idée est publiée, son salon est
 * auto-créé, et les conversations de cofondation se déroulent dans ce salon.
 * JoinOrigin n'est pas un service de mise en relation et ne fait pas
 * d'appariement de fondateurs. « Salon » désigne le salon Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'find-a-co-founder',
  title: 'Comment trouver un cofondateur : où chercher et quoi demander | JoinOrigin',
  description:
    'Trouvez un cofondateur qui complète vos compétences — que vous lanciez ou fassiez grandir une entreprise existante, publiez une page d’idée, rencontrez des gens dans les communautés et leurs salons, menez un projet d’essai et posez les questions qui évitent les ruptures. De JoinOrigin.',
  intro: [
    'Trouver un cofondateur est une décision de relation déguisée en décision d’embauche, et au fond, c’est un autre problème de mise en relation : la bonne personne est souvent à une présentation chaleureuse près, quelque part dans une communauté que vous n’avez pas encore découverte. C’est le problème que JoinOrigin aide à résoudre — et c’est le même problème que vous en soyez encore au stade de l’idée ou que vous dirigiez une entreprise existante qui a besoin d’un partenaire pour franchir l’étape suivante.',
    'JoinOrigin est un système d’exploitation communautaire construit autour de la boucle numérique connecter→rejoindre→salon : vous publiez une idée, son salon est auto-créé, et les personnes qui partagent l’idée peuvent rejoindre et discuter dans ce salon. La page d’idée est la promesse publique et le salon est l’endroit où les conversations de cofondation ont réellement lieu — un salon Matrix contrôlé par le créateur où les personnes intéressées peuvent poser des questions, partager des notes et tester la compatibilité avant que quiconque s’engage. JoinOrigin n’est pas un service de mise en relation, il ne fait pas d’appariement de fondateurs et n’a pas de bureaux locaux. La valeur de la plateforme — connecter des personnes autour d’intérêts partagés — correspond directement à la façon dont la plupart des fondateurs trouvent réellement leur cofondateur : par les communautés, les salons et les présentations chaleureuses.',
    'Ce guide aborde la recherche comme on aborderait la construction d’une communauté : partez de votre réseau existant, publiez une idée que les gens peuvent trouver, élargissez délibérément à travers les communautés et leurs salons, évaluez les candidats avec des conversations structurées et un projet d’essai, et convenez des fondamentaux avant de vous engager sur quoi que ce soit de juridique. Les étapes sont pratiques et honnêtes, et chacune montre où JoinOrigin aide.',
  ],
  dataPoints: [
    'Les présentations chaleureuses et le travail partagé produisent les relations de cofondation les plus durables.',
    'Une page d’idée publiée avec un salon donne aux personnes intéressées un endroit réel pour trouver l’idée et lancer une conversation.',
    'Un court projet d’essai — un prototype, une page d’atterrissage ou un pilote payant — teste les styles de travail plus vite que les entretiens.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver des communautés et des collaborateurs ; ce n’est pas un service de mise en relation et il n’a pas de bureaux locaux.',
  ],
  faq: [
    {
      question: 'Où la plupart des gens trouvent-ils leur cofondateur ?',
      answer:
        'La plupart des fondateurs se rencontrent par des réseaux chaleureux — événements, communautés, salons et présentations de personnes de confiance. Publier une idée que les gens peuvent trouver, puis se montrer régulièrement dans les mêmes communautés et leurs salons, est le moyen le plus fiable de rencontrer des cofondateurs potentiels.',
    },
    {
      question: 'Comment savoir si quelqu’un est un bon cofondateur ?',
      answer:
        'Menez un petit projet d’essai ensemble et soyez attentif à trois choses : des compétences complémentaires, une tolérance au risque similaire et une communication honnête sous pression. Le projet d’essai révèle les trois plus vite que n’importe quelle conversation.',
    },
    {
      question: 'De quoi devrions-nous convenir avant de commencer ?',
      answer:
        'Parlez des rôles, de l’engagement en temps, du partage du capital, de l’acquisition des droits, de la prise de décision et de ce qui se passe si quelqu’un veut partir. Mettre ces sujets sur la table tôt évite les désaccords qui détruisent la plupart des premières équipes.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à trouver un cofondateur ?',
      answer:
        'JoinOrigin aide les personnes à trouver des communautés et des collaborateurs — y compris le genre de communautés où les fondateurs se rencontrent — avec une page d’idée et un salon où les conversations peuvent avoir lieu. JoinOrigin ne fait pas d’appariement de fondateurs, alors le réseautage et le projet d’essai décrits dans ce guide sont votre chemin le plus fiable.',
    },
  ],
  sections: [
    'Cartographiez d’abord vos lacunes de compétences. Écrivez ce dans quoi vous êtes vraiment bon et ce dont l’entreprise a besoin que vous ne soyez pas. Un cofondateur doit combler votre plus grande lacune — technique, commerciale ou opérationnelle — et non dupliquer vos forces. JoinOrigin est construit autour de profils, d’idées et de communautés, pas d’appariement — donc le conseil honnête est le même que toujours : sachez quelle lacune vous devez combler avant de chercher. Écrivez vos forces et les besoins de l’entreprise.',
    'Publiez votre idée et ouvrez son salon. Une idée que personne ne peut trouver n’attire aucun cofondateur. Publiez une page d’idée claire — ce que vous construisez, pourquoi, et le genre de personne dont vous avez besoin — et laissez son salon être auto-créé pour que les personnes intéressées aient un endroit pour discuter. Publier une idée sur JoinOrigin auto-crée son salon, l’endroit où les conversations de cofondation ont lieu. Publiez votre idée quelque part de public et ouvrez un salon pour en discuter.',
    'Activez votre réseau existant pour des présentations chaleureuses. Dites à cinq personnes de confiance ce que vous construisez et le genre de cofondateur dont vous avez besoin. Demandez à chacune un nom. Les présentations chaleureuses battent la démarche à froid dans presque tous les cas. JoinOrigin rend les communautés découvrables, ce qui élargit votre réseau chaleureux au fil du temps — et chaque présentation peut mener à un salon où la vraie conversation a lieu. Dites à cinq personnes de confiance exactement quel genre de cofondateur vous cherchez.',
    'Montrez-vous régulièrement dans les communautés pertinentes et leurs salons. Assistez aux événements et rejoignez des groupes où se rassemblent les bonnes personnes : meetups de fondateurs, communautés sectorielles, espaces de coworking et salons en ligne. La répétition construit la confiance qui mène aux présentations. JoinOrigin aide les personnes à trouver les communautés qui correspondent à leurs objectifs — le genre d’endroit où les fondateurs se rencontrent — et à rejoindre leurs salons. Choisissez les meetups et salons où les bonnes personnes se rassemblent déjà et continuez à vous y montrer.',
    'Ayez des premières conversations structurées. Interrogez-les sur leurs compétences, leur tolérance au risque, leur engagement en temps et pourquoi ils veulent lancer ou faire grandir quelque chose. Partagez vos propres réponses. C’est un entretien mutuel, pas un pitch. JoinOrigin ne fait pas d’appariement de fondateurs et ne mène pas les conversations — l’entretien mutuel vous appartient. La plateforme vous place dans les mêmes communautés et salons que les collaborateurs potentiels — le reste vous appartient.',
    'Menez un projet d’essai ensemble. Choisissez quelque chose de petit et de réel — un prototype, une page d’atterrissage ou un pilote payant — et travaillez-y pendant quatre à six semaines. Observez comment vous répartissez le travail, gérez les retours et vous comportez sous pression. JoinOrigin donne aux communautés un salon partagé pour leur travail et leurs projets — un endroit naturel pour qu’un projet d’essai émerge. Un petit prototype réel est le test le plus fiable.',
    'Décidez sur la base de l’essai, pas du potentiel. Demandez-vous si vous confieriez votre réputation à cette personne, si elle communique honnêtement et si travailler ensemble vous dynamise. Si l’essai a semblé tendu, faites confiance à ce signal. JoinOrigin ne prend pas la décision à votre place. Sa valeur honnête est le contexte de communauté et de salon qui vous permet de rencontrer et de travailler avec des candidats — l’essai, lui, vous dit la vérité.',
    'Convenez des fondamentaux avant de vous engager. Écrivez les rôles, l’engagement en temps, le partage du capital, l’acquisition des droits et les règles de prise de décision. Même un accord simple d’une page évite la plupart des malentendus précoces. JoinOrigin est un système d’exploitation communautaire — un espace organisé où les accords, les rôles et les notes de projet peuvent vivre aux côtés du salon de l’idée. Même un accord écrit d’une page évite la plupart des malentendus précoces.',
  ],
  steps: [
    {
      title: 'Cartographiez d’abord vos lacunes de compétences',
      body: 'Écrivez ce dans quoi vous êtes vraiment bon et ce dont l’entreprise a besoin que vous ne soyez pas. Un cofondateur doit combler votre plus grande lacune — technique, commerciale ou opérationnelle — et non dupliquer vos forces.',
      joinOriginNote:
        'JoinOrigin est construit autour de profils, d’idées et de communautés, pas d’appariement — donc le conseil honnête est le même que toujours : sachez quelle lacune vous devez combler avant de chercher. Écrivez vos forces et les besoins de l’entreprise.',
    },
    {
      title: 'Publiez votre idée et ouvrez son salon',
      body: 'Une idée que personne ne peut trouver n’attire aucun cofondateur. Publiez une page d’idée claire — ce que vous construisez, pourquoi, et le genre de personne dont vous avez besoin — et laissez son salon être auto-créé pour que les personnes intéressées aient un endroit pour discuter.',
      joinOriginNote:
        'Publier une idée sur JoinOrigin auto-crée son salon, l’endroit où les conversations de cofondation ont lieu. Publiez votre idée quelque part de public et ouvrez un salon pour en discuter.',
    },
    {
      title: 'Activez votre réseau existant pour des présentations chaleureuses',
      body: 'Dites à cinq personnes de confiance ce que vous construisez et le genre de cofondateur dont vous avez besoin. Demandez à chacune un nom. Les présentations chaleureuses battent la démarche à froid dans presque tous les cas.',
      joinOriginNote:
        'JoinOrigin rend les communautés découvrables, ce qui élargit votre réseau chaleureux au fil du temps — et chaque présentation peut mener à un salon où la vraie conversation a lieu. Dites à cinq personnes de confiance exactement quel genre de cofondateur vous cherchez.',
    },
    {
      title: 'Montrez-vous régulièrement dans les communautés pertinentes et leurs salons',
      body: 'Assistez aux événements et rejoignez des groupes où se rassemblent les bonnes personnes : meetups de fondateurs, communautés sectorielles, espaces de coworking et salons en ligne. La répétition construit la confiance qui mène aux présentations.',
      joinOriginNote:
        'JoinOrigin aide les personnes à trouver les communautés qui correspondent à leurs objectifs — le genre d’endroit où les fondateurs se rencontrent — et à rejoindre leurs salons. Choisissez les meetups et salons où les bonnes personnes se rassemblent déjà et continuez à vous y montrer.',
    },
    {
      title: 'Ayez des premières conversations structurées',
      body: 'Interrogez-les sur leurs compétences, leur tolérance au risque, leur engagement en temps et pourquoi ils veulent lancer ou faire grandir quelque chose. Partagez vos propres réponses. C’est un entretien mutuel, pas un pitch.',
      joinOriginNote:
        'JoinOrigin ne fait pas d’appariement de fondateurs et ne mène pas les conversations — l’entretien mutuel vous appartient. La plateforme vous place dans les mêmes communautés et salons que les collaborateurs potentiels — le reste vous appartient.',
    },
    {
      title: 'Menez un projet d’essai ensemble',
      body: 'Choisissez quelque chose de petit et de réel — un prototype, une page d’atterrissage ou un pilote payant — et travaillez-y pendant quatre à six semaines. Observez comment vous répartissez le travail, gérez les retours et vous comportez sous pression.',
      joinOriginNote:
        'JoinOrigin donne aux communautés un salon partagé pour leur travail et leurs projets — un endroit naturel pour qu’un projet d’essai émerge. Un petit prototype réel est le test le plus fiable.',
    },
    {
      title: 'Décidez sur la base de l’essai, pas du potentiel',
      body: 'Demandez-vous si vous confieriez votre réputation à cette personne, si elle communique honnêtement et si travailler ensemble vous dynamise. Si l’essai a semblé tendu, faites confiance à ce signal.',
      joinOriginNote:
        'JoinOrigin ne prend pas la décision à votre place. Sa valeur honnête est le contexte de communauté et de salon qui vous permet de rencontrer et de travailler avec des candidats — l’essai, lui, vous dit la vérité.',
    },
    {
      title: 'Convenez des fondamentaux avant de vous engager',
      body: 'Écrivez les rôles, l’engagement en temps, le partage du capital, l’acquisition des droits et les règles de prise de décision. Même un accord simple d’une page évite la plupart des malentendus précoces.',
      joinOriginNote:
        'JoinOrigin est un système d’exploitation communautaire — un espace organisé où les accords, les rôles et les notes de projet peuvent vivre aux côtés du salon de l’idée. Même un accord écrit d’une page évite la plupart des malentendus précoces.',
    },
  ],
};

export default content;
