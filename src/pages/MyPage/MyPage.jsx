import React, { useState } from 'react';
import styled from 'styled-components';
import MyCalendar from '../../components/MyPage/Calender/MyCalendar';
import {dummyEvents} from '../../DummyData';

const MainWrapper = styled.div`
  width: 1220px;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
`;

function MyPage() {
  const [events, setEvents] = useState(dummyEvents);

  const handleEventsChange = (newEvents) => {
    setEvents(newEvents);
  };

  return (
    <MainWrapper>
      <MyCalendar events={events} onEventsChange={handleEventsChange} />
    </MainWrapper>
  );
}

export default MyPage;
