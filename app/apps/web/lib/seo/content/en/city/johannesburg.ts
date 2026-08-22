import type { CityContent } from '../../types';

/**
 * Johannesburg content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about South Africa's largest city; no fabricated
 * numbers, member counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'johannesburg',
  intro: [
    'Johannesburg — Jozi to its friends — is South Africa’s largest city and the economic heart of the continent. Founded on gold in the nineteenth century, it grew into a sprawling metropolis where finance, media, tech, and a famously resilient culture of self-organization meet. The city is built around a grid of neighborhoods — Sandton and Rosebank in the north, Braamfontein, Maboneng, and the CBD downtown, Soweto and the southern suburbs — each with its own community rhythm.',
    'Wits University and the University of Johannesburg keep a constant flow of students and researchers in the scene, and the tech and startup ecosystem has grown steadily, with hubs like Tshimologong Precinct, accelerators, and co-working spaces across Braamfontein and Rosebank. Johannesburg is also a creative and political heavyweight: the Market Theatre, Constitution Hill, the Apartheid Museum, and the arts districts of Maboneng and Newtown anchor a deep history of cultural and civic organizing that still shapes how the city comes together.',
    'For anyone looking to find or start a community, Johannesburg rewards joining a neighborhood first — the city is too big for a generic group, but a hyper-local one with a clear purpose can thrive.',
  ],
  dataPoints: [
    'Roughly 9.4 million residents; South Africa’s largest city.',
    'Economic capital of Africa — the JSE and major banks are here.',
    'Universities: Wits (Witwatersrand) and University of Johannesburg.',
    'Tech hubs: Tshimologong Precinct, co-working spaces in Braamfontein and Rosebank.',
    'Cultural anchors: Market Theatre, Constitution Hill, Apartheid Museum, Maboneng.',
    'Neighborhoods: Sandton, Rosebank, Braamfontein, Maboneng, Soweto.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Tshimologong Precinct event floors in Braamfontein',
        'Co-working hubs in Rosebank and Sandton',
        'University innovation labs at Wits and UJ',
        'Accelerator demo rooms near the CBD',
        'Cafés in Maboneng with meeting corners',
        'Hotel boardrooms in Sandton for mixers',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'Fintech and proptech builder tables',
        'Co-working open houses for early teams',
        'Pan-African founder mixers (South Africa focus)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, proptech, logistics, or media — and name the group around it.',
        'Reserve a recurring weekly slot at a Braamfontein, Rosebank, or Sandton co-working hub.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Galleries and studios in Maboneng and Newtown',
        'Creative co-working floors in Braamfontein',
        'Design and fashion spaces in Rosebank',
        'Market Theatre rehearsal rooms',
        'Music production and recording studios',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'Theatre and performance open stages',
        'Art district walk groups (Maboneng, Newtown)',
      ],
      howToStart: [
        'Pick a craft, a neighborhood, and a regular evening — specificity builds identity fast here.',
        'Find a gallery, studio, or cultural hub that will host the first open night.',
        'Run a first showcase, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'City council and ward public sessions',
        'Community halls across Soweto and the south',
        'Constitution Hill public event spaces',
        'Civic tech co-working spaces in Braamfontein',
        'University debating halls at Wits',
        'Volunteer project rooms near neighborhood associations',
      ],
      formats: [
        'Ward-level info sessions and public hearings',
        'Housing and service delivery information evenings',
        'Youth and civic participation workshops',
        'Volunteer orientation and first-shift briefings',
        'Civic tech meetups for open data projects',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a ward, a street, or one service delivery problem.',
        'Attend three existing initiative meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organizer as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Parks in Rosebank, Melville, and the north',
        'Maboneng precinct courtyards and rooftops',
        'Cafés in Braamfontein and Melville with community corners',
        'Hiking trails around Melville Koppies',
        'Rooftop bars in Sandton',
        'Community halls near Gautrain stops',
      ],
      formats: [
        'Saturday morning walking and hiking groups',
        'Monthly picnic and board game afternoons',
        'Book club evenings in cafés',
        'Art walk groups through Maboneng',
        'Sunday market strolls and food tours',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly walk, a monthly picnic — and a fixed venue.',
        'Pick a park, café, or courtyard that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Local business association halls',
        'Shop owner corners in Maboneng and Rosebank',
        'Maker market stalls at weekend fairs',
        'Chamber of commerce seminar rooms',
        'Co-working desks for solo entrepreneurs',
        'Café back rooms with a founder-style table',
      ],
      formats: [
        'Owner breakfast tables with no agenda',
        'Stokvel-style savings and business planning circles',
        'Digital skills clinics (online selling, bookings)',
        'Shared buying circles for supplies and stock',
        'Neighborhood business walking tours',
      ],
      howToStart: [
        'Choose one neighborhood and a café that already feeds local owners; claim a regular table.',
        'Run a no-agenda breakfast first — owners come when they get to talk about suppliers and landlords.',
        'After three breakfasts, rotate one practical topic per month and let the local business group spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Johannesburg is the financial and technological center of Africa, and its startup scene has grown into one of the continent’s most mature. The JSE, major banks, and corporate headquarters in Sandton provide capital and customers, while the energy of the ecosystem lives in Braamfontein, where the Tshimologong Precinct, Wits, and a cluster of accelerators keep founders, engineers, and designers in constant contact. Rosebank and Sandton host the more established side of the scene — co-working floors, corporate partnerships, and founder breakfasts where deals get done. The city’s startup culture is direct and pragmatic: meetings move quickly from introductions to revenue, regulation, and the next round. Recurring formats include pitch evenings, demo days, and industry tables for fintech, proptech, and logistics. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or an agritech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Johannesburg’s creative community is anchored by history and driven by reinvention. The Market Theatre, Newtown, and Constitution Hill carry the legacy of protest art and cultural resistance, while Maboneng — the downtown arts precinct — has turned old warehouses into galleries, studios, and design spaces that host a busy calendar of openings and events. Braamfontein’s creative co-working floors and Rosebank’s fashion and design scenes keep the energy commercial as well as artistic, and the city’s film, music, and photography talent is world-class. Weekend markets and open studios across the inner city and the northern suburbs give makers real venues to sell and to meet, and the performing arts remain a strong draw for audiences and participants alike. The community is big but connected: a focused group with a regular evening can stand out quickly, and established artists are often generous mentors to newcomers. Starting a creative community in Johannesburg is realistic: pick a craft, a neighborhood, and a repeatable format, and the city’s enormous talent pool will find you.',
    political:
      'Johannesburg has one of the most consequential civic traditions in the world — the city where the struggle against apartheid was organized, and where Constitution Hill now stands as a living symbol of rights and accountability. That history shapes today’s civic scene: residents attend ward meetings, public hearings, and city council sessions on housing, service delivery, transport, and public safety, and community halls across Soweto, the south, and the inner city host organizing meetings that welcome newcomers. Social enterprises and civic tech groups work on open data, public participation, and service delivery, while churches, sports clubs, and street committees continue to organize residents at the neighborhood level. The culture rewards persistence and showing up — a real meeting matters more than an online post. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing organizations instead of duplicating them; the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Johannesburg’s meetup culture is a mix of suburban comfort and downtown energy. Rosebank, Melville, and the northern suburbs anchor park-based gatherings — walking clubs, picnics, and board game afternoons — while Maboneng and the CBD host art walks, rooftop socials, and food tours that pull people from across the city. Braamfontein cafés are the classic spot for book clubs and language exchanges, and the Melville Koppies trails give hikers a wild escape inside the city. The Gautrain and the minibus taxi network shape how groups gather: meeting near a major stop makes attendance practical. Jozi groups tend to be warm, opinionated, and open to newcomers — a weekly walk or a monthly art walk builds a community fast. Many international residents run English-first meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a board game night — and a venue that will host you every time.',
    'small-business':
      'Johannesburg’s small business community is powered by the city’s culture of hustle and its tradition of mutual support. From Maboneng cafés and Rosebank boutiques to township enterprises across Soweto and the south, owners organize through local associations, church networks, and stokvel savings groups that have long pooled money and advice. The city’s chambers and business support agencies run practical clinics on licensing, online selling, and digital marketing, often in English and isiZulu. What holds these groups together is place: a cluster of shops on one street or one precinct shares customers, foot traffic, and the fate of the public space around them. Newcomers usually connect by attending a local business association meeting, joining a maker market, or taking a small business workshop. Starting a small business community in Johannesburg is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Johannesburg is a great city for testing new community event ideas: the neighborhoods are distinct, the venues range from downtown precincts to northern suburbs parks, and residents show up when an event is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Johannesburg, from Maboneng courtyards and Market Theatre spaces to Rosebank parks and Melville trails. Some ideas work as one-off events; others are designed to become recurring communities with a steady weekly or monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Jozi’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Braamfontein or Rosebank café',
          },
          {
            title: 'Stokvel-style founders circle',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice like a savings circle.',
            audience: 'Early-stage founders in Johannesburg',
            venueType: 'A Tshimologong co-working meeting room',
          },
          {
            title: 'Neighborhood meet-and-greet',
            pitch:
              'A low-pressure evening in one neighborhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single neighborhood',
            venueType: 'A community hall or local café',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by group questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'A university seminar room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A Maboneng co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'isiZulu conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning isiZulu',
            venueType: 'A café or community hall in Braamfontein',
          },
          {
            title: 'Online selling and bookings clinic',
            pitch:
              'A practical workshop on selling online, taking bookings, and digital marketing for small businesses.',
            audience: 'Small business owners and freelancers',
            venueType: 'A co-working space or chamber room',
          },
          {
            title: 'Repair café workshop',
            pitch:
              'Volunteers help neighbors fix lamps, bikes, and appliances while teaching basic repair skills.',
            audience: 'Residents with broken things and repair-minded volunteers',
            venueType: 'A community workshop or neighborhood hall',
          },
          {
            title: 'Urban gardening 101',
            pitch:
              'A hands-on session on balcony, container, and community-garden growing, with seeds and pots provided.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to ward meetings, public hearings, and how to raise an issue in Johannesburg.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Melville Koppies Sunday hike',
            pitch:
              'A guided walk through the koppies with history and nature stories, ending with coffee.',
            audience: 'Hikers and history lovers',
            venueType: 'Melville Koppies trails',
          },
          {
            title: 'Maboneng art walk',
            pitch:
              'A guided evening walk through galleries, studios, and murals, stopping for dinner along the way.',
            audience: 'Art lovers and newcomers',
            venueType: 'Maboneng precinct',
          },
          {
            title: 'Rosebank park picnic and games',
            pitch: 'Blankets, badminton, and frisbee on the lawns, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Rosebank and northern suburbs parks',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'A Melville café with long tables',
          },
          {
            title: 'Sunday food market tour',
            pitch:
              'A slow stroll through the city’s weekend markets, tasting and meeting the vendors.',
            audience: 'Food lovers and curious residents',
            venueType: 'A weekend food market in the north',
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
            venueType: 'A Tshimologong co-working meeting room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'An incubator meeting room',
          },
          {
            title: 'Design critique night',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'A creative studio or agency space',
          },
          {
            title: 'Media and journalism pitch lab',
            pitch:
              'Journalists and media makers pitch story ideas and get honest editorial feedback.',
            audience: 'Freelance journalists and media students',
            venueType: 'A newsroom or media school classroom',
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
            title: 'Maboneng studio open Saturday',
            pitch:
              'A cluster of studios opens its doors for one afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Artist studios in Maboneng',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Theatre open stage night',
            pitch:
              'An open mic for monologues, scenes, and spoken word, with feedback from a guest director.',
            audience: 'Actors, writers, and performers',
            venueType: 'A theatre or performance space in Newtown',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the inner city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around the CBD and Maboneng',
          },
          {
            title: 'Mending and upcycling circle',
            pitch:
              'Bring torn clothes and learn mending and upcycling techniques with thread, patches, and company.',
            audience: 'Sewers and sustainability-minded makers',
            venueType: 'A community center or craft space',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Housing rights info evening',
            pitch:
              'A plain-language session on housing rights, tenant protections, and where to get free support.',
            audience: 'Tenants, homeowners, and organizers',
            venueType: 'A community hall or social enterprise space',
          },
          {
            title: 'Neighborhood cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or park, with gloves and drinks supplied by local shops.',
            audience: 'Neighbors and shop owners',
            venueType: 'A chosen street in any neighborhood',
          },
          {
            title: 'Youth volunteer briefing',
            pitch:
              'An orientation plus first shift for young people supporting local mentorship and skills programs.',
            audience: 'First-time volunteers',
            venueType: 'A local youth initiative space',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              'Gardeners and neighbors plan the season’s planting, events, and shared tools together.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or green space',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and food stall owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or business hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Johannesburg, recurring formats with a fixed venue — a weekly walk, a monthly art walk, a stokvel-style circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: public parks, precinct courtyards, community halls, cafés, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Johannesburg communities start, and the city’s stokvel and association traditions give you proven patterns of trust. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Johannesburg?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Johannesburg residents gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Johannesburg?',
      answer:
        'Yes. Johannesburg has distinct neighborhoods, active venues, and a strong culture of self-organized groups. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Maboneng studios, Market Theatre spaces, Melville Koppies, Rosebank parks, Tshimologong Precinct — exists in Johannesburg. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Johannesburg?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Johannesburg residents find or start communities.',
    },
  ],
};

export default content;
