import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: "https://server_address", //기본 서버 주소
  headers: {
    //토큰 부분 추가
  },
});

export default AxiosInstance;