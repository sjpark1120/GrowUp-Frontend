// GrowRoomPostPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostHeader from '../../components/GrowRoom/GrowRoomPost/PostHeader';
import PostTitle from '../../components/GrowRoom/GrowRoomPost/PostTitle'; // Import the PostTitle component
import {dummyData} from '../../DummyData';
import categoryDummyData from '../../CategoryDummyData';
import { useNavigate } from 'react-router-dom';
import CommentComponent from '../../components/GrowRoom/GrowRoomPost/CommentComponent';



//etcCategory가 빈칸이 아니면 서버에 보내기

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
height : 300px;
font-size: 20px;
font-wight : 600
  margin-bottom: 85px;
  border: 1px solid #B0B0B0;
`;
const StudyInfo = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 55px;
  padding-bottom: 20px;
  border-bottom: solid 2px #B0B0B0;
`
const LiveUpBTN = styled.button`
float: right;
border: 1px solid #00D749;
padding: 9px;
border-radius: 7px;
margin-right: 10px;
margin-left: auto;
cursor: pointer;
color:white;
background-color:#00D749;
&:hover {
  background-color: #B0B0B0;
}
`;
const GrowRoomPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  // state에서 필요한 데이터 추출
  const { title, content, etcCategory,postId } = state || {};

  const handleLiveUpButtonClick = () => {
    console.log('라이브업 입장 button clicked!');
    navigate(`/liveup`); 
  };

  return (
    <div>
      <PostHeader></PostHeader>
      <WriteForm>
        <TitleContainer>
          <TitleText>{title}</TitleText>
        </TitleContainer>
      </WriteForm>
      {/* Pass dummyData as a prop to PostTitle component */}
      <PostTitle data={{ dummyData, categoryDummyData }} index={postId} />
    <WriteForm>
    <StudyInfo>스터디 소개</StudyInfo>
    </WriteForm>
    <WriteForm>
      <ContentText>{content}</ContentText>
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
