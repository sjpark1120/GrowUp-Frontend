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
  //수정 api (우선 버튼부터 만들자ㅜ)
  updateGrowRoomPost: async (postId, updatedData) => {
    try {
      const response = await AxiosInstance.put(`/growup/growroom/${postId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  //삭제 api
  deleteGrowRoomPost: async (postId) => {
    try {
      const response = await AxiosInstance.delete(`/growup/growroom/${postId}`);
      console.log('삭제 response',response)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default GrowRoomPostApi;
