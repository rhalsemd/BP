import { createAction, handleActions } from "redux-actions";
import dayjs from "dayjs";

const CHANGE_MONTH = "changeDate/CHANGE_MONTH";
const CHANGE_DAY = "changeDate/CHANGE_DAY";

export const changeMonth = createAction(CHANGE_MONTH, (date) => date);
export const changeDay = createAction(CHANGE_DAY, (date) => date);

const today = dayjs();
const initialState = {
  month: dayjs(),
  day: dayjs(),
};

const chagneDateReducer = handleActions(
  {
    [CHANGE_MONTH]: (state, action) => {
      return { month: action.payload };
    },
    [CHANGE_DAY]: (state, action) => {
      return { day: action.payload };
    },
  },
  initialState
);

export default chagneDateReducer;
