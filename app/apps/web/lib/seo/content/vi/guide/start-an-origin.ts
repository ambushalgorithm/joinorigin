import type { GuideContent } from '../../types';

/**
 * "Cách Bắt đầu một Origin" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-326).
 *
 * Tái trọng tâm vào mô hình kết nối → tham gia → phòng kỹ thuật số: công bố
 * nhóm → phòng tự tạo khi công bố → thành viên tham gia qua liên kết; hướng
 * dẫn về địa điểm/hình thức vẫn là hệ quả phía sau, không bao giờ là cốt lõi.
 * Giá trị JoinOrigin được đan vào phần mở đầu và mỗi bước (joinOriginNote theo
 * từng bước), với khung trung thực — JoinOrigin không vận hành sự kiện địa
 * phương. Một H1, cấu trúc từng bước, FAQ được phản chiếu 1:1 trong JSON-LD
 * "FAQPage". "Room" được gắn với phòng Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'start-an-origin',
  title: 'Cách Bắt đầu một Origin: Hướng dẫn Từng bước | JoinOrigin',
  description:
    'Học cách bắt đầu một Origin — hoặc cho một Origin hiện hữu một mái nhà kỹ thuật số duy nhất — công bố một nhóm, mở phòng của nó, và đưa thành viên vào qua một liên kết tham gia. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Phần khó nhất của việc bắt đầu một Origin hiếm khi là địa điểm, chương trình, hay ngân sách — mà là tìm những người đầu tiên chia sẻ sở thích của bạn và cho họ một nơi rõ ràng để kết nối. Đó chính xác là vấn đề JoinOrigin giải quyết.',
    'JoinOrigin là một hệ điều hành cộng đồng được xây dựng quanh vòng lặp kỹ thuật số: bạn công bố một nhóm, phòng của nó tự động tạo, và thành viên tham gia qua một liên kết. Phòng là nơi cộng đồng thực sự sống — một phòng Matrix do người sáng lập kiểm soát nơi thành viên trò chuyện, chia sẻ cập nhật, và lên kế hoạch cùng nhau từ ngày đầu tiên, thay vì phân tán qua bảng tính, tin nhắn rải rác, và biểu mẫu đăng ký. Sự kiện trực tiếp chỉ tồn tại như một hệ quả phía sau: một khi nhóm hình thành và phòng của nó sống động, thành viên có thể chọn gặp mặt trực tiếp — và JoinOrigin không vận hành sự kiện địa phương. Toàn bộ ý nghĩa của nền tảng là kết nối những người không bao giờ gặp nhau, đó là lý do mỗi bước trong hướng dẫn này ánh xạ vào điều JoinOrigin giúp.',
    'Cách tiếp cận này hiệu quả với mọi loại Origin: một vòng tròn nhà sáng lập, một câu lạc bộ sách, một nhóm chạy địa phương, một mạng lưới doanh nghiệp nhỏ, hoặc một Origin chuyên môn trực tuyến — và nó hiệu quả dù bạn bắt đầu từ con số không hay chính thức hóa một nhóm đã gặp gỡ thân mật. Nguyên tắc cốt lõi đơn giản — mọi người tham gia vì một lời hứa rõ ràng, và họ ở lại vì trải nghiệm đáng tin cậy thực hiện lời hứa đó. Bạn không cần ngân sách lớn, một địa điểm, hay một lượng khán giả sẵn có để bắt đầu; bạn cần một mục đích rõ ràng, một bước đầu tiên thực tế, và kỷ luật lặp lại nó.',
  ],
  dataPoints: [
    'Hầu hết Origins thành công bắt đầu với một đối tượng hẹp, cụ thể thay vì "mọi người quan tâm".',
    'Công bố một nhóm tạo phòng của nó ngay lập tức — không bao giờ có bước "tạo trò chuyện sau".',
    'Một liên kết tham gia là lời mời đơn giản nhất: một liên kết, một cú nhấp, và một thành viên mới đã ở trong phòng.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm hoặc bắt đầu cộng đồng — nó không vận hành sự kiện địa phương hoặc tuyên bố có nhân viên địa phương.',
  ],
  faq: [
    {
      question: 'Mất bao lâu để bắt đầu một Origin?',
      answer:
        'Bạn có thể công bố một nhóm và mở phòng của nó trong vài tuần nếu bạn giữ phạm vi nhỏ: một mục đích, một liên kết tham gia, và một dòng lời mời cá nhân đều đặn. Bản thân Origin mất vài tháng tham gia nhất quán trong phòng trước khi nó cảm thấy được thiết lập.',
    },
    {
      question: 'Tôi có cần tiền hoặc một địa điểm để bắt đầu không?',
      answer:
        'Không. Cốt lõi kỹ thuật số của một Origin — một nhóm được công bố và phòng của nó — không tốn gì và không cần địa điểm. Nhiều nhóm sau đó chọn gặp mặt trực tiếp; thư viện, quán cà phê, công viên, và phòng khách không gian làm việc chung tổ chức các buổi gặp đầu tiên miễn phí ở hầu hết thành phố.',
    },
    {
      question: 'Sai lầm phổ biến nhất khi bắt đầu một Origin là gì?',
      answer:
        'Cố phục vụ tất cả mọi người. Một Origin với mục đích mơ hồ thu hút ít thành viên cam kết. Xác định một đối tượng cụ thể và một kết quả rõ ràng, đặt nó trên trang nhóm, và để Origin phát triển từ đó.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi bắt đầu một Origin như thế nào?',
      answer:
        'Công bố một nhóm trên JoinOrigin tự động tạo phòng của nó và thành viên tham gia qua một liên kết — một mái nhà kỹ thuật số có tổ chức cho mục đích, con người, và cuộc trò chuyện của Origin. JoinOrigin không vận hành sự kiện địa phương, vì vậy các bước thực tế trong hướng dẫn này hoạt động trên nền tảng và với những công cụ bạn đã có.',
    },
  ],
  sections: [
    'Xác định một mục đích rõ ràng. Quyết định Origin dành cho ai, nó giải quyết vấn đề gì, và một thành viên thành công trông như thế nào. Viết một sứ mệnh một câu như "một nhóm cho các nhà sáng lập mới ở Brooklyn để chia sẻ bài học giai đoạn đầu". JoinOrigin cho mục đích của bạn một mái nhà — một trang nhóm công khai nơi sứ mệnh, đối tượng, và lời hứa hiện hữu với bất kỳ ai tìm kiếm một nhóm như của bạn. Viết sứ mệnh xuống và giữ nó trước mặt mọi lời mời.',
    'Công bố nhóm và mở phòng của nó. Cốt lõi kỹ thuật số của một Origin là một nhóm được công bố với một phòng nơi thành viên có thể trò chuyện. Trên JoinOrigin, công bố một nhóm tự động tạo phòng của nó — người sáng lập sở hữu nó từ giây đầu tiên và có thể mời, xóa, và gán vai trò bên trong Element. Trên JoinOrigin không có bước "tạo trò chuyện sau": công bố nhóm và phòng tồn tại ngay lập tức, với người sáng lập là chủ phòng. Thiết lập mái nhà nhóm và phòng của nó bằng những công cụ bạn đang dùng nếu bạn thích.',
    'Chia sẻ liên kết tham gia của bạn. Một liên kết tham gia là lời mời đơn giản nhất tồn tại: một liên kết, một cú nhấp, và một thành viên mới đặt chân vào phòng. Đặt liên kết ở mọi nơi — trang nhóm của bạn, tin nhắn cá nhân, và những nơi đối tượng của bạn đã tụ họp. Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến nhóm của bạn là đủ.',
    'Mời mười người đầu tiên của bạn một cách cá nhân. Lời mời cá nhân chuyển đổi tốt hơn nhiều so với bài đăng công khai. Nhắn tin cho bạn bè, đồng nghiệp, và người quen phù hợp với đối tượng, chia sẻ liên kết tham gia, và nhờ họ mang theo một người khác. JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một Origin có thể tìm thấy của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi thành viên bạn mời trở thành một kênh đến mạng lưới của riêng họ.',
    'Chọn một hình thức và nhịp độ (một lựa chọn phía sau). Một khi nhóm đang hình thành, chọn một hình thức định kỳ — một buổi thảo luận hàng tháng, một buổi làm việc hàng tuần, một buổi nói chuyện, hoặc một buổi đi bộ giao lưu. Định kỳ thắng một lần vì thói quen là thứ biến người lạ thành thành viên. Đây là một lựa chọn phía sau: nhóm có thể gặp mặt trực tiếp sau này, nhưng phòng đã là mái nhà của Origin. Trên JoinOrigin người tổ chức có thể mô tả hình thức của họ một lần và thành viên có thể thấy điều mong đợi trước khi họ tham gia — giảm sự do dự ngăn người lần đầu. Chọn hình thức của bạn và nêu nó trong mọi lời mời.',
    'Tổ chức một buổi tụ họp đầu tiên tuyệt vời. Nếu thành viên chọn gặp mặt trực tiếp — đến sớm, chào mọi người, chạy một vòng giới thiệu ngắn, và kết thúc với một ngày rõ ràng tiếp theo. Mục tiêu của buổi gặp đầu tiên không phải quy mô; mà là mọi người rời đi với mong muốn quay lại. JoinOrigin không bố trí nhân sự hoặc vận hành các buổi tụ họp — trải nghiệm là của bạn để thiết kế. Nền tảng giúp Origin hình thành quanh nó: một phòng chung nơi ngày, tóm tắt, và các bước tiếp theo sống.',
    'Thu thập phản hồi và lặp lại. Sau những tuần đầu tiên, hỏi thành viên họ muốn nhiều hoặc ít điều gì — trong phòng và tại các buổi tụ họp. Điều chỉnh hình thức, thời gian, hoặc địa điểm dựa trên câu trả lời của họ, không phải điều bạn tưởng tượng. JoinOrigin giữ ký ức chung của một Origin ở một nơi — ghi chú, quyết định, và điều thành viên yêu cầu — để việc lặp lại hiện hữu thay vì bị mất. Hỏi thành viên trực tiếp trong phòng sau mỗi buổi tụ họp.',
    'Công bố một nhịp nhất quán và phát triển chậm. Giữ cùng ngày và hình thức trong vài tháng trước khi mở rộng. Tăng trưởng nhân lên qua giới thiệu khi mọi thành viên có thể mô tả Origin trong một câu và chia sẻ liên kết tham gia của nó. JoinOrigin giúp Origin của bạn duy trì khả năng tìm thấy và kết nối khi nó phát triển — một nơi nhịp, lời hứa, phòng, và con người đều hiện hữu. Được khám phá và phát triển.',
  ],
  steps: [
    {
      title: 'Xác định một mục đích rõ ràng',
      body: 'Quyết định Origin dành cho ai, nó giải quyết vấn đề gì, và một thành viên thành công trông như thế nào. Viết một sứ mệnh một câu như "một nhóm cho các nhà sáng lập mới ở Brooklyn để chia sẻ bài học giai đoạn đầu".',
      joinOriginNote:
        'JoinOrigin cho mục đích của bạn một mái nhà — một trang nhóm công khai nơi sứ mệnh, đối tượng, và lời hứa hiện hữu với bất kỳ ai tìm kiếm một nhóm như của bạn. Viết sứ mệnh xuống và giữ nó trước mặt mọi lời mời.',
    },
    {
      title: 'Công bố nhóm và mở phòng của nó',
      body: 'Cốt lõi kỹ thuật số của một Origin là một nhóm được công bố với một phòng nơi thành viên có thể trò chuyện. Trên JoinOrigin, công bố một nhóm tự động tạo phòng của nó — người sáng lập sở hữu nó từ giây đầu tiên và có thể mời, xóa, và gán vai trò bên trong Element.',
      joinOriginNote:
        'Trên JoinOrigin không có bước "tạo trò chuyện sau": công bố nhóm và phòng tồn tại ngay lập tức, với người sáng lập là chủ phòng. Thiết lập mái nhà nhóm và phòng của nó bằng những công cụ bạn đang dùng nếu bạn thích.',
    },
    {
      title: 'Chia sẻ liên kết tham gia của bạn',
      body: 'Một liên kết tham gia là lời mời đơn giản nhất tồn tại: một liên kết, một cú nhấp, và một thành viên mới đặt chân vào phòng. Đặt liên kết ở mọi nơi — trang nhóm của bạn, tin nhắn cá nhân, và những nơi đối tượng của bạn đã tụ họp.',
      joinOriginNote:
        'Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến nhóm của bạn là đủ.',
    },
    {
      title: 'Mời mười người đầu tiên của bạn một cách cá nhân',
      body: 'Lời mời cá nhân chuyển đổi tốt hơn nhiều so với bài đăng công khai. Nhắn tin cho bạn bè, đồng nghiệp, và người quen phù hợp với đối tượng, chia sẻ liên kết tham gia, và nhờ họ mang theo một người khác.',
      joinOriginNote:
        'JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một Origin có thể tìm thấy của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi thành viên bạn mời trở thành một kênh đến mạng lưới của riêng họ.',
    },
    {
      title: 'Chọn một hình thức và nhịp độ (một lựa chọn phía sau)',
      body: 'Một khi nhóm đang hình thành, chọn một hình thức định kỳ — một buổi thảo luận hàng tháng, một buổi làm việc hàng tuần, một buổi nói chuyện, hoặc một buổi đi bộ giao lưu. Định kỳ thắng một lần vì thói quen là thứ biến người lạ thành thành viên. Đây là một lựa chọn phía sau: nhóm có thể gặp mặt trực tiếp sau này, nhưng phòng đã là mái nhà của Origin.',
      joinOriginNote:
        'Trên JoinOrigin người tổ chức có thể mô tả hình thức của họ một lần và thành viên có thể thấy điều mong đợi trước khi họ tham gia — giảm sự do dự ngăn người lần đầu. Chọn hình thức của bạn và nêu nó trong mọi lời mời.',
    },
    {
      title: 'Tổ chức một buổi tụ họp đầu tiên tuyệt vời',
      body: 'Nếu thành viên chọn gặp mặt trực tiếp — đến sớm, chào mọi người, chạy một vòng giới thiệu ngắn, và kết thúc với một ngày rõ ràng tiếp theo. Mục tiêu của buổi gặp đầu tiên không phải quy mô; mà là mọi người rời đi với mong muốn quay lại.',
      joinOriginNote:
        'JoinOrigin không bố trí nhân sự hoặc vận hành các buổi tụ họp — trải nghiệm là của bạn để thiết kế. Nền tảng giúp Origin hình thành quanh nó: một phòng chung nơi ngày, tóm tắt, và các bước tiếp theo sống.',
    },
    {
      title: 'Thu thập phản hồi và lặp lại',
      body: 'Sau những tuần đầu tiên, hỏi thành viên họ muốn nhiều hoặc ít điều gì — trong phòng và tại các buổi tụ họp. Điều chỉnh hình thức, thời gian, hoặc địa điểm dựa trên câu trả lời của họ, không phải điều bạn tưởng tượng.',
      joinOriginNote:
        'JoinOrigin giữ ký ức chung của một Origin ở một nơi — ghi chú, quyết định, và điều thành viên yêu cầu — để việc lặp lại hiện hữu thay vì bị mất. Hỏi thành viên trực tiếp trong phòng sau mỗi buổi tụ họp.',
    },
    {
      title: 'Công bố một nhịp nhất quán và phát triển chậm',
      body: 'Giữ cùng ngày và hình thức trong vài tháng trước khi mở rộng. Tăng trưởng nhân lên qua giới thiệu khi mọi thành viên có thể mô tả Origin trong một câu và chia sẻ liên kết tham gia của nó.',
      joinOriginNote:
        'JoinOrigin giúp Origin của bạn duy trì khả năng tìm thấy và kết nối khi nó phát triển — một nơi nhịp, lời hứa, phòng, và con người đều hiện hữu. Được khám phá và phát triển.',
    },
  ],
};

export default content;
