/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";

const page_404 = css`
  padding: 40px 0;
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

// 			 .link_404{
//   color: #fff!important;
//   padding: 10px 20px;
//   background: #39ac31;
//   margin: 20px 0;
//   display: inline - block;
// }


const KioskFixingContainer = () => {
  return (
    <div>
      <section css={page_404}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1 text-center">
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
  )
}

export default KioskFixingContainer;