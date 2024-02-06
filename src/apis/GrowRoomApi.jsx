import AxiosInstance from './CustomAxios';

const GrowRoomApi = {
  getPosts: async () => {
    try {
      const response = await AxiosInstance.get('/growup/growroom', {
      });

      console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw error;
    }
  },
};

export default GrowRoomApi;
