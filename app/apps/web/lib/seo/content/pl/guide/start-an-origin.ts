import type { GuideContent } from '../../types';

/**
 * „Jak założyć Origin" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany na cyfrowym modelu połącz→dołącz→pokój: opublikuj grupę →
 * pokój tworzony automatycznie przy publikacji → członkowie dołączają przez
 * link; wskazówki dotyczące miejsc i formatów pozostają konsekwencją
 * dalszego kroku, nigdy rdzeniem. Wartość JoinOrigin jest wpleciona w intro
 * i każdy krok (per-krokowy `joinOriginNote`), z uczciwym ujęciem —
 * JoinOrigin nie prowadzi lokalnych wydarzeń. Pojedynczy H1, struktura
 * krok po kroku, FAQ odwzorowane 1:1 w `FAQPage` JSON-LD. „Pokój" jest
 * przypięty do pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'start-an-origin',
  title: 'Jak założyć Origin: poradnik krok po kroku | JoinOrigin',
  description:
    'Dowiedz się, jak założyć Origin — lub dać istniejącemu jeden cyfrowy dom — opublikuj grupę, otwórz jej pokój i sprowadź członków przez link do dołączenia. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Najtrudniejszą częścią zakładania Origin rzadko jest miejsce, agenda czy budżet — to znalezienie pierwszych ludzi, którzy dzielą Twoje zainteresowanie, i danie im jednego jasnego miejsca do połączenia. To dokładnie problem, który rozwiązuje JoinOrigin.',
    'JoinOrigin to system operacyjny społeczności zbudowany wokół cyfrowej pętli: publikujesz grupę, jej pokój jest tworzony automatycznie, a członkowie dołączają przez link. Pokój to miejsce, w którym faktycznie żyje społeczność — kontrolowany przez twórcę pokój Matrix, w którym członkowie rozmawiają, dzielą się aktualizacjami i planują razem od pierwszego dnia, zamiast rozpraszać się po arkuszach, rozproszonych wiadomościach i formularzach rejestracyjnych. Wydarzenia stacjonarne istnieją tylko jako konsekwencja dalszego kroku: gdy grupa się uformuje, a jej pokój ożyje, członkowie mogą zdecydować się na spotkania twarzą w twarz — a JoinOrigin nie prowadzi lokalnych wydarzeń. Cały sens platformy to łączenie ludzi, którzy inaczej nigdy by się nie spotkali, dlatego każdy krok w tym poradniku odwzorowuje coś, w czym pomaga JoinOrigin.',
    "Podejście działa dla każdego typu społeczności: kręgu założycieli, klubu książki, lokalnej grupy biegowej, sieci małych firm czy online'owej społeczności zawodowej — i działa niezależnie od tego, czy zaczynasz od zera, czy formalizujesz grupę, która już spotyka się nieformalnie. Podstawowa zasada jest prosta — ludzie dołączają z powodu jasnej obietnicy i zostają, ponieważ doświadczenie rzetelnie spełnia tę obietnicę. Nie potrzebujesz dużego budżetu, miejsca ani istniejącej publiczności, aby zacząć; potrzebujesz jasnego celu, realistycznego pierwszego kroku i dyscypliny, aby go powtarzać.",
  ],
  dataPoints: [
    'Większość odnoszących sukcesy społeczności zaczyna od wąskiej, konkretnej grupy docelowej, a nie od „wszystkich zainteresowanych”.',
    'Opublikowanie grupy tworzy jej pokój natychmiast — nigdy nie ma kroku „utwórz czat później”.',
    'Link do dołączenia to najprostsze zaproszenie: jeden link, jedno kliknięcie i nowy członek jest w pokoju.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować lub zakładać Origins — nie prowadzi lokalnych wydarzeń ani nie deklaruje lokalnego personelu.',
  ],
  faq: [
    {
      question: 'Ile czasu zajmuje założenie Origin?',
      answer:
        'Możesz opublikować grupę i otworzyć jej pokój w ciągu kilku tygodni, jeśli utrzymasz mały zakres: jeden cel, jeden link do dołączenia i stały strumień osobistych zaproszeń. Samo Origin potrzebuje kilku miesięcy konsekwentnego uczestnictwa w pokoju, zanim poczuje się ustalone.',
    },
    {
      question: 'Czy potrzebuję pieniędzy lub miejsca, aby zacząć?',
      answer:
        'Nie. Cyfrowy rdzeń społeczności — opublikowana grupa i jej pokój — nic nie kosztuje i nie potrzebuje miejsca. Wiele grup decyduje się później na spotkania stacjonarne; biblioteki, kawiarnie, parki i salony coworkingowe w większości miast hostują pierwsze spotkania za darmo.',
    },
    {
      question: 'Jaki jest najczęstszy błąd przy zakładaniu Origin?',
      answer:
        'Próba obsłużenia wszystkich. Społeczność z niejasnym celem przyciąga niewielu zaangażowanych członków. Określ jedną konkretną grupę docelową i jeden jasny rezultat, umieść to na stronie grupy i pozwól społeczności ewoluować od tego punktu.',
    },
    {
      question: 'Jak JoinOrigin może mi pomóc założyć Origin?',
      answer:
        'Opublikowanie grupy na JoinOrigin automatycznie tworzy jej pokój, a członkowie dołączają przez link — jeden zorganizowany cyfrowy dom dla celu, ludzi i rozmów społeczności. JoinOrigin nie prowadzi lokalnych wydarzeń, więc praktyczne kroki z tego poradnika działają na platformie i z narzędziami, które już masz.',
    },
  ],
  sections: [
    'Określ jasny cel. Zdecyduj, dla kogo jest społeczność, jaki problem rozwiązuje i jak wygląda odnoszący sukces członek. Napisz jednozdaniową misję, np. „grupa dla nowych założycieli z Warszawy, aby dzielić się lekcjami z wczesnych etapów”. JoinOrigin daje Twojemu celowi dom — publiczną stronę grupy, na której misja, grupa docelowa i obietnica są widoczne dla każdego, kto szuka grupy podobnej do Twojej. Zapisz misję i trzymaj ją przed każdym zaproszeniem.',
    'Opublikuj grupę i otwórz jej pokój. Cyfrowy rdzeń społeczności to opublikowana grupa z pokojem, w którym członkowie mogą rozmawiać. Na JoinOrigin opublikowanie grupy automatycznie tworzy jej pokój — twórca jest jego właścicielem od pierwszej sekundy i może w Element zapraszać, usuwać i przypisywać role. Na JoinOrigin nie ma kroku „utwórz czat później”: opublikuj grupę, a pokój istnieje natychmiast, z twórcą jako właścicielem pokoju. Jeśli wolisz, skonfiguruj dom grupy i jej pokój w narzędziach, których już używasz.',
    'Udostępnij swój link do dołączenia. Link do dołączenia to najprostsze zaproszenie, jakie istnieje: jeden link, jedno kliknięcie i nowy członek ląduje w pokoju. Umieść link wszędzie — na stronie grupy, w osobistych wiadomościach i w miejscach, w których już gromadzi się Twoja grupa docelowa. Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojej grupy załatwia sprawę.',
    'Zaproś osobiście pierwszych dziesięć osób. Osobiste zaproszenia konwertują znacznie lepiej niż publiczne posty. Napisz do znajomych, współpracowników i znajomych pasujących do grupy docelowej, udostępnij link do dołączenia i poproś, aby przyprowadzili jeszcze jedną osobę. JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający społeczności mogą znaleźć Twoją i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każdy zaproszony członek staje się kanałem do własnej sieci.',
    'Wybierz format i rytm (decyzja dalszego kroku). Gdy grupa się formuje, wybierz powtarzający się format — miesięczną dyskusję, tygodniową sesję roboczą, prelekcję lub wspólny spacer. Powtarzalność bije jednorazowość, bo nawyki zamieniają nieznajomych w członków. To decyzja dalszego kroku: grupa może spotykać się stacjonarnie później, ale pokój jest już domem społeczności. Na JoinOrigin organizatorzy mogą opisać swój format raz, a członkowie mogą zobaczyć, czego się spodziewać, zanim dołączą — co zmniejsza wahanie, które powstrzymuje debiutantów. Wybierz format i podaj go w każdym zaproszeniu.',
    'Przeprowadź świetne pierwsze spotkanie. Jeśli członkowie zdecydują się spotkać twarzą w twarz — przyjdź wcześnie, przywitaj każdą osobę, przeprowadź krótką rundę przedstawień i zakończ jasną datą następnego spotkania. Celem pierwszego spotkania nie jest rozmiar; chodzi o to, aby wszyscy wyszli z chęcią powrotu. JoinOrigin nie obsadza ani nie prowadzi spotkań — doświadczenie należy do Ciebie. Platforma pomaga społeczności formować się wokół niego: jeden wspólny pokój, w którym żyją data, podsumowanie i następne kroki.',
    'Zbieraj opinie i iteruj. Po pierwszych tygodniach zapytaj członków, czego chcą więcej lub mniej — w pokoju i na spotkaniach. Dostosuj format, godzinę lub miejsce na podstawie ich odpowiedzi, a nie tego, co sobie wyobraziłeś. JoinOrigin trzyma wspólną pamięć społeczności w jednym miejscu — notatki, decyzje i to, o co prosili członkowie — dzięki czemu iteracja jest widoczna zamiast zagubionej. Pytaj członków bezpośrednio w pokoju po każdym spotkaniu.',
    'Utrzymuj konsekwentny rytm i rośnij powoli. Trzymaj się tego samego dnia i formatu przez kilka miesięcy, zanim się rozszerzysz. Wzrost kumuluje się dzięki poleceniom, gdy każdy członek potrafi opisać, czym jest społeczność, w jednym zdaniu i udostępnić jej link do dołączenia. JoinOrigin pomaga Twojej społeczności pozostać znajdowalną i połączoną, gdy rośnie — jedno miejsce, w którym rytm, obietnica, pokój i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
  ],
  steps: [
    {
      title: 'Określ jasny cel',
      body: 'Zdecyduj, dla kogo jest społeczność, jaki problem rozwiązuje i jak wygląda odnoszący sukces członek. Napisz jednozdaniową misję, np. „grupa dla nowych założycieli z Warszawy, aby dzielić się lekcjami z wczesnych etapów”.',
      joinOriginNote:
        'JoinOrigin daje Twojemu celowi dom — publiczną stronę grupy, na której misja, grupa docelowa i obietnica są widoczne dla każdego, kto szuka grupy podobnej do Twojej. Zapisz misję i trzymaj ją przed każdym zaproszeniem.',
    },
    {
      title: 'Opublikuj grupę i otwórz jej pokój',
      body: 'Cyfrowy rdzeń społeczności to opublikowana grupa z pokojem, w którym członkowie mogą rozmawiać. Na JoinOrigin opublikowanie grupy automatycznie tworzy jej pokój — twórca jest jego właścicielem od pierwszej sekundy i może w Element zapraszać, usuwać i przypisywać role.',
      joinOriginNote:
        'Na JoinOrigin nie ma kroku „utwórz czat później”: opublikuj grupę, a pokój istnieje natychmiast, z twórcą jako właścicielem pokoju. Jeśli wolisz, skonfiguruj dom grupy i jej pokój w narzędziach, których już używasz.',
    },
    {
      title: 'Udostępnij swój link do dołączenia',
      body: 'Link do dołączenia to najprostsze zaproszenie, jakie istnieje: jeden link, jedno kliknięcie i nowy członek ląduje w pokoju. Umieść link wszędzie — na stronie grupy, w osobistych wiadomościach i w miejscach, w których już gromadzi się Twoja grupa docelowa.',
      joinOriginNote:
        'Dołączenie na JoinOrigin to jedna czynność — kliknięcie Dołącz na publicznej stronie lub wejście przez bezpośredni link zapraszający od członka. Jeden krótki, jasny link do Twojej grupy załatwia sprawę.',
    },
    {
      title: 'Zaproś osobiście pierwszych dziesięć osób',
      body: 'Osobiste zaproszenia konwertują znacznie lepiej niż publiczne posty. Napisz do znajomych, współpracowników i znajomych pasujących do grupy docelowej, udostępnij link do dołączenia i poproś, aby przyprowadzili jeszcze jedną osobę.',
      joinOriginNote:
        'JoinOrigin ułatwia odkrywanie — to miejsce, w którym ludzie szukający społeczności mogą znaleźć Twoją i dołączyć przez link. Osobiste zaproszenia wciąż robią najcięższą robotę, a każdy zaproszony członek staje się kanałem do własnej sieci.',
    },
    {
      title: 'Wybierz format i rytm (decyzja dalszego kroku)',
      body: 'Gdy grupa się formuje, wybierz powtarzający się format — miesięczną dyskusję, tygodniową sesję roboczą, prelekcję lub wspólny spacer. Powtarzalność bije jednorazowość, bo nawyki zamieniają nieznajomych w członków. To decyzja dalszego kroku: grupa może spotykać się stacjonarnie później, ale pokój jest już domem społeczności.',
      joinOriginNote:
        'Na JoinOrigin organizatorzy mogą opisać swój format raz, a członkowie mogą zobaczyć, czego się spodziewać, zanim dołączą — co zmniejsza wahanie, które powstrzymuje debiutantów. Wybierz format i podaj go w każdym zaproszeniu.',
    },
    {
      title: 'Przeprowadź świetne pierwsze spotkanie',
      body: 'Jeśli członkowie zdecydują się spotkać twarzą w twarz — przyjdź wcześnie, przywitaj każdą osobę, przeprowadź krótką rundę przedstawień i zakończ jasną datą następnego spotkania. Celem pierwszego spotkania nie jest rozmiar; chodzi o to, aby wszyscy wyszli z chęcią powrotu.',
      joinOriginNote:
        'JoinOrigin nie obsadza ani nie prowadzi spotkań — doświadczenie należy do Ciebie. Platforma pomaga społeczności formować się wokół niego: jeden wspólny pokój, w którym żyją data, podsumowanie i następne kroki.',
    },
    {
      title: 'Zbieraj opinie i iteruj',
      body: 'Po pierwszych tygodniach zapytaj członków, czego chcą więcej lub mniej — w pokoju i na spotkaniach. Dostosuj format, godzinę lub miejsce na podstawie ich odpowiedzi, a nie tego, co sobie wyobraziłeś.',
      joinOriginNote:
        'JoinOrigin trzyma wspólną pamięć społeczności w jednym miejscu — notatki, decyzje i to, o co prosili członkowie — dzięki czemu iteracja jest widoczna zamiast zagubionej. Pytaj członków bezpośrednio w pokoju po każdym spotkaniu.',
    },
    {
      title: 'Utrzymuj konsekwentny rytm i rośnij powoli',
      body: 'Trzymaj się tego samego dnia i formatu przez kilka miesięcy, zanim się rozszerzysz. Wzrost kumuluje się dzięki poleceniom, gdy każdy członek potrafi opisać, czym jest społeczność, w jednym zdaniu i udostępnić jej link do dołączenia.',
      joinOriginNote:
        'JoinOrigin pomaga Twojej społeczności pozostać znajdowalną i połączoną, gdy rośnie — jedno miejsce, w którym rytm, obietnica, pokój i ludzie są widoczni. Daj się odkryć i rozwijaj się.',
    },
  ],
};

export default content;
