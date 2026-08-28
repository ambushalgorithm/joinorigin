import type { CityContent } from '../../types';

/**
 * Treść Warszawy (tłumaczenie PL) — strona miasta + 5 wariantów + strona
 * pomysłów. Odmienna od wszystkich innych plików miast (G5: bez ponownego
 * użycia szablonów). Uczciwa, ponadczasowa proza; bez zmyślonych liczb
 * i liczebności członków.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'pl',
  slug: 'warsaw',
  pageTitles: {
    city: 'Origins w Warszawie | JoinOrigin',
    cityDescription:
      'Znajdź lub załóż Origins w Warszawie — grupy startupowe, kreatywne, polityczne, spotkaniowe i małych firm w stolicy Polski. Lista oczekujących JoinOrigin.',
    variants: {
      startup: 'Startupowe Origins w Warszawie | JoinOrigin',
      creative: 'Kreatywne Origins w Warszawie | JoinOrigin',
      political: 'Polityczne i obywatelskie Origins w Warszawie | JoinOrigin',
      meetup: 'Spotkaniowe Origins w Warszawie | JoinOrigin',
      'small-business': 'Origins małych firm w Warszawie | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Znajdź lub załóż Startupowe Origins w Warszawie — założyciele, inżynierowie i operatorzy wokół Woli, The Heart i sceny technologicznej. Lista oczekujących JoinOrigin.',
      creative:
        'Znajdź lub załóż Kreatywne Origins w Warszawie — studia, galerie i kolektywy wokół Pragi, Wisły i centrum miasta. Lista oczekujących JoinOrigin.',
      political:
        'Znajdź lub załóż Polityczne i obywatelskie Origins w Warszawie — rady dzielnic, budżet obywatelski i lokalne kampanie. Lista oczekujących JoinOrigin.',
      meetup:
        'Znajdź lub załóż Spotkaniowe Origins w Warszawie — wieczory nad Wisłą, bary mleczne i życie parków. Lista oczekujących JoinOrigin.',
      'small-business':
        'Znajdź lub załóż Origins małych firm w Warszawie — handlowcy targowi, sprzedawcy w food hallach i sklepy osiedlowe. Lista oczekujących JoinOrigin.',
    },
    ideas: '30 pomysłów na wydarzenia Origin w Warszawie | JoinOrigin',
    ideasDescription:
      'Odkryj 30 pomysłów na wydarzenia Origin w Warszawie — wydarzenia networkingowe, edukacyjne, plenerowe, profesjonalne, kreatywne i prospołeczne. Lista oczekujących JoinOrigin.',
  },
  intro: [
    'Warszawa to miasto, które odbudowało się z gruzów i zamieniło odporność w sposób na życie. Odbudowane Stare Miasto, Pałac Kultury i szklane wieżowce Woli opowiadają historię stolicy, która wciąż się wymyśla na nowo. Ta historia kształtuje jej społeczności: warszawiacy organizują się — dla swoich ulic, parków, rzek — z powagą, która często inspiruje odwiedzających.',
    'Wisła to wielka społeczna scena miasta: bulwary na lewym brzegu wypełniają się kawiarniami, rowerami i letnimi tłumami, podczas gdy Praga na prawym brzegu zachowuje artystyczny, nieoszlifowany charakter. Uniwersytety takie jak Uniwersytet Warszawski, Politechnika Warszawska i SGH zasilają stały strumień studentów, a kwitnąca scena IT i startupów uczyniła miasto jednym z technologicznych stolic Europy Środkowej.',
    'Bary mleczne — tanie stołówki z epoki PRL — są nieoczywistą instytucją społecznościową, przy której wspólnych stołach siedzą studenci, emeryci i pracownicy biur. Kawiarniana kultura Warszawy, kawiarnie planszówkowe i silna obywatelska tradycja budżetu partycypacyjnego dają nowym osobom wiele drzwi wejściowych. Pojawiaj się konsekwentnie, a miasto wplotnie Cię w swoją historię.',
  ],
  dataPoints: [
    'Około 1,7 miliona mieszkańców; stolica Polski.',
    'Uniwersytety obejmują Uniwersytet Warszawski, Politechnikę Warszawską i SGH.',
    'Jeden z czołowych ośrodków IT i startupów w Europie Środkowej — dom Allegro i The Heart.',
    'Publiczne punkty: bulwary wiślane, Łazienki Królewskie i dzielnica Praga.',
    'Bary mleczne i kawiarnie planszówkowe zakotwiczają charakterystyczną kulturę kawiarnianą.',
    'Silna tradycja obywatelska — budżet partycypacyjny to realna, szeroko wykorzystywana instytucja.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'The Heart i inne huby startupowe w centrum',
        'Piętra coworkingowe w biurowcach Woli',
        'Sale wydarzeń akceleratorów przy Pałacu Kultury',
        'Akademickie przestrzenie przedsiębiorczości na Politechnice',
        'Kawiarnie startupowe w Śródmieściu',
        'Tarasy na dachach na wieczorne mixery',
      ],
      formats: [
        'Śniadania założycieli z szybkimi prezentacjami',
        'Wieczory pitchowe i dni demo',
        'Stoły założycieli e-commerce i fintech',
        'Wieczory networkingowe IT i outsourcingu',
        'Mixery międzynarodowych założycieli (po angielsku)',
      ],
      howToStart: [
        'Wybierz wąską pionową — e-commerce, fintech lub B2B SaaS — i anglojęzyczną nazwę.',
        'Zarezerwuj cotygodniowy termin w przestrzeni coworkingowej na Woli lub w The Heart, która Cię ugosci.',
        'Przeprowadź trzy otwarte spotkania, potem poproś dwóch stałych bywalców o współorganizację i ustaw miesięczny rytm.',
      ],
    },
    creative: {
      venues: [
        'Studia i galerie na Pradze w dawnych fabrykach',
        'Przestrzenie artystyczne nad Wisłą',
        'Studia projektowe w centrum miasta',
        'Pracownie warsztatowe Akademii Sztuk Pięknych',
        'Przestrzenie teatralne i prób',
        'Kawiarnie księgarskie z kącikami do czytania',
      ],
      formats: [
        'Dni otwarte industrialnych studiów na Pradze',
        'Wernisaże nad brzegiem rzeki i sceny plenerowe',
        'Wieczory krytyczne prowadzone przez kolektywy projektowe',
        'Wieczory wymiany syntezatorów i beatmakingu',
        'Targi wymiany komiksów i zinów w centrum',
      ],
      howToStart: [
        'Zakotwicz grupę w jednym rzemiośle i jednej dzielnicy — Praga dla studiów, centrum dla performansu.',
        'Poproś kolektyw z Pragi lub pracownię Akademii Sztuk Pięknych o ugoszczenie Twojego wydarzenia otwierającego.',
        'Zamykaj każdą sesję krótkim publicznym pokazem — warszawscy twórcy lubią prezentować pracę osobiście.',
      ],
    },
    political: {
      venues: [
        'Sala obrad rady dzielnicy',
        'Sale stowarzyszeń osiedlowych',
        'Pokoje projektów budżetu obywatelskiego',
        'Centra kultury w całym mieście',
        'Biblioteki publiczne z salami spotkań',
        'Pawilony parkowe używane do zgromadzeń',
      ],
      formats: [
        'Otwarte sesje rady dzielnicy',
        'Warsztaty projektów budżetu partycypacyjnego',
        'Wieczory informacyjne o prawach lokatorów i czynszach',
        'Konsultacje planowania osiedli',
        'Wieczory szkoleniowe i rekrutacyjne dla wolontariuszy',
      ],
      howToStart: [
        'Zacznij od jednej sprawy na poziomie ulicy — parku, przejścia, lokalnego targu — i zmapuj, kogo już to obchodzi.',
        'Uczestnicz w spotkaniach budżetu partycypacyjnego swojej dzielnicy; to najszybsza droga do prawdziwego projektu.',
        'Współpracuj z istniejącym stowarzyszeniem przy pierwszym publicznym spotkaniu, potem ustaw własny miesięczny rytm.',
      ],
    },
    meetup: {
      venues: [
        'Bulwary wiślane i plaże rzeczne',
        'Łazienki Królewskie i Ogród Saski',
        'Bary mleczne ze wspólnymi stołami',
        'Kawiarnie planszówkowe w centrum',
        'Podwórka i rogi ulic Pragi',
        'Centra kultury z kawiarnianymi salami',
      ],
      formats: [
        'Wieczory nad brzegiem Wisły latem',
        'Pikniki w Łazienkach i obserwowanie pawi',
        'Spacery po street arcie na Pradze',
        'Wieczory planszówek i quizów',
        'Stoły wymiany językowej (polsko-angielskiej)',
      ],
      howToStart: [
        'Wybierz powtarzalny format — cotygodniowe spotkanie nad rzeką, miesięczny piknik w parku — i stałe miejsce.',
        'Wybierz bulwar, kawiarnię lub róg parku, który ugosci Cię za każdym razem.',
        'Przeprowadź pierwsze trzy sesje w tym samym czasie i miejscu, potem poproś stałych bywalców o przyprowadzenie po jednym nowym.',
      ],
    },
    'small-business': {
      venues: [
        'Kontuary food hallu w Hali Koszyki',
        'Bazar Różyckiego i stoiska targowe Pragi',
        'Stoły właścicieli kawiarni w centrum',
        'Sale seminaryjne izby gospodarczej',
        'Korytarze rodzinnych sklepów na Mokotowie i Żoliborzu',
        'Taproomy browarów z długimi stołami',
      ],
      formats: [
        'Poranne śniadania handlowców przed otwarciem',
        'Planowanie sezonu przez sprzedawców food hallu',
        'Kliniki izby o VAT i cyfrowych witrynach',
        'Spółdzielnie wspólnych dostawców i dostaw',
        'Sesje planowania festiwali ulicznych i targów',
      ],
      howToStart: [
        'Zakotwicz grupę przy jednym targu lub food hallu — sprzedawcy Hali Koszyki to sprawdzony punkt spotkań.',
        'Zaproś weterana-stoiskarza lub delegata izby do współprowadzenia pierwszego śniadania.',
        'Zbierz powtarzające się bolączki właścicieli — czynsze, VAT, personel — i zamień każde miesięczne spotkanie w praktyczną sesję naprawczą.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Scena startupowa Warszawy jest największa w Europie Środkowej, napędzana głębokim talentem IT i inżynierii, silnym dorobkiem w e-commerce i fintech oraz hubami takimi jak The Heart i coworkingowe piętra biurowców Woli. Allegro, rodzimy marketplace, udowodniło, że polskie firmy potrafią budować w globalnej skali, a stały strumień inżynierów z Politechniki Warszawskiej i SGH utrzymuje pełny rurociąg talentów. Scena jest pragmatyczna i zorientowana eksportowo: założyciele wcześnie budują na rynek europejski, a angielski jest powszechny w międzynarodowych grupach. Formaty obejmują śniadania założycieli, wieczory pitchowe, dni demo i wieczory networkingowe IT, które łączą startupy z firmami outsourcingowymi dominującymi w lokalnej gospodarce. Rytm miasta jest profesjonalny — spotkania zaczynają się o czasie, a agendy są respektowane — ale brzegi Wisły zapewniają zawór upustowy po godzinach, a letnie wieczory nad rzeką są naturalnym miejscem luźniejszych spotkań po pracy. Zakładanie Startupowego Origin w Warszawie działa najlepiej z wąską pionową i regularnym rytmem — miesięczny stół założycieli e-commerce lub wieczór budowniczych AI buduje lojalną publiczność szybciej niż grupa ogólna, a otwarte spotkania przyciągają zarówno weteranów, jak i osoby, które dopiero zaczynają swoją przygodę z przedsiębiorczością.',
    creative:
      'Kreatywne społeczności Warszawy wyrosły z wymyślania miasta na nowo: industrialne podwórka Pragi mieszczą teraz studia i galerie, brzegi Wisły niosą wydarzenia artystyczne i sceny plenerowe, a teatry i studia projektowe w centrum pracują na europejskim poziomie. Akademia Sztuk Pięknych oraz miejskie szkoły filmowe i muzyczne zasilają stały strumień absolwentów scenę znaną z grafiki, ilustracji, teatru i muzyki elektronicznej. Formaty obejmują weekendy otwartych studiów na Pradze, oprowadzania po galeriach, przeglądy portfolio i kręgi produkcji muzycznej, a brzegi rzeki zapewniają latem najpopularniejszą przestrzeń wystawienniczą miasta. Historia miasta dodaje głębi — muzea i pomniki inspirują artystów zamieniających przeszłość w nową pracę, a festiwale takie jak warszawskie noce muzeów przyciągają tłumy zainteresowane sztuką i designem. Scena jest zwarta i połączona, a współpraca łatwo przekracza dyscypliny: ilustratorzy pracują z teatrami, projektanci z kawiarniami, a producenci muzyczni z galeriami. Zakładanie Kreatywnego Origin w Warszawie jest realistyczne: wybierz rzemiosło, dzielnicę i regularny wieczór, a gęstość ciekawych, utalentowanych ludzi znajdzie Ciebie — wystarczy konsekwentnie pojawiać się w tych samych miejscach, aby zbudować trwały krąg twórców.',
    political:
      'Życie obywatelskie Warszawy jest jednym z najlepiej zorganizowanych w Polsce, a budżet partycypacyjny — budżet obywatelski — daje mieszkańcom bezpośredni głos w setkach projektów osiedlowych każdego roku. Rady dzielnic i stowarzyszenia osiedlowe kształtują rozwój parków, przejść i instytucji kultury, a mieszkalnictwo staje się rosnącym problemem, gdy popularność miasta podnosi czynsze. Centra kultury w całym mieście hostują spotkania, zajęcia językowe i grupy wolontariackie, podczas gdy wolontariusze civic tech budują narzędzia przejrzystości i zgłoszeń obywatelskich. Historia miasta — od wojennego ruchu oporu po transformację postkomunistyczną — pozostawiła kulturę powagi wobec życia publicznego: warszawiacy oczekują bycia konsultowanymi i są gotowi się pojawić, gdy chodzi o ich osiedla, szkoły i zieleń. Kultura polityczna nagradza przygotowanie i wytrwałość, a lokalne kampanie często zaczynają się od jednej sprawy — parku do odnowienia, przejścia dla pieszych, targu do ocalenia — wokół której buduje się szersza koalicja sąsiadów i stowarzyszeń. Zakładanie Politycznego Origin oznacza wybór konkretnej sprawy i małej geografii, a następnie partnerstwo z istniejącymi stowarzyszeniami i radą dzielnicy — krajobraz jest na tyle zorganizowany, że współpraca bije konkurencję, a małe wygrane budują zaufanie do dalszych działań.',
    meetup:
      'Scena spotkaniowa Warszawy działa na Wiśle, barze mlecznym i kawiarni planszówkowej. Latem bulwary rzeczne zamieniają się w salon miasta — kawiarnie, plażowe bary i improwizowane gry ciągną się wzdłuż wody do późna, a cotygodniowe spotkanie nad brzegiem rzeki to najłatwiejsze Origin do założenia. Trawniki i pawie Łazienek przyciągają pikniki i zajęcia plenerowe, podczas gdy podwórka i rogi ulic Pragi hostują bardziej surową, artystyczną scenę towarzyską. Bar mleczny, stołówka z epoki PRL, to nieoczywista kotwica społecznościowa: wspólne stoły, tanie jedzenie i mieszanka pokoleń tworzą naturalną przestrzeń do poznawania nowych ludzi. Kawiarnie planszówkowe wypełniają zimowe wieczory, a wymiany językowe (polsko-angielskie) działają w całym centrum i przyciągają zarówno obcokrajowców, jak i warszawiaków chcących ćwiczyć angielski. Miasto jest zielone i piesze, a polska miłość do bezpośredniej rozmowy sprawia, że nieznajomi szybko stają się stałymi bywalcami. Zakładanie spotkania w Warszawie oznacza wybór powtarzalnego formatu i stałego miejsca — cotygodniowego spotkania nad rzeką lub miesięcznego pikniku w parku — a energia miasta robi resztę, gdy tylko pierwsze osoby poczują się zaproszone do powrotu.',
    'small-business':
      'Społeczności małych firm w Warszawie są zakotwiczone przez food halle, bazary i osiedlowe ulice miasta. Hala Koszyki, odrestaurowana hala targowa, hostuje społeczność sprzedawców jedzenia dzielących dostawców, harmonogramy i plotki, podczas gdy Bazar Różyckiego na Pradze utrzymuje starszą tradycję bazarową. Rodzinne sklepy na Mokotowie i Żoliborzu tworzą przyjazne sieci właścicieli porównujących notatki o czynszach, VAT i ruchu klientów. Izba gospodarcza oferuje warsztaty cyfryzacji i eksportu, a uliczne festiwale miasta dają handlowcom wspólny kalendarz i okazję do zaprezentowania się szerszej publiczności. Scena kawowa i rzemieślniczego piwa dodała młodą warstwę twórców współpracujących przy pop-upach i festiwalach, co ożywia tradycyjne dzielnice handlowe nowymi pomysłami. To, co spaja te grupy, to miejsce i rozpęd: hala targowa lub ulica handlowa to naturalna społeczność z kolektywnym interesem w rewitalizacji osiedla. Zakładanie Origin małych firm jest bardzo osiągalne: miesięczne śniadanie handlowców w food hallu, z rotującymi tematami takimi jak czynsze, VAT i sprzedaż online, niezawodnie przyciąga właścicieli, którzy rzadko mają rówieśników do rozmowy — a każda taka rozmowa buduje praktyczną wartość, która utrzymuje ludzi w grupie.',
  },
  ideaPage: {
    intro:
      'Warszawa to idealne miasto do testowania nowych pomysłów na wydarzenia Origin: bulwary wiślane to darmowe letnie miejsce, parki są hojne, a obywatelska tradycja miasta sprawia, że mieszkańcy pojawiają się na dobrze zorganizowanych wydarzeniach. Trzydzieści poniższych pomysłów pogrupowano w sześć kategorii — networking, nauka, społeczne i plenerowe, profesjonalne i branżowe, kreatywne i twórcze oraz wpływowe i lokalne. Każdy zawiera to, dla kogo jest, krótki opis i sugerowany typ miejsca, który naprawdę istnieje w Warszawie — od nadrzecznych kawiarni i barów mlecznych po food halle i kawiarnie planszówkowe. Niektóre pomysły działają jako jednorazowe wydarzenia; inne są zaprojektowane, aby stać się powtarzającymi się Origins z cotygodniowym rytmem. Zasada uczciwości jest prosta: każda sugestia miejsca to prawdziwy rodzaj miejsca w tym mieście, a każdy format jest na tyle prosty, że poradzi sobie z nim początkujący organizator. Wybierz pomysł pasujący do Twoich zainteresowań, znajdź miejsce, które Cię ugosci, i pozwól, aby energia Warszawy zrobiła resztę.',
    categories: [
      {
        name: 'Networking',
        ideas: [
          {
            title: 'Spotkanie nad Wisłą dla nowych',
            pitch:
              'Cotygodniowe letnie spotkanie na bulwarze nad rzeką, podczas którego nowi i stali mieszkańcy wymieniają miejskie wskazówki przy kawie.',
            audience: 'Nowo przybyli i każdy, kto lubi luźne rozmowy',
            venueType: 'Bulwary wiślane',
          },
          {
            title: 'Śniadanie założycieli na Woli',
            pitch:
              'Wczesne śniadanie, podczas którego założyciele dzielą się tygodniowymi sukcesami i blokadami przy kawie i kanapkach.',
            audience: 'Założyciele i operatorzy na każdym etapie',
            venueType: 'Kawiarnia w biurowcu na Woli',
          },
          {
            title: 'Meet-and-greet na Pradze',
            pitch:
              'Wieczór bez presji w artystycznej dzielnicy na prawym brzegu, z kartami do przełamywania lodów i zasadą poznania trzech nowych osób.',
            audience: 'Mieszkańcy i twórcy Pragi',
            venueType: 'Kawiarnia lub podwórko na Pradze',
          },
          {
            title: 'Warszawski krąg ekspatów',
            pitch:
              'Międzynarodowi mieszkańcy dzielą się wskazówkami osiedlenia — numer PESEL, mieszkanie i gdzie znaleźć swoich ludzi.',
            audience: 'Ekspaci w pierwszym roku',
            venueType: 'Centrum kultury lub sala coworkingowa',
          },
          {
            title: 'Klub kawowy freelancerów',
            pitch:
              'Cotygodniowa poranna kawa, podczas której freelancerzy z różnych branż dzielą się leadami, stawkami i historiami klientów.',
            audience: 'Freelancerzy każdej dyscypliny',
            venueType: 'Kawiarnia na Mokotowie',
          },
        ],
      },
      {
        name: 'Nauka i warsztaty',
        ideas: [
          {
            title: 'Polski stół dla nowych',
            pitch:
              'Stoły według poziomu z native speakerami, plus zasada, że każdy błąd zasługuje na śmiech stołu.',
            audience: 'Ekspaci i nowi uczący się polskiego',
            venueType: 'Kawiarnia lub centrum kultury w Śródmieściu',
          },
          {
            title: 'Klinika PESEL i podatków',
            pitch:
              'Praktyczna sesja o rejestracji, numerze PESEL i podstawach podatków, z którymi mierzy się każdy nowy.',
            audience: 'Nowi mieszkańcy i freelancerzy',
            venueType: 'Sala wydarzeń coworkingu lub stowarzyszenia',
          },
          {
            title: 'Kurs przetrwania w barze mlecznym',
            pitch:
              'Naucz się zamawiać jak lokalny w legendarnych tanich stołówkach — od żurku po pierogi — z weteranem-stałym bywalcem.',
            audience: 'Miłośnicy jedzenia i nowi',
            venueType: 'Bar mleczny w centrum',
          },
          {
            title: 'Kurs lepienia pierogów',
            pitch:
              'Praktyczny wieczór lepienia pierogów z babcią-kucharką, zwieńczony wspólną kolacją.',
            audience: 'Domowi kucharze i ciekawi nowi',
            venueType: 'Kuchnia społeczna lub szkoła gotowania',
          },
          {
            title: 'Spacer po historii odbudowanego miasta',
            pitch:
              'Oprowadzany spacer po odbudowanym Starym Mieście, poznając, jak Warszawa powstała z popiołów.',
            audience: 'Miłośnicy historii i nowi',
            venueType: 'Sala spotkań muzeum lub biblioteki',
          },
        ],
      },
      {
        name: 'Społeczne i plenerowe',
        ideas: [
          {
            title: 'Piknik w Łazienkach i obserwacja pawi',
            pitch: 'Koce, frisbee i spacer obok pałacu i jego pawi w ulubionym parku miasta.',
            audience: 'Rodziny, pary i grupy znajomych',
            venueType: 'Łazienki Królewskie',
          },
          {
            title: 'Wieczór na plaży nad Wisłą',
            pitch: 'Swobodny wieczór na rzecznej plaży z muzyką, grami i wspólnym grillem.',
            audience: 'Miłośnicy lata i nowi',
            venueType: 'Plaża rzeczna nad Wisłą',
          },
          {
            title: 'Spacer po street arcie Pragi',
            pitch:
              'Oprowadzany spacer przez murale prawobrzeżnej dzielnicy, z historiami stojącymi za artystami.',
            audience: 'Spacerowicze sztuki i fotografowie',
            venueType: 'Ulice Pragi',
          },
          {
            title: 'Wieczór planszówek w kawiarni',
            pitch: 'Cotygodniowy stos planszówek w kawiarni, która lubi spokojne wieczory.',
            audience: 'Okazjonalni gracze i sąsiedzi',
            venueType: 'Kawiarnia planszówkowa w centrum',
          },
          {
            title: 'Spacer z grzańcem po jarmarku zimowym',
            pitch:
              'Oprowadzany wieczorny spacer po jarmarkach bożonarodzeniowych z grzańcem i ciepłymi przekąskami.',
            audience: 'Miłośnicy zimy i nowi',
            venueType: 'Jarmark bożonarodzeniowy w Warszawie',
          },
        ],
      },
      {
        name: 'Profesjonalne i branżowe',
        ideas: [
          {
            title: 'Stół założycieli e-commerce',
            pitch:
              'Comiesięczny okrągły stół dla założycieli e-commerce, aby dzielić się postępami, lekcjami logistyki i partnerstwami.',
            audience: 'Założyciele i operatorzy e-commerce',
            venueType: 'Sala spotkań coworkingu na Woli',
          },
          {
            title: 'Wieczór networkingowy IT i outsourcingu',
            pitch:
              'Programiści, agencje i firmy outsourcingowe dzielą się trendami i nawiązują znajomości.',
            audience: 'Profesjonaliści IT i właściciele agencji',
            venueType: 'Biuro IT lub przestrzeń wydarzeń',
          },
          {
            title: 'Wieczór game dev',
            pitch:
              'Twórcy gier dzielą się projektami, silnikami i lekcjami z jednej z najdumniejszych polskich branż.',
            audience: 'Twórcy gier i entuzjaści',
            venueType: 'Studio gier lub sala wydarzeń technologicznych',
          },
          {
            title: 'Krąg rówieśniczy product managerów',
            pitch:
              'Poufny krąg, w którym PM-owie omawiają miesięczne wyzwanie — roadmapy, rekrutację, politykę interesariuszy.',
            audience: 'Product managerowie w techu',
            venueType: 'Sala spotkań coworkingu w centrum',
          },
          {
            title: 'Krąg rekrutacji dla wczesnych zespołów',
            pitch:
              'Założyciele dzielą się tym, jak rekrutują, zatrzymują i zwalniają — niewygodne prawdy budowania wczesnego zespołu.',
            audience: 'Założyciele na wczesnym etapie i liderzy zespołów',
            venueType: 'Biuro startupu lub inkubator',
          },
        ],
      },
      {
        name: 'Kreatywne i twórcze',
        ideas: [
          {
            title: 'Dzień otwartych studiów na Pradze',
            pitch:
              'Dzielnica industrialnych studiów otwiera drzwi na popołudnie wycieczek, pokazów i prac na sprzedaż.',
            audience: 'Miłośnicy sztuki i ciekawi sąsiedzi',
            venueType: 'Studiowe podwórka Pragi',
          },
          {
            title: 'Wieczór plenerowej galerii nad Wisłą',
            pitch:
              'Oprowadzany wieczorny spacer wzdłuż artystycznych instalacji i scen plenerowych rzeki.',
            audience: 'Spacerowicze sztuki i przechadzający się nad rzeką',
            venueType: 'Bulwary wiślane',
          },
          {
            title: 'Krąg produkcji muzycznej',
            pitch:
              'Producenci dzielą się niedokończonymi utworami w celu uzyskania opinii i wymieniają wskazówki o sprzęcie i oprogramowaniu.',
            audience: 'Beatmakerzy i producenci z sypialni',
            venueType: 'Studio nagrań lub prób',
          },
          {
            title: 'Wieczór rzemiosła ludowego',
            pitch: 'Naucz się wycinanki i innych polskich rzemiosł ludowych z mistrzem-artystą.',
            audience: 'Miłośnicy rzemiosła i ciekawi kultury nowi',
            venueType: 'Warsztat rzemieślniczy lub centrum kultury',
          },
          {
            title: 'Wieczór zinów i riso',
            pitch: 'Praktyczny wieczór tworzenia zinów z drukiem riso i wymianą na końcu.',
            audience: 'Pisarze, ilustratorzy i entuzjaści druku',
            venueType: 'Studio drukarskie lub przestrzeń artystyczna',
          },
        ],
      },
      {
        name: 'Wpływowe i lokalne',
        ideas: [
          {
            title: 'Wieczór o prawach lokatorów',
            pitch:
              'Sesja prostym językiem o zasadach najmu, umowach i tym, gdzie uzyskać bezpłatne porady mieszkaniowe.',
            audience: 'Lokatorzy i organizatorzy lokatorscy',
            venueType: 'Stowarzyszenie lokatorów lub centrum kultury',
          },
          {
            title: 'Warsztat budżetu obywatelskiego',
            pitch:
              'Dowiedz się, jak działa budżet partycypacyjny, i przygotuj prawdziwy projekt dla swojej dzielnicy.',
            audience: 'Mieszkańcy, którzy chcą mieć głos',
            venueType: 'Rada dzielnicy lub centrum kultury',
          },
          {
            title: 'Poranne sprzątanie nad Wisłą',
            pitch:
              'Sobotnie poranne sprzątanie odcinka brzegu rzeki, z rękawicami, workami i kawą zapewnionymi.',
            audience: 'Miłośnicy rzeki i wolontariusze',
            venueType: 'Odcinek brzegów Wisły',
          },
          {
            title: 'Dzień pracy w ogrodzie społecznościowym',
            pitch:
              'Sąsiedzi spędzają poranek na sadzeniu, podlewaniu i planowaniu sezonu we wspólnym ogrodzie.',
            audience: 'Ogrodnicy i przyszli ogrodnicy',
            venueType: 'Ogród społecznościowy lub działki',
          },
          {
            title: 'Historie stoisk targowych',
            pitch:
              'Weterani-handlowcy opowiadają pięciominutowe historie stojące za ich stoiskami, a potem otwarte pytania.',
            audience: 'Sąsiedzi i miłośnicy jedzenia',
            venueType: 'Food hall, taki jak Hala Koszyki',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Jak wybrać jeden z tych pomysłów?',
        answer:
          'Dopasuj kategorię do swoich zainteresowań i grupy odbiorców, do której możesz dotrzeć. W Warszawie powtarzalne formaty ze stałym miejscem — cotygodniowe spotkanie nad rzeką, miesięczny piknik w parku — budują społeczność najszybciej.',
      },
      {
        question: 'Czy muszę mówić po polsku, aby organizować?',
        answer:
          'Nie. Wiele warszawskich grup działa po angielsku lub dwujęzycznie, zwłaszcza w scenach tech i kreatywnej. Trochę polskiego otwiera drzwi u sąsiadów i handlowców.',
      },
      {
        question: 'Czy te wydarzenia mogą stać się prawdziwymi Origins?',
        answer:
          'Tak — powtarzalne formaty to sposób, w jaki zaczyna się większość warszawskich Origins, a obywatelska tradycja miasta daje Ci sprawdzony wzorzec. Poradniki krok po kroku prowadzą od pierwszego wydarzenia do stabilnego Origin.',
      },
    ],
  },
  faq: [
    {
      question: 'Jak znaleźć Origin w Warszawie?',
      answer:
        'Skorzystaj ze stron typów grup dla Startupowych Origins, Kreatywnych Origins, Politycznych Origins, Spotkaniowych Origins i Origins małych firm. Każda opisuje prawdziwe dzielnice, miejsca i formaty, w których gromadzą się warszawiacy. JoinOrigin działa — utwórz swój profil i znajdź lub załóż swoje Origin już dziś.',
    },
    {
      question: 'Czy założenie Origin w Warszawie jest realistyczne?',
      answer:
        'Tak. Warszawa ma bulwary wiślane, hojne parki, silną kulturę kawiarnianą i poważną tradycję obywatelską. Poradniki obejmują zakładanie Origin, organizowanie spotkań i zdobywanie pierwszych dziesięciu członków.',
    },
    {
      question: 'Czy sugestie miejsc na tej stronie są prawdziwe?',
      answer:
        'Tak. Każdy wspomniany typ miejsca — nadrzeczne kawiarnie, bary mleczne, food halle, kawiarnie planszówkowe, centra kultury — istnieje w Warszawie. Nigdy nie zmyślamy liczebności członków, ocen ani lokalnych biur.',
    },
    {
      question: 'Czy JoinOrigin ma biuro w Warszawie?',
      answer:
        'Nie. JoinOrigin nie ma lokalnych biur ani personelu. Wszystkie opisy społeczności odzwierciedlają prawdziwy krajobraz miasta, a platforma pomaga warszawiakom znajdować lub zakładać Origins.',
    },
  ],
};

export default content;
