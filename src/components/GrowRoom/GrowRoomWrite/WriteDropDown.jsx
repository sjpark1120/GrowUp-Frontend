// WriteDropDown.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import down from '../../../icon/arrow_dropdown.png';
import down_white from '../../../icon/arrow_down_white.png';
import WriteDropDownOption from './WriteDropDownOption';

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
  width: 400px;
  height:  50px;
  padding: 6px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ isOpen }) => (isOpen ? '#00D749' : '#B0B0B0')};
  background: ${({ isOpen }) => (isOpen ? 'linear-gradient(0deg, #F5FFF9, #F5FFF9)' : '#FFF')};
  color: ${({ isOpen }) => (isOpen ? '#00D749' : '#3E3E3E')};
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  transition: transform 0.3s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const WriteDropDown = ({ title, optionsMap ,categoryType }) => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const toggleMainDropdown = () => {
    setMainDropdownOpen(!mainDropdownOpen);
    setSelectedMain('');
    setSelectedCategory('');
  };

  const mainSelected = (option) => {
    setSelectedMain(option);
    setSelectedCategory(categoryType);
    console.log('Main Selected Option:', option, 'Category Type:', categoryType);
    

    saveToServer(option, categoryType);

    setTimeout(() => {
      setMainDropdownOpen(false);
    }, 500);
  };

  const saveToServer = (selectedOption, selectedCategory) => {
    // 선택된 항목과 카테고리를 서버에 저장하기 위한 비동기 요청 보내기
    fetch('/api/saveOption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOption, selectedCategory }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버로부터의 응답 처리 (필요한 경우)
        console.log('서버 응답:', data);
      })
      .catch((error) => {
        console.error('옵션을 서버에 저장하는 중 오류가 발생했습니다:', error);
      });
  };
  return (
    <Container>
      <DropDownHeader isOpen={mainDropdownOpen} onClick={toggleMainDropdown}>
        {selectedMain || title}
        <ArrowIcon isOpen={mainDropdownOpen} src={mainDropdownOpen ? down_white : down} alt="drop down arrow" />
      </DropDownHeader>
      <DropDownContainer isOpen={mainDropdownOpen}>
        {mainDropdownOpen && optionsMap && (
          <WriteDropDownOption options={optionsMap} onClick={mainSelected} categoryType={categoryType} />
        )}
      </DropDownContainer>
    </Container>
  );
};

export default WriteDropDown;
