import AuthApi from './Auth';
import AxiosInstance from './CustomAxios';


const onSilentRefresh = async () => {
  try {
    const response = await AuthApi.silentRefresh();
    console.log('silentRefresh success:', response);
    AxiosInstance.defaults.headers.common["Authorization"] = `${response.result.newAccessToken}`;
    console.log("로그인 연장", AxiosInstance.defaults.headers.common)
    return response.result.newAccessToken;
  } catch (error) {
    //console.error('silentRefresh failed:', error);
    if (error.response?.status === 401) {
      // refresh token 만료 - 로그인 페이지 이동
      delete AxiosInstance.defaults.headers.common["Authorization"];
      console.log("토큰삭제");
      console.log('로그인 만료')
    }
  }
};

export default onSilentRefresh