import type { CountryContent } from '../../types';

/**
 * Contenu de la France — traduction française (fichier de contenu par
 * langue).
 *
 * Texte de la page pays `fr` de la France sur `/fr/location/france`.
 * Le texte vit ICI, jamais dans les JSON de langue (localisation R2/R5).
 * `title`/`description` portent les titres/descriptions SEO en français.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'fr',
  slug: 'france',
  title: 'Communautés en France | JoinOrigin',
  description:
    'Trouvez ou créez des communautés en France — des scènes startup de Paris aux associations, cafés et réseaux de petites entreprises. Liste d’attente JoinOrigin.',
  intro:
    'La France organise la vie communautaire autour d’un mélange singulier d’institutions formelles et de sociabilité quotidienne. Les associations loi 1901 — le statut associatif à but non lucratif du pays — rendent remarquablement simple la création d’un groupe avec un objectif, des clubs de sport aux collectifs culturels, et des millions de Français appartiennent à au moins une association. Le café et la terrasse restent les lieux par défaut où amis, voisins et collègues se retrouvent, tandis que la boulangerie, le marché et la mairie ancrent la vie de village et de quartier. Paris concentre les scènes professionnelles les plus visibles du pays — les startups dans les districts d’innovation du Grand Paris, les communautés créatives du Marais et de Belleville, et les groupes citoyens autour des conseils de quartier. Les métropoles régionales comme Lyon, Marseille, Bordeaux et Toulouse portent des identités locales fortes, avec leurs universités, espaces de coworking et écosystèmes associatifs. Les bibliothèques publiques, les maisons de quartier et les lieux culturels accueillent des milliers de rencontres chaque mois, et la forte tradition étatique du pays offre des canaux clairs à la participation citoyenne. Créer une communauté en France est simple sur le papier et chaleureux en pratique — le modèle associatif donne la structure, et la culture sociale donne le public.',
  dataPoints: [
    'Population d’environ 67 millions, outre-mer inclus.',
    'Le français est la langue principale, avec le breton, le corse et l’occitan parmi les langues régionales.',
    'La capitale est Paris; Lyon, Marseille et Toulouse sont de grands pôles régionaux.',
    'Le statut d’association loi 1901 rend simple la création d’un groupe déclaré.',
  ],
  faq: [
    {
      question: 'Comment trouver des communautés en France ?',
      answer:
        'Utilisez le hub /location pour choisir une ville, puis explorez les pages de types de groupe : startups, créatives, politiques, rencontres et petites entreprises. Les associations locales et les maisons de quartier sont aussi d’excellents points de départ hors ligne.',
    },
    {
      question: 'Qu’est-ce qu’une association loi 1901 et en ai-je besoin ?',
      answer:
        'C’est le statut associatif standard en France — deux personnes et une déclaration d’objet suffisent pour se déclarer. Beaucoup de communautés fonctionnent d’abord de manière informelle et se formalisent plus tard pour ouvrir un compte bancaire ou réserver une salle.',
    },
    {
      question: 'JoinOrigin opère-t-il en France ?',
      answer:
        'Oui. JoinOrigin n’a pas de bureaux locaux. Les pages France et Paris sont traduites en français, et la plateforme aide les gens à trouver ou créer des communautés partout dans le pays.',
    },
  ],
};

export default content;
