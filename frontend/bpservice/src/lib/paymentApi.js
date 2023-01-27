import { Bootpay } from "@bootpay/backend-js";
import { RestClient } from "@bootpay/server-rest-client";
import { call, put, fork } from "redux-saga/effects";
import axios from "axios";

Bootpay.setConfiguration({
  application_id: "[ REST API용 Application ID ]",
  private_key: "[ Private KEy ]",
});

// bootpay로 받은 데이터 DB로 전송
export function* getBootpayFnc(data) {
  const DATA = data.payload;
  const API = `REST API`;
  try {
    const post = yield call(() => {
      return axios({
        method: "get",
        url: API,
        data: {
          recipt_id: DATA.receipt_id,
          price: DATA.price,
          REG_DT: DATA.purchased_at,
          loginId: "받아야 함",
          "키오스크 정보": "받아야 함",
          "결제 상태": "받아야 함",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    console.log(post);
  } catch (e) {
    console.error("백으로 부트페이 던져줌", e);
  }
}

export function* cencleBootpayFnc() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
      });
    });
    const cencleData = get.data;
    const API2 = `https://jsonplaceholder.typicode.com/todos/1`;
    console.log("토큰발급 요청");
    yield call(async () => {
      RestClient.setConfig(
        "63d0816b3049c8001a5dc07e",
        "k1GLuWvFaq459mP5og5eOQkUFn1lbXFMVqrt9FFWFn8="
      );
      console.log("일단 셋컨피규레이샨 됨");
      // let token = await Bootpay.getAccessToken();
      console.log("토큰발급됨");
      RestClient.getAccessToken().then(function (token) {
        if (token.status === 200) {
          RestClient.cancel({
            receiptId: "63d3521ad01c7e00204dc451",
          }).then(function (response) {
            // 결제 취소가 완료되었다면
            if (response.status === 200) {
              // TODO: 결제 취소에 관련된 로직을 수행하시면 됩니다.
            }
          });
        }
      });
      // if (token.status === 200) {
      //   let response;
      //   try {
      //     response = await Bootpay.cancel({
      //       receipt_id: "63d3521ad01c7e00204dc451",
      //     });
      //     console.log("결제취소 완료", response);
      //     await axios({
      //       method: "put",
      //       url: API2,
      //     }).then((r) => console.log(r));
      //   } catch (e) {
      //     // 발급 실패시 오류
      //     console.log(e);
      //   }
      // }
    });
  } catch (e) {
    console.error("결제 취소 에러", e);
  }
}
