import type { GuideContent } from '../../types';

/**
 * „Jak utrzymać społeczność aktywną" — ponadczasowy poradnik L1
 * (design §6.1, TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany na cyfrowym modelu połącz→dołącz→pokój: pokój i jego
 * aktywność (zasilanie aktualności) są powierzchnią utrzymania — społeczność
 * żyje w pokoju między spotkaniami, a wydarzenia stacjonarne są konsekwencją
 * dalszego kroku. Wartość JoinOrigin jest wpleciona w intro i każdy krok
 * (per-krokowy `joinOriginNote`), z uczciwym ujęciem — JoinOrigin nie
 * zarządza społecznościami ani nie obsadza wydarzeń. Pojedynczy H1,
 * struktura krok po kroku, FAQ odwzorowane 1:1 w `FAQPage` JSON-LD.
 * „Pokój" jest przypięty do pokoju Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'keep-an-origin-active',
  title: 'Jak utrzymać Origin aktywne i zaangażowane | JoinOrigin',
  description:
    'Utrzymuj swoje Origin aktywne — niezależnie od tego, czy jest nowe i szuka rytmu, czy uznane i dryfuje — wykorzystaj pokój i jego aktualności jako powierzchnię utrzymania, buduj rytuały, dziel obciążenie organizatora i twórz małe ścieżki wkładu. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Większość społeczności nie umiera przez zły start; umiera przez ciszę — w momencie, gdy ludzie przestają czuć się połączeni i po cichu odpływają. Utrzymanie Origin w aktywności jest zatem problemem łączenia ludzi: ludzie zostają, gdy czują, że przynależą, a czują przynależność, gdy istnieje widoczne, zorganizowane miejsce, w którym żyje społeczność. Dokładnie tym jest JoinOrigin — i te same mechaniki działają niezależnie od tego, czy Origin ma kilka tygodni i wciąż szuka rytmu, czy ma lata i dryfuje w ciszę.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować, zakładać i organizować Origins — a w jego cyfrowym modelu pokój jest powierzchnią utrzymania: kontrolowany przez twórcę pokój Matrix, w którym rytuały, aktualizacje i wkłady pozostają widoczne, a którego aktywność trafia do aktualności utrzymujących członków w kontakcie między spotkaniami. Wydarzenia stacjonarne pozostają konsekwencją dalszego kroku uformowanej społeczności, nigdy rdzeniem — to pokój i jego aktualności utrzymują społeczność przy życiu z dnia na dzień. JoinOrigin nie zarządza społecznościami ani nie obsadza wydarzeń — platforma utrzymuje społeczności w kontakcie między spotkaniami, a organizacja należy do Ciebie.',
    'Ten poradnik obejmuje praktyczne mechaniki zdrowej, aktywnej społeczności — od pierwszych tygodni po starcie po społeczność działającą od lat: ustanowienie rytuałów, które czynią uczestnictwo nawykiem, tworzenie wspólnych artefaktów w pokoju, rozłożenie obciążenia organizatora, aby żadna pojedyncza osoba się nie wypaliła, otwarcie małych ścieżek wkładu, aby każdy członek mógł dodawać wartość, oraz mierzenie sygnałów mówiących, czy społeczność faktycznie żyje. Każdy krok odwzorowuje, jak pomaga JoinOrigin.',
  ],
  dataPoints: [
    'Powtarzające się rytuały — stały rytm pokoju, regularny format, wspólny artefakt — zamieniają zainteresowanie w nawyk.',
    'Aktywność pokoju między spotkaniami utrzymuje członków w poczuciu połączenia; cisza jest tym, co ich odpycha.',
    'Małe ścieżki wkładu (przypięta notatka, rotujący gospodarz, wyróżnienie członka) dają członkom poczucie współwłasności.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować, zakładać i organizować Origins; nie zarządza społecznościami ani nie obsadza wydarzeń.',
  ],
  faq: [
    {
      question: 'Jak często powinno spotykać się aktywne Origin?',
      answer:
        'Miesięcznie to najbardziej zrównoważona podstawa dla spotkań stacjonarnych; pokój powinien być aktywny co tydzień — zameldowania, aktualizacje i małe rozmowy. Konsekwencja liczy się bardziej niż częstotliwość: niezawodny cotygodniowy rytm pokoju bije sporadyczny.',
    },
    {
      question: 'Co robię, gdy zaangażowanie spada?',
      answer:
        'Nie panikuj i nie startuj z wielką kampanią. Zapytaj członków bezpośrednio, czego potrzebują, opublikuj w pokoju jedno proste pytanie, zorganizuj jedno mniejsze i prostsze spotkanie i przekaż jedną rolę członkowi. Małe, responsywne zmiany ożywiają zaangażowanie szybciej niż wolumen.',
    },
    {
      question: 'Jak utrzymać zaangażowanie członków między spotkaniami?',
      answer:
        'Twórz w pokoju punkty styku o niskim wysiłku: wspólny dokument, wyróżnienie członka, regularny wątek zameldowań lub aktualizację „kto nad czym pracuje”. Celem jest widoczne tętno w pokoju i jego aktualnościach, nie ciągłe powiadomienia.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc utrzymać moje Origin aktywne?',
      answer:
        'Tak. JoinOrigin pomaga ludziom znajdować, zakładać i organizować Origins — jeden pokój i aktualności, w których społeczność pozostaje widoczna między spotkaniami. Praktyki z tego poradnika — rytuały, wspólne role i małe wkłady — działają na platformie i z narzędziami, które już masz.',
    },
  ],
  sections: [
    'Określ rdzeniowy rytuał. Wybierz jedną powtarzającą się praktykę, na której każdy może polegać: comiesięczne spotkanie, cotygodniowe zameldowanie, wspólne czytanie lub aktualizację projektu. Rytuały tworzą tętno utrzymujące społeczność przy życiu — a w społeczności cyfrowej rytuał odbywa się w pokoju. Na JoinOrigin rytm społeczności jest widoczny w jednym zorganizowanym pokoju — członkowie zawsze znają następny rytuał. Wybierz jedną powtarzającą się praktykę i strzeż jej.',
    'Stwórz wspólny artefakt w pokoju. Rozpocznij przypiętą notatkę lub dokument, który rejestruje, czym zajmuje się społeczność — notatki ze spotkań, przedstawienia członków, aktualizacje projektów. Żywy artefakt utrzymuje członków zorientowanych między spotkaniami. JoinOrigin to wspólny pokój, w którym notatki, przedstawienia i aktualizacje żyją obok społeczności — żywy artefakt z założenia. Przypnij w pokoju prosty wspólny dokument.',
    'Rozłóż obciążenie organizatora. Pozyskaj dwóch lub trzech współgospodarzy lub pomocników i rotuj małe role: witanie, notatki, wybór tematu, kontakt z miejscem. Współwłasność to najlepsza obrona przed wypaleniem. JoinOrigin nie obsadza ani nie zarządza społecznościami — współwłasność musisz zbudować sam. Platforma daje pomocnikom i organizatorom jeden pokój do koordynacji. Pozyskaj dwóch lub trzech współgospodarzy i rotuj role.',
    'Otwórz małe ścieżki wkładu. Daj członkom sposoby dodawania wartości bez dużych zobowiązań: wyróżnienie członka, rotujący lider dyskusji, wspólna playlista lub lista lektur albo przypięta sekcja „szukamy pomocy” w pokoju. Na JoinOrigin członkowie mają widoczne sposoby wniesienia wkładu — społeczność, w której dodawanie wartości jest łatwe. Wyróżnienia członków i rotujący liderzy tworzą to samo poczucie współwłasności.',
    'Utrzymuj przewidywalny rytm komunikacji w pokoju. Wysyłaj jedną krótką aktualizację tygodniowo lub miesięcznie według stałego harmonogramu, publikowaną w pokoju i trafiającą do aktualności. Przewidywalność buduje zaufanie; cisza buduje dryf. JoinOrigin utrzymuje tętno społeczności w jednym pokoju — jedną aktualizację, według harmonogramu, tam, gdzie wszyscy mogą ją zobaczyć. Jedna krótka cotygodniowa aktualizacja buduje zaufanie.',
    'Obserwuj sygnały zaangażowania. Śledź aktywność pokoju, powtarzalną frekwencję i wskaźnik wkładu. Zdrowa społeczność rośnie w wskaźniku powrotów, zanim urośnie w rozmiarze — skup się na członkach, którzy wracają do pokoju. Na JoinOrigin organizatorzy mogą zobaczyć, jak radzi sobie ich społeczność, w jednym zorganizowanym pokoju i aktualnościach. Śledź aktywność, powtarzalną frekwencję i wskaźnik wkładu w prostym arkuszu.',
    'Regularnie pytaj o opinie w pokoju. Po każdym spotkaniu użyj prostej ankiety z jednym pytaniem: co Ci się podobało, co byś zmienił. Działaj na odpowiedzi i powiedz społeczności, co zmieniłeś. JoinOrigin zbiera i przechowuje opinie wraz ze społecznością, do której należą — w pokoju. Ankieta z jednym pytaniem po każdym spotkaniu działa — potem działaj na odpowiedzi.',
    'Dostosuj format, gdy społeczność dojrzewa. To, co działało dla dziesięciu członków, może nie pasować do pięćdziesięciu. Przeglądaj format, miejsce i rytm kwartalnie i ewoluuj świadomie, zamiast trzymać się z przyzwyczajenia. JoinOrigin pomaga społecznościom ewoluować — jeden pokój, w którym zmiany formatu i ogłoszenia docierają do wszystkich. Świadomie przeglądaj format i miejsce kwartalnie.',
  ],
  steps: [
    {
      title: 'Określ rdzeniowy rytuał',
      body: 'Wybierz jedną powtarzającą się praktykę, na której każdy może polegać: comiesięczne spotkanie, cotygodniowe zameldowanie, wspólne czytanie lub aktualizację projektu. Rytuały tworzą tętno utrzymujące społeczność przy życiu — a w społeczności cyfrowej rytuał odbywa się w pokoju.',
      joinOriginNote:
        'Na JoinOrigin rytm społeczności jest widoczny w jednym zorganizowanym pokoju — członkowie zawsze znają następny rytuał. Wybierz jedną powtarzającą się praktykę i strzeż jej.',
    },
    {
      title: 'Stwórz wspólny artefakt w pokoju',
      body: 'Rozpocznij przypiętą notatkę lub dokument, który rejestruje, czym zajmuje się społeczność — notatki ze spotkań, przedstawienia członków, aktualizacje projektów. Żywy artefakt utrzymuje członków zorientowanych między spotkaniami.',
      joinOriginNote:
        'JoinOrigin to wspólny pokój, w którym notatki, przedstawienia i aktualizacje żyją obok społeczności — żywy artefakt z założenia. Przypnij w pokoju prosty wspólny dokument.',
    },
    {
      title: 'Rozłóż obciążenie organizatora',
      body: 'Pozyskaj dwóch lub trzech współgospodarzy lub pomocników i rotuj małe role: witanie, notatki, wybór tematu, kontakt z miejscem. Współwłasność to najlepsza obrona przed wypaleniem.',
      joinOriginNote:
        'JoinOrigin nie obsadza ani nie zarządza społecznościami — współwłasność musisz zbudować sam. Platforma daje pomocnikom i organizatorom jeden pokój do koordynacji. Pozyskaj dwóch lub trzech współgospodarzy i rotuj role.',
    },
    {
      title: 'Otwórz małe ścieżki wkładu',
      body: 'Daj członkom sposoby dodawania wartości bez dużych zobowiązań: wyróżnienie członka, rotujący lider dyskusji, wspólna playlista lub lista lektur albo przypięta sekcja „szukamy pomocy” w pokoju.',
      joinOriginNote:
        'Na JoinOrigin członkowie mają widoczne sposoby wniesienia wkładu — społeczność, w której dodawanie wartości jest łatwe. Wyróżnienia członków i rotujący liderzy tworzą to samo poczucie współwłasności.',
    },
    {
      title: 'Utrzymuj przewidywalny rytm komunikacji w pokoju',
      body: 'Wysyłaj jedną krótką aktualizację tygodniowo lub miesięcznie według stałego harmonogramu, publikowaną w pokoju i trafiającą do aktualności. Przewidywalność buduje zaufanie; cisza buduje dryf.',
      joinOriginNote:
        'JoinOrigin utrzymuje tętno społeczności w jednym pokoju — jedną aktualizację, według harmonogramu, tam, gdzie wszyscy mogą ją zobaczyć. Jedna krótka cotygodniowa aktualizacja buduje zaufanie.',
    },
    {
      title: 'Obserwuj sygnały zaangażowania',
      body: 'Śledź aktywność pokoju, powtarzalną frekwencję i wskaźnik wkładu. Zdrowa społeczność rośnie w wskaźniku powrotów, zanim urośnie w rozmiarze — skup się na członkach, którzy wracają do pokoju.',
      joinOriginNote:
        'Na JoinOrigin organizatorzy mogą zobaczyć, jak radzi sobie ich społeczność, w jednym zorganizowanym pokoju i aktualnościach. Śledź aktywność, powtarzalną frekwencję i wskaźnik wkładu w prostym arkuszu.',
    },
    {
      title: 'Regularnie pytaj o opinie w pokoju',
      body: 'Po każdym spotkaniu użyj prostej ankiety z jednym pytaniem: co Ci się podobało, co byś zmienił. Działaj na odpowiedzi i powiedz społeczności, co zmieniłeś.',
      joinOriginNote:
        'JoinOrigin zbiera i przechowuje opinie wraz ze społecznością, do której należą — w pokoju. Ankieta z jednym pytaniem po każdym spotkaniu działa — potem działaj na odpowiedzi.',
    },
    {
      title: 'Dostosuj format, gdy społeczność dojrzewa',
      body: 'To, co działało dla dziesięciu członków, może nie pasować do pięćdziesięciu. Przeglądaj format, miejsce i rytm kwartalnie i ewoluuj świadomie, zamiast trzymać się z przyzwyczajenia.',
      joinOriginNote:
        'JoinOrigin pomaga społecznościom ewoluować — jeden pokój, w którym zmiany formatu i ogłoszenia docierają do wszystkich. Świadomie przeglądaj format i miejsce kwartalnie.',
    },
  ],
};

export default content;
