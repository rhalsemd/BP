/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/all";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: white;
  font-weight: 900;
  font-size: 2rem;
  background: linear-gradient(#f9fafb, black);
`;

function HomeSection6() {
  const innerText = "절차는 간단해요";
  const textArea = useRef();
  const [text, setText] = useState("");
  const count = useRef(0);

  let interval = useRef(null);
  useEffect(() => {
    if (!textArea) return;

    let intervalId;

    interval.current = () => {
      intervalId = setInterval(() => {
        if (count.current === innerText.length) {
          clearInterval(intervalId);
          return;
        }
        setText(text + innerText[count.current]);
        count.current += 1;
      }, 50);
    };

    gsap.to(".section6-text", {
      duration: 2,
      scrollTrigger: {
        trigger: ".section6-text",
        onEnter: () => interval.current(),
        start: "200 60%",
        end: () => "+=500",
        // markers: true,
      },
    });

    return () => clearInterval(intervalId);
  });
  return (
    <div css={container} className="section6-text" ref={textArea}>
      <p>{text}</p>
    </div>
  );
}

export default HomeSection6;
