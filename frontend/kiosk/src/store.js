import { createStore } from "redux";

const GET_KIOSK_ID = 'GET_KIOSK_ID'

export const getKioskId = (id) => {
  return {
    type: GET_KIOSK_ID,
    id
  }
}

const reducer = (state = { id: 1 }, action) => {
  switch (action.type) {
    case GET_KIOSK_ID:
      return { ...state, id: action.id };
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store