import type { CityContent } from '../../types';

/**
 * Paris content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'paris',
  pageTitles: {
    city: 'Communities in Paris | JoinOrigin',
    cityDescription:
      'Find or start communities in Paris — startup, creative, political, meetup, and small business groups across the capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Paris | JoinOrigin',
      creative: 'Creative communities in Paris | JoinOrigin',
      political: 'Political & civic communities in Paris | JoinOrigin',
      meetup: 'Meetup & social communities in Paris | JoinOrigin',
      'small-business': 'Small business communities in Paris | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Paris — founders, engineers, and operators around Station F, Le Sentier, and La Défense. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Paris — ateliers, galleries, and collectives across Le Marais, Belleville, and the Canal Saint-Martin. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Paris — associations, arrondissement councils, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Paris — apéros, café tables, language exchanges, and park gatherings. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Paris — market traders, café and shop owners, and artisan networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Paris | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Paris — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Paris organises itself around the arrondissement — twenty districts that spiral out from the Seine like a snail shell, each with its own squares, markets, and loyalties. A community that picks one arrondissement and shows up there weekly quickly becomes part of the neighbourhood furniture. Cafés, which line nearly every street, double as informal community venues where groups claim a table the way Berliners claim a Stammtisch.',
    'The city’s public spaces — the banks of the Seine, Canal Saint-Martin, Parc des Buttes-Chaumont, the Tuileries, and the Luxembourg Gardens — host everything from outdoor film nights to language exchanges and running groups. Universities such as the Sorbonne, Sciences Po, and École Polytechnique feed a constant stream of students, while the wider Paris region, with its suburbs and business district at La Défense, keeps the city connected to a much larger talent pool.',
    'Parisians are often described as hard to win over, but that is exactly what makes communities valuable here: once a group earns regulars, those regulars stay for years. Newcomers who are patient, bilingual-friendly, and consistent will find the city remarkably open.',
  ],
  dataPoints: [
    'Roughly 2.1 million residents in the city proper; the capital of France.',
    'Twenty arrondissements, each with a distinct community identity.',
    'Universities include the Sorbonne, Sciences Po, and École Polytechnique.',
    'Public anchors: the Seine riverbanks, Canal Saint-Martin, and the Luxembourg Gardens.',
    'Strong café and association culture — a natural base for meetups.',
    'Home to Station F and La French Tech, Europe’s largest startup campus.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Station F event halls and meeting corners',
        'Coworking spaces in Le Sentier and the 10th arrondissement',
        'Incubator rooms near La Défense',
        'Tech cafés around the Canal Saint-Martin',
        'Grande École entrepreneurship rooms at École Polytechnique',
        'Haussmann office lobbies in the 8th and 9th arrondissements',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days at Station F',
        'Industry-specific apéros — fintech, AI, climate',
        'Hackathons and weekend builder jams',
        'Bilingual startup meetups (French–English)',
      ],
      howToStart: [
        'Pick a narrow vertical — AI, climate, fintech, or marketplaces — and an English-friendly name.',
        'Reserve a recurring weekly slot at a Station F-adjacent or Sentier coworking space.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Ateliers and project spaces in Belleville and Ménilmontant',
        'Galleries in Le Marais and the Bastille',
        'Artist studios along the Canal Saint-Martin',
        'Design schools — École des Arts Décoratifs — workshop rooms',
        'Fashion ateliers in the Sentier district',
        'Cinema and music venues in the 11th and 19th arrondissements',
      ],
      formats: [
        'Open studio weekends and portfolio nights',
        'Gallery walkthroughs with artist talks',
        'Design critique evenings in collective ateliers',
        'Music production circles and open-mic nights',
        'Fashion and illustration peer reviews',
      ],
      howToStart: [
        'Pick a craft, an arrondissement, and a regular evening — specificity builds identity faster here.',
        'Find a collective atelier in Belleville or the Canal area willing to host the first night.',
        'Run a first open studio session, collect work in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'Arrondissement town hall (mairie) meeting rooms',
        'Association headquarters across the 20 arrondissements',
        'Neighbourhood community centres',
        'Civic tech meetup spaces in the 3rd and 10th',
        'Public libraries with meeting rooms',
        'Community gardens and shared yards',
      ],
      formats: [
        'Neighbourhood association assemblies',
        'Rent-law and tenant rights info evenings',
        'Citizen initiative planning sessions',
        'Volunteer briefings and first-shift sessions',
        'Climate and mobility action workshops',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a block, an arrondissement, or one policy.',
        'Attend three existing association meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organiser as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Cafés with back rooms across the arrondissements',
        'The banks of the Seine and Canal Saint-Martin',
        'Parc des Buttes-Chaumont and the Luxembourg Gardens',
        'Public libraries with meeting rooms',
        'Bar à jeux (board game bars) in the 10th and 11th',
        'Community gardens and shared yards',
      ],
      formats: [
        'Weekly apéro at the same café',
        'Seine-side walks and bike rides',
        'Language exchange tables (French–English)',
        'Board game evenings at bar à jeux',
        'Picnics and outdoor film nights in parks',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly apéro, a monthly walk — and a fixed venue.',
        'Pick a café, park, or bar à jeux that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Market halls — Marché d’Aligre, Marché des Enfants Rouges',
        'Café owners’ tables in neighbourhood bistros',
        'Passage couverts and shop corridors',
        'Chamber of commerce seminar rooms',
        'Brewery and bakery taprooms with long tables',
        'Maker market stalls at flea markets',
      ],
      formats: [
        'Neighbourhood owner breakfasts with no agenda',
        'Market trader planning sessions for the season',
        'Chamber workshops on paperwork and digitalisation',
        'Shared buying circles for supplies',
        'Street and passage walking tours of shop corridors',
      ],
      howToStart: [
        'Choose one arrondissement and a café that already feeds local shop owners; claim a regular table.',
        'Run a no-agenda breakfast first — owners come when they get to talk about rent and deliveries.',
        'After three breakfasts, rotate one practical topic per month and let the market traders spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Paris has built one of Europe’s most visible startup ecosystems around Station F, the giant former freight depot that now houses hundreds of early-stage companies, and around La French Tech, a national label that connects founders to mentors and international markets. The historical textile district of Le Sentier has become the heart of the young tech scene, while La Défense anchors corporate innovation and the Grandes Écoles supply a deep bench of engineers and business graduates. Recurring formats include founder breakfasts, pitch evenings, demo days, and industry-specific apéros where fintech, AI, and climate teams compare notes over drinks. English is increasingly common in meetups, which helps international founders plug in before their French improves. What makes Paris distinct is the blend of government-supported infrastructure — public funding, incubators, and events — with a strong café culture that keeps the scene informal. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly AI builders night or a climate tech table builds a loyal following faster than a generalist group.',
    creative:
      'Paris creative life is woven into the city’s streets: ateliers in Belleville and Ménilmontant, galleries in Le Marais, fashion studios in Le Sentier, and cinema and music scenes across the 11th and 19th arrondissements. The Canal Saint-Martin has become a gathering line for artists, designers, and musicians, while schools like the École des Arts Décoratifs and the Beaux-Arts graduate a steady flow of makers into a freelance economy built on collaboration. Open studio weekends, portfolio reviews, gallery walkthroughs, and design critique evenings are the standard formats, and many collectives share not just space but equipment — printing presses, cameras, sewing machines. The city’s scale means communities can be as niche as a group of risograph printers or as broad as a neighbourhood art festival. Starting a creative community in Paris is realistic: pick a craft, an arrondissement, and a regular evening, and the density of curious, skilled people will find you.',
    political:
      'Paris has a deep civic tradition organised through the loi 1901 association — a legal form used by thousands of neighbourhood groups, cultural societies, and volunteer projects. Each of the twenty arrondissements has its own town hall and council, which keeps local politics accessible: residents can attend council sessions, join neighbourhood associations, and shape decisions on housing, schools, and public space. Housing is a defining concern, and tenant groups run information evenings and rent-law workshops open to newcomers. Climate and mobility activists organise around car-free streets, cycling, and urban greening, while civic tech volunteers build tools for participatory budgeting and city data. The culture rewards persistence: Parisians join a group because of trust, and trust is built by showing up to real meetings over months. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing associations rather than duplicating them — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Paris’s meetup scene runs on the café, the park bench, and the apéro — the evening drink that turns strangers into regulars. Groups gather for language exchanges, book clubs, board games, photography walks, and running sessions along the Seine and Canal Saint-Martin. The bar à jeux, a board game bar, is a distinctly Parisian venue that hosts casual game nights all week. Parks like the Buttes-Chaumont and the Luxembourg Gardens fill with picnics, outdoor film screenings, and improvised sports in good weather. What newcomers notice is the ritual: the same table at the same café, the same bench, the same Saturday walk, repeated until it becomes a habit. International residents run many English-speaking or bilingual groups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format and a venue that will host you every time — a weekly apéro, a monthly language table — and let Paris’s density of curious people do the rest.',
    'small-business':
      'Paris small business communities are anchored by the city’s markets, passages, and neighbourhood streets. Marché d’Aligre, Marché des Enfants Rouges, and the covered markets of every arrondissement are not just shopping destinations — they are tight-knit communities of traders who share calendars, suppliers, and advice. The passage couverts, covered shopping arcades from the nineteenth century, still host artisans, bookshops, and cafés that treat their corridor as a shared business. Bistros and bakeries form their own networks of owners who compare notes on rent, staffing, and delivery logistics. Chambers of commerce and arrondissement business groups offer workshops on paperwork, digitalisation, and funding, often in both French and English. What binds these groups is place: a market hall or a passage is a natural community with a collective stake in foot traffic. Starting a small business community is very achievable: a monthly roundtable at a neighbourhood café, with rotating topics like rent, payroll, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Paris is an ideal city for testing new community event ideas: cafés are everywhere, public spaces are generous, and the association culture gives every group a recognised shape. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Paris, from café back rooms and bar à jeux to the Seine riverbanks and community gardens. Some ideas work as one-off events; others are designed to become recurring communities with an apéro rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Paris’s curiosity do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Apéro on the canal',
            pitch:
              'A weekly evening drink on the Canal Saint-Martin quayside where newcomers and locals trade arrondissement tips.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A canal-side café quay',
          },
          {
            title: 'Station F founder breakfast',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over coffee and croissants.',
            audience: 'Founders and operators in the French tech scene',
            venueType: 'A café near Station F',
          },
          {
            title: 'Speed-friendship evening',
            pitch:
              'A structured evening of five-minute conversations with a rotation, ending with a shared dinner.',
            audience: 'Anyone who wants to meet new people',
            venueType: 'A centre social or café room',
          },
          {
            title: 'Expat Paris circle',
            pitch:
              'International residents share settling-in tips — paperwork, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'An association or coworking room',
          },
          {
            title: 'Freelancer brunch club',
            pitch:
              'A monthly Sunday brunch where freelancers share leads, rates, and client stories over a long table.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café in the 11th arrondissement',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'French table at the café',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake is a step forward.',
            audience: 'Expats learning French',
            venueType: 'A café in the 11th arrondissement',
          },
          {
            title: 'Résidence and visa clinic',
            pitch:
              'A practical session on residence permits, health cover, and the paperwork every newcomer faces.',
            audience: 'New residents and international students',
            venueType: 'An association event room',
          },
          {
            title: 'Repair café session',
            pitch:
              'Volunteers help neighbours fix lamps, bikes, and appliances while teaching basic repair skills.',
            audience: 'Residents with broken things and handy volunteers',
            venueType: 'A community workshop or neighbourhood centre',
          },
          {
            title: 'Cheese and wine tasting school',
            pitch:
              'A friendly evening learning to pair cheeses and wines with a local fromager and a wine merchant.',
            audience: 'Food lovers and curious newcomers',
            venueType: 'A fromagerie or wine bar',
          },
          {
            title: 'Paris history walk',
            pitch:
              'A guided walk through the layers of one arrondissement — from Roman walls to Haussmann boulevards.',
            audience: 'History lovers and newcomers',
            venueType: 'A library or historical society room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Seine sunset picnic',
            pitch:
              'Blankets, cheese, and good company on the riverbanks as the sun sets over the bridges.',
            audience: 'Families, couples, and friend groups',
            venueType: 'The Seine riverbanks near the Île Saint-Louis',
          },
          {
            title: 'Pétanque in the park',
            pitch:
              'A casual pétanque afternoon on the gravel courts, with teams rotating and a pastis toast after.',
            audience: 'Pétanque fans and curious beginners',
            venueType: 'The gravel courts in a Paris park',
          },
          {
            title: 'Vélib ride along the river',
            pitch:
              'A relaxed bike ride along the river using the city’s shared bikes, with café stops on the way.',
            audience: 'Leisure cyclists of every pace',
            venueType: 'A Vélib station near the river',
          },
          {
            title: 'Open-air cinema night',
            pitch:
              'A summer film screening in the park — blankets, snacks, and the city’s favourite seasonal ritual.',
            audience: 'Film lovers and families',
            venueType: 'An open-air cinema site in a park',
          },
          {
            title: 'Christmas market mulled-wine walk',
            pitch:
              'A guided evening tour of the city’s Christmas markets with mulled wine and warm snacks.',
            audience: 'Winter lovers and newcomers',
            venueType: 'A Paris Christmas market',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Luxury and fashion network night',
            pitch:
              'Professionals from fashion, luxury, and retail share industry news and make introductions.',
            audience: 'Fashion, luxury, and retail professionals',
            venueType: 'An atelier or showroom in the Sentier district',
          },
          {
            title: 'AI and data breakfast',
            pitch:
              'Practitioners share real projects — models, pipelines, and lessons that did not make the blog post.',
            audience: 'Data scientists and ML engineers',
            venueType: 'A Station F or coworking hall',
          },
          {
            title: 'Gastro and hospitality circle',
            pitch:
              'Chefs, café owners, and hospitality managers compare notes on staffing, suppliers, and trends.',
            audience: 'Restaurant and café owners',
            venueType: 'A bistro or café after closing hours',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room near Le Sentier',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'A startup office or incubator',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Belleville atelier weekend',
            pitch:
              'A cluster of studios opens its doors for a weekend of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The atelier yards of Belleville',
          },
          {
            title: 'Electronic music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A rehearsal or recording studio',
          },
          {
            title: 'Belleville street-art walk',
            pitch:
              'A guided walk through the neighbourhood’s murals with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'The streets of Belleville',
          },
          {
            title: 'Fashion upcycling night',
            pitch:
              'A clothing swap followed by a hands-on redesign session with sewing machines and a seamstress helper.',
            audience: 'Fashion lovers and makers',
            venueType: 'An atelier or community sewing room',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'A hands-on evening of zine making with risograph printing and trading at the end.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'A print studio or arts space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Renters info evening',
            pitch:
              'A plain-language session on rent rules, leases, and where to get free housing counselling.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenant association or centre social',
          },
          {
            title: 'Fête des voisins planning night',
            pitch:
              'Plan the courtyard party that turns your building’s neighbours into a community — music, food, and flags.',
            audience: 'Neighbours of one building or block',
            venueType: 'A shared courtyard or association room',
          },
          {
            title: 'Bouquinistes booksellers walk',
            pitch:
              'Meet the green-box booksellers along the Seine and learn the stories behind their stalls.',
            audience: 'Book lovers and river strollers',
            venueType: 'The bouquinistes along the Seine',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or shared courtyard',
          },
          {
            title: 'Market stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A market hall like Marché d’Aligre',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Paris, recurring formats with a fixed venue — a weekly apéro, a monthly walk, a regular café table — build community fastest.',
      },
      {
        question: 'Do I need to speak French to organise?',
        answer:
          'No. Many Paris events run in English or are bilingual, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Paris communities start, and the association culture gives every group a recognised shape. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Paris?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real arrondissements, venues, and formats where Parisians gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Paris?',
      answer:
        'Yes. Paris has cafés everywhere, generous public space, and a strong association culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — café back rooms, bar à jeux, the Seine riverbanks, community gardens, public libraries — exists in Paris. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Paris?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Parisians find or start communities.',
    },
  ],
};

export default content;
