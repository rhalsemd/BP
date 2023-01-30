import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";

const GET_MAP_INFO = "map/GET_MAP_INFO";
const SET_MAP_INFO = "map/SET_MAP_INFO";
const CURRENT_MARKER_INFO = "map/CURRENT_MARKER_INFO";

const getMapInfo = createAction(GET_MAP_INFO, () => undefined);
const setMapInfo = createAction(SET_MAP_INFO, (data) => data);
const currentMarkerInfo = createAction(CURRENT_MARKER_INFO, (info) => info);

function* setApi() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    const get = yield call(() =>
      axios({
        method: "get",
        url: API,
      })
    );
    yield put({ type: SET_MAP_INFO, payload: get.data });
  } catch (e) {}
}

export function* mapSaga() {
  yield takeEvery(GET_MAP_INFO, setApi);
}

const initialState = {};

const mapReducer = handleActions(
  {
    [SET_MAP_INFO]: (state, action) => {
      return { ...state, data: action.payload };
    },
    [CURRENT_MARKER_INFO]: (state, action) => {
      return { ...state, currentInfo: action.payload };
    },
  },
  initialState
);

export const mapInfo = {
  getMapInfo,
  setMapInfo,
  currentMarkerInfo,
};

export default mapReducer;
