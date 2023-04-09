import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_USEAGE = "histogram/GET_USEAGE";
const GET_USEAGE_SUCCESS = "histogram/GET_USEAGE_SUCCESS";
const GET_USEAGE_FAILURE = "histogram/GET_USEAGE_FAILURE";

const GET_USEAGE_MONTH = "histogram/GET_USEAGE_MONTH";
const GET_USEAGE_MONTH_SUCCESS = "histogram/GET_USEAGE_MONTH_SUCCESS";
const GET_USEAGE_MONTH_FAILURE = "histogram/GET_USEAGE_MONTH_FAILURE";

const SELECT_DATE = "histogram/SELECT_DATE";

export const getUseage = createAction(GET_USEAGE, (useageData) => useageData);
export const getUseageMonth = createAction(
  GET_USEAGE_MONTH,
  (useageData) => useageData
);

export const selectDate = createAction(SELECT_DATE, (selectDate) => selectDate);
const initalData = {
  selectDate: null,
};

const getUseageReducer = handleActions(
  {
    [GET_USEAGE_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_USEAGE_FAILURE]: (state, action) => ({
      data: undefined,
    }),
    [GET_USEAGE_MONTH_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_USEAGE_MONTH_FAILURE]: (state, action) => ({
      data: undefined,
    }),
    [SELECT_DATE]: (state, action) => ({
      ...state,
      selectDate: action.payload,
    }),
  },
  initalData
);

export default getUseageReducer;

export function* getUseageSaga() {
  yield takeLatest(GET_USEAGE, axiosUseageSaga);
}

export function* getUseageMonthSaga() {
  yield takeLatest(GET_USEAGE_MONTH, axiosUseageMonthSaga);
}

function* axiosUseageSaga({ payload }) {
  try {
    const dataGet = yield call(() => api.getUseageRevenu(payload));
    yield put({
      type: GET_USEAGE_SUCCESS,
      payload: dataGet.data,
    });
    yield put({
      type: SELECT_DATE,
      payload,
    });
  } catch (e) {
    console.log("useageSaga Error", e);
    yield put({
      type: GET_USEAGE_FAILURE,
      payload: e,
      error: true,
    });
  }
}

function* axiosUseageMonthSaga({ payload }) {
  try {
    const dataGet = yield call(() => api.getUseageRevenuMonth(payload));
    yield put({
      type: GET_USEAGE_MONTH_SUCCESS,
      payload: dataGet.data,
    });
    yield put({
      type: SELECT_DATE,
      payload,
    });
  } catch (e) {
    yield put({
      type: GET_USEAGE_MONTH_FAILURE,
      payload: e,
      error: true,
    });
  }
}
