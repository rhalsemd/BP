/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const KioskFooterStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: end;
  border: 1px solid black;
  height: 20vh;
`

const KioskCompanyInfo = css`
  margin-left: 2vw;
  margin-bottom: 1vw;

  width: 75vw;
`

const KioskGoBack = css`
  margin-right: 2vw;
  margin-bottom: 2vw;

  width: 100px;
  height: 30px;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.s

const HomeFooter = () => {
  return (
    <div css={KioskFooterStyle}>
      <pre css={KioskCompanyInfo}>
        <p>고객센터 : 010-1234-5678</p>
        <p>보안 책임자: 김태헌, 이주형, 한재용, 한상우, 정명관, 한승준</p>
        <p>행복한 이용 되세요 ㅎㅅㅎ</p>
      </pre>
      <button css={KioskGoBack}>
        뒤로가기
      </button>
    </div>
  )
}

export default HomeFooter;