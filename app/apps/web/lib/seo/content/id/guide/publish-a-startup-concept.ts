import type { GuideContent } from '../../types';

/**
 * "Cara Menerbitkan Konsep Startup" — panduan L1 yang selalu relevan
 * (desain §6.1, TASK-353), terjemahan Bahasa Indonesia (id).
 *
 * Ditulis berdasarkan alur layar produk §2 inti: terbitkan konsep startup
 * → halaman publik ide → Bergabung via tautan → ruang dibuat otomatis
 * SAAT DITERBITKAN → kreator mengendalikan ruang → pertumbuhan lewat
 * linimasa/undangan. Halaman ide adalah janji publik konsep; ruang adalah
 * tempat pendukung awal, calon co-founder, dan penguji pertama berkumpul
 * di sekitar startup. Platform sudah berjalan: menerbitkan konsep langsung
 * membuat halaman dan ruangnya. "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'publish-a-startup-concept',
  title: 'Cara Menerbitkan Konsep Startup: Halaman Ide + Ruang | JoinOrigin',
  description:
    'Terbitkan konsep startup di JoinOrigin — baik Anda di tahap ide maupun sudah menjalankan perusahaan — tulis halaman ide publik, buka ruangnya secara otomatis, dan kumpulkan pendukung awal, co-founder, dan penguji pertama di sekitar ide. Langkah praktis dari JoinOrigin.',
  intro: [
    'Setiap startup — baik masih berupa konsep di atas kertas maupun sudah beroperasi dengan pelanggan — lebih butuh orang daripada modal: pendiri yang bisa membangunnya, tim yang bisa mewujudkannya, dan pengguna yang akan mengujinya. Startup yang tidak bisa ditemukan siapa pun tidak mengumpulkan semuanya. Menerbitkan konsep sebagai halaman ide yang mudah ditemukan, lalu membuka ruang tempat percakapan bisa terjadi, adalah langkah pertama yang jujur dalam membangun startup — bukan deck, bukan logo, bukan pitch — dan itu berlaku sama baiknya untuk perusahaan yang sudah ada yang menginginkan lebih banyak pendukung, co-founder, dan penguji di sekitar apa yang sedang dibangunnya.',
    'Alur JoinOrigin bekerja seperti ini: Anda menerbitkan konsep startup, halaman ide publiknya muncul, dan ruangnya dibuat otomatis pada saat diterbitkan. Orang menemukan halaman atau mengikuti tautan, bergabung cukup dengan satu klik, dan mereka masuk ke ruang — ruang Matrix yang dikendalikan kreator tempat pendukung awal dapat bertanya, calon co-founder dapat menguji kecocokan, dan pengguna pertama dapat memberi umpan balik. Kreator memiliki ruang sejak detik nol dan memutuskan siapa yang bergabung dan apa yang terjadi di dalamnya.',
    'Panduan ini menelusuri penerbitan konsep startup seperti seorang operator — baik konsepnya benar-benar baru maupun perusahaannya sudah berjalan: memadatkan konsep menjadi satu kalimat, menulis halaman dengan sinyal yang jujur, menerbitkannya dan membuka ruang, membagikannya dengan komunitas pendiri, mengundang pendukung dan penguji awal, menjalankan percakapan terstruktur, menggunakan ruang untuk membentuk tim uji coba, dan mengalirkan ruang ke linimasa saat konsep divalidasi.',
  ],
  dataPoints: [
    'Konsep startup yang dipadatkan menjadi satu kalimat lebih mudah dibagikan, diuji, dan diisi orang daripada rencana bisnis yang panjang.',
    'Di JoinOrigin, menerbitkan konsep otomatis membuat ruangnya — startup punya tempat untuk pendukung dan penguji sejak awal.',
    'Tautan bergabung adalah undangan paling sederhana: satu tautan, satu klik, dan orang yang tertarik sudah berada di ruang.',
    'JoinOrigin adalah OS komunitas yang membantu orang menemukan ide dan orang di baliknya — terbitkan konsep Anda dan ruangnya langsung terbuka.',
  ],
  faq: [
    {
      question: 'Apa bedanya konsep startup dengan halaman ide bisnis kecil?',
      answer:
        'Format halamannya sama, tetapi penekanannya bergeser: ide bisnis kecil berpusat pada pelanggan dan penawaran, sedangkan konsep startup berpusat pada masalah ambisius dan tim yang dibutuhkan untuk menyelesaikannya. Halaman startup menarik pendukung awal, calon co-founder, dan penguji pertama alih-alih pelanggan lokal.',
    },
    {
      question: 'Kapan ruang untuk konsep startup saya dibuat?',
      answer:
        'Ruang dibuat otomatis saat Anda menerbitkan konsep. Kreator memiliki ruang sejak detik nol dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Anda juga bisa membuka ruang dengan alat yang sudah Anda gunakan dan mengundang orang yang berbagi ambisinya.',
    },
    {
      question: 'Siapa yang sebaiknya bergabung dengan ruang konsep startup?',
      answer:
        'Pendukung awal yang berbagi masalahnya, calon co-founder yang menguji kecocokan, dan pengguna pertama yang bersedia mencoba versi kasar. Ruang adalah tempat Anda menemukan orang yang mengubah konsep menjadi tim — orang yang sama yang membutuhkan waktu berbulan-bulan untuk dijangkau melalui perkenalan hangat.',
    },
    {
      question: 'Apa yang membuat halaman konsep startup bagus?',
      answer:
        'Satu kalimat jujur tentang masalah dan pendekatannya, tahap konsep, dan bantuan spesifik yang Anda butuhkan — pembangun, desainer, pakar domain, penguji pertama. Kejujuran tentang tahap menarik orang yang tepat; klaim berlebihan menarik siapa pun.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menerbitkan konsep startup hari ini?',
      answer:
        'Ya. Menerbitkan konsep di JoinOrigin membuat halaman dan ruangnya secara atomik — ruang terbuka saat Anda menerbitkan, dan Anda mengendalikannya sejak awal. Terbitkan konsep di suatu tempat yang publik dan buka ruang diskusinya; setiap anggota baru yang Anda undang memperluas jangkauan Anda.',
    },
  ],
  sections: [
    'Padatkan konsep menjadi satu kalimat. Reduksi startup ke intinya: masalah, pendekatan, dan untuk siapa. Jika Anda tidak bisa mengatakannya dalam satu kalimat, konsep belum siap diterbitkan. JoinOrigin dirancang di sekitar halaman ide yang mudah ditemukan, dan pitch satu kalimat adalah inti halaman. Tulis kalimatnya dan ujilah pada tiga orang yang memahami masalahnya.',
    'Tulis halaman dengan sinyal yang jujur. Nyatakan masalah, pendekatan, tahapnya — ide, prototipe, atau produk — dan bantuan spesifik yang Anda butuhkan. Kejujuran menarik orang yang tepat. Menerbitkan konsep di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Draf halaman sebagai kiriman publik singkat dan iterasi dengan umpan balik.',
    'Terbitkan konsep dan buka ruangnya. Menerbitkan adalah momen konsep menjadi mudah ditemukan. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya. Di JoinOrigin halaman, ruang, dan tautan bergabung adalah satu penerbitan. Terbitkan konsep secara publik dan buka ruang untuk percakapan di sekitarnya.',
    'Bagikan konsep dengan komunitas pendiri. Startup tumbuh melalui jaringan pendiri. Bagikan halaman ide dengan grup pendiri, komunitas startup, akselerator, dan siapa pun yang mengenal masalahnya. Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke konsep Anda sudah cukup.',
    'Undang pendukung dan penguji awal. Undang orang yang berbagi ambisinya: calon co-founder, pakar domain, dan pengguna yang bersedia mencoba versi kasar. JoinOrigin mempermudah penemuan — tempat orang yang mencari ide dapat menemukan ide Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap orang yang bergabung menjadi saluran ke jaringan mereka sendiri.',
    'Jalankan percakapan terstruktur di ruang. Tanyakan kepada yang bergabung apa yang membuat mereka antusias, apa yang mengkhawatirkan mereka, dan apa yang akan mereka lakukan lebih dulu. Ruang startup adalah wawancara berkelanjutan — jawabannya membentuk konsep. JoinOrigin tidak menjalankan percakapan ini; ruang itu milik Anda untuk dibentuk. Platform memberi konsep satu ruang tempat ketertarikan menjadi wawasan, dan kreator memiliki ruang itu. Jalankan percakapan langsung di ruang.',
    'Gunakan ruang untuk membentuk tim uji coba. Ketika orang yang tepat muncul, usulkan uji coba kecil — prototipe, halaman arahan, atau sesi kerja — dan lihat bagaimana tim bekerja sama. JoinOrigin memberi komunitas ruang bersama untuk pekerjaan dan proyek mereka, yang merupakan tempat alami bagi uji coba untuk muncul. Prototipe kecil yang nyata adalah uji kecocokan yang paling andal.',
    'Alirkan ruang ke linimasa saat Anda memvalidasi. Terus unggah pembaruan, jaga ruang tetap hidup, dan biarkan momentum konsep menjadi terlihat oleh jaringan yang lebih luas. Linimasa mengubah konsep menjadi bukti bahwa orang peduli. Di JoinOrigin pembaruan ruang mengalir ke linimasa — lingkaran pertumbuhan tempat setiap anggota baru memperluas permukaan penemuan. Mulailah ditemukan dan bertumbuh.',
  ],
  steps: [
    {
      title: 'Padatkan konsep menjadi satu kalimat',
      body: 'Reduksi startup ke intinya: masalah, pendekatan, dan untuk siapa. Jika Anda tidak bisa mengatakannya dalam satu kalimat, konsep belum siap diterbitkan.',
      joinOriginNote:
        'JoinOrigin dirancang di sekitar halaman ide yang mudah ditemukan, dan pitch satu kalimat adalah inti halaman. Tulis kalimatnya dan ujilah pada tiga orang yang memahami masalahnya.',
    },
    {
      title: 'Tulis halaman dengan sinyal yang jujur',
      body: 'Nyatakan masalah, pendekatan, tahapnya — ide, prototipe, atau produk — dan bantuan spesifik yang Anda butuhkan. Kejujuran menarik orang yang tepat.',
      joinOriginNote:
        'Menerbitkan konsep di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Draf halaman sebagai kiriman publik singkat dan iterasi dengan umpan balik.',
    },
    {
      title: 'Terbitkan konsep dan buka ruangnya',
      body: 'Menerbitkan adalah momen konsep menjadi mudah ditemukan. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya.',
      joinOriginNote:
        'Di JoinOrigin halaman, ruang, dan tautan bergabung adalah satu penerbitan. Terbitkan konsep secara publik dan buka ruang untuk percakapan di sekitarnya.',
    },
    {
      title: 'Bagikan konsep dengan komunitas pendiri',
      body: 'Startup tumbuh melalui jaringan pendiri. Bagikan halaman ide dengan grup pendiri, komunitas startup, akselerator, dan siapa pun yang mengenal masalahnya.',
      joinOriginNote:
        'Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke konsep Anda sudah cukup.',
    },
    {
      title: 'Undang pendukung dan penguji awal',
      body: 'Undang orang yang berbagi ambisinya: calon co-founder, pakar domain, dan pengguna yang bersedia mencoba versi kasar.',
      joinOriginNote:
        'JoinOrigin mempermudah penemuan — tempat orang yang mencari ide dapat menemukan ide Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap orang yang bergabung menjadi saluran ke jaringan mereka sendiri.',
    },
    {
      title: 'Jalankan percakapan terstruktur di ruang',
      body: 'Tanyakan kepada yang bergabung apa yang membuat mereka antusias, apa yang mengkhawatirkan mereka, dan apa yang akan mereka lakukan lebih dulu. Ruang startup adalah wawancara berkelanjutan — jawabannya membentuk konsep.',
      joinOriginNote:
        'JoinOrigin tidak menjalankan percakapan ini; ruang itu milik Anda untuk dibentuk. Platform memberi konsep satu ruang tempat ketertarikan menjadi wawasan, dan kreator memiliki ruang itu. Jalankan percakapan langsung di ruang.',
    },
    {
      title: 'Gunakan ruang untuk membentuk tim uji coba',
      body: 'Ketika orang yang tepat muncul, usulkan uji coba kecil — prototipe, halaman arahan, atau sesi kerja — dan lihat bagaimana tim bekerja sama.',
      joinOriginNote:
        'JoinOrigin memberi komunitas ruang bersama untuk pekerjaan dan proyek mereka, yang merupakan tempat alami bagi uji coba untuk muncul. Prototipe kecil yang nyata adalah uji kecocokan yang paling andal.',
    },
    {
      title: 'Alirkan ruang ke linimasa saat Anda memvalidasi',
      body: 'Terus unggah pembaruan, jaga ruang tetap hidup, dan biarkan momentum konsep menjadi terlihat oleh jaringan yang lebih luas. Linimasa mengubah konsep menjadi bukti bahwa orang peduli.',
      joinOriginNote:
        'Di JoinOrigin pembaruan ruang mengalir ke linimasa — lingkaran pertumbuhan tempat setiap anggota baru memperluas permukaan penemuan. Mulailah ditemukan dan bertumbuh.',
    },
  ],
};

export default content;
