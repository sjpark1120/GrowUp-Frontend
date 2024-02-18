import AxiosInstance from './CustomAxios';

const CalendarApi = {
    getCalendar: async (dateString) => {
      try {
        const response = await AxiosInstance.get(`/growup/calender/inquiry-month?day=${dateString}`);

        console.log('getCalendar:' , response.data);
        return response.data.result;
      } catch (error) {
        console.error('Error in getCalendar:', error);
        throw error;
      }
    },

    postEvent: async (eventData) => {
        try {
          const response = await AxiosInstance.post(`/growup/calender/enroll`,eventData);
  
          console.log('postEvent:', response.data);
          return response.data.result;
        } catch (error) {
          console.error('Error in postEvent:', error);
          throw error;
        }
      },

      modifyEvent: async (eventData) => {
        try {
          const response = await AxiosInstance.patch(`/growup/calender/comment-modify`,eventData);
  
          console.log('modifyEvent:',response.data);
          return response.data;
        } catch (error) {
          console.error('Error in modifyEvent:', error);
          throw error;
        }
      },

      getPopup: async (dateString) => {
        try {
          const response = await AxiosInstance.get(`/growup/calender/inquiry?day=${dateString}`);
  
          console.log('getPopup:',response.data);
          return response.data;
        } catch (error) {
          console.error('Error in getPopup:', error);
          throw error;
        }
      },
      
      modifyStatus: async (calendarId) => {
        try {
          const response = await AxiosInstance.patch(`/growup/calender/status-modify?calenderId=${calendarId}`);
  
          console.log('modifyStatus: ',response.data);
          return response.data;
        } catch (error) {
          console.error('Error in modifyStatus:', error);
          throw error;
        }
      },

      modifyColor: async ({ day, color }) => {
        try {
          const response = await AxiosInstance.patch(`/growup/calender/color-modify`, { day, color });
          console.log('modifyColor:',response.data);
          return response.data;
        } catch (error) {
          console.error('Error in modifyColor:', error);
          throw error;
        }
      },
      
      deleteEvent: async (calendarId) => {
        try {
          const response = await AxiosInstance.delete(`/growup/calender/delete?calenderId=${calendarId}`);
          console.log('deleteEvent:',response.data);
          return response.data;
        } catch (error) {
          console.error('Error in deleteEvent:', error);
          throw error;
        }
      },
      
  };
  
  export default CalendarApi;
  