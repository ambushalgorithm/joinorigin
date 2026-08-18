import type { GuideContent } from '../../types';

/**
 * „Jak opublikować pomysł na małą firmę" — ponadczasowy poradnik L1
 * (design §6.1, TASK-353) w polskim tłumaczeniu.
 *
 * Napisany w zgodzie z pętlą produktową §2: opublikuj pomysł na małą firmę
 * → publiczna strona pomysłu → dołączenie przez link → pokój tworzony
 * automatycznie W MOMENCIE PUBLIKACJI → twórca kontroluje pokój → rozwój
 * przez aktualności/zaproszenia. Strona pomysłu to obietnica witryny
 * sklepowej; pokój to miejsce, w którym klienci, współpracownicy i pierwsi
 * wierni gromadzą się wokół firmy. Platforma jest aktywna: opublikowanie
 * pomysłu tworzy jego stronę i pokój od razu. „Pokój" jest przypięty do
 * pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'publish-a-small-business-idea',
  title: 'Jak opublikować pomysł na małą firmę: strona pomysłu + pokój | JoinOrigin',
  description:
    'Opublikuj pomysł na małą firmę na JoinOrigin — niezależnie od tego, czy rozpoczynasz nowe przedsięwzięcie, czy istniejący biznes dzieli się tym, co oferuje, napisz publiczną stronę pomysłu, otwórz automatycznie jego pokój i zaproś klientów oraz współpracowników, którzy chcą to zobaczyć. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Małe firmy często zaczynają w ten sam sposób — ktoś dostrzega prawdziwy problem w swojej okolicy, pracy lub hobby i nie może przestać myśleć o rozwiązaniu — ale wiele innych już działa: działający sklep, działająca usługa, produkt z klientami. Niezależnie od tego, czy Twój biznes to wciąż iskra, czy już obsługuje ludzi, następny krok jest ten sam: zamień to, co masz, w coś, co inni mogą zobaczyć, na co zareagować i do czego dołączyć. Mała firma potrzebuje publicznego domu i potrzebuje ludzi wokół siebie — zanim będzie miała witrynę sklepową i długo po tym, jak jedna powstanie.',
    'Pętla JoinOrigin działa tak: publikujesz pomysł na małą firmę, pojawia się jego publiczna strona pomysłu, a jego pokój jest tworzony automatycznie w momencie publikacji. Ludzie odkrywają stronę lub wchodzą przez link, dołączenie to jedno kliknięcie, a oni trafiają do pokoju — kontrolowanego przez twórcę pokoju Matrix, w którym klienci, współpracownicy i pierwsi wierni mogą zadawać pytania, dzielić się opiniami i angażować się. Twórca jest właścicielem pokoju od pierwszej sekundy i decyduje, kto dołącza i co dzieje się w środku.',
    'Ten poradnik przeprowadza przez publikowanie pomysłu na małą firmę tak, jak otworzyłbyś sklep: nazwanie klienta i problemu, napisanie strony pomysłu jak witryny sklepowej, opublikowanie jej i otwarcie pokoju, udostępnienie strony lokalnej sieci, zaproszenie pierwszych klientów i współpracowników, słuchanie w pokoju, dopracowanie oferty na podstawie prawdziwych opinii i rozwijanie pokoju w pierwszą bazę klientów.',
  ],
  dataPoints: [
    'Najjaśniejsze pomysły na małe firmy zaczynają się od jednego nazwanego klienta i jednego konkretnego problemu, a nie od ogólnej publiczności.',
    'Na JoinOrigin opublikowanie pomysłu automatycznie tworzy jego pokój — firma ma miejsce dla klientów i współpracowników od początku.',
    'Link do dołączenia to najprostsze zaproszenie: jeden link, jedno kliknięcie i zainteresowana osoba jest w pokoju.',
    'JoinOrigin to system operacyjny społeczności, który pomaga ludziom znajdować pomysły i ludzi za nimi stojących — opublikuj swój pomysł, a jego pokój otworzy się natychmiast.',
  ],
  faq: [
    {
      question: 'Czym pomysł na małą firmę różni się od zwykłej strony pomysłu?',
      answer:
        'Format strony jest ten sam, ale obietnica jest ostrzejsza: klient, problem i oferta. Tam, gdzie ogólny pomysł zaprasza współpracowników, strona pomysłu na małą firmę zaprasza pierwszych klientów i lokalnych wiernych — ludzi, którzy faktycznie kupiliby, poleciliby lub pomogli Ci zacząć albo rozwinąć to, co już działa.',
    },
    {
      question: 'Kiedy tworzony jest pokój dla mojego pomysłu na firmę?',
      answer:
        'Pokój jest tworzony automatycznie w momencie opublikowania pomysłu. Twórca jest właścicielem pokoju od pierwszej sekundy i może w Element zapraszać, usuwać i przypisywać role. Możesz też otworzyć pokój z narzędzi, których już używasz, i zaprosić ludzi, którym problem leży na sercu.',
    },
    {
      question: 'Kto powinien dołączyć do pokoju pomysłu na małą firmę?',
      answer:
        'Pierwsi klienci, osoby z umiejętnością, której Ci brakuje, i lokalni, którzy mogą Cię polecić. Pokój to miejsce, w którym testujesz popyt, dopracowujesz ofertę i znajdujesz pierwszych wiernych — zanim wydasz pieniądze na zapasy, wynajem lub marketing.',
    },
    {
      question: 'Co powinna obiecywać strona pomysłu?',
      answer:
        'Jednego nazwanego klienta, jeden problem i to, co planujesz zaoferować. Bądź szczery co do etapu — „testuję ten pomysł i chcę porozmawiać z ludźmi, którzy czują ten problem” to silna obietnica. Strona decyduje, czy właściwi ludzie klikną Dołącz.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc opublikować pomysł na małą firmę już dziś?',
      answer:
        'Tak. Opublikowanie pomysłu na JoinOrigin tworzy jego stronę i pokój atomowo — pokój otwiera się w momencie publikacji, a Ty kontrolujesz go od początku. Opublikuj pomysł publicznie i otwórz pokój do dyskusji; każdy nowy członek, którego zaprosisz, zwiększa Twój zasięg.',
    },
  ],
  sections: [
    'Nazwij klienta i problem. Zanim cokolwiek napiszesz, nazwij konkretną osobę, która czuje ten problem, i opisz problem jej słowami. Mała firma odnosi sukces, gdy dobrze służy jednej prawdziwej potrzebie. JoinOrigin jest zaprojektowany wokół znajdowalnych stron pomysłów, a najjaśniejsze strony zaczynają się od nazwanego klienta. Zapisz klienta i problem i przetestuj je na trzech pasujących osobach.',
    'Napisz stronę pomysłu jak witrynę sklepową. Strona powinna pokazywać, co oferujesz, dla kogo jest, ile kosztuje w czasie lub pieniądzach i na jakim etapie jest pomysł. Trzymaj się konkretów — pop-up, produkt, usługa, sklep. Opublikowanie pomysłu na JoinOrigin automatycznie tworzy jego stronę i pokój, a twórca kontroluje pokój od początku. Przygotuj stronę jako krótki publiczny post i dopracuj ją z opiniami.',
    'Opublikuj pomysł i otwórz jego pokój. Publikacja to moment, w którym pomysł na firmę staje się znajdowalny. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem. Na JoinOrigin strona, pokój i link do dołączenia to jedna publikacja. Opublikuj pomysł publicznie i otwórz pokój do rozmowy wokół niego.',
    'Udostępnij stronę swojej lokalnej sieci. Małe firmy rosną dzięki lokalnemu zasięgowi. Udostępnij stronę pomysłu sąsiadom, współpracownikom, lokalnym grupom i każdemu, kto zna problem z pierwszej ręki. Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojego pomysłu załatwia sprawę.',
    'Zaproś pierwszych klientów i współpracowników. Zaproś ludzi, którzy faktycznie kupiliby lub pomogli: potencjalnych klientów, osobę z umiejętnością, której Ci brakuje, mentora lub lokalnego organizatora. JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający pomysłu mogą znaleźć Twój i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każda dołączona osoba staje się kanałem do własnej sieci.',
    'Słuchaj w pokoju. Zapytaj dołączone osoby, jak korzystałyby z oferty, ile by zapłaciły i co je powstrzymuje. Pokój to miejsce, w którym pojawia się prawdziwy popyt — albo nie pojawia. JoinOrigin nie prowadzi tych rozmów; pokój jest Twój do ukształtowania. Platforma daje pomysłowi na firmę jeden pokój, w którym zainteresowanie zamienia się w opinie, a twórca jest właścicielem tego pokoju. Pytaj członków bezpośrednio w pokoju.',
    'Dopracuj ofertę na podstawie prawdziwych opinii. Dostosuj cenę, zakres, kanał lub obietnicę na podstawie tego, co mówią dołączone osoby. Małe firmy buduje się małymi iteracjami. JoinOrigin trzyma wspólną pamięć pomysłu w jednym miejscu — notatki, decyzje i opinie w pokoju — dzięki czemu dopracowanie jest widoczne zamiast zagubionego. Zmieniaj jedną rzecz na raz i obserwuj reakcję.',
    'Rozwiń pokój w swoją pierwszą bazę klientów. Ciągle zapraszaj, ciągle udostępniaj aktualizacje i utrzymuj pokój przy życiu, gdy oferta się wykrystalizowuje. Ludzie w pokoju to Twoi pierwsi klienci i pierwsi promotorzy. JoinOrigin utrzymuje Twoją stronę pomysłu i jego pokój połączone, gdy firma rośnie — jedno miejsce, w którym obietnica, rozmowa i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
  ],
  steps: [
    {
      title: 'Nazwij klienta i problem',
      body: 'Zanim cokolwiek napiszesz, nazwij konkretną osobę, która czuje ten problem, i opisz problem jej słowami. Mała firma odnosi sukces, gdy dobrze służy jednej prawdziwej potrzebie.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany wokół znajdowalnych stron pomysłów, a najjaśniejsze strony zaczynają się od nazwanego klienta. Zapisz klienta i problem i przetestuj je na trzech pasujących osobach.',
    },
    {
      title: 'Napisz stronę pomysłu jak witrynę sklepową',
      body: 'Strona powinna pokazywać, co oferujesz, dla kogo jest, ile kosztuje w czasie lub pieniądzach i na jakim etapie jest pomysł. Trzymaj się konkretów — pop-up, produkt, usługa, sklep.',
      joinOriginNote:
        'Opublikowanie pomysłu na JoinOrigin automatycznie tworzy jego stronę i pokój, a twórca kontroluje pokój od początku. Przygotuj stronę jako krótki publiczny post i dopracuj ją z opiniami.',
    },
    {
      title: 'Opublikuj pomysł i otwórz jego pokój',
      body: 'Publikacja to moment, w którym pomysł na firmę staje się znajdowalny. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem.',
      joinOriginNote:
        'Na JoinOrigin strona, pokój i link do dołączenia to jedna publikacja. Opublikuj pomysł publicznie i otwórz pokój do rozmowy wokół niego.',
    },
    {
      title: 'Udostępnij stronę swojej lokalnej sieci',
      body: 'Małe firmy rosną dzięki lokalnemu zasięgowi. Udostępnij stronę pomysłu sąsiadom, współpracownikom, lokalnym grupom i każdemu, kto zna problem z pierwszej ręki.',
      joinOriginNote:
        'Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojego pomysłu załatwia sprawę.',
    },
    {
      title: 'Zaproś pierwszych klientów i współpracowników',
      body: 'Zaproś ludzi, którzy faktycznie kupiliby lub pomogli: potencjalnych klientów, osobę z umiejętnością, której Ci brakuje, mentora lub lokalnego organizatora.',
      joinOriginNote:
        'JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający pomysłu mogą znaleźć Twój i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każda dołączona osoba staje się kanałem do własnej sieci.',
    },
    {
      title: 'Słuchaj w pokoju',
      body: 'Zapytaj dołączone osoby, jak korzystałyby z oferty, ile by zapłaciły i co je powstrzymuje. Pokój to miejsce, w którym pojawia się prawdziwy popyt — albo nie pojawia.',
      joinOriginNote:
        'JoinOrigin nie prowadzi tych rozmów; pokój jest Twój do ukształtowania. Platforma daje pomysłowi na firmę jeden pokój, w którym zainteresowanie zamienia się w opinie, a twórca jest właścicielem tego pokoju. Pytaj członków bezpośrednio w pokoju.',
    },
    {
      title: 'Dopracuj ofertę na podstawie prawdziwych opinii',
      body: 'Dostosuj cenę, zakres, kanał lub obietnicę na podstawie tego, co mówią dołączone osoby. Małe firmy buduje się małymi iteracjami.',
      joinOriginNote:
        'JoinOrigin trzyma wspólną pamięć pomysłu w jednym miejscu — notatki, decyzje i opinie w pokoju — dzięki czemu dopracowanie jest widoczne zamiast zagubionego. Zmieniaj jedną rzecz na raz i obserwuj reakcję.',
    },
    {
      title: 'Rozwiń pokój w swoją pierwszą bazę klientów',
      body: 'Ciągle zapraszaj, ciągle udostępniaj aktualizacje i utrzymuj pokój przy życiu, gdy oferta się wykrystalizowuje. Ludzie w pokoju to Twoi pierwsi klienci i pierwsi promotorzy.',
      joinOriginNote:
        'JoinOrigin utrzymuje Twoją stronę pomysłu i jego pokój połączone, gdy firma rośnie — jedno miejsce, w którym obietnica, rozmowa i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
    },
  ],
};

export default content;
