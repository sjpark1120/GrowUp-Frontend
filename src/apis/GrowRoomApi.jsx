import AxiosInstance from "./CustomAxios";

const GrowRoomApi = {
  getPosts: async (filter) => {
    try {
      const response = await AxiosInstance.get(`/growup/growroom?filter=${filter}`);

      console.log("getPost:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in getPosts:", error);
      throw error;
    }
  },

  toggleLike: async (growRoomId) => {
    try {
      const response = await AxiosInstance.post(`/growup/users/liked?growRoomId=${growRoomId}`);

      console.log("toggleLike:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in toggleLike:", error);
      throw error;
    }
  },
};

export default GrowRoomApi;
