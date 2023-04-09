import { useState, useEffect } from "react";

export default function Timer({ setInfo, inputRef, setFindIdInfoReset }) {
  // 타이머
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    if (minutes === 0 && seconds === 0) {
      setMinutes(5);
      setSeconds(0);
      setInfo((info) => {
        return { ...info, isSend: false };
      });
      inputRef.current.value = "";
      setFindIdInfoReset();
    }
    return () => clearInterval(countdown);
  }, [
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    inputRef,
    setFindIdInfoReset,
    setInfo,
  ]);

  return (
    <>
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </>
  );
}
