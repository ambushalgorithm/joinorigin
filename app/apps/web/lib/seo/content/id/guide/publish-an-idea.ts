import type { GuideContent } from '../../types';

/**
 * "Cara Menerbitkan Ide" — panduan L1 yang selalu relevan (desain §6.1,
 * TASK-353), terjemahan Bahasa Indonesia (id).
 *
 * Ditulis berdasarkan alur layar produk §2 inti: Temukan → halaman publik
 * Ide → Bergabung via tautan → Ruang dibuat otomatis SAAT DITERBITKAN →
 * kreator mengontrol ruang → pertumbuhan lewat linimasa/undangan. Halaman
 * ide adalah janji publik; ruang adalah tempat orang tertarik berkumpul
 * dan berdiskusi. Platform sudah berjalan: menerbitkan ide langsung
 * membuat halaman dan ruangnya. "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'publish-an-idea',
  title:
    'Cara Menerbitkan Ide: Ubah Percikan Menjadi Halaman Ide yang Mudah Ditemukan | JoinOrigin',
  description:
    'Terbitkan ide di JoinOrigin — baik itu percikan baru maupun proyek yang sudah ada yang ingin Anda tunjukkan ke orang lain — tulis halaman ide publik, biarkan ruangnya terbuka otomatis, dan undang orang yang ingin membangunnya bersama Anda. Langkah praktis dari JoinOrigin.',
  intro: [
    'Sebagian besar ide mati dalam draf — catatan di ponsel, percakapan yang setengah terlupakan, dokumen yang tidak pernah dilihat orang lain. Alasannya jarang karena idenya buruk. Alasannya adalah tidak ada yang bisa menemukannya, dan menemukan orang yang tepat adalah inti permainannya. Masalah menghubungkan orang itulah yang justru dipecahkan JoinOrigin — baik idenya berupa percikan baru maupun proyek yang sudah ada yang berjalan tenang tanpa rumah yang mudah ditemukan.',
    'Alur JoinOrigin bekerja seperti ini: Anda menerbitkan ide, halaman ide publik muncul, dan ruangnya dibuat otomatis pada saat diterbitkan. Orang menemukan halaman melalui Jelajahi atau mengikuti tautan yang Anda bagikan, dan bergabung cukup dengan satu klik. Mereka masuk ke ruang — ruang Matrix yang dikendalikan kreator tempat percakapan seputar ide benar-benar terjadi. Kreator memiliki ruang sejak detik nol dan memutuskan siapa yang bergabung dan apa yang terjadi di dalamnya.',
    'Panduan ini menelusuri seluruh jalur: memadatkan ide menjadi satu kalimat yang jelas, menulis halaman yang bisa ditemukan orang, menerbitkannya dan membuka ruangnya, membagikan tautan bergabung, mengundang orang tertarik pertama, memandu percakapan pertama, menyempurnakan ide dari umpan balik nyata, dan menjaga ide tetap mudah ditemukan saat ia tumbuh. Ini berlaku untuk ide apa pun — bisnis kecil, startup, klub buku, proyek komunitas, produk yang belum ada, atau proyek yang sudah ada dan membutuhkan lebih banyak orang di sekitarnya.',
  ],
  dataPoints: [
    'Pitch ide satu kalimat lebih mudah ditemukan daripada dokumen panjang — kejelasan adalah fitur penemuan.',
    'Di JoinOrigin, menerbitkan ide otomatis membuat ruangnya — tidak pernah ada langkah terpisah "buat obrolannya nanti".',
    'Tautan bergabung adalah undangan paling sederhana: satu tautan, satu klik, dan orang yang tertarik sudah berada di ruang.',
    'JoinOrigin adalah OS komunitas yang membantu orang menemukan ide dan orang di baliknya — terbitkan ide Anda dan ruangnya langsung terbuka.',
  ],
  faq: [
    {
      question: 'Apa sebenarnya halaman ide itu?',
      answer:
        'Halaman ide adalah rumah publik yang mudah diindeks untuk sebuah ide di JoinOrigin — halaman yang jelas yang menyatakan apa idenya, mengapa penting, dan untuk siapa, dengan tombol Bergabung. Orang menemukannya melalui Jelajahi atau tautan yang dibagikan, dan bergabung membawa mereka ke ruang ide tersebut.',
    },
    {
      question: 'Kapan ruangnya dibuat?',
      answer:
        'Ruang dibuat otomatis saat Anda menerbitkan ide. Kreator memiliki ruang sejak detik nol dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Anda juga bisa menyiapkan bentuk yang sama — halaman publik plus ruang — dengan alat yang sudah Anda gunakan.',
    },
    {
      question: 'Bagaimana orang menemukan ide saya?',
      answer:
        'Melalui penemuan dan berbagi: halaman ide dapat diindeks dan muncul di Jelajahi, dan setiap tautan bergabung yang Anda bagikan mengarah langsung ke halaman tersebut. Lalu lintas awal yang paling andal bersifat personal — membagikan halaman dan tautannya kepada orang-orang yang sudah peduli dengan masalahnya.',
    },
    {
      question: 'Apa perbedaan antara ide dan proyek?',
      answer:
        'Ide adalah proposal yang menjadi tempat orang berkumpul — ruangnya adalah tempat orang tertarik berbicara dan menguji kecocokan. Proyek adalah pekerjaan bersama yang mulai dilakukan oleh kelompok yang sudah terbentuk, dengan halaman dan ruang proyeknya sendiri. Terbitkan ide lebih dulu; proyek menyusul saat orang berkomitmen.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menerbitkan ide hari ini?',
      answer:
        'Ya. Menerbitkan ide di JoinOrigin membuat halaman dan ruangnya secara atomik — ruang terbuka saat Anda menerbitkan, dan Anda mengendalikannya sejak awal. Terbitkan ide Anda dan buka ruang diskusinya; setiap anggota baru yang Anda undang memperluas jangkauan Anda.',
    },
  ],
  sections: [
    'Definisikan ide dalam satu kalimat yang jelas. Padatkan ide menjadi satu kalimat: untuk siapa, apa yang diubahnya, dan mengapa penting. Jika Anda tidak bisa mengatakannya dalam satu kalimat, Anda belum siap menerbitkannya. JoinOrigin dirancang di sekitar halaman ide yang mudah ditemukan — pitch satu kalimat adalah inti halaman dan frasa yang akan dicari orang. Tulis kalimatnya dan ujilah pada tiga orang sebelum melangkah lebih jauh.',
    'Tulis halaman ide dengan janji dan kebutuhan. Halaman harus menyatakan idenya, mengapa penting, apa kebutuhannya, dan siapa yang ingin Anda ajak bergabung. Jujurlah tentang posisi ide — percikan, prototipe, produk. JoinOrigin otomatis membuat halaman dan ruang saat Anda menerbitkan ide; kreator mengendalikan ruang sejak awal dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Terbitkan ide dan buka ruang diskusi di sekitarnya.',
    'Terbitkan ide dan biarkan ruangnya terbuka. Menerbitkan adalah momen ide menjadi mudah ditemukan. Di JoinOrigin, menerbitkan otomatis membuat ruang — tidak pernah ada langkah "buat obrolannya nanti", dan kreator memiliki ruang sejak detik nol. Di JoinOrigin halaman ide dan ruangnya adalah satu penerbitan atomik. Anda juga dapat membagikan halaman secara publik dan menyiapkan ruang di alat yang sudah Anda gunakan.',
    'Bagikan tautan bergabung. Tautan bergabung adalah jalur terpendek dari ketertarikan ke koneksi: satu tautan, satu klik, dan orang yang tertarik masuk ke ruang. Letakkan di semua tempat orang yang tepat berkumpul. Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke ide Anda sudah cukup.',
    'Undang orang tertarik pertama secara personal. Undangan personal lebih berhasil daripada kiriman publik. Kirim pesan kepada orang yang sesuai dengan audiens ide, bagikan tautan bergabung, dan minta mereka membawa satu orang lain yang mungkin peduli. JoinOrigin mempermudah penemuan — tempat orang yang mencari ide dapat menemukan ide Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap orang yang bergabung menjadi saluran ke jaringan mereka sendiri.',
    'Pandu percakapan pertama di ruang. Beberapa percakapan pertama menentukan apakah sebuah ide punya momentum. Buka ruang dengan pertanyaan yang jelas — apa masalahnya, apa langkah pertamanya, apa yang masing-masing Anda bawa — dan biarkan orang merespons. JoinOrigin tidak menjalankan percakapan ini; ruang itu milik Anda untuk dibentuk. Platform memberi ide satu ruang tempat ketertarikan menjadi percakapan, dan kreator memiliki ruang itu. Mulai percakapan di mana pun orang-orang Anda sudah berkumpul.',
    'Kumpulkan umpan balik dan sempurnakan ide. Tanyakan kepada yang bergabung apa yang membuat mereka antusias, apa yang mengkhawatirkan mereka, dan apa yang akan mereka lakukan lebih dulu. Sesuaikan pitch, cakupan, atau langkah berikutnya berdasarkan jawaban mereka. JoinOrigin menyimpan memori bersama sebuah ide di satu tempat — catatan, keputusan, dan umpan balik di ruang — sehingga penyempurnaan terlihat alih-alih hilang. Tanyakan langsung kepada anggota di ruang setelah minggu pertama.',
    'Jaga ide tetap mudah ditemukan saat ia tumbuh. Kunjungi kembali halaman saat ide berkembang — perbarui janji, kebutuhan, dan langkah berikutnya sehingga orang baru selalu melihat versi terkini. Pertumbuhan berlipat ketika setiap anggota bisa menggambarkan ide dalam satu kalimat dan membagikan tautan bergabungnya. JoinOrigin menjaga halaman ide dan ruangnya tetap terhubung saat ketertarikan tumbuh — satu tempat di mana janji, percakapan, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
  ],
  steps: [
    {
      title: 'Definisikan ide dalam satu kalimat yang jelas',
      body: 'Padatkan ide menjadi satu kalimat: untuk siapa, apa yang diubahnya, dan mengapa penting. Jika Anda tidak bisa mengatakannya dalam satu kalimat, Anda belum siap menerbitkannya.',
      joinOriginNote:
        'JoinOrigin dirancang di sekitar halaman ide yang mudah ditemukan — pitch satu kalimat adalah inti halaman dan frasa yang akan dicari orang. Tulis kalimatnya dan ujilah pada tiga orang sebelum melangkah lebih jauh.',
    },
    {
      title: 'Tulis halaman ide dengan janji dan kebutuhan',
      body: 'Halaman harus menyatakan idenya, mengapa penting, apa kebutuhannya, dan siapa yang ingin Anda ajak bergabung. Jujurlah tentang posisi ide — percikan, prototipe, produk.',
      joinOriginNote:
        'JoinOrigin otomatis membuat halaman dan ruang saat Anda menerbitkan ide; kreator mengendalikan ruang sejak awal dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Terbitkan ide dan buka ruang diskusi di sekitarnya.',
    },
    {
      title: 'Terbitkan ide dan biarkan ruangnya terbuka',
      body: 'Menerbitkan adalah momen ide menjadi mudah ditemukan. Di JoinOrigin, menerbitkan otomatis membuat ruang — tidak pernah ada langkah "buat obrolannya nanti", dan kreator memiliki ruang sejak detik nol.',
      joinOriginNote:
        'Di JoinOrigin halaman ide dan ruangnya adalah satu penerbitan atomik. Anda juga dapat membagikan halaman secara publik dan menyiapkan ruang di alat yang sudah Anda gunakan.',
    },
    {
      title: 'Bagikan tautan bergabung',
      body: 'Tautan bergabung adalah jalur terpendek dari ketertarikan ke koneksi: satu tautan, satu klik, dan orang yang tertarik masuk ke ruang. Letakkan di semua tempat orang yang tepat berkumpul.',
      joinOriginNote:
        'Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke ide Anda sudah cukup.',
    },
    {
      title: 'Undang orang tertarik pertama secara personal',
      body: 'Undangan personal lebih berhasil daripada kiriman publik. Kirim pesan kepada orang yang sesuai dengan audiens ide, bagikan tautan bergabung, dan minta mereka membawa satu orang lain yang mungkin peduli.',
      joinOriginNote:
        'JoinOrigin mempermudah penemuan — tempat orang yang mencari ide dapat menemukan ide Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap orang yang bergabung menjadi saluran ke jaringan mereka sendiri.',
    },
    {
      title: 'Pandu percakapan pertama di ruang',
      body: 'Beberapa percakapan pertama menentukan apakah sebuah ide punya momentum. Buka ruang dengan pertanyaan yang jelas — apa masalahnya, apa langkah pertamanya, apa yang masing-masing Anda bawa — dan biarkan orang merespons.',
      joinOriginNote:
        'JoinOrigin tidak menjalankan percakapan ini; ruang itu milik Anda untuk dibentuk. Platform memberi ide satu ruang tempat ketertarikan menjadi percakapan, dan kreator memiliki ruang itu. Mulai percakapan di mana pun orang-orang Anda sudah berkumpul.',
    },
    {
      title: 'Kumpulkan umpan balik dan sempurnakan ide',
      body: 'Tanyakan kepada yang bergabung apa yang membuat mereka antusias, apa yang mengkhawatirkan mereka, dan apa yang akan mereka lakukan lebih dulu. Sesuaikan pitch, cakupan, atau langkah berikutnya berdasarkan jawaban mereka.',
      joinOriginNote:
        'JoinOrigin menyimpan memori bersama sebuah ide di satu tempat — catatan, keputusan, dan umpan balik di ruang — sehingga penyempurnaan terlihat alih-alih hilang. Tanyakan langsung kepada anggota di ruang setelah minggu pertama.',
    },
    {
      title: 'Jaga ide tetap mudah ditemukan saat ia tumbuh',
      body: 'Kunjungi kembali halaman saat ide berkembang — perbarui janji, kebutuhan, dan langkah berikutnya sehingga orang baru selalu melihat versi terkini. Pertumbuhan berlipat ketika setiap anggota bisa menggambarkan ide dalam satu kalimat dan membagikan tautan bergabungnya.',
      joinOriginNote:
        'JoinOrigin menjaga halaman ide dan ruangnya tetap terhubung saat ketertarikan tumbuh — satu tempat di mana janji, percakapan, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
    },
  ],
};

export default content;
