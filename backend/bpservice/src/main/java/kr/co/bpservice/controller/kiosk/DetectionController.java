package kr.co.bpservice.controller.kiosk;

import ai.onnxruntime.OrtException;

import kr.co.bpservice.util.error.ErrorCode;
import kr.co.bpservice.util.error.UploadFileException;
import kr.co.bpservice.yolov5.Detection;
import kr.co.bpservice.yolov5.YoloV5;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequestMapping("/api/img")
@RestController
@RequiredArgsConstructor
public class DetectionController {
    private final YoloV5 inferenceSession;

    private DetectionController() throws OrtException, IOException {
        String modelPath = Objects.requireNonNull(DetectionController.class.getResource("/yolov5s.onnx")).getFile();
        modelPath=modelPath.substring(1);
        String labelPath = Objects.requireNonNull(DetectionController.class.getResource("/coco.names")).getFile();
        this.inferenceSession = new YoloV5(modelPath, labelPath, 0.25f, 0.45f, -1);
    }

    @PostMapping(value = "/detection")
    public List<Detection> detection(@RequestBody MultipartFile uploadFile) throws OrtException, IOException {
        byte[] bytes = uploadFile.getBytes();

        Mat img = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_COLOR);
        List<Detection> result = inferenceSession.run(img);
        return result;
    }

    @PostMapping(value = "/detection-test")
    public String detectionTest(@RequestBody Map<String, String> requestMap) throws OrtException, IOException {
        byte[] bytes = Base64.decodeBase64(requestMap.get("imgData")
                .replaceAll("data:image/png;base64,", "")
                .replaceAll("data:image/jpeg;base64,", "")
        );

        Mat img = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_COLOR);
        List<Detection> result = inferenceSession.run(img);
        String requestData = "우산이 인식되지 않았습니다.";
        for(int i = 0; i<result.size();i++){
            if(result.get(i).label().equals("umbrella")&&result.get(i).confidence()>=0.5f) {
                requestData="우산이 인식되었습니다.";
            }
        }
        return requestData;
    }
}
