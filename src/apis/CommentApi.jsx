import AxiosInstance from './CustomAxios';

const CommentApi = {
    postComment: async (defaultBody,postId) => {
        console.log('Sending data:', defaultBody);
    
        try {
        const response = await AxiosInstance.post(`/growup/growroom/${postId}`, defaultBody);
        console.log('Server response:', response.data.result);

        return response.data.result;
        } catch (error) {
        console.error('Error in postComment:', error);
        throw error;
        }
    },
    getComment: async (postId,pinId) => {
        try {
          const response = await AxiosInstance.get(`/growup/growroom/${postId}/pin`);
    
          console.log('getComment',response.data.result);
          return response.data.result;
        } catch (error) {
          console.error('Error in getPosts:', error);
          throw error;
        }
      },

    putComment: async (defaultBody,postId,pinId) => {
        console.log('Sending data:', defaultBody);
    
        try {
        const response = await AxiosInstance.put(`/growup/growroom/${postId}/${pinId}`, defaultBody);
        console.log('Server response:', response.data.result);
        return response.data.result;
        } catch (error) {
        console.error('Error in putComment:', error);
        throw error;
        }
    },

    deleteComment: async (postId,pinId) => {
    
        try {
        const response = await AxiosInstance.delete(`/growup/growroom/${postId}/${pinId}`);
        console.log('삭제 완료',pinId);
        return response.data.result;
        } catch (error) {
        console.error('Error in deleteComment:', error);
        throw error;
        }
    },

}
export default CommentApi;
