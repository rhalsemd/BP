package kr.co.bpservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BpserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(BpserviceApplication.class, args);
	}
}
