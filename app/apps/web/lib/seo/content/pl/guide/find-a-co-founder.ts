import type { GuideContent } from '../../types';

/**
 * „Jak znaleźć współzałożyciela" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany na cyfrowym modelu połącz→dołącz→pokój: publikowana jest
 * strona pomysłu, jej pokój jest tworzony automatycznie, a rozmowy o
 * współzałożycielstwie odbywają się w tym pokoju — cyfrowym miejscu,
 * w którym kandydaci mogą znaleźć pomysł, zadawać pytania i współpracować.
 * Wartość JoinOrigin jest wpleciona w intro i każdy krok (per-krokowy
 * `joinOriginNote`), z uczciwym ujęciem — JoinOrigin nie jest usługą
 * kojarzenia par i nie dopasowuje założycieli. Pojedynczy H1, struktura
 * krok po kroku, FAQ odwzorowane 1:1 w `FAQPage` JSON-LD. „Pokój" jest
 * przypięty do pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'find-a-co-founder',
  title: 'Jak znaleźć współzałożyciela: gdzie szukać i o co pytać | JoinOrigin',
  description:
    'Znajdź współzałożyciela, który uzupełnia Twoje umiejętności — niezależnie od tego, czy rozpoczynasz, czy rozwijasz istniejące przedsięwzięcie, opublikuj stronę pomysłu, poznawaj ludzi w społecznościach i ich pokojach, poprowadź projekt próbny i zadaj pytania, które zapobiegają rozstaniom. Od JoinOrigin.',
  intro: [
    'Znalezienie współzałożyciela to decyzja relacyjna przebrana za decyzję rekrutacyjną, a u jej podstaw leży kolejny problem łączenia ludzi: właściwa osoba jest często o jedno ciepłe polecenie, gdzieś w społeczności, której jeszcze nie odkryłeś. To jest problem, z którym pomaga JoinOrigin — i jest to ten sam problem, niezależnie od tego, czy wciąż jesteś na etapie pomysłu, czy prowadzisz istniejącą firmę, która potrzebuje partnera do zrobienia następnego kroku.',
    'JoinOrigin to system operacyjny społeczności zbudowany wokół cyfrowej pętli połącz→dołącz→pokój: publikujesz pomysł, jego pokój jest tworzony automatycznie, a ludzie, którzy dzielą pomysł, mogą dołączyć i rozmawiać w tym pokoju. Strona pomysłu to publiczna obietnica, a pokój to miejsce, w którym faktycznie odbywają się rozmowy o współzałożycielstwie — kontrolowany przez twórcę pokój Matrix, w którym zainteresowani mogą zadawać pytania, dzielić się notatkami i testować dopasowanie, zanim ktokolwiek się zaangażuje. JoinOrigin nie jest usługą kojarzenia par, nie dopasowuje założycieli i nie ma lokalnych biur. Wartość platformy — łączenie ludzi wokół wspólnych zainteresowań — odwzorowuje bezpośrednio sposób, w jaki większość założycieli faktycznie znajduje swojego współzałożyciela: przez społeczności, pokoje i ciepłe polecenia.',
    'Ten poradnik podchodzi do poszukiwań tak, jak podszedłbyś do budowania społeczności: zacznij od istniejącej sieci, opublikuj pomysł, który ludzie mogą znaleźć, rozszerzaj świadomie przez społeczności i ich pokoje, oceniaj kandydatów ustrukturyzowanymi rozmowami i projektem próbnym oraz uzgodnij fundamenty, zanim cokolwiek zobowiążesz prawnie. Kroki są praktyczne i uczciwe, a każdy pokazuje, gdzie pomaga JoinOrigin.',
  ],
  dataPoints: [
    'Ciepłe polecenia i wspólna praca tworzą najbardziej trwałe relacje współzałożycielskie.',
    'Opublikowana strona pomysłu z pokojem daje zainteresowanym ludziom prawdziwe miejsce, aby znaleźć pomysł i rozpocząć rozmowę.',
    'Krótki projekt próbny — prototyp, strona docelowa lub płatny pilotaż — szybciej testuje style pracy niż wywiady.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować społeczności i współpracowników; nie jest usługą kojarzenia par i nie ma lokalnych biur.',
  ],
  faq: [
    {
      question: 'Gdzie większość ludzi znajduje swojego współzałożyciela?',
      answer:
        'Większość założycieli poznaje się przez ciepłe sieci — wydarzenia, społeczności, pokoje i polecenia od zaufanych osób. Opublikowanie pomysłu, który ludzie mogą znaleźć, a następnie konsekwentne pojawianie się w tych samych społecznościach i ich pokojach to najbardziej niezawodny sposób na poznanie potencjalnych współzałożycieli.',
    },
    {
      question: 'Skąd wiem, że ktoś jest dobrym dopasowaniem na współzałożyciela?',
      answer:
        'Przeprowadźcie razem mały projekt próbny i zwróć uwagę na trzy rzeczy: uzupełniające się umiejętności, podobną tolerancję ryzyka i uczciwą komunikację pod presją terminów. Projekt próbny ujawnia wszystkie trzy szybciej niż jakakolwiek rozmowa.',
    },
    {
      question: 'Na czym powinniśmy się porozumieć przed rozpoczęciem?',
      answer:
        'Porozmawiajcie o rolach, zaangażowaniu czasowym, podziale udziałów, nabywaniu udziałów, podejmowaniu decyzji i o tym, co się dzieje, gdy ktoś chce odejść. Wystawienie tych spraw na stół wcześnie zapobiega nieporozumieniom, które niszczą większość wczesnych zespołów.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc znaleźć współzałożyciela?',
      answer:
        'JoinOrigin pomaga ludziom znajdować społeczności i współpracowników — w tym rodzaje społeczności, w których spotykają się założyciele — dzięki stronie pomysłu i pokojowi, w którym mogą toczyć się rozmowy. JoinOrigin nie dopasowuje założycieli, więc kroki dotyczące networkingu i projektu próbnego z tego poradnika to Twoja najbardziej niezawodna ścieżka.',
    },
  ],
  sections: [
    'Najpierw zmapuj luki w umiejętnościach. Zapisz, w czym jesteś naprawdę dobry i czego przedsięwzięcie potrzebuje, a w czym nie jesteś. Współzałożyciel powinien zamykać Twoją największą lukę — techniczną, komercyjną lub operacyjną — a nie powielać Twoje mocne strony. JoinOrigin jest zbudowany wokół profili, pomysłów i społeczności, a nie dopasowywania — więc uczciwa rada jest taka sama jak zawsze: wiedz, jaką lukę musisz zamknąć, zanim zaczniesz szukać. Zapisz swoje mocne strony i potrzeby przedsięwzięcia.',
    'Opublikuj swój pomysł i otwórz jego pokój. Pomysł, którego nikt nie może znaleźć, nie przyciąga współzałożyciela. Opublikuj jasną stronę pomysłu — co budujesz, dlaczego i jakiego rodzaju osobę potrzebujesz — i pozwól, aby jej pokój został utworzony automatycznie, aby zainteresowani mieli miejsce do rozmowy. Opublikowanie pomysłu na JoinOrigin automatycznie tworzy jego pokój, miejsce, w którym odbywają się rozmowy o współzałożycielstwie. Opublikuj swój pomysł publicznie i otwórz pokój do dyskusji wokół niego.',
    'Wykorzystaj istniejącą sieć do ciepłych poleceń. Powiedz pięciu zaufanym osobom, co budujesz i jakiego rodzaju współzałożyciela potrzebujesz. Poproś każdą z nich o jedno nazwisko. Ciepłe polecenia biją zimny outreach w prawie każdym przypadku. JoinOrigin czyni społeczności znajdowalnymi, co z czasem rozszerza Twoją ciepłą sieć — a każde polecenie może prowadzić do pokoju, w którym odbywa się prawdziwa rozmowa. Powiedz pięciu zaufanym osobom dokładnie, jakiego rodzaju współzałożyciela potrzebujesz.',
    'Pojawiaj się konsekwentnie w istotnych społecznościach i ich pokojach. Uczestnicz w wydarzeniach i dołączaj do grup, w których gromadzą się właściwi ludzie: spotkania założycieli, społeczności branżowe, przestrzenie coworkingowe i pokoje online. Powtarzalność buduje zaufanie, które prowadzi do poleceń. JoinOrigin pomaga ludziom znajdować społeczności pasujące do ich celów — rodzaj miejsca, w którym spotykają się założyciele — i dołączać do ich pokoi. Wybierz spotkania i pokoje, w których już gromadzą się właściwi ludzie, i ciągle się tam pojawiaj.',
    'Prowadź ustrukturyzowane pierwsze rozmowy. Pytaj o umiejętności, tolerancję ryzyka, zaangażowanie czasowe i o to, dlaczego chcą coś zaczynać lub rozwijać. Podziel się własnymi odpowiedziami. To wzajemny wywiad, nie pitch. JoinOrigin nie dopasowuje założycieli ani nie prowadzi rozmów — wzajemny wywiad należy do Ciebie. Platforma stawia Cię w tych samych społecznościach i pokojach co potencjalnych współpracowników — reszta zależy od Ciebie.',
    'Przeprowadźcie razem projekt próbny. Wybierzcie coś małego i prawdziwego — prototyp, stronę docelową lub płatny pilotaż — i pracujcie nad tym przez cztery do sześciu tygodni. Obserwuj, jak dzielicie pracę, przyjmujecie opinie i zachowujecie się pod presją. JoinOrigin daje społecznościom wspólny pokój dla ich pracy i projektów — co jest naturalnym miejscem, w którym może wyłonić się projekt próbny. Mały prawdziwy prototyp to najbardziej niezawodny test.',
    'Podejmij decyzję na podstawie próby, nie potencjału. Zapytaj, czy powierzyłbyś tej osobie swoją reputację, czy komunikuje się uczciwie i czy wspólna praca Cię energetyzuje. Jeśli próba wydawała się napięta, zaufaj temu sygnałowi. JoinOrigin nie podejmuje decyzji za Ciebie. Jego uczciwa wartość to kontekst społeczności i pokoju, który pozwala Ci poznawać i pracować z kandydatami — to próba wciąż mówi Ci prawdę.',
    'Uzgodnij fundamenty przed zobowiązaniem. Zapisz role, zaangażowanie czasowe, podział udziałów, nabywanie udziałów i zasady podejmowania decyzji. Nawet prosta jednostronicowa umowa zapobiega większości wczesnych nieporozumień. JoinOrigin to system operacyjny społeczności — jedno zorganizowane miejsce, w którym umowy, role i notatki projektu mogą żyć obok pokoju pomysłu. Nawet jednostronicowa pisemna umowa zapobiega większości wczesnych nieporozumień.',
  ],
  steps: [
    {
      title: 'Najpierw zmapuj luki w umiejętnościach',
      body: 'Zapisz, w czym jesteś naprawdę dobry i czego przedsięwzięcie potrzebuje, a w czym nie jesteś. Współzałożyciel powinien zamykać Twoją największą lukę — techniczną, komercyjną lub operacyjną — a nie powielać Twoje mocne strony.',
      joinOriginNote:
        'JoinOrigin jest zbudowany wokół profili, pomysłów i społeczności, a nie dopasowywania — więc uczciwa rada jest taka sama jak zawsze: wiedz, jaką lukę musisz zamknąć, zanim zaczniesz szukać. Zapisz swoje mocne strony i potrzeby przedsięwzięcia.',
    },
    {
      title: 'Opublikuj swój pomysł i otwórz jego pokój',
      body: 'Pomysł, którego nikt nie może znaleźć, nie przyciąga współzałożyciela. Opublikuj jasną stronę pomysłu — co budujesz, dlaczego i jakiego rodzaju osobę potrzebujesz — i pozwól, aby jej pokój został utworzony automatycznie, aby zainteresowani mieli miejsce do rozmowy.',
      joinOriginNote:
        'Opublikowanie pomysłu na JoinOrigin automatycznie tworzy jego pokój, miejsce, w którym odbywają się rozmowy o współzałożycielstwie. Opublikuj swój pomysł publicznie i otwórz pokój do dyskusji wokół niego.',
    },
    {
      title: 'Wykorzystaj istniejącą sieć do ciepłych poleceń',
      body: 'Powiedz pięciu zaufanym osobom, co budujesz i jakiego rodzaju współzałożyciela potrzebujesz. Poproś każdą z nich o jedno nazwisko. Ciepłe polecenia biją zimny outreach w prawie każdym przypadku.',
      joinOriginNote:
        'JoinOrigin czyni społeczności znajdowalnymi, co z czasem rozszerza Twoją ciepłą sieć — a każde polecenie może prowadzić do pokoju, w którym odbywa się prawdziwa rozmowa. Powiedz pięciu zaufanym osobom dokładnie, jakiego rodzaju współzałożyciela potrzebujesz.',
    },
    {
      title: 'Pojawiaj się konsekwentnie w istotnych społecznościach i ich pokojach',
      body: 'Uczestnicz w wydarzeniach i dołączaj do grup, w których gromadzą się właściwi ludzie: spotkania założycieli, społeczności branżowe, przestrzenie coworkingowe i pokoje online. Powtarzalność buduje zaufanie, które prowadzi do poleceń.',
      joinOriginNote:
        'JoinOrigin pomaga ludziom znajdować społeczności pasujące do ich celów — rodzaj miejsca, w którym spotykają się założyciele — i dołączać do ich pokoi. Wybierz spotkania i pokoje, w których już gromadzą się właściwi ludzie, i ciągle się tam pojawiaj.',
    },
    {
      title: 'Prowadź ustrukturyzowane pierwsze rozmowy',
      body: 'Pytaj o umiejętności, tolerancję ryzyka, zaangażowanie czasowe i o to, dlaczego chcą coś zaczynać lub rozwijać. Podziel się własnymi odpowiedziami. To wzajemny wywiad, nie pitch.',
      joinOriginNote:
        'JoinOrigin nie dopasowuje założycieli ani nie prowadzi rozmów — wzajemny wywiad należy do Ciebie. Platforma stawia Cię w tych samych społecznościach i pokojach co potencjalnych współpracowników — reszta zależy od Ciebie.',
    },
    {
      title: 'Przeprowadźcie razem projekt próbny',
      body: 'Wybierzcie coś małego i prawdziwego — prototyp, stronę docelową lub płatny pilotaż — i pracujcie nad tym przez cztery do sześciu tygodni. Obserwuj, jak dzielicie pracę, przyjmujecie opinie i zachowujecie się pod presją.',
      joinOriginNote:
        'JoinOrigin daje społecznościom wspólny pokój dla ich pracy i projektów — co jest naturalnym miejscem, w którym może wyłonić się projekt próbny. Mały prawdziwy prototyp to najbardziej niezawodny test.',
    },
    {
      title: 'Podejmij decyzję na podstawie próby, nie potencjału',
      body: 'Zapytaj, czy powierzyłbyś tej osobie swoją reputację, czy komunikuje się uczciwie i czy wspólna praca Cię energetyzuje. Jeśli próba wydawała się napięta, zaufaj temu sygnałowi.',
      joinOriginNote:
        'JoinOrigin nie podejmuje decyzji za Ciebie. Jego uczciwa wartość to kontekst społeczności i pokoju, który pozwala Ci poznawać i pracować z kandydatami — to próba wciąż mówi Ci prawdę.',
    },
    {
      title: 'Uzgodnij fundamenty przed zobowiązaniem',
      body: 'Zapisz role, zaangażowanie czasowe, podział udziałów, nabywanie udziałów i zasady podejmowania decyzji. Nawet prosta jednostronicowa umowa zapobiega większości wczesnych nieporozumień.',
      joinOriginNote:
        'JoinOrigin to system operacyjny społeczności — jedno zorganizowane miejsce, w którym umowy, role i notatki projektu mogą żyć obok pokoju pomysłu. Nawet jednostronicowa pisemna umowa zapobiega większości wczesnych nieporozumień.',
    },
  ],
};

export default content;
