import type { RegionContent } from '../../types';

/**
 * İstanbul ili bölge sayfası içeriği (TR çevirisi) — bölge sayfası.
 * İngilizce kaynağın çevirisidir. Dürüst, zamansız metin; uydurulmuş sayı,
 * puan veya yerel ofis yok.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'tr',
  slug: 'istanbul',
  title: "İstanbul Bölgesi'ndeki Origins | JoinOrigin",
  description:
    'İstanbul bölgesinde Origins bulun veya başlatın — bölge genelinde buluşmalar, gruplar ve etkinlikler. JoinOrigin bekleme listesi.',
  intro:
    'İstanbul ili, iki kıtaya yayılan tek ve kesintisiz bir metropol bölgesidir ve topluluk hayatının neredeyse tamamı bu kentsel dokunun içinde gerçekleşir. Boğaz, Avrupa ve Asya yakalarını ayırır; onu geçen vapurlar gündelik bir sosyal ritüeldir — insanlar buluşmalarını vapur seferlerine göre planlar ve bir topluluk bir yakada köklenirken diğer yakadan da üye çekebilir. İlin ilçeleri birbirinden farklı kimlikler taşır: Asya yakasındaki Kadıköy ve Moda yaratıcı ve teknoloji sahnelerine, Avrupa yakasındaki Karaköy ve Beyoğlu galeri, tasarım stüdyosu ve girişim ofislerine ev sahipliği yapar; tarihi yarımada, Beşiktaş ve kuzeydeki yeni ilçeler ise üniversiteleri, iş kulelerini ve aile mahallelerini barındırır. Boğaziçi, İstanbul Üniversitesi ve İTÜ gibi üniversiteler sürekli bir öğrenci akışı sağlar; gelişen e-ticaret, fintech ve oyun sektörü ise şehri bölgesel bir girişim başkenti yapmıştır. Çay kültürü ve esnaf geleneği — kişisel güven üzerine işleyen çarşılar ve mahalle dükkânları — sokak düzeyinde gündelik hayatı birbirine bağlı tutar. Topluluk kurucuları için İstanbul; yoğunluk, çeşitlilik ve denizin karşısına gidip gelen bir şehrin kendine özgü ritmini sunar.',
  dataPoints: [
    'İstanbul ili iki kıtaya yayılır — Boğaz, Avrupa ve Asya yakalarını ayırır.',
    "Yaklaşık 15,7 milyon nüfus — Türkiye'nin en büyük ili ve şehri.",
    'Üniversiteler: Boğaziçi, İstanbul Üniversitesi, İTÜ ve Koç.',
    'Bölgesel bir girişim başkenti — e-ticaret, fintech ve oyun güçlü alanlardır.',
    'Çay kültürü ve esnaf geleneği sokak düzeyindeki topluluk hayatını ayakta tutar.',
    'Vapur ağı, karşılıklı yakalar arasındaki buluşmaları gündelik yaşamın parçası yapar.',
  ],
  faq: [
    {
      question: 'İstanbul bölgesi, İstanbul şehir sahnesinden farklı mı?',
      answer:
        'İstanbul ili, şehrin kendisini içeren idari bölgedir; bu yüzden ikisi neredeyse tamamen örtüşür. Bu sayfa il ve ilçe manzarasını ele alırken, İstanbul şehir sayfası mahallelere, mekânlara ve grup türlerine odaklanır.',
    },
    {
      question: 'Hangi ilçelerde topluluklar en aktiftir?',
      answer:
        'Kadıköy ve Moda, Asya yakasında yaratıcı ve teknoloji topluluklarına öncülük eder; Karaköy, Beyoğlu ve Beşiktaş, Avrupa yakasında girişim, tasarım ve üniversite sahnelerine ev sahipliği yapar; tarihi yarımada ve aile mahalleleri geleneksel mahalle hayatını güçlü tutar.',
    },
    {
      question: "JoinOrigin'in İstanbul ilinde bir varlığı var mı?",
      answer:
        "Evet. JoinOrigin'in yerel ofisleri yoktur. İstanbul sayfaları Türkçe olarak sunulmaktadır ve ürün, insanların ilin her yerinde Origins bulmasına veya başlatmasına yardımcı olur.",
    },
  ],
};

export default content;
