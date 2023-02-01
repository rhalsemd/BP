// import { useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import KioskHeader from "../components/KioskHeader";
import KioskReturnGuideSection from "../components/KioskReturnGuideSection";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KioskReturnGuideContainer = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  // 결제 정보 가져오기
  const getPayment = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/posts',
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    getPayment();
  }, []);

  const miliUnit = 1000
  const seconds = 60 * miliUnit

  // 홈화면으로
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate('/kiosk')
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])

  return (
    <div>
      <KioskHeader/>
      <KioskReturnGuideSection/>
    </div>
  )
}

export default KioskReturnGuideContainer;