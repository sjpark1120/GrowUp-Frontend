import React, { useState } from 'react';
import styled from 'styled-components';
import down from '../../../icon/arrow_dropdown.png';
import down_white from '../../../icon/arrow_down_white.png';
import WriteDropDownOption from './WriteDropDownOption';
import axios from 'axios'; // axios 라이브러리 추가

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
  height: 50px;
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

const WriteDropDown = ({ title, optionsMap, categoryType }) => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleMainDropdown = () => {
    setMainDropdownOpen(!mainDropdownOpen);
    setSelectedMain('');
    setSelectedCategory('');
  };

  const mainSelected = async (option, index) => {
    setSelectedMain(option);
    setSelectedCategory(categoryType);
    console.log('Main Selected Option:', option, 'Index:', index + 1, 'Category Type:', categoryType);
  
    // Main Selected Option이 1이면 recruitmentId 값을 index + 1로 설정
    const updatedRecruitmentId = option === 1 ? index + 1 : 1;
    const updatedNumberId = option === 2 ? index + 1 : 1;
    const updatedPeriodId = option === 2 ? index + 1 : 1;

  
    const accessToken = 'eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzA3MjM5ODM4LCJleHAiOjE3MDcyNDAxMzh9.5XpEeId4Euts5uNmv0HYtQS1L4--nznJiK734Fy15KI';
  
    const body = {
      recruitmentId: updatedRecruitmentId,
      numberId: updatedNumberId,
      periodId: updatedPeriodId,
      categoryDetailIds: [4, 5, 6],
      title: '제목 tedsfdst',
      content: '내용 tessdfsf',
    };
  
    try {
      const response = await axios.post(
        'https://dev.jojoumc.shop/growup/growroom',
        body, {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
  
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('서버에 선택된 값을 보내는 중 오류가 발생했습니다:', error);
    }
  
    // 선택된 값 보낸 후 메뉴 닫기
    setTimeout(() => {
      setMainDropdownOpen(false);
    }, 500);
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
