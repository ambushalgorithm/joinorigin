import type { GuideContent } from '../../types';

/**
 * „Moderacja społeczności" — ponadczasowy poradnik L1 (design §6.1,
 * TASK-326) w polskim tłumaczeniu.
 *
 * Skoncentrowany na cyfrowym modelu połącz→dołącz→pokój: kontrola twórcy
 * TO właścicielstwo pokoju Matrix — zapraszanie/usuwanie członków,
 * przypisywanie ról, edycja ustawień pokoju, przypinanie wiadomości,
 * archiwizowanie pokoju — egzekwowane natywnie w Element. Wartość JoinOrigin
 * jest wpleciona w intro i każdy krok (per-krokowy `joinOriginNote`),
 * z uczciwym ujęciem — JoinOrigin nie moderuje społeczności zewnętrznych ani
 * nie dostarcza personelu moderacyjnego. Pojedynczy H1, struktura krok po
 * kroku, FAQ odwzorowane 1:1 w `FAQPage` JSON-LD. „Pokój" jest przypięty do
 * pokoju Matrix (§6.3) — prywatne/incidentowe przestrzenie są opisywane
 * jako pokoje/DM, nigdy „kanały".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'pl',
  slug: 'moderation',
  title: 'Moderacja społeczności: jak utrzymać grupy zdrowe i przyjazne | JoinOrigin',
  description:
    'Moderuj społeczność jasnymi zasadami, wczesnym działaniem i deeskalacją — niezależnie od tego, czy konfigurujesz zupełnie nową grupę, czy naprawiasz kulturę ustalonej, kontrola twórcy to właścicielstwo pokoju Matrix, z rolami egzekwowanymi w Element. Praktyczne kroki od JoinOrigin.',
  intro: [
    'Każda rosnąca społeczność w końcu stanie przed momentem, który testuje jej kulturę — zażarta kłótnia, spammer, członek, który czyni innych niekomfortowymi, lub nieporozumienie, które eskaluje. Moderacja to praktyka chronienia przestrzeni, aby społeczność mogła pozostać przyjazna, a staje się potrzebna tylko dlatego, że społeczności składają się z ludzi łączących się ze sobą. To łączenie to rdzeń problemu, z którym pomaga JoinOrigin — a praktyki stosują się tak samo do ustalonej społeczności naprawiającej swoją kulturę, jak do nowej grupy ustawiającej oczekiwania, zanim przyjdzie pierwszy członek.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować, zakładać i organizować społeczności — a w jego cyfrowym modelu społeczność żyje w pokoju kontrolowanym przez twórcę. Kontrola twórcy to standardowe właścicielstwo pokoju Matrix: twórca może zapraszać i usuwać członków, przypisywać role, edytować ustawienia pokoju, przypinać wiadomości i archiwizować pokój — wszystko egzekwowane natywnie w Element, domyślnym kliencie czatu, bez własnego systemu uprawnień. To właścicielstwo jest kręgosłupem moderacji na JoinOrigin: twórca decyduje, kto należy, jakie są zasady i co się dzieje, gdy zasada zostaje złamana. JoinOrigin nie moderuje społeczności zewnętrznych i nie dostarcza personelu moderacyjnego. Platforma jest zaprojektowana wokół zdrowej struktury społeczności, a praktyki z tego poradnika to ludzkie praktyki, których potrzebuje każdy organizator.',
    'Ten poradnik przedstawia praktyczny system moderacji — niezależnie od tego, czy Twoja społeczność jest zupełnie nowa, czy ma lata historii do uporządkowania: pisemne zasady społeczności, które są krótkie i konkretne, jasna ścieżka egzekwowania z ostrzeżeniami przed usunięciami, techniki deeskalacji napiętych sytuacji oraz uczciwe rady o tym, kiedy angażować członków, a kiedy działać samodzielnie. Każdy krok pokazuje, gdzie pomaga JoinOrigin.',
  ],
  dataPoints: [
    'Jasne, pisemne zasady społeczności zmniejszają konflikty, ustawiając oczekiwania przed incydentami.',
    'Kontrola twórcy na JoinOrigin to właścicielstwo pokoju Matrix: zapraszanie/usuwanie, role, ustawienia, przypinanie, archiwizowanie.',
    'Stopniowana ścieżka egzekwowania — ostrzeżenie, potem ograniczenie, potem usunięcie — jest sprawiedliwsza i łatwiejsza do obrony niż natychmiastowe bany.',
    'JoinOrigin to system operacyjny społeczności zaprojektowany, aby pomagać ludziom znajdować, zakładać i organizować społeczności; nie moderuje społeczności zewnętrznych ani nie dostarcza personelu moderacyjnego.',
  ],
  faq: [
    {
      question: 'Czy małe społeczności naprawdę potrzebują zasad moderacji?',
      answer:
        'Tak, i im wcześniej, tym lepiej. Dwie lub trzy krótkie zasady napisane przed konfliktem są znacznie łatwiejsze do zastosowania niż zasady wymyślone po nim. Małe społeczności mają mniej incydentów, ale te, które mają, są równie bolesne.',
    },
    {
      question: 'Czy moderatorzy powinni działać publicznie czy prywatnie?',
      answer:
        'Najpierw prywatnie. Odezwij się jeden na jeden, powtórz zasadę i jej skutek oraz daj osobie szansę na dostosowanie się. Publiczne przywołania zwykle eskalują. Utrzymuj publiczny zapis zasad, ale stosuj je prywatnie — w DM lub prywatnym pokoju.',
    },
    {
      question: 'Kiedy powinienem usunąć kogoś ze społeczności?',
      answer:
        'Po tym, jak jasne ostrzeżenia nie zadziałały, lub natychmiast w przypadku zachowań zagrażających członkom — nękania, gróźb lub doxxingu. Test brzmi: czy osoba aktywnie czyni przestrzeń niebezpieczną dla innych. Na JoinOrigin usunięcie to usunięcie członka z pokoju przez właściciela pokoju.',
    },
    {
      question: 'Czy JoinOrigin może mi pomóc moderować moją społeczność?',
      answer:
        'Tak. JoinOrigin to system operacyjny społeczności, w którym kontrola twórcy to właścicielstwo pokoju Matrix — zapraszanie/usuwanie, role, ustawienia, przypinanie i archiwizowanie egzekwowane w Element. JoinOrigin nie moderuje społeczności, więc praktyki z tego poradnika — jasne zasady, stopniowane egzekwowanie, spokojna deeskalacja — należą do Ciebie.',
    },
  ],
  sections: [
    'Napisz od trzech do pięciu jasnych zasad. Utrzymuj je krótkie, konkretne i pozytywne: „Bądź uprzejmy”, „Trzymaj się tematu”, „Zero spamu i samoreklamy”, „Spieraj się o pomysły, nie o ludzi”. Opublikuj je tam, gdzie każdy nowy członek je zobaczy — najlepiej przypięte w pokoju. Na JoinOrigin zasady i wartości społeczności są widoczne w jej pokoju od pierwszego dnia — nowi członkowie widzą je przed dołączeniem. Przypnij swoje krótkie zasady tam, gdzie każdy nowy członek je zobaczy.',
    'Ustaw ton jako właściciel pokoju. Modeluj zachowanie, którego chcesz — witaj nowych, dziękuj osobom wnoszącym wkład i spokojnie rozwiązuj problemy. Przykład twórcy ustawia kulturową podłogę społeczności. JoinOrigin nie pilnuje społeczności — ton ustawiają twórcy i członkowie. Platforma czyni przyjazne zachowanie widocznym; modeluj w pokoju zachowanie, którego chcesz.',
    'Bądź właścicielem pokoju, jakim jesteś twórcą. Kontrola twórcy na JoinOrigin to właścicielstwo pokoju Matrix: zapraszanie i usuwanie członków, przypisywanie ról, edycja ustawień pokoju, przypinanie wiadomości i archiwizowanie pokoju — egzekwowane natywnie w Element. Znajomość tych kontrolek to techniczna połowa moderacji. JoinOrigin daje twórcy pełne właścicielstwo pokoju od publikacji, bez własnego systemu uprawnień. Poznaj kontrolki moderacji platformy, której używasz, i wyznacz jednego jasnego właściciela.',
    'Uzgodnij ścieżkę egzekwowania. Określ stopniowaną reakcję: prywatne ostrzeżenie, potem ograniczenia (wyciszenie, ograniczone publikowanie — często zmiana roli), potem usunięcie za powtarzające się lub poważne naruszenia. Konsekwentna eskalacja jest sprawiedliwsza niż improwizacja. Na JoinOrigin role to standardowe role Matrix w Element — wyciszenie, ban i przypisywanie ról to natywne działania. Zapisz ścieżkę egzekwowania i trzymaj się jej.',
    'Działaj wcześnie i spokojnie. Zajmij się pierwszą oznaką problemu prywatnie, zanim stanie się publicznym incydentem. Wczesna, spokojna interwencja to najtańsza moderacja, jaka istnieje. JoinOrigin nie moderuje za Ciebie — wczesna, spokojna interwencja to ludzka umiejętność. Platforma jest zaprojektowana tak, aby problemy pojawiały się widocznie w pokoju i były wychwytywane wcześnie. Odezwij się prywatnie przy pierwszym sygnale.',
    'Naucz się technik deeskalacji. Gdy napięcie rośnie, zwolnij rozmowę: uznaj emocję, neutralnie przeformułuj nieporozumienie, zapytaj o sedno sprawy i zaproponuj przerwę lub prywatny pokój na gorącą wymianę. JoinOrigin z założenia utrzymuje interakcje społeczności zorganizowane i spokojne, ale deeskalacja pozostaje ludzkim rzemiosłem. Zwolnij rozmowę i przenieś gorącą wymianę do prywatnego pokoju.',
    'Prowadź rejestr znaczących incydentów. Zapisz, co się wydarzyło, co zrobiłeś i dlaczego. Prosty dziennik pomaga Ci pozostać konsekwentnym, uczyć się z wzorców i bronić decyzji, gdy członek pyta dlaczego. JoinOrigin to system operacyjny społeczności, w którym historia społeczności żyje w jednym miejscu — naturalny dom dla dziennika incydentów. Prosta notatka o tym, co się wydarzyło i dlaczego, utrzymuje Cię w konsekwencji.',
    'Dziel obciążenie ze współmoderatorami. Pozyskaj jednego lub dwóch zaufanych członków i uzgodnijcie zasady egzekwowania. Społeczność zależna od pojedynczego moderatora staje się krucha i stronnicza. JoinOrigin nie dostarcza personelu moderacyjnego — współmoderatorzy to członkowie jak Ty. Twórcy przypisują role współmoderatorom w Element — natywne role Matrix, bez własnego systemu. Pozyskaj jednego lub dwóch zaufanych członków i daj im jasne role.',
  ],
  steps: [
    {
      title: 'Napisz od trzech do pięciu jasnych zasad',
      body: 'Utrzymuj je krótkie, konkretne i pozytywne: „Bądź uprzejmy”, „Trzymaj się tematu”, „Zero spamu i samoreklamy”, „Spieraj się o pomysły, nie o ludzi”. Opublikuj je tam, gdzie każdy nowy członek je zobaczy — najlepiej przypięte w pokoju.',
      joinOriginNote:
        'Na JoinOrigin zasady i wartości społeczności są widoczne w jej pokoju od pierwszego dnia — nowi członkowie widzą je przed dołączeniem. Przypnij swoje krótkie zasady tam, gdzie każdy nowy członek je zobaczy.',
    },
    {
      title: 'Ustaw ton jako właściciel pokoju',
      body: 'Modeluj zachowanie, którego chcesz — witaj nowych, dziękuj osobom wnoszącym wkład i spokojnie rozwiązuj problemy. Przykład twórcy ustawia kulturową podłogę społeczności.',
      joinOriginNote:
        'JoinOrigin nie pilnuje społeczności — ton ustawiają twórcy i członkowie. Platforma czyni przyjazne zachowanie widocznym; modeluj w pokoju zachowanie, którego chcesz.',
    },
    {
      title: 'Bądź właścicielem pokoju, jakim jesteś twórcą',
      body: 'Kontrola twórcy na JoinOrigin to właścicielstwo pokoju Matrix: zapraszanie i usuwanie członków, przypisywanie ról, edycja ustawień pokoju, przypinanie wiadomości i archiwizowanie pokoju — egzekwowane natywnie w Element. Znajomość tych kontrolek to techniczna połowa moderacji.',
      joinOriginNote:
        'JoinOrigin daje twórcy pełne właścicielstwo pokoju od publikacji, bez własnego systemu uprawnień. Poznaj kontrolki moderacji platformy, której używasz, i wyznacz jednego jasnego właściciela.',
    },
    {
      title: 'Uzgodnij ścieżkę egzekwowania',
      body: 'Określ stopniowaną reakcję: prywatne ostrzeżenie, potem ograniczenia (wyciszenie, ograniczone publikowanie — często zmiana roli), potem usunięcie za powtarzające się lub poważne naruszenia. Konsekwentna eskalacja jest sprawiedliwsza niż improwizacja.',
      joinOriginNote:
        'Na JoinOrigin role to standardowe role Matrix w Element — wyciszenie, ban i przypisywanie ról to natywne działania. Zapisz ścieżkę egzekwowania i trzymaj się jej.',
    },
    {
      title: 'Działaj wcześnie i spokojnie',
      body: 'Zajmij się pierwszą oznaką problemu prywatnie, zanim stanie się publicznym incydentem. Wczesna, spokojna interwencja to najtańsza moderacja, jaka istnieje.',
      joinOriginNote:
        'JoinOrigin nie moderuje za Ciebie — wczesna, spokojna interwencja to ludzka umiejętność. Platforma jest zaprojektowana tak, aby problemy pojawiały się widocznie w pokoju i były wychwytywane wcześnie. Odezwij się prywatnie przy pierwszym sygnale.',
    },
    {
      title: 'Naucz się technik deeskalacji',
      body: 'Gdy napięcie rośnie, zwolnij rozmowę: uznaj emocję, neutralnie przeformułuj nieporozumienie, zapytaj o sedno sprawy i zaproponuj przerwę lub prywatny pokój na gorącą wymianę.',
      joinOriginNote:
        'JoinOrigin z założenia utrzymuje interakcje społeczności zorganizowane i spokojne, ale deeskalacja pozostaje ludzkim rzemiosłem. Zwolnij rozmowę i przenieś gorącą wymianę do prywatnego pokoju.',
    },
    {
      title: 'Prowadź rejestr znaczących incydentów',
      body: 'Zapisz, co się wydarzyło, co zrobiłeś i dlaczego. Prosty dziennik pomaga Ci pozostać konsekwentnym, uczyć się z wzorców i bronić decyzji, gdy członek pyta dlaczego.',
      joinOriginNote:
        'JoinOrigin to system operacyjny społeczności, w którym historia społeczności żyje w jednym miejscu — naturalny dom dla dziennika incydentów. Prosta notatka o tym, co się wydarzyło i dlaczego, utrzymuje Cię w konsekwencji.',
    },
    {
      title: 'Dziel obciążenie ze współmoderatorami',
      body: 'Pozyskaj jednego lub dwóch zaufanych członków i uzgodnijcie zasady egzekwowania. Społeczność zależna od pojedynczego moderatora staje się krucha i stronnicza.',
      joinOriginNote:
        'JoinOrigin nie dostarcza personelu moderacyjnego — współmoderatorzy to członkowie jak Ty. Twórcy przypisują role współmoderatorom w Element — natywne role Matrix, bez własnego systemu. Pozyskaj jednego lub dwóch zaufanych członków i daj im jasne role.',
    },
  ],
};

export default content;
