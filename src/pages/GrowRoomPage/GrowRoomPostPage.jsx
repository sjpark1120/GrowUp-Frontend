// GrowRoomPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostHeader from '../../components/GrowRoom/GrowRoomPost/PostHeader';
import PostTitle from '../../components/GrowRoom/GrowRoomPost/PostTitle';
import GrowRoomPostApi from '../../apis/GrowRoomPostApi';

import { useNavigate } from 'react-router-dom';
import CommentComponent from '../../components/GrowRoom/GrowRoomPost/CommentComponent';

const WriteForm = styled.div`
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const TitleText = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ContentText = styled.div`
  flex: 1;
  height: 300px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 85px;
`;

const StudyInfo = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 55px;
  padding-bottom: 20px;
  border-bottom: solid 2px #B0B0B0;
`;

const LiveUpBTN = styled.button`
  float: right;
  border: 1px solid #00D749;
  padding: 9px;
  border-radius: 7px;
  margin-right: 10px;
  margin-left: auto;
  cursor: pointer;
  color: white;
  background-color: #00D749;
  &:hover {
    background-color: #B0B0B0;
  }
`;
const ServerPost = styled.div``;

const GrowRoomPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const {
    postId,
    nick_name,
    view,
    recruitment_field,
    number,
    period,
    startDate,
    endDate,
    categoryListDetail0,
    categoryListDetail1,
    categoryListDetail2,
    title,
    content,
    likedNumber,
  } = state || {};

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId) {
          // 상태값이 있으면 상태값 사용
          setPostData(state);
        } else {
          // 상태값이 없으면 API 호출
          const { growRoomId } = location.state || {};
          const response = await GrowRoomPostApi.getGrowRoomPosts(growRoomId);
          console.log('서버에서 받은 데이터 형태', response);
          setPostData(response);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
  
    fetchData();
  }, [state]);
  

  

  const handleLiveUpButtonClick = () => {
    console.log('라이브업 입장 button clicked!');
    navigate(`/liveup`);
  };

  return (
    <div>
      <PostHeader />
      <WriteForm>
        <TitleContainer>
          <TitleText>{postData?.title}</TitleText>
        </TitleContainer>
      </WriteForm>
      <PostTitle data={postData} />
      <WriteForm>
        <StudyInfo>스터디 소개</StudyInfo>
      </WriteForm>
      <WriteForm>
        <ContentText>{postData?.content}</ContentText>
      </WriteForm>
      <WriteForm>
        <LiveUpBTN onClick={handleLiveUpButtonClick}>LIVE UP 입장</LiveUpBTN>
      </WriteForm>
      <WriteForm>
        <CommentComponent />
      </WriteForm>
    </div>
  );
};

export default GrowRoomPostPage;