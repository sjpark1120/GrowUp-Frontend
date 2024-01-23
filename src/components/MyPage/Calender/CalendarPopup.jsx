import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import icon_check from '../../../icon/check.png';
import icon_check_circle from '../../../icon/check-circle.png'
import {processText} from '../../../common/utils/CalendarUtils'


const PopupWrapper = styled.div`
  position: absolute;
  width: 260px;
  background-color: #00D749;
  color: #FFF;
  padding: 1px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: #FFF;
  flex-grow: 1;
  overflow-y: auto;
  cursor: pointer;
  color: #8D8D8D;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  text-align: left;
  min-height: 1.5em;
`;


const EditableText = styled.textarea`
  width: 100%;
  padding: 8px 15px;
  background-color: #FFF;
  overflow-y: hidden;
  color: #8D8D8D;
  outline: none;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  resize: none;
  border-radius: 0px; 
  font-family: inherit;
  height: auto;
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

const CalendarPopup = ({ selectedDate, events, onClose, dayCellRef }) => {
    const [popupPosition, setPopupPosition] = useState({ top: null, left: null });
    const [isEditing, setIsEditing] = useState(false);
    const [popupEventText, setPopUpEventText] = useState('');
    const [EditingText, setEditingText] = useState(popupEventText);
    const [selectedColor, setSelectedColor] = useState(null);
    const popupRef = useRef(null);

    
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

    //초기 data 받아오기
    useEffect(() => {
      setPopUpEventText(events.map((event) => event.text).join('\n'));
      setSelectedColor(events[0]?.backgroundColor || '#FFF');
    }, [events]);

    //팝업 외부 클릭 시 팝업 닫힘.
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(event.target) &&
          !event.target.classList.contains('insidePopup')
        ) {
            onClose(popupEventText); //수정중에는 닫히면 날아감
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [popupEventText, onClose]);

    const handleTextClick = () => {
      setEditingText(popupEventText);
      setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setEditingText(e.target.value);
    };

    const handleColorButtonClick = (color) => {
      setSelectedColor(color);
    };

    const handleSave = () => {
      isEditing ? (
      setPopUpEventText(EditingText))
      :(
        setPopUpEventText(popupEventText)
      );
      setIsEditing(false);
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
          {isEditing ? (
            <>
              <EditableText
                className="insidePopup"
                value={EditingText}
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
              {processText(popupEventText)}
            </PopupBody>
          )}
          <BtnContainer>
            <EditButton style={{ marginRight: '5px' }}>
              <img src={icon_check_circle} alt="취소선적용" onClick={handleSave} />
            </EditButton>
            <EditButton
              style={{ backgroundColor: '#FFF', border: '2px solid #8D8D8D' }}
              onClick={() => handleColorButtonClick('#FFF')}
            />
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