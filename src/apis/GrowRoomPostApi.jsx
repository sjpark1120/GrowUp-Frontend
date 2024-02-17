import AxiosInstance from './CustomAxios';

const GrowRoomPostApi = {
  getGrowRoomPosts: async (postId) => {
    try {
      const response = await AxiosInstance.get(`/growup/growroom/${postId}`);

      console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw error;
    }
  },
};

export default GrowRoomPostApi;
