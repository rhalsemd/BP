package kr.co.bpservice.entity.common;

import jakarta.persistence.*;
import kr.co.bpservice.util.auth.entity.Authority;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class Person {
    @Id
    @Column(length = 50)
    private String id;

    @Column(length = 200)
    private String pwd;

    @Transient
    @Enumerated(EnumType.STRING)
    private Authority authority;


}
