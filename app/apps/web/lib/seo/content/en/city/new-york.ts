import type { CityContent } from '../../types';

/**
 * New York City content (EN source of truth) — city page + 5 variants
 * + idea page. Unique, honest prose per design §6.4–6.6; no fabricated
 * member counts or local office claims.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'new-york',
  intro:
    'New York City is a place where almost every interest has a group, and where starting a community is a realistic next step for most people. The five boroughs — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island — each host distinct scenes: finance and media professionals in Midtown, founders and designers in SoHo and DUMBO, artists and makers in Bushwick, families and small business owners across Queens and the Bronx. Universities like NYU, Columbia, and CUNY campuses feed constant flows of students, researchers, and alumni into the meetup ecosystem. Public spaces — Central Park, Prospect Park, the High Line, hundreds of community gardens — give groups free, well-known places to gather. The subway makes cross-borough attendance practical, which means communities can grow beyond one neighborhood without losing cohesion. Venue culture is equally rich: coworking spaces, coffee shops, libraries, and even rooftops regularly host evening events. Whether you want to find a community or launch one, New York gives you density, diversity, and infrastructure that few cities can match.',
  dataPoints: [
    'Roughly 8.8 million residents across five boroughs.',
    'Home to NYU, Columbia, CUNY, Fordham, and Pratt Institute.',
    'Finance, technology, media, fashion, and healthcare clusters.',
    'Subway and bus network connect all five boroughs.',
    'Public anchors include Central Park, Prospect Park, and the High Line.',
    'Venue scene: coworking spaces, libraries, coffee shops, community gardens.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in SoHo and Flatiron',
        'Fintech and AI office lobbies in Midtown',
        'Accelerator demo rooms near Union Square',
        'Startup event halls in DUMBO and Brooklyn',
        'University innovation labs at NYU and Columbia',
        'Rooftop lounges in Williamsburg for evening mixers',
      ],
      formats: [
        'Pitch nights and demo days',
        'Co-founder speed dating',
        'Industry-specific happy hours (fintech, healthtech, AI)',
        'Founder office hours with operators and investors',
        'Weekend hackathons and builder jams',
      ],
      howToStart: [
        'Pick a narrow vertical — fintech, climate, healthtech, or AI builders — and name the group around it.',
        'Reserve a recurring weekly slot at a coworking or incubator that will host you consistently.',
        'Run three open meetups before recruiting co-organizers, then split roles and set a monthly cadence.',
      ],
    },
    creative: {
      venues: [
        'Chelsea gallery spaces',
        'Brooklyn film and design studios in DUMBO',
        'Garment district fashion ateliers',
        'Arts collectives and studios in Bushwick',
        'Pratt, Parsons, and SVA campus rooms',
        'Bookstore cafés with reading rooms',
      ],
      formats: [
        'Studio tours and open critique nights',
        'Portfolio reviews in small groups',
        'Themed co-working days for makers',
        'Craft-specific circles (letterpress, knitwear, motion)',
        'Exhibition walkthroughs with artist talks',
      ],
      howToStart: [
        'Choose one craft, borough, or career stage so the group builds a clear identity fast.',
        'Partner with a gallery, studio, or school to host a first open critique night.',
        'Collect portfolios before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'Community board offices across the 59 districts',
        'Public library meeting rooms',
        'Tenant association halls in Brooklyn and the Bronx',
        'Civic tech meetup spaces in Lower Manhattan',
        'Neighborhood center rooms in Queens and Harlem',
        'City Council hearing rooms for testimony practice',
      ],
      formats: [
        'Community board and district meetings',
        'Tenant rights and rent-law workshops',
        'Volunteer phone-banking and canvassing sessions',
        'Civic 101 classes on how city government works',
        'Testimony prep sessions for Council hearings',
      ],
      howToStart: [
        'Pick one concrete issue and a small geography — a block, a district, or one housing policy.',
        'Attend three existing meetings first, then partner with an organization rather than duplicating it.',
        'Host a newcomer-friendly workshop on how city government works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Public libraries across the five boroughs',
        'Neighborhood bars with private rooms',
        'Parks — Central Park, Prospect Park, and the High Line',
        'Community kitchens and gardens in Brooklyn and Queens',
        'Coffee shops in Greenwich Village and Astoria',
        'Rooftops and shared courtyard spaces',
      ],
      formats: [
        'Evening talks with lightning-round intros',
        'Weekend outdoor walks and photo walks',
        'Low-stakes socials that welcome newcomers explicitly',
        'Monthly themed meetups with a repeatable format',
        'Language exchanges and book clubs',
      ],
      howToStart: [
        'Choose a repeatable format — a monthly themed walk, a weekly coworking session — so members build habits.',
        'Find one venue that will host you consistently and lock in the same time and place.',
        'Announce the first three dates up front and ask every attendee to invite one person.',
      ],
    },
    'small-business': {
      venues: [
        'Business improvement district offices in SoHo and Astoria',
        'Merchant association halls and street festival spaces',
        'Local cafés with community rooms',
        'Chamber of commerce event spaces',
        'Neighborhood libraries with meeting rooms',
        'Shop corridors that host evening roundtables',
      ],
      formats: [
        'Monthly owner roundtables at a local café',
        'Street festival planning sessions',
        'City agency workshops on licensing and loans',
        'Merchant association meetings',
        'Peer groups for payroll, marketing, and insurance topics',
      ],
      howToStart: [
        'Pick a corridor or kiez and invite the owners on one street to a first coffee roundtable.',
        'Rotate practical topics — rent, permits, marketing — so every meeting pays for itself.',
        'Partner with the local merchant association or chamber to reach owners beyond your network.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The New York startup scene is one of the most mature in the world, shaped by finance, media, healthcare, and a growing wave of AI and fintech companies. Founders cluster in SoHo, Flatiron, and Brooklyn coworking spaces, while accelerators and university programs at NYU and Columbia keep a steady pipeline of early teams moving. What makes New York different from single-industry hubs is breadth: a founder can meet an investor in the morning, a designer in the afternoon, and a healthcare operator in the evening without leaving Manhattan. Community patterns are well established — pitch nights, demo days, co-founder speed dating, and industry-specific happy hours happen weekly. Newcomers typically start by attending open meetups, joining a coworking community, or volunteering at a conference before launching their own group. The honest advice for starting a startup community here is to pick a narrow vertical — fintech, climate, healthtech, or AI builders — because generalist groups dilute quickly in such a dense market.',
    creative:
      'New York creative communities span graphic design, fashion, film, music, and fine art, and they thrive on the city’s concentration of studios, galleries, and cultural institutions. Chelsea gallery openings, Brooklyn film and design studios, and the garment district’s fashion networks give creatives natural places to gather. Pratt, Parsons, and SVA students graduate into a freelance economy that runs on referrals, which makes community membership a practical career asset, not just a social one. Meetup patterns include studio tours, portfolio reviews, open critique nights, and themed co-working days where illustrators, animators, and product designers share space and feedback. The scene is big enough to support niche communities — letterpress printers, motion designers, knitwear makers — yet compact enough that word travels fast. For anyone starting a creative community, New York rewards specificity: a group focused on one craft, one borough, or one career stage builds identity faster than a general arts club.',
    political:
      'New York political and civic communities operate at every level: neighborhood associations, community boards, citywide advocacy groups, and volunteer networks around housing, climate, transit, and education. Because the city is divided into 59 community districts, local meetings are genuinely accessible — a Brooklyn resident can attend their district’s board meeting or a tenants’ association gathering a few blocks away. Civic tech groups build tools for open data and city services, while advocacy campaigns recruit volunteers for phone banking, canvassing, and testimony at City Council hearings. The political culture rewards persistence and local knowledge: the same organizers who run tenant unions also host newcomer-friendly workshops on how city government works. Starting a civic community usually means picking a concrete issue and a small geography, then partnering with existing organizations rather than duplicating them. This page describes the landscape honestly — every meeting, board, and volunteer opportunity here is part of the real civic fabric of the city.',
    meetup:
      'New York’s meetup and events scene is the connective tissue of the city: thousands of groups gather weekly in coworking spaces, libraries, parks, and bars across all five boroughs. The range is enormous — book clubs in Greenwich Village, running groups along the East River, language exchanges in Astoria, cooking clubs in community kitchens, and hiking clubs that escape to the Hudson Valley on weekends. What makes meetups work in New York is density and transit: a group can realistically meet anywhere in the boroughs and still pull a crowd. Popular formats include evening talks with lightning-round intros, weekend outdoor walks, and low-stakes socials where newcomers are explicitly welcomed. Event platforms, library calendars, and neighborhood social media make discovery practical. If you want to start a meetup, choose a repeatable format — a monthly themed walk, a weekly coworking session — so members can build habits around it. Honest advice: start small, pick a venue that will host you consistently, and let the city’s density do the growth work.',
    'small-business':
      'New York small business communities are woven into the city’s neighborhoods: the bodega owner, the restaurant founder, the Etsy maker, the local accountant, and the shopkeeper all share the same practical questions about rent, permits, customers, and hiring. Business improvement districts and merchant associations in neighborhoods like SoHo, Astoria, and the Bronx organize street festivals, advocacy, and shared resources. City agencies and nonprofit partners offer workshops on licensing, small business loans, and marketing — many of them free and multilingual. What binds these groups together is place: a corridor of shops on one street forms a natural community with a collective stake in foot traffic and public safety. Newcomers typically join by attending a merchant association meeting, taking a small business workshop, or joining a local chamber event. Starting a small business community is realistic: a monthly roundtable at a local café, with rotating topics like payroll, marketing, and insurance, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'New York City offers an endless supply of venues, audiences, and formats for community events, which makes it one of the best cities in the world for trying new gathering ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that realistically exists across the five boroughs. Some work as one-off events; others are designed to become recurring communities. The through-line is honesty: every venue suggestion is a real kind of place in New York, and every format is simple enough for a first-time organizer to run. Pick one that fits your interests, find a partner or two, and let the city’s density take care of the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Five-borough speed networking',
            pitch:
              'A structured evening where participants rotate through timed conversations with a simple prompt: what you do, what you need, who you can help.',
            audience: 'Anyone new to the city or changing careers',
            venueType: 'A coworking space or community hall in Manhattan',
          },
          {
            title: 'Founder AMA at a local coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'SoHo or DUMBO coworking space',
          },
          {
            title: 'Themed supper club',
            pitch:
              'A potluck-style dinner around a theme — home cooking, international cuisine, or zero-waste kitchens — where conversation follows the meal.',
            audience: 'Home cooks and food lovers',
            venueType: 'Community kitchen or rented apartment common room',
          },
          {
            title: 'New Yorker meet-and-greet',
            pitch:
              'A low-pressure social with name tags, icebreaker cards, and a rule that everyone introduces two new people before leaving.',
            audience: 'Recent transplants and longtime residents alike',
            venueType: 'A neighborhood bar or café with a private room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Intro to public speaking',
            pitch:
              'A supportive workshop where attendees practice two-minute talks and get structured, kind feedback.',
            audience: 'Anyone nervous about presenting',
            venueType: 'Library meeting room or community center',
          },
          {
            title: 'Financial literacy for founders',
            pitch:
              'A practical session covering burn rate, runway, cap tables, and when to hire — led by a local finance professional.',
            audience: 'First-time founders and side-hustlers',
            venueType: 'Fintech office space or incubator',
          },
          {
            title: 'Language exchange lunch',
            pitch:
              'Tables are labeled by language; participants spend twenty minutes per table practicing conversation over lunch.',
            audience: 'Language learners and native speakers',
            venueType: 'A café or park picnic area in Astoria or Jackson Heights',
          },
          {
            title: 'Civic 101 workshop',
            pitch:
              'A plain-English workshop on how city government works: community boards, budgets, and how to testify at hearings.',
            audience: 'New activists and curious residents',
            venueType: 'Local library or community board office',
          },
          {
            title: 'Coding night for absolute beginners',
            pitch:
              'A guided evening where beginners build their first small project with mentors floating around the room.',
            audience: 'People switching into tech',
            venueType: 'Coworking space or university lab',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Sunrise walk in Central Park',
            pitch:
              'A gentle morning walk with a rotating conversation theme, ending with coffee for whoever wants to stay.',
            audience: 'Early risers and walkers',
            venueType: 'Central Park — meet at a landmark gate',
          },
          {
            title: 'Board game afternoon in Prospect Park',
            pitch:
              'Blankets, a stack of board games, and a sign-up sheet; strangers become teammates by the second round.',
            audience: 'Families and casual gamers',
            venueType: 'Prospect Park lawn',
          },
          {
            title: 'Brooklyn Bridge photo walk',
            pitch:
              'A guided walk across the bridge with photography prompts, ending at a café for sharing shots.',
            audience: 'Photographers of every level',
            venueType: 'Brooklyn Bridge + nearby café',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Sunday bike ride for beginners',
            pitch:
              'A slow, friendly ride on protected paths with a mechanic at the back for breakdowns.',
            audience: 'New cyclists and commuters',
            venueType: 'East River Greenway or Brooklyn waterfront',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Fintech breakfast briefing',
            pitch:
              'An early-morning talk plus open Q&A on a timely fintech topic, designed to fit before the workday.',
            audience: 'Fintech professionals and investors',
            venueType: 'Financial district office space',
          },
          {
            title: 'Healthcare innovation roundtable',
            pitch:
              'A confidential roundtable where clinicians, operators, and builders discuss a monthly challenge.',
            audience: 'Healthtech founders and healthcare professionals',
            venueType: 'Hospital-affiliated innovation space',
          },
          {
            title: 'Media & journalism portfolio review',
            pitch:
              'Journalists and media makers share work in small groups for concrete, useful feedback.',
            audience: 'Freelancers and media students',
            venueType: 'Newsroom or media school classroom',
          },
          {
            title: 'Women in tech coffee club',
            pitch:
              'A recurring morning coffee where women in tech trade advice on roles, negotiations, and leadership.',
            audience: 'Women working in technology',
            venueType: 'Café or company lounge in Midtown',
          },
          {
            title: 'Freelancer pricing workshop',
            pitch:
              'A practical session on setting rates, writing proposals, and getting paid on time.',
            audience: 'Independent professionals across industries',
            venueType: 'Coworking space or library',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Zine-making night',
            pitch:
              'Paper, scissors, glue, and a photocopier: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and beginners',
            venueType: 'Arts space or print shop in Bushwick',
          },
          {
            title: 'Open mic for poetry and prose',
            pitch: 'A welcoming open mic with a ten-minute feature and a supportive audience.',
            audience: 'Writers of all levels',
            venueType: 'Bookstore café or community theater',
          },
          {
            title: 'Sketching in the city',
            pitch:
              'A guided sketching session at a changing landmark each month — bridges, parks, markets.',
            audience: 'Illustrators and sketchers',
            venueType: 'Outdoor landmark with seating nearby',
          },
          {
            title: 'Sewing circle for mending',
            pitch:
              'Bring a torn item and learn visible mending techniques with materials provided.',
            audience: 'Sewers and sustainability-minded makers',
            venueType: 'Community center or maker space',
          },
          {
            title: 'Demo night for local musicians',
            pitch:
              'Musicians share rough demos for constructive feedback from peers and a small audience.',
            audience: 'Emerging musicians and producers',
            venueType: 'Small music venue or rehearsal studio',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Tenant rights information session',
            pitch:
              'A plain-language session on rent laws, leases, and where to get free legal help.',
            audience: 'Renters and tenant organizers',
            venueType: 'Community center or library',
          },
          {
            title: 'Block cleanup crew',
            pitch:
              'A Saturday morning cleanup of one block, with supplies and coffee provided by local shops.',
            audience: 'Neighbors and local business owners',
            venueType: 'A chosen street in any borough',
          },
          {
            title: 'Food pantry volunteer orientation',
            pitch:
              'A short orientation plus a first shift, so volunteers can help with confidence.',
            audience: 'First-time volunteers',
            venueType: 'Neighborhood food pantry',
          },
          {
            title: 'Local business storytelling night',
            pitch: 'Shop owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or merchant association hall',
          },
          {
            title: 'Climate action planning circle',
            pitch:
              'A small group workshop turning climate concern into a concrete neighborhood project plan.',
            audience: 'Residents concerned about climate',
            venueType: 'Library or community center meeting room',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Choose the category that matches your interests and the audience you can reach. Events that are simple, recurring, and venue-agnostic — like walks, potlucks, or study groups — have the highest success rate for first-time organizers.',
      },
      {
        question: 'Do I need money to run one of these events?',
        answer:
          'No. Most of these formats work in free or low-cost venues: parks, public libraries, community gardens, and neighborhood bars. The expensive-sounding ones usually have a free alternative.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most communities start. The how-to guides explain the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in New York City?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each lists the real venues, institutions, and formats where New Yorkers gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in NYC?',
      answer:
        'Yes. The city has free public venues, dense transit, and a culture of attending events. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — coworking spaces, libraries, parks, community gardens, neighborhood bars — exists across the boroughs. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in New York?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps New Yorkers find or start communities.',
    },
  ],
};

export default content;
