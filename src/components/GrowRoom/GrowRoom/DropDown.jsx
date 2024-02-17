import React, { useState } from 'react';
import styled from 'styled-components';
import down from '../../../icon/arrow_dropdown.png';
import down_white from '../../../icon/arrow_down_white.png';
import DropDownOption from './DropDownOption';

const Container = styled.div`
  position: relative;
`;

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
  border: 1px solid ${({ isOpen }) => (isOpen ? '#00D749' : '#B0B0B0')};
  background: ${({ isOpen }) => (isOpen ? '#00D749' : '#FFF')};
  color: ${({ isOpen }) => (isOpen ? '#FFF' : '#3E3E3E')};
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  transition: transform 0.3s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const Dropdown = ({ title, optionsMap, options, onHeaderTitleChange }) => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState('');
  const [headerTitle, setHeaderTitle] = useState(title);

  const toggleMainDropdown = () => {
    setMainDropdownOpen(!mainDropdownOpen);
    setSelectedMain('');
  };

  const mainSelected = (option) => {
    if (!optionsMap) {
      setTimeout(() => {
        setMainDropdownOpen(false);
        setSelectedMain('');
        setHeaderTitle(option);//선택한 내용을 헤더에 넣음
        onHeaderTitleChange(option); //헤더 타이틀을 부모로 전달
      }, 500);
    } else {
      setSelectedMain(option);
    }
  };

  const detailSelected = (option) => {
    setTimeout(() => {
      setMainDropdownOpen(false);
      setSelectedMain('');
      setHeaderTitle(option); //선택한 내용을 헤더에 넣음
      onHeaderTitleChange(option); //헤더 타이틀을 부모로 전달
    }, 500);
  };

  return (
    <Container>
      <DropDownHeader isOpen={mainDropdownOpen} onClick={toggleMainDropdown}>
        {headerTitle}
        <ArrowIcon isOpen={mainDropdownOpen} src={mainDropdownOpen ? down_white : down} alt="drop down arrow" />
      </DropDownHeader>
      <DropDownContainer isOpen={mainDropdownOpen}>
        {mainDropdownOpen && optionsMap && (
          <DropDownOption options={Object.keys(optionsMap)} onClick={mainSelected} />
        )}
        {mainDropdownOpen && options && !optionsMap && (
          <DropDownOption options={options} onClick={mainSelected} />
        )}
        {selectedMain && (
          <DropDownOption options={optionsMap ? optionsMap[selectedMain] : options} onClick={detailSelected} />
        )}
      </DropDownContainer>
    </Container>
  );
};

export default Dropdown;
