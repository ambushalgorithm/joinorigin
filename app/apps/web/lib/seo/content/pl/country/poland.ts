import type { CountryContent } from '../../types';

/**
 * Treść strony Polski (tłumaczenie PL) — strona kraju. Przetłumaczone z
 * angielskiego źródła prawdy. Uczciwa, ponadczasowa proza; bez zmyślonych
 * liczb, ocen ani lokalnych biur (G5: bez ponownego użycia szablonów).
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'pl',
  slug: 'poland',
  title: 'Origins w Polsce | JoinOrigin',
  description:
    'Znajdź lub załóż Origins w Polsce — od scen startupowych po sieci małych firm. Lista oczekujących JoinOrigin.',
  intro:
    'Polski krajobraz społecznościowy łączy głęboką tradycję trzeciego sektora z szybko rosnącą nowoczesną sceną spotkań technologicznych i inicjatyw obywatelskich. Historia solidarności — od ruchu związkowego po przemiany demokratyczne lat 90. — pozostawiła po sobie silną kulturę organizowania się: fundacje, stowarzyszenia i grupy wolontariackie są wplecione w codzienne życie, a budżet obywatelski to realna, szeroko wykorzystywana instytucja w wielu miastach. Miasta uniwersyteckie, takie jak Warszawa, Kraków, Wrocław i Gdańsk, goszczą gęste społeczności studenckie, a boom IT i gier wideo uczynił polskie spotkania technologiczne jednymi z najbardziej aktywnych w Europie Środkowej. Kultura kawiarniana, kawiarnie planszówkowe i bary mleczne — tanie stołówki z epoki PRL ze wspólnymi stołami — dają nowym osobom naturalne miejsca do spotkań. Tradycje regionalne też mają znaczenie: lokalne festiwale, grupy obywatelskie i stowarzyszenia w mniejszych miastach utrzymują więzi poza wielkimi ośrodkami. Nowi, którzy dołączą do istniejącej grupy lub założą proste, cykliczne spotkanie, odkryją kraj, który traktuje wspólnotę poważnie i nagradza konsekwencję.',
  dataPoints: [
    'Około 38 milionów mieszkańców; stolica to Warszawa.',
    'Polski jest głównym językiem, a angielski rośnie w biznesie i technologii.',
    'Silna kultura trzeciego sektora — fundacje, stowarzyszenia i grupy wolontariackie są powszechne.',
    'Jedna z czołowych scen IT i gier wideo w Europie Środkowej.',
    'Uniwersytety obejmują Uniwersytet Warszawski, Uniwersytet Jagielloński i Politechnikę Warszawską.',
    'Bary mleczne i kawiarnie planszówkowe zakotwiczają charakterystyczną kulturę kawiarnianą.',
  ],
  faq: [
    {
      question: 'Jak znaleźć Origins w Polsce?',
      answer:
        'Skorzystaj z centrum /location, wybierz miasto, a następnie przejrzyj strony typów grup — Startupowe Origins, Kreatywne Origins, Polityczne Origins, Spotkaniowe Origins i Origins małych firm. Fundacje, centra kultury i lokalne platformy wydarzeń to również dobre punkty startowe dla grup offline.',
    },
    {
      question: 'Czym jest budżet obywatelski w polskich miastach?',
      answer:
        'Budżet obywatelski to realna instytucja w wielu polskich miastach: mieszkańcy zgłaszają i głosują na lokalne projekty — od placów zabaw po remonty parków. Udział w spotkaniu dzielnicy to jeden z najszybszych sposobów na poznanie zaangażowanych sąsiadów i założenie obywatelskiego Origin.',
    },
    {
      question: 'Czy JoinOrigin działa w Polsce?',
      answer:
        'Tak. JoinOrigin nie ma lokalnych biur. Strony Warszawy są dostępne po polsku i po angielsku, a produkt pomaga ludziom znajdować lub zakładać Origins w dowolnym miejscu w Polsce.',
    },
  ],
};

export default content;
