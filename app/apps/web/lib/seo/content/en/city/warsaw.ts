import type { CityContent } from '../../types';

/**
 * Warsaw content (EN source of truth) — city page + 5 variants + idea
 * page. Distinct from all other city files (G5: no template reuse).
 * Honest, evergreen prose; no fabricated numbers or member counts.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'warsaw',
  pageTitles: {
    city: 'Communities in Warsaw | JoinOrigin',
    cityDescription:
      'Find or start communities in Warsaw — startup, creative, political, meetup, and small business groups across the Polish capital. JoinOrigin waitlist.',
    variants: {
      startup: 'Startup communities in Warsaw | JoinOrigin',
      creative: 'Creative communities in Warsaw | JoinOrigin',
      political: 'Political & civic communities in Warsaw | JoinOrigin',
      meetup: 'Meetup & social communities in Warsaw | JoinOrigin',
      'small-business': 'Small business communities in Warsaw | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Find or start startup communities in Warsaw — founders, engineers, and operators around Wola, The Heart, and the tech scene. JoinOrigin waitlist.',
      creative:
        'Find or start creative communities in Warsaw — studios, galleries, and collectives across Praga, the Vistula, and the city centre. JoinOrigin waitlist.',
      political:
        'Find or start political and civic communities in Warsaw — district councils, participatory budgeting, and local campaigns. JoinOrigin waitlist.',
      meetup:
        'Find or start meetup and social communities in Warsaw — Vistula riverbank evenings, milk bars, and park life. JoinOrigin waitlist.',
      'small-business':
        'Find or start small business communities in Warsaw — market traders, food hall vendors, and neighbourhood shops. JoinOrigin waitlist.',
    },
    ideas: '30 community event ideas in Warsaw | JoinOrigin',
    ideasDescription:
      'Discover 30 community event ideas in Warsaw — networking, learning, outdoor, professional, creative, and impact events. JoinOrigin waitlist.',
  },
  intro: [
    'Warsaw is a city that rebuilt itself from rubble and turned resilience into a way of life. The reconstructed Old Town, the Palace of Culture, and the glass towers of Wola tell the story of a capital that keeps reinventing. This history shapes its communities: Warsaw residents organise — for their streets, their parks, their rivers — with a seriousness that visitors often find inspiring.',
    'The Vistula river is the city’s great social stage: the boulevards on the left bank fill with cafés, bikes, and summer crowds, while Praga on the right bank keeps an artsy, unpolished character. Universities such as the University of Warsaw, the Warsaw University of Technology, and SGH feed a constant stream of students, and a booming IT and startup scene has made the city one of Central Europe’s tech capitals.',
    'Milk bars — the cheap, state-era canteens — are an unlikely community institution, where students, retirees, and office workers share tables. Warsaw’s café culture, board game cafés, and a strong civic tradition of participatory budgeting give newcomers many doors in. Show up consistently and the city will fold you into its story.',
  ],
  dataPoints: [
    'Roughly 1.7 million residents; the capital of Poland.',
    'Universities include the University of Warsaw, the Warsaw University of Technology, and SGH.',
    'One of Central Europe’s leading IT and startup hubs — home to Allegro and The Heart.',
    'Public anchors: the Vistula boulevards, Lazienki Park, and the Praga district.',
    'Milk bars and board game cafés anchor a distinctive café culture.',
    'Strong civic tradition — participatory budgeting is a real, well-used institution.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'The Heart and other startup hubs in the centre',
        'Coworking floors in Wola’s office towers',
        'Accelerator event rooms near the Palace of Culture',
        'University entrepreneurship spaces at the Polytechnic',
        'Startup cafés in Śródmieście',
        'Rooftop terraces for evening mixers',
      ],
      formats: [
        'Founder breakfasts with rapid intros',
        'Pitch evenings and demo days',
        'E-commerce and fintech founder tables',
        'IT and outsourcing network nights',
        'International founder mixers (English-first)',
      ],
      howToStart: [
        'Pick a narrow vertical — e-commerce, fintech, or B2B SaaS — and an English-friendly name.',
        'Reserve a weekly slot at a Wola or The Heart coworking space that will host you.',
        'Run three open meetups, then ask two regulars to co-organize and set a monthly rhythm.',
      ],
    },
    creative: {
      venues: [
        'Praga studios and galleries in former factories',
        'Art spaces along the Vistula',
        'Design studios in the city centre',
        'Academy of Fine Arts workshop rooms',
        'Theatre and rehearsal spaces',
        'Bookshop cafés with reading corners',
      ],
      formats: [
        'Praga industrial-studio open days',
        'Riverbank vernissages and open-air stages',
        'Critique evenings hosted by design collectives',
        'Synthesizer and beat-making share nights',
        'Comic and zine swap fairs in the centre',
      ],
      howToStart: [
        'Anchor the group in one craft and one district — Praga for studios, the centre for performance.',
        'Ask a Praga collective or an Academy of Fine Arts workshop to host your opening event.',
        'Close every session with a short public walk-through — Warsaw makers like to show work in person.',
      ],
    },
    political: {
      venues: [
        'District council (dzielnica) meeting rooms',
        'Neighbourhood association halls',
        'Civic budget project rooms',
        'Community centres across the city',
        'Public libraries with meeting rooms',
        'Park pavilions used for assemblies',
      ],
      formats: [
        'Open district council sessions',
        'Participatory budget project workshops',
        'Housing and rent-rights info evenings',
        'Neighbourhood planning consultations',
        'Volunteer training and intake evenings',
      ],
      howToStart: [
        'Start with one street-level issue — a park, a crossing, a local market — and map who already cares about it.',
        'Attend your dzielnica’s participatory-budget meetings; they are the fastest route to a real project.',
        'Partner with an existing association for the first public meeting, then set your own monthly rhythm.',
      ],
    },
    meetup: {
      venues: [
        'The Vistula boulevards and river beaches',
        'Lazienki Park and the Saxon Garden',
        'Milk bars with shared tables',
        'Board game cafés in the centre',
        'Praga’s courtyards and street corners',
        'Community centres with café rooms',
      ],
      formats: [
        'Vistula riverbank evenings in summer',
        'Lazienki Park picnics and peacock watches',
        'Praga street-art walks',
        'Board game and trivia evenings',
        'Language exchange tables (Polish–English)',
      ],
      howToStart: [
        'Choose a repeatable format — a weekly riverbank meet, a monthly park picnic — and a fixed spot.',
        'Pick a boulevard, café, or park corner that will host you every time.',
        'Run the first three sessions at the same time and place, then ask regulars to invite one newcomer each.',
      ],
    },
    'small-business': {
      venues: [
        'Food hall counters at Hala Koszyki',
        'Bazar Różyckiego and Praga market stalls',
        'Café owners’ tables in the centre',
        'Chamber of commerce seminar rooms',
        'Family shop corridors in Mokotów and Żoliborz',
        'Brewery taprooms with long tables',
      ],
      formats: [
        'Early-morning trader breakfasts before opening',
        'Food hall vendor planning for the season',
        'Chamber clinics on VAT and digital storefronts',
        'Shared supplier and delivery cooperatives',
        'Street festival and market planning sessions',
      ],
      howToStart: [
        'Anchor the group to one market or food hall — Hala Koszyki’s vendors are a proven meeting point.',
        'Invite a veteran stallholder or a chamber delegate to co-host the first breakfast.',
        'Collect the owners’ recurring headaches — rent, VAT, staffing — and turn each month’s meeting into a practical fix-it session.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Warsaw’s startup scene is the largest in Central Europe, powered by a deep IT and engineering talent pool, a strong e-commerce and fintech track record, and hubs like The Heart and the coworking floors of Wola’s office towers. Allegro, the home-grown marketplace, proved that Polish companies can build at global scale, and a steady stream of engineers from the Warsaw University of Technology and SGH keeps the pipeline full. The scene is pragmatic and export-oriented: founders build for the European market early, and English is common in international groups. Formats include founder breakfasts, pitch evenings, demo days, and IT networking nights that connect startups with the outsourcing companies that dominate the local economy. The city’s rhythm is professional — meetings start on time and agendas are respected — but the Vistula riverbanks provide the after-hours release valve. Starting a startup community in Warsaw works best with a narrow vertical and a regular rhythm — a monthly e-commerce founders table or an AI builders night builds a loyal following faster than a generalist group.',
    creative:
      'Warsaw’s creative communities have grown out of the city’s reinvention: Praga’s industrial courtyards now host studios and galleries, the Vistula banks carry art events and open-air stages, and the city centre’s theatres and design studios work at a European level. The Academy of Fine Arts and the city’s film and music schools feed a steady stream of graduates into a scene known for graphic design, illustration, theatre, and electronic music. Formats include open studio weekends in Praga, gallery walkthroughs, portfolio reviews, and music production circles, with the riverbanks providing the city’s most popular exhibition space in summer. The city’s history adds depth — museums and memorials inspire artists who turn the past into new work. The scene is compact and connected, and collaborations cross disciplines easily. Starting a creative community in Warsaw is realistic: pick a craft, a district, and a regular evening, and the density of curious, talented people will find you.',
    political:
      'Warsaw’s civic life is one of Poland’s most organised, with participatory budgeting — the budżet obywatelski — giving residents a direct vote on hundreds of neighbourhood projects every year. District councils and neighbourhood associations shape how parks, crossings, and cultural venues develop, and housing is a growing concern as the city’s popularity pushes rents up. Community centres across the city host meetings, language classes, and volunteer groups, while civic tech volunteers build tools for transparency and citizen reporting. The city’s history — from the wartime resistance to the post-communist transition — left a culture of seriousness about public life: Warsaw residents expect to be consulted and are willing to show up. The political culture rewards preparation and persistence. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing associations and the district council — the landscape is organised enough that collaboration beats competition.',
    meetup:
      'Warsaw’s meetup scene runs on the Vistula, the milk bar, and the board game café. In summer the river boulevards turn into the city’s living room — cafés, beach bars, and improvised games stretch along the water until late, and a weekly riverbank gathering is the easiest community to start. Lazienki Park’s lawns and peacocks draw picnics and outdoor classes, while Praga’s courtyards and street corners host a grittier, artsy social scene. The bar mleczny, the state-era milk bar, is an unlikely community anchor: shared tables, cheap food, and a mix of generations. Board game cafés fill the winter evenings, and language exchanges (Polish–English) run across the centre. The city is green and walkable, and the Polish love of direct conversation means strangers become regulars quickly. Starting a meetup in Warsaw means choosing a repeatable format and a fixed venue — a weekly riverbank meet or a monthly park picnic — and the city’s energy does the rest.',
    'small-business':
      'Warsaw small business communities are anchored by the city’s food halls, bazaars, and neighbourhood streets. Hala Koszyki, the restored market hall, hosts a community of food vendors who share suppliers, schedules, and gossip, while Bazar Różyckiego in Praga keeps an older bazaar tradition alive. Family shops in Mokotów and Żoliborz form friendly networks of owners who compare notes on rent, VAT, and footfall. The chamber of commerce offers workshops on digitalisation and exporting, and the city’s street festivals give traders a shared calendar. The coffee and craft-brew scene has added a young layer of makers who collaborate on pop-ups and festivals. What binds these groups is place and momentum: a market hall or a shopping street is a natural community with a collective stake in the neighbourhood’s revival. Starting a small business community is very achievable: a monthly trader breakfast at a food hall, with rotating topics like rent, VAT, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Warsaw is an ideal city for testing new community event ideas: the Vistula boulevards are a free summer venue, the parks are generous, and the city’s civic tradition means residents show up for well-organised events. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Warsaw, from riverbank cafés and milk bars to food halls and board game cafés. Some ideas work as one-off events; others are designed to become recurring communities with a weekly rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organiser to run. Pick the idea that matches your interests, find a venue that will host you, and let Warsaw’s energy do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Vistula banks meet for newcomers',
            pitch:
              'A weekly summer gathering on the riverboulevard where newcomers and long-term residents trade city tips over coffee.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'The Vistula boulevards',
          },
          {
            title: 'Founder breakfast in Wola',
            pitch:
              'An early breakfast where founders share the week’s wins and blockers over coffee and sandwiches.',
            audience: 'Founders and operators of every stage',
            venueType: 'A café in a Wola office tower',
          },
          {
            title: 'Praga meet-and-greet',
            pitch:
              'A low-pressure evening in the artsy right-bank district, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents and creatives of Praga',
            venueType: 'A Praga café or courtyard',
          },
          {
            title: 'Expat Warsaw circle',
            pitch:
              'International residents share settling-in tips — PESEL numbers, housing, and where to find their people.',
            audience: 'Expats in their first year',
            venueType: 'A cultural centre or coworking room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'A café in Mokotów',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'Polish table for newcomers',
            pitch:
              'Tables by level with native speakers, plus a rule that every mistake earns the table a laugh.',
            audience: 'Expats and newcomers learning Polish',
            venueType: 'A café or community centre in Śródmieście',
          },
          {
            title: 'PESEL and tax clinic',
            pitch:
              'A practical session on registration, the PESEL number, and the tax basics every newcomer faces.',
            audience: 'New residents and freelancers',
            venueType: 'A coworking or association event room',
          },
          {
            title: 'Milk bar survival course',
            pitch:
              'Learn to order like a local in the legendary cheap canteens — from żurek to pierogi — with a veteran regular.',
            audience: 'Food lovers and newcomers',
            venueType: 'A bar mleczny in the centre',
          },
          {
            title: 'Pierogi making class',
            pitch:
              'A hands-on evening of folding pierogi with a grandmother-chef, followed by a shared dinner.',
            audience: 'Home cooks and curious newcomers',
            venueType: 'A community kitchen or cooking school',
          },
          {
            title: 'Rebuilt city history walk',
            pitch:
              'A guided walk through the reconstructed Old Town, learning how Warsaw rose from the ashes.',
            audience: 'History lovers and newcomers',
            venueType: 'A museum or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Lazienki picnic and peacock watch',
            pitch:
              'Blankets, frisbee, and a stroll past the palace and its peacocks in the city’s favourite park.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Lazienki Park',
          },
          {
            title: 'Vistula beach evening',
            pitch: 'A relaxed evening at a river beach with music, games, and a shared barbecue.',
            audience: 'Summer lovers and newcomers',
            venueType: 'A Vistula river beach',
          },
          {
            title: 'Praga street-art walk',
            pitch:
              'A guided walk through the murals of the right bank, with the stories behind the artists.',
            audience: 'Art walkers and photographers',
            venueType: 'The streets of Praga',
          },
          {
            title: 'Board game evening at a café',
            pitch: 'A weekly stack of board games at a café that welcomes slow evenings.',
            audience: 'Casual gamers and neighbours',
            venueType: 'A board game café in the centre',
          },
          {
            title: 'Winter market mulled-wine walk',
            pitch: 'A guided evening tour of the Christmas markets with grzaniec and warm snacks.',
            audience: 'Winter lovers and newcomers',
            venueType: 'A Warsaw Christmas market',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'E-commerce founders table',
            pitch:
              'A monthly roundtable for e-commerce founders to share progress, logistics lessons, and partnerships.',
            audience: 'E-commerce founders and operators',
            venueType: 'A coworking meeting room in Wola',
          },
          {
            title: 'IT and outsourcing network night',
            pitch:
              'Developers, agencies, and outsourcing companies share trends and make introductions.',
            audience: 'IT professionals and agency owners',
            venueType: 'An IT office or event space',
          },
          {
            title: 'Game dev night',
            pitch:
              'Game developers share projects, engines, and lessons from one of Poland’s proudest industries.',
            audience: 'Game developers and enthusiasts',
            venueType: 'A game studio or tech event room',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'A coworking meeting room in the centre',
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
            title: 'Praga open studio day',
            pitch:
              'A district of industrial studios opens its doors for an afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbours',
            venueType: 'The studio courtyards of Praga',
          },
          {
            title: 'Vistula open-air gallery evening',
            pitch: 'A guided evening walk along the river’s art installations and open-air stages.',
            audience: 'Art walkers and river strollers',
            venueType: 'The Vistula boulevards',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'A recording or rehearsal studio',
          },
          {
            title: 'Folk craft night',
            pitch:
              'Learn wycinanki paper cutting and other Polish folk crafts with a master artisan.',
            audience: 'Craft lovers and culture-curious newcomers',
            venueType: 'A craft workshop or cultural centre',
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
              'A plain-language session on rent rules, contracts, and where to get free housing advice.',
            audience: 'Renters and tenant organisers',
            venueType: 'A tenant association or community centre',
          },
          {
            title: 'Budżet obywatelski workshop',
            pitch:
              'Learn how participatory budgeting works and draft a real project for your neighbourhood.',
            audience: 'Residents who want a say',
            venueType: 'A district council or community centre',
          },
          {
            title: 'Vistula cleanup morning',
            pitch:
              'A Saturday morning cleanup of a stretch of riverbank, with gloves, bags, and coffee supplied.',
            audience: 'River lovers and volunteers',
            venueType: 'A stretch of the Vistula banks',
          },
          {
            title: 'Community garden workday',
            pitch:
              'Neighbours spend a morning planting, watering, and planning the season in a shared garden.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'A community garden or allotment',
          },
          {
            title: 'Market stallholder stories',
            pitch:
              'Veteran traders share five-minute stories behind their stalls, followed by open questions.',
            audience: 'Neighbours and food lovers',
            venueType: 'A food hall like Hala Koszyki',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Warsaw, recurring formats with a fixed venue — a weekly riverbank meet, a monthly park picnic — build community fastest.',
      },
      {
        question: 'Do I need to speak Polish to organise?',
        answer:
          'No. Many Warsaw groups run in English or are bilingual, especially in tech and creative scenes. A little Polish opens doors with neighbours and market traders.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Warsaw communities start, and the city’s civic tradition gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Warsaw?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Warszawiacy gather. JoinOrigin is live — create your profile and find or start your community today.',
    },
    {
      question: 'Is it realistic to start a community in Warsaw?',
      answer:
        'Yes. Warsaw has the Vistula boulevards, generous parks, a strong café culture, and a serious civic tradition. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — riverbank cafés, milk bars, food halls, board game cafés, community centres — exists in Warsaw. Venue suggestions are compiled from real, publicly known community spaces and current community reporting.',
    },
    {
      question: 'Does JoinOrigin have an office in Warsaw?',
      answer:
        'No. JoinOrigin has no local offices or staff. All community descriptions reflect the real city landscape, and the platform helps Warsaw residents find or start communities.',
    },
  ],
};

export default content;
