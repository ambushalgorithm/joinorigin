import type { GuideContent } from '../../types';

/**
 * "Cara Membuat Grup" — panduan L1 yang selalu relevan (desain §6.1,
 * TASK-353), terjemahan Bahasa Indonesia (id).
 *
 * Ditulis berdasarkan alur layar produk §2 inti: terbitkan grup → halaman
 * publik grup → Bergabung via tautan → ruang dibuat otomatis SAAT
 * DITERBITKAN → kreator mengendalikan ruang → pertumbuhan lewat
 * linimasa/undangan. Grup adalah komunitas: halaman publik menyatakan
 * janji, ruang adalah tempat anggota terhubung, dan anggota bergabung
 * melalui tautan. Platform sudah berjalan: membuat grup menerbitkan
 * halamannya dan membuka ruangnya sekarang. "Ruang" merujuk pada ruang
 * Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'create-a-group',
  title: 'Cara Membuat Grup: Terbitkan dan Buka Ruangnya | JoinOrigin',
  description:
    'Buat grup di JoinOrigin — terbitkan halaman grup, buka ruangnya secara otomatis, dan undang anggota melalui tautan bergabung. Langkah praktis dari JoinOrigin.',
  intro: [
    'Setiap komunitas — baik yang benar-benar baru maupun yang sudah bertemu informal selama berbulan-bulan — berjalan pada dua gerakan yang sama: memutuskan untuk siapa komunitas itu, dan memberi orang-orang itu satu tempat yang jelas untuk terhubung. Grup tanpa rumah tidak pernah terbentuk dengan benar; ketertarikan tersebar di pesan, spreadsheet, dan percakapan sekali jalan, dan tidak ada yang melekat. Halaman grup dan ruangnya adalah rumah itu, dan membuat keduanya dengan baik adalah pembeda antara komunitas sungguhan dan sekadar daftar nama.',
    'Alur JoinOrigin bekerja seperti ini: Anda menerbitkan grup, halaman publiknya muncul, dan ruangnya dibuat otomatis pada saat diterbitkan. Orang menemukan grup melalui Jelajahi atau mengikuti tautan bergabung, bergabung cukup dengan satu klik, dan mereka masuk ke ruang — ruang Matrix yang dikendalikan kreator tempat komunitas benar-benar hidup. Kreator memiliki ruang sejak detik nol dan mengendalikan siapa yang bergabung dan bagaimana grup bekerja.',
    'Panduan ini mencakup seluruh jalur — baik grupnya baru maupun sudah ada di atas kertas: memilih audiens dan tujuan, menulis halaman grup yang bisa ditemukan orang, menerbitkan grup dan membuka ruangnya, menetapkan ekspektasi sebagai kreator, membagikan tautan bergabung, mengundang anggota pertama, memulai percakapan pertama, dan menjaga ruang tetap aktif sehingga grup terus tumbuh.',
  ],
  dataPoints: [
    'Grup yang paling jelas dimulai dengan satu audiens dan satu janji — kekhususan adalah fitur pertumbuhan.',
    'Di JoinOrigin, menerbitkan grup otomatis membuat ruangnya — komunitas memiliki tempat untuk terhubung sejak detik nol.',
    'Tautan bergabung adalah undangan paling sederhana: satu tautan, satu klik, dan anggota baru sudah berada di ruang.',
    'JoinOrigin adalah OS komunitas yang membantu orang menemukan, bergabung dengan, dan memulai grup — terbitkan grup Anda dan ruangnya langsung terbuka.',
  ],
  faq: [
    {
      question: 'Apa perbedaan antara grup dan komunitas?',
      answer:
        'Di JoinOrigin keduanya adalah objek yang sama. Grup (atau komunitas) adalah objek yang diterbitkan dan bisa diikuti dengan halaman publik dan ruang. Halaman grup menyatakan janji; ruang adalah tempat anggota terhubung. Komunitas mendapatkan Matrix Space yang menampung ruang-ruang grup, dan ruang utama adalah tempat grup itu hidup.',
    },
    {
      question: 'Kapan ruang grup dibuat?',
      answer:
        'Ruang dibuat otomatis saat Anda menerbitkan grup — tidak pernah ada langkah terpisah "buat obrolannya nanti". Kreator memiliki ruang sejak detik nol dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Anda juga bisa menyiapkan bentuk yang sama dengan alat yang sudah Anda gunakan.',
    },
    {
      question: 'Bagaimana anggota bergabung dengan grup saya?',
      answer:
        'Bergabung adalah satu tindakan: mengklik Bergabung di halaman publik grup, atau mengikuti tautan undangan langsung dari anggota. Orang yang bergabung masuk ke ruang grup. Pertumbuhan awal yang paling andal bersifat personal — membagikan tautan bergabung kepada orang yang sesuai dengan audiens dan meminta mereka membawa orang lain.',
    },
    {
      question: 'Apa yang sebaiknya tertulis di halaman grup?',
      answer:
        'Satu kalimat tentang untuk siapa grup ini, satu kalimat tentang apa yang terjadi di ruang, dan apa yang didapat anggota dengan bergabung. Jaga kekhususannya — "pendiri baru di Jakarta" mengalahkan "orang yang suka bisnis". Halaman adalah janji yang menentukan apakah seseorang mengklik Bergabung.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya membuat grup hari ini?',
      answer:
        'Ya. Menerbitkan grup di JoinOrigin membuat halaman dan ruangnya secara atomik — ruang terbuka saat Anda menerbitkan, dan Anda mengendalikannya sejak awal. Terbitkan grup dan buka ruang untuk anggota; setiap anggota baru yang Anda undang memperluas jangkauan Anda.',
    },
  ],
  sections: [
    'Pilih audiens dan tujuan. Putuskan untuk siapa grup ini dan untuk apa grup ini ada — satu audiens, satu janji, dan anggota yang berhasil yang bisa Anda gambarkan. JoinOrigin dirancang di sekitar halaman grup yang mudah ditemukan, dan grup yang paling jelas menyatakan audiens dan tujuannya di depan. Tulis satu kalimat untuk masing-masing dan simpan di depan setiap undangan.',
    'Tulis halaman grup yang bisa ditemukan orang. Halaman harus menyatakan untuk siapa grup ini, apa yang terjadi di ruang, dan apa yang didapat anggota dengan bergabung. Jaga kekhususan dan kejujurannya. Menerbitkan grup di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Terbitkan deskripsinya dan ujilah pada beberapa orang yang sesuai dengan audiens.',
    'Terbitkan grup dan buka ruangnya. Menerbitkan adalah momen grup menjadi nyata: halaman publik plus ruang tempat anggota terhubung. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya. Di JoinOrigin halaman, ruang, dan tautan bergabung adalah satu penerbitan. Buat halaman dan ruang di alat yang sudah digunakan grup Anda jika Anda lebih suka.',
    'Tetapkan ekspektasi sebagai kreator. Sebagai pemilik ruang, putuskan bagaimana grup bekerja: apa yang bisa diunggah anggota, apa aturannya, dan bagaimana orang baru disambut. Kendali kreator adalah kepemilikan ruang Matrix standar — undang, hapus, tetapkan peran, sematkan, arsipkan. JoinOrigin tidak menetapkan aturan untuk Anda; desainnya memberi Anda kendali. Tuliskan ekspektasi ruang dan sematkan di tempat yang bisa dilihat anggota.',
    'Bagikan tautan bergabung. Tautan bergabung adalah jalur terpendek dari ketertarikan ke keanggotaan: satu tautan, satu klik, dan anggota baru masuk ke ruang. Letakkan di semua tempat orang yang tepat berkumpul. Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke grup Anda sudah cukup.',
    'Undang anggota pertama secara personal. Undangan personal jauh lebih berhasil daripada kiriman publik. Kirim pesan kepada teman, kolega, dan kenalan yang sesuai dengan audiens, bagikan tautan bergabung, dan minta mereka membawa satu orang lain. JoinOrigin mempermudah penemuan — tempat orang yang mencari grup dapat menemukan grup Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap anggota menjadi saluran ke jaringan mereka sendiri.',
    'Mulai percakapan pertama di ruang. Percakapan pertama menentukan budaya. Buka dengan pertanyaan yang jelas — perkenalan, tujuan bersama, atau topik pertama — dan respons setiap pesan. JoinOrigin tidak menjalankan percakapan Anda; ruang itu milik Anda untuk dibentuk. Platform memberi grup satu ruang tempat anggota terhubung, dan kreator memilikinya. Jadilah anggota paling aktif selama beberapa minggu pertama.',
    'Jaga ruang tetap aktif dan terus berkembang. Pertahankan ritme — topik mingguan, check-in berulang, atau pembaruan rutin — sehingga anggota punya alasan untuk kembali. Pertumbuhan berlipat ketika setiap anggota bisa menggambarkan grup dalam satu kalimat dan membagikan tautan bergabungnya. JoinOrigin menjaga halaman grup dan ruangnya tetap terhubung saat grup tumbuh — satu tempat di mana janji, ruang, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
  ],
  steps: [
    {
      title: 'Pilih audiens dan tujuan',
      body: 'Putuskan untuk siapa grup ini dan untuk apa grup ini ada — satu audiens, satu janji, dan anggota yang berhasil yang bisa Anda gambarkan.',
      joinOriginNote:
        'JoinOrigin dirancang di sekitar halaman grup yang mudah ditemukan, dan grup yang paling jelas menyatakan audiens dan tujuannya di depan. Tulis satu kalimat untuk masing-masing dan simpan di depan setiap undangan.',
    },
    {
      title: 'Tulis halaman grup yang bisa ditemukan orang',
      body: 'Halaman harus menyatakan untuk siapa grup ini, apa yang terjadi di ruang, dan apa yang didapat anggota dengan bergabung. Jaga kekhususan dan kejujurannya.',
      joinOriginNote:
        'Menerbitkan grup di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Terbitkan deskripsinya dan ujilah pada beberapa orang yang sesuai dengan audiens.',
    },
    {
      title: 'Terbitkan grup dan buka ruangnya',
      body: 'Menerbitkan adalah momen grup menjadi nyata: halaman publik plus ruang tempat anggota terhubung. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya.',
      joinOriginNote:
        'Di JoinOrigin halaman, ruang, dan tautan bergabung adalah satu penerbitan. Buat halaman dan ruang di alat yang sudah digunakan grup Anda jika Anda lebih suka.',
    },
    {
      title: 'Tetapkan ekspektasi sebagai kreator',
      body: 'Sebagai pemilik ruang, putuskan bagaimana grup bekerja: apa yang bisa diunggah anggota, apa aturannya, dan bagaimana orang baru disambut. Kendali kreator adalah kepemilikan ruang Matrix standar — undang, hapus, tetapkan peran, sematkan, arsipkan.',
      joinOriginNote:
        'JoinOrigin tidak menetapkan aturan untuk Anda; desainnya memberi Anda kendali. Tuliskan ekspektasi ruang dan sematkan di tempat yang bisa dilihat anggota.',
    },
    {
      title: 'Bagikan tautan bergabung',
      body: 'Tautan bergabung adalah jalur terpendek dari ketertarikan ke keanggotaan: satu tautan, satu klik, dan anggota baru masuk ke ruang. Letakkan di semua tempat orang yang tepat berkumpul.',
      joinOriginNote:
        'Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke grup Anda sudah cukup.',
    },
    {
      title: 'Undang anggota pertama secara personal',
      body: 'Undangan personal jauh lebih berhasil daripada kiriman publik. Kirim pesan kepada teman, kolega, dan kenalan yang sesuai dengan audiens, bagikan tautan bergabung, dan minta mereka membawa satu orang lain.',
      joinOriginNote:
        'JoinOrigin mempermudah penemuan — tempat orang yang mencari grup dapat menemukan grup Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap anggota menjadi saluran ke jaringan mereka sendiri.',
    },
    {
      title: 'Mulai percakapan pertama di ruang',
      body: 'Percakapan pertama menentukan budaya. Buka dengan pertanyaan yang jelas — perkenalan, tujuan bersama, atau topik pertama — dan respons setiap pesan.',
      joinOriginNote:
        'JoinOrigin tidak menjalankan percakapan Anda; ruang itu milik Anda untuk dibentuk. Platform memberi grup satu ruang tempat anggota terhubung, dan kreator memilikinya. Jadilah anggota paling aktif selama beberapa minggu pertama.',
    },
    {
      title: 'Jaga ruang tetap aktif dan terus berkembang',
      body: 'Pertahankan ritme — topik mingguan, check-in berulang, atau pembaruan rutin — sehingga anggota punya alasan untuk kembali. Pertumbuhan berlipat ketika setiap anggota bisa menggambarkan grup dalam satu kalimat dan membagikan tautan bergabungnya.',
      joinOriginNote:
        'JoinOrigin menjaga halaman grup dan ruangnya tetap terhubung saat grup tumbuh — satu tempat di mana janji, ruang, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
    },
  ],
};

export default content;
