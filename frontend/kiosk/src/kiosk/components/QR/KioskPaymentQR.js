// import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const KioskPaymentQR = () => {
  // // 결제완료 관련 Hook
  // const [isPayment, setIsPayment] = useState(false);
  // const navigate = useNavigate();

  // // 결제완료확인
  // axios({
  //   method: 'GET',
  //   url: 'http://192.168.100.79:8080/api/brolly/return',
  //   // url: 'http://bp.ssaverytime.kr:8080/api/auth/user/brolly/return/update/img',
  // }).then((res) => setIsPayment(res.data.isBoolean))

  // // 지불완료 표시확인 후, 이동
  // if (isPayment) {
  //   navigate('/kiosk/rent/complete');
  // }

  return (
    <div>
      <QRCodeSVG
        value={"https://www.naver.com/"}
        size={400}
        imageSettings={{ src: 'https://www.naver.com/', width: 10, height: 10 }}
        id="qr-gen"
        level={"H"}
        includeMargin={true}
        bgColor={"white"}
        fgColor={"#404040"}
      />
    </div>
  )
}

export default KioskPaymentQR;