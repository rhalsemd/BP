// import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const KioskPaymentQR = () => {
  const { id } = useSelector((store) => store)
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
  //   navigate(`/kiosk/${id}/rent/complete`);
  // }

  return (
    <div>
      <QRCodeSVG
        value={"https://www.google.com/search?q=555"}
        size={400}
        imageSettings={{ src: `https://www.google.com?q=555`, width: 10, height: 10 }}
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