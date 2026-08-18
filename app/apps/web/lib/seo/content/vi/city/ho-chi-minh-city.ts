import type { CityContent } from '../../types';

/**
 * Nội dung Thành phố Hồ Chí Minh — bản dịch tiếng Việt (tệp nội dung theo ngôn ngữ).
 *
 * Văn bản cho 7 trang `vi` (/vi/location/...) của thành phố. Văn bản được đặt
 * ở đây, không nằm trong JSON ngôn ngữ (localization R2/R5). `pageTitles`
 * cung cấp tiêu đề/mô tả SEO tiếng Việt, giữ cho registry và sitemap xác định
 * cho bề mặt vi. Khác biệt với mọi tệp thành phố khác (G5): dựa trên các quận,
 * tổ chức và văn hóa tụ họp thực tế của TP. Hồ Chí Minh. Văn bản trung thực,
 * bền vững; không có con số bịa đặt.
 */
const content: CityContent = {
  kind: 'city',
  locale: 'vi',
  slug: 'ho-chi-minh-city',
  title: 'Cộng đồng tại TP. Hồ Chí Minh | JoinOrigin',
  description:
    'Tìm hoặc bắt đầu cộng đồng tại TP. Hồ Chí Minh — các nhóm khởi nghiệp, sáng tạo, chính trị, gặp gỡ và doanh nghiệp nhỏ. Tham gia danh sách chờ JoinOrigin.',
  pageTitles: {
    city: 'Cộng đồng tại TP. Hồ Chí Minh | JoinOrigin',
    cityDescription:
      'Tìm hoặc bắt đầu cộng đồng tại TP. Hồ Chí Minh — các nhóm khởi nghiệp, sáng tạo, chính trị, gặp gỡ và doanh nghiệp nhỏ. Tham gia danh sách chờ JoinOrigin.',
    variants: {
      startup: 'Cộng đồng khởi nghiệp tại TP. Hồ Chí Minh | JoinOrigin',
      creative: 'Cộng đồng sáng tạo & thiết kế tại TP. Hồ Chí Minh | JoinOrigin',
      political: 'Cộng đồng chính trị & công dân tại TP. Hồ Chí Minh | JoinOrigin',
      meetup: 'Buổi gặp gỡ & sự kiện cộng đồng tại TP. Hồ Chí Minh | JoinOrigin',
      'small-business': 'Cộng đồng doanh nghiệp nhỏ tại TP. Hồ Chí Minh | JoinOrigin',
    },
    variantDescriptions: {
      startup:
        'Tìm hoặc bắt đầu cộng đồng khởi nghiệp tại TP. Hồ Chí Minh — nhà sáng lập, đội ngũ kỹ thuật và vòng tròn fintech/edtech tại Quận 1 và Quận 3. Tham gia danh sách chờ JoinOrigin.',
      creative:
        'Tìm hoặc bắt đầu cộng đồng sáng tạo & thiết kế tại TP. Hồ Chí Minh — studio, phòng trưng bày và sân khấu nhạc indie tại Quận 3, Thảo Điền và khu phố cổ. Tham gia danh sách chờ JoinOrigin.',
      political:
        'Tìm hoặc bắt đầu cộng đồng chính trị & công dân tại TP. Hồ Chí Minh — tình nguyện kênh rạch, giao thông, chống ngập và bảo tồn di sản. Tham gia danh sách chờ JoinOrigin.',
      meetup:
        'Tìm hoặc bắt đầu các buổi gặp gỡ & sự kiện cộng đồng tại TP. Hồ Chí Minh — quán cà phê Quận 3, chợ Bến Thành, công viên Tao Đàn và bờ sông Sài Gòn. Tham gia danh sách chờ JoinOrigin.',
      'small-business':
        'Tìm hoặc bắt đầu cộng đồng doanh nghiệp nhỏ tại TP. Hồ Chí Minh — mạng lưới tiểu thương chợ Bến Thành, Bình Tây và các nhà bán online. Tham gia danh sách chờ JoinOrigin.',
    },
    ideas: '30 ý tưởng sự kiện cộng đồng tại TP. Hồ Chí Minh | JoinOrigin',
    ideasDescription:
      'Khám phá 30 ý tưởng sự kiện cộng đồng tại TP. Hồ Chí Minh — các sự kiện kết nối, học hỏi, ngoài trời, chuyên môn, sáng tạo và tác động. Tham gia danh sách chờ JoinOrigin.',
  },
  intro: [
    'TP. Hồ Chí Minh là đầu tàu kinh tế của Việt Nam, một thành phố chuyển động nhanh của xe máy, quán cà phê và dân số trẻ đang xây dựng tương lai của đất nước. Năng lượng của thành phố tập trung ở Quận 1 và Quận 3 — quán cà phê, không gian làm việc chung và nhà hàng tụ lại quanh khu phố Pháp cũ — trong khi các quận mới ở phía đông và nam giữ các khu công nghệ và sản xuất.',
    'Các tổ chức neo giữ đời sống cộng đồng của thành phố: các cơ sở của Đại học Quốc gia Việt Nam, Đại học Khoa học Xã hội và Nhân văn, và danh sách các chương trình quốc tế ngày càng nhiều nuôi dưỡng một dòng sinh viên liên tục, trong khi hệ sinh thái khởi nghiệp — một trong những hệ sinh thái sôi động nhất Đông Nam Á — thu hút nhà sáng lập từ khắp đất nước và khu vực. Chợ Bến Thành, bờ sông và các công viên của thành phố cho các nhóm những địa điểm ngoài trời miễn phí, quen thuộc.',
    'Để tìm hoặc bắt đầu một cộng đồng, TP. Hồ Chí Minh đền đáp năng lượng và sự chân thật: văn hóa của thành phố nhanh, trẻ và lạc quan, và các nhóm gặp gỡ thường xuyên bên cà phê hoặc ẩm thực đường phố nhanh chóng xây dựng lòng trung thành.',
  ],
  dataPoints: [
    'Khoảng 14 triệu dân trong vùng đô thị; thủ phủ thương mại của Việt Nam.',
    'Các quận có sắc thái riêng: Quận 1, Quận 3, Quận 5 và các quận mới phía đông và nam.',
    'Nơi đặt Đại học Quốc gia Việt Nam, Đại học Khoa học Xã hội và Nhân văn và nhiều chương trình đào tạo.',
    'Các ngành: công nghệ, sản xuất, thương mại và truyền thông.',
    'Một trong những hệ sinh thái khởi nghiệp sôi động nhất Đông Nam Á.',
    'Các điểm neo công cộng: chợ Bến Thành, lối đi bộ bờ sông và các công viên thành phố.',
  ],
  variantEnrichment: {
    startup: {
      venues: [
        'Không gian làm việc chung tại Quận 1 và Quận 3',
        'Sàn sự kiện khởi nghiệp gần khu trung tâm thương mại',
        'Phòng ươm tạo tại Đại học Quốc gia Việt Nam',
        'Trung tâm đổi mới sáng tạo ở các quận phía đông và nam',
        'Quán cà phê có góc họp tại Quận 3',
        'Phòng hội nghị khách sạn tại Quận 1',
      ],
      formats: [
        'Bữa sáng nhà sáng lập với vòng giới thiệu',
        'Buổi tối thuyết trình và đêm demo',
        'Vòng tròn builder fintech, edtech và logistics',
        'Giờ gặp nhà đầu tư tại các vườn ươm',
        'Hackathon cuối tuần tại các cơ sở đại học',
      ],
      howToStart: [
        'Chọn một ngành dọc hẹp — fintech, edtech, logistics hoặc ứng dụng tiêu dùng — và một cái tên song ngữ.',
        'Đặt một khung giờ định kỳ tại một không gian làm việc chung ở Quận 1 hoặc Quận 3.',
        'Tổ chức ba buổi gặp gỡ mở, rồi thêm một bữa tối sau mỗi buổi và nhờ hai người thường xuyên đồng tổ chức.',
      ],
    },
    creative: {
      venues: [
        'Phòng trưng bày tại Quận 3 và khu Thảo Điền',
        'Địa điểm nhạc indie và nghệ thuật tại Quận 1 và Quận 3',
        'Studio thiết kế tại các khu sáng tạo',
        'Rạp chiếu phim độc lập và không gian phim',
        'Góc nghệ thuật đường phố tại Quận 5 và khu phố cổ',
        'Sân khấu quán cà phê tại Quận 3 và Thảo Điền',
      ],
      formats: [
        'Đêm trình diễn nhạc indie',
        'Buổi tối đi bộ nghệ thuật và phòng trưng bày',
        'Ngày chợ thiết kế và thủ công',
        'Buổi tối open-mic và trình diễn lời nói',
        'Chuyến đi bộ nhiếp ảnh qua khu phố cổ',
      ],
      howToStart: [
        'Chọn một nghề — âm nhạc, thiết kế, phim, nhiếp ảnh — và một khung giờ buổi tối đều đặn.',
        'Hợp tác với một phòng trưng bày, địa điểm hoặc studio ở Quận 3 hoặc Thảo Điền để tổ chức buổi đầu tiên.',
        'Biến sự kiện thứ hai thành buổi trưng bày tác phẩm của người tham gia để nhóm có mục đích chung.',
      ],
    },
    political: {
      venues: [
        'Hội trường văn phòng quận và trung tâm cộng đồng',
        'Phòng hội thảo đại học tại ĐHQG',
        'Trung tâm NGO và tình nguyện trong thành phố',
        'Phòng thư viện công cộng có bộ sưu tập dân sự',
        'Nhà kho tình nguyện kênh rạch và công viên',
        'Phòng họp ủy ban khu phố',
      ],
      formats: [
        'Buổi họp tình nguyện dọn dẹp kênh rạch và sông',
        'Buổi họp vận động giao thông và giao thông công cộng',
        'Buổi tối thông tin về quyền nhà ở và tiền thuê',
        'Vòng hành động chống biến đổi khí hậu và chống ngập',
        'Buổi nói chuyện và đi bộ bảo tồn di sản',
      ],
      howToStart: [
        'Chọn một vấn đề địa phương cụ thể — một con kênh, một công viên, một dãy nhà di sản — và giữ phạm vi địa lý nhỏ.',
        'Hợp tác với một NGO, nhóm cộng đồng hoặc câu lạc bộ đại học hiện hữu thay vì trùng lặp công việc.',
        'Tổ chức một buổi thông tin mở tại trung tâm cộng đồng và luân phiên một kế hoạch hành động hàng tháng.',
      ],
    },
    meetup: {
      venues: [
        'Khu chợ Bến Thành',
        'Quán cà phê tại Quận 3 và Thảo Điền',
        'Lối đi bộ bờ sông dọc theo sông Sài Gòn',
        'Bãi cỏ công viên Tao Đàn',
        'Góc ẩm thực đường phố tại Quận 1 và Quận 5',
        'Quán cà phê và nhà hàng sân thượng ở trung tâm',
      ],
      formats: [
        'Chuyến đi bộ ẩm thực đường phố qua các quận',
        'Bàn trao đổi ngôn ngữ cho người mới đến',
        'Câu lạc bộ chạy sáng chủ nhật',
        'Buổi tối quán cà phê board game',
        'Buổi đi bộ sáng bờ sông',
      ],
      howToStart: [
        'Chọn một hình thức lặp lại — một chuyến đi bộ ẩm thực, một buổi chạy chủ nhật — và một điểm hẹn cố định.',
        'Chọn một góc chợ Quận 1 hoặc một quán cà phê Quận 3 sẽ đón tiếp bạn mỗi lần.',
        'Tổ chức ba buổi nhất quán, rồi nhờ người thường xuyên mời mỗi lần một người mới.',
      ],
    },
    'small-business': {
      venues: [
        'Mạng lưới tiểu thương chợ Bến Thành và Bình Tây',
        'Bàn chủ nhà hàng và quán cà phê tại Quận 1 và Thảo Điền',
        'Vòng tròn chủ cửa hàng boutique ở trung tâm',
        'Studio thương hiệu thiết kế tại các khu sáng tạo',
        'Cộng đồng gánh hàng rong tại các chợ thành phố',
        'Phòng hội thảo phòng thương mại',
      ],
      formats: [
        'Bữa sáng tiểu thương không có chương trình',
        'Buổi lập kế hoạch người bán mùa lễ hội',
        'Buổi hướng dẫn thanh toán số và thương mại điện tử',
        'Vòng tròn chia sẻ nguồn cung và nhà cung cấp',
        'Chuyến đi bộ tham quan dãy phố cửa hàng',
      ],
      howToStart: [
        'Chọn một khu chợ hoặc dãy phố mua sắm và một quán cà phê đã phục vụ các chủ cửa hàng địa phương.',
        'Tổ chức bữa sáng không chương trình trước — chủ cửa hàng đến để nói về khách hàng, tiền thuê và nền tảng.',
        'Sau ba bữa sáng, luân phiên một chủ đề thực tế mỗi tháng và để mạng lưới tiểu thương lan truyền.',
      ],
    },
  },
  variantIntros: {
    startup:
      'Hệ sinh thái khởi nghiệp của TP. Hồ Chí Minh là một trong những hệ sinh thái sôi động nhất Đông Nam Á, được tiếp năng lượng bởi dân số trẻ, đầy tham vọng và nền kinh tế kỹ thuật số tăng trưởng nhanh của đất nước. Nhà sáng lập tập trung ở Quận 1 và Quận 3, nơi các không gian làm việc chung, vườn ươm và chương trình đại học tại Đại học Quốc gia Việt Nam tạo một vòng lặp dày đặc giữa nhân tài và vốn. Điểm mạnh của thành phố trải rộng qua fintech, edtech, logistics và ứng dụng tiêu dùng phục vụ thị trường nội địa lớn của Việt Nam và ngày càng xuất khẩu ra khu vực. Văn hóa trẻ và lạc quan: các buổi gặp đầy năng lượng, mọi người háo hức học hỏi, và nhà sáng lập thành công hào phóng chia sẻ lời khuyên. Tiếng Anh phổ biến trong hệ sinh thái, và nhân tài quốc tế bị thu hút bởi năng lượng và chi phí sinh hoạt của thành phố. Các hình thức lặp lại gồm bữa sáng nhà sáng lập, buổi tối thuyết trình, vòng tròn fintech và edtech, và hackathon cuối tuần. Bắt đầu một cộng đồng khởi nghiệp ở đây hiệu quả nhất với một ngành dọc hẹp và một địa điểm cố định ở các quận trung tâm; đà của thành phố làm phần còn lại.',
    creative:
      'Bối cảnh sáng tạo của TP. Hồ Chí Minh trẻ và chuyển động nhanh, với các phòng trưng bày, nhạc indie và studio thiết kế nhân lên khắp Quận 3, Thảo Điền và khu phố cổ. Ngành phim của thành phố đang tăng trưởng nhanh, các thương hiệu thiết kế và thời trang đang giành sự chú ý của khu vực, và văn hóa ẩm thực đường phố cùng cà phê cho người sáng tạo một sân khấu luôn sẵn sàng. Nghệ thuật đường phố nở rộ ở Quận 5 và khu phố cổ, và các rạp chiếu phim độc lập cùng phòng trưng bày ở trung tâm tổ chức suất chiếu và khai mạc thường xuyên. Văn hóa cà phê là động cơ sáng tạo của thành phố — nhiều tập thể và cộng đồng bắt đầu bên cà phê và lớn lên thành triển lãm, hãng đĩa và studio. Các trường nghệ thuật và thiết kế nuôi một dòng sinh viên tốt nghiệp liên tục vào nền kinh tế tự do chuyển động nhanh. Các hình thức phổ biến gồm trình diễn indie, đi bộ nghệ thuật, chợ thủ công và open-mic. Bắt đầu một cộng đồng sáng tạo tại TP. Hồ Chí Minh là thực tế: chọn một nghề và một địa điểm có khán giả sẵn có, và sự sáng tạo trẻ trung của thành phố sẽ kéo mọi người đến.',
    political:
      'Đời sống công dân của TP. Hồ Chí Minh được định hình bởi tăng trưởng nhanh: giao thông, kênh rạch, ngập lụt và di sản là những vấn đề thường trực, hữu hình. Mạng lưới kênh rạch của thành phố — huyết mạch thoát nước và giao thông của đô thị cũ — là trọng tâm của các nhóm tình nguyện dọn dẹp và phục hồi, và người dân phối hợp chống ngập ở các khu phố trũng. Giao thông và giao thông công cộng là chủ đề nóng, với người đi lại vận động cho metro, xe buýt và không gian dành cho người đi bộ. Bảo tồn di sản là một phong trào đang lớn quanh khu phố cổ và các tòa nhà thời Pháp ở trung tâm. Giá nhà ở phải chăng và quyền thuê nhà quan trọng trong một thành phố nơi người trẻ đổ về làm việc và học tập. Các cơ sở đại học và viện nghiên cứu thêm một lớp dựa trên bằng chứng. Văn hóa đền đáp năng lượng và kiên trì: xuất hiện tại một cuộc họp thực sự và đảm nhận vai trò hữu hình quan trọng hơn bình luận. Bắt đầu một cộng đồng chính trị ở đây nghĩa là chọn một vấn đề cụ thể và một phạm vi địa lý nhỏ — một con kênh, một công viên, một dãy nhà di sản — rồi hợp tác với các cấu trúc tình nguyện và cộng đồng đã tồn tại. TP. Hồ Chí Minh đền đáp hành động đều đặn, hữu hình.',
    meetup:
      'Bối cảnh gặp gỡ của TP. Hồ Chí Minh chạy trên hai thiết chế địa phương tuyệt vời: cà phê và ẩm thực đường phố. Các quán cà phê Quận 3 và Thảo Điền đón tiếp câu lạc bộ sách, trao đổi ngôn ngữ, buổi tối board game và buổi sáng cà phê freelancer, trong khi các góc ẩm thực đường phố Quận 1 và Quận 5 là sân khấu cho hình thức yêu thích của thành phố — chuyến đi bộ ẩm thực, nơi một nhóm ăn qua một quận với những điểm dừng kể chuyện. Chợ Bến Thành và chợ Bình Tây thu hút người yêu chợ, và công viên Tao Đàn cùng các lối đi bộ bờ sông đón tiếp các buổi chạy sáng, đi bộ và picnic. Dân số trẻ và cộng đồng quốc tế lớn giữ cho các nhóm nói tiếng Anh dồi dào, và người mới đến được chào đón nhanh chóng. Các nhóm ở đây có xu hướng tràn đầy năng lượng, thân mật và hướng đến ẩm thực, khớp với tính cách của thành phố. Bắt đầu một buổi gặp gỡ là thực tế: chọn một hình thức lặp lại — một chuyến đi bộ ẩm thực, một buổi chạy chủ nhật — và một điểm hẹn cố định ở các quận trung tâm, tổ chức ba buổi cùng thời gian và địa điểm, và năng lượng của thành phố sẽ tiếp quản.',
    'small-business':
      'Cộng đồng doanh nghiệp nhỏ của TP. Hồ Chí Minh trải dài từ các khu chợ huyền thoại đến nền kinh tế mới tăng trưởng nhanh. Chợ Bến Thành và Bình Tây vận hành trên mạng lưới tiểu thương quản lý sạp hàng, lễ hội và tiếng nói chung về tiền thuê và quy tắc, phục vụ cả người dân địa phương lẫn lượng du khách khổng lồ của thành phố. Nền kinh tế mới khác biệt: quán cà phê và nhà hàng Quận 1 và Thảo Điền, các cửa hàng boutique ở trung tâm, và một tầng người bán online đang bùng nổ vận hành thương hiệu từ các studio nhỏ. Văn hóa cà phê và ẩm thực đường phố của Việt Nam cho các doanh nghiệp thực phẩm nhỏ một thị trường lớn, trung thành, và thanh toán số cùng thương mại điện tử giờ là công cụ chuẩn. Phòng thương mại và các hiệp hội ngành tổ chức các buổi hướng dẫn thực tế về giấy phép, thương mại điện tử và tuyển dụng. Điều giữ các nhóm này lại với nhau là địa lý và thị hiếu: một khu chợ hoặc một dãy phố chia sẻ khách hàng, lượng người qua lại và cùng một chu kỳ xu hướng. Bắt đầu một cộng đồng doanh nghiệp nhỏ tại TP. Hồ Chí Minh rất khả thi — một bữa sáng hàng tháng cho chủ cửa hàng trên một con phố, với các chủ đề thực tế luân phiên, đáng tin cậy lấp đầy một căn phòng.',
  },
  ideaPage: {
    intro:
      'TP. Hồ Chí Minh là một thành phố tuyệt vời cho các ý tưởng sự kiện cộng đồng: ẩm thực huyền thoại, văn hóa cà phê đẳng cấp thế giới, và dân số trẻ khiến mọi người xuất hiện. Ba mươi ý tưởng dưới đây được nhóm thành sáu danh mục: kết nối, học hỏi, xã hội và ngoài trời, chuyên môn và ngành, sáng tạo và chế tác, và tác động và địa phương. Mỗi ý tưởng gồm nó dành cho ai, một lời giới thiệu ngắn, và một loại địa điểm gợi ý thực sự tồn tại tại TP. Hồ Chí Minh, từ chợ Bến Thành và quán cà phê Quận 3 đến các lối đi bộ bờ sông và các sàn làm việc chung trung tâm. Một số ý tưởng hoạt động như sự kiện một lần; những ý tưởng khác được thiết kế để trở thành cộng đồng định kỳ với một ngày và địa điểm cố định. Quy tắc trung thực đơn giản: mọi gợi ý địa điểm là một loại nơi thực tế trong thành phố này, và mọi hình thức đủ đơn giản để một người tổ chức lần đầu chạy được. Chọn ý tưởng khớp với sở thích của bạn, tìm một địa điểm ở các quận trung tâm, và để năng lượng của thành phố làm phần còn lại.',
    categories: [
      {
        name: 'Kết nối',
        ideas: [
          {
            title: 'Chuyến đi bộ khám phá Bến Thành cho người mới',
            pitch:
              'Một chuyến đi bộ qua chợ nơi người mới đến và cư dân lâu năm trao đổi mẹo thành phố và câu chuyện công việc.',
            audience: 'Người mới đến và người yêu chợ',
            venueType: 'Khu chợ Bến Thành',
          },
          {
            title: 'Bữa sáng nhà sáng lập Quận 1',
            pitch:
              'Một bữa sáng sớm nơi các nhà sáng lập chia sẻ chiến thắng và điểm nghẽn của tuần trước khi ngày làm việc bắt đầu.',
            audience: 'Nhà sáng lập khởi nghiệp tại TP. Hồ Chí Minh',
            venueType: 'Một quán cà phê tại Quận 1',
          },
          {
            title: 'Gặp gỡ kết nối Quận 3',
            pitch:
              'Một buổi cà phê tối áp lực thấp với thẻ phá băng và một quy tắc: gặp ba người mới.',
            audience: 'Chuyên gia và người sáng tạo',
            venueType: 'Một quán cà phê tại Quận 3',
          },
          {
            title: 'Vòng tròn kể chuyện nghề nghiệp',
            pitch:
              'Sáu người kể câu chuyện nghề nghiệp của họ trong năm phút mỗi người, theo sau là câu hỏi và kết nối.',
            audience: 'Người chuyển ngành, sinh viên và người cố vấn',
            venueType: 'Một trung tâm cộng đồng hoặc phòng thư viện',
          },
          {
            title: 'Câu lạc bộ cà phê freelancer',
            pitch:
              'Một buổi cà phê sáng hàng tuần nơi freelancer các ngành chia sẻ khách hàng, mức giá và câu chuyện khách.',
            audience: 'Freelancer mọi ngành nghề',
            venueType: 'Một quán cà phê làm việc chung tại Thảo Điền',
          },
        ],
      },
      {
        name: 'Học hỏi & hội thảo',
        ideas: [
          {
            title: 'Bàn hội thoại tiếng Việt',
            pitch:
              'Bàn theo trình độ, một người bản ngữ mỗi bàn, và một quy tắc đơn giản: sai là điểm chính.',
            audience: 'Người mới đến học tiếng Việt',
            venueType: 'Một trung tâm cộng đồng hoặc quán cà phê',
          },
          {
            title: 'Lớp nấu ăn Việt tại nhà',
            pitch: 'Lớp nhóm nhỏ dạy phở, bánh xèo và các món yêu thích khác từ đầu.',
            audience: 'Người nội trợ mọi trình độ',
            venueType: 'Một bếp cộng đồng hoặc trường dạy nấu ăn',
          },
          {
            title: 'Vòng tròn pha và thử cà phê',
            pitch:
              'Một buổi thực hành về pha phin, espresso và nghệ thuật văn hóa cà phê Việt Nam.',
            audience: 'Người yêu cà phê và người pha tại nhà',
            venueType: 'Một quán cà phê đặc sản hoặc xưởng rang',
          },
          {
            title: 'Tiếp thị số cho thương hiệu nhỏ',
            pitch:
              'Các buổi thực hành về nền tảng, nội dung và thương mại điện tử cho doanh nghiệp nhỏ và khởi nghiệp.',
            audience: 'Chủ doanh nghiệp nhỏ và người làm tiếp thị',
            venueType: 'Một phòng sự kiện không gian làm việc chung',
          },
          {
            title: 'Buổi hướng dẫn CV và phỏng vấn',
            pitch:
              'Chuyên gia tình nguyện xem lại CV và chạy phỏng vấn thử cho người tìm việc trong một buổi tối có cấu trúc.',
            audience: 'Sinh viên và người tìm việc giai đoạn đầu',
            venueType: 'Một phòng họp trường cao đẳng hoặc thư viện',
          },
        ],
      },
      {
        name: 'Xã hội & ngoài trời',
        ideas: [
          {
            title: 'Chuyến đi bộ ẩm thực đường phố qua Quận 1',
            pitch:
              'Một chuyến đi bộ tối có hướng dẫn qua các góc ẩm thực đường phố huyền thoại với câu chuyện đằng sau mỗi gánh hàng.',
            audience: 'Người yêu ẩm thực và người khám phá',
            venueType: 'Các góc ẩm thực đường phố Quận 1',
          },
          {
            title: 'Chạy sáng công viên Tao Đàn',
            pitch:
              'Một buổi chạy nhóm thân thiện, mọi tốc độ quanh công viên, theo sau là bữa sáng cà phê.',
            audience: 'Người chạy mọi trình độ',
            venueType: 'Công viên Tao Đàn',
          },
          {
            title: 'Buổi tối quán cà phê board game',
            pitch:
              'Một buổi tối hàng tuần tại một quán cà phê board game chào đón người mới và chiến thuật yên tĩnh.',
            audience: 'Game thủ thông thường và hàng xóm',
            venueType: 'Một quán cà phê board game tại Quận 3',
          },
          {
            title: 'Đi bộ hoàng hôn bờ sông',
            pitch:
              'Một chuyến đi bộ tối có hướng dẫn dọc sông Sài Gòn, căn giờ cho hoàng hôn và ánh đèn thành phố.',
            audience: 'Người khám phá và nhiếp ảnh gia',
            venueType: 'Lối đi bộ bờ sông Sài Gòn',
          },
          {
            title: 'Nhóm đạp xe chủ nhật',
            pitch:
              'Một buổi đạp sáng thư giãn qua các con phố yên tĩnh và bờ sông, với các điểm dừng cà phê.',
            audience: 'Người đạp xe giải trí',
            venueType: 'Đường phố thành phố và lối đi bộ bờ sông',
          },
        ],
      },
      {
        name: 'Chuyên môn & ngành',
        ideas: [
          {
            title: 'Bàn tròn nhà sáng lập fintech',
            pitch:
              'Một bàn tròn hàng tháng cho nhà sáng lập fintech chia sẻ tiến độ sản phẩm và bài học quy định.',
            audience: 'Nhà sáng lập và người vận hành fintech',
            venueType: 'Một sàn làm việc chung tại Quận 1',
          },
          {
            title: 'Vòng tròn builder edtech',
            pitch:
              'Nhà sáng lập xây dựng sản phẩm giáo dục chia sẻ bài học sư phạm, phân phối và tăng trưởng.',
            audience: 'Nhà sáng lập và người vận hành edtech',
            venueType: 'Một phòng sự kiện không gian làm việc chung tại Quận 3',
          },
          {
            title: 'Vòng tròn đồng nghiệp quản lý sản phẩm',
            pitch:
              'Một vòng tròn bảo mật nơi PM thảo luận một thách thức hàng tháng — lộ trình, tuyển dụng, chính trị các bên liên quan.',
            audience: 'Quản lý sản phẩm trong công nghệ',
            venueType: 'Một phòng họp không gian làm việc chung',
          },
          {
            title: 'Buổi gặp gỡ logistics và chuỗi cung ứng',
            pitch:
              'Chuyên gia logistics và công nghệ chuỗi cung ứng thảo luận xu hướng và cộng tác.',
            audience: 'Chuyên gia logistics và nhà sáng lập',
            venueType: 'Một phòng hội nghị khách sạn',
          },
          {
            title: 'Bàn tròn lãnh đạo thiết kế',
            pitch:
              'Lãnh đạo thiết kế chia sẻ cách họ tuyển, xây đội và ảnh hưởng quyết định sản phẩm trong một vòng tròn có cấu trúc.',
            audience: 'Trưởng phòng thiết kế và nhà thiết kế cao cấp',
            venueType: 'Một studio hoặc phòng họp không gian làm việc chung',
          },
        ],
      },
      {
        name: 'Sáng tạo & chế tác',
        ideas: [
          {
            title: 'Đi bộ phòng trưng bày Quận 3',
            pitch:
              'Một chuyến đi bộ tối có hướng dẫn qua các phòng trưng bày, với trò chuyện nghệ sĩ tại các điểm chọn lọc.',
            audience: 'Người yêu nghệ thuật và du khách tò mò',
            venueType: 'Các phòng trưng bày Quận 3',
          },
          {
            title: 'Đêm trình diễn nhạc indie',
            pitch: 'Một sân khấu mở hàng tháng cho ban nhạc indie, nghệ sĩ solo và người lần đầu.',
            audience: 'Nhạc sĩ và người yêu nhạc',
            venueType: 'Một địa điểm nhạc sống tại Quận 1',
          },
          {
            title: 'Buổi tối open-mic và trình diễn lời nói',
            pitch:
              'Một open-mic hàng tháng nơi nhà thơ, người kể chuyện và người lần đầu chia sẻ năm phút trên sân khấu.',
            audience: 'Nhà văn và người trình diễn',
            venueType: 'Một sân khấu quán cà phê tại Thảo Điền',
          },
          {
            title: 'Đi bộ nhiếp ảnh khu phố cổ',
            pitch:
              'Một chuyến đi bộ nhiếp ảnh có hướng dẫn qua Quận 5 và các con hẻm, chợ và nghệ thuật đường phố của khu phố cổ.',
            audience: 'Nhiếp ảnh gia nghiệp dư và chuyên nghiệp',
            venueType: 'Đường phố Quận 5 và khu phố cổ',
          },
          {
            title: 'Ngày chợ thiết kế và thủ công',
            pitch:
              'Nhà thiết kế và người chế tác địa phương bán và kể câu chuyện đằng sau tác phẩm của họ trong một khu chợ thân thiện.',
            audience: 'Người chế tác, nhà thiết kế và người mua sắm',
            venueType: 'Một phòng trưng bày hoặc không gian sự kiện cộng đồng',
          },
        ],
      },
      {
        name: 'Tác động & địa phương',
        ideas: [
          {
            title: 'Buổi sáng tình nguyện dọn kênh',
            pitch:
              'Một buổi dọn dẹp sáng thứ bảy một đoạn kênh, với găng tay và vật dụng được cung cấp.',
            audience: 'Cư dân và tình nguyện viên lần đầu',
            venueType: 'Một đoạn kênh trong thành phố',
          },
          {
            title: 'Vòng khu phố chống ngập',
            pitch:
              'Hàng xóm lập bản đồ các con phố dễ ngập và điều phối một kế hoạch ứng phó đơn giản với tình nguyện viên địa phương.',
            audience: 'Cư dân ở các khu vực trũng',
            venueType: 'Một trung tâm cộng đồng hoặc hội trường khu phố',
          },
          {
            title: 'Đi bộ và nói chuyện bảo tồn di sản',
            pitch:
              'Một chuyến đi bộ có hướng dẫn qua các khu phố thời Pháp và một cuộc thảo luận về điều cư dân có thể làm để bảo vệ chúng.',
            audience: 'Người yêu lịch sử và di sản',
            venueType: 'Đường phố khu trung tâm và một hội trường địa phương',
          },
          {
            title: 'Ngày dọn dẹp và trồng cây công viên',
            pitch:
              'Hàng xóm dọn dẹp và trồng cây một công viên địa phương với đội công viên của quận.',
            audience: 'Hàng xóm và gia đình',
            venueType: 'Một công viên hoặc không gian xanh địa phương',
          },
          {
            title: 'Đêm kể chuyện chợ',
            pitch:
              'Tiểu thương và chủ cửa hàng chia sẻ câu chuyện năm phút đằng sau doanh nghiệp của họ, theo sau là câu hỏi mở.',
            audience: 'Hàng xóm và chủ doanh nghiệp nhỏ',
            venueType: 'Một nhà chợ hoặc quán cà phê địa phương',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Làm thế nào tôi chọn một trong những ý tưởng này?',
        answer:
          'Khớp danh mục với sở thích của bạn và đối tượng bạn có thể tiếp cận. Tại TP. Hồ Chí Minh, các hình thức định kỳ với một địa điểm cố định — một chuyến đi bộ ẩm thực, một buổi chạy chủ nhật, một bữa sáng hàng tháng — xây dựng cộng đồng nhanh nhất.',
      },
      {
        question: 'Tôi có cần nói tiếng Việt để tổ chức không?',
        answer:
          'Không. Nhiều nhóm tại TP. Hồ Chí Minh vận hành song ngữ hoặc bằng tiếng Anh, và cộng đồng quốc tế rất lớn. Một thông báo song ngữ thường tăng gấp đôi tầm với của bạn.',
      },
      {
        question: 'Các sự kiện này có thể trở thành cộng đồng thực sự không?',
        answer:
          'Có — các hình thức định kỳ là cách hầu hết cộng đồng tại TP. Hồ Chí Minh bắt đầu, và năng lượng của thành phố duy trì chúng. Các hướng dẫn cách làm đi qua từ sự kiện đầu tiên đến một cộng đồng ổn định.',
      },
    ],
  },
  faq: [
    {
      question: 'Làm thế nào tôi tìm một cộng đồng tại TP. Hồ Chí Minh?',
      answer:
        'Dùng các trang loại nhóm cho cộng đồng khởi nghiệp, sáng tạo, chính trị, gặp gỡ và doanh nghiệp nhỏ. Mỗi trang mô tả các quận, địa điểm và hình thức thực tế nơi cư dân tụ họp. JoinOrigin đã hoạt động — tạo hồ sơ của bạn và tìm hoặc bắt đầu cộng đồng của bạn ngay hôm nay.',
    },
    {
      question: 'Bắt đầu một cộng đồng tại TP. Hồ Chí Minh có thực tế không?',
      answer:
        'Có. Thành phố có dân số trẻ, hệ sinh thái khởi nghiệp bùng nổ và văn hóa ẩm thực cùng cà phê huyền thoại. Các hướng dẫn bao phủ việc bắt đầu một cộng đồng, tổ chức một buổi gặp gỡ và có mười thành viên đầu tiên.',
    },
    {
      question: 'Các gợi ý địa điểm trên trang này có thực không?',
      answer:
        'Có. Mọi loại địa điểm được đề cập — chợ Bến Thành, công viên Tao Đàn, quán cà phê Quận 3, lối đi bộ bờ sông — đều tồn tại tại TP. Hồ Chí Minh. Chúng tôi không bao giờ bịa số lượng thành viên, xếp hạng hoặc văn phòng địa phương.',
    },
    {
      question: 'JoinOrigin có văn phòng tại TP. Hồ Chí Minh không?',
      answer:
        'Không. JoinOrigin không có văn phòng hoặc nhân viên địa phương. Mọi mô tả cộng đồng phản ánh bối cảnh thành phố thực tế, và nền tảng giúp cư dân tìm hoặc bắt đầu cộng đồng.',
    },
  ],
};

export default content;
