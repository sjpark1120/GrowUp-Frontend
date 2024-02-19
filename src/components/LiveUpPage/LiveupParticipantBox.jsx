import styled from 'styled-components';

import img_bestup from '../../icon/BESTUP.png';
import img_7daysup from '../../icon/7days.png';
import img_calender from '../../icon/캘린더 공유.png';

import img_like from '../../icon/img-like.svg';
import img_unlike from '../../icon/img-unlike.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LiveUpApi from '../../apis/LiveUpApi';

const Box = styled.div`
  display: flex;
  width: 292px;
  height: 260px;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 24px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #4F4F4F;
`;

const Time = styled.div`
  overflow: hidden;
  color: #8D8D8D;
  height: 44px;
  width: 244px;
  letter-spacing: 6px;
  font-size: 46px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
  text-align: center;
`;

const UserImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: ${props => props.src ? 'transparent' : 'gray'};
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const UserNickName = styled.div`
  display: inline;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
`

function LiveupParticipantBox({ like, bestUp, sevenDaysUp, nickName, photoUrl, time, userId, participateId }) {
  //const [isActive, setIsActive] = useState(like);
  const [isActive, setIsActive] = useState(like);

  const handleLike = async (growRoomId, participateId) => {
    try{
      const response = await LiveUpApi.participantlike(growRoomId, participateId);
      //console.log("좋아요 테스트", response);
      setIsActive(!isActive);
    }catch (error){
      console.error("좋아요 실패", error);
      if(error.response && error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
    }
  }

  const handleLikeClick = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];
    handleLike(id, participateId);
  };

  const isLiked = () => {
    return isActive ? img_like : img_unlike;
  };

  return (
    <Box>
      <div style={{marginBottom: '28px', marginTop: 'auto'}}>
        <div style={{ justifyContent: 'flex-start', gap: '10px', display: 'flex', paddingBottom: '20px' }}>
          {bestUp && <img src={img_bestup} alt="bsetup" />}
          {sevenDaysUp && <img src={img_7daysup} alt="sevendaysup" />}
        </div>
        <UserProfile>
          <UserImg src={photoUrl}/>
          <UserNickName>{nickName}</UserNickName>
        </UserProfile>
        <Time>{time}</Time>
      </div>
      <div style={{ borderTop: '1px #4F4F4F solid', padding: '12px 0px 14px 0px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', alignSelf: 'stretch' }}>
        <img src={img_calender} alt="calender" style={{ cursor: 'pointer' }} />
        <img onClick={handleLikeClick} src={isLiked()} alt="Like" style={{ cursor: 'pointer' }} />
      </div>
    </Box>

  );
}

export default LiveupParticipantBox