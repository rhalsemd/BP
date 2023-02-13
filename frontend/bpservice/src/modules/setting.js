import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getAllKiosks,
  getKioskOpenAxios,
  getKioskCloseAxios,
} from "../lib/api";

const GET_ALL_KIOSK = "setting/GET_ALL_KIOSK";
const GET_ALL_KIOSK_SUCCESS = "setting/GET_ALL_KIOSK_SUCCESS";

const GET_KIOSK_OPEN = "setting/GET_KIOSK_OPEN";
const GET_KIOSK_CLOSE = "setting/GET_KIOSK_CLOSE";

export const getAllKiosk = createAction(GET_ALL_KIOSK);
export const getKioskOpen = createAction(GET_KIOSK_OPEN, (id) => id);
export const getKioskClose = createAction(GET_KIOSK_CLOSE, (id) => id);

const initialData = {
  kiosks: null,
};
const getAllKioskReducer = handleActions(
  {
    [GET_ALL_KIOSK_SUCCESS]: (state, action) => ({
      ...state,
      kiosks: action.payload,
    }),
  },
  initialData
);
export default getAllKioskReducer;

export function* getAllKioskSaga() {
  yield takeLatest(GET_ALL_KIOSK, axiosGetAllKiosk);
  yield takeEvery(GET_KIOSK_OPEN, axiosGetKioskOpen);
  yield takeEvery(GET_KIOSK_CLOSE, axiosGetKioskClose);
}

function* axiosGetKioskOpen(id) {
  try {
    yield call(() => getKioskOpenAxios(id.payload));
  } catch (e) {
    console.log("키오스크 열기 실패", e);
  }
}

function* axiosGetKioskClose(id) {
  try {
    yield call(() => getKioskCloseAxios(id.payload));
  } catch (e) {
    console.log("키오스크 닫기 실패", e);
  }
}

function* axiosGetAllKiosk() {
  try {
    const kiosks = yield call(() => getAllKiosks());
    yield put({
      type: GET_ALL_KIOSK_SUCCESS,
      payload: kiosks.data,
    });
  } catch (e) {
    console.log("키오스크 목록 가져오기 실패", e);
  }
}
