package kr.co.bpservice.service.admin;

import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.network.Get;
import kr.co.bpservice.util.network.Header;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;

@Service
public class AKioskManageService {
    private String kioskUrl = "http://rigizer2.iptime.org:8000/%s/%d";

    public boolean openAllKiosk(int kioskId) {
        try {
            Header header = new Header();
            header.append("User-Agent", HTTPUtils.USER_AGENT);
            header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
            header.append("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
            header.append("Connection", HTTPUtils.CONNECTION);

            Get get = new Get(String.format(kioskUrl, "open-all", kioskId), header);

            int responseCode = get.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                return false;
            }

            return true;
        } catch (Exception e) {
            System.out.println(e);
        }

        return false;
    }

    public boolean closeAllKiosk(int kioskId) {
        try {
            Header header = new Header();
            header.append("User-Agent", HTTPUtils.USER_AGENT);
            header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
            header.append("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
            header.append("Connection", HTTPUtils.CONNECTION);

            Get get = new Get(String.format(kioskUrl, "close-all", kioskId), header);

            int responseCode = get.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                return false;
            }

            return true;
        } catch (Exception e) {
            System.out.println(e);
        }

        return false;
    }
}
