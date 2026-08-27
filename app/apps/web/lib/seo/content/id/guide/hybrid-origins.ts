import type { GuideContent } from '../../types';

/**
 * "Komunitas Hibrida" — panduan L1 yang selalu relevan (desain §6.1,
 * TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang pada model digital terhubung→bergabung→ruang: ruang
 * adalah yang menghubungkan bagian daring dan (turunannya) tatap muka dari
 * komunitas hibrida — satu komunitas, satu ruang, dua titik masuk. Nilai
 * JoinOrigin dijalin ke dalam intro dan setiap langkah (joinOriginNote per
 * langkah), dengan kerangka yang jujur — JoinOrigin tidak menyediakan alat
 * acara atau menyelenggarakan acara hibrida. "Ruang" merujuk pada ruang
 * Matrix (§6.3) — tempat fisik digambarkan sebagai venue/ruang, bukan
 * "rooms".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'hybrid-origins',
  title: 'Komunitas Hibrida: Cara Menjalankan Tatap Muka + Daring Bersama | JoinOrigin',
  description:
    'Jalankan komunitas hibrida tempat ruang menghubungkan anggota tatap muka dan daring — baik Anda memulai dari nol maupun menjadikan komunitas yang ada sebagai hibrida, pilih alat yang tepat, rancang partisipasi yang setara, dan jaga kedua audiens tetap terlibat. Dari JoinOrigin.',
  intro: [
    'Komunitas hibrida menyatukan orang di dua tempat sekaligus — secara fisik di venue dan secara virtual melalui layar — dan tantangan sesungguhnya lagi-lagi tentang orang: memastikan kedua audiens merasa menjadi bagian dari satu komunitas yang terhubung, bukan dua komunitas terpisah. JoinOrigin dibangun dengan tepat untuk tujuan menghubungkan orang itu, dan modelnya berlaku sama baik untuk komunitas yang sudah ada maupun yang baru dimulai — grup tatap muka yang mapan dapat menambahkan separuh daring, dan komunitas daring dapat mulai berkumpul secara lokal.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan, bergabung dengan, dan memulai komunitas — sehingga grup hibrida punya satu ruang yang menghubungkan bagian daring dan (turunannya) tatap muka: anggota lokal dan jarak jauh melihat komunitas yang sama, ritme yang sama, dan langkah berikutnya yang sama. Dalam model digital terhubung→bergabung→ruang, ruang adalah permukaan persisten tempat kedua separuh komunitas hidup di antara pertemuan; acara tatap muka adalah konsekuensi hilir yang disatukan ruang sebelum dan sesudahnya. JoinOrigin tidak menyediakan alat acara atau menyelenggarakan acara hibrida — platform memberi komunitas mana pun — termasuk hibrida — satu ruang tempat anggotanya tetap terhubung.',
    'Panduan ini mencakup keputusan praktis yang membuat komunitas hibrida berhasil — untuk grup baru dan yang sudah ada: memutuskan apakah hibrida adalah model yang tepat, membangun ruang yang dibagikan kedua audiens, memilih format dan alat yang sesuai, merancang pertemuan sehingga anggota tatap muka dan daring berbagi pengalaman yang sama, mengelola ruang agar tidak ada pihak yang mendominasi, dan menjaga ruang persisten yang menyatukan komunitas di antara pertemuan. Setiap langkah menunjukkan tempat JoinOrigin membantu.',
  ],
  dataPoints: [
    'Komunitas hibrida adalah satu komunitas dengan dua titik masuk, bukan dua audiens yang dilayani secara terpisah.',
    'Ruang adalah jaringan penghubung: satu tempat bersama tempat kedua audiens melihat pembaruan, catatan, dan langkah berikutnya yang sama.',
    'Alat yang sederhana dan andal — satu tautan video, satu dokumen bersama — mengurangi gesekan yang membunuh pertemuan hibrida.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan atau memulai komunitas; tidak menyediakan alat acara atau menyelenggarakan acara hibrida.',
  ],
  faq: [
    {
      question: 'Kapan komunitas sebaiknya menjadi hibrida?',
      answer:
        'Ketika sebagian audiens Anda secara andal tidak bisa hadir tatap muka — karena jarak, jadwal, atau mobilitas — dan komunitas tetap ingin memiliki satu identitas bersama. Jika semua orang bisa bertemu secara lokal, bertemu tatap muka lebih sederhana dan sering kali lebih baik.',
    },
    {
      question: 'Apa pengaturan alat minimum untuk pertemuan hibrida?',
      answer:
        'Satu tautan panggilan video untuk anggota jarak jauh, satu dokumen bersama untuk catatan, dan satu ruang tempat kedua audiens tetap terhubung di antara pertemuan. Lebih banyak alat berarti lebih banyak titik kegagalan; mulai minimal dan tambahkan hanya yang diminta komunitas.',
    },
    {
      question: 'Bagaimana mencegah anggota jarak jauh merasa seperti penonton?',
      answer:
        'Rancang untuk partisipasi yang setara: lakukan ronde perkenalan hibrida, panggil anggota jarak jauh secara eksplisit, bagikan layar untuk visual apa pun, dan gunakan dokumen bersama tempat kedua pihak bisa menulis. Tugaskan satu orang untuk terus memantau sisi jarak jauh.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menjalankan komunitas hibrida?',
      answer:
        'Ya. JoinOrigin membantu orang menemukan dan memulai komunitas — satu ruang tempat anggota lokal dan jarak jauh tetap terhubung. JoinOrigin tidak menyediakan alat acara, jadi praktik hibrida praktis dalam panduan ini bekerja dengan alat yang sudah Anda miliki.',
    },
  ],
  sections: [
    'Putuskan apakah hibrida adalah model yang tepat. Pilih hibrida ketika masuk akal untuk bertemu tatap muka. Jika sebagian besar anggota bisa bertemu secara lokal, bertemu tatap muka membuat ikatan lebih kuat — hibrida memungkinkan kepercayaan terbentuk lebih cepat dan membaca orang lebih mendalam. JoinOrigin dirancang untuk membantu komunitas mana pun menemukan dan mempertahankan anggota, tetapi keputusan format adalah milik Anda. Pilih hibrida hanya ketika masuk akal untuk bertemu tatap muka.',
    'Bangun ruang yang menghubungkan kedua audiens. Sebelum yang lainnya, pastikan komunitas punya ruang bersama tempat anggota jarak jauh dan lokal berbicara, berbagi pembaruan, dan melihat langkah berikutnya yang sama. Ruang itulah yang membuat hibrida terasa seperti satu komunitas, bukan dua. Di JoinOrigin setiap grup punya ruang sejak diterbitkan — permukaan persisten yang menyatukan bagian daring dan tatap muka. Siapkan satu ruang bersama yang bisa diikuti kedua audiens.',
    'Pilih satu alat video yang andal dan satu dokumen bersama. Jaga tumpukan tetap minimal: tautan panggilan video untuk anggota jarak jauh, dokumen untuk catatan dan tautan bersama, dan satu entri kalender. Kompleksitas adalah musuh pertemuan hibrida yang konsisten. JoinOrigin tidak menyediakan alat acara — jaga tumpukan tetap minimal. Platform adalah ruang persisten tempat tautan dan dokumen hidup, bukan alat acara itu sendiri.',
    'Rancang agenda untuk dua audiens. Jalankan ronde perkenalan yang menyertakan anggota jarak jauh dengan nama, jaga visual di layar bersama, dan beri ruang bagi pihak daring untuk berbicara. Agenda hibrida menyebut kedua audiens secara eksplisit. Di JoinOrigin kedua audiens berbagi satu ruang komunitas, yang membuat "merancang untuk dua audiens" menjadi cocok secara alami. Sebut kedua audiens secara eksplisit dalam agenda.',
    'Tugaskan orang penghubung. Satu orang memantau sisi jarak jauh: menyapa yang terlambat, memanggil tangan daring, dan meneruskan apa yang terlewat di venue. Tanpa penghubung, audiens daring menjadi penonton. JoinOrigin tidak menyediakan staf acara — orang penghubung adalah peran manusia. Platform menjaga komunitas tetap terorganisir dalam satu ruang sehingga penghubung punya satu tempat untuk melihat siapa yang bergabung dan apa yang dibagikan.',
    'Kelola ruang agar kedua pihak berpartisipasi. Minta anggota tatap muka berbicara satu per satu dan mengulangi pertanyaan untuk mikrofon, tempatkan orang dekat kamera, dan selang-selikan giliran antara venue dan panggilan — dengan ruang bersama tetap terbuka untuk keduanya. JoinOrigin dirancang di sekitar koneksi yang setara antar anggota — prinsip yang sama yang membuat diskusi hibrida berhasil. Selang-selikan giliran antara venue dan panggilan serta ulangi pertanyaan untuk mikrofon.',
    'Jaga ruang tetap hidup di antara pertemuan. Komunitas hidup di ruang antara acara: anggota jarak jauh dan lokal berbagi pembaruan, bertanya, dan merencanakan bersama di sana. Hibrida bukan satu format acara — ini ruang bersama yang berkelanjutan. Ini adalah langkah yang paling dekat dengan maksud desain JoinOrigin: OS komunitas adalah ruang persisten tempat anggota jarak jauh dan lokal berbagi pembaruan dan merencanakan bersama. Ruang bersama berhasil — JoinOrigin adalah ruang itu.',
    'Tangkap dan bagikan hasil di ruang. Unggah catatan, rekaman, dan langkah berikutnya di ruang bersama setelah setiap pertemuan. Artefak yang terlihat menjaga kedua audiens tetap terhubung dan membuat komunitas terasa produktif. Di JoinOrigin hasil komunitas hidup dalam satu ruang terorganisir — catatan, rekaman, langkah berikutnya. Unggah semuanya di ruang bersama setelah setiap pertemuan.',
  ],
  steps: [
    {
      title: 'Putuskan apakah hibrida adalah model yang tepat',
      body: 'Pilih hibrida ketika masuk akal untuk bertemu tatap muka. Jika sebagian besar anggota bisa bertemu secara lokal, bertemu tatap muka membuat ikatan lebih kuat — hibrida memungkinkan kepercayaan terbentuk lebih cepat dan membaca orang lebih mendalam.',
      joinOriginNote:
        'JoinOrigin dirancang untuk membantu komunitas mana pun menemukan dan mempertahankan anggota, tetapi keputusan format adalah milik Anda. Pilih hibrida hanya ketika masuk akal untuk bertemu tatap muka.',
    },
    {
      title: 'Bangun ruang yang menghubungkan kedua audiens',
      body: 'Sebelum yang lainnya, pastikan komunitas punya ruang bersama tempat anggota jarak jauh dan lokal berbicara, berbagi pembaruan, dan melihat langkah berikutnya yang sama. Ruang itulah yang membuat hibrida terasa seperti satu komunitas, bukan dua.',
      joinOriginNote:
        'Di JoinOrigin setiap grup punya ruang sejak diterbitkan — permukaan persisten yang menyatukan bagian daring dan tatap muka. Siapkan satu ruang bersama yang bisa diikuti kedua audiens.',
    },
    {
      title: 'Pilih satu alat video yang andal dan satu dokumen bersama',
      body: 'Jaga tumpukan tetap minimal: tautan panggilan video untuk anggota jarak jauh, dokumen untuk catatan dan tautan bersama, dan satu entri kalender. Kompleksitas adalah musuh pertemuan hibrida yang konsisten.',
      joinOriginNote:
        'JoinOrigin tidak menyediakan alat acara — jaga tumpukan tetap minimal. Platform adalah ruang persisten tempat tautan dan dokumen hidup, bukan alat acara itu sendiri.',
    },
    {
      title: 'Rancang agenda untuk dua audiens',
      body: 'Jalankan ronde perkenalan yang menyertakan anggota jarak jauh dengan nama, jaga visual di layar bersama, dan beri ruang bagi pihak daring untuk berbicara. Agenda hibrida menyebut kedua audiens secara eksplisit.',
      joinOriginNote:
        'Di JoinOrigin kedua audiens berbagi satu ruang komunitas, yang membuat "merancang untuk dua audiens" menjadi cocok secara alami. Sebut kedua audiens secara eksplisit dalam agenda.',
    },
    {
      title: 'Tugaskan orang penghubung',
      body: 'Satu orang memantau sisi jarak jauh: menyapa yang terlambat, memanggil tangan daring, dan meneruskan apa yang terlewat di venue. Tanpa penghubung, audiens daring menjadi penonton.',
      joinOriginNote:
        'JoinOrigin tidak menyediakan staf acara — orang penghubung adalah peran manusia. Platform menjaga komunitas tetap terorganisir dalam satu ruang sehingga penghubung punya satu tempat untuk melihat siapa yang bergabung dan apa yang dibagikan.',
    },
    {
      title: 'Kelola ruang agar kedua pihak berpartisipasi',
      body: 'Minta anggota tatap muka berbicara satu per satu dan mengulangi pertanyaan untuk mikrofon, tempatkan orang dekat kamera, dan selang-selikan giliran antara venue dan panggilan — dengan ruang bersama tetap terbuka untuk keduanya.',
      joinOriginNote:
        'JoinOrigin dirancang di sekitar koneksi yang setara antar anggota — prinsip yang sama yang membuat diskusi hibrida berhasil. Selang-selikan giliran antara venue dan panggilan serta ulangi pertanyaan untuk mikrofon.',
    },
    {
      title: 'Jaga ruang tetap hidup di antara pertemuan',
      body: 'Komunitas hidup di ruang antara acara: anggota jarak jauh dan lokal berbagi pembaruan, bertanya, dan merencanakan bersama di sana. Hibrida bukan satu format acara — ini ruang bersama yang berkelanjutan.',
      joinOriginNote:
        'Ini adalah langkah yang paling dekat dengan maksud desain JoinOrigin: OS komunitas adalah ruang persisten tempat anggota jarak jauh dan lokal berbagi pembaruan dan merencanakan bersama. Ruang bersama berhasil — JoinOrigin adalah ruang itu.',
    },
    {
      title: 'Tangkap dan bagikan hasil di ruang',
      body: 'Unggah catatan, rekaman, dan langkah berikutnya di ruang bersama setelah setiap pertemuan. Artefak yang terlihat menjaga kedua audiens tetap terhubung dan membuat komunitas terasa produktif.',
      joinOriginNote:
        'Di JoinOrigin hasil komunitas hidup dalam satu ruang terorganisir — catatan, rekaman, langkah berikutnya. Unggah semuanya di ruang bersama setelah setiap pertemuan.',
    },
  ],
};

export default content;
