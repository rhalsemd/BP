/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const KioskGoBack = css`
  margin-right: 2vw;
  margin-bottom: 2vw;

  width: 100px;
  height: 30px;
`

const KioskGoBackBtn = () => {
  // Home 화면일 때는 버튼이 사라지게 함.
  if (window.location.pathname === '/') return null;
  return (
    <button css={KioskGoBack}>
      뒤로가기
    </button>
  )
}

export default KioskGoBackBtn;