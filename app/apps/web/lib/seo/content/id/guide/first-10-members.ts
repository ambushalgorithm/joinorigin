import type { GuideContent } from '../../types';

/**
 * "Cara Mendapatkan 10 Anggota Pertama Anda" — panduan L1 yang selalu
 * relevan (desain §6.1, TASK-326), terjemahan Bahasa Indonesia (id).
 *
 * Difokuskan ulang pada model digital terhubung→bergabung→ruang: ruang
 * adalah permukaan bergabung — anggota masuk melalui tautan undangan dan
 * bergabung dengan ruang grup, tempat komunitas benar-benar hidup. Nilai
 * JoinOrigin dijalin ke dalam intro dan setiap langkah (joinOriginNote per
 * langkah), dengan kerangka yang jujur — JoinOrigin tidak merekrut anggota
 * atau menjalankan acara. "Ruang" merujuk pada ruang Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'id',
  slug: 'first-10-members',
  title:
    'Cara Mendapatkan 10 Anggota Pertama untuk Komunitas Baru atau yang Berkembang | JoinOrigin',
  description:
    'Dapatkan 10 anggota pertama tanpa anggaran besar — baik Anda meluncurkan komunitas baru maupun menghidupkan kembali yang sudah ada, mulailah dari jaringan pribadi Anda, bagikan tautan undangan, dan jadikan ruang sebagai tempat yang ingin diikuti orang. Langkah praktis dari JoinOrigin.',
  intro: [
    'Sepuluh anggota pertama adalah yang paling sulit didapatkan dan paling penting, karena mereka mendefinisikan budaya komunitas sebelum komunitas itu punya reputasi untuk menarik orang asing — dan mereka sama berharganya ketika komunitas yang sudah ada sedang mandek atau memulai ulang, karena inti yang berkomitmenlah yang mengubah grup yang sepi menjadi grup yang hidup. Masalah sepuluh-pertama itu pada dasarnya adalah masalah menghubungkan orang, dan itu adalah masalah inti yang dipecahkan JoinOrigin.',
    'JoinOrigin adalah OS komunitas yang dibangun di sekitar lingkaran digital terhubung→bergabung→ruang: Anda menerbitkan grup, ruangnya dibuat otomatis, dan anggota bergabung melalui tautan. Ruang adalah permukaan bergabung — setiap orang yang mengklik Bergabung atau mengikuti tautan undangan masuk ke ruang grup, satu-satunya tempat komunitas hidup dan tempat anggota baru merasa langsung terhubung. JoinOrigin tidak merekrut anggota atau menjalankan acara — bagian itu milik Anda. Platform membuat penemuan dan bergabung jauh lebih mudah; pertumbuhan awal tetap berasal dari jangkauan personal: orang yang langsung Anda undang dengan tautan, orang yang mereka bawa, dan orang yang bertahan karena ruangnya terasa hidup.',
    'Panduan ini memecah masalah sepuluh-anggota-pertama menjadi langkah-langkah konkret — baik Anda memulai komunitas baru maupun menghidupkan kembali yang sudah ada: mulai dari orang yang sudah Anda kenal, menerbitkan grup sehingga punya ruang untuk diikuti, mengundang secara personal dengan tautan, menjalankan pertemuan pertama yang mengubah peserta menjadi promotor, dan membangun kebiasaan rujukan sederhana sehingga setiap anggota membawa anggota berikutnya — dan setiap langkah menunjukkan tempat JoinOrigin membantu.',
  ],
  dataPoints: [
    'Undangan personal berhasil dengan tingkat yang jauh lebih tinggi daripada kiriman publik atau iklan berbayar.',
    'Tautan undangan menghilangkan semua hambatan: satu klik dan anggota baru sudah berada di ruang.',
    'Sepuluh anggota aktif sudah cukup sebagai bukti sosial bagi kebanyakan orang untuk merasa grup itu nyata dan layak diikuti.',
    'JoinOrigin adalah OS komunitas yang dirancang untuk membantu orang menemukan atau memulai komunitas — tidak merekrut anggota atau menjalankan acara.',
  ],
  faq: [
    {
      question: 'Mengapa tepatnya sepuluh anggota?',
      answer:
        'Sepuluh adalah titik balik: dengan sepuluh orang rutin Anda punya ruang yang hidup, inti diskusi yang andal, dan cukup bukti sosial untuk menarik pendatang baru yang sebaliknya akan ragu. Di bawah sepuluh, ruang terasa rapuh.',
    },
    {
      question: 'Berapa lama untuk mendapatkan sepuluh anggota pertama?',
      answer:
        'Dengan undangan personal yang konsisten dan pertemuan pertama yang baik, kebanyakan penyelenggara mencapai sepuluh anggota berkomitmen dalam tiga hingga enam minggu. Kuncinya adalah mengundang setiap minggu — bagikan tautan, tindak lanjuti, dan jaga ruang tetap aktif — bukan menunggu peluncuran besar.',
    },
    {
      question: 'Bagaimana jika saya tidak punya jaringan pribadi yang besar?',
      answer:
        'Mulai lebih kecil: undang lima orang yang Anda kenal, minta masing-masing membawa satu orang, dan unggah di dua grup khusus tempat audiens Anda sudah berkumpul. Setiap anggota yang Anda pertahankan menjadi saluran ke jaringan mereka sendiri — dan setiap undangan bisa berupa tautan sederhana ke ruang.',
    },
    {
      question: 'Bisakah JoinOrigin membantu saya menemukan anggota?',
      answer:
        'Ya. JoinOrigin membantu orang menemukan dan memulai komunitas — tempat orang yang mencari grup dapat menemukan grup Anda dan bergabung dengan ruangnya melalui tautan. Langkah-langkah dalam panduan ini — undangan personal dan pertemuan pertama yang hebat — adalah cara paling andal untuk menemukan anggota pertama Anda.',
    },
  ],
  sections: [
    'Buat daftar lima puluh orang yang sudah Anda kenal. Tuliskan siapa pun yang sesuai dengan tujuan komunitas: teman, kolega, teman sekelas, mantan rekan kerja, tetangga, dan kenalan daring. Anda butuh sekitar lima kali lebih banyak nama daripada sepuluh yang Anda inginkan. JoinOrigin memberi komunitas Anda rumah yang terlihat dan ruang yang bisa ditemukan orang — tetapi nama pertama tetap berasal dari orang yang Anda kenal. Buat daftar lima puluh dan perlakukan setiap nama sebagai perkenalan personal.',
    'Terbitkan grup Anda dan buka ruangnya. Komunitas yang tidak bisa Anda tunjukkan belum ada — dan komunitas yang rumahnya tersebar di obrolan dan daftar hampir sama sulitnya untuk dikembangkan. Terbitkan grup dengan misi yang jelas, dan biarkan ruangnya dibuat otomatis sehingga ada tempat nyata untuk anggota mendarat. Menerbitkan grup di JoinOrigin otomatis membuat ruangnya — ruang adalah permukaan bergabung, dan kreator memilikinya sejak awal. Siapkan grup dan ruangnya di alat yang sudah Anda gunakan sebelum mengundang siapa pun jika Anda lebih suka.',
    'Undang secara personal dengan permintaan spesifik dan tautan. Kirim pesan singkat yang menyebut nama komunitas, tanggal pertama atau percakapan pertama, dan mengapa Anda pikir mereka akan menikmatinya — dan sertakan tautan bergabung. Pesan personal mengalahkan kiriman umum, dan tanggal spesifik mengalahkan janji yang samar. JoinOrigin menghilangkan hambatan bergabung begitu orang menemukan Anda — satu tautan, satu klik, ke dalam ruang. Pesan personal singkat dengan tanggal spesifik dan tautan lebih berhasil daripada kiriman publik apa pun.',
    'Minta setiap undangan membawa satu orang. Jadikan itu bagian normal dari permintaan: "Bawa teman yang mungkin menyukai ini." Undangan rujukan adalah cara jaringan kecil berlipat menjadi komunitas sungguhan. JoinOrigin memberi anggota satu rumah yang bisa dibagikan untuk komunitas — sehingga percakapan rujukan mengarah ke tautan nyata dan ruang nyata. Jadikan "bawa teman" bagian dari permintaan, dan beri mereka tautan untuk dibagikan.',
    'Jalankan satu pertemuan pertama yang benar-benar baik. Habiskan energi Anda untuk pengalaman, bukan jumlah peserta: sambutan hangat, format yang jelas, dan waktu selesai yang pasti. Orang yang menikmati pertemuan pertama akan membawa sepuluh orang berikutnya. JoinOrigin tidak menjalankan acara — pengalaman itu milik Anda. Platform membantu komunitas terbentuk di sekitarnya: satu ruang yang bisa ditunjuk anggota setelahnya untuk menjaga koneksi tetap berlanjut.',
    'Undang setiap peserta ke dalam ruang. Di akhir pertemuan, bagikan tautan bergabung dan tambahkan siapa pun yang ingin tetap terhubung. Ruang adalah tempat komunitas hidup di antara pertemuan — anggota yang bergabung dengan ruang adalah anggota yang cenderung kembali. JoinOrigin menjaga keanggotaan dan komunikasi komunitas Anda dalam satu ruang terorganisir alih-alih lembar pendaftaran. Tautan sederhana ke ruang memungkinkan tindak lanjut.',
    'Tindak lanjuti dalam 24 jam dengan tanggal berikutnya. Ucapkan terima kasih kepada setiap peserta, bagikan ringkasan satu paragraf, dan konfirmasi pertemuan berikutnya — di ruang, di mana semua orang bisa melihatnya. Tindak lanjut adalah tempat peserta sekali jalan menjadi anggota. Di JoinOrigin tindak lanjut punya rumah alami — satu tempat di mana ringkasan dan tanggal berikutnya hidup. Ucapan terima kasih personal dalam 24 jam adalah yang mengubah peserta menjadi anggota.',
    'Buat mengundang orang lain semudah mungkin. Beri anggota satu kalimat yang bisa mereka ulangi dan satu tautan yang bisa mereka bagikan: "Ini meetup bulanan untuk pendiri baru berbagi pelajaran — gabung di sini." Deskripsi pendek yang jelas adalah alat rekrutmen paling efektif. JoinOrigin memungkinkan komunitas dideskripsikan, ditemukan, dan diikuti dalam satu tempat — anggota bisa menunjuk orang ke ruang alih-alih menjelaskannya. Beri anggota satu kalimat dan satu tautan yang bisa mereka ulangi.',
  ],
  steps: [
    {
      title: 'Buat daftar lima puluh orang yang sudah Anda kenal',
      body: 'Tuliskan siapa pun yang sesuai dengan tujuan komunitas: teman, kolega, teman sekelas, mantan rekan kerja, tetangga, dan kenalan daring. Anda butuh sekitar lima kali lebih banyak nama daripada sepuluh yang Anda inginkan.',
      joinOriginNote:
        'JoinOrigin memberi komunitas Anda rumah yang terlihat dan ruang yang bisa ditemukan orang — tetapi nama pertama tetap berasal dari orang yang Anda kenal. Buat daftar lima puluh dan perlakukan setiap nama sebagai perkenalan personal.',
    },
    {
      title: 'Terbitkan grup Anda dan buka ruangnya',
      body: 'Komunitas yang tidak bisa Anda tunjukkan belum ada — dan komunitas yang rumahnya tersebar di obrolan dan daftar hampir sama sulitnya untuk dikembangkan. Terbitkan grup dengan misi yang jelas, dan biarkan ruangnya dibuat otomatis sehingga ada tempat nyata untuk anggota mendarat.',
      joinOriginNote:
        'Menerbitkan grup di JoinOrigin otomatis membuat ruangnya — ruang adalah permukaan bergabung, dan kreator memilikinya sejak awal. Siapkan grup dan ruangnya di alat yang sudah Anda gunakan sebelum mengundang siapa pun jika Anda lebih suka.',
    },
    {
      title: 'Undang secara personal dengan permintaan spesifik dan tautan',
      body: 'Kirim pesan singkat yang menyebut nama komunitas, tanggal pertama atau percakapan pertama, dan mengapa Anda pikir mereka akan menikmatinya — dan sertakan tautan bergabung. Pesan personal mengalahkan kiriman umum, dan tanggal spesifik mengalahkan janji yang samar.',
      joinOriginNote:
        'JoinOrigin menghilangkan hambatan bergabung begitu orang menemukan Anda — satu tautan, satu klik, ke dalam ruang. Pesan personal singkat dengan tanggal spesifik dan tautan lebih berhasil daripada kiriman publik apa pun.',
    },
    {
      title: 'Minta setiap undangan membawa satu orang',
      body: 'Jadikan itu bagian normal dari permintaan: "Bawa teman yang mungkin menyukai ini." Undangan rujukan adalah cara jaringan kecil berlipat menjadi komunitas sungguhan.',
      joinOriginNote:
        'JoinOrigin memberi anggota satu rumah yang bisa dibagikan untuk komunitas — sehingga percakapan rujukan mengarah ke tautan nyata dan ruang nyata. Jadikan "bawa teman" bagian dari permintaan, dan beri mereka tautan untuk dibagikan.',
    },
    {
      title: 'Jalankan satu pertemuan pertama yang benar-benar baik',
      body: 'Habiskan energi Anda untuk pengalaman, bukan jumlah peserta: sambutan hangat, format yang jelas, dan waktu selesai yang pasti. Orang yang menikmati pertemuan pertama akan membawa sepuluh orang berikutnya.',
      joinOriginNote:
        'JoinOrigin tidak menjalankan acara — pengalaman itu milik Anda. Platform membantu komunitas terbentuk di sekitarnya: satu ruang yang bisa ditunjuk anggota setelahnya untuk menjaga koneksi tetap berlanjut.',
    },
    {
      title: 'Undang setiap peserta ke dalam ruang',
      body: 'Di akhir pertemuan, bagikan tautan bergabung dan tambahkan siapa pun yang ingin tetap terhubung. Ruang adalah tempat komunitas hidup di antara pertemuan — anggota yang bergabung dengan ruang adalah anggota yang cenderung kembali.',
      joinOriginNote:
        'JoinOrigin menjaga keanggotaan dan komunikasi komunitas Anda dalam satu ruang terorganisir alih-alih lembar pendaftaran. Tautan sederhana ke ruang memungkinkan tindak lanjut.',
    },
    {
      title: 'Tindak lanjuti dalam 24 jam dengan tanggal berikutnya',
      body: 'Ucapkan terima kasih kepada setiap peserta, bagikan ringkasan satu paragraf, dan konfirmasi pertemuan berikutnya — di ruang, di mana semua orang bisa melihatnya. Tindak lanjut adalah tempat peserta sekali jalan menjadi anggota.',
      joinOriginNote:
        'Di JoinOrigin tindak lanjut punya rumah alami — satu tempat di mana ringkasan dan tanggal berikutnya hidup. Ucapan terima kasih personal dalam 24 jam adalah yang mengubah peserta menjadi anggota.',
    },
    {
      title: 'Buat mengundang orang lain semudah mungkin',
      body: 'Beri anggota satu kalimat yang bisa mereka ulangi dan satu tautan yang bisa mereka bagikan: "Ini meetup bulanan untuk pendiri baru berbagi pelajaran — gabung di sini." Deskripsi pendek yang jelas adalah alat rekrutmen paling efektif.',
      joinOriginNote:
        'JoinOrigin memungkinkan komunitas dideskripsikan, ditemukan, dan diikuti dalam satu tempat — anggota bisa menunjuk orang ke ruang alih-alih menjelaskannya. Beri anggota satu kalimat dan satu tautan yang bisa mereka ulangi.',
    },
  ],
};

export default content;
