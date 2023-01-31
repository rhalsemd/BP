import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PwdComponent({ setInfo, info, setLoginInfo }) {
  const navigation = useNavigate();

  const obj = localStorage.getItem("login-token");

  const getLogin = (e) => {
    e.preventDefault();

    if (info.id && info.pwd) {
      setLoginInfo({
        id: info.id,
        pwd: info.pwd,
      });
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  const pwdTyping = (e) => {
    const inputValue = e.target.value;

    setInfo((info) => {
      return { ...info, pwd: inputValue };
    });
  };

  useEffect(() => {
    if (obj) {
      navigation("/");
    }
  }, [obj, navigation]);

  return (
    <form onSubmit={getLogin}>
      <label htmlFor="password">PASSWORD : </label>
      <input
        type="password"
        id="password"
        autoComplete="off"
        placeholder="비밀번호"
        onChange={pwdTyping}
      />

      {/* 로그인 버튼 */}
      <div>
        <input type="submit" onClick={getLogin} value="로그인" />
      </div>
    </form>
  );
}

export default PwdComponent;
