/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import homeIntro2 from "../../style/homeIntro2.png";
import { gsap } from "gsap/all";

const outerBox = css`
  text-align: center;
  height: 92vh;
  background-color: #f9fafb;
  .centerRightWing {
    color: blue;
  }
  svg {
    margin: 7vh 0 20vh 0;
  }
  img {
    margin: 10vh 0 0 0;
    width: 160px;
    height: auto;
  }
`;

const arrowStyle = css`
  width: 15vw;
  height: 15vw;
  background-color: #f9fafb;
  translate: transformY(-10px);
  opacity: 0;
`;

function HomeLogo() {
  const [rightWingCss, setRightWingCss] = useState();
  const [leftWingCss, setLeftWingCss] = useState();
  const [centerWingCss, setCenterWingCss] = useState();
  const [headCss, setHeadCss] = useState();
  const [jiPangECss, setJiPangECss] = useState();

  const rightWing = useRef();
  const leftWing = useRef();
  const centerWing = useRef();
  const head = useRef();
  const jiPangE = useRef();
  const arrow = useRef();

  useEffect(() => {
    if (!rightWing || !leftWing || !jiPangE) return;
    const rwLength = rightWing.current.getTotalLength();
    const lwLength = leftWing.current.getTotalLength();
    const cwLength = centerWing.current.getTotalLength();
    const headLength = head.current.getTotalLength();
    const jipLength = jiPangE.current.getTotalLength();

    setRightWingCss(css`
      stroke: black;
      stroke-dasharray: ${rwLength};
      stroke-dashoffset: ${rwLength};
      animation: path 2s linear forwards;
      fill: none;
      stroke-width: 10px;
      z-index: 100;
      @keyframes path {
        50% {
          stroke-dashoffset: ${-rwLength / 5.827};
          fill: white;
        }
        100% {
          fill: #202a45;
          stroke: black;
        }
      }
    `);
    setLeftWingCss(css`
      stroke: black;
      stroke-dasharray: ${lwLength};
      stroke-dashoffset: ${lwLength};
      animation: path1 2s linear forwards;
      stroke-width: 10px;
      fill: white;

      @keyframes path1 {
        50% {
          stroke-dashoffset: ${-lwLength / 5.068};
          fill: white;
        }
        100% {
          fill: #202a45;
          stroke: black;
        }
      }
    `);

    setCenterWingCss(css`
      stroke: black;
      stroke-dasharray: ${cwLength};
      stroke-dashoffset: ${cwLength};
      animation: path2 2s linear forwards;
      animation-delay: 0.5s;
      fill: none;
      stroke-width: 10px;

      @keyframes path2 {
        50% {
          stroke-dashoffset: 0;
          fill: white;
        }
        100% {
          fill: #202a45;
          stroke: black;
        }
      }
    `);

    setHeadCss(css`
      stroke: black;
      stroke-dasharray: ${headLength};
      stroke-dashoffset: ${headLength};
      animation: path3 1s linear forwards;
      animation-delay: 1s;
      stroke-width: 10px;
      fill: none;

      @keyframes path3 {
        50% {
          stroke-dashoffset: 0;
          fill: white;
        }
        100% {
          fill: black;
          stroke: black;
        }
      }
    `);
    setJiPangECss(css`
      stroke: black;
      stroke-dasharray: ${jipLength};
      stroke-dashoffset: ${jipLength};
      animation: path4 1s linear forwards;
      animation-delay: 0.5s;
      fill: none;
      stroke-width: 10px;

      @keyframes path4 {
        50% {
          stroke-dashoffset: 0;
        }
        75% {
          fill: white;
        }
        100% {
          fill: black;
          stroke: yellow;
        }
      }
    `);
    ///////////////////////////////////////

    gsap.to(arrow.current, {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      opacity: 1,
    });
  }, [rightWing]);

  return (
    <>
      <div css={outerBox}>
        <img src={homeIntro2} className="logo" alt="logo" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 921.111 546.274">
          <path
            ref={jiPangE}
            css={jiPangECss}
            className="cls-1"
            d="M481.753,479.861c-2.183-1.126-4.465-2.247-6.784-3.333l-1.307-.612-127.391,247a51.023,51.023,0,1,1-90.7-46.776l10-19.383-16-8.249-10,19.383a69.021,69.021,0,1,0,122.685,63.275l127.392-247-1.257-.71C486.172,482.2,483.936,480.987,481.753,479.861Z"
            transform="translate(5.502 -226.269)"
          />
          <path
            css={centerWingCss}
            ref={centerWing}
            d="M616.689,378.563c-.589-35.64-9.938-70.828-27.787-104.586l-.489-.923-1.035.137c-37.852,5.029-71.942,17.813-101.323,38-23.513,16.153-44.072,37.05-61.105,62.111a279.152,279.152,0,0,0-29.941,57.935,201.983,201.983,0,0,0-7.957,25.587l-.727,3.319,2.942-1.7c9.358-5.4,23.862-7.154,40.84-4.925,17.723,2.327,37.008,8.671,55.771,18.348s35.113,21.712,47.284,34.8c11.66,12.541,18.644,25.372,19.665,36.13l.322,3.386,2.283-2.521a202.742,202.742,0,0,0,16.232-21.316,279.067,279.067,0,0,0,29.845-57.985C612.053,435.951,617.16,407.085,616.689,378.563Z"
            transform="translate(5.502 -226.269)"
          />
          <rect
            className="head"
            ref={head}
            css={headCss}
            x="581.479"
            y="242.724"
            width="35.871"
            height="17.998"
            transform="translate(106.439 442.805) rotate(-62.718)"
          />
          <path
            css={leftWingCss}
            ref={leftWing}
            d="M-5.5,370.63H211.425l.126-.057,3.27,1.686.746-.538c8.815-6.352,23.367-8.768,40.977-6.8,18.348,2.048,38.439,8.49,58.1,18.631,27.032,13.942,49.587,33.427,60.334,52.124l1.674,2.912,1.051-3.19c1.1-3.332,2.29-6.72,3.547-10.071a288.3,288.3,0,0,1,30.924-59.834c17.666-25.991,39.014-47.681,63.452-64.47,25.928-17.811,55.486-30.128,87.853-36.61l4.8-.961-4.517-1.893c-120.388-50.444-264.78-6.2-351.135,107.594l-1.079,1.422"
            transform="translate(5.502 -226.269)"
          />
          <path
            css={rightWingCss}
            ref={rightWing}
            d="M915.608,636.551H733.168l.382-1.7c42.649-136.335-5.017-279.633-115.917-348.476l-4.16-2.582,2,4.469c13.485,30.131,20.586,61.356,21.1,92.806.49,29.645-4.806,59.615-15.739,89.077a288.286,288.286,0,0,1-30.822,59.887c-2.006,2.973-4.075,5.91-6.149,8.729l-1.991,2.706,3.344-.324c21.465-2.084,50.418,5,77.45,18.937,19.662,10.141,36.559,22.775,48.866,36.538,11.811,13.208,18.28,26.465,18.215,37.331l0,.919,3.269,1.687"
            transform="translate(5.502 -226.269)"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid meet"
          css={arrowStyle}
          ref={arrow}
        >
          <defs>
            <clipPath id="__lottie_element_167">
              <rect width="200" height="200" x="0" y="0"></rect>
            </clipPath>
          </defs>
          <g
            transform="matrix(0.31222081184387207,0,0,0.31222081184387207,11.485397338867188,91.41468048095703)"
            opacity="0.5"
            css={{ display: "block" }}
          >
            <path
              fill="black"
              fillOpacity="1"
              d=" M283.4639892578125,274.375 C273.343994140625,274.375 263.2250061035156,272.17498779296875 253.79800415039062,267.7760009765625 C253.79800415039062,267.7760009765625 16.750999450683594,157.16299438476562 16.750999450683594,157.16299438476562 C4.238999843597412,151.32400512695312 -1.1710000038146973,136.447998046875 4.668000221252441,123.93599700927734 C10.505999565124512,111.42400360107422 25.381999969482422,106.01499938964844 37.89400100708008,111.85399627685547 C37.89400100708008,111.85399627685547 274.9410095214844,222.46600341796875 274.9410095214844,222.46600341796875 C280.3580017089844,224.9929962158203 286.5710144042969,224.99200439453125 291.98699951171875,222.46600341796875 C291.98699951171875,222.46600341796875 529.0349731445312,111.85399627685547 529.0349731445312,111.85399627685547 C541.5469970703125,106.01399993896484 556.4219970703125,111.42400360107422 562.260986328125,123.93599700927734 C568.0989990234375,136.447998046875 562.6890258789062,151.32400512695312 550.177001953125,157.16299438476562 C550.177001953125,157.16299438476562 313.1300048828125,267.7760009765625 313.1300048828125,267.7760009765625 C303.7040100097656,272.17498779296875 293.5840148925781,274.375 283.4639892578125,274.375z"
            />
          </g>
        </svg>
      </div>
    </>
  );
}

export default HomeLogo;
