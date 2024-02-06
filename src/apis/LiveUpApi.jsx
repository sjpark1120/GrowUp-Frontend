import AxiosInstance from './CustomAxios';

const LiveUpApi = {
  getPosts: async () => {
    try {
      const response = await AxiosInstance.get('/growup/growroom', {
      });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw error;
    }
  },
};

export default LiveUpApi;