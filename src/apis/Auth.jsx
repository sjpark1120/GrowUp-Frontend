import AxiosInstance from './CustomAxios';

const AuthApi = {
  login: async (loginData) => {
    try {
      const response = await AxiosInstance.post('/auth/login', loginData); //endpoint 맞추기
      return response.data;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  },

  signUp: async (userData) => {
    try {
      const response = await AxiosInstance.post('/auth/sign_up', userData);
      return response.data;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  },
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