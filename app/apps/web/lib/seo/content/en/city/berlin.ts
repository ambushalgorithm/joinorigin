import type { CityContent } from '../../types';

/**
 * Berlin content (EN source of truth) — city page + 5 variants + idea
 * page. Deliberately distinct from the New York City content (G5:
 * no NYC↔Berlin reuse). Honest, evergreen prose; no fabricated numbers.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'en',
  slug: 'berlin',
  intro:
    'Berlin is a city that runs on communities. Its history, its affordability compared to other European capitals, and its twelve distinct districts have produced one of the most active gathering scenes on the continent. Tech and startup people cluster in Mitte and Kreuzberg, while Neukölln and Friedrichshain host a dense mix of creatives, makers, and families who often share the same courtyards and Spätis. Public space is generous — Tempelhofer Feld, Mauerpark, Tiergarten, and the canals of Kreuzberg and Neukölln host everything from kite festivals to impromptu football games. The Stammtisch tradition gives every community a natural ritual: a regular table at a biergarten or neighborhood bar where members show up without being asked. Universities like Humboldt, TU Berlin, and FU Berlin keep a constant supply of students and researchers cycling through the scene, and the city’s international population makes English-language groups common alongside German ones. For finding or starting a community, Berlin rewards showing up consistently and choosing a district that fits your group’s personality.',
  dataPoints: [
    'Roughly 3.4 million residents; the federal capital of Germany.',
    'Twelve districts, each with a distinct community identity.',
    'Public anchors: Tempelhofer Feld, Mauerpark, Tiergarten, and the canals.',
    'Home to Humboldt University, TU Berlin, FU Berlin, and UdK Berlin.',
    'Strong Stammtisch and Späti corner-shop gathering culture.',
    'Large international population — many groups run in English.',
  ],
  variantIntros: {
    startup:
      'The Berlin startup scene has grown from a scrappy post-reunification experiment into one of Europe’s most important tech ecosystems, with strengths in marketplaces, fintech, climate tech, and developer tools. Founders and engineers cluster in Mitte and Kreuzberg, where coworking spaces, accelerators, and university programs at TU Berlin and ESMT create a dense loop of talent and capital. Berlin’s famous pragmatism shapes the community: meetings are less about status and more about shipping, hiring, and surviving the next funding round. Recurring formats include founder breakfasts, pitch evenings, and coworking open houses where early teams can find their first engineers and designers. The international scene is a real asset — English is common in meetups, which helps founders who are new to Germany. Starting a startup community here works best with a narrow vertical and a regular rhythm: a monthly AI builders night or a climate tech founders table builds a reliable following faster than a generalist founder group.',
    creative:
      'Berlin’s creative communities are inseparable from its identity: the city’s art, music, design, and fashion scenes grew out of cheap spaces, a tradition of self-organization, and an audience that values authenticity over polish. Galleries in Mitte, studios in Neukölln and Friedrichshain, and the techno and electronic music scene around clubs and collectives give creatives real venues to gather. UdK and the city’s many art schools feed a steady stream of graduates into a freelance economy built on collaboration and referral. Common formats include studio open weekends, portfolio nights, design critiques, and music production circles that share equipment and feedback. Because space is more affordable than in London or Paris, collective studios and project spaces are common, and many communities form around a shared workshop rather than a mailing list. Starting a creative community in Berlin is realistic: pick a craft, a district, and a regular evening, and the city’s density of curious, skilled people will find you.',
    political:
      'Berlin has a deep tradition of political and civic engagement, from tenant movements to climate blockades, neighborhood councils, and volunteer initiatives that shape public space. The city is divided into districts with elected assemblies, which keeps local politics accessible: residents can attend open sessions, join citizens’ initiatives, and testify on urban development plans. Housing is the defining issue — tenant organizations in Neukölln, Kreuzberg, and Friedrichshain run information evenings, rent-law workshops, and solidarity networks that are open to newcomers. Civic tech groups build tools for participation, while countless volunteer projects care for parks, refugee support, community gardens, and street libraries. The culture rewards patience and directness: showing up to a real meeting matters more than online commentary. Starting a political community means choosing a concrete issue and a small geography, then partnering with existing initiatives instead of duplicating them — the landscape here is rich enough that collaboration beats competition.',
    meetup:
      'Berlin’s meetup scene is famously welcoming, fueled by the Stammtisch tradition and the city’s love of low-cost, high-connection formats. Biergartens in Kreuzberg, cafés in Prenzlauer Berg, and the vast lawns of Tempelhofer Feld host book clubs, language exchanges, running groups, board game evenings, and hobby circles all year round. The Späti — the corner shop that stays open late — is more than a convenience store: it is the neighborhood anchor where event flyers, community notices, and spontaneous plans circulate. Groups here tend to be casual about structure and serious about consistency; a weekly Stammtisch at the same table builds a community that outlasts any single event. Many international residents run English-speaking meetups, so newcomers can plug in quickly before their German improves. If you want to start a meetup, choose a repeatable format — a monthly walk, a weekly language table, a board game night — and a venue that will host you every time. Berlin’s density of curious people does the rest.',
    'small-business':
      'Berlin’s small business community is built on the city’s culture of independence: Spätis, kebab shops, boutiques, craft breweries, repair cafés, and makers’ studios are all run by owners who value autonomy and local loyalty. Kieze — the neighborhood districts — act as natural communities of interest, with merchant associations organizing street festivals, markets, and shared concerns about rent and permits. The city’s chambers and economic development agencies offer practical workshops on licensing, funding, and digitalization, often in both German and English. What holds these groups together is place: a cluster of shops on one street shares customers, foot traffic, and the fate of the public space around them. Newcomers usually connect by attending a kiez merchant meeting, joining a maker market, or taking a small business workshop. Starting a small business community in Berlin is very achievable: a monthly roundtable at a local café, with rotating topics like payroll, landlord negotiations, and online selling, reliably attracts owners who rarely have peers to talk with.',
  },
  ideaPage: {
    intro:
      'Berlin is an ideal city for testing new community event ideas: public space is generous, venues are affordable, and residents show up when something is real. The thirty ideas below are grouped into six categories — networking, learning, social and outdoor, professional and industry, creative and maker, and impact and local. Each includes who it is for, a short pitch, and a suggested venue type that genuinely exists in Berlin, from biergartens and Spätis to Tempelhofer Feld and community gardens. Some ideas work as one-off events; others are designed to become recurring communities with a Stammtisch rhythm. The honesty rule is simple: every venue suggestion is a real kind of place in this city, and every format is simple enough for a first-time organizer to run. Pick the idea that matches your interests, find a venue that will host you, and let Berlin’s curiosity do the rest.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Stammtisch for newcomers',
            pitch:
              'A regular table at the same biergarten where newcomers and long-term residents trade city tips, work stories, and connections.',
            audience: 'New arrivals and anyone who likes casual chats',
            venueType: 'A Kreuzberg biergarten',
          },
          {
            title: 'English-first founder breakfast',
            pitch:
              'An early breakfast where founders working in English share the week’s wins and blockers over coffee and rolls.',
            audience: 'International founders in Berlin',
            venueType: 'A café with a private corner in Mitte',
          },
          {
            title: 'Kiez meet-and-greet',
            pitch:
              'A low-pressure evening in one neighborhood, with icebreaker cards and a rule that you meet three new people.',
            audience: 'Residents of a single district',
            venueType: 'A Späti-adjacent bar or community room',
          },
          {
            title: 'Career story circle',
            pitch:
              'Six people tell their career stories in five minutes each, followed by group questions and connections.',
            audience: 'Career changers, students, and mentors',
            venueType: 'Public library meeting room',
          },
          {
            title: 'Freelancer coffee club',
            pitch:
              'A weekly morning coffee where freelancers across industries share leads, rates, and client horror stories.',
            audience: 'Freelancers of every discipline',
            venueType: 'Coworking café in Friedrichshain',
          },
        ],
      },
      {
        name: 'Learning & workshops',
        ideas: [
          {
            title: 'German conversation table for expats',
            pitch:
              'Tables by level, one German speaker per table, and a simple rule: mistakes are the point.',
            audience: 'Expats learning German',
            venueType: 'Café or community center in Prenzlauer Berg',
          },
          {
            title: 'Startup accounting in plain German',
            pitch:
              'A practical workshop on invoices, VAT, and the German tax basics every founder needs.',
            audience: 'New founders and freelancers',
            venueType: 'Coworking space or chamber event room',
          },
          {
            title: 'Repair café workshop',
            pitch:
              'Volunteers help neighbors fix lamps, bikes, and appliances while teaching basic repair skills.',
            audience: 'Residents with broken things and repair-minded volunteers',
            venueType: 'Community workshop or neighborhood center',
          },
          {
            title: 'Urban gardening 101',
            pitch:
              'A hands-on session on balcony and community-garden growing, with seeds and pots provided.',
            audience: 'Beginner gardeners',
            venueType: 'Community garden or allotment association',
          },
          {
            title: 'Civic participation workshop',
            pitch:
              'A plain-language guide to Berlin district assemblies, citizens’ initiatives, and how to speak at a session.',
            audience: 'New activists and curious residents',
            venueType: 'District assembly or library meeting room',
          },
        ],
      },
      {
        name: 'Social & outdoor',
        ideas: [
          {
            title: 'Tempelhofer Feld picnic and games',
            pitch:
              'Blankets, badminton, and frisbee on the old airfield, with a rotating potluck theme.',
            audience: 'Families, couples, and friend groups',
            venueType: 'Tempelhofer Feld lawns',
          },
          {
            title: 'Mauerpark market walk',
            pitch:
              'A slow Sunday stroll through the flea market, stopping for music and street food along the way.',
            audience: 'Sunday explorers',
            venueType: 'Mauerpark and surrounding streets',
          },
          {
            title: 'Canal-side bike ride',
            pitch:
              'A relaxed ride along the Landwehrkanal with café stops and a swim-ready pause in summer.',
            audience: 'Leisure cyclists',
            venueType: 'Landwehrkanal paths',
          },
          {
            title: 'Board game evening in a Späti bar',
            pitch:
              'A weekly stack of board games at a neighborhood bar that welcomes slow evenings.',
            audience: 'Casual gamers and neighbors',
            venueType: 'Späti bar with tables in Neukölln',
          },
          {
            title: 'Winter market mulled-cider walk',
            pitch: 'A guided evening tour of Christmas markets with mulled cider and warm snacks.',
            audience: 'Winter lovers and newcomers',
            venueType: 'A Berlin Christmas market',
          },
        ],
      },
      {
        name: 'Professional & industry',
        ideas: [
          {
            title: 'Climate tech founders table',
            pitch:
              'A monthly roundtable for climate tech founders to share progress and partnership opportunities.',
            audience: 'Climate tech founders and operators',
            venueType: 'Impact hub or green-tech office',
          },
          {
            title: 'Product manager peer circle',
            pitch:
              'A confidential circle where PMs discuss a monthly challenge — roadmaps, hiring, stakeholder politics.',
            audience: 'Product managers in tech',
            venueType: 'Coworking meeting room in Mitte',
          },
          {
            title: 'Design critique night',
            pitch:
              'Designers present real work in progress and receive structured, constructive feedback.',
            audience: 'Product, graphic, and UX designers',
            venueType: 'Design studio or creative agency space',
          },
          {
            title: 'Media and journalism pitch lab',
            pitch:
              'Journalists and media makers pitch story ideas and get honest editorial feedback.',
            audience: 'Freelance journalists and media students',
            venueType: 'Newsroom or media school classroom',
          },
          {
            title: 'Hiring circle for early teams',
            pitch:
              'Founders share how they hire, retain, and let go — the uncomfortable truths of early team building.',
            audience: 'Early-stage founders and team leads',
            venueType: 'Startup office or incubator',
          },
        ],
      },
      {
        name: 'Creative & maker',
        ideas: [
          {
            title: 'Studio open Saturday',
            pitch:
              'A neighborhood of studios opens its doors for one afternoon of tours, demos, and works for sale.',
            audience: 'Art lovers and curious neighbors',
            venueType: 'A studio courtyard in Neukölln',
          },
          {
            title: 'Music production circle',
            pitch:
              'Producers share unfinished tracks for feedback and trade tips on gear and software.',
            audience: 'Beatmakers and bedroom producers',
            venueType: 'Rehearsal studio or makerspace',
          },
          {
            title: 'Street art walk and talk',
            pitch:
              'A guided walk through Friedrichshain’s murals with the stories behind the artists and history.',
            audience: 'Art walkers and photographers',
            venueType: 'Friedrichshain streets near RAW-Gelände',
          },
          {
            title: 'Zine and risograph night',
            pitch: 'A hands-on evening of zine making with risograph printing and trading.',
            audience: 'Writers, illustrators, and print enthusiasts',
            venueType: 'Print shop or arts space in Kreuzberg',
          },
          {
            title: 'Mending and visible mending circle',
            pitch:
              'Bring torn clothes and learn visible mending techniques with thread, patches, and company.',
            audience: 'Sewers and sustainability-minded makers',
            venueType: 'Community center or repair café',
          },
        ],
      },
      {
        name: 'Impact & local',
        ideas: [
          {
            title: 'Tenant rights info evening',
            pitch:
              'A plain-language session on rent caps, leases, and where to get free housing counseling.',
            audience: 'Renters and tenant organizers',
            venueType: 'Neighborhood center or library',
          },
          {
            title: 'Kiez cleanup morning',
            pitch:
              'A Saturday morning cleanup of one street or park, with gloves and coffee supplied by local shops.',
            audience: 'Neighbors and shop owners',
            venueType: 'A chosen street in any kiez',
          },
          {
            title: 'Refugee welcome volunteer briefing',
            pitch:
              'An orientation plus first shift for volunteers supporting local welcome and integration projects.',
            audience: 'First-time volunteers',
            venueType: 'A local welcome initiative space',
          },
          {
            title: 'Community garden planning circle',
            pitch:
              'Gardeners and neighbors plan the season’s planting, events, and shared tools together.',
            audience: 'Gardeners and would-be gardeners',
            venueType: 'Community garden or allotment',
          },
          {
            title: 'Local business storytelling night',
            pitch:
              'Shop and Späti owners share five-minute stories behind their businesses, followed by open questions.',
            audience: 'Neighbors and small business owners',
            venueType: 'A local shop, café, or kiez merchant hall',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'How do I pick one of these ideas?',
        answer:
          'Match the category to your interests and the audience you can reach. In Berlin, recurring formats with a fixed venue — a Stammtisch, a weekly table, a monthly walk — build community fastest.',
      },
      {
        question: 'Do I need to speak German to organize?',
        answer:
          'No. Many Berlin events run in English or are bilingual, and the international community is large. A bilingual announcement usually doubles your reach.',
      },
      {
        question: 'Can these events become real communities?',
        answer:
          'Yes — recurring formats are how most Berlin communities start, and the Stammtisch tradition gives you a proven pattern. The how-to guides walk through the first event to a stable community.',
      },
    ],
  },
  faq: [
    {
      question: 'How do I find a community in Berlin?',
      answer:
        'Use the group-type pages for startup, creative, political, meetup, and small business communities. Each describes the real districts, venues, and formats where Berliners gather. JoinOrigin is a waitlist platform — joining keeps you informed about early access.',
    },
    {
      question: 'Is it realistic to start a community in Berlin?',
      answer:
        'Yes. Berlin has affordable venues, generous public space, and a culture of showing up. The guides cover starting a community, organizing a meetup, and getting your first ten members.',
    },
    {
      question: 'Are the venue suggestions on this page real?',
      answer:
        'Yes. Every venue type mentioned — biergartens, Spätis, Tempelhofer Feld, community gardens, public libraries — exists in Berlin. We never fabricate member counts, ratings, or local offices.',
    },
    {
      question: 'Does JoinOrigin have an office in Berlin?',
      answer:
        'No. JoinOrigin is a waitlist platform without local offices or staff. All community descriptions reflect the real city landscape, and the platform is designed to help Berliners find or start communities.',
    },
  ],
};

export default content;
