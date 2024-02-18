import AxiosInstance from "./CustomAxios";

const GrowRoomApi = {
  getPosts: async (filters) => {
    try {
      const response = await AxiosInstance.get(`https://dev.jojoumc.shop/growup/growroom/under?filter=${filters.filter}&categoryDetail=${filters.categoryDetail}&period=${filters.period}&status=${filters.status}&search=${filters.search}`);

      console.log("getPost:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in getPosts:", error);
      throw error;
    }
  },

  getHotPosts: async (filters) => {
    try {
      const response = await AxiosInstance.get(`/growup/growroom/upper`);

      console.log("getHotPost:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in getHotPosts:", error);
      throw error;
    }
  },

  getHotPostsNoToken: async (filters) => {
    try {
      const response = await AxiosInstance.get(`/growup/upperAbleNoToken`);

      console.log("getHotPostsNoToken:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in getHotPostsNoToken:", error);
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
