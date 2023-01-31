import { useLocation } from "react-router-dom";

const KioskReturnGuideSection = () => {
  const location = useLocation();
  console.log(location.state)
  return (
    <div>
      <h1>여기서 몇번 홀더에 우산을 넣어주세요</h1>
    </div>
  )
};

export default KioskReturnGuideSection