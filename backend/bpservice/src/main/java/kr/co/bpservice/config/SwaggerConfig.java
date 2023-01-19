package kr.co.bpservice.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI(@Value("${springdoc.version}") String appVersion) {
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("비피 Rest API")
                        .version(appVersion)
                        .description("비피 서비스에서 사용되는 Rest API 문서입니다.")
                        .termsOfService("http://swagger.io/terms/")
                        .contact(
                                new Contact()
                                        .name("비피")
                                        .url("http://bpservice.co.kr")
                                        .email("ssafy8th.gumi@gmail.com")
                        ));
    }
}
