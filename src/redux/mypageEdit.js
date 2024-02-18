import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../apis/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as mypageEditApi from "../apis/mypageEdit";

const CHANGE_FIELD = "mypageEdit/CHANGE_FIELD";
const INITIALIZE = "mypageEdit/INITIALIZE";
const PASSWORD_CHECK_INITIALIZE = "mypageEdit/PASSWORD_CHECK_INITIALIZE";

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

const [CHANGE_PASSOWRD, CHANGE_PASSOWRD_SUCCESS, CHANGE_PASSOWRD_FAILURE] =
  createRequestActionTypes("mypageEdit/change_passowrd");

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE);
export const passwordCheckInitialize = createAction(PASSWORD_CHECK_INITIALIZE);

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
export const change_password = createAction(
  CHANGE_PASSOWRD,
  ({ password, passwordCheck }) => ({
    password,
    passwordCheck,
  })
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
const changePasswordSaga = createRequestSaga(
  CHANGE_PASSOWRD,
  mypageEditApi.change_password
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
  yield takeLatest(CHANGE_PASSOWRD, changePasswordSaga);
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
  passwordCheckInfo: null,
  change_password_info: null,
  myInfoError: null,
  existNicknameError: null,
  changeNicknameError: null,
  passwordCheckError: null,
  change_password_info_Error: null,
};

const mypageEdit = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [PASSWORD_CHECK_INITIALIZE]: (state) => ({
      ...state,
      passwordCheckInfo: null,
    }),
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
    [CHANGE_PASSOWRD_SUCCESS]: (state, { payload: change_password_info }) => ({
      ...state,
      change_password_info,
      change_password_info_Error: null,
    }),
    [CHANGE_PASSOWRD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      change_password_info_Error: error,
    }),
    [PASSWORDCHECK_SUCCESS]: (state, { payload: passwordCheckInfo }) => ({
      ...state,
      passwordCheckInfo,
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
