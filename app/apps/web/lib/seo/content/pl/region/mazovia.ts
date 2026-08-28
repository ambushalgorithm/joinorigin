import type { RegionContent } from '../../types';

/**
 * Treść regionu Mazowsza (tłumaczenie PL) — strona regionu. Przetłumaczone
 * z angielskiego źródła prawdy. Uczciwa, ponadczasowa proza; bez zmyślonych
 * liczb, ocen ani lokalnych biur.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'pl',
  slug: 'mazovia',
  title: 'Origins na Mazowszu | JoinOrigin',
  description:
    'Znajdź lub załóż Origins na Mazowszu — spotkania, grupy i wydarzenia w całym regionie. Lista oczekujących JoinOrigin.',
  intro:
    'Mazowsze — województwo mazowieckie — to największy i najludniejszy region Polski, a jego życie społecznościowe zakotwiczone jest w Warszawie, stolicy kraju. Wokół miasta pas miast satelickich i mniejszych ośrodków, takich jak Radom, Płock i Siedlce, prowadzi własne sceny zbudowane wokół uniwersytetów, szpitali, fabryk i lokalnej kultury. Wisła przepływa przez serce regionu, dając zarówno Warszawie, jak i mniejszym miastom naturalne miejsce spotkań, a lasy — w tym Kampinoski Park Narodowy na progu stolicy — goszczą społeczności outdoorowe i rekreacyjne. Warszawskie uniwersytety przyciągają studentów z całego regionu, a scena IT i startupów ściąga specjalistów z okolicznych miast, więc spotkanie w stolicy regularnie obejmuje osoby, które dojechały. To region kontrastów: tętniąca życiem metropolia i spokojne, zielone przedmieścia mieszczą się obok siebie, a każda gmina ma własne domy kultury, biblioteki i stowarzyszenia, które organizują życie lokalne. Instytucje regionalne, miejskie centra kultury i projekty budżetu obywatelskiego utrzymują życie obywatelskie w każdym powiecie. Region nagradza ten sam nawyk co stolica: pojawiaj się konsekwentnie, a wspólnotowa tkanka Mazowsza wciągnie Cię w swoją historię.',
  dataPoints: [
    'Mazowsze to największy i najludniejszy region Polski, zakotwiczony przez Warszawę.',
    'Wisła i Kampinoski Park Narodowy dają regionowi naturalne miejsca spotkań.',
    'Mniejsze miasta to Radom, Płock i Siedlce, każde z własną sceną społecznościową.',
    'Warszawskie uniwersytety i scena IT przyciągają członków z całego regionu.',
    'Miejskie centra kultury i projekty budżetu obywatelskiego utrzymują życie obywatelskie.',
    'Instytucje regionalne łączą powiaty — dojazd do stolicy to codzienność.',
  ],
  faq: [
    {
      question: 'Czy Mazowsze to to samo co Warszawa?',
      answer:
        'Mazowsze to region wokół Warszawy — województwo mazowieckie. Ta strona obejmuje krajobraz regionalny, w tym pas podwarszawski i mniejsze miasta, podczas gdy strona Warszawy zagłębia się w dzielnice, miejsca i typy grup stolicy.',
    },
    {
      question: 'Jakie społeczności rozwijają się poza stolicą?',
      answer:
        'Radom, Płock i Siedlce mają aktywne centra kultury, grupy uniwersyteckie i stowarzyszenia obywatelskie, a miasta wokół Warszawy goszczą spotkania przyjazne dojeżdżającym oraz społeczności outdoorowe w lasach i nad Wisłą.',
    },
    {
      question: 'Czy JoinOrigin ma obecność na Mazowszu?',
      answer:
        'Tak. JoinOrigin nie ma lokalnych biur. Strony Warszawy są dostępne po polsku i po angielsku, a produkt pomaga ludziom znajdować lub zakładać Origins w dowolnym miejscu w regionie.',
    },
  ],
};

export default content;
