import AxiosInstance from './CustomAxios';

const AuthApi = {
  login: async (loginData) => {
    try {
      const response = await AxiosInstance.post('/growup/users/login', loginData); //endpoint 맞추기
      console.log("response : ", response)
      if (response && response.status === 200) {
        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = `${response.data.result.accessToken}`;
        //console.log("액세스 토큰 헤더에 저장", response.data.result.accessToken)
        localStorage.setItem('refreshToken',response.data.result.refreshToken); //리프레시 토큰 저장
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await AxiosInstance.post('/growup/users/logout');
      return response.data;
    } catch (error) {
      console.error('Error in logout:', error);
      delete AxiosInstance.defaults.headers.common["Authorization"];
      console.log("토큰삭제")
      throw error;
    }
  },

  signUp: async (userData) => {
    try {
      const response = await AxiosInstance.post('/growup/users/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  },

  emailAuth: async(emailData) => { //가입 이메일인증
    try {
      const response = await AxiosInstance.post('/growup/users/auth', emailData);
      return response.data;
    } catch (error) {
      console.error('Error in emailAuth:', error);
      throw error;
    }
  },

  findPasswordAuth: async(emailData) => { //비밀번호 찾기 이메일인증
    try {
      const response = await AxiosInstance.post('/growup/users/password-auth', emailData);
      return response.data;
    } catch (error) {
      console.error('Error in findPasswordAuth:', error);
      throw error;
    }
  },

  silentRefresh: async() => {  // 토큰재발급
    try {
      const token = localStorage.getItem('refreshToken')
      AxiosInstance.defaults.headers.common["Authorization"] = `${token}`;
      const response = await AxiosInstance.post('/growup/users/token-reissue');
      return response.data;
    } catch (error) {
      //console.error('Error in silentRefresh:', error);
      delete AxiosInstance.defaults.headers.common["Authorization"];
      console.log("토큰삭제", AxiosInstance.defaults.headers.common)
      
      throw error;
    }
  }

//...
};

export default AuthApi;


//실제로 사용할땐 api 파일 import하고 이런식으로 사용했어요

// const handleSignUp = async () => {
//     try {
//       const response = await AuthApi.signUp(userData);
//       console.log('Sign up success:', response);
//     } catch (error) {
//       console.error('Sign up failed:', error);
//     }
//   };