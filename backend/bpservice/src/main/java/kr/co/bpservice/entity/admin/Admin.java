package kr.co.bpservice.entity.admin;

import jakarta.persistence.*;
import kr.co.bpservice.entity.common.Person;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MWS_ADMIN")
@Getter
@Setter
public class Admin extends Person {
}
