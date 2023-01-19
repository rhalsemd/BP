import { createAction, handleActions } from "redux-actions";

const SEARCH_VALUE = "map/SEARCH_VALUE";
const SEARCH_RESULT = "map/SEARCH_RESULT";

const searchValue = createAction(SEARCH_VALUE, (input) => input);
const searchResult = createAction(SEARCH_RESULT, (result) => result);

const initialState = {};

const mapReducer = handleActions(
  {
    [SEARCH_VALUE]: (state, action) => {
      return { ...state, searchValue: action.payload };
    },
    [SEARCH_RESULT]: (state, action) => {
      return { ...state, searchResult: action.payload };
    },
  },
  initialState
);

export const mapInfo = {
  searchValue,
  searchResult,
};

export default mapReducer;
