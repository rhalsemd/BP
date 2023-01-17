import { useNavigate } from "react-router-dom";


const KioskHomeBtn = () => {
  const navigate = useNavigate();
  
  const KioskHomeMove = () => {
    navigate('/')
  }

  return (
    <div>
      <button onClick={KioskHomeMove}>홈으로 가기</button>
    </div>
  );
}

export default KioskHomeBtn