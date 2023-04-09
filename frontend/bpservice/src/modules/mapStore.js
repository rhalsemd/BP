import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";

const GET_MAP_INFO = "map/GET_MAP_INFO";
const SET_MAP_INFO = "map/SET_MAP_INFO";
const CURRENT_MARKER_INFO = "map/CURRENT_MARKER_INFO";

const getMapInfo = createAction(GET_MAP_INFO, (data) => data);
const currentMarkerInfo = createAction(CURRENT_MARKER_INFO, (info) => info);

const API = `https://bp.ssaverytime.kr:8080`;

function* setApi(data) {
  const { lat, lng } = data.payload;

  try {
    const get = yield call(() =>
      axios({
        method: "get",
        url: `${API}/api/kiosk/home/base-coordinate-kiosk-list`,
        params: {
          lat,
          lng,
        },
      })
    );

    yield put({
      type: SET_MAP_INFO,
      payload: get.data,
      location: { lat, lng },
    });
  } catch (e) {}
}

export function* mapSaga() {
  yield takeEvery(GET_MAP_INFO, setApi);
}

const initialState = {};

const mapReducer = handleActions(
  {
    [SET_MAP_INFO]: (state, action) => {
      return { ...state, caseInfo: action.payload, location: action.location };
    },
    [CURRENT_MARKER_INFO]: (state, action) => {
      return { ...state, currentInfo: action.payload };
    },
  },
  initialState
);

export const mapInfo = {
  getMapInfo,
  currentMarkerInfo,
};

export default mapReducer;
