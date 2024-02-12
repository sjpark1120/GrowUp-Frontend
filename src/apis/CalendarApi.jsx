import AxiosInstance from './CustomAxios';

const CalendarApi = {
    getCalendar: async (dateString) => {
      try {
        const response = await AxiosInstance.get(`/growup/calender/inquiry-month?day=${dateString}`);

        console.log(response.data);
        return response.data.result;
      } catch (error) {
        console.error('Error in getCalendar:', error);
        throw error;
      }
    },

    postEvent: async (eventData) => {
        try {
          const response = await AxiosInstance.post(`/growup/calender/enroll`,eventData);
  
          console.log(response.data);
          return response.data.result;
        } catch (error) {
          console.error('Error in postEvent:', error);
          throw error;
        }
      },

      modifyEvent: async (eventData) => {
        try {
          const response = await AxiosInstance.patch(`/growup/calender/comment-modify`,eventData);
  
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error in modifyEvent:', error);
          throw error;
        }
      },

      getPopup: async (dateString) => {
        try {
          const response = await AxiosInstance.get(`/growup/calender/inquiry?day=${dateString}`);
  
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error in getPopup:', error);
          throw error;
        }
      },
      
      modifyStatus: async (calendarId) => {
        try {
          const response = await AxiosInstance.patch(`/growup/calender/status-modify?calenderId=${calendarId}`);
  
          console.log('취소선 적용: ',response.data);
          return response.data;
        } catch (error) {
          console.error('Error in getPopup:', error);
          throw error;
        }
      },

      modifyColor: async ({ day, color }) => {
        try {
          const response = await AxiosInstance.patch(`/growup/calender/color-modify`, { day, color });
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error in modifyColor:', error);
          throw error;
        }
      },
      
  };
  
  export default CalendarApi;
  