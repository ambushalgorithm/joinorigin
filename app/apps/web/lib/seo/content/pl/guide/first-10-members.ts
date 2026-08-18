import type { GuideContent } from '../../types';

/**
 * „Jak zdobyć pierwszych 10 członków" — ponadczasowy poradnik L1
 * (design §6.1, TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany na cyfrowym modelu połącz→dołącz→pokój: pokój jest
 * powierzchnią dołączania — członkowie wchodzą przez linki zapraszające
 * i dołączają do pokoju grupy, w którym faktycznie żyje społeczność.
 * Wartość JoinOrigin jest wpleciona w intro i każdy krok (per-krokowy
 * `joinOriginNote`), z uczciwym ujęciem — JoinOrigin nie rekrutuje
 * członków ani nie prowadzi wydarzeń. Pojedynczy H1, struktura krok po
 * kroku, FAQ odwzorowane 1:1 w `FAQPage` JSON-LD. „Pokój" jest przypięty
 * do pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'first-10-members',
  title: 'Jak zdobyć pierwszych 10 członków dla nowej lub rosnącej społeczności | JoinOrigin',
  description:
    'Zdobywaj pierwszych 10 członków bez dużego budżetu — niezależnie od tego, czy rozpoczynasz nową społeczność, czy ożywiasz istniejącą, zacznij od osobistej sieci, udostępniaj linki zapraszające i spraw, aby pokój był miejscem, do którego ludzie chcą dołączyć. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Pierwszych dziesięciu członków jest najtrudniej zdobyć i są najważniejsi, bo definiują kulturę społeczności, zanim ma ona jakąkolwiek reputację przyciągającą nieznajomych — i są równie cenni, gdy istniejąca społeczność utknęła lub się restartuje, bo zaangażowany rdzeń to to, co zamienia cichą grupę w żywą. Ten problem pierwszych dziesięciu to fundamentalnie problem łączenia ludzi i to rdzeń problemu, który rozwiązuje JoinOrigin.',
    'JoinOrigin to system operacyjny społeczności zbudowany wokół cyfrowej pętli połącz→dołącz→pokój: publikujesz grupę, jej pokój jest tworzony automatycznie, a członkowie dołączają przez link. Pokój jest powierzchnią dołączania — każda osoba, która kliknie Dołącz lub wejdzie przez link zapraszający, ląduje w pokoju grupy, jedynym miejscu, w którym żyje społeczność i w którym nowi członkowie od razu czują się połączeni. JoinOrigin nie rekrutuje członków ani nie prowadzi wydarzeń — ta część należy do Ciebie. Platforma dramatycznie ułatwia odkrywanie i dołączanie; wczesny wzrost wciąż pochodzi z osobistego zasięgu: ludzi, których bezpośrednio zapraszasz linkiem, tych, których oni przyprowadzają, i tych, którzy zostają, bo pokój wydaje się żywy.',
    'Ten poradnik rozbija problem pierwszych dziesięciu członków na konkretne kroki — niezależnie od tego, czy zaczynasz nową społeczność, czy ożywiasz istniejącą: rozpoczęcie od ludzi, których już znasz, opublikowanie grupy, aby miała pokój do dołączenia, osobiste zapraszanie linkami, przeprowadzenie pierwszego spotkania, które zamienia uczestników w promotorów, i zbudowanie prostego nawyku poleceń, aby każdy członek przyprowadzał następnego — a każdy krok pokazuje, gdzie pomaga JoinOrigin.',
  ],
  dataPoints: [
    'Osobiste zaproszenia konwertują znacznie skuteczniej niż publiczne posty czy płatne reklamy.',
    'Link zapraszający usuwa każdą barierę: jedno kliknięcie i nowy członek jest w pokoju.',
    'Dziesięciu aktywnych członków to wystarczający dowód społeczny, aby większość ludzi poczuła, że grupa jest prawdziwa i warta dołączenia.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować lub zakładać społeczności — nie rekrutuje członków ani nie prowadzi wydarzeń.',
  ],
  faq: [
    {
      question: 'Dlaczego akurat dziesięciu członków?',
      answer:
        'Dziesięć to punkt przełomowy: z dziesięcioma stałymi bywalcami masz ożywiony pokój, niezawodny rdzeń do dyskusji i wystarczający dowód społeczny, aby przyciągnąć nowych, którzy inaczej by się wahali. Poniżej dziesięciu pokój wydaje się kruchy.',
    },
    {
      question: 'Ile czasu zajmuje zdobycie pierwszych dziesięciu członków?',
      answer:
        'Przy konsekwentnych osobistych zaproszeniach i dobrym pierwszym spotkaniu większość organizatorów osiąga dziesięciu zaangażowanych członków w ciągu trzech do sześciu tygodni. Kluczem jest zapraszanie co tydzień — udostępniaj linki, dopytuj i utrzymuj pokój aktywny — a nie czekanie na wielki start.',
    },
    {
      question: 'Co, jeśli nie mam dużej osobistej sieci?',
      answer:
        'Zacznij mniejszymi krokami: zaproś pięcioro znajomych, poproś każdego o przyprowadzenie jednej osoby i opublikuj w dwóch niszowych grupach, w których już gromadzi się Twoja grupa docelowa. Każdy utrzymany członek staje się kanałem do własnej sieci — a każde zaproszenie może być prostym linkiem do pokoju.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc znaleźć członków?',
      answer:
        'Tak. JoinOrigin pomaga ludziom odkrywać i zakładać społeczności — to miejsce, w którym ludzie szukający grupy mogą znaleźć Twoją i dołączyć do jej pokoju przez link. Kroki z tego poradnika — osobiste zaproszenia i świetne pierwsze spotkanie — to najbardziej niezawodne sposoby na znalezienie pierwszych członków.',
    },
  ],
  sections: [
    'Wypisz pięćdziesiąt osób, które już znasz. Zapisz każdego, kto pasuje do celu społeczności: znajomych, współpracowników, kolegów z klasy, byłych współpracowników, sąsiadów i znajomych online. Potrzebujesz około pięć razy więcej nazwisk niż dziesięciu, których chcesz. JoinOrigin daje Twojej społeczności widoczny dom i pokój, który ludzie mogą znaleźć — ale pierwsze nazwiska wciąż pochodzą od ludzi, których znasz. Wypisz pięćdziesiąt i traktuj każde z nich jak osobiste przedstawienie.',
    'Opublikuj grupę i otwórz jej pokój. Społeczność, na którą nie można wskazać, jeszcze nie istnieje — a taka, której dom jest rozproszony po czatach i listach, jest niemal tak samo trudna do rozwoju. Opublikuj grupę z jasną misją i pozwól, aby jej pokój został utworzony automatycznie, aby było prawdziwe miejsce, w którym członkowie mogą wylądować. Opublikowanie grupy na JoinOrigin automatycznie tworzy jej pokój — pokój jest powierzchnią dołączania, a twórca jest jego właścicielem od początku. Jeśli wolisz, skonfiguruj grupę i jej pokój w narzędziach, których już używasz, zanim kogokolwiek zaprosisz.',
    'Zaproś osobiście z konkretną prośbą i linkiem. Wyślij krótką wiadomość wymieniającą społeczność, pierwszą datę lub pierwszą rozmowę oraz powód, dla którego myślisz, że ktoś to polubi — i dołącz link do dołączenia. Osobiste wiadomości biją ogólne posty, a konkretna data bije mglistą obietnicę. JoinOrigin usuwa tarcie dołączania, gdy ludzie Cię znajdą — jeden link, jedno kliknięcie, do pokoju. Krótka osobista wiadomość z konkretną datą i linkiem konwertuje lepiej niż jakikolwiek publiczny post.',
    'Poproś każdego zaproszonego o przyprowadzenie jednej osoby. Uczyń to normalną częścią prośby: „Przyprowadź znajomego, któremu może się to spodobać”. Zaproszenia przez polecenia to sposób, w jaki małe sieci kumulują się w prawdziwe społeczności. JoinOrigin daje członkom jeden udostępnialny dom społeczności — więc rozmowy o poleceniach wskazują na prawdziwy link i prawdziwy pokój. Uczyń „przyprowadź znajomego” częścią prośby i daj im link do udostępnienia.',
    'Przeprowadź jedno naprawdę dobre pierwsze spotkanie. Włóż energię w doświadczenie, nie w liczbę uczestników: ciepłe powitanie, jasny format i określony czas zakończenia. Ludzie, którzy polubią pierwsze spotkanie, przyprowadzą następnych dziesięciu. JoinOrigin nie prowadzi wydarzeń — doświadczenie należy do Ciebie. Platforma pomaga społeczności formować się wokół niego: jeden pokój, do którego członkowie mogą później odsyłać i utrzymywać połączenie.',
    'Zaproś każdego uczestnika do pokoju. Na koniec spotkania udostępnij link do dołączenia i dodaj każdego, kto chce zostać. Pokój to miejsce, w którym społeczność żyje między spotkaniami — członek, który dołączył do pokoju, to członek, który prawdopodobnie wróci. JoinOrigin utrzymuje członkostwo i komunikację społeczności w jednym zorganizowanym pokoju zamiast na liście zapisów. Prosty link do pokoju umożliwia kontynuację.',
    'Odezwij się w ciągu 24 godzin z datą następnego spotkania. Podziękuj każdemu uczestnikowi, udostępnij akapit podsumowania i potwierdź następne spotkanie — w pokoju, gdzie wszyscy mogą to zobaczyć. To w kontynuacji jednorazowy uczestnik staje się członkiem. Na JoinOrigin kontynuacja ma naturalny dom — jedno miejsce, w którym żyją podsumowanie i następna data. Osobiste podziękowanie w ciągu 24 godzin to to, co zamienia uczestnika w członka.',
    'Spraw, aby zapraszanie innych było banalnie proste. Daj członkom jedno zdanie, które mogą powtórzyć, i jeden link, który mogą udostępnić: „To comiesięczne spotkanie dla nowych założycieli, aby dzielić się lekcjami — dołącz tutaj”. Jasny, krótki opis to najskuteczniejsze narzędzie rekrutacji. JoinOrigin pozwala opisać, znaleźć i dołączyć społeczność w jednym miejscu — członkowie mogą odsyłać ludzi do pokoju zamiast go wyjaśniać. Daj członkom jedno zdanie i jeden link, które mogą powtórzyć.',
  ],
  steps: [
    {
      title: 'Wypisz pięćdziesiąt osób, które już znasz',
      body: 'Zapisz każdego, kto pasuje do celu społeczności: znajomych, współpracowników, kolegów z klasy, byłych współpracowników, sąsiadów i znajomych online. Potrzebujesz około pięć razy więcej nazwisk niż dziesięciu, których chcesz.',
      joinOriginNote:
        'JoinOrigin daje Twojej społeczności widoczny dom i pokój, który ludzie mogą znaleźć — ale pierwsze nazwiska wciąż pochodzą od ludzi, których znasz. Wypisz pięćdziesiąt i traktuj każde z nich jak osobiste przedstawienie.',
    },
    {
      title: 'Opublikuj grupę i otwórz jej pokój',
      body: 'Społeczność, na którą nie można wskazać, jeszcze nie istnieje — a taka, której dom jest rozproszony po czatach i listach, jest niemal tak samo trudna do rozwoju. Opublikuj grupę z jasną misją i pozwól, aby jej pokój został utworzony automatycznie, aby było prawdziwe miejsce, w którym członkowie mogą wylądować.',
      joinOriginNote:
        'Opublikowanie grupy na JoinOrigin automatycznie tworzy jej pokój — pokój jest powierzchnią dołączania, a twórca jest jego właścicielem od początku. Jeśli wolisz, skonfiguruj grupę i jej pokój w narzędziach, których już używasz, zanim kogokolwiek zaprosisz.',
    },
    {
      title: 'Zaproś osobiście z konkretną prośbą i linkiem',
      body: 'Wyślij krótką wiadomość wymieniającą społeczność, pierwszą datę lub pierwszą rozmowę oraz powód, dla którego myślisz, że ktoś to polubi — i dołącz link do dołączenia. Osobiste wiadomości biją ogólne posty, a konkretna data bije mglistą obietnicę.',
      joinOriginNote:
        'JoinOrigin usuwa tarcie dołączania, gdy ludzie Cię znajdą — jeden link, jedno kliknięcie, do pokoju. Krótka osobista wiadomość z konkretną datą i linkiem konwertuje lepiej niż jakikolwiek publiczny post.',
    },
    {
      title: 'Poproś każdego zaproszonego o przyprowadzenie jednej osoby',
      body: 'Uczyń to normalną częścią prośby: „Przyprowadź znajomego, któremu może się to spodobać”. Zaproszenia przez polecenia to sposób, w jaki małe sieci kumulują się w prawdziwe społeczności.',
      joinOriginNote:
        'JoinOrigin daje członkom jeden udostępnialny dom społeczności — więc rozmowy o poleceniach wskazują na prawdziwy link i prawdziwy pokój. Uczyń „przyprowadź znajomego” częścią prośby i daj im link do udostępnienia.',
    },
    {
      title: 'Przeprowadź jedno naprawdę dobre pierwsze spotkanie',
      body: 'Włóż energię w doświadczenie, nie w liczbę uczestników: ciepłe powitanie, jasny format i określony czas zakończenia. Ludzie, którzy polubią pierwsze spotkanie, przyprowadzą następnych dziesięciu.',
      joinOriginNote:
        'JoinOrigin nie prowadzi wydarzeń — doświadczenie należy do Ciebie. Platforma pomaga społeczności formować się wokół niego: jeden pokój, do którego członkowie mogą później odsyłać i utrzymywać połączenie.',
    },
    {
      title: 'Zaproś każdego uczestnika do pokoju',
      body: 'Na koniec spotkania udostępnij link do dołączenia i dodaj każdego, kto chce zostać. Pokój to miejsce, w którym społeczność żyje między spotkaniami — członek, który dołączył do pokoju, to członek, który prawdopodobnie wróci.',
      joinOriginNote:
        'JoinOrigin utrzymuje członkostwo i komunikację społeczności w jednym zorganizowanym pokoju zamiast na liście zapisów. Prosty link do pokoju umożliwia kontynuację.',
    },
    {
      title: 'Odezwij się w ciągu 24 godzin z datą następnego spotkania',
      body: 'Podziękuj każdemu uczestnikowi, udostępnij akapit podsumowania i potwierdź następne spotkanie — w pokoju, gdzie wszyscy mogą to zobaczyć. To w kontynuacji jednorazowy uczestnik staje się członkiem.',
      joinOriginNote:
        'Na JoinOrigin kontynuacja ma naturalny dom — jedno miejsce, w którym żyją podsumowanie i następna data. Osobiste podziękowanie w ciągu 24 godzin to to, co zamienia uczestnika w członka.',
    },
    {
      title: 'Spraw, aby zapraszanie innych było banalnie proste',
      body: 'Daj członkom jedno zdanie, które mogą powtórzyć, i jeden link, który mogą udostępnić: „To comiesięczne spotkanie dla nowych założycieli, aby dzielić się lekcjami — dołącz tutaj”. Jasny, krótki opis to najskuteczniejsze narzędzie rekrutacji.',
      joinOriginNote:
        'JoinOrigin pozwala opisać, znaleźć i dołączyć społeczność w jednym miejscu — członkowie mogą odsyłać ludzi do pokoju zamiast go wyjaśniać. Daj członkom jedno zdanie i jeden link, które mogą powtórzyć.',
    },
  ],
};

export default content;
