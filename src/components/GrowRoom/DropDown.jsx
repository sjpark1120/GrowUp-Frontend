import React, { useState } from 'react';
import styled from 'styled-components';
import down from '../../icon/arrow_dropdown.png';

const DropDownHeader = styled.div`
    display: flex;
    width: 107px;
    height: 42px;
    padding: 6px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    border: 1px solid #B0B0B0;
    background: #FFF;
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
`

const DropDownContainer = styled.div`
  width: 122px;
  margin-top:20px;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 8px;
  border: 1px solid #B0B0B0;
  box-shadow: 0px 0px 50px 6px rgba(0, 0, 0, 0.1);
`
const OptionContainer = styled.div`
  display: flex;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 38px;
  align-self: stretch;
  border-bottom: 1px solid #B0B0B0;

  color: #B0B0B0;

  font-size: 14px;
  font-weight: 500;
  line-height: 140%;

`
const CustomDropdown = ({ options, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(!isOpen);
    setSelectedValue(option);
  };

  return (
    <div className="custom-dropdown">
      <DropDownHeader onClick={toggleDropdown}>
        {title}
        <img src={down} alt="drop down arrow"/>
      </DropDownHeader>
      {isOpen && (
        <DropDownContainer>
          {options.map((option, index) => (
            <OptionContainer
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </OptionContainer>
          ))}
        </DropDownContainer>
      )}
    </div>
  );
};

export default CustomDropdown;
