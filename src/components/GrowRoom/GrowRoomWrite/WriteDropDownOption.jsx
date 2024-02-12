// WriteDropDownOption.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const DropDownContainer = styled.div`
  position: relative;
  width: 400px;
  height: fit-content;

  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #B0B0B0;
  box-shadow: 0px 0px 50px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;a

  ${({ selected }) =>
    selected &&
    css`
      border-color: #00D749;
    `}
`;

const OptionContainer = styled.div`
  position: relative;
  display: flex;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 38px;
  background-color: ${({ selected }) => (selected ? '#F5FFF9' : '#FFF')};
  color: ${({ selected, selectedOption }) => (selected ? '#00D749' : selectedOption !== null ? '#B0B0B0' : '#3E3E3E')};
  border-bottom: 1px solid #B0B0B0;
  font-size: 14px;
  line-height: 140%;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
  z-index: 1;
  &:first-child {
    border-top: none;
    border-radius: 8px 8px 0px 0px;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0px 0px 8px 8px;
  }

  &:hover {
    background-color: #F3F3F3;
  }

  &:active {
    background-color: #F5FFF9;
    color: #00D749;
  }

  ${({ selected }) =>
    selected &&
    css`
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #00D749;
      }
      &::before {
        top: -1px;
      }
      &::after {
        bottom: -1px;
      }
    `}
`;

const WriteDropDownOption = ({ options, onClick, categoryType,onClose  }) => {
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionClick = (option, index) => {
      setSelectedOption(option);
      onClick(option,index, categoryType); // 선택된 옵션과 categoryType을 함께 전달
      onClose();
    };
  
    return (
      <DropDownContainer selected={selectedOption !== null}>
        {options.map((option, index) => (
          <OptionContainer
            key={index}
            selected={selectedOption === option}
            selectedOption={selectedOption}
            onClick={() => handleOptionClick(option,index)}
          >
            {option}
          </OptionContainer>
        ))}
      </DropDownContainer>
    );
  };
export default WriteDropDownOption;