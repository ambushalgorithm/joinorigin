import type { GuideContent } from '../../types';

/**
 * "Cara Memulai Komunitas" — panduan L1 yang selalu relevan (desain §6.1,
 * TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang pada model digital terhubung→bergabung→ruang: terbitkan
 * grup → ruang dibuat otomatis saat diterbitkan → anggota bergabung via
 * tautan; panduan venue/format tetap sebagai konsekuensi hilir, bukan inti.
 * Nilai JoinOrigin dijalin ke dalam intro dan setiap langkah
 * (joinOriginNote per langkah), dengan kerangka yang jujur — JoinOrigin
 * tidak menjalankan acara lokal. "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'start-a-community',
  title: 'Cara Memulai Komunitas: Panduan Langkah demi Langkah | JoinOrigin',
  description:
    'Pelajari cara memulai komunitas — atau memberi komunitas yang sudah ada satu rumah digital — terbitkan grup, buka ruangnya, dan bawa anggota masuk melalui tautan bergabung. Langkah praktis dari JoinOrigin.',
  intro: [
    'Bagian tersulit dari memulai komunitas jarang adalah venue, agenda, atau anggaran — yang sulit adalah menemukan orang pertama yang berbagi minat Anda dan memberi mereka satu tempat yang jelas untuk terhubung. Itulah persisnya masalah yang dipecahkan JoinOrigin.',
    'JoinOrigin adalah OS komunitas yang dibangun di sekitar lingkaran digital: Anda menerbitkan grup, ruangnya dibuat otomatis, dan anggota bergabung melalui tautan. Ruang adalah tempat komunitas benar-benar hidup — ruang Matrix yang dikendalikan kreator tempat anggota berbicara, berbagi pembaruan, dan merencanakan bersama sejak hari pertama, alih-alih tersebar di spreadsheet, pesan yang bertebaran, dan formulir pendaftaran. Acara tatap muka ada hanya sebagai konsekuensi hilir: setelah grup terbentuk dan ruangnya hidup, anggota boleh memilih bertemu tatap muka — dan JoinOrigin tidak menjalankan acara lokal. Inti platform adalah menghubungkan orang yang sebaliknya tidak akan pernah bertemu, karena itulah setiap langkah dalam panduan ini bersesuaian dengan sesuatu yang dibantu JoinOrigin.',
    'Pendekatan ini berlaku untuk semua jenis komunitas: lingkaran pendiri, klub buku, grup lari lokal, jaringan usaha kecil, atau komunitas profesional daring — dan berlaku baik Anda mulai dari nol maupun meresmikan grup yang sudah bertemu informal. Prinsip intinya sederhana — orang bergabung karena janji yang jelas, dan mereka bertahan karena pengalamannya secara andal memenuhi janji itu. Anda tidak butuh anggaran besar, venue, atau audiens yang sudah ada untuk memulai; Anda butuh tujuan yang jelas, langkah pertama yang realistis, dan disiplin untuk mengulanginya.',
  ],
  dataPoints: [
    'Kebanyakan komunitas yang sukses dimulai dengan audiens yang sempit dan spesifik, bukan "semua orang yang tertarik".',
    'Menerbitkan grup langsung membuat ruangnya — tidak pernah ada langkah "buat obrolannya nanti".',
    'Tautan bergabung adalah undangan paling sederhana: satu tautan, satu klik, dan anggota baru sudah berada di ruang.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan atau memulai komunitas — tidak menjalankan acara lokal atau mengklaim staf lokal.',
  ],
  faq: [
    {
      question: 'Berapa lama untuk memulai komunitas?',
      answer:
        'Anda bisa menerbitkan grup dan membuka ruangnya dalam beberapa minggu jika menjaga cakupannya kecil: satu tujuan, satu tautan bergabung, dan aliran undangan personal yang stabil. Komunitas itu sendiri butuh beberapa bulan partisipasi konsisten di ruang sebelum terasa mapan.',
    },
    {
      question: 'Apakah saya butuh uang atau venue untuk memulai?',
      answer:
        'Tidak. Inti digital komunitas — grup yang diterbitkan dan ruangnya — tidak berbiaya dan tidak butuh venue. Banyak grup kemudian memilih bertemu tatap muka; perpustakaan, kedai kopi, taman, dan ruang coworking menyelenggarakan pertemuan pertama secara gratis di kebanyakan kota.',
    },
    {
      question: 'Apa kesalahan paling umum saat memulai komunitas?',
      answer:
        'Mencoba melayani semua orang. Komunitas dengan tujuan yang samar menarik sedikit anggota berkomitmen. Tentukan satu audiens spesifik dan satu hasil yang jelas, tulis di halaman grup, dan biarkan komunitas berkembang dari sana.',
    },
    {
      question: 'Bagaimana JoinOrigin bisa membantu saya memulai komunitas?',
      answer:
        'Menerbitkan grup di JoinOrigin otomatis membuat ruangnya dan anggota bergabung melalui tautan — satu rumah digital terorganisir untuk tujuan, orang, dan percakapan komunitas. JoinOrigin tidak menjalankan acara lokal, jadi langkah praktis dalam panduan ini berfungsi di platform dan dengan alat yang sudah Anda miliki.',
    },
  ],
  sections: [
    'Definisikan tujuan yang jelas. Putuskan untuk siapa komunitas ini, masalah apa yang dipecahkannya, dan seperti apa anggota yang berhasil. Tulis misi satu kalimat seperti "grup untuk pendiri baru di Jakarta berbagi pelajaran tahap awal". JoinOrigin memberi tujuan Anda rumah — halaman grup publik tempat misi, audiens, dan janji terlihat oleh siapa pun yang mencari grup seperti Anda. Tulis misinya dan letakkan di depan setiap undangan.',
    'Terbitkan grup dan buka ruangnya. Inti digital komunitas adalah grup yang diterbitkan dengan ruang tempat anggota bisa berbicara. Di JoinOrigin, menerbitkan grup otomatis membuat ruangnya — kreator memilikinya sejak detik nol dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Di JoinOrigin tidak ada langkah "buat obrolannya nanti": terbitkan grup dan ruangnya langsung ada, dengan kreator sebagai pemilik ruang. Siapkan rumah grup dan ruangnya di alat yang sudah Anda gunakan jika Anda lebih suka.',
    'Bagikan tautan bergabung Anda. Tautan bergabung adalah undangan paling sederhana yang ada: satu tautan, satu klik, dan anggota baru masuk ke ruang. Letakkan tautan di mana-mana — halaman grup Anda, pesan pribadi, dan tempat audiens Anda sudah berkumpul. Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke grup Anda sudah cukup.',
    'Undang sepuluh orang pertama secara personal. Undangan personal jauh lebih berhasil daripada kiriman publik. Kirim pesan kepada teman, kolega, dan kenalan yang sesuai dengan audiens, bagikan tautan bergabung, dan minta mereka membawa satu orang lain. JoinOrigin mempermudah penemuan — tempat orang yang mencari komunitas dapat menemukan komunitas Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap anggota yang Anda undang menjadi saluran ke jaringan mereka sendiri.',
    'Pilih format dan frekuensi (keputusan hilir). Setelah grup terbentuk, pilih format berulang — diskusi bulanan, sesi kerja mingguan, pembicaraan, atau jalan santai sosial. Berulang mengalahkan sekali jalan karena kebiasaanlah yang mengubah orang asing menjadi anggota. Ini keputusan hilir: grup boleh berkumpul tatap muka nanti, tetapi ruang sudah menjadi rumah komunitas. Di JoinOrigin penyelenggara dapat mendeskripsikan format mereka sekali dan anggota bisa melihat apa yang diharapkan sebelum bergabung — yang mengurangi keraguan yang menghentikan pendatang baru. Pilih format Anda dan nyatakan di setiap undangan.',
    'Jalankan pertemuan pertama yang hebat. Jika anggota memilih bertemu tatap muka — datang lebih awal, sapa setiap orang, jalankan ronde perkenalan singkat, dan akhiri dengan tanggal berikutnya yang jelas. Tujuan pertemuan pertama bukan ukurannya; tujuannya adalah semua orang pulang ingin kembali. JoinOrigin tidak menyediakan staf atau menjalankan pertemuan — pengalaman itu milik Anda untuk dirancang. Platform membantu komunitas terbentuk di sekitarnya: satu ruang bersama tempat tanggal, ringkasan, dan langkah berikutnya hidup.',
    'Kumpulkan umpan balik dan iterasi. Setelah minggu-minggu pertama, tanyakan kepada anggota apa yang mereka inginkan lebih banyak atau lebih sedikit — di ruang dan di pertemuan. Sesuaikan format, waktu, atau venue berdasarkan jawaban mereka, bukan berdasarkan apa yang Anda bayangkan. JoinOrigin menyimpan memori bersama komunitas di satu tempat — catatan, keputusan, dan apa yang diminta anggota — sehingga iterasi terlihat alih-alih hilang. Tanyakan langsung kepada anggota di ruang setelah setiap pertemuan.',
    'Terbitkan ritme yang konsisten dan tumbuh perlahan. Pertahankan hari dan format yang sama selama beberapa bulan sebelum memperluas. Pertumbuhan berlipat melalui rujukan ketika setiap anggota bisa menggambarkan apa itu komunitas dalam satu kalimat dan membagikan tautan bergabungnya. JoinOrigin membantu komunitas Anda tetap mudah ditemukan dan terhubung saat ia tumbuh — satu tempat di mana ritme, janji, ruang, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
  ],
  steps: [
    {
      title: 'Definisikan tujuan yang jelas',
      body: 'Putuskan untuk siapa komunitas ini, masalah apa yang dipecahkannya, dan seperti apa anggota yang berhasil. Tulis misi satu kalimat seperti "grup untuk pendiri baru di Jakarta berbagi pelajaran tahap awal".',
      joinOriginNote:
        'JoinOrigin memberi tujuan Anda rumah — halaman grup publik tempat misi, audiens, dan janji terlihat oleh siapa pun yang mencari grup seperti Anda. Tulis misinya dan letakkan di depan setiap undangan.',
    },
    {
      title: 'Terbitkan grup dan buka ruangnya',
      body: 'Inti digital komunitas adalah grup yang diterbitkan dengan ruang tempat anggota bisa berbicara. Di JoinOrigin, menerbitkan grup otomatis membuat ruangnya — kreator memilikinya sejak detik nol dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element.',
      joinOriginNote:
        'Di JoinOrigin tidak ada langkah "buat obrolannya nanti": terbitkan grup dan ruangnya langsung ada, dengan kreator sebagai pemilik ruang. Siapkan rumah grup dan ruangnya di alat yang sudah Anda gunakan jika Anda lebih suka.',
    },
    {
      title: 'Bagikan tautan bergabung Anda',
      body: 'Tautan bergabung adalah undangan paling sederhana yang ada: satu tautan, satu klik, dan anggota baru masuk ke ruang. Letakkan tautan di mana-mana — halaman grup Anda, pesan pribadi, dan tempat audiens Anda sudah berkumpul.',
      joinOriginNote:
        'Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke grup Anda sudah cukup.',
    },
    {
      title: 'Undang sepuluh orang pertama secara personal',
      body: 'Undangan personal jauh lebih berhasil daripada kiriman publik. Kirim pesan kepada teman, kolega, dan kenalan yang sesuai dengan audiens, bagikan tautan bergabung, dan minta mereka membawa satu orang lain.',
      joinOriginNote:
        'JoinOrigin mempermudah penemuan — tempat orang yang mencari komunitas dapat menemukan komunitas Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap anggota yang Anda undang menjadi saluran ke jaringan mereka sendiri.',
    },
    {
      title: 'Pilih format dan frekuensi (keputusan hilir)',
      body: 'Setelah grup terbentuk, pilih format berulang — diskusi bulanan, sesi kerja mingguan, pembicaraan, atau jalan santai sosial. Berulang mengalahkan sekali jalan karena kebiasaanlah yang mengubah orang asing menjadi anggota. Ini keputusan hilir: grup boleh berkumpul tatap muka nanti, tetapi ruang sudah menjadi rumah komunitas.',
      joinOriginNote:
        'Di JoinOrigin penyelenggara dapat mendeskripsikan format mereka sekali dan anggota bisa melihat apa yang diharapkan sebelum bergabung — yang mengurangi keraguan yang menghentikan pendatang baru. Pilih format Anda dan nyatakan di setiap undangan.',
    },
    {
      title: 'Jalankan pertemuan pertama yang hebat',
      body: 'Jika anggota memilih bertemu tatap muka — datang lebih awal, sapa setiap orang, jalankan ronde perkenalan singkat, dan akhiri dengan tanggal berikutnya yang jelas. Tujuan pertemuan pertama bukan ukurannya; tujuannya adalah semua orang pulang ingin kembali.',
      joinOriginNote:
        'JoinOrigin tidak menyediakan staf atau menjalankan pertemuan — pengalaman itu milik Anda untuk dirancang. Platform membantu komunitas terbentuk di sekitarnya: satu ruang bersama tempat tanggal, ringkasan, dan langkah berikutnya hidup.',
    },
    {
      title: 'Kumpulkan umpan balik dan iterasi',
      body: 'Setelah minggu-minggu pertama, tanyakan kepada anggota apa yang mereka inginkan lebih banyak atau lebih sedikit — di ruang dan di pertemuan. Sesuaikan format, waktu, atau venue berdasarkan jawaban mereka, bukan berdasarkan apa yang Anda bayangkan.',
      joinOriginNote:
        'JoinOrigin menyimpan memori bersama komunitas di satu tempat — catatan, keputusan, dan apa yang diminta anggota — sehingga iterasi terlihat alih-alih hilang. Tanyakan langsung kepada anggota di ruang setelah setiap pertemuan.',
    },
    {
      title: 'Terbitkan ritme yang konsisten dan tumbuh perlahan',
      body: 'Pertahankan hari dan format yang sama selama beberapa bulan sebelum memperluas. Pertumbuhan berlipat melalui rujukan ketika setiap anggota bisa menggambarkan apa itu komunitas dalam satu kalimat dan membagikan tautan bergabungnya.',
      joinOriginNote:
        'JoinOrigin membantu komunitas Anda tetap mudah ditemukan dan terhubung saat ia tumbuh — satu tempat di mana ritme, janji, ruang, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
    },
  ],
};

export default content;
