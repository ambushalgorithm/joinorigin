import type { GuideContent } from '../../types';

/**
 * "Cara Menerbitkan Ide Bisnis Kecil" — panduan L1 yang selalu relevan
 * (desain §6.1, TASK-353), terjemahan Bahasa Indonesia (id).
 *
 * Ditulis berdasarkan alur layar produk §2 inti: terbitkan ide bisnis
 * kecil → halaman publik ide → Bergabung via tautan → ruang dibuat
 * otomatis SAAT DITERBITKAN → kreator mengendalikan ruang → pertumbuhan
 * lewat linimasa/undangan. Halaman ide adalah janji etalase; ruang adalah
 * tempat pelanggan, kolaborator, dan pendukung awal berkumpul di sekitar
 * bisnis. Platform sudah berjalan: menerbitkan ide langsung membuat
 * halaman dan ruangnya. "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'publish-a-small-business-idea',
  title: 'Cara Menerbitkan Ide Bisnis Kecil: Halaman Ide + Ruang | JoinOrigin',
  description:
    'Terbitkan ide bisnis kecil di JoinOrigin — baik Anda meluncurkan usaha baru maupun bisnis yang sudah ada membagikan apa yang ditawarkannya — tulis halaman ide publik, buka ruangnya secara otomatis, dan undang pelanggan serta kolaborator yang ingin melihatnya terwujud. Langkah praktis dari JoinOrigin.',
  intro: [
    'Bisnis kecil sering dimulai dengan cara yang sama — seseorang melihat masalah nyata di lingkungan, tempat kerja, atau hobinya, dan tidak bisa berhenti memikirkan solusinya — tetapi banyak juga yang sudah beroperasi: toko yang berjalan, layanan yang bekerja, produk yang punya pelanggan. Baik bisnis Anda masih berupa percikan maupun sudah melayani orang, langkah berikutnya sama: ubah apa yang Anda miliki menjadi sesuatu yang bisa dilihat, ditanggapi, dan diikuti orang lain. Bisnis kecil butuh rumah publik, dan butuh orang di sekitarnya — sebelum butuh etalase, dan lama setelah etalase itu ada.',
    'Alur JoinOrigin bekerja seperti ini: Anda menerbitkan ide bisnis kecil, halaman ide publiknya muncul, dan ruangnya dibuat otomatis pada saat diterbitkan. Orang menemukan halaman atau mengikuti tautan, bergabung cukup dengan satu klik, dan mereka masuk ke ruang — ruang Matrix yang dikendalikan kreator tempat pelanggan, kolaborator, dan pendukung awal dapat bertanya, berbagi umpan balik, dan terlibat. Kreator memiliki ruang sejak detik nol dan memutuskan siapa yang bergabung dan apa yang terjadi di dalamnya.',
    'Panduan ini menelusuri penerbitan ide bisnis kecil seperti Anda membuka toko: menyebut nama pelanggan dan masalahnya, menulis halaman ide seperti etalase, menerbitkannya dan membuka ruang, membagikan halaman ke jaringan lokal Anda, mengundang pelanggan dan kolaborator awal, mendengarkan di ruang, menyempurnakan penawaran dari umpan balik nyata, dan menumbuhkan ruang menjadi basis pelanggan pertama Anda.',
  ],
  dataPoints: [
    'Ide bisnis kecil yang paling jelas dimulai dari satu pelanggan bernama dan satu masalah spesifik, bukan audiens umum.',
    'Di JoinOrigin, menerbitkan ide otomatis membuat ruangnya — bisnis punya tempat untuk pelanggan dan kolaborator sejak awal.',
    'Tautan bergabung adalah undangan paling sederhana: satu tautan, satu klik, dan orang yang tertarik sudah berada di ruang.',
    'JoinOrigin adalah OS komunitas yang membantu orang menemukan ide dan orang di baliknya — terbitkan ide Anda dan ruangnya langsung terbuka.',
  ],
  faq: [
    {
      question: 'Apa bedanya ide bisnis kecil dengan halaman ide biasa?',
      answer:
        'Format halamannya sama, tetapi janjinya lebih tajam: pelanggan, masalah, dan penawaran. Jika ide umum mengundang kolaborator, halaman ide bisnis kecil mengundang pelanggan awal dan pendukung lokal — orang yang benar-benar akan membeli, merujuk, atau membantu Anda memulai atau menumbuhkan apa yang sudah berjalan.',
    },
    {
      question: 'Kapan ruang untuk ide bisnis saya dibuat?',
      answer:
        'Ruang dibuat otomatis saat Anda menerbitkan ide. Kreator memiliki ruang sejak detik nol dan dapat mengundang, menghapus, serta menetapkan peran di dalam Element. Anda juga bisa membuka ruang dengan alat yang sudah Anda gunakan dan mengundang orang yang peduli dengan masalahnya.',
    },
    {
      question: 'Siapa yang sebaiknya bergabung dengan ruang ide bisnis kecil?',
      answer:
        'Pelanggan awal, orang dengan keterampilan yang Anda butuhkan, dan penduduk lokal yang bisa merujuk Anda. Ruang adalah tempat Anda menguji permintaan, menyempurnakan penawaran, dan menemukan pendukung pertama — sebelum mengeluarkan uang untuk stok, sewa, atau pemasaran.',
    },
    {
      question: 'Apa yang sebaiknya dijanjikan halaman ide?',
      answer:
        'Satu pelanggan bernama, satu masalah, dan apa yang Anda rencanakan untuk ditawarkan. Jujurlah tentang tahapnya — "saya sedang menguji ide ini dan ingin berbicara dengan orang yang merasakan masalah ini" adalah janji yang kuat. Halaman menentukan apakah orang yang tepat mengklik Bergabung.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menerbitkan ide bisnis kecil hari ini?',
      answer:
        'Ya. Menerbitkan ide di JoinOrigin membuat halaman dan ruangnya secara atomik — ruang terbuka saat Anda menerbitkan, dan Anda mengendalikannya sejak awal. Terbitkan ide di suatu tempat yang publik dan buka ruang diskusinya; setiap anggota baru yang Anda undang memperluas jangkauan Anda.',
    },
  ],
  sections: [
    'Sebut nama pelanggan dan masalahnya. Sebelum menulis apa pun, sebutkan orang spesifik yang merasakan masalah ini dan gambarkan masalahnya dengan kata-kata mereka. Bisnis kecil berhasil ketika melayani satu kebutuhan nyata dengan baik. JoinOrigin dirancang di sekitar halaman ide yang mudah ditemukan, dan halaman yang paling jelas dimulai dari pelanggan bernama. Tuliskan pelanggan dan masalahnya dan ujilah pada tiga orang yang sesuai.',
    'Tulis halaman ide seperti etalase. Halaman harus menunjukkan apa yang Anda tawarkan, untuk siapa, berapa biayanya dalam waktu atau uang, dan di tahap apa idenya. Jaga tetap konkret — pop-up, produk, layanan, toko. Menerbitkan ide di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Draf halaman sebagai kiriman publik singkat dan sempurnakan dengan umpan balik.',
    'Terbitkan ide dan buka ruangnya. Menerbitkan adalah momen ide bisnis menjadi mudah ditemukan. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya. Di JoinOrigin halaman, ruang, dan tautan bergabung adalah satu penerbitan. Terbitkan ide secara publik dan buka ruang untuk percakapan di sekitarnya.',
    'Bagikan halaman ke jaringan lokal Anda. Bisnis kecil tumbuh melalui jangkauan lokal. Bagikan halaman ide dengan tetangga, kolega, grup lokal, dan siapa pun yang mengenal masalahnya secara langsung. Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke ide Anda sudah cukup.',
    'Undang pelanggan dan kolaborator awal. Undang orang yang benar-benar akan membeli atau membantu: calon pelanggan, seseorang dengan keterampilan yang Anda butuhkan, mentor, atau penyelenggara lokal. JoinOrigin mempermudah penemuan — tempat orang yang mencari ide dapat menemukan ide Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap orang yang bergabung menjadi saluran ke jaringan mereka sendiri.',
    'Dengarkan di ruang. Tanyakan kepada yang bergabung bagaimana mereka akan menggunakan penawaran itu, berapa yang akan mereka bayar, dan apa yang menghalangi mereka. Ruang adalah tempat permintaan nyata muncul — atau tidak. JoinOrigin tidak menjalankan percakapan ini; ruang itu milik Anda untuk dibentuk. Platform memberi ide bisnis satu ruang tempat ketertarikan menjadi umpan balik, dan kreator memiliki ruang itu. Tanyakan langsung kepada anggota di ruang.',
    'Sempurnakan penawaran dari umpan balik nyata. Sesuaikan harga, cakupan, saluran, atau janji berdasarkan apa yang dikatakan yang bergabung. Bisnis kecil dibangun dalam iterasi kecil. JoinOrigin menyimpan memori bersama sebuah ide di satu tempat — catatan, keputusan, dan umpan balik di ruang — sehingga penyempurnaan terlihat alih-alih hilang. Ubah satu hal pada satu waktu dan perhatikan responsnya.',
    'Tumbuhkan ruang menjadi basis pelanggan pertama Anda. Terus undang, terus bagikan pembaruan, dan jaga ruang tetap hidup saat penawaran menguat. Orang-orang di ruang adalah pelanggan pertama dan promotor pertama Anda. JoinOrigin menjaga halaman ide dan ruangnya tetap terhubung saat bisnis tumbuh — satu tempat di mana janji, percakapan, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
  ],
  steps: [
    {
      title: 'Sebut nama pelanggan dan masalahnya',
      body: 'Sebelum menulis apa pun, sebutkan orang spesifik yang merasakan masalah ini dan gambarkan masalahnya dengan kata-kata mereka. Bisnis kecil berhasil ketika melayani satu kebutuhan nyata dengan baik.',
      joinOriginNote:
        'JoinOrigin dirancang di sekitar halaman ide yang mudah ditemukan, dan halaman yang paling jelas dimulai dari pelanggan bernama. Tuliskan pelanggan dan masalahnya dan ujilah pada tiga orang yang sesuai.',
    },
    {
      title: 'Tulis halaman ide seperti etalase',
      body: 'Halaman harus menunjukkan apa yang Anda tawarkan, untuk siapa, berapa biayanya dalam waktu atau uang, dan di tahap apa idenya. Jaga tetap konkret — pop-up, produk, layanan, toko.',
      joinOriginNote:
        'Menerbitkan ide di JoinOrigin otomatis membuat halaman dan ruangnya, dengan kreator mengendalikan ruang sejak awal. Draf halaman sebagai kiriman publik singkat dan sempurnakan dengan umpan balik.',
    },
    {
      title: 'Terbitkan ide dan buka ruangnya',
      body: 'Menerbitkan adalah momen ide bisnis menjadi mudah ditemukan. Di JoinOrigin, ruang dibuat otomatis pada saat yang sama — tidak ada langkah penyiapan terpisah, dan kreator memilikinya.',
      joinOriginNote:
        'Di JoinOrigin halaman, ruang, dan tautan bergabung adalah satu penerbitan. Terbitkan ide secara publik dan buka ruang untuk percakapan di sekitarnya.',
    },
    {
      title: 'Bagikan halaman ke jaringan lokal Anda',
      body: 'Bisnis kecil tumbuh melalui jangkauan lokal. Bagikan halaman ide dengan tetangga, kolega, grup lokal, dan siapa pun yang mengenal masalahnya secara langsung.',
      joinOriginNote:
        'Bergabung di JoinOrigin adalah satu tindakan — mengklik Bergabung di halaman publik atau mengikuti tautan undangan langsung dari anggota. Satu tautan pendek dan jelas ke ide Anda sudah cukup.',
    },
    {
      title: 'Undang pelanggan dan kolaborator awal',
      body: 'Undang orang yang benar-benar akan membeli atau membantu: calon pelanggan, seseorang dengan keterampilan yang Anda butuhkan, mentor, atau penyelenggara lokal.',
      joinOriginNote:
        'JoinOrigin mempermudah penemuan — tempat orang yang mencari ide dapat menemukan ide Anda dan bergabung melalui tautan. Undangan personal tetap menjadi penggerak utama, dan setiap orang yang bergabung menjadi saluran ke jaringan mereka sendiri.',
    },
    {
      title: 'Dengarkan di ruang',
      body: 'Tanyakan kepada yang bergabung bagaimana mereka akan menggunakan penawaran itu, berapa yang akan mereka bayar, dan apa yang menghalangi mereka. Ruang adalah tempat permintaan nyata muncul — atau tidak.',
      joinOriginNote:
        'JoinOrigin tidak menjalankan percakapan ini; ruang itu milik Anda untuk dibentuk. Platform memberi ide bisnis satu ruang tempat ketertarikan menjadi umpan balik, dan kreator memiliki ruang itu. Tanyakan langsung kepada anggota di ruang.',
    },
    {
      title: 'Sempurnakan penawaran dari umpan balik nyata',
      body: 'Sesuaikan harga, cakupan, saluran, atau janji berdasarkan apa yang dikatakan yang bergabung. Bisnis kecil dibangun dalam iterasi kecil.',
      joinOriginNote:
        'JoinOrigin menyimpan memori bersama sebuah ide di satu tempat — catatan, keputusan, dan umpan balik di ruang — sehingga penyempurnaan terlihat alih-alih hilang. Ubah satu hal pada satu waktu dan perhatikan responsnya.',
    },
    {
      title: 'Tumbuhkan ruang menjadi basis pelanggan pertama Anda',
      body: 'Terus undang, terus bagikan pembaruan, dan jaga ruang tetap hidup saat penawaran menguat. Orang-orang di ruang adalah pelanggan pertama dan promotor pertama Anda.',
      joinOriginNote:
        'JoinOrigin menjaga halaman ide dan ruangnya tetap terhubung saat bisnis tumbuh — satu tempat di mana janji, percakapan, dan orang-orangnya terlihat. Mulailah ditemukan dan bertumbuh.',
    },
  ],
};

export default content;
