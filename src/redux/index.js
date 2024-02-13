import { combineReducers } from "redux";
import mypageEdit, { existNickname, mypageEditSaga } from "./mypageEdit";
import { all } from "redux-saga/effects";
import userReducer from "./user";
import loginModalReducer from "./loginModal";

const rootReducer = combineReducers({
  mypageEdit,
  user: userReducer,
  loginModal: loginModalReducer,
});

export function* rootSaga() {
  yield all([mypageEditSaga()]);
}

export default rootReducer;
