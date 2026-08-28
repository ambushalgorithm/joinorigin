import type { CityContent } from '../../types';

/**
 * İstanbul içeriği (Türkçe çeviri) — şehir sayfası + 5 varyant + fikir
 * sayfası. Diğer tüm şehir dosyalarından farklıdır (G5: şablon tekrarı
 * yok). Dürüst, kalıcı nesir; uydurma sayı ya da üye sayısı yok.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'tr',
  slug: 'istanbul',
  pageTitles: {
    city: "İstanbul'daki Origins | JoinOrigin",
    cityDescription:
      "İstanbul'da Origins bulun veya başlatın — Türkiye'nin en büyük şehrinde girişim, yaratıcı, siyasi, buluşma ve küçük işletme grupları. JoinOrigin bekleme listesi.",
    variants: {
      startup: "İstanbul'daki girişim Origins | JoinOrigin",
      creative: "İstanbul'daki yaratıcı Origins | JoinOrigin",
      political: "İstanbul'daki siyasi ve sivil Origins | JoinOrigin",
      meetup: "İstanbul'daki buluşma ve sosyal Origins | JoinOrigin",
      'small-business': "İstanbul'daki küçük işletme Origins | JoinOrigin",
    },
    variantDescriptions: {
      startup:
        "İstanbul'da girişim Origins bulun veya başlatın — Kadıköy, Beşiktaş ve e-ticaret sahnesi çevresindeki kurucular, mühendisler ve operatörler. JoinOrigin bekleme listesi.",
      creative:
        "İstanbul'da yaratıcı Origins bulun veya başlatın — Karaköy, Kadıköy ve Beyoğlu genelinde stüdyolar, galeriler ve kolektifler. JoinOrigin bekleme listesi.",
      political:
        "İstanbul'da siyasi ve sivil Origins bulun veya başlatın — mahalle dayanışma ağları, konut aktivizmi ve yerel kampanyalar. JoinOrigin bekleme listesi.",
      meetup:
        "İstanbul'da buluşma ve sosyal Origins bulun veya başlatın — çay bahçeleri, Boğaz vapurları, sahil yürüyüşleri ve tavla akşamları. JoinOrigin bekleme listesi.",
      'small-business':
        "İstanbul'da küçük işletme Origins bulun veya başlatın — çarşı esnafı, esnaf ağları ve aile işletmeleri. JoinOrigin bekleme listesi.",
    },
    ideas: "İstanbul'da 30 Origin etkinliği fikri | JoinOrigin",
    ideasDescription:
      "İstanbul'da 30 Origin etkinliği fikri keşfedin — ağ kurma, öğrenme, açık hava, profesyonel, yaratıcı ve etki etkinlikleri. JoinOrigin bekleme listesi.",
  },
  intro: [
    "İstanbul, dünyada iki kıtaya yayılan tek büyük şehirdir ve toplulukları daha da fazlasına yayılır: Boğaz'ı geçen vapurlar, Avrupa yakasındaki iş bölgelerini Asya yakasındaki kafelere ve mahalle hayatına bağlar; bu da vapur yolculuğunu günlük bir sosyal ritüele dönüştürür. Çay kayganlaştırıcıdır — çay bahçeleri, çaycılar ve her dükkân ve ofiste ikram edilen bardaklar sohbetleri akışta tutar.",
    "Şehrin katmanları her yerde görünür: Bizans surları, Osmanlı camileri ve modern gökdelenler silueti paylaşır ve aynı karışım insanlarını şekillendirir. Boğaziçi, İstanbul Üniversitesi ve İTÜ gibi üniversiteler sürekli bir öğrenci akışı beslerken, gelişen e-ticaret ve oyun sahnesi İstanbul'u bölgenin girişim başkentlerinden biri haline getirmiştir. Asya yakasındaki Kadıköy ve Avrupa yakasındaki Karaköy, yaratıcı ve teknoloji sahnelerini sabitler; Üsküdar ve Beşiktaş ise aile hayatının, çay bahçelerinin ve deniz kenarı yaşamının merkezleridir.",
    "Türk misafirperverliği bir nedenle ünlüdür: yabancılar çaya davet edilir, komşular aile gibi görülür ve topluluklar ortak sofralar etrafında hızla oluşur. İster bir kahvehanede tavla oynayanlar ister bir parkta piknik yapan aileler olsun, sohbet her yerde başlar — bir bardak çay eşliğinde. Çay ritüelini ve vapur ritmini benimseyen yeni gelenler, İstanbul'un kapılarını ardına kadar açtığını görecektir.",
  ],
  dataPoints: [
    "Yaklaşık 15,7 milyon nüfus — Türkiye'nin en büyük şehri, iki kıtaya yayılan.",
    'Üniversiteler arasında Boğaziçi, İstanbul Üniversitesi, İTÜ ve Koç yer alır.',
    'Bölgesel bir girişim başkenti — e-ticaret, fintech ve oyun güçlü alanlardır.',
    'Kamusal çekim noktaları: Boğaz, Kadıköy sahili, Emirgan Korusu ve tarihi yarımada.',
    'Çay kültürü — çay bahçeleri ve sokak çaycıları günlük topluluk hayatını sabitler.',
    'Çarşı ve esnaf geleneği — Kapalıçarşı ve mahalle dükkânları kişisel güven üzerine işler.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        "Kadıköy'deki girişim merkezleri ve ortak çalışma katları",
        "Beşiktaş ve Şişli'deki oyun stüdyosu ofisleri",
        'Maslak yakınlarındaki hızlandırıcı etkinlik salonları',
        'Boğaziçi ve İTÜ girişimcilik alanları',
        'Moda sahilindeki teknoloji kafeleri',
        'Boğaz manzaralı çatı terasları',
      ],
      formats: [
        'Hızlı tanışmalı kurucu kahvaltıları',
        'Pitch geceleri ve demo günleri',
        'E-ticaret ve oyun kurucu sofraları',
        'Fintech ve ödeme ağ geceleri',
        'Uluslararası kurucu buluşmaları (İngilizce ağırlıklı)',
      ],
      howToStart: [
        'Dar bir dikey seçin — e-ticaret, oyun ya da fintech — ve İngilizce dostu bir isim.',
        'Sizi ağırlayacak bir Kadıköy ya da Beşiktaş ortak çalışma alanında haftalık bir zaman dilimi ayırtın.',
        'Üç açık buluşma yürütün, ardından iki düzenli katılımcıdan birlikte organize etmesini isteyin ve aylık bir ritim belirleyin.',
      ],
    },
    creative: {
      venues: [
        'Karaköy galerileri ve dönüştürülmüş depolar',
        'Kadıköy stüdyoları ve mural sokakları',
        'Beyoğlu atölyeleri ve müzik mekanları',
        'Sanat okulu atölye odaları',
        'Seramik ve çini atölyeleri',
        'Okuma köşeli kitapçı kafeleri',
      ],
      formats: [
        "Kadıköy'de açık stüdyo hafta sonları",
        'Sanatçı konuşmalı Karaköy galeri yürüyüşleri',
        'Tasarım ve illüstrasyon eleştiri akşamları',
        'Müzik prodüksiyon çevreleri ve jam geceleri',
        'Merkezde baskı ve zine fuarları',
      ],
      howToStart: [
        'Grubu tek bir zanaata ve tek bir semte sabitleyin — stüdyolar için Kadıköy, galeriler için Karaköy.',
        'İlk etkinliğe ev sahipliği yapması için bir stüdyo, galeri ya da müzik mekanıyla ortak olun.',
        'Çayı ritüel yapın: her oturum ortak bir çay turu ve iş başına üç yorumla biter.',
      ],
    },
    political: {
      venues: [
        'İlçe belediyesi toplantı salonları',
        'Mahalle dayanışma (komşuluk) ağları',
        'Konut ve kiracı derneği odaları',
        'Toplum mutfakları ve gündüz merkezleri',
        'Toplantı odalı halk kütüphaneleri',
        'Genel kurullar için kullanılan parklar ve meydanlar',
      ],
      formats: [
        'Mahalle meclisi toplantıları',
        'Konut ve kira hakları bilgilendirme akşamları',
        'Toplum mutfağı gönüllü vardiyaları',
        'Afet hazırlığı ve ilk yardım eğitimleri',
        'Sivil katılım atölyeleri',
      ],
      howToStart: [
        'Tek bir somut konuyla başlayın — bir park, bir konut sokağı, bir okul — ve kimin zaten önemsediğini haritalayın.',
        'Bölgenizdeki mahalle dayanışma ağına katılın; güven komşuluk bağları üzerinden yayılır.',
        "İlk toplantınızı çay ve yemekle yapın — İstanbul'da her buluşmanın ortak bir sofraya ihtiyacı vardır.",
      ],
    },
    meetup: {
      venues: [
        "Kadıköy ve Üsküdar'daki çay bahçeleri",
        'Boğaz iskeleleri ve vapur güverteleri',
        'Moda ve Beşiktaş sahil yürüyüşleri',
        'Emirgan Korusu ve Yıldız Parkı',
        'Kahvehaneler ve tavla kafeleri',
        'Bahçe masalı toplum merkezleri',
      ],
      formats: [
        'Haftalık çay bahçesi buluşması',
        'Boğaz gün batımı vapur gezileri',
        'Boğaz boyunca sahil yürüyüşleri',
        'Tavla akşamları',
        'Dil değişim masaları (Türkçe–İngilizce)',
      ],
      howToStart: [
        'Tekrarlanabilir bir format seçin — haftalık bir çay bahçesi buluşması, aylık bir vapur gezisi — ve sabit bir nokta.',
        'Sizi her seferinde ağırlayacak bir çay bahçesi, iskele ya da sahil kafesi seçin.',
        'İlk üç oturumu aynı saatte ve yerde yürütün, ardından düzenli katılımcılardan her birinin bir yeni gelen getirmesini isteyin.',
      ],
    },
    'small-business': {
      venues: [
        'Çarşı tezgâhları — Kapalıçarşı, Mısır Çarşısı, Kadıköy pazarı',
        'Esnaf dükkânı koridorları',
        'Kafe ve restoran sahibi masaları',
        'Ticaret odası seminer salonları',
        'Mahalle pazarı meydanları',
        'Fırın ve çaycı masaları',
      ],
      formats: [
        'Dükkân koridorunda sabah esnaf çayı',
        'Sezon için çarşı esnafı planlaması',
        'İzinler ve dijitalleşme üzerine oda klinikleri',
        'Ortak tedarikçi ve teslimat kooperatifleri',
        'Mahalle pazarı ve festival planlaması',
      ],
      howToStart: [
        'Grubu tek bir çarşıya ya da dükkân koridoruna sabitleyin — Kadıköy pazarı esnafı kanıtlanmış bir buluşma noktasıdır.',
        'İlk çay toplantısına birlikte ev sahipliği yapması için kıdemli bir esnaf ya da bir oda delegesi davet edin.',
        'Sahiplerin tekrarlayan dertlerini toplayın — izinler, kira, teslimat — ve her ayın toplantısını pratik bir çözüm oturumuna dönüştürün.',
      ],
    },
  },
  variantIntros: {
    startup:
      "İstanbul'un girişim sahnesi bölgenin en büyüğüdür; genç bir nüfus, derin bir mühendislik yetenek havuzu ve e-ticaret ile yemek teslimatında yerli devler tarafından beslenir. Asya yakasındaki Kadıköy, yoğun bir ortak çalışma alanı ve girişim kafesi kümesine ev sahipliği yaparken, Avrupa yakasındaki Beşiktaş ve Maslak oyun stüdyolarını, fintech'i ve kurumsal inovasyonu sabitler. Boğaziçi ve İTÜ gibi üniversiteler erken ekiplere istikrarlı bir mezun akışı besler ve şehrin Avrupa ile Asya arasındaki konumu onu sınır ötesi genişleme için doğal bir merkez yapar. Formatlar arasında kurucu kahvaltıları, pitch geceleri, demo günleri ve ülkenin en gururlu sektörünü sergileyen oyun geceleri yer alır. Topluluk genç, enerjik ve giderek daha fazla İngilizce konuşur; ancak yerel gruplarda varsayılan dil Türkçe kalır. İstanbul'un ritmi sosyal ve geçtir — toplantılar genellikle çay ya da akşam yemeği üzerinden devam eder. Burada bir girişim Origin başlatmak en iyi dar bir dikey ve düzenli bir ritimle çalışır — aylık bir e-ticaret sofrası ya da bir oyun kurucuları gecesi, genelci bir gruptan daha hızlı sadık bir takipçi kitlesi oluşturur.",
    creative:
      "İstanbul'un yaratıcı toplulukları iki kıtayı ve bir düzine geleneği köprüler: Karaköy'ün dönüştürülmüş depoları galerilere ve tasarım stüdyolarına ev sahipliği yapar, Kadıköy'ün sokakları şehrin en canlı muraflarını taşır ve Beyoğlu, bir yüzyıldır sanatçılara ilham veren bir semtin bohem enerjisini korur. Şehrin zanaat gelenekleri — seramik, çini, hat ve halı dokumacılığı — eski atölyeleri çağdaş üreticilerle buluşturur. Sanat okulları ve şehrin film ile müzik sahneleri, görsel sanat, müzik ve sinemayla tanınan bir topluluğa istikrarlı bir yetenek akışı besler. Formatlar arasında Kadıköy'de açık stüdyo hafta sonları, Karaköy galeri yürüyüşleri, tasarım eleştirileri ve müzik prodüksiyon çevreleri yer alır; çay bahçeleri her etkinlikten sonra doğal buluşma noktasını sağlar. İstanbul Film Festivali ve Bienal gibi etkinlikler, şehrin dört bir yanındaki izleyicileri ve sanatçıları aynı haftalarda bir araya getirir. Sahne yoğun ve bağlantılıdır — iyi bir proje bir hafta içinde Moda'daki bir stüdyodan Karaköy'deki bir galeriye yolculuk edebilir. İstanbul'da yaratıcı bir Origin başlatmak gerçekçidir: bir zanaat, bir semt ve düzenli bir akşam seçin; meraklı, yetenekli insanların yoğunluğu sizi bulur.",
    political:
      "İstanbul'un sivil yaşamı, güçlü bir komşuluk kültürü ve konut, kamusal alan ile afet hazırlığı etrafında örgütlenmiş hareketler tarafından sabitlenir. Şehrin coğrafyası planlamayı sürekli bir kamusal soru haline getirir: Boğaz köprüleri, metro genişlemesi ve eski mahallelerin yeniden geliştirilmesi, gerçek topluluk istişarelerinde tartışılır. Konut belirleyici bir konudur; kiracı dernekleri ve mahalle ağları yerinden edilmeye ve artan kiralara karşı örgütlenir. Toplum mutfakları, gündüz merkezleri ve gönüllü ağları günlük ihtiyaçlara yanıt verirken, şehrin deprem deneyimi yeni gelenleri ağırlayan ilk yardım ve bina güvenliği atölyeleri dahil ciddi hazırlık eğitimleri üretmiştir. İlçe belediyeleri, mahalle muhtarlıkları ve sivil toplum kuruluşları, şehrin yönetiminde sıradan sakinlerin de söz sahibi olduğu bir dizi katılım kanalı sunar. Siyasi kültür doğrudanlığa ve dayanışmaya değer verir: İstanbul sakinleri önce komşularına yardım eder, politikayı sonra tartışır. Siyasi bir Origin başlatmak, somut bir konu ve küçük bir coğrafya seçmek, ardından mahallenizde zaten var olan dayanışma ağıyla ortaklık kurmak demektir — manzara, iş birliğinin rekabeti yendiği kadar zengindir.",
    meetup:
      "İstanbul'un buluşma sahnesi çay, su ve sohbet üzerine yürür. Çay bahçesi, şehrin gerçek kamusal salonudur — ağaçların altında çay bardakları, tavla tahtaları ve uzun sohbetler. Boğaz vapurları yüzen bir sosyal katman ekler: yolcular ve gruplar manzara için tekneleri kullanır ve bir vapur buluşması, tanışmak için benzersiz bir İstanbul yoludur. Moda, Beşiktaş ve Üsküdar'ın sahil yürüyüşleri koşu gruplarına, gezinenlere ve balıkçılara ev sahipliği yaparken, Emirgan ve Yıldız parkları piknikler ve aile buluşmalarıyla dolar. Kahvehane ve çay bahçelerindeki tavla akşamları eski bir geleneği canlı tutar ve dil değişimleri (Türkçe–İngilizce) şehrin dört bir yanında yürür. Hafta sonları sahillerde balıkçılar, amatör müzisyenler ve yürüyüş grupları yan yana görülür; her mevsimin kendine özgü bir açık hava ritüeli vardır. Ritim geç ve cömerttir — saat dokuzda başlayan bir buluşma tamamen normaldir. İstanbul'da bir buluşma başlatmak, tekrarlanabilir bir format ve sabit bir nokta seçmek demektir — haftalık bir çay bahçesi buluşması ya da aylık bir vapur gezisi — ve şehrin misafirperverliği gerisini halleder.",
    'small-business':
      "İstanbul'un küçük işletme toplulukları çarşı ve esnaf üzerinde yürür — yüzyıllardır mahalle ticaretini sabitleyen esnaf. Kapalıçarşı ve Mısır Çarşısı en ünlüleridir, ancak her mahallenin tezgâh sahiplerinin kuşaklar boyunca birbirini tanıdığı kendi pazar meydanı vardır. Esnaf kültürü güven üzerine kuruludur: dükkâncılar teslimat, müşteri ve izinlerle ruhsatların bitmek bilmeyen evrak işlerinde birbirlerine yardım eder. Kadıköy pazarı ve Avrupa yakasının gıda salonları, tedarikçileri ve pop-up alanları paylaşan genç girişimcilerden oluşan modern bir katman ekler. Ticaret odaları ve ticaret birlikleri dijitalleşme ve ihracat üzerine atölyeler sunarken, şehrin festivalleri esnafa ortak bir takvim verir. Sabahın erken saatlerinde başlayan esnaf çayları, günün ilk haberlerinin ve siparişlerin paylaşıldığı gayriresmi toplantı noktalarıdır. Bu grupları bağlayan şey yer ve alışkanlıktır: bir çarşı ya da dükkân koridoru, sokağın karakterinde ortak payı olan doğal bir topluluktur. Küçük bir işletme Origin başlatmak çok ulaşılabilirdir: bir pazar salonunda aylık bir esnaf çayı, izinler, kira ve çevrimiçi satış gibi dönüşümlü konularla, nadiren konuşacak akranı olan sahipleri güvenilir şekilde çeker.",
  },
  ideaPage: {
    intro:
      "İstanbul, yeni topluluk etkinliği fikirlerini test etmek için ideal bir şehirdir: çay bahçeleri ve sahil kafeleri her yerdedir, vapurlar her buluşmayı bir maceraya dönüştürür ve Türk misafirperverliği sıcak bir karşılama garanti eder. Aşağıdaki otuz fikir altı kategoride gruplandırılmıştır — ağ kurma, öğrenme, sosyal ve açık hava, profesyonel ve sektörel, yaratıcı ve üretici ile etki ve yerel. Her biri kimin için olduğunu, kısa bir sunumu ve İstanbul'da gerçekten var olan bir mekan türünü içerir — çay bahçelerinden ve vapur iskelelerinden çarşılara ve mahalle mutfaklarına. Bazı fikirler tek seferlik etkinlikler olarak çalışır; diğerleri haftalık bir ritimle tekrarlanan Origins dönüşecek şekilde tasarlanmıştır. Dürüstlük kuralı basittir: her mekan önerisi bu şehirde gerçek bir yer türüdür ve her format ilk kez organizatör olan birinin yürütebileceği kadar basittir. İlgi alanlarınıza uyan fikri seçin, sizi ağırlayacak bir mekan bulun ve İstanbul'un misafirperverliğinin gerisini halletmesine izin verin.",
    categories: [
      {
        name: 'Ağ kurma',
        ideas: [
          {
            title: 'Yeni gelenler için çay bahçesi buluşması',
            pitch:
              'Aynı çay bahçesinde, yeni gelenlerin ve uzun süredir yaşayanların çay bardakları üzerinden şehir ipuçları paylaştığı haftalık bir buluşma.',
            audience: 'Yeni gelenler ve rahat sohbeti seven herkes',
            venueType: "Kadıköy ya da Üsküdar'da bir çay bahçesi",
          },
          {
            title: "Beşiktaş'ta kurucu kahvaltısı",
            pitch:
              'Kurucuların Türk kahvesi ve simit eşliğinde haftanın kazanımlarını ve engellerini paylaştığı erken bir kahvaltı.',
            audience: 'Her aşamadan kurucular ve operatörler',
            venueType: "Beşiktaş'ta bir kafe",
          },
          {
            title: 'Vapur tanışma turu',
            pitch:
              'Katılımcıların Boğaz boyunca koltuk değiştirip hikayeler paylaştığı gidiş-dönüş bir vapur yolculuğu.',
            audience: 'Yeni insanlarla tanışmak isteyen herkes',
            venueType: 'Bir Boğaz vapuru iskelesi',
          },
          {
            title: "İstanbul'da yabancılar çevresi",
            pitch:
              'Uluslararası sakinler yerleşme ipuçlarını paylaşır — oturma izni, konut ve kendi insanlarını nerede bulacakları.',
            audience: 'İlk yılındaki yabancılar',
            venueType: 'Bir kültür merkezi ya da ortak çalışma odası',
          },
          {
            title: 'Serbest çalışan kahve kulübü',
            pitch:
              'Serbest çalışanların sektörler arası iş fırsatlarını, ücretleri ve müşteri hikayelerini paylaştığı haftalık bir sabah kahvesi.',
            audience: 'Her disiplinden serbest çalışanlar',
            venueType: "Kadıköy'de bir kafe",
          },
        ],
      },
      {
        name: 'Öğrenme ve atölyeler',
        ideas: [
          {
            title: 'Yeni gelenler için Türkçe masası',
            pitch:
              'Anadili konuşanlarla seviyeye göre masalar, artı her hatanın masaya bir kahkaha kazandırdığı kural.',
            audience: 'Türkçe öğrenen yabancılar ve yeni gelenler',
            venueType: "Kadıköy'de bir kafe ya da toplum merkezi",
          },
          {
            title: 'İkamet ve vergi kliniği',
            pitch:
              'Oturma izni, kayıt ve her yeni gelenin karşılaştığı temel konularda pratik bir oturum.',
            audience: 'Yeni sakinler ve serbest çalışanlar',
            venueType: 'Bir ortak çalışma ya da dernek etkinlik odası',
          },
          {
            title: 'Türk çayı ve kahvesi seremonisi',
            pitch:
              'Türk çayı ve kahvesinin ritüellerine dostça bir giriş — demleme, servis ve sonunda fincan falı.',
            audience: 'Kültür severler ve meraklı yeni gelenler',
            venueType: 'Bir kahvehane ya da kültür merkezi',
          },
          {
            title: 'Osmanlı tarihi yürüyüşü',
            pitch:
              'Tarihi yarımadanın katmanlarında rehberli bir yürüyüş — Bizans, Osmanlı ve modern.',
            audience: 'Tarih severler ve yeni gelenler',
            venueType: 'Bir müze ya da kütüphane toplantı odası',
          },
          {
            title: 'Türk mutfağı dersi',
            pitch:
              'Meze ve ana yemeklerden oluşan uygulamalı bir yemek akşamı, ardından şeflerle ortak bir akşam yemeği.',
            audience: 'Ev aşçıları ve yemek severler',
            venueType: 'Bir toplum mutfağı ya da yemek okulu',
          },
        ],
      },
      {
        name: 'Sosyal ve açık hava',
        ideas: [
          {
            title: 'Boğaz gün batımı vapur gezisi',
            pitch:
              'Şehir ışıklarının yanışını izlerken atıştırmalıklar ve hikayelerle gün batımında bir akşam vapur yolculuğu.',
            audience: 'Gün batımı severler ve yeni gelenler',
            venueType: 'Bir Boğaz vapuru',
          },
          {
            title: 'Moda sahil yürüyüşü',
            pitch:
              'Kadıköy sahilinde çay molaları ve doğaçlama oyunlarla yavaş bir akşam yürüyüşü.',
            audience: 'Yürüyüşçüler ve sahil severler',
            venueType: 'Moda sahil şeridi',
          },
          {
            title: 'Emirgan Korusu pikniği',
            pitch:
              'Şehrin en güzel parklarından birinde battaniyeler, frisbee ve lalelerin önünden bir gezinti.',
            audience: 'Aileler, çiftler ve arkadaş grupları',
            venueType: 'Emirgan Korusu',
          },
          {
            title: 'Çay bahçesinde tavla akşamı',
            pitch:
              'Yeni başlayanların öğrendiği ve düzenli oyuncuların bitmek bilmeyen çay eşliğinde yarıştığı haftalık bir tavla akşamı.',
            audience: 'Tavla severler ve meraklı yeni başlayanlar',
            venueType: 'Bir kahvehane ya da çay bahçesi',
          },
          {
            title: 'Beyoğlu sokak yemekleri turu',
            pitch:
              'Ara sokaklarda rehberli bir akşam turu; her durakta paylaşılan bir tabak ve bir hikaye.',
            audience: 'Yemek severler ve yeni gelenler',
            venueType: 'İstiklal Caddesi çevresindeki sokaklar',
          },
        ],
      },
      {
        name: 'Profesyonel ve sektörel',
        ideas: [
          {
            title: 'E-ticaret kurucuları sofrası',
            pitch:
              'E-ticaret kurucularının ilerlemeyi, lojistik derslerini ve ortaklıkları paylaştığı aylık bir yuvarlak masa.',
            audience: 'E-ticaret kurucuları ve operatörleri',
            venueType: "Kadıköy'de bir girişim merkezi toplantı odası",
          },
          {
            title: 'Oyun kurucuları gecesi',
            pitch:
              'Oyun geliştiricileri ve stüdyo kurucuları projeleri, motorları ve gelişen bir sektörün derslerini paylaşır.',
            audience: 'Oyun geliştiricileri ve stüdyo sahipleri',
            venueType: 'Bir oyun stüdyosu ya da teknoloji etkinlik odası',
          },
          {
            title: 'Fintech ve ödeme çevresi',
            pitch:
              'Kurucular ve operatörler ödemeleri, düzenlemeleri ve bölgenin fintech fırsatlarını tartışır.',
            audience: 'Fintech kurucuları ve operatörleri',
            venueType: 'Bir fintech ofisi ya da etkinlik alanı',
          },
          {
            title: 'Ürün yöneticisi akran çevresi',
            pitch:
              "PM'lerin aylık bir zorluğu tartıştığı gizli bir çevre — yol haritaları, işe alım, paydaş politikaları.",
            audience: 'Teknolojideki ürün yöneticileri',
            venueType: "Şişli'de bir ortak çalışma toplantı odası",
          },
          {
            title: 'Erken ekipler için işe alım çevresi',
            pitch:
              'Kurucular nasıl işe aldıklarını, elde tuttuklarını ve ayrılık süreçlerini paylaşır — erken ekip kurmanın rahatsız edici gerçekleri.',
            audience: 'Erken aşama kurucular ve ekip liderleri',
            venueType: 'Bir girişim ofisi ya da kuluçka merkezi',
          },
        ],
      },
      {
        name: 'Yaratıcı ve üretici',
        ideas: [
          {
            title: 'Kadıköy açık stüdyo günü',
            pitch:
              'Bir stüdyo ve mural semti, turlar, demolar ve satılık eserlerle dolu bir öğleden sonra için kapılarını açar.',
            audience: 'Sanat severler ve meraklı komşular',
            venueType: "Kadıköy'ün stüdyo sokakları",
          },
          {
            title: 'Karaköy galeri yürüyüşü',
            pitch:
              'Dönüştürülmüş depoların galerilerinde rehberli bir akşam yürüyüşü, liman kafesinde sona erer.',
            audience: 'Sanat severler ve koleksiyonerler',
            venueType: "Karaköy'ün galerileri",
          },
          {
            title: 'Seramik ve çini atölyesi',
            pitch: 'Usta bir çömlekçiyle İznik çini geleneğinde kendi çinini boya.',
            audience: 'Zanaat severler ve hatıra arayanlar',
            venueType: 'Bir seramik ya da çini atölyesi',
          },
          {
            title: 'Müzik prodüksiyon çevresi',
            pitch:
              'Prodüktörler bitmemiş parçaları geri bildirim için paylaşır ve ekipman ile yazılım ipuçları alışverişi yapar.',
            audience: 'Beat yapımcıları ve ev stüdyosu prodüktörleri',
            venueType: 'Bir kayıt ya da prova stüdyosu',
          },
          {
            title: 'Zine ve risograph gecesi',
            pitch: 'Risograph baskıyla zine yapımına uygulamalı bir akşam; sonunda takas yapılır.',
            audience: 'Yazarlar, illüstratörler ve baskı meraklıları',
            venueType: 'Bir baskı stüdyosu ya da sanat alanı',
          },
        ],
      },
      {
        name: 'Etki ve yerel',
        ideas: [
          {
            title: 'Kiracı hakları bilgilendirme akşamı',
            pitch:
              'Kira kuralları, sözleşmeler ve ücretsiz konut danışmanlığı alabileceğiniz yerler hakkında sade dilli bir oturum.',
            audience: 'Kiracılar ve kiracı örgütleyicileri',
            venueType: 'Bir kiracı derneği ya da toplum merkezi',
          },
          {
            title: 'Komşuluk dayanışma gecesi',
            pitch:
              'Komşular sokakta kimin yardıma ihtiyacı olduğunu haritalamak için toplanır — yaşlılar, yeni aileler, hastalar — ve destek planlar.',
            audience: 'Yardım etmek isteyen komşular',
            venueType: 'Bir mahalle topluluk odası',
          },
          {
            title: 'Boğaz kıyısı temizliği',
            pitch:
              'Eldiven, çanta ve çayın sağlandığı bir kıyı şeridinde cumartesi sabahı temizliği.',
            audience: 'Kıyı severler ve gönüllüler',
            venueType: 'Boğaz kıyısının bir bölümü',
          },
          {
            title: 'Toplum mutfağı gönüllü vardiyası',
            pitch:
              'İhtiyaç sahiplerini besleyen bir mahalle mutfağında yemek hazırlamaya ve servise yardım edin.',
            audience: 'İlk kez gönüllü olanlar',
            venueType: 'Bir toplum mutfağı ya da gündüz merkezi',
          },
          {
            title: 'Çarşı esnafı hikayeleri',
            pitch:
              'Kıdemli esnaf tezgâhlarının arkasındaki beş dakikalık hikayeleri paylaşır, ardından açık sorular ve çay.',
            audience: 'Komşular ve yemek severler',
            venueType: 'Kadıköy pazarı gibi bir çarşı',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Bu fikirlerden birini nasıl seçerim?',
        answer:
          "Kategoriyi ilgi alanlarınıza ve ulaşabileceğiniz kitleye eşleştirin. İstanbul'da sabit mekanlı tekrarlanan formatlar — haftalık bir çay bahçesi buluşması, aylık bir vapur gezisi — topluluğu en hızlı kurar.",
      },
      {
        question: 'Organizatör olmak için Türkçe konuşmam gerekiyor mu?',
        answer:
          "Hayır. İstanbul'daki birçok grup özellikle teknoloji ve yaratıcı sahnelerde İngilizce ya da iki dilli yürür. Biraz Türkçe — ve bolca çay — komşuların ve esnafın kapılarını açar.",
      },
      {
        question: 'Bu etkinlikler gerçek Origins dönüşebilir mi?',
        answer:
          'Evet — tekrarlanan formatlar çoğu İstanbul topluluğunun nasıl başladığıdır ve şehrin misafirperverliği size kanıtlanmış bir model verir. Nasıl yapılır rehberleri ilk etkinlikten istikrarlı bir topluluğa kadar adım adım anlatır.',
      },
    ],
  },
  faq: [
    {
      question: "İstanbul'da bir topluluğu nasıl bulurum?",
      answer:
        'Girişim, yaratıcı, siyasi, buluşma ve küçük işletme Origins için grup türü sayfalarını kullanın. Her biri İstanbul sakinlerinin toplandığı gerçek semtleri, mekanları ve formatları anlatır. JoinOrigin canlıdır — profilinizi oluşturun ve Origin’inizi bugün bulun ya da başlatın.',
    },
    {
      question: "İstanbul'da bir Origin başlatmak gerçekçi mi?",
      answer:
        "Evet. İstanbul'da ücretsiz mekan olarak çay bahçeleri, vapurlar ve sahil yürüyüş yolları, ayrıca ünlü derecede misafirperver bir kültür vardır. Rehberler bir Origin başlatmayı, bir buluşma düzenlemeyi ve ilk on üyenizi almayı kapsar.",
    },
    {
      question: 'Bu sayfadaki mekan önerileri gerçek mi?',
      answer:
        "Evet. Bahsedilen her mekan türü — çay bahçeleri, vapur iskeleleri, çarşılar, mahalle mutfakları, parklar — İstanbul'da vardır. Üye sayılarını, derecelendirmeleri ya da yerel ofisleri asla uydurmayız.",
    },
    {
      question: "JoinOrigin'in İstanbul'da bir ofisi var mı?",
      answer:
        "Hayır. JoinOrigin'in yerel ofisleri ya da personeli yoktur. Tüm Origin açıklamaları gerçek şehir manzarasını yansıtır ve platform, İstanbul sakinlerinin Origins bulmasına ya da başlatmasına yardımcı olur.",
    },
  ],
};

export default content;
