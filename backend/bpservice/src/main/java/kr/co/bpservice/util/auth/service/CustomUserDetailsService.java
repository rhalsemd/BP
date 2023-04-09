package kr.co.bpservice.util.auth.service;

import kr.co.bpservice.entity.admin.Admin;
import kr.co.bpservice.entity.common.Person;
import kr.co.bpservice.util.auth.entity.Authority;
import kr.co.bpservice.util.auth.repository.AdminRepository;
import kr.co.bpservice.util.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(adminRepository.existsById(username)){
            return adminRepository.findById(username)
                    .map(this::createUserDetails)
                    .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다."));
        } else {
            return userRepository.findById(username)
                    .map(this::createUserDetails)
                    .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));
        }
    }

    private UserDetails createUserDetails(Person person) {
        if(person instanceof Admin)
            person.setAuthority(Authority.ROLE_ADMIN);
        else
            person.setAuthority(Authority.ROLE_USER);
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(person.getAuthority().toString());

        return new org.springframework.security.core.userdetails.User(
                person.getId(),
                person.getPwd(),
                Collections.singleton(grantedAuthority)
        );
    }
}
