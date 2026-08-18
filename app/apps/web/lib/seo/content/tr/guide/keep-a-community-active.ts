import type { GuideContent } from '../../types';

/**
 * "Bir Topluluk Nasıl Aktif Tutulur" — L1 kalıcı rehber (tasarım §6.1,
 * TASK-326).
 *
 * Dijital bağlan→katıl→oda modeline göre yeniden odaklanmıştır: oda ve
 * etkinliği (akışı beslemek) elde tutma yüzeyidir — topluluk buluşmalar
 * arasında odada yaşar ve yüz yüze etkinlikler aşağı yönlü bir sonuçtur.
 * JoinOrigin değeri girişe ve her adıma (adım başına `joinOriginNote`)
 * işlenmiştir, dürüst çerçeveyle — JoinOrigin toplulukları yönetmez ya da
 * etkinliklere personel sağlamaz. Tek H1, adım adım yapı, SSS `FAQPage`
 * JSON-LD ile 1:1 yansıtılır. "Oda" Matrix odasına bağlıdır (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'keep-a-community-active',
  title: 'Bir Topluluk Nasıl Aktif ve Bağlı Tutulur | JoinOrigin',
  description:
    'Topluluğunuzu aktif tutun — ister yeni ve ritmini buluyor olsun ister yerleşik ve dağılıyor olsun — odayı ve akışını elde tutma yüzeyi olarak kullanın, ritüeller kurun, organizatör yükünü paylaşın ve küçük katkı yolları oluşturun. JoinOrigin’den pratik adımlar.',
  intro: [
    'Çoğu topluluk kötü bir lansmandan ölmez; sessizlikten ölür — insanların bağlı hissetmeyi bırakıp sessizce uzaklaştığı andan. Bir topluluğu aktif tutmak bu nedenle bir insanları bağlama sorunudur: insanlar aidiyet hissettiklerinde kalır ve topluluğun yaşadığı görünür, düzenli bir yer olduğunda aidiyet hissederler. JoinOrigin tam olarak budur — ve aynı mekanikler, topluluk birkaç haftalık olup ritmini hâlâ buluyor olsa da ya da yıllardır var olup sessizliğe sürükleniyor olsa da geçerlidir.',
    'JoinOrigin, insanların toplulukları bulmasına, başlatmasına ve organize etmesine yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir — ve dijital modelinde oda elde tutma yüzeyidir: ritüellerin, güncellemelerin ve katkıların görünür kaldığı, etkinliği üyeleri buluşmalar arasında bağlı tutan akışa akan, oluşturan kişinin kontrolündeki bir Matrix odası. Yüz yüze etkinlikler, oluşmuş bir topluluğun aşağı yönlü bir sonucu olarak kalır, asla çekirdek değil — topluluğu günden güne canlı tutan oda ve akışıdır. JoinOrigin toplulukları yönetmez ya da etkinliklere personel sağlamaz — platform toplulukları buluşmalar arasında bağlı tutar ve organizasyon sizindir.',
    'Bu rehber, sağlıklı, aktif bir topluluğun pratik mekaniklerini kapsar — lansmandan sonraki ilk haftalardan yıllardır devam eden bir topluluğa kadar: katılımı alışkanlık haline getiren ritüeller kurmak, odada ortak ürünler oluşturmak, tek bir kişinin tükenmemesi için organizatör yükünü dağıtmak, her üyenin değer katabilmesi için küçük katkı yolları açmak ve topluluğun gerçekten canlı olup olmadığını söyleyen sinyalleri ölçmek. Her adım, JoinOrigin’in nasıl yardımcı olduğuna karşılık gelir.',
  ],
  dataPoints: [
    'Tekrarlanan ritüeller — sabit bir oda ritmi, düzenli bir format, ortak bir ürün — ilgiyi alışkanlığa dönüştürür.',
    'Buluşmalar arasındaki oda etkinliği, üyelerin bağlı hissetmesini sağlayan şeydir; sessizlik onları uzaklaştıran şeydir.',
    'Küçük katkı yolları (sabitlenmiş bir not, dönüşümlü bir ev sahibi, üye vitrini) üyelerde sahiplik hissi yaratır.',
    'JoinOrigin, insanların toplulukları bulmasına, başlatmasına ve organize etmesine yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir; toplulukları yönetmez ya da etkinliklere personel sağlamaz.',
  ],
  faq: [
    {
      question: 'Aktif bir topluluk ne sıklıkta toplanmalı?',
      answer:
        'Aylık, yüz yüze buluşmalar için en sürdürülebilir tabandır; oda haftalık olarak aktif olmalıdır — kontroller, güncellemeler ve küçük sohbetler. Sıklıktan çok tutarlılık önemlidir: güvenilir bir haftalık oda ritmi, düzensiz olandan daha iyidir.',
    },
    {
      question: 'Etkileşim düştüğünde ne yaparım?',
      answer:
        'Panik yapmayın ya da büyük bir kampanya başlatmayın. Üyelere doğrudan neye ihtiyaç duyduklarını sorun, odada tek bir basit soru yayınlayın, daha küçük ve daha basit bir buluşma yürütün ve bir rolü bir üyeye devredin. Küçük, duyarlı değişiklikler etkileşimi hacimden daha hızlı canlandırır.',
    },
    {
      question: 'Üyeleri buluşmalar arasında nasıl bağlı tutarım?',
      answer:
        'Odada düşük eforlu temas noktaları oluşturun: ortak bir doküman, bir üye vitrini, düzenli bir kontrol başlığı ya da bir “kim ne üzerinde çalışıyor” güncellemesi. Amaç, sürekli bildirimler değil, odada ve akışında görünür bir kalp atışıdır.',
    },
    {
      question: 'JoinOrigin topluluğumu aktif tutmama yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin, insanların toplulukları bulmasına, başlatmasına ve organize etmesine yardımcı olur — topluluğun buluşmalar arasında görünür kaldığı tek bir oda ve akış. Bu rehberdeki uygulamalar — ritüeller, paylaşılan roller ve küçük katkılar — platformda ve hâlihazırda sahip olduğunuz araçlarla çalışır.',
    },
  ],
  sections: [
    'Çekirdek bir ritüel tanımlayın. Herkesin güvenebileceği tek bir tekrarlanan uygulama seçin: aylık bir toplantı, haftalık bir kontrol, ortak bir okuma ya da bir proje güncellemesi. Ritüeller, bir topluluğu canlı tutan kalp atışını yaratır — ve dijital öncelikli bir toplulukta ritüel odada gerçekleşir. JoinOrigin’de bir topluluğun ritmi tek bir düzenli odada görünürdür — üyeler her zaman sonraki ritüeli bilir. Tek bir tekrarlanan uygulama seçin ve onu koruyun.',
    'Odada ortak bir ürün oluşturun. Topluluğun ne yaptığını yakalayan sabitlenmiş bir not ya da doküman başlatın — toplantı notları, üye tanıtımları, proje güncellemeleri. Yaşayan bir ürün, üyeleri buluşmalar arasında yönlendirilmiş tutar. JoinOrigin, notların, tanıtımların ve güncellemelerin topluluğun yanında yaşadığı ortak odadır — tasarım gereği yaşayan bir ürün. Odada basit bir ortak doküman sabitleyin.',
    'Organizatör yükünü dağıtın. İki ya da üç ortak ev sahibi ya da yardımcı bulun ve küçük rolleri dönüşümlü olarak yapın: karşılama, not alma, konu seçimi, mekan iletişimi. Paylaşılan sahiplik, tükenmeye karşı en iyi savunmadır. JoinOrigin topluluklara personel sağlamaz ya da onları yönetmez — paylaşılan sahipliği siz kurarsınız. Platform, yardımcılara ve organizatörlere koordinasyon için tek bir oda verir. İki ya da üç ortak ev sahibi bulun ve rolleri dönüşümlü yapın.',
    'Küçük katkı yolları açın. Üyelere büyük taahhütler olmadan değer katmanın yollarını verin: bir üye vitrini, dönüşümlü bir tartışma lideri, ortak bir çalma ya da okuma listesi ya da odada sabitlenmiş bir “yardım aranıyor” bölümü. JoinOrigin’de üyelerin katkıda bulunmanın görünür yolları vardır — değer katmanın kolay olduğu bir topluluk. Üye vitrinleri ve dönüşümlü liderler aynı sahiplik hissini yaratır.',
    'Odada öngörülebilir bir iletişim ritmi tutun. Haftada ya da ayda bir, sabit bir programla, odada yayınlanan ve akışa akan kısa bir güncelleme gönderin. Öngörülebilirlik güven inşa eder; sessizlik dağılma yaratır. JoinOrigin topluluğun kalp atışını tek bir odada tutar — tek bir güncelleme, bir program üzerinde, herkesin görebileceği yerde. Tek bir kısa haftalık güncelleme güven inşa eder.',
    'Etkileşim sinyallerini izleyin. Oda etkinliğini, tekrarlanan katılımı ve katkı oranını takip edin. Sağlıklı bir topluluk, toplam boyutundan önce tekrarlanan katılım oranını büyütür — odaya geri dönen üyelere odaklanın. JoinOrigin’de organizatörler topluluklarının nasıl gittiğini tek bir düzenli oda ve akışta görebilir. Etkinliği, tekrarlanan katılımı ve katkı oranını basit bir tabloyla takip edin.',
    'Odada düzenli olarak geri bildirim isteyin. Her buluşmadan sonra basit bir tek soruluk anket kullanın: neyi beğendiniz, neyi değiştirirdiniz. Yanıtlara göre hareket edin ve topluluğa neyi değiştirdiğinizi söyleyin. JoinOrigin, geri bildirimi ait olduğu toplulukla birlikte — odada — toplar ve tutar. Her buluşmadan sonra tek soruluk bir anket işe yarar — ardından yanıtlara göre hareket edin.',
    'Topluluk olgunlaştıkça formatı uyarlayın. On üye için işe yarayan, elli üyeye uymayabilir. Formatı, mekanı ve sıklığı üç ayda bir gözden geçirin ve alışkanlıktan tutunmak yerine bilinçli olarak geliştirin. JoinOrigin toplulukların gelişmesine yardımcı olur — format değişikliklerinin ve duyuruların herkese ulaştığı tek bir oda. Formatınızı ve mekanınızı üç ayda bir bilinçli olarak gözden geçirin.',
  ],
  steps: [
    {
      title: 'Çekirdek bir ritüel tanımlayın',
      body: 'Herkesin güvenebileceği tek bir tekrarlanan uygulama seçin: aylık bir toplantı, haftalık bir kontrol, ortak bir okuma ya da bir proje güncellemesi. Ritüeller, bir topluluğu canlı tutan kalp atışını yaratır — ve dijital öncelikli bir toplulukta ritüel odada gerçekleşir.',
      joinOriginNote:
        'JoinOrigin’de bir topluluğun ritmi tek bir düzenli odada görünürdür — üyeler her zaman sonraki ritüeli bilir. Tek bir tekrarlanan uygulama seçin ve onu koruyun.',
    },
    {
      title: 'Odada ortak bir ürün oluşturun',
      body: 'Topluluğun ne yaptığını yakalayan sabitlenmiş bir not ya da doküman başlatın — toplantı notları, üye tanıtımları, proje güncellemeleri. Yaşayan bir ürün, üyeleri buluşmalar arasında yönlendirilmiş tutar.',
      joinOriginNote:
        'JoinOrigin, notların, tanıtımların ve güncellemelerin topluluğun yanında yaşadığı ortak odadır — tasarım gereği yaşayan bir ürün. Odada basit bir ortak doküman sabitleyin.',
    },
    {
      title: 'Organizatör yükünü dağıtın',
      body: 'İki ya da üç ortak ev sahibi ya da yardımcı bulun ve küçük rolleri dönüşümlü olarak yapın: karşılama, not alma, konu seçimi, mekan iletişimi. Paylaşılan sahiplik, tükenmeye karşı en iyi savunmadır.',
      joinOriginNote:
        'JoinOrigin topluluklara personel sağlamaz ya da onları yönetmez — paylaşılan sahipliği siz kurarsınız. Platform, yardımcılara ve organizatörlere koordinasyon için tek bir oda verir. İki ya da üç ortak ev sahibi bulun ve rolleri dönüşümlü yapın.',
    },
    {
      title: 'Küçük katkı yolları açın',
      body: 'Üyelere büyük taahhütler olmadan değer katmanın yollarını verin: bir üye vitrini, dönüşümlü bir tartışma lideri, ortak bir çalma ya da okuma listesi ya da odada sabitlenmiş bir “yardım aranıyor” bölümü.',
      joinOriginNote:
        'JoinOrigin’de üyelerin katkıda bulunmanın görünür yolları vardır — değer katmanın kolay olduğu bir topluluk. Üye vitrinleri ve dönüşümlü liderler aynı sahiplik hissini yaratır.',
    },
    {
      title: 'Odada öngörülebilir bir iletişim ritmi tutun',
      body: 'Haftada ya da ayda bir, sabit bir programla, odada yayınlanan ve akışa akan kısa bir güncelleme gönderin. Öngörülebilirlik güven inşa eder; sessizlik dağılma yaratır.',
      joinOriginNote:
        'JoinOrigin topluluğun kalp atışını tek bir odada tutar — tek bir güncelleme, bir program üzerinde, herkesin görebileceği yerde. Tek bir kısa haftalık güncelleme güven inşa eder.',
    },
    {
      title: 'Etkileşim sinyallerini izleyin',
      body: 'Oda etkinliğini, tekrarlanan katılımı ve katkı oranını takip edin. Sağlıklı bir topluluk, toplam boyutundan önce tekrarlanan katılım oranını büyütür — odaya geri dönen üyelere odaklanın.',
      joinOriginNote:
        'JoinOrigin’de organizatörler topluluklarının nasıl gittiğini tek bir düzenli oda ve akışta görebilir. Etkinliği, tekrarlanan katılımı ve katkı oranını basit bir tabloyla takip edin.',
    },
    {
      title: 'Odada düzenli olarak geri bildirim isteyin',
      body: 'Her buluşmadan sonra basit bir tek soruluk anket kullanın: neyi beğendiniz, neyi değiştirirdiniz. Yanıtlara göre hareket edin ve topluluğa neyi değiştirdiğinizi söyleyin.',
      joinOriginNote:
        'JoinOrigin, geri bildirimi ait olduğu toplulukla birlikte — odada — toplar ve tutar. Her buluşmadan sonra tek soruluk bir anket işe yarar — ardından yanıtlara göre hareket edin.',
    },
    {
      title: 'Topluluk olgunlaştıkça formatı uyarlayın',
      body: 'On üye için işe yarayan, elli üyeye uymayabilir. Formatı, mekanı ve sıklığı üç ayda bir gözden geçirin ve alışkanlıktan tutunmak yerine bilinçli olarak geliştirin.',
      joinOriginNote:
        'JoinOrigin toplulukların gelişmesine yardımcı olur — format değişikliklerinin ve duyuruların herkese ulaştığı tek bir oda. Formatınızı ve mekanınızı üç ayda bir bilinçli olarak gözden geçirin.',
    },
  ],
};

export default content;
