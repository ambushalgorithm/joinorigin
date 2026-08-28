import type { GuideContent } from '../../types';

/**
 * "Bir Buluşma Nasıl Düzenlenir" — L1 kalıcı rehber (tasarım §6.1, TASK-326).
 *
 * Yeniden odaklanmıştır: buluşmalar bir grubun OLUŞTUKTAN SONRA yaptığı
 * şeydir — önce dijital bağlan→katıl→oda yolu gelir (grubu yayınla → oda
 * otomatik oluşturulur → üyeler bağlantıyla katılır) ve yüz yüze buluşma
 * aşağı yönlü bir sonuçtur. JoinOrigin değeri girişe ve her adıma (adım
 * başına `joinOriginNote`) işlenmiştir, dürüst çerçeveyle — JoinOrigin
 * mekan ayırtmaz ya da etkinliklere personel sağlamaz. Tek H1, adım adım
 * yapı, SSS `FAQPage` JSON-LD ile 1:1 yansıtılır. "Oda" Matrix odasına
 * bağlıdır (§6.3) — fiziksel mekanlar mekan/alan olarak tanımlanır, asla
 * "oda" değil.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'organize-a-meetup',
  title: 'Bir Buluşma Nasıl Düzenlenir: Mekanlar, Gündem ve Tanıtım | JoinOrigin',
  description:
    'Grubunuz oluştuktan sonra bir buluşma düzenleyin — ister geçen ay kurulmuş ister yıllardır buluşuyor olsun — bir format seçin, mekan ayırtın, gündem kurun, tanıtım yapın ve geceyi yönetin. JoinOrigin’den pratik bir kontrol listesi.',
  intro: [
    'Bir buluşma, insanların ortak bir ilgi etrafında toplandığı tekrarlanan yüz yüze bir etkinliktir — ve JoinOrigin’de odada iletişim kurduktan sonra doğal bir sonraki adımdır. Önce dijital yol gelir: insanlar bir grubu bir bağlantıyla bulur ve katılır ve grubun odası, üyelerin buluşmalar arasında konuştuğu, planladığı ve bağlı kaldığı yer haline gelir. Yüz yüze buluşma, o oluşmuş topluluğun sonraki adımıdır — grup geçen ay kurulmuş olsun ya da yıllardır resmi olmayan şekilde buluşuyor olsun, oda ona bir buluşmanın büyüyebileceği tek bir düzenli yuva verir.',
    'JoinOrigin, insanların katılacak toplulukları bulmasına ve kendi topluluklarını başlatmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir — böylece bir buluşmanın, ilgili üyelerin grubu keşfedebildiği, odasına katılabildiği ve buluşmayı tek bir kişinin iletişim listesine bağımlı olmadan koordine edebildiği bir yuvası vardır. JoinOrigin mekan ayırtmaz ya da etkinliklere personel sağlamaz — platformun tüm amacı, ortak bir ilgiyi paylaşan insanları bağlamaktır ve buluşmanın kendisini yürütmek sizindir.',
    'Bu rehber, grup var olduktan sonra bir buluşmanın tüm yaşam döngüsünü kapsar — yeni kurulmuş bir grup için ve yıllardır toplanan bir grup için: hedef kitlenize uyan bir format seçmek, bütçeyi zorlamadan bir mekan bulup ayırtmak, net bir başlangıç ve bitişle bir gündem kurmak, etkinliği hedef kitlenizin gerçekten baktığı yerlerde tanıtmak ve geceyi katılımcılar bir sonrakini isteyecek şekilde yönetmek. Her adım, JoinOrigin’in nasıl yardımcı olduğuna dair bir not içerir — ve ilk adım dijital grupla ilgilidir, çünkü bir grup ve odası olmadan buluşacak bir Origin yoktur.',
  ],
  dataPoints: [
    'Basit bir buluşma yalnızca üç şeye ihtiyaç duyar: bir format, bir mekan ve bir tanıtım kanalı.',
    'Hafta içi akşam buluşmaları ve hafta sonu sabah oturumları en yaygın tekrarlanan formatlardır.',
    'Çoğu mekan — kütüphaneler, kafeler, ortak çalışma alanları — topluluk etkinlikleri için ücretsiz ya da düşük maliyetli alanlar sunar.',
    'JoinOrigin, insanların toplulukları bulmasına veya başlatmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir; mekan ayırtmaz ya da etkinliklere personel sağlamaz.',
  ],
  faq: [
    {
      question: 'Bir buluşmayı ne kadar önceden tanıtmalıyım?',
      answer:
        'İki ila üç hafta iyi bir dengedir: insanların plan yapması için yeterince erken, aciliyeti korumak için yeterince kısa. Önce grubun odasında duyurun, ardından etkinliği hedef kitlenizin toplandığı yerlerde paylaşın. Etkinlikten iki gün önce ve etkinlik günü bir hatırlatma gönderin.',
    },
    {
      question: 'Ya yalnızca birkaç kişi gelirse?',
      answer:
        'Bu normaldir, özellikle erken dönemde. Orada olanlar için oturumu yürütün, geri bildirimlerini odada toplayın ve tanıtımı iyileştirmek için bir sonraki sayıyı kullanın. Tutarlılık, tek bir katılımdan daha önemlidir.',
    },
    {
      question: 'Buluşmalar resmi bir gündem gerektirir mi?',
      answer:
        'Evet, hafif bir tane. Net bir başlangıç, kısa bir tanışma turu, bir ana etkinlik ya da konuşma ve tanımlanmış bir bitiş zamanı, katılımcıların zamanlarına saygı duyulduğunu hissetmesini sağlar — onları geri getiren şey budur.',
    },
    {
      question: 'JoinOrigin buluşmalar düzenlememe yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin, insanların Origins bulmasına ve başlatmasına yardımcı olur — bir grubun odasının üyelerin koordine olduğu ve bir buluşmanın keşfedilebildiği tek bir düzenli dijital yuva. JoinOrigin etkinlikleri kendisi organize etmez, bu nedenle bu rehberdeki pratik adımları yürütmek sizindir.',
    },
  ],
  sections: [
    'Önce grubu oluşturun ve odasını açın. Bir buluşma, bir grubun oluştuktan sonra yaptığı şeydir — bu yüzden dijital çekirdekle başlayın: grubu yayınlayın, odasının otomatik oluşturulmasına izin verin ve üyeleri bir bağlantıyla davet edin. JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — üyelerin planladığı ve bağlı kaldığı, oluşturan kişinin kontrolündeki bir alan. İsterseniz tek bir etkinlik planlamadan önce grubunuzu ve odasını hâlihazırda kullandığınız araçlarda kurun.',
    'Hedef kitlenize uyan bir format seçin. Bir konuşma, bir atölye, bir tartışma çemberi, sosyal bir tanışma ya da bir çalışma oturumu arasında karar verin. Formatı hedef kitlenin istediği şeye uydurun — öğrenme, bağlantı ya da ortak işte ilerleme. JoinOrigin’de üyeler katılmadan önce bir topluluğun formatını görebilir — bu da doğru insanları çeker ve beklentileri belirler. Hedef kitlenizin gerçekten katılacağı bir format seçin.',
    'Bir tarih ve sıklık seçin. Hafta içi akşamlar ve hafta sonu sabahları çoğu kitle için en iyi sonucu verir. Tekrarlanan bir zaman dilimi seçin — aylık standarttır — ve insanların alışkanlık edinebilmesi için ona bir randevu gibi sahip çıkın. JoinOrigin, bir topluluğun ritmini tek bir yerde görünür kılar, böylece üyeler sonraki tarihi aramak zorunda kalmadan bilir. Tekrarlanan zaman diliminize bir randevu gibi sahip çıkın.',
    'Mekanı erkenden ayırtın. Kütüphaneler, kafeler, ortak çalışma salonları, toplum merkezleri ve parklar topluluk etkinliklerine düşük ya da sıfır maliyetle ev sahipliği yapar. Kapasiteyi, açılış saatlerini ve varsa rezervasyon gereksinimlerini yazılı olarak doğrulayın. JoinOrigin mekan ayırtmaz ya da fiziksel alanları koordine etmez — tasarım odağı, insanları dijital odada bağlamaktır. Kapasiteyi ve açılış saatlerini doğrudan mekanla yazılı olarak doğrulayın.',
    'Hafif bir gündem taslağı hazırlayın. Basit tutun: karşılama ve tanışma, ana etkinlik, açık tartışma, kapanış ve sonraki tarih. Toplam 60–90 dakika tahmin edin ve gündemi etkinlik listesiyle ve odada yayınlayın. JoinOrigin, gündem ve notlar gibi ortak ürünlerin topluluğun yanında yaşadığı bir topluluk işletim sistemidir. Basit, yayınlanmış bir gündem işi görür.',
    'Hedef kitlenizin zaten olduğu yerde tanıtım yapın. Etkinliği niş gruplarda, yerel bültenlerde, topluluk panolarında ve ilgili sosyal kanallarda paylaşın — ve herkesi grubun katılım bağlantısına yönlendirin, böylece katılımcılar tek gecelik misafir değil üye olur. JoinOrigin, bir Origin arayan insanların onu bulup bir bağlantıyla katıldığı yerdir. Hedef kitlenizin zaten toplandığı niş gruplarda ve bültenlerde tanıtım yapın ve katılım bağlantısını her katılımcıyla paylaşın.',
    'Geceyi net bir ritimle yönetin. Zamanında başlayın, geç gelenleri selamlayın, ana etkinliği rayında tutun ve sonraki tarihi duyurarak kapatın. Zamanında bitirin — saygının en güçlü sinyalidir. JoinOrigin etkinliklere personel sağlamaz — deneyim sizindir. Platform, topluluğun hikayesini tek bir düzenli odada tutar — vaat, ritim ve insanlar. Zamanında bitirmek saygının en güçlü sinyalidir.',
    '24 saat içinde odada takip yapın. Katılımcılara teşekkür edin, bağlantıları ya da notları paylaşın ve geri bildirimi tüm grubun görebileceği yerde isteyin. Takip, tek bir etkinliği tekrarlanan bir topluluğa dönüştüren şeydir. JoinOrigin, bir topluluğa özetin, sonraki tarihin ve geri bildirimin yaşadığı kalıcı bir oda verir — tek bir etkinliği tekrarlanan bir topluluğa dönüştürür. Keşfedilin ve ivmeyi sürdürün.',
  ],
  steps: [
    {
      title: 'Önce grubu oluşturun ve odasını açın',
      body: 'Bir buluşma, bir grubun oluştuktan sonra yaptığı şeydir — bu yüzden dijital çekirdekle başlayın: grubu yayınlayın, odasının otomatik oluşturulmasına izin verin ve üyeleri bir bağlantıyla davet edin.',
      joinOriginNote:
        'JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — üyelerin planladığı ve bağlı kaldığı, oluşturan kişinin kontrolündeki bir alan. İsterseniz tek bir etkinlik planlamadan önce grubunuzu ve odasını hâlihazırda kullandığınız araçlarda kurun.',
    },
    {
      title: 'Hedef kitlenize uyan bir format seçin',
      body: 'Bir konuşma, bir atölye, bir tartışma çemberi, sosyal bir tanışma ya da bir çalışma oturumu arasında karar verin. Formatı hedef kitlenin istediği şeye uydurun — öğrenme, bağlantı ya da ortak işte ilerleme.',
      joinOriginNote:
        'JoinOrigin’de üyeler katılmadan önce bir topluluğun formatını görebilir — bu da doğru insanları çeker ve beklentileri belirler. Hedef kitlenizin gerçekten katılacağı bir format seçin.',
    },
    {
      title: 'Bir tarih ve sıklık seçin',
      body: 'Hafta içi akşamlar ve hafta sonu sabahları çoğu kitle için en iyi sonucu verir. Tekrarlanan bir zaman dilimi seçin — aylık standarttır — ve insanların alışkanlık edinebilmesi için ona bir randevu gibi sahip çıkın.',
      joinOriginNote:
        'JoinOrigin, bir topluluğun ritmini tek bir yerde görünür kılar, böylece üyeler sonraki tarihi aramak zorunda kalmadan bilir. Tekrarlanan zaman diliminize bir randevu gibi sahip çıkın.',
    },
    {
      title: 'Mekanı erkenden ayırtın',
      body: 'Kütüphaneler, kafeler, ortak çalışma salonları, toplum merkezleri ve parklar topluluk etkinliklerine düşük ya da sıfır maliyetle ev sahipliği yapar. Kapasiteyi, açılış saatlerini ve varsa rezervasyon gereksinimlerini yazılı olarak doğrulayın.',
      joinOriginNote:
        'JoinOrigin mekan ayırtmaz ya da fiziksel alanları koordine etmez — tasarım odağı, insanları dijital odada bağlamaktır. Kapasiteyi ve açılış saatlerini doğrudan mekanla yazılı olarak doğrulayın.',
    },
    {
      title: 'Hafif bir gündem taslağı hazırlayın',
      body: 'Basit tutun: karşılama ve tanışma, ana etkinlik, açık tartışma, kapanış ve sonraki tarih. Toplam 60–90 dakika tahmin edin ve gündemi etkinlik listesiyle ve odada yayınlayın.',
      joinOriginNote:
        'JoinOrigin, gündem ve notlar gibi ortak ürünlerin topluluğun yanında yaşadığı bir topluluk işletim sistemidir. Basit, yayınlanmış bir gündem işi görür.',
    },
    {
      title: 'Hedef kitlenizin zaten olduğu yerde tanıtım yapın',
      body: 'Etkinliği niş gruplarda, yerel bültenlerde, topluluk panolarında ve ilgili sosyal kanallarda paylaşın — ve herkesi grubun katılım bağlantısına yönlendirin, böylece katılımcılar tek gecelik misafir değil üye olur.',
      joinOriginNote:
        'JoinOrigin, bir Origin arayan insanların onu bulup bir bağlantıyla katıldığı yerdir. Hedef kitlenizin zaten toplandığı niş gruplarda ve bültenlerde tanıtım yapın ve katılım bağlantısını her katılımcıyla paylaşın.',
    },
    {
      title: 'Geceyi net bir ritimle yönetin',
      body: 'Zamanında başlayın, geç gelenleri selamlayın, ana etkinliği rayında tutun ve sonraki tarihi duyurarak kapatın. Zamanında bitirin — saygının en güçlü sinyalidir.',
      joinOriginNote:
        'JoinOrigin etkinliklere personel sağlamaz — deneyim sizindir. Platform, topluluğun hikayesini tek bir düzenli odada tutar — vaat, ritim ve insanlar. Zamanında bitirmek saygının en güçlü sinyalidir.',
    },
    {
      title: '24 saat içinde odada takip yapın',
      body: 'Katılımcılara teşekkür edin, bağlantıları ya da notları paylaşın ve geri bildirimi tüm grubun görebileceği yerde isteyin. Takip, tek bir etkinliği tekrarlanan bir topluluğa dönüştüren şeydir.',
      joinOriginNote:
        'JoinOrigin, bir topluluğa özetin, sonraki tarihin ve geri bildirimin yaşadığı kalıcı bir oda verir — tek bir etkinliği tekrarlanan bir topluluğa dönüştürür. Keşfedilin ve ivmeyi sürdürün.',
    },
  ],
};

export default content;
