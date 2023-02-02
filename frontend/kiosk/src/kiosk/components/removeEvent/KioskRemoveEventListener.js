/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const RemoveEventListenerDiv = css`
  width: 150px;
  height: 100%;

  position: absolute;
  left: 38%;

  z-index: 2;
`

const KioskRemoveEventListener = () => {
  return (
    <div css={RemoveEventListenerDiv}>
    </div>
  )
}

export default KioskRemoveEventListener;