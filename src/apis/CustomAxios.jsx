import axios from 'axios';
import onSilentRefresh from './SilentRefresh';

const AxiosInstance = axios.create({
  baseURL: "https://dev.jojoumc.shop", //기본 서버 주소
  withCredentials: true,
  headers: {
    //토큰 부분 추가
  },
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("인터셉트", error);
    if(error.config.sent){
      return Promise.reject(error);
    }else if (error.response?.data.code === "JWT4101"){
      error.config.sent = true;
      console.log("토큰 잘못됨 원래 토큰 삭제");
      delete AxiosInstance.defaults.headers.common["Authorization"];
    }else if (error.response?.data.code === "JWT4102") {
      console.log("토큰 만료입니다 다시 토큰 재발급후 시도")
      error.config.sent = true;
      const accessToken = await onSilentRefresh();
      if (accessToken) {
        error.config.headers.Authorization = accessToken;
      }
      return AxiosInstance(error.config);
    }
    return Promise.reject(error);
  }
)



export default AxiosInstance;