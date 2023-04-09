import { createAction, handleActions } from "redux-actions";

const initialState = {
  data: {
    answer: [
      {
        text: `> 대여하는 방법
        QR 코드를 카메라로 찍어주세요.
        BP에 회원가입 혹은 로그인 해주세요.
        결제를 해주세요.
        열린 우산 케이스를 확인한 뒤 가져가주세요.
        30초 뒤 뚜껑이 자동으로 닫힙니다.`,
      },
      {
        text: `> 반납하는 방법
        우산의 QR을 현재화면에 체크해주세요.
        우산 사진을 화면에 보이게 찍어주세요.
        정확하게 찍혔는지 확인버튼을 눌러주세요.
        우산 케이스가 열리면 우산을 넣어주세요.
        보증금이 환급되었는지 확인해주세요.`,
      },
      {
        text: `> 자세한 사항은 이메일을 통해 관리자에게 문의해주세요.
        관리자 : 한재용
        이메일 : ssafy8th.gumi@gmail.com`,
      },
    ],
  },
};

const chatbotReducer = handleActions({}, initialState);

export default chatbotReducer;
