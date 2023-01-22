import { useNavigate } from "react-router-dom";
import styled from "../../style/MapBtn.module.css";

function BackBtn() {
  const navigator = useNavigate();

  const back = () => {
    navigator("/");
  };

  return (
    <>
      <button className={styled.backBtn} onClick={back}>
        {"<"}
      </button>
    </>
  );
}

export default BackBtn;
