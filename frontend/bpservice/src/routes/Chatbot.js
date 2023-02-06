import React from "react";

import { ChatBotComponent } from "react-chatbot-with-text-and-speech";
import "react-chatbot-with-text-and-speech/dist/index.css";
import { useSelector } from "react-redux";

const Chatbot = () => {
  const { data } = useSelector(({ chatbot }) => chatbot);

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
        text:
          "1. 우산을 대여하는 방법 &nbsp 2. 우산을 반납하는 방법 &nbsp 3. 관리자 문의",
      };
    }
  };
  return (
    <>
      <div style={{ height: "100%", width: "97vw" }}>
        <ChatBotComponent options={options} handleMessage={handleMessage} />
      </div>
    </>
  );
};
export default Chatbot;
