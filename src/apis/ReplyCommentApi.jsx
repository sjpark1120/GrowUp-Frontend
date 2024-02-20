import AxiosInstance from './CustomAxios';

const ReplyCommentApi = {
    postReply: async (defaultBody,postId,pinId) => {
        console.log('Sending data:', defaultBody);
    
        try {
          console.log('Request details:', {
            method: 'POST',
            url: `/growup/growroom/${postId}/${pinId}`,
            comment: defaultBody.comment,
          });
        const response = await AxiosInstance.post(`/growup/growroom/${postId}/${pinId}`, { comment: defaultBody.comment });
        console.log('대댓글 post', response.data.result);

        return response.data.result;
        } catch (error) {
        console.error('Error in postReply:', error);
        throw error;
        }
    },
    getReply: async (postId, pinId) => {
      try {
        const response = await AxiosInstance.get(`/growup/growroom/${postId}/${pinId}`);
    
        // pinId가 일치하는 경우에만 해당 pinComments를 추출하여 배열로 만듦
        const matchingPinComments = response.data.result
          .filter(result => result.pinId === pinId)
          .map(result => result.pinComments);
    
        // matchingPinComments를 하나의 배열로 합치기
        const allPinComments = [].concat(...matchingPinComments);
    
        console.log('서버 대댓글 get', allPinComments);
        return allPinComments;
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
