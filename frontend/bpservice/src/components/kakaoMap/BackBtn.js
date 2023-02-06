import { useNavigate } from "react-router-dom";
import styled from "../../style/MapBtn.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function BackBtn() {
  const navigator = useNavigate();

  const back = () => {
    navigator("/bp");
  };

  return (
    <>
      {/* <button className={styled.backBtn} onClick={back}>
        {"<"}
      </button> */}
      <KeyboardBackspaceIcon
        className={styled.backBtn}
        onClick={back}
        fontSize="large"
      ></KeyboardBackspaceIcon>
    </>
  );
}

export default BackBtn;
