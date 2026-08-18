import type { GuideContent } from '../../types';

/**
 * "Cách Tìm một Đồng sáng lập" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-326).
 *
 * Tái trọng tâm vào mô hình kết nối → tham gia → phòng kỹ thuật số: một trang
 * ý tưởng được công bố, phòng của nó tự động tạo, và các cuộc trò chuyện đồng
 * sáng lập diễn ra trong phòng đó — nơi kỹ thuật số các ứng viên có thể tìm
 * thấy ý tưởng, đặt câu hỏi, và làm việc cùng nhau. Giá trị JoinOrigin được
 * đan vào phần mở đầu và mỗi bước (joinOriginNote theo từng bước), với khung
 * trung thực — JoinOrigin không phải dịch vụ mai mối và không ghép cặp nhà
 * sáng lập. Một H1, cấu trúc từng bước, FAQ được phản chiếu 1:1 trong JSON-LD
 * "FAQPage". "Room" được gắn với phòng Matrix (§6.3).
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'find-a-co-founder',
  title: 'Cách Tìm một Đồng sáng lập: Tìm ở Đâu & Hỏi Điều Gì | JoinOrigin',
  description:
    'Tìm một đồng sáng lập bổ sung kỹ năng cho bạn — dù bạn đang khởi động hay phát triển một dự án kinh doanh hiện hữu, công bố một trang ý tưởng, gặp gỡ trong các cộng đồng và phòng của họ, chạy một dự án thử nghiệm, và hỏi những câu hỏi ngăn ngừa tan vỡ. Từ JoinOrigin.',
  intro: [
    'Tìm một đồng sáng lập là một quyết định quan hệ đội lốt quyết định tuyển dụng, và về cốt lõi nó là một vấn đề kết nối con người khác: đúng người thường cách một lời giới thiệu ấm áp, ở đâu đó trong một cộng đồng bạn chưa khám phá. Đó là vấn đề JoinOrigin giúp giải quyết — và nó cũng là vấn đề tương tự dù bạn vẫn đang ở giai đoạn ý tưởng hay đang vận hành một công ty hiện hữu cần một đối tác để bước tiếp.',
    'JoinOrigin là một hệ điều hành cộng đồng được xây dựng quanh vòng lặp kết nối → tham gia → phòng kỹ thuật số: bạn công bố một ý tưởng, phòng của nó tự động tạo, và những người chia sẻ ý tưởng có thể tham gia và trò chuyện trong phòng đó. Trang ý tưởng là lời hứa công khai và phòng là nơi các cuộc trò chuyện đồng sáng lập thực sự diễn ra — một phòng Matrix do người sáng lập kiểm soát nơi những người quan tâm có thể đặt câu hỏi, chia sẻ ghi chú, và kiểm tra mức độ phù hợp trước khi ai đó cam kết. JoinOrigin không phải dịch vụ mai mối, nó không ghép cặp nhà sáng lập, và nó không có văn phòng địa phương. Giá trị của nền tảng — kết nối con người quanh sở thích chung — ánh xạ trực tiếp vào cách hầu hết nhà sáng lập thực sự tìm thấy đồng sáng lập của họ: qua các cộng đồng, phòng, và lời giới thiệu ấm áp.',
    'Hướng dẫn này tiếp cận cuộc tìm kiếm theo cách bạn tiếp cận việc xây dựng một cộng đồng: bắt đầu từ mạng lưới hiện hữu của bạn, công bố một ý tưởng mọi người có thể tìm thấy, mở rộng có chủ đích qua các cộng đồng và phòng của họ, đánh giá ứng viên bằng các cuộc trò chuyện có cấu trúc và một dự án thử nghiệm, và thống nhất những điều nền tảng trước khi bạn cam kết bất cứ điều gì về mặt pháp lý. Các bước thực tế và trung thực, và mỗi bước cho thấy JoinOrigin giúp ở đâu.',
  ],
  dataPoints: [
    'Lời giới thiệu ấm áp và công việc chung tạo ra các mối quan hệ đồng sáng lập bền vững nhất.',
    'Một trang ý tưởng được công bố với một phòng mang lại cho những người quan tâm một nơi thực tế để tìm thấy ý tưởng và bắt đầu một cuộc trò chuyện.',
    'Một dự án thử nghiệm ngắn — một nguyên mẫu, một trang đích, hoặc một dự án trả phí thử nghiệm — kiểm tra phong cách làm việc nhanh hơn các cuộc phỏng vấn.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm cộng đồng và cộng tác viên; nó không phải dịch vụ mai mối và không có văn phòng địa phương.',
  ],
  faq: [
    {
      question: 'Hầu hết mọi người tìm đồng sáng lập ở đâu?',
      answer:
        'Hầu hết nhà sáng lập gặp nhau qua các mạng lưới ấm áp — sự kiện, cộng đồng, phòng, và lời giới thiệu từ những người họ tin tưởng. Công bố một ý tưởng mọi người có thể tìm thấy, rồi xuất hiện nhất quán trong cùng các cộng đồng và phòng của họ, là cách đáng tin cậy nhất để gặp các đồng sáng lập tiềm năng.',
    },
    {
      question: 'Làm sao tôi biết ai đó có phải là một đồng sáng lập phù hợp không?',
      answer:
        'Chạy một dự án thử nghiệm nhỏ cùng nhau và chú ý ba điều: kỹ năng bổ sung, khả năng chấp nhận rủi ro tương tự, và giao tiếp trung thực dưới áp lực thời hạn. Dự án thử nghiệm bộc lộ cả ba nhanh hơn bất kỳ cuộc trò chuyện nào.',
    },
    {
      question: 'Chúng ta nên thống nhất điều gì trước khi bắt đầu?',
      answer:
        'Nói về vai trò, cam kết thời gian, tỷ lệ cổ phần, quyền được hưởng, ra quyết định, và điều gì xảy ra nếu ai đó muốn rời đi. Đặt những điều này lên bàn sớm ngăn ngừa những bất đồng phá hủy hầu hết đội ngũ sớm.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi tìm một đồng sáng lập không?',
      answer:
        'JoinOrigin giúp mọi người tìm cộng đồng và cộng tác viên — bao gồm loại cộng đồng nơi các nhà sáng lập gặp nhau — với một trang ý tưởng và một phòng nơi các cuộc trò chuyện có thể diễn ra. JoinOrigin không ghép cặp nhà sáng lập, vì vậy các bước kết nối và dự án thử nghiệm trong hướng dẫn này là con đường đáng tin cậy nhất của bạn.',
    },
  ],
  sections: [
    'Lập bản đồ các khoảng trống kỹ năng trước. Viết xuống điều bạn thực sự giỏi và điều dự án kinh doanh cần mà bạn không có. Một đồng sáng lập nên lấp khoảng trống lớn nhất của bạn — kỹ thuật, thương mại, hoặc vận hành — không phải lặp lại điểm mạnh của bạn. JoinOrigin được xây dựng quanh hồ sơ, ý tưởng, và cộng đồng, không phải mai mối — vì vậy lời khuyên trung thực vẫn như mọi khi: biết khoảng trống bạn cần lấp trước khi bạn tìm. Viết điểm mạnh của bạn và nhu cầu của dự án kinh doanh xuống.',
    'Công bố ý tưởng của bạn và mở phòng của nó. Một ý tưởng không ai tìm thấy không thu hút được đồng sáng lập nào. Công bố một trang ý tưởng rõ ràng — bạn đang xây dựng gì, vì sao, và loại người bạn cần — và để phòng của nó tự động tạo để những người quan tâm có một nơi để trò chuyện. Công bố một ý tưởng trên JoinOrigin tự động tạo phòng của nó, nơi các cuộc trò chuyện đồng sáng lập diễn ra. Công bố ý tưởng của bạn ở một nơi công khai và mở một phòng để thảo luận quanh nó.',
    'Dùng mạng lưới hiện hữu của bạn cho những lời giới thiệu ấm áp. Nói với năm người bạn tin tưởng điều bạn đang xây dựng và loại đồng sáng lập bạn cần. Nhờ mỗi người cho một cái tên. Lời giới thiệu ấm áp thắng tiếp cận lạnh trong hầu hết mọi trường hợp. JoinOrigin làm cho các cộng đồng dễ tìm, mở rộng mạng lưới ấm áp của bạn theo thời gian — và mỗi lời giới thiệu có thể dẫn đến một phòng nơi cuộc trò chuyện thực sự diễn ra. Nói với năm người bạn tin tưởng chính xác loại đồng sáng lập bạn cần.',
    'Xuất hiện nhất quán trong các cộng đồng và phòng liên quan. Tham dự sự kiện và tham gia các nhóm nơi đúng loại người tụ họp: buổi gặp gỡ nhà sáng lập, cộng đồng ngành, không gian làm việc chung, và các phòng trực tuyến. Sự lặp lại xây dựng niềm tin dẫn đến lời giới thiệu. JoinOrigin giúp mọi người tìm các cộng đồng khớp với mục tiêu của họ — loại nơi các nhà sáng lập gặp nhau — và tham gia phòng của họ. Chọn các buổi gặp gỡ và phòng nơi đúng người đã tụ họp và tiếp tục xuất hiện.',
    'Có các cuộc trò chuyện đầu tiên có cấu trúc. Hỏi về kỹ năng, khả năng chấp nhận rủi ro, cam kết thời gian, và vì sao họ muốn bắt đầu hoặc phát triển điều gì đó. Chia sẻ câu trả lời của chính bạn. Đây là một cuộc phỏng vấn tương hỗ, không phải một lời chào hàng. JoinOrigin không ghép cặp nhà sáng lập hoặc vận hành các cuộc trò chuyện — cuộc phỏng vấn tương hỗ là của bạn. Nền tảng đặt bạn vào cùng các cộng đồng và phòng với các cộng tác viên tiềm năng — phần còn lại tùy bạn.',
    'Chạy một dự án thử nghiệm cùng nhau. Chọn một điều nhỏ và thực tế — một nguyên mẫu, một trang đích, hoặc một dự án trả phí thử nghiệm — và làm việc trên nó từ bốn đến sáu tuần. Quan sát cách bạn phân chia công việc, xử lý phản hồi, và hành xử dưới áp lực. JoinOrigin mang lại cho cộng đồng một phòng chung cho công việc và dự án của họ — một nơi tự nhiên để một dự án thử nghiệm xuất hiện. Một nguyên mẫu thực tế nhỏ là bài kiểm tra đáng tin cậy nhất.',
    'Quyết định dựa trên thử nghiệm, không phải tiềm năng. Hỏi liệu bạn có tin tưởng giao danh tiếng của mình cho người này, liệu họ giao tiếp trung thực, và liệu làm việc cùng nhau có tiếp thêm năng lượng cho bạn không. Nếu thử nghiệm cảm thấy căng thẳng, hãy tin tín hiệu đó. JoinOrigin không thay bạn quyết định. Giá trị trung thực của nó là bối cảnh cộng đồng và phòng cho phép bạn gặp và làm việc với các ứng viên — thử nghiệm vẫn nói cho bạn sự thật.',
    'Thống nhất những điều nền tảng trước khi cam kết. Viết xuống vai trò, cam kết thời gian, tỷ lệ cổ phần, quyền được hưởng, và quy tắc ra quyết định. Ngay cả một thỏa thuận một trang đơn giản cũng ngăn ngừa hầu hết hiểu lầm sớm. JoinOrigin là một hệ điều hành cộng đồng — một không gian có tổ chức nơi thỏa thuận, vai trò, và ghi chú dự án có thể sống cạnh phòng ý tưởng. Ngay cả một thỏa thuận viết một trang cũng ngăn ngừa hầu hết hiểu lầm sớm.',
  ],
  steps: [
    {
      title: 'Lập bản đồ các khoảng trống kỹ năng trước',
      body: 'Viết xuống điều bạn thực sự giỏi và điều dự án kinh doanh cần mà bạn không có. Một đồng sáng lập nên lấp khoảng trống lớn nhất của bạn — kỹ thuật, thương mại, hoặc vận hành — không phải lặp lại điểm mạnh của bạn.',
      joinOriginNote:
        'JoinOrigin được xây dựng quanh hồ sơ, ý tưởng, và cộng đồng, không phải mai mối — vì vậy lời khuyên trung thực vẫn như mọi khi: biết khoảng trống bạn cần lấp trước khi bạn tìm. Viết điểm mạnh của bạn và nhu cầu của dự án kinh doanh xuống.',
    },
    {
      title: 'Công bố ý tưởng của bạn và mở phòng của nó',
      body: 'Một ý tưởng không ai tìm thấy không thu hút được đồng sáng lập nào. Công bố một trang ý tưởng rõ ràng — bạn đang xây dựng gì, vì sao, và loại người bạn cần — và để phòng của nó tự động tạo để những người quan tâm có một nơi để trò chuyện.',
      joinOriginNote:
        'Công bố một ý tưởng trên JoinOrigin tự động tạo phòng của nó, nơi các cuộc trò chuyện đồng sáng lập diễn ra. Công bố ý tưởng của bạn ở một nơi công khai và mở một phòng để thảo luận quanh nó.',
    },
    {
      title: 'Dùng mạng lưới hiện hữu của bạn cho những lời giới thiệu ấm áp',
      body: 'Nói với năm người bạn tin tưởng điều bạn đang xây dựng và loại đồng sáng lập bạn cần. Nhờ mỗi người cho một cái tên. Lời giới thiệu ấm áp thắng tiếp cận lạnh trong hầu hết mọi trường hợp.',
      joinOriginNote:
        'JoinOrigin làm cho các cộng đồng dễ tìm, mở rộng mạng lưới ấm áp của bạn theo thời gian — và mỗi lời giới thiệu có thể dẫn đến một phòng nơi cuộc trò chuyện thực sự diễn ra. Nói với năm người bạn tin tưởng chính xác loại đồng sáng lập bạn cần.',
    },
    {
      title: 'Xuất hiện nhất quán trong các cộng đồng và phòng liên quan',
      body: 'Tham dự sự kiện và tham gia các nhóm nơi đúng loại người tụ họp: buổi gặp gỡ nhà sáng lập, cộng đồng ngành, không gian làm việc chung, và các phòng trực tuyến. Sự lặp lại xây dựng niềm tin dẫn đến lời giới thiệu.',
      joinOriginNote:
        'JoinOrigin giúp mọi người tìm các cộng đồng khớp với mục tiêu của họ — loại nơi các nhà sáng lập gặp nhau — và tham gia phòng của họ. Chọn các buổi gặp gỡ và phòng nơi đúng người đã tụ họp và tiếp tục xuất hiện.',
    },
    {
      title: 'Có các cuộc trò chuyện đầu tiên có cấu trúc',
      body: 'Hỏi về kỹ năng, khả năng chấp nhận rủi ro, cam kết thời gian, và vì sao họ muốn bắt đầu hoặc phát triển điều gì đó. Chia sẻ câu trả lời của chính bạn. Đây là một cuộc phỏng vấn tương hỗ, không phải một lời chào hàng.',
      joinOriginNote:
        'JoinOrigin không ghép cặp nhà sáng lập hoặc vận hành các cuộc trò chuyện — cuộc phỏng vấn tương hỗ là của bạn. Nền tảng đặt bạn vào cùng các cộng đồng và phòng với các cộng tác viên tiềm năng — phần còn lại tùy bạn.',
    },
    {
      title: 'Chạy một dự án thử nghiệm cùng nhau',
      body: 'Chọn một điều nhỏ và thực tế — một nguyên mẫu, một trang đích, hoặc một dự án trả phí thử nghiệm — và làm việc trên nó từ bốn đến sáu tuần. Quan sát cách bạn phân chia công việc, xử lý phản hồi, và hành xử dưới áp lực.',
      joinOriginNote:
        'JoinOrigin mang lại cho cộng đồng một phòng chung cho công việc và dự án của họ — một nơi tự nhiên để một dự án thử nghiệm xuất hiện. Một nguyên mẫu thực tế nhỏ là bài kiểm tra đáng tin cậy nhất.',
    },
    {
      title: 'Quyết định dựa trên thử nghiệm, không phải tiềm năng',
      body: 'Hỏi liệu bạn có tin tưởng giao danh tiếng của mình cho người này, liệu họ giao tiếp trung thực, và liệu làm việc cùng nhau có tiếp thêm năng lượng cho bạn không. Nếu thử nghiệm cảm thấy căng thẳng, hãy tin tín hiệu đó.',
      joinOriginNote:
        'JoinOrigin không thay bạn quyết định. Giá trị trung thực của nó là bối cảnh cộng đồng và phòng cho phép bạn gặp và làm việc với các ứng viên — thử nghiệm vẫn nói cho bạn sự thật.',
    },
    {
      title: 'Thống nhất những điều nền tảng trước khi cam kết',
      body: 'Viết xuống vai trò, cam kết thời gian, tỷ lệ cổ phần, quyền được hưởng, và quy tắc ra quyết định. Ngay cả một thỏa thuận một trang đơn giản cũng ngăn ngừa hầu hết hiểu lầm sớm.',
      joinOriginNote:
        'JoinOrigin là một hệ điều hành cộng đồng — một không gian có tổ chức nơi thỏa thuận, vai trò, và ghi chú dự án có thể sống cạnh phòng ý tưởng. Ngay cả một thỏa thuận viết một trang cũng ngăn ngừa hầu hết hiểu lầm sớm.',
    },
  ],
};

export default content;
