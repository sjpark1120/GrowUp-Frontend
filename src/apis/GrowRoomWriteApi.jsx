import AxiosInstance from './CustomAxios';

const GrowRoomWriteApi = {
  postWrite: async (defaultBody) => {
    try {
      const response = await AxiosInstance.post('/growup/growroom', defaultBody);

      console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.error('Error in postWrite:', error);
      throw error;
    }
  },
 };

export default GrowRoomWriteApi;
