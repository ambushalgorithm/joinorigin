import type { CountryContent } from '../../types';

/**
 * Inhoud voor Nederland — Nederlandse vertaling (per-taalinhoudsbestand).
 *
 * Tekst voor de landpagina `nl` van Nederland op
 * `/nl/location/the-netherlands`. De datasetrij voor het land is
 * "The Netherlands", dus de slug is `the-netherlands` (komt overeen met de
 * runtime-`countrySlug`-afleiding). De tekst leeft HIER, nooit in de
 * taal-JSON's (lokalisatie R2/R5).
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'nl',
  slug: 'the-netherlands',
  title: 'Gemeenschappen in Nederland | JoinOrigin',
  description:
    'Vind of start gemeenschappen in Nederland — van de start-upscene in Amsterdam tot lokale verenigingen, fietsclubs en netwerken van kleine bedrijven. Wachtlijst van JoinOrigin.',
  intro:
    'Nederland heeft een compacte, goed georganiseerde gemeenschapscultuur die is gebouwd op een lange traditie van vrijwilligersverenigingen. De vereniging — een geregistreerde vereniging met leden, een bestuur en regelmatige bijeenkomsten — is de ruggengraat van het Nederlandse sociale leven, van sportclubs en muziekverenigingen tot buurtcommissies en hobbygroepen. Omdat het land klein en dichtbevolkt is, liggen gemeenschappen dicht bij elkaar: een meetup in Amsterdam en een in Utrecht liggen misschien twintig minuten van elkaar met de trein, en de beroemde fietscultuur betekent dat veel bijeenkomsten per fiets bereikbaar zijn. Amsterdam, de hoofdstad en grootste stad, herbergt de dichtste professionele scenes van het land — startups, tech, creatieve industrie en internationale gemeenschappen concentreren zich rond coworking-ruimtes, universiteiten en de grachten van de stad. Rotterdam, Den Haag, Utrecht en Eindhoven hebben elk hun eigen levendige scenes, met sterke banden met lokale universiteiten en industrieën. Nederlanders waarderen directheid en betrouwbaarheid, wat zich vertaalt in gemeenschappen die op schema vergaderen en dingen voor elkaar krijgen. Engels wordt veel gesproken, waardoor Nederland bijzonder gastvrij is voor nieuwkomers. Of je nu op zoek bent naar een tech-meetup, een lokale vereniging of een netwerk van kleine bedrijven, hier een gemeenschap vinden of starten is een beproefd pad.',
  dataPoints: [
    'Bevolking van ongeveer 17,2 miljoen in 12 provincies.',
    'Nederlands is de primaire taal; Fries is mede-officieel in Friesland.',
    'Hoofdstad is Amsterdam; Rotterdam en Utrecht zijn grote centra.',
    'Sterke verenigingscultuur (geregistreerde verenigingen) in het hele land.',
  ],
  faq: [
    {
      question: 'Hoe vind ik gemeenschappen in Nederland?',
      answer:
        'Gebruik de /location-hub om een stad te kiezen en verken daarna de pagina\u2019s per groepstype: startup, creatief, politiek, meetup en kleine bedrijven. Lokale verenigingen en buurthuizen zijn ook sterke uitgangspunten.',
    },
    {
      question: 'Kan ik een gemeenschap starten in een Nederlandse stad?',
      answer:
        'Ja. Nederlandse steden hebben buurthuizen, cafés, coworking-ruimtes en sportaccommodaties die eerste bijeenkomsten hosten, en het verenigingsmodel geeft nieuwe groepen een herkenbare structuur. De stapsgewijze handleidingen behandelen de praktische stappen.',
    },
    {
      question: 'Werkt JoinOrigin in Nederland?',
      answer:
        'Ja. JoinOrigin heeft geen lokale kantoren. De pagina\u2019s voor Nederland en Amsterdam zijn in het Nederlands vertaald, en het platform helpt mensen om overal in het land gemeenschappen te vinden of te starten.',
    },
  ],
};

export default content;
