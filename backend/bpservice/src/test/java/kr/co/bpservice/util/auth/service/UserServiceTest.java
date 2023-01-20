package kr.co.bpservice.util.auth.service;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

// 테스트 도중 오류발생.
// RequestHeader에 액세스 토큰을 설정해서 테스트하는 법을 찾아내야함.
@SpringBootTest
@Transactional
class UserServiceTest {

//    @Autowired
//    private AuthService authService;
//    @Autowired
//    private UserService userService;
//    @Autowired
//    private UserRepository userRepository;
//    private User user;
//    private TokenDto token;
//
//
//    // 테스트를 위한 사전 작업
//    @BeforeEach
//    public void before() {
//        // 회원가입 로직
//        String userId = "test9999";
//        String pwd = "99999999";
//        String userName = "테스트9999";
//        String phoneNum = "01011111111";
//        String sido = "대구광역시";
//        String sigugun = "수성구";
//        String dong = "황금동";
//        String email = "test999@naver.com";
//
//        UserRequestDto requestDto = new UserRequestDto().builder()
//                .userId(userId)
//                .pwd(pwd)
//                .userName(userName)
//                .phoneNum(phoneNum)
//                .sido(sido)
//                .sigugun(sigugun)
//                .dong(dong)
//                .email(email)
//                .build();
//        UserResponseDto responseDto = authService.join(requestDto);
//
//        // 로그인 로직
//        this.token = authService.login(requestDto);
//    }
//
//    @Test
//    @DisplayName("회원정보 수정 테스트")
//    public void changeUserInfoTest() {
//        // 회원가입 로직
//        String userId = "test9999";
//        String pwd = "99999999";
//        String userName = "테스트9999";
//        String phoneNum = "01099999999"; // 수정된 연락처
//        String sido = "서울특별시"; // 수정된 주소
//        String sigugun = "강남구"; // 수정된 주소
//        String dong = "역삼동"; // 수정된 주소
//        String email = "abcd123@naver.com"; // 수정된 이메일
//
//        UserRequestDto requestDto = new UserRequestDto().builder()
//                .userId(userId)
//                .pwd(pwd)
//                .userName(userName)
//                .phoneNum(phoneNum)
//                .sido(sido)
//                .sigugun(sigugun)
//                .dong(dong)
//                .email(email)
//                .build();
//
//        userService.changeUserInfo(requestDto); // 오류 발생
//        userRepository.flush();
//        Optional<User> optionalUser = userRepository.findById(userId);
//        User user = optionalUser.get();
//
//        // 회원정보 수정 테스트
//        assertThat(user.getPhoneNum()).isEqualTo(phoneNum);
//        assertThat(user.getEmail()).isEqualTo(email);
//        assertThat(user.getSido()).isEqualTo(sido);
//        assertThat(user.getSigugun()).isEqualTo(sigugun);
//        assertThat(user.getDong()).isEqualTo(dong);
//    }

}