import type { GuideContent } from '../../types';

/**
 * „Jak zorganizować spotkanie" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany ponownie: spotkania to to, co grupa robi PO uformowaniu —
 * cyfrowa ścieżka połącz→dołącz→pokój pojawia się najpierw (opublikuj grupę
 * → pokój tworzony automatycznie → członkowie dołączają przez link),
 * a stacjonarne spotkanie jest konsekwencją dalszego kroku. Wartość
 * JoinOrigin jest wpleciona w intro i każdy krok (per-krokowy
 * `joinOriginNote`), z uczciwym ujęciem — JoinOrigin nie rezerwuje miejsc
 * ani nie obsadza wydarzeń. Pojedynczy H1, struktura krok po kroku, FAQ
 * odwzorowane 1:1 w `FAQPage` JSON-LD. „Pokój" jest przypięty do pokoju
 * Matrix (§6.3) — fizyczne miejsca są opisywane jako miejsca/przestrzenie,
 * nigdy „pokoje".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'organize-a-meetup',
  title: 'Jak zorganizować spotkanie: miejsca, agenda i promocja | JoinOrigin',
  description:
    'Zorganizuj spotkanie, gdy Twoja grupa już się uformowała — niezależnie od tego, czy powstała w zeszłym miesiącu, czy spotyka się od lat — wybierz format, zarezerwuj miejsce, zbuduj agendę, wypromuj je i poprowadź wieczór. Praktyczna lista kontrolna od JoinOrigin.',
  intro: [
    'Spotkanie to powtarzające się stacjonarne wydarzenie, na którym ludzie gromadzą się wokół wspólnego zainteresowania — a na JoinOrigin to naturalny następny krok po komunikowaniu się w pokoju. Cyfrowa ścieżka pojawia się najpierw: ludzie znajdują i dołączają do grupy przez link, a pokój grupy staje się miejscem, w którym członkowie rozmawiają, planują i pozostają w kontakcie między spotkaniami. Stacjonarne spotkanie to następny krok tej uformowanej społeczności — niezależnie od tego, czy grupa powstała w zeszłym miesiącu, czy spotyka się nieformalnie od lat, pokój daje jej jeden zorganizowany dom, z którego może wyrosnąć spotkanie.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować społeczności i zakładać własne — więc spotkanie ma dom, w którym zainteresowani członkowie mogą odkryć grupę, dołączyć do jej pokoju i koordynować spotkanie zamiast polegać na liście kontaktów jednej osoby. JoinOrigin nie rezerwuje miejsc ani nie obsadza wydarzeń — całym sensem platformy jest łączenie ludzi, którzy dzielą zainteresowanie, a samo spotkanie należy do Ciebie.',
    'Ten poradnik obejmuje pełny cykl życia spotkania po powstaniu grupy — dla świeżo uformowanej grupy i dla takiej, która spotyka się od lat: wybór formatu pasującego do grupy odbiorców, znalezienie i zarezerwowanie miejsca bez przekraczania budżetu, zbudowanie agendy z jasnym początkiem i końcem, promowanie wydarzenia tam, gdzie faktycznie szuka Twoja grupa odbiorców, oraz poprowadzenie wieczoru tak, aby uczestnicy wychodzili z chęcią na następne. Każdy krok zawiera notę o tym, jak pomaga JoinOrigin — a pierwszy krok dotyczy cyfrowej grupy, bo bez grupy i jej pokoju nie ma społeczności, która mogłaby się spotkać.',
  ],
  dataPoints: [
    'Proste spotkanie potrzebuje tylko trzech rzeczy: formatu, miejsca i kanału promocji.',
    'Wieczorne spotkania w dni powszednie i poranne sesje w weekend to najczęstsze powtarzające się formaty.',
    'Większość miejsc — biblioteki, kawiarnie, przestrzenie coworkingowe — oferuje bezpłatne lub tanie przestrzenie na wydarzenia społecznościowe.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować lub zakładać społeczności; nie rezerwuje miejsc ani nie obsadza wydarzeń.',
  ],
  faq: [
    {
      question: 'Jak wcześnie powinienem promować spotkanie?',
      answer:
        'Dwa do trzech tygodni to dobra równowaga: wystarczająco wcześnie, aby ludzie mogli zaplanować, wystarczająco krótko, aby utrzymać pilność. Ogłoś je najpierw w pokoju grupy, potem udostępnij wydarzenie tam, gdzie gromadzi się Twoja grupa odbiorców. Wyślij przypomnienie dwa dni wcześniej i ponownie w dniu wydarzenia.',
    },
    {
      question: 'Co, jeśli przyjdzie tylko kilka osób?',
      answer:
        'To normalne, zwłaszcza na początku. Przeprowadź sesję dla tych, którzy są, zbierz ich opinie w pokoju i wykorzystaj kolejną edycję do poprawy promocji. Konsekwencja liczy się bardziej niż jakakolwiek pojedyncza frekwencja.',
    },
    {
      question: 'Czy spotkania potrzebują formalnej agendy?',
      answer:
        'Tak, lekkiej. Jasny początek, krótka runda przedstawień, jedna główna aktywność lub prelekcja i określony czas zakończenia sprawiają, że uczestnicy czują, że ich czas został uszanowany — a to sprowadza ich z powrotem.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc organizować spotkania?',
      answer:
        'Tak. JoinOrigin pomaga ludziom znajdować i zakładać społeczności — jeden zorganizowany cyfrowy dom, w którym pokój grupy jest miejscem koordynacji i w którym spotkanie może zostać odkryte. JoinOrigin sam nie organizuje wydarzeń, więc praktyczne kroki z tego poradnika należą do Ciebie.',
    },
  ],
  sections: [
    'Najpierw uformuj grupę i otwórz jej pokój. Spotkanie to to, co grupa robi po uformowaniu — więc zacznij od cyfrowego rdzenia: opublikuj grupę, pozwól, aby jej pokój został utworzony automatycznie, i zapraszaj członków przez link. Opublikowanie grupy na JoinOrigin automatycznie tworzy jej pokój, kontrolowaną przez twórcę przestrzeń, w której członkowie planują i pozostają w kontakcie. Jeśli wolisz, skonfiguruj grupę i jej pokój w narzędziach, których już używasz, zanim zaplanujesz jakiekolwiek wydarzenie.',
    'Wybierz format pasujący do grupy odbiorców. Zdecyduj między prelekcją, warsztatem, kręgiem dyskusyjnym, social mixerem a sesją roboczą. Dopasuj format do tego, czego chce grupa odbiorców — nauki, połączenia lub postępu we wspólnej pracy. Na JoinOrigin członkowie mogą zobaczyć format społeczności przed dołączeniem — co przyciąga właściwych ludzi i ustawia oczekiwania. Wybierz format, na który Twoja grupa odbiorców faktycznie przyjdzie.',
    'Wybierz datę i rytm. Wieczory w dni powszednie i poranki w weekendy działają najlepiej dla większości grup odbiorców. Wybierz powtarzający się termin — miesięczny jest standardem — i strzeż go jak spotkania, aby ludzie mogli zbudować nawyk. JoinOrigin czyni rytm społeczności widocznym w jednym miejscu, więc członkowie znają następną datę bez szukania. Strzeż swojego powtarzającego się terminu jak spotkania.',
    'Zarezerwuj miejsce wcześnie. Biblioteki, kawiarnie, salony coworkingowe, centra społecznościowe i parki hostują wydarzenia społecznościowe za niską lub zerową opłatą. Potwierdź na piśmie pojemność, godziny otwarcia i wszelkie wymagania rezerwacyjne. JoinOrigin nie rezerwuje miejsc ani nie koordynuje fizycznych przestrzeni — jego projektowy fokus to łączenie ludzi w cyfrowym pokoju. Potwierdź pojemność i godziny otwarcia bezpośrednio z miejscem na piśmie.',
    'Przygotuj lekką agendę. Utrzymaj prostotę: powitanie i przedstawienie, główna aktywność, otwarta dyskusja, zakończenie i następna data. Szacuj 60–90 minut łącznie i opublikuj agendę przy liście wydarzenia oraz w pokoju. JoinOrigin to system operacyjny społeczności, w którym wspólne artefakty, takie jak agendy i notatki, żyją obok społeczności. Prosta opublikowana agenda załatwia sprawę.',
    'Promuj tam, gdzie już jest Twoja grupa odbiorców. Udostępnij wydarzenie w niszowych grupach, lokalnych biuletynach, tablicach społecznościowych i odpowiednich kanałach społecznościowych — i kieruj wszystkich na link do dołączenia grupy, aby uczestnicy stawali się członkami, a nie gośćmi jednego wieczoru. JoinOrigin to miejsce, w którym ludzie szukający społeczności znajdują ją i dołączają przez link. Promuj w niszowych grupach i biuletynach, w których już gromadzi się Twoja grupa odbiorców, i udostępniaj link do dołączenia każdemu uczestnikowi.',
    'Poprowadź wieczór z jasnym rytmem. Zaczynaj o czasie, witaj spóźnionych, trzymaj główną aktywność na torze i zakończ, ogłaszając następną datę. Kończ o czasie — to najsilniejszy sygnał szacunku. JoinOrigin nie obsadza wydarzeń — doświadczenie należy do Ciebie. Platforma utrzymuje historię społeczności w jednym zorganizowanym pokoju — obietnicę, rytm i ludzi. Kończenie o czasie to najsilniejszy sygnał szacunku.',
    'Odezwij się w ciągu 24 godzin w pokoju. Podziękuj uczestnikom, udostępnij linki lub notatki i zaproś do opinii tam, gdzie cała grupa może je zobaczyć. Kontynuacja to to, co zamienia pojedyncze wydarzenie w powtarzającą się społeczność. JoinOrigin daje społeczności trwały pokój, w którym żyją podsumowanie, następna data i opinie — zamieniając pojedyncze wydarzenie w powtarzającą się społeczność. Daj się odkryć i utrzymuj rozpęd.',
  ],
  steps: [
    {
      title: 'Najpierw uformuj grupę i otwórz jej pokój',
      body: 'Spotkanie to to, co grupa robi po uformowaniu — więc zacznij od cyfrowego rdzenia: opublikuj grupę, pozwól, aby jej pokój został utworzony automatycznie, i zapraszaj członków przez link.',
      joinOriginNote:
        'Opublikowanie grupy na JoinOrigin automatycznie tworzy jej pokój, kontrolowaną przez twórcę przestrzeń, w której członkowie planują i pozostają w kontakcie. Jeśli wolisz, skonfiguruj grupę i jej pokój w narzędziach, których już używasz, zanim zaplanujesz jakiekolwiek wydarzenie.',
    },
    {
      title: 'Wybierz format pasujący do grupy odbiorców',
      body: 'Zdecyduj między prelekcją, warsztatem, kręgiem dyskusyjnym, social mixerem a sesją roboczą. Dopasuj format do tego, czego chce grupa odbiorców — nauki, połączenia lub postępu we wspólnej pracy.',
      joinOriginNote:
        'Na JoinOrigin członkowie mogą zobaczyć format społeczności przed dołączeniem — co przyciąga właściwych ludzi i ustawia oczekiwania. Wybierz format, na który Twoja grupa odbiorców faktycznie przyjdzie.',
    },
    {
      title: 'Wybierz datę i rytm',
      body: 'Wieczory w dni powszednie i poranki w weekendy działają najlepiej dla większości grup odbiorców. Wybierz powtarzający się termin — miesięczny jest standardem — i strzeż go jak spotkania, aby ludzie mogli zbudować nawyk.',
      joinOriginNote:
        'JoinOrigin czyni rytm społeczności widocznym w jednym miejscu, więc członkowie znają następną datę bez szukania. Strzeż swojego powtarzającego się terminu jak spotkania.',
    },
    {
      title: 'Zarezerwuj miejsce wcześnie',
      body: 'Biblioteki, kawiarnie, salony coworkingowe, centra społecznościowe i parki hostują wydarzenia społecznościowe za niską lub zerową opłatą. Potwierdź na piśmie pojemność, godziny otwarcia i wszelkie wymagania rezerwacyjne.',
      joinOriginNote:
        'JoinOrigin nie rezerwuje miejsc ani nie koordynuje fizycznych przestrzeni — jego projektowy fokus to łączenie ludzi w cyfrowym pokoju. Potwierdź pojemność i godziny otwarcia bezpośrednio z miejscem na piśmie.',
    },
    {
      title: 'Przygotuj lekką agendę',
      body: 'Utrzymaj prostotę: powitanie i przedstawienie, główna aktywność, otwarta dyskusja, zakończenie i następna data. Szacuj 60–90 minut łącznie i opublikuj agendę przy liście wydarzenia oraz w pokoju.',
      joinOriginNote:
        'JoinOrigin to system operacyjny społeczności, w którym wspólne artefakty, takie jak agendy i notatki, żyją obok społeczności. Prosta opublikowana agenda załatwia sprawę.',
    },
    {
      title: 'Promuj tam, gdzie już jest Twoja grupa odbiorców',
      body: 'Udostępnij wydarzenie w niszowych grupach, lokalnych biuletynach, tablicach społecznościowych i odpowiednich kanałach społecznościowych — i kieruj wszystkich na link do dołączenia grupy, aby uczestnicy stawali się członkami, a nie gośćmi jednego wieczoru.',
      joinOriginNote:
        'JoinOrigin to miejsce, w którym ludzie szukający społeczności znajdują ją i dołączają przez link. Promuj w niszowych grupach i biuletynach, w których już gromadzi się Twoja grupa odbiorców, i udostępniaj link do dołączenia każdemu uczestnikowi.',
    },
    {
      title: 'Poprowadź wieczór z jasnym rytmem',
      body: 'Zaczynaj o czasie, witaj spóźnionych, trzymaj główną aktywność na torze i zakończ, ogłaszając następną datę. Kończ o czasie — to najsilniejszy sygnał szacunku.',
      joinOriginNote:
        'JoinOrigin nie obsadza wydarzeń — doświadczenie należy do Ciebie. Platforma utrzymuje historię społeczności w jednym zorganizowanym pokoju — obietnicę, rytm i ludzi. Kończenie o czasie to najsilniejszy sygnał szacunku.',
    },
    {
      title: 'Odezwij się w ciągu 24 godzin w pokoju',
      body: 'Podziękuj uczestnikom, udostępnij linki lub notatki i zaproś do opinii tam, gdzie cała grupa może je zobaczyć. Kontynuacja to to, co zamienia pojedyncze wydarzenie w powtarzającą się społeczność.',
      joinOriginNote:
        'JoinOrigin daje społeczności trwały pokój, w którym żyją podsumowanie, następna data i opinie — zamieniając pojedyncze wydarzenie w powtarzającą się społeczność. Daj się odkryć i utrzymuj rozpęd.',
    },
  ],
};

export default content;
