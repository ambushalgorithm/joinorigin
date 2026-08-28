import type { GuideContent } from '../../types';

/**
 * "İlk 10 Üyenizi Nasıl Edinirsiniz" — L1 kalıcı rehber (tasarım §6.1,
 * TASK-326).
 *
 * Dijital bağlan→katıl→oda modeline göre yeniden odaklanmıştır: oda katılım
 * yüzeyidir — üyeler davet bağlantılarıyla gelir ve topluluğun gerçekten
 * yaşadığı grubun odasına katılır. JoinOrigin değeri girişe ve her adıma
 * (adım başına `joinOriginNote`) işlenmiştir, dürüst çerçeveyle —
 * JoinOrigin üye toplamaz ya da etkinlik düzenlemez. Tek H1, adım adım
 * yapı, SSS `FAQPage` JSON-LD ile 1:1 yansıtılır. "Oda" Matrix odasına
 * bağlıdır (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'first-10-members',
  title: 'Yeni ya da Büyüyen Bir Origin İçin İlk 10 Üyenizi Nasıl Edinirsiniz | JoinOrigin',
  description:
    'Büyük bir bütçe olmadan ilk 10 üyenizi edinin — ister yeni bir Origin başlatıyor ister mevcut bir Origin’i yeniden canlandırıyor olun — kişisel ağınızdan başlayın, davet bağlantılarını paylaşın ve odayı insanların katılmak isteyeceği yer haline getirin. JoinOrigin’den pratik adımlar.',
  intro: [
    'İlk on üye edinmesi en zor ve en önemli olanlardır, çünkü bir Origin’in kültürünü, yabancıları çekecek bir itibarı olmadan önce tanımlarlar — ve mevcut bir Origin durduğunda ya da yeniden başladığında da aynı derecede değerlidirler, çünkü bağlı bir çekirdek, sessiz bir grubu canlı bir gruba dönüştüren şeydir. O ilk-on sorunu temelde bir insanları bağlama sorunudur ve JoinOrigin’in çözdüğü çekirdek sorundur.',
    'JoinOrigin, dijital bağlan→katıl→oda döngüsü etrafında kurulmuş bir topluluk işletim sistemidir: bir grup yayınlarsınız, odası otomatik oluşturulur ve üyeler bir bağlantıyla katılır. Oda katılım yüzeyidir — Katıl’a tıklayan ya da bir davet bağlantısını takip eden her kişi, topluluğun yaşadığı ve yeni üyelerin kendilerini anında bağlı hissettiği tek yer olan grubun odasına iner. JoinOrigin üye toplamaz ya da etkinlik düzenlemez — o kısım sizindir. Platform keşfi ve katılmayı önemli ölçüde kolaylaştırır; erken büyüme yine de kişisel erişimden gelir: bir bağlantıyla doğrudan davet ettiğiniz insanlar, getirdikleri kişiler ve oda canlı hissettiği için kalanlar.',
    'Bu rehber, ilk-on-üye sorununu somut adımlara böler — ister yeni bir Origin başlatıyor ister mevcut bir Origin’i canlandırıyor olun: zaten tanıdığınız insanlardan başlamak, grubunuzu katılacak bir odası olacak şekilde yayınlamak, bağlantılarla kişisel olarak davet etmek, katılımcıları tanıtımcılara dönüştüren bir ilk buluşma yürütmek ve her üyenin bir sonrakini getirmesini sağlayan basit bir tavsiye alışkanlığı kurmak — ve her adım JoinOrigin’in nerede yardımcı olduğunu gösterir.',
  ],
  dataPoints: [
    'Kişisel davetler, herkese açık gönderilerden ya da ücretli reklamlardan çok daha yüksek oranda dönüşüm sağlar.',
    'Bir davet bağlantısı tüm engelleri kaldırır: tek tıklama ve yeni bir üye odadadır.',
    'On aktif üye, çoğu insanın bir grubun gerçek ve katılmaya değer olduğunu hissetmesi için yeterli sosyal kanıttır.',
    'JoinOrigin, insanların toplulukları bulmasına veya başlatmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir — üye toplamaz ya da etkinlik düzenlemez.',
  ],
  faq: [
    {
      question: 'Neden özellikle on üye?',
      answer:
        'On bir devrilme noktasıdır: on düzenli katılımcıyla canlı bir odanız, tartışma için güvenilir bir çekirdeğiniz ve aksi halde tereddüt edecek yeni gelenleri çekecek kadar sosyal kanıtınız olur. Onun altında oda kırılgan hissettirir.',
    },
    {
      question: 'İlk on üyeyi edinmek ne kadar sürer?',
      answer:
        'Tutarlı kişisel davetler ve iyi bir ilk buluşmayla çoğu organizatör üç ila altı hafta içinde on bağlı üyeye ulaşır. Anahtar, büyük bir lansman beklemek değil, her hafta davet etmektir — bağlantıları paylaşın, takip edin ve odayı aktif tutun.',
    },
    {
      question: 'Ya büyük bir kişisel ağım yoksa?',
      answer:
        'Daha küçük başlayın: tanıdığınız beş kişiyi davet edin, her birinden bir kişi getirmesini isteyin ve hedef kitlenizin zaten toplandığı iki niş gruba gönderi paylaşın. Elde tuttuğunuz her üye kendi ağına açılan bir kanal olur — ve her davet odaya giden basit bir bağlantı olabilir.',
    },
    {
      question: 'JoinOrigin üye bulmama yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin, insanların Origins keşfetmesine ve başlatmasına yardımcı olur — bir grup arayan insanların sizinkini bulup odasına bir bağlantıyla katılabileceği bir yer. Bu rehberdeki adımlar — kişisel davetler ve harika bir ilk buluşma — ilk üyelerinizi bulmanın en güvenilir yollarıdır.',
    },
  ],
  sections: [
    'Zaten tanıdığınız elli kişiyi listeleyin. Topluluğun amacına uyan herkesi yazın: arkadaşlar, meslektaşlar, sınıf arkadaşları, eski iş arkadaşları, komşular ve çevrimiçi tanıdıklar. İstediğiniz on kişinin yaklaşık beş katı isme ihtiyacınız var. JoinOrigin topluluğunuza görünür bir yuva ve insanların bulabileceği bir oda verir — ancak ilk isimler yine de tanıdığınız insanlardan gelir. Elli kişiyi listeleyin ve her birine kişisel bir tanıştırma gibi davranın.',
    'Grubunuzu yayınlayın ve odasını açın. İşaret edemediğiniz bir Origin henüz yoktur — ve yuvası sohbetlere ve listelere dağılmış olan bir Origin’i büyütmek de neredeyse o kadar zordur. Grubu net bir misyonla yayınlayın ve odasının otomatik oluşturulmasına izin verin, böylece üyelerin ineceği gerçek bir yer olur. JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — oda katılım yüzeyidir ve oluşturan kişi ona baştan itibaren sahiptir. İsterseniz birini davet etmeden önce grubunuzu ve odasını hâlihazırda kullandığınız araçlarda kurun.',
    'Spesifik bir istek ve bir bağlantıyla kişisel olarak davet edin. Topluluğu, ilk tarihi ya da ilk sohbeti ve neden keyif alacaklarını düşündüğünüzü belirten kısa bir mesaj gönderin — ve katılım bağlantısını ekleyin. Kişisel mesajlar genel gönderileri yener ve spesifik bir tarih belirsiz bir vaadi yener. JoinOrigin, insanlar sizi bulduğunda katılmanın sürtünmesini kaldırır — tek bağlantı, tek tıklama, odaya. Spesifik bir tarih ve bağlantı içeren kısa bir kişisel mesaj, herhangi bir herkese açık gönderiden daha iyi dönüşüm sağlar.',
    'Her davet edilenden bir kişi getirmesini isteyin. Bunu isteğin normal bir parçası yapın: “Bunu sevebilecek bir arkadaşını getir.” Tavsiye davetleri, küçük ağların gerçek Origins dönüşme yoludur. JoinOrigin üyelere Origin için tek bir paylaşılabilir yuva verir — böylece tavsiye sohbetleri gerçek bir bağlantıya ve gerçek bir odaya işaret eder. “Arkadaşını getir”i isteğin parçası yapın ve onlara paylaşacakları bağlantıyı verin.',
    'Gerçekten iyi tek bir ilk buluşma yürütün. Enerjinizi katılımcı sayısına değil deneyime harcayın: sıcak bir karşılama, net bir format ve tanımlanmış bir bitiş zamanı. İlk buluşmadan keyif alan insanlar sonraki on kişiyi getirir. JoinOrigin etkinlik düzenlemez — deneyim sizindir. Platform, topluluğun etrafında oluşmasına yardımcı olur: üyelerin sonradan işaret edip bağlantıyı sürdürebileceği tek bir oda.',
    'Her katılımcıyı odaya davet edin. Buluşmanın sonunda katılım bağlantısını paylaşın ve kalmak isteyen herkesi ekleyin. Oda, topluluğun buluşmalar arasında yaşadığı yerdir — odaya katılan bir üye, geri dönme olasılığı yüksek olan üyedir. JoinOrigin, topluluğunuzun üyeliğini ve iletişimini bir kayıt formu yerine tek bir düzenli odada tutar. Odaya giden basit bir bağlantı, takibi mümkün kılar.',
    '24 saat içinde bir sonraki tarihle takip edin. Her katılımcıya teşekkür edin, tek paragraflık bir özet paylaşın ve bir sonraki buluşmayı — herkesin görebileceği odada — doğrulayın. Takip, tek seferlik bir katılımcının üyeye dönüştüğü yerdir. JoinOrigin’de bir takibin doğal bir yuvası vardır — özetin ve sonraki tarihin yaşadığı tek bir yer. 24 saat içinde gönderilen kişisel bir teşekkür, bir katılımcıyı üyeye dönüştüren şeydir.',
    'Başkalarını davet etmeyi son derece kolaylaştırın. Üyelere tekrarlayabilecekleri tek bir cümle ve paylaşabilecekleri tek bir bağlantı verin: “Yeni kurucuların ders paylaştığı aylık bir buluşma — buradan katılın.” Net, kısa bir açıklama en etkili üye toplama aracıdır. JoinOrigin, bir topluluğun tek bir yerde tanımlanmasına, bulunmasına ve katılınmasına olanak tanır — üyeler insanları odaya yönlendirebilir, açıklamak yerine. Üyelere tekrarlayabilecekleri bir cümle ve tek bir bağlantı verin.',
  ],
  steps: [
    {
      title: 'Zaten tanıdığınız elli kişiyi listeleyin',
      body: 'Topluluğun amacına uyan herkesi yazın: arkadaşlar, meslektaşlar, sınıf arkadaşları, eski iş arkadaşları, komşular ve çevrimiçi tanıdıklar. İstediğiniz on kişinin yaklaşık beş katı isme ihtiyacınız var.',
      joinOriginNote:
        'JoinOrigin topluluğunuza görünür bir yuva ve insanların bulabileceği bir oda verir — ancak ilk isimler yine de tanıdığınız insanlardan gelir. Elli kişiyi listeleyin ve her birine kişisel bir tanıştırma gibi davranın.',
    },
    {
      title: 'Grubunuzu yayınlayın ve odasını açın',
      body: 'İşaret edemediğiniz bir Origin henüz yoktur — ve yuvası sohbetlere ve listelere dağılmış olan bir Origin’i büyütmek de neredeyse o kadar zordur. Grubu net bir misyonla yayınlayın ve odasının otomatik oluşturulmasına izin verin, böylece üyelerin ineceği gerçek bir yer olur.',
      joinOriginNote:
        'JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — oda katılım yüzeyidir ve oluşturan kişi ona baştan itibaren sahiptir. İsterseniz birini davet etmeden önce grubunuzu ve odasını hâlihazırda kullandığınız araçlarda kurun.',
    },
    {
      title: 'Spesifik bir istek ve bir bağlantıyla kişisel olarak davet edin',
      body: 'Topluluğu, ilk tarihi ya da ilk sohbeti ve neden keyif alacaklarını düşündüğünüzü belirten kısa bir mesaj gönderin — ve katılım bağlantısını ekleyin. Kişisel mesajlar genel gönderileri yener ve spesifik bir tarih belirsiz bir vaadi yener.',
      joinOriginNote:
        'JoinOrigin, insanlar sizi bulduğunda katılmanın sürtünmesini kaldırır — tek bağlantı, tek tıklama, odaya. Spesifik bir tarih ve bağlantı içeren kısa bir kişisel mesaj, herhangi bir herkese açık gönderiden daha iyi dönüşüm sağlar.',
    },
    {
      title: 'Her davet edilenden bir kişi getirmesini isteyin',
      body: 'Bunu isteğin normal bir parçası yapın: “Bunu sevebilecek bir arkadaşını getir.” Tavsiye davetleri, küçük ağların gerçek Origins dönüşme yoludur.',
      joinOriginNote:
        'JoinOrigin üyelere Origin için tek bir paylaşılabilir yuva verir — böylece tavsiye sohbetleri gerçek bir bağlantıya ve gerçek bir odaya işaret eder. “Arkadaşını getir”i isteğin parçası yapın ve onlara paylaşacakları bağlantıyı verin.',
    },
    {
      title: 'Gerçekten iyi tek bir ilk buluşma yürütün',
      body: 'Enerjinizi katılımcı sayısına değil deneyime harcayın: sıcak bir karşılama, net bir format ve tanımlanmış bir bitiş zamanı. İlk buluşmadan keyif alan insanlar sonraki on kişiyi getirir.',
      joinOriginNote:
        'JoinOrigin etkinlik düzenlemez — deneyim sizindir. Platform, topluluğun etrafında oluşmasına yardımcı olur: üyelerin sonradan işaret edip bağlantıyı sürdürebileceği tek bir oda.',
    },
    {
      title: 'Her katılımcıyı odaya davet edin',
      body: 'Buluşmanın sonunda katılım bağlantısını paylaşın ve kalmak isteyen herkesi ekleyin. Oda, topluluğun buluşmalar arasında yaşadığı yerdir — odaya katılan bir üye, geri dönme olasılığı yüksek olan üyedir.',
      joinOriginNote:
        'JoinOrigin, topluluğunuzun üyeliğini ve iletişimini bir kayıt formu yerine tek bir düzenli odada tutar. Odaya giden basit bir bağlantı, takibi mümkün kılar.',
    },
    {
      title: '24 saat içinde bir sonraki tarihle takip edin',
      body: 'Her katılımcıya teşekkür edin, tek paragraflık bir özet paylaşın ve bir sonraki buluşmayı — herkesin görebileceği odada — doğrulayın. Takip, tek seferlik bir katılımcının üyeye dönüştüğü yerdir.',
      joinOriginNote:
        'JoinOrigin’de bir takibin doğal bir yuvası vardır — özetin ve sonraki tarihin yaşadığı tek bir yer. 24 saat içinde gönderilen kişisel bir teşekkür, bir katılımcıyı üyeye dönüştüren şeydir.',
    },
    {
      title: 'Başkalarını davet etmeyi son derece kolaylaştırın',
      body: 'Üyelere tekrarlayabilecekleri tek bir cümle ve paylaşabilecekleri tek bir bağlantı verin: “Yeni kurucuların ders paylaştığı aylık bir buluşma — buradan katılın.” Net, kısa bir açıklama en etkili üye toplama aracıdır.',
      joinOriginNote:
        'JoinOrigin, bir topluluğun tek bir yerde tanımlanmasına, bulunmasına ve katılınmasına olanak tanır — üyeler insanları odaya yönlendirebilir, açıklamak yerine. Üyelere tekrarlayabilecekleri bir cümle ve tek bir bağlantı verin.',
    },
  ],
};

export default content;
