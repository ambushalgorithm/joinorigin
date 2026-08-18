import type { GuideContent } from '../../types';

/**
 * "Cara Membuat Proyek" — panduan L1 yang selalu relevan (desain §6.1,
 * TASK-353), terjemahan Bahasa Indonesia (id).
 *
 * Ditulis berdasarkan alur layar produk §2 inti: kelompok yang terbentuk
 * bergerak dari percakapan ke pekerjaan bersama dengan menerbitkan proyek;
 * halaman proyek bersifat publik, ruangnya dibuat otomatis SAAT DITERBITKAN,
 * kreator mengendalikan ruang, dan kemajuan mengalir ke linimasa. Platform
 * sudah berjalan: menerbitkan proyek langsung membuka halaman dan ruangnya.
 * "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'create-a-project',
  title: 'Cara Membuat Proyek: Ubah Momentum Grup Menjadi Pekerjaan Bersama | JoinOrigin',
  description:
    'Buat proyek di JoinOrigin — baik itu ide yang benar-benar baru maupun pekerjaan yang sudah berjalan — terbitkan halaman proyek bersama, buka ruangnya secara otomatis, dan ubah percakapan grup menjadi pekerjaan yang benar-benar terwujud. Langkah praktis dari JoinOrigin.',
  intro: [
    'Grup yang hanya berbicara pada akhirnya mandek. Perbedaan antara komunitas yang terasa hidup dan yang memudar adalah pekerjaan bersama — proyek dengan nama, tujuan, dan tempat di mana kemajuan terlihat. Mengubah percakapan menjadi proyek juga merupakan masalah menghubungkan orang: Anda butuh orang yang tepat, komitmen yang tepat, dan satu tempat yang jelas untuk bekerja bersama. Hal yang sama berlaku ketika proyeknya sudah ada — tersebar di berkas, pesan, dan daftar tugas satu orang — proyek itu tetap butuh rumah yang terlihat dan orang yang tepat di sekitarnya.',
    'Alur JoinOrigin menangani perpindahan itu: kelompok yang terbentuk menerbitkan proyek, dan halaman proyek muncul secara publik dengan ruangnya dibuat otomatis pada saat diterbitkan. Anggota bergabung ke ruang proyek melalui tautan, kreator mengendalikannya sebagai pemilik ruang, dan pembaruan dari ruang mengalir ke linimasa sehingga seluruh jaringan dapat melihat pekerjaannya. Ruang proyek terbuka saat Anda menerbitkan — tanpa langkah penyiapan di antaranya.',
    'Panduan ini menelusuri dari percikan pertama hingga ritme kerja yang berjalan — baik proyeknya benar-benar baru maupun sudah berjalan: mulai dari grup yang sudah ada dan ruangnya, menentukan cakupan yang benar-benar bisa diwujudkan, menulis halaman proyek, menerbitkannya dan membuka ruang, mengundang tim kerja, menyepakati peran dan tonggak pertama, memindahkan pekerjaan nyata ke ruang, dan berbagi kemajuan untuk membangun momentum.',
  ],
  dataPoints: [
    'Proyek dengan halaman publik dan tonggak pertama yang jelas lebih mudah mendapatkan orang — orang bergabung dengan pekerjaan yang bisa mereka lihat.',
    'Di JoinOrigin, menerbitkan proyek otomatis membuat ruangnya — ruang kerja ada sejak momen yang sama dengan halamannya.',
    'Ruang proyek memberi pekerjaan satu rumah: keputusan, berkas, dan kemajuan terlihat oleh semua yang bergabung.',
    'JoinOrigin adalah OS komunitas yang membantu kelompok yang terbentuk mengubah percakapan menjadi proyek — terbitkan proyek Anda dan ruangnya langsung terbuka.',
  ],
  faq: [
    {
      question: 'Apa yang membuat grup siap memulai proyek?',
      answer:
        'Grup siap ketika beberapa anggota berbagi hasil yang konkret dan bersedia meluangkan waktu. Anda tidak butuh tim besar — tiga orang yang berkomitmen dengan satu tonggak yang jelas mengalahkan selusin anggota yang penasaran. Terbitkan proyek ketika percakapan berulang: "kita benar-benar harus melakukan ini."',
    },
    {
      question: 'Kapan ruang proyek dibuat?',
      answer:
        'Ruang dibuat otomatis saat Anda menerbitkan proyek. Kreator memiliki ruang sejak awal dan dapat mengundang tim kerja, menetapkan peran, dan menjaga pekerjaan tetap terorganisir di dalam Element. Anda juga bisa membuat bentuk yang sama dengan alat yang sudah digunakan grup Anda.',
    },
    {
      question: 'Apa bedanya proyek dengan ide?',
      answer:
        'Ide adalah proposal yang menjadi tempat orang berkumpul — ruangnya adalah tempat ketertarikan dan kecocokan diuji. Proyek adalah pekerjaan bersama yang dikomitmenkan oleh kelompok yang terbentuk, dengan halaman, ruang, dan tonggak. Terbitkan ide lebih dulu saat Anda butuh orang; terbitkan proyek saat Anda sudah memilikinya.',
    },
    {
      question: 'Apa tonggak pertama yang sebaiknya?',
      answer:
        'Kecil dan bisa diselesaikan — draf kerja, pilot, versi pertama, atau hasil jadi dalam beberapa minggu. Tonggak pertama yang pendek membangun kepercayaan dalam grup dan membuat proyek terasa nyata bagi anggota baru. Anda selalu bisa memperluas setelah kemenangan pertama.',
    },
    {
      question: 'Bisakah JoinOrigin membantu grup memulai proyek hari ini?',
      answer:
        'Ya. Menerbitkan proyek di JoinOrigin membuat halaman dan ruangnya secara atomik — ruang terbuka saat Anda menerbitkan, dan kreator mengendalikannya. Pilih tujuan grup, buat rumah proyek bersama, dan buka ruang untuk pekerjaannya; setiap anggota baru yang Anda undang memperluas jangkauan Anda.',
    },
  ],
  sections: [
    'Mulai dari grup yang sudah ada dan ruangnya. Proyek tumbuh dari grup yang sudah memiliki kepercayaan dan momentum. Perhatikan percakapan di ruang grup dan temukan kebutuhan yang berulang — hal yang terus dikatakan anggota "kita harus melakukannya". JoinOrigin menjaga komunitas tetap hidup dalam ruang yang dikendalikan kreator, dan proyek adalah lapisan berikutnya di atas ruang itu. Sebutkan kebutuhan yang berulang di grup dan uji apakah ada yang mau menindaklanjutinya.',
    'Tentukan cakupan yang benar-benar bisa diwujudkan. Tuliskan apa yang akan dihasilkan proyek, untuk siapa, dan dalam jangka waktu apa. Jaga versi pertama cukup kecil sehingga grup bisa menyelesaikannya. JoinOrigin dirancang di sekitar proyek dengan halaman publik — cakupan yang jelas membuat halaman mudah dibaca dan ruang tetap fokus. Satu kalimat yang menyatakan apa yang terwujud dan kapan sudah cukup untuk memulai.',
    'Tulis halaman proyek. Halaman harus menyatakan tujuan proyek, masalah yang dipecahkannya, siapa yang mengerjakannya, dan apa kebutuhannya. Jujurlah tentang tahapnya — draf awal tidak masalah. Menerbitkan proyek di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Terbitkan deskripsi proyek di tempat yang bisa ditunjuk oleh grup.',
    'Terbitkan proyek dan buka ruangnya. Menerbitkan adalah hal yang membuat proyek menjadi nyata: halaman publik plus ruang tempat pekerjaan hidup. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya. Di JoinOrigin halaman, ruang, dan tim kerja adalah satu penerbitan. Buat halaman dan ruang di alat yang sudah digunakan grup Anda jika Anda lebih suka.',
    'Undang tim kerja ke dalam ruang. Undang orang yang benar-benar akan mengerjakan pekerjaan — tim kecil yang berkomitmen lebih baik daripada audiens besar. Bagikan tautan bergabung dan minta setiap orang mengonfirmasi waktu mereka. Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman proyek atau mengikuti tautan undangan langsung dari anggota. Satu tautan yang jelas ke ruang proyek sudah cukup.',
    'Sepakati peran dan tonggak pertama. Sebutkan siapa memiliki apa, seberapa sering grup mengecek perkembangan, dan tonggak pertama yang dituju semua orang. Tuliskan di tempat yang bisa dilihat seluruh tim. JoinOrigin tidak menetapkan peran untuk Anda — kendali kreator berarti Anda yang memutuskan. Platform menjaga peran dan tonggak tetap terlihat di ruang proyek. Rencana tertulis singkat di ruang sudah cukup.',
    'Pindahkan pekerjaan nyata ke dalam ruang. Ganti "kita harus" dengan "ini drafnya", "ini keputusannya", dan "ini tugas berikutnya". Jaga kemajuan di satu tempat yang terlihat sehingga semua orang bisa mengikuti. JoinOrigin menjaga ruang proyek tetap menampung pekerjaan — keputusan, berkas, dan pembaruan — alih-alih menyebarkannya di pesan pribadi. Simpan artefak kerja di ruang bersama sejak minggu pertama.',
    'Bagikan kemajuan untuk membangun momentum. Unggah pembaruan saat proyek berjalan, rayakan tonggak saat tercapai, dan undang grup yang lebih luas untuk bergabung atau mengikuti. Kemajuan di linimasa mengubah proyek menjadi bukti bahwa komunitas benar-benar menghasilkan. Pembaruan ruang mengalir ke linimasa di JoinOrigin — lingkaran pertumbuhan tempat setiap anggota baru memperluas permukaan penemuan. Mulailah ditemukan dan bertumbuh.',
  ],
  steps: [
    {
      title: 'Mulai dari grup yang sudah ada dan ruangnya',
      body: 'Proyek tumbuh dari grup yang sudah memiliki kepercayaan dan momentum. Perhatikan percakapan di ruang grup dan temukan kebutuhan yang berulang — hal yang terus dikatakan anggota "kita harus melakukannya".',
      joinOriginNote:
        'JoinOrigin menjaga komunitas tetap hidup dalam ruang yang dikendalikan kreator, dan proyek adalah lapisan berikutnya di atas ruang itu. Sebutkan kebutuhan yang berulang di grup dan uji apakah ada yang mau menindaklanjutinya.',
    },
    {
      title: 'Tentukan cakupan yang benar-benar bisa diwujudkan',
      body: 'Tuliskan apa yang akan dihasilkan proyek, untuk siapa, dan dalam jangka waktu apa. Jaga versi pertama cukup kecil sehingga grup bisa menyelesaikannya.',
      joinOriginNote:
        'JoinOrigin dirancang di sekitar proyek dengan halaman publik — cakupan yang jelas membuat halaman mudah dibaca dan ruang tetap fokus. Satu kalimat yang menyatakan apa yang terwujud dan kapan sudah cukup untuk memulai.',
    },
    {
      title: 'Tulis halaman proyek',
      body: 'Halaman harus menyatakan tujuan proyek, masalah yang dipecahkannya, siapa yang mengerjakannya, dan apa kebutuhannya. Jujurlah tentang tahapnya — draf awal tidak masalah.',
      joinOriginNote:
        'Menerbitkan proyek di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Terbitkan deskripsi proyek di tempat yang bisa ditunjuk oleh grup.',
    },
    {
      title: 'Terbitkan proyek dan buka ruangnya',
      body: 'Menerbitkan adalah hal yang membuat proyek menjadi nyata: halaman publik plus ruang tempat pekerjaan hidup. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya.',
      joinOriginNote:
        'Di JoinOrigin halaman, ruang, dan tim kerja adalah satu penerbitan. Buat halaman dan ruang di alat yang sudah digunakan grup Anda jika Anda lebih suka.',
    },
    {
      title: 'Undang tim kerja ke dalam ruang',
      body: 'Undang orang yang benar-benar akan mengerjakan pekerjaan — tim kecil yang berkomitmen lebih baik daripada audiens besar. Bagikan tautan bergabung dan minta setiap orang mengonfirmasi waktu mereka.',
      joinOriginNote:
        'Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman proyek atau mengikuti tautan undangan langsung dari anggota. Satu tautan yang jelas ke ruang proyek sudah cukup.',
    },
    {
      title: 'Sepakati peran dan tonggak pertama',
      body: 'Sebutkan siapa memiliki apa, seberapa sering grup mengecek perkembangan, dan tonggak pertama yang dituju semua orang. Tuliskan di tempat yang bisa dilihat seluruh tim.',
      joinOriginNote:
        'JoinOrigin tidak menetapkan peran untuk Anda — kendali kreator berarti Anda yang memutuskan. Platform menjaga peran dan tonggak tetap terlihat di ruang proyek. Rencana tertulis singkat di ruang sudah cukup.',
    },
    {
      title: 'Pindahkan pekerjaan nyata ke dalam ruang',
      body: 'Ganti "kita harus" dengan "ini drafnya", "ini keputusannya", dan "ini tugas berikutnya". Jaga kemajuan di satu tempat yang terlihat sehingga semua orang bisa mengikuti.',
      joinOriginNote:
        'JoinOrigin menjaga ruang proyek tetap menampung pekerjaan — keputusan, berkas, dan pembaruan — alih-alih menyebarkannya di pesan pribadi. Simpan artefak kerja di ruang bersama sejak minggu pertama.',
    },
    {
      title: 'Bagikan kemajuan untuk membangun momentum',
      body: 'Unggah pembaruan saat proyek berjalan, rayakan tonggak saat tercapai, dan undang grup yang lebih luas untuk bergabung atau mengikuti. Kemajuan di linimasa mengubah proyek menjadi bukti bahwa komunitas benar-benar menghasilkan.',
      joinOriginNote:
        'Pembaruan ruang mengalir ke linimasa di JoinOrigin — lingkaran pertumbuhan tempat setiap anggota baru memperluas permukaan penemuan. Mulailah ditemukan dan bertumbuh.',
    },
  ],
};

export default content;
