import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import icon_check from '../../../icon/check.png';
import icon_check_circle from '../../../icon/check-circle.png';
import CalendarApi from '../../../apis/CalendarApi';

const PopupWrapper = styled.div`
  position: absolute;
  width: 260px;
  background-color: #00D749;
  color: #FFF;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #00D749;
`;

const PopupHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  margin: 3px;
  width: 100%;
`;

const CloseButton = styled.img`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  position: absolute;
  right:0;
  margin-right:5px;
`;

const PopupBody = styled.div`
  width: 100%;
  padding: 8px 15px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#FFF'};
  overflow-y: auto;
  cursor: pointer;
  color: #8D8D8D;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  text-align: left;
  min-height: 1.5em;
`;


const EditableText = styled.input`
  width: 100%;
  padding: 3px 10px;
  margin-bottom: 8px;
  background-color: #FFF;
  color: #8D8D8D;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  resize: none;
  font-family: inherit;
  height: auto;
  white-space: pre-line;
  border: 1px solid #CCC;
  border-radius: 0;
  
  &:focus {
    border-color: #269FE4;
    outline: none;
  }
`;

const EventItem = styled.div`
  text-decoration: ${({ isCanceled }) => isCanceled ? 'line-through' : 'none'};
  cursor: pointer;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  align-items: flex-start;
  padding-top : 8px;
  gap: 8px;
  flex-direction: row;
  background: #FFF;
`

const EditButton = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
`

