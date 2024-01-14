import React, { useState } from 'react';
import styled from 'styled-components';

const DropDownContainer = styled.div`
 height: fit-content;
  top: 10px;
  width: 122px;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${({ selected }) => (selected ? '#00D749' : '#B0B0B0')};
  box-shadow: 0px 0px 50px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
`;
const OptionContainer = styled.div`
  display: flex;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 38px;
  background-color : ${({ selected }) => (selected ? '#F5FFF9' : '#FFF')};
  color: ${({ selected }) => (selected ? '#00D749' : '#B0B0B0')};
  border-bottom: 1px solid ${({ selected }) => (selected ? '#00D749' : '#B0B0B0')};
  border-top: ${({ selected }) => (selected ? '1px solid #00D749' : 'none')};};
  font-size: 14px;
  line-height: 140%;

  &:first-child {
    border-top: none;
    border-radius: 8px 8px 0px 0px;
  }

  &:last-child {
    border-bottom: none; 
    border-radius: 0px 0px 8px 8px;
  }
`;


const DropDownOption = ({ options, onClick }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onClick(option);
  };

  return (
    <DropDownContainer>
      {options.map((option, index) => (
        <OptionContainer
          key={index}
          selected={selectedOption === option}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </OptionContainer>
      ))}
    </DropDownContainer>
  );
};

export default DropDownOption;