package kr.co.bpservice.yolov5;

public record Detection(String label, float[] bbox, float confidence) {

}
