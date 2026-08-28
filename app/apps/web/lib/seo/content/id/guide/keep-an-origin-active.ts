import type { GuideContent } from '../../types';

/**
 * "Cara Menjaga Origin Tetap Aktif" — panduan L1 yang selalu relevan
 * (desain §6.1, TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang pada model digital terhubung→bergabung→ruang: ruang dan
 * aktivitasnya (yang mengalir ke linimasa) adalah permukaan retensi —
 * Origin hidup di ruang di antara pertemuan, dan acara tatap muka
 * adalah konsekuensi hilir. Nilai JoinOrigin dijalin ke dalam intro dan
 * setiap langkah (joinOriginNote per langkah), dengan kerangka yang jujur
 * — JoinOrigin tidak mengelola Origins atau menyelenggarakan acara.
 * "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'keep-an-origin-active',
  title: 'Cara Menjaga Origin Tetap Aktif & Terlibat | JoinOrigin',
  description:
    'Jaga Origin Anda tetap aktif — baik yang baru dan sedang mencari ritme maupun yang mapan dan mulai melenceng — gunakan ruang dan linimasanya sebagai permukaan retensi, bangun ritual, bagikan beban penyelenggara, dan ciptakan jalur kontribusi kecil. Langkah praktis dari JoinOrigin.',
  intro: [
    'Kebanyakan Origin tidak mati karena peluncuran yang buruk; mereka mati karena keheningan — momen ketika orang berhenti merasa terhubung dan diam-diam menjauh. Menjaga Origin tetap aktif karena itu adalah masalah menghubungkan orang: orang bertahan ketika mereka merasa menjadi bagian, dan mereka merasa menjadi bagian ketika ada tempat yang terlihat dan terorganisir tempat Origin hidup. Itulah persisnya JoinOrigin — dan mekanisme yang sama berlaku baik Origin berusia beberapa minggu dan masih mencari ritmenya maupun berusia bertahun-tahun dan mulai hanyut dalam keheningan.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan, memulai, dan mengorganisir komunitas — dan dalam model digitalnya ruang adalah permukaan retensi: ruang Matrix yang dikendalikan kreator tempat ritual, pembaruan, dan kontribusi tetap terlihat, dan aktivitasnya mengalir ke linimasa yang menjaga anggota tetap terhubung di antara pertemuan. Acara tatap muka tetap merupakan konsekuensi hilir dari komunitas yang terbentuk, bukan inti — ruang dan linimasanya yang menjaga komunitas tetap hidup dari hari ke hari. JoinOrigin tidak mengelola komunitas atau menyelenggarakan acara — platform menjaga komunitas tetap terhubung di antara pertemuan, dan pengorganisasiannya adalah milik Anda.',
    'Panduan ini mencakup mekanika praktis Origin yang sehat dan aktif — dari minggu-minggu pertama setelah peluncuran hingga Origin yang telah berjalan bertahun-tahun: membangun ritual yang menjadikan partisipasi kebiasaan, membuat artefak bersama di ruang, mendistribusikan beban penyelenggara agar tidak ada satu orang pun yang kelelahan, membuka jalur kontribusi kecil sehingga setiap anggota dapat menambah nilai, dan mengukur sinyal yang memberi tahu Anda apakah Origin benar-benar hidup. Setiap langkah bersesuaian dengan cara JoinOrigin membantu.',
  ],
  dataPoints: [
    'Ritual yang berulang — ritme ruang yang tetap, format rutin, artefak bersama — mengubah ketertarikan menjadi kebiasaan.',
    'Aktivitas ruang di antara pertemuan adalah yang membuat anggota merasa terhubung; keheningan adalah yang membuat mereka pergi.',
    'Jalur kontribusi kecil (catatan tersemat, host bergilir, sorotan anggota) membuat anggota merasa memiliki.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan, memulai, dan mengorganisir komunitas; tidak mengelola komunitas atau menyelenggarakan acara.',
  ],
  faq: [
    {
      question: 'Seberapa sering Origin aktif sebaiknya berkumpul?',
      answer:
        'Bulanan adalah dasar paling berkelanjutan untuk pertemuan tatap muka; ruang sebaiknya aktif mingguan — check-in, pembaruan, dan percakapan kecil. Konsistensi lebih penting daripada frekuensi: ritme ruang mingguan yang andal mengalahkan yang sporadis.',
    },
    {
      question: 'Apa yang saya lakukan ketika keterlibatan menurun?',
      answer:
        'Jangan panik atau meluncurkan kampanye besar. Tanyakan langsung kepada anggota apa yang mereka butuhkan, unggah satu pertanyaan sederhana di ruang, jalankan satu pertemuan yang lebih kecil dan lebih sederhana, dan delegasikan satu peran kepada anggota. Perubahan kecil yang responsif menghidupkan keterlibatan lebih cepat daripada volume.',
    },
    {
      question: 'Bagaimana menjaga anggota tetap terlibat di antara pertemuan?',
      answer:
        'Ciptakan titik sentuh berbiaya rendah di ruang: dokumen bersama, sorotan anggota, utas check-in rutin, atau pembaruan "siapa mengerjakan apa". Tujuannya adalah denyut yang terlihat di ruang dan linimasanya, bukan notifikasi terus-menerus.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menjaga Origin tetap aktif?',
      answer:
        'Ya. JoinOrigin membantu orang menemukan, memulai, dan mengorganisir Origins — satu ruang dan linimasa tempat Origin tetap terlihat di antara pertemuan. Praktik dalam panduan ini — ritual, peran bersama, dan kontribusi kecil — berfungsi di platform dan dengan alat yang sudah Anda miliki.',
    },
  ],
  sections: [
    'Definisikan ritual inti. Pilih satu praktik berulang yang bisa diandalkan semua orang: pertemuan bulanan, check-in mingguan, bacaan bersama, atau pembaruan proyek. Ritual menciptakan denyut yang menjaga Origin tetap hidup — dan dalam Origin yang mengutamakan digital, ritual terjadi di ruang. Di JoinOrigin ritme Origin terlihat dalam satu ruang terorganisir — anggota selalu tahu ritual berikutnya. Pilih satu praktik berulang dan lindungi.',
    'Buat artefak bersama di ruang. Mulai catatan tersemat atau dokumen yang menangkap apa yang sedang dilakukan Origin — catatan rapat, perkenalan anggota, pembaruan proyek. Artefak yang hidup membuat anggota tetap terorientasi di antara pertemuan. JoinOrigin adalah ruang bersama tempat catatan, perkenalan, dan pembaruan hidup berdampingan dengan Origin — artefak hidup secara desain. Sematkan dokumen bersama yang sederhana di ruang.',
    'Distribusikan beban penyelenggara. Rekrut dua atau tiga co-host atau pembantu dan rotasikan peran kecil: menyambut, mencatat, memilih topik, kontak venue. Kepemilikan bersama adalah pertahanan terbaik melawan kelelahan. JoinOrigin tidak menyediakan staf atau mengelola Origins — kepemilikan bersama adalah milik Anda untuk dibangun. Platform memberi pembantu dan penyelenggara satu ruang untuk berkoordinasi. Rekrut dua atau tiga co-host dan rotasikan peran.',
    'Buka jalur kontribusi kecil. Beri anggota cara menambah nilai tanpa komitmen besar: sorotan anggota, pemimpin diskusi bergilir, daftar putar atau daftar bacaan bersama, atau bagian "butuh bantuan" yang disematkan di ruang. Di JoinOrigin anggota punya cara kontribusi yang terlihat — Origin tempat menambah nilai itu mudah. Sorotan anggota dan pemimpin bergilir menciptakan kepemilikan yang sama.',
    'Jaga ritme komunikasi yang dapat diprediksi di ruang. Kirim satu pembaruan singkat per minggu atau per bulan dengan jadwal tetap, diunggah di ruang dan mengalir ke linimasa. Prediktabilitas membangun kepercayaan; keheningan membangun keterasingan. JoinOrigin menjaga denyut Origin dalam satu ruang — satu pembaruan, dengan jadwal, di mana semua orang bisa melihatnya. Satu pembaruan mingguan singkat membangun kepercayaan.',
    'Perhatikan sinyal keterlibatan. Lacak aktivitas ruang, kehadiran berulang, dan tingkat kontribusi. Origin yang sehat menumbuhkan tingkat pengulangannya sebelum ukuran totalnya — fokus pada anggota yang kembali ke ruang. Di JoinOrigin penyelenggara bisa melihat bagaimana Origin mereka berjalan dalam satu ruang dan linimasa yang terorganisir. Lacak aktivitas, kehadiran berulang, dan tingkat kontribusi dengan lembar sederhana.',
    'Minta umpan balik secara rutin di ruang. Gunakan survei satu pertanyaan sederhana setelah setiap pertemuan: apa yang Anda suka, apa yang akan Anda ubah. Tindak lanjuti jawabannya dan beri tahu Origin apa yang Anda ubah. JoinOrigin mengumpulkan dan menyimpan umpan balik bersama Origin yang memilikinya — di ruang. Survei satu pertanyaan setelah setiap pertemuan berhasil — lalu tindak lanjuti jawabannya.',
    'Sesuaikan format seiring Origin menjadi dewasa. Apa yang berhasil untuk sepuluh anggota mungkin tidak cocok untuk lima puluh. Tinjau kembali format, venue, dan frekuensi setiap kuartal, dan kembangkan secara sengaja alih-alih bertahan karena kebiasaan. JoinOrigin membantu Origins berkembang — satu ruang tempat perubahan format dan pengumuman menjangkau semua orang. Tinjau kembali format dan venue Anda setiap kuartal dengan sengaja.',
  ],
  steps: [
    {
      title: 'Definisikan ritual inti',
      body: 'Pilih satu praktik berulang yang bisa diandalkan semua orang: pertemuan bulanan, check-in mingguan, bacaan bersama, atau pembaruan proyek. Ritual menciptakan denyut yang menjaga Origin tetap hidup — dan dalam Origin yang mengutamakan digital, ritual terjadi di ruang.',
      joinOriginNote:
        'Di JoinOrigin ritme Origin terlihat dalam satu ruang terorganisir — anggota selalu tahu ritual berikutnya. Pilih satu praktik berulang dan lindungi.',
    },
    {
      title: 'Buat artefak bersama di ruang',
      body: 'Mulai catatan tersemat atau dokumen yang menangkap apa yang sedang dilakukan Origin — catatan rapat, perkenalan anggota, pembaruan proyek. Artefak yang hidup membuat anggota tetap terorientasi di antara pertemuan.',
      joinOriginNote:
        'JoinOrigin adalah ruang bersama tempat catatan, perkenalan, dan pembaruan hidup berdampingan dengan Origin — artefak hidup secara desain. Sematkan dokumen bersama yang sederhana di ruang.',
    },
    {
      title: 'Distribusikan beban penyelenggara',
      body: 'Rekrut dua atau tiga co-host atau pembantu dan rotasikan peran kecil: menyambut, mencatat, memilih topik, kontak venue. Kepemilikan bersama adalah pertahanan terbaik melawan kelelahan.',
      joinOriginNote:
        'JoinOrigin tidak menyediakan staf atau mengelola Origins — kepemilikan bersama adalah milik Anda untuk dibangun. Platform memberi pembantu dan penyelenggara satu ruang untuk berkoordinasi. Rekrut dua atau tiga co-host dan rotasikan peran.',
    },
    {
      title: 'Buka jalur kontribusi kecil',
      body: 'Beri anggota cara menambah nilai tanpa komitmen besar: sorotan anggota, pemimpin diskusi bergilir, daftar putar atau daftar bacaan bersama, atau bagian "butuh bantuan" yang disematkan di ruang.',
      joinOriginNote:
        'Di JoinOrigin anggota punya cara kontribusi yang terlihat — Origin tempat menambah nilai itu mudah. Sorotan anggota dan pemimpin bergilir menciptakan kepemilikan yang sama.',
    },
    {
      title: 'Jaga ritme komunikasi yang dapat diprediksi di ruang',
      body: 'Kirim satu pembaruan singkat per minggu atau per bulan dengan jadwal tetap, diunggah di ruang dan mengalir ke linimasa. Prediktabilitas membangun kepercayaan; keheningan membangun keterasingan.',
      joinOriginNote:
        'JoinOrigin menjaga denyut Origin dalam satu ruang — satu pembaruan, dengan jadwal, di mana semua orang bisa melihatnya. Satu pembaruan mingguan singkat membangun kepercayaan.',
    },
    {
      title: 'Perhatikan sinyal keterlibatan',
      body: 'Lacak aktivitas ruang, kehadiran berulang, dan tingkat kontribusi. Origin yang sehat menumbuhkan tingkat pengulangannya sebelum ukuran totalnya — fokus pada anggota yang kembali ke ruang.',
      joinOriginNote:
        'Di JoinOrigin penyelenggara bisa melihat bagaimana Origin mereka berjalan dalam satu ruang dan linimasa yang terorganisir. Lacak aktivitas, kehadiran berulang, dan tingkat kontribusi dengan lembar sederhana.',
    },
    {
      title: 'Minta umpan balik secara rutin di ruang',
      body: 'Gunakan survei satu pertanyaan sederhana setelah setiap pertemuan: apa yang Anda suka, apa yang akan Anda ubah. Tindak lanjuti jawabannya dan beri tahu Origin apa yang Anda ubah.',
      joinOriginNote:
        'JoinOrigin mengumpulkan dan menyimpan umpan balik bersama Origin yang memilikinya — di ruang. Survei satu pertanyaan setelah setiap pertemuan berhasil — lalu tindak lanjuti jawabannya.',
    },
    {
      title: 'Sesuaikan format seiring Origin menjadi dewasa',
      body: 'Apa yang berhasil untuk sepuluh anggota mungkin tidak cocok untuk lima puluh. Tinjau kembali format, venue, dan frekuensi setiap kuartal, dan kembangkan secara sengaja alih-alih bertahan karena kebiasaan.',
      joinOriginNote:
        'JoinOrigin membantu Origins berkembang — satu ruang tempat perubahan format dan pengumuman menjangkau semua orang. Tinjau kembali format dan venue Anda setiap kuartal dengan sengaja.',
    },
  ],
};

export default content;
