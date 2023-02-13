/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import gsap from "gsap/all";

import React from "react";
import { useEffect } from "react";

import { ChatBotComponent } from "react-chatbot-with-text-and-speech";
import "react-chatbot-with-text-and-speech/dist/index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const 뒤로가기 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 80%;
  height: 35px;
  font-size: 14pt;
  margin-bottom: 10px;
  margin-left: 10%;
`;

const Chatbot = () => {
  const { data } = useSelector(({ chatbot }) => chatbot);
  const navigation = useNavigate();

  const options = {
    botImageUrl:
      "https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png",
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: "질문을 입력해주세요.",
  };
  const handleMessage = (message) => {
    let index = Number(message.data);
    if (index >= 1 && index <= 3) {
      return { text: data.answer[index - 1].text };
    } else {
      return {
        text: "1. 우산을 대여하는 방법 2. 우산을 반납하는 방법 3. 관리자 문의",
      };
    }
  };

  const back = () => {
    navigation(-1);
  };

  const cencelBtn = () => {
    gsap.from(".chatbotBtn", {
      scale: 0.9,
      duration: 0.1,
      repeat: 1,
      yoyo: true,
    });
  };

  return (
    <>
      <div style={{ height: "100%", width: "97vw" }}>
        <ChatBotComponent options={options} handleMessage={handleMessage} />
      </div>
      <button
        onClick={back}
        css={뒤로가기}
        className="chatbotBtn"
        onTouchStart={cencelBtn}
      >
        뒤로가기
      </button>
    </>
  );
};
export default Chatbot;
