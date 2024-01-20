import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import btn_left from '../../../icon/Page button_1.png';
import btn_right from '../../../icon/Page button_2.png';
import CalendarPopup from '../CalendarPopup';

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
  align-items: center;
  gap: 5px;
  border-bottom: 1px solid #F7F7F7;
  background: #FFF;
  color: #8D8D8D;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;

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
  gap: 5px;
  flex-shrink: 0;
`;

const NavigationButton = styled.img`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const MyCalendar = ({ events, onEventsChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [eventText, setEventText] = useState('');

  const dayCellRef = useRef(null);

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

  const handleDayClick = (date) => {
    setShowPopup(false);
    setSelectedDate(date);
    setShowPopup(true);
    setEventText(getEventsForDate(date)[0]?.text || '');
  };

  const handleClosePopup = (updatedEventText) => {
    setShowPopup(false);
    const updatedEvents = events.map(event => {
      if (new Date(event.date).toDateString() === selectedDate.toDateString()) {
        return { ...event, text: updatedEventText };
      }
      return event;
    });
    onEventsChange(updatedEvents);
  };

  const getEventsForDate = (date) => {
    return events.filter(event => new Date(event.date).toDateString() === date.toDateString());
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
            >
              {date ? date.getDate() : ''}
              {date && (
                <EventContainer>
                  {getEventsForDate(date).map((event, index) => (
                    <div key={index}>{event.text}</div>
                  ))}
                </EventContainer>
              )}
            </DayCell>
          ))
        ))}
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
