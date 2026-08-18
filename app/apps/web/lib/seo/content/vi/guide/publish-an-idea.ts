import type { GuideContent } from '../../types';

/**
 * "Cách Công bố một Ý tưởng" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-353).
 *
 * Viết theo vòng lặp cốt lõi màn hình sản phẩm §2: Khám phá → Trang ý tưởng
 * công khai → Tham gia qua liên kết → Phòng tự tạo NGAY KHI CÔNG BỐ → người
 * sáng lập kiểm soát phòng → bảng tin/mời phát triển. Trang ý tưởng là lời
 * hứa công khai; phòng là nơi những người quan tâm tụ họp và trao đổi. Nền
 * tảng đã hoạt động: công bố một ý tưởng sẽ tạo trang và phòng ngay bây giờ.
 * "Room" được gắn với phòng Matrix (§6.3). Cụm từ này không bao giờ được dùng
 * trong văn bản chính thức.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'publish-an-idea',
  title:
    'Cách Công bố một Ý tưởng: Biến Một Tia Sáng Thành Trang Ý tưởng Có Thể Tìm Thấy | JoinOrigin',
  description:
    'Công bố một ý tưởng trên JoinOrigin — dù đó là một tia sáng mới hay một dự án hiện hữu bạn muốn mọi người tìm thấy — viết một trang ý tưởng công khai, để phòng của nó tự động mở, và mời những người muốn cùng bạn xây dựng. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Hầu hết ý tưởng chết trong bản nháp — một ghi chú trên điện thoại, một cuộc trò chuyện nửa quên, một tài liệu chưa từng có ai xem. Lý do hiếm khi là ý tưởng tồi. Mà là không ai tìm thấy nó, và tìm đúng người chính là toàn bộ cuộc chơi. Vấn đề kết nối con người đó chính xác là điều JoinOrigin giải quyết — dù ý tưởng là một tia sáng mới hay một dự án hiện hữu đã âm thầm tiến lên mà không có một mái nhà để tìm thấy.',
    'Vòng lặp JoinOrigin hoạt động như thế này: bạn công bố một ý tưởng, một trang ý tưởng công khai xuất hiện, và phòng của nó được tự động tạo ngay tại thời điểm công bố. Mọi người khám phá trang qua mục Khám phá hoặc theo một liên kết bạn chia sẻ, và tham gia chỉ là một cú nhấp chuột. Họ đặt chân vào phòng — một phòng Matrix do người sáng lập kiểm soát, nơi cuộc trò chuyện quanh ý tưởng thực sự diễn ra. Người sáng lập sở hữu phòng từ giây đầu tiên và quyết định ai tham gia và điều gì xảy ra bên trong.',
    'Hướng dẫn này đi qua toàn bộ hành trình: nén ý tưởng thành một câu rõ ràng, viết một trang mọi người có thể tìm thấy, công bố nó và mở phòng, chia sẻ liên kết tham gia, mời những người quan tâm đầu tiên, tổ chức cuộc trò chuyện đầu tiên, tinh chỉnh ý tưởng từ phản hồi thực tế, và giữ cho ý tưởng dễ tìm khi nó phát triển. Nó hiệu quả với mọi ý tưởng — một doanh nghiệp nhỏ, một startup, một câu lạc bộ sách, một dự án cộng đồng, một sản phẩm chưa tồn tại, hoặc một dự án đã tồn tại và cần thêm nhiều người xung quanh.',
  ],
  dataPoints: [
    'Một lời chào hàng ý tưởng một câu dễ tìm hơn một tài liệu dài — sự rõ ràng là một tính năng khám phá.',
    'Trên JoinOrigin, công bố một ý tưởng sẽ tự động tạo phòng của nó — không bao giờ có bước "tạo trò chuyện sau" riêng biệt.',
    'Một liên kết tham gia là lời mời đơn giản nhất: một liên kết, một cú nhấp, và một người quan tâm đã ở trong phòng.',
    'JoinOrigin là một hệ điều hành cộng đồng giúp mọi người tìm thấy ý tưởng và những người đứng sau chúng — công bố ý tưởng của bạn và phòng của nó mở ngay lập tức.',
  ],
  faq: [
    {
      question: 'Chính xác thì trang ý tưởng là gì?',
      answer:
        'Trang ý tưởng là ngôi nhà công khai, có thể lập chỉ mục của một ý tưởng trên JoinOrigin — một trang rõ ràng nêu ý tưởng là gì, vì sao nó quan trọng, và nó dành cho ai, kèm hành động Tham gia. Mọi người khám phá nó qua mục Khám phá hoặc một liên kết chia sẻ, và việc tham gia dẫn họ đến phòng của ý tưởng.',
    },
    {
      question: 'Phòng được tạo khi nào?',
      answer:
        'Phòng được tự động tạo ngay khi bạn công bố ý tưởng. Người sáng lập sở hữu phòng từ giây đầu tiên và có thể mời, xóa, và gán vai trò bên trong Element. Bạn cũng có thể thiết lập cùng một hình dạng — một trang công khai cộng với một phòng — bằng những công cụ bạn đang dùng.',
    },
    {
      question: 'Làm thế nào mọi người tìm thấy ý tưởng của tôi?',
      answer:
        'Qua khám phá và chia sẻ: một trang ý tưởng có thể lập chỉ mục và xuất hiện trong mục Khám phá, và mọi liên kết tham gia bạn chia sẻ đều trỏ thẳng đến nó. Lưu lượng đầu đáng tin cậy nhất là cá nhân — chia sẻ trang và liên kết của nó với những người đã quan tâm đến vấn đề.',
    },
    {
      question: 'Sự khác biệt giữa một ý tưởng và một dự án là gì?',
      answer:
        'Một ý tưởng là một đề xuất quanh đó mọi người tụ họp — phòng là nơi những người quan tâm trao đổi và kiểm tra mức độ phù hợp. Một dự án là điều một nhóm đã hình thành bắt đầu làm cùng nhau, với trang dự án và phòng riêng. Hãy công bố ý tưởng trước; dự án theo sau khi mọi người cam kết.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi công bố một ý tưởng ngay hôm nay không?',
      answer:
        'Có. Công bố một ý tưởng trên JoinOrigin tạo trang và phòng của nó một cách nguyên tử — phòng mở ngay khi bạn công bố, và bạn kiểm soát nó từ đầu. Công bố ý tưởng của bạn và mở một phòng để thảo luận; mỗi thành viên mới bạn mời sẽ mở rộng tầm với của bạn.',
    },
  ],
  sections: [
    'Xác định ý tưởng trong một câu rõ ràng. Nén ý tưởng thành một câu duy nhất: nó dành cho ai, nó thay đổi điều gì, và vì sao nó quan trọng. Nếu bạn không thể nói nó trong một câu, bạn chưa sẵn sàng để công bố. JoinOrigin được thiết kế quanh các trang ý tưởng dễ tìm — một lời chào hàng một câu là cốt lõi của trang và là cụm từ mọi người sẽ tìm kiếm. Viết câu đó xuống và thử nghiệm với ba người trước khi đi xa hơn.',
    'Viết trang ý tưởng với một lời hứa và một nhu cầu. Trang nên nêu ý tưởng, vì sao nó quan trọng, nó cần gì, và bạn muốn ai tham gia. Hãy thành thật về vị trí của ý tưởng — một tia sáng, một nguyên mẫu, một sản phẩm. JoinOrigin tự động tạo trang và phòng khi bạn công bố một ý tưởng; người sáng lập kiểm soát phòng từ đầu và có thể mời, xóa, và gán vai trò bên trong Element. Công bố ý tưởng và mở một phòng để thảo luận quanh nó.',
    'Công bố ý tưởng và để phòng của nó mở. Công bố là khoảnh khắc ý tưởng trở nên dễ tìm. Trên JoinOrigin, công bố tự động tạo phòng — không bao giờ có bước "tạo trò chuyện sau", và người sáng lập sở hữu phòng từ giây đầu tiên. Trên JoinOrigin trang ý tưởng và phòng của nó là một lần công bố nguyên tử. Bạn cũng có thể chia sẻ trang công khai và thiết lập phòng bằng những công cụ bạn đang dùng.',
    'Chia sẻ liên kết tham gia. Liên kết tham gia là con đường ngắn nhất từ quan tâm đến kết nối: một liên kết, một cú nhấp, và một người quan tâm đặt chân vào phòng. Đặt nó ở mọi nơi những người phù hợp tụ họp. Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến ý tưởng của bạn là đủ.',
    'Mời những người quan tâm đầu tiên một cách cá nhân. Lời mời cá nhân chuyển đổi tốt hơn bài đăng công khai. Nhắn tin cho những người phù hợp với đối tượng của ý tưởng, chia sẻ liên kết tham gia, và nhờ họ mang theo một người khác có thể quan tâm. JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một ý tưởng có thể tìm thấy ý tưởng của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi người tham gia trở thành một kênh đến mạng lưới của riêng họ.',
    'Tổ chức cuộc trò chuyện đầu tiên trong phòng. Vài cuộc trò chuyện đầu tiên quyết định một ý tưởng có đà hay không. Mở phòng bằng một câu hỏi rõ ràng — vấn đề là gì, bước đầu tiên là gì, mỗi người mang lại điều gì — và để mọi người phản hồi. JoinOrigin không vận hành các cuộc trò chuyện này; phòng là của bạn để định hình. Nền tảng mang lại cho ý tưởng một phòng nơi quan tâm trở thành trò chuyện, và người sáng lập sở hữu phòng đó. Bắt đầu cuộc trò chuyện ở nơi những người của bạn đã hiện diện.',
    'Thu thập phản hồi và tinh chỉnh ý tưởng. Hỏi những người tham gia điều gì làm họ hào hứng, điều gì làm họ lo lắng, và họ sẽ làm gì đầu tiên. Điều chỉnh lời chào hàng, phạm vi, hoặc bước tiếp theo dựa trên câu trả lời của họ. JoinOrigin giữ ký ức chung của một ý tưởng ở một nơi — ghi chú, quyết định, và phản hồi trong phòng — để việc tinh chỉnh hiện hữu thay vì bị mất. Hỏi thành viên trực tiếp trong phòng sau tuần đầu tiên.',
    'Giữ cho ý tưởng dễ tìm khi nó phát triển. Xem lại trang khi ý tưởng phát triển — cập nhật lời hứa, nhu cầu, và bước tiếp theo để những người mới tham gia luôn thấy phiên bản hiện tại. Tăng trưởng nhân lên khi mọi thành viên có thể mô tả ý tưởng trong một câu và chia sẻ liên kết tham gia của nó. JoinOrigin giữ trang ý tưởng của bạn và phòng của nó kết nối khi quan tâm tăng — một nơi lời hứa, cuộc trò chuyện, và con người đều hiện hữu. Được khám phá và phát triển.',
  ],
  steps: [
    {
      title: 'Xác định ý tưởng trong một câu rõ ràng',
      body: 'Nén ý tưởng thành một câu duy nhất: nó dành cho ai, nó thay đổi điều gì, và vì sao nó quan trọng. Nếu bạn không thể nói nó trong một câu, bạn chưa sẵn sàng để công bố.',
      joinOriginNote:
        'JoinOrigin được thiết kế quanh các trang ý tưởng dễ tìm — một lời chào hàng một câu là cốt lõi của trang và là cụm từ mọi người sẽ tìm kiếm. Viết câu đó xuống và thử nghiệm với ba người trước khi đi xa hơn.',
    },
    {
      title: 'Viết trang ý tưởng với một lời hứa và một nhu cầu',
      body: 'Trang nên nêu ý tưởng, vì sao nó quan trọng, nó cần gì, và bạn muốn ai tham gia. Hãy thành thật về vị trí của ý tưởng — một tia sáng, một nguyên mẫu, một sản phẩm.',
      joinOriginNote:
        'JoinOrigin tự động tạo trang và phòng khi bạn công bố một ý tưởng; người sáng lập kiểm soát phòng từ đầu và có thể mời, xóa, và gán vai trò bên trong Element. Công bố ý tưởng và mở một phòng để thảo luận quanh nó.',
    },
    {
      title: 'Công bố ý tưởng và để phòng của nó mở',
      body: 'Công bố là khoảnh khắc ý tưởng trở nên dễ tìm. Trên JoinOrigin, công bố tự động tạo phòng — không bao giờ có bước "tạo trò chuyện sau", và người sáng lập sở hữu phòng từ giây đầu tiên.',
      joinOriginNote:
        'Trên JoinOrigin trang ý tưởng và phòng của nó là một lần công bố nguyên tử. Bạn cũng có thể chia sẻ trang công khai và thiết lập phòng bằng những công cụ bạn đang dùng.',
    },
    {
      title: 'Chia sẻ liên kết tham gia',
      body: 'Liên kết tham gia là con đường ngắn nhất từ quan tâm đến kết nối: một liên kết, một cú nhấp, và một người quan tâm đặt chân vào phòng. Đặt nó ở mọi nơi những người phù hợp tụ họp.',
      joinOriginNote:
        'Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến ý tưởng của bạn là đủ.',
    },
    {
      title: 'Mời những người quan tâm đầu tiên một cách cá nhân',
      body: 'Lời mời cá nhân chuyển đổi tốt hơn bài đăng công khai. Nhắn tin cho những người phù hợp với đối tượng của ý tưởng, chia sẻ liên kết tham gia, và nhờ họ mang theo một người khác có thể quan tâm.',
      joinOriginNote:
        'JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một ý tưởng có thể tìm thấy ý tưởng của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi người tham gia trở thành một kênh đến mạng lưới của riêng họ.',
    },
    {
      title: 'Tổ chức cuộc trò chuyện đầu tiên trong phòng',
      body: 'Vài cuộc trò chuyện đầu tiên quyết định một ý tưởng có đà hay không. Mở phòng bằng một câu hỏi rõ ràng — vấn đề là gì, bước đầu tiên là gì, mỗi người mang lại điều gì — và để mọi người phản hồi.',
      joinOriginNote:
        'JoinOrigin không vận hành các cuộc trò chuyện này; phòng là của bạn để định hình. Nền tảng mang lại cho ý tưởng một phòng nơi quan tâm trở thành trò chuyện, và người sáng lập sở hữu phòng đó. Bắt đầu cuộc trò chuyện ở nơi những người của bạn đã hiện diện.',
    },
    {
      title: 'Thu thập phản hồi và tinh chỉnh ý tưởng',
      body: 'Hỏi những người tham gia điều gì làm họ hào hứng, điều gì làm họ lo lắng, và họ sẽ làm gì đầu tiên. Điều chỉnh lời chào hàng, phạm vi, hoặc bước tiếp theo dựa trên câu trả lời của họ.',
      joinOriginNote:
        'JoinOrigin giữ ký ức chung của một ý tưởng ở một nơi — ghi chú, quyết định, và phản hồi trong phòng — để việc tinh chỉnh hiện hữu thay vì bị mất. Hỏi thành viên trực tiếp trong phòng sau tuần đầu tiên.',
    },
    {
      title: 'Giữ cho ý tưởng dễ tìm khi nó phát triển',
      body: 'Xem lại trang khi ý tưởng phát triển — cập nhật lời hứa, nhu cầu, và bước tiếp theo để những người mới tham gia luôn thấy phiên bản hiện tại. Tăng trưởng nhân lên khi mọi thành viên có thể mô tả ý tưởng trong một câu và chia sẻ liên kết tham gia của nó.',
      joinOriginNote:
        'JoinOrigin giữ trang ý tưởng của bạn và phòng của nó kết nối khi quan tâm tăng — một nơi lời hứa, cuộc trò chuyện, và con người đều hiện hữu. Được khám phá và phát triển.',
    },
  ],
};

export default content;
