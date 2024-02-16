import styled from 'styled-components';

import tag_close from '../../icon/모집완료.png';
import tag_open from '../../icon/모집중.png';
import tag_popular from '../../icon/인기.png';
import tag_study from '../../icon/스터디.png';
import tag_project from '../../icon/프로젝트.png';
import tag_challenge from '../../icon/챌린지.png';
import img_like from '../../icon/img-like.svg';
import img_unlike from '../../icon/img-unlike.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LiveUpApi from '../../apis/LiveUpApi';

const Box = styled.div`
  display: flex;
  width: 292px;
  height: 254px;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 24px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #E2E2E2;
`;

const MainText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #ffffff;
  font-size: 16px;
  height: 44px;
  font-weight: 500;
  line-height: 140%;
`;

const DeadLine = styled.div`
padding-bottom:8px;
color: #999999;
font-size: 12px;
font-weight: 400;
`

const Views = styled.div`
color: #848484; 
font-size: 12px; 
font-weight: 400
`
const PostBoxBlack = ({ popular, recruitment_field, status, deadline, title, view, like, growRoomId }) => {

  const [isActive, setIsActive] = useState(like);

  const handleLike = async (data) => {
    try{
      const response = await LiveUpApi.like(data);
      //console.log("좋아요 테스트", response);
      setIsActive(!isActive);
    }catch (error){
      console.error("좋아요 실패", error);
    }
  }

  const handleLikeClick = () => {
    handleLike(growRoomId);
  };

  const isLiked = () => {
    return isActive ? img_like : img_unlike;
  };

  const getStatus = () => {
    switch (status) {
      case '모집중':
        return tag_open;
      case '삭제':
        return tag_close;
      default:
        return '';
    }
  };

  const getRecruitmentTag = (recruitment_field) => {
    switch (recruitment_field) {
      case '스터디':
        return <img src={tag_study} alt="study" />;
      case '프로젝트':
        return <img src={tag_project} alt="project" />;
      case '챌린지':
        return <img src={tag_challenge} alt="challenge" />;
      default:
        return null;
    }
  };

  const formattedViews = view >= 1000 ? '999+' : view;

  return (
    <Box style={{ opacity: status === '삭제' ? 0.5 : 1 }}>
      <Link to={`/liveup/${growRoomId}`} style={{ textDecoration: 'none' }}>
        <div style={{ paddingBottom: '28px' }}>
          <div style={{ justifyContent: 'flex-start', gap: '10px', display: 'flex', paddingBottom: '20px' }}>
            {popular && <img src={tag_popular} alt="popular" />}
            {getRecruitmentTag(recruitment_field)}
            <img src={getStatus()} alt="Recruit Status" style={{ marginLeft: 'auto' }} />
          </div>
          <DeadLine>{`마감일 | ${deadline}`}</DeadLine>
          <MainText>{`${title}`}</MainText>
        </div>
      </Link>
      <div style={{ borderTop: '1px #E6E6E6 solid', marginTop: 'auto', padding: '12px 0px 14px 0px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', alignSelf: 'stretch' }}>
        <Views>{`조회수 ${formattedViews}회`}</Views>
        <img onClick={handleLikeClick} src={isLiked()} alt="Like" style={{ cursor: 'pointer' }} />
      </div>

    </Box>

  );
};

export default PostBoxBlack;
