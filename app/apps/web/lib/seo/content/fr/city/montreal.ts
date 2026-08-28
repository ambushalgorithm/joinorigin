import type { CityContent } from '../../types';

/**
 * Contenu Montréal (traduction française) — page ville + 5 variantes +
 * page d'idées. Distinct des autres fichiers de ville (G5) et ancré dans des
 * faits honnêtes sur la ville québécoise bilingue et amoureuse des festivals.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'fr',
  slug: 'montreal',
  intro: [
    'Montréal est la plus grande ville du Québec, avec environ 1,8 million d’habitants dans les limites de la ville et plus de quatre millions dans le Grand Montréal, et c’est la rare ville nord-américaine où les communautés francophones et anglophones vivent côte à côte. Le Plateau-Mont-Royal, le Mile End, le Vieux-Montréal, Griffintown, Verdun et Rosemont abritent chacun une scène distincte, et le caractère bilingue de la ville fait que les groupes se déroulent souvent en français, en anglais ou dans un mélange convivial des deux.',
    'La ville est un pôle canadien de l’intelligence artificielle, des jeux vidéo, de l’aérospatiale et des industries créatives : MILA est l’un des instituts d’IA les plus en pointe au monde, Ubisoft ancre un important pôle de jeux, et la scène des festivals — Juste pour rire, le Festival de jazz, le Festival Mural — est mondialement célèbre. McGill, Concordia, l’Université de Montréal et l’UQAM alimentent des flux constants d’étudiants et de chercheurs dans les communautés locales. Le parc du Mont-Royal ancre la vie de plein air de la ville, le Vieux-Port et les canaux accueillent les rassemblements estivaux, et les marchés Jean-Talon et Atwater sont des ancrages communautaires à l’année.',
    'Les hivers montréalais sont longs et réels, et la ville en a fait une culture : cabanes à sucre, patinoires, festivals intérieurs et terrasses de café chauffées gardent les communautés réunies jusqu’en février. Pour trouver ou créer un Origin, Montréal récompense le choix d’une langue (ou l’adoption des deux), d’un quartier et d’un rythme qui traverse les quatre saisons.',
  ],
  dataPoints: [
    'Environ 1,8 million de résidents dans la ville ; plus de 4 millions dans le Grand Montréal.',
    'Ville bilingue, francophone d’abord — les groupes se déroulent dans les deux langues.',
    'Pôles de l’IA, des jeux vidéo, de l’aérospatiale et des industries créatives.',
    'Ancrages : McGill, Concordia, l’Université de Montréal, l’UQAM.',
    'Ancrages publics : le Mont-Royal, le Vieux-Port, les marchés Jean-Talon et Atwater.',
    'Scènes de quartier : Plateau, Mile End, Vieux-Montréal, Griffintown, Verdun.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Espaces de coworking du Plateau et du Mile End',
        'Salles d’événements IA de MILA et des universités',
        'Bureaux de studios de jeux vidéo',
        'Lofts de start-ups du Vieux-Montréal',
        'Salles d’événements d’accélérateurs près de McGill et Concordia',
        'Cafés avec tables de fondateurs sur le boulevard Saint-Laurent',
      ],
      formats: [
        'Petits-déjeuners de fondateurs avec présentations rapides',
        'Soirées recherche et applications IA',
        'Meetups de jeux et de développeurs indépendants',
        'Soirées démo et soirées pitch',
        'Mixeurs de start-ups bilingues',
      ],
      howToStart: [
        'Choisissez un vertical étroit — IA, jeux ou deep tech — et un ancrage de quartier.',
        'Réservez un créneau hebdomadaire récurrent dans un espace de coworking du Plateau ou du Mile End.',
        'Animez trois meetups ouverts, demandez à deux habitués de co-organiser et fixez un rythme mensuel.',
      ],
    },
    creative: {
      venues: [
        'Salles de musique et d’art du Mile End',
        'Galeries et ateliers d’artistes du Plateau',
        'Studios de design et de mode du Vieux-Montréal',
        'Ruelles couvertes de murales et espaces d’art public',
        'Espaces de production cinéma et animation',
        'Laboratoires créatifs de Concordia et de l’UQAM',
      ],
      formats: [
        'Week-ends studios ouverts et balades d’art',
        'Cercles de planification et de visionnage du Festival Mural',
        'Soirées de critique de design',
        'Cercles de production musicale et DJ',
        'Vitrines d’humour et d’improvisation',
      ],
      howToStart: [
        'Choisissez un métier — arts visuels, musique, design, cinéma — et un quartier.',
        'Faites équipe avec une galerie, un studio ou une salle qui accueillera un premier événement ouvert.',
        'Collectez les travaux en cours avant le deuxième événement et faites du retour le cœur de chaque séance.',
      ],
    },
    political: {
      venues: [
        'Hôtel de ville et bureaux d’arrondissement',
        'Salles de réunion des bibliothèques publiques',
        'Salles des centres communautaires des arrondissements',
        'Bureaux de défense du logement et des locataires',
        'Espaces de meetups civic tech au centre-ville',
        'Pavillons de parc et espaces événementiels des places',
      ],
      formats: [
        'Soirées d’information sur le logement et le contrôle des loyers',
        'Ateliers sur les droits des locataires',
        'Briefings bénévoles sur le transport et les pistes cyclables',
        'Séances de préparation aux consultations d’arrondissement',
        'Ateliers de participation citoyenne en langage clair',
      ],
      howToStart: [
        'Choisissez un problème concret et un petit territoire — un arrondissement, un pâté de maisons ou une politique unique.',
        'Assistez d’abord à trois réunions existantes et faites équipe avec une organisation plutôt que de dupliquer le travail.',
        'Organisez un atelier accueillant pour les nouveaux venus sur le fonctionnement de la politique d’arrondissement afin de bâtir une base stable.',
      ],
    },
    meetup: {
      venues: [
        'Le parc du Mont-Royal et les rassemblements Tam-Tams',
        'Le Vieux-Port et les sentiers des canaux',
        'Cafés du Plateau et du Mile End',
        'Zones des marchés Jean-Talon et Atwater',
        'Bars de quartier et microbrasseries',
        'Bibliothèques publiques avec salles communautaires',
      ],
      formats: [
        'Cercle de tambours Tam-Tams du dimanche et pique-nique',
        'Balades à vélo le long du canal de Lachine',
        'Soirées de jeux de société et de quiz',
        'Sorties sociales d’hiver en patinage et plein air',
        'Échanges linguistiques (français et anglais)',
      ],
      howToStart: [
        'Choisissez un format répétable — une séance dominicale au parc, une balade mensuelle au marché — et un point de rencontre fixe.',
        'Choisissez un endroit comme le Mont-Royal ou un café du Plateau facile d’accès en métro.',
        'Animez les trois premières séances au même moment et au même endroit, puis demandez aux habitués d’inviter chacun un nouveau venu.',
      ],
    },
    'small-business': {
      venues: [
        'Corridors commerciaux du Plateau et du Mile End',
        'Espaces de vendeurs des marchés Jean-Talon et Atwater',
        'Ateliers du centre de petites entreprises de la ville',
        'Salles d’événements de la chambre de commerce',
        'Cafés locaux et bagel shops avec coins communautaires',
        'Espaces de food hall et de cuisine incubatrice',
      ],
      formats: [
        'Petits-déjeuners de propriétaires de boutiques sans ordre du jour',
        'Tables rondes de vendeurs de marché',
        'Cliniques des agences municipales sur les permis et licences',
        'Cercles d’achat groupé pour les fournitures',
        'Balades de quartier dans les corridors commerciaux',
      ],
      howToStart: [
        'Choisissez un corridor et un café qui nourrit déjà les propriétaires locaux ; réclamez une table d’angle régulière.',
        'Animez d’abord un petit-déjeuner sans ordre du jour — les propriétaires viennent pour parler loyers, permis et ventes d’hiver.',
        'Après trois petits-déjeuners, faites tourner un sujet pratique par mois et laissez la chambre passer le mot.',
      ],
    },
  },
  variantIntros: {
    startup:
      'La scène startup montréalaise est l’une des plus distinctives du Canada, construite sur l’intelligence artificielle, les jeux vidéo et la deep tech, et portée par une culture bilingue qui connecte la ville aux marchés francophone et anglophone. MILA — l’institut d’IA fondé par Yoshua Bengio — a fait de Montréal un centre mondial de la recherche en apprentissage automatique, et le pôle de jeux de la ville, ancré par Ubisoft, attire des développeurs du monde entier. McGill et Concordia alimentent les talents d’ingénierie et de gestion, tandis que l’Université de Montréal renforce la couche francophone de l’écosystème. La communauté startup se concentre dans le Plateau, le Mile End et le Vieux-Montréal, où les espaces de coworking et les cafés servent de lieux de rassemblement. Ce qui rend la scène inhabituelle, c’est son caractère international et sa qualité de vie : les fondateurs restent parce que la ville est abordable, belle et pleine de culture. Les formats établis incluent les petits-déjeuners de fondateurs, les soirées IA et les soirées démo, beaucoup étant bilingues ou accueillant les deux langues. Un conseil honnête pour lancer un Origin startup ici : choisissez un vertical, ancrez-vous dans un quartier et adoptez la réalité bilingue — un événement hebdomadaire régulier deviendra rapidement un incontournable.',
    creative:
      'Les communautés créatives montréalaises sont parmi les plus vibrantes d’Amérique du Nord, portées par une culture de festivals qui va du jazz à l’humour en passant par le cinéma, et par une ville qui traite l’art comme une infrastructure. Le Plateau et le Mile End abritent une scène bohème dense de musiciens, écrivains et designers, le Vieux-Montréal accueille des galeries et des studios de mode, et les murales de la ville — y compris le célèbre Festival Mural — transforment des quartiers entiers en galeries en plein air. Les industries du jeu et de l’animation donnent à la scène créative une forte couche numérique, et Concordia et l’UQAM alimentent chaque année la ville en nouveaux artistes. Les hivers montréalais poussent les créatifs à l’intérieur, ce qui construit une culture de club intime : une petite salle, une pièce pleine et une saison de travail partagée. Le bilinguisme de la ville est aussi un atout créatif — les artistes travaillent en français, en anglais et souvent dans les deux. Lancer un Origin créatif à Montréal signifie choisir une discipline et un quartier, puis utiliser le stock profond de lieux de la ville et son véritable amour de la culture vivante locale pour construire quelque chose qui dure.',
    political:
      'Les communautés politiques et citoyennes montréalaises fonctionnent dans un système bilingue par arrondissements qui garde la politique locale proche du terrain. Le logement est le problème déterminant : le contrôle des loyers, les droits des locataires et les campagnes contre la gentrification tiennent les organisations bénévoles occupées, et le Tribunal administratif du logement du Québec donne aux locataires une vraie tribune. La structure par arrondissements de la ville signifie que les résidents peuvent assister aux séances des conseils locaux et façonner les décisions d’aménagement dans leur propre quartier, et la culture d’action collective est forte — des groupes climatiques qui s’organisent autour du transport et des pistes cyclables aux réseaux d’entraide qui traversent l’hiver. Les communautés civic tech construisent des outils pour les données ouvertes et l’engagement public, et les parcs, marchés et places de la ville ancrent d’innombrables efforts bénévoles. La culture politique récompense la persévérance et le rayonnement bilingue : les organisateurs qui animent des groupes de locataires accueillent aussi des ateliers pour les nouveaux venus sur le fonctionnement de l’arrondissement. Lancer un Origin citoyen à Montréal signifie généralement choisir un problème concret et un petit territoire, puis s’associer au paysage dense d’organisateurs existants.',
    meetup:
      'La culture meetup montréalaise est célèbre pour sa chaleur, ses cafés et ses festivals, et elle est définie par les saisons : en été, le Mont-Royal accueille le légendaire cercle de tambours Tam-Tams du dimanche et des pique-niques, le canal de Lachine se remplit de cyclistes et de pagayeurs, et les foules de festivals envahissent les rues ; en hiver, les mêmes communautés se déplacent à l’intérieur ou sur les patinoires, en sorties à la cabane à sucre et sur les terrasses de café chaleureuses. Le Plateau et le Mile End abritent une culture de café qui rend les rassemblements décontractés sans effort, et les marchés Jean-Talon et Atwater donnent aux groupes centrés sur la nourriture un ancrage à l’année. Parce que la ville est bilingue, les échanges linguistiques sont un véritable genre de meetup — francophones et anglophones qui s’entraînent mutuellement autour d’un café. Les formats qui durent sont simples et répétables : une séance dominicale au parc, une balade mensuelle au marché, une soirée de quiz permanente. Un conseil honnête pour lancer un meetup à Montréal : choisissez un format qui fonctionne pendant les quatre saisons, ancrez-le à un repère accessible en métro et laissez la culture chaleureuse et sociable de la ville faire le travail de croissance.',
    'small-business':
      'Les communautés de petites entreprises montréalaises sont construites sur un ensemble dense et marchable de rues commerciales et une culture alimentaire profonde : le café du Plateau, la bagel shop du Mile End, le vendeur du Marché Jean-Talon, la librairie de Verdun et l’atelier du Vieux-Montréal partagent tous des questions pratiques sur les loyers, les permis, les effectifs et le marché bilingue. Des corridors commerciaux comme Saint-Denis, Saint-Laurent et Wellington à Verdun agissent comme des communautés d’intérêt naturelles, les propriétaires de boutiques se coordonnant autour des festivals de rue, de l’espace public et des préoccupations partagées. Les marchés de la ville donnent aux vendeurs une communauté intégrée et un flux régulier de clients, et la chambre de commerce plus les centres de petites entreprises de la ville proposent des ateliers sur les licences, les prêts et la vente numérique. Les bagel shops, les delis de viande fumée et la culture du café donnent à la ville une identité de petites entreprises réellement distincte que les locaux défendent avec ferveur. Les nouveaux venus se connectent généralement en assistant à une réunion de corridor, en suivant un atelier municipal ou en rejoignant un collectif de vendeurs de marché. Lancer un Origin de petites entreprises ici est réaliste : une table ronde mensuelle dans un café ou une bagel shop de quartier, avec des sujets tournants comme le loyer, l’assurance et le marketing bilingue, attire fidèlement des propriétaires qui ont rarement des pairs avec qui parler.',
  },
  ideaPage: {
    intro:
      'La culture des festivals, la vie de café et les quatre saisons distinctes de Montréal en font un merveilleux terrain pour tester de nouvelles idées d’événements communautaires. Les trente idées ci-dessous sont regroupées en six catégories — réseautage, apprentissage, social et plein air, professionnel et sectoriel, créatif et maker, et impact et local. Chaque idée inclut à qui elle s’adresse, un pitch court et un type de lieu suggéré qui existe réellement à Montréal, du Mont-Royal et du canal de Lachine aux cafés du Plateau, au Marché Jean-Talon et aux microbrasseries de quartier. Certaines idées fonctionnent comme événements ponctuels ; d’autres sont conçues pour devenir des communautés récurrentes qui survivent à l’hiver en se déplaçant à l’intérieur. La règle d’honnêteté est simple : chaque suggestion de lieu est un vrai type d’endroit dans cette ville, et chaque format est assez simple pour qu’un organisateur débutant le mène. Choisissez l’idée qui correspond à vos intérêts, trouvez un lieu qui vous accueillera et laissez la chaleur de la ville faire le reste.',
    categories: [
      {
        name: 'Réseautage',
        ideas: [
          {
            title: 'Tournée des cafés du Plateau',
            pitch:
              'Une balade du samedi dans trois cafés du Plateau, où les gens changent de table et partagent ce qu’ils font.',
            audience: 'Amateurs de café et réseautage',
            venueType: 'Cafés du Plateau',
          },
          {
            title: 'AMA de fondateur dans un espace de coworking du Mile End',
            pitch:
              'Un fondateur partage son histoire honnête pendant trente minutes, puis répond aux questions ouvertes de la salle.',
            audience: 'Fondateurs en démarrage et entrepreneurs en herbe',
            venueType: 'Espace de coworking du Mile End',
          },
          {
            title: 'Soirée de réseautage bilingue',
            pitch:
              'Un événement social sans pression conçu pour les francophones et les anglophones, avec des amorces de conversation dans les deux langues.',
            audience: 'Professionnels bilingues et curieux de langues',
            venueType: 'Bar du Plateau ou salle communautaire',
          },
          {
            title: 'Cercle d’histoires de carrière',
            pitch:
              'Six personnes racontent chacune leur parcours en cinq minutes, suivies d’une discussion de groupe et d’amorces de connexion.',
            audience: 'Chercheurs d’emploi, réorienteurs et mentors',
            venueType: 'Salle de réunion de bibliothèque publique',
          },
          {
            title: 'Mixeur au coucher du soleil au Vieux-Port',
            pitch:
              'Une balade décontractée le soir au Vieux-Port avec des brise-glaces et la règle de rencontrer trois nouvelles personnes.',
            audience: 'Nouveaux venus et toute personne qui élargit son réseau',
            venueType: 'Sentiers du front de mer du Vieux-Port',
          },
        ],
      },
      {
        name: 'Apprentissage & ateliers',
        ideas: [
          {
            title: 'Échange linguistique français-anglais',
            pitch:
              'Des tables par niveau et par langue, avec une règle simple : les erreurs sont le but.',
            audience: 'Apprenants du français et de l’anglais',
            venueType: 'Café ou centre communautaire du Plateau',
          },
          {
            title: 'IA pour les non-ingénieurs',
            pitch:
              'Un atelier pratique où les professionnels non techniques apprennent à utiliser concrètement les outils d’IA.',
            audience: 'Marketeurs, opérateurs et analystes',
            venueType: 'Espace de coworking ou salle d’événements près de MILA',
          },
          {
            title: 'Finances de petite entreprise en langage clair',
            pitch:
              'Une séance sur la trésorerie, les impôts et les prêts pour les propriétaires débutants.',
            audience: 'Nouveaux propriétaires de petites entreprises',
            venueType: 'Centre de petites entreprises de la ville',
          },
          {
            title: 'Droits des locataires au Québec',
            pitch:
              'Une séance en langage clair sur les baux, le contrôle des loyers et le tribunal du logement.',
            audience: 'Locataires et défenseurs des locataires',
            venueType: 'Centre communautaire ou bibliothèque',
          },
          {
            title: 'Soirée de programmation pour débutants absolus',
            pitch:
              'Une soirée guidée où les débutants construisent leur premier petit projet avec des mentors dans la salle.',
            audience: 'Personnes en reconversion vers la tech',
            venueType: 'Espace de coworking ou laboratoire universitaire',
          },
        ],
      },
      {
        name: 'Social & plein air',
        ideas: [
          {
            title: 'Tam-Tams du dimanche et pique-nique',
            pitch:
              'Rejoignez le légendaire cercle de tambours du Mont-Royal, apportez une couverture et rencontrez des gens par la musique et la danse.',
            audience: 'Musiciens, danseurs et flâneurs du dimanche',
            venueType: 'Parc du Mont-Royal près des Tam-Tams',
          },
          {
            title: 'Balade à vélo du canal de Lachine',
            pitch:
              'Une balade détendue le long du canal avec pauses café et une pause baignade en été.',
            audience: 'Cyclistes loisirs',
            venueType: 'Pistes cyclables du canal de Lachine',
          },
          {
            title: 'Balade gourmande au Marché Jean-Talon',
            pitch:
              'Une balade de dégustation guidée dans le marché avec les histoires derrière ses vendeurs.',
            audience: 'Amateurs de cuisine et visiteurs de première fois',
            venueType: 'Marché Jean-Talon',
          },
          {
            title: 'Soirée jeux de société dans une microbrasserie',
            pitch:
              'Une pile mensuelle de jeux de société dans une microbrasserie de quartier qui accueille les soirées lentes.',
            audience: 'Joueurs occasionnels et voisins',
            venueType: 'Microbrasserie du Plateau ou de Verdun',
          },
          {
            title: 'Social patinage et chocolat chaud',
            pitch:
              'Une soirée d’hiver de patinage sur une patinoire de quartier suivie de chocolat chaud et de conversation.',
            audience: 'Patineurs et amoureux de l’hiver',
            venueType: 'Patinoire du Mont-Royal ou d’arrondissement',
          },
        ],
      },
      {
        name: 'Professionnel & sectoriel',
        ideas: [
          {
            title: 'Soirée recherche et applications IA',
            pitch:
              'Des chercheurs et praticiens partagent les travaux récents et les leçons pratiques de la scène IA locale.',
            audience: 'Chercheurs IA, ingénieurs et fondateurs',
            venueType: 'Espace événementiel de MILA ou d’une université',
          },
          {
            title: 'Meetup de jeux et de développeurs indépendants',
            pitch:
              'Développeurs et artistes de jeux échangent sur la scène locale, le recrutement et les tendances des jeux live-service.',
            audience: 'Développeurs de jeux et professionnels du secteur',
            venueType: 'Bureau de studio de jeux ou espace événementiel',
          },
          {
            title: 'Soirée de critique de design',
            pitch:
              'Des designers produit et marque présentent de vrais travaux en cours et reçoivent des retours structurés.',
            audience: 'Designers produit, marque et UX',
            venueType: 'Studio de design ou espace d’agence créative',
          },
          {
            title: 'Mixeur aérospatial et aviation',
            pitch:
              'Une soirée informelle pour les professionnels du pôle aérospatial de la ville pour échanger notes et contacts.',
            audience: 'Ingénieurs aérospatiaux et opérateurs',
            venueType: 'Bureau du secteur ou espace événementiel',
          },
          {
            title: 'Cercle de recrutement pour les jeunes équipes',
            pitch:
              'Les fondateurs partagent comment ils recrutent, retiennent et laissent partir — les vérités inconfortables de la constitution d’équipe.',
            audience: 'Fondateurs en démarrage et responsables d’équipe',
            venueType: 'Bureau de start-up ou salle de coworking',
          },
        ],
      },
      {
        name: 'Créatif & maker',
        ideas: [
          {
            title: 'Balade des murales du Plateau',
            pitch:
              'Une visite guidée des murales du quartier avec les histoires derrière les artistes.',
            audience: 'Promeneurs d’art et photographes',
            venueType: 'Rues et ruelles du Plateau',
          },
          {
            title: 'Week-end studios ouverts au Mile End',
            pitch:
              'Des artistes ouvrent leurs studios pour un week-end de visites, démonstrations et œuvres à vendre.',
            audience: 'Amateurs d’art et voisins curieux',
            venueType: 'Ateliers d’artistes du Mile End',
          },
          {
            title: 'Open mic pour musiciens et poètes',
            pitch:
              'Un open mic accueillant avec une courte tête d’affiche et un public bienveillant.',
            audience: 'Musiciens, poètes et débutants',
            venueType: 'Salle de musique du Mile End',
          },
          {
            title: 'Atelier de fabrication de bagels',
            pitch:
              'Une soirée pratique pour apprendre le métier derrière les célèbres bagels cuits au feu de bois de la ville.',
            audience: 'Boulangers amateurs et amateurs de cuisine',
            venueType: 'Espace d’atelier de boulangerie',
          },
          {
            title: 'Soirée zine et risographie',
            pitch:
              'Papier, ciseaux et une imprimante risographe : tout le monde repart avec un petit zine à échanger.',
            audience: 'Auteurs, artistes et passionnés d’impression',
            venueType: 'Imprimerie ou espace artistique du Plateau',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Matinée de nettoyage d’un parc',
            pitch:
              'Un nettoyage du samedi matin d’un parc de quartier, avec gants et café fournis.',
            audience: 'Bénévoles et amoureux des parcs',
            venueType: 'Un parc de quartier choisi',
          },
          {
            title: 'Journée de travaux au jardin communautaire',
            pitch:
              'Quelques heures de plantation et de désherbage dans un jardin communautaire, suivies d’une collation partagée et d’une visite du jardin.',
            audience: 'Jardin·es, bénévoles et familles',
            venueType: 'Jardin communautaire de quartier',
          },
          {
            title: 'Séance d’information sur les droits des locataires',
            pitch:
              'Une séance en langage clair sur les baux, le contrôle des loyers et où obtenir de l’aide juridique gratuite.',
            audience: 'Locataires et organisateurs de locataires',
            venueType: 'Centre communautaire ou bibliothèque',
          },
          {
            title: 'Collecte de vêtements chauds d’hiver',
            pitch:
              'Une journée de collecte et de tri des dons de vêtements chauds, avec un chocolat chaud de remerciement après.',
            audience: 'Bénévoles de première fois et voisins',
            venueType: 'Organisme caritatif local ou centre communautaire',
          },
          {
            title: 'Soirée d’histoires d’entreprises locales',
            pitch:
              'Les propriétaires de boutiques et de marchés partagent les histoires derrière leurs entreprises en conférences de cinq minutes.',
            audience: 'Voisins et propriétaires de petites entreprises',
            venueType: 'Une boutique locale, un café ou une halle de marché',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Comment choisir l’une de ces idées ?',
        answer:
          'Faites correspondre la catégorie à vos intérêts et au public que vous pouvez atteindre. À Montréal, les formats avec un plan saisonnier — alternatives intérieures en hiver, séances de parc en été — et un accueil bilingue ont tendance à se remplir le plus vite.',
      },
      {
        question: 'Faut-il parler français pour organiser ?',
        answer:
          'Non. De nombreux événements montréalais se déroulent en anglais ou de manière bilingue, et la ville a une grande communauté anglophone. Annoncer dans les deux langues double généralement votre portée.',
      },
      {
        question: 'Ces événements peuvent-ils devenir de vraies communautés ?',
        answer:
          'Oui — les formats récurrents sont ainsi que la plupart des communautés montréalaises commencent. Les guides pratiques décrivent les étapes d’un premier événement à une communauté stable avec organisateurs et rituels.',
      },
    ],
  },
  faq: [
    {
      question: 'Comment trouver un Origin à Montréal ?',
      answer:
        'Commencez par les pages par type de groupe : Origins de startups, créatifs, politiques, meetups et de petites entreprises. Chacune décrit les vrais quartiers, lieux et formats où les Montréalais se rassemblent. JoinOrigin est en ligne — créez votre profil et trouvez ou créez votre Origin dès aujourd’hui.',
    },
    {
      question: 'Est-il réaliste de créer un Origin à Montréal ?',
      answer:
        'Oui. La ville a des lieux publics gratuits, une chaleureuse culture de café et une scène de festivals mondialement connue. Les guides couvrent la création d’un Origin, l’organisation d’un meetup et l’obtention de vos dix premiers membres.',
    },
    {
      question: 'Les suggestions de lieux sur cette page sont-elles réelles ?',
      answer:
        'Oui. Chaque type de lieu mentionné — Mont-Royal, Marché Jean-Talon, cafés du Plateau, microbrasseries, bibliothèques publiques — existe à Montréal. Nous n’inventons jamais de comptes de membres, de notes ou de bureaux locaux.',
    },
    {
      question: 'JoinOrigin a-t-il un bureau à Montréal ?',
      answer:
        'Non. JoinOrigin n’a ni bureaux locaux ni personnel local. Toutes les descriptions de communautés reflètent le paysage réel de la ville, et la plateforme aide les Montréalais à trouver ou créer des Origins.',
    },
  ],
};

export default content;
