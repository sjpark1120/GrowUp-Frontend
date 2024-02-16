import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyCalendar from '../../components/MyPage/Calender/MyCalendar';
import TodoList from '../../components/MyPage/TodoList';
import profile_img from '../../icon/profile_img.png';
import pencil_btn from '../../icon/pencil_btn.png';
import { useNavigate } from 'react-router-dom';
import TodoListApi from '../../apis/TodoListApi';
import CalendarApi from '../../apis/CalendarApi';

const MainWrapper = styled.div`
  width: 1190px;
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
  const [userData, setUserData] = useState(null);
  const [TodoData, setTodoData] = useState(null);
  const [calendarData, setCalendarData] = useState(null);

  const fetchData = async () => {
    try {
      const userDataResponse = await TodoListApi.getProfile();
      const todoResponse = await TodoListApi.getTodo();
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const dateString = `${year}-${month}`;
      const calendarResponse = await CalendarApi.getCalendar(dateString);
      setTodoData(todoResponse);
      setUserData(userDataResponse);
      setCalendarData(calendarResponse.calenderMonthInquiryLists);
      console.log('유저데이터:', userDataResponse)
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 무한루프X

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/mypage/edit');
  };

  return (
    <div>
      <div style={{ width: 'auto', height: '40px', background: '#141414' }} />
      <MainWrapper>
      {userData && (
        <HeaderTextWrapper>
          <MainText style={{ color: '#00D749' }}>{userData.nickName} </MainText>
          <MainText style={{ color: '#090909' }}>님! 오늘도 화이팅 입니다!</MainText>
        </HeaderTextWrapper>
      )}
        <TodoAndProfileWrapper>
          <ProfileInfoWrapper>
            <ProfileContainer onClick={handleProfileClick}>
              <ProfileImage src={profile_img} alt="Profile" />
              <PencilButton src={pencil_btn} alt="Edit Profile" />
            </ProfileContainer>
            <TimeInfoText>누적 성장 시간</TimeInfoText>
            <TimeValueText>
              {"시간 어디서 받아오죠"}
            </TimeValueText>
          </ProfileInfoWrapper>
          <TodoList todoList={TodoData} />
        </TodoAndProfileWrapper>
        <MyCalendar calendarLists={calendarData} onEventsChange={fetchData} />
      </MainWrapper>
    </div>
  );
}

export default MyPage;
