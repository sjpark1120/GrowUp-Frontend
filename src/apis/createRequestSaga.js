import { call, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "../redux/loadding";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      let errorMessage = e.message; // 기본 에러 메시지
      let serverError = {};

      if (e.response && e.response.data) {
        // 서버에서 전송한 에러 메시지 및 코드가 있을 경우
        errorMessage = e.response.data.message;
        serverError = {
          code: e.response.data.code,
          message: e.response.data.message,
        };
      }

      yield put({
        type: FAILURE,
        payload: {
          error: true,
          errorMessage,
          serverError, // 추가적인 서버 에러 정보
        },
      });
    }
    yield put(finishLoading(type));
  };
}
