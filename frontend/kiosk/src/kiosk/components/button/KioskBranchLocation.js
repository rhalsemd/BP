/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const homeButtonDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
  border: 1px solid purple;
  background-color: white;
  margin-right: 5%;

  & > div {
    color: purple !important;
    font-size: 21px;
    font-weight: 900;
  }
`

const KioskBranchLocation = ({id, name}) => {
  const navigate = useNavigate();
  
  const serviceStart = () => {
    navigate(`/kiosk/${id}`)
  }

  return (
      <div css={homeButtonDiv}>
        <div onClick={serviceStart}>{name}</div>
      </div>
  )
}

export default KioskBranchLocation