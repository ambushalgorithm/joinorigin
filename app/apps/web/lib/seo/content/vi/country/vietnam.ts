import type { CountryContent } from '../../types';

/**
 * Nội dung trang quốc gia Việt Nam — bản dịch tiếng Việt
 * (tệp nội dung theo ngôn ngữ).
 *
 * Văn xuôi trung thực, lâu bền về cộng đồng Việt Nam — năng lượng năng
 * động của TP.HCM và Hà Nội, văn hóa cà phê gắn kết các buổi gặp gỡ,
 * và truyền thống tình làng nghĩa xóm. Không có con số bịa đặt.
 */
const content: CountryContent = {
  kind: 'country',
  locale: 'vi',
  slug: 'vietnam',
  title: 'Origin tại Việt Nam | JoinOrigin',
  description:
    'Tìm hoặc bắt đầu Origin tại Việt Nam — từ hệ sinh thái khởi nghiệp ở TP.HCM đến các mạng lưới doanh nghiệp nhỏ trên toàn quốc. Tham gia JoinOrigin ngay hôm nay.',
  intro:
    'Cộng đồng Việt Nam còn trẻ, vận động nhanh và tập trung vào hai cực đô thị khổng lồ: TP.HCM ở phía nam và Hà Nội ở phía bắc. TP.HCM, trung tâm thương mại của đất nước, sở hữu hệ sinh thái khởi nghiệp sôi động nhất — các buổi gặp gỡ founder, cộng đồng lập trình viên và tập thể thiết kế lấp đầy không gian làm việc chung và quán cà phê khắp Quận 1, Quận 3 và các quận mới phía đông. Văn hóa cà phê Việt Nam là chất keo xã hội: vô số nhóm chỉ đơn giản gặp nhau tại một quán quen, nơi một chiếc bàn trở thành điểm hẹn thường xuyên trong tuần. Đời sống cộng đồng cũng dựa trên truyền thống sâu sắc — văn hóa tương trợ hàng xóm (tình làng nghĩa xóm) và lịch lễ hội Tết cùng các dịp khác giữ cho mọi người kết nối ngoài vòng chuyên môn. Tiếng Việt là ngôn ngữ chính, tiếng Anh phổ biến trong giới trẻ chuyên nghiệp và cộng đồng quốc tế. Với bất kỳ ai đang xây dựng sự nghiệp hay một cộng đồng, Việt Nam ghi nhận sự năng nổ và kiên định: môi trường cởi mở, chi phí buổi gặp đầu tiên thấp, và mọi người phản hồi tốt với sự nhiệt tình thật sự.',
  dataPoints: [
    'Dân số khoảng 95,5 triệu người.',
    'Tiếng Việt là ngôn ngữ chính, tiếng Anh được học rộng rãi.',
    'Thủ đô là Hà Nội; TP.HCM là trung tâm thương mại.',
    'TP.HCM là trung tâm nội dung chính trong bộ thành phố hiện tại.',
  ],
  faq: [
    {
      question: 'Làm thế nào để tìm Origin tại Việt Nam?',
      answer:
        'Bắt đầu từ hub /location và chọn trang TP.HCM, sau đó khám phá các trang nhóm — khởi nghiệp, sáng tạo, chính trị, meetup và doanh nghiệp nhỏ. Nhiều nhóm cũng điều phối qua ứng dụng nhắn tin và mạng xã hội.',
    },
    {
      question: 'Tình làng nghĩa xóm là gì?',
      answer:
        'Đó là truyền thống tương thân tương ái của người Việt — giúp đỡ hàng xóm trong việc cưới hỏi, ma chay và nhu cầu hằng ngày, đồng thời chia sẻ tinh thần tập thể của đời sống làng xã. Điều này khiến các dự án địa phương và nhóm tương trợ trở thành một phần tự nhiên của sự tham gia cộng đồng.',
    },
    {
      question: 'JoinOrigin có hoạt động tại Việt Nam không?',
      answer:
        'Có. JoinOrigin không có văn phòng địa phương. Nền tảng giúp mọi người tìm hoặc bắt đầu Origins ở bất kỳ đâu tại Việt Nam, và trang TP.HCM được dịch sang tiếng Việt để phục vụ người dùng địa phương.',
    },
  ],
};

export default content;
