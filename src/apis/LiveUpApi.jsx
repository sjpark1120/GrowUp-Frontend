import AxiosInstance from './CustomAxios';

const LiveUpApi = {
  getPosts: async (filter) => {
    try {
      const response = await AxiosInstance.get('/growup/participate/under',{
        params: {
          filter
        }
      });
      //console.log("라이브업 글조회", response);
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

  getRanking: async (filter) => {
    try {
      const response = await AxiosInstance.get('/growup/participate/inquiry-DateTime', {
        params:{
          filter
        }
      });
      console.log("get Ranking success", response);
      return response.data;
    } catch (error) {
      console.error('Error in get Ranking :', error);
      throw error;
    }
  },

  getparticipant: async (growRoomId, filter) => {
    try {
      const response = await AxiosInstance.get('/growup/participate/inquiry', {
        params:{
          growRoomId,
          filter
        }
      });
      console.log("getparticipant success", response);
      return response.data;
    } catch (error) {
      console.error('Error in getparticipant :', error);
      throw error;
    }
  },

  participantlike: async (growRoomId, participateId) => {
    try {
      const response = await AxiosInstance.post('/growup/users/liveRoomliked', null, {
        params:{
          growRoomId,
          participateId
        }
      });
      console.log("like success", response);
      return response.data;
    } catch (error) {
      console.error('Error in like:', error);
      throw error;
    }
  },

};

export default LiveUpApi;