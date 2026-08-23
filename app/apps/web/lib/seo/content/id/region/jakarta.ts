import type { RegionContent } from '../../types';

/**
 * Konten halaman wilayah Jakarta — terjemahan bahasa Indonesia
 * (file konten per-locale).
 *
 * Jakarta adalah daerah khusus ibu kota — wilayah admin-1 dan kota
 * adalah entitas yang sama. Halaman ini mencakup lanskap metropolitan;
 * halaman kota mencakup suasana urban secara detail.
 */
const content: RegionContent = {
  kind: 'region',
  locale: 'id',
  slug: 'jakarta',
  title: 'Komunitas di Jakarta | JoinOrigin',
  description:
    'Temukan atau mulai komunitas di Jakarta — ekosistem startup, dunia kreatif di Kemang dan Senopati, serta jaringan profesional di Sudirman. Bergabunglah dengan JoinOrigin.',
  intro:
    'Jakarta adalah daerah khusus ibu kota, yang berarti wilayah dan kota adalah entitas administratif yang sama — dan seluruh ibu kota nasional berfungsi sebagai satu lanskap komunitas urban yang padat. Lebih dari sepuluh juta orang tinggal di dalam batas kota, dan wilayah metropolitan yang lebih luas menjangkau jauh ke kota-kota satelit di provinsi sekitarnya, menjadikan Jakarta pusat ekonomi dan sosial Indonesia yang tak terbantahkan. Distrik-distrik kota membentuk komunitasnya dengan cara yang berbeda: kawasan bisnis pusat Sudirman dan Thamrin menjadi pusat jaringan korporasi dan keuangan, sementara Jakarta Selatan — terutama Kemang, Senopati, dan SCBD — menampung dunia kreatif, kuliner, dan hiburan malam. Ekosistem startup, salah satu yang terbesar di Asia Tenggara, berkerumun di ruang kerja bersama di seluruh kota dan di pusat teknologi di sekitarnya, dengan pertemuan pendiri, hackathon, dan hari demo yang berjalan sepanjang tahun. Bahasa Indonesia adalah bahasa kerja, dan koordinasi komunitas sangat bergantung pada aplikasi pesan dan media sosial. Bagi siapa pun yang membangun karier atau komunitas di Indonesia, Jakarta adalah tempat energi profesional negara ini terkonsentrasi — padat, cepat, dan penuh peluang bagi mereka yang hadir.',
  dataPoints: [
    'Jakarta adalah daerah khusus ibu kota (DKI Jakarta) dan ibu kota nasional.',
    'Populasi lebih dari sepuluh juta, dengan wilayah metropolitan yang jauh lebih besar.',
    'Pusat ekonomi Indonesia dan rumah bagi salah satu ekosistem startup terbesar di Asia Tenggara.',
    'Distrik Jakarta Selatan seperti Kemang dan Senopati menjadi pusat dunia kreatif dan kuliner.',
  ],
  faq: [
    {
      question: 'Apakah wilayah Jakarta berbeda dengan suasana kota Jakarta?',
      answer:
        'Tidak. Jakarta adalah daerah khusus ibu kota, jadi wilayah dan kota saling tumpang tindih sepenuhnya. Halaman ini mencakup lanskap metropolitan, sementara halaman kota Jakarta membahas distrik, tempat, dan tipe kelompok secara spesifik.',
    },
    {
      question: 'Distrik Jakarta mana yang memiliki komunitas paling aktif?',
      answer:
        'Sudirman dan Thamrin menjadi pusat jaringan korporasi dan profesional; Kemang, Senopati, dan SCBD di Jakarta Selatan menampung komunitas kreatif dan kuliner; dan dunia startup berkerumun di ruang kerja bersama di seluruh kota.',
    },
    {
      question: 'Apakah JoinOrigin beroperasi di Jakarta?',
      answer:
        'Ya. JoinOrigin tidak memiliki kantor lokal. Platform ini membantu orang menemukan atau memulai komunitas di mana pun di Jakarta, dan halaman Jakarta diterjemahkan ke bahasa Indonesia untuk melayani audiens lokal.',
    },
  ],
};

export default content;
