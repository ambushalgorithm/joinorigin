import type { CityContent } from '../../types';

/**
 * Contenu Paris (traduction française) — page ville + 5 variantes + page
 * d'idées. Distinct de tous les autres fichiers de ville (G5 : aucune
 * réutilisation de modèle). Prose honnête et intemporelle ; aucun chiffre
 * inventé ni compte de membres.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'fr',
  slug: 'paris',
  pageTitles: {
    city: 'Communautés à Paris | JoinOrigin',
    cityDescription:
      'Trouvez ou créez des communautés à Paris — groupes startups, créatifs, politiques, meetups et petites entreprises dans toute la capitale. Liste d’attente JoinOrigin.',
    variants: {
      startup: 'Communautés de startups à Paris | JoinOrigin',
      creative: 'Communautés créatives à Paris | JoinOrigin',
      political: 'Communautés politiques et citoyennes à Paris | JoinOrigin',
      meetup: 'Meetups et communautés sociales à Paris | JoinOrigin',
      'small-business': 'Communautés de petites entreprises à Paris | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Trouvez ou créez des communautés de startups à Paris — fondateurs, ingénieurs et opérateurs autour de Station F, du Sentier et de La Défense. Liste d’attente JoinOrigin.',
      creative:
        'Trouvez ou créez des communautés créatives à Paris — ateliers, galeries et collectifs au Marais, à Belleville et autour du canal Saint-Martin. Liste d’attente JoinOrigin.',
      political:
        'Trouvez ou créez des communautés politiques et citoyennes à Paris — associations, conseils d’arrondissement et campagnes locales. Liste d’attente JoinOrigin.',
      meetup:
        'Trouvez ou créez des meetups et communautés sociales à Paris — apéros, tables de café, échanges linguistiques et rassemblements dans les parcs. Liste d’attente JoinOrigin.',
      'small-business':
        'Trouvez ou créez des communautés de petites entreprises à Paris — commerçants de marché, propriétaires de cafés et boutiques, et réseaux d’artisans. Liste d’attente JoinOrigin.',
    },
    ideas: '30 idées d’événements communautaires à Paris | JoinOrigin',
    ideasDescription:
      'Découvrez 30 idées d’événements communautaires à Paris — événements de réseautage, d’apprentissage, de plein air, professionnels, créatifs et à impact. Liste d’attente JoinOrigin.',
  },
  intro: [
    'Paris s’organise autour de l’arrondissement — vingt districts qui s’enroulent depuis la Seine comme une coquille d’escargot, chacun avec ses places, ses marchés et ses fidélités. Une communauté qui choisit un arrondissement et s’y montre chaque semaine devient rapidement un meuble du quartier. Les cafés, qui bordent presque chaque rue, servent de lieux de communauté informels où les groupes réclament une table comme les Berlinois réclament un Stammtisch.',
    'Les espaces publics de la ville — les berges de la Seine, le canal Saint-Martin, le parc des Buttes-Chaumont, les Tuileries et le jardin du Luxembourg — accueillent tout, des soirées cinéma en plein air aux échanges linguistiques et aux groupes de course. Des universités comme la Sorbonne, Sciences Po et l’École Polytechnique alimentent un flux constant d’étudiants, tandis que la région parisienne élargie, avec ses banlieues et son quartier d’affaires à La Défense, garde la ville connectée à un bassin de talents bien plus vaste.',
    'On dit souvent des Parisiens qu’ils sont difficiles à conquérir, mais c’est précisément ce qui rend les communautés précieuses ici : une fois qu’un groupe gagne des habitués, ceux-ci restent pendant des années. Les nouveaux venus patients, ouverts au bilinguisme et réguliers découvriront une ville remarquablement ouverte.',
  ],
  dataPoints: [
    'Environ 2,1 millions d’habitants dans Paris intramuros ; capitale de la France.',
    'Vingt arrondissements, chacun avec une identité communautaire distincte.',
    'Universités : la Sorbonne, Sciences Po et l’École Polytechnique.',
    'Ancrages publics : les berges de la Seine, le canal Saint-Martin et le jardin du Luxembourg.',
    'Forte culture du café et des associations — une base naturelle pour les meetups.',
    'Hôte de Station F et de La French Tech, le plus grand campus de start-ups d’Europe.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Salles et coins de rencontre de Station F',
        'Espaces de coworking du Sentier et du 10e arrondissement',
        'Salles d’incubateurs près de La Défense',
        'Cafés tech autour du canal Saint-Martin',
        'Salles d’entrepreneuriat des Grandes Écoles à l’École Polytechnique',
        'Halls de bureaux haussmanniens des 8e et 9e arrondissements',
      ],
      formats: [
        'Petits-déjeuners de fondateurs avec présentations rapides',
        'Soirées pitch et journées de démonstration à Station F',
        'Apéros sectoriels — fintech, IA, climat',
        'Hackathons et week-ends de construction',
        'Meetups de startups bilingues (français–anglais)',
      ],
      howToStart: [
        'Choisissez un vertical étroit — IA, climat, fintech ou marketplaces — et un nom anglophone.',
        'Réservez un créneau hebdomadaire récurrent dans un espace de coworking près de Station F ou du Sentier.',
        'Animez trois meetups ouverts, puis demandez à deux habitués de co-organiser et de fixer un rythme mensuel.',
      ],
    },
    creative: {
      venues: [
        'Ateliers et espaces de projet à Belleville et Ménilmontant',
        'Galeries du Marais et de la Bastille',
        'Ateliers d’artistes le long du canal Saint-Martin',
        'Salles d’ateliers des écoles de design — École des Arts Décoratifs',
        'Ateliers de mode dans le Sentier',
        'Salles de cinéma et de musique des 11e et 19e arrondissements',
      ],
      formats: [
        'Week-ends studios ouverts et soirées portfolios',
        'Visites de galeries avec discussions d’artistes',
        'Soirées de critique de design dans des ateliers collectifs',
        'Cercles de production musicale et soirées open-mic',
        'Revues par les pairs en mode et illustration',
      ],
      howToStart: [
        'Choisissez un métier, un arrondissement et une soirée régulière — la spécificité construit l’identité plus vite ici.',
        'Trouvez un atelier collectif à Belleville ou près du canal prêt à accueillir la première soirée.',
        'Animez une première séance studio ouverte, collectez les travaux en cours et faites du retour l’ordre du jour permanent.',
      ],
    },
    political: {
      venues: [
        'Salles de réunion des mairies d’arrondissement',
        'Sièges d’associations dans les vingt arrondissements',
        'Centres communautaires de quartier',
        'Espaces de meetups civic tech dans les 3e et 10e',
        'Bibliothèques publiques avec salles de réunion',
        'Jardins partagés et cours communes',
      ],
      formats: [
        'Assemblées d’associations de quartier',
        'Soirées d’information sur la loi sur le logement et les droits des locataires',
        'Séances de planification d’initiatives citoyennes',
        'Briefings bénévoles et séances de premier service',
        'Ateliers d’action climat et mobilité',
      ],
      howToStart: [
        'Choisissez un problème concret et un petit territoire — un pâté de maisons, un arrondissement ou une politique.',
        'Assistez d’abord à trois réunions d’associations existantes et faites équipe plutôt que de dupliquer le travail.',
        'Organisez une soirée d’information ouverte avec un organisateur réel comme co-animateur pour bâtir une base de confiance.',
      ],
    },
    meetup: {
      venues: [
        'Cafés avec arrière-salles dans les arrondissements',
        'Les berges de la Seine et du canal Saint-Martin',
        'Le parc des Buttes-Chaumont et le jardin du Luxembourg',
        'Bibliothèques publiques avec salles de réunion',
        'Bars à jeux dans les 10e et 11e',
        'Jardins partagés et cours communes',
      ],
      formats: [
        'Apéro hebdomadaire au même café',
        'Balades et balades à vélo le long de la Seine',
        'Tables d’échange linguistique (français–anglais)',
        'Soirées de jeux de société dans les bars à jeux',
        'Pique-niques et soirées cinéma en plein air dans les parcs',
      ],
      howToStart: [
        'Choisissez un format répétable — un apéro hebdomadaire, une balade mensuelle — et un lieu fixe.',
        'Choisissez un café, un parc ou un bar à jeux qui vous accueillera à chaque fois.',
        'Animez les trois premières séances au même endroit et au même moment, puis demandez aux habitués d’inviter chacun un nouveau venu.',
      ],
    },
    'small-business': {
      venues: [
        'Halles de marché — Marché d’Aligre, Marché des Enfants Rouges',
        'Tables de propriétaires de cafés dans les bistrots de quartier',
        'Passages couverts et galeries marchandes',
        'Salles de séminaire de la chambre de commerce',
        'Tapis de brasserie et boulangerie avec longues tables',
        'Étals de créateurs aux marchés aux puces',
      ],
      formats: [
        'Petits-déjeuners de propriétaires de quartier sans ordre du jour',
        'Séances de planification des commerçants de marché pour la saison',
        'Ateliers de la chambre sur la paperasse et la digitalisation',
        'Cercles d’achat groupé pour les fournitures',
        'Balades dans les passages et galeries marchandes',
      ],
      howToStart: [
        'Choisissez un arrondissement et un café qui nourrit déjà les commerçants locaux ; réclamez une table régulière.',
        'Animez d’abord un petit-déjeuner sans ordre du jour — les propriétaires viennent quand ils peuvent parler de loyers et de livraisons.',
        'Après trois petits-déjeuners, faites tourner un sujet pratique par mois et laissez les commerçants du marché passer le mot.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Paris a bâti l’un des écosystèmes de start-ups les plus visibles d’Europe autour de Station F, l’ancien entrepôt de fret géant qui abrite aujourd’hui des centaines de jeunes entreprises, et autour de La French Tech, un label national qui connecte les fondateurs aux mentors et aux marchés internationaux. Le quartier historique du textile, le Sentier, est devenu le cœur de la jeune scène tech, tandis que La Défense ancre l’innovation des grandes entreprises et que les Grandes Écoles fournissent un vivier profond d’ingénieurs et de diplômés en commerce. Les formats récurrents incluent les petits-déjeuners de fondateurs, les soirées pitch, les journées de démonstration et les apéros sectoriels où les équipes fintech, IA et climat comparent leurs notes autour d’un verre. L’anglais est de plus en plus courant dans les meetups, ce qui aide les fondateurs internationaux à s’intégrer avant que leur français ne s’améliore. Ce qui rend Paris distinct, c’est le mélange d’infrastructures soutenues par l’État — financements publics, incubateurs et événements — avec une forte culture du café qui garde la scène informelle. Lancer une communauté de startups ici fonctionne mieux avec un vertical étroit et un rythme régulier : une soirée mensuelle de builders IA ou une table de climate tech fédère plus vite qu’un groupe généraliste.',
    creative:
      'La vie créative parisienne est tissée dans les rues de la ville : ateliers à Belleville et Ménilmontant, galeries au Marais, studios de mode dans le Sentier et scènes de cinéma et de musique dans les 11e et 19e arrondissements. Le canal Saint-Martin est devenu une ligne de rassemblement pour artistes, designers et musiciens, tandis que des écoles comme l’École des Arts Décoratifs et les Beaux-Arts diplôment un flux régulier de créateurs dans une économie indépendante construite sur la collaboration. Les week-ends studios ouverts, les revues de portfolios, les visites de galeries et les soirées de critique de design sont les formats standards, et beaucoup de collectifs partagent non seulement l’espace mais aussi l’équipement — presses à imprimer, caméras, machines à coudre. L’échelle de la ville signifie que les communautés peuvent être aussi de niche qu’un groupe d’imprimeurs risographes ou aussi larges qu’un festival d’art de quartier. Lancer une communauté créative à Paris est réaliste : choisissez un métier, un arrondissement et une soirée régulière, et la densité de personnes curieuses et compétentes vous trouvera.',
    political:
      'Paris a une profonde tradition civique organisée à travers l’association loi 1901 — une forme juridique utilisée par des milliers de groupes de quartier, de sociétés culturelles et de projets bénévoles. Chacun des vingt arrondissements a sa propre mairie et son propre conseil, ce qui garde la politique locale accessible : les résidents peuvent assister aux séances du conseil, rejoindre des associations de quartier et influer sur les décisions concernant le logement, les écoles et l’espace public. Le logement est une préoccupation déterminante, et les groupes de locataires organisent des soirées d’information et des ateliers sur la loi sur les loyers ouverts aux nouveaux venus. Les activistes du climat et de la mobilité s’organisent autour des rues sans voiture, du vélo et du verdissement urbain, tandis que les bénévoles civic tech construisent des outils pour le budget participatif et les données de la ville. La culture récompense la persévérance : les Parisiens rejoignent un groupe par confiance, et la confiance se construit en se présentant aux vraies réunions pendant des mois. Lancer une communauté politique signifie choisir un problème concret et un petit territoire, puis s’associer aux associations existantes plutôt que de les dupliquer — le paysage est assez riche pour que la collaboration batte la concurrence.',
    meetup:
      'La scène meetup parisienne tourne autour du café, du banc de parc et de l’apéro — le verre du soir qui transforme les inconnus en habitués. Les groupes se rassemblent pour des échanges linguistiques, des clubs de lecture, des jeux de société, des balades photo et des séances de course le long de la Seine et du canal Saint-Martin. Le bar à jeux est un lieu typiquement parisien qui accueille des soirées jeux décontractées toute la semaine. Des parcs comme les Buttes-Chaumont et le Luxembourg se remplissent de pique-niques, de projections en plein air et de sports improvisés quand le temps est beau. Ce que remarquent les nouveaux venus, c’est le rituel : la même table au même café, le même banc, la même balade du samedi, répétés jusqu’à devenir une habitude. Les résidents internationaux animent de nombreux groupes anglophones ou bilingues, donc les nouveaux venus peuvent s’intégrer rapidement. Si vous voulez lancer un meetup, choisissez un format répétable et un lieu qui vous accueillera à chaque fois — un apéro hebdomadaire, une table linguistique mensuelle — et laissez la densité de Parisiens curieux faire le reste.',
    'small-business':
      'Les communautés de petites entreprises parisiennes sont ancrées par les marchés, les passages et les rues de quartier de la ville. Le Marché d’Aligre, le Marché des Enfants Rouges et les marchés couverts de chaque arrondissement ne sont pas seulement des destinations de shopping — ce sont des communautés soudées de commerçants qui partagent calendriers, fournisseurs et conseils. Les passages couverts, galeries marchandes couvertes du XIXe siècle, accueillent encore des artisans, des librairies et des cafés qui traitent leur couloir comme une entreprise partagée. Les bistrots et boulangeries forment leurs propres réseaux de propriétaires qui comparent leurs notes sur les loyers, les effectifs et la logistique de livraison. Les chambres de commerce et les groupes d’entreprises d’arrondissement proposent des ateliers sur la paperasse, la digitalisation et le financement, souvent en français et en anglais. Ce qui relie ces groupes, c’est le lieu : une halle de marché ou un passage est une communauté naturelle avec un intérêt collectif dans le flux de visiteurs. Lancer une communauté de petites entreprises est très réalisable : une table ronde mensuelle dans un café de quartier, avec des sujets tournants comme le loyer, la paie et la vente en ligne, attire fidèlement des propriétaires qui n’ont rarement de pairs avec qui parler.',
  },
  ideaPage: {
    intro:
      'Paris est une ville idéale pour tester de nouvelles idées d’événements communautaires : les cafés sont partout, les espaces publics sont généreux et la culture associative donne à chaque groupe une forme reconnue. Les trente idées ci-dessous sont regroupées en six catégories — réseautage, apprentissage, social et plein air, professionnel et sectoriel, créatif et maker, et impact et local. Chacune inclut à qui elle s’adresse, un pitch court et un type de lieu suggéré qui existe réellement à Paris, des arrière-salles de cafés et bars à jeux aux berges de la Seine et aux jardins partagés. Certaines idées fonctionnent comme événements ponctuels ; d’autres sont conçues pour devenir des communautés récurrentes avec un rythme d’apéro. La règle d’honnêteté est simple : chaque suggestion de lieu est un vrai type d’endroit dans cette ville, et chaque format est assez simple pour qu’un organisateur débutant le mène. Choisissez l’idée qui correspond à vos intérêts, trouvez un lieu qui vous accueillera et laissez la curiosité parisienne faire le reste.',
    categories: [
      {
        name: 'Réseautage',
        ideas: [
          {
            title: 'Apéro sur le canal',
            pitch:
              'Un verre hebdomadaire sur les quais du canal Saint-Martin où nouveaux venus et locaux échangent des conseils d’arrondissement.',
            audience: 'Nouveaux arrivants et amateurs de discussions décontractées',
            venueType: 'Un quai de café au bord du canal',
          },
          {
            title: 'Petit-déjeuner de fondateurs à Station F',
            pitch:
              'Un petit-déjeuner matinal où les fondateurs partagent les victoires et blocages de la semaine autour d’un café et de croissants.',
            audience: 'Fondateurs et opérateurs de la scène tech française',
            venueType: 'Un café près de Station F',
          },
          {
            title: 'Soirée d’amitié express',
            pitch:
              'Une soirée structurée de conversations de cinq minutes avec rotation, terminant par un dîner partagé.',
            audience: 'Toute personne qui veut rencontrer de nouvelles personnes',
            venueType: 'Une salle de centre social ou de café',
          },
          {
            title: 'Cercle des expatriés à Paris',
            pitch:
              'Les résidents internationaux partagent des conseils d’installation — paperasse, logement et où trouver leurs semblables.',
            audience: 'Expatriés de première année',
            venueType: 'Une salle associative ou de coworking',
          },
          {
            title: 'Club brunch des freelances',
            pitch:
              'Un brunch dominical mensuel où les freelances partagent pistes, tarifs et histoires de clients autour d’une longue table.',
            audience: 'Freelances de toutes disciplines',
            venueType: 'Un café du 11e arrondissement',
          },
        ],
      },
      {
        name: 'Apprentissage & ateliers',
        ideas: [
          {
            title: 'Table française au café',
            pitch:
              'Des tables par niveau avec des locuteurs natifs, plus une règle : chaque erreur est un pas en avant.',
            audience: 'Expatriés qui apprennent le français',
            venueType: 'Un café du 11e arrondissement',
          },
          {
            title: 'Clinique titre de séjour et visa',
            pitch:
              'Une séance pratique sur les titres de séjour, la couverture santé et la paperasse que tout nouveau venu affronte.',
            audience: 'Nouveaux résidents et étudiants internationaux',
            venueType: 'Une salle événementielle associative',
          },
          {
            title: 'Session de café réparation',
            pitch:
              'Des bénévoles aident les voisins à réparer lampes, vélos et appareils tout en enseignant les bases de la réparation.',
            audience: 'Résidents avec des objets cassés et bénévoles bricoleurs',
            venueType: 'Un atelier communautaire ou un centre de quartier',
          },
          {
            title: 'École de dégustation fromages et vins',
            pitch:
              'Une soirée conviviale pour apprendre à associer fromages et vins avec un fromager et un caviste locaux.',
            audience: 'Amateurs de cuisine et nouveaux venus curieux',
            venueType: 'Une fromagerie ou un bar à vin',
          },
          {
            title: 'Balade historique dans Paris',
            pitch:
              'Une visite guidée à travers les couches d’un arrondissement — des murs romains aux boulevards haussmanniens.',
            audience: 'Amateurs d’histoire et nouveaux venus',
            venueType: 'Une salle de bibliothèque ou de société historique',
          },
        ],
      },
      {
        name: 'Social & plein air',
        ideas: [
          {
            title: 'Pique-nique au coucher du soleil sur la Seine',
            pitch:
              'Plaids, fromage et bonne compagnie sur les berges pendant que le soleil se couche derrière les ponts.',
            audience: 'Familles, couples et groupes d’amis',
            venueType: 'Les berges de la Seine près de l’île Saint-Louis',
          },
          {
            title: 'Pétanque dans le parc',
            pitch:
              'Un après-midi de pétanque décontracté sur les terrains en gravier, avec rotation des équipes et toast au pastis après.',
            audience: 'Fans de pétanque et débutants curieux',
            venueType: 'Les terrains en gravier d’un parc parisien',
          },
          {
            title: 'Balade à vélo en libre-service le long de la Seine',
            pitch:
              'Une balade détendue le long du fleuve avec les vélos partagés de la ville, avec pauses café en chemin.',
            audience: 'Cyclistes loisirs de tous niveaux',
            venueType: 'Une station de vélos partagés près du fleuve',
          },
          {
            title: 'Soirée cinéma en plein air',
            pitch:
              'Une projection estivale dans le parc — plaids, en-cas et le rituel saisonnier préféré de la ville.',
            audience: 'Amateurs de cinéma et familles',
            venueType: 'Un site de cinéma en plein air dans un parc',
          },
          {
            title: 'Balade vin chaud aux marchés de Noël',
            pitch:
              'Une visite guidée en soirée des marchés de Noël de la ville avec vin chaud et en-cas réconfortants.',
            audience: 'Amateurs d’hiver et nouveaux venus',
            venueType: 'Un marché de Noël parisien',
          },
        ],
      },
      {
        name: 'Professionnel & sectoriel',
        ideas: [
          {
            title: 'Soirée réseautage luxe et mode',
            pitch:
              'Les professionnels de la mode, du luxe et du retail partagent les actualités du secteur et font des présentations.',
            audience: 'Professionnels de la mode, du luxe et du retail',
            venueType: 'Un atelier ou showroom du Sentier',
          },
          {
            title: 'Petit-déjeuner IA et data',
            pitch:
              'Les praticiens partagent de vrais projets — modèles, pipelines et leçons qui n’ont pas fait le billet de blog.',
            audience: 'Data scientists et ingénieurs ML',
            venueType: 'Une salle de Station F ou de coworking',
          },
          {
            title: 'Cercle gastro et hôtellerie',
            pitch:
              'Chefs, propriétaires de cafés et responsables hôteliers comparent leurs notes sur les effectifs, les fournisseurs et les tendances.',
            audience: 'Propriétaires de restaurants et de cafés',
            venueType: 'Un bistrot ou café après la fermeture',
          },
          {
            title: 'Cercle de pairs des chefs de produit',
            pitch:
              'Un cercle confidentiel où les chefs de produit discutent d’un défi mensuel — feuilles de route, recrutement, politique interne.',
            audience: 'Chefs de produit dans la tech',
            venueType: 'Une salle de réunion de coworking près du Sentier',
          },
          {
            title: 'Cercle de recrutement pour les jeunes équipes',
            pitch:
              'Les fondateurs partagent comment ils recrutent, retiennent et laissent partir — les vérités inconfortables de la constitution d’équipe.',
            audience: 'Fondateurs en démarrage et responsables d’équipe',
            venueType: 'Un bureau de start-up ou un incubateur',
          },
        ],
      },
      {
        name: 'Créatif & maker',
        ideas: [
          {
            title: 'Week-end ateliers à Belleville',
            pitch:
              'Un ensemble de studios ouvre ses portes pour un week-end de visites, démonstrations et œuvres à vendre.',
            audience: 'Amateurs d’art et voisins curieux',
            venueType: 'Les cours d’ateliers de Belleville',
          },
          {
            title: 'Cercle de production de musique électronique',
            pitch:
              'Des producteurs partagent des morceaux inachevés pour des retours et échangent des conseils sur le matériel et les logiciels.',
            audience: 'Beatmakers et producteurs amateurs',
            venueType: 'Un studio de répétition ou d’enregistrement',
          },
          {
            title: 'Balade street-art à Belleville',
            pitch:
              'Une visite guidée des fresques du quartier avec les histoires derrière les artistes.',
            audience: 'Promeneurs d’art et photographes',
            venueType: 'Les rues de Belleville',
          },
          {
            title: 'Soirée upcycling mode',
            pitch:
              'Un troc de vêtements suivi d’une séance de redesign pratique avec machines à coudre et aide d’une couturière.',
            audience: 'Amateurs de mode et makers',
            venueType: 'Un atelier ou une salle de couture communautaire',
          },
          {
            title: 'Soirée zine et risographie',
            pitch:
              'Une soirée pratique de création de zines avec impression risographe et échanges à la fin.',
            audience: 'Auteurs, illustrateurs et passionnés d’impression',
            venueType: 'Un studio d’impression ou un espace artistique',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Soirée d’information pour les locataires',
            pitch:
              'Une séance en langage clair sur les règles de loyer, les baux et où obtenir des conseils gratuits sur le logement.',
            audience: 'Locataires et organisateurs de locataires',
            venueType: 'Une association de locataires ou un centre social',
          },
          {
            title: 'Soirée de planification de la Fête des voisins',
            pitch:
              'Planifiez la fête de cour qui transforme les voisins de votre immeuble en communauté — musique, nourriture et drapeaux.',
            audience: 'Voisins d’un immeuble ou d’un pâté de maisons',
            venueType: 'Une cour commune ou une salle associative',
          },
          {
            title: 'Balade avec les bouquinistes',
            pitch:
              'Rencontrez les bouquinistes des boîtes vertes le long de la Seine et découvrez les histoires derrière leurs étals.',
            audience: 'Amateurs de livres et flâneurs des quais',
            venueType: 'Les bouquinistes le long de la Seine',
          },
          {
            title: 'Journée de travaux au jardin partagé',
            pitch:
              'Les voisins passent une matinée à planter, arroser et planifier la saison dans un jardin partagé.',
            audience: 'Jardin·es et futurs jardin·es',
            venueType: 'Un jardin partagé ou une cour commune',
          },
          {
            title: 'Histoires de commerçants de marché',
            pitch:
              'Des commerçants aguerris partagent des histoires de cinq minutes derrière leurs étals, suivies de questions ouvertes.',
            audience: 'Voisins et amateurs de cuisine',
            venueType: 'Une halle de marché comme le Marché d’Aligre',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Comment choisir l’une de ces idées ?',
        answer:
          'Faites correspondre la catégorie à vos intérêts et au public que vous pouvez atteindre. À Paris, les formats récurrents avec un lieu fixe — un apéro hebdomadaire, une balade mensuelle, une table de café régulière — construisent la communauté le plus vite.',
      },
      {
        question: 'Faut-il parler français pour organiser ?',
        answer:
          'Non. De nombreux événements parisiens se déroulent en anglais ou sont bilingues, et la communauté internationale est grande. Une annonce bilingue double généralement votre portée.',
      },
      {
        question: 'Ces événements peuvent-ils devenir de vraies communautés ?',
        answer:
          'Oui — les formats récurrents sont ainsi que la plupart des communautés parisiennes commencent, et la culture associative donne à chaque groupe une forme reconnue. Les guides pratiques décrivent le chemin du premier événement à une communauté stable.',
      },
    ],
  },
  faq: [
    {
      question: 'Comment trouver une communauté à Paris ?',
      answer:
        'Utilisez les pages par type de groupe pour les communautés de startups, créatives, politiques, meetups et de petites entreprises. Chacune décrit les vrais arrondissements, lieux et formats où les Parisiens se rassemblent. JoinOrigin est en ligne — créez votre profil et trouvez ou créez votre communauté dès aujourd’hui.',
    },
    {
      question: 'Est-il réaliste de créer une communauté à Paris ?',
      answer:
        'Oui. Paris a des cafés partout, un espace public généreux et une forte culture associative. Les guides couvrent la création d’une communauté, l’organisation d’un meetup et l’obtention de vos dix premiers membres.',
    },
    {
      question: 'Les suggestions de lieux sur cette page sont-elles réelles ?',
      answer:
        'Oui. Chaque type de lieu mentionné — arrière-salles de cafés, bars à jeux, berges de la Seine, jardins partagés, bibliothèques publiques — existe à Paris. Nous n’inventons jamais de comptes de membres, de notes ou de bureaux locaux.',
    },
    {
      question: 'JoinOrigin a-t-il un bureau à Paris ?',
      answer:
        'Non. JoinOrigin n’a ni bureaux locaux ni personnel local. Toutes les descriptions de communautés reflètent le paysage réel de la ville, et la plateforme aide les Parisiens à trouver ou créer des communautés.',
    },
  ],
};

export default content;
