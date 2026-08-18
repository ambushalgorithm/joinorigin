import type { GuideContent } from '../../types';

/**
 * "Bir Grup Nasıl Oluşturulur" — L1 kalıcı rehber (tasarım §6.1, TASK-353).
 *
 * Ürün ekran akışı §2 temel döngüsüne göre yazılmıştır: bir grup yayınla →
 * grubun herkese açık sayfası → Bağlantıyla katıl → oda YAYINLAMA ANINDA
 * otomatik oluşturulur → oluşturan kişi odayı kontrol eder → akış/davetle
 * büyüme. Bir grup bir topluluktur: herkese açık sayfa vaadi belirtir,
 * oda üyelerin bağlandığı yerdir ve üyeler bir bağlantıyla katılır.
 * Platform canlıdır: bir grup oluşturmak sayfasını yayınlar ve odasını
 * hemen açar. "Oda" Matrix odasına bağlıdır (§6.3). İfade, yazılan
 * içerikte hiçbir zaman kullanılmaz.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'create-a-group',
  title: 'Bir Grup Nasıl Oluşturulur: Yayınlayın ve Odasını Açın | JoinOrigin',
  description:
    'JoinOrigin üzerinde bir grup oluşturun — bir grup sayfası yayınlayın, odasını otomatik açın ve üyeleri bir katılım bağlantısıyla davet edin. JoinOrigin’den pratik adımlar.',
  intro: [
    'Her topluluk — ister yepyeni olsun ister aylardır resmi olmayan şekilde toplanıyor olsun — aynı iki hamle üzerinde çalışır: kimin için olduğuna karar vermek ve o insanlara bağlanmak için tek net bir yer vermek. Yuvası olmayan bir grup asla düzgün bir şekilde oluşmaz; ilgi mesajlara, tablolara ve tek seferlik sohbetlere dağılır ve hiçbir şey kalıcı olmaz. Grup sayfası ve odası o yuvadır ve onları iyi oluşturmak, gerçek bir topluluk ile bir isim listesi arasındaki farktır.',
    'JoinOrigin döngüsü şöyle çalışır: bir grup yayınlarsınız, herkese açık sayfası belirir ve odası yayınlama anında otomatik oluşturulur. İnsanlar grubu Keşfet aracılığıyla bulur ya da bir katılım bağlantısını takip eder, katılmak tek tıklamadır ve odaya inerler — topluluğun gerçekten yaşadığı, oluşturan kişinin kontrolündeki bir Matrix odası. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve kimin katılacağını ve grubun nasıl çalışacağını kontrol eder.',
    'Bu rehber yolun tamamını kapsar — grup yeni olsun ya da kâğıt üzerinde zaten var olsun: hedef kitleyi ve amacı seçmek, insanların bulabileceği bir grup sayfası yazmak, grubu yayınlayıp odasını açmak, oluşturan kişi olarak beklentileri belirlemek, katılım bağlantısını paylaşmak, ilk üyeleri davet etmek, ilk sohbetleri başlatmak ve grubun büyümeye devam etmesi için odayı aktif tutmak.',
  ],
  dataPoints: [
    'En net gruplar tek bir hedef kitle ve tek bir vaatle başlar — özgüllük bir büyüme özelliğidir.',
    'JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — topluluğun sıfırıncı saniyeden itibaren bağlanacak bir yeri vardır.',
    'Katılım bağlantısı en basit davettir: tek bağlantı, tek tıklama ve yeni bir üye odadadır.',
    'JoinOrigin, insanların grupları bulmasına, katılmasına ve başlatmasına yardımcı olan bir topluluk işletim sistemidir — grubunuzu yayınlayın, odası hemen açılır.',
  ],
  faq: [
    {
      question: 'Grup ile topluluk arasındaki fark nedir?',
      answer:
        'JoinOrigin’de bunlar aynı nesnedir. Bir grup (ya da topluluk), herkese açık bir sayfası ve bir odası olan, yayınlanmış ve katılınabilir bir nesnedir. Grup sayfası vaadi belirtir; oda üyelerin bağlandığı yerdir. Topluluklar, grubun odalarını tutan bir Matrix Alanı alır ve ana oda grubun yaşadığı yerdir.',
    },
    {
      question: 'Grup odası ne zaman oluşturulur?',
      answer:
        'Oda, grubu yayınladığınız anda otomatik oluşturulur — ayrı bir “sohbeti sonra oluştur” adımı asla yoktur. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. Aynı yapıyı hâlihazırda kullandığınız araçlarla da kurabilirsiniz.',
    },
    {
      question: 'Üyeler grubuma nasıl katılır?',
      answer:
        'Katılmak tek bir eylemdir: grubun herkese açık sayfasında Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Katılanlar grubun odasına iner. En güvenilir erken büyüme kişiseldir — katılım bağlantısını hedef kitleye uyan insanlarla paylaşmak ve başkalarını getirmelerini istemek.',
    },
    {
      question: 'Grup sayfası ne söylemeli?',
      answer:
        'Grubun kimin için olduğuna dair tek cümle, odada neler olduğuna dair tek cümle ve bir üyenin katılmaktan ne kazandığı. Spesifik tutun — “Brooklyn’deki yeni kurucular”, “işletmeyi seven insanlar”dan daha iyidir. Sayfa, birinin Katıl’a tıklayıp tıklamayacağına karar veren vaattir.',
    },
    {
      question: 'JoinOrigin bugün bir grup oluşturmama yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin’de bir grubu yayınlamak sayfasını ve odasını tek parça halinde oluşturur — oda, yayınladığınız anda açılır ve onu baştan itibaren siz kontrol edersiniz. Grubu yayınlayın ve üyeler için bir oda açın; davet ettiğiniz her yeni üye erişiminizi genişletir.',
    },
  ],
  sections: [
    'Hedef kitleyi ve amacı seçin. Grubun kimin için olduğuna ve ne için var olduğuna karar verin — tek bir hedef kitle, tek bir vaat ve tanımlayabileceğiniz başarılı bir üye. JoinOrigin, bulunabilir grup sayfaları etrafında tasarlanmıştır ve en net gruplar hedef kitlelerini ve amaçlarını en baştan belirtir. Her biri için bir cümle yazın ve her davetin önünde tutun.',
    'İnsanların bulabileceği bir grup sayfası yazın. Sayfa, grubun kimin için olduğunu, odada neler olduğunu ve üyelerin katılmaktan ne kazandığını belirtmelidir. Spesifik ve dürüst tutun. JoinOrigin’de bir grubu yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Açıklamayı yayınlayın ve hedef kitleye uyan birkaç kişi üzerinde test edin.',
    'Grubu yayınlayın ve odasını açın. Yayınlamak, grubun gerçek olduğu andır: üyelerin bağlandığı bir oda artı herkese açık bir sayfa. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir. JoinOrigin’de sayfa, oda ve katılım bağlantısı tek bir yayındır. İsterseniz sayfayı ve odayı grubunuzun hâlihazırda kullandığı araçlarda oluşturun.',
    'Oluşturan kişi olarak beklentileri belirleyin. Oda sahibi olarak grubun nasıl çalışacağına karar verin: üyeler ne yayınlayabilir, kurallar nelerdir ve yeni insanlar nasıl karşılanır. Oluşturan kişi kontrolü standart Matrix oda sahipliğidir — davet et, çıkar, rol ata, sabitle, arşivle. JoinOrigin kurallarınızı sizin yerinize koymaz; tasarım size kontrolleri verir. Oda beklentilerini yazın ve üyelerin görebileceği yere sabitleyin.',
    'Katılım bağlantısını paylaşın. Katılım bağlantısı, ilgiden üyeliğe giden en kısa yoldur: tek bağlantı, tek tıklama ve yeni bir üye odaya iner. Doğru insanların toplandığı her yere koyun. JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Grubunuza giden tek kısa, net bir bağlantı işi görür.',
    'İlk üyeleri kişisel olarak davet edin. Kişisel davetler, herkese açık gönderilerden çok daha iyi dönüşüm sağlar. Hedef kitleye uyan arkadaşlara, meslektaşlara ve tanıdıklara mesaj atın, katılım bağlantısını paylaşın ve bir kişi daha getirmelerini isteyin. JoinOrigin keşfi kolaylaştırır — bir grup arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve her üye kendi ağına açılan bir kanal olur.',
    'İlk sohbetleri odada başlatın. İlk sohbetler kültürü belirler. Net bir soruyla açın — tanışmalar, ortak bir hedef ya da ilk bir konu — ve her mesaja yanıt verin. JoinOrigin sohbetlerinizi yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, gruba üyelerin bağlandığı tek bir oda verir ve ona oluşturan kişi sahiptir. İlk birkaç hafta en aktif üye siz olun.',
    'Odayı aktif ve büyüyen tutun. Bir ritim tutun — haftalık bir konu, tekrarlanan bir kontrol ya da sürekli bir güncelleme — böylece üyelerin geri dönmek için bir nedeni olur. Büyüme, her üye grubu tek cümleyle anlatıp katılım bağlantısını paylaşabildiğinde bileşik etki yaratır. JoinOrigin, grup büyüdükçe grup sayfanızı ve odasını bağlı tutar — vaadin, odanın ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
  ],
  steps: [
    {
      title: 'Hedef kitleyi ve amacı seçin',
      body: 'Grubun kimin için olduğuna ve ne için var olduğuna karar verin — tek bir hedef kitle, tek bir vaat ve tanımlayabileceğiniz başarılı bir üye.',
      joinOriginNote:
        'JoinOrigin, bulunabilir grup sayfaları etrafında tasarlanmıştır ve en net gruplar hedef kitlelerini ve amaçlarını en baştan belirtir. Her biri için bir cümle yazın ve her davetin önünde tutun.',
    },
    {
      title: 'İnsanların bulabileceği bir grup sayfası yazın',
      body: 'Sayfa, grubun kimin için olduğunu, odada neler olduğunu ve üyelerin katılmaktan ne kazandığını belirtmelidir. Spesifik ve dürüst tutun.',
      joinOriginNote:
        'JoinOrigin’de bir grubu yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Açıklamayı yayınlayın ve hedef kitleye uyan birkaç kişi üzerinde test edin.',
    },
    {
      title: 'Grubu yayınlayın ve odasını açın',
      body: 'Yayınlamak, grubun gerçek olduğu andır: üyelerin bağlandığı bir oda artı herkese açık bir sayfa. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir.',
      joinOriginNote:
        'JoinOrigin’de sayfa, oda ve katılım bağlantısı tek bir yayındır. İsterseniz sayfayı ve odayı grubunuzun hâlihazırda kullandığı araçlarda oluşturun.',
    },
    {
      title: 'Oluşturan kişi olarak beklentileri belirleyin',
      body: 'Oda sahibi olarak grubun nasıl çalışacağına karar verin: üyeler ne yayınlayabilir, kurallar nelerdir ve yeni insanlar nasıl karşılanır. Oluşturan kişi kontrolü standart Matrix oda sahipliğidir — davet et, çıkar, rol ata, sabitle, arşivle.',
      joinOriginNote:
        'JoinOrigin kurallarınızı sizin yerinize koymaz; tasarım size kontrolleri verir. Oda beklentilerini yazın ve üyelerin görebileceği yere sabitleyin.',
    },
    {
      title: 'Katılım bağlantısını paylaşın',
      body: 'Katılım bağlantısı, ilgiden üyeliğe giden en kısa yoldur: tek bağlantı, tek tıklama ve yeni bir üye odaya iner. Doğru insanların toplandığı her yere koyun.',
      joinOriginNote:
        'JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Grubunuza giden tek kısa, net bir bağlantı işi görür.',
    },
    {
      title: 'İlk üyeleri kişisel olarak davet edin',
      body: 'Kişisel davetler, herkese açık gönderilerden çok daha iyi dönüşüm sağlar. Hedef kitleye uyan arkadaşlara, meslektaşlara ve tanıdıklara mesaj atın, katılım bağlantısını paylaşın ve bir kişi daha getirmelerini isteyin.',
      joinOriginNote:
        'JoinOrigin keşfi kolaylaştırır — bir grup arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve her üye kendi ağına açılan bir kanal olur.',
    },
    {
      title: 'İlk sohbetleri odada başlatın',
      body: 'İlk sohbetler kültürü belirler. Net bir soruyla açın — tanışmalar, ortak bir hedef ya da ilk bir konu — ve her mesaja yanıt verin.',
      joinOriginNote:
        'JoinOrigin sohbetlerinizi yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, gruba üyelerin bağlandığı tek bir oda verir ve ona oluşturan kişi sahiptir. İlk birkaç hafta en aktif üye siz olun.',
    },
    {
      title: 'Odayı aktif ve büyüyen tutun',
      body: 'Bir ritim tutun — haftalık bir konu, tekrarlanan bir kontrol ya da sürekli bir güncelleme — böylece üyelerin geri dönmek için bir nedeni olur. Büyüme, her üye grubu tek cümleyle anlatıp katılım bağlantısını paylaşabildiğinde bileşik etki yaratır.',
      joinOriginNote:
        'JoinOrigin, grup büyüdükçe grup sayfanızı ve odasını bağlı tutar — vaadin, odanın ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
    },
  ],
};

export default content;
