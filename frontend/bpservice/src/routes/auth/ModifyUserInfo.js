/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import Footer from "../../components/Footer";
import ModifyUserAddress from "../../components/modifyUserInfo/ModifyUserAddress";
import Nav from "../../components/Nav";

const loginModalStyle = css`
  height: 40%;
  width: 95%;
  margin: 15vh 2.5vw 19vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), 0 10px 10px rgba(0, 0, 0, 0.52);
  }
  input::placeholder {
    color: transparent;
  }
  input:placeholder-shown + label {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }
  input:focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  input:focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }
`;

function ModifyUserInfo() {
  const [info, setInfo] = useState({});

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={loginModalStyle}>
        <h1>회원정보 수정</h1>

        {/* 주소 */}
        <ModifyUserAddress setInfo={setInfo} info={info} />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ModifyUserInfo;
