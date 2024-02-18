// GrowRoomPostApi.js

import AxiosInstance from './CustomAxios';

const GrowRoomWriteApi = {
  postWrite: async (defaultBody) => {
    console.log('Sending data:', defaultBody);

    try {
      const response = await AxiosInstance.post('/growup/growroom', defaultBody);

      console.log('Server response:', response.data.result);
      return response.data.result;
    } catch (error) {
      console.error('Error in postWrite:', error);
      throw error;
    }
  },
};

export default GrowRoomWriteApi;
