import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_BRANCH_REVENUE = "histogram/GET_BRANCH_REVENUE";
const GET_BRANCH_REVENUE_SUCCESS = "histogram/GET_BRANCH_REVENUE_SUCCESS";
const GET_BRANCH_REVENUE_FAILURE = "histogram/GET_BRANCH_REVENUE_FAILURE";

export const getBranchRevenue = createAction(
  GET_BRANCH_REVENUE,
  (revenueData) => revenueData
);

const initalData = {};

const histogramReducer = handleActions(
  {
    [GET_BRANCH_REVENUE]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [GET_BRANCH_REVENUE_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_BRANCH_REVENUE_FAILURE]: (state, action) => ({
      ...state,
    }),
  },
  initalData
);

export default histogramReducer;

export function* histogramSaga() {
  yield takeLatest(GET_BRANCH_REVENUE, getBranchDataSaga);
}

function* getBranchDataSaga() {
  const { data } = yield select((state) => state.histogramReducer);
  try {
    // const dataGet = yield call(api.getBranchRevenue(data));
    const dataGet = yield call(() => api.getBranchRevenue(data));
    // console.log("result", dataGet);
    yield put({
      type: GET_BRANCH_REVENUE_SUCCESS,
      payload: dataGet.data,
    });
  } catch (e) {
    console.log("error", e);
    yield put({
      type: GET_BRANCH_REVENUE_FAILURE,
      payload: e,
      error: true,
    });
  }
}
