import type { GuideContent } from '../../types';

/**
 * "Cách Tạo một Dự án" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-353).
 *
 * Viết theo vòng lặp cốt lõi màn hình sản phẩm §2: một nhóm đã hình thành
 * chuyển từ trò chuyện sang công việc chung bằng cách công bố một dự án;
 * trang dự án công khai, phòng của nó tự tạo NGAY KHI CÔNG BỐ, người sáng
 * lập kiểm soát phòng, và tiến độ chảy vào bảng tin. Nền tảng đã hoạt động:
 * công bố một dự án mở trang và phòng ngay bây giờ. "Room" được gắn với
 * phòng Matrix (§6.3). Cụm từ này không bao giờ được dùng trong văn bản
 * chính thức.
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'create-a-project',
  title: 'Cách Tạo một Dự án: Biến Đà của Nhóm Thành Công Việc Chung | JoinOrigin',
  description:
    'Tạo một dự án trên JoinOrigin — dù đó là một ý tưởng hoàn toàn mới hay công việc đã đang tiến hành — công bố một trang dự án chung, mở phòng của nó tự động, và biến cuộc trò chuyện của một nhóm thành công việc được hoàn thành. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Một nhóm chỉ biết trò chuyện rồi sẽ trì trệ. Sự khác biệt giữa một cộng đồng cảm thấy sống động và một cộng đồng lụi tàn là công việc chung — một dự án có tên, có mục tiêu, và có một nơi tiến độ hiện hữu. Biến một cuộc trò chuyện thành một dự án cũng là một vấn đề kết nối con người: bạn cần đúng người, đúng cam kết, và một nơi rõ ràng để cùng làm việc. Điều tương tự cũng đúng khi dự án đã tồn tại — nằm rải rác trong các tệp, tin nhắn, và danh sách việc cần làm của một người — nó vẫn cần một mái nhà hiện hữu và đúng người xung quanh.',
    'Luồng JoinOrigin xử lý bước chuyển đó: một nhóm đã hình thành công bố một dự án, và trang dự án xuất hiện công khai với phòng của nó được tự động tạo tại thời điểm công bố. Thành viên tham gia phòng dự án qua một liên kết, người sáng lập kiểm soát nó với tư cách chủ phòng, và cập nhật từ phòng chảy vào bảng tin để cả mạng lưới thấy công việc. Phòng dự án mở ngay khi bạn công bố — không có bước thiết lập nào ở giữa.',
    'Hướng dẫn này đi từ tia sáng đầu tiên đến một nhịp làm việc — dù dự án hoàn toàn mới hay đã đang tiến hành: bắt đầu từ một nhóm hiện hữu và phòng của nó, xác định phạm vi thực sự có thể hoàn thành, viết trang dự án, công bố nó và mở phòng, mời đội ngũ làm việc, thống nhất vai trò và một cột mốc đầu tiên, đưa công việc thực tế vào phòng, và chia sẻ tiến độ để xây dựng đà.',
  ],
  dataPoints: [
    'Các dự án có trang công khai và một cột mốc đầu tiên rõ ràng dễ thu hút người hơn — mọi người tham gia công việc họ có thể nhìn thấy.',
    'Trên JoinOrigin, công bố một dự án tự động tạo phòng của nó — không gian làm việc tồn tại từ cùng thời điểm với trang.',
    'Một phòng dự án mang lại cho công việc một mái nhà: quyết định, tệp, và tiến độ hiện hữu với mọi người tham gia.',
    'JoinOrigin là một hệ điều hành cộng đồng giúp các nhóm đã hình thành biến cuộc trò chuyện thành dự án — công bố dự án của bạn và phòng của nó mở ngay lập tức.',
  ],
  faq: [
    {
      question: 'Điều gì khiến một nhóm sẵn sàng bắt đầu một dự án?',
      answer:
        'Một nhóm sẵn sàng khi một vài thành viên chia sẻ một kết quả cụ thể và sẵn lòng cam kết thời gian. Bạn không cần một đội lớn — ba người cam kết với một cột mốc rõ ràng hơn một chục thành viên tò mò. Công bố dự án khi cuộc trò chuyện lặp lại: "chúng ta nên thực sự làm điều này."',
    },
    {
      question: 'Phòng dự án được tạo khi nào?',
      answer:
        'Phòng được tự động tạo ngay khi bạn công bố dự án. Người sáng lập sở hữu phòng từ đầu và có thể mời đội ngũ làm việc, gán vai trò, và giữ công việc có tổ chức bên trong Element. Bạn cũng có thể tạo cùng hình dạng bằng những công cụ nhóm của bạn đang dùng.',
    },
    {
      question: 'Một dự án khác một ý tưởng như thế nào?',
      answer:
        'Một ý tưởng là một đề xuất quanh đó mọi người tụ họp — phòng của nó là nơi quan tâm và mức độ phù hợp được kiểm tra. Một dự án là công việc chung một nhóm đã hình thành cam kết, với một trang, một phòng, và một cột mốc. Công bố một ý tưởng trước khi bạn cần người; công bố một dự án khi bạn đã có họ.',
    },
    {
      question: 'Cột mốc đầu tiên nên là gì?',
      answer:
        'Nhỏ và có thể hoàn thành — một bản nháp làm việc, một thử nghiệm, một phiên bản đầu tiên, hoặc một sản phẩm bàn giao hoàn tất trong vài tuần. Một cột mốc đầu ngắn xây dựng niềm tin trong nhóm và làm dự án trở nên thực tế với người mới tham gia. Bạn luôn có thể mở rộng sau chiến thắng đầu tiên.',
    },
    {
      question: 'JoinOrigin có thể giúp một nhóm bắt đầu một dự án ngay hôm nay không?',
      answer:
        'Có. Công bố một dự án trên JoinOrigin tạo trang và phòng của nó một cách nguyên tử — phòng mở ngay khi bạn công bố, và người sáng lập kiểm soát nó. Chọn mục tiêu của nhóm, tạo một mái nhà dự án chung, và mở một phòng cho công việc; mỗi thành viên mới bạn mời sẽ mở rộng tầm với của bạn.',
    },
  ],
  sections: [
    'Bắt đầu từ một nhóm hiện hữu và phòng của nó. Một dự án lớn lên từ một nhóm đã có niềm tin và đà. Nhìn vào các cuộc trò chuyện trong phòng của nhóm và tìm nhu cầu lặp lại — điều các thành viên cứ nói "chúng ta nên làm." JoinOrigin giữ một cộng đồng sống trong một phòng do người sáng lập kiểm soát, và dự án là lớp tiếp theo trên phòng đó. Nêu tên nhu cầu lặp lại trong nhóm và kiểm tra xem có ai muốn hành động về nó.',
    'Xác định một phạm vi thực sự có thể hoàn thành. Viết xuống dự án sẽ tạo ra gì, cho ai, và trong khung thời gian nào. Giữ phiên bản đầu tiên đủ nhỏ để nhóm có thể hoàn thành. JoinOrigin được thiết kế quanh các dự án có trang công khai — một phạm vi rõ ràng là điều làm trang dễ đọc và phòng tập trung. Một câu nói rõ điều gì được hoàn thành và khi nào là đủ để bắt đầu.',
    'Viết trang dự án. Trang nên nêu mục tiêu của dự án, vấn đề nó giải quyết, ai đang làm việc trên nó, và nó cần gì. Hãy thành thật về giai đoạn — một bản nháp sớm là ổn. Công bố một dự án trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Công bố mô tả dự án ở một nơi nhóm có thể trỏ mọi người đến.',
    'Công bố dự án và mở phòng của nó. Công bố là điều làm dự án trở nên thực tế: một trang công khai cộng một phòng nơi công việc sống. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó. Trên JoinOrigin trang, phòng, và đội ngũ làm việc là một lần công bố. Tạo trang và phòng bằng những công cụ nhóm của bạn đang dùng nếu bạn thích.',
    'Mời đội ngũ làm việc vào phòng. Mời những người thực sự sẽ làm công việc — một đội nhỏ, cam kết tốt hơn một khán giả lớn. Chia sẻ liên kết tham gia và nhờ mỗi người xác nhận thời gian của họ. Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang dự án hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết rõ ràng đến phòng dự án là đủ.',
    'Thống nhất vai trò và một cột mốc đầu tiên. Nêu rõ ai sở hữu điều gì, nhóm kiểm tra bao lâu một lần, và cột mốc đầu tiên mọi người đang hướng tới. Viết nó xuống nơi cả đội có thể thấy. JoinOrigin không gán vai trò cho bạn — quyền kiểm soát của người sáng lập nghĩa là bạn quyết định. Nền tảng giữ vai trò và cột mốc hiện hữu trong phòng dự án. Một kế hoạch ngắn viết trong phòng là đủ.',
    'Đưa công việc thực tế vào phòng. Thay "chúng ta nên" bằng "đây là bản nháp," "đây là quyết định," và "đây là nhiệm vụ tiếp theo." Giữ tiến độ ở một nơi hiện hữu để mọi người có thể theo dõi. JoinOrigin giữ phòng của một dự án chứa công việc — quyết định, tệp, và cập nhật — thay vì rải rác chúng qua các tin nhắn riêng tư. Giữ các sản phẩm làm việc trong phòng chung từ tuần đầu tiên.',
    'Chia sẻ tiến độ để xây dựng đà. Đăng cập nhật khi dự án tiến lên, ăn mừng cột mốc khi nó đạt được, và mời nhóm rộng hơn tham gia hoặc theo dõi. Tiến độ trong bảng tin biến một dự án thành bằng chứng cộng đồng tạo ra kết quả. Cập nhật phòng chảy vào bảng tin trên JoinOrigin — vòng lặp tăng trưởng nơi mỗi thành viên mới mở rộng bề mặt khám phá. Được khám phá và phát triển.',
  ],
  steps: [
    {
      title: 'Bắt đầu từ một nhóm hiện hữu và phòng của nó',
      body: 'Một dự án lớn lên từ một nhóm đã có niềm tin và đà. Nhìn vào các cuộc trò chuyện trong phòng của nhóm và tìm nhu cầu lặp lại — điều các thành viên cứ nói "chúng ta nên làm."',
      joinOriginNote:
        'JoinOrigin giữ một cộng đồng sống trong một phòng do người sáng lập kiểm soát, và dự án là lớp tiếp theo trên phòng đó. Nêu tên nhu cầu lặp lại trong nhóm và kiểm tra xem có ai muốn hành động về nó.',
    },
    {
      title: 'Xác định một phạm vi thực sự có thể hoàn thành',
      body: 'Viết xuống dự án sẽ tạo ra gì, cho ai, và trong khung thời gian nào. Giữ phiên bản đầu tiên đủ nhỏ để nhóm có thể hoàn thành.',
      joinOriginNote:
        'JoinOrigin được thiết kế quanh các dự án có trang công khai — một phạm vi rõ ràng là điều làm trang dễ đọc và phòng tập trung. Một câu nói rõ điều gì được hoàn thành và khi nào là đủ để bắt đầu.',
    },
    {
      title: 'Viết trang dự án',
      body: 'Trang nên nêu mục tiêu của dự án, vấn đề nó giải quyết, ai đang làm việc trên nó, và nó cần gì. Hãy thành thật về giai đoạn — một bản nháp sớm là ổn.',
      joinOriginNote:
        'Công bố một dự án trên JoinOrigin tự động tạo trang và phòng của nó, với người sáng lập kiểm soát phòng từ đầu. Công bố mô tả dự án ở một nơi nhóm có thể trỏ mọi người đến.',
    },
    {
      title: 'Công bố dự án và mở phòng của nó',
      body: 'Công bố là điều làm dự án trở nên thực tế: một trang công khai cộng một phòng nơi công việc sống. Trên JoinOrigin, phòng được tự động tạo ở cùng thời điểm — không có bước thiết lập riêng, và người sáng lập sở hữu nó.',
      joinOriginNote:
        'Trên JoinOrigin trang, phòng, và đội ngũ làm việc là một lần công bố. Tạo trang và phòng bằng những công cụ nhóm của bạn đang dùng nếu bạn thích.',
    },
    {
      title: 'Mời đội ngũ làm việc vào phòng',
      body: 'Mời những người thực sự sẽ làm công việc — một đội nhỏ, cam kết tốt hơn một khán giả lớn. Chia sẻ liên kết tham gia và nhờ mỗi người xác nhận thời gian của họ.',
      joinOriginNote:
        'Tham gia trên JoinOrigin là một hành động duy nhất — nhấp Tham gia trên trang dự án hoặc theo một liên kết mời trực tiếp từ một thành viên. Một liên kết rõ ràng đến phòng dự án là đủ.',
    },
    {
      title: 'Thống nhất vai trò và một cột mốc đầu tiên',
      body: 'Nêu rõ ai sở hữu điều gì, nhóm kiểm tra bao lâu một lần, và cột mốc đầu tiên mọi người đang hướng tới. Viết nó xuống nơi cả đội có thể thấy.',
      joinOriginNote:
        'JoinOrigin không gán vai trò cho bạn — quyền kiểm soát của người sáng lập nghĩa là bạn quyết định. Nền tảng giữ vai trò và cột mốc hiện hữu trong phòng dự án. Một kế hoạch ngắn viết trong phòng là đủ.',
    },
    {
      title: 'Đưa công việc thực tế vào phòng',
      body: 'Thay "chúng ta nên" bằng "đây là bản nháp," "đây là quyết định," và "đây là nhiệm vụ tiếp theo." Giữ tiến độ ở một nơi hiện hữu để mọi người có thể theo dõi.',
      joinOriginNote:
        'JoinOrigin giữ phòng của một dự án chứa công việc — quyết định, tệp, và cập nhật — thay vì rải rác chúng qua các tin nhắn riêng tư. Giữ các sản phẩm làm việc trong phòng chung từ tuần đầu tiên.',
    },
    {
      title: 'Chia sẻ tiến độ để xây dựng đà',
      body: 'Đăng cập nhật khi dự án tiến lên, ăn mừng cột mốc khi nó đạt được, và mời nhóm rộng hơn tham gia hoặc theo dõi. Tiến độ trong bảng tin biến một dự án thành bằng chứng cộng đồng tạo ra kết quả.',
      joinOriginNote:
        'Cập nhật phòng chảy vào bảng tin trên JoinOrigin — vòng lặp tăng trưởng nơi mỗi thành viên mới mở rộng bề mặt khám phá. Được khám phá và phát triển.',
    },
  ],
};

export default content;
