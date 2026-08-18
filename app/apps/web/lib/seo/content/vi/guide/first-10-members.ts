import type { GuideContent } from '../../types';

/**
 * "Cách Có 10 Thành viên Đầu tiên" — hướng dẫn cấp L1 dài hạn (design §6.1,
 * TASK-326).
 *
 * Tái trọng tâm vào mô hình kết nối → tham gia → phòng kỹ thuật số: phòng là
 * bề mặt tham gia — thành viên vào qua các liên kết mời và tham gia phòng của
 * nhóm, nơi cộng đồng thực sự sống. Giá trị JoinOrigin được đan vào phần mở
 * đầu và mỗi bước (joinOriginNote theo từng bước), với khung trung thực —
 * JoinOrigin không tuyển thành viên hoặc vận hành sự kiện. Một H1, cấu trúc
 * từng bước, FAQ được phản chiếu 1:1 trong JSON-LD "FAQPage". "Room" được gắn
 * với phòng Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'first-10-members',
  title: 'Cách Có 10 Thành viên Đầu tiên cho một Cộng đồng Mới hoặc Đang Phát triển | JoinOrigin',
  description:
    'Có 10 thành viên đầu tiên mà không cần ngân sách lớn — dù bạn đang khởi động một cộng đồng mới hay tái tiếp năng lượng một cộng đồng hiện hữu, bắt đầu từ mạng lưới cá nhân của bạn, chia sẻ các liên kết mời, và làm cho phòng trở thành nơi mọi người muốn tham gia. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Mười thành viên đầu tiên khó có được nhất và quan trọng nhất, vì họ định nghĩa văn hóa của một cộng đồng trước khi nó có bất kỳ danh tiếng nào để thu hút người lạ — và họ cũng quý giá không kém khi một cộng đồng hiện hữu đang trì trệ hoặc khởi động lại, vì một lõi cam kết là thứ biến một nhóm im lặng thành một nhóm sống động. Vấn đề mười người đầu tiên đó về cơ bản là một vấn đề kết nối con người, và nó là vấn đề cốt lõi JoinOrigin giải quyết.',
    'JoinOrigin là một hệ điều hành cộng đồng được xây dựng quanh vòng lặp kết nối → tham gia → phòng kỹ thuật số: bạn công bố một nhóm, phòng của nó tự động tạo, và thành viên tham gia qua một liên kết. Phòng là bề mặt tham gia — mọi người nhấp Tham gia hoặc theo một liên kết mời đều đặt chân vào phòng của nhóm, nơi duy nhất cộng đồng sống và nơi thành viên mới cảm thấy được kết nối ngay lập tức. JoinOrigin không tuyển thành viên hoặc vận hành sự kiện — phần đó là của bạn. Nền tảng làm cho việc khám phá và tham gia dễ dàng hơn đáng kể; tăng trưởng sớm vẫn đến từ tầm với cá nhân: những người bạn trực tiếp mời bằng một liên kết, những người họ mang theo, và những người ở lại vì phòng cảm thấy sống động.',
    'Hướng dẫn này chia vấn đề mười thành viên đầu tiên thành các bước cụ thể — dù bạn đang bắt đầu một cộng đồng mới hay hồi sinh một cộng đồng hiện hữu: bắt đầu từ những người bạn đã biết, công bố nhóm để nó có một phòng để tham gia, mời cá nhân bằng các liên kết, tổ chức một buổi tụ họp đầu tiên biến người tham dự thành người quảng bá, và xây dựng một thói quen giới thiệu đơn giản để mỗi thành viên mang người tiếp theo — và mỗi bước cho thấy JoinOrigin giúp ở đâu.',
  ],
  dataPoints: [
    'Lời mời cá nhân chuyển đổi với tỷ lệ cao hơn nhiều so với bài đăng công khai hoặc quảng cáo trả phí.',
    'Một liên kết mời xóa mọi rào cản: một cú nhấp và một thành viên mới đã ở trong phòng.',
    'Mười thành viên tích cực là đủ bằng chứng xã hội để hầu hết mọi người cảm thấy một nhóm là thực và đáng tham gia.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm hoặc bắt đầu cộng đồng — nó không tuyển thành viên hoặc vận hành sự kiện.',
  ],
  faq: [
    {
      question: 'Vì sao cụ thể là mười thành viên?',
      answer:
        'Mười là một điểm bùng phát: với mười người thường xuyên bạn có một phòng sôi động, một lõi đáng tin cậy cho thảo luận, và đủ bằng chứng xã hội để thu hút người mới mà lẽ ra sẽ do dự. Dưới mười, phòng cảm thấy mong manh.',
    },
    {
      question: 'Mất bao lâu để có mười thành viên đầu tiên?',
      answer:
        'Với lời mời cá nhân nhất quán và một buổi tụ họp đầu tiên tốt, hầu hết người tổ chức đạt mười thành viên cam kết trong ba đến sáu tuần. Chìa khóa là mời mỗi tuần — chia sẻ liên kết, theo dõi, và giữ phòng sôi động — không phải chờ một buổi ra mắt lớn.',
    },
    {
      question: 'Nếu tôi không có một mạng lưới cá nhân lớn thì sao?',
      answer:
        'Bắt đầu nhỏ hơn: mời năm người bạn biết, nhờ mỗi người mang theo một người, và đăng trong hai nhóm ngách nơi đối tượng của bạn đã tụ họp. Mỗi thành viên bạn giữ lại trở thành một kênh đến mạng lưới của riêng họ — và mỗi lời mời có thể là một liên kết đơn giản vào phòng.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi tìm thành viên không?',
      answer:
        'Có. JoinOrigin giúp mọi người khám phá và bắt đầu cộng đồng — một nơi những người đang tìm một nhóm có thể tìm thấy của bạn và tham gia phòng của nó qua một liên kết. Các bước trong hướng dẫn này — lời mời cá nhân và một buổi tụ họp đầu tiên tuyệt vời — là những cách đáng tin cậy nhất để tìm các thành viên đầu tiên của bạn.',
    },
  ],
  sections: [
    'Liệt kê năm mươi người bạn đã biết. Viết xuống bất kỳ ai phù hợp với mục đích của cộng đồng: bạn bè, đồng nghiệp, bạn cùng lớp, đồng nghiệp cũ, hàng xóm, và người quen trực tuyến. Bạn cần khoảng gấp năm lần số tên so với mười người bạn muốn. JoinOrigin cho cộng đồng của bạn một mái nhà hiện hữu và một phòng mọi người có thể tìm thấy — nhưng những cái tên đầu tiên vẫn đến từ những người bạn biết. Liệt kê năm mươi và coi mỗi người như một lời giới thiệu cá nhân.',
    'Công bố nhóm của bạn và mở phòng của nó. Một cộng đồng bạn không thể trỏ đến chưa tồn tại — và một cộng đồng có mái nhà phân tán qua các cuộc trò chuyện và danh sách gần như khó phát triển không kém. Công bố nhóm với một sứ mệnh rõ ràng, và để phòng của nó tự động tạo để có một nơi thực sự cho thành viên đặt chân đến. Công bố một nhóm trên JoinOrigin tự động tạo phòng của nó — phòng là bề mặt tham gia, và người sáng lập sở hữu nó từ đầu. Thiết lập nhóm và phòng của nó bằng những công cụ bạn đang dùng trước khi bạn mời bất kỳ ai nếu bạn thích.',
    'Mời cá nhân với một yêu cầu cụ thể và một liên kết. Gửi một tin nhắn ngắn nêu tên cộng đồng, ngày đầu tiên hoặc cuộc trò chuyện đầu tiên, và vì sao bạn nghĩ họ sẽ thích — và kèm liên kết tham gia. Tin nhắn cá nhân thắng bài đăng chung chung, và một ngày cụ thể thắng một lời hứa mơ hồ. JoinOrigin xóa ma sát của việc tham gia khi mọi người tìm thấy bạn — một liên kết, một cú nhấp, vào phòng. Một tin nhắn cá nhân ngắn với một ngày cụ thể và một liên kết chuyển đổi tốt hơn bất kỳ bài đăng công khai nào.',
    'Nhờ mọi người được mời mang theo một người. Biến nó thành một phần bình thường của lời mời: "Mang một người bạn có thể thích điều này." Lời mời giới thiệu là cách các mạng lưới nhỏ nhân lên thành các cộng đồng thực sự. JoinOrigin cho thành viên một mái nhà có thể chia sẻ duy nhất cho cộng đồng — để các cuộc trò chuyện giới thiệu trỏ đến một liên kết thực và một phòng thực. Biến "mang một người bạn" thành một phần của lời mời, và cho họ liên kết để chia sẻ.',
    'Tổ chức một buổi tụ họp đầu tiên thực sự tốt. Dành năng lượng của bạn cho trải nghiệm, không phải số lượng: một lời chào ấm áp, một hình thức rõ ràng, và một thời gian kết thúc xác định. Những người thích buổi tụ họp đầu tiên sẽ mang mười người tiếp theo. JoinOrigin không vận hành sự kiện — trải nghiệm là của bạn. Nền tảng giúp cộng đồng hình thành quanh nó: một phòng nơi thành viên có thể trỏ đến sau đó và duy trì kết nối.',
    'Mời mọi người tham dự vào phòng. Kết thúc buổi tụ họp, chia sẻ liên kết tham gia và thêm bất kỳ ai muốn ở lại. Phòng là nơi cộng đồng sống giữa các buổi tụ họp — một thành viên đã tham gia phòng là một thành viên có khả năng quay lại. JoinOrigin giữ tư cách thành viên và giao tiếp của cộng đồng bạn trong một phòng có tổ chức thay vì một bảng đăng ký. Một liên kết đơn giản vào phòng giữ cho việc theo dõi khả thi.',
    'Theo dõi trong vòng 24 giờ với một ngày tiếp theo. Cảm ơn mỗi người tham dự, chia sẻ một đoạn tóm tắt ngắn, và xác nhận buổi tụ họp tiếp theo — trong phòng, nơi mọi người có thể thấy. Việc theo dõi là nơi một người tham dự một lần trở thành thành viên. Trên JoinOrigin một lời theo dõi có một mái nhà tự nhiên — một nơi tóm tắt và ngày tiếp theo sống. Một lời cảm ơn cá nhân trong vòng 24 giờ là thứ biến một người tham dự thành thành viên.',
    'Làm cho việc mời người khác cực kỳ dễ dàng. Cho thành viên một câu họ có thể lặp lại và một liên kết họ có thể chia sẻ: "Đây là buổi gặp gỡ hàng tháng cho các nhà sáng lập mới để chia sẻ bài học — tham gia tại đây." Một mô tả ngắn, rõ ràng là công cụ tuyển dụng hiệu quả nhất. JoinOrigin cho phép một cộng đồng được mô tả, tìm thấy, và tham gia trong một nơi — thành viên có thể trỏ mọi người đến phòng thay vì giải thích nó. Cho thành viên một câu và một liên kết họ có thể lặp lại.',
  ],
  steps: [
    {
      title: 'Liệt kê năm mươi người bạn đã biết',
      body: 'Viết xuống bất kỳ ai phù hợp với mục đích của cộng đồng: bạn bè, đồng nghiệp, bạn cùng lớp, đồng nghiệp cũ, hàng xóm, và người quen trực tuyến. Bạn cần khoảng gấp năm lần số tên so với mười người bạn muốn.',
      joinOriginNote:
        'JoinOrigin cho cộng đồng của bạn một mái nhà hiện hữu và một phòng mọi người có thể tìm thấy — nhưng những cái tên đầu tiên vẫn đến từ những người bạn biết. Liệt kê năm mươi và coi mỗi người như một lời giới thiệu cá nhân.',
    },
    {
      title: 'Công bố nhóm của bạn và mở phòng của nó',
      body: 'Một cộng đồng bạn không thể trỏ đến chưa tồn tại — và một cộng đồng có mái nhà phân tán qua các cuộc trò chuyện và danh sách gần như khó phát triển không kém. Công bố nhóm với một sứ mệnh rõ ràng, và để phòng của nó tự động tạo để có một nơi thực sự cho thành viên đặt chân đến.',
      joinOriginNote:
        'Công bố một nhóm trên JoinOrigin tự động tạo phòng của nó — phòng là bề mặt tham gia, và người sáng lập sở hữu nó từ đầu. Thiết lập nhóm và phòng của nó bằng những công cụ bạn đang dùng trước khi bạn mời bất kỳ ai nếu bạn thích.',
    },
    {
      title: 'Mời cá nhân với một yêu cầu cụ thể và một liên kết',
      body: 'Gửi một tin nhắn ngắn nêu tên cộng đồng, ngày đầu tiên hoặc cuộc trò chuyện đầu tiên, và vì sao bạn nghĩ họ sẽ thích — và kèm liên kết tham gia. Tin nhắn cá nhân thắng bài đăng chung chung, và một ngày cụ thể thắng một lời hứa mơ hồ.',
      joinOriginNote:
        'JoinOrigin xóa ma sát của việc tham gia khi mọi người tìm thấy bạn — một liên kết, một cú nhấp, vào phòng. Một tin nhắn cá nhân ngắn với một ngày cụ thể và một liên kết chuyển đổi tốt hơn bất kỳ bài đăng công khai nào.',
    },
    {
      title: 'Nhờ mọi người được mời mang theo một người',
      body: 'Biến nó thành một phần bình thường của lời mời: "Mang một người bạn có thể thích điều này." Lời mời giới thiệu là cách các mạng lưới nhỏ nhân lên thành các cộng đồng thực sự.',
      joinOriginNote:
        'JoinOrigin cho thành viên một mái nhà có thể chia sẻ duy nhất cho cộng đồng — để các cuộc trò chuyện giới thiệu trỏ đến một liên kết thực và một phòng thực. Biến "mang một người bạn" thành một phần của lời mời, và cho họ liên kết để chia sẻ.',
    },
    {
      title: 'Tổ chức một buổi tụ họp đầu tiên thực sự tốt',
      body: 'Dành năng lượng của bạn cho trải nghiệm, không phải số lượng: một lời chào ấm áp, một hình thức rõ ràng, và một thời gian kết thúc xác định. Những người thích buổi tụ họp đầu tiên sẽ mang mười người tiếp theo.',
      joinOriginNote:
        'JoinOrigin không vận hành sự kiện — trải nghiệm là của bạn. Nền tảng giúp cộng đồng hình thành quanh nó: một phòng nơi thành viên có thể trỏ đến sau đó và duy trì kết nối.',
    },
    {
      title: 'Mời mọi người tham dự vào phòng',
      body: 'Kết thúc buổi tụ họp, chia sẻ liên kết tham gia và thêm bất kỳ ai muốn ở lại. Phòng là nơi cộng đồng sống giữa các buổi tụ họp — một thành viên đã tham gia phòng là một thành viên có khả năng quay lại.',
      joinOriginNote:
        'JoinOrigin giữ tư cách thành viên và giao tiếp của cộng đồng bạn trong một phòng có tổ chức thay vì một bảng đăng ký. Một liên kết đơn giản vào phòng giữ cho việc theo dõi khả thi.',
    },
    {
      title: 'Theo dõi trong vòng 24 giờ với một ngày tiếp theo',
      body: 'Cảm ơn mỗi người tham dự, chia sẻ một đoạn tóm tắt ngắn, và xác nhận buổi tụ họp tiếp theo — trong phòng, nơi mọi người có thể thấy. Việc theo dõi là nơi một người tham dự một lần trở thành thành viên.',
      joinOriginNote:
        'Trên JoinOrigin một lời theo dõi có một mái nhà tự nhiên — một nơi tóm tắt và ngày tiếp theo sống. Một lời cảm ơn cá nhân trong vòng 24 giờ là thứ biến một người tham dự thành thành viên.',
    },
    {
      title: 'Làm cho việc mời người khác cực kỳ dễ dàng',
      body: 'Cho thành viên một câu họ có thể lặp lại và một liên kết họ có thể chia sẻ: "Đây là buổi gặp gỡ hàng tháng cho các nhà sáng lập mới để chia sẻ bài học — tham gia tại đây." Một mô tả ngắn, rõ ràng là công cụ tuyển dụng hiệu quả nhất.',
      joinOriginNote:
        'JoinOrigin cho phép một cộng đồng được mô tả, tìm thấy, và tham gia trong một nơi — thành viên có thể trỏ mọi người đến phòng thay vì giải thích nó. Cho thành viên một câu và một liên kết họ có thể lặp lại.',
    },
  ],
};

export default content;
