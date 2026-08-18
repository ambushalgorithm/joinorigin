import type { GuideContent } from '../../types';

/**
 * "Bir Fikir Nasıl Yayınlanır" — L1 kalıcı rehber (tasarım §6.1, TASK-353).
 *
 * Ürün ekran akışı §2 temel döngüsüne göre yazılmıştır: Keşfet → Fikir
 * herkese açık sayfası → Bağlantıyla katıl → Oda YAYINLAMA ANINDA otomatik
 * oluşturulur → oluşturan kişi odayı yönetir → akış/davetle büyüme. Fikir
 * sayfası herkese açık vaattir; oda ise ilgilenen insanların toplanıp
 * konuştuğu yerdir. Platform canlıdır: bir fikri yayınlamak sayfasını ve
 * odasını hemen oluşturur. "Oda" Matrix odasına bağlıdır (§6.3). İfade,
 * yazılan içerikte hiçbir zaman kullanılmaz.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'publish-an-idea',
  title:
    'Bir Fikir Nasıl Yayınlanır: Bir Kıvılcımı Bulunabilir Bir Fikir Sayfasına Dönüştürün | JoinOrigin',
  description:
    'JoinOrigin üzerinde bir fikir yayınlayın — ister yepyeni bir kıvılcım ister insanların bulmasını istediğiniz mevcut bir proje olsun — herkese açık bir fikir sayfası yazın, odasının otomatik açılmasına izin verin ve sizinle birlikte inşa etmek isteyen insanları davet edin. JoinOrigin’den pratik adımlar.',
  intro: [
    'Çoğu fikir taslaklarda ölür — telefonda bir not, yarım hatırlanan bir sohbet, kimsenin görmediği bir doküman. Bunun nedeni nadiren fikrin kötü olmasıdır. Nedeni, kimsenin onu bulamamasıdır ve doğru insanları bulmak oyunun tamamıdır. İnsanları bağlama sorunu tam olarak JoinOrigin’in çözdüğü şeydir — ister fikir yepyeni bir kıvılcım olsun ister bulunabilir bir yuvası olmadan sessizce ilerleyen mevcut bir proje.',
    'JoinOrigin döngüsü şöyle çalışır: bir fikir yayınlarsınız, herkese açık bir fikir sayfası belirir ve odası yayınlama anında otomatik oluşturulur. İnsanlar sayfayı Keşfet aracılığıyla bulur ya da paylaştığınız bir bağlantıyı takip eder ve katılmak tek tıklamadır. Odaya inerler — fikir etrafındaki sohbetin gerçekten yaşandığı, oluşturan kişinin kontrolündeki bir Matrix odası. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve kimin katılacağına ve içeride ne olacağına karar verir.',
    'Bu rehber yolun tamamını adım adım anlatır: fikri tek net bir cümleye sıkıştırmak, insanların bulabileceği bir sayfa yazmak, sayfayı yayınlayıp odayı açmak, katılım bağlantısını paylaşmak, ilk ilgili insanları davet etmek, ilk sohbete ev sahipliği yapmak, fikri gerçek geri bildirimden yola çıkarak iyileştirmek ve fikir büyürken bulunabilir kalmasını sağlamak. Her fikir için çalışır — küçük bir işletme, bir girişim, bir kitap kulübü, bir topluluk projesi, henüz var olmayan bir ürün veya zaten var olan ve çevresinde daha fazla insana ihtiyaç duyan bir proje.',
  ],
  dataPoints: [
    'Tek cümlelik bir fikir sunumu, uzun bir dokümandan daha bulunabilirdir — netlik bir keşif özelliğidir.',
    'JoinOrigin’de bir fikri yayınlamak odasını otomatik oluşturur — ayrı bir “sohbeti sonra oluştur” adımı asla yoktur.',
    'Katılım bağlantısı en basit davettir: tek bağlantı, tek tıklama ve ilgili bir kişi odadadır.',
    'JoinOrigin, insanların fikirleri ve arkalarındaki insanları bulmasına yardımcı olan bir topluluk işletim sistemidir — fikrinizi yayınlayın, odası hemen açılır.',
  ],
  faq: [
    {
      question: 'Fikir sayfası tam olarak nedir?',
      answer:
        'Fikir sayfası, JoinOrigin’deki bir fikrin herkese açık, aranabilir evidir — fikrin ne olduğunu, neden önemli olduğunu ve kimin için olduğunu belirten, Katıl eylemi içeren net bir sayfa. İnsanlar onu Keşfet ya da paylaşılan bir bağlantı aracılığıyla bulur ve katılmak onları fikrin odasına götürür.',
    },
    {
      question: 'Oda ne zaman oluşturulur?',
      answer:
        'Oda, fikri yayınladığınız anda otomatik oluşturulur. Oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. Aynı yapıyı — herkese açık bir sayfa artı bir oda — hâlihazırda kullandığınız araçlarla da kurabilirsiniz.',
    },
    {
      question: 'İnsanlar fikrimi nasıl bulur?',
      answer:
        'Keşif ve paylaşım yoluyla: bir fikir sayfası aranabilirdir ve Keşfet’te görünür; paylaştığınız her katılım bağlantısı da doğrudan ona işaret eder. En güvenilir erken trafik kişiseldir — sayfayı ve bağlantısını sorunu zaten önemseyen insanlarla paylaşmak.',
    },
    {
      question: 'Fikir ile proje arasındaki fark nedir?',
      answer:
        'Fikir, çevresinde insanların toplandığı bir öneridir — oda, ilgili insanların konuştuğu ve uyumu test ettiği yerdir. Proje ise oluşmuş bir grubun birlikte yapmaya başladığı, kendi proje sayfası ve odası olan iştir. Önce fikri yayınlayın; insanlar bağlandığında proje onu izler.',
    },
    {
      question: 'JoinOrigin bugün bir fikir yayınlamama yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin’de bir fikri yayınlamak sayfasını ve odasını tek parça halinde oluşturur — oda, yayınladığınız anda açılır ve onu baştan itibaren siz kontrol edersiniz. Fikrinizi yayınlayın ve tartışma için bir oda açın; davet ettiğiniz her yeni üye erişiminizi genişletir.',
    },
  ],
  sections: [
    'Fikri tek net bir cümleyle tanımlayın. Fikri tek bir cümleye sıkıştırın: kimin için, neyi değiştirdiği ve neden önemli olduğu. Tek cümlede söyleyemiyorsanız yayınlamaya hazır değilsiniz demektir. JoinOrigin, bulunabilir fikir sayfaları etrafında tasarlanmıştır — tek cümlelik bir sunum sayfanın çekirdeği ve insanların arayacağı ifadedir. Cümleyi yazın ve daha ileri gitmeden üç kişi üzerinde test edin.',
    'Fikir sayfasını bir vaat ve bir ihtiyaçla yazın. Sayfa, fikrin ne olduğunu, neden önemli olduğunu, neye ihtiyaç duyduğunu ve kimin katılmasını istediğinizi belirtmelidir. Fikrin nerede olduğu konusunda dürüst olun — bir kıvılcım, bir prototip, bir ürün. JoinOrigin, bir fikri yayınladığınızda sayfayı ve odayı otomatik oluşturur; oluşturan kişi odayı baştan itibaren kontrol eder ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. Fikri yayınlayın ve etrafında tartışma için bir oda açın.',
    'Fikri yayınlayın ve odasının açılmasına izin verin. Yayınlamak, fikrin bulunabilir hale geldiği andır. JoinOrigin’de yayınlamak odayı otomatik oluşturur — “sohbeti sonra oluştur” adımı asla yoktur ve oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir. JoinOrigin’de fikir sayfası ve odası tek bir atomik yayındır. Sayfayı herkese açık paylaşabilir ve odayı hâlihazırda kullandığınız araçlarda kurabilirsiniz.',
    'Katılım bağlantısını paylaşın. Katılım bağlantısı, ilgiden bağlantıya giden en kısa yoldur: tek bağlantı, tek tıklama ve ilgili bir kişi odaya iner. Doğru insanların toplandığı her yere koyun. JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Fikrinize giden tek kısa, net bir bağlantı işi görür.',
    'İlk ilgili insanları kişisel olarak davet edin. Kişisel davetler, herkese açık gönderilerden çok daha iyi dönüşüm sağlar. Fikrin hedef kitlesine uyan insanlara mesaj atın, katılım bağlantısını paylaşın ve önemseyebilecek bir kişi daha getirmelerini isteyin. JoinOrigin keşfi kolaylaştırır — bir fikir arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve katılan her kişi kendi ağına açılan bir kanal olur.',
    'İlk sohbete odada ev sahipliği yapın. İlk birkaç sohbet, bir fikrin ivmesi olup olmadığına karar verir. Odayı net bir soruyla açın — sorun nedir, ilk adım ne, her biriniz ne katıyorsunuz — ve insanların yanıt vermesine izin verin. JoinOrigin bu sohbetleri yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, fikre ilginin sohbete dönüştüğü tek bir oda verir ve o odaya oluşturan kişi sahiptir. Sohbeti, insanlarınızın zaten olduğu yerde başlatın.',
    'Geri bildirim toplayın ve fikri iyileştirin. Katılanlara neyin heyecanlandırdığını, neyin endişelendirdiğini ve ilk olarak ne yapacaklarını sorun. Sunumu, kapsamı ya da sonraki adımı yanıtlarına göre ayarlayın. JoinOrigin, bir fikrin ortak hafızasını tek bir yerde tutar — odadaki notlar, kararlar ve geri bildirim — böylece iyileştirme kaybolmak yerine görünür olur. İlk haftanın ardından üyelere doğrudan odada sorun.',
    'Fikir büyürken bulunabilir kalmasını sağlayın. Fikir geliştikçe sayfayı yeniden gözden geçirin — vaadi, ihtiyaçları ve sonraki adımı güncelleyin, böylece yeni katılanlar her zaman güncel sürümü görür. Büyüme, her üye fikri tek cümleyle anlatıp katılım bağlantısını paylaşabildiğinde bileşik etki yaratır. JoinOrigin, ilgi büyüdükçe fikir sayfanızı ve odasını bağlı tutar — vaadin, sohbetin ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
  ],
  steps: [
    {
      title: 'Fikri tek net bir cümleyle tanımlayın',
      body: 'Fikri tek bir cümleye sıkıştırın: kimin için, neyi değiştirdiği ve neden önemli olduğu. Tek cümlede söyleyemiyorsanız yayınlamaya hazır değilsiniz demektir.',
      joinOriginNote:
        'JoinOrigin, bulunabilir fikir sayfaları etrafında tasarlanmıştır — tek cümlelik bir sunum sayfanın çekirdeği ve insanların arayacağı ifadedir. Cümleyi yazın ve daha ileri gitmeden üç kişi üzerinde test edin.',
    },
    {
      title: 'Fikir sayfasını bir vaat ve bir ihtiyaçla yazın',
      body: 'Sayfa, fikrin ne olduğunu, neden önemli olduğunu, neye ihtiyaç duyduğunu ve kimin katılmasını istediğinizi belirtmelidir. Fikrin nerede olduğu konusunda dürüst olun — bir kıvılcım, bir prototip, bir ürün.',
      joinOriginNote:
        'JoinOrigin, bir fikri yayınladığınızda sayfayı ve odayı otomatik oluşturur; oluşturan kişi odayı baştan itibaren kontrol eder ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. Fikri yayınlayın ve etrafında tartışma için bir oda açın.',
    },
    {
      title: 'Fikri yayınlayın ve odasının açılmasına izin verin',
      body: 'Yayınlamak, fikrin bulunabilir hale geldiği andır. JoinOrigin’de yayınlamak odayı otomatik oluşturur — “sohbeti sonra oluştur” adımı asla yoktur ve oluşturan kişi odaya sıfırıncı saniyeden itibaren sahiptir.',
      joinOriginNote:
        'JoinOrigin’de fikir sayfası ve odası tek bir atomik yayındır. Sayfayı herkese açık paylaşabilir ve odayı hâlihazırda kullandığınız araçlarda kurabilirsiniz.',
    },
    {
      title: 'Katılım bağlantısını paylaşın',
      body: 'Katılım bağlantısı, ilgiden bağlantıya giden en kısa yoldur: tek bağlantı, tek tıklama ve ilgili bir kişi odaya iner. Doğru insanların toplandığı her yere koyun.',
      joinOriginNote:
        'JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Fikrinize giden tek kısa, net bir bağlantı işi görür.',
    },
    {
      title: 'İlk ilgili insanları kişisel olarak davet edin',
      body: 'Kişisel davetler, herkese açık gönderilerden çok daha iyi dönüşüm sağlar. Fikrin hedef kitlesine uyan insanlara mesaj atın, katılım bağlantısını paylaşın ve önemseyebilecek bir kişi daha getirmelerini isteyin.',
      joinOriginNote:
        'JoinOrigin keşfi kolaylaştırır — bir fikir arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve katılan her kişi kendi ağına açılan bir kanal olur.',
    },
    {
      title: 'İlk sohbete odada ev sahipliği yapın',
      body: 'İlk birkaç sohbet, bir fikrin ivmesi olup olmadığına karar verir. Odayı net bir soruyla açın — sorun nedir, ilk adım ne, her biriniz ne katıyorsunuz — ve insanların yanıt vermesine izin verin.',
      joinOriginNote:
        'JoinOrigin bu sohbetleri yürütmez; oda sizin şekillendireceğiniz yerdir. Platform, fikre ilginin sohbete dönüştüğü tek bir oda verir ve o odaya oluşturan kişi sahiptir. Sohbeti, insanlarınızın zaten olduğu yerde başlatın.',
    },
    {
      title: 'Geri bildirim toplayın ve fikri iyileştirin',
      body: 'Katılanlara neyin heyecanlandırdığını, neyin endişelendirdiğini ve ilk olarak ne yapacaklarını sorun. Sunumu, kapsamı ya da sonraki adımı yanıtlarına göre ayarlayın.',
      joinOriginNote:
        'JoinOrigin, bir fikrin ortak hafızasını tek bir yerde tutar — odadaki notlar, kararlar ve geri bildirim — böylece iyileştirme kaybolmak yerine görünür olur. İlk haftanın ardından üyelere doğrudan odada sorun.',
    },
    {
      title: 'Fikir büyürken bulunabilir kalmasını sağlayın',
      body: 'Fikir geliştikçe sayfayı yeniden gözden geçirin — vaadi, ihtiyaçları ve sonraki adımı güncelleyin, böylece yeni katılanlar her zaman güncel sürümü görür. Büyüme, her üye fikri tek cümleyle anlatıp katılım bağlantısını paylaşabildiğinde bileşik etki yaratır.',
      joinOriginNote:
        'JoinOrigin, ilgi büyüdükçe fikir sayfanızı ve odasını bağlı tutar — vaadin, sohbetin ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
    },
  ],
};

export default content;
