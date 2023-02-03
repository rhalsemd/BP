import { Bootpay } from "@bootpay/backend-js";
import { call } from "redux-saga/effects";
import axios from "axios";

// const url = "http://192.168.100.176:8080";
const url = "http://192.168.100.79:8080";

// bootpay로 받은 데이터 DB로 전송
export function* getBootpayFnc(data) {
  const DATA = data.payload;
  console.log(data);
  console.log(DATA);
  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${url}/api/auth/brolly/rent`,
        data: {
          receiptId: DATA.receipt_id,
          price: DATA.price,
          regDt: DATA.purchased_at,
          userId: "test111", /// 임시값
          caseId: "1", ///임시값
          // "결제 상태": "받아야 함",
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
