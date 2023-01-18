import {QRCodeSVG} from 'qrcode.react';

const PaymentQR = () => {
  return (
    <div>
      <QRCodeSVG 
        value={"https://www.naver.com/"}
        size={295}
        imageSettings={{ src:'https://www.naver.com/', width: 10, height: 10 }}
        id="qr-gen"
        level={"H"}
        includeMargin={true}
        bgColor={"white"}
        fgColor={"black"}
      />,
    </div>
  )
}

export default PaymentQR