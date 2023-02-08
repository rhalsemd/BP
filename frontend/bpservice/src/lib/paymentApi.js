import { Bootpay } from "@bootpay/backend-js";
import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import { SET_CASE_INFO } from "../modules/payment";

// const url = "http://192.168.100.176:8080";
// const url = "http://192.168.100.79:8080";
const url = `http://bp.ssaverytime.kr:8080`;

// bootpay로 받은 데이터 DB로 전송
export function* getBootpayFnc(data) {
  const { DATA, kioskId } = data.payload;
  const { userId } = yield select(({ userLogin }) => userLogin);

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${url}/api/auth/brolly/rent`,
        data: {
          receiptId: DATA.receipt_id,
          price: DATA.price,
          regDt: DATA.purchased_at,
          userId: userId, /// 임시값
          caseId: kioskId, ///임시값
          // "결제 상태": "받아야 함",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    if (post.status === 200) {
      yield put({ type: SET_CASE_INFO, payload: post.data });
    }
  } catch (e) {
    console.error("백으로 부트페이 던져줌", e);
  }
}
