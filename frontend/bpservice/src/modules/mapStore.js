import { createAction, handleActions } from "redux-actions";

const SEARCH_VALUE = "map/SEARCH_VALUE";
const SEARCH_RESULT = "map/SEARCH_RESULT";
const GO_TO_CURRENT = "map/GO_TO_CURRENT";
// const COMPLETE_PLACE = "map/COMPLETE_PLACE";

const searchValue = createAction(SEARCH_VALUE, (input) => input);
const searchResult = createAction(SEARCH_RESULT, (result) => result);
const goToCurrent = createAction(GO_TO_CURRENT, (location) => location);
// const completePlace = createAction(COMPLETE_PLACE, (state) => state);

const initialState = {};

const mapReducer = handleActions(
  {
    [SEARCH_VALUE]: (state, action) => {
      return { ...state, searchValue: action.payload };
    },
    [SEARCH_RESULT]: (state, action) => {
      return { ...state, searchResult: action.payload };
    },
    [GO_TO_CURRENT]: (state, action) => {
      return { ...state, location: action.payload };
    },
    // [COMPLETE_PLACE]: (state, action) => {
    //   return { ...state, isLocation: action.payload };
    // },
  },
  initialState
);

export const mapInfo = {
  searchValue,
  searchResult,
  goToCurrent,
  // completePlace,
};

export default mapReducer;
