/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Footer() {
  const outerBox = css`
    text-align: center;
    width: 100%;
    height: 18vh;
  `;
  const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #28323c;
    color: #67707e;
    line-height: 0;
    font-size: 12px;
    p {
      height: 3vh;
      display: block;
      margin: 0;
    }
  `;

  return (
    <div css={outerBox}>
      <div css={container}>
        <p>이용약관 / 개인정보처리방침</p>
        <p>책임의 한계와 법적고지 / 회원정보 고객센터</p>
        <p>문의전화 : 010-9400-0438</p>
        <p>@ BP CORP</p>
      </div>
    </div>
  );
}

export default Footer;
