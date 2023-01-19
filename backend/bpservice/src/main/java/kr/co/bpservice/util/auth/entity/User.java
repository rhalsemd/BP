// 사용안하는 엔티티임.
// 혹시 몰라서 백업 용도로 저장.

//package kr.co.bpservice.util.auth.entity;
//
//import jakarta.persistence.*;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Getter
//@Builder
//@NoArgsConstructor
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String email;
//
//    @Column(nullable = false)
//    private String password;
//
//    @Column(nullable = false)
//    private String nickname;
//
//    @Enumerated(EnumType.STRING)
//    private Authority authority;
//
//    public void setNickname(String nickname) {
//        this.nickname = nickname;
//    }
//
//    public void setPassword(String password) { this.password = password; }
//
//    @Builder
//    public User(Long id, String email, String password, String nickname, Authority authority) {
//        this.id = id;
//        this.email = email;
//        this.password = password;
//        this.nickname = nickname;
//        this.authority = authority;
//    }
//}
