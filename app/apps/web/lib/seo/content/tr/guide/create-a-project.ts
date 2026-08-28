import type { GuideContent } from '../../types';

/**
 * "Bir Proje Nasıl Oluşturulur" — L1 kalıcı rehber (tasarım §6.1, TASK-353).
 *
 * Ürün ekran akışı §2 temel döngüsüne göre yazılmıştır: oluşmuş bir grup,
 * bir proje yayınlayarak sohbetten ortak çalışmaya geçer; proje sayfası
 * herkese açıktır, odası YAYINLAMA ANINDA otomatik oluşturulur, oluşturan
 * kişi odayı kontrol eder ve ilerleme akışa akar. Platform canlıdır: bir
 * projeyi yayınlamak sayfasını ve odasını hemen açar. "Oda" Matrix odasına
 * bağlıdır (§6.3). İfade, yazılan içerikte hiçbir zaman kullanılmaz.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'create-a-project',
  title: 'Bir Proje Nasıl Oluşturulur: Grup İvmesini Ortak Çalışmaya Dönüştürün | JoinOrigin',
  description:
    'JoinOrigin üzerinde bir proje oluşturun — ister yepyeni bir fikir ister hâlihazırda devam eden bir iş olsun — ortak bir proje sayfası yayınlayın, odasını otomatik açın ve bir grubun sohbetini sonuç üreten işe dönüştürün. JoinOrigin’den pratik adımlar.',
  intro: [
    'Yalnızca konuşan bir grup eninde sonunda duraklar. Canlı hissettiren bir Origin ile solup giden arasındaki fark ortak çalışmadır — adı, hedefi ve ilerlemenin görünür olduğu bir yeri olan bir proje. Bir sohbeti projeye dönüştürmek de bir insanları bağlama sorunudur: doğru insanlara, doğru bağlılığa ve birlikte çalışmak için tek net bir yere ihtiyacınız vardır. Proje zaten var olduğunda da durum aynıdır — dosyalara, mesajlara ve tek bir kişinin yapılacaklar listesine dağılmış olsa da yine görünür bir yuvaya ve çevresinde doğru insanlara ihtiyaç duyar.',
    'JoinOrigin akışı bu geçişi yönetir: oluşmuş bir grup bir proje yayınlar ve proje sayfası, odasının yayınlama anında otomatik oluşturulmasıyla birlikte herkese açık olarak belirir. Üyeler proje odasına bir bağlantıyla katılır, oluşturan kişi onu oda sahibi olarak kontrol eder ve odadaki güncellemeler akışa akar; böylece tüm ağ çalışmayı görebilir. Proje odası yayınladığınız anda açılır — arada hiçbir kurulum adımı yoktur.',
    'Bu rehber, proje yepyeni olsun ya da hâlihazırda devam ediyor olsun, ilk kıvılcımdan çalışan bir ritme kadar uzanır: mevcut bir gruptan ve odasından başlamak, gerçekten sonuç verebilecek bir kapsam tanımlamak, proje sayfasını yazmak, sayfayı yayınlayıp odayı açmak, çalışma ekibini davet etmek, roller ve ilk bir kilometre taşı üzerinde anlaşmak, gerçek işi odaya taşımak ve ivme oluşturmak için ilerlemeyi paylaşmak.',
  ],
  dataPoints: [
    'Herkese açık sayfası ve net bir ilk kilometre taşı olan projeler ekip kurmayı kolaylaştırır — insanlar görebildikleri işe katılır.',
    'JoinOrigin’de bir projeyi yayınlamak odasını otomatik oluşturur — çalışma alanı, sayfayla aynı anda var olur.',
    'Proje odası işe tek bir yuva verir: katılan herkesin görebileceği kararlar, dosyalar ve ilerleme.',
    'JoinOrigin, oluşmuş grupların sohbetleri projelere dönüştürmesine yardımcı olan bir topluluk işletim sistemidir — projenizi yayınlayın, odası hemen açılır.',
  ],
  faq: [
    {
      question: 'Bir grubu proje başlatmaya hazır yapan şey nedir?',
      answer:
        'Bir grup, birkaç üye somut bir sonucu paylaştığında ve zaman ayırmaya istekli olduğunda hazırdır. Büyük bir ekibe ihtiyacınız yok — net bir kilometre taşına sahip üç kararlı kişi, bir düzine meraklı üyeyi yener. Sohbet “bunu gerçekten yapmalıyız” diye tekrarlanmaya başladığında projeyi yayınlayın.',
    },
    {
      question: 'Proje odası ne zaman oluşturulur?',
      answer:
        'Oda, projeyi yayınladığınız anda otomatik oluşturulur. Oluşturan kişi odaya baştan itibaren sahiptir, çalışma ekibini davet edebilir, roller atayabilir ve işi Element içinde düzenli tutabilir. Aynı yapıyı grubunuzun hâlihazırda kullandığı araçlarla da oluşturabilirsiniz.',
    },
    {
      question: 'Proje bir fikirden nasıl farklıdır?',
      answer:
        'Fikir, çevresinde insanların toplandığı bir öneridir — odası, ilgi ve uyumun test edildiği yerdir. Proje, oluşmuş bir grubun taahhüt ettiği, sayfası, odası ve bir kilometre taşı olan ortak iştir. İnsanlara ihtiyacınız olduğunda önce bir fikir yayınlayın; onlara zaten sahipken bir proje yayınlayın.',
    },
    {
      question: 'İlk kilometre taşı ne olmalı?',
      answer:
        'Küçük ve tamamlanabilir — bir çalışma taslağı, bir pilot, bir ilk sürüm ya da birkaç hafta içinde teslim edilebilen bir çıktı. Kısa bir ilk kilometre taşı grupta güven inşa eder ve projeyi yeni katılanlar için gerçek kılar. İlk zaferden sonra her zaman genişleyebilirsiniz.',
    },
    {
      question: 'JoinOrigin bir grubun bugün proje başlatmasına yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin’de bir projeyi yayınlamak sayfasını ve odasını tek parça halinde oluşturur — oda, yayınladığınız anda açılır ve oluşturan kişi onu kontrol eder. Grubun hedefini seçin, ortak bir proje yuvası oluşturun ve iş için bir oda açın; davet ettiğiniz her yeni üye erişiminizi genişletir.',
    },
  ],
  sections: [
    'Mevcut bir gruptan ve odasından başlayın. Bir proje, güveni ve ivmesi zaten olan bir gruptan doğar. Grubun odasındaki sohbetlere bakın ve tekrarlanan ihtiyacı bulun — üyelerin sürekli “bunu yapmalıyız” dediği şeyi. JoinOrigin, bir topluluğu oluşturan kişinin kontrolündeki bir odada yaşatır ve proje, o odanın üzerindeki bir sonraki katmandır. Gruptaki tekrarlanan ihtiyacı adlandırın ve üzerinde hareket etmek isteyen biri var mı diye test edin.',
    'Gerçekten sonuç verebilecek bir kapsam tanımlayın. Projenin ne üreteceğini, kimin için ve hangi zaman diliminde olduğunu yazın. İlk sürümü, grubun bitirebileceği kadar küçük tutun. JoinOrigin, herkese açık sayfaları olan projeler etrafında tasarlanmıştır — net bir kapsam, sayfayı okunabilir ve odayı odaklı yapan şeydir. Neyin ve ne zaman teslim edildiğini söyleyen tek bir cümle başlamak için yeterlidir.',
    'Proje sayfasını yazın. Sayfa, projenin hedefini, çözdüğü sorunu, üzerinde kimin çalıştığını ve neye ihtiyaç duyduğunu belirtmelidir. Aşama konusunda dürüst olun — erken bir taslak sorun değildir. JoinOrigin’de bir projeyi yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Proje tanımını, grubun insanları yönlendirebileceği bir yerde yayınlayın.',
    'Projeyi yayınlayın ve odasını açın. Yayınlamak, projeyi gerçek kılan şeydir: işin yaşadığı bir oda artı herkese açık bir sayfa. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir. JoinOrigin’de sayfa, oda ve çalışma ekibi tek bir yayındır. İsterseniz sayfayı ve odayı grubunuzun hâlihazırda kullandığı araçlarda oluşturun.',
    'Çalışma ekibini odaya davet edin. İşi gerçekten yapacak insanları davet edin — küçük, kararlı bir ekip geniş bir izleyici kitlesinden daha iyidir. Katılım bağlantısını paylaşın ve her kişiden zamanını onaylamasını isteyin. JoinOrigin’de katılmak tek bir eylemdir — proje sayfasında Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Proje odasına giden tek net bir bağlantı işi görür.',
    'Roller ve ilk kilometre taşı üzerinde anlaşın. Kimin neye sahip olduğunu, grubun ne sıklıkta toplandığını ve herkesin üzerinde çalıştığı ilk kilometre taşını adlandırın. Tüm ekibin görebileceği bir yere yazın. JoinOrigin rolleri sizin için atamaz — oluşturan kişi kontrolü, sizin karar verdiğiniz anlamına gelir. Platform, rolleri ve kilometre taşını proje odasında görünür tutar. Odada kısa, yazılı bir plan yeterlidir.',
    'Gerçek işi odaya taşıyın. “Şunu yapmalıyız” yerine “taslak burada”, “karar burada” ve “sonraki görev burada” deyin. İlerlemeyi herkesin takip edebileceği tek görünür yerde tutun. JoinOrigin, bir projenin odasını işi tutan yer haline getirir — kararlar, dosyalar ve güncellemeler — bunları özel mesajlara dağıtmak yerine. Çalışma ürünlerini ilk haftadan itibaren ortak odada tutun.',
    'İvme oluşturmak için ilerlemeyi paylaşın. Proje ilerledikçe güncellemeler yayınlayın, kilometre taşına ulaşıldığında kutlayın ve daha geniş grubu katılmaya ya da takip etmeye davet edin. Akıştaki ilerleme, projeyi topluluğun sonuç ürettiğinin kanıtına dönüştürür. JoinOrigin’de oda güncellemeleri akışa akar — her yeni üyenin keşif yüzeyini genişlettiği büyüme döngüsü. Keşfedilin ve büyüyün.',
  ],
  steps: [
    {
      title: 'Mevcut bir gruptan ve odasından başlayın',
      body: 'Bir proje, güveni ve ivmesi zaten olan bir gruptan doğar. Grubun odasındaki sohbetlere bakın ve tekrarlanan ihtiyacı bulun — üyelerin sürekli “bunu yapmalıyız” dediği şeyi.',
      joinOriginNote:
        'JoinOrigin, bir topluluğu oluşturan kişinin kontrolündeki bir odada yaşatır ve proje, o odanın üzerindeki bir sonraki katmandır. Gruptaki tekrarlanan ihtiyacı adlandırın ve üzerinde hareket etmek isteyen biri var mı diye test edin.',
    },
    {
      title: 'Gerçekten sonuç verebilecek bir kapsam tanımlayın',
      body: 'Projenin ne üreteceğini, kimin için ve hangi zaman diliminde olduğunu yazın. İlk sürümü, grubun bitirebileceği kadar küçük tutun.',
      joinOriginNote:
        'JoinOrigin, herkese açık sayfaları olan projeler etrafında tasarlanmıştır — net bir kapsam, sayfayı okunabilir ve odayı odaklı yapan şeydir. Neyin ve ne zaman teslim edildiğini söyleyen tek bir cümle başlamak için yeterlidir.',
    },
    {
      title: 'Proje sayfasını yazın',
      body: 'Sayfa, projenin hedefini, çözdüğü sorunu, üzerinde kimin çalıştığını ve neye ihtiyaç duyduğunu belirtmelidir. Aşama konusunda dürüst olun — erken bir taslak sorun değildir.',
      joinOriginNote:
        'JoinOrigin’de bir projeyi yayınlamak sayfasını ve odasını otomatik oluşturur ve oluşturan kişi odayı baştan itibaren kontrol eder. Proje tanımını, grubun insanları yönlendirebileceği bir yerde yayınlayın.',
    },
    {
      title: 'Projeyi yayınlayın ve odasını açın',
      body: 'Yayınlamak, projeyi gerçek kılan şeydir: işin yaşadığı bir oda artı herkese açık bir sayfa. JoinOrigin’de oda aynı anda otomatik oluşturulur — ayrı bir kurulum adımı yoktur ve oluşturan kişi ona sahiptir.',
      joinOriginNote:
        'JoinOrigin’de sayfa, oda ve çalışma ekibi tek bir yayındır. İsterseniz sayfayı ve odayı grubunuzun hâlihazırda kullandığı araçlarda oluşturun.',
    },
    {
      title: 'Çalışma ekibini odaya davet edin',
      body: 'İşi gerçekten yapacak insanları davet edin — küçük, kararlı bir ekip geniş bir izleyici kitlesinden daha iyidir. Katılım bağlantısını paylaşın ve her kişiden zamanını onaylamasını isteyin.',
      joinOriginNote:
        'JoinOrigin’de katılmak tek bir eylemdir — proje sayfasında Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Proje odasına giden tek net bir bağlantı işi görür.',
    },
    {
      title: 'Roller ve ilk kilometre taşı üzerinde anlaşın',
      body: 'Kimin neye sahip olduğunu, grubun ne sıklıkta toplandığını ve herkesin üzerinde çalıştığı ilk kilometre taşını adlandırın. Tüm ekibin görebileceği bir yere yazın.',
      joinOriginNote:
        'JoinOrigin rolleri sizin için atamaz — oluşturan kişi kontrolü, sizin karar verdiğiniz anlamına gelir. Platform, rolleri ve kilometre taşını proje odasında görünür tutar. Odada kısa, yazılı bir plan yeterlidir.',
    },
    {
      title: 'Gerçek işi odaya taşıyın',
      body: '“Şunu yapmalıyız” yerine “taslak burada”, “karar burada” ve “sonraki görev burada” deyin. İlerlemeyi herkesin takip edebileceği tek görünür yerde tutun.',
      joinOriginNote:
        'JoinOrigin, bir projenin odasını işi tutan yer haline getirir — kararlar, dosyalar ve güncellemeler — bunları özel mesajlara dağıtmak yerine. Çalışma ürünlerini ilk haftadan itibaren ortak odada tutun.',
    },
    {
      title: 'İvme oluşturmak için ilerlemeyi paylaşın',
      body: 'Proje ilerledikçe güncellemeler yayınlayın, kilometre taşına ulaşıldığında kutlayın ve daha geniş grubu katılmaya ya da takip etmeye davet edin. Akıştaki ilerleme, projeyi topluluğun sonuç ürettiğinin kanıtına dönüştürür.',
      joinOriginNote:
        'JoinOrigin’de oda güncellemeleri akışa akar — her yeni üyenin keşif yüzeyini genişlettiği büyüme döngüsü. Keşfedilin ve büyüyün.',
    },
  ],
};

export default content;
