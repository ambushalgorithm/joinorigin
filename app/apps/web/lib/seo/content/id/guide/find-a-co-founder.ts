import type { GuideContent } from '../../types';

/**
 * "Cara Menemukan Co-founder" — panduan L1 yang selalu relevan
 * (desain §6.1, TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang pada model digital terhubung→bergabung→ruang: halaman
 * ide diterbitkan, ruangnya dibuat otomatis, dan percakapan co-founder
 * terjadi di ruang itu — tempat digital tempat kandidat dapat menemukan
 * ide, bertanya, dan bekerja sama. Nilai JoinOrigin dijalin ke dalam
 * intro dan setiap langkah (joinOriginNote per langkah), dengan kerangka
 * yang jujur — JoinOrigin bukan layanan pencari jodoh dan tidak
 * mempertemukan pendiri. "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'find-a-co-founder',
  title: 'Cara Menemukan Co-founder: Tempat Mencari & Apa yang Ditanyakan | JoinOrigin',
  description:
    'Temukan co-founder yang melengkapi keterampilan Anda — baik Anda meluncurkan usaha baru maupun mengembangkan usaha yang sudah berjalan, terbitkan halaman ide, temui orang di komunitas dan ruangnya, jalankan proyek uji coba, dan ajukan pertanyaan yang mencegah perpecahan. Dari JoinOrigin.',
  intro: [
    'Menemukan co-founder adalah keputusan hubungan yang menyamar sebagai keputusan perekrutan, dan pada intinya ini adalah masalah menghubungkan orang yang lain: orang yang tepat sering kali berjarak satu perkenalan hangat, di suatu tempat di komunitas yang belum Anda temukan. Itulah masalah yang dibantu JoinOrigin — dan masalahnya sama baik Anda masih di tahap ide maupun menjalankan perusahaan yang sudah ada yang membutuhkan mitra untuk melangkah ke tahap berikutnya.',
    'JoinOrigin adalah OS komunitas yang dibangun di sekitar lingkaran digital terhubung→bergabung→ruang: Anda menerbitkan ide, ruangnya dibuat otomatis, dan orang yang berbagi ide bisa bergabung dan berbicara di ruang itu. Halaman ide adalah janji publik dan ruang adalah tempat percakapan co-founder benar-benar terjadi — ruang Matrix yang dikendalikan kreator tempat orang tertarik dapat bertanya, berbagi catatan, dan menguji kecocokan sebelum ada yang berkomitmen. JoinOrigin bukan layanan pencari jodoh, tidak mempertemukan pendiri, dan tidak memiliki kantor lokal. Nilai platform — menghubungkan orang di sekitar minat bersama — bersesuaian langsung dengan cara kebanyakan pendiri menemukan co-founder mereka: melalui komunitas, ruang, dan perkenalan hangat.',
    'Panduan ini mendekati pencarian seperti Anda mendekati pembangunan komunitas: mulai dari jaringan yang sudah ada, terbitkan ide yang bisa ditemukan orang, perluas secara sengaja melalui komunitas dan ruangnya, evaluasi kandidat dengan percakapan terstruktur dan proyek uji coba, dan sepakati hal-hal fundamental sebelum berkomitmen secara hukum. Langkah-langkahnya praktis dan jujur, dan masing-masing menunjukkan tempat JoinOrigin membantu.',
  ],
  dataPoints: [
    'Perkenalan hangat dan pekerjaan bersama menghasilkan hubungan co-founder yang paling bertahan lama.',
    'Halaman ide yang diterbitkan dengan ruang memberi orang tertarik tempat nyata untuk menemukan ide dan memulai percakapan.',
    'Proyek uji coba singkat — prototipe, halaman arahan, atau pilot berbayar — menguji gaya kerja lebih cepat daripada wawancara.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan komunitas dan kolaborator; bukan layanan pencari jodoh dan tidak memiliki kantor lokal.',
  ],
  faq: [
    {
      question: 'Di mana kebanyakan orang menemukan co-founder mereka?',
      answer:
        'Kebanyakan pendiri bertemu melalui jaringan hangat — acara, komunitas, ruang, dan perkenalan dari orang yang mereka percaya. Menerbitkan ide yang bisa ditemukan orang, lalu hadir secara konsisten di komunitas dan ruang yang sama, adalah cara paling andal untuk bertemu calon co-founder.',
    },
    {
      question: 'Bagaimana saya tahu apakah seseorang cocok menjadi co-founder?',
      answer:
        'Jalankan proyek uji coba kecil bersama dan perhatikan tiga hal: keterampilan yang saling melengkapi, toleransi risiko yang serupa, dan komunikasi yang jujur di bawah tenggat. Proyek uji coba mengungkap ketiganya lebih cepat daripada percakapan apa pun.',
    },
    {
      question: 'Apa yang harus kita sepakati sebelum memulai?',
      answer:
        'Bicarakan peran, komitmen waktu, pembagian ekuitas, vesting, pengambilan keputusan, dan apa yang terjadi jika seseorang ingin keluar. Membahas ini di awal mencegah perselisihan yang menghancurkan sebagian besar tim awal.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menemukan co-founder?',
      answer:
        'JoinOrigin membantu orang menemukan komunitas dan kolaborator — termasuk jenis komunitas tempat para pendiri bertemu — dengan halaman ide dan ruang tempat percakapan bisa terjadi. JoinOrigin tidak mempertemukan pendiri, jadi langkah jaringan dan proyek uji coba dalam panduan ini adalah jalur Anda yang paling andal.',
    },
  ],
  sections: [
    'Petakan dulu kesenjangan keterampilan Anda. Tuliskan apa yang benar-benar Anda kuasai dan apa yang dibutuhkan usaha yang tidak Anda miliki. Co-founder harus menutup kesenjangan terbesar Anda — teknis, komersial, atau operasional — bukan menggandakan kekuatan Anda. JoinOrigin dibangun di sekitar profil, ide, dan komunitas, bukan pencocokan — jadi nasihat jujurnya tetap sama: ketahui kesenjangan apa yang perlu Anda tutup sebelum mencari. Tuliskan kekuatan Anda dan kebutuhan usaha Anda.',
    'Terbitkan ide Anda dan buka ruangnya. Ide yang tidak bisa ditemukan siapa pun tidak menarik co-founder. Terbitkan halaman ide yang jelas — apa yang Anda bangun, mengapa, dan jenis orang seperti apa yang Anda butuhkan — dan biarkan ruangnya dibuat otomatis sehingga orang tertarik punya tempat untuk berbicara. Menerbitkan ide di JoinOrigin otomatis membuat ruangnya, tempat percakapan co-founder terjadi. Terbitkan ide Anda di suatu tempat yang publik dan buka ruang diskusi di sekitarnya.',
    'Garap jaringan yang ada untuk perkenalan hangat. Beri tahu lima orang yang Anda percaya apa yang Anda bangun dan jenis co-founder yang Anda butuhkan. Minta masing-masing satu nama. Perkenalan hangat mengalahkan penjangkauan dingin di hampir semua kasus. JoinOrigin membuat komunitas mudah ditemukan, yang memperluas jaringan hangat Anda seiring waktu — dan setiap perkenalan dapat mengarah ke ruang tempat percakapan sesungguhnya terjadi. Beri tahu lima orang yang Anda percaya persis jenis co-founder yang Anda butuhkan.',
    'Hadir secara konsisten di komunitas dan ruang yang relevan. Hadiri acara dan bergabunglah dengan grup tempat orang yang tepat berkumpul: meetup pendiri, komunitas industri, coworking space, dan ruang daring. Pengulangan membangun kepercayaan yang mengarah pada perkenalan. JoinOrigin membantu orang menemukan komunitas yang sesuai dengan tujuan mereka — jenis tempat para pendiri bertemu — dan bergabung dengan ruangnya. Pilih meetup dan ruang tempat orang yang tepat sudah berkumpul dan terus hadir.',
    'Lakukan percakapan pertama yang terstruktur. Tanyakan tentang keterampilan mereka, toleransi risiko, komitmen waktu, dan mengapa mereka ingin memulai atau mengembangkan sesuatu. Bagikan jawaban Anda sendiri. Ini adalah wawancara timbal balik, bukan pitch. JoinOrigin tidak mempertemukan pendiri atau menjalankan percakapan — wawancara timbal balik adalah milik Anda. Platform menempatkan Anda di komunitas dan ruang yang sama dengan calon kolaborator — sisanya terserah Anda.',
    'Jalankan proyek uji coba bersama. Pilih sesuatu yang kecil dan nyata — prototipe, halaman arahan, atau pilot berbayar — dan kerjakan selama empat hingga enam minggu. Perhatikan bagaimana Anda membagi pekerjaan, menangani umpan balik, dan bersikap di bawah tekanan. JoinOrigin memberi komunitas ruang bersama untuk pekerjaan dan proyek mereka — tempat alami bagi proyek uji coba untuk muncul. Prototipe kecil yang nyata adalah uji yang paling andal.',
    'Putuskan berdasarkan uji coba, bukan potensi. Tanyakan apakah Anda akan mempercayakan reputasi Anda kepada orang ini, apakah mereka berkomunikasi dengan jujur, dan apakah bekerja bersama menggerakkan Anda. Jika uji coba terasa canggung, percayai sinyal itu. JoinOrigin tidak membuat keputusan untuk Anda. Nilai jujurnya adalah konteks komunitas dan ruang yang memungkinkan Anda bertemu dan bekerja dengan kandidat — uji coba tetap memberi tahu Anda yang sebenarnya.',
    'Sepakati hal-hal fundamental sebelum berkomitmen. Tuliskan peran, komitmen waktu, pembagian ekuitas, vesting, dan aturan pengambilan keputusan. Bahkan perjanjian satu halaman yang sederhana mencegah sebagian besar kesalahpahaman awal. JoinOrigin adalah OS komunitas — satu ruang terorganisir tempat perjanjian, peran, dan catatan proyek bisa hidup berdampingan dengan ruang ide. Bahkan perjanjian tertulis satu halaman mencegah sebagian besar kesalahpahaman awal.',
  ],
  steps: [
    {
      title: 'Petakan dulu kesenjangan keterampilan Anda',
      body: 'Tuliskan apa yang benar-benar Anda kuasai dan apa yang dibutuhkan usaha yang tidak Anda miliki. Co-founder harus menutup kesenjangan terbesar Anda — teknis, komersial, atau operasional — bukan menggandakan kekuatan Anda.',
      joinOriginNote:
        'JoinOrigin dibangun di sekitar profil, ide, dan komunitas, bukan pencocokan — jadi nasihat jujurnya tetap sama: ketahui kesenjangan apa yang perlu Anda tutup sebelum mencari. Tuliskan kekuatan Anda dan kebutuhan usaha Anda.',
    },
    {
      title: 'Terbitkan ide Anda dan buka ruangnya',
      body: 'Ide yang tidak bisa ditemukan siapa pun tidak menarik co-founder. Terbitkan halaman ide yang jelas — apa yang Anda bangun, mengapa, dan jenis orang seperti apa yang Anda butuhkan — dan biarkan ruangnya dibuat otomatis sehingga orang tertarik punya tempat untuk berbicara.',
      joinOriginNote:
        'Menerbitkan ide di JoinOrigin otomatis membuat ruangnya, tempat percakapan co-founder terjadi. Terbitkan ide Anda di suatu tempat yang publik dan buka ruang diskusi di sekitarnya.',
    },
    {
      title: 'Garap jaringan yang ada untuk perkenalan hangat',
      body: 'Beri tahu lima orang yang Anda percaya apa yang Anda bangun dan jenis co-founder yang Anda butuhkan. Minta masing-masing satu nama. Perkenalan hangat mengalahkan penjangkauan dingin di hampir semua kasus.',
      joinOriginNote:
        'JoinOrigin membuat komunitas mudah ditemukan, yang memperluas jaringan hangat Anda seiring waktu — dan setiap perkenalan dapat mengarah ke ruang tempat percakapan sesungguhnya terjadi. Beri tahu lima orang yang Anda percaya persis jenis co-founder yang Anda butuhkan.',
    },
    {
      title: 'Hadir secara konsisten di komunitas dan ruang yang relevan',
      body: 'Hadiri acara dan bergabunglah dengan grup tempat orang yang tepat berkumpul: meetup pendiri, komunitas industri, coworking space, dan ruang daring. Pengulangan membangun kepercayaan yang mengarah pada perkenalan.',
      joinOriginNote:
        'JoinOrigin membantu orang menemukan komunitas yang sesuai dengan tujuan mereka — jenis tempat para pendiri bertemu — dan bergabung dengan ruangnya. Pilih meetup dan ruang tempat orang yang tepat sudah berkumpul dan terus hadir.',
    },
    {
      title: 'Lakukan percakapan pertama yang terstruktur',
      body: 'Tanyakan tentang keterampilan mereka, toleransi risiko, komitmen waktu, dan mengapa mereka ingin memulai atau mengembangkan sesuatu. Bagikan jawaban Anda sendiri. Ini adalah wawancara timbal balik, bukan pitch.',
      joinOriginNote:
        'JoinOrigin tidak mempertemukan pendiri atau menjalankan percakapan — wawancara timbal balik adalah milik Anda. Platform menempatkan Anda di komunitas dan ruang yang sama dengan calon kolaborator — sisanya terserah Anda.',
    },
    {
      title: 'Jalankan proyek uji coba bersama',
      body: 'Pilih sesuatu yang kecil dan nyata — prototipe, halaman arahan, atau pilot berbayar — dan kerjakan selama empat hingga enam minggu. Perhatikan bagaimana Anda membagi pekerjaan, menangani umpan balik, dan bersikap di bawah tekanan.',
      joinOriginNote:
        'JoinOrigin memberi komunitas ruang bersama untuk pekerjaan dan proyek mereka — tempat alami bagi proyek uji coba untuk muncul. Prototipe kecil yang nyata adalah uji yang paling andal.',
    },
    {
      title: 'Putuskan berdasarkan uji coba, bukan potensi',
      body: 'Tanyakan apakah Anda akan mempercayakan reputasi Anda kepada orang ini, apakah mereka berkomunikasi dengan jujur, dan apakah bekerja bersama menggerakkan Anda. Jika uji coba terasa canggung, percayai sinyal itu.',
      joinOriginNote:
        'JoinOrigin tidak membuat keputusan untuk Anda. Nilai jujurnya adalah konteks komunitas dan ruang yang memungkinkan Anda bertemu dan bekerja dengan kandidat — uji coba tetap memberi tahu Anda yang sebenarnya.',
    },
    {
      title: 'Sepakati hal-hal fundamental sebelum berkomitmen',
      body: 'Tuliskan peran, komitmen waktu, pembagian ekuitas, vesting, dan aturan pengambilan keputusan. Bahkan perjanjian satu halaman yang sederhana mencegah sebagian besar kesalahpahaman awal.',
      joinOriginNote:
        'JoinOrigin adalah OS komunitas — satu ruang terorganisir tempat perjanjian, peran, dan catatan proyek bisa hidup berdampingan dengan ruang ide. Bahkan perjanjian tertulis satu halaman mencegah sebagian besar kesalahpahaman awal.',
    },
  ],
};

export default content;
