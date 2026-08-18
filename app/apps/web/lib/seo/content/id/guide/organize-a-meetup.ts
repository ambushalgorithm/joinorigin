import type { GuideContent } from '../../types';

/**
 * "Cara Menyelenggarakan Meetup" — panduan L1 yang selalu relevan
 * (desain §6.1, TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang: meetup adalah yang dilakukan grup SETELAH terbentuk —
 * jalur digital terhubung→bergabung→ruang didahulukan (terbitkan grup →
 * ruang dibuat otomatis → anggota bergabung via tautan), dan meetup tatap
 * muka adalah konsekuensi hilir. Nilai JoinOrigin dijalin ke dalam intro
 * dan setiap langkah (joinOriginNote per langkah), dengan kerangka yang
 * jujur — JoinOrigin tidak memesan venue atau menyelenggarakan acara.
 * "Ruang" merujuk pada ruang Matrix (§6.3) — venue fisik digambarkan
 * sebagai venue/ruang, bukan "rooms".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'organize-a-meetup',
  title: 'Cara Menyelenggarakan Meetup: Venue, Agenda & Promosi | JoinOrigin',
  description:
    'Selenggarakan meetup setelah grup Anda terbentuk — baik didirikan bulan lalu maupun sudah bertemu bertahun-tahun — pilih format, pesan venue, susun agenda, promosikan, dan jalankan acaranya. Daftar periksa praktis dari JoinOrigin.',
  intro: [
    'Meetup adalah acara tatap muka berulang tempat orang berkumpul di sekitar minat bersama — dan di JoinOrigin ini adalah langkah alami berikutnya setelah berkomunikasi di ruang. Jalur digital didahulukan: orang menemukan dan bergabung dengan grup melalui tautan, dan ruang grup menjadi tempat anggota berbicara, merencanakan, dan tetap terhubung di antara pertemuan. Meetup tatap muka adalah langkah berikutnya dari komunitas yang terbentuk itu — baik grup didirikan bulan lalu maupun telah bertemu informal selama bertahun-tahun, ruang memberinya satu rumah terorganisir dari mana meetup bisa tumbuh.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan komunitas untuk diikuti dan memulai komunitas mereka sendiri — sehingga meetup punya rumah tempat anggota tertarik dapat menemukan grup, bergabung dengan ruangnya, dan mengoordinasikan pertemuan alih-alih bergantung pada daftar kontak satu orang. JoinOrigin tidak memesan venue atau menyelenggarakan acara — tujuan seluruh platform adalah menghubungkan orang yang berbagi minat, dan pertemuan itu sendiri adalah milik Anda untuk dijalankan.',
    'Panduan ini mencakup seluruh siklus hidup meetup setelah grup ada — untuk grup yang baru terbentuk dan yang telah berkumpul bertahun-tahun: memilih format yang sesuai dengan audiens Anda, menemukan dan memesan venue tanpa menguras anggaran, menyusun agenda dengan awal dan akhir yang jelas, mempromosikan acara di tempat audiens Anda benar-benar mencari, dan menjalankan malamnya sehingga peserta pulang ingin yang berikutnya. Setiap langkah menyertakan catatan tentang cara JoinOrigin membantu — dan langkah pertama tentang grup digital, karena tanpa grup dan ruangnya tidak ada komunitas untuk bertemu.',
  ],
  dataPoints: [
    'Meetup sederhana hanya butuh tiga hal: format, venue, dan saluran promosi.',
    'Meetup malam hari di hari kerja dan sesi akhir pekan pagi adalah format berulang yang paling umum.',
    'Sebagian besar venue — perpustakaan, kafe, coworking space — menawarkan ruang gratis atau berbiaya rendah untuk acara komunitas.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan atau memulai komunitas; tidak memesan venue atau menyelenggarakan acara.',
  ],
  faq: [
    {
      question: 'Seberapa jauh sebelumnya saya harus mempromosikan meetup?',
      answer:
        'Dua hingga tiga minggu adalah keseimbangan yang baik: cukup awal agar orang bisa merencanakan, cukup pendek untuk menjaga urgensi. Umumkan di ruang grup lebih dulu, lalu bagikan acara di tempat audiens Anda berkumpul. Kirim pengingat dua hari sebelumnya dan lagi pada hari acara.',
    },
    {
      question: 'Bagaimana jika hanya sedikit orang yang datang?',
      answer:
        'Itu normal, terutama di awal. Jalankan sesinya untuk siapa pun yang hadir, kumpulkan umpan balik mereka di ruang, dan gunakan edisi berikutnya untuk memperbaiki promosi. Konsistensi lebih penting daripada jumlah peserta mana pun.',
    },
    {
      question: 'Apakah meetup butuh agenda formal?',
      answer:
        'Ya, agenda yang ringan. Awal yang jelas, ronde perkenalan singkat, satu aktivitas atau pembicaraan utama, dan waktu selesai yang pasti membuat peserta merasa waktu mereka dihargai — itulah yang membawa mereka kembali.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menyelenggarakan meetup?',
      answer:
        'Ya. JoinOrigin membantu orang menemukan dan memulai komunitas — satu rumah digital terorganisir tempat ruang grup menjadi tempat anggota berkoordinasi dan tempat meetup bisa ditemukan. JoinOrigin tidak menyelenggarakan acara sendiri, jadi langkah-langkah praktis dalam panduan ini adalah milik Anda untuk dijalankan.',
    },
  ],
  sections: [
    'Bentuk grup dan buka ruangnya lebih dulu. Meetup adalah yang dilakukan grup setelah terbentuk — jadi mulailah dengan inti digital: terbitkan grup, biarkan ruangnya dibuat otomatis, dan undang anggota melalui tautan. Menerbitkan grup di JoinOrigin otomatis membuat ruangnya, ruang yang dikendalikan kreator tempat anggota merencanakan dan tetap terhubung. Siapkan grup dan ruangnya di alat yang sudah Anda gunakan sebelum merencanakan satu acara pun jika Anda lebih suka.',
    'Pilih format yang sesuai dengan audiens Anda. Putuskan antara pembicaraan, lokakarya, lingkaran diskusi, acara sosial, atau sesi kerja. Sesuaikan format dengan apa yang diinginkan audiens — pembelajaran, koneksi, atau kemajuan pada pekerjaan bersama. Di JoinOrigin anggota bisa melihat format komunitas sebelum bergabung — yang menarik orang yang tepat dan menetapkan ekspektasi. Pilih format yang benar-benar akan dihadiri audiens Anda.',
    'Pilih tanggal dan frekuensi. Malam hari kerja dan pagi akhir pekan paling cocok untuk kebanyakan audiens. Pilih slot berulang — bulanan adalah standar — dan lindungi seperti janji agar orang bisa membangun kebiasaan. JoinOrigin membuat ritme komunitas terlihat di satu tempat, sehingga anggota tahu tanggal berikutnya tanpa mencarinya. Lindungi slot berulang Anda seperti janji.',
    'Pesan venue lebih awal. Perpustakaan, kafe, ruang coworking, pusat komunitas, dan taman menyelenggarakan acara komunitas dengan biaya rendah atau gratis. Konfirmasikan kapasitas, jam buka, dan persyaratan pemesanan apa pun secara tertulis. JoinOrigin tidak memesan venue atau mengoordinasikan ruang fisik — fokus desainnya adalah menghubungkan orang di ruang digital. Konfirmasikan kapasitas dan jam buka langsung dengan venue secara tertulis.',
    'Susun agenda yang ringan. Jaga tetap sederhana: sambutan dan perkenalan, aktivitas utama, diskusi terbuka, penutup dan tanggal berikutnya. Perkirakan total 60–90 menit dan terbitkan agenda bersama daftar acara dan di ruang. JoinOrigin adalah OS komunitas tempat artefak bersama seperti agenda dan catatan hidup berdampingan dengan komunitas. Agenda yang diterbitkan sederhana sudah cukup.',
    'Promosikan di tempat audiens Anda sudah berada. Bagikan acara di grup khusus, buletin lokal, papan komunitas, dan saluran sosial yang relevan — dan arahkan semua orang ke tautan bergabung grup sehingga peserta menjadi anggota, bukan tamu semalam. JoinOrigin adalah tempat orang yang mencari komunitas menemukannya dan bergabung melalui tautan. Promosikan di grup khusus dan buletin tempat audiens Anda sudah berkumpul, dan bagikan tautan bergabung kepada setiap peserta.',
    'Jalankan malamnya dengan ritme yang jelas. Buka tepat waktu, sapa yang terlambat, jaga aktivitas utama tetap di jalur, dan tutup dengan mengumumkan tanggal berikutnya. Selesaikan tepat waktu — itu adalah sinyal rasa hormat terkuat. JoinOrigin tidak menyediakan staf acara — pengalaman itu milik Anda. Platform menjaga kisah komunitas dalam satu ruang terorganisir — janji, ritme, dan orang-orangnya. Selesai tepat waktu adalah sinyal rasa hormat terkuat.',
    'Tindak lanjuti dalam 24 jam di ruang. Ucapkan terima kasih kepada peserta, bagikan tautan atau catatan apa pun, dan undang umpan balik di tempat seluruh grup bisa melihatnya. Tindak lanjut adalah yang mengubah satu acara menjadi komunitas berulang. JoinOrigin memberi komunitas ruang persisten tempat ringkasan, tanggal berikutnya, dan umpan balik hidup — mengubah satu acara menjadi komunitas berulang. Mulailah ditemukan dan pertahankan momentumnya.',
  ],
  steps: [
    {
      title: 'Bentuk grup dan buka ruangnya lebih dulu',
      body: 'Meetup adalah yang dilakukan grup setelah terbentuk — jadi mulailah dengan inti digital: terbitkan grup, biarkan ruangnya dibuat otomatis, dan undang anggota melalui tautan.',
      joinOriginNote:
        'Menerbitkan grup di JoinOrigin otomatis membuat ruangnya, ruang yang dikendalikan kreator tempat anggota merencanakan dan tetap terhubung. Siapkan grup dan ruangnya di alat yang sudah Anda gunakan sebelum merencanakan satu acara pun jika Anda lebih suka.',
    },
    {
      title: 'Pilih format yang sesuai dengan audiens Anda',
      body: 'Putuskan antara pembicaraan, lokakarya, lingkaran diskusi, acara sosial, atau sesi kerja. Sesuaikan format dengan apa yang diinginkan audiens — pembelajaran, koneksi, atau kemajuan pada pekerjaan bersama.',
      joinOriginNote:
        'Di JoinOrigin anggota bisa melihat format komunitas sebelum bergabung — yang menarik orang yang tepat dan menetapkan ekspektasi. Pilih format yang benar-benar akan dihadiri audiens Anda.',
    },
    {
      title: 'Pilih tanggal dan frekuensi',
      body: 'Malam hari kerja dan pagi akhir pekan paling cocok untuk kebanyakan audiens. Pilih slot berulang — bulanan adalah standar — dan lindungi seperti janji agar orang bisa membangun kebiasaan.',
      joinOriginNote:
        'JoinOrigin membuat ritme komunitas terlihat di satu tempat, sehingga anggota tahu tanggal berikutnya tanpa mencarinya. Lindungi slot berulang Anda seperti janji.',
    },
    {
      title: 'Pesan venue lebih awal',
      body: 'Perpustakaan, kafe, ruang coworking, pusat komunitas, dan taman menyelenggarakan acara komunitas dengan biaya rendah atau gratis. Konfirmasikan kapasitas, jam buka, dan persyaratan pemesanan apa pun secara tertulis.',
      joinOriginNote:
        'JoinOrigin tidak memesan venue atau mengoordinasikan ruang fisik — fokus desainnya adalah menghubungkan orang di ruang digital. Konfirmasikan kapasitas dan jam buka langsung dengan venue secara tertulis.',
    },
    {
      title: 'Susun agenda yang ringan',
      body: 'Jaga tetap sederhana: sambutan dan perkenalan, aktivitas utama, diskusi terbuka, penutup dan tanggal berikutnya. Perkirakan total 60–90 menit dan terbitkan agenda bersama daftar acara dan di ruang.',
      joinOriginNote:
        'JoinOrigin adalah OS komunitas tempat artefak bersama seperti agenda dan catatan hidup berdampingan dengan komunitas. Agenda yang diterbitkan sederhana sudah cukup.',
    },
    {
      title: 'Promosikan di tempat audiens Anda sudah berada',
      body: 'Bagikan acara di grup khusus, buletin lokal, papan komunitas, dan saluran sosial yang relevan — dan arahkan semua orang ke tautan bergabung grup sehingga peserta menjadi anggota, bukan tamu semalam.',
      joinOriginNote:
        'JoinOrigin adalah tempat orang yang mencari komunitas menemukannya dan bergabung melalui tautan. Promosikan di grup khusus dan buletin tempat audiens Anda sudah berkumpul, dan bagikan tautan bergabung kepada setiap peserta.',
    },
    {
      title: 'Jalankan malamnya dengan ritme yang jelas',
      body: 'Buka tepat waktu, sapa yang terlambat, jaga aktivitas utama tetap di jalur, dan tutup dengan mengumumkan tanggal berikutnya. Selesaikan tepat waktu — itu adalah sinyal rasa hormat terkuat.',
      joinOriginNote:
        'JoinOrigin tidak menyediakan staf acara — pengalaman itu milik Anda. Platform menjaga kisah komunitas dalam satu ruang terorganisir — janji, ritme, dan orang-orangnya. Selesai tepat waktu adalah sinyal rasa hormat terkuat.',
    },
    {
      title: 'Tindak lanjuti dalam 24 jam di ruang',
      body: 'Ucapkan terima kasih kepada peserta, bagikan tautan atau catatan apa pun, dan undang umpan balik di tempat seluruh grup bisa melihatnya. Tindak lanjut adalah yang mengubah satu acara menjadi komunitas berulang.',
      joinOriginNote:
        'JoinOrigin memberi komunitas ruang persisten tempat ringkasan, tanggal berikutnya, dan umpan balik hidup — mengubah satu acara menjadi komunitas berulang. Mulailah ditemukan dan pertahankan momentumnya.',
    },
  ],
};

export default content;
