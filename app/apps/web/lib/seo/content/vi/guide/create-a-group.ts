import type { GuideContent } from '../../types';

/**
 * "Cách Tạo một Nhóm" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-353).
 *
 * Viết theo vòng lặp cốt lõi màn hình sản phẩm §2: công bố một nhóm →
 * trang nhóm công khai → Tham gia qua liên kết → phòng tự tạo NGAY KHI
 * CÔNG BỐ → người sáng lập kiểm soát phòng → bảng tin/mời phát triển.
 * Một nhóm là một cộng đồng: trang công khai nêu lời hứa, phòng là nơi
 * thành viên kết nối, và thành viên tham gia qua một liên kết. Nền tảng
 * đã hoạt động: tạo một nhóm công bố trang và mở phòng của nó ngay bây
 * giờ. "Room" được gắn với phòng Matrix (§6.3). Cụm từ này không bao giờ
 * được dùng trong văn bản chính thức.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'create-a-group',
  title: 'Cách Tạo một Nhóm: Công bố Nó và Mở Phòng của Nó | JoinOrigin',
  description:
    'Tạo một nhóm trên JoinOrigin — công bố một trang nhóm, mở phòng của nó tự động, và mời thành viên qua một liên kết tham gia. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Mọi cộng đồng — dù hoàn toàn mới hay đã gặp gỡ thân mật trong nhiều tháng — vận hành trên cùng hai động thái: quyết định nó dành cho ai, và cho những người đó một nơi rõ ràng để kết nối. Một nhóm không có mái nhà không bao giờ hình thành đúng cách; quan tâm phân tán qua tin nhắn, bảng tính, và các cuộc trò chuyện một lần, và không gì giữ lại được. Trang nhóm và phòng của nó chính là mái nhà đó, và tạo chúng tốt là sự khác biệt giữa một cộng đồng thực sự và một danh sách tên.',
    'Vòng lặp JoinOrigin hoạt động như thế này: bạn công bố một nhóm, trang công khai của nó xuất hiện, và phòng của nó được tự động tạo tại thời điểm công bố. Mọi người khám phá nhóm qua mục Khám phá hoặc theo một liên kết tham gia, việc tham gia chỉ là một cú nhấp, và họ đặt chân vào phòng — một phòng Matrix do người sáng lập kiểm soát, nơi cộng đồng thực sự sống. Người sáng lập sở hữu phòng từ giây đầu tiên và kiểm soát ai tham gia và cách nhóm hoạt động.',
    'Hướng dẫn này bao phủ toàn bộ hành trình — dù nhóm mới hay đã tồn tại trên giấy: chọn đối tượng và mục đích, viết một trang nhóm mọi người có thể tìm thấy, công bố nhóm và mở phòng của nó, đặt kỳ vọng với tư cách người sáng lập, chia sẻ liên kết tham gia, mời các thành viên đầu tiên, bắt đầu các cuộc trò chuyện đầu tiên, và giữ phòng sôi động để nhóm tiếp tục phát triển.',
  ],
  dataPoints: [
    'Các nhóm rõ ràng nhất bắt đầu với một đối tượng và một lời hứa — sự cụ thể là một tính năng tăng trưởng.',
    'Trên JoinOrigin, công bố một nhóm tự động tạo phòng của nó — cộng đồng có một nơi để kết nối từ giây đầu tiên.',
    'Một liên kết tham gia là lời mời đơn giản nhất: một liên kết, một cú nhấp, và một thành viên mới đã ở trong phòng.',
    'JoinOrigin là một hệ điều hành cộng đồng giúp mọi người tìm, tham gia, và bắt đầu các nhóm — công bố nhóm của bạn và phòng của nó mở ngay lập tức.',
  ],
  faq: [
    {
      question: 'Sự khác biệt giữa một nhóm và một cộng đồng là gì?',
      answer:
        'Trên JoinOrigin chúng là cùng một đối tượng. Một nhóm (hoặc cộng đồng) là một đối tượng được công bố, có thể tham gia với một trang công khai và một phòng. Trang nhóm nêu lời hứa; phòng là nơi thành viên kết nối. Cộng đồng có một Không gian Matrix chứa các phòng của nhóm, và phòng chính là nơi nhóm sống.',
    },
    {
      question: 'Phòng nhóm được tạo khi nào?',
      answer:
        'Phòng được tự động tạo ngay khi bạn công bố nhóm — không bao giờ có bước "tạo trò chuyện sau" riêng biệt. Người sáng lập sở hữu phòng từ giây đầu tiên và có thể mời, xóa, và gán vai trò bên trong Element. Bạn cũng có thể thiết lập cùng hình dạng bằng những công cụ bạn đang dùng.',
    },
    {
      question: 'Làm thế nào thành viên tham gia nhóm của tôi?',
      answer:
        'Tham gia là một hành động duy nhất: nhấp Tham gia trên trang công khai của nhóm, hoặc theo một liên kết mời trực tiếp từ một thành viên. Người tham gia đặt chân vào phòng của nhóm. Tăng trưởng sớm đáng tin cậy nhất là cá nhân — chia sẻ liên kết tham gia với những người phù hợp với đối tượng và nhờ họ mang theo những người khác.',
    },
    {
      question: 'Trang nhóm nên nói gì?',
      answer:
        'Một câu về nhóm dành cho ai, một câu về điều gì xảy ra trong phòng, và điều thành viên nhận được khi tham gia. Giữ nó cụ thể — "những nhà sáng lập mới ở Brooklyn" thắng "những người thích kinh doanh." Trang là lời hứa quyết định liệu ai đó có nhấp Tham gia hay không.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi tạo một nhóm ngay hôm nay không?',
      answer:
        'Có. Công bố một nhóm trên JoinOrigin tạo trang và phòng của nó một cách nguyên tử — phòng mở ngay khi bạn công bố, và bạn kiểm soát nó từ đầu. Công bố nhóm và mở một phòng cho thành viên; mỗi thành viên mới bạn mời sẽ mở rộng tầm với của bạn.',
    },
  ],
  sections: [
    'Chọn đối tượng và mục đích. Quyết định nhóm dành cho ai và nó tồn tại để làm gì — một đối tượng, một lời hứa, và một thành viên thành công bạn có thể mô tả. JoinOrigin được thiết kế quanh các trang nhóm dễ tìm, và các nhóm rõ ràng nhất nêu đối tượng và mục đích ngay từ đầu. Viết một câu cho mỗi điều và giữ chúng trước mặt mọi lời mời.',
    'Viết một trang nhóm mọi người có thể tìm thấy. Trang nên nêu nhóm dành cho ai, điều gì xảy ra trong phòng, và thành viên nhận được gì khi tham gia. Giữ nó cụ thể và thành thật. Công bố một nhóm trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Công bố mô tả và thử nghiệm nó với vài người phù hợp với đối tượng.',
    'Công bố nhóm và mở phòng của nó. Công bố là khoảnh khắc nhóm trở nên thực tế: một trang công khai cộng một phòng nơi thành viên kết nối. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó. Trên JoinOrigin trang, phòng, và liên kết tham gia là một lần công bố. Tạo trang và phòng bằng những công cụ nhóm của bạn đang dùng nếu bạn thích.',
    'Đặt kỳ vọng với tư cách người sáng lập. Với tư cách chủ phòng, quyết định cách nhóm hoạt động: thành viên có thể đăng gì, các quy tắc là gì, và người mới được chào đón như thế nào. Quyền kiểm soát của người sáng lập là quyền sở hữu phòng Matrix tiêu chuẩn — mời, xóa, gán vai trò, ghim, lưu trữ. JoinOrigin không đặt quy tắc thay bạn; thiết kế trao cho bạn các điều khiển. Viết kỳ vọng của phòng xuống và ghim chúng nơi thành viên có thể thấy.',
    'Chia sẻ liên kết tham gia. Liên kết tham gia là con đường ngắn nhất từ quan tâm đến tư cách thành viên: một liên kết, một cú nhấp, và một thành viên mới đặt chân vào phòng. Đặt nó ở mọi nơi những người phù hợp tụ họp. Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến nhóm của bạn là đủ.',
    'Mời các thành viên đầu tiên một cách cá nhân. Lời mời cá nhân chuyển đổi tốt hơn nhiều so với bài đăng công khai. Nhắn tin cho bạn bè, đồng nghiệp, và người quen phù hợp với đối tượng, chia sẻ liên kết tham gia, và nhờ họ mang theo một người khác. JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một nhóm có thể tìm thấy nhóm của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi thành viên trở thành một kênh đến mạng lưới của riêng họ.',
    'Bắt đầu các cuộc trò chuyện đầu tiên trong phòng. Các cuộc trò chuyện đầu tiên thiết lập văn hóa. Mở bằng một câu hỏi rõ ràng — tự giới thiệu, một mục tiêu chung, hoặc một chủ đề đầu tiên — và phản hồi mọi tin nhắn. JoinOrigin không vận hành các cuộc trò chuyện của bạn; phòng là của bạn để định hình. Nền tảng mang lại cho nhóm một phòng nơi thành viên kết nối, và người sáng lập sở hữu nó. Hãy là thành viên tích cực nhất trong vài tuần đầu tiên.',
    'Giữ phòng sôi động và phát triển. Giữ một nhịp — một chủ đề hàng tuần, một điểm kiểm tra định kỳ, hoặc một cập nhật thường trực — để thành viên có lý do quay lại. Tăng trưởng nhân lên khi mọi thành viên có thể mô tả nhóm trong một câu và chia sẻ liên kết tham gia của nó. JoinOrigin giữ trang nhóm và phòng của bạn kết nối khi nhóm phát triển — một nơi lời hứa, phòng, và con người đều hiện hữu. Được khám phá và phát triển.',
  ],
  steps: [
    {
      title: 'Chọn đối tượng và mục đích',
      body: 'Quyết định nhóm dành cho ai và nó tồn tại để làm gì — một đối tượng, một lời hứa, và một thành viên thành công bạn có thể mô tả.',
      joinOriginNote:
        'JoinOrigin được thiết kế quanh các trang nhóm dễ tìm, và các nhóm rõ ràng nhất nêu đối tượng và mục đích ngay từ đầu. Viết một câu cho mỗi điều và giữ chúng trước mặt mọi lời mời.',
    },
    {
      title: 'Viết một trang nhóm mọi người có thể tìm thấy',
      body: 'Trang nên nêu nhóm dành cho ai, điều gì xảy ra trong phòng, và thành viên nhận được gì khi tham gia. Giữ nó cụ thể và thành thật.',
      joinOriginNote:
        'Công bố một nhóm trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Công bố mô tả và thử nghiệm nó với vài người phù hợp với đối tượng.',
    },
    {
      title: 'Công bố nhóm và mở phòng của nó',
      body: 'Công bố là khoảnh khắc nhóm trở nên thực tế: một trang công khai cộng một phòng nơi thành viên kết nối. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó.',
      joinOriginNote:
        'Trên JoinOrigin trang, phòng, và liên kết tham gia là một lần công bố. Tạo trang và phòng bằng những công cụ nhóm của bạn đang dùng nếu bạn thích.',
    },
    {
      title: 'Đặt kỳ vọng với tư cách người sáng lập',
      body: 'Với tư cách chủ phòng, quyết định cách nhóm hoạt động: thành viên có thể đăng gì, các quy tắc là gì, và người mới được chào đón như thế nào. Quyền kiểm soát của người sáng lập là quyền sở hữu phòng Matrix tiêu chuẩn — mời, xóa, gán vai trò, ghim, lưu trữ.',
      joinOriginNote:
        'JoinOrigin không đặt quy tắc thay bạn; thiết kế trao cho bạn các điều khiển. Viết kỳ vọng của phòng xuống và ghim chúng nơi thành viên có thể thấy.',
    },
    {
      title: 'Chia sẻ liên kết tham gia',
      body: 'Liên kết tham gia là con đường ngắn nhất từ quan tâm đến tư cách thành viên: một liên kết, một cú nhấp, và một thành viên mới đặt chân vào phòng. Đặt nó ở mọi nơi những người phù hợp tụ họp.',
      joinOriginNote:
        'Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến nhóm của bạn là đủ.',
    },
    {
      title: 'Mời các thành viên đầu tiên một cách cá nhân',
      body: 'Lời mời cá nhân chuyển đổi tốt hơn nhiều so với bài đăng công khai. Nhắn tin cho bạn bè, đồng nghiệp, và người quen phù hợp với đối tượng, chia sẻ liên kết tham gia, và nhờ họ mang theo một người khác.',
      joinOriginNote:
        'JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một nhóm có thể tìm thấy nhóm của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi thành viên trở thành một kênh đến mạng lưới của riêng họ.',
    },
    {
      title: 'Bắt đầu các cuộc trò chuyện đầu tiên trong phòng',
      body: 'Các cuộc trò chuyện đầu tiên thiết lập văn hóa. Mở bằng một câu hỏi rõ ràng — tự giới thiệu, một mục tiêu chung, hoặc một chủ đề đầu tiên — và phản hồi mọi tin nhắn.',
      joinOriginNote:
        'JoinOrigin không vận hành các cuộc trò chuyện của bạn; phòng là của bạn để định hình. Nền tảng mang lại cho nhóm một phòng nơi thành viên kết nối, và người sáng lập sở hữu nó. Hãy là thành viên tích cực nhất trong vài tuần đầu tiên.',
    },
    {
      title: 'Giữ phòng sôi động và phát triển',
      body: 'Giữ một nhịp — một chủ đề hàng tuần, một điểm kiểm tra định kỳ, hoặc một cập nhật thường trực — để thành viên có lý do quay lại. Tăng trưởng nhân lên khi mọi thành viên có thể mô tả nhóm trong một câu và chia sẻ liên kết tham gia của nó.',
      joinOriginNote:
        'JoinOrigin giữ trang nhóm và phòng của bạn kết nối khi nhóm phát triển — một nơi lời hứa, phòng, và con người đều hiện hữu. Được khám phá và phát triển.',
    },
  ],
};

export default content;
