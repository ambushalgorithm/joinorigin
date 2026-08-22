import type { CityContent } from '../../types';

/**
 * Montreal content (EN source of truth) — city page + 5 variants +
 * idea page. Distinct from other flagship/EN city files (G5) and grounded
 * in honest facts about the bilingual, festival-loving Quebec city.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'montreal',
  intro: [
    'Montreal is Quebec’s largest city, home to about 1.8 million people within the city limits and more than four million in the metro, and it is the rare North American city where French and English communities live side by side. The Plateau-Mont-Royal, Mile End, Old Montreal, Griffintown, Verdun, and Rosemont each hold a distinct scene, and the city’s bilingual character means groups often run in French, in English, or in a friendly mix of both.',
    'The city is a Canadian hub for artificial intelligence, video games, aerospace, and creative industries: MILA is one of the world’s leading AI institutes, Ubisoft anchors a large gaming cluster, and the festival scene — Just for Laughs, the Jazz Festival, the Mural Festival — is world-famous. McGill, Concordia, Université de Montréal, and UQAM feed constant flows of students and researchers into local communities. Mount Royal park anchors the city’s outdoor life, the Old Port and canals host summer gatherings, and Jean-Talon and Atwater markets are year-round community anchors.',
    'Montreal winters are long and real, which the city has turned into a culture: sugar shacks, skating rinks, indoor festivals, and café terraces with heaters keep communities meeting through February. For finding or starting a community, Montreal rewards choosing a language (or embracing both), picking a neighborhood, and building a rhythm that runs through all four seasons.',
  ],
  dataPoints: [
    'About 1.8 million residents in the city; 4M+ in the metro.',
    'French-first, bilingual city — groups run in both languages.',
    'AI, video games, aerospace, and creative industry clusters.',
    'Anchors: McGill, Concordia, Université de Montréal, UQAM.',
    'Public anchors: Mount Royal, Old Port, Jean-Talon and Atwater markets.',
    'Neighborhood scenes: Plateau, Mile End, Old Montreal, Griffintown, Verdun.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking spaces in the Plateau and Mile End',
        'MILA and university AI event rooms',
        'Gaming studio offices',
        'Old Montreal startup lofts',
        'Accelerator event rooms near McGill and Concordia',
        'Cafés with founder tables on Saint-Laurent',
      ],
      formats: [
        'Founder breakfasts with round intros',
        'AI research and application evenings',
        'Gaming and indie dev meetups',
        'Demo nights and pitch evenings',
        'Bilingual startup mixers',
      ],
      howToStart: [
        'Pick a narrow vertical — AI, gaming, or deep tech — and a neighborhood anchor.',
        'Book a recurring weekly slot at a Plateau or Mile End coworking space.',
        'Run three open meetups, ask two regulars to co-organize, and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Mile End music and art venues',
        'Plateau galleries and artist studios',
        'Old Montreal design and fashion studios',
        'Mural-covered alleyways and public art spaces',
        'Film and animation production spaces',
        'Concordia and UQAM creative labs',
      ],
      formats: [
        'Studio open weekends and art walks',
        'Mural festival planning and viewing circles',
        'Design critique evenings',
        'Music production and DJ circles',
        'Comedy and improv showcases',
      ],
      howToStart: [
        'Choose one craft — visual art, music, design, film — and a neighborhood.',
        'Partner with a gallery, studio, or venue that will host a first open event.',
        'Collect works in progress before the second event and make feedback the core of every session.',
      ],
    },
    political: {
      venues: [
        'City Hall and borough offices',
        'Public library meeting rooms',
        'Community center rooms across the boroughs',
        'Tenant and housing advocacy offices',
        'Civic tech meetup spaces downtown',
        'Park pavilions and plaza event spaces',
      ],
      formats: [
        'Housing and rent-control info evenings',
        'Tenant rights workshops',
        'Transit and bike-lane volunteer briefings',
        'Borough consultation prep sessions',
        'Civic participation workshops in plain language',
      ],
      howToStart: [
        'Choose one concrete issue and a small geography — a borough, a block, or a single policy.',
        'Attend three existing meetings first and partner with an organization rather than duplicating work.',
        'Host a newcomer-friendly workshop on how borough politics works to build a steady base.',
      ],
    },
    meetup: {
      venues: [
        'Mount Royal park and Tam-Tams gatherings',
        'Old Port and canal paths',
        'Plateau and Mile End cafés',
        'Jean-Talon and Atwater market areas',
        'Neighborhood bars and microbreweries',
        'Public libraries with community rooms',
      ],
      formats: [
        'Sunday Tam-Tams drum circle and picnic',
        'Bike rides along the Lachine Canal',
        'Board game and trivia evenings',
        'Skating and outdoor winter socials',
        'Language exchanges (French and English)',
      ],
      howToStart: [
        'Choose a repeatable format — a Sunday park session, a monthly market walk — and a fixed meeting point.',
        'Pick a spot like Mount Royal or a Plateau café that is easy to reach by metro.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Plateau and Mile End shop corridors',
        'Jean-Talon and Atwater market vendor spaces',
        'City small business center workshops',
        'Chamber of commerce event rooms',
        'Local cafés and bagel shops with community corners',
        'Food hall and incubator kitchen spaces',
      ],
      formats: [
        'Shop owner breakfasts with no agenda',
        'Market vendor roundtables',
        'City agency clinics on permits and licensing',
        'Shared buying circles for supplies',
        'Neighborhood walking tours of shop corridors',
      ],
      howToStart: [
        'Pick a corridor and a café that already feeds local owners; claim a regular corner table.',
        'Run a no-agenda breakfast first — owners come to talk about rent, permits, and winter sales.',
        'After three breakfasts, rotate one practical topic per month and let the chamber spread the word.',
      ],
    },
  },
  variantIntros: {
    startup:
      'The Montreal startup scene is one of Canada’s most distinctive, built on artificial intelligence, video games, and deep tech, and powered by a bilingual culture that connects the city to both French and English markets. MILA — the AI institute founded by Yoshua Bengio — has made Montreal a global center for machine learning research, and the city’s gaming cluster, anchored by Ubisoft, attracts developers from around the world. McGill and Concordia feed engineering and business talent, while Université de Montréal strengthens the French-language layer of the ecosystem. The startup community clusters in the Plateau, Mile End, and Old Montreal, where coworking spaces and cafés double as gathering places. What makes the scene unusual is its international character and its quality of life: founders stay because the city is affordable, beautiful, and full of culture. Established formats include founder breakfasts, AI evenings, and demo nights, many of them bilingual or welcoming to both languages. Honest advice for starting a startup community here: pick a vertical, anchor to a neighborhood, and embrace the bilingual reality — a consistent weekly event will quickly become a fixture.',
    creative:
      'Montreal creative communities are among the most vibrant in North America, powered by a festival culture that runs from jazz to comedy to film, and by a city that treats art as infrastructure. The Plateau and Mile End hold a dense bohemian scene of musicians, writers, and designers, Old Montreal hosts galleries and fashion studios, and the city’s murals — including the famous Mural Festival — turn whole neighborhoods into outdoor galleries. The gaming and animation industries give the creative scene a strong digital layer, and Concordia and UQAM feed new artists into the city each year. Montreal winters push creatives indoors, which builds an intimate club culture: a small venue, a packed room, and a shared season of work. The city’s bilingualism is a creative asset too — artists work in French, English, and often both. Starting a creative community in Montreal means choosing a discipline and a neighborhood, then using the city’s deep stock of venues and its genuine love of live, local culture to build something with staying power.',
    political:
      'Montreal political and civic communities operate in a bilingual, borough-based system that keeps local politics close to the ground. Housing is the defining issue: rent control, tenant rights, and anti-displacement campaigns keep volunteer organizations busy, and Quebec’s housing tribunal gives renters a real forum. The city’s borough structure means residents can attend local council sessions and shape land-use decisions in their own neighborhood, and the culture of collective action is strong — from climate groups organizing around transit and bike lanes to mutual aid networks that run through the winter. Civic tech communities build tools for open data and public engagement, and the city’s parks, markets, and plazas anchor countless volunteer efforts. The political culture rewards persistence and bilingual outreach: organizers who run tenant groups also host newcomer-friendly workshops on how the borough works. Starting a civic community in Montreal usually means picking a concrete issue and a small geography, then partnering with the dense existing landscape of organizers.',
    meetup:
      'Montreal meetup culture is famous for its warmth, its cafés, and its festivals, and it is defined by the seasons: in summer, Mount Royal hosts the legendary Sunday Tam-Tams drum circle and picnics, the Lachine Canal fills with cyclists and paddlers, and festival crowds take over the streets; in winter, the same communities move indoors or onto skating rinks, sugar-shack outings, and cozy café terraces. The Plateau and Mile End hold a café culture that makes casual gatherings effortless, and Jean-Talon and Atwater markets give food-centered groups a year-round anchor. Because the city is bilingual, language exchanges are a genuine genre of meetup — French speakers and English speakers trading practice over coffee. Formats with staying power are simple and repeatable: a Sunday park session, a monthly market walk, a standing trivia night. Honest advice for starting a meetup in Montreal: pick a format that works in all four seasons, anchor it to a metro-accessible landmark, and let the city’s warm, sociable culture do the growth work.',
    'small-business':
      'Montreal small business communities are built on a dense, walkable set of commercial streets and a deep food culture: the Plateau café, the Mile End bagel shop, the Jean-Talon Market vendor, the Verdun bookstore, and the Old Montreal atelier all share practical questions about rent, permits, staffing, and the bilingual market. Commercial corridors like Saint-Denis, Saint-Laurent, and Wellington in Verdun act as natural communities of interest, with shop owners coordinating around street festivals, public space, and shared concerns. The city’s markets give vendors a built-in community and a steady stream of customers, and the chamber of commerce plus city small business centers offer workshops on licensing, loans, and digital selling. The bagel shops, smoked-meat delis, and café culture give the city a genuinely distinctive small business identity that locals fiercely support. Newcomers typically connect by attending a corridor meeting, taking a city workshop, or joining a market vendor collective. Starting a small business community here is realistic: a monthly roundtable at a neighborhood café or bagel shop, with rotating topics like rent, insurance, and bilingual marketing, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Montreal’s festival culture, café life, and four distinct seasons make it a wonderful place to test new community event ideas. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each idea includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Montreal, from Mount Royal and the Lachine Canal to Plateau cafés, Jean-Talon Market, and neighborhood microbreweries. Some ideas work as one-off events; others are designed to become recurring communities that survive winter by moving indoors. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let the city’s warmth do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Plateau café crawl',
            pitch:
              'A Saturday stroll through three cafés on the Plateau, where people rotate tables and share what they do.',
            audience: 'Coffee lovers and networkers',
            venueType: 'Plateau cafés',
          },
          {
            title: 'Founder AMA at a Mile End coworking space',
            pitch:
              'A founder shares their honest story for thirty minutes, then takes open questions from the room.',
            audience: 'Early-stage founders and aspiring entrepreneurs',
            venueType: 'Mile End coworking space',
          },
          {
            title: 'Bilingual networking evening',
            pitch:
              'A low-pressure social designed for both French and English speakers, with conversation prompts in both languages.',
            audience: 'Bilingual and language-curious professionals',
            venueType: 'Plateau bar or community room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people each tell their career story in five minutes, followed by group discussion and connection prompts.',
            audience: 'Job seekers, career changers, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Old Port sunset mixer',
            pitch:
              'A casual evening walk along the Old Port with icebreaker prompts and a rule that you meet three new people.',
            audience: 'Newcomers and anyone expanding their network',
            venueType: 'Old Port waterfront paths',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'French-English language exchange',
            pitch: 'Tables by level and language, with a simple rule: mistakes are the point.',
            audience: 'French and English learners',
            venueType: 'Café or community center in the Plateau',
          },
          {
            title: 'AI for non-engineers',
            pitch:
              'A hands-on workshop where non-technical professionals learn practical ways to use AI tools.',
            audience: 'Marketers, operators, and analysts',
            venueType: 'Coworking space or MILA-adjacent event room',
          },
          {
            title: 'Small business finance in plain English',
            pitch: 'A session covering cash flow, taxes, and loans for first-time owners.',
            audience: 'New small business owners',
            venueType: 'City small business center',
          },
          {
            title: 'Tenant rights in Quebec',
            pitch: 'A plain-language session on leases, rent control, and the housing tribunal.',
            audience: 'Renters and tenant advocates',
            venueType: 'Community center or library',
          },
          {
            title: 'Coding night for absolute beginners',
            pitch:
              'A guided evening where beginners build their first small project with mentors in the room.',
            audience: 'People switching into tech',
            venueType: 'Coworking space or university lab',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Sunday Tam-Tams and picnic',
            pitch:
              'Join the legendary Mount Royal drum circle, bring a blanket, and meet people through music and dance.',
            audience: 'Musicians, dancers, and Sunday strollers',
            venueType: 'Mount Royal park near the Tam-Tams',
          },
          {
            title: 'Lachine Canal bike ride',
            pitch:
              'A relaxed ride along the canal with café stops and a swim-ready pause in summer.',
            audience: 'Leisure cyclists',
            venueType: 'Lachine Canal bike paths',
          },
          {
            title: 'Jean-Talon Market food walk',
            pitch: 'A guided tasting walk through the market with the stories behind its vendors.',
            audience: 'Food lovers and first-time visitors',
            venueType: 'Jean-Talon Market',
          },
          {
            title: 'Board game night at a microbrewery',
            pitch:
              'A monthly stack of board games at a neighborhood microbrewery that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Plateau or Verdun microbrewery',
          },
          {
            title: 'Skating and hot chocolate social',
            pitch:
              'A winter evening of skating on a neighborhood rink followed by hot chocolate and conversation.',
            audience: 'Skaters and winter lovers',
            venueType: 'Mount Royal or borough skating rink',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'AI research and applications evening',
            pitch:
              'Researchers and practitioners share recent work and practical lessons in the local AI scene.',
            audience: 'AI researchers, engineers, and founders',
            venueType: 'MILA or university event space',
          },
          {
            title: 'Gaming and indie dev meetup',
            pitch:
              'Game developers and artists trade notes on the local scene, hiring, and live-service trends.',
            audience: 'Game developers and industry professionals',
            venueType: 'Gaming studio office or event space',
          },
          {
            title: 'Design critique night',
            pitch:
              'Product and brand designers present real work in progress and receive structured feedback.',
            audience: 'Product, brand, and UX designers',
            venueType: 'Design studio or creative agency space',
          },
          {
            title: 'Aerospace and aviation mixer',
            pitch:
              'An informal evening for professionals in the city’s aerospace cluster to trade notes and contacts.',
            audience: 'Aerospace engineers and operators',
            venueType: 'Industry office or event space',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'Startup office or coworking room',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Mural walk through the Plateau',
            pitch:
              'A guided walk past the neighborhood’s murals with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'Plateau streets and alleyways',
          },
          {
            title: 'Studio open weekend in Mile End',
            pitch: 'Artists open their studios for a weekend of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'Mile End artist studios',
          },
          {
            title: 'Open mic for musicians and poets',
            pitch: 'A welcoming open mic with a short feature and a supportive audience.',
            audience: 'Musicians, poets, and beginners',
            venueType: 'Mile End music venue',
          },
          {
            title: 'Bagel-making workshop',
            pitch:
              'A hands-on evening learning the craft behind the city’s famous wood-fired bagels.',
            audience: 'Home bakers and food lovers',
            venueType: 'Bakery workshop space',
          },
          {
            title: 'Zine and risograph night',
            pitch:
              'Paper, scissors, and a risograph printer: everyone leaves with a small zine to trade.',
            audience: 'Writers, artists, and print enthusiasts',
            venueType: 'Print shop or arts space in the Plateau',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Park cleanup morning',
            pitch:
              'A Saturday morning cleanup of a neighborhood park, with gloves and coffee supplied.',
            audience: 'Volunteers and park lovers',
            venueType: 'A chosen neighborhood park',
          },
          {
            title: 'Community garden workday',
            pitch:
              'A few hours of planting and weeding in a community garden, followed by a shared snack and garden tour.',
            audience: 'Gardeners, volunteers, and families',
            venueType: 'Neighborhood community garden',
          },
          {
            title: 'Tenant rights information session',
            pitch:
              'A plain-language session on leases, rent control, and where to get free legal help.',
            audience: 'Renters and tenant organizers',
            venueType: 'Community center or library',
          },
          {
            title: 'Winter warm-clothing drive',
            pitch:
              'A collection and sorting day for warm clothing donations, with a thank-you hot chocolate after.',
            audience: 'First-time volunteers and neighbors',
            venueType: 'Local charity or community center',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and market owners share the stories behind their businesses in five-minute talks.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or market hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Montreal, formats with a season plan — indoor winter alternatives, summer park sessions — and a bilingual welcome tend to fill fastest.',
      },
      {
        question: 'Do I need to speak French to organize?',
        answer:
          'No. Many Montreal events run in English or bilingually, and the city has a large English-speaking community. Announcing in both languages usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Montreal communities start. The how-to guides walk through the steps from a first event to a stable community with organizers and rituals.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Montreal?',
      answer:
        'Start with the group-type pages: startup, creative, political, meetup, and small business communities. Each describes the real neighborhoods, venues, and formats where Montrealers gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Montreal?',
      answer:
        'Yes. The city has free public venues, a warm café culture, and a world-famous festival scene. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — Mount Royal, Jean-Talon Market, Plateau cafés, microbreweries, public libraries — exists in Montreal. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Montreal?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Montrealers find or start communities.',
    },
  ],
};

export default content;
