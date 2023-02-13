/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const componentStyles = css`
  animation: ${fadeIn} 1s ease-in;
`;

const KioskFixingContainerStyle = css`
  background-color: #EEF1FF;
  height: 100%;
`

const page_404 = css`
  padding: 100px 0;
  background: #ffffff;
  font-family: 'Chakra Petch', sans-serif;
  img {
    width: 100%;
  }
`

const four_zero_four_bg = css`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height:400px;
  background-position: center;

  h1 {
    font-size: 80px;
    text-align: center;
    font-family: 'GangwonEduPowerExtraBoldA';
  }

  h3 {
    font-size: 80px;
  }
`

const contant_box_404 = css`
  margin-top: -50px;
`

// const text = css`
//   visibility: hidden !important;
// `

// const hovercheck = css`
//   h1 {
//     color: rebeccapurple !important;
//   }

//   &:hover .text {
//     visibility: visible !important;
//   }
// `

const KioskFixingContainer = () => {
  return (
    <div css={componentStyles}>
      <div css={KioskFixingContainerStyle}>
        <section css={page_404}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-12 col-sm-offset-1 text-center">
                  <div css={four_zero_four_bg}>
                    <h1>수리중</h1>
                  </div>
                  <div css={contant_box_404}>
                    <h3 className="h2">
                      We are doing repairs.
                    </h3>
                    <p>Please use another kiosk.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default KioskFixingContainer;