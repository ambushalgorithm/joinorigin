import type { GuideContent } from '../../types';

/**
 * "Điều hành Cộng đồng" — hướng dẫn cấp L1 dài hạn (design §6.1, TASK-326).
 *
 * Tái trọng tâm vào mô hình kết nối → tham gia → phòng kỹ thuật số: quyền
 * kiểm soát của người sáng lập CHÍNH LÀ quyền sở hữu phòng Matrix — mời/xóa
 * thành viên, gán vai trò, chỉnh cài đặt phòng, ghim tin nhắn, lưu trữ phòng —
 * được thực thi natively trong Element. Giá trị JoinOrigin được đan vào phần
 * mở đầu và mỗi bước (joinOriginNote theo từng bước), với khung trung thực —
 * JoinOrigin không điều hành cộng đồng bên thứ ba hoặc cung cấp nhân sự điều
 * hành. Một H1, cấu trúc từng bước, FAQ được phản chiếu 1:1 trong JSON-LD
 * "FAQPage". "Room" được gắn với phòng Matrix (§6.3) — không gian riêng tư/sự
 * cố được mô tả là phòng/DM, không bao giờ là "kênh".
 */
const content: GuideContent = {
  kind: 'guide',
  locale: 'vi',
  slug: 'moderation',
  title: 'Điều hành Cộng đồng: Cách Giữ các Nhóm Khỏe mạnh & Chào đón | JoinOrigin',
  description:
    'Điều hành một cộng đồng với quy tắc rõ ràng, hành động sớm, và giảm leo thang — dù bạn đang thiết lập một nhóm hoàn toàn mới hay sửa văn hóa của một nhóm đã thành lập, quyền kiểm soát của người sáng lập là quyền sở hữu phòng Matrix, với vai trò được thực thi trong Element. Các bước thực tế từ JoinOrigin.',
  intro: [
    'Mọi cộng đồng phát triển cuối cùng sẽ đối mặt với một khoảnh khắc thử thách văn hóa của nó — một cuộc tranh cãi gay gắt, một kẻ gửi rác, một thành viên làm người khác khó chịu, hoặc một hiểu lầm leo thang. Điều hành là thực hành bảo vệ không gian để cộng đồng duy trì sự chào đón, và nó chỉ trở nên cần thiết vì cộng đồng được tạo nên từ con người kết nối với nhau. Sự kết nối đó là vấn đề cốt lõi JoinOrigin giúp giải quyết — và các thực hành áp dụng tốt cho một cộng đồng đã thành lập đang sửa văn hóa của nó cũng như cho một nhóm mới đặt kỳ vọng trước khi thành viên đầu tiên đến.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm, bắt đầu, và tổ chức cộng đồng — và trong mô hình kỹ thuật số của nó, một cộng đồng sống trong một phòng do người sáng lập kiểm soát. Quyền kiểm soát của người sáng lập là quyền sở hữu phòng Matrix tiêu chuẩn: người sáng lập có thể mời và xóa thành viên, gán vai trò, chỉnh cài đặt phòng, ghim tin nhắn, và lưu trữ phòng — tất cả được thực thi natively bên trong Element, ứng dụng trò chuyện mặc định, không có hệ thống quyền tùy chỉnh. Quyền sở hữu đó là xương sống của điều hành trên JoinOrigin: người sáng lập quyết định ai thuộc về, các quy tắc là gì, và điều gì xảy ra khi một quy tắc bị vi phạm. JoinOrigin không điều hành cộng đồng bên thứ ba và không cung cấp nhân sự điều hành. Nền tảng được thiết kế quanh cấu trúc cộng đồng khỏe mạnh, và các thực hành trong hướng dẫn này là các thực hành con người mọi người tổ chức cần.',
    'Hướng dẫn này trình bày một hệ thống điều hành thực tế — dù cộng đồng của bạn hoàn toàn mới hay có nhiều năm lịch sử cần dọn dẹp: quy tắc cộng đồng viết ra ngắn và cụ thể, một con đường thực thi rõ ràng với cảnh báo trước khi xóa, kỹ thuật giảm leo thang các tình huống căng thẳng, và lời khuyên trung thực về khi nào nên liên quan đến thành viên và khi nào hành động một mình. Mỗi bước cho thấy JoinOrigin giúp ở đâu.',
  ],
  dataPoints: [
    'Quy tắc cộng đồng rõ ràng, viết ra giảm xung đột bằng cách đặt kỳ vọng trước khi sự cố xảy ra.',
    'Quyền kiểm soát của người sáng lập trên JoinOrigin là quyền sở hữu phòng Matrix: mời/xóa, vai trò, cài đặt, ghim, lưu trữ.',
    'Một con đường thực thi theo giai đoạn — cảnh báo, rồi hạn chế, rồi xóa — công bằng hơn và dễ bảo vệ hơn cấm ngay lập tức.',
    'JoinOrigin là một hệ điều hành cộng đồng được thiết kế để giúp mọi người tìm, bắt đầu, và tổ chức cộng đồng; nó không điều hành cộng đồng bên thứ ba hoặc cung cấp nhân sự điều hành.',
  ],
  faq: [
    {
      question: 'Các cộng đồng nhỏ có thực sự cần quy tắc điều hành không?',
      answer:
        'Có, và càng sớm càng tốt. Hai hoặc ba quy tắc ngắn viết trước khi xung đột xảy ra dễ áp dụng hơn nhiều so với quy tắc phát minh sau khi xung đột xảy ra. Các cộng đồng nhỏ có ít sự cố hơn, nhưng những sự cố họ có cũng đau đớn không kém.',
    },
    {
      question: 'Người điều hành nên hành động công khai hay riêng tư?',
      answer:
        'Riêng tư trước. Tiếp cận một-một, nêu lại quy tắc và tác động, và cho người đó cơ hội điều chỉnh. Gọi tên công khai có xu hướng leo thang. Giữ một hồ sơ công khai về các quy tắc, nhưng áp dụng chúng riêng tư — trong một tin nhắn trực tiếp hoặc một phòng riêng.',
    },
    {
      question: 'Khi nào tôi nên xóa ai đó khỏi cộng đồng?',
      answer:
        'Sau khi các cảnh báo rõ ràng không hiệu quả, hoặc ngay lập tức cho hành vi gây nguy hiểm cho thành viên — quấy rối, đe dọa, hoặc doxxing. Bài kiểm tra là liệu người đó có đang tích cực làm không gian mất an toàn cho người khác không. Trên JoinOrigin, xóa là chủ phòng xóa một thành viên khỏi phòng.',
    },
    {
      question: 'JoinOrigin có thể giúp tôi điều hành cộng đồng của mình không?',
      answer:
        'Có. JoinOrigin là một hệ điều hành cộng đồng nơi quyền kiểm soát của người sáng lập là quyền sở hữu phòng Matrix — mời/xóa, vai trò, cài đặt, ghim, và lưu trữ được thực thi trong Element. JoinOrigin không điều hành cộng đồng, vì vậy các thực hành trong hướng dẫn này — quy tắc rõ ràng, thực thi theo giai đoạn, giảm leo thang bình tĩnh — là của bạn để áp dụng.',
    },
  ],
  sections: [
    'Viết ba đến năm quy tắc rõ ràng. Giữ chúng ngắn, cụ thể, và tích cực: "Tôn trọng", "Đúng chủ đề", "Không gửi rác hoặc tự quảng bá", "Bất đồng với ý tưởng, không phải con người". Đăng chúng nơi mọi thành viên mới sẽ thấy — lý tưởng là ghim trong phòng. Trên JoinOrigin quy tắc và giá trị của một cộng đồng hiện hữu trong phòng của nó từ ngày đầu tiên — thành viên mới thấy chúng trước khi tham gia. Ghim các quy tắc ngắn của bạn nơi mọi thành viên mới sẽ thấy.',
    'Đặt tông nền với tư cách chủ phòng. Làm gương cho hành vi bạn muốn — chào đón người mới, cảm ơn người đóng góp, và xử lý vấn đề một cách bình tĩnh. Tấm gương của người sáng lập đặt nền tảng văn hóa cho cộng đồng. JoinOrigin không can thiệp cộng đồng — tông nền được đặt bởi người sáng lập và thành viên. Nền tảng làm cho hành vi chào đón hiện hữu; làm gương cho hành vi bạn muốn trong phòng.',
    'Sở hữu phòng như người sáng lập bạn là. Quyền kiểm soát của người sáng lập trên JoinOrigin là quyền sở hữu phòng Matrix: mời và xóa thành viên, gán vai trò, chỉnh cài đặt phòng, ghim tin nhắn, và lưu trữ phòng — được thực thi natively trong Element. Biết các điều khiển này là nửa kỹ thuật của điều hành. JoinOrigin cho người sáng lập toàn quyền sở hữu phòng từ khi công bố, không có hệ thống quyền tùy chỉnh. Học các điều khiển điều hành của nền tảng bạn dùng và chỉ định một chủ sở hữu rõ ràng.',
    'Thống nhất một con đường thực thi. Xác định một phản hồi theo giai đoạn: cảnh báo riêng tư, rồi hạn chế (tắt tiếng, giới hạn đăng bài — thường là thay đổi vai trò), rồi xóa cho vi phạm lặp lại hoặc nghiêm trọng. Leo thang nhất quán công bằng hơn ứng biến. Trên JoinOrigin vai trò là các vai trò Matrix tiêu chuẩn trong Element — tắt tiếng, cấm, và gán vai trò là các hành động native. Viết con đường thực thi xuống và bám theo nó.',
    'Hành động sớm và bình tĩnh. Xử lý dấu hiệu đầu tiên của một vấn đề riêng tư, trước khi nó trở thành một sự cố công khai. Can thiệp sớm, bình tĩnh là hình thức điều hành rẻ nhất tồn tại. JoinOrigin không điều hành thay bạn — can thiệp sớm, bình tĩnh là một kỹ năng con người. Nền tảng được thiết kế để các vấn đề hiện lên rõ ràng trong phòng, và chúng được bắt sớm. Tiếp cận riêng tư ở dấu hiệu đầu tiên.',
    'Học các kỹ thuật giảm leo thang. Khi căng thẳng tăng, làm chậm cuộc trò chuyện lại: thừa nhận cảm xúc, nêu lại bất đồng một cách trung lập, hỏi điểm mấu chốt đằng sau, và đề xuất một khoảng dừng hoặc một phòng riêng cho sự nóng giận. JoinOrigin giữ các tương tác cộng đồng có tổ chức và bình tĩnh theo thiết kế, nhưng giảm leo thang vẫn là một nghề thủ công con người. Làm chậm cuộc trò chuyện lại và đưa sự nóng giận vào một phòng riêng.',
    'Giữ hồ sơ về các sự cố đáng kể. Ghi chú điều gì xảy ra, bạn đã làm gì, và vì sao. Một nhật ký đơn giản giúp bạn nhất quán, học từ các mẫu, và bảo vệ quyết định khi một thành viên hỏi vì sao. JoinOrigin là một hệ điều hành cộng đồng nơi lịch sử của cộng đồng sống trong một nơi — một mái nhà tự nhiên cho một nhật ký sự cố. Một ghi chú đơn giản về điều gì xảy ra và vì sao giữ bạn nhất quán.',
    'Chia sẻ gánh nặng với đồng điều hành. Tuyển một hoặc hai thành viên đáng tin cậy và thống nhất các quy tắc thực thi. Một cộng đồng phụ thuộc vào một người điều hành duy nhất trở nên mong manh và thiên vị. JoinOrigin không cung cấp nhân sự điều hành — đồng điều hành là các thành viên đồng nghiệp. Người sáng lập gán vai trò cho đồng điều hành trong Element — các vai trò Matrix native, không có hệ thống tùy chỉnh. Tuyển một hoặc hai thành viên đáng tin cậy và cho họ vai trò rõ ràng.',
  ],
  steps: [
    {
      title: 'Viết ba đến năm quy tắc rõ ràng',
      body: 'Giữ chúng ngắn, cụ thể, và tích cực: "Tôn trọng", "Đúng chủ đề", "Không gửi rác hoặc tự quảng bá", "Bất đồng với ý tưởng, không phải con người". Đăng chúng nơi mọi thành viên mới sẽ thấy — lý tưởng là ghim trong phòng.',
      joinOriginNote:
        'Trên JoinOrigin quy tắc và giá trị của một cộng đồng hiện hữu trong phòng của nó từ ngày đầu tiên — thành viên mới thấy chúng trước khi tham gia. Ghim các quy tắc ngắn của bạn nơi mọi thành viên mới sẽ thấy.',
    },
    {
      title: 'Đặt tông nền với tư cách chủ phòng',
      body: 'Làm gương cho hành vi bạn muốn — chào đón người mới, cảm ơn người đóng góp, và xử lý vấn đề một cách bình tĩnh. Tấm gương của người sáng lập đặt nền tảng văn hóa cho cộng đồng.',
      joinOriginNote:
        'JoinOrigin không can thiệp cộng đồng — tông nền được đặt bởi người sáng lập và thành viên. Nền tảng làm cho hành vi chào đón hiện hữu; làm gương cho hành vi bạn muốn trong phòng.',
    },
    {
      title: 'Sở hữu phòng như người sáng lập bạn là',
      body: 'Quyền kiểm soát của người sáng lập trên JoinOrigin là quyền sở hữu phòng Matrix: mời và xóa thành viên, gán vai trò, chỉnh cài đặt phòng, ghim tin nhắn, và lưu trữ phòng — được thực thi natively trong Element. Biết các điều khiển này là nửa kỹ thuật của điều hành.',
      joinOriginNote:
        'JoinOrigin cho người sáng lập toàn quyền sở hữu phòng từ khi công bố, không có hệ thống quyền tùy chỉnh. Học các điều khiển điều hành của nền tảng bạn dùng và chỉ định một chủ sở hữu rõ ràng.',
    },
    {
      title: 'Thống nhất một con đường thực thi',
      body: 'Xác định một phản hồi theo giai đoạn: cảnh báo riêng tư, rồi hạn chế (tắt tiếng, giới hạn đăng bài — thường là thay đổi vai trò), rồi xóa cho vi phạm lặp lại hoặc nghiêm trọng. Leo thang nhất quán công bằng hơn ứng biến.',
      joinOriginNote:
        'Trên JoinOrigin vai trò là các vai trò Matrix tiêu chuẩn trong Element — tắt tiếng, cấm, và gán vai trò là các hành động native. Viết con đường thực thi xuống và bám theo nó.',
    },
    {
      title: 'Hành động sớm và bình tĩnh',
      body: 'Xử lý dấu hiệu đầu tiên của một vấn đề riêng tư, trước khi nó trở thành một sự cố công khai. Can thiệp sớm, bình tĩnh là hình thức điều hành rẻ nhất tồn tại.',
      joinOriginNote:
        'JoinOrigin không điều hành thay bạn — can thiệp sớm, bình tĩnh là một kỹ năng con người. Nền tảng được thiết kế để các vấn đề hiện lên rõ ràng trong phòng, và chúng được bắt sớm. Tiếp cận riêng tư ở dấu hiệu đầu tiên.',
    },
    {
      title: 'Học các kỹ thuật giảm leo thang',
      body: 'Khi căng thẳng tăng, làm chậm cuộc trò chuyện lại: thừa nhận cảm xúc, nêu lại bất đồng một cách trung lập, hỏi điểm mấu chốt đằng sau, và đề xuất một khoảng dừng hoặc một phòng riêng cho sự nóng giận.',
      joinOriginNote:
        'JoinOrigin giữ các tương tác cộng đồng có tổ chức và bình tĩnh theo thiết kế, nhưng giảm leo thang vẫn là một nghề thủ công con người. Làm chậm cuộc trò chuyện lại và đưa sự nóng giận vào một phòng riêng.',
    },
    {
      title: 'Giữ hồ sơ về các sự cố đáng kể',
      body: 'Ghi chú điều gì xảy ra, bạn đã làm gì, và vì sao. Một nhật ký đơn giản giúp bạn nhất quán, học từ các mẫu, và bảo vệ quyết định khi một thành viên hỏi vì sao.',
      joinOriginNote:
        'JoinOrigin là một hệ điều hành cộng đồng nơi lịch sử của cộng đồng sống trong một nơi — một mái nhà tự nhiên cho một nhật ký sự cố. Một ghi chú đơn giản về điều gì xảy ra và vì sao giữ bạn nhất quán.',
    },
    {
      title: 'Chia sẻ gánh nặng với đồng điều hành',
      body: 'Tuyển một hoặc hai thành viên đáng tin cậy và thống nhất các quy tắc thực thi. Một cộng đồng phụ thuộc vào một người điều hành duy nhất trở nên mong manh và thiên vị.',
      joinOriginNote:
        'JoinOrigin không cung cấp nhân sự điều hành — đồng điều hành là các thành viên đồng nghiệp. Người sáng lập gán vai trò cho đồng điều hành trong Element — các vai trò Matrix native, không có hệ thống tùy chỉnh. Tuyển một hoặc hai thành viên đáng tin cậy và cho họ vai trò rõ ràng.',
    },
  ],
};

export default content;
