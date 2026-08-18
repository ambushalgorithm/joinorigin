import type { GuideContent } from '../../types';

/**
 * "Cộng đồng Kết hợp" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-326).
 *
 * Tái trọng tâm vào mô hình kết nối → tham gia → phòng kỹ thuật số: phòng là
 * thứ kết nối phần trực tuyến và (hệ quả phía sau) trực tiếp của một cộng đồng
 * kết hợp — một cộng đồng, một phòng, hai điểm vào. Giá trị JoinOrigin được
 * đan vào phần mở đầu và mỗi bước (joinOriginNote theo từng bước), với khung
 * trung thực — JoinOrigin không cung cấp công cụ sự kiện hoặc bố trí nhân sự
 * sự kiện kết hợp. Một H1, cấu trúc từng bước, FAQ được phản chiếu 1:1 trong
 * JSON-LD "FAQPage". "Room" được gắn với phòng Matrix (§6.3) — địa điểm vật lý
 * được mô tả là venue/không gian, không bao giờ là "phòng".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'hybrid-communities',
  title: 'Cộng đồng Kết hợp: Cách Vận hành Trực tiếp + Trực tuyến Cùng nhau | JoinOrigin',
  description:
    'Vận hành một cộng đồng kết hợp nơi phòng kết nối thành viên trực tiếp và trực tuyến — dù bạn đang bắt đầu mới hay biến một cộng đồng hiện hữu thành kết hợp, chọn đúng công cụ, thiết kế sự tham gia bình đẳng, và giữ cả hai đối tượng gắn kết. Từ JoinOrigin.',
  intro: [
    'Một cộng đồng kết hợp đưa mọi người lại gần nhau ở hai nơi cùng một lúc — vật lý trong một địa điểm và ảo qua một màn hình — và thách thức thực sự lại nằm ở con người: đảm bảo cả hai đối tượng cảm thấy họ thuộc về một cộng đồng kết nối duy nhất, không phải hai cộng đồng tách biệt. JoinOrigin được xây dựng chính xác với mục tiêu kết nối con người đó, và mô hình hoạt động cho một cộng đồng đã tồn tại cũng như cho một cộng đồng mới bắt đầu — một nhóm trực tiếp đã thành lập có thể thêm một nửa trực tuyến, và một cộng đồng trực tuyến có thể bắt đầu tụ họp địa phương.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm, tham gia, và bắt đầu cộng đồng — vì vậy một nhóm kết hợp có một phòng kết nối phần trực tuyến và (hệ quả phía sau) trực tiếp: thành viên địa phương và từ xa thấy cùng một cộng đồng, cùng một nhịp, và cùng các bước tiếp theo. Trong mô hình kết nối → tham gia → phòng kỹ thuật số, phòng là bề mặt bền vững nơi cả hai nửa của cộng đồng sống giữa các buổi tụ họp; sự kiện trực tiếp là một hệ quả phía sau mà phòng giữ lại với nhau trước và sau. JoinOrigin không cung cấp công cụ sự kiện hoặc bố trí nhân sự sự kiện kết hợp — nền tảng cho bất kỳ cộng đồng nào — kể cả kết hợp — một phòng duy nhất nơi thành viên của nó duy trì kết nối.',
    'Hướng dẫn này bao phủ các quyết định thực tế làm cho cộng đồng kết hợp thành công — cho nhóm mới và nhóm hiện hữu: quyết định liệu kết hợp có phải là mô hình đúng, xây dựng phòng mà cả hai đối tượng chia sẻ, chọn một hình thức và công cụ phù hợp, thiết kế buổi tụ họp để thành viên trực tiếp và trực tuyến chia sẻ cùng một trải nghiệm, quản lý không gian để không bên nào lấn át, và giữ một phòng bền vững giữ cộng đồng lại với nhau giữa các buổi tụ họp. Mỗi bước cho thấy JoinOrigin giúp ở đâu.',
  ],
  dataPoints: [
    'Một cộng đồng kết hợp là một cộng đồng với hai điểm vào, không phải hai đối tượng cần phục vụ riêng biệt.',
    'Phòng là mô liên kết: một nơi chung nơi cả hai đối tượng thấy cùng các cập nhật, ghi chú, và bước tiếp theo.',
    'Các công cụ đơn giản, đáng tin cậy — một liên kết video, một tài liệu chung — giảm ma sát giết chết các buổi tụ họp kết hợp.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm hoặc bắt đầu cộng đồng; nó không cung cấp công cụ sự kiện hoặc bố trí nhân sự sự kiện kết hợp.',
  ],
  faq: [
    {
      question: 'Khi nào một cộng đồng nên chuyển sang kết hợp?',
      answer:
        'Khi một phần đối tượng của bạn đáng tin cậy không thể tham dự trực tiếp — vì khoảng cách, lịch trình, hoặc khả năng di chuyển — và cộng đồng vẫn muốn một danh tính chung duy nhất. Nếu mọi người có thể gặp mặt địa phương, gặp trực tiếp đơn giản hơn và thường tốt hơn.',
    },
    {
      question: 'Thiết lập công cụ tối thiểu cho một buổi tụ họp kết hợp là gì?',
      answer:
        'Một liên kết cuộc gọi video cho thành viên từ xa, một tài liệu chung cho ghi chú, và một phòng nơi cả hai đối tượng duy trì kết nối giữa các buổi tụ họp. Thêm công cụ là thêm điểm lỗi; bắt đầu tối giản và chỉ thêm điều cộng đồng yêu cầu.',
    },
    {
      question: 'Làm thế nào tôi giữ thành viên từ xa không cảm thấy như khán giả?',
      answer:
        'Thiết kế cho sự tham gia bình đẳng: chạy một vòng giới thiệu kết hợp, gọi tên thành viên từ xa một cách tường minh, chia sẻ màn hình cho mọi hình ảnh, và dùng một tài liệu chung nơi cả hai bên có thể viết. Giao một người theo dõi liên tục phía từ xa.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi vận hành một cộng đồng kết hợp không?',
      answer:
        'Có. JoinOrigin giúp mọi người tìm và bắt đầu cộng đồng — một phòng nơi thành viên địa phương và từ xa duy trì kết nối. JoinOrigin không cung cấp công cụ sự kiện, vì vậy các thực hành kết hợp thực tế trong hướng dẫn này hoạt động với những công cụ bạn đã có.',
    },
  ],
  sections: [
    'Quyết định liệu kết hợp có phải là mô hình đúng. Chuyển sang kết hợp khi nó hợp lý để gặp mặt trực tiếp. Nếu hầu hết thành viên có thể gặp mặt địa phương, gặp trực tiếp làm mối liên kết mạnh hơn — kết hợp cho phép niềm tin xây dựng nhanh hơn và đọc hiểu con người kỹ hơn. JoinOrigin được thiết kế để giúp bất kỳ cộng đồng nào tìm và giữ thành viên, nhưng quyết định hình thức là của bạn. Chuyển sang kết hợp chỉ khi nó hợp lý để gặp mặt trực tiếp.',
    'Xây dựng phòng kết nối cả hai đối tượng. Trước bất cứ điều gì khác, đảm bảo cộng đồng có một phòng chung nơi thành viên từ xa và địa phương trò chuyện, chia sẻ cập nhật, và thấy cùng các bước tiếp theo. Phòng là thứ làm cho kết hợp cảm thấy như một cộng đồng thay vì hai. Trên JoinOrigin mọi nhóm có một phòng từ khi công bố — bề mặt bền vững giữ phần trực tuyến và trực tiếp lại với nhau. Thiết lập một phòng chung cả hai đối tượng có thể tham gia.',
    'Chọn một công cụ video đáng tin cậy và một tài liệu chung. Giữ bộ công cụ tối giản: một liên kết cuộc gọi video cho thành viên từ xa, một tài liệu cho ghi chú và liên kết chung, và một mục lịch. Sự phức tạp là kẻ thù của các buổi tụ họp kết hợp nhất quán. JoinOrigin không cung cấp công cụ sự kiện — giữ bộ công cụ tối giản. Nền tảng là phòng bền vững nơi liên kết và tài liệu sống, không phải chính công cụ sự kiện.',
    'Thiết kế chương trình cho hai đối tượng. Chạy một vòng giới thiệu bao gồm thành viên từ xa bằng tên, giữ hình ảnh trên một màn hình chung, và để không gian cho phía trực tuyến phát biểu. Một chương trình kết hợp nêu tên cả hai đối tượng một cách tường minh. Trên JoinOrigin cả hai đối tượng chia sẻ một phòng cộng đồng, làm cho "thiết kế cho hai đối tượng" trở thành sự phù hợp tự nhiên. Nêu tên cả hai đối tượng một cách tường minh trong chương trình.',
    'Giao một người cầu nối. Một người theo dõi phía từ xa: chào người tham gia đến muộn, gọi tay từ xa, và chuyển tiếp điều địa điểm bỏ sót. Không có cầu nối, đối tượng trực tuyến trở thành khán giả. JoinOrigin không bố trí nhân sự sự kiện — người cầu nối là một vai trò con người. Nền tảng giữ cộng đồng có tổ chức trong một phòng để cầu nối có một nơi thấy ai đã tham gia và điều gì đã được chia sẻ.',
    'Quản lý không gian để cả hai bên tham gia. Yêu cầu thành viên trực tiếp phát biểu từng người một và lặp lại câu hỏi cho micro, xếp người ngồi gần camera, và luân phiên lượt giữa địa điểm và cuộc gọi — với phòng chung luôn mở cho cả hai. JoinOrigin được thiết kế quanh kết nối bình đẳng giữa các thành viên — cùng nguyên tắc làm cho thảo luận kết hợp hoạt động. Luân phiên lượt giữa địa điểm và cuộc gọi và lặp lại câu hỏi cho micro.',
    'Giữ phòng sống giữa các buổi tụ họp. Cộng đồng sống trong phòng giữa các sự kiện: thành viên từ xa và địa phương chia sẻ cập nhật, đặt câu hỏi, và lên kế hoạch cùng nhau ở đó. Kết hợp không phải một định dạng sự kiện — nó là một không gian chung liên tục. Đây là bước gần nhất với ý định thiết kế của JoinOrigin: một hệ điều hành cộng đồng là một phòng bền vững nơi thành viên từ xa và địa phương chia sẻ cập nhật và lên kế hoạch cùng nhau. Một phòng chung hoạt động — JoinOrigin chính là không gian đó.',
    'Nắm bắt và chia sẻ kết quả trong phòng. Đăng ghi chú, bản ghi, và các bước tiếp theo trong phòng chung sau mỗi buổi tụ họp. Một hiện vật hiện hữu giữ cả hai đối tượng kết nối và làm cộng đồng cảm thấy có năng suất. Trên JoinOrigin kết quả của một cộng đồng sống trong một phòng có tổ chức — ghi chú, bản ghi, các bước tiếp theo. Đăng chúng trong phòng chung sau mỗi buổi tụ họp.',
  ],
  steps: [
    {
      title: 'Quyết định liệu kết hợp có phải là mô hình đúng',
      body: 'Chuyển sang kết hợp khi nó hợp lý để gặp mặt trực tiếp. Nếu hầu hết thành viên có thể gặp mặt địa phương, gặp trực tiếp làm mối liên kết mạnh hơn — kết hợp cho phép niềm tin xây dựng nhanh hơn và đọc hiểu con người kỹ hơn.',
      joinOriginNote:
        'JoinOrigin được thiết kế để giúp bất kỳ cộng đồng nào tìm và giữ thành viên, nhưng quyết định hình thức là của bạn. Chuyển sang kết hợp chỉ khi nó hợp lý để gặp mặt trực tiếp.',
    },
    {
      title: 'Xây dựng phòng kết nối cả hai đối tượng',
      body: 'Trước bất cứ điều gì khác, đảm bảo cộng đồng có một phòng chung nơi thành viên từ xa và địa phương trò chuyện, chia sẻ cập nhật, và thấy cùng các bước tiếp theo. Phòng là thứ làm cho kết hợp cảm thấy như một cộng đồng thay vì hai.',
      joinOriginNote:
        'Trên JoinOrigin mọi nhóm có một phòng từ khi công bố — bề mặt bền vững giữ phần trực tuyến và trực tiếp lại với nhau. Thiết lập một phòng chung cả hai đối tượng có thể tham gia.',
    },
    {
      title: 'Chọn một công cụ video đáng tin cậy và một tài liệu chung',
      body: 'Giữ bộ công cụ tối giản: một liên kết cuộc gọi video cho thành viên từ xa, một tài liệu cho ghi chú và liên kết chung, và một mục lịch. Sự phức tạp là kẻ thù của các buổi tụ họp kết hợp nhất quán.',
      joinOriginNote:
        'JoinOrigin không cung cấp công cụ sự kiện — giữ bộ công cụ tối giản. Nền tảng là phòng bền vững nơi liên kết và tài liệu sống, không phải chính công cụ sự kiện.',
    },
    {
      title: 'Thiết kế chương trình cho hai đối tượng',
      body: 'Chạy một vòng giới thiệu bao gồm thành viên từ xa bằng tên, giữ hình ảnh trên một màn hình chung, và để không gian cho phía trực tuyến phát biểu. Một chương trình kết hợp nêu tên cả hai đối tượng một cách tường minh.',
      joinOriginNote:
        'Trên JoinOrigin cả hai đối tượng chia sẻ một phòng cộng đồng, làm cho "thiết kế cho hai đối tượng" trở thành sự phù hợp tự nhiên. Nêu tên cả hai đối tượng một cách tường minh trong chương trình.',
    },
    {
      title: 'Giao một người cầu nối',
      body: 'Một người theo dõi phía từ xa: chào người tham gia đến muộn, gọi tay từ xa, và chuyển tiếp điều địa điểm bỏ sót. Không có cầu nối, đối tượng trực tuyến trở thành khán giả.',
      joinOriginNote:
        'JoinOrigin không bố trí nhân sự sự kiện — người cầu nối là một vai trò con người. Nền tảng giữ cộng đồng có tổ chức trong một phòng để cầu nối có một nơi thấy ai đã tham gia và điều gì đã được chia sẻ.',
    },
    {
      title: 'Quản lý không gian để cả hai bên tham gia',
      body: 'Yêu cầu thành viên trực tiếp phát biểu từng người một và lặp lại câu hỏi cho micro, xếp người ngồi gần camera, và luân phiên lượt giữa địa điểm và cuộc gọi — với phòng chung luôn mở cho cả hai.',
      joinOriginNote:
        'JoinOrigin được thiết kế quanh kết nối bình đẳng giữa các thành viên — cùng nguyên tắc làm cho thảo luận kết hợp hoạt động. Luân phiên lượt giữa địa điểm và cuộc gọi và lặp lại câu hỏi cho micro.',
    },
    {
      title: 'Giữ phòng sống giữa các buổi tụ họp',
      body: 'Cộng đồng sống trong phòng giữa các sự kiện: thành viên từ xa và địa phương chia sẻ cập nhật, đặt câu hỏi, và lên kế hoạch cùng nhau ở đó. Kết hợp không phải một định dạng sự kiện — nó là một không gian chung liên tục.',
      joinOriginNote:
        'Đây là bước gần nhất với ý định thiết kế của JoinOrigin: một hệ điều hành cộng đồng là một phòng bền vững nơi thành viên từ xa và địa phương chia sẻ cập nhật và lên kế hoạch cùng nhau. Một phòng chung hoạt động — JoinOrigin chính là không gian đó.',
    },
    {
      title: 'Nắm bắt và chia sẻ kết quả trong phòng',
      body: 'Đăng ghi chú, bản ghi, và các bước tiếp theo trong phòng chung sau mỗi buổi tụ họp. Một hiện vật hiện hữu giữ cả hai đối tượng kết nối và làm cộng đồng cảm thấy có năng suất.',
      joinOriginNote:
        'Trên JoinOrigin kết quả của một cộng đồng sống trong một phòng có tổ chức — ghi chú, bản ghi, các bước tiếp theo. Đăng chúng trong phòng chung sau mỗi buổi tụ họp.',
    },
  ],
};

export default content;
