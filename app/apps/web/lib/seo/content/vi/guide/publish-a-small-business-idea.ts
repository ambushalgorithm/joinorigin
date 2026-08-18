import type { GuideContent } from '../../types';

/**
 * "Cách Công bố một Ý tưởng Kinh doanh Nhỏ" — hướng dẫn cấp L1 dài hạn
 * (design §6.1, TASK-353).
 *
 * Viết theo vòng lặp cốt lõi màn hình sản phẩm §2: công bố một ý tưởng
 * kinh doanh nhỏ → trang ý tưởng công khai → Tham gia qua liên kết → phòng
 * tự tạo NGAY KHI CÔNG BỐ → người sáng lập kiểm soát phòng → bảng tin/mời
 * phát triển. Trang ý tưởng là lời hứa của mặt tiền cửa hàng; phòng là nơi
 * khách hàng, cộng tác viên, và những người tin tưởng sớm tụ họp quanh
 * doanh nghiệp. Nền tảng đã hoạt động: công bố một ý tưởng tạo trang và
 * phòng ngay bây giờ. "Room" được gắn với phòng Matrix (§6.3). Cụm từ này
 * không bao giờ được dùng trong văn bản chính thức.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'publish-a-small-business-idea',
  title: 'Cách Công bố một Ý tưởng Kinh doanh Nhỏ: Trang Ý tưởng + Phòng | JoinOrigin',
  description:
    'Công bố một ý tưởng kinh doanh nhỏ trên JoinOrigin — dù bạn đang khởi động một dự án kinh doanh mới hay một doanh nghiệp hiện hữu chia sẻ những gì nó cung cấp, viết một trang ý tưởng công khai, mở phòng của nó tự động, và mời khách hàng cùng cộng tác viên muốn thấy nó thành hiện thực. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Các doanh nghiệp nhỏ thường bắt đầu theo cùng một cách — ai đó nhận thấy một vấn đề thực tế trong khu phố, nơi làm việc, hoặc sở thích của họ, và họ không thể ngừng nghĩ về giải pháp — nhưng nhiều doanh nghiệp khác đã đang hoạt động: một cửa hàng chạy, một dịch vụ đang phục vụ, một sản phẩm có khách hàng. Dù doanh nghiệp của bạn vẫn còn là một tia sáng hay đã phục vụ mọi người, bước tiếp theo là giống nhau: biến những gì bạn có thành thứ người khác có thể thấy, phản ứng, và tham gia. Một doanh nghiệp nhỏ cần một mái nhà công khai, và nó cần những người xung quanh — trước khi nó cần một mặt tiền cửa hàng, và rất lâu sau khi một mặt tiền tồn tại.',
    'Vòng lặp JoinOrigin hoạt động như thế này: bạn công bố một ý tưởng kinh doanh nhỏ, trang ý tưởng công khai của nó xuất hiện, và phòng của nó được tự động tạo tại thời điểm công bố. Mọi người khám phá trang hoặc theo một liên kết, việc tham gia chỉ là một cú nhấp, và họ đặt chân vào phòng — một phòng Matrix do người sáng lập kiểm soát, nơi khách hàng, cộng tác viên, và những người tin tưởng sớm có thể đặt câu hỏi, chia sẻ phản hồi, và tham gia. Người sáng lập sở hữu phòng từ giây đầu tiên và quyết định ai tham gia và điều gì xảy ra bên trong.',
    'Hướng dẫn này đi qua việc công bố một ý tưởng kinh doanh nhỏ theo cách bạn mở một cửa hàng: đặt tên khách hàng và vấn đề, viết trang ý tưởng như một mặt tiền cửa hàng, công bố nó và mở phòng, chia sẻ trang với mạng lưới địa phương của bạn, mời khách hàng và cộng tác viên sớm, lắng nghe trong phòng, tinh chỉnh đề xuất từ phản hồi thực tế, và phát triển phòng thành cơ sở khách hàng đầu tiên của bạn.',
  ],
  dataPoints: [
    'Các ý tưởng kinh doanh nhỏ rõ ràng nhất bắt đầu từ một khách hàng được đặt tên và một vấn đề cụ thể, không phải một đối tượng chung chung.',
    'Trên JoinOrigin, công bố một ý tưởng tự động tạo phòng của nó — doanh nghiệp có một nơi cho khách hàng và cộng tác viên từ đầu.',
    'Một liên kết tham gia là lời mời đơn giản nhất: một liên kết, một cú nhấp, và một người quan tâm đã ở trong phòng.',
    'JoinOrigin là một hệ điều hành cộng đồng giúp mọi người tìm thấy ý tưởng và những người đứng sau chúng — công bố ý tưởng của bạn và phòng của nó mở ngay lập tức.',
  ],
  faq: [
    {
      question: 'Một ý tưởng kinh doanh nhỏ khác một trang ý tưởng thông thường như thế nào?',
      answer:
        'Định dạng trang là giống nhau, nhưng lời hứa sắc nét hơn: một khách hàng, một vấn đề, và một đề xuất. Trong khi một ý tưởng chung chung mời cộng tác viên, một trang ý tưởng kinh doanh nhỏ mời khách hàng sớm và những người tin tưởng địa phương — những người thực sự sẽ mua, giới thiệu, hoặc giúp bạn bắt đầu hoặc phát triển những gì đang chạy.',
    },
    {
      question: 'Phòng được tạo khi nào cho ý tưởng kinh doanh của tôi?',
      answer:
        'Phòng được tự động tạo ngay khi bạn công bố ý tưởng. Người sáng lập sở hữu phòng từ giây đầu tiên và có thể mời, xóa, và gán vai trò bên trong Element. Bạn cũng có thể mở một phòng bằng những công cụ bạn đang dùng và mời những người quan tâm đến vấn đề.',
    },
    {
      question: 'Ai nên tham gia một phòng ý tưởng kinh doanh nhỏ?',
      answer:
        'Khách hàng sớm, những người có kỹ năng bạn đang thiếu, và người địa phương có thể giới thiệu bạn. Phòng là nơi bạn kiểm tra nhu cầu, tinh chỉnh đề xuất, và tìm những người tin tưởng đầu tiên — trước khi bạn chi tiền cho hàng tồn kho, hợp đồng thuê, hoặc tiếp thị.',
    },
    {
      question: 'Trang ý tưởng nên hứa điều gì?',
      answer:
        'Một khách hàng được đặt tên, một vấn đề, và điều bạn dự định cung cấp. Hãy thành thật về giai đoạn — "Tôi đang thử nghiệm ý tưởng này và muốn nói chuyện với những người cảm thấy vấn đề này" là một lời hứa mạnh. Trang quyết định liệu đúng người có nhấp Tham gia hay không.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi công bố một ý tưởng kinh doanh nhỏ ngay hôm nay không?',
      answer:
        'Có. Công bố một ý tưởng trên JoinOrigin tạo trang và phòng của nó một cách nguyên tử — phòng mở ngay khi bạn công bố, và bạn kiểm soát nó từ đầu. Công bố ý tưởng ở một nơi công khai và mở một phòng để thảo luận; mỗi thành viên mới bạn mời sẽ mở rộng tầm với của bạn.',
    },
  ],
  sections: [
    'Đặt tên khách hàng và vấn đề. Trước khi bạn viết bất cứ điều gì, hãy đặt tên người cụ thể cảm thấy vấn đề này và mô tả vấn đề bằng lời của họ. Một doanh nghiệp nhỏ thành công khi nó phục vụ tốt một nhu cầu thực tế. JoinOrigin được thiết kế quanh các trang ý tưởng dễ tìm, và các trang rõ ràng nhất bắt đầu từ một khách hàng được đặt tên. Viết khách hàng và vấn đề xuống và thử nghiệm chúng với ba người phù hợp.',
    'Viết trang ý tưởng như một mặt tiền cửa hàng. Trang nên cho thấy bạn đang cung cấp gì, nó dành cho ai, nó tốn bao nhiêu thời gian hoặc tiền bạc, và ý tưởng đang ở giai đoạn nào. Giữ nó cụ thể — một cửa hàng tạm, một sản phẩm, một dịch vụ, một cửa hàng. Công bố một ý tưởng trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Phác thảo trang như một bài đăng công khai ngắn và tinh chỉnh nó bằng phản hồi.',
    'Công bố ý tưởng và mở phòng của nó. Công bố là khoảnh khắc ý tưởng kinh doanh trở nên dễ tìm. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó. Trên JoinOrigin trang, phòng, và liên kết tham gia là một lần công bố. Công bố ý tưởng công khai và mở một phòng cho cuộc trò chuyện quanh nó.',
    'Chia sẻ trang với mạng lưới địa phương của bạn. Các doanh nghiệp nhỏ phát triển qua tầm với địa phương. Chia sẻ trang ý tưởng với hàng xóm, đồng nghiệp, nhóm địa phương, và bất kỳ ai biết vấn đề tận mắt. Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến ý tưởng của bạn là đủ.',
    'Mời khách hàng và cộng tác viên sớm. Mời những người thực sự sẽ mua hoặc giúp đỡ: khách hàng tiềm năng, ai đó có kỹ năng bạn đang thiếu, một người cố vấn, hoặc một người tổ chức địa phương. JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một ý tưởng có thể tìm thấy ý tưởng của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi người tham gia trở thành một kênh đến mạng lưới của riêng họ.',
    'Lắng nghe trong phòng. Hỏi những người tham gia họ sẽ dùng đề xuất như thế nào, họ sẽ trả bao nhiêu, và điều gì cản trở họ. Phòng là nơi nhu cầu thực tế xuất hiện — hoặc không. JoinOrigin không vận hành các cuộc trò chuyện này; phòng là của bạn để định hình. Nền tảng mang lại cho ý tưởng kinh doanh một phòng nơi quan tâm trở thành phản hồi, và người sáng lập sở hữu phòng đó. Hỏi thành viên trực tiếp trong phòng.',
    'Tinh chỉnh đề xuất từ phản hồi thực tế. Điều chỉnh giá, phạm vi, kênh, hoặc lời hứa dựa trên điều những người tham gia nói. Các doanh nghiệp nhỏ được xây dựng qua các vòng lặp nhỏ. JoinOrigin giữ ký ức chung của một ý tưởng ở một nơi — ghi chú, quyết định, và phản hồi trong phòng — để việc tinh chỉnh hiện hữu thay vì bị mất. Thay đổi một điều tại một thời điểm và quan sát phản ứng.',
    'Phát triển phòng thành cơ sở khách hàng đầu tiên của bạn. Tiếp tục mời, tiếp tục chia sẻ cập nhật, và giữ phòng sống khi đề xuất chắc chắn hơn. Những người trong phòng là khách hàng đầu tiên và những người quảng bá đầu tiên của bạn. JoinOrigin giữ trang ý tưởng của bạn và phòng của nó kết nối khi doanh nghiệp phát triển — một nơi lời hứa, cuộc trò chuyện, và con người đều hiện hữu. Được khám phá và phát triển.',
  ],
  steps: [
    {
      title: 'Đặt tên khách hàng và vấn đề',
      body: 'Trước khi bạn viết bất cứ điều gì, hãy đặt tên người cụ thể cảm thấy vấn đề này và mô tả vấn đề bằng lời của họ. Một doanh nghiệp nhỏ thành công khi nó phục vụ tốt một nhu cầu thực tế.',
      joinOriginNote:
        'JoinOrigin được thiết kế quanh các trang ý tưởng dễ tìm, và các trang rõ ràng nhất bắt đầu từ một khách hàng được đặt tên. Viết khách hàng và vấn đề xuống và thử nghiệm chúng với ba người phù hợp.',
    },
    {
      title: 'Viết trang ý tưởng như một mặt tiền cửa hàng',
      body: 'Trang nên cho thấy bạn đang cung cấp gì, nó dành cho ai, nó tốn bao nhiêu thời gian hoặc tiền bạc, và ý tưởng đang ở giai đoạn nào. Giữ nó cụ thể — một cửa hàng tạm, một sản phẩm, một dịch vụ, một cửa hàng.',
      joinOriginNote:
        'Công bố một ý tưởng trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Phác thảo trang như một bài đăng công khai ngắn và tinh chỉnh nó bằng phản hồi.',
    },
    {
      title: 'Công bố ý tưởng và mở phòng của nó',
      body: 'Công bố là khoảnh khắc ý tưởng kinh doanh trở nên dễ tìm. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó.',
      joinOriginNote:
        'Trên JoinOrigin trang, phòng, và liên kết tham gia là một lần công bố. Công bố ý tưởng công khai và mở một phòng cho cuộc trò chuyện quanh nó.',
    },
    {
      title: 'Chia sẻ trang với mạng lưới địa phương của bạn',
      body: 'Các doanh nghiệp nhỏ phát triển qua tầm với địa phương. Chia sẻ trang ý tưởng với hàng xóm, đồng nghiệp, nhóm địa phương, và bất kỳ ai biết vấn đề tận mắt.',
      joinOriginNote:
        'Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang công khai hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết ngắn, rõ ràng đến ý tưởng của bạn là đủ.',
    },
    {
      title: 'Mời khách hàng và cộng tác viên sớm',
      body: 'Mời những người thực sự sẽ mua hoặc giúp đỡ: khách hàng tiềm năng, ai đó có kỹ năng bạn đang thiếu, một người cố vấn, hoặc một người tổ chức địa phương.',
      joinOriginNote:
        'JoinOrigin làm cho việc khám phá dễ dàng hơn — một nơi những người đang tìm một ý tưởng có thể tìm thấy ý tưởng của bạn và tham gia qua một liên kết. Lời mời cá nhân vẫn làm phần nặng nhọc, và mỗi người tham gia trở thành một kênh đến mạng lưới của riêng họ.',
    },
    {
      title: 'Lắng nghe trong phòng',
      body: 'Hỏi những người tham gia họ sẽ dùng đề xuất như thế nào, họ sẽ trả bao nhiêu, và điều gì cản trở họ. Phòng là nơi nhu cầu thực tế xuất hiện — hoặc không.',
      joinOriginNote:
        'JoinOrigin không vận hành các cuộc trò chuyện này; phòng là của bạn để định hình. Nền tảng mang lại cho ý tưởng kinh doanh một phòng nơi quan tâm trở thành phản hồi, và người sáng lập sở hữu phòng đó. Hỏi thành viên trực tiếp trong phòng.',
    },
    {
      title: 'Tinh chỉnh đề xuất từ phản hồi thực tế',
      body: 'Điều chỉnh giá, phạm vi, kênh, hoặc lời hứa dựa trên điều những người tham gia nói. Các doanh nghiệp nhỏ được xây dựng qua các vòng lặp nhỏ.',
      joinOriginNote:
        'JoinOrigin giữ ký ức chung của một ý tưởng ở một nơi — ghi chú, quyết định, và phản hồi trong phòng — để việc tinh chỉnh hiện hữu thay vì bị mất. Thay đổi một điều tại một thời điểm và quan sát phản ứng.',
    },
    {
      title: 'Phát triển phòng thành cơ sở khách hàng đầu tiên của bạn',
      body: 'Tiếp tục mời, tiếp tục chia sẻ cập nhật, và giữ phòng sống khi đề xuất chắc chắn hơn. Những người trong phòng là khách hàng đầu tiên và những người quảng bá đầu tiên của bạn.',
      joinOriginNote:
        'JoinOrigin giữ trang ý tưởng của bạn và phòng của nó kết nối khi doanh nghiệp phát triển — một nơi lời hứa, cuộc trò chuyện, và con người đều hiện hữu. Được khám phá và phát triển.',
    },
  ],
};

export default content;
