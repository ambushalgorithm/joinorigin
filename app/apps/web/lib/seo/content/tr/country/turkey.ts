import type { CountryContent } from '../../types';

/**
 * Türkiye ülke sayfası içeriği (TR çevirisi) — ülke sayfası. İngilizce
 * kaynağın çevirisidir. Dürüst, zamansız metin; uydurulmuş sayı, puan veya
 * yerel ofis yok (G5: şablon tekrarı yok).
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'tr',
  slug: 'turkey',
  title: "Türkiye'deki Origins | JoinOrigin",
  description:
    "Türkiye'de Origins bulun veya başlatın — girişim sahnelerinden küçük işletme ağlarına. JoinOrigin bekleme listesi.",
  intro:
    "Türkiye'nin topluluk hayatı misafirperverlik ve mahalle üzerine kuruludur: esnaf, çay ocakları ve aile ağları gündelik yaşamı birbirine bağlı tutar. Çay ritüeli toplumsal tutkal gibidir: her dükkânda, ofiste ve toplantıda çay ikram edilir ve bir çay daveti, yabancıların müdavime dönüştüğü andır. Şehirlerde bu gelenek modern bir sahneyle buluşur: İstanbul, Ankara ve İzmir'deki üniversite kampüsleri yoğun öğrenci topluluklarına ev sahipliği yapar; gelişen e-ticaret, fintech ve oyun sektörü İstanbul'u bölgesel bir girişim başkenti hâline getirmiştir; çarşıların ve mahalle dükkânlarının esnaf kültürü ise küçük işletme topluluklarını güçlü tutar. Bölgesel festivaller, yardım ağları ve aile buluşmaları ülkeyi bölgeleri boyunca bir arada tutarken, gönüllü gruplar ve vakıflar sosyal yardım ve afet müdahalesinde aktiftir. Üniversiteler, kütüphaneler ve belediye kültür merkezleri, yeni gelenlerin kendilerine bir yer bulmasını kolaylaştıran açık buluşma alanları sunar. Çay ritüelini benimseyen, birkaç kelime Türkçe öğrenen ve düzenli olarak görünen yeni gelenler kapıların ardına kadar açıldığını görecektir — misafirperverlik burada bir klişe değil, topluluk hayatının işletim sistemidir.",
  dataPoints: [
    'Yaklaşık 82 milyon nüfus; başkent Ankara.',
    'Ana dil Türkçedir; Kürtçe ve diğer bölgesel diller de konuşulur.',
    'Çay kültürü — çay bahçeleri ve sokak çay ocakları gündelik topluluk hayatını besler.',
    'Çarşı ve esnaf geleneği — Kapalıçarşı ve mahalle dükkânları kişisel güven üzerine işler.',
    'Bölgesel bir girişim başkenti — e-ticaret, fintech ve oyun güçlü alanlardır.',
    'Üniversiteler: Boğaziçi, İstanbul Üniversitesi, İTÜ ve Ankara Üniversitesi.',
  ],
  faq: [
    {
      question: "Türkiye'de Origins nasıl bulurum?",
      answer:
        '/location merkezini kullanın, bir şehir seçin ve ardından grup türü sayfalarını inceleyin — girişim, yaratıcı, siyasi, buluşma ve küçük işletme Origins. Çay ocakları, üniversite kulüpleri ve yerel vakıflar da çevrimdışı gruplar için iyi başlangıç noktalarıdır.',
    },
    {
      question: 'Esnaf geleneği nedir ve toplulukları nasıl şekillendirir?',
      answer:
        'Esnaf, çarşıları ve mahalle dükkânlarını kişisel güven üzerine işleten zanaatkârlar ve küçük dükkân sahipleridir. Esnaf ağları doğal küçük işletme toplulukları oluşturur — ortak bir sokak, pazar veya meslek sahiplerini birbirine bağlar ve bunlar katılmak ya da başlatmak için en erişilebilir gruplardan biridir.',
    },
    {
      question: "JoinOrigin Türkiye'de faaliyet gösteriyor mu?",
      answer:
        "Evet. JoinOrigin'in yerel ofisleri yoktur. İstanbul sayfaları Türkçe olarak sunulmaktadır ve ürün, insanların Türkiye'nin her yerinde Origins bulmasına veya başlatmasına yardımcı olur.",
    },
  ],
};

export default content;
