// CommentComponent.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentApi from '../../../apis/CommentApi';
import TodoListApi from '../../../apis/TodoListApi';
import ReplyComponent from './ReplyComponent';

const All = styled.div`
  padding-bottom: 70px;
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
  margin-bottom: 20px;
`;

const Circle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #b0b0b0;
  margin-right: 15px;
`;

const CommentContent = styled.div`
  flex: 1;
  margin-bottom:5px;
`;

const CommentMeta = styled.div`
  font-size: 12px;
  color: #b0b0b0;
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
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
`;

const CommentButton = styled.button`
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

const CommentComponent = ({ index }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [pinId, setPinId] = useState(null);
  const [userNickName, setUserNickName] = useState(null);
  const [replyingPinId, setReplyingPinId] = useState(null);
  const postId = index;
  const isEditing = editingIndex !== null;


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const existingComments = await CommentApi.getComment(postId);

        
        setComments(existingComments.map((comment) => ({
          pinId: comment.pinId,
          text: comment.comment,
          user: comment.nickName,
          date: new Date(comment.createdAt).toLocaleString(),
          replies: [],
        })));
      } catch (error) {
        console.error('기존 댓글 데이터 가져오기 실패:', error);
      }
    };

    fetchComments();
  }, [postId, pinId]);

  const addComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const userDataResponse = await TodoListApi.getProfile();
        setUserNickName(userDataResponse);
        if (userDataResponse && userDataResponse.nickName) {
          const response = await CommentApi.postComment({ comment: newComment }, postId);
          const latestComment = response[response.length - 1];
          const newPinId = latestComment.pinId;

          setPinId(newPinId);
          setComments([
            ...comments,
            {
              pinId: newPinId,
              text: newComment,
              user: userDataResponse.nickName,
              date: new Date(latestComment.createdAt).toLocaleString(),
            },
          ]);
          setNewComment('');
        } else {
          console.error('유저 데이터가 유효하지 않습니다.');
        }
      } catch (error) {
        console.error('댓글 추가 오류:', error);
      }
    }
  };

  const editComment = (pinId) => {
    const commentIndex = comments.findIndex((comment) => comment.pinId === pinId);
    setEditingIndex(commentIndex);
    setNewComment(comments[commentIndex].text);
  };

  const saveComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const response = await CommentApi.putComment({ comment: newComment }, postId, comments[editingIndex].pinId);
        const updatedComments = [...comments];
        updatedComments[editingIndex].text = newComment;
        updatedComments[editingIndex].date = new Date(response.createdAt).toLocaleString();
        setComments(updatedComments);
        setEditingIndex(null);
        setNewComment('');
        setPinId(null);
      } catch (error) {
        console.error('댓글 저장 오류:', error);
      }
    }
  };

  const deleteComment = async (pinId) => {
    try {
      await CommentApi.deleteComment(postId, pinId);
      const updatedComments = comments.filter((comment) => comment.pinId !== pinId);
      setComments(updatedComments);
      setEditingIndex(null);
      setPinId(null);
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  const startReplying = (pinId) => {
    setReplyingPinId(pinId);
  };



  const addReplyToComment = (parentPinId, replyData) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      const parentCommentIndex = updatedComments.findIndex((comment) => comment.pinId === parentPinId);
      updatedComments[parentCommentIndex].replies.push(replyData);
      return updatedComments;
    });
    setReplyingPinId(null);
  };

  return (
    <All>
      <WriteForm>
        <p>댓글 {comments.length}개</p>
      </WriteForm>

      <WriteForm>
        <ul>
          {comments.map((comment) => (
            <CommentItem key={comment.pinId}>
              <Circle />
              
              <CommentContent>
                <user>
                  <strong>{comment.user}</strong>
                </user>
                <CommentMeta>{comment.date}</CommentMeta>
                {editingIndex === comment.pinId ? (
                  <>
                    <CommentTextArea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <CommentButtons>
                      <CommentButton onClick={() => saveComment(pinId)}>저장</CommentButton>
                      <CommentButton onClick={() => setEditingIndex(null)}>취소</CommentButton>
                    </CommentButtons>
                  </>
                ) : (
                  <span>{comment.text}</span>
                )}
                {editingIndex !== comment.pinId ? (
                  <>

                    <CommentButtons>
                      <CommentButton onClick={() => editComment(comment.pinId)}>수정</CommentButton>
                      <CommentButton onClick={() => deleteComment(comment.pinId)}>삭제</CommentButton>
                      <CommentButton onClick={() => startReplying(comment.pinId)}>대댓글</CommentButton>
                    </CommentButtons>
                    
                  </>
                ) : null}
                {replyingPinId === comment.pinId && (
                  <ReplyComponent
                    postId={postId}
                    parentPinId={comment.pinId}
                    userNickName={userNickName}
                    onAddReply={(replyData) => addReplyToComment(comment.pinId, replyData)}
                  />
                )}
              </CommentContent>
            </CommentItem>
          ))}
        </ul>
      </WriteForm>
      {!isEditing && (
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
              <CommentButton onClick={() => saveComment(pinId)}>저장</CommentButton>
              <CommentButton onClick={() => setEditingIndex(null)}>취소</CommentButton>
            </CommentButtons>
          </>
        ) : (
          <CommentButton onClick={addComment}>댓글 달기</CommentButton>
        )}
      </WriteForm>
                )}

    </All>
  );
};

export default CommentComponent;
