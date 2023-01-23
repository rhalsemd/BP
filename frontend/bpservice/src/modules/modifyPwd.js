import { createAction, handleActions } from "redux-actions";

const SET_MODIFY_PWD = "modifyPwd/SET_MODIFY_PWD";

const setModifyPwd = createAction(SET_MODIFY_PWD, (data) => data);

const initialState = {};

const modifyPwdReducer = handleActions(
  {
    [SET_MODIFY_PWD]: (state, action) => {
      console.log(action.payload);
      return { ...state, pwdInfo: action.payload };
    },
  },
  initialState
);

export const modifyPwdInfo = {
  setModifyPwd,
};

export default modifyPwdReducer;
