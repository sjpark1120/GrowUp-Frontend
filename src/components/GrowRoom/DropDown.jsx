import React, { useState } from 'react';
import styled from 'styled-components';
import down from '../../icon/arrow_dropdown.png';
import DropDownOption from './DropDownOption';

const Container = styled.div`
  position: relative;
`
const DropDownContainer = styled.div`
  position: absolute;
  top: 100%; 
  display: flex;
  padding-top: 10px;
  gap: 5px;
`;

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

const Dropdown = ({ title, optionsMap, options }) => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [detailDropdownOpen, setDetailDropdownOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState('');

  const toggleMainDropdown = () => {
    setMainDropdownOpen(!mainDropdownOpen);
    setDetailDropdownOpen(optionsMap ? true : false);
  };

  const mainSelected = (option) => {
    setSelectedMain(option);
    if (!optionsMap) {
      setMainDropdownOpen(false);
    }
  };

  const detailSelected = (option) => {
    setSelectedMain('');
    setDetailDropdownOpen(false);
    setMainDropdownOpen(false);
  };

  return (
    <Container>
      <DropDownHeader onClick={toggleMainDropdown}>
        {title}
        <img src={down} alt="drop down arrow" />
      </DropDownHeader>
      <DropDownContainer>
        {mainDropdownOpen && optionsMap && (
          <DropDownOption options={Object.keys(optionsMap)} onClick={mainSelected} />
        )}
        {mainDropdownOpen && options && !optionsMap && (
          <DropDownOption options={options} onClick={mainSelected} />
        )}
        {selectedMain && detailDropdownOpen && (
          <DropDownOption options={optionsMap ? optionsMap[selectedMain] : options} onClick={detailSelected} />
        )}
      </DropDownContainer>
    </Container>
  );
};

export default Dropdown;
