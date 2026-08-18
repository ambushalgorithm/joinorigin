import type { CityContent } from '../../types';

/**
 * Amsterdam content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'amsterdam',
  pageTitles: {
    city: 'Communities in Amsterdam | JoinOrigin',
    cityDescription:
      'Find or start communities in Amsterdam — startup, creative, political, meetup, and small business groups across the Dutch capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Amsterdam | JoinOrigin',
      creative: 'Creative communities in Amsterdam | JoinOrigin',
      political: 'Political & civic communities in Amsterdam | JoinOrigin',
      meetup: 'Meetup & social communities in Amsterdam | JoinOrigin',
      'small-business': 'Small business communities in Amsterdam | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Amsterdam — founders, engineers, and operators around TQ, Zuidas, and the fintech scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Amsterdam — studios, galleries, and collectives across NDSM, the Jordaan, and Oost. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Amsterdam — stadsdeel councils, housing activism, and neighbourhood networks. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Amsterdam — bruin cafés, borrels, cycling groups, and canalside gatherings. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Amsterdam — Jordaan shops, Albert Cuyp market traders, and neighbourhood networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Amsterdam | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Amsterdam — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Amsterdam is a compact city where everyone seems to know someone who knows someone. The canal ring, the Jordaan, De Pijp, Oost, and Noord each have their own character, but the whole city sits on a human scale — you can cycle from one community to another in fifteen minutes. The bicycle is the true social network: group rides, bike-pooling parents, and after-work fietsen to a park barbecue are part of everyday life.',
    'The bruin café — the brown pub with dark wood, candles, and regulars — is the classic Amsterdam community venue, while the canals, Vondelpark, and the beaches of the city’s parks host summer gatherings. Universities such as the University of Amsterdam and the VU keep a constant flow of students, and the city’s long history as a trading port makes it one of Europe’s most international capitals, with English widely spoken.',
    'Amsterdam communities tend to be pragmatic and welcoming: the Dutch love planning, calendars, and clear formats, and the city’s density means a small group can fill a room without much effort. Newcomers who show up consistently and respect the local rhythm will find belonging quickly.',
  ],
  dataPoints: [
    'Roughly 740,000 residents in the municipality; the capital of the Netherlands.',
    'Universities include the University of Amsterdam and the VU.',
    'Cycle-first city — the bike network shapes how communities gather.',
    'Public anchors: Vondelpark, the canals, NDSM wharf, and the beaches.',
    'Strong bruin café and borrel culture of informal gathering.',
    'Long international history — English is common in many groups.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'TQ and other tech hub floors in the centre',
        'Coworking spaces in the Zuidas business district',
        'Fintech event rooms near the Damrak',
        'Startup cafés in Oost and the Oud-West',
        'University entrepreneurship spaces at UvA and VU',
        'Canal-house offices with meeting corners',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo nights',
        'Fintech and scale-up happy hours',
        'Impact and climate founder tables',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, climate, or marketplaces — and an English-first name.',
        'Reserve a weekly slot at a TQ or Zuidas coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'NDSM wharf studios and event halls',
        'Jordaan galleries and ateliers',
        'Rijksakademie open-day rooms',
        'Design studios in Oost and De Pijp',
        'Rehearsal rooms and small venues',
        'Canal-side cafés with long tables',
      ],
      formats: [
        'Shipyard open weekends with artist demos',
        'Gallery nights during the Jordaan art route',
        'Portfolio swap evenings for illustrators',
        'Co-working mornings for makers who need company',
        'Print and poster workshops in NDSM sheds',
      ],
      howToStart: [
        'Choose one craft and one evening — canal-side specificity beats a general arts club in Amsterdam.',
        'Ask a NDSM or Jordaan collective to co-host your first event; the ferry ride alone is an experience.',
        'Keep the format small and walkable — two studios, one bar, ten people — and let word spread along the canal.',
      ],
    },
    political: {
      venues: [
        'Stadsdeel council chambers',
        'Wijkcentra and buurthuizen',
        'Housing cooperative meeting rooms',
        'Community gardens and playgrounds',
        'Civic tech rooms in the centre',
        'Library assembly corners',
      ],
      formats: [
        'Buurtoverleg — street-level consultation evenings',
        'Housing and rental info sessions with free advice',
        'Playground and public-space design workshops',
        'Volunteer intake evenings with local charities',
        'Participatory budget idea labs',
      ],
      howToStart: [
        'Pick one street-level issue — a playground, a square, a rental street — and map who already cares about it.',
        'Visit the stadsdeel office and ask for the neighbourhood agenda; councils publish their plans openly.',
        'Run a buurtoverleg-style evening with tea and cake, invite the wijkcoördinator, and let residents set the topics.',
      ],
    },
    meetup: {
      venues: [
        'Bruin cafés in the Jordaan and De Pijp',
        'Vondelpark lawns and the city’s beaches',
        'Canal-side quays and bridge steps',
        'Board game cafés in the centre',
        'Community gardens and shared yards',
        'Cycling club meeting points at the Museumplein',
      ],
      formats: [
        'Weekly borrel at the same bruin café',
        'Friday-afternoon drinks after work',
        'Group rides and city cycling tours',
        'Canalside picnics and boat trips',
        'Language exchange tables (Dutch–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly borrel, a monthly ride — and a fixed venue.',
        'Pick a bruin café, park spot, or clubhouse that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Albert Cuyp market trader tables',
        'Jordaan shopkeepers’ cafés',
        'Food hall counters at Foodhallen',
        'Chamber of commerce seminar rooms',
        'Brewery taprooms with long tables',
        'Maker market stalls at weekend markets',
      ],
      formats: [
        'Early-morning trader breakfasts before the market opens',
        'Supplier and wholesaler evenings at taprooms',
        'Shop-window and signage clinics run by design volunteers',
        'Shared delivery and stock-buying cooperatives',
        'Neighbourhood business walks hosted by shopkeepers',
      ],
      howToStart: [
        'Anchor the group to one market square or shopping street — the Albert Cuyp or the Negen Straatjes are proven magnets.',
        'Invite the market-master or a veteran trader to co-host the first breakfast so credibility comes instantly.',
        'Collect the owners’ recurring headaches — permits, deliveries, rent — and turn each month’s breakfast into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Amsterdam’s startup scene is compact, international, and surprisingly deep for a city of its size. The tech quarter around TQ in the centre, the Zuidas business district, and a strong fintech corridor have produced global companies while keeping a community feel. The city’s trading history shows in its founders: marketplaces, payments, logistics, and travel tech are recurring strengths, and climate tech has grown quickly as Dutch sustainability culture meets venture capital. English is the default language in most groups, which makes the scene one of Europe’s most accessible for international founders. Formats include founder breakfasts, pitch evenings, demo days, and fintech happy hours that rotate between canal-house offices and startup cafés. The Dutch preference for directness and planning shapes the community: events start on time, feedback is honest, and groups with a clear agenda thrive. Starting a startup community in Amsterdam works best with a narrow vertical and a regular rhythm — a monthly climate founder table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Amsterdam’s creative communities are concentrated and walkable: NDSM wharf on the north bank hosts a city of studios, galleries, and event halls inside former shipyard sheds, while the Jordaan carries a centuries-old tradition of ateliers and galleries. The Rijksakademie and the Gerrit Rietveld Academie feed a steady stream of artists and designers into a scene known for graphic design, photography, street art, and music. Formats include open studio weekends, gallery walkthroughs, portfolio reviews, and design critiques, many held in canal-house studios that give the city its particular intimacy. NDSM’s graffiti-covered walls and annual street-art festivals make it a magnet for makers, while Oost and the Pijp host a younger generation of studios and collectives. The scene is small enough that word travels fast and big enough to support niche communities — risograph printers, techno producers, ceramicists. Starting a creative community in Amsterdam is realistic: pick a craft, a neighbourhood, and a regular evening, and the city’s density of curious, skilled people will find you.',
    political:
      'Amsterdam’s civic life is structured around its seven stadsdelen, or boroughs, each with elected councils and a real say in local planning. Housing is the dominant issue: the city’s tight rental market has produced active tenant organisations, squatting history, and ongoing campaigns for affordable housing and cooperative building. The wijkcentra, neighbourhood centres, are the physical homes of local life, hosting meetings, language classes, and volunteer groups. Civic tech volunteers build tools for participatory budgeting and city data, while community gardens and shared courtyards give residents a hands-on stake in public space. Mobility politics is also lively — cycling advocacy, car-free streets, and canal-boat permits all have their campaigns. The Dutch political culture is consultative: residents expect to be heard in planning processes, and well-organised neighbourhoods get results. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing organisations — the landscape is organised enough that collaboration beats competition.',
    meetup:
      'Amsterdam’s meetup scene runs on the bruin café, the borrel, and the bicycle. The brown pubs of the Jordaan and De Pijp are living rooms with regulars, candles, and dark wood — the natural home of a weekly borrel, the Dutch after-work drink that turns colleagues into friends. In summer the Vondelpark, the city’s beaches, and the canal quays fill with picnics, barbecues, and outdoor games, while boat trips turn group rides into floating parties. Cycling is the connective tissue: group rides, weekend tours, and the city’s bike-first culture mean a meetup can gather anywhere in fifteen minutes. Formats include language exchanges (Dutch–English), board game nights, canal-side walks, and Friday borrels that welcome newcomers explicitly. The city’s scale keeps everything human — a group of twenty is already a lively evening. Starting a meetup in Amsterdam means choosing a repeatable format and a venue that will host you every time; the city’s density and casual friendliness do the rest.',
    'small-business':
      'Amsterdam small business communities are shaped by the city’s markets, canals, and neighbourhood streets. The Albert Cuyp market in De Pijp is one of Europe’s busiest day markets and a tight community of traders who share suppliers, gossip, and seasonal calendars. The Jordaan’s independent shops — cheese, books, vintage, flowers — form a friendly network of owners who know each other by name, and Foodhallen has turned the food hall into a community of young entrepreneurs. The chamber of commerce offers structured workshops on permits, digitalisation, and financing, while the city’s many brewery taprooms host supplier nights and trade socials. What binds these groups is place: a market hall, a shopping street, or a canal block is a natural community with a collective stake in foot traffic and the neighbourhood’s reputation. Newcomers typically join by attending a market meeting, taking a chamber workshop, or visiting a taproom event. Starting a small business community is very achievable: a monthly roundtable at a neighbourhood café, with rotating topics like rent, permits, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Amsterdam is an ideal city for testing new community event ideas: the city is compact, the parks and canals are generous, and the bruin café gives every group a natural venue. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Amsterdam, from bruin café corners and board game cafés to NDSM studios and the Vondelpark lawns. Some ideas work as one-off events; others are designed to become recurring communities with a borrel rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Amsterdam’s scale do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Bruin café borrel for newcomers',
            pitch:
              'A weekly after-work drink at the same brown pub where newcomers and long-term residents trade neighbourhood tips.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A bruin café in the Jordaan',
          },
          {
            title: 'Canal-boat networking cruise',
            pitch:
              'A slow boat trip through the canals with rotating seats so everyone talks to everyone.',
            audience: 'Professionals and curious newcomers',
            venueType: 'A canal-boat trip from a central mooring',
          },
          {
            title: 'Expats and Dutchies exchange',
            pitch:
              'Structured one-on-one conversations between internationals and locals, swapping city secrets and language tips.',
            audience: 'Expats and Dutch residents',
            venueType: 'A café with long tables in Oud-West',
          },
          {
            title: 'Wijk meet-and-greet',
            pitch:
              'A low-pressure evening in one neighbourhood, with name cards and a rule that you meet three new people.',
            audience: 'Residents of a single neighbourhood',
            venueType: 'A wijkcentrum',
          },
          {
            title: 'Freelancer Friday morning',
            pitch:
              'A weekly coffee where freelancers share leads, rates, and client stories before the weekend.',
            audience: 'Freelancers of every discipline',
            venueType: 'A coworking café near the canals',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Kletsen — Dutch practice table',
            pitch:
              'Informal Dutch conversation with native speakers at your level, and a rule that mistakes are celebrated.',
            audience: 'Expats learning Dutch',
            venueType: 'A café in De Pijp',
          },
          {
            title: 'DigiD and tax clinic',
            pitch:
              'A hands-on session on the Dutch digital ID, municipal registration, and the tax basics for newcomers.',
            audience: 'New residents and freelancers',
            venueType: 'A public library or wijkcentrum',
          },
          {
            title: 'Bike repair basics',
            pitch:
              'Learn to fix punctures, brakes, and chains — the essential Dutch life skill — in a real workshop.',
            audience: 'Cyclists of every level',
            venueType: 'A community workshop or bike cooperative',
          },
          {
            title: 'Canal-house history walk',
            pitch:
              'A walking lecture through the gable houses of the canal ring, with stories behind the façades.',
            audience: 'History lovers and newcomers',
            venueType: 'A library or historical society meeting room',
          },
          {
            title: 'Wooncoöperatie info night',
            pitch:
              'Learn how cooperative housing works in Amsterdam and how to join or start a housing cooperative.',
            audience: 'Renters interested in cooperative living',
            venueType: 'A wijkcentrum or housing cooperative room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Vondelpark bootcamp and coffee',
            pitch:
              'A friendly outdoor workout in the park followed by coffee and pastries at a nearby café.',
            audience: 'Fitness beginners and regulars',
            venueType: 'The Vondelpark lawns',
          },
          {
            title: 'King’s Day vrijmarkt stall',
            pitch:
              'Plan a shared flea-market stall for King’s Day with neighbours — the city’s biggest street party.',
            audience: 'Neighbours and bargain lovers',
            venueType: 'A neighbourhood association room',
          },
          {
            title: 'City beach volleyball',
            pitch:
              'A casual evening of beach volleyball at the city beach, with rotating teams and a shared borrel after.',
            audience: 'Casual players and sun lovers',
            venueType: 'The city beach at Strand West',
          },
          {
            title: 'Polder cycling tour',
            pitch:
              'A weekend ride out of the city through the polders, windmills, and villages, with café stops.',
            audience: 'Leisure cyclists of every pace',
            venueType: 'A cycling club meeting point',
          },
          {
            title: 'Museumplein picnic and live music',
            pitch:
              'Blankets, snacks, and an open-air playlist on the museum lawn, with games for newcomers.',
            audience: 'Families, couples, and friend groups',
            venueType: 'The Museumplein lawn',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share progress, regulation learnings, and partnerships.',
            audience: 'Fintech founders and operators',
            venueType: 'A fintech office or TQ meeting room',
          },
          {
            title: 'Climate tech breakfast',
            pitch:
              'A monthly breakfast where climate tech founders share progress and partnership opportunities.',
            audience: 'Climate tech founders and operators',
            venueType: 'An impact hub or event space',
          },
          {
            title: 'Product trio circle',
            pitch:
              'Product managers, designers, and engineers discuss how great trios work — and what breaks them.',
            audience: 'Product, design, and engineering leads',
            venueType: 'A coworking meeting room in the Zuidas',
          },
          {
            title: 'Publishers and media night',
            pitch:
              'Publishing, media, and content professionals share industry news and make introductions.',
            audience: 'Media and publishing professionals',
            venueType: 'A media agency office',
          },
          {
            title: 'Hiring circle for scale-ups',
            pitch:
              'Scale-up leaders share how they hire, retain, and structure teams across borders.',
            audience: 'Scale-up founders and people leads',
            venueType: 'A scale-up office',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'NDSM open studio walk',
            pitch:
              'A guided evening through the shipyard studios, meeting makers and seeing work in progress.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The NDSM wharf studios',
          },
          {
            title: 'Noord street-art bike tour',
            pitch:
              'A relaxed bike ride through the murals of Amsterdam-Noord with stories behind the artists.',
            audience: 'Cyclists and art fans',
            venueType: 'The streets of Amsterdam-Noord',
          },
          {
            title: 'Riso and zine night',
            pitch:
              'A hands-on evening of zine making with risograph printing and trading at the end.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'A print studio or arts space',
          },
          {
            title: 'Dutch design peer critique',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Graphic and product designers',
            venueType: 'A design studio in Oost',
          },
          {
            title: 'Ceramics wheel evening',
            pitch:
              'A weekly session where potters share wheels, kilns, and feedback on their pieces.',
            audience: 'Potters and curious beginners',
            venueType: 'A ceramics studio or community workshop',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Housing rights info evening',
            pitch:
              'A plain-language session on rental rules, deposits, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A wijkcentrum or tenant organisation space',
          },
          {
            title: 'Canal cleanup paddle',
            pitch:
              'A morning spent picking litter from the canals in canoes and kayaks, with coffee afterwards.',
            audience: 'Water lovers and volunteers',
            venueType: 'A canal-side launch point',
          },
          {
            title: 'Neighbourhood garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or shared courtyard',
          },
          {
            title: 'Volunteer fair for local causes',
            pitch:
              'Local charities set up tables and recruit volunteers over free coffee and apple pie.',
            audience: 'First-time volunteers',
            venueType: 'A wijkcentrum or public library',
          },
          {
            title: 'Jordaan shopkeeper stories',
            pitch:
              'Independent shop owners share five-minute stories behind their counters, followed by open questions.',
            audience: 'Neighbours and small business owners',
            venueType: 'A Jordaan café or shop space',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Amsterdam, recurring formats with a fixed venue — a weekly borrel, a monthly ride, a regular café table — build community fastest.',
      },
      {
        question: 'Do I need to speak Dutch to organise?',
        answer:
          'No. English is widely spoken and many groups run in English. A little Dutch goes a long way with neighbours, but you can start a community today in English.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Amsterdam communities start, and the bruin café tradition gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Amsterdam?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real neighbourhoods, venues, and formats where Amsterdammers gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Amsterdam?',
      answer:
        'Yes. Amsterdam is compact, welcoming, and full of natural venues — bruin cafés, parks, and community centres. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — bruin cafés, NDSM studios, the Vondelpark, Albert Cuyp market, public libraries — exists in Amsterdam. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Amsterdam?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Amsterdammers find or start communities.',
    },
  ],
};

export default content;
