import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

import tag_close from '../../icon/모집완료.png';
import tag_popular from '../../icon/인기.png';
import tag_study from '../../icon/스터디.png';
import img_like from '../../icon/img-like.svg';
import img_unlike from '../../icon/img-unlike.svg';

const Box = styled.div`
  display: flex;
  width: 292px;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 24px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #F7F7F7;
  background: #FFF;
`;

const MainText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #1C1C1C;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.40px;
`;

const DeadLine = styled.p`
padding-bottom:8px;
color: #999999;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
`

const Views = styled.p`
color: #848484; 
font-size: 12px; 
font-weight: 400
`

const PostBox = ({postId, popular, study, status, deadline, maintext, views, like }) => {
  const [isActive, setIsActive] = useState(like === 'like');

  const handleLikeClick = () => {
    setIsActive(!isActive);
  };

  const isLiked = () => {
    return isActive ? img_like : img_unlike;
  };

  const formattedViews = views >= 1000 ? '999+' : views;

  const navigate = useNavigate(); 
  const handleClick = () => {
    // Navigate to the specified route with postId parameter
    navigate(`/growroom/${postId}`);
  };

  return (
    <Box style={{ opacity: status === 'close' ? 0.5 : 1 }} onClick={handleClick}>
      <div style={{ paddingBottom: '28px' }}>
        <div style={{ justifyContent: 'flex-start', gap: '10px', display: 'flex', paddingBottom: '20px' }}>
          {popular && <img src={tag_popular} alt="popular" />}
          {study && <img src={tag_study} alt="study" />}
          {status === 'close' && <img src={tag_close} alt="Recruit Status" style={{ marginLeft: 'auto' }} />}
        </div>

        <DeadLine>{`마감일 | ${deadline}`}</DeadLine>

        <MainText>{`${maintext}`}</MainText>
      </div>
      <div style={{ borderTop: '1px #F7F7F7 solid', marginTop: 'auto', padding: '12px 0px 14px 0px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', alignSelf: 'stretch' }}>
        <Views>{`조회수 ${formattedViews}회`}</Views>
        <img onClick={handleLikeClick} src={isLiked()} alt="Like" style={{ cursor: 'pointer' }} />
      </div>

    </Box>
  );
};

export default PostBox;