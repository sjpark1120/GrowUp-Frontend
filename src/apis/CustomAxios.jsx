import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: "https://dev.jojoumc.shop", //기본 서버 주소
  withCredentials: true,
  headers: {
    //토큰 부분 추가
  },
});

export default AxiosInstance;