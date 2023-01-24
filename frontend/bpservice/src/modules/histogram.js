import { createAction, handleAction } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_BRANCH_REVENUE = "histogram/GET_BRANCH_REVENUE";
const GET_BRANCH_REVENUE_SUCCESS = "histogram/GET_BRANCH_REVENUE_SUCCESS";
const GET_BRANCH_REVENUE_FAILURE = "histogram/GET_BRANCH_REVENUE_FAILURE";

export const getBranchRevenue = createAction(
  GET_BRANCH_REVENUE,
  (revenueData) => revenueData
);

const initalData = {};

const histogramReducer = handleAction({
  [GET_BRANCH_REVENUE_SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [GET_BRANCH_REVENUE_FAILURE]: (state, action) => ({
    ...state,
  }),
  initalData,
});

export default histogramReducer;

export function* histogramSaga() {
  yield takeLatest(GET_BRANCH_REVENUE, getBranchDataSaga);
}

function* getBranchDataSaga(action) {
  try {
    const data = yield call(api.getBranchRevenue);
    yield put({
      type: GET_BRANCH_REVENUE_SUCCESS,
      payload: data.data,
    });
  } catch (e) {
    yield put({
      type: GET_BRANCH_REVENUE_FAILURE,
      payload: e,
      error: true,
    });
  }
}
