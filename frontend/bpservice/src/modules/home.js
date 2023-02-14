import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";

const GET_WHETHER_DATA = "home/GET_WHETHER_DATA";
const SET_WHETHER_DATA = "home/SET_WHETHER_DATA";

export const getWhetherData = createAction(GET_WHETHER_DATA, (data) => data);

const API = `https://bp.ssaverytime.kr:8080`;

function* getWhetherDataFnc(data) {
  const { latitude, longitude } = data.payload;

  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/weather/current-weather`,
        params: {
          lat: latitude,
          lng: longitude,
        },
      });
    });

    if (get.status === 200) {
      yield put({ type: SET_WHETHER_DATA, payload: get.data });
    }
  } catch (e) {}
}

export function* homeSaga() {
  yield takeLatest(GET_WHETHER_DATA, getWhetherDataFnc);
}

const initialState = {};

const homeReducer = handleActions(
  {
    [SET_WHETHER_DATA]: (state, action) => {
      return { ...state, whetherData: action.payload };
    },
  },
  initialState
);

export default homeReducer;
