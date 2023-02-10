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
  const txt = "절차는 간단해요";
  const textArea = useRef();
  const [Text, setText] = useState("");
  const [Count, setCount] = useState(0);

  useEffect(() => {
    if (!textArea) return;

    gsap.to(".section6-text", {
      duration: 2,
      scrollTrigger: {
        trigger: ".section6-text",
        start: "50vh 60%",
        end: "70vh 60%",
        markers: true,
      },
    });
    const interval = setInterval(() => {
      setText(Text + txt[Count]);
      setCount(Count + 1);
    }, 100);
    if (Count === txt.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });
  return (
    <div css={container} className="section6-text" ref={textArea}>
      <p>{Text}</p>
    </div>
  );
}

export default HomeSection6;
