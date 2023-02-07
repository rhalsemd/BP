/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAdminLogin } from "../../modules/loginAdmin";
const loginModalStyle = css`
  height: 40vh;
  width: 90vw;
  margin: 15vh 5vw 19vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), 0 10px 10px rgba(0, 0, 0, 0.52);
  }
  input::placeholder {
    color: transparent;
  }
  input:placeholder-shown + label {
    color: "black";
    font-size: 14.5pt;
    font-weight: 300;
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

const BtnStyle = css`
  background-color: #00b8ff;
`;

const inputBox = css`
  position: relative;
  margin: 12px 0;
`;

const inputChild = css`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 23px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
`;

const 회원가입버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 45px;
  font-size: 14pt;
  margin-top: 15px;
`;

export default function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const 로그인 = useSelector((state) => state.loginAdminReucer.success);

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const 어드민로그인 = (e) => {
    e.preventDefault();
    dispatch(postAdminLogin({ id, pwd }));
  };

  useEffect(() => {
    if (로그인) navigate("/admin/total-income");
  }, [로그인]);

  return (
    <div css={loginModalStyle}>
      <h1 css={{ color: "#646e7b" }}>ADMIN</h1>
      <form action="" method="POST">
        <div css={inputBox}>
          <input
            onChange={(e) => setId(e.target.value)}
            css={inputChild}
            id="username"
            type="text"
            name="username"
            placeholder="아이디"
          />
          <label>아이디</label>
        </div>

        <div css={inputBox}>
          <input
            css={inputChild}
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={(e) => setPwd(e.target.value)}
          />
          <label>비밀번호</label>
        </div>
        <button onClick={(e) => 어드민로그인(e)} css={회원가입버튼}>
          <span css={{ fontWeight: "bolder" }}>로그인</span>
        </button>
      </form>
    </div>
  );
}
