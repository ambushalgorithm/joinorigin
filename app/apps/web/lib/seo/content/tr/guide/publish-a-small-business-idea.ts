import type { GuideContent } from '../../types';

/**
 * "Bir Küçük İşletme Fikri Nasıl Yayınlanır" — L1 kalıcı rehber
 * (tasarım §6.1, TASK-353).
 *
 * Ürün ekran akışı §2 temel döngüsüne göre yazılmıştır: küçük bir işletme
 * fikri yayınla → fikir herkese açık sayfası → Bağlantıyla katıl → oda
 * YAYINLAMA ANINDA otomatik oluşturulur → oluşturan kişi odayı kontrol
 * eder → akış/davetle büyüme. Fikir sayfası vitrin vaadidir; oda ise
 * müşterilerin, iş birliği yapanların ve ilk inananların işletme etrafında
 * toplandığı yerdir. Platform canlıdır: bir fikri yayınlamak sayfasını ve
 * odasını hemen oluşturur. "Oda" Matrix odasına bağlıdır (§6.3). İfade,
 * yazılan içerikte hiçbir zaman kullanılmaz.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'publish-a-small-business-idea',
  title: 'Bir Küçük İşletme Fikri Nasıl Yayınlanır: Fikir Sayfası + Oda | JoinOrigin',
  description:
    'JoinOrigin üzerinde küçük bir işletme fikri yayınlayın — ister yeni bir girişim başlatıyor ister sunduklarını paylaşan mevcut bir işletme olun — herkese açık bir fikir sayfası yazın, odasını otomatik açın ve gerçekleşmesini görmek isteyen müşterileri ve iş birliği yapanları davet edin. JoinOrigin’den pratik adımlar.',
  intro: [
    'Küçük işletmeler genellikle aynı şekilde başlar — biri mahallesinde, iş yerinde ya da hobinin içinde gerçek bir sorun fark eder ve çözümü düşünmeyi bırakamaz — ancak çoğu zaten faaliyettedir: çalışan bir dükkân, hizmet veren bir işletme, müşterileri olan bir ürün. İşletmeniz hâlâ bir kıvılcım olsun ya da zaten insanlara hizmet ediyor olsun, sonraki adım aynıdır: elinizdekini diğer insanların görebileceği, tepki verebileceği ve katılabileceği bir şeye dönüştürmek. Küçük bir işletmenin herkese açık bir yuvaya ve çevresinde insanlara ihtiyacı vardır — bir vitrinden önce ve bir vitrin var olduktan çok sonra.',
    'JoinOrigin döngüsü şöyle çalışır: küçük bir işletme fikri yayınlarsınız, herkese açık fikir sayfası belirir ve odası yayınlama anında otomatik oluşturulur. İnsanlar sayfayı bulur ya da bir bağlantıyı takip eder, katılmak tek tıklamadır ve odaya inerler — müşterilerin, iş birliği yapanların ve ilk inananların soru sorabildiği, geri bildirim paylaşabildiği ve dahil olabildiği, oluşturan kişinin kontrolündeki bir Matrix odası. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve kimin katılacağına ve içeride ne olacağına karar verir.',
    'Bu rehber, küçük bir işletme fikrini bir dükkân açar gibi yayınlamanın yolunu adım adım anlatır: müşteriyi ve sorunu adlandırmak, fikir sayfasını bir vitrin gibi yazmak, sayfayı yayınlayıp odayı açmak, sayfayı yerel ağınızla paylaşmak, ilk müşterileri ve iş birliği yapanları davet etmek, odada dinlemek, teklifi gerçek geri bildirimden yola çıkarak iyileştirmek ve odayı ilk müşteri tabanınıza dönüştürmek.',
  ],
  dataPoints: [
    'En net küçük işletme fikirleri, genel bir hedef kitleden değil, tek bir adlandırılmış müşteriden ve tek bir spesifik sorundan başlar.',
    'JoinOrigin’de bir fikri yayınlamak odasını otomatik oluşturur — işletmenin baştan itibaren müşteriler ve iş birliği yapanlar için bir yeri vardır.',
    'Katılım bağlantısı en basit davettir: tek bağlantı, tek tıklama ve ilgili bir kişi odadadır.',
    'JoinOrigin, insanların fikirleri ve arkalarındaki insanları bulmasına yardımcı olan bir topluluk işletim sistemidir — fikrinizi yayınlayın, odası hemen açılır.',
  ],
  faq: [
    {
      question: 'Küçük bir işletme fikri normal bir fikir sayfasından nasıl farklıdır?',
      answer:
        'Sayfa formatı aynıdır, ancak vaat daha keskindir: bir müşteri, bir sorun ve bir teklif. Genel bir fikir iş birliği yapanları davet ederken, küçük bir işletme fikri sayfası ilk müşterileri ve yerel inananları — gerçekten satın alacak, tavsiye edecek ya da başlamanıza ya da hâlihazırda yürüyen işi büyütmenize yardımcı olacak insanları — davet eder.',
    },
    {
      question: 'İşletme fikrim için oda ne zaman oluşturulur?',
      answer:
        'Oda, fikri yayınladığınız anda otomatik oluşturulur. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. Hâlihazırda kullandığınız araçlarla da bir oda açabilir ve sorunu önemseyen insanları davet edebilirsiniz.',
    },
    {
      question: 'Küçük bir işletme fikri odasına kim katılmalı?',
      answer:
        'İlk müşteriler, eksik olan beceriye sahip insanlar ve sizi tavsiye edebilecek yereller. Oda, envantere, kiralamalara ya da pazarlamaya para harcamadan önce talebi test ettiğiniz, teklifi iyileştirdiğiniz ve ilk inananları bulduğunuz yerdir.',
    },
    {
      question: 'Fikir sayfası ne vaat etmeli?',
      answer:
        'Tek bir adlandırılmış müşteri, tek bir sorun ve sunmayı planladığınız şey. Aşama konusunda dürüst olun — “bu fikri test ediyorum ve bu sorunu yaşayan insanlarla konuşmak istiyorum” güçlü bir vaattir. Sayfa, doğru insanların Katıl’a tıklayıp tıklamayacağına karar verir.',
    },
    {
      question: 'JoinOrigin bugün küçük bir işletme fikri yayınlamama yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin’de bir fikri yayınlamak sayfasını ve odasını tek parça halinde oluşturur — oda, yayınladığınız anda açılır ve onu baştan itibaren siz kontrol edersiniz. Fikri herkese açık bir yerde yayınlayın ve tartışma için bir oda açın; davet ettiğiniz her yeni üye erişiminizi genişletir.',
    },
  ],
  sections: [
    'Müşteriyi ve sorunu adlandırın. Bir şey yazmadan önce, bu sorunu yaşayan spesifik kişiyi adlandırın ve sorunu onun sözleriyle tanımlayın. Küçük bir işletme, tek bir gerçek ihtiyacı iyi karşıladığında başarılı olur. JoinOrigin, bulunabilir fikir sayfaları etrafında tasarlanmıştır ve en net sayfalar adlandırılmış bir müşteriden başlar. Müşteriyi ve sorunu yazın ve uyan üç kişi üzerinde test edin.',
    'Fikir sayfasını bir vitrin gibi yazın. Sayfa, ne sunduğunuzu, kimin için olduğunu, zaman ya da para olarak neye mal olduğunu ve fikrin hangi aşamada olduğunu göstermelidir. Somut tutun — bir pop-up, bir ürün, bir hizmet, bir dükkân. JoinOrigin’de bir fikri yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Sayfayı kısa bir herkese açık gönderi olarak taslaklayın ve geri bildirimle iyileştirin.',
    'Fikri yayınlayın ve odasını açın. Yayınlamak, işletme fikrinin bulunabilir hale geldiği andır. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir. JoinOrigin’de sayfa, oda ve katılım bağlantısı tek bir yayındır. Fikri herkese açık yayınlayın ve etrafındaki sohbet için bir oda açın.',
    'Sayfayı yerel ağınızla paylaşın. Küçük işletmeler yerel erişimle büyür. Fikir sayfasını komşularınızla, meslektaşlarınızla, yerel gruplarla ve sorunu ilk elden bilen herkesle paylaşın. JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Fikrinize giden tek kısa, net bir bağlantı işi görür.',
    'İlk müşterileri ve iş birliği yapanları davet edin. Gerçekten satın alacak ya da yardım edecek insanları davet edin: potansiyel müşteriler, eksik olan bir beceriye sahip biri, bir akıl hocası ya da yerel bir organizatör. JoinOrigin keşfi kolaylaştırır — bir fikir arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve katılan her kişi kendi ağına açılan bir kanal olur.',
    'Odada dinleyin. Katılanlara teklifi nasıl kullanacaklarını, ne ödeyeceklerini ve onları neyin durdurduğunu sorun. Oda, gerçek talebin ortaya çıktığı — ya da çıkmadığı — yerdir. JoinOrigin bu sohbetleri yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, işletme fikrine ilginin geri bildirime dönüştüğü tek bir oda verir ve o odaya oluşturan kişi sahiptir. Üyelere doğrudan odada sorun.',
    'Teklifi gerçek geri bildirimden yola çıkarak iyileştirin. Fiyatı, kapsamı, kanalı ya da vaadi, katılanların söylediklerine göre ayarlayın. Küçük işletmeler küçük yinelemelerle kurulur. JoinOrigin, bir fikrin ortak hafızasını tek bir yerde tutar — odadaki notlar, kararlar ve geri bildirim — böylece iyileştirme kaybolmak yerine görünür olur. Her seferinde tek bir şeyi değiştirin ve tepkiyi izleyin.',
    'Odayı ilk müşteri tabanınıza dönüştürün. Davet etmeye devam edin, güncellemeleri paylaşmaya devam edin ve teklif netleştikçe odayı canlı tutun. Odadaki insanlar ilk müşterileriniz ve ilk tanıtımcılarınızdır. JoinOrigin, işletme büyüdükçe fikir sayfanızı ve odasını bağlı tutar — vaadin, sohbetin ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
  ],
  steps: [
    {
      title: 'Müşteriyi ve sorunu adlandırın',
      body: 'Bir şey yazmadan önce, bu sorunu yaşayan spesifik kişiyi adlandırın ve sorunu onun sözleriyle tanımlayın. Küçük bir işletme, tek bir gerçek ihtiyacı iyi karşıladığında başarılı olur.',
      joinOriginNote:
        'JoinOrigin, bulunabilir fikir sayfaları etrafında tasarlanmıştır ve en net sayfalar adlandırılmış bir müşteriden başlar. Müşteriyi ve sorunu yazın ve uyan üç kişi üzerinde test edin.',
    },
    {
      title: 'Fikir sayfasını bir vitrin gibi yazın',
      body: 'Sayfa, ne sunduğunuzu, kimin için olduğunu, zaman ya da para olarak neye mal olduğunu ve fikrin hangi aşamada olduğunu göstermelidir. Somut tutun — bir pop-up, bir ürün, bir hizmet, bir dükkân.',
      joinOriginNote:
        'JoinOrigin’de bir fikri yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Sayfayı kısa bir herkese açık gönderi olarak taslaklayın ve geri bildirimle iyileştirin.',
    },
    {
      title: 'Fikri yayınlayın ve odasını açın',
      body: 'Yayınlamak, işletme fikrinin bulunabilir hale geldiği andır. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir.',
      joinOriginNote:
        'JoinOrigin’de sayfa, oda ve katılım bağlantısı tek bir yayındır. Fikri herkese açık yayınlayın ve etrafındaki sohbet için bir oda açın.',
    },
    {
      title: 'Sayfayı yerel ağınızla paylaşın',
      body: 'Küçük işletmeler yerel erişimle büyür. Fikir sayfasını komşularınızla, meslektaşlarınızla, yerel gruplarla ve sorunu ilk elden bilen herkesle paylaşın.',
      joinOriginNote:
        'JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Fikrinize giden tek kısa, net bir bağlantı işi görür.',
    },
    {
      title: 'İlk müşterileri ve iş birliği yapanları davet edin',
      body: 'Gerçekten satın alacak ya da yardım edecek insanları davet edin: potansiyel müşteriler, eksik olan bir beceriye sahip biri, bir akıl hocası ya da yerel bir organizatör.',
      joinOriginNote:
        'JoinOrigin keşfi kolaylaştırır — bir fikir arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve katılan her kişi kendi ağına açılan bir kanal olur.',
    },
    {
      title: 'Odada dinleyin',
      body: 'Katılanlara teklifi nasıl kullanacaklarını, ne ödeyeceklerini ve onları neyin durdurduğunu sorun. Oda, gerçek talebin ortaya çıktığı — ya da çıkmadığı — yerdir.',
      joinOriginNote:
        'JoinOrigin bu sohbetleri yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, işletme fikrine ilginin geri bildirime dönüştüğü tek bir oda verir ve o odaya oluşturan kişi sahiptir. Üyelere doğrudan odada sorun.',
    },
    {
      title: 'Teklifi gerçek geri bildirimden yola çıkarak iyileştirin',
      body: 'Fiyatı, kapsamı, kanalı ya da vaadi, katılanların söylediklerine göre ayarlayın. Küçük işletmeler küçük yinelemelerle kurulur.',
      joinOriginNote:
        'JoinOrigin, bir fikrin ortak hafızasını tek bir yerde tutar — odadaki notlar, kararlar ve geri bildirim — böylece iyileştirme kaybolmak yerine görünür olur. Her seferinde tek bir şeyi değiştirin ve tepkiyi izleyin.',
    },
    {
      title: 'Odayı ilk müşteri tabanınıza dönüştürün',
      body: 'Davet etmeye devam edin, güncellemeleri paylaşmaya devam edin ve teklif netleştikçe odayı canlı tutun. Odadaki insanlar ilk müşterileriniz ve ilk tanıtımcılarınızdır.',
      joinOriginNote:
        'JoinOrigin, işletme büyüdükçe fikir sayfanızı ve odasını bağlı tutar — vaadin, sohbetin ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
    },
  ],
};

export default content;
