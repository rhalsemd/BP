package kr.co.bpservice.util.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ImageUtils {
    public static String imageUrlLinux;
    public static String imageUrlWindows;

    @Value("${image.url.linux}")
    private void setImageUrlLinux(String imageUrl) {
        ImageUtils.imageUrlLinux = imageUrl;
    }

    @Value("${image.url.windows}")
    private void setImageUrlWindows(String imageUrl) {
        ImageUtils.imageUrlWindows = imageUrl;
    }

    public static String getImageUrl(String fileName) {
        String imageUrl = "";
        String osInfo = System.getProperty("os.name").toLowerCase();

        if (osInfo.contains("win")) {
            imageUrl = String.format("%s/%s.png", imageUrlWindows, fileName);
        } else if (osInfo.contains("linux")) {
            imageUrl = String.format("%s/%s.png", imageUrlLinux, fileName);
        }

        return imageUrl;
    }

    public static String getImageUrl() {
        String imageUrl = "";
        String osInfo = System.getProperty("os.name").toLowerCase();

        if (osInfo.contains("win")) {
            imageUrl = imageUrlWindows;
        } else if (osInfo.contains("linux")) {
            imageUrl = imageUrlLinux;
        }

        return imageUrl;
    }
}
