import type { GuideContent } from '../../types';

/**
 * "Cách Công bố một Ý tưởng Khởi nghiệp" — hướng dẫn cấp L1 dài hạn
 * (design §6.1, TASK-353).
 *
 * Viết theo vòng lặp cốt lõi màn hình sản phẩm §2: công bố một ý tưởng
 * khởi nghiệp → trang ý tưởng công khai → Tham gia qua liên kết → phòng tự
 * tạo NGAY KHI CÔNG BỐ → người sáng lập kiểm soát phòng → bảng tin/mời phát
 * triển. Trang ý tưởng là lời hứa công khai của ý tưởng; phòng là nơi
 * những người tin tưởng sớm, đồng sáng lập tiềm năng, và người thử nghiệm
 * đầu tiên tụ họp quanh startup. Nền tảng đã hoạt động: công bố một ý
 * tưởng tạo trang và phòng ngay bây giờ. "Room" được gắn với phòng Matrix
 * (§6.3). Cụm từ này không bao giờ được dùng trong văn bản chính thức.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'publish-a-startup-concept',
  title: 'Cách Công bố một Ý tưởng Khởi nghiệp: Trang Ý tưởng + Phòng | JoinOrigin',
  description:
    'Công bố một ý tưởng khởi nghiệp trên JoinOrigin — dù bạn đang ở giai đoạn ý tưởng hay đã vận hành một công ty — viết một trang ý tưởng công khai, mở phòng của nó tự động, và tụ họp những người tin tưởng sớm, đồng sáng lập, và người thử nghiệm đầu tiên quanh ý tưởng. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Mọi startup — dù vẫn còn là một ý tưởng trên giấy hay đã vận hành với khách hàng — cần con người hơn là cần vốn: một nhà sáng lập có thể xây dựng nó, một đội có thể hoàn thành nó, và người dùng sẽ thử nghiệm nó. Một startup không ai tìm thấy sẽ không tụ họp được điều nào trong số đó. Công bố ý tưởng như một trang ý tưởng dễ tìm, rồi mở một phòng nơi cuộc trò chuyện có thể diễn ra, là bước đầu tiên trung thực của việc xây dựng một startup — không phải bản thuyết trình, không phải logo, không phải lời chào hàng — và nó hoạt động tốt không kém cho một công ty hiện hữu muốn thêm những người tin tưởng, đồng sáng lập, và người thử nghiệm quanh những gì nó đang xây dựng.',
    'Vòng lặp JoinOrigin hoạt động như thế này: bạn công bố một ý tưởng khởi nghiệp, trang ý tưởng công khai của nó xuất hiện, và phòng của nó được tự động tạo tại thời điểm công bố. Mọi người khám phá trang hoặc theo một liên kết, việc tham gia chỉ là một cú nhấp, và họ đặt chân vào phòng — một phòng Matrix do người sáng lập kiểm soát, nơi những người tin tưởng sớm có thể đặt câu hỏi, đồng sáng lập tiềm năng có thể kiểm tra mức độ phù hợp, và người dùng đầu tiên có thể cho phản hồi. Người sáng lập sở hữu phòng từ giây đầu tiên và quyết định ai tham gia và điều gì xảy ra bên trong.',
    'Hướng dẫn này đi qua việc công bố một ý tưởng khởi nghiệp như một người vận hành — dù ý tưởng hoàn toàn mới hay công ty đã đang chạy: nén ý tưởng thành một câu, viết trang với các tín hiệu trung thực, công bố nó và mở phòng, chia sẻ nó với các cộng đồng nhà sáng lập, mời những người tin tưởng và thử nghiệm sớm, tổ chức các cuộc trò chuyện có cấu trúc, dùng phòng để hình thành một đội thử nghiệm, và đưa phòng vào bảng tin khi ý tưởng được xác nhận.',
  ],
  dataPoints: [
    'Một ý tưởng khởi nghiệp nén trong một câu dễ chia sẻ, thử nghiệm, và thu hút người hơn một kế hoạch kinh doanh dài.',
    'Trên JoinOrigin, công bố một ý tưởng tự động tạo phòng của nó — startup có một nơi cho những người tin tưởng và thử nghiệm từ đầu.',
    'Một liên kết tham gia là lời mời đơn giản nhất: một liên kết, một cú nhấp, và một người quan tâm đã ở trong phòng.',
    'JoinOrigin là một hệ điều hành cộng đồng giúp mọi người tìm thấy ý tưởng và những người đứng sau chúng — công bố ý tưởng của bạn và phòng của nó mở ngay lập tức.',
  ],
  faq: [
    {
      question: 'Một ý tưởng khởi nghiệp khác một trang ý tưởng kinh doanh nhỏ như thế nào?',
      answer:
        'Định dạng trang là giống nhau, nhưng trọng tâm thay đổi: một ý tưởng kinh doanh nhỏ tập trung vào một khách hàng và một đề xuất, trong khi một ý tưởng khởi nghiệp tập trung vào một vấn đề đầy tham vọng và đội ngũ cần thiết để giải quyết nó. Một trang startup thu hút những người tin tưởng sớm, đồng sáng lập tiềm năng, và người thử nghiệm đầu tiên thay vì khách hàng địa phương.',
    },
    {
      question: 'Phòng được tạo khi nào cho ý tưởng khởi nghiệp của tôi?',
      answer:
        'Phòng được tự động tạo ngay khi bạn công bố ý tưởng. Người sáng lập sở hữu phòng từ giây đầu tiên và có thể mời, xóa, và gán vai trò bên trong Element. Bạn cũng có thể mở một phòng bằng những công cụ bạn đang dùng và mời những người chia sẻ tham vọng.',
    },
    {
      question: 'Ai nên tham gia một phòng ý tưởng khởi nghiệp?',
      answer:
        'Những người tin tưởng sớm chia sẻ vấn đề, đồng sáng lập tiềm năng đang kiểm tra mức độ phù hợp, và người dùng đầu tiên sẵn lòng thử một phiên bản thô. Phòng là nơi bạn tìm những người biến một ý tưởng thành một đội — những người mà lời giới thiệu ấm áp có thể mất nhiều tháng để tiếp cận.',
    },
    {
      question: 'Điều gì làm nên một trang ý tưởng khởi nghiệp tốt?',
      answer:
        'Một câu trung thực về vấn đề và cách tiếp cận, giai đoạn của ý tưởng, và sự giúp đỡ cụ thể bạn cần — một người xây dựng, một nhà thiết kế, một chuyên gia lĩnh vực, người thử nghiệm đầu tiên. Sự trung thực về giai đoạn thu hút đúng người; phóng đại không thu hút ai.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi công bố một ý tưởng khởi nghiệp ngay hôm nay không?',
      answer:
        'Có. Công bố một ý tưởng trên JoinOrigin tạo trang và phòng của nó một cách nguyên tử — phòng mở ngay khi bạn công bố, và bạn kiểm soát nó từ đầu. Công bố ý tưởng ở một nơi công khai và mở một phòng để thảo luận; mỗi thành viên mới bạn mời sẽ mở rộng tầm với của bạn.',
    },
  ],
  sections: [
    'Nén ý tưởng thành một câu. Rút gọn startup về cốt lõi: vấn đề, cách tiếp cận, và nó dành cho ai. Nếu bạn không thể nói nó trong một câu, ý tưởng chưa sẵn sàng để công bố. JoinOrigin được thiết kế quanh các trang ý tưởng dễ tìm, và một lời chào hàng một câu là cốt lõi của trang. Viết câu đó xuống và thử nghiệm nó với ba người hiểu vấn đề.',
    'Viết trang với các tín hiệu trung thực. Nêu vấn đề, cách tiếp cận, giai đoạn — ý tưởng, nguyên mẫu, hoặc sản phẩm — và sự giúp đỡ cụ thể bạn cần. Sự trung thực thu hút đúng người. Công bố một ý tưởng trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Phác thảo trang như một bài đăng công khai ngắn và lặp lại với phản hồi.',
    'Công bố ý tưởng và mở phòng của nó. Công bố là khoảnh khắc ý tưởng trở nên dễ tìm. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó. Trên JoinOrigin trang, phòng, và liên kết tham gia là một lần công bố. Công bố ý tưởng công khai và mở một phòng cho cuộc trò chuyện quanh nó.',
    'Chia sẻ ý tưởng với các cộng đồng nhà sáng lập. Các startup phát triển qua mạng lưới nhà sáng lập. Chia sẻ trang ý tưởng với các nhóm nhà sáng lập, cộng đồng khởi nghiệp, vườn ươm, và bất kỳ ai biết vấn đề. Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến ý tưởng của bạn là đủ.',
    'Mời những người tin tưởng và thử nghiệm sớm. Mời những người chia sẻ tham vọng: đồng sáng lập tiềm năng, chuyên gia lĩnh vực, và người dùng sẵn lòng thử một phiên bản thô. JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một ý tưởng có thể tìm thấy ý tưởng của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi người tham gia trở thành một kênh đến mạng lưới của riêng họ.',
    'Tổ chức các cuộc trò chuyện có cấu trúc trong phòng. Hỏi những người tham gia điều gì làm họ hào hứng, điều gì làm họ lo lắng, và họ sẽ làm gì đầu tiên. Một phòng startup là một cuộc phỏng vấn liên tục — các câu trả lời định hình ý tưởng. JoinOrigin không vận hành các cuộc trò chuyện này; phòng là của bạn để định hình. Nền tảng mang lại cho ý tưởng một phòng nơi quan tâm trở thành hiểu biết, và người sáng lập sở hữu phòng đó. Tổ chức các cuộc trò chuyện trực tiếp trong phòng.',
    'Dùng phòng để hình thành một đội thử nghiệm. Khi đúng người xuất hiện, đề xuất một thử nghiệm nhỏ — một nguyên mẫu, một trang đích, hoặc một buổi làm việc — và xem đội làm việc cùng nhau như thế nào. JoinOrigin mang lại cho Origins một phòng chung cho công việc và dự án của họ, một nơi tự nhiên để một thử nghiệm xuất hiện. Một nguyên mẫu thực tế nhỏ là bài kiểm tra mức độ phù hợp đáng tin cậy nhất.',
    'Đưa phòng vào bảng tin khi bạn xác nhận. Tiếp tục đăng cập nhật, giữ phòng sống, và để đà của ý tưởng trở nên hiện hữu với một mạng lưới rộng hơn. Bảng tin biến một ý tưởng thành bằng chứng mọi người quan tâm. Trên JoinOrigin cập nhật phòng chảy vào bảng tin — vòng lặp tăng trưởng nơi mỗi thành viên mới mở rộng bề mặt khám phá. Được khám phá và phát triển.',
  ],
  steps: [
    {
      title: 'Nén ý tưởng thành một câu',
      body: 'Rút gọn startup về cốt lõi: vấn đề, cách tiếp cận, và nó dành cho ai. Nếu bạn không thể nói nó trong một câu, ý tưởng chưa sẵn sàng để công bố.',
      joinOriginNote:
        'JoinOrigin được thiết kế quanh các trang ý tưởng dễ tìm, và một lời chào hàng một câu là cốt lõi của trang. Viết câu đó xuống và thử nghiệm nó với ba người hiểu vấn đề.',
    },
    {
      title: 'Viết trang với các tín hiệu trung thực',
      body: 'Nêu vấn đề, cách tiếp cận, giai đoạn — ý tưởng, nguyên mẫu, hoặc sản phẩm — và sự giúp đỡ cụ thể bạn cần. Sự trung thực thu hút đúng người.',
      joinOriginNote:
        'Công bố một ý tưởng trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Phác thảo trang như một bài đăng công khai ngắn và lặp lại với phản hồi.',
    },
    {
      title: 'Công bố ý tưởng và mở phòng của nó',
      body: 'Công bố là khoảnh khắc ý tưởng trở nên dễ tìm. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó.',
      joinOriginNote:
        'Trên JoinOrigin trang, phòng, và liên kết tham gia là một lần công bố. Công bố ý tưởng công khai và mở một phòng cho cuộc trò chuyện quanh nó.',
    },
    {
      title: 'Chia sẻ ý tưởng với các cộng đồng nhà sáng lập',
      body: 'Các startup phát triển qua mạng lưới nhà sáng lập. Chia sẻ trang ý tưởng với các nhóm nhà sáng lập, cộng đồng khởi nghiệp, vườn ươm, và bất kỳ ai biết vấn đề.',
      joinOriginNote:
        'Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến ý tưởng của bạn là đủ.',
    },
    {
      title: 'Mời những người tin tưởng và thử nghiệm sớm',
      body: 'Mời những người chia sẻ tham vọng: đồng sáng lập tiềm năng, chuyên gia lĩnh vực, và người dùng sẵn lòng thử một phiên bản thô.',
      joinOriginNote:
        'JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một ý tưởng có thể tìm thấy ý tưởng của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi người tham gia trở thành một kênh đến mạng lưới của riêng họ.',
    },
    {
      title: 'Tổ chức các cuộc trò chuyện có cấu trúc trong phòng',
      body: 'Hỏi những người tham gia điều gì làm họ hào hứng, điều gì làm họ lo lắng, và họ sẽ làm gì đầu tiên. Một phòng startup là một cuộc phỏng vấn liên tục — các câu trả lời định hình ý tưởng.',
      joinOriginNote:
        'JoinOrigin không vận hành các cuộc trò chuyện này; phòng là của bạn để định hình. Nền tảng mang lại cho ý tưởng một phòng nơi quan tâm trở thành hiểu biết, và người sáng lập sở hữu phòng đó. Tổ chức các cuộc trò chuyện trực tiếp trong phòng.',
    },
    {
      title: 'Dùng phòng để hình thành một đội thử nghiệm',
      body: 'Khi đúng người xuất hiện, đề xuất một thử nghiệm nhỏ — một nguyên mẫu, một trang đích, hoặc một buổi làm việc — và xem đội làm việc cùng nhau như thế nào.',
      joinOriginNote:
        'JoinOrigin mang lại cho Origins một phòng chung cho công việc và dự án của họ, một nơi tự nhiên để một thử nghiệm xuất hiện. Một nguyên mẫu thực tế nhỏ là bài kiểm tra mức độ phù hợp đáng tin cậy nhất.',
    },
    {
      title: 'Đưa phòng vào bảng tin khi bạn xác nhận',
      body: 'Tiếp tục đăng cập nhật, giữ phòng sống, và để đà của ý tưởng trở nên hiện hữu với một mạng lưới rộng hơn. Bảng tin biến một ý tưởng thành bằng chứng mọi người quan tâm.',
      joinOriginNote:
        'Trên JoinOrigin cập nhật phòng chảy vào bảng tin — vòng lặp tăng trưởng nơi mỗi thành viên mới mở rộng bề mặt khám phá. Được khám phá và phát triển.',
    },
  ],
};

export default content;
