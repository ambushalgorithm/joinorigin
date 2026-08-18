import type { GuideContent } from '../../types';

/**
 * "Cách Tổ chức một Buổi Gặp gỡ" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-326).
 *
 * Tái trọng tâm: các buổi gặp gỡ là điều một nhóm làm SAU KHI hình thành —
 * con đường kết nối → tham gia → phòng kỹ thuật số đến trước (công bố nhóm →
 * phòng tự tạo → thành viên tham gia qua liên kết), và buổi gặp gỡ trực tiếp
 * là một hệ quả phía sau. Giá trị JoinOrigin được đan vào phần mở đầu và mỗi
 * bước (joinOriginNote theo từng bước), với khung trung thực — JoinOrigin
 * không đặt địa điểm hoặc bố trí nhân sự sự kiện. Một H1, cấu trúc từng bước,
 * FAQ được phản chiếu 1:1 trong JSON-LD "FAQPage". "Room" được gắn với phòng
 * Matrix (§6.3) — địa điểm vật lý được mô tả là venue/không gian, không bao
 * giờ là "phòng".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'organize-a-meetup',
  title: 'Cách Tổ chức một Buổi Gặp gỡ: Địa điểm, Chương trình & Quảng bá | JoinOrigin',
  description:
    'Tổ chức một buổi gặp gỡ một khi nhóm của bạn đã hình thành — dù nó được thành lập tháng trước hay đã gặp gỡ nhiều năm — chọn một hình thức, đặt một địa điểm, xây dựng một chương trình, quảng bá nó, và vận hành buổi tối. Một danh sách kiểm tra thực tế từ JoinOrigin.',
  intro: [
    'Một buổi gặp gỡ là một sự kiện trực tiếp định kỳ nơi mọi người tụ họp quanh một sở thích chung — và trên JoinOrigin nó là một bước tiếp theo tự nhiên sau khi giao tiếp trong phòng. Con đường kỹ thuật số đến trước: mọi người tìm và tham gia một nhóm qua một liên kết, và phòng của nhóm trở thành nơi thành viên trò chuyện, lên kế hoạch, và duy trì kết nối giữa các buổi tụ họp. Buổi gặp gỡ trực tiếp là bước tiếp theo của cộng đồng đã hình thành đó — dù nhóm được thành lập tháng trước hay đã gặp gỡ thân mật nhiều năm, phòng cho nó một mái nhà có tổ chức từ đó một buổi gặp gỡ có thể phát triển.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm cộng đồng để tham gia và bắt đầu cộng đồng của riêng họ — vì vậy một buổi gặp gỡ có một mái nhà nơi thành viên quan tâm có thể khám phá nhóm, tham gia phòng của nó, và điều phối buổi tụ họp thay vì phụ thuộc vào danh bạ của một người. JoinOrigin không đặt địa điểm hoặc bố trí nhân sự sự kiện — toàn bộ mục đích của nền tảng là kết nối những người chia sẻ một sở thích, và bản thân buổi tụ họp là của bạn để vận hành.',
    'Hướng dẫn này bao phủ toàn bộ vòng đời của một buổi gặp gỡ sau khi nhóm tồn tại — cho một nhóm mới hình thành và cho một nhóm đã tụ họp nhiều năm: chọn một hình thức phù hợp với đối tượng của bạn, tìm và đặt một địa điểm không phá vỡ ngân sách, xây dựng một chương trình với thời gian bắt đầu và kết thúc rõ ràng, quảng bá sự kiện nơi đối tượng của bạn thực sự nhìn, và vận hành buổi tối để người tham dự rời đi muốn buổi tiếp theo. Mỗi bước kèm một ghi chú về cách JoinOrigin giúp — và bước đầu tiên là về nhóm kỹ thuật số, vì không có nhóm và phòng của nó thì không có cộng đồng để gặp gỡ.',
  ],
  dataPoints: [
    'Một buổi gặp gỡ đơn giản chỉ cần ba thứ: một hình thức, một địa điểm, và một kênh quảng bá.',
    'Buổi gặp gỡ buổi tối các ngày trong tuần và buổi sáng cuối tuần là các hình thức định kỳ phổ biến nhất.',
    'Hầu hết địa điểm — thư viện, quán cà phê, không gian làm việc chung — cung cấp không gian miễn phí hoặc chi phí thấp cho sự kiện cộng đồng.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm hoặc bắt đầu cộng đồng; nó không đặt địa điểm hoặc bố trí nhân sự sự kiện.',
  ],
  faq: [
    {
      question: 'Tôi nên quảng bá một buổi gặp gỡ trước bao lâu?',
      answer:
        'Hai đến ba tuần là một cân bằng tốt: đủ sớm để mọi người lên kế hoạch, đủ ngắn để giữ tính cấp bách. Thông báo trong phòng của nhóm trước, rồi chia sẻ sự kiện nơi đối tượng của bạn tụ họp. Gửi một lời nhắc hai ngày trước và lại vào ngày diễn ra sự kiện.',
    },
    {
      question: 'Nếu chỉ có vài người xuất hiện thì sao?',
      answer:
        'Điều đó là bình thường, đặc biệt giai đoạn đầu. Chạy buổi cho bất kỳ ai ở đó, thu thập phản hồi của họ trong phòng, và dùng phiên bản tiếp theo để cải thiện quảng bá. Tính nhất quán quan trọng hơn bất kỳ số lượng tham dự đơn lẻ nào.',
    },
    {
      question: 'Các buổi gặp gỡ có cần một chương trình chính thức không?',
      answer:
        'Có, một chương trình nhẹ. Một thời gian bắt đầu rõ ràng, một vòng giới thiệu ngắn, một hoạt động hoặc bài nói chuyện chính, và một thời gian kết thúc xác định làm người tham dự cảm thấy thời gian của họ được tôn trọng — đó là điều đưa họ quay lại.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi tổ chức các buổi gặp gỡ không?',
      answer:
        'Có. JoinOrigin giúp mọi người tìm và bắt đầu cộng đồng — một mái nhà kỹ thuật số có tổ chức nơi phòng của một nhóm là nơi thành viên điều phối và nơi một buổi gặp gỡ có thể được khám phá. JoinOrigin không tự tổ chức sự kiện, vì vậy các bước thực tế trong hướng dẫn này là của bạn để vận hành.',
    },
  ],
  sections: [
    'Hình thành nhóm và mở phòng của nó trước. Một buổi gặp gỡ là điều một nhóm làm sau khi hình thành — vì vậy hãy bắt đầu với cốt lõi kỹ thuật số: công bố nhóm, để phòng của nó tự động tạo, và mời thành viên qua một liên kết. Công bố một nhóm trên JoinOrigin tự động tạo phòng của nó, một không gian do người sáng lập kiểm soát nơi thành viên lên kế hoạch và duy trì kết nối. Thiết lập nhóm và phòng của nó bằng những công cụ bạn đang dùng trước khi bạn lên kế hoạch một sự kiện duy nhất nếu bạn thích.',
    'Chọn một hình thức phù hợp với đối tượng của bạn. Quyết định giữa một bài nói chuyện, một buổi hội thảo, một vòng tròn thảo luận, một buổi giao lưu xã hội, hoặc một buổi làm việc. Khớp hình thức với điều đối tượng muốn — học hỏi, kết nối, hoặc tiến bộ trên công việc chung. Trên JoinOrigin thành viên có thể thấy hình thức của một cộng đồng trước khi tham gia — thu hút đúng người và đặt kỳ vọng. Chọn một hình thức đối tượng của bạn thực sự sẽ xuất hiện.',
    'Chọn một ngày và nhịp độ. Buổi tối các ngày trong tuần và buổi sáng cuối tuần hoạt động tốt nhất cho hầu hết đối tượng. Chọn một khung giờ định kỳ — hàng tháng là chuẩn — và bảo vệ nó như một cuộc hẹn để mọi người có thể xây dựng thói quen. JoinOrigin làm cho nhịp của một cộng đồng hiện hữu trong một nơi, để thành viên biết ngày tiếp theo mà không phải tìm kiếm. Bảo vệ khung giờ định kỳ của bạn như một cuộc hẹn.',
    'Đặt một địa điểm sớm. Thư viện, quán cà phê, phòng khách không gian làm việc chung, trung tâm cộng đồng, và công viên tổ chức sự kiện cộng đồng với chi phí thấp hoặc miễn phí. Xác nhận sức chứa, giờ mở cửa, và bất kỳ yêu cầu đặt chỗ nào bằng văn bản. JoinOrigin không đặt địa điểm hoặc điều phối không gian vật lý — trọng tâm thiết kế của nó là kết nối con người trong phòng kỹ thuật số. Xác nhận sức chứa và giờ mở cửa trực tiếp với địa điểm bằng văn bản.',
    'Phác thảo một chương trình nhẹ. Giữ nó đơn giản: chào mừng và giới thiệu, hoạt động chính, thảo luận mở, kết thúc và ngày tiếp theo. Ước tính tổng cộng 60–90 phút và công bố chương trình cùng danh sách sự kiện và trong phòng. JoinOrigin là một hệ điều hành cộng đồng nơi các hiện vật chung như chương trình và ghi chú sống cạnh cộng đồng. Một chương trình đơn giản được công bố là đủ.',
    'Quảng bá nơi đối tượng của bạn đã hiện diện. Chia sẻ sự kiện trong các nhóm ngách, bản tin địa phương, bảng cộng đồng, và các kênh xã hội liên quan — và trỏ mọi người đến liên kết tham gia của nhóm để người tham dự trở thành thành viên, không phải khách một đêm. JoinOrigin là nơi những người đang tìm một cộng đồng tìm thấy nó và tham gia qua một liên kết. Quảng bá trong các nhóm ngách và bản tin nơi đối tượng của bạn đã tụ họp, và chia sẻ liên kết tham gia với mọi người tham dự.',
    'Vận hành buổi tối với một nhịp rõ ràng. Bắt đầu đúng giờ, chào người đến muộn, giữ hoạt động chính đúng hướng, và kết thúc bằng việc thông báo ngày tiếp theo. Kết thúc đúng giờ — đó là tín hiệu tôn trọng mạnh nhất. JoinOrigin không bố trí nhân sự sự kiện — trải nghiệm là của bạn. Nền tảng giữ câu chuyện của cộng đồng trong một phòng có tổ chức — lời hứa, nhịp, và con người. Kết thúc đúng giờ là tín hiệu tôn trọng mạnh nhất.',
    'Theo dõi trong vòng 24 giờ trong phòng. Cảm ơn người tham dự, chia sẻ bất kỳ liên kết hoặc ghi chú nào, và mời phản hồi nơi cả nhóm có thể thấy. Việc theo dõi là thứ biến một sự kiện đơn lẻ thành một cộng đồng định kỳ. JoinOrigin cho một cộng đồng một phòng bền vững nơi tóm tắt, ngày tiếp theo, và phản hồi sống — biến một sự kiện đơn lẻ thành một cộng đồng định kỳ. Được khám phá và giữ đà tiếp tục.',
  ],
  steps: [
    {
      title: 'Hình thành nhóm và mở phòng của nó trước',
      body: 'Một buổi gặp gỡ là điều một nhóm làm sau khi hình thành — vì vậy hãy bắt đầu với cốt lõi kỹ thuật số: công bố nhóm, để phòng của nó tự động tạo, và mời thành viên qua một liên kết.',
      joinOriginNote:
        'Công bố một nhóm trên JoinOrigin tự động tạo phòng của nó, một không gian do người sáng lập kiểm soát nơi thành viên lên kế hoạch và duy trì kết nối. Thiết lập nhóm và phòng của nó bằng những công cụ bạn đang dùng trước khi bạn lên kế hoạch một sự kiện duy nhất nếu bạn thích.',
    },
    {
      title: 'Chọn một hình thức phù hợp với đối tượng của bạn',
      body: 'Quyết định giữa một bài nói chuyện, một buổi hội thảo, một vòng tròn thảo luận, một buổi giao lưu xã hội, hoặc một buổi làm việc. Khớp hình thức với điều đối tượng muốn — học hỏi, kết nối, hoặc tiến bộ trên công việc chung.',
      joinOriginNote:
        'Trên JoinOrigin thành viên có thể thấy hình thức của một cộng đồng trước khi tham gia — thu hút đúng người và đặt kỳ vọng. Chọn một hình thức đối tượng của bạn thực sự sẽ xuất hiện.',
    },
    {
      title: 'Chọn một ngày và nhịp độ',
      body: 'Buổi tối các ngày trong tuần và buổi sáng cuối tuần hoạt động tốt nhất cho hầu hết đối tượng. Chọn một khung giờ định kỳ — hàng tháng là chuẩn — và bảo vệ nó như một cuộc hẹn để mọi người có thể xây dựng thói quen.',
      joinOriginNote:
        'JoinOrigin làm cho nhịp của một cộng đồng hiện hữu trong một nơi, để thành viên biết ngày tiếp theo mà không phải tìm kiếm. Bảo vệ khung giờ định kỳ của bạn như một cuộc hẹn.',
    },
    {
      title: 'Đặt một địa điểm sớm',
      body: 'Thư viện, quán cà phê, phòng khách không gian làm việc chung, trung tâm cộng đồng, và công viên tổ chức sự kiện cộng đồng với chi phí thấp hoặc miễn phí. Xác nhận sức chứa, giờ mở cửa, và bất kỳ yêu cầu đặt chỗ nào bằng văn bản.',
      joinOriginNote:
        'JoinOrigin không đặt địa điểm hoặc điều phối không gian vật lý — trọng tâm thiết kế của nó là kết nối con người trong phòng kỹ thuật số. Xác nhận sức chứa và giờ mở cửa trực tiếp với địa điểm bằng văn bản.',
    },
    {
      title: 'Phác thảo một chương trình nhẹ',
      body: 'Giữ nó đơn giản: chào mừng và giới thiệu, hoạt động chính, thảo luận mở, kết thúc và ngày tiếp theo. Ước tính tổng cộng 60–90 phút và công bố chương trình cùng danh sách sự kiện và trong phòng.',
      joinOriginNote:
        'JoinOrigin là một hệ điều hành cộng đồng nơi các hiện vật chung như chương trình và ghi chú sống cạnh cộng đồng. Một chương trình đơn giản được công bố là đủ.',
    },
    {
      title: 'Quảng bá nơi đối tượng của bạn đã hiện diện',
      body: 'Chia sẻ sự kiện trong các nhóm ngách, bản tin địa phương, bảng cộng đồng, và các kênh xã hội liên quan — và trỏ mọi người đến liên kết tham gia của nhóm để người tham dự trở thành thành viên, không phải khách một đêm.',
      joinOriginNote:
        'JoinOrigin là nơi những người đang tìm một cộng đồng tìm thấy nó và tham gia qua một liên kết. Quảng bá trong các nhóm ngách và bản tin nơi đối tượng của bạn đã tụ họp, và chia sẻ liên kết tham gia với mọi người tham dự.',
    },
    {
      title: 'Vận hành buổi tối với một nhịp rõ ràng',
      body: 'Bắt đầu đúng giờ, chào người đến muộn, giữ hoạt động chính đúng hướng, và kết thúc bằng việc thông báo ngày tiếp theo. Kết thúc đúng giờ — đó là tín hiệu tôn trọng mạnh nhất.',
      joinOriginNote:
        'JoinOrigin không bố trí nhân sự sự kiện — trải nghiệm là của bạn. Nền tảng giữ câu chuyện của cộng đồng trong một phòng có tổ chức — lời hứa, nhịp, và con người. Kết thúc đúng giờ là tín hiệu tôn trọng mạnh nhất.',
    },
    {
      title: 'Theo dõi trong vòng 24 giờ trong phòng',
      body: 'Cảm ơn người tham dự, chia sẻ bất kỳ liên kết hoặc ghi chú nào, và mời phản hồi nơi cả nhóm có thể thấy. Việc theo dõi là thứ biến một sự kiện đơn lẻ thành một cộng đồng định kỳ.',
      joinOriginNote:
        'JoinOrigin cho một cộng đồng một phòng bền vững nơi tóm tắt, ngày tiếp theo, và phản hồi sống — biến một sự kiện đơn lẻ thành một cộng đồng định kỳ. Được khám phá và giữ đà tiếp tục.',
    },
  ],
};

export default content;
