import type { CityContent } from '../../types';

/**
 * Konten Jakarta — terjemahan Bahasa Indonesia (file konten per-lokale).
 *
 * Salinan untuk 7 halaman `id` Jakarta di `/id/location/...`. Salinan
 * ditulis DI SINI, tidak pernah di JSON lokale (lokal R2/R5). `pageTitles`
 * membawa judul/deskripsi SEO Bahasa Indonesia sehingga registry dan
 * sitemap tetap deterministik untuk permukaan id.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'id',
  slug: 'jakarta',
  title: 'Komunitas di Jakarta | JoinOrigin',
  description:
    'Temukan atau mulai komunitas di Jakarta — grup startup, kreatif, politik, meetup, dan usaha kecil. Bergabunglah dengan daftar tunggu JoinOrigin.',
  pageTitles: {
    city: 'Komunitas di Jakarta | JoinOrigin',
    cityDescription:
      'Temukan atau mulai komunitas di Jakarta — grup startup, kreatif, politik, meetup, dan usaha kecil. Bergabunglah dengan daftar tunggu JoinOrigin.',
    variants: {
      startup: 'Komunitas startup di Jakarta | JoinOrigin',
      creative: 'Komunitas kreatif & desain di Jakarta | JoinOrigin',
      political: 'Komunitas politik & sipil di Jakarta | JoinOrigin',
      meetup: 'Meetup & acara komunitas di Jakarta | JoinOrigin',
      'small-business': 'Komunitas usaha kecil di Jakarta | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Temukan atau mulai komunitas startup di Jakarta — pendiri, pembangun, dan tim awal di SCBD, Sudirman, dan Kuningan. Daftar tunggu JoinOrigin.',
      creative:
        'Temukan atau mulai komunitas kreatif & desain di Jakarta — galeri, venue musik indie, dan studio desain di Kemang dan Senopati. Daftar tunggu JoinOrigin.',
      political:
        'Temukan atau mulai komunitas politik & sipil di Jakarta — relawan banjir, advokasi lalu lintas, dan aksi kualitas udara. Daftar tunggu JoinOrigin.',
      meetup:
        'Temukan atau mulai meetup & acara komunitas di Jakarta — Monas, Kota Tua, kafe Kemang, dan lari Minggu pagi. Daftar tunggu JoinOrigin.',
      'small-business':
        'Temukan atau mulai komunitas usaha kecil di Jakarta — pedagang pasar, pemilik kafe, dan butik di Tanah Abang serta Kemang. Daftar tunggu JoinOrigin.',
    },
    ideas: '30 ide acara komunitas di Jakarta | JoinOrigin',
    ideasDescription:
      '30 ide realistis untuk acara komunitas di Jakarta — jejaring, pembelajaran, sosial & luar ruangan, profesional, kreatif, serta dampak & lokal. Untuk acara Anda berikutnya.',
  },
  intro: [
    'Jakarta adalah ibu kota dan mesin ekonomi Indonesia, kota yang luas dan penuh energi tempat para pendiri startup, pegawai negeri, dan budaya jalanan yang terkenal hangat berbagi jalan yang sama. Komunitas kota ini tersebar di distrik-distrik yang khas — SCBD dan Sudirman untuk bisnis dan teknologi, Kemang dan Senopati untuk hiburan malam dan budaya kreatif, Kota Tua untuk sejarah, dan kawasan pemukiman luas di selatan dan timur untuk kehidupan keluarga dan lingkungan.',
    'Institusi menopang kehidupan komunitas Jakarta: Universitas Indonesia di Depok, jaringan alumni Gadjah Mada, dan puluhan kampus memasok aliran mahasiswa dan lulusan yang terus-menerus, sementara ekosistem startup kota ini — rumah bagi beberapa perusahaan teknologi terbesar di Asia Tenggara — menarik talenta dari seluruh nusantara. Monas, taman-taman kota, dan ruang acara di mal memberi grup tempat yang gratis dan mudah, meskipun kemacetan membuat titik pertemuan di pusat kota menjadi penting.',
    'Untuk menemukan atau memulai komunitas, Jakarta menghargai penyelenggara yang menghormati lalu lintas: pilih venue yang mudah dijangkau, mulai tepat waktu, dan sediakan makanan serta kopi — budaya keramahtamahan kota ini menjadikan makan bersama cara tercepat untuk membangun rasa memiliki.',
  ],
  dataPoints: [
    'Kurang lebih 8,5 juta penduduk di dalam kota; ibu kota Indonesia.',
    'Distrik dengan suasana yang berbeda: SCBD, Kemang, Senopati, Kota Tua, dan kawasan pemukiman selatan.',
    'Rumah bagi Universitas Indonesia dan banyak kampus lainnya.',
    'Industri: teknologi, keuangan, media, dan perdagangan.',
    'Rumah bagi salah satu ekosistem startup terbesar di Asia Tenggara.',
    'Penopang publik: Monas, taman-taman kota, dan alun-alun bersejarah Kota Tua.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Coworking space di SCBD dan Sudirman',
        'Lantai acara startup dekat Senayan dan Kuningan',
        'Ruang inkubator di Universitas Indonesia',
        'Pusat inovasi di kawasan CBD',
        'Kafe dengan sudut pertemuan di Kemang dan Senopati',
        'Ruang konferensi hotel di Segitiga Emas',
      ],
      formats: [
        'Sarapan pendiri dengan perkenalan melingkar',
        'Malam pitch dan demo night',
        'Lingkaran pembangun fintech dan e-commerce',
        'Jam kantor investor di inkubator',
        'Hackathon akhir pekan di kampus universitas',
      ],
      howToStart: [
        'Pilih vertikal yang sempit — fintech, e-commerce, logistik, atau alat kreator — dan nama yang bilingual.',
        'Pesan slot berulang di coworking space SCBD atau Sudirman dekat MRT.',
        'Jalankan tiga meetup terbuka, lalu tambahkan makan malam setelahnya dan minta dua orang rutin menjadi co-penyelenggara.',
      ],
    },
    creative: {
      venues: [
        'Galeri di Kemang dan kawasan seni Cipete',
        'Venue musik indie di Kemang dan Blok M',
        'Studio desain di Senopati dan SCBD',
        'Bioskop dan ruang film independen di pusat kota',
        'Sudut seni jalanan di Kota Tua dan kawasan tua',
        'Panggung kafe di Kemang dan Senopati',
      ],
      formats: [
        'Malam showcase musik indie',
        'Jalan seni dan malam galeri',
        'Hari pasar desain dan kerajinan',
        'Malam open-mic dan spoken word',
        'Jalan-jalan fotografi keliling Kota Tua',
      ],
      howToStart: [
        'Pilih satu kerajinan — musik, desain, film, fotografi — dan slot malam yang rutin.',
        'Bermitra dengan galeri, venue, atau studio di Kemang atau Senopati untuk sesi pertama.',
        'Jadikan acara kedua sebagai showcase karya peserta agar grup mendapat tujuan bersama.',
      ],
    },
    political: {
      venues: [
        'Aula kantor kota dan kecamatan',
        'Ruang rapat RT/RW lingkungan',
        'Ruang seminar kampus di UI',
        'Pusat LSM dan sukarelawan di kota',
        'Ruang perpustakaan umum dengan koleksi kewargaan',
        'Gudang sukarelawan sungai dan taman',
      ],
      formats: [
        'Pengarahan pencegahan banjir dan pembersihan sungai',
        'Rapat advokasi lalu lintas dan transportasi umum',
        'Malam informasi hak perumahan dan sewa',
        'Sesi informasi sukarelawan untuk program kota',
        'Lingkaran aksi iklim dan kualitas udara',
      ],
      howToStart: [
        'Pilih satu isu lokal yang konkret — ruas sungai, simpang lalu lintas, lingkungan — dan jaga geografinya kecil.',
        'Bermitra dengan LSM, RT/RW, atau grup komunitas yang sudah ada alih-alih menggandakan pekerjaan.',
        'Selenggarakan sesi informasi terbuka di aula komunitas dan rotasikan rencana aksi bulanan.',
      ],
    },
    meetup: {
      venues: [
        'Taman Monas dan halaman pusat kota',
        'Kafe dan restoran Kemang dan Senopati',
        'Alun-alun Kota Tua dan lorong kawasan tua',
        'Ruang acara mal dan kafe atap',
        'Taman kota di selatan dan timur',
        'Aula komunitas di kawasan pemukiman',
      ],
      formats: [
        'Grup jalan sejarah Kota Tua',
        'Meja pertukaran bahasa untuk pendatang baru',
        'Malam kafe board game',
        'Klub lari Minggu pagi',
        'Grup jalan kuliner keliling kawasan tua',
      ],
      howToStart: [
        'Pilih format yang bisa diulang — jalan sejarah, lari Minggu — dan titik pertemuan yang tetap.',
        'Pilih sudut Monas atau kafe Kemang yang mudah dijangkau MRT atau ojek daring.',
        'Jalankan tiga sesi konsisten, lalu minta anggota rutin mengundang satu pendatang baru masing-masing.',
      ],
    },
    'small-business': {
      venues: [
        'Jaringan pedagang pasar tradisional di Tanah Abang dan Pasar Baru',
        'Meja pemilik restoran dan kafe di Kemang dan Senopati',
        'Lingkaran pemilik butik di selatan',
        'Studio merek desain di Senopati',
        'Komunitas lapak kerajinan dan kuliner jalanan di acara kota',
        'Ruang seminar kamar dagang',
      ],
      formats: [
        'Sarapan pedagang pasar tanpa agenda',
        'Sesi perencanaan pedagang musim festival',
        'Klinik pembayaran digital dan e-commerce',
        'Lingkaran pengadaan dan pemasok bersama',
        'Tur jalan-jalan lorong toko',
      ],
      howToStart: [
        'Pilih satu pasar atau koridor belanja dan kafe yang sudah melayani pemilik lokal.',
        'Jalankan sarapan tanpa agenda dulu — pemilik datang untuk bicara tentang pelanggan, sewa, dan platform.',
        'Setelah tiga sarapan, rotasikan satu topik praktis per bulan dan biarkan jaringan pedagang menyebarkan kabar.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Ekosistem startup Jakarta adalah jantung ekonomi digital Indonesia, rumah bagi beberapa perusahaan teknologi terbesar di Asia Tenggara dan kumpulan pendiri yang dalam membangun fintech, e-commerce, dan logistik untuk negara berpenduduk ratusan juta. Para pendiri berkumpul di SCBD, Sudirman, dan Kuningan, tempat coworking space, akselerator, dan program universitas menciptakan lingkaran talenta dan modal yang padat. Pasarnya sangat besar dan tumbuh cepat, yang berarti produk yang memecahkan masalah lokal — pembayaran, pengiriman, social commerce — bisa berkembang pesat, dan kedekatan kota dengan pemerintah dan regulasi membuat pendiri yang paham kebijakan lebih kuat. Budayanya kolaboratif dan optimis: orang berbagi secara terbuka, acaranya energik, dan kehangatan keramahtamahan Indonesia terlihat bahkan di rapat pitch. Bahasa Inggris dan Bahasa Indonesia sama-sama berfungsi di ekosistem ini. Format berulang mencakup sarapan pendiri, malam pitch, lingkaran fintech dan e-commerce, serta hackathon akhir pekan. Memulai komunitas startup di sini paling baik dilakukan dengan vertikal yang sempit dan venue tetap dekat MRT; skala dan energi Jakarta melakukan sisanya.',
    creative:
      'Kancah kreatif Jakarta muda, ramai, dan campurannya luar biasa. Kemang dan Senopati adalah jantung kreatifnya — galeri, venue musik indie, studio desain, dan kafe yang tetap hidup hingga larut malam. Blok M dan kawasan seni Cipete menampung kancah galeri yang berkembang, sementara jalan-jalan kolonial Kota Tua menjadi kanvas seni jalanan, jalan foto, dan acara sejarah. Industri film dan musik kota ini adalah yang terbesar di Asia Tenggara, memasok aliran talenta yang konstan ke studio dan rumah produksi, dan merek mode serta desainnya semakin terlihat secara regional. Budaya kafe adalah mesin kreatif yang sesungguhnya — banyak komunitas dimulai dari kopi dan tumbuh menjadi pameran, label, dan kolektif. Format umum mencakup showcase indie, jalan seni, pasar kerajinan, dan open-mic. Memulai komunitas kreatif di Jakarta sangat realistis: pilih kerajinan dan venue dengan audiens yang sudah ada — Kemang untuk musik, Cipete untuk seni — dan energi muda kota ini akan menarik orang masuk.',
    political:
      'Kehidupan kewargaan Jakarta dibentuk oleh tekanan kota raksasa: banjir, lalu lintas, dan kualitas udara adalah isu yang konstan dan nyata yang menyatukan warga. Banjir kota yang terkenal telah melahirkan jaringan sukarelawan aktif untuk pembersihan sungai, evakuasi banjir, dan kesiapsiagaan lingkungan — sistem RT/RW memberi setiap blok struktur siap pakai untuk aksi kewargaan. Lalu lintas dan transportasi umum adalah topik hangat, dengan komuter yang mengadvokasi MRT, bus rapid transit, dan ruang pejalan kaki. Keterjangkauan perumahan penting di kota tempat harga sewa dan tanah tinggi dan terus naik. Kampus universitas dan lembaga riset menambah lapisan yang digerakkan bukti. Budayanya menghargai kehangatan dan ketekunan: hadir di rapat yang nyata, membangun hubungan dengan tetangga, dan mengambil peran yang terlihat lebih penting daripada komentar. Memulai komunitas politik di sini berarti memilih satu isu konkret dan geografi yang kecil — ruas sungai, simpang lalu lintas, blok RT/RW — lalu bermitra dengan struktur sukarelawan dan komunitas yang sudah ada. Jakarta menghargai aksi yang stabil dan terlihat.',
    meetup:
      'Kancah meetup Jakarta hangat, berpusat pada makanan, dan dibangun di sekitar ritme kota. Taman Monas dan halaman pusat kota menampung lari pagi, jalan sore, dan piknik akhir pekan, sementara alun-alun Kota Tua menarik pejalan sejarah, fotografer, dan pecinta kuliner jalanan. Kemang dan Senopati adalah jantung kafe dan hiburan malam — klub buku, pertukaran bahasa, malam board game, dan malam musik live memenuhi kalender, dan budaya makanan kota yang terkenal menjadikan jalan kuliner dan makan bersama format yang alami. Mal dan atap SCBD serta Sudirman menampung acara yang lebih besar yang butuh AC dan ruang. Lalu lintas adalah kendala besar — grup memilih venue dekat MRT atau titik ojek daring, dan penyelenggara yang tepat waktu memenangkan loyalitas. Grup di sini cenderung ramah, informal, dan terbuka, sejalan dengan keramahtamahan kota. Memulai meetup sangat realistis: pilih format yang bisa diulang — jalan sejarah, lari Minggu — dan titik pertemuan tetap yang mudah dijangkau, jalankan tiga sesi di waktu dan tempat yang sama, dan kehangatan Jakarta akan mengambil alih.',
    'small-business':
      'Komunitas usaha kecil Jakarta berjalan di atas pasar konsumen kota yang sangat besar. Pasar tradisional — Tanah Abang, Pasar Baru, dan pasar jalanan di distrik-distrik — berjalan di atas jaringan pedagang yang mengelola lapak, festival, dan suara kolektif tentang sewa dan aturan, dengan Tanah Abang sebagai salah satu pasar tekstil terbesar di Asia Tenggara. Ekonomi barunya berbeda: kafe dan restoran Kemang dan Senopati, butik di selatan, dan lapisan besar penjual daring yang menjalankan merek dari rumah atau studio kecil. Pembayaran digital dan e-commerce ada di mana-mana, dan pemilik terus bertukar catatan tentang platform, logistik, dan tren. Kamar dagang dan asosiasi industri menjalankan klinik praktis tentang perizinan, e-commerce, dan perekrutan. Yang menyatukan grup-grup ini adalah geografi dan selera: pasar atau koridor berbagi pelanggan, lalu lintas pejalan kaki, dan siklus tren yang sama. Memulai komunitas usaha kecil di Jakarta sangat bisa dicapai — sarapan bulanan untuk pemilik di satu jalan, dengan topik praktis bergilir, secara andal mengisi ruangan.',
  },
  ideaPage: {
    intro:
      'Jakarta adalah kota yang luar biasa untuk ide acara komunitas: populasinya besar, makanannya legendaris, dan kehangatan kota membuat orang datang. Tiga puluh ide di bawah dikelompokkan ke dalam enam kategori: jejaring, pembelajaran, sosial dan luar ruangan, profesional dan industri, kreatif dan pembuat, serta dampak dan lokal. Masing-masing menyertakan untuk siapa, pitch singkat, dan jenis venue yang disarankan yang benar-benar ada di Jakarta, dari taman Monas dan alun-alun Kota Tua hingga lantai coworking SCBD dan kafe Kemang. Beberapa ide berfungsi sebagai acara sekali jalan; yang lain dirancang untuk menjadi komunitas berulang dengan hari dan tempat tetap. Aturan kejujurannya sederhana: setiap saran venue adalah jenis tempat nyata di kota ini, dan setiap format cukup sederhana untuk dijalankan penyelenggara pertama kali. Pilih ide yang sesuai dengan minat Anda, temukan venue yang mudah dijangkau, dan biarkan kehangatan Jakarta melakukan sisanya.',
    categories: [
      {
        name: 'Jejaring',
        ideas: [
          {
            title: 'Jalan pendatang baru Kota Tua',
            pitch:
              'Jalan sore keliling kawasan tua tempat pendatang baru dan warga lama Jakarta bertukar tips kota dan cerita kerja.',
            audience: 'Pendatang baru dan pecinta sejarah',
            venueType: 'Alun-alun Kota Tua',
          },
          {
            title: 'Sarapan pendiri SCBD',
            pitch:
              'Sarapan pagi tempat para pendiri berbagi kemenangan dan hambatan minggu ini sebelum hari kerja dimulai.',
            audience: 'Pendiri startup di Jakarta',
            venueType: 'Kafe di SCBD',
          },
          {
            title: 'Temu kangen Kemang',
            pitch:
              'Malam santai dengan kartu pemecah kebekuan dan aturan bahwa Anda bertemu tiga orang baru.',
            audience: 'Profesional dan kreator',
            venueType: 'Kafe di Kemang',
          },
          {
            title: 'Lingkaran cerita karier',
            pitch:
              'Enam orang menceritakan kisah karier mereka masing-masing lima menit, diikuti tanya jawab dan koneksi.',
            audience: 'Pengganti karier, mahasiswa, dan mentor',
            venueType: 'Pusat komunitas atau ruang perpustakaan',
          },
          {
            title: 'Klub kopi freelancer',
            pitch:
              'Kopi pagi mingguan tempat freelancer lintas industri berbagi prospek, tarif, dan cerita klien.',
            audience: 'Freelancer dari semua bidang',
            venueType: 'Kafe coworking di Senopati',
          },
        ],
      },
      {
        name: 'Pembelajaran & lokakarya',
        ideas: [
          {
            title: 'Meja percakapan Bahasa Indonesia',
            pitch:
              'Meja berdasarkan tingkat, satu penutur asli per meja, dan aturan sederhana: kesalahan adalah intinya.',
            audience: 'Pendatang baru yang belajar Bahasa Indonesia',
            venueType: 'Pusat komunitas atau kafe',
          },
          {
            title: 'Kelas memasak rumahan Indonesia',
            pitch:
              'Kelas kelompok kecil yang mengajarkan rendang, soto, dan hidangan favorit lainnya dari nol.',
            audience: 'Koki rumahan semua tingkat',
            venueType: 'Dapur komunitas atau sekolah memasak',
          },
          {
            title: 'Pemasaran digital untuk merek kecil',
            pitch:
              'Sesi praktik tentang platform, konten, dan e-commerce untuk usaha kecil dan startup.',
            audience: 'Pemilik usaha kecil dan pemasar',
            venueType: 'Ruang acara coworking',
          },
          {
            title: 'Lokakarya apresiasi batik dan tekstil',
            pitch: 'Pengenalan praktik tentang batik, dari sejarah hingga dasar lilin dan pewarna.',
            audience: 'Pecinta kerajinan dan pengunjung',
            venueType: 'Lokakarya tekstil atau ruang komunitas',
          },
          {
            title: 'Klinik CV dan wawancara',
            pitch:
              'Profesional menjadi sukarelawan meninjau CV dan menjalankan wawancara tiruan untuk pencari kerja di malam terstruktur.',
            audience: 'Mahasiswa dan pencari kerja tahap awal',
            venueType: 'Ruang pertemuan kampus atau perpustakaan',
          },
        ],
      },
      {
        name: 'Sosial & luar ruangan',
        ideas: [
          {
            title: 'Klub lari pagi Monas',
            pitch:
              'Lari kelompok ramah untuk semua kecepatan mengelilingi monumen nasional, dilanjutkan sarapan.',
            audience: 'Pelari semua tingkat',
            venueType: 'Taman Monas',
          },
          {
            title: 'Jalan sejarah Kota Tua',
            pitch:
              'Jalan sore terbimbing melewati jalan dan museum kawasan tua, dengan berhenti kuliner jalanan.',
            audience: 'Penjelajah dan pecinta sejarah',
            venueType: 'Lorong kawasan tua Kota Tua',
          },
          {
            title: 'Malam kafe board game',
            pitch:
              'Malam mingguan di kafe board game yang menyambut pendatang baru dan strategi tenang.',
            audience: 'Pemain santai dan tetangga',
            venueType: 'Kafe board game di Kemang',
          },
          {
            title: 'Jalan kuliner jalanan keliling kawasan tua',
            pitch:
              'Jalan terbimbing melewati lorong kuliner jalanan legendaris dengan cerita di balik setiap lapak.',
            audience: 'Pecinta kuliner dan penjelajah',
            venueType: 'Lorong kawasan tua dan Pasar Baru',
          },
          {
            title: 'Grup sepeda Minggu pagi',
            pitch: 'Bersepeda santai di jalan bebas kendaraan Minggu pagi, dengan berhenti kopi.',
            audience: 'Pesepeda rekreasi',
            venueType: 'Jalan bebas kendaraan Sudirman-Thamrin',
          },
        ],
      },
      {
        name: 'Profesional & industri',
        ideas: [
          {
            title: 'Meja pendiri fintech',
            pitch:
              'Meja bundar bulanan untuk pendiri fintech berbagi kemajuan produk dan pelajaran regulasi.',
            audience: 'Pendiri dan operator fintech',
            venueType: 'Lantai coworking di SCBD',
          },
          {
            title: 'Lingkaran e-commerce dan social commerce',
            pitch:
              'Pendiri dan operator e-commerce serta social commerce berbagi playbook platform dan pelajaran pertumbuhan.',
            audience: 'Pendiri dan operator e-commerce',
            venueType: 'Ruang acara coworking di Kuningan',
          },
          {
            title: 'Lingkaran rekan product manager',
            pitch:
              'Lingkaran rahasia tempat PM membahas satu tantangan bulanan — roadmap, perekrutan, politik pemangku kepentingan.',
            audience: 'Product manager di bidang teknologi',
            venueType: 'Ruang rapat coworking',
          },
          {
            title: 'Meetup teknologi logistik dan pengiriman',
            pitch:
              'Profesional di bidang logistik dan teknologi pengiriman membahas tren dan kolaborasi.',
            audience: 'Profesional logistik dan pendiri',
            venueType: 'Ruang konferensi hotel',
          },
          {
            title: 'Malam jaringan ekonomi kreator',
            pitch: 'Kreator, agensi, dan pembangun platform membahas tren, alat, dan kolaborasi.',
            audience: 'Kreator dan profesional media',
            venueType: 'Studio atau ruang acara kafe',
          },
        ],
      },
      {
        name: 'Kreatif & pembuat',
        ideas: [
          {
            title: 'Malam musik indie Kemang',
            pitch:
              'Panggung terbuka bulanan untuk band indie, artis solo, dan pemula di kawasan kreatif.',
            audience: 'Musisi dan pecinta musik',
            venueType: 'Venue musik live di Kemang',
          },
          {
            title: 'Jalan seni keliling Cipete dan Kemang',
            pitch:
              'Jalan sore terbimbing melewati galeri, dengan pembicaraan seniman di beberapa pemberhentian.',
            audience: 'Pecinta seni dan pengunjung penasaran',
            venueType: 'Galeri Cipete dan Kemang',
          },
          {
            title: 'Malam open-mic dan spoken word',
            pitch:
              'Open mic bulanan tempat penyair, pendongeng, dan pemula berbagi lima menit di panggung.',
            audience: 'Penulis dan penampil',
            venueType: 'Panggung kafe di Senopati',
          },
          {
            title: 'Jalan foto Kota Tua',
            pitch:
              'Jalan foto terbimbing melewati jalan kolonial, dengan tips cahaya dan komposisi.',
            audience: 'Fotografer amatir dan profesional',
            venueType: 'Jalan-jalan Kota Tua',
          },
          {
            title: 'Hari pasar desain dan kerajinan',
            pitch:
              'Desainer dan pembuat lokal menjual dan menceritakan kisah di balik karya mereka di pasar yang ramah.',
            audience: 'Pembuat, desainer, dan pembeli',
            venueType: 'Galeri atau ruang acara komunitas',
          },
        ],
      },
      {
        name: 'Dampak & lokal',
        ideas: [
          {
            title: 'Pagi sukarelawan pembersihan sungai',
            pitch:
              'Pembersihan Sabtu pagi di satu ruas sungai, dengan sarung tangan dan perlengkapan disediakan.',
            audience: 'Warga dan sukarelawan pertama kali',
            venueType: 'Ruas sungai di kota',
          },
          {
            title: 'Lingkaran kesiapsiagaan banjir lingkungan',
            pitch:
              'Tetangga memetakan jalan rawan banjir dan mengoordinasikan rencana respons sederhana dengan sukarelawan lokal.',
            audience: 'Warga di kawasan rawan banjir',
            venueType: 'Aula RT/RW atau pusat komunitas',
          },
          {
            title: 'Lingkaran aksi kualitas udara',
            pitch:
              'Warga memantau dan mendiskusikan kualitas udara lokal serta mengoordinasikan aksi udara bersih kecil.',
            audience: 'Warga yang peduli polusi',
            venueType: 'Pusat komunitas atau ruang perpustakaan',
          },
          {
            title: 'Sesi informasi sukarelawan untuk program kota',
            pitch:
              'Orientasi plus giliran pertama untuk sukarelawan yang mendukung taman, sekolah, dan program komunitas.',
            audience: 'Sukarelawan pertama kali',
            venueType: 'Pusat komunitas atau kantor LSM',
          },
          {
            title: 'Malam bercerita pasar',
            pitch:
              'Pedagang dan pemilik toko berbagi cerita lima menit di balik bisnis mereka, diikuti tanya jawab terbuka.',
            audience: 'Tetangga dan pemilik usaha kecil',
            venueType: 'Aula pasar atau kafe lokal',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Bagaimana cara memilih salah satu ide ini?',
        answer:
          'Sesuaikan kategori dengan minat Anda dan audiens yang bisa Anda jangkau. Di Jakarta, format berulang dengan venue tetap yang mudah dijangkau — lari pagi, jalan sejarah, sarapan bulanan — membangun komunitas paling cepat.',
      },
      {
        question: 'Apakah saya harus bisa Bahasa Indonesia untuk menyelenggarakan?',
        answer:
          'Tidak. Banyak grup Jakarta berjalan bilingual atau dalam bahasa Inggris, dan kancah startup serta kreatifnya internasional. Pengumuman bilingual biasanya menggandakan jangkauan Anda.',
      },
      {
        question: 'Bisakah acara ini menjadi komunitas sungguhan?',
        answer:
          'Ya — format berulang adalah cara kebanyakan komunitas Jakarta dimulai, dan kehangatan kota membuat anggota kembali. Panduan cara menjelaskan dari acara pertama hingga komunitas yang stabil.',
      },
    ],
  },
  faq: [
    {
      question: 'Bagaimana cara menemukan komunitas di Jakarta?',
      answer:
        'Gunakan halaman jenis grup untuk komunitas startup, kreatif, politik, meetup, dan usaha kecil. Masing-masing menggambarkan distrik, venue, dan format nyata tempat warga Jakarta berkumpul. JoinOrigin sudah berjalan — buat profil Anda dan temukan atau mulai komunitas Anda hari ini.',
    },
    {
      question: 'Apakah realistis memulai komunitas di Jakarta?',
      answer:
        'Ya. Jakarta punya populasi besar, kancah startup yang kuat, dan budaya yang terkenal hangat. Panduan mencakup memulai komunitas, menyelenggarakan meetup, dan mendapatkan sepuluh anggota pertama Anda.',
    },
    {
      question: 'Apakah saran venue di halaman ini nyata?',
      answer:
        'Ya. Setiap jenis venue yang disebutkan — Monas, Kota Tua, kafe Kemang, lantai coworking SCBD — ada di Jakarta. Kami tidak pernah mengarang jumlah anggota, peringkat, atau kantor lokal.',
    },
    {
      question: 'Apakah JoinOrigin punya kantor di Jakarta?',
      answer:
        'Tidak. JoinOrigin tidak memiliki kantor atau staf lokal. Semua deskripsi komunitas mencerminkan lanskap kota yang nyata, dan platform membantu warga Jakarta menemukan atau memulai komunitas.',
    },
  ],
};

export default content;
