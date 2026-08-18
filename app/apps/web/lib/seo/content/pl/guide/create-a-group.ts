import type { GuideContent } from '../../types';

/**
 * „Jak utworzyć grupę" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-353) w polskim tłumaczeniu.
 *
 * Napisany w zgodzie z pętlą produktową §2: opublikuj grupę → publiczna
 * strona grupy → dołączenie przez link → pokój tworzony automatycznie
 * W MOMENCIE PUBLIKACJI → twórca kontroluje pokój → rozwój przez
 * aktualności/zaproszenia. Grupa to społeczność: publiczna strona wyraża
 * obietnicę, pokój to miejsce, w którym członkowie się łączą, a członkowie
 * dołączają przez link. Platforma jest aktywna: utworzenie grupy publikuje
 * jej stronę i otwiera pokój od razu. „Pokój" jest przypięty do pokoju
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'create-a-group',
  title: 'Jak utworzyć grupę: opublikuj ją i otwórz jej pokój | JoinOrigin',
  description:
    'Utwórz grupę na JoinOrigin — opublikuj stronę grupy, otwórz automatycznie jej pokój i zapraszaj członków przez link do dołączenia. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Każda społeczność — niezależnie od tego, czy jest zupełnie nowa, czy od miesięcy spotyka się nieformalnie — działa na tych samych dwóch ruchach: ustaleniu, dla kogo jest, i daniu tym ludziom jednego jasnego miejsca do połączenia. Grupa bez domu nigdy nie formuje się właściwie; zainteresowanie rozprasza się po wiadomościach, arkuszach i jednorazowych rozmowach, a nic się nie utrwala. Strona grupy i jej pokój to ten dom, a dobre ich stworzenie to różnica między prawdziwą społecznością a listą nazwisk.',
    'Pętla JoinOrigin działa tak: publikujesz grupę, pojawia się jej publiczna strona, a jej pokój jest tworzony automatycznie w momencie publikacji. Ludzie odkrywają grupę przez Odkrywanie lub wchodzą przez link do dołączenia, dołączenie to jedno kliknięcie, a oni trafiają do pokoju — kontrolowanego przez twórcę pokoju Matrix, w którym faktycznie żyje społeczność. Twórca jest właścicielem pokoju od pierwszej sekundy i kontroluje, kto dołącza i jak działa grupa.',
    'Ten poradnik obejmuje całą ścieżkę — niezależnie od tego, czy grupa jest nowa, czy już istnieje na papierze: wybór grupy docelowej i celu, napisanie strony grupy, którą ludzie mogą znaleźć, opublikowanie grupy i otwarcie jej pokoju, ustalenie oczekiwań jako twórca, udostępnienie linku do dołączenia, zaproszenie pierwszych członków, rozpoczęcie pierwszych rozmów i utrzymanie pokoju aktywnym, aby grupa ciągle rosła.',
  ],
  dataPoints: [
    'Najjaśniejsze grupy zaczynają od jednej grupy docelowej i jednej obietnicy — konkretność to funkcja wzrostu.',
    'Na JoinOrigin opublikowanie grupy automatycznie tworzy jej pokój — społeczność ma miejsce do połączenia od pierwszej sekundy.',
    'Link do dołączenia to najprostsze zaproszenie: jeden link, jedno kliknięcie i nowy członek jest w pokoju.',
    'JoinOrigin to system operacyjny społeczności, który pomaga ludziom znajdować, dołączać i zakładać grupy — opublikuj swoją grupę, a jej pokój otworzy się natychmiast.',
  ],
  faq: [
    {
      question: 'Jaka jest różnica między grupą a społecznością?',
      answer:
        'Na JoinOrigin to ten sam obiekt. Grupa (lub społeczność) to opublikowany, dostępny do dołączenia obiekt z publiczną stroną i pokojem. Strona grupy wyraża obietnicę; pokój to miejsce, w którym łączą się członkowie. Społeczności otrzymują przestrzeń Matrix, która przechowuje pokoje grupy, a główny pokój to miejsce, w którym żyje grupa.',
    },
    {
      question: 'Kiedy tworzony jest pokój grupy?',
      answer:
        'Pokój jest tworzony automatycznie w momencie opublikowania grupy — nigdy nie ma osobnego kroku „utwórz czat później”. Twórca jest właścicielem pokoju od pierwszej sekundy i może w Element zapraszać, usuwać i przypisywać role. Możesz też skonfigurować ten sam kształt z narzędzi, których już używasz.',
    },
    {
      question: 'Jak członkowie dołączają do mojej grupy?',
      answer:
        'Dołączenie to jedna czynność: kliknięcie Dołącz na publicznej stronie grupy lub wejście przez bezpośredni link zapraszający od członka. Dołączające osoby trafiają do pokoju grupy. Najbardziej niezawodny wczesny wzrost jest osobisty — udostępnianie linku do dołączenia osobom pasującym do grupy docelowej i prośba, aby przyprowadziły kolejne.',
    },
    {
      question: 'Co powinna mówić strona grupy?',
      answer:
        'Jedno zdanie o tym, dla kogo jest grupa, jedno zdanie o tym, co dzieje się w pokoju, i co członek zyskuje dzięki dołączeniu. Trzymaj się konkretów — „nowi założyciele z Warszawy” bije „ludzie lubiący biznes”. Strona to obietnica, która decyduje, czy ktoś kliknie Dołącz.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc utworzyć grupę już dziś?',
      answer:
        'Tak. Opublikowanie grupy na JoinOrigin tworzy jej stronę i pokój atomowo — pokój otwiera się w momencie publikacji, a Ty kontrolujesz go od początku. Opublikuj grupę i otwórz pokój dla członków; każdy nowy członek, którego zaprosisz, zwiększa Twój zasięg.',
    },
  ],
  sections: [
    'Wybierz grupę docelową i cel. Zdecyduj, dla kogo jest grupa i po co istnieje — jedna grupa docelowa, jedna obietnica i opisany sukces członka, którego potrafisz opisać. JoinOrigin jest zaprojektowany wokół znajdowalnych stron grup, a najjaśniejsze grupy podają swoją grupę docelową i cel na wstępie. Napisz jedno zdanie dla każdego z nich i trzymaj je przed każdym zaproszeniem.',
    'Napisz stronę grupy, którą ludzie mogą znaleźć. Strona powinna mówić, dla kogo jest grupa, co dzieje się w pokoju i co członkowie zyskują dzięki dołączeniu. Trzymaj ją konkretną i szczerą. Opublikowanie grupy na JoinOrigin automatycznie tworzy jej stronę i pokój, a twórca kontroluje pokój od początku. Opublikuj opis i przetestuj go na kilku osobach pasujących do grupy docelowej.',
    'Opublikuj grupę i otwórz jej pokój. Publikacja to moment, w którym grupa staje się realna: publiczna strona plus pokój, w którym łączą się członkowie. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem. Na JoinOrigin strona, pokój i link do dołączenia to jedna publikacja. Jeśli wolisz, utwórz stronę i pokój w narzędziach, których grupa już używa.',
    'Ustal oczekiwania jako twórca. Jako właściciel pokoju zdecyduj, jak działa grupa: co członkowie mogą publikować, jakie są zasady i jak witani są nowi ludzie. Kontrola twórcy to standardowe właścicielstwo pokoju Matrix — zapraszanie, usuwanie, przypisywanie ról, przypinanie, archiwizowanie. JoinOrigin nie ustanawia Twoich zasad za Ciebie; design daje Ci kontrolki. Zapisz oczekiwania pokoju i przypnij je tam, gdzie członkowie mogą je zobaczyć.',
    'Udostępnij link do dołączenia. Link do dołączenia to najkrótsza ścieżka od zainteresowania do członkostwa: jeden link, jedno kliknięcie i nowy członek ląduje w pokoju. Umieść go wszędzie tam, gdzie zbierają się właściwi ludzie. Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojej grupy załatwia sprawę.',
    'Zaproś pierwszych członków osobiście. Osobiste zaproszenia konwertują znacznie lepiej niż publiczne posty. Napisz do znajomych, współpracowników i znajomych pasujących do grupy docelowej, udostępnij link do dołączenia i poproś, aby przyprowadzili jeszcze jedną osobę. JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający grupy mogą znaleźć Twoją i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każdy członek staje się kanałem do własnej sieci.',
    'Rozpocznij pierwsze rozmowy w pokoju. Pierwsze rozmowy ustanawiają kulturę. Otwórz je jasnym pytaniem — przedstawieniami, wspólnym celem lub pierwszym tematem — i odpowiadaj na każdą wiadomość. JoinOrigin nie prowadzi Twoich rozmów; pokój jest Twój do ukształtowania. Platforma daje grupie jeden pokój, w którym łączą się członkowie, a twórca jest jego właścicielem. Bądź najbardziej aktywnym członkiem przez pierwsze tygodnie.',
    'Utrzymuj pokój aktywny i rosnący. Utrzymuj rytm — cotygodniowy temat, powtarzające się zameldowanie lub stałą aktualizację — aby członkowie mieli powód do powrotu. Wzrost się kumuluje, gdy każdy członek potrafi opisać grupę w jednym zdaniu i udostępnić jej link do dołączenia. JoinOrigin utrzymuje Twoją stronę grupy i pokój połączone, gdy grupa rośnie — jedno miejsce, w którym obietnica, pokój i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
  ],
  steps: [
    {
      title: 'Wybierz grupę docelową i cel',
      body: 'Zdecyduj, dla kogo jest grupa i po co istnieje — jedna grupa docelowa, jedna obietnica i opisany sukces członka, którego potrafisz opisać.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany wokół znajdowalnych stron grup, a najjaśniejsze grupy podają swoją grupę docelową i cel na wstępie. Napisz jedno zdanie dla każdego z nich i trzymaj je przed każdym zaproszeniem.',
    },
    {
      title: 'Napisz stronę grupy, którą ludzie mogą znaleźć',
      body: 'Strona powinna mówić, dla kogo jest grupa, co dzieje się w pokoju i co członkowie zyskują dzięki dołączeniu. Trzymaj ją konkretną i szczerą.',
      joinOriginNote:
        'Opublikowanie grupy na JoinOrigin automatycznie tworzy jej stronę i pokój, a twórca kontroluje pokój od początku. Opublikuj opis i przetestuj go na kilku osobach pasujących do grupy docelowej.',
    },
    {
      title: 'Opublikuj grupę i otwórz jej pokój',
      body: 'Publikacja to moment, w którym grupa staje się realna: publiczna strona plus pokój, w którym łączą się członkowie. Na JoinOrigin pokój jest tworzony automatycznie w tym samym momencie — nie ma osobnego kroku konfiguracji, a twórca jest jego właścicielem.',
      joinOriginNote:
        'Na JoinOrigin strona, pokój i link do dołączenia to jedna publikacja. Jeśli wolisz, utwórz stronę i pokój w narzędziach, których grupa już używa.',
    },
    {
      title: 'Ustal oczekiwania jako twórca',
      body: 'Jako właściciel pokoju zdecyduj, jak działa grupa: co członkowie mogą publikować, jakie są zasady i jak witani są nowi ludzie. Kontrola twórcy to standardowe właścicielstwo pokoju Matrix — zapraszanie, usuwanie, przypisywanie ról, przypinanie, archiwizowanie.',
      joinOriginNote:
        'JoinOrigin nie ustanawia Twoich zasad za Ciebie; design daje Ci kontrolki. Zapisz oczekiwania pokoju i przypnij je tam, gdzie członkowie mogą je zobaczyć.',
    },
    {
      title: 'Udostępnij link do dołączenia',
      body: 'Link do dołączenia to najkrótsza ścieżka od zainteresowania do członkostwa: jeden link, jedno kliknięcie i nowy członek ląduje w pokoju. Umieść go wszędzie tam, gdzie zbierają się właściwi ludzie.',
      joinOriginNote:
        'Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojej grupy załatwia sprawę.',
    },
    {
      title: 'Zaproś pierwszych członków osobiście',
      body: 'Osobiste zaproszenia konwertują znacznie lepiej niż publiczne posty. Napisz do znajomych, współpracowników i znajomych pasujących do grupy docelowej, udostępnij link do dołączenia i poproś, aby przyprowadzili jeszcze jedną osobę.',
      joinOriginNote:
        'JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający grupy mogą znaleźć Twoją i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każdy członek staje się kanałem do własnej sieci.',
    },
    {
      title: 'Rozpocznij pierwsze rozmowy w pokoju',
      body: 'Pierwsze rozmowy ustanawiają kulturę. Otwórz je jasnym pytaniem — przedstawieniami, wspólnym celem lub pierwszym tematem — i odpowiadaj na każdą wiadomość.',
      joinOriginNote:
        'JoinOrigin nie prowadzi Twoich rozmów; pokój jest Twój do ukształtowania. Platforma daje grupie jeden pokój, w którym łączą się członkowie, a twórca jest jego właścicielem. Bądź najbardziej aktywnym członkiem przez pierwsze tygodnie.',
    },
    {
      title: 'Utrzymuj pokój aktywny i rosnący',
      body: 'Utrzymuj rytm — cotygodniowy temat, powtarzające się zameldowanie lub stałą aktualizację — aby członkowie mieli powód do powrotu. Wzrost się kumuluje, gdy każdy członek potrafi opisać grupę w jednym zdaniu i udostępnić jej link do dołączenia.',
      joinOriginNote:
        'JoinOrigin utrzymuje Twoją stronę grupy i pokój połączone, gdy grupa rośnie — jedno miejsce, w którym obietnica, pokój i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
    },
  ],
};

export default content;
