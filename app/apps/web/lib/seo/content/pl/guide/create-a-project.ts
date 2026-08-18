import type { GuideContent } from '../../types';

/**
 * „Jak utworzyć projekt" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-353) w polskim tłumaczeniu.
 *
 * Napisany w zgodzie z pętlą produktową §2: uformowana grupa przechodzi od
 * rozmowy do wspólnej pracy, publikując projekt; strona projektu jest
 * publiczna, jej pokój jest tworzony automatycznie W MOMENCIE PUBLIKACJI,
 * twórca kontroluje pokój, a postępy trafiają do aktualności. Platforma jest
 * aktywna: opublikowanie projektu otwiera jego stronę i pokój od razu.
 * „Pokój" jest przypięty do pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'create-a-project',
  title: 'Jak utworzyć projekt: zamień rozpęd grupy we wspólną pracę | JoinOrigin',
  description:
    'Utwórz projekt na JoinOrigin — niezależnie od tego, czy to zupełnie nowy pomysł, czy praca, która już trwa — opublikuj wspólną stronę projektu, otwórz automatycznie jego pokój i zamień rozmowę grupy w pracę, która ma efekty. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Grupa, która tylko rozmawia, w końcu utyka w miejscu. Różnica między społecznością, która wydaje się żywa, a taką, która gaśnie, to wspólna praca — projekt z nazwą, celem i miejscem, w którym postępy są widoczne. Zamiana rozmowy w projekt to także problem łączenia ludzi: potrzebujesz właściwych osób, właściwego zaangażowania i jednego jasnego miejsca do wspólnej pracy. To samo dotyczy projektu, który już istnieje — rozproszonego po plikach, wiadomościach i liście zadań jednej osoby — wciąż potrzebuje widocznego domu i właściwych ludzi wokół siebie.',
    'Przepływ JoinOrigin obsługuje ten ruch: uformowana grupa publikuje projekt, a strona projektu pojawia się publicznie z pokojem tworzonym automatycznie w momencie publikacji. Członkowie dołączają do pokoju projektu przez link, twórca kontroluje go jako właściciel pokoju, a aktualizacje z pokoju trafiają do aktualności, dzięki czemu cała sieć widzi pracę. Pokój projektu otwiera się w momencie publikacji — bez kroku konfiguracji po drodze.',
    'Ten poradnik prowadzi od pierwszej iskry do działającego rytmu — niezależnie od tego, czy projekt jest zupełnie nowy, czy już trwa: od istniejącej grupy i jej pokoju, przez określenie zakresu, który faktycznie może zostać dostarczony, napisanie strony projektu, opublikowanie jej i otwarcie pokoju, zaproszenie zespołu roboczego, uzgodnienie ról i pierwszego kamienia milowego, przeniesienie prawdziwej pracy do pokoju i udostępnianie postępów, aby budować rozpęd.',
  ],
  dataPoints: [
    'Projekty z publiczną stroną i jasnym pierwszym kamieniem milowym łatwiej obsadzić ludźmi — ludzie dołączają do pracy, którą widzą.',
    'Na JoinOrigin opublikowanie projektu automatycznie tworzy jego pokój — przestrzeń robocza istnieje od tego samego momentu co strona.',
    'Pokój projektu daje pracy jeden dom: decyzje, pliki i postępy widoczne dla każdego, kto dołączy.',
    'JoinOrigin to system operacyjny społeczności, który pomaga uformowanym grupom zamieniać rozmowy w projekty — opublikuj swój projekt, a jego pokój otworzy się natychmiast.',
  ],
  faq: [
    {
      question: 'Kiedy grupa jest gotowa, aby rozpocząć projekt?',
      answer:
        'Grupa jest gotowa, gdy kilkoro członków dzieli konkretny rezultat i chce poświęcić czas. Nie potrzebujesz dużego zespołu — trzech zaangażowanych ludzi z jednym jasnym kamieniem milowym bije dwunastu ciekawskich członków. Opublikuj projekt, gdy rozmowa się powtarza: „powinniśmy to faktycznie zrobić”.',
    },
    {
      question: 'Kiedy tworzony jest pokój projektu?',
      answer:
        'Pokój jest tworzony automatycznie w momencie opublikowania projektu. Twórca jest właścicielem pokoju od początku i może zapraszać zespół roboczy, przypisywać role i utrzymywać pracę zorganizowaną w Element. Możesz też stworzyć ten sam kształt z narzędzi, których grupa już używa.',
    },
    {
      question: 'Czym projekt różni się od pomysłu?',
      answer:
        'Pomysł to propozycja, wokół której gromadzą się ludzie — jego pokój to miejsce, w którym testowane są zainteresowanie i dopasowanie. Projekt to wspólna praca, której podejmuje się uformowana grupa, ze stroną, pokojem i kamieniem milowym. Opublikuj pomysł najpierw, gdy potrzebujesz ludzi; publikuj projekt, gdy już ich masz.',
    },
    {
      question: 'Jaki powinien być pierwszy kamień milowy?',
      answer:
        'Mały i wykonalny — roboczy szkic, pilotaż, pierwsza wersja lub gotowy produkt w ciągu kilku tygodni. Krótki pierwszy kamień milowy buduje zaufanie w grupie i czyni projekt realnym dla nowych członków. Zawsze możesz rozszerzyć po pierwszym sukcesie.',
    },
    {
      question: 'Czy JoinOrigin może pomóc grupie rozpocząć projekt już dziś?',
      answer:
        'Tak. Opublikowanie projektu na JoinOrigin tworzy jego stronę i pokój atomowo — pokój otwiera się w momencie publikacji, a twórca go kontroluje. Wybierz cel grupy, stwórz wspólny dom projektu i otwórz pokój dla pracy; każdy nowy członek, którego zaprosisz, zwiększa Twój zasięg.',
    },
  ],
  sections: [
    'Zacznij od istniejącej grupy i jej pokoju. Projekt wyrasta z grupy, która ma już zaufanie i rozpęd. Przyjrzyj się rozmowom w pokoju grupy i znajdź powtarzającą się potrzebę — rzecz, o której członkowie ciągle mówią „powinniśmy to zrobić”. JoinOrigin utrzymuje społeczność w pokoju kontrolowanym przez twórcę, a projekt to kolejna warstwa na tym pokoju. Nazwij powtarzającą się potrzebę w grupie i sprawdź, czy ktoś chce na nią odpowiedzieć działaniem.',
    'Określ zakres, który faktycznie może zostać dostarczony. Zapisz, co projekt ma wytworzyć, dla kogo i w jakim czasie. Utrzymaj pierwszą wersję na tyle małą, aby grupa mogła ją ukończyć. JoinOrigin jest zaprojektowany wokół projektów z publicznymi stronami — jasny zakres sprawia, że strona jest czytelna, a pokój skupiony. Jedno zdanie mówiące, co i kiedy zostanie dostarczone, wystarczy na start.',
    'Napisz stronę projektu. Strona powinna przedstawiać cel projektu, problem, który rozwiązuje, kto nad nim pracuje i czego potrzebuje. Bądź szczery co do etapu — wczesny szkic jest w porządku. Opublikowanie projektu na JoinOrigin automatycznie tworzy jego stronę i pokój, a twórca kontroluje pokój od początku. Opublikuj opis projektu w miejscu, do którego grupa może odsyłać ludzi.',
    'Opublikuj projekt i otwórz jego pokój. Publikacja to moment, w którym projekt staje się realny: publiczna strona plus pokój, w którym żyje praca. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem. Na JoinOrigin strona, pokój i zespół roboczy to jedna publikacja. Jeśli wolisz, utwórz stronę i pokój w narzędziach, których grupa już używa.',
    'Zaproś zespół roboczy do pokoju. Zaproś ludzi, którzy faktycznie będą wykonywać pracę — mały, zaangażowany zespół jest lepszy niż duża publiczność. Udostępnij link do dołączenia i poproś każdą osobę o potwierdzenie czasu. Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na stronie projektu lub wejście przez bezpośredni link zapraszający od członka. Jeden jasny link do pokoju projektu załatwia sprawę.',
    'Uzgodnij role i pierwszy kamień milowy. Nazwij, kto za co odpowiada, jak często grupa się spotyka i do jakiego pierwszego kamienia milowego wszyscy dążą. Zapisz to tam, gdzie cały zespół może to zobaczyć. JoinOrigin nie przypisuje ról za Ciebie — kontrola twórcy oznacza, że Ty decydujesz. Platforma utrzymuje role i kamień milowy widoczne w pokoju projektu. Krótki pisemny plan w pokoju wystarczy.',
    'Przenieś prawdziwą pracę do pokoju. Zamień „powinniśmy” na „oto szkic”, „oto decyzja” i „oto następne zadanie”. Utrzymuj postępy w jednym widocznym miejscu, aby wszyscy mogli je śledzić. JoinOrigin utrzymuje pokój projektu jako miejsce pracy — decyzje, pliki i aktualizacje — zamiast rozpraszać je po prywatnych wiadomościach. Utrzymuj artefakty pracy we wspólnym pokoju od pierwszego tygodnia.',
    'Udostępniaj postępy, aby budować rozpęd. Publikuj aktualizacje w miarę postępu projektu, świętuj kamień milowy, gdy zostanie osiągnięty, i zapraszaj szerszą grupę do dołączenia lub obserwowania. Postępy w aktualnościach zamieniają projekt w dowód, że społeczność dostarcza. Aktualizacje z pokoju trafiają do aktualności na JoinOrigin — to pętla wzrostu, w której każdy nowy członek powiększa powierzchnię odkrywania. Daj się odkryć i rozwijaj się.',
  ],
  steps: [
    {
      title: 'Zacznij od istniejącej grupy i jej pokoju',
      body: 'Projekt wyrasta z grupy, która ma już zaufanie i rozpęd. Przyjrzyj się rozmowom w pokoju grupy i znajdź powtarzającą się potrzebę — rzecz, o której członkowie ciągle mówią „powinniśmy to zrobić”.',
      joinOriginNote:
        'JoinOrigin utrzymuje społeczność w pokoju kontrolowanym przez twórcę, a projekt to kolejna warstwa na tym pokoju. Nazwij powtarzającą się potrzebę w grupie i sprawdź, czy ktoś chce na nią odpowiedzieć działaniem.',
    },
    {
      title: 'Określ zakres, który faktycznie może zostać dostarczony',
      body: 'Zapisz, co projekt ma wytworzyć, dla kogo i w jakim czasie. Utrzymaj pierwszą wersję na tyle małą, aby grupa mogła ją ukończyć.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany wokół projektów z publicznymi stronami — jasny zakres sprawia, że strona jest czytelna, a pokój skupiony. Jedno zdanie mówiące, co i kiedy zostanie dostarczone, wystarczy na start.',
    },
    {
      title: 'Napisz stronę projektu',
      body: 'Strona powinna przedstawiać cel projektu, problem, który rozwiązuje, kto nad nim pracuje i czego potrzebuje. Bądź szczery co do etapu — wczesny szkic jest w porządku.',
      joinOriginNote:
        'Opublikowanie projektu na JoinOrigin automatycznie tworzy jego stronę i pokój, a twórca kontroluje pokój od początku. Opublikuj opis projektu w miejscu, do którego grupa może odsyłać ludzi.',
    },
    {
      title: 'Opublikuj projekt i otwórz jego pokój',
      body: 'Publikacja to moment, w którym projekt staje się realny: publiczna strona plus pokój, w którym żyje praca. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem.',
      joinOriginNote:
        'Na JoinOrigin strona, pokój i zespół roboczy to jedna publikacja. Jeśli wolisz, utwórz stronę i pokój w narzędziach, których grupa już używa.',
    },
    {
      title: 'Zaproś zespół roboczy do pokoju',
      body: 'Zaproś ludzi, którzy faktycznie będą wykonywać pracę — mały, zaangażowany zespół jest lepszy niż duża publiczność. Udostępnij link do dołączenia i poproś każdą osobę o potwierdzenie czasu.',
      joinOriginNote:
        'Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na stronie projektu lub wejście przez bezpośredni link zapraszający od członka. Jeden jasny link do pokoju projektu załatwia sprawę.',
    },
    {
      title: 'Uzgodnij role i pierwszy kamień milowy',
      body: 'Nazwij, kto za co odpowiada, jak często grupa się spotyka i do jakiego pierwszego kamienia milowego wszyscy dążą. Zapisz to tam, gdzie cały zespół może to zobaczyć.',
      joinOriginNote:
        'JoinOrigin nie przypisuje ról za Ciebie — kontrola twórcy oznacza, że Ty decydujesz. Platforma utrzymuje role i kamień milowy widoczne w pokoju projektu. Krótki pisemny plan w pokoju wystarczy.',
    },
    {
      title: 'Przenieś prawdziwą pracę do pokoju',
      body: 'Zamień „powinniśmy” na „oto szkic”, „oto decyzja” i „oto następne zadanie”. Utrzymuj postępy w jednym widocznym miejscu, aby wszyscy mogli je śledzić.',
      joinOriginNote:
        'JoinOrigin utrzymuje pokój projektu jako miejsce pracy — decyzje, pliki i aktualizacje — zamiast rozpraszać je po prywatnych wiadomościach. Utrzymuj artefakty pracy we wspólnym pokoju od pierwszego tygodnia.',
    },
    {
      title: 'Udostępniaj postępy, aby budować rozpęd',
      body: 'Publikuj aktualizacje w miarę postępu projektu, świętuj kamień milowy, gdy zostanie osiągnięty, i zapraszaj szerszą grupę do dołączenia lub obserwowania. Postępy w aktualnościach zamieniają projekt w dowód, że społeczność dostarcza.',
      joinOriginNote:
        'Aktualizacje z pokoju trafiają do aktualności na JoinOrigin — to pętla wzrostu, w której każdy nowy członek powiększa powierzchnię odkrywania. Daj się odkryć i rozwijaj się.',
    },
  ],
};

export default content;
