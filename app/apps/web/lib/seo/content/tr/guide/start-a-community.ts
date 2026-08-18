import type { GuideContent } from '../../types';

/**
 * "Bir Topluluk Nasıl Başlatılır" — L1 kalıcı rehber (tasarım §6.1, TASK-326).
 *
 * Dijital bağlan→katıl→oda modeline göre yeniden odaklanmıştır: grubu
 * yayınla → oda yayınlamada otomatik oluşturulur → üyeler bağlantıyla
 * katılır; mekan/format tavsiyesi asla çekirdek değil, aşağı yönlü bir
 * sonuç olarak kalır. JoinOrigin değeri girişe ve her adıma (adım başına
 * `joinOriginNote`) işlenmiştir, dürüst çerçeveyle — JoinOrigin yerel
 * etkinlikler düzenlemez. Tek H1, adım adım yapı, SSS `FAQPage` JSON-LD
 * ile 1:1 yansıtılır. "Oda" Matrix odasına bağlıdır (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'tr',
  slug: 'start-a-community',
  title: 'Bir Topluluk Nasıl Başlatılır: Adım Adım Rehber | JoinOrigin',
  description:
    'Bir topluluğu nasıl başlatacağınızı öğrenin — ya da mevcut bir topluluğa tek bir dijital yuva verin — bir grup yayınlayın, odasını açın ve üyeleri bir katılım bağlantısıyla getirin. JoinOrigin’den pratik adımlar.',
  intro: [
    'Bir topluluğu başlatmanın en zor kısmı nadiren mekan, gündem ya da bütçedir — ilgi alanınızı paylaşan ilk insanları bulmak ve onlara bağlanmak için tek net bir yer vermektir. JoinOrigin’in tam olarak çözdüğü sorun budur.',
    'JoinOrigin, dijital döngü etrafında kurulmuş bir topluluk işletim sistemidir: bir grup yayınlarsınız, odası otomatik oluşturulur ve üyeler bir bağlantıyla katılır. Oda, topluluğun gerçekten yaşadığı yerdir — üyelerin ilk günden itibaren konuştuğu, güncellemeler paylaştığı ve birlikte planladığı, oluşturan kişinin kontrolündeki bir Matrix odası; tablolar, dağınık mesajlar ve kayıt formları yerine. Yüz yüze etkinlikler yalnızca aşağı yönlü bir sonuç olarak vardır: bir grup oluştuğunda ve odası canlandığında, üyeler yüz yüze buluşmayı seçebilir — ve JoinOrigin yerel etkinlikler düzenlemez. Platformun tüm amacı, aksi halde asla tanışmayacak insanları bağlamaktır; bu nedenle bu rehberdeki her adım, JoinOrigin’in yardımcı olduğu bir şeye karşılık gelir.',
    'Yaklaşım her topluluk türü için çalışır: bir kurucu çevresi, bir kitap kulübü, yerel bir koşu grubu, küçük bir işletme ağı ya da çevrimiçi bir profesyonel topluluk — ve hem sıfırdan başlıyorsanız hem de zaten resmi olmayan şekilde bir araya gelen bir grubu resmileştiriyorsanız çalışır. Temel ilke basittir — insanlar net bir vaat yüzünden katılır ve deneyim o vaadi güvenilir şekilde yerine getirdiği için kalır. Başlamak için büyük bir bütçeye, bir mekana ya da mevcut bir kitleye ihtiyacınız yoktur; net bir amaca, gerçekçi bir ilk adıma ve onu tekrarlama disiplinine ihtiyacınız vardır.',
  ],
  dataPoints: [
    'Başarılı toplulukların çoğu “ilgilenen herkes” yerine dar, spesifik bir hedef kitleyle başlar.',
    'Bir grubu yayınlamak odasını anında oluşturur — asla “sohbeti sonra oluştur” adımı yoktur.',
    'Katılım bağlantısı en basit davettir: tek bağlantı, tek tıklama ve yeni bir üye odadadır.',
    'JoinOrigin, insanların toplulukları bulmasına veya başlatmasına yardımcı olmak için tasarlanmış bir topluluk işletim sistemidir — yerel etkinlikler düzenlemez ve yerel personel iddia etmez.',
  ],
  faq: [
    {
      question: 'Bir topluluğu başlatmak ne kadar sürer?',
      answer:
        'Kapsamı küçük tutarsanız birkaç hafta içinde bir grup yayınlayabilir ve odasını açabilirsiniz: tek bir amaç, tek bir katılım bağlantısı ve istikrarlı bir kişisel davet akışı. Topluluğun kendisi, yerleşmiş hissetmeden önce odada birkaç ay tutarlı katılım gerektirir.',
    },
    {
      question: 'Başlamak için paraya ya da mekana ihtiyacım var mı?',
      answer:
        'Hayır. Bir topluluğun dijital çekirdeği — yayınlanmış bir grup ve odası — hiçbir maliyet gerektirmez ve mekan gerektirmez. Çoğu grup daha sonra yüz yüze buluşmayı seçer; kütüphaneler, kafeler, parklar ve ortak çalışma salonları çoğu şehirde ilk buluşmalara ücretsiz ev sahipliği yapar.',
    },
    {
      question: 'Bir topluluğu başlatırken en sık yapılan hata nedir?',
      answer:
        'Herkesi memnun etmeye çalışmak. Belirsiz bir amaca sahip bir topluluk az sayıda bağlı üye çeker. Tek bir spesifik hedef kitle ve tek bir net sonuç tanımlayın, grup sayfasına koyun ve topluluğun oradan gelişmesine izin verin.',
    },
    {
      question: 'JoinOrigin bir topluluk başlatmama nasıl yardımcı olabilir?',
      answer:
        'JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur ve üyeler bir bağlantıyla katılır — bir topluluğun amacı, insanları ve sohbeti için tek bir düzenli dijital yuva. JoinOrigin yerel etkinlikler düzenlemez, bu nedenle bu rehberdeki pratik adımlar platformda ve hâlihazırda sahip olduğunuz araçlarla çalışır.',
    },
  ],
  sections: [
    'Net bir amaç tanımlayın. Topluluğun kimin için olduğuna, hangi sorunu çözdüğüne ve başarılı bir üyenin nasıl göründüğüne karar verin. “Brooklyn’deki yeni kurucuların erken dönem derslerini paylaştığı bir grup” gibi tek cümlelik bir misyon yazın. JoinOrigin amacınıza bir yuva verir — misyonun, hedef kitlenin ve vaadin, sizinki gibi bir grup arayan herkese görünür olduğu herkese açık bir grup sayfası. Misyonu yazın ve her davetin önünde tutun.',
    'Grubu yayınlayın ve odasını açın. Bir topluluğun dijital çekirdeği, üyelerin konuşabileceği bir odası olan yayınlanmış bir gruptur. JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — oluşturan kişi sıfırıncı saniyeden itibaren sahiptir ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir. JoinOrigin’de “sohbeti sonra oluştur” adımı yoktur: grubu yayınlayın ve oda hemen var olur, oluşturan kişi oda sahibi olur. İsterseniz grup yuvasını ve odasını hâlihazırda kullandığınız araçlarda da kurun.',
    'Katılım bağlantınızı paylaşın. Katılım bağlantısı var olan en basit davettir: tek bağlantı, tek tıklama ve yeni bir üye odaya iner. Bağlantıyı her yere koyun — grup sayfanız, kişisel mesajlarınız ve hedef kitlenizin zaten toplandığı yerler. JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Grubunuza giden tek kısa, net bir bağlantı işi görür.',
    'İlk on kişiyi kişisel olarak davet edin. Kişisel davetler, herkese açık gönderilerden çok daha iyi dönüşüm sağlar. Hedef kitleye uyan arkadaşlara, meslektaşlara ve tanıdıklara mesaj atın, katılım bağlantısını paylaşın ve bir kişi daha getirmelerini isteyin. JoinOrigin keşfi kolaylaştırır — bir topluluk arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve davet ettiğiniz her üye kendi ağına açılan bir kanal olur.',
    'Bir format ve ritim seçin (aşağı yönlü bir seçim). Grup oluşmaya başladığında tekrarlanan bir format seçin — aylık bir tartışma, haftalık bir çalışma oturumu, bir konuşma ya da sosyal bir yürüyüş. Tekrarlanan formatlar tek seferlik olanları yener çünkü alışkanlıklar yabancıları üyeye dönüştürür. Bu aşağı yönlü bir seçimdir: grup daha sonra yüz yüze toplanabilir, ancak oda zaten topluluğun yuvasıdır. JoinOrigin’de organizatörler formatlarını bir kez tanımlayabilir ve üyeler katılmadan önce ne bekleyeceklerini görebilir — bu da ilk kez gelenleri durduran tereddüdü azaltır. Formatınızı seçin ve her davette belirtin.',
    'Harika bir ilk buluşma düzenleyin. Üyeler yüz yüze buluşmayı seçerse — erken gelin, herkesi kişisel olarak karşılayın, kısa bir tanışma turu yapın ve net bir sonraki tarihle bitirin. İlk buluşmanın amacı kalabalık değildir; herkesin geri dönmek istediği hissiyle ayrılmasıdır. JoinOrigin buluşmalara personel sağlamaz ya da düzenlemez — deneyim sizin tasarımınızdır. Platform topluluğun etrafında oluşmasına yardımcı olur: tarihin, özetin ve sonraki adımların yaşadığı tek bir ortak oda.',
    'Geri bildirim toplayın ve yineleyin. İlk haftalardan sonra üyelerinize neyin daha fazlasını, neyin daha azını istediklerini sorun — odada ve buluşmalarda. Formatı, zamanı ya da mekanı sizin hayal ettiğinize göre değil, yanıtlarına göre ayarlayın. JoinOrigin, bir topluluğun ortak hafızasını tek bir yerde tutar — notlar, kararlar ve üyelerin istedikleri — böylece yineleme kaybolmak yerine görünür olur. Her buluşmadan sonra üyelere doğrudan odada sorun.',
    'Tutarlı bir ritim yayınlayın ve yavaş büyüyün. Genişlemeden önce aynı günü ve formatı birkaç ay koruyun. Her üye topluluğun ne olduğunu tek cümleyle anlatıp katılım bağlantısını paylaşabildiğinde büyüme tavsiyelerle bileşik etki yaratır. JoinOrigin, topluluğunuzun büyürken bulunabilir ve bağlı kalmasına yardımcı olur — ritmin, vaadin, odanın ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
  ],
  steps: [
    {
      title: 'Net bir amaç tanımlayın',
      body: 'Topluluğun kimin için olduğuna, hangi sorunu çözdüğüne ve başarılı bir üyenin nasıl göründüğüne karar verin. “Brooklyn’deki yeni kurucuların erken dönem derslerini paylaştığı bir grup” gibi tek cümlelik bir misyon yazın.',
      joinOriginNote:
        'JoinOrigin amacınıza bir yuva verir — misyonun, hedef kitlenin ve vaadin, sizinki gibi bir grup arayan herkese görünür olduğu herkese açık bir grup sayfası. Misyonu yazın ve her davetin önünde tutun.',
    },
    {
      title: 'Grubu yayınlayın ve odasını açın',
      body: 'Bir topluluğun dijital çekirdeği, üyelerin konuşabileceği bir odası olan yayınlanmış bir gruptur. JoinOrigin’de bir grubu yayınlamak odasını otomatik oluşturur — oluşturan kişi sıfırıncı saniyeden itibaren sahiptir ve Element içinde davet edebilir, çıkarabilir ve roller atayabilir.',
      joinOriginNote:
        'JoinOrigin’de “sohbeti sonra oluştur” adımı yoktur: grubu yayınlayın ve oda hemen var olur, oluşturan kişi oda sahibi olur. İsterseniz grup yuvasını ve odasını hâlihazırda kullandığınız araçlarda da kurun.',
    },
    {
      title: 'Katılım bağlantınızı paylaşın',
      body: 'Katılım bağlantısı var olan en basit davettir: tek bağlantı, tek tıklama ve yeni bir üye odaya iner. Bağlantıyı her yere koyun — grup sayfanız, kişisel mesajlarınız ve hedef kitlenizin zaten toplandığı yerler.',
      joinOriginNote:
        'JoinOrigin’de katılmak tek bir eylemdir — herkese açık sayfada Katıl’a tıklamak ya da bir üyenin doğrudan davet bağlantısını takip etmek. Grubunuza giden tek kısa, net bir bağlantı işi görür.',
    },
    {
      title: 'İlk on kişiyi kişisel olarak davet edin',
      body: 'Kişisel davetler, herkese açık gönderilerden çok daha iyi dönüşüm sağlar. Hedef kitleye uyan arkadaşlara, meslektaşlara ve tanıdıklara mesaj atın, katılım bağlantısını paylaşın ve bir kişi daha getirmelerini isteyin.',
      joinOriginNote:
        'JoinOrigin keşfi kolaylaştırır — bir topluluk arayan insanların sizinkini bulup bir bağlantıyla katılabileceği bir yer. Kişisel davetler hâlâ asıl işi yapar ve davet ettiğiniz her üye kendi ağına açılan bir kanal olur.',
    },
    {
      title: 'Bir format ve ritim seçin (aşağı yönlü bir seçim)',
      body: 'Grup oluşmaya başladığında tekrarlanan bir format seçin — aylık bir tartışma, haftalık bir çalışma oturumu, bir konuşma ya da sosyal bir yürüyüş. Tekrarlanan formatlar tek seferlik olanları yener çünkü alışkanlıklar yabancıları üyeye dönüştürür. Bu aşağı yönlü bir seçimdir: grup daha sonra yüz yüze toplanabilir, ancak oda zaten topluluğun yuvasıdır.',
      joinOriginNote:
        'JoinOrigin’de organizatörler formatlarını bir kez tanımlayabilir ve üyeler katılmadan önce ne bekleyeceklerini görebilir — bu da ilk kez gelenleri durduran tereddüdü azaltır. Formatınızı seçin ve her davette belirtin.',
    },
    {
      title: 'Harika bir ilk buluşma düzenleyin',
      body: 'Üyeler yüz yüze buluşmayı seçerse — erken gelin, herkesi kişisel olarak karşılayın, kısa bir tanışma turu yapın ve net bir sonraki tarihle bitirin. İlk buluşmanın amacı kalabalık değildir; herkesin geri dönmek istediği hissiyle ayrılmasıdır.',
      joinOriginNote:
        'JoinOrigin buluşmalara personel sağlamaz ya da düzenlemez — deneyim sizin tasarımınızdır. Platform topluluğun etrafında oluşmasına yardımcı olur: tarihin, özetin ve sonraki adımların yaşadığı tek bir ortak oda.',
    },
    {
      title: 'Geri bildirim toplayın ve yineleyin',
      body: 'İlk haftalardan sonra üyelerinize neyin daha fazlasını, neyin daha azını istediklerini sorun — odada ve buluşmalarda. Formatı, zamanı ya da mekanı sizin hayal ettiğinize göre değil, yanıtlarına göre ayarlayın.',
      joinOriginNote:
        'JoinOrigin, bir topluluğun ortak hafızasını tek bir yerde tutar — notlar, kararlar ve üyelerin istedikleri — böylece yineleme kaybolmak yerine görünür olur. Her buluşmadan sonra üyelere doğrudan odada sorun.',
    },
    {
      title: 'Tutarlı bir ritim yayınlayın ve yavaş büyüyün',
      body: 'Genişlemeden önce aynı günü ve formatı birkaç ay koruyun. Her üye topluluğun ne olduğunu tek cümleyle anlatıp katılım bağlantısını paylaşabildiğinde büyüme tavsiyelerle bileşik etki yaratır.',
      joinOriginNote:
        'JoinOrigin, topluluğunuzun büyürken bulunabilir ve bağlı kalmasına yardımcı olur — ritmin, vaadin, odanın ve insanların görünür olduğu tek bir yer. Keşfedilin ve büyüyün.',
    },
  ],
};

export default content;
