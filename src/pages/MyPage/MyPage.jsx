import React, { useState } from 'react';
import styled from 'styled-components';
import MyCalendar from '../../components/MyPage/Calender/MyCalendar';
import TodoList from '../../components/MyPage/TodoList';
import { dummyTodo, dummyEvents } from '../../DummyData';
import profile_img from '../../icon/profile_img.png';
import pencil_btn from '../../icon/pencil_btn.png';

const MainWrapper = styled.div`
  width: 1220px;
  margin: 110px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderTextWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  text-align: center;
`;

const MainText = styled.p`
  font-size: 25px;
  font-weight: 800;
  line-height: 140%;
  height: 35px;
`;

const TodoAndProfileWrapper = styled.div`
  display: flex;
  gap: 80px;
  margin-bottom: 115px;
`;

const ProfileInfoWrapper = styled.div`
  width: 245px;
  height: 282.4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TimeInfoText = styled.div`
  color: #4F4F4F;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.40px;
  text-align: center;
`;

const TimeValueText = styled.div`
  color: #4F4F4F;
  font-size: 25px;
  font-weight: 800;
  line-height: 35px;
  text-align: center;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: fit-content;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 196px;
  height: auto;
`;

const PencilButton = styled.img`
  position: absolute;
  bottom: 7px;
  right: 20px;
  width: 33px;
  height: auto;
`;


function MyPage() {
  const [userData, setUserData] = useState(dummyTodo);
  const [events, setEvents] = useState(dummyEvents);

  const handleEventsChange = (newEvents) => {
    setEvents(newEvents);
  };

  return (
    <div>
      <div style={{width: 'auto', height: '40px', background: '#141414'}} />
    <MainWrapper>
      <HeaderTextWrapper>
        <MainText style={{ color: '#00D749' }}>{userData.userName} </MainText>
        <MainText style={{ color: '#090909' }}>님! 오늘도 화이팅 입니다!</MainText>
      </HeaderTextWrapper>
      <TodoAndProfileWrapper>
        <ProfileInfoWrapper>
          <ProfileContainer>
            <ProfileImage src={profile_img} alt="Profile" />
            <PencilButton src={pencil_btn} alt="Edit Profile" />
          </ProfileContainer>
          <TimeInfoText>누적 성장 시간</TimeInfoText>
          <TimeValueText>
            {userData.time}
          </TimeValueText>
        </ProfileInfoWrapper>
        <TodoList todoList={userData.todo} />
      </TodoAndProfileWrapper>
      <MyCalendar events={events} onEventsChange={handleEventsChange} />
    </MainWrapper>
    </div>
  );
}

export default MyPage;

