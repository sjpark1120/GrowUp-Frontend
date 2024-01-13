import React from 'react';
import styled from 'styled-components';

const DropDownContainer = styled.div`
  height : fit-content;
  width: 122px;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #B0B0B0;
  box-shadow: 0px 0px 50px 6px rgba(0, 0, 0, 0.1);
`;

const OptionContainer = styled.div`
  display: flex;
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  gap: 38px;
  border-bottom: 1px solid #B0B0B0;
  color: #B0B0B0;
  font-size: 14px;
  line-height: 140%;

  &:first-child {
    border-top: none;
  }

  &:last-child {
    border-bottom: none; 
  }
`;

const DropDownOption = ({ options, onClick }) => {
  return (
    <DropDownContainer>
      {options.map((option, index) => (
        <OptionContainer key={index} onClick={() => onClick(option)}>
          {option}
        </OptionContainer>
      ))}
    </DropDownContainer>
  );
};

export default DropDownOption;
