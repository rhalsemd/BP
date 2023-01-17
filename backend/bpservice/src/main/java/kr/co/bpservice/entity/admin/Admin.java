package kr.co.bpservice.entity.admin;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MWS_ADMIN")
@Getter
@Setter
public class Admin {

    @Id
    @Column(length = 50)
    private String id;

    @Column(length = 200)
    private String pw;
}
