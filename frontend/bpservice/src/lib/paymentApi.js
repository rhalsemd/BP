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
  const url = "http://192.168.100.176:8080";
  try {
    const post = yield call(() => {
      return axios({
        method: "get",
        url: `${url}/api/auth/user/brolly/borrow/pay/insert`,
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
