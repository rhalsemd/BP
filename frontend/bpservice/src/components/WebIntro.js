import { useNavigate } from "react-router-dom";
import styled from "../style/WebIntro.module.css";

function WebIntro() {
  const navigation = useNavigate();

  const timer = setTimeout(() => {
    navigation("/bp");
  }, 3500);

  const onClick = () => {
    navigation("/bp");
    clearTimeout(timer);
  };

  return (
    <div onClick={onClick}>
      <div className={styled.box}>
        <div className={(styled.text, styled.flicker)}>
          <p className={styled.t1} style={{ fontSize: "5.5rem" }}>
            B.P.
          </p>
        </div>
        <div className={(styled.text, styled.flicker)}>
          <p className={styled.t2} style={{ fontSize: "2rem" }}>
            모두가 경험하고 있는
          </p>
        </div>
        <div className={(styled.text, styled.flicker)}>
          <p className={styled.end} style={{ fontSize: "2rem" }}>
            새로운 우산 사용 방법.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WebIntro;
