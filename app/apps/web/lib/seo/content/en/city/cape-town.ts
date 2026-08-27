import type { CityContent } from '../../types';

/**
 * Cape Town content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other authored city files (G5). Honest,
 * evergreen prose about South Africa's legislative capital; no fabricated
 * numbers, member counts, ratings, or local offices.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'cape-town',
  intro: [
    'Cape Town is South Africa’s legislative capital and a city shaped by two dramatic features: the mountains that rise directly from the city bowl and the ocean that wraps around three sides of the peninsula. Table Mountain, Lion’s Head, and Signal Hill give residents world-class hiking right at their doorstep, while beaches from Camps Bay to Muizenberg anchor surf, swim, and picnic cultures that run year-round.',
    'The city’s community life mixes a mature creative and tech scene with a strong outdoor culture. Woodstock, Observatory, and the City Bowl host galleries, studios, and co-working spaces; universities like UCT, CPUT, and nearby Stellenbosch supply students and researchers; and initiatives from the tech community — often called Silicon Cape — organize meetups, founder breakfasts, and demo nights. Community life also runs through the city’s diverse neighborhoods, from the Southern Suburbs to Khayelitsha and other townships, where churches, sports clubs, and social enterprises have long organized residents.',
    'For anyone looking to find or start an Origin, Cape Town rewards showing up outdoors, choosing a neighborhood that fits your group, and building on the city’s habit of mixing business with beauty.',
  ],
  dataPoints: [
    'Roughly 4.8 million residents; South Africa’s legislative capital.',
    'Mountain anchors: Table Mountain, Lion’s Head, Signal Hill.',
    'Beach culture: Camps Bay, Clifton, Muizenberg, and the Cape Peninsula.',
    'Home to UCT, CPUT, and nearby Stellenbosch University.',
    'Tech + creative scene often called Silicon Cape.',
    'Neighborhoods: Woodstock, Observatory, City Bowl, Southern Suburbs.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Co-working hubs in the City Bowl and Woodstock',
        'Incubator event floors near V&A Waterfront',
        'University innovation labs at UCT and Stellenbosch',
        'Cafés in Observatory with quiet meeting corners',
        'Hotel boardrooms in the Foreshore',
        'Tech event venues in Century City',
      ],
      formats: [
        'Founder breakfasts with fast intros',
        'Pitch evenings and demo days',
        'Fintech and agritech builder tables',
        'Co-working open houses for early teams',
        'Pan-African founder mixers (Southern Africa focus)',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, agritech, tourism tech, or edtech — and name the group around it.',
        'Reserve a recurring weekly slot at a City Bowl or Woodstock co-working hub.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Galleries and studios in Woodstock and Observatory',
        'Creative co-working floors in the City Bowl',
        'Design and fashion spaces in Green Point',
        'Photography studios near the Waterfront',
        'Music rehearsal rooms and record studios',
        'Cafés with long tables for critiques',
      ],
      formats: [
        'Portfolio nights and open studio weekends',
        'Design critique evenings',
        'Film and photography circles that share gear',
        'First Thursdays art walk groups',
        'Music production and songwriting sessions',
      ],
      howToStart: [
        'Pick a craft, a neighborhood, and a regular evening — specificity builds identity fast here.',
        'Find a gallery, studio, or creative hub that will host the first open night.',
        'Run a first showcase, collect works in progress, and make feedback the standing agenda.',
      ],
    },
    political: {
      venues: [
        'City council public sessions',
        'Community halls in the Southern Suburbs and townships',
        'Civic tech co-working spaces in Woodstock',
        'University debating halls at UCT',
        'Social enterprise meeting rooms in Khayelitsha',
        'Volunteer project rooms near neighborhood associations',
      ],
      formats: [
        'Ward-level info sessions and public hearings',
        'Housing and land-rights information evenings',
        'Youth and civic participation workshops',
        'Volunteer orientation and first-shift briefings',
        'Civic tech meetups for open data projects',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a ward, a housing project, or one street.',
        'Attend three existing initiative meetings first and partner instead of duplicating work.',
        'Host an open info evening with a real organizer as co-host to build a trustworthy base.',
      ],
    },
    meetup: {
      venues: [
        'Table Mountain and Lion’s Head trailheads',
        'Beaches — Camps Bay, Clifton, and Muizenberg',
        'Cafés in Observatory and the City Bowl',
        'Rooftop bars in Green Point',
        'Parks in the Southern Suburbs',
        'Community halls near MyCiTi stops',
      ],
      formats: [
        'Saturday morning hiking and trail groups',
        'Surf and swim meetups at Muizenberg',
        'Monthly picnic and board game afternoons',
        'Book club evenings in cafés',
        'Sunday market strolls and art walk groups',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly hike, a monthly beach picnic — and a fixed venue.',
        'Pick a trailhead, beach, park, or café that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Local business association halls',
        'Shop owner corners in Woodstock and the City Bowl',
        'Maker market stalls at weekend fairs',
        'Chamber of commerce seminar rooms',
        'Co-working desks for solo entrepreneurs',
        'Café back rooms with a founder-style table',
      ],
      formats: [
        'Owner breakfast tables with no agenda',
        'Small business planning and referral circles',
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
      'Cape Town’s startup scene — often called Silicon Cape — combines the discipline of a mature tech ecosystem with the lifestyle advantages of a coastal city. Founders cluster in the City Bowl, Woodstock, and around the V&A Waterfront, where co-working hubs, accelerators, and university programs at UCT and Stellenbosch keep talent and capital moving. The ecosystem has strengths in fintech, agritech, tourism tech, and edtech, and it serves both the local market and the wider continent. Meetings here tend to be professional but relaxed: pitch evenings and demo days draw investors, and founder breakfasts regularly run in English with a mix of South Africans and international newcomers. The city’s beauty is a real recruiting tool — engineers and founders often move here for lifestyle and stay to build companies. Starting a startup Origin here works best with a narrow vertical and a regular rhythm: a monthly fintech builders night or an agritech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Cape Town’s creative community is one of the most distinctive in Africa, shaped by the city’s light, its landscapes, and a tradition of storytelling that spans film, music, design, and the visual arts. Galleries and studios in Woodstock and Observatory anchor a busy exhibition calendar, while First Thursdays — the monthly art walk through the city — brings thousands of people onto the streets to visit galleries, studios, and pop-ups. The film industry is substantial, with production houses in the City Bowl and suburbs, and the music scene runs from jazz and kwaito to electronic and indie. Design, fashion, and architecture talent is strong, and creative co-working floors in Green Point and the City Bowl host everything from portfolio nights to production circles. Because the community is big but connected, a focused group with a regular evening can stand out quickly. Starting a creative Origin in Cape Town is realistic: pick a craft, a neighborhood, and a repeatable format, and the city’s talent pool will find you.',
    political:
      'Cape Town has a deep and sometimes urgent tradition of civic engagement, shaped by its history and by the continuing work of building an inclusive city. Ward-level politics is accessible: residents attend public hearings, city council sessions, and neighborhood meetings on housing, transport, safety, and public space. Community halls across the Southern Suburbs, the Cape Flats, Khayelitsha, and other townships host housing and land-rights information evenings, youth civic workshops, and volunteer briefings that welcome newcomers. Social enterprises and civic tech groups work on open data, public participation, and service delivery, while sports clubs and churches continue to organize residents at the neighborhood level. The culture rewards persistence and showing up — a real meeting matters more than an online post. Starting a political Origin means choosing a concrete issue and a small geography, then partnering with existing organizations instead of duplicating them; the landscape is rich enough that collaboration beats competition.',
    meetup:
      'Cape Town’s meetup culture is inseparable from its outdoor life. Table Mountain and Lion’s Head trailheads host hiking groups nearly every weekend, Muizenberg is a surf-and-swim community that gathers at dawn and after work, and beaches from Camps Bay to Clifton anchor picnic and sunset groups year-round. The City Bowl and Observatory cafés host book clubs, board game nights, and language exchanges, while Green Point rooftops and V&A Waterfront venues are favorite spots for after-work socials. The MyCiTi bus network and the mountain paths make many meeting points easy to reach, and the city’s compact scale means a group can gather in one neighborhood without much travel. Cape Town groups tend to be warm, active, and welcoming to newcomers — a weekly hike or a monthly beach picnic builds a community fast. Many international residents run English-first meetups, so newcomers can plug in quickly. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly surf check, a board game night — and a venue that will host you every time.',
    'small-business':
      'Cape Town’s small business community is as diverse as the city itself, spanning Woodstock maker studios, City Bowl cafés, Southern Suburbs shops, and township enterprises that have long organized through stokvel savings groups and local associations. The city’s tourism economy supports a wide range of hospitality and creative businesses, while maker markets and weekend fairs give artisans real venues to sell and to meet. Business support organizations, chambers, and the provincial economic development agencies run practical clinics on licensing, online bookings, and digital marketing, often in English and isiXhosa. What holds these groups together is place: a cluster of shops on one street shares customers, foot traffic, and the fate of the public space around them. Newcomers usually connect by attending a local business association meeting, joining a maker market, or taking a small business workshop. Starting a small business Origin in Cape Town is very achievable: a monthly roundtable at a local café, with rotating topics like stock, suppliers, and digital tools, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Cape Town is an ideal city for testing new Origin event ideas: the outdoor life is unmatched, the neighborhoods are distinct, and residents show up when an event is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Cape Town, from Table Mountain trailheads and Muizenberg beach to Woodstock galleries and City Bowl co-working spaces. Some ideas work as one-off events; others are designed to become recurring Origins with a steady weekly or monthly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Cape Town’s natural beauty do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Newcomer breakfast club',
            pitch:
              'A regular early breakfast where new arrivals and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A City Bowl café with a community corner',
          },
          {
            title: 'Stokvel-style founders circle',
            pitch:
              'A small rotating group where founders share progress, hold each other accountable, and pool advice like a savings circle.',
            audience: 'Early-stage founders in Cape Town',
            venueType: 'A Woodstock co-working meeting room',
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
            venueType: 'An Observatory co-working café',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'isiXhosa conversation table',
            pitch:
              'Tables by level, one fluent speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Newcomers learning isiXhosa',
            venueType: 'A café or community hall in the City Bowl',
          },
          {
            title: 'Online bookings and selling clinic',
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
            title: 'Fynbos and urban gardening 101',
            pitch:
              'A hands-on session on growing fynbos, herbs, and vegetables in small gardens and balconies.',
            audience: 'Beginner gardeners',
            venueType: 'A community garden or nursery',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to ward meetings, public hearings, and how to raise an issue in Cape Town.',
            audience: 'New activists and curious residents',
            venueType: 'A community hall or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Lion’s Head sunrise hike',
            pitch:
              'A guided pre-dawn hike to watch the sunrise over the city and ocean, with a coffee stop at the end.',
            audience: 'Hikers and early risers',
            venueType: 'Lion’s Head trailhead',
          },
          {
            title: 'Muizenberg surf and swim morning',
            pitch:
              'A relaxed morning of beginner surf lessons and sea swims, followed by coffee at the pavilion.',
            audience: 'Surfers, swimmers, and beach lovers',
            venueType: 'Muizenberg beach',
          },
          {
            title: 'Camps Bay sunset picnic',
            pitch:
              'Blankets, snacks, and sunset views on the beach, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Camps Bay beach',
          },
          {
            title: 'Board game evening in a café',
            pitch:
              'A weekly stack of board games at a neighborhood café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'An Observatory café with long tables',
          },
          {
            title: 'Kirstenbosch Sunday stroll',
            pitch:
              'A slow Sunday walk through the botanical garden with a picnic and a rotating theme.',
            audience: 'Nature lovers and families',
            venueType: 'Kirstenbosch National Botanical Garden',
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
            venueType: 'A City Bowl co-working meeting room',
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
            title: 'Film and media pitch lab',
            pitch:
              'Filmmakers and media makers pitch story ideas and get honest editorial feedback.',
            audience: 'Filmmakers, writers, and media students',
            venueType: 'A film studio or media school classroom',
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
            title: 'Woodstock studio open Saturday',
            pitch:
              'A cluster of studios opens its doors for one afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Artist studios in Woodstock',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'First Thursdays art walk group',
            pitch:
              'A guided monthly walk through galleries and pop-ups, with a stop for dinner and conversation.',
            audience: 'Art lovers and newcomers',
            venueType: 'Galleries around the City Bowl',
          },
          {
            title: 'Street photography walk',
            pitch:
              'A guided walk through the city with prompts for capturing daily life, followed by a group review.',
            audience: 'Photographers of every level',
            venueType: 'Streets around the City Bowl and Bo-Kaap',
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
          'Match the category to your interests and the audience you can reach. In Cape Town, recurring formats with a fixed venue — a weekly hike, a monthly beach picnic, a stokvel-style circle — build community fastest.',
      },
      {
        question: 'Do I need a lot of money to organize?',
        answer:
          'No. Most of these formats work in free or low-cost venues: beaches, mountain trailheads, public parks, community halls, cafés, and co-working spaces. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real Origins?',
        answer:
          'Yes — recurring formats are how most Cape Town Origins start, and the city’s outdoor culture gives you proven patterns of consistency. The how-to guides walk through the first event to a stable Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find an Origin in Cape Town?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business Origins. Each describes the real neighborhoods, venues, and formats where Cape Town residents gather. JoinOrigin is live — create your profile and find or start your Origin today.',
    },
    {
      question: 'Is it realistic to start an Origin in Cape Town?',
      answer:
        'Yes. Cape Town has abundant outdoor space, active neighborhoods, and a strong culture of self-organized groups. The guides cover starting an Origin, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Table Mountain trailheads, Muizenberg beach, Kirstenbosch, Woodstock studios, City Bowl co-working spaces — exists in Cape Town. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Cape Town?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Cape Town residents find or start Origins.',
    },
  ],
};

export default content;
