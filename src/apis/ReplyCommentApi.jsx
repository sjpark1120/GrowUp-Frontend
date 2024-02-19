import AxiosInstance from './CustomAxios';

const ReplyCommentApi = {
    postReply: async (defaultBody,postId,pinId) => {
        console.log('Sending data:', defaultBody);
    
        try {
        const response = await AxiosInstance.post(`/growup/growroom/${postId}/${pinId}`, defaultBody);
        console.log('대댓글 post', response.data.result);

        return response.data.result;
        } catch (error) {
        console.error('Error in postReply:', error);
        throw error;
        }
    },
    getReply: async (postId,pinId) => {
        try {
          const response = await AxiosInstance.get(`/growup/growroom/${postId}/${pinId}`);
    
          console.log('대댓글 get',response.data.result);
          return response.data.result;
        } catch (error) {
          console.error('Error in getPosts:', error);
          throw error;
        }
      },

    putReply: async (defaultBody,postId,pinId) => {
        console.log('putReply Sending data:', defaultBody,pinId);
    
        try {
        const response = await AxiosInstance.put(`/growup/growroom/${postId}/${pinId}`, defaultBody);
        console.log('대댓글 put:', response.data.result);
        return response.data.result;
        } catch (error) {
        console.error('Error in putReply:', error);
        throw error;
        }
    },

    deleteReply: async (postId,pinId,pinCommentId) => {
    
        try {
        const response = await AxiosInstance.delete(`/growup/growroom/${postId}/${pinId}/${pinCommentId}`);
        console.log('대댓글 삭제 완료',pinCommentId);
        return response.data.result;
        } catch (error) {
        console.error('Error in deleteReply:', error);
        throw error;
        }
    },

}
export default ReplyCommentApi;
