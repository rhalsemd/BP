/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskCompleteHomeBtn from './btncomponents/KioskCompleteHomeBtn'

const KioskLentSectionCompleteStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 80vh;
  p {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
  button {
    width: 450px;
    height: 50px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const LentCompleteSection = () => {
  return (
    <div css={KioskLentSectionCompleteStyle}>
      <p>대여가 완료되었습니다. 5번 케이스를 확인하세요.</p>
      <KioskCompleteHomeBtn/>
    </div>
  )
}

export default LentCompleteSection