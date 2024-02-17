import AxiosInstance from './CustomAxios';

const LiveUpApi = {
  getPosts: async (filter) => {
    try {
      const response = await AxiosInstance.get('/growup/participate/under',{
        params: {
          filter
        }
      });
      console.log("라이브업 글조회", response);
      return response.data;
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw error;
    }
  },

  like: async (growRoomId) => {
    try {
      const response = await AxiosInstance.post('/growup/users/liked', null, {
        params:{
          growRoomId
        }
      });
      //console.log("like success", response);
      return response.data;
    } catch (error) {
      console.error('Error in like:', error);
      throw error;
    }
  },
};

export default LiveUpApi;