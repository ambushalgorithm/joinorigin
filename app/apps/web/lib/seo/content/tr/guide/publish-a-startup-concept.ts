import type { GuideContent } from '../../types';

/**
 * "Bir Girişim Konsepti Nasıl Yayınlanır" — L1 kalıcı rehber
 * (tasarım §6.1, TASK-353).
 *
 * Ürün ekran akışı §2 temel döngüsüne göre yazılmıştır: bir girişim
 * konsepti yayınla → fikir herkese açık sayfası → Bağlantıyla katıl → oda
 * YAYINLAMA ANINDA otomatik oluşturulur → oluşturan kişi odayı kontrol
 * eder → akış/davetle büyüme. Fikir sayfası konseptin herkese açık
 * vaadidir; oda ise ilk inananların, potansiyel kurucu ortakların ve ilk
 * test edenlerin girişim etrafında toplandığı yerdir. Platform canlıdır:
 * bir konsepti yayınlamak sayfasını ve odasını hemen oluşturur. "Oda"
 * Matrix odasına bağlıdır (§6.3). İfade, yazılan içerikte hiçbir zaman
 * kullanılmaz.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'publish-a-startup-concept',
  title: 'Bir Girişim Konsepti Nasıl Yayınlanır: Fikir Sayfası + Oda | JoinOrigin',
  description:
    'JoinOrigin üzerinde bir girişim konsepti yayınlayın — ister fikir aşamasında ister zaten bir şirket işletiyor olun — herkese açık bir fikir sayfası yazın, odasını otomatik açın ve fikir etrafında ilk inananları, kurucu ortakları ve ilk test edenleri toplayın. JoinOrigin’den pratik adımlar.',
  intro: [
    'Her girişim — ister kâğıt üzerinde bir konsept olsun ister müşterilerle zaten faaliyet gösteriyor olsun — sermayeden çok insanlara ihtiyaç duyar: onu inşa edebilecek bir kurucu, teslim edebilecek bir ekip ve test edecek kullanıcılar. Kimsenin bulamadığı bir girişim bunların hiçbirini toplayamaz. Konsepti bulunabilir bir fikir sayfası olarak yayınlamak, ardından sohbetin yaşanabileceği bir oda açmak, bir girişim kurmanın dürüst ilk adımıdır — sunum değil, logo değil, pitch değil — ve inşa ettiği şeyin etrafında daha fazla inanan, kurucu ortak ve test eden isteyen mevcut bir şirket için de aynı şekilde çalışır.',
    'JoinOrigin döngüsü şöyle çalışır: bir girişim konsepti yayınlarsınız, herkese açık fikir sayfası belirir ve odası yayınlama anında otomatik oluşturulur. İnsanlar sayfayı bulur ya da bir bağlantıyı takip eder, katılmak tek tıklamadır ve odaya inerler — ilk inananların soru sorabildiği, potansiyel kurucu ortakların uyumu test edebildiği ve ilk kullanıcıların geri bildirim verebildiği, oluşturan kişinin kontrolündeki bir Matrix odası. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve kimin katılacağına ve içeride ne olacağına karar verir.',
    'Bu rehber, bir girişim konseptini bir operatör gibi yayınlamanın yolunu adım adım anlatır — konsept yepyeni olsun ya da şirket zaten faaliyette olsun: konsepti tek cümleye sıkıştırmak, sayfayı dürüst sinyallerle yazmak, sayfayı yayınlayıp odayı açmak, kurucu topluluklarıyla paylaşmak, ilk inananları ve test edenleri davet etmek, yapılandırılmış sohbetler yürütmek, odayı bir deneme ekibi oluşturmak için kullanmak ve konsept doğrulanırken odayı akışa beslemek.',
  ],
  dataPoints: [
    'Tek cümleye sıkıştırılmış bir girişim konsepti, uzun bir iş planından daha kolay paylaşılır, test edilir ve ekip kurar.',
    'JoinOrigin’de bir konsepti yayınlamak odasını otomatik oluşturur — girişimin baştan itibaren inananlar ve test edenler için bir yeri vardır.',
    'Katılım bağlantısı en basit davettir: tek bağlantı, tek tıklama ve ilgili bir kişi odadadır.',
    'JoinOrigin, insanların fikirleri ve arkalarındaki insanları bulmasına yardımcı olan bir topluluk işletim sistemidir — konseptinizi yayınlayın, odası hemen açılır.',
  ],
  faq: [
    {
      question: 'Bir girişim konsepti, küçük bir işletme fikri sayfasından nasıl farklıdır?',
      answer:
        'Sayfa formatı aynıdır, ancak vurgu değişir: küçük bir işletme fikri bir müşteriye ve bir teklife odaklanırken, bir girişim konsepti iddialı bir soruna ve onu çözmek için gereken ekibe odaklanır. Bir girişim sayfası, yerel müşteriler yerine ilk inananları, potansiyel kurucu ortakları ve ilk test edenleri çeker.',
    },
    {
      question: 'Girişim konseptim için oda ne zaman oluşturulur?',
      answer:
        'Oda, konsepti yayınladığınız anda otomatik oluşturulur. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. Hâlihazırda kullandığınız araçlarla da bir oda açabilir ve iddiayı paylaşan insanları davet edebilirsiniz.',
    },
    {
      question: 'Bir girişim konsepti odasına kim katılmalı?',
      answer:
        'Sorunu paylaşan ilk inananlar, uyumu test eden potansiyel kurucu ortaklar ve kaba bir sürümü denemeye istekli ilk kullanıcılar. Oda, bir konsepti ekibe dönüştüren insanları bulduğunuz yerdir — sıcak tanıştırmaların aylar süreceği insanlar.',
    },
    {
      question: 'İyi bir girişim konsepti sayfasını ne yapar?',
      answer:
        'Sorun ve yaklaşım hakkında tek dürüst cümle, konseptin aşaması ve ihtiyacınız olan spesifik yardım — bir geliştirici, bir tasarımcı, bir alan uzmanı, ilk test edenler. Aşama konusunda dürüstlük doğru insanları çeker; abartmak kimseyi çekmez.',
    },
    {
      question: 'JoinOrigin bugün bir girişim konsepti yayınlamama yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin’de bir konsepti yayınlamak sayfasını ve odasını tek parça halinde oluşturur — oda, yayınladığınız anda açılır ve onu baştan itibaren siz kontrol edersiniz. Konsepti herkese açık bir yerde yayınlayın ve tartışma için bir oda açın; davet ettiğiniz her yeni üye erişiminizi genişletir.',
    },
  ],
  sections: [
    'Konsepti tek cümleye sıkıştırın. Girişimi özüne indirgeyin: sorun, yaklaşım ve kimin için olduğu. Tek cümlede söyleyemiyorsanız konsept yayınlanmaya hazır değildir. JoinOrigin, bulunabilir fikir sayfaları etrafında tasarlanmıştır ve tek cümlelik bir sunum sayfanın çekirdeğidir. Cümleyi yazın ve sorunu anlayan üç kişi üzerinde test edin.',
    'Sayfayı dürüst sinyallerle yazın. Sorunu, yaklaşımı, aşamayı — fikir, prototip ya da ürün — ve ihtiyacınız olan spesifik yardımı belirtin. Dürüstlük doğru insanları çeker. JoinOrigin’de bir konsepti yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Sayfayı kısa bir herkese açık gönderi olarak taslaklayın ve geri bildirimle yineleyin.',
    'Konsepti yayınlayın ve odasını açın. Yayınlamak, konseptin bulunabilir hale geldiği andır. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir. JoinOrigin’de sayfa, oda ve katılım bağlantısı tek bir yayındır. Konsepti herkese açık yayınlayın ve etrafındaki sohbet için bir oda açın.',
    'Konsepti kurucu topluluklarıyla paylaşın. Girişimler kurucu ağlarıyla büyür. Fikir sayfasını kurucu gruplarıyla, girişim topluluklarıyla, hızlandırıcılarla ve sorunu bilen herkesle paylaşın. JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Konseptinize giden tek kısa, net bir bağlantı işi görür.',
    'İlk inananları ve test edenleri davet edin. İddiayı paylaşan insanları davet edin: potansiyel kurucu ortaklar, alan uzmanları ve kaba bir sürümü denemeye istekli kullanıcılar. JoinOrigin keşfi kolaylaştırır — bir fikir arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve katılan her kişi kendi ağına açılan bir kanal olur.',
    'Odada yapılandırılmış sohbetler yürütün. Katılanlara neyin heyecanlandırdığını, neyin endişelendirdiğini ve ilk olarak ne yapacaklarını sorun. Bir girişim odası sürekli bir mülakattır — yanıtlar konsepti şekillendirir. JoinOrigin bu sohbetleri yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, konsepte ilginin içgörüye dönüştüğü tek bir oda verir ve o odaya oluşturan kişi sahiptir. Sohbetleri doğrudan odada yürütün.',
    'Odayı bir deneme ekibi oluşturmak için kullanın. Doğru insanlar ortaya çıktığında küçük bir deneme önerin — bir prototip, bir açılış sayfası ya da bir çalışma oturumu — ve ekibin birlikte nasıl çalıştığını görün. JoinOrigin, Origins işleri ve projeleri için ortak bir oda verir; bu da bir denemenin ortaya çıkması için doğal bir yerdir. Küçük, gerçek bir prototip uyumun en güvenilir testidir.',
    'Doğrularken odayı akışa besleyin. Güncellemeler yayınlamaya devam edin, odayı canlı tutun ve konseptin ivmesinin daha geniş bir ağ tarafından görünür olmasına izin verin. Akış, bir konsepti insanların önemsediğinin kanıtına dönüştürür. JoinOrigin’de oda güncellemeleri akışa akar — her yeni üyenin keşif yüzeyini genişlettiği büyüme döngüsü. Keşfedilin ve büyüyün.',
  ],
  steps: [
    {
      title: 'Konsepti tek cümleye sıkıştırın',
      body: 'Girişimi özüne indirgeyin: sorun, yaklaşım ve kimin için olduğu. Tek cümlede söyleyemiyorsanız konsept yayınlanmaya hazır değildir.',
      joinOriginNote:
        'JoinOrigin, bulunabilir fikir sayfaları etrafında tasarlanmıştır ve tek cümlelik bir sunum sayfanın çekirdeğidir. Cümleyi yazın ve sorunu anlayan üç kişi üzerinde test edin.',
    },
    {
      title: 'Sayfayı dürüst sinyallerle yazın',
      body: 'Sorunu, yaklaşımı, aşamayı — fikir, prototip ya da ürün — ve ihtiyacınız olan spesifik yardımı belirtin. Dürüstlük doğru insanları çeker.',
      joinOriginNote:
        'JoinOrigin’de bir konsepti yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Sayfayı kısa bir herkese açık gönderi olarak taslaklayın ve geri bildirimle yineleyin.',
    },
    {
      title: 'Konsepti yayınlayın ve odasını açın',
      body: 'Yayınlamak, konseptin bulunabilir hale geldiği andır. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir.',
      joinOriginNote:
        'JoinOrigin’de sayfa, oda ve katılım bağlantısı tek bir yayındır. Konsepti herkese açık yayınlayın ve etrafındaki sohbet için bir oda açın.',
    },
    {
      title: 'Konsepti kurucu topluluklarıyla paylaşın',
      body: 'Girişimler kurucu ağlarıyla büyür. Fikir sayfasını kurucu gruplarıyla, girişim topluluklarıyla, hızlandırıcılarla ve sorunu bilen herkesle paylaşın.',
      joinOriginNote:
        'JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Konseptinize giden tek kısa, net bir bağlantı işi görür.',
    },
    {
      title: 'İlk inananları ve test edenleri davet edin',
      body: 'İddiayı paylaşan insanları davet edin: potansiyel kurucu ortaklar, alan uzmanları ve kaba bir sürümü denemeye istekli kullanıcılar.',
      joinOriginNote:
        'JoinOrigin keşfi kolaylaştırır — bir fikir arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve katılan her kişi kendi ağına açılan bir kanal olur.',
    },
    {
      title: 'Odada yapılandırılmış sohbetler yürütün',
      body: 'Katılanlara neyin heyecanlandırdığını, neyin endişelendirdiğini ve ilk olarak ne yapacaklarını sorun. Bir girişim odası sürekli bir mülakattır — yanıtlar konsepti şekillendirir.',
      joinOriginNote:
        'JoinOrigin bu sohbetleri yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, konsepte ilginin içgörüye dönüştüğü tek bir oda verir ve o odaya oluşturan kişi sahiptir. Sohbetleri doğrudan odada yürütün.',
    },
    {
      title: 'Odayı bir deneme ekibi oluşturmak için kullanın',
      body: 'Doğru insanlar ortaya çıktığında küçük bir deneme önerin — bir prototip, bir açılış sayfası ya da bir çalışma oturumu — ve ekibin birlikte nasıl çalıştığını görün.',
      joinOriginNote:
        'JoinOrigin, Origins işleri ve projeleri için ortak bir oda verir; bu da bir denemenin ortaya çıkması için doğal bir yerdir. Küçük, gerçek bir prototip uyumun en güvenilir testidir.',
    },
    {
      title: 'Doğrularken odayı akışa besleyin',
      body: 'Güncellemeler yayınlamaya devam edin, odayı canlı tutun ve konseptin ivmesinin daha geniş bir ağ tarafından görünür olmasına izin verin. Akış, bir konsepti insanların önemsediğinin kanıtına dönüştürür.',
      joinOriginNote:
        'JoinOrigin’de oda güncellemeleri akışa akar — her yeni üyenin keşif yüzeyini genişlettiği büyüme döngüsü. Keşfedilin ve büyüyün.',
    },
  ],
};

export default content;
