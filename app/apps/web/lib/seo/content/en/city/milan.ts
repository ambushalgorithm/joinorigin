import type { CityContent } from '../../types';

/**
 * Milan content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'milan',
  pageTitles: {
    city: 'Communities in Milan | JoinOrigin',
    cityDescription:
      'Find or start communities in Milan — startup, creative, political, meetup, and small business groups across the Lombard capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Milan | JoinOrigin',
      creative: 'Creative communities in Milan | JoinOrigin',
      political: 'Political & civic communities in Milan | JoinOrigin',
      meetup: 'Meetup & social communities in Milan | JoinOrigin',
      'small-business': 'Small business communities in Milan | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Milan — founders, engineers, and operators around Porta Nuova, Isola, and the fintech scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Milan — design studios, fashion ateliers, and galleries across Brera, Navigli, and Lambrate. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Milan — neighbourhood committees, housing activism, and urban regeneration campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Milan — aperitivo evenings, Navigli gatherings, and park life. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Milan — market traders, ateliers, and family shop networks. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Milan | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Milan — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Milan is Italy’s engine room — the capital of fashion, design, and finance — but its communities run on a much older fuel: the aperitivo. Every evening, bars across the city serve drinks with generous buffets, and the ritual of standing at a counter with colleagues, neighbours, and strangers is the social glue of the city. The Navigli canals, Brera’s cobbled streets, and the Porta Nuova towers each host their own version of this nightly gathering.',
    'The city’s identity is shaped by two global events: Fashion Week and the Salone del Mobile design fair, which between them pull the world’s creative professionals to Milan every year. Yet the everyday city is a patchwork of courtyards, markets, and family workshops. Universities such as the Politecnico and Bocconi feed a constant stream of talent, and the city’s flat geography makes cycling and walking natural ways to move between communities.',
    'Milanese culture is polite but reserved — communities form through introductions and consistency. Newcomers who show up at the same aperitivo, join a local association, or take a table at a neighbourhood market will find the city opens quickly.',
  ],
  dataPoints: [
    'Roughly 1.4 million residents; the capital of Lombardy, Italy.',
    'Universities include the Politecnico di Milano, Bocconi, and the Università degli Studi.',
    'Global hub for fashion and design — Fashion Week and the Salone del Mobile.',
    'Public anchors: the Navigli canals, Parco Sempione, and the Idroscalo lake.',
    'Aperitivo culture — the evening drink with buffet is the city’s social ritual.',
    'Business district at Porta Nuova; creative districts in Brera, Navigli, and Lambrate.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking and accelerator floors in Porta Nuova',
        'Innovation hubs in Isola',
        'Fintech event rooms near the Garibaldi towers',
        'Bocconi and Politecnico entrepreneurship spaces',
        'Startup cafés along the Navigli',
        'Rooftop terraces for evening mixers',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'Fashion-tech and design-tech founder tables',
        'Fintech and payments happy hours',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — fashion tech, fintech, or design tech — and an English-friendly name.',
        'Reserve a weekly slot at a Porta Nuova or Isola coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Design studios in Brera and the Tortona district',
        'Fashion ateliers near the Quadrilatero della Moda',
        'Galleries along the Navigli',
        'Lambrate maker spaces in former factories',
        'Art school workshop rooms',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Studio open days during the Salone del Mobile',
        'Gallery walkthroughs with artist talks',
        'Design and fashion critique evenings',
        'Maker lab nights in Lambrate',
        'Portfolio review sessions with studio owners',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — Brera for design, Lambrate for making.',
        'Partner with a studio or gallery to host the first critique night; Salone week is a natural debut.',
        'Make feedback the ritual: every session ends with three spoken comments per work, then an aperitivo.',
      ],
    },
    political: {
      venues: [
        'Municipal council rooms and district councils',
        'Neighbourhood committee halls',
        'Housing and tenant association rooms',
        'Community centres across the city',
        'Civic tech meetup spaces',
        'Public libraries with meeting rooms',
      ],
      formats: [
        'Open district council sessions',
        'Housing and rent info evenings',
        'Urban regeneration walk-and-talks',
        'Volunteer briefings and first-shift sessions',
        'Participatory budget workshops',
      ],
      howToStart: [
        'Pick one concrete issue and a small geography — a piazza, a rail yard, or one housing policy.',
        'Join the neighbourhood committee that covers your area and offer to run one meeting with them.',
        'Use the city’s public consultation calendar to anchor your second event around a live decision.',
      ],
    },
    meetup: {
      venues: [
        'Aperitivo bars along the Navigli',
        'Parco Sempione lawns',
        'Brera cafés and courtyards',
        'Board game cafés in the centre',
        'Idroscalo lake and park',
        'Community centres with courtyard tables',
      ],
      formats: [
        'Weekly aperitivo at the same bar',
        'Navigli sunset walks',
        'Cycling rides to the countryside',
        'Board game and trivia evenings',
        'Language exchange tables (Italian–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly aperitivo, a monthly ride — and a fixed venue.',
        'Pick a Navigli bar, park corner, or lake spot that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Covered markets — Via Fauché, viale Papiniano',
        'Ateliers and botteghe in Brera and Porta Genova',
        'Aperitivo bar owners’ tables',
        'Chamber of commerce seminar rooms',
        'Family shop corridors in the centre',
        'Craft fairs and design-market stalls',
      ],
      formats: [
        'Early-market owner coffee before opening',
        'Bottega and atelier open evenings',
        'Chamber workshops on permits and digitalisation',
        'Shared buying circles for supplies',
        'Shopping-street event planning sessions',
      ],
      howToStart: [
        'Anchor the group to one market or shopping street — viale Papiniano’s Saturday market is a proven magnet.',
        'Invite a veteran stallholder or a chamber delegate to co-host the first breakfast.',
        'Collect the owners’ recurring headaches — permits, rent, digital payments — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Milan’s startup scene has grown into Italy’s most active, anchored by the Porta Nuova business district, where glass towers house accelerators, venture funds, and international tech companies. The city’s industrial and creative heritage gives its ecosystem a distinctive flavour: fashion tech, design tech, and fintech are recurring strengths, and Politecnico and Bocconi feed a deep bench of engineers and business graduates. Isola, once a working-class quarter, now hosts innovation hubs and startup cafés, while the Navigli carry the after-hours energy. Formats include founder breakfasts, pitch evenings, demo days, and fintech happy hours that rotate between office terraces and canal-side bars. The community is international — English is common in meetups, while Italian remains the default for many local groups. Milan’s culture is more formal than Rome’s: introductions matter, and a warm referral opens doors. Starting a startup community here works best with a narrow vertical and a regular rhythm — a monthly fashion-tech table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Milan is the design capital of Italy and arguably of the world: the Salone del Mobile and Fashion Week pull creative professionals from every continent, and the city’s studios, ateliers, and galleries work at global standards year-round. Brera is the heart of the art and design district, the Tortona area hosts the design week’s most famous exhibitions, and Lambrate’s former factories have become maker spaces where furniture, objects, and technology are prototyped. The fashion system around the Quadrilatero della Moda connects ateliers, pattern-makers, and emerging designers in a tight, referral-driven network. Formats include studio open days, gallery walkthroughs, portfolio reviews, and design critique evenings, with aperitivo providing the natural closing ritual. The scene is compact and connected — a good project can travel from a Lambrate workshop to a Brera gallery in a week. Starting a creative community in Milan is realistic: pick a craft, a district, and a regular evening, and the density of skilled, ambitious people will find you.',
    political:
      'Milan’s civic life is shaped by the city’s transformation from an industrial powerhouse into a global service city — and by the battles over who benefits. The Porta Nuova skyscrapers symbolise the boom, while neighbourhood committees in Isola, Scalo Farini, and the periphery campaign for affordable housing, green space, and a fair share of regeneration. Housing is a defining issue: rents have climbed with the city’s fortunes, and tenant associations run info evenings and legal clinics open to newcomers. The city’s participatory budgeting and public consultation processes give organised residents real influence over parks, streets, and civic buildings. Community centres across the city host meetings, language classes, and volunteer groups. The political culture rewards preparation and courtesy: Milanese activists are organised, and well-prepared groups are taken seriously. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing committees — the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Milan’s meetup scene is built on the aperitivo, the Navigli, and the park. The evening drink with buffet is the city’s great social equaliser: office workers, students, and retirees stand at the same counters, and a group that claims a regular bar quickly becomes part of its furniture. The Navigli canals are the classic destination — sunset walks, canal-side bars, and boats that turn group outings into floating parties. Parco Sempione offers green lawns in the shadow of the castle, and the Idroscalo lake draws swimmers, rowers, and picnickers in summer. Formats include weekly aperitivos, board game and trivia evenings, cycling rides into the flat Lombard countryside, and language exchanges (Italian–English). The city’s evening rhythm is perfect for meetups — a group that starts at seven and wanders through dinner is following the local script. Starting a meetup in Milan means choosing a repeatable format and a fixed venue, and the city’s love of good company does the rest.',
    'small-business':
      'Milan small business communities are anchored by the city’s markets, ateliers, and family workshops. Covered markets like Via Fauché and viale Papiniano are not just places to shop — they are communities of stallholders who share suppliers, schedules, and gossip. The botteghe — artisanal workshops making shoes, frames, lamps, and jewellery — cluster in Brera and Porta Genova, where owners know each other across decades. The aperitivo economy adds a layer of bar and restaurant owners who coordinate suppliers and late-night logistics. The chamber of commerce offers workshops on permits, digitalisation, and exporting, while craft fairs and design markets give makers a shared calendar. What binds these groups is craft pride and place: a market hall or a workshop street is a natural community with a collective stake in quality and foot traffic. Starting a small business community is very achievable: a monthly trader breakfast at a market hall, with rotating topics like rent, permits, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Milan is an ideal city for testing new community event ideas: aperitivo bars give every group a natural venue, the parks and the Idroscalo are free gathering spots, and the city’s design culture rewards well-made events. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Milan, from Navigli bars and covered markets to Lambrate maker spaces and Parco Sempione. Some ideas work as one-off events; others are designed to become recurring communities with an aperitivo rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Milan’s style do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Aperitivo for newcomers',
            pitch:
              'A weekly evening drink at the same Navigli bar where newcomers and long-term residents trade city tips over Spritz.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'An aperitivo bar on the Navigli',
          },
          {
            title: 'Founder breakfast near Porta Nuova',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over espresso and cornetti.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café in the Porta Nuova district',
          },
          {
            title: 'Brera meet-and-greet',
            pitch:
              'A low-pressure evening in the art district, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents and creative professionals',
            venueType: 'A Brera café or courtyard',
          },
          {
            title: 'Expat Milan circle',
            pitch:
              'International residents share settling-in tips — paperwork, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café in Isola',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Italian table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Italian',
            venueType: 'A café or community centre in Brera',
          },
          {
            title: 'Codice fiscale and tax clinic',
            pitch:
              'A practical session on registration, the codice fiscale, and the tax basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Espresso and coffee culture school',
            pitch:
              'A roaster guides you through beans, blends, and the right way to order at the counter.',
            audience: 'Coffee lovers and curious newcomers',
            venueType: 'A coffee roastery or torrefazione',
          },
          {
            title: 'Design thinking workshop',
            pitch:
              'A hands-on introduction to the design methods that made Milan famous, taught by working designers.',
            audience: 'Professionals and curious beginners',
            venueType: 'A design school or studio room',
          },
          {
            title: 'Opera 101 evening',
            pitch:
              'A friendly introduction to opera — stories, arias, and what to expect on your first visit to the theatre.',
            audience: 'Culture lovers and first-timers',
            venueType: 'An opera school or cultural centre',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Navigli sunset walk',
            pitch:
              'A slow evening stroll along the canals with aperitivo stops at the best-known bridges.',
            audience: 'Sunset lovers and newcomers',
            venueType: 'The Navigli banks and bridges',
          },
          {
            title: 'Sempione park picnic',
            pitch:
              'Blankets, frisbee, and board games in the shadow of the castle, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Parco Sempione lawns',
          },
          {
            title: 'Aperitivo crawl through Brera',
            pitch:
              'A guided evening crawl through five bars, with one shared plate and story at each.',
            audience: 'Food lovers and newcomers',
            venueType: 'The bars of the Brera district',
          },
          {
            title: 'Cycling tour to the countryside',
            pitch:
              'A relaxed weekend ride out of the city to the Lombard countryside, with café stops and a picnic.',
            audience: 'Leisure cyclists of every pace',
            venueType: 'A cycling club meeting point',
          },
          {
            title: 'Idroscalo lake day',
            pitch:
              'A summer afternoon of swimming, paddleboarding, and picnicking at the city’s own lake.',
            audience: 'Water lovers and families',
            venueType: 'The Idroscalo lake and park',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fashion tech circle',
            pitch:
              'Fashion professionals and technologists discuss sustainability, digital stores, and new materials.',
            audience: 'Fashion and tech professionals',
            venueType: 'A fashion district showroom or event space',
          },
          {
            title: 'Design studio owners night',
            pitch:
              'Studio owners compare client management, hiring, and project pricing with peers over drinks.',
            audience: 'Small design studio owners',
            venueType: 'A design studio in Tortona',
          },
          {
            title: 'Fintech founders table',
            pitch:
              'A monthly roundtable for fintech founders to share progress, regulation learnings, and partnerships.',
            audience: 'Fintech founders and operators',
            venueType: 'A Porta Nuova office or event space',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in Isola',
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
            title: 'Brera gallery night',
            pitch:
              'A guided evening walk through the galleries of the art district, with talks and an aperitivo at the end.',
            audience: 'Art lovers and students',
            venueType: 'The galleries of Brera',
          },
          {
            title: 'Lambrate maker lab visit',
            pitch:
              'A guided evening in the maker district’s workshops, seeing furniture and objects being prototyped.',
            audience: 'Makers and design fans',
            venueType: 'The maker labs of Lambrate',
          },
          {
            title: 'Fashion upcycling atelier night',
            pitch:
              'A clothing swap followed by a redesign session with sewing machines and an atelier seamstress.',
            audience: 'Fashion lovers and makers',
            venueType: 'A fashion atelier or sewing workshop',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
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
            title: 'Renters rights info evening',
            pitch:
              'A plain-language session on rent rules, leases, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenant association or community centre',
          },
          {
            title: 'Neighbourhood regeneration walk',
            pitch:
              'Tour a changing district with residents and planners and learn how regeneration is decided.',
            audience: 'Urbanists and neighbourhood activists',
            venueType: 'A district hall or the neighbourhood itself',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in an urban garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or orti urbani',
          },
          {
            title: 'Volunteer fair for local causes',
            pitch:
              'Local charities set up tables and recruit volunteers over free coffee and pastries.',
            audience: 'First-time volunteers',
            venueType: 'A community centre or library',
          },
          {
            title: 'Market stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A covered market like viale Papiniano',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Milan, recurring formats with a fixed venue — a weekly aperitivo, a monthly ride — build community fastest.',
      },
      {
        question: 'Do I need to speak Italian to organise?',
        answer:
          'No. Many Milan groups run in English or are bilingual, especially in tech, design, and fashion. A little Italian opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Milan communities start, and the aperitivo tradition gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Milan?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Milanesi gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Milan?',
      answer:
        'Yes. Milan has aperitivo bars everywhere, generous parks, and a strong associational culture. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Navigli bars, covered markets, Parco Sempione, maker labs, community centres — exists in Milan. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Milan?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Milanesi find or start communities.',
    },
  ],
};

export default content;
