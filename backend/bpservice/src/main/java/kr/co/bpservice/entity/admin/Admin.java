package kr.co.bpservice.entity.admin;

import jakarta.persistence.*;
import kr.co.bpservice.entity.common.Person;
import kr.co.bpservice.util.auth.entity.Authority;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "MWS_ADMIN")
@NoArgsConstructor
@Getter
@Setter
public class Admin extends Person {

    @Builder
    public Admin(String id, String pwd, Authority authority) {
        super.setId(id);
        super.setPwd(pwd);
        super.setAuthority(authority);
    }
}
