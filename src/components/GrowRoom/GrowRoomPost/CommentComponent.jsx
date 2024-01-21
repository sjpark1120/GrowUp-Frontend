// CommentComponent.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
const All = styled.div`
    padding-bottom : 70px;
`;

const WriteForm = styled.div`
position: relative;         
  display: flex;
  width: 1000px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;

  align-items: center;
  margin-bottom: 10px;
  textarea {
    flex: 1;
    margin-right: 10px;
  }
  textarea {
    width: 800px;
    margin-left: auto;
    height: 40px;
    margin-left: 80px;
    padding: 10px;
    border-radius: 4px;
    font-size: 16px;
    resize: none;
  }
  ul {
    width: 1000px;
  }
`;

const CommentItem = styled.li`
position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  margin-bottom:20px;

`;

const Circle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #B0B0B0;
  margin-right: 15px;
`;

const CommentContent = styled.div`
  flex: 1;

`;

const CommentMeta = styled.div`
  font-size: 12px;
  color: #B0B0B0;
  margin-top: 5px;
  margin-bottom: 5px;

`;

const CommentTextArea = styled.textarea`

margin-left: auto;
height: 40px;
margin-left: 80px;
padding: 10px;
border-radius: 4px;
font-size: 16px;
`;

const CommentButtons = styled.div`
position: absolute; /* 추가: 절대 위치 설정 */
  top: 5px; /* 추가: 위에서 5px 떨어진 위치 */
  right: 5px; /* 추가: 오른쪽에서 5px 떨어진 위치 */
  display: flex;
  align-items: center;

`;

const CommentButton = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: white;
  color: #B0B0B0;
  border: none;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    color: black;
}
`;

const CommentComponent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([
        ...comments,
        { text: newComment, user: '사용자명', date: new Date().toLocaleString() },
      ]);
      setNewComment('');
    }
  };

  const editComment = (index) => {
    setEditingIndex(index);
    setNewComment(comments[index].text);
  };

  const saveComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments];
      updatedComments[editingIndex].text = newComment;
      updatedComments[editingIndex].date = new Date().toLocaleString();
      setComments(updatedComments);
      setEditingIndex(null);
      setNewComment('');
    }
  };

  const deleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    setEditingIndex(null);
  };

  return (
    <All>
      <WriteForm>
        <p>댓글 {comments.length}개</p>
      </WriteForm>

      <WriteForm>
        <ul>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <Circle />
              <CommentContent>
                <user>
                  <strong>{comment.user}</strong>
                </user>
                <CommentMeta>
                  {comment.date}
                </CommentMeta>
                {editingIndex === index ? (
                  <>
                    <CommentTextArea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <CommentButtons>
                      <CommentButton onClick={() => saveComment(index)}>저장</CommentButton>
                      <CommentButton onClick={() => setEditingIndex(null)}>취소</CommentButton>
                    </CommentButtons>
                  </>
                ) : (
                  <span>{comment.text}</span>
                )}
                {editingIndex !== index ? (
                  <>
                    <CommentButtons>
                      <CommentButton onClick={() => editComment(index)}>수정</CommentButton>
                      <CommentButton onClick={() => deleteComment(index)}>삭제</CommentButton>
                    </CommentButtons>
                  </>
                ) : null}
              </CommentContent>
            </CommentItem>
          ))}
        </ul>
      </WriteForm>

      <WriteForm>
        <Circle>
          <textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Circle>
        {editingIndex !== null ? (
          <>
            <CommentButtons>
              <CommentButton onClick={saveComment}>저장</CommentButton>
              <CommentButton onClick={() => setEditingIndex(null)}>취소</CommentButton>
            </CommentButtons>
          </>
        ) : (
          <CommentButton onClick={addComment}>댓글 달기</CommentButton>
        )}
      </WriteForm>
     
    </All>
  );
};

export default CommentComponent;
