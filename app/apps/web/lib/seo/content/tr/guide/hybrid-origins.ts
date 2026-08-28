import type { GuideContent } from '../../types';

/**
 * "Hibrit Origin’ler" — L1 kalıcı rehber (tasarım §6.1, TASK-326).
 *
 * Dijital bağlan→katıl→oda modeline göre yeniden odaklanmıştır: oda, hibrit
 * bir topluluğun çevrimiçi ve (aşağı yönlü) yüz yüze kısımlarını
 * bağlayan şeydir — tek Origin, tek oda, iki giriş noktası. JoinOrigin
 * değeri girişe ve her adıma (adım başına `joinOriginNote`) işlenmiştir,
 * dürüst çerçeveyle — JoinOrigin etkinlik araçları sağlamaz ya da hibrit
 * etkinliklere personel sağlamaz. Tek H1, adım adım yapı, SSS `FAQPage`
 * JSON-LD ile 1:1 yansıtılır. "Oda" Matrix odasına bağlıdır (§6.3) —
 * fiziksel mekanlar mekan/alan olarak tanımlanır, asla "oda" değil.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'hybrid-origins',
  title: "Hibrit Origin'ler: Yüz Yüze + Çevrimiçi Birlikte Nasıl Yürütülür | JoinOrigin",
  description:
    'Odanın yüz yüze ve çevrimiçi üyeleri bağladığı bir hibrit Origin yürütün — ister sıfırdan başlıyor ister mevcut bir Origin’i hibrit yapıyor olun — doğru araçları seçin, eşit katılımı tasarlayın ve iki kitleyi de bağlı tutun. JoinOrigin’den.',
  intro: [
    'Hibrit bir Origin, insanları aynı anda iki yerde bir araya getirir — fiziksel olarak bir mekanda ve sanal olarak bir ekran aracılığıyla — ve asıl zorluk yine insanlarla ilgilidir: iki kitlenin de ayrı iki Origin değil, tek bir bağlı Origin gibi hissetmesini sağlamak. JoinOrigin tam da bu insanları bağlama hedefiyle kurulmuştur ve model, zaten var olan bir Origin için de yeni başlayan bir Origin için de işe yarar — yerleşik bir yüz yüze grup çevrimiçi bir yarı ekleyebilir ve çevrimiçi bir Origin yerel olarak buluşmaya başlayabilir.',
    'JoinOrigin, insanların toplulukları bulmasına, katılmasına ve başlatmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir — böylece hibrit bir grubun çevrimiçi ve (aşağı yönlü) yüz yüze kısımlarını bağlayan tek bir odası vardır: yerel ve uzak üyeler aynı topluluğu, aynı ritmi ve aynı sonraki adımları görür. Dijital bağlan→katıl→oda modelinde oda, topluluğun iki yarısının da buluşmalar arasında yaşadığı kalıcı yüzeydir; yüz yüze etkinlik, odanın öncesinde ve sonrasında bir arada tuttuğu aşağı yönlü bir sonuçtur. JoinOrigin etkinlik araçları sağlamaz ya da hibrit etkinliklere personel sağlamaz — platform, hibrit dahil her topluluğa üyelerinin bağlı kaldığı tek bir oda verir.',
    'Bu rehber, hibrit Origin’leri başarılı kılan pratik kararları kapsar — yeni gruplar için de mevcut gruplar için de: hibritin doğru model olup olmadığına karar vermek, iki kitlenin de paylaştığı odayı kurmak, uyan bir format ve araçlar seçmek, yüz yüze ve çevrimiçi üyelerin aynı deneyimi paylaşması için buluşmayı tasarlamak, hiçbir tarafın baskın olmaması için alanı yönetmek ve Origin’i buluşmalar arasında bir arada tutan kalıcı bir oda sürdürmek. Her adım JoinOrigin’in nerede yardımcı olduğunu gösterir.',
  ],
  dataPoints: [
    'Hibrit bir Origin, ayrı ayrı hizmet verilecek iki kitle değil, iki giriş noktası olan tek bir Origin’dir.',
    'Oda bağ dokusudur: iki kitlenin de aynı güncellemeleri, notları ve sonraki adımları gördüğü tek bir paylaşılan yer.',
    'Basit, güvenilir araçlar — tek bir video bağlantısı, tek bir ortak doküman — hibrit buluşmaları öldüren sürtünmeyi azaltır.',
    'JoinOrigin, insanların toplulukları bulmasına veya başlatmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir; etkinlik araçları sağlamaz ya da hibrit etkinliklere personel sağlamaz.',
  ],
  faq: [
    {
      question: 'Bir Origin ne zaman hibrit olmalı?',
      answer:
        'Kitlenizin bir kısmı mesafe, program ya da hareketlilik nedeniyle güvenilir şekilde yüz yüze katılamadığında ve Origin hâlâ tek bir paylaşılan kimlik istediğinde. Herkes yerel olarak buluşabiliyorsa yüz yüze buluşmak daha basit ve genellikle daha iyidir.',
    },
    {
      question: 'Hibrit bir buluşma için minimum araç kurulumu nedir?',
      answer:
        'Uzak üyeler için tek bir video görüşme bağlantısı, notlar için tek bir ortak doküman ve iki kitlenin de buluşmalar arasında bağlı kaldığı tek bir oda. Daha fazla araç daha fazla arıza noktası ekler; minimumdan başlayın ve yalnızca topluluğun istediğini ekleyin.',
    },
    {
      question: 'Uzak üyelerin seyirci gibi hissetmesini nasıl önlerim?',
      answer:
        'Eşit katılım için tasarlayın: hibrit bir tanışma turu yapın, uzak üyeleri açıkça söz almaları için çağırın, görseller için ekranı paylaşın ve iki tarafın da yazabildiği ortak bir doküman kullanın. Uzak tarafı sürekli izleyen bir kişi atayın.',
    },
    {
      question: 'JoinOrigin bir hibrit Origin yürütmeme yardımcı olabilir mi?',
      answer:
        'Evet. JoinOrigin, insanların Origins bulmasına ve başlatmasına yardımcı olur — yerel ve uzak üyelerin bağlı kaldığı tek bir oda. JoinOrigin etkinlik araçları sağlamaz, bu nedenle bu rehberdeki pratik hibrit uygulamalar hâlihazırda sahip olduğunuz araçlarla çalışır.',
    },
  ],
  sections: [
    'Hibritin doğru model olup olmadığına karar verin. Yüz yüze buluşmak anlamlı olduğunda hibrit olun. Çoğu üye yerel olarak buluşabiliyorsa yüz yüze buluşmak bağı güçlendirir — hibrit, güvenin daha hızlı kurulmasını ve insanları daha iyi okumayı sağlar. JoinOrigin herhangi bir topluluğun üye bulmasına ve tutmasına yardımcı olmak için tasarlanmıştır, ancak format kararı sizindir. Yalnızca yüz yüze buluşmak anlamlı olduğunda hibrit olun.',
    'İki kitlenin de paylaştığı odayı kurun. Her şeyden önce, Origin’in uzak ve yerel üyelerin konuştuğu, güncellemeler paylaştığı ve aynı sonraki adımları gördüğü ortak bir odaya sahip olduğundan emin olun. Oda, hibritin iki Origin yerine tek bir Origin gibi hissetmesini sağlayan şeydir. JoinOrigin’de her grubun yayından itibaren bir odası vardır — çevrimiçi ve yüz yüze kısımları bir arada tutan kalıcı yüzey. İki kitlenin de katılabileceği tek bir ortak oda kurun.',
    'Güvenilir tek bir video aracı ve tek bir ortak doküman seçin. Yığını minimumda tutun: uzak üyeler için bir video görüşme bağlantısı, notlar ve paylaşılan bağlantılar için bir doküman ve tek bir takvim girişi. Karmaşıklık, tutarlı hibrit buluşmaların düşmanıdır. JoinOrigin etkinlik araçları sağlamaz — yığını minimumda tutun. Platform, bağlantının ve dokümanın yaşadığı kalıcı odadır, etkinlik aracının kendisi değil.',
    'Gündemi iki kitle için tasarlayın. Uzak üyeleri isimleriyle içeren bir tanışma turu yapın, görselleri ortak bir ekranda tutun ve çevrimiçi tarafın konuşması için alan bırakın. Hibrit bir gündem iki kitleyi de açıkça adlandırır. JoinOrigin’de iki kitle tek bir Origin odasını paylaşır, bu da "iki kitle için tasarlamayı" doğal bir uyum haline getirir. İki kitleyi de gündemde açıkça adlandırın.',
    'Bir köprü kişisi atayın. Bir kişi uzak tarafı izler: geç katılanları selamlar, uzaktaki el kaldıranları çağırır ve mekanın kaçırdığını aktarır. Bir köprü olmadan çevrimiçi kitle seyirciye dönüşür. JoinOrigin etkinliklere personel sağlamaz — köprü kişisi insani bir roldür. Platform topluluğu tek bir odada organize tutar, böylece köprünün kimin katıldığını ve neyin paylaşıldığını göreceği tek bir yeri olur.',
    'Alanı iki tarafın da katılacağı şekilde yönetin. Yüz yüze üyelerden tek tek konuşmalarını ve soruları mikrofon için tekrarlamalarını isteyin, insanları kameranın yakınına oturtun ve mekan ile görüşme arasında sırayla söz verin — ortak oda ikisine de açık kalırken. JoinOrigin, üyeler arasında eşit bağlantı etrafında tasarlanmıştır — hibrit tartışmayı işe yarayan ilke de aynıdır. Mekan ile görüşme arasında sırayla söz verin ve soruları mikrofon için tekrarlayın.',
    'Odayı buluşmalar arasında canlı tutun. Origin etkinlikler arasında odada yaşar: uzak ve yerel üyeler orada güncellemeler paylaşır, sorular sorar ve birlikte planlar. Hibrit tek bir etkinlik formatı değildir — devam eden bir paylaşılan alandır. Bu adım, JoinOrigin’in tasarım amacına en yakın adımdır: bir topluluk işletim sistemi, uzak ve yerel üyelerin güncellemeler paylaştığı ve birlikte planladığı kalıcı bir odadır. Ortak bir oda işe yarar — JoinOrigin o alandır.',
    'Çıktıyı odada yakalayın ve paylaşın. Her buluşmadan sonra notları, kayıtları ve sonraki adımları ortak odada yayınlayın. Görünür bir ürün iki kitleyi de bağlı tutar ve topluluğun üretken hissetmesini sağlar. JoinOrigin’de bir topluluğun çıktısı tek bir düzenli odada yaşar — notlar, kayıtlar, sonraki adımlar. Her buluşmadan sonra onları ortak odada yayınlayın.',
  ],
  steps: [
    {
      title: 'Hibritin doğru model olup olmadığına karar verin',
      body: 'Yüz yüze buluşmak anlamlı olduğunda hibrit olun. Çoğu üye yerel olarak buluşabiliyorsa yüz yüze buluşmak bağı güçlendirir — hibrit, güvenin daha hızlı kurulmasını ve insanları daha iyi okumayı sağlar.',
      joinOriginNote:
        'JoinOrigin herhangi bir topluluğun üye bulmasına ve tutmasına yardımcı olmak için tasarlanmıştır, ancak format kararı sizindir. Yalnızca yüz yüze buluşmak anlamlı olduğunda hibrit olun.',
    },
    {
      title: 'İki kitlenin de paylaştığı odayı kurun',
      body: 'Her şeyden önce, Origin’in uzak ve yerel üyelerin konuştuğu, güncellemeler paylaştığı ve aynı sonraki adımları gördüğü ortak bir odaya sahip olduğundan emin olun. Oda, hibritin iki Origin yerine tek bir Origin gibi hissetmesini sağlayan şeydir.',
      joinOriginNote:
        'JoinOrigin’de her grubun yayından itibaren bir odası vardır — çevrimiçi ve yüz yüze kısımları bir arada tutan kalıcı yüzey. İki kitlenin de katılabileceği tek bir ortak oda kurun.',
    },
    {
      title: 'Güvenilir tek bir video aracı ve tek bir ortak doküman seçin',
      body: 'Yığını minimumda tutun: uzak üyeler için bir video görüşme bağlantısı, notlar ve paylaşılan bağlantılar için bir doküman ve tek bir takvim girişi. Karmaşıklık, tutarlı hibrit buluşmaların düşmanıdır.',
      joinOriginNote:
        'JoinOrigin etkinlik araçları sağlamaz — yığını minimumda tutun. Platform, bağlantının ve dokümanın yaşadığı kalıcı odadır, etkinlik aracının kendisi değil.',
    },
    {
      title: 'Gündemi iki kitle için tasarlayın',
      body: 'Uzak üyeleri isimleriyle içeren bir tanışma turu yapın, görselleri ortak bir ekranda tutun ve çevrimiçi tarafın konuşması için alan bırakın. Hibrit bir gündem iki kitleyi de açıkça adlandırır.',
      joinOriginNote:
        'JoinOrigin’de iki kitle tek bir Origin odasını paylaşır, bu da "iki kitle için tasarlamayı" doğal bir uyum haline getirir. İki kitleyi de gündemde açıkça adlandırın.',
    },
    {
      title: 'Bir köprü kişisi atayın',
      body: 'Bir kişi uzak tarafı izler: geç katılanları selamlar, uzaktaki el kaldıranları çağırır ve mekanın kaçırdığını aktarır. Bir köprü olmadan çevrimiçi kitle seyirciye dönüşür.',
      joinOriginNote:
        'JoinOrigin etkinliklere personel sağlamaz — köprü kişisi insani bir roldür. Platform topluluğu tek bir odada organize tutar, böylece köprünün kimin katıldığını ve neyin paylaşıldığını göreceği tek bir yeri olur.',
    },
    {
      title: 'Alanı iki tarafın da katılacağı şekilde yönetin',
      body: 'Yüz yüze üyelerden tek tek konuşmalarını ve soruları mikrofon için tekrarlamalarını isteyin, insanları kameranın yakınına oturtun ve mekan ile görüşme arasında sırayla söz verin — ortak oda ikisine de açık kalırken.',
      joinOriginNote:
        'JoinOrigin, üyeler arasında eşit bağlantı etrafında tasarlanmıştır — hibrit tartışmayı işe yarayan ilke de aynıdır. Mekan ile görüşme arasında sırayla söz verin ve soruları mikrofon için tekrarlayın.',
    },
    {
      title: 'Odayı buluşmalar arasında canlı tutun',
      body: 'Origin etkinlikler arasında odada yaşar: uzak ve yerel üyeler orada güncellemeler paylaşır, sorular sorar ve birlikte planlar. Hibrit tek bir etkinlik formatı değildir — devam eden bir paylaşılan alandır.',
      joinOriginNote:
        'Bu adım, JoinOrigin’in tasarım amacına en yakın adımdır: bir topluluk işletim sistemi, uzak ve yerel üyelerin güncellemeler paylaştığı ve birlikte planladığı kalıcı bir odadır. Ortak bir oda işe yarar — JoinOrigin o alandır.',
    },
    {
      title: 'Çıktıyı odada yakalayın ve paylaşın',
      body: 'Her buluşmadan sonra notları, kayıtları ve sonraki adımları ortak odada yayınlayın. Görünür bir ürün iki kitleyi de bağlı tutar ve topluluğun üretken hissetmesini sağlar.',
      joinOriginNote:
        'JoinOrigin’de bir topluluğun çıktısı tek bir düzenli odada yaşar — notlar, kayıtlar, sonraki adımlar. Her buluşmadan sonra onları ortak odada yayınlayın.',
    },
  ],
};

export default content;
