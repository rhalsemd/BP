import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest, select } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_REVENUE_TREND = "revenueTrend/GET_TOTAL_KIOSK";
const GET_REVENUE_TREND_SUCCESE = "revenueTrend/GET_TOTAL_KIOSK_SUCCESE";
const GET_REVENUE_TREND_FAILURE = "revenueTrend/GET_TOTAL_KIOSK_FAILURE";

const GET_REVENUE_TREND_MONTH = "revenueTrend/GET_TOTAL_KIOSK_MONTH";
const GET_REVENUE_TREND_MONTH_SUCCESE =
  "revenueTrend/GET_TOTAL_KIOSK_MONTH_SUCCESE";
const GET_REVENUE_TREND_MONTH_FAILURE =
  "revenueTrend/GET_TOTAL_KIOSK_MONTH_FAILURE";

export const getRevenueTrend = createAction(
  GET_REVENUE_TREND,
  (revenueTrend) => revenueTrend
);

export const getRevenueTrendSuccese = createAction(
  GET_REVENUE_TREND_SUCCESE,
  (revenueTrend) => revenueTrend
);

export const getRevenueTrendFailure = createAction(
  GET_REVENUE_TREND_FAILURE,
  (revenueTrend) => revenueTrend
);

export const getRevenueTrendMonth = createAction(
  GET_REVENUE_TREND_MONTH,
  (revenueTrend) => revenueTrend
);
export const getRevenueTrendMonthSuccese = createAction(
  GET_REVENUE_TREND_MONTH_SUCCESE,
  (revenueTrend) => revenueTrend
);
export const getRevenueTrendMonthFailure = createAction(
  GET_REVENUE_TREND_MONTH_FAILURE,
  (revenueTrend) => revenueTrend
);

const initalData = [];

const revenueTrendReducer = handleActions(
  {
    [GET_REVENUE_TREND]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_REVENUE_TREND_SUCCESE]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_REVENUE_TREND_FAILURE]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_REVENUE_TREND_MONTH]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_REVENUE_TREND_MONTH_SUCCESE]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_REVENUE_TREND_MONTH_FAILURE]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
  initalData
);

export default revenueTrendReducer;

export function* revenueTrendSaga() {
  console.log("revenueTrend사가");
  yield takeLatest(GET_REVENUE_TREND, axiosTotalKioskSaga);
}

export function* revenueTrendMonthSaga() {
  console.log("revenueTrendMonth사가");
  yield takeLatest(GET_REVENUE_TREND_MONTH, axiosTotalKioskMonthSaga);
}

function* axiosTotalKioskSaga() {
  const { data } = yield select((state) => state.revenueTrendReducer);
  console.log("saga인자로 받음", data);
  try {
    const getData = yield call(() => api.getRevenueTrend(data));
    console.log("키오스크 라인그래프 수익추이(day)", getData);
    yield put({
      type: GET_REVENUE_TREND_SUCCESE,
      payload: getData.data,
    });
  } catch (e) {
    console.log("키오스크 라인그래프 수익추이 가져오기 실패", e);
    yield put({
      type: GET_REVENUE_TREND_FAILURE,
      payload: e,
      error: true,
    });
  }
}

function* axiosTotalKioskMonthSaga() {
  const { data } = yield select((state) => state.getRevenueTrend);
  console.log("리베뉴 트렌드 달별로 가져오는 사가", data);
  try {
    const getData = yield call(() => api.getRevenueTrendMonth);
    console.log("키오스크 라인그래프 수익추이(momnth)", getData);
    yield put({
      type: GET_REVENUE_TREND_MONTH_SUCCESE,
      payload: getData.data,
    });
  } catch (e) {
    console.log("키오스크 라인그래프 수익추이 가져오기 실패", e);
    yield put({
      type: GET_REVENUE_TREND_MONTH_FAILURE,
      payload: e,
      error: true,
    });
  }
}
