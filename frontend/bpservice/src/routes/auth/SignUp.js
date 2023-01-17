/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import React, { useState } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const loginArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const loginModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loginModal = css`
  width: 35vh;
  height: 70vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    rePwd: false,
    userName: "",
    phone: "",
    certificationNumber: "",
    sido: "",
    isSido: false,
    gu: "",
    isGu: false,
    dong: "",
    email: "",
  });

  const city = [
    "Seoul",
    "Busan",
    "Incheon",
    "Daegu",
    "Daejeon",
    "Gwangju",
    "Ulsan",
    "Sejong",
    "Jeju",
    "Gyeonggi-do",
    "Gangwon-do",
    "Chungcheongbuk-do",
    "Chungcheongnam-do",
    "Jeollabuk-do",
    "Jeollanam-do",
    "Gyeongsangbuk-do",
    "Gyeongsangnam-do",
  ];
  const idRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\A-Zㄱ-ㅎ]/g;
  const pwDregExp = /[;'":<>`~.+?{}()|[\]\\A-Z]/g;
  const nameRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\a-zA-Z]/g;

  // 아이디 입력
  const idTyping = (e) => {
    const idInput = e.target.value;
    setUserInfo((current) => {
      current.id = idInput;
      return { ...current };
    });
  };

  // 비밀번호 입력
  const pwdTyping = (e) => {
    const pwdInput = e.target.value;
    setUserInfo((current) => {
      current.pwd = pwdInput;
      return { ...current };
    });
  };

  // 비밀번호 확인
  const rePwdTyping = (e) => {
    if (e.target.value !== userInfo.pwd && userInfo.pwd) {
      setUserInfo((current) => {
        current.rePwd = true;
        return { ...current };
      });
    }
    if (e.target.value === "" || e.target.value === userInfo.pwd) {
      setUserInfo((current) => {
        current.rePwd = false;
        return { ...current };
      });
    }
  };

  // 이름 입력
  const nameTyping = (e) => {
    const nameInput = e.target.value;
    setUserInfo((current) => {
      current.userName = nameInput;
      return { ...current };
    });
  };

  // 전화번호 입력
  const phoneTyping = (e) => {
    const phoneInput = e.target.value;
    setUserInfo((current) => {
      current.phone = phoneInput;
      return { ...current };
    });
  };

  // 인증 번호 받기
  const getCertification = () => {
    if (userInfo.phone === "") {
      alert("-를 빼고 입력해주세요.");
    } else {
      console.log("naver API 보내기");
    }
  };

  // 인증 번호 입력
  const certificationTyping = (e) => {
    const certificationInput = e.target.value;
    setUserInfo((current) => {
      current.certificationNumber = certificationInput;
      return { ...current };
    });
  };

  // 인증 번호 확인
  const getConfirm = () => {
    console.log("인증번호 확인");
  };

  // 시 / 도 입력
  const sidoTyping = (e) => {
    const sidoInput = e.target.value;
    if (sidoInput !== "sido") {
      setUserInfo((current) => {
        current.sido = sidoInput;
        current.isSido = true;
        return { ...current };
      });
    }
  };

  console.log(userInfo);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={loginArea}>
        <div css={loginModalPosition}>
          <div css={loginModal}>
            <div css={title}>
              <h1>sign up</h1>

              {/* 아이디 */}
              <div>
                <div>
                  <label htmlFor="userId">ID : </label>
                  <input
                    type="text"
                    id="userId"
                    placeholder="아이디"
                    autoComplete="off"
                    value={userInfo.id}
                    onChange={idTyping}
                  />
                </div>
                {/* 아이디 조건 */}
                {userInfo.id.match(idRegExp) ? (
                  <div>
                    <span style={{ color: "red" }}>uncomplete : </span>
                    <span>영어 소문자 / 숫자만 가능합니다.</span>
                  </div>
                ) : (userInfo.id.length >= 8 && userInfo.id.length <= 20) ||
                  userInfo.id.length === 0 ? null : (
                  <div>
                    <span style={{ color: "red" }}>uncomplete : </span>
                    <span>8~20로 아이디를 설정해주세요</span>
                  </div>
                )}
              </div>

              {/* 비밀번호 */}
              <div>
                <div>
                  <label htmlFor="password1">PASSWORD1 : </label>
                  <input
                    type="password"
                    id="password1"
                    placeholder="비밀번호"
                    onChange={pwdTyping}
                  />
                </div>

                {/* 비밀번호 조건 */}
                {userInfo.pwd.match(pwDregExp) ? (
                  <div>
                    <span style={{ color: "red" }}>uncomplete : </span>
                    <span>영어 소문자/숫자/!@#$%^&*만 가능합니다.</span>
                  </div>
                ) : (userInfo.pwd.length >= 8 && userInfo.pwd.length <= 20) ||
                  userInfo.pwd.length === 0 ? null : (
                  <div>
                    <span style={{ color: "red" }}>uncomplete : </span>
                    <span>8~20로 비밀번호를 설정해주세요</span>
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <div>
                  <label htmlFor="password2">PASSWORD2 : </label>
                  <input
                    type="password"
                    id="password2"
                    placeholder="비밀번호"
                    onChange={rePwdTyping}
                  />
                </div>
                {userInfo.rePwd ? (
                  <div>
                    <span style={{ color: "red" }}>
                      비밀번호를 확인해주세요.
                    </span>
                  </div>
                ) : null}
              </div>

              {/* 이름 */}
              <div>
                <div>
                  <label htmlFor="userName">Name : </label>
                  <input
                    type="text"
                    id="userName"
                    placeholder="이름"
                    onChange={nameTyping}
                    value={userInfo.userName}
                  />
                </div>
                {!userInfo.userName.match(nameRegExp) ||
                userInfo.userName.length === 0 ? null : (
                  <div>
                    <span style={{ color: "red" }}>한글만 입력해주세요.</span>
                  </div>
                )}
              </div>

              {/* 전화번호 / 인증 번호*/}
              <div>
                {/* 전화번호 */}
                <div>
                  <label htmlFor="phone">phone : </label>
                  <input
                    type="number"
                    id="phone"
                    placeholder="-를 빼고 입력해주세요."
                    onChange={phoneTyping}
                  />

                  {/* 인증 받기 버튼*/}
                  <button onClick={getCertification}>인증 받기</button>

                  {/* 인증 번호 입력 */}
                  <input
                    type="number"
                    id="phone"
                    placeholder="인증번호 입력"
                    onChange={certificationTyping}
                  />
                  <button onClick={getConfirm}>확인</button>
                </div>
              </div>

              {/* 주소 */}
              <span>주소</span>
              <div>
                {/* 시 */}
                <select onClick={sidoTyping} defaultValue="sido">
                  <option disabled key="sido" value="sido">
                    시 / 도
                  </option>
                  <option key={city[0]} value={city[0]}>
                    서울특별시
                  </option>
                  <option key={city[1]} value={city[1]}>
                    부산광역시
                  </option>
                  <option key={city[2]} value={city[2]}>
                    인천광역시
                  </option>
                  <option key={city[3]} value={city[3]}>
                    대구광역시
                  </option>
                  <option key={city[4]} value={city[4]}>
                    대전광역시
                  </option>
                  <option key={city[5]} value={city[5]}>
                    광주광역시
                  </option>
                  <option key={city[6]} value={city[6]}>
                    울산광역시
                  </option>
                  <option key={city[7]} value={city[7]}>
                    세종특별자치시
                  </option>
                  <option key={city[8]} value={city[8]}>
                    제주특별자치도
                  </option>
                  <option key={city[9]} value={city[9]}>
                    경기도
                  </option>
                  <option key={city[10]} value={city[10]}>
                    강원도
                  </option>
                  <option key={city[11]} value={city[11]}>
                    충청북도
                  </option>
                  <option key={city[12]} value={city[12]}>
                    충청남도
                  </option>
                  <option key={city[13]} value={city[13]}>
                    전라북도
                  </option>
                  <option key={city[14]} value={city[14]}>
                    전라남도
                  </option>
                  <option key={city[15]} value={city[15]}>
                    경상북도
                  </option>
                  <option key={city[16]} value={city[16]}>
                    경상남도
                  </option>
                </select>

                {/* 구 */}
                {userInfo.isSido ? (
                  <select>
                    <option>1</option>
                  </select>
                ) : null}
                {/* 동 */}
                {userInfo.isGu ? (
                  <select>
                    <option>1</option>
                  </select>
                ) : null}
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email">Email : </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  pattern=".+@globex\.com"
                  size="30"
                  required
                  placeholder="이메일@EXAMPLE.COM"
                />
              </div>

              {/* 회원가입 버튼 */}
              <div>
                <button>확인</button>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default SignUp;
