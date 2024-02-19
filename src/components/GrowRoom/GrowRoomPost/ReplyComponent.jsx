// ReplyComponent.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ReplyCommentApi from '../../../apis/ReplyCommentApi';

const ReplyForm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ReplyTextArea = styled.textarea`
  flex: 1;
  margin-right: 10px;
  width: 400px;
  height: 30px;
  padding: 5px;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
`;

const UserInfo = styled.div`
  font-size: 12px;
  color: #b0b0b0;
  margin-right: 5px;
`;

const ReplyButtons = styled.div`
  display: flex;
  align-items: center;
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

const ReplyComponent = ({ postId, parentPinId, userNickName, onAddReply }) => {
  const [newReply, setNewReply] = useState('');

  const addReply = async () => {
    if (newReply.trim() !== '') {
      try {
        const response = await ReplyCommentApi.postReply({ reply: newReply }, postId, parentPinId);

        // onAddReply 함수를 호출하여 부모 컴포넌트의 상태를 업데이트
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

  return (
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
  );
};

export default ReplyComponent;
