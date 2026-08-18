import type { GuideContent } from '../../types';

/**
 * « Modération de communauté » — guide intemporel L1 (design §6.1, TASK-326).
 *
 * Traduction française du contenu EN. Recentré sur le modèle numérique
 * connecter→rejoindre→salon : le contrôle du créateur EST la propriété d'un
 * salon Matrix — inviter/retirer des membres, attribuer des rôles, modifier
 * les réglages du salon, épingler des messages, archiver le salon — appliquée
 * nativement dans Element. JoinOrigin ne modère pas les communautés tierces
 * et ne fournit pas de personnel de modération. « Salon » désigne le salon
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'fr',
  slug: 'moderation',
  title: 'Modération de communauté : comment garder des groupes sains et accueillants | JoinOrigin',
  description:
    'Modérez une communauté avec des règles claires, une action précoce et la désescalade — que vous configuriez un tout nouveau groupe ou répariez la culture d’un groupe établi, le contrôle du créateur est la propriété du salon Matrix, avec des rôles appliqués dans Element. Étapes pratiques de JoinOrigin.',
  intro: [
    'Toute communauté qui grandit finira par affronter un moment qui met sa culture à l’épreuve — une dispute animée, un spammeur, un membre qui met les autres mal à l’aise, ou un malentendu qui dégénère. La modération est la pratique qui protège l’espace pour que la communauté puisse rester accueillante, et elle ne devient nécessaire que parce que les communautés sont faites de personnes qui se connectent entre elles. Cette connexion est le problème central que JoinOrigin aide à résoudre — et les pratiques s’appliquent aussi bien à une communauté établie qui répare sa culture qu’à un nouveau groupe qui définit les attentes avant l’arrivée du premier membre.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver, créer et organiser des communautés — et dans son modèle numérique, une communauté vit dans un salon contrôlé par le créateur. Le contrôle du créateur est la propriété standard d’un salon Matrix : le créateur peut inviter et retirer des membres, attribuer des rôles, modifier les réglages du salon, épingler des messages et archiver le salon — le tout appliqué nativement dans Element, le client de messagerie par défaut, sans système d’autorisation personnalisé. Cette propriété est l’épine dorsale de la modération sur JoinOrigin : le créateur décide qui appartient, quelles sont les règles et ce qui se passe quand une règle est enfreinte. JoinOrigin ne modère pas les communautés tierces et ne fournit pas de personnel de modération. La plateforme est conçue autour d’une structure communautaire saine, et les pratiques de ce guide sont les pratiques humaines dont tout organisateur a besoin.',
    'Ce guide présente un système de modération pratique — que votre communauté soit toute nouvelle ou ait des années d’histoire à assainir : des règles communautaires écrites, courtes et spécifiques, un chemin d’application clair avec des avertissements avant les exclusions, des techniques pour désamorcer les situations tendues et des conseils honnêtes sur le moment d’impliquer les membres et le moment d’agir seul. Chaque étape montre où JoinOrigin aide.',
  ],
  dataPoints: [
    'Des règles communautaires claires et écrites réduisent les conflits en définissant les attentes avant que les incidents ne surviennent.',
    'Le contrôle du créateur sur JoinOrigin est la propriété du salon Matrix : inviter/retirer, rôles, réglages, épingler, archiver.',
    'Un chemin d’application par étapes — avertir, puis limiter, puis retirer — est plus juste et plus facile à défendre que des bannissements instantanés.',
    'JoinOrigin est un système d’exploitation communautaire conçu pour aider les personnes à trouver, créer et organiser des communautés ; il ne modère pas les communautés tierces et ne fournit pas de personnel de modération.',
  ],
  faq: [
    {
      question: 'Les petites communautés ont-elles vraiment besoin de règles de modération ?',
      answer:
        'Oui, et le plus tôt sera le mieux. Deux ou trois règles courtes écrites avant qu’un conflit ne survienne sont bien plus faciles à appliquer que des règles inventées après coup. Les petites communautés ont moins d’incidents, mais ceux qu’elles ont sont tout aussi douloureux.',
    },
    {
      question: 'Les modérateurs devraient-ils agir publiquement ou en privé ?',
      answer:
        'En privé d’abord. Approchez la personne en tête-à-tête, reformulez la règle et l’impact, et donnez-lui une chance de s’ajuster. Les rappels publics ont tendance à faire monter la tension. Gardez un registre public des règles, mais appliquez-les en privé — dans un message direct ou un salon privé.',
    },
    {
      question: 'Quand devrais-je retirer quelqu’un de la communauté ?',
      answer:
        'Après que des avertissements clairs n’ont pas fonctionné, ou immédiatement pour des comportements qui mettent les membres en danger — harcèlement, menaces ou doxxing. Le test est de savoir si la personne rend activement l’espace dangereux pour les autres. Sur JoinOrigin, le retrait consiste pour le propriétaire du salon à retirer un membre du salon.',
    },
    {
      question: 'JoinOrigin peut-il m’aider à modérer ma communauté ?',
      answer:
        'Oui. JoinOrigin est un système d’exploitation communautaire où le contrôle du créateur est la propriété du salon Matrix — inviter/retirer, rôles, réglages, épingler et archiver, appliqués dans Element. JoinOrigin ne modère pas les communautés, donc les pratiques de ce guide — règles claires, application par étapes, désescalade calme — vous appartiennent de mettre en œuvre.',
    },
  ],
  sections: [
    'Écrivez trois à cinq règles claires. Gardez-les courtes, précises et positives : « Soyez respectueux », « Restez dans le sujet », « Pas de spam ni d’autopromotion », « Désaccord sur les idées, pas sur les personnes ». Publiez-les là où chaque nouveau membre les verra — idéalement épinglées dans le salon. Sur JoinOrigin, les règles et valeurs d’une communauté sont visibles dans son salon dès le premier jour — les nouveaux membres les voient avant de rejoindre. Épinglez vos courtes règles là où chaque nouveau membre les verra.',
    'Donnez le ton en tant que propriétaire du salon. Incarnez le comportement que vous voulez — accueillez les nouveaux venus, remerciez les contributeurs et traitez les problèmes calmement. L’exemple du créateur fixe le plancher culturel de la communauté. JoinOrigin ne fait pas la police des communautés — le ton est donné par les créateurs et les membres. La plateforme rend le comportement accueillant visible ; incarnez le comportement que vous voulez dans le salon.',
    'Possédez le salon comme le créateur que vous êtes. Le contrôle du créateur sur JoinOrigin est la propriété du salon Matrix : inviter et retirer des membres, attribuer des rôles, modifier les réglages du salon, épingler des messages et archiver le salon — appliqué nativement dans Element. Connaître ces commandes est la moitié technique de la modération. JoinOrigin donne au créateur la pleine propriété du salon dès la publication, sans système d’autorisation personnalisé. Apprenez les commandes de modération de la plateforme que vous utilisez et désignez un propriétaire clair.',
    'Convenez d’un chemin d’application. Définissez une réponse par étapes : avertissement privé, puis limites (mis en sourdine, publication limitée — souvent un changement de rôle), puis retrait pour les violations répétées ou graves. Une escalade cohérente est plus juste que l’improvisation. Sur JoinOrigin, les rôles sont des rôles Matrix standards dans Element — mise en sourdine, bannissement et attribution de rôles sont des actions natives. Écrivez le chemin d’application et tenez-vous-y.',
    'Agissez tôt et calmement. Traitez le premier signe d’un problème en privé, avant qu’il ne devienne un incident public. Une intervention précoce et calme est la modération la moins chère qui soit. JoinOrigin ne modère pas à votre place — l’intervention précoce et calme est une compétence humaine. La plateforme est conçue pour que les problèmes remontent visiblement dans le salon et soient détectés tôt. Approchez la personne en privé au premier signe.',
    'Apprenez les techniques de désescalade. Quand les tensions montent, ralentissez la conversation : reconnaissez l’émotion, reformulez le désaccord de manière neutre, demandez le point sous-jacent et suggérez une pause ou un salon privé pour la chaleur. JoinOrigin garde les interactions communautaires organisées et calmes par conception, mais la désescalade reste un métier humain. Ralentissez la conversation et déplacez la chaleur dans un salon privé.',
    'Tenez un registre des incidents importants. Notez ce qui s’est passé, ce que vous avez fait et pourquoi. Un journal simple vous aide à rester cohérent, à apprendre des schémas et à défendre vos décisions quand un membre demande pourquoi. JoinOrigin est un système d’exploitation communautaire où l’histoire de la communauté vit au même endroit — un foyer naturel pour un journal d’incidents. Une simple note de ce qui s’est passé et pourquoi vous garde cohérent.',
    'Partagez la charge avec des co-modérateurs. Recrutez un ou deux membres de confiance et convenez des règles d’application. Une communauté qui dépend d’un seul modérateur devient fragile et partiale. JoinOrigin ne fournit pas de personnel de modération — les co-modérateurs sont des membres comme les autres. Les créateurs attribuent des rôles aux co-modérateurs dans Element — des rôles Matrix natifs, sans système personnalisé. Recrutez un ou deux membres de confiance et donnez-leur des rôles clairs.',
  ],
  steps: [
    {
      title: 'Écrivez trois à cinq règles claires',
      body: 'Gardez-les courtes, précises et positives : « Soyez respectueux », « Restez dans le sujet », « Pas de spam ni d’autopromotion », « Désaccord sur les idées, pas sur les personnes ». Publiez-les là où chaque nouveau membre les verra — idéalement épinglées dans le salon.',
      joinOriginNote:
        'Sur JoinOrigin, les règles et valeurs d’une communauté sont visibles dans son salon dès le premier jour — les nouveaux membres les voient avant de rejoindre. Épinglez vos courtes règles là où chaque nouveau membre les verra.',
    },
    {
      title: 'Donnez le ton en tant que propriétaire du salon',
      body: 'Incarnez le comportement que vous voulez — accueillez les nouveaux venus, remerciez les contributeurs et traitez les problèmes calmement. L’exemple du créateur fixe le plancher culturel de la communauté.',
      joinOriginNote:
        'JoinOrigin ne fait pas la police des communautés — le ton est donné par les créateurs et les membres. La plateforme rend le comportement accueillant visible ; incarnez le comportement que vous voulez dans le salon.',
    },
    {
      title: 'Possédez le salon comme le créateur que vous êtes',
      body: 'Le contrôle du créateur sur JoinOrigin est la propriété du salon Matrix : inviter et retirer des membres, attribuer des rôles, modifier les réglages du salon, épingler des messages et archiver le salon — appliqué nativement dans Element. Connaître ces commandes est la moitié technique de la modération.',
      joinOriginNote:
        'JoinOrigin donne au créateur la pleine propriété du salon dès la publication, sans système d’autorisation personnalisé. Apprenez les commandes de modération de la plateforme que vous utilisez et désignez un propriétaire clair.',
    },
    {
      title: 'Convenez d’un chemin d’application',
      body: 'Définissez une réponse par étapes : avertissement privé, puis limites (mis en sourdine, publication limitée — souvent un changement de rôle), puis retrait pour les violations répétées ou graves. Une escalade cohérente est plus juste que l’improvisation.',
      joinOriginNote:
        'Sur JoinOrigin, les rôles sont des rôles Matrix standards dans Element — mise en sourdine, bannissement et attribution de rôles sont des actions natives. Écrivez le chemin d’application et tenez-vous-y.',
    },
    {
      title: 'Agissez tôt et calmement',
      body: 'Traitez le premier signe d’un problème en privé, avant qu’il ne devienne un incident public. Une intervention précoce et calme est la modération la moins chère qui soit.',
      joinOriginNote:
        'JoinOrigin ne modère pas à votre place — l’intervention précoce et calme est une compétence humaine. La plateforme est conçue pour que les problèmes remontent visiblement dans le salon et soient détectés tôt. Approchez la personne en privé au premier signe.',
    },
    {
      title: 'Apprenez les techniques de désescalade',
      body: 'Quand les tensions montent, ralentissez la conversation : reconnaissez l’émotion, reformulez le désaccord de manière neutre, demandez le point sous-jacent et suggérez une pause ou un salon privé pour la chaleur.',
      joinOriginNote:
        'JoinOrigin garde les interactions communautaires organisées et calmes par conception, mais la désescalade reste un métier humain. Ralentissez la conversation et déplacez la chaleur dans un salon privé.',
    },
    {
      title: 'Tenez un registre des incidents importants',
      body: 'Notez ce qui s’est passé, ce que vous avez fait et pourquoi. Un journal simple vous aide à rester cohérent, à apprendre des schémas et à défendre vos décisions quand un membre demande pourquoi.',
      joinOriginNote:
        'JoinOrigin est un système d’exploitation communautaire où l’histoire de la communauté vit au même endroit — un foyer naturel pour un journal d’incidents. Une simple note de ce qui s’est passé et pourquoi vous garde cohérent.',
    },
    {
      title: 'Partagez la charge avec des co-modérateurs',
      body: 'Recrutez un ou deux membres de confiance et convenez des règles d’application. Une communauté qui dépend d’un seul modérateur devient fragile et partiale.',
      joinOriginNote:
        'JoinOrigin ne fournit pas de personnel de modération — les co-modérateurs sont des membres comme les autres. Les créateurs attribuent des rôles aux co-modérateurs dans Element — des rôles Matrix natifs, sans système personnalisé. Recrutez un ou deux membres de confiance et donnez-leur des rôles clairs.',
    },
  ],
};

export default content;
