import { useNavigate } from "react-router-dom";
import styled from "../../style/MapBtn.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function RoadViewBackBtn() {
  const navigator = useNavigate();

  const back = () => {
    navigator("/bp/map");
  };

  return (
    <>
      <KeyboardBackspaceIcon
        className={styled.backBtn}
        onClick={back}
        fontSize="large"
      ></KeyboardBackspaceIcon>
    </>
  );
}

export default RoadViewBackBtn;