const CalendarPopup = ({ selectedDate, onClose, dayCellRef }) => {
  const [popupPosition, setPopupPosition] = useState({ top: null, left: null });
  const [inputText, setInputText] = useState('');
  const [popupEventText, setPopUpEventText] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [eventIds, setEventIds] = useState([]);
  const [isEventDone, setIsEventDone] = useState(false);
  const [isEditingExistingEvent, setIsEditingExistingEvent] = useState(false);
  const popupRef = useRef(null);
  const dateString = selectedDate.toLocaleDateString('en-CA');

  const colorMap = {
    'WHITE': '#FFF',
    'RED': '#FFE5E5',
    'PURPLE': '#EFECFF',
    'YELLOW': '#FFF7CA',
  };

  useEffect(() => {
    const calculatePopupPosition = () => {
      if (dayCellRef.current) {
        const rect = dayCellRef.current.getBoundingClientRect();
        setPopupPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    calculatePopupPosition();

    window.addEventListener('scroll', calculatePopupPosition);

    return () => {
      window.removeEventListener('scroll', calculatePopupPosition);
    };
  }, [dayCellRef]);
  
  useEffect(() => {
    const getPopupData = async () => {
      try {
        const response = await CalendarApi.getPopup(dateString);
        updateClientState(response);
      } catch (error) {
        console.error('Error in getPopup:', error);
      }
    };
  
    getPopupData();
  }, [dateString]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.classList.contains('insidePopup')
      ) {
        onClose(popupEventText, selectedColor);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupEventText, onClose, selectedColor]);

  const handleEventClick = (index) => {
    if (selectedEventIndex === eventIds[index]) {
      setSelectedEventIndex(null);
      setInputText('');
      setIsEditingExistingEvent(false);
    } else {
      setSelectedEventIndex(eventIds[index]);
      setInputText(popupEventText.split('\n')[index]);
      setIsEditingExistingEvent(true);
    }
  };
  const handleColorButtonClick = async (colorName) => {
    try {
      const selectedColorCode = colorMap[colorName];
      const requestData = { day: dateString, color: colorName };
      await CalendarApi.modifyColor(requestData);
      setSelectedColor(selectedColorCode);
      const updatedEventData = await CalendarApi.getPopup(dateString);
      updateClientState(updatedEventData);
      console.log('배경색을 '+colorName+'(으)로 변경했습니다.');
    } catch (error) {
      console.error('배경색 변경 실패:', error);
    }
  };
  
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTextKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        if (inputText.trim() === '') {
          // 입력 내용이 비어 있는 경우에는 deleteEvent 호출
          await deleteEventData();
        } else {
          // 입력 내용이 있는 경우에는 saveEventData 호출
          await saveEventData();
        }
      } catch (error) {
        console.error('이벤트 저장 실패:', error);
      }
    }
  };
  
  const deleteEventData = async () => {
    try {
      await CalendarApi.deleteEvent(selectedEventIndex);
      console.log('이벤트가 삭제되었습니다.');
  
      const updatedEventData = await CalendarApi.getPopup(dateString);
      updateClientState(updatedEventData);
    } catch (error) {
      console.error('이벤트 삭제 실패:', error);
    }
  };
  
  const saveEventData = async () => {
    if (isEditingExistingEvent) {
      const eventData = {
        calenderId: selectedEventIndex,
        comment: inputText,
      };
      await CalendarApi.modifyEvent(eventData);
      console.log('이벤트가 수정되었습니다.');
    } else {
      const eventData = {
        day: dateString,
        comment: inputText,
      };
      await CalendarApi.postEvent(eventData);
      console.log('새로운 이벤트가 추가되었습니다: ', inputText);
    }

    const updatedEventData = await CalendarApi.getPopup(dateString);
    updateClientState(updatedEventData);

    setInputText('');
  };

  const handleSave = async () => {
    try {
      if (isEditingExistingEvent) {
        await CalendarApi.modifyStatus(selectedEventIndex);
        console.log('취소선이 적용되었습니다.');

        const updatedEventData = await CalendarApi.getPopup(dateString);
        updateClientState(updatedEventData);
      }
    } catch (error) {
      console.error('취소선 적용 실패:', error);
    }
  };

  const updateClientState = (updatedEventData) => {
    if (updatedEventData.isSuccess) {
      const { calenderInquiryLists, color } = updatedEventData.result;
      const eventText = calenderInquiryLists.map(list => list.comment).join('\n');
      setPopUpEventText(eventText);
      setSelectedColor(color);
      setEventIds(calenderInquiryLists.map(list => list.calenderId));
      const areEventsDone = calenderInquiryLists.map(event => event.status === 'NONACTIVE');
      setIsEventDone(areEventsDone);
    } else {
      console.error('Error in getPopup:', updatedEventData.message);
    }
  };

  const handleClose = () => {
    onClose(popupEventText, selectedColor);
  };

  return (
    <PopupWrapper style={popupPosition} ref={popupRef}>
      <PopupHeader>
        {selectedDate.toLocaleDateString()}
        <CloseButton onClick={handleClose} src={icon_check} alt="Done" />
      </PopupHeader>
      <PopupBody backgroundColor={colorMap[selectedColor]}>
        <EditableText
          className="insidePopup"
          value={inputText}
          onChange={handleTextChange}
          onKeyPress={handleTextKeyPress}
        />
        {popupEventText.split('\n').map((eventText, index) => (
          <EventItem
  key={index}
  isCanceled={isEventDone[index]}
  onClick={() => handleEventClick(index)}
  style={{
    fontWeight: selectedEventIndex === eventIds[index] ? 'bold' : 'normal',
    color: selectedEventIndex === eventIds[index] ? '#4F4F4F' : '#8D8D8D'
  }}
>
  {eventText}
</EventItem>

        ))}
      </PopupBody>
      <BtnContainer>
        <EditButton style={{ marginRight: '5px' }}>
          <img src={icon_check_circle} alt="취소선적용" onClick={handleSave} />
        </EditButton>
        {Object.keys(colorMap).map((colorName) => (
          <EditButton 
            key={colorName}
            style={{ backgroundColor: colorMap[colorName],  border: '1px solid #CCC' }}
            onClick={() => handleColorButtonClick(colorName)}
          />
        ))}
      </BtnContainer>
    </PopupWrapper>
  );
};

export default CalendarPopup;