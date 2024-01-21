import React, { useState } from 'react';
import styled from 'styled-components';
import MyCalendar from '../../components/MyPage/Calender/MyCalendar';
import { dummyEvents } from '../../DummyData';
import TodoList from '../../components/MyPage/TodoList';

import profile_img from '../../icon/profile_img.png';
import edit_icon from '../../icon/pencil_btn.png';

const MainWrapper = styled.div`
  width: 1220px;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
`;

const TodoWrapper = styled.div`
display: flex;
gap: 80px;
margin-bottom: 115px;
`
const ProfileWrapper = styled.div`
  justify-content: center;
  width: 245px;
  height: 282.4px;
  flex-direction: column;
  align-items: center;
`
const MainText = styled.p`
align-items: center;
font-size: 25px;
font-weight: 800;
line-height: 140%;
`

function MyPage() {
  const [events, setEvents] = useState(dummyEvents);

  const handleEventsChange = (newEvents) => {
    setEvents(newEvents);
  };

  return (
    <MainWrapper>
      <div style={{ marginBottom:'30px', display: 'inline-flex' }}>
        <MainText style={{ color: '#00D749' }}>그로우업 </MainText>
        <MainText style={{ color: '#090909' }}>님! 오늘도 화이팅 입니다!</MainText>
      </div>
      <TodoWrapper>
        <ProfileWrapper>
          <div style={{ textAlign: 'center', color: '#4F4F4F', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '22.40px' }}>누적 성장 시간</div>
          <div style={{ textAlign: 'center', color: '#4F4F4F', fontSize: 25, fontFamily: 'Pretendard', fontWeight: '800', lineHeight: '35px' }}>123 : 50 : 35</div>
        </ProfileWrapper>
        <TodoList />
      </TodoWrapper>
      <MyCalendar events={events} onEventsChange={handleEventsChange} />
    </MainWrapper>
  );
}

export default MyPage;
