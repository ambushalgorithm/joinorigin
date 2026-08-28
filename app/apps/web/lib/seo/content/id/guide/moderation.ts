import type { GuideContent } from '../../types';

/**
 * "Moderasi Origin" — panduan L1 yang selalu relevan (desain §6.1,
 * TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang pada model digital terhubung→bergabung→ruang: kendali
 * kreator ADALAH kepemilikan ruang Matrix — mengundang/menghapus anggota,
 * menetapkan peran, mengedit pengaturan ruang, menyematkan pesan,
 * mengarsipkan ruang — diberlakukan secara native di Element. Nilai
 * JoinOrigin dijalin ke dalam intro dan setiap langkah (joinOriginNote per
 * langkah), dengan kerangka yang jujur — JoinOrigin tidak memoderasi
 * Origin pihak ketiga atau menyediakan staf moderasi. "Ruang" merujuk
 * pada ruang Matrix (§6.3) — ruang privat/insiden digambarkan sebagai
 * ruang/DM, bukan "kanal".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'moderation',
  title: 'Moderasi Origin: Cara Menjaga Grup Sehat & Ramah | JoinOrigin',
  description:
    'Moderasi Origin dengan aturan yang jelas, tindakan dini, dan de-eskalasi — baik Anda menyiapkan grup baru maupun memperbaiki budaya grup yang mapan, kendali kreator adalah kepemilikan ruang Matrix, dengan peran yang diberlakukan di Element. Langkah praktis dari JoinOrigin.',
  intro: [
    'Setiap Origin yang tumbuh pada akhirnya akan menghadapi momen yang menguji budayanya — perdebatan panas, spammer, anggota yang membuat orang lain tidak nyaman, atau kesalahpahaman yang membesar. Moderasi adalah praktik melindungi ruang agar Origin tetap ramah, dan itu menjadi perlu justru karena komunitas terdiri dari orang-orang yang terhubung satu sama lain. Koneksi itulah masalah inti yang dibantu JoinOrigin — dan praktiknya berlaku sama baik untuk Origin mapan yang memperbaiki budayanya maupun grup baru yang menetapkan ekspektasi sebelum anggota pertama datang.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan, memulai, dan mengorganisir komunitas — dan dalam model digitalnya, komunitas hidup dalam ruang yang dikendalikan kreator. Kendali kreator adalah kepemilikan ruang Matrix standar: kreator dapat mengundang dan menghapus anggota, menetapkan peran, mengedit pengaturan ruang, menyematkan pesan, dan mengarsipkan ruang — semuanya diberlakukan secara native di dalam Element, klien obrolan bawaan, tanpa sistem izin khusus. Kepemilikan itu adalah tulang punggung moderasi di JoinOrigin: kreator memutuskan siapa yang menjadi anggota, apa aturannya, dan apa yang terjadi ketika aturan dilanggar. JoinOrigin tidak memoderasi komunitas pihak ketiga dan tidak menyediakan staf moderasi. Platform dirancang di sekitar struktur komunitas yang sehat, dan praktik dalam panduan ini adalah praktik manusia yang dibutuhkan setiap penyelenggara.',
    'Panduan ini menyusun sistem moderasi praktis — baik Origin Anda benar-benar baru maupun memiliki sejarah bertahun-tahun yang perlu dibersihkan: aturan Origin tertulis yang singkat dan spesifik, jalur penegakan yang jelas dengan peringatan sebelum penghapusan, teknik de-eskalasi situasi tegang, dan nasihat jujur tentang kapan melibatkan anggota dan kapan bertindak sendiri. Setiap langkah menunjukkan tempat JoinOrigin membantu.',
  ],
  dataPoints: [
    'Aturan Origin tertulis yang jelas mengurangi konflik dengan menetapkan ekspektasi sebelum insiden terjadi.',
    'Kendali kreator di JoinOrigin adalah kepemilikan ruang Matrix: undang/hapus, peran, pengaturan, semat, arsip.',
    'Jalur penegakan bertahap — peringatkan, lalu batasi, lalu hapus — lebih adil dan lebih mudah dipertahankan daripada larangan instan.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan, memulai, dan mengorganisir komunitas; tidak memoderasi komunitas pihak ketiga atau menyediakan staf moderasi.',
  ],
  faq: [
    {
      question: 'Apakah Origin kecil benar-benar butuh aturan moderasi?',
      answer:
        'Ya, dan semakin dini semakin baik. Dua atau tiga aturan singkat yang ditulis sebelum konflik terjadi jauh lebih mudah diterapkan daripada aturan yang diciptakan setelah konflik. Origin kecil punya lebih sedikit insiden, tetapi insiden yang terjadi sama menyakitkannya.',
    },
    {
      question: 'Haruskah moderator bertindak secara publik atau privat?',
      answer:
        'Privat dulu. Hubungi satu per satu, nyatakan kembali aturan dan dampaknya, dan beri orang itu kesempatan untuk menyesuaikan diri. Teguran publik cenderung memperbesar konflik. Simpan catatan publik tentang aturan, tetapi terapkan secara privat — dalam DM atau ruang privat.',
    },
    {
      question: 'Kapan saya harus menghapus seseorang dari Origin?',
      answer:
        'Setelah peringatan yang jelas tidak berhasil, atau segera untuk perilaku yang membahayakan anggota — pelecehan, ancaman, atau doxxing. Ukurannya adalah apakah orang itu secara aktif membuat ruang tidak aman bagi orang lain. Di JoinOrigin, penghapusan berarti pemilik ruang menghapus anggota dari ruang.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya memoderasi Origin?',
      answer:
        'Ya. JoinOrigin adalah OS komunitas tempat kendali kreator adalah kepemilikan ruang Matrix — undang/hapus, peran, pengaturan, semat, dan arsip yang diberlakukan di Element. JoinOrigin tidak memoderasi komunitas, jadi praktik dalam panduan ini — aturan yang jelas, penegakan bertahap, de-eskalasi yang tenang — adalah milik Anda untuk diterapkan.',
    },
  ],
  sections: [
    'Tulis tiga hingga lima aturan yang jelas. Jaga aturan tetap singkat, spesifik, dan positif: "Bersikap hormat", "Tetap pada topik", "Tidak ada spam atau promosi diri", "Tidak setuju dengan ide, bukan dengan orang". Unggah di tempat setiap anggota baru akan melihatnya — idealnya disematkan di ruang. Di JoinOrigin aturan dan nilai Origin terlihat di ruangnya sejak hari pertama — anggota baru melihatnya sebelum bergabung. Sematkan aturan singkat Anda di tempat setiap anggota baru akan melihatnya.',
    'Tetapkan nada sebagai pemilik ruang. Tunjukkan perilaku yang Anda inginkan — sambut pendatang baru, ucapkan terima kasih kepada kontributor, dan tangani masalah dengan tenang. Teladan kreator menetapkan dasar budaya Origin. JoinOrigin tidak mengawasi Origins — nada ditetapkan oleh kreator dan anggota. Platform membuat perilaku ramah terlihat; tunjukkan perilaku yang Anda inginkan di ruang.',
    'Kuasai ruang seperti kreator Anda. Kendali kreator di JoinOrigin adalah kepemilikan ruang Matrix: mengundang dan menghapus anggota, menetapkan peran, mengedit pengaturan ruang, menyematkan pesan, dan mengarsipkan ruang — diberlakukan secara native di Element. Mengetahui kendali ini adalah separuh teknis moderasi. JoinOrigin memberi kreator kepemilikan penuh atas ruang sejak diterbitkan, tanpa sistem izin khusus. Pelajari kendali moderasi platform yang Anda gunakan dan tunjuk satu pemilik yang jelas.',
    'Sepakati jalur penegakan. Definisikan respons bertahap: peringatan privat, lalu pembatasan (di-bisukan, postingan dibatasi — sering kali perubahan peran), lalu penghapusan untuk pelanggaran berulang atau berat. Eskalasi yang konsisten lebih adil daripada improvisasi. Di JoinOrigin peran adalah peran Matrix standar di Element — bisukan, larang, dan penetapan peran adalah tindakan native. Tuliskan jalur penegakan dan patuhi.',
    'Bertindak dini dan tenang. Tangani tanda pertama masalah secara privat, sebelum menjadi insiden publik. Intervensi dini yang tenang adalah moderasi termurah yang ada. JoinOrigin tidak memoderasi untuk Anda — intervensi dini yang tenang adalah keterampilan manusia. Platform dirancang agar masalah muncul secara terlihat di ruang, dan tertangkap sejak awal. Hubungi secara privat pada tanda pertama.',
    'Pelajari teknik de-eskalasi. Ketika ketegangan meningkat, perlambat percakapan: akui perasaannya, nyatakan kembali ketidaksepakatan secara netral, tanyakan poin yang mendasarinya, dan sarankan jeda atau ruang privat untuk hal yang panas. JoinOrigin menjaga interaksi Origin tetap terorganisir dan tenang secara desain, tetapi de-eskalasi tetap kerajinan manusia. Perlambat percakapan dan pindahkan hal yang panas ke ruang privat.',
    'Simpan catatan insiden penting. Catat apa yang terjadi, apa yang Anda lakukan, dan mengapa. Log sederhana membantu Anda tetap konsisten, belajar dari pola, dan mempertahankan keputusan ketika anggota bertanya mengapa. JoinOrigin adalah OS komunitas tempat sejarah komunitas hidup di satu tempat — rumah alami untuk log insiden. Catatan sederhana tentang apa yang terjadi dan mengapa membuat Anda tetap konsisten.',
    'Bagikan beban dengan co-moderator. Rekrut satu atau dua anggota tepercaya dan sepakati aturan penegakan. Origin yang bergantung pada satu moderator menjadi rapuh dan bias. JoinOrigin tidak menyediakan staf moderasi — co-moderator adalah sesama anggota. Kreator menetapkan peran kepada co-moderator di Element — peran Matrix native, tanpa sistem khusus. Rekrut satu atau dua anggota tepercaya dan beri mereka peran yang jelas.',
  ],
  steps: [
    {
      title: 'Tulis tiga hingga lima aturan yang jelas',
      body: 'Jaga aturan tetap singkat, spesifik, dan positif: "Bersikap hormat", "Tetap pada topik", "Tidak ada spam atau promosi diri", "Tidak setuju dengan ide, bukan dengan orang". Unggah di tempat setiap anggota baru akan melihatnya — idealnya disematkan di ruang.',
      joinOriginNote:
        'Di JoinOrigin aturan dan nilai Origin terlihat di ruangnya sejak hari pertama — anggota baru melihatnya sebelum bergabung. Sematkan aturan singkat Anda di tempat setiap anggota baru akan melihatnya.',
    },
    {
      title: 'Tetapkan nada sebagai pemilik ruang',
      body: 'Tunjukkan perilaku yang Anda inginkan — sambut pendatang baru, ucapkan terima kasih kepada kontributor, dan tangani masalah dengan tenang. Teladan kreator menetapkan dasar budaya Origin.',
      joinOriginNote:
        'JoinOrigin tidak mengawasi Origins — nada ditetapkan oleh kreator dan anggota. Platform membuat perilaku ramah terlihat; tunjukkan perilaku yang Anda inginkan di ruang.',
    },
    {
      title: 'Kuasai ruang seperti kreator Anda',
      body: 'Kendali kreator di JoinOrigin adalah kepemilikan ruang Matrix: mengundang dan menghapus anggota, menetapkan peran, mengedit pengaturan ruang, menyematkan pesan, dan mengarsipkan ruang — diberlakukan secara native di Element. Mengetahui kendali ini adalah separuh teknis moderasi.',
      joinOriginNote:
        'JoinOrigin memberi kreator kepemilikan penuh atas ruang sejak diterbitkan, tanpa sistem izin khusus. Pelajari kendali moderasi platform yang Anda gunakan dan tunjuk satu pemilik yang jelas.',
    },
    {
      title: 'Sepakati jalur penegakan',
      body: 'Definisikan respons bertahap: peringatan privat, lalu pembatasan (di-bisukan, postingan dibatasi — sering kali perubahan peran), lalu penghapusan untuk pelanggaran berulang atau berat. Eskalasi yang konsisten lebih adil daripada improvisasi.',
      joinOriginNote:
        'Di JoinOrigin peran adalah peran Matrix standar di Element — bisukan, larang, dan penetapan peran adalah tindakan native. Tuliskan jalur penegakan dan patuhi.',
    },
    {
      title: 'Bertindak dini dan tenang',
      body: 'Tangani tanda pertama masalah secara privat, sebelum menjadi insiden publik. Intervensi dini yang tenang adalah moderasi termurah yang ada.',
      joinOriginNote:
        'JoinOrigin tidak memoderasi untuk Anda — intervensi dini yang tenang adalah keterampilan manusia. Platform dirancang agar masalah muncul secara terlihat di ruang, dan tertangkap sejak awal. Hubungi secara privat pada tanda pertama.',
    },
    {
      title: 'Pelajari teknik de-eskalasi',
      body: 'Ketika ketegangan meningkat, perlambat percakapan: akui perasaannya, nyatakan kembali ketidaksepakatan secara netral, tanyakan poin yang mendasarinya, dan sarankan jeda atau ruang privat untuk hal yang panas.',
      joinOriginNote:
        'JoinOrigin menjaga interaksi Origin tetap terorganisir dan tenang secara desain, tetapi de-eskalasi tetap kerajinan manusia. Perlambat percakapan dan pindahkan hal yang panas ke ruang privat.',
    },
    {
      title: 'Simpan catatan insiden penting',
      body: 'Catat apa yang terjadi, apa yang Anda lakukan, dan mengapa. Log sederhana membantu Anda tetap konsisten, belajar dari pola, dan mempertahankan keputusan ketika anggota bertanya mengapa.',
      joinOriginNote:
        'JoinOrigin adalah OS komunitas tempat sejarah komunitas hidup di satu tempat — rumah alami untuk log insiden. Catatan sederhana tentang apa yang terjadi dan mengapa membuat Anda tetap konsisten.',
    },
    {
      title: 'Bagikan beban dengan co-moderator',
      body: 'Rekrut satu atau dua anggota tepercaya dan sepakati aturan penegakan. Origin yang bergantung pada satu moderator menjadi rapuh dan bias.',
      joinOriginNote:
        'JoinOrigin tidak menyediakan staf moderasi — co-moderator adalah sesama anggota. Kreator menetapkan peran kepada co-moderator di Element — peran Matrix native, tanpa sistem khusus. Rekrut satu atau dua anggota tepercaya dan beri mereka peran yang jelas.',
    },
  ],
};

export default content;
