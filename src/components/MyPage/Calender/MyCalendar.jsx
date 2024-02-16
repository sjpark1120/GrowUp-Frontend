import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import btn_left from '../../../icon/Page button_1.png';
import btn_right from '../../../icon/Page button_2.png';
import CalendarPopup from './CalendarPopup';

const CalendarWrapper = styled.div`
  width: 100%;
`;

const MonthHeader = styled.div`
  padding-bottom: 50px;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
  line-height: 140%;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekdayCell = styled.div`
  display: flex;
  height: 24px;
  padding: 2px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #00D749;
  margin-bottom: 15px;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

const DayCell = styled.div`
  position: relative;
  display: flex; 
  width: 170px;
  height: 200px;
  padding: 10px 12px;
  flex-direction: column;
  background-color: ${(props) =>
    props.isToday ? '#F5FFF9' : props.backgroundColor || '#FFF'};
  border-bottom: ${(props) => (props.isToday ? '1px solid #00D749' : '1px solid #F7F7F7')};
  border-top: ${(props) => (props.isToday ? '1px solid #00D749' : 'none')};
  border-right: ${(props) => (props.isToday ? '1px solid #00D749' : 'none')};
  border-left: ${(props) => (props.isToday ? '1px solid #00D749' : 'none')};
  color: ${(props) => (props.isCanceled ? '#8D8D8D' : '#8D8D8D')};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  text-decoration: ${(props) => (props.isCanceled ? 'line-through !important' : 'none')};


  &:hover {
    background-color: #f0f0f0;
  }
`;


const EventContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  flex-direction: column;
  text-align: left;
  margin-top: 5px;
`;

const NavigationButton = styled.img`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const colorMap = {
  'WHITE': '#FFF',
  'RED': '#FFE5E5',
  'PURPLE': '#EFECFF',
  'YELLOW': '#FFF7CA',
};

const MyCalendar = ({ calendarLists, onEventsChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [comments, setComments] = useState(calendarLists);

  const dayCellRef = useRef(null);

  useEffect(() => {
    setComments(calendarLists);
  }, [calendarLists]);

  //달력 생성
  const renderMonthGrid = () => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startDayOfWeek = firstDayOfMonth.getDay();

    const monthGrid = [];
    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDayOfWeek) || dayCount > daysInMonth) {
          week.push(null);
        } else {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayCount);
          week.push(date);
          dayCount++;
        }
      }

      monthGrid.push(week);
    }
    return monthGrid;
  };

  //DayCell 클릭
  const handleDayClick = (date) => {
    setShowPopup(false);
    setSelectedDate(date);
    setShowPopup(true);
  };

  //PopUp 닫을때
  const handleClosePopup = () => {
    setShowPopup(false);
    onEventsChange();
  };

  const getEventsForDate = (date) => {
    if (!date || !comments) {
      return [];
    }

    const eventsForDate = (comments || []).filter((event) => {
      const eventDate = new Date(event.day);
      return eventDate.toDateString() === date.toDateString();
    });

    return eventsForDate;
  };

  return (
    <CalendarWrapper>
      <MonthHeader>
        <NavigationButton onClick={() => setSelectedDate(prevDate => {
          const prevMonth = new Date(prevDate);
          prevMonth.setMonth(prevMonth.getMonth() - 1);
          return prevMonth;
        })} src={btn_left} alt="Previous Month" />

        {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`}

        <NavigationButton onClick={() => setSelectedDate(prevDate => {
          const nextMonth = new Date(prevDate);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          return nextMonth;
        })} src={btn_right} alt="Next Month" />

      </MonthHeader>
      <CalendarGrid>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
          <WeekdayCell key={index}>{day}</WeekdayCell>
        ))}
        {renderMonthGrid().map((week, weekIndex) => (
          week.map((date, dateIndex) => (
            <DayCell
              ref={date && date.getDate() === selectedDate.getDate() ? dayCellRef : null}
              key={dateIndex}
              onClick={() => date && handleDayClick(date)}
              backgroundColor={colorMap[getEventsForDate(date)[0]?.color] || '#FFF'}
              isToday={date && date.toDateString() === new Date().toDateString()}
              isCanceled={getEventsForDate(date)[0]?.status === 'NONACTIVE'}
            >
              {date && (
                <>
                  {date.toDateString() === new Date().toDateString() && (
                    <div
                      style={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#00D749',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#FFF',
                        fontWeight: 'bold',
                      }}
                    >
                      {date.getDate()}
                    </div>
                  )}
                  <div>{date.getDate()}</div>
                  <EventContainer>
                    {getEventsForDate(date).map((event, index) => (
                      <div key={index}>
                        {event.calenderInquiryLists.map((item, idx) => (
                          <div key={idx} style={{ textDecoration: item.status === 'NONACTIVE' ? 'line-through' : 'none' }}>
                            {item.comment}
                          </div>
                        ))}
                      </div>
                    ))}
                  </EventContainer>

                </>
              )}
            </DayCell>
          )))
        )}
      </CalendarGrid>
      {showPopup && (
        <CalendarPopup
          selectedDate={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={handleClosePopup}
          dayCellRef={dayCellRef}
        />
      )}
    </CalendarWrapper>
  );
};

export default MyCalendar;