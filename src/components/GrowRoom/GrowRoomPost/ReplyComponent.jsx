// ReplyComponent.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReplyCommentApi from '../../../apis/ReplyCommentApi';
import { useNavigate } from 'react-router-dom';


const ReplyForm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ReplyTextArea = styled.textarea`
  flex: 1;
  margin-right: 10px;
  width: 500px;
  height: 30px;
  padding: 15px;
  border-radius: 4px;
  font-size: 14px;
  resize: none;


`;

const UserInfo = styled.div`
  font-size: 15px;
  color: black;
  margin-right: 5px;
`;

const ReplyButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
`;

const ReplyButton = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: white;
  color: #b0b0b0;
  border: none;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    color: black;
  }
`;




const CommentItem = styled.li`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Circle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #b0b0b0;
  margin-right: 15px;
  margin-top:15px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentMeta = styled.div`
  font-size: 12px;
  color: #b0b0b0;
  margin-top: 5px;
  margin-bottom: 5px;
`;


const ReplyComponent = ({ postId, parentPinId, userNickName, onAddReply, reply }) => {
  const navigate = useNavigate();
  const [newReply, setNewReply] = useState('');
  const [existingReplies, setExistingReplies] = useState([]);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const isEditing = editingReplyId !== null;


  const addReply = async () => {
    if (newReply.trim() !== '') {
      try {
        const response = await ReplyCommentApi.postReply({ comment: newReply }, postId, parentPinId);

        onAddReply({
          pinId: response.pinId,
          text: newReply,
          user: userNickName,
          date: new Date(response.createdAt).toLocaleString(),
        });

        setNewReply('');
      } catch (error) {
        console.error('대댓글 추가 오류:', error);
      }
      
    }
  };

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await ReplyCommentApi.getReply(postId, parentPinId);        

        setExistingReplies(response)

        console.log('existingReplies',existingReplies)
      } catch (error) {
        console.error('기존 대댓글 데이터 가져오기 실패:', error);
      }
    };

    fetchReplies();
  }, [postId, parentPinId]);

  const editReply = (pinCommentId) => {
    setEditingReplyId(pinCommentId);
    // 기존 댓글 내용을 편집 상자에 설정
    const editedReply = existingReplies.find((reply) => reply.pinCommentId === pinCommentId);
    setNewReply(editedReply.comment);
  };

  const saveReply = async (pinCommentId) => {
    if (newReply.trim() !== '') {
      try {
        const response = await ReplyCommentApi.putReply({ comment: newReply }, postId, parentPinId, pinCommentId);
        const updatedReplies = existingReplies.map((reply) => {
          if (reply.pinCommentId === pinCommentId) {
            return {
              ...reply,
              comment: newReply,
              date: new Date(response.createdAt).toLocaleString(),
            };
          }
          return reply;
        });
        setExistingReplies(updatedReplies);
        setEditingReplyId(null);
        setNewReply('');
      } catch (error) {
        console.error('대댓글 저장 오류:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingReplyId(null);
    setNewReply('');
  };

  const deleteReply = async (pinCommentId) => {
    try {
      await ReplyCommentApi.deleteReply(postId, parentPinId, pinCommentId);
      const updatedReplies = existingReplies.filter((reply) => reply.pinCommentId !== pinCommentId);
      setExistingReplies(updatedReplies);
      setEditingReplyId(null);
      setNewReply('');
    } catch (error) {
      console.error('대댓글 삭제 오류:', error);
    }
  };


 
  return (
    
    <>
    {/* 기존 대댓글 목록 표시 */}
    {existingReplies.map((existingReply) => (
  <CommentItem key={existingReply.pinCommentId}>
    <Circle />
    <CommentContent>
      <UserInfo>{existingReply.nickName}</UserInfo>
      <CommentMeta>{existingReply.createdAt}</CommentMeta>
      {editingReplyId === existingReply.pinCommentId ? (
        <>
          <ReplyTextArea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
          <ReplyButtons>
            <ReplyButton onClick={() => saveReply(existingReply.pinCommentId)}>저장</ReplyButton>
            <ReplyButton onClick={cancelEdit}>취소</ReplyButton>
          </ReplyButtons>
        </>
      ) : (
        <>
          <p>{existingReply.comment}</p>
          <ReplyButtons>
            <ReplyButton onClick={() => editReply(existingReply.pinCommentId)}>수정</ReplyButton>
            <ReplyButton onClick={() => deleteReply(existingReply.pinCommentId)}>삭제</ReplyButton>
          </ReplyButtons>
        </>
      )}
    </CommentContent>
  </CommentItem>
))}
      {!isEditing && (
        <ReplyForm>
          <UserInfo>{userNickName}</UserInfo>
          <ReplyTextArea
            placeholder="대댓글을 입력하세요..."
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
          <ReplyButtons>
            <ReplyButton onClick={addReply}>댓글 달기</ReplyButton>
          </ReplyButtons>
        </ReplyForm>
      )}

      


    </>
  );
};

export default ReplyComponent;