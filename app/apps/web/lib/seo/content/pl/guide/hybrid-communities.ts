import type { GuideContent } from '../../types';

/**
 * „Społeczności hybrydowe" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany na cyfrowym modelu połącz→dołącz→pokój: pokój łączy
 * online\'owe i (dalsze) stacjonarne części społeczności hybrydowej — jedna
 * społeczność, jeden pokój, dwa punkty wejścia. Wartość JoinOrigin jest
 * wpleciona w intro i każdy krok (per-krokowy `joinOriginNote`), z uczciwym
 * ujęciem — JoinOrigin nie dostarcza narzędzi wydarzeń ani nie obsadza
 * wydarzeń hybrydowych. Pojedynczy H1, struktura krok po kroku, FAQ
 * odwzorowane 1:1 w `FAQPage` JSON-LD. „Pokój" jest przypięty do pokoju
 * Matrix (§6.3) — fizyczne miejsca są opisywane jako miejsca/przestrzenie,
 * nigdy „pokoje".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'hybrid-communities',
  title: 'Społeczności hybrydowe: jak prowadzić stacjonarnie + online razem | JoinOrigin',
  description:
    "Prowadź społeczność hybrydową, w której pokój łączy członków stacjonarnych i online'owych — niezależnie od tego, czy zaczynasz od zera, czy czynisz istniejącą społeczność hybrydową, wybierz właściwe narzędzia, zaprojektuj równy udział i utrzymuj zaangażowanie obu grup odbiorców. Od JoinOrigin.",
  intro: [
    "Społeczność hybrydowa gromadzi ludzi w dwóch miejscach naraz — fizycznie w miejscu i wirtualnie przez ekran — a prawdziwe wyzwanie znów dotyczy ludzi: upewnienia się, że obie grupy odbiorców czują, że należą do jednej połączonej społeczności, a nie do dwóch oddzielnych. JoinOrigin jest zbudowany właśnie wokół tego celu łączenia ludzi, a model działa tak samo dla społeczności, która już istnieje, jak dla dopiero powstającej — ustalona grupa stacjonarna może dodać online'ową połowę, a online'owa społeczność może zacząć spotykać się lokalnie.",
    "JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować, dołączać i zakładać społeczności — więc grupa hybrydowa ma jeden pokój łączący online'owe i (dalsze) stacjonarne części: lokalni i zdalni członkowie widzą tę samą społeczność, ten sam rytm i te same następne kroki. W cyfrowym modelu połącz→dołącz→pokój pokój jest trwałą powierzchnią, w której obie połowy społeczności żyją między spotkaniami; wydarzenie stacjonarne to konsekwencja dalszego kroku, którą pokój spina przed i po. JoinOrigin nie dostarcza narzędzi wydarzeń ani nie obsadza wydarzeń hybrydowych — platforma daje każdej społeczności — także hybrydowej — jeden pokój, w którym jej członkowie pozostają w kontakcie.",
    "Ten poradnik obejmuje praktyczne decyzje, które czynią społeczności hybrydowe udanymi — dla nowych i istniejących grup: decyzję, czy hybryda to właściwy model, zbudowanie pokoju, który dzielą obie grupy odbiorców, wybór formatu i narzędzi, które pasują, zaprojektowanie spotkania tak, aby stacjonarni i online'owi członkowie dzielili to samo doświadczenie, zarządzanie przestrzenią, aby żadna strona nie dominowała, oraz utrzymanie trwałego pokoju spinającego społeczność między spotkaniami. Każdy krok pokazuje, gdzie pomaga JoinOrigin.",
  ],
  dataPoints: [
    'Społeczność hybrydowa to jedna społeczność z dwoma punktami wejścia, a nie dwie grupy odbiorców do obsługi osobno.',
    'Pokój jest tkanką łączną: jednym wspólnym miejscem, w którym obie grupy odbiorców widzą te same aktualizacje, notatki i następne kroki.',
    'Proste, niezawodne narzędzia — jeden link do rozmowy wideo, jeden wspólny dokument — zmniejszają tarcie, które zabija hybrydowe spotkania.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować lub zakładać społeczności; nie dostarcza narzędzi wydarzeń ani nie obsadza wydarzeń hybrydowych.',
  ],
  faq: [
    {
      question: 'Kiedy społeczność powinna przejść na hybrydę?',
      answer:
        'Gdy część Twojej grupy odbiorców niezawodnie nie może uczestniczyć stacjonarnie — z powodu odległości, harmonogramu lub mobilności — a społeczność wciąż chce jednej wspólnej tożsamości. Jeśli wszyscy mogą spotykać się lokalnie, spotkanie stacjonarne jest prostsze i często lepsze.',
    },
    {
      question: 'Jaka jest minimalna konfiguracja narzędzi dla hybrydowego spotkania?',
      answer:
        'Jeden link do rozmowy wideo dla zdalnych członków, jeden wspólny dokument do notatek i jeden pokój, w którym obie grupy odbiorców pozostają w kontakcie między spotkaniami. Więcej narzędzi to więcej punktów awarii; zacznij od minimum i dodawaj tylko to, o co prosi społeczność.',
    },
    {
      question: 'Jak powstrzymać zdalnych członków przed poczuciem bycia widownią?',
      answer:
        'Zaprojektuj równy udział: przeprowadź hybrydową rundę przedstawień, jawnie przywołuj zdalnych członków, udostępniaj ekran dla wszelkich materiałów wizualnych i używaj wspólnego dokumentu, w którym obie strony mogą pisać. Wyznacz jedną osobę do ciągłego pilnowania strony zdalnej.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc prowadzić społeczność hybrydową?',
      answer:
        'Tak. JoinOrigin pomaga ludziom znajdować i zakładać społeczności — jeden pokój, w którym lokalni i zdalni członkowie pozostają w kontakcie. JoinOrigin nie dostarcza narzędzi wydarzeń, więc praktyczne hybrydowe praktyki z tego poradnika działają z narzędziami, które już masz.',
    },
  ],
  sections: [
    'Zdecyduj, czy hybryda to właściwy model. Przechodź na hybrydę, gdy spotkanie stacjonarne ma sens. Jeśli większość członków może spotykać się lokalnie, spotkanie stacjonarne wzmacnia więź — hybryda pozwala budować zaufanie szybciej i lepiej czytać ludzi. JoinOrigin jest zaprojektowany, aby pomagać każdej społeczności znajdować i utrzymywać członków, ale decyzja o formacie należy do Ciebie. Przechodź na hybrydę tylko wtedy, gdy spotkanie stacjonarne ma sens.',
    "Zbuduj pokój łączący obie grupy odbiorców. Zanim cokolwiek innego, upewnij się, że społeczność ma wspólny pokój, w którym zdalni i lokalni członkowie rozmawiają, dzielą się aktualizacjami i widzą te same następne kroki. Pokój sprawia, że hybryda czuje się jak jedna społeczność, a nie dwie. Na JoinOrigin każda grupa ma pokój od publikacji — trwałą powierzchnię spinającą online'owe i stacjonarne części. Skonfiguruj jeden wspólny pokój, do którego mogą dołączyć obie grupy odbiorców.",
    'Wybierz jedno niezawodne narzędzie wideo i jeden wspólny dokument. Utrzymuj minimalny stos: link do rozmowy wideo dla zdalnych członków, dokument do notatek i wspólnych linków oraz jeden wpis w kalendarzu. Złożoność jest wrogiem konsekwentnych hybrydowych spotkań. JoinOrigin nie dostarcza narzędzi wydarzeń — utrzymuj minimalny stos. Platforma to trwały pokój, w którym żyją link i dokument, a nie samo narzędzie wydarzeń.',
    "Zaprojektuj agendę dla dwóch grup odbiorców. Przeprowadź rundę przedstawień obejmującą zdalnych członków po imieniu, utrzymuj materiały wizualne na wspólnym ekranie i zostaw miejsce dla strony online'owej, aby mogła zabrać głos. Hybrydowa agenda jawnie wymienia obie grupy odbiorców. Na JoinOrigin obie grupy odbiorców dzielą jeden pokój społeczności, co czyni „projektowanie dla dwóch grup” naturalnym dopasowaniem. Jawnie wymień obie grupy odbiorców w agendzie.",
    "Wyznacz osobę pomostową. Jedna osoba pilnuje strony zdalnej: wita spóźnionych, przywołuje zdalne ręce i przekazuje to, czego miejsce nie słyszy. Bez pomostu online'owa publiczność staje się widownią. JoinOrigin nie obsadza wydarzeń — osoba pomostowa to ludzka rola. Platforma utrzymuje społeczność zorganizowaną w jednym pokoju, więc pomost ma jedno miejsce, w którym widzi, kto dołączył i co zostało udostępnione.",
    'Zarządzaj przestrzenią, aby obie strony uczestniczyły. Poproś stacjonarnych członków, aby mówili pojedynczo i powtarzali pytania dla mikrofonu, sadzaj ludzi blisko kamery i naprzemiennie oddawaj głos między miejscem a rozmową — z wspólnym pokojem otwartym dla obu. JoinOrigin jest zaprojektowany wokół równego połączenia między członkami — ta sama zasada, która sprawia, że hybrydowa dyskusja działa. Naprzemiennie oddawaj głos między miejscem a rozmową i powtarzaj pytania dla mikrofonu.',
    'Utrzymuj pokój przy życiu między spotkaniami. Społeczność żyje w pokoju między wydarzeniami: zdalni i lokalni członkowie dzielą się aktualizacjami, zadają pytania i planują razem. Hybryda to nie jeden format wydarzenia — to trwająca wspólna przestrzeń. To krok najbliższy intencji projektowej JoinOrigin: system operacyjny społeczności to trwały pokój, w którym zdalni i lokalni członkowie dzielą się aktualizacjami i planują razem. Wspólny pokój działa — JoinOrigin jest tą przestrzenią.',
    'Przechwyć i udostępnij wyniki w pokoju. Po każdym spotkaniu publikuj notatki, nagrania i następne kroki we wspólnym pokoju. Widoczny artefakt utrzymuje obie grupy odbiorców w kontakcie i sprawia, że społeczność czuje się produktywna. Na JoinOrigin wyniki społeczności żyją w jednym zorganizowanym pokoju — notatki, nagrania, następne kroki. Publikuj je we wspólnym pokoju po każdym spotkaniu.',
  ],
  steps: [
    {
      title: 'Zdecyduj, czy hybryda to właściwy model',
      body: 'Przechodź na hybrydę, gdy spotkanie stacjonarne ma sens. Jeśli większość członków może spotykać się lokalnie, spotkanie stacjonarne wzmacnia więź — hybryda pozwala budować zaufanie szybciej i lepiej czytać ludzi.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany, aby pomagać każdej społeczności znajdować i utrzymywać członków, ale decyzja o formacie należy do Ciebie. Przechodź na hybrydę tylko wtedy, gdy spotkanie stacjonarne ma sens.',
    },
    {
      title: 'Zbuduj pokój łączący obie grupy odbiorców',
      body: 'Zanim cokolwiek innego, upewnij się, że społeczność ma wspólny pokój, w którym zdalni i lokalni członkowie rozmawiają, dzielą się aktualizacjami i widzą te same następne kroki. Pokój sprawia, że hybryda czuje się jak jedna społeczność, a nie dwie.',
      joinOriginNote:
        "Na JoinOrigin każda grupa ma pokój od publikacji — trwałą powierzchnię spinającą online'owe i stacjonarne części. Skonfiguruj jeden wspólny pokój, do którego mogą dołączyć obie grupy odbiorców.",
    },
    {
      title: 'Wybierz jedno niezawodne narzędzie wideo i jeden wspólny dokument',
      body: 'Utrzymuj minimalny stos: link do rozmowy wideo dla zdalnych członków, dokument do notatek i wspólnych linków oraz jeden wpis w kalendarzu. Złożoność jest wrogiem konsekwentnych hybrydowych spotkań.',
      joinOriginNote:
        'JoinOrigin nie dostarcza narzędzi wydarzeń — utrzymuj minimalny stos. Platforma to trwały pokój, w którym żyją link i dokument, a nie samo narzędzie wydarzeń.',
    },
    {
      title: 'Zaprojektuj agendę dla dwóch grup odbiorców',
      body: "Przeprowadź rundę przedstawień obejmującą zdalnych członków po imieniu, utrzymuj materiały wizualne na wspólnym ekranie i zostaw miejsce dla strony online'owej, aby mogła zabrać głos. Hybrydowa agenda jawnie wymienia obie grupy odbiorców.",
      joinOriginNote:
        'Na JoinOrigin obie grupy odbiorców dzielą jeden pokój społeczności, co czyni „projektowanie dla dwóch grup” naturalnym dopasowaniem. Jawnie wymień obie grupy odbiorców w agendzie.',
    },
    {
      title: 'Wyznacz osobę pomostową',
      body: "Jedna osoba pilnuje strony zdalnej: wita spóźnionych, przywołuje zdalne ręce i przekazuje to, czego miejsce nie słyszy. Bez pomostu online'owa publiczność staje się widownią.",
      joinOriginNote:
        'JoinOrigin nie obsadza wydarzeń — osoba pomostowa to ludzka rola. Platforma utrzymuje społeczność zorganizowaną w jednym pokoju, więc pomost ma jedno miejsce, w którym widzi, kto dołączył i co zostało udostępnione.',
    },
    {
      title: 'Zarządzaj przestrzenią, aby obie strony uczestniczyły',
      body: 'Poproś stacjonarnych członków, aby mówili pojedynczo i powtarzali pytania dla mikrofonu, sadzaj ludzi blisko kamery i naprzemiennie oddawaj głos między miejscem a rozmową — z wspólnym pokojem otwartym dla obu.',
      joinOriginNote:
        'JoinOrigin jest zaprojektowany wokół równego połączenia między członkami — ta sama zasada, która sprawia, że hybrydowa dyskusja działa. Naprzemiennie oddawaj głos między miejscem a rozmową i powtarzaj pytania dla mikrofonu.',
    },
    {
      title: 'Utrzymuj pokój przy życiu między spotkaniami',
      body: 'Społeczność żyje w pokoju między wydarzeniami: zdalni i lokalni członkowie dzielą się aktualizacjami, zadają pytania i planują razem. Hybryda to nie jeden format wydarzenia — to trwająca wspólna przestrzeń.',
      joinOriginNote:
        'To krok najbliższy intencji projektowej JoinOrigin: system operacyjny społeczności to trwały pokój, w którym zdalni i lokalni członkowie dzielą się aktualizacjami i planują razem. Wspólny pokój działa — JoinOrigin jest tą przestrzenią.',
    },
    {
      title: 'Przechwyć i udostępnij wyniki w pokoju',
      body: 'Po każdym spotkaniu publikuj notatki, nagrania i następne kroki we wspólnym pokoju. Widoczny artefakt utrzymuje obie grupy odbiorców w kontakcie i sprawia, że społeczność czuje się produktywna.',
      joinOriginNote:
        'Na JoinOrigin wyniki społeczności żyją w jednym zorganizowanym pokoju — notatki, nagrania, następne kroki. Publikuj je we wspólnym pokoju po każdym spotkaniu.',
    },
  ],
};

export default content;
