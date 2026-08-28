import type { RegionContent } from '../../types';

/**
 * Contenu de l’Île-de-France — traduction française (fichier de contenu
 * par langue).
 *
 * Texte de la page région `fr` de l’Île-de-France sur
 * `/fr/location/france/ile-de-france`.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'fr',
  slug: 'ile-de-france',
  title: 'Origins en Île-de-France | JoinOrigin',
  description:
    'Trouvez ou créez des Origins en Île-de-France — des scènes startup et créatives de Paris aux départements voisins. Liste d’attente JoinOrigin.',
  intro:
    'L’Île-de-France est la région française qui contient Paris et ses départements environnants, et c’est de loin la partie la plus densément peuplée du pays. La région concentre la vie économique, politique et culturelle de la France : la plupart des grandes entreprises, universités et institutions culturelles se trouvent dans ses limites, ce qui en fait le foyer naturel des communautés professionnelles les plus denses du pays. Paris elle-même ancre les scènes startup, créatives et citoyennes, tandis que la proche banlieue — Hauts-de-Seine, Seine-Saint-Denis et Val-de-Marne — accueille ses propres communautés dynamiques, souvent liées aux universités, aux quartiers d’affaires comme La Défense et à de fortes identités locales. Le réseau de transports publics de la région, y compris le RER et le Métro, relie l’ensemble du territoire, de sorte qu’une communauté ancrée dans le centre de Paris peut attirer des membres de toute la région. Les associations loi 1901 sont partout en Île-de-France, des groupes de quartier de la banlieue aux réseaux professionnels de la ville. L’échelle de la région peut sembler écrasante, mais elle signifie aussi que quel que soit votre intérêt — technologie, design, politique, sport, petite entreprise — il y a presque certainement un Origin à proximité, ou un chemin clair pour en créer un.',
  dataPoints: [
    'L’Île-de-France compte environ 12,2 millions d’habitants.',
    'Contient Paris et les départements voisins (Hauts-de-Seine, Seine-Saint-Denis, etc.).',
    'Le centre économique, politique et culturel de la France.',
    'Le réseau dense de RER et de Métro relie toute la région.',
  ],
  faq: [
    {
      question: 'L’Île-de-France est-elle différente de la scène parisienne ?',
      answer:
        'Oui. L’Île-de-France est la région élargie — Paris et sa banlieue. La plupart des communautés nationales se réunissent dans le centre de Paris, mais la banlieue a ses propres scènes locales dynamiques, et les transports rendent les deux accessibles.',
    },
    {
      question: 'Quelles parties de l’Île-de-France ont des communautés actives ?',
      answer:
        'Le centre de Paris est le pôle le plus dense ; La Défense ancre les réseaux d’affaires, et la proche banlieue a des associations de quartier, des communautés étudiantes et des groupes culturels actifs.',
    },
    {
      question: 'JoinOrigin opère-t-il en Île-de-France ?',
      answer:
        'Oui. JoinOrigin n’a pas de bureaux locaux. La page de la région Île-de-France est traduite en français, et la plateforme aide les gens à trouver ou créer des Origins partout dans la région.',
    },
  ],
};

export default content;
