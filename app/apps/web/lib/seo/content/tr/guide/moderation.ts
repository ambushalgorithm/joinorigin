import type { GuideContent } from '../../types';

/**
 * "Topluluk Moderasyonu" — L1 kalıcı rehber (tasarım §6.1, TASK-326).
 *
 * Dijital bağlan→katıl→oda modeline göre yeniden odaklanmıştır: oluşturan
 * kişi kontrolü Matrix oda sahipliğidir — üyeleri davet et/çıkar, roller
 * ata, oda ayarlarını düzenle, mesajları sabitle, odayı arşivle — Element
 * içinde doğal olarak uygulanır. JoinOrigin değeri girişe ve her adıma
 * (adım başına `joinOriginNote`) işlenmiştir, dürüst çerçeveyle —
 * JoinOrigin üçüncü taraf toplulukları moderasyon etmez ya da moderasyon
 * personeli sağlamaz. Tek H1, adım adım yapı, SSS `FAQPage` JSON-LD ile
 * 1:1 yansıtılır. "Oda" Matrix odasına bağlıdır (§6.3) — özel/olay
 * alanları oda/DM olarak tanımlanır, asla "kanal" değil.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'moderation',
  title: 'Topluluk Moderasyonu: Gruplar Nasıl Sağlıklı ve Davetkâr Tutulur | JoinOrigin',
  description:
    'Net kurallar, erken müdahale ve yatıştırmayla bir topluluğu moderasyon edin — ister yepyeni bir grup kuruyor ister yerleşik bir topluluğun kültürünü düzeltiyor olun — oluşturan kişi kontrolü Matrix oda sahipliğidir, roller Element içinde uygulanır. JoinOrigin’den pratik adımlar.',
  intro: [
    'Büyüyen her topluluk eninde sonunda kültürünü test eden bir anla karşılaşır — hararetli bir tartışma, bir spam gönderici, başkalarını rahatsız eden bir üye ya da kontrolden çıkan bir yanlış anlama. Moderasyon, topluluğun davetkâr kalabilmesi için alanı koruma pratiğidir ve yalnızca topluluklar birbirine bağlanan insanlardan oluştuğu için gerekli hale gelir. Bu bağlanma, JoinOrigin’in yardımcı olduğu çekirdek sorundur — ve uygulamalar, kültürünü düzelten yerleşik bir topluluk için de ilk üye gelmeden önce beklentileri belirleyen yeni bir grup için de aynı şekilde geçerlidir.',
    'JoinOrigin, insanların toplulukları bulmasına, başlatmasına ve organize etmesine yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir — ve dijital modelinde bir topluluk, oluşturan kişinin kontrolündeki bir odada yaşar. Oluşturan kişi kontrolü standart Matrix oda sahipliğidir: oluşturan kişi üyeleri davet edip çıkarabilir, roller atayabilir, oda ayarlarını düzenleyebilir, mesajları sabitleyebilir ve odayı arşivleyebilir — tümü, özel bir izin sistemi olmadan, varsayılan sohbet istemcisi Element içinde doğal olarak uygulanır. Bu sahiplik, JoinOrigin’de moderasyonun bel kemiğidir: oluşturan kişi kimin ait olduğuna, kuralların ne olduğuna ve bir kural ihlal edildiğinde ne olacağına karar verir. JoinOrigin üçüncü taraf toplulukları moderasyon etmez ve moderasyon personeli sağlamaz. Platform sağlıklı topluluk yapısı etrafında tasarlanmıştır ve bu rehberdeki uygulamalar her organizatörün ihtiyaç duyduğu insani uygulamalardır.',
    'Bu rehber pratik bir moderasyon sistemi ortaya koyar — topluluğunuz yepyeni olsun ya da temizlenecek yıllarca geçmişi olsun: kısa ve spesifik yazılmış topluluk kuralları, çıkarmalardan önce uyarılarla net bir uygulama yolu, gergin durumları yatıştırma teknikleri ve üyeleri ne zaman dahil edeceğiniz, ne zaman yalnız hareket edeceğiniz konusunda dürüst tavsiyeler. Her adım JoinOrigin’in nerede yardımcı olduğunu gösterir.',
  ],
  dataPoints: [
    'Net, yazılı topluluk kuralları, olaylar olmadan önce beklentileri belirleyerek çatışmayı azaltır.',
    'JoinOrigin’de oluşturan kişi kontrolü Matrix oda sahipliğidir: davet/çıkar, roller, ayarlar, sabitle, arşivle.',
    'Aşamalı bir uygulama yolu — önce uyar, sonra sınırla, sonra çıkar — anında yasaklamalardan daha adil ve savunulması daha kolaydır.',
    'JoinOrigin, insanların toplulukları bulmasına, başlatmasına ve organize etmesine yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir; üçüncü taraf toplulukları moderasyon etmez ya da moderasyon personeli sağlamaz.',
  ],
  faq: [
    {
      question: 'Küçük topluluklar gerçekten moderasyon kurallarına ihtiyaç duyar mı?',
      answer:
        'Evet ve ne kadar erken olursa o kadar iyi. Bir çatışmadan önce yazılmış iki ya da üç kısa kural, bir çatışmadan sonra uydurulan kurallardan çok daha kolay uygulanır. Küçük topluluklarda daha az olay olur, ancak yaşadıkları olaylar aynı derecede acı vericidir.',
    },
    {
      question: 'Moderatörler açık mı yoksa özel olarak mı hareket etmeli?',
      answer:
        'Önce özel olarak. Birebir iletişime geçin, kuralı ve etkiyi yeniden belirtin ve kişiye uyum sağlama şansı verin. Herkese açık uyarılar genellikle tırmanışa neden olur. Kuralların herkese açık kaydını tutun, ancak onları özelde uygulayın — bir DM ya da özel bir odada.',
    },
    {
      question: 'Birini topluluktan ne zaman çıkarmalıyım?',
      answer:
        'Net uyarılar işe yaramadıktan sonra ya da üyeleri tehlikeye atan davranışlar — taciz, tehdit ya da ifşa — için hemen. Test, kişinin alanı başkaları için aktif olarak güvensiz hale getirip getirmediğidir. JoinOrigin’de çıkarma, oda sahibinin bir üyeyi odadan çıkarmasıdır.',
    },
    {
      question: 'JoinOrigin topluluğumu moderasyon etmeme yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin, oluşturan kişi kontrolünün Matrix oda sahipliği olduğu bir topluluk işletim sistemidir — Element içinde uygulanan davet/çıkar, roller, ayarlar, sabitle ve arşivle. JoinOrigin toplulukları moderasyon etmez, bu nedenle bu rehberdeki uygulamalar — net kurallar, aşamalı uygulama, sakin yatıştırma — sizin uygulamanız içindir.',
    },
  ],
  sections: [
    'Üç ila beş net kural yazın. Onları kısa, spesifik ve olumlu tutun: "Saygılı olun", "Konu dışına çıkmayın", "Spam ya da kendi tanıtımınızı yapmayın", "Fikirlere katılmayın, insanlara değil". Onları her yeni üyenin göreceği yere yayınlayın — ideal olarak odada sabitlenmiş olarak. JoinOrigin’de bir topluluğun kuralları ve değerleri ilk günden itibaren odasında görünürdür — yeni üyeler katılmadan önce onları görür. Kısa kurallarınızı her yeni üyenin göreceği yere sabitleyin.',
    'Oda sahibi olarak tonu belirleyin. İstediğiniz davranışı modelleyin — yeni gelenleri karşılayın, katkıda bulunanlara teşekkür edin ve sorunları sakin şekilde ele alın. Oluşturan kişinin örneği, topluluğun kültürel tabanını belirler. JoinOrigin toplulukları denetlemez — tonu oluşturan kişiler ve üyeler belirler. Platform, karşılayıcı davranışı görünür kılar; odada istediğiniz davranışı modelleyin.',
    'Odaya sahip olduğunuz oluşturan kişi gibi sahip olun. JoinOrigin’de oluşturan kişi kontrolü Matrix oda sahipliğidir: üyeleri davet edin ve çıkarın, roller atayın, oda ayarlarını düzenleyin, mesajları sabitleyin ve odayı arşivleyin — Element içinde doğal olarak uygulanır. Bu kontrolleri bilmek, moderasyonun teknik yarısıdır. JoinOrigin, yayından itibaren oluşturan kişiye odanın tam sahipliğini, özel bir izin sistemi olmadan verir. Kullandığınız platformun moderasyon kontrollerini öğrenin ve tek bir net sahip belirleyin.',
    'Bir uygulama yolu üzerinde anlaşın. Aşamalı bir yanıt tanımlayın: önce özel uyarı, sonra sınırlamalar (susturulmuş, sınırlı gönderim — genellikle bir rol değişikliği), sonra tekrarlanan ya da ciddi ihlaller için çıkarma. Tutarlı tırmanış, doğaçlamadan daha adildir. JoinOrigin’de roller, Element’teki standart Matrix rolleridir — susturma, yasaklama ve rol atama doğal eylemlerdir. Uygulama yolunu yazın ve ona bağlı kalın.',
    'Erken ve sakin hareket edin. Bir sorunun ilk işaretini, herkese açık bir olaya dönüşmeden önce özel olarak ele alın. Erken, sakin müdahale, var olan en ucuz moderasyondur. JoinOrigin sizin yerinize moderasyon yapmaz — erken, sakin müdahale insani bir beceridir. Platform, sorunların odada görünür şekilde ortaya çıkması ve erken yakalanması için tasarlanmıştır. İlk işarette özel olarak iletişime geçin.',
    'Yatıştırma teknikleri öğrenin. Gerginlik yükseldiğinde sohbeti yavaşlatın: duyguyu kabul edin, anlaşmazlığı tarafsız şekilde yeniden belirtin, altta yatan noktayı sorun ve hararet için bir ara ya da özel bir oda önerin. JoinOrigin topluluk etkileşimlerini tasarım gereği düzenli ve sakin tutar, ancak yatıştırma insani bir zanaat olarak kalır. Sohbeti yavaşlatın ve harareti özel bir odaya taşıyın.',
    'Önemli olayların kaydını tutun. Ne olduğunu, ne yaptığınızı ve nedenini not edin. Basit bir günlük, tutarlı kalmanıza, kalıplardan öğrenmenize ve bir üye neden diye sorduğunda kararları savunmanıza yardımcı olur. JoinOrigin, topluluğun geçmişinin tek bir yerde yaşadığı bir topluluk işletim sistemidir — bir olay günlüğü için doğal bir yuva. Ne olduğunun ve nedeninin basit bir notu sizi tutarlı tutar.',
    'Yükü ortak moderatörlerle paylaşın. Güvendiğiniz bir ya da iki üye bulun ve uygulama kuralları üzerinde anlaşın. Tek bir moderatöre bağımlı bir topluluk kırılgan ve yanlı olur. JoinOrigin moderasyon personeli sağlamaz — ortak moderatörler diğer üyelerdir. Oluşturan kişiler, Element’te ortak moderatörlere roller atar — özel bir sistem olmadan doğal Matrix rolleri. Güvendiğiniz bir ya da iki üye bulun ve onlara net roller verin.',
  ],
  steps: [
    {
      title: 'Üç ila beş net kural yazın',
      body: 'Onları kısa, spesifik ve olumlu tutun: "Saygılı olun", "Konu dışına çıkmayın", "Spam ya da kendi tanıtımınızı yapmayın", "Fikirlere katılmayın, insanlara değil". Onları her yeni üyenin göreceği yere yayınlayın — ideal olarak odada sabitlenmiş olarak.',
      joinOriginNote:
        'JoinOrigin’de bir topluluğun kuralları ve değerleri ilk günden itibaren odasında görünürdür — yeni üyeler katılmadan önce onları görür. Kısa kurallarınızı her yeni üyenin göreceği yere sabitleyin.',
    },
    {
      title: 'Oda sahibi olarak tonu belirleyin',
      body: 'İstediğiniz davranışı modelleyin — yeni gelenleri karşılayın, katkıda bulunanlara teşekkür edin ve sorunları sakin şekilde ele alın. Oluşturan kişinin örneği, topluluğun kültürel tabanını belirler.',
      joinOriginNote:
        'JoinOrigin toplulukları denetlemez — tonu oluşturan kişiler ve üyeler belirler. Platform, karşılayıcı davranışı görünür kılar; odada istediğiniz davranışı modelleyin.',
    },
    {
      title: 'Odaya sahip olduğunuz oluşturan kişi gibi sahip olun',
      body: 'JoinOrigin’de oluşturan kişi kontrolü Matrix oda sahipliğidir: üyeleri davet edin ve çıkarın, roller atayın, oda ayarlarını düzenleyin, mesajları sabitleyin ve odayı arşivleyin — Element içinde doğal olarak uygulanır. Bu kontrolleri bilmek, moderasyonun teknik yarısıdır.',
      joinOriginNote:
        'JoinOrigin, yayından itibaren oluşturan kişiye odanın tam sahipliğini, özel bir izin sistemi olmadan verir. Kullandığınız platformun moderasyon kontrollerini öğrenin ve tek bir net sahip belirleyin.',
    },
    {
      title: 'Bir uygulama yolu üzerinde anlaşın',
      body: 'Aşamalı bir yanıt tanımlayın: önce özel uyarı, sonra sınırlamalar (susturulmuş, sınırlı gönderim — genellikle bir rol değişikliği), sonra tekrarlanan ya da ciddi ihlaller için çıkarma. Tutarlı tırmanış, doğaçlamadan daha adildir.',
      joinOriginNote:
        'JoinOrigin’de roller, Element’teki standart Matrix rolleridir — susturma, yasaklama ve rol atama doğal eylemlerdir. Uygulama yolunu yazın ve ona bağlı kalın.',
    },
    {
      title: 'Erken ve sakin hareket edin',
      body: 'Bir sorunun ilk işaretini, herkese açık bir olaya dönüşmeden önce özel olarak ele alın. Erken, sakin müdahale, var olan en ucuz moderasyondur.',
      joinOriginNote:
        'JoinOrigin sizin yerinize moderasyon yapmaz — erken, sakin müdahale insani bir beceridir. Platform, sorunların odada görünür şekilde ortaya çıkması ve erken yakalanması için tasarlanmıştır. İlk işarette özel olarak iletişime geçin.',
    },
    {
      title: 'Yatıştırma teknikleri öğrenin',
      body: 'Gerginlik yükseldiğinde sohbeti yavaşlatın: duyguyu kabul edin, anlaşmazlığı tarafsız şekilde yeniden belirtin, altta yatan noktayı sorun ve hararet için bir ara ya da özel bir oda önerin.',
      joinOriginNote:
        'JoinOrigin topluluk etkileşimlerini tasarım gereği düzenli ve sakin tutar, ancak yatıştırma insani bir zanaat olarak kalır. Sohbeti yavaşlatın ve harareti özel bir odaya taşıyın.',
    },
    {
      title: 'Önemli olayların kaydını tutun',
      body: 'Ne olduğunu, ne yaptığınızı ve nedenini not edin. Basit bir günlük, tutarlı kalmanıza, kalıplardan öğrenmenize ve bir üye neden diye sorduğunda kararları savunmanıza yardımcı olur.',
      joinOriginNote:
        'JoinOrigin, topluluğun geçmişinin tek bir yerde yaşadığı bir topluluk işletim sistemidir — bir olay günlüğü için doğal bir yuva. Ne olduğunun ve nedeninin basit bir notu sizi tutarlı tutar.',
    },
    {
      title: 'Yükü ortak moderatörlerle paylaşın',
      body: 'Güvendiğiniz bir ya da iki üye bulun ve uygulama kuralları üzerinde anlaşın. Tek bir moderatöre bağımlı bir topluluk kırılgan ve yanlı olur.',
      joinOriginNote:
        'JoinOrigin moderasyon personeli sağlamaz — ortak moderatörler diğer üyelerdir. Oluşturan kişiler, Element’te ortak moderatörlere roller atar — özel bir sistem olmadan doğal Matrix rolleri. Güvendiğiniz bir ya da iki üye bulun ve onlara net roller verin.',
    },
  ],
};

export default content;
