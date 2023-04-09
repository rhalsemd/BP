import { Bootpay } from "@bootpay/backend-js";
import { call, put } from "redux-saga/effects";
import axios from "axios";
import { SET_CASE_INFO, SET_COST } from "../modules/payment";

const url = `https://bp.ssaverytime.kr:8080`;

// bootpay로 받은 데이터 DB로 전송
export function* getBootpayFnc(data) {
  const { DATA, kioskId } = data.payload;

  const objString = localStorage.getItem("login-token");
  const obj = JSON.parse(objString);

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${url}/api/auth/brolly/rent`,
        data: {
          receiptId: DATA.receipt_id,
          price: DATA.price,
          regDt: DATA.purchased_at,
          userId: obj.userId,
          caseId: kioskId,
          // "결제 상태": "받아야 함",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.value}`,
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

export function* getCostFnc() {
  const objString = localStorage.getItem("login-token");
  const obj = JSON.parse(objString);
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${url}/api/auth/brolly/price`,
        headers: {
          Authorization: `Bearer ${obj.value}`,
        },
      });
    });

    if (get.status === 200) {
      yield put({ type: SET_COST, payload: get.data.price });
    }
  } catch (e) {}
}
