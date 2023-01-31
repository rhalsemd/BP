package kr.co.bpservice.config.common;

import kr.co.bpservice.util.image.ImageUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${image.url.linux}")
    public String imageUrlLinux;

    @Value("${image.url.windows}")
    public String imageUrlWindows;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String imageUrl = ImageUtils.getImageUrl();

        registry.addResourceHandler("/images/**")
                .addResourceLocations(String.format("file:///%s/", imageUrl))
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
