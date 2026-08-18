import type { GuideContent } from '../../types';

/**
 * „Jak opublikować pomysł" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-353) w polskim tłumaczeniu.
 *
 * Napisany w zgodzie z pętlą produktową §2: Odkrywanie → publiczna strona
 * pomysłu → dołączenie przez link → pokój tworzony automatycznie W MOMENCIE
 * PUBLIKACJI → twórca kontroluje pokój → rozwój przez aktualności/zaproszenia.
 * Strona pomysłu to publiczna obietnica; pokój to miejsce, w którym
 * zainteresowani ludzie spotykają się i rozmawiają. Platforma jest aktywna:
 * opublikowanie pomysłu tworzy jego stronę i pokój od razu. „Pokój" jest
 * przypięty do pokoju Matrix (§6.3). Zwrot nie jest używany w tekście.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'publish-an-idea',
  title: 'Jak opublikować pomysł: zamień iskrę w znajdowalną stronę pomysłu | JoinOrigin',
  description:
    'Opublikuj pomysł na JoinOrigin — niezależnie od tego, czy to nowa iskra, czy istniejący projekt, który chcesz, aby ludzie znaleźli — napisz publiczną stronę pomysłu, pozwól, aby jego pokój otworzył się automatycznie, i zaproś ludzi, którzy chcą budować go razem z Tobą. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Większość pomysłów umiera w szkicach — notatka w telefonie, na wpół zapamiętana rozmowa, dokument, którego nikt inny nigdy nie widział. Powodem rzadko jest to, że pomysł jest zły. Chodzi o to, że nikt nie mógł go znaleźć, a znalezienie właściwych ludzi to cała gra. Ten problem łączenia ludzi to dokładnie to, co rozwiązuje JoinOrigin — niezależnie od tego, czy pomysł jest świeżą iskrą, czy istniejącym projektem, który po cichu posuwa się naprzód bez znajdowalnego domu.',
    'Pętla JoinOrigin działa tak: publikujesz pomysł, pojawia się publiczna strona pomysłu, a jego pokój jest tworzony automatycznie w momencie publikacji. Ludzie odkrywają stronę przez Odkrywanie lub wchodzą przez link, którym się dzielisz, a dołączenie to jedno kliknięcie. Trafiają do pokoju — kontrolowanego przez twórcę pokoju Matrix, w którym faktycznie toczy się rozmowa wokół pomysłu. Twórca jest właścicielem pokoju od pierwszej sekundy i decyduje, kto dołącza i co dzieje się w środku.',
    'Ten poradnik prowadzi przez całą ścieżkę: skompresowanie pomysłu w jedno jasne zdanie, napisanie strony, którą ludzie mogą znaleźć, opublikowanie jej i otwarcie pokoju, udostępnienie linku do dołączenia, zaproszenie pierwszych zainteresowanych osób, poprowadzenie pierwszej rozmowy, dopracowanie pomysłu na podstawie prawdziwych opinii i utrzymanie pomysłu w stanie znajdowalnym, gdy rośnie. Działa dla każdego pomysłu — małej firmy, startupu, klubu książki, projektu społecznościowego, produktu, który jeszcze nie istnieje, lub projektu, który już istnieje i potrzebuje wokół siebie więcej ludzi.',
  ],
  dataPoints: [
    'Jednozdaniowy opis pomysłu jest bardziej znajdowalny niż długi dokument — jasność to funkcja odkrywania.',
    'Na JoinOrigin opublikowanie pomysłu automatycznie tworzy jego pokój — nigdy nie ma osobnego kroku „utwórz czat później”.',
    'Link do dołączenia to najprostsze zaproszenie: jeden link, jedno kliknięcie i zainteresowana osoba jest w pokoju.',
    'JoinOrigin to system operacyjny społeczności, który pomaga ludziom znajdować pomysły i ludzi za nimi stojących — opublikuj swój pomysł, a jego pokój otworzy się natychmiast.',
  ],
  faq: [
    {
      question: 'Czym dokładnie jest strona pomysłu?',
      answer:
        'Strona pomysłu to publiczny, indeksowalny dom pomysłu na JoinOrigin — przejrzysta strona mówiąca, czym jest pomysł, dlaczego ma znaczenie i dla kogo jest przeznaczony, z akcją Dołącz. Ludzie odkrywają ją przez Odkrywanie lub udostępniony link, a dołączenie prowadzi ich do pokoju pomysłu.',
    },
    {
      question: 'Kiedy tworzony jest pokój?',
      answer:
        'Pokój jest tworzony automatycznie w momencie opublikowania pomysłu. Twórca jest właścicielem pokoju od pierwszej sekundy i może w Element zapraszać, usuwać i przypisywać role. Możesz też zbudować ten sam kształt — publiczną stronę plus pokój — z narzędzi, których już używasz.',
    },
    {
      question: 'Jak ludzie znajdują mój pomysł?',
      answer:
        'Dzięki odkrywaniu i udostępnianiu: strona pomysłu jest indeksowalna i pojawia się w Odkrywaniu, a każdy udostępniony link do dołączenia prowadzi wprost do niej. Najbardziej niezawodny wczesny ruch jest osobisty — udostępnianie strony i jej linku osobom, którym problem już leży na sercu.',
    },
    {
      question: 'Jaka jest różnica między pomysłem a projektem?',
      answer:
        'Pomysł to propozycja, wokół której gromadzą się ludzie — pokój to miejsce, w którym zainteresowani rozmawiają i testują dopasowanie. Projekt to to, co uformowana grupa zaczyna robić razem, z własną stroną projektu i pokojem. Najpierw opublikuj pomysł; projekt pojawia się, gdy ludzie się zaangażują.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc opublikować pomysł już dziś?',
      answer:
        'Tak. Opublikowanie pomysłu na JoinOrigin tworzy jego stronę i pokój atomowo — pokój otwiera się w momencie publikacji, a Ty kontrolujesz go od początku. Opublikuj swój pomysł i otwórz pokój do dyskusji; każdy nowy członek, którego zaprosisz, zwiększa Twój zasięg.',
    },
  ],
  sections: [
    'Określ pomysł w jednym jasnym zdaniu. Skompresuj pomysł w jedno zdanie: dla kogo jest, co zmienia i dlaczego ma znaczenie. Jeśli nie potrafisz powiedzieć tego w jednym zdaniu, nie jesteś gotowy, aby go opublikować. JoinOrigin jest zaprojektowany wokół znajdowalnych stron pomysłów — jednozdaniowy opis to rdzeń strony i fraza, której ludzie będą szukać. Zapisz zdanie i przetestuj je na trzech osobach, zanim pójdziesz dalej.',
    'Napisz stronę pomysłu z obietnicą i potrzebą. Strona powinna przedstawiać pomysł, dlaczego ma znaczenie, czego potrzebuje i kogo chcesz zaprosić. Bądź szczery co do etapu, na którym jest pomysł — iskra, prototyp, produkt. JoinOrigin automatycznie tworzy stronę i pokój, gdy publikujesz pomysł; twórca kontroluje pokój od początku i może w Element zapraszać, usuwać i przypisywać role. Opublikuj pomysł i otwórz pokój do dyskusji wokół niego.',
    'Opublikuj pomysł i pozwól, aby jego pokój się otworzył. Publikacja to moment, w którym pomysł staje się znajdowalny. Na JoinOrigin publikacja automatycznie tworzy pokój — nigdy nie ma kroku „utwórz czat później”, a twórca jest właścicielem pokoju od pierwszej sekundy. Na JoinOrigin strona pomysłu i jego pokój to jedna atomowa publikacja. Możesz też udostępnić stronę publicznie i skonfigurować pokój w narzędziach, których już używasz.',
    'Udostępnij link do dołączenia. Link do dołączenia to najkrótsza ścieżka od zainteresowania do połączenia: jeden link, jedno kliknięcie i zainteresowana osoba ląduje w pokoju. Umieść go wszędzie tam, gdzie zbierają się właściwi ludzie. Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojego pomysłu załatwia sprawę.',
    'Zaproś pierwszych zainteresowanych osobiście. Osobiste zaproszenia konwertują lepiej niż publiczne posty. Napisz do osób pasujących do grupy docelowej pomysłu, udostępnij link do dołączenia i poproś, aby przyprowadziły jeszcze jedną osobę, którą temat może zainteresować. JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający pomysłu mogą znaleźć Twój i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każda dołączona osoba staje się kanałem do własnej sieci.',
    'Poprowadź pierwszą rozmowę w pokoju. Pierwsze rozmowy decydują, czy pomysł ma rozpęd. Otwórz pokój jasnym pytaniem — jaki jest problem, jaki jest pierwszy krok, co każdy z Was wnosi — i pozwól ludziom odpowiedzieć. JoinOrigin nie prowadzi tych rozmów; pokój jest Twój do ukształtowania. Platforma daje pomysłowi jeden pokój, w którym zainteresowanie zamienia się w rozmowę, a twórca jest właścicielem tego pokoju. Zacznij rozmowę tam, gdzie Twoi ludzie już są.',
    'Zbieraj opinie i dopracuj pomysł. Zapytaj dołączone osoby, co je ekscytuje, co je martwi i co zrobiłyby najpierw. Dostosuj opis, zakres lub następny krok na podstawie ich odpowiedzi. JoinOrigin trzyma wspólną pamięć pomysłu w jednym miejscu — notatki, decyzje i opinie w pokoju — dzięki czemu dopracowanie jest widoczne zamiast zagubionego. Pytaj członków bezpośrednio w pokoju po pierwszym tygodniu.',
    'Utrzymuj pomysł znajdowalnym, gdy rośnie. Wracaj do strony w miarę rozwoju pomysłu — aktualizuj obietnicę, potrzeby i następny krok, aby nowi członkowie zawsze widzieli aktualną wersję. Wzrost się kumuluje, gdy każdy członek potrafi opisać pomysł w jednym zdaniu i udostępnić jego link do dołączenia. JoinOrigin utrzymuje Twoją stronę pomysłu i jego pokój połączone, gdy zainteresowanie rośnie — jedno miejsce, w którym obietnica, rozmowa i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
  ],
  steps: [
    {
      title: 'Określ pomysł w jednym jasnym zdaniu',
      body: 'Skompresuj pomysł w jedno zdanie: dla kogo jest, co zmienia i dlaczego ma znaczenie. Jeśli nie potrafisz powiedzieć tego w jednym zdaniu, nie jesteś gotowy, aby go opublikować.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany wokół znajdowalnych stron pomysłów — jednozdaniowy opis to rdzeń strony i fraza, której ludzie będą szukać. Zapisz zdanie i przetestuj je na trzech osobach, zanim pójdziesz dalej.',
    },
    {
      title: 'Napisz stronę pomysłu z obietnicą i potrzebą',
      body: 'Strona powinna przedstawiać pomysł, dlaczego ma znaczenie, czego potrzebuje i kogo chcesz zaprosić. Bądź szczery co do etapu, na którym jest pomysł — iskra, prototyp, produkt.',
      joinOriginNote:
        'JoinOrigin automatycznie tworzy stronę i pokój, gdy publikujesz pomysł; twórca kontroluje pokój od początku i może w Element zapraszać, usuwać i przypisywać role. Opublikuj pomysł i otwórz pokój do dyskusji wokół niego.',
    },
    {
      title: 'Opublikuj pomysł i pozwól, aby jego pokój się otworzył',
      body: 'Publikacja to moment, w którym pomysł staje się znajdowalny. Na JoinOrigin publikacja automatycznie tworzy pokój — nigdy nie ma kroku „utwórz czat później”, a twórca jest właścicielem pokoju od pierwszej sekundy.',
      joinOriginNote:
        'Na JoinOrigin strona pomysłu i jego pokój to jedna atomowa publikacja. Możesz też udostępnić stronę publicznie i skonfigurować pokój w narzędziach, których już używasz.',
    },
    {
      title: 'Udostępnij link do dołączenia',
      body: 'Link do dołączenia to najkrótsza ścieżka od zainteresowania do połączenia: jeden link, jedno kliknięcie i zainteresowana osoba ląduje w pokoju. Umieść go wszędzie tam, gdzie zbierają się właściwi ludzie.',
      joinOriginNote:
        'Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojego pomysłu załatwia sprawę.',
    },
    {
      title: 'Zaproś pierwszych zainteresowanych osobiście',
      body: 'Osobiste zaproszenia konwertują lepiej niż publiczne posty. Napisz do osób pasujących do grupy docelowej pomysłu, udostępnij link do dołączenia i poproś, aby przyprowadziły jeszcze jedną osobę, którą temat może zainteresować.',
      joinOriginNote:
        'JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający pomysłu mogą znaleźć Twój i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każda dołączona osoba staje się kanałem do własnej sieci.',
    },
    {
      title: 'Poprowadź pierwszą rozmowę w pokoju',
      body: 'Pierwsze rozmowy decydują, czy pomysł ma rozpęd. Otwórz pokój jasnym pytaniem — jaki jest problem, jaki jest pierwszy krok, co każdy z Was wnosi — i pozwól ludziom odpowiedzieć.',
      joinOriginNote:
        'JoinOrigin nie prowadzi tych rozmów; pokój jest Twój do ukształtowania. Platforma daje pomysłowi jeden pokój, w którym zainteresowanie zamienia się w rozmowę, a twórca jest właścicielem tego pokoju. Zacznij rozmowę tam, gdzie Twoi ludzie już są.',
    },
    {
      title: 'Zbieraj opinie i dopracuj pomysł',
      body: 'Zapytaj dołączone osoby, co je ekscytuje, co je martwi i co zrobiłyby najpierw. Dostosuj opis, zakres lub następny krok na podstawie ich odpowiedzi.',
      joinOriginNote:
        'JoinOrigin trzyma wspólną pamięć pomysłu w jednym miejscu — notatki, decyzje i opinie w pokoju — dzięki czemu dopracowanie jest widoczne zamiast zagubionego. Pytaj członków bezpośrednio w pokoju po pierwszym tygodniu.',
    },
    {
      title: 'Utrzymuj pomysł znajdowalnym, gdy rośnie',
      body: 'Wracaj do strony w miarę rozwoju pomysłu — aktualizuj obietnicę, potrzeby i następny krok, aby nowi członkowie zawsze widzieli aktualną wersję. Wzrost się kumuluje, gdy każdy członek potrafi opisać pomysł w jednym zdaniu i udostępnić jego link do dołączenia.',
      joinOriginNote:
        'JoinOrigin utrzymuje Twoją stronę pomysłu i jego pokój połączone, gdy zainteresowanie rośnie — jedno miejsce, w którym obietnica, rozmowa i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
    },
  ],
};

export default content;
