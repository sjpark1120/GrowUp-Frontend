import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../apis/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as mypageEditApi from "../apis/mypageEdit";

const CHANGE_FIELD = "mypageEdit/CHANGE_FIELD";
const INITIALIZE = "mypageEdit/INITIALIZE";

const [GETMYINFO, GETMYINFO_SUCCESS, GETMYINFO_FAILURE] =
  createRequestActionTypes("mypageEdit/GETMYINFO");

const [EXISTNICKNAME, EXISTNICKNAME_SUCCESS, EXISTNICKNAME_FAILURE] =
  createRequestActionTypes("mypageEdit/existNickname");

const [CHANGENICKNAME, CHANGENICKNAME_SUCCESS, CHANGENICKNAME_FAILURE] =
  createRequestActionTypes("mypageEdit/changeNickname");

const [PASSWORDCHECK, PASSWORDCHECK_SUCCESS, PASSWORDCHECK_FAILURE] =
  createRequestActionTypes("mypageEdit/passwordCheck");

const [CHANGEIMAGE, CHANGEIMAGE_SUCCESS, CHANGEIMAGE_FAILURE] =
  createRequestActionTypes("mypageEdit/changeImage");

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE);

export const getMyInfo = createAction(GETMYINFO);
export const existNickname = createAction(
  EXISTNICKNAME,
  (nickName) => nickName
);
export const changeNickname = createAction(
  CHANGENICKNAME,
  (nickName) => nickName
);
export const passwordCheck = createAction(
  PASSWORDCHECK,
  (password) => password
);
export const changeImage = createAction(CHANGEIMAGE, (image) => image);

const getMyInfoSaga = createRequestSaga(GETMYINFO, mypageEditApi.getMyInfo);
const existNicknameSaga = createRequestSaga(
  EXISTNICKNAME,
  mypageEditApi.existNickname
);
const changeNicknameSaga = createRequestSaga(
  CHANGENICKNAME,
  mypageEditApi.changeNickname
);
const passwordCheckSaga = createRequestSaga(
  PASSWORDCHECK,
  mypageEditApi.passwordCheck
);
const changeImageSaga = createRequestSaga(
  CHANGEIMAGE,
  mypageEditApi.photoChange
);

export function* mypageEditSaga() {
  yield takeLatest(GETMYINFO, getMyInfoSaga);
  yield takeLatest(EXISTNICKNAME, existNicknameSaga);
  yield takeLatest(CHANGENICKNAME, changeNicknameSaga);
  yield takeLatest(PASSWORDCHECK, passwordCheckSaga);
  yield takeLatest(CHANGEIMAGE, changeImageSaga);
}

const initialState = {
  myInfo: {
    email: "",
    nickname: "",
    image: null,
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  },
  myInfoError: null,
  existNicknameError: null,
  changeNicknameError: null,
  passwordCheckError: null,
};

const mypageEdit = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      myInfo: {
        ...state.myInfo,
        [key]: value,
      },
    }),
    [GETMYINFO_SUCCESS]: (state, { payload: myInfo }) => ({
      ...state,
      myInfo: {
        ...state.myInfo,
        email: myInfo.result.email,
        nickname: myInfo.result.nickName,
      },
      myInfoError: null,
    }),
    [CHANGEIMAGE_SUCCESS]: (state, { payload: myInfo }) => ({
      ...state,
      myInfo: {
        ...state.myInfo,
        email: myInfo.result.email,
        nickname: myInfo.result.nickName,
      },
      myInfoError: null,
    }),

    [GETMYINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myInfoError: error,
    }),
    [EXISTNICKNAME_SUCCESS]: (state, { payload: isNickname }) => ({
      ...state,
      isNickname,
      existNicknameError: null,
    }),
    [EXISTNICKNAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      existNicknameError: error,
    }),
    [CHANGENICKNAME_SUCCESS]: (state, { payload: isChangeNickname }) => ({
      ...state,
      isChangeNickname,
      changeNicknameError: null,
    }),
    [CHANGENICKNAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      changeNicknameError: error,
    }),
    [PASSWORDCHECK_SUCCESS]: (state, { payload: passwordCheck }) => ({
      ...state,
      passwordCheck,
      passwordCheckError: null,
    }),
    [PASSWORDCHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      passwordCheckError: error,
    }),
  },
  initialState
);

export default mypageEdit;
