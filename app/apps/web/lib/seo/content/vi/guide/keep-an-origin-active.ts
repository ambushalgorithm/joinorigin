import type { GuideContent } from '../../types';

/**
 * "Cách Giữ cho một Cộng đồng Hoạt động" — hướng dẫn cấp L1 dài hạn (design §6.1,
 * TASK-326).
 *
 * Tái trọng tâm vào mô hình kết nối → tham gia → phòng kỹ thuật số: phòng và
 * hoạt động của nó (nuôi bảng tin) là bề mặt giữ chân — cộng đồng sống trong
 * phòng giữa các buổi tụ họp, và sự kiện trực tiếp là một hệ quả phía sau.
 * Giá trị JoinOrigin được đan vào phần mở đầu và mỗi bước (joinOriginNote theo
 * từng bước), với khung trung thực — JoinOrigin không quản lý cộng đồng hoặc
 * bố trí nhân sự sự kiện. Một H1, cấu trúc từng bước, FAQ được phản chiếu 1:1
 * trong JSON-LD "FAQPage". "Room" được gắn với phòng Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'keep-an-origin-active',
  title: 'Cách Giữ cho một Cộng đồng Hoạt động & Gắn kết | JoinOrigin',
  description:
    'Giữ cho cộng đồng của bạn hoạt động — dù nó mới và đang tìm nhịp hay đã thành lập và đang trôi dạt — dùng phòng và bảng tin của nó làm bề mặt giữ chân, xây dựng các nghi thức, chia sẻ gánh nặng người tổ chức, và tạo các con đường đóng góp nhỏ. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Hầu hết cộng đồng không chết vì một buổi ra mắt tồi; chúng chết vì sự im lặng — khoảnh khắc mọi người ngừng cảm thấy kết nối và âm thầm trôi dạt. Giữ cho một cộng đồng hoạt động vì vậy là một vấn đề kết nối con người: mọi người ở lại khi họ cảm thấy thuộc về, và họ cảm thấy thuộc về khi có một nơi hiện hữu, có tổ chức nơi cộng đồng sống. Đó chính xác là điều JoinOrigin — và các cơ chế tương tự áp dụng dù cộng đồng mới vài tuần tuổi và vẫn đang tìm nhịp hay nhiều năm tuổi và đang trôi dạt vào im lặng.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm, bắt đầu, và tổ chức cộng đồng — và trong mô hình kỹ thuật số của nó, phòng là bề mặt giữ chân: một phòng Matrix do người sáng lập kiểm soát nơi các nghi thức, cập nhật, và đóng góp duy trì hiện hữu, và hoạt động của nó chảy vào bảng tin giữ cho thành viên kết nối giữa các buổi tụ họp. Sự kiện trực tiếp vẫn là một hệ quả phía sau của một cộng đồng đã hình thành, không bao giờ là cốt lõi — phòng và bảng tin của nó là thứ giữ cộng đồng sống từng ngày. JoinOrigin không quản lý cộng đồng hoặc bố trí nhân sự sự kiện — nền tảng giữ cho cộng đồng kết nối giữa các buổi tụ họp, và việc tổ chức là của bạn.',
    'Hướng dẫn này bao phủ các cơ chế thực tế của một cộng đồng khỏe mạnh, hoạt động — từ những tuần đầu tiên sau khi ra mắt đến một cộng đồng đã chạy nhiều năm: thiết lập các nghi thức biến sự tham gia thành thói quen, tạo các hiện vật chung trong phòng, phân phối gánh nặng người tổ chức để không một người nào kiệt sức, mở các con đường đóng góp nhỏ để mọi thành viên có thể thêm giá trị, và đo các tín hiệu cho bạn biết cộng đồng có thực sự sống không. Mỗi bước ánh xạ vào cách JoinOrigin giúp.',
  ],
  dataPoints: [
    'Các nghi thức định kỳ — một nhịp phòng cố định, một hình thức đều đặn, một hiện vật chung — biến quan tâm thành thói quen.',
    'Hoạt động của phòng giữa các buổi tụ họp là thứ giữ thành viên cảm thấy kết nối; im lặng là thứ đẩy họ đi.',
    'Các con đường đóng góp nhỏ (một ghi chú ghim, một người dẫn luân phiên, một điểm nhấn thành viên) làm thành viên cảm thấy quyền sở hữu.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm, bắt đầu, và tổ chức cộng đồng; nó không quản lý cộng đồng hoặc bố trí nhân sự sự kiện.',
  ],
  faq: [
    {
      question: 'Một cộng đồng hoạt động nên tụ họp bao lâu một lần?',
      answer:
        'Hàng tháng là mức cơ sở bền vững nhất cho các buổi tụ họp trực tiếp; phòng nên hoạt động hàng tuần — điểm kiểm tra, cập nhật, và các cuộc trò chuyện nhỏ. Tính nhất quán quan trọng hơn tần suất: một nhịp phòng hàng tuần đáng tin cậy thắng một nhịp lẻ tẻ.',
    },
    {
      question: 'Tôi làm gì khi mức tương tác giảm?',
      answer:
        'Đừng hoảng loạn hoặc tung ra một chiến dịch lớn. Hỏi thành viên trực tiếp họ cần gì, đăng một câu hỏi đơn giản trong phòng, tổ chức một buổi tụ họp nhỏ hơn và đơn giản hơn, và giao một vai trò cho một thành viên. Các thay đổi nhỏ, phản hồi nhanh hồi sinh tương tác nhanh hơn khối lượng.',
    },
    {
      question: 'Làm thế nào tôi giữ thành viên gắn kết giữa các buổi tụ họp?',
      answer:
        'Tạo các điểm chạm ít tốn sức trong phòng: một tài liệu chung, một điểm nhấn thành viên, một chuỗi điểm kiểm tra đều đặn, hoặc một cập nhật "ai đang làm gì". Mục tiêu là một nhịp đập hiện hữu trong phòng và bảng tin của nó, không phải thông báo liên tục.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi giữ cộng đồng của mình hoạt động không?',
      answer:
        'Có. JoinOrigin giúp mọi người tìm, bắt đầu, và tổ chức cộng đồng — một phòng và bảng tin nơi cộng đồng duy trì hiện hữu giữa các buổi tụ họp. Các thực hành trong hướng dẫn này — nghi thức, vai trò chung, và đóng góp nhỏ — hoạt động trên nền tảng và với những công cụ bạn đã có.',
    },
  ],
  sections: [
    'Xác định một nghi thức cốt lõi. Chọn một thực hành định kỳ mọi người có thể dựa vào: một buổi họp hàng tháng, một điểm kiểm tra hàng tuần, một bài đọc chung, hoặc một cập nhật dự án. Các nghi thức tạo nhịp đập giữ cho một cộng đồng sống — và trong một cộng đồng ưu tiên kỹ thuật số, nghi thức diễn ra trong phòng. Trên JoinOrigin nhịp của một cộng đồng hiện hữu trong một phòng có tổ chức — thành viên luôn biết nghi thức tiếp theo. Chọn một thực hành định kỳ và bảo vệ nó.',
    'Tạo một hiện vật chung trong phòng. Bắt đầu một ghi chú hoặc tài liệu ghim nắm bắt điều cộng đồng đang làm — ghi chú cuộc họp, phần giới thiệu thành viên, cập nhật dự án. Một hiện vật sống giữ cho thành viên định hướng giữa các buổi tụ họp. JoinOrigin là phòng chung nơi ghi chú, giới thiệu, và cập nhật sống cạnh cộng đồng — một hiện vật sống theo thiết kế. Ghim một tài liệu chung đơn giản trong phòng.',
    'Phân phối gánh nặng người tổ chức. Tuyển hai hoặc ba đồng chủ trì hoặc trợ lý và luân phiên các vai trò nhỏ: chào đón, ghi chú, chọn chủ đề, liên hệ địa điểm. Quyền sở hữu chung là phòng thủ tốt nhất chống kiệt sức. JoinOrigin không bố trí nhân sự hoặc quản lý cộng đồng — quyền sở hữu chung là của bạn để xây dựng. Nền tảng cho trợ lý và người tổ chức một phòng để điều phối. Tuyển hai hoặc ba đồng chủ trì và luân phiên vai trò.',
    'Mở các con đường đóng góp nhỏ. Cho thành viên cách thêm giá trị không cần cam kết lớn: một điểm nhấn thành viên, một người dẫn thảo luận luân phiên, một danh sách phát hoặc danh sách đọc chung, hoặc một phần "cần giúp đỡ" ghim trong phòng. Trên JoinOrigin thành viên có những cách hiện hữu để đóng góp — một cộng đồng nơi thêm giá trị là dễ dàng. Điểm nhấn thành viên và người dẫn luân phiên tạo cùng quyền sở hữu đó.',
    'Giữ một nhịp giao tiếp có thể dự đoán trong phòng. Gửi một cập nhật ngắn mỗi tuần hoặc mỗi tháng theo lịch cố định, đăng trong phòng và chảy vào bảng tin. Khả năng dự đoán xây dựng niềm tin; im lặng xây dựng sự trôi dạt. JoinOrigin giữ nhịp đập của cộng đồng trong một phòng — một cập nhật, theo lịch, nơi mọi người có thể thấy. Một cập nhật ngắn hàng tuần xây dựng niềm tin.',
    'Theo dõi các tín hiệu tương tác. Theo dõi hoạt động phòng, tỷ lệ tham dự lặp lại, và tỷ lệ đóng góp. Một cộng đồng khỏe mạnh tăng tỷ lệ quay lại trước khi tăng tổng quy mô — tập trung vào những thành viên quay lại phòng. Trên JoinOrigin người tổ chức có thể thấy cộng đồng của họ đang ra sao trong một phòng và bảng tin có tổ chức. Theo dõi hoạt động, tham dự lặp lại, và tỷ lệ đóng góp bằng một bảng đơn giản.',
    'Hỏi phản hồi đều đặn trong phòng. Dùng một khảo sát một câu hỏi đơn giản sau mỗi buổi tụ họp: bạn thích điều gì, bạn sẽ thay đổi điều gì. Hành động theo câu trả lời và nói với cộng đồng bạn đã thay đổi điều gì. JoinOrigin thu thập và giữ phản hồi cùng cộng đồng nó thuộc về — trong phòng. Một khảo sát một câu hỏi sau mỗi buổi tụ họp hoạt động — rồi hành động theo câu trả lời.',
    'Thích nghi hình thức khi cộng đồng trưởng thành. Điều hiệu quả với mười thành viên có thể không phù hợp với năm mươi. Xem lại hình thức, địa điểm, và nhịp độ theo quý, và phát triển có chủ đích thay vì giữ vì thói quen. JoinOrigin giúp cộng đồng phát triển — một phòng nơi thay đổi hình thức và thông báo đến mọi người. Xem lại hình thức và địa điểm của bạn theo quý một cách có chủ đích.',
  ],
  steps: [
    {
      title: 'Xác định một nghi thức cốt lõi',
      body: 'Chọn một thực hành định kỳ mọi người có thể dựa vào: một buổi họp hàng tháng, một điểm kiểm tra hàng tuần, một bài đọc chung, hoặc một cập nhật dự án. Các nghi thức tạo nhịp đập giữ cho một cộng đồng sống — và trong một cộng đồng ưu tiên kỹ thuật số, nghi thức diễn ra trong phòng.',
      joinOriginNote:
        'Trên JoinOrigin nhịp của một cộng đồng hiện hữu trong một phòng có tổ chức — thành viên luôn biết nghi thức tiếp theo. Chọn một thực hành định kỳ và bảo vệ nó.',
    },
    {
      title: 'Tạo một hiện vật chung trong phòng',
      body: 'Bắt đầu một ghi chú hoặc tài liệu ghim nắm bắt điều cộng đồng đang làm — ghi chú cuộc họp, phần giới thiệu thành viên, cập nhật dự án. Một hiện vật sống giữ cho thành viên định hướng giữa các buổi tụ họp.',
      joinOriginNote:
        'JoinOrigin là phòng chung nơi ghi chú, giới thiệu, và cập nhật sống cạnh cộng đồng — một hiện vật sống theo thiết kế. Ghim một tài liệu chung đơn giản trong phòng.',
    },
    {
      title: 'Phân phối gánh nặng người tổ chức',
      body: 'Tuyển hai hoặc ba đồng chủ trì hoặc trợ lý và luân phiên các vai trò nhỏ: chào đón, ghi chú, chọn chủ đề, liên hệ địa điểm. Quyền sở hữu chung là phòng thủ tốt nhất chống kiệt sức.',
      joinOriginNote:
        'JoinOrigin không bố trí nhân sự hoặc quản lý cộng đồng — quyền sở hữu chung là của bạn để xây dựng. Nền tảng cho trợ lý và người tổ chức một phòng để điều phối. Tuyển hai hoặc ba đồng chủ trì và luân phiên vai trò.',
    },
    {
      title: 'Mở các con đường đóng góp nhỏ',
      body: 'Cho thành viên cách thêm giá trị không cần cam kết lớn: một điểm nhấn thành viên, một người dẫn thảo luận luân phiên, một danh sách phát hoặc danh sách đọc chung, hoặc một phần "cần giúp đỡ" ghim trong phòng.',
      joinOriginNote:
        'Trên JoinOrigin thành viên có những cách hiện hữu để đóng góp — một cộng đồng nơi thêm giá trị là dễ dàng. Điểm nhấn thành viên và người dẫn luân phiên tạo cùng quyền sở hữu đó.',
    },
    {
      title: 'Giữ một nhịp giao tiếp có thể dự đoán trong phòng',
      body: 'Gửi một cập nhật ngắn mỗi tuần hoặc mỗi tháng theo lịch cố định, đăng trong phòng và chảy vào bảng tin. Khả năng dự đoán xây dựng niềm tin; im lặng xây dựng sự trôi dạt.',
      joinOriginNote:
        'JoinOrigin giữ nhịp đập của cộng đồng trong một phòng — một cập nhật, theo lịch, nơi mọi người có thể thấy. Một cập nhật ngắn hàng tuần xây dựng niềm tin.',
    },
    {
      title: 'Theo dõi các tín hiệu tương tác',
      body: 'Theo dõi hoạt động phòng, tỷ lệ tham dự lặp lại, và tỷ lệ đóng góp. Một cộng đồng khỏe mạnh tăng tỷ lệ quay lại trước khi tăng tổng quy mô — tập trung vào những thành viên quay lại phòng.',
      joinOriginNote:
        'Trên JoinOrigin người tổ chức có thể thấy cộng đồng của họ đang ra sao trong một phòng và bảng tin có tổ chức. Theo dõi hoạt động, tham dự lặp lại, và tỷ lệ đóng góp bằng một bảng đơn giản.',
    },
    {
      title: 'Hỏi phản hồi đều đặn trong phòng',
      body: 'Dùng một khảo sát một câu hỏi đơn giản sau mỗi buổi tụ họp: bạn thích điều gì, bạn sẽ thay đổi điều gì. Hành động theo câu trả lời và nói với cộng đồng bạn đã thay đổi điều gì.',
      joinOriginNote:
        'JoinOrigin thu thập và giữ phản hồi cùng cộng đồng nó thuộc về — trong phòng. Một khảo sát một câu hỏi sau mỗi buổi tụ họp hoạt động — rồi hành động theo câu trả lời.',
    },
    {
      title: 'Thích nghi hình thức khi cộng đồng trưởng thành',
      body: 'Điều hiệu quả với mười thành viên có thể không phù hợp với năm mươi. Xem lại hình thức, địa điểm, và nhịp độ theo quý, và phát triển có chủ đích thay vì giữ vì thói quen.',
      joinOriginNote:
        'JoinOrigin giúp cộng đồng phát triển — một phòng nơi thay đổi hình thức và thông báo đến mọi người. Xem lại hình thức và địa điểm của bạn theo quý một cách có chủ đích.',
    },
  ],
};

export default content;
