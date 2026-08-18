import type { GuideContent } from '../../types';

/**
 * "Bir Kurucu Ortak Nasıl Bulunur" — L1 kalıcı rehber (tasarım §6.1, TASK-326).
 *
 * Dijital bağlan→katıl→oda modeline göre yeniden odaklanmıştır: bir fikir
 * sayfası yayınlanır, odası otomatik oluşturulur ve kurucu ortak
 * sohbetleri o odada yaşanır — adayların fikri bulabildiği, soru
 * sorabildiği ve birlikte çalışabildiği dijital yer. JoinOrigin değeri
 * girişe ve her adıma (adım başına `joinOriginNote`) işlenmiştir, dürüst
 * çerçeveyle — JoinOrigin bir eşleştirme hizmeti değildir ve kurucuları
 * eşleştirmez. Tek H1, adım adım yapı, SSS `FAQPage` JSON-LD ile 1:1
 * yansıtılır. "Oda" Matrix odasına bağlıdır (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'find-a-co-founder',
  title: 'Bir Kurucu Ortak Nasıl Bulunur: Nereden Bakmalı ve Ne Sormalı | JoinOrigin',
  description:
    'Becerilerinizi tamamlayan bir kurucu ortak bulun — ister yeni bir girişim başlatıyor ister mevcut bir işi büyütüyor olun — bir fikir sayfası yayınlayın, topluluklarda ve odalarında buluşun, bir deneme projesi yürütün ve ayrılıkları önleyen soruları sorun. JoinOrigin’den.',
  intro: [
    'Kurucu ortak bulmak, işe alım kararı kılığına girmiş bir ilişki kararıdır ve özünde bir başka insanları bağlama sorunudur: doğru kişi genellikle henüz keşfetmediğiniz bir toplulukta, bir sıcak tanıştırma uzağındadır. JoinOrigin’in yardımcı olduğu sorun budur — ve hâlâ fikir aşamasında olsanız da sonraki adımı atmak için bir ortak gerektiren mevcut bir şirketi işletiyor olsanız da aynı sorundur.',
    'JoinOrigin, dijital bağlan→katıl→oda döngüsü etrafında kurulmuş bir topluluk işletim sistemidir: bir fikir yayınlarsınız, odası otomatik oluşturulur ve fikri paylaşan insanlar o odaya katılıp konuşabilir. Fikir sayfası herkese açık vaattir ve oda, kurucu ortak sohbetlerinin gerçekten yaşandığı yerdir — ilgili insanların kimse bağlanmadan önce soru sorabildiği, not paylaşabildiği ve uyumu test edebildiği, oluşturan kişinin kontrolündeki bir Matrix odası. JoinOrigin bir eşleştirme hizmeti değildir, kurucuları eşleştirmez ve yerel ofisleri yoktur. Platformun değeri — insanları ortak ilgi alanları etrafında bağlamak — çoğu kurucunun kurucu ortağını gerçekte nasıl bulduğuyla doğrudan örtüşür: topluluklar, odalar ve sıcak tanıştırmalar aracılığıyla.',
    'Bu rehber aramaya bir topluluk kurmaya yaklaşır gibi yaklaşır: mevcut ağınızdan başlayın, insanların bulabileceği bir fikir yayınlayın, topluluklar ve odaları aracılığıyla bilinçli şekilde genişleyin, adayları yapılandırılmış sohbetlerle ve bir deneme projesiyle değerlendirin ve hiçbir şeye yasal olarak bağlanmadan önce temel konularda anlaşın. Adımlar pratik ve dürüsttür ve her biri JoinOrigin’in nerede yardımcı olduğunu gösterir.',
  ],
  dataPoints: [
    'Sıcak tanıştırmalar ve ortak çalışma, en kalıcı kurucu ortak ilişkilerini üretir.',
    'Odası olan yayınlanmış bir fikir sayfası, ilgili insanlara fikri bulup sohbet başlatabilecekleri gerçek bir yer verir.',
    'Kısa bir deneme projesi — bir prototip, bir açılış sayfası ya da ücretli bir pilot — çalışma tarzlarını mülakatlardan daha hızlı test eder.',
    'JoinOrigin, insanların toplulukları ve iş birliği yapanları bulmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir; bir eşleştirme hizmeti değildir ve yerel ofisleri yoktur.',
  ],
  faq: [
    {
      question: 'Çoğu insan kurucu ortağını nerede bulur?',
      answer:
        'Çoğu kurucu sıcak ağlar aracılığıyla tanışır — etkinlikler, topluluklar, odalar ve güvendikleri insanlardan gelen tanıştırmalar. İnsanların bulabileceği bir fikir yayınlamak, ardından aynı topluluklarda ve odalarında tutarlı şekilde görünmek, potansiyel kurucu ortaklarla tanışmanın en güvenilir yoludur.',
    },
    {
      question: 'Birinin iyi bir kurucu ortak uyumu olduğunu nasıl anlarım?',
      answer:
        'Birlikte küçük bir deneme projesi yürütün ve üç şeye dikkat edin: tamamlayıcı beceriler, benzer risk toleransı ve baskı altında dürüst iletişim. Deneme projesi üçünü de herhangi bir sohbetten daha hızlı ortaya çıkarır.',
    },
    {
      question: 'Başlamadan önce nelerde anlaşmalıyız?',
      answer:
        'Roller, zaman taahhüdü, hisse dağılımı, hak ediş (vesting), karar alma ve biri ayrılmak isterse ne olacağı hakkında konuşun. Bunları erkenden masaya koymak, çoğu erken ekibi yok eden anlaşmazlıkları önler.',
    },
    {
      question: 'JoinOrigin bir kurucu ortak bulmama yardımcı olabilir mi?',
      answer:
        'JoinOrigin, insanların toplulukları ve iş birliği yapanları bulmasına yardımcı olur — kurucuların buluştuğu türdeki topluluklar dahil — sohbetlerin yaşanabileceği bir fikir sayfası ve bir odayla. JoinOrigin kurucuları eşleştirmez, bu nedenle bu rehberdeki ağ kurma ve deneme projesi adımları en güvenilir yolunuzdur.',
    },
  ],
  sections: [
    'Önce beceri boşluklarınızı haritalayın. Gerçekten iyi olduğunuz şeyleri ve girişimin sizde olmayan ihtiyaçlarını yazın. Bir kurucu ortak en büyük boşluğunuzu kapatmalıdır — teknik, ticari ya da operasyonel — güçlü yanlarınızı tekrarlamamalıdır. JoinOrigin eşleştirme değil, profiller, fikirler ve topluluklar etrafında kurulmuştur — bu yüzden dürüst tavsiye her zamanki gibidir: bakmadan önce hangi boşluğu kapatmanız gerektiğini bilin. Güçlü yanlarınızı ve girişimin ihtiyaçlarını yazın.',
    'Fikrinizi yayınlayın ve odasını açın. Kimsenin bulamadığı bir fikir kurucu ortak çekmez. Net bir fikir sayfası yayınlayın — ne inşa ettiğiniz, neden ve ihtiyacınız olan kişi türü — ve odasının otomatik oluşturulmasına izin verin, böylece ilgili insanların konuşacak bir yeri olur. JoinOrigin’de bir fikri yayınlamak odasını otomatik oluşturur — kurucu ortak sohbetlerinin yaşandığı yer. Fikrinizi herkese açık bir yerde yayınlayın ve etrafında tartışma için bir oda açın.',
    'Sıcak tanıştırmalar için mevcut ağınızı çalıştırın. Güvendiğiniz beş kişiye ne inşa ettiğinizi ve ne tür bir kurucu ortağa ihtiyacınız olduğunu söyleyin. Her birinden tek bir isim isteyin. Sıcak tanıştırmalar, soğuk erişimden neredeyse her durumda daha iyidir. JoinOrigin toplulukları bulunabilir kılar, bu da sıcak ağınızı zamanla genişletir — ve her tanıştırma, gerçek sohbetin yaşandığı bir odaya götürebilir. Güvendiğiniz beş kişiye tam olarak ne tür bir kurucu ortağa ihtiyacınız olduğunu söyleyin.',
    'İlgili topluluklarda ve odalarında tutarlı şekilde görünün. Doğru türden insanların toplandığı etkinliklere katılın ve gruplara üye olun: kurucu buluşmaları, sektör toplulukları, ortak çalışma alanları ve çevrimiçi odalar. Tekrar, tanıştırmalara götüren güveni inşa eder. JoinOrigin, insanların hedeflerine uyan toplulukları — kurucuların buluştuğu türde yerleri — bulmasına ve odalarına katılmasına yardımcı olur. Doğru insanların zaten toplandığı buluşmaları ve odaları seçin ve görünmeye devam edin.',
    'Yapılandırılmış ilk sohbetler yapın. Becerilerini, risk toleranslarını, zaman taahhütlerini ve neden bir şey başlatmak ya da büyütmek istediklerini sorun. Kendi yanıtlarınızı paylaşın. Bu karşılıklı bir mülakattır, bir sunum değil. JoinOrigin kurucuları eşleştirmez ya da sohbetleri yürütmez — karşılıklı mülakat sizindir. Platform sizi potansiyel iş birliği yapanlarla aynı topluluklara ve odalara koyar — gerisi size kalmıştır.',
    'Birlikte bir deneme projesi yürütün. Küçük ve gerçek bir şey seçin — bir prototip, bir açılış sayfası ya da ücretli bir pilot — ve dört ila altı hafta üzerinde çalışın. İşi nasıl böldüğünüzü, geri bildirimi nasıl ele aldığınızı ve baskı altında nasıl davrandığınızı izleyin. JoinOrigin, topluluklara işleri ve projeleri için ortak bir oda verir — bir deneme projesinin ortaya çıkması için doğal bir yer. Küçük, gerçek bir prototip en güvenilir testtir.',
    'Potansiyele göre değil, denemeye göre karar verin. Bu kişiye itibarınızı emanet edip etmeyeceğinizi, dürüst iletişim kurup kurmadığını karşı ve birlikte çalışmanın sizi enerjilendirip enerjilendirmediğini sorun. Deneme zorlayıcı geldiyse o sinyale güvenin. JoinOrigin kararı sizin yerinize vermez. Dürüst değeri, adaylarla tanışıp çalışmanızı sağlayan topluluk ve oda bağlamıdır — gerçeği yine de deneme söyler.',
    'Bağlanmadan önce temel konularda anlaşın. Rolleri, zaman taahhüdünü, hisse dağılımını, hak edişi ve karar alma kurallarını yazın. Tek sayfalık basit bir anlaşma bile çoğu erken yanlış anlaşılmayı önler. JoinOrigin bir topluluk işletim sistemidir — anlaşmaların, rollerin ve proje notlarının fikir odasının yanında yaşayabileceği tek bir düzenli alan. Tek sayfalık yazılı bir anlaşma bile çoğu erken yanlış anlaşılmayı önler.',
  ],
  steps: [
    {
      title: 'Önce beceri boşluklarınızı haritalayın',
      body: 'Gerçekten iyi olduğunuz şeyleri ve girişimin sizde olmayan ihtiyaçlarını yazın. Bir kurucu ortak en büyük boşluğunuzu kapatmalıdır — teknik, ticari ya da operasyonel — güçlü yanlarınızı tekrarlamamalıdır.',
      joinOriginNote:
        'JoinOrigin eşleştirme değil, profiller, fikirler ve topluluklar etrafında kurulmuştur — bu yüzden dürüst tavsiye her zamanki gibidir: bakmadan önce hangi boşluğu kapatmanız gerektiğini bilin. Güçlü yanlarınızı ve girişimin ihtiyaçlarını yazın.',
    },
    {
      title: 'Fikrinizi yayınlayın ve odasını açın',
      body: 'Kimsenin bulamadığı bir fikir kurucu ortak çekmez. Net bir fikir sayfası yayınlayın — ne inşa ettiğiniz, neden ve ihtiyacınız olan kişi türü — ve odasının otomatik oluşturulmasına izin verin, böylece ilgili insanların konuşacak bir yeri olur.',
      joinOriginNote:
        'JoinOrigin’de bir fikri yayınlamak odasını otomatik oluşturur — kurucu ortak sohbetlerinin yaşandığı yer. Fikrinizi herkese açık bir yerde yayınlayın ve etrafında tartışma için bir oda açın.',
    },
    {
      title: 'Sıcak tanıştırmalar için mevcut ağınızı çalıştırın',
      body: 'Güvendiğiniz beş kişiye ne inşa ettiğinizi ve ne tür bir kurucu ortağa ihtiyacınız olduğunu söyleyin. Her birinden tek bir isim isteyin. Sıcak tanıştırmalar, soğuk erişimden neredeyse her durumda daha iyidir.',
      joinOriginNote:
        'JoinOrigin toplulukları bulunabilir kılar, bu da sıcak ağınızı zamanla genişletir — ve her tanıştırma, gerçek sohbetin yaşandığı bir odaya götürebilir. Güvendiğiniz beş kişiye tam olarak ne tür bir kurucu ortağa ihtiyacınız olduğunu söyleyin.',
    },
    {
      title: 'İlgili topluluklarda ve odalarında tutarlı şekilde görünün',
      body: 'Doğru türden insanların toplandığı etkinliklere katılın ve gruplara üye olun: kurucu buluşmaları, sektör toplulukları, ortak çalışma alanları ve çevrimiçi odalar. Tekrar, tanıştırmalara götüren güveni inşa eder.',
      joinOriginNote:
        'JoinOrigin, insanların hedeflerine uyan toplulukları — kurucuların buluştuğu türde yerleri — bulmasına ve odalarına katılmasına yardımcı olur. Doğru insanların zaten toplandığı buluşmaları ve odaları seçin ve görünmeye devam edin.',
    },
    {
      title: 'Yapılandırılmış ilk sohbetler yapın',
      body: 'Becerilerini, risk toleranslarını, zaman taahhütlerini ve neden bir şey başlatmak ya da büyütmek istediklerini sorun. Kendi yanıtlarınızı paylaşın. Bu karşılıklı bir mülakattır, bir sunum değil.',
      joinOriginNote:
        'JoinOrigin kurucuları eşleştirmez ya da sohbetleri yürütmez — karşılıklı mülakat sizindir. Platform sizi potansiyel iş birliği yapanlarla aynı topluluklara ve odalara koyar — gerisi size kalmıştır.',
    },
    {
      title: 'Birlikte bir deneme projesi yürütün',
      body: 'Küçük ve gerçek bir şey seçin — bir prototip, bir açılış sayfası ya da ücretli bir pilot — ve dört ila altı hafta üzerinde çalışın. İşi nasıl böldüğünüzü, geri bildirimi nasıl ele aldığınızı ve baskı altında nasıl davrandığınızı izleyin.',
      joinOriginNote:
        'JoinOrigin, topluluklara işleri ve projeleri için ortak bir oda verir — bir deneme projesinin ortaya çıkması için doğal bir yer. Küçük, gerçek bir prototip en güvenilir testtir.',
    },
    {
      title: 'Potansiyele göre değil, denemeye göre karar verin',
      body: 'Bu kişiye itibarınızı emanet edip etmeyeceğinizi, dürüst iletişim kurup kurmadığını ve birlikte çalışmanın sizi enerjilendirip enerjilendirmediğini sorun. Deneme zorlayıcı geldiyse o sinyale güvenin.',
      joinOriginNote:
        'JoinOrigin kararı sizin yerinize vermez. Dürüst değeri, adaylarla tanışıp çalışmanızı sağlayan topluluk ve oda bağlamıdır — gerçeği yine de deneme söyler.',
    },
    {
      title: 'Bağlanmadan önce temel konularda anlaşın',
      body: 'Rolleri, zaman taahhüdünü, hisse dağılımını, hak edişi ve karar alma kurallarını yazın. Tek sayfalık basit bir anlaşma bile çoğu erken yanlış anlaşılmayı önler.',
      joinOriginNote:
        'JoinOrigin bir topluluk işletim sistemidir — anlaşmaların, rollerin ve proje notlarının fikir odasının yanında yaşayabileceği tek bir düzenli alan. Tek sayfalık yazılı bir anlaşma bile çoğu erken yanlış anlaşılmayı önler.',
    },
  ],
};

export default content;
