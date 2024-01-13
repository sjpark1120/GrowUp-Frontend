import React, { useState } from 'react';
import styled from 'styled-components';
import down from '../../icon/arrow_dropdown.png';
import DropDownOption from './DropDownOption';

const DropDownContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 5px;
`

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
`;

const Dropdown = ({ title, optionsMap, options}) => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [detailDropdownOpen, setDetailDropdownOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');

  const toggleMainDropdown = () => {
    setMainDropdownOpen(!mainDropdownOpen);
  };

  const mainSelected = (option) => {
    setSelectedMain(option);
    setDetailDropdownOpen(true);
  };

  const detailSelected = (option) => {
    setSelectedDetail(option);
    setMainDropdownOpen(false);
    setDetailDropdownOpen(false);
  };

  return (
      <div>
        <DropDownHeader onClick={toggleMainDropdown}>
          {title}
          <img src={down} alt="drop down arrow"/> 
        </DropDownHeader>
        <DropDownContainer>
        {mainDropdownOpen && (
          <DropDownOption options={Object.keys(optionsMap)} onClick={mainSelected} />
        )}
      {selectedMain && detailDropdownOpen && (
        <DropDownOption options={optionsMap[selectedMain]} onClick={detailSelected} />
      )}
      </DropDownContainer>
    </div>
  );
};

export default Dropdown;
