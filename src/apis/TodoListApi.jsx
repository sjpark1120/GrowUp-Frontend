import AxiosInstance from "./CustomAxios";

const TodoListApi = {
  getTodo: async () => {
    try {
      const response = await AxiosInstance.get("/growup/todo/inquiry");

      console.log("getTodo:", response.data);
      return response.data.result.todoListList;
    } catch (error) {
      console.error("Error in getTodo:", error);
      throw error;
    }
  },

  postTodo: async (comment) => {
    try {
      const response = await AxiosInstance.post("/growup/todo/enroll", comment);

      console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in postTodo:", error);
      throw error;
    }
  },
  checkTodo: async (todoListId) => {
    try {
      const response = await AxiosInstance.patch(
        `/growup/todo/modify-status?todoListId=${todoListId}`
      );
      console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in checkTodo:", error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await AxiosInstance.get("/growup/users/info");

      console.log("getProfile:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  },

  getTime: async () => {
    try {
      const response = await AxiosInstance.get(`/growup/users/inquiry-myTime`);

      console.log("getTime:", response.data);
      return response.data.result;
    } catch (error) {
      console.error("Error in getTime:", error);
      throw error;
    }
  },
};

export default TodoListApi;
