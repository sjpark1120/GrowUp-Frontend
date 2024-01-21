import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import icon_check from '../../../icon/check.png';
import icon_check_circle from '../../../icon/check-circle.png'

const PopupWrapper = styled.div`
  width: 260px;
  background-color: #00D749;
  color: #FFF;
  padding: 1px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;


const PopupHeader = styled.div`
display: flex;
justify-content: center;
color: #FFF;
text-align: center;
font-size: 18px;
font-weight: 600;
line-height: 140%;
margin-bottom: 8px;
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
margin-left: auto;
`;

const PopupBody = styled.div`
  width: 100%;
  padding: 8px 15px;
  background-color: #FFF;
  flex-grow: 1;
  overflow-y: auto;
  cursor: pointer;
  color: #8D8D8D;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  text-align: left;
`;


const EditableText = styled.textarea`
width: 100%;
padding: 8px 15px;
background-color: #FFF;
flex-grow: 1;
overflow-y: auto;
color: #8D8D8D;
font-size: 18px;
font-weight: 600;
line-height: 140%;
resize: none;
border-radius: 0px; 
font-family: inherit;
height: auto
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

const CalendarPopup = ({ selectedDate, events, onClose, position }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [popupEventText, setPopUpEventText] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    setPopUpEventText(events.map((event) => event.text).join('\n'));
  }, [events]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.classList.contains('insidePopup')
      ) {
        onClose(popupEventText);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, popupEventText, onClose]);

  
  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setPopUpEventText(e.target.value);
  };

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleClose = () => {
    onClose(popupEventText);
  };

  return (
    <PopupWrapper position={position}>

      <PopupHeader>
        {selectedDate.toLocaleDateString()}
        <CloseButton onClick={handleClose} src={icon_check} alt="Done" />
      </PopupHeader>
      {isEditing ? (
        <>
          <EditableText
            className="insidePopup"
            value={popupEventText}
            onChange={handleInputChange}
            style={{ backgroundColor: selectedColor }}
          />
        </>
      ) : (
        <PopupBody
          className="insidePopup"
          onClick={handleTextClick}
          style={{ backgroundColor: selectedColor }}
        >
          {popupEventText.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </PopupBody>
      )}
      <BtnContainer>
        <EditButton style={{ marginRight: '5px' }}>
          <img src={icon_check_circle} alt="취소선적용" onClick={handleSave} />
        </EditButton>
        <EditButton
          style={{ backgroundColor: '#FFE5E5' }}
          onClick={() => handleColorButtonClick('#FFE5E5')}
        />
        <EditButton
          style={{ backgroundColor: '#EFECFF' }}
          onClick={() => handleColorButtonClick('#EFECFF')}
        />
        <EditButton
          style={{ backgroundColor: '#FFF7CA' }}
          onClick={() => handleColorButtonClick('#FFF7CA')}
        />
      </BtnContainer>
    </PopupWrapper>
  );
};

export default CalendarPopup;