import type { GuideContent } from '../../types';

/**
 * „Jak opublikować koncepcję startupu" — ponadczasowy poradnik L1
 * (design §6.1, TASK-353) w polskim tłumaczeniu.
 *
 * Napisany w zgodzie z pętlą produktową §2: opublikuj koncepcję startupu
 * → publiczna strona pomysłu → dołączenie przez link → pokój tworzony
 * automatycznie W MOMENCIE PUBLIKACJI → twórca kontroluje pokój → rozwój
 * przez aktualności/zaproszenia. Strona pomysłu to publiczna obietnica
 * koncepcji; pokój to miejsce, w którym pierwsi wierni, potencjalni
 * współzałożyciele i pierwsi testerzy gromadzą się wokół startupu.
 * Platforma jest aktywna: opublikowanie koncepcji tworzy jej stronę i pokój
 * od razu. „Pokój" jest przypięty do pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'publish-a-startup-concept',
  title: 'Jak opublikować koncepcję startupu: strona pomysłu + pokój | JoinOrigin',
  description:
    'Opublikuj koncepcję startupu na JoinOrigin — niezależnie od tego, czy jesteś na etapie pomysłu, czy już prowadzisz firmę — napisz publiczną stronę pomysłu, otwórz automatycznie jego pokój i zgromadź wokół koncepcji pierwszych wiernych, współzałożycieli i pierwszych testerów. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Każdy startup — niezależnie od tego, czy to wciąż koncepcja na papierze, czy już działa z klientami — potrzebuje ludzi bardziej niż kapitału: założyciela, który potrafi go zbudować, zespołu, który potrafi go dostarczyć, i użytkowników, którzy go przetestują. Startup, którego nikt nie może znaleźć, nie gromadzi żadnego z nich. Opublikowanie koncepcji jako znajdowalnej strony pomysłu, a następnie otwarcie pokoju, w którym może toczyć się rozmowa, to uczciwy pierwszy krok budowania startupu — nie deck, nie logo, nie pitch — i działa równie dobrze dla istniejącej firmy, która chce więcej wiernych, współzałożycieli i testerów wokół tego, co buduje.',
    'Pętla JoinOrigin działa tak: publikujesz koncepcję startupu, pojawia się jej publiczna strona pomysłu, a jej pokój jest tworzony automatycznie w momencie publikacji. Ludzie odkrywają stronę lub wchodzą przez link, dołączenie to jedno kliknięcie, a oni trafiają do pokoju — kontrolowanego przez twórcę pokoju Matrix, w którym pierwsi wierni mogą zadawać pytania, potencjalni współzałożyciele mogą testować dopasowanie, a pierwsi użytkownicy mogą dzielić się opiniami. Twórca jest właścicielem pokoju od pierwszej sekundy i decyduje, kto dołącza i co dzieje się w środku.',
    'Ten poradnik przeprowadza przez publikowanie koncepcji startupu jak operator — niezależnie od tego, czy koncepcja jest zupełnie nowa, czy firma już działa: skompresowanie koncepcji w jedno zdanie, napisanie strony ze szczerymi sygnałami, opublikowanie jej i otwarcie pokoju, udostępnienie jej społecznościom założycieli, zaproszenie pierwszych wiernych i testerów, prowadzenie ustrukturyzowanych rozmów, wykorzystanie pokoju do utworzenia zespołu próbnego i zasilanie pokojem aktualności w miarę walidacji koncepcji.',
  ],
  dataPoints: [
    'Koncepcja startupu skompresowana w jedno zdanie jest łatwiejsza do udostępnienia, przetestowania i obsadzenia niż długi plan biznesowy.',
    'Na JoinOrigin opublikowanie koncepcji automatycznie tworzy jej pokój — startup ma miejsce dla wiernych i testerów od początku.',
    'Link do dołączenia to najprostsze zaproszenie: jeden link, jedno kliknięcie i zainteresowana osoba jest w pokoju.',
    'JoinOrigin to system operacyjny społeczności, który pomaga ludziom znajdować pomysły i ludzi za nimi stojących — opublikuj swoją koncepcję, a jej pokój otworzy się natychmiast.',
  ],
  faq: [
    {
      question: 'Czym koncepcja startupu różni się od strony pomysłu na małą firmę?',
      answer:
        'Format strony jest ten sam, ale akcent się przesuwa: pomysł na małą firmę koncentruje się na kliencie i ofercie, podczas gdy koncepcja startupu koncentruje się na ambitnym problemie i zespole potrzebnym do jego rozwiązania. Strona startupu przyciąga pierwszych wiernych, potencjalnych współzałożycieli i pierwszych testerów zamiast lokalnych klientów.',
    },
    {
      question: 'Kiedy tworzony jest pokój dla mojej koncepcji startupu?',
      answer:
        'Pokój jest tworzony automatycznie w momencie opublikowania koncepcji. Twórca jest właścicielem pokoju od pierwszej sekundy i może w Element zapraszać, usuwać i przypisywać role. Możesz też otworzyć pokój z narzędzi, których już używasz, i zaprosić ludzi, którzy dzielą tę ambicję.',
    },
    {
      question: 'Kto powinien dołączyć do pokoju koncepcji startupu?',
      answer:
        'Pierwsi wierni, którzy dzielą problem, potencjalni współzałożyciele testujący dopasowanie i pierwsi użytkownicy gotowi wypróbować surową wersję. Pokój to miejsce, w którym znajdujesz ludzi zamieniających koncepcję w zespół — tych samych ludzi, do których ciepłe polecenia docierałyby miesiącami.',
    },
    {
      question: 'Co tworzy dobrą stronę koncepcji startupu?',
      answer:
        'Jedno uczciwe zdanie o problemie i podejściu, etap koncepcji i konkretna pomoc, której potrzebujesz — budowniczy, projektant, ekspert domenowy, pierwsi testerzy. Uczciwość co do etapu przyciąga właściwych ludzi; nadmierne obietnice nie przyciągają nikogo.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc opublikować koncepcję startupu już dziś?',
      answer:
        'Tak. Opublikowanie koncepcji na JoinOrigin tworzy jej stronę i pokój atomowo — pokój otwiera się w momencie publikacji, a Ty kontrolujesz go od początku. Opublikuj koncepcję publicznie i otwórz pokój do dyskusji; każdy nowy członek, którego zaprosisz, zwiększa Twój zasięg.',
    },
  ],
  sections: [
    'Skompresuj koncepcję w jedno zdanie. Zredukuj startup do jego rdzenia: problemu, podejścia i tego, dla kogo jest. Jeśli nie potrafisz powiedzieć tego w jednym zdaniu, koncepcja nie jest gotowa do publikacji. JoinOrigin jest zaprojektowany wokół znajdowalnych stron pomysłów, a jednozdaniowy opis to rdzeń strony. Zapisz zdanie i przetestuj je na trzech osobach, które rozumieją problem.',
    'Napisz stronę ze szczerymi sygnałami. Przedstaw problem, podejście, etap — pomysł, prototyp lub produkt — i konkretną pomoc, której potrzebujesz. Uczciwość przyciąga właściwych ludzi. Opublikowanie koncepcji na JoinOrigin automatycznie tworzy jej stronę i pokój, a twórca kontroluje pokój od początku. Przygotuj stronę jako krótki publiczny post i iteruj z opiniami.',
    'Opublikuj koncepcję i otwórz jej pokój. Publikacja to moment, w którym koncepcja staje się znajdowalna. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem. Na JoinOrigin strona, pokój i link do dołączenia to jedna publikacja. Opublikuj koncepcję publicznie i otwórz pokój do rozmowy wokół niej.',
    'Udostępnij koncepcję społecznościom założycieli. Startupy rosną dzięki sieciom założycieli. Udostępnij stronę pomysłu grupom założycieli, społecznościom startupowym, akceleratorom i każdemu, kto zna problem. Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojej koncepcji załatwia sprawę.',
    'Zaproś pierwszych wiernych i testerów. Zaproś ludzi, którzy dzielą ambicję: potencjalnych współzałożycieli, ekspertów domenowych i użytkowników gotowych wypróbować surową wersję. JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający pomysłu mogą znaleźć Twój i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każda dołączona osoba staje się kanałem do własnej sieci.',
    'Prowadź ustrukturyzowane rozmowy w pokoju. Zapytaj dołączone osoby, co je ekscytuje, co je martwi i co zrobiłyby najpierw. Pokój startupu to ciągły wywiad — odpowiedzi kształtują koncepcję. JoinOrigin nie prowadzi tych rozmów; pokój jest Twój do ukształtowania. Platforma daje koncepcji jeden pokój, w którym zainteresowanie zamienia się w wgląd, a twórca jest właścicielem tego pokoju. Prowadź rozmowy bezpośrednio w pokoju.',
    'Wykorzystaj pokój do utworzenia zespołu próbnego. Gdy pojawią się właściwi ludzie, zaproponuj małą próbę — prototyp, stronę docelową lub sesję roboczą — i obserwuj, jak zespół współpracuje. JoinOrigin daje Origins wspólny pokój dla ich pracy i projektów, co jest naturalnym miejscem, w którym może wyłonić się próba. Mały prawdziwy prototyp to najbardziej niezawodny test dopasowania.',
    'Zasilaj pokojem aktualności w miarę walidacji. Ciągle publikuj aktualizacje, utrzymuj pokój przy życiu i pozwól, aby rozpęd koncepcji stał się widoczny dla szerszej sieci. Aktualności zamieniają koncepcję w dowód, że ludziom zależy. Na JoinOrigin aktualizacje z pokoju trafiają do aktualności — to pętla wzrostu, w której każdy nowy członek powiększa powierzchnię odkrywania. Daj się odkryć i rozwijaj się.',
  ],
  steps: [
    {
      title: 'Skompresuj koncepcję w jedno zdanie',
      body: 'Zredukuj startup do jego rdzenia: problemu, podejścia i tego, dla kogo jest. Jeśli nie potrafisz powiedzieć tego w jednym zdaniu, koncepcja nie jest gotowa do publikacji.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany wokół znajdowalnych stron pomysłów, a jednozdaniowy opis to rdzeń strony. Zapisz zdanie i przetestuj je na trzech osobach, które rozumieją problem.',
    },
    {
      title: 'Napisz stronę ze szczerymi sygnałami',
      body: 'Przedstaw problem, podejście, etap — pomysł, prototyp lub produkt — i konkretną pomoc, której potrzebujesz. Uczciwość przyciąga właściwych ludzi.',
      joinOriginNote:
        'Opublikowanie koncepcji na JoinOrigin automatycznie tworzy jej stronę i pokój, a twórca kontroluje pokój od początku. Przygotuj stronę jako krótki publiczny post i iteruj z opiniami.',
    },
    {
      title: 'Opublikuj koncepcję i otwórz jej pokój',
      body: 'Publikacja to moment, w którym koncepcja staje się znajdowalna. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem.',
      joinOriginNote:
        'Na JoinOrigin strona, pokój i link do dołączenia to jedna publikacja. Opublikuj koncepcję publicznie i otwórz pokój do rozmowy wokół niej.',
    },
    {
      title: 'Udostępnij koncepcję społecznościom założycieli',
      body: 'Startupy rosną dzięki sieciom założycieli. Udostępnij stronę pomysłu grupom założycieli, społecznościom startupowym, akceleratorom i każdemu, kto zna problem.',
      joinOriginNote:
        'Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojej koncepcji załatwia sprawę.',
    },
    {
      title: 'Zaproś pierwszych wiernych i testerów',
      body: 'Zaproś ludzi, którzy dzielą ambicję: potencjalnych współzałożycieli, ekspertów domenowych i użytkowników gotowych wypróbować surową wersję.',
      joinOriginNote:
        'JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający pomysłu mogą znaleźć Twój i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każda dołączona osoba staje się kanałem do własnej sieci.',
    },
    {
      title: 'Prowadź ustrukturyzowane rozmowy w pokoju',
      body: 'Zapytaj dołączone osoby, co je ekscytuje, co je martwi i co zrobiłyby najpierw. Pokój startupu to ciągły wywiad — odpowiedzi kształtują koncepcję.',
      joinOriginNote:
        'JoinOrigin nie prowadzi tych rozmów; pokój jest Twój do ukształtowania. Platforma daje koncepcji jeden pokój, w którym zainteresowanie zamienia się w wgląd, a twórca jest właścicielem tego pokoju. Prowadź rozmowy bezpośrednio w pokoju.',
    },
    {
      title: 'Wykorzystaj pokój do utworzenia zespołu próbnego',
      body: 'Gdy pojawią się właściwi ludzie, zaproponuj małą próbę — prototyp, stronę docelową lub sesję roboczą — i obserwuj, jak zespół współpracuje.',
      joinOriginNote:
        'JoinOrigin daje Origins wspólny pokój dla ich pracy i projektów, co jest naturalnym miejscem, w którym może wyłonić się próba. Mały prawdziwy prototyp to najbardziej niezawodny test dopasowania.',
    },
    {
      title: 'Zasilaj pokojem aktualności w miarę walidacji',
      body: 'Ciągle publikuj aktualizacje, utrzymuj pokój przy życiu i pozwól, aby rozpęd koncepcji stał się widoczny dla szerszej sieci. Aktualności zamieniają koncepcję w dowód, że ludziom zależy.',
      joinOriginNote:
        'Na JoinOrigin aktualizacje z pokoju trafiają do aktualności — to pętla wzrostu, w której każdy nowy członek powiększa powierzchnię odkrywania. Daj się odkryć i rozwijaj się.',
    },
  ],
};

export default content;
