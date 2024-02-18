import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SectionTitle from '../../components/GrowRoom/GrowRoomWrite/SectionTitle';
import Dropdown from '../../components/GrowRoom/GrowRoomWrite/WriteDropDown';
import DateRangePicker from '../../components/GrowRoom/GrowRoomWrite/DateRangePicker';
import WriteComponent from '../../components/GrowRoom/GrowRoomWrite/WriteComponent'; 

import { setApiForm } from '../../components/GrowRoom/GrowRoomWrite/apiData';
import { getDefaultBody } from '../../components/GrowRoom/GrowRoomWrite/apiData';
import GrowRoomWriteApi from '../../apis/GrowRoomWriteApi';


const All = styled.div`
margin-top:170px;
`;
const Writecomponentcontainer = styled.div`
height: 530px;
`;
const SubmitCancelcontainer = styled.div`
display: flex;
margin-left: auto; /* 오른쪽 정렬 추가 */
margin-top:20px;
`;
const WriteForm = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;
const Group1 = styled.div`
  display: flex;
  height: 130px;
  justify-content: center;
  align-items: flex-start;
  width: 1200px;
`;
const CategoryForm = styled.div`
  margin: 20px;
  width: 400px;

  h2 {
    font-size: 15px;
    margin-bottom: 15px;
  }

  input {
    width: 100%;
    height: 50px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:focus {
      outline: none;
      border: 2px solid #00D749;
    }
  }
  
`
const SubmitBtn = styled.button`
float: right;
border: 1px solid #00D749;
padding: 9px;
border-radius: 7px;
margin-right: 10px;
cursor: pointer;
color:white;
background-color:#00D749;
&:hover {
  background-color: #B0B0B0;
}
`;
  const CancelBtn = styled.button`
  float: right;
  border: 1px solid #B0B0B0;
  padding: 9px;
  border-radius: 7px;
  margin-right: 10px;
  cursor: pointer;
  background-color:white;
  &:hover {
    background-color: #B0B0B0;
  }
  `;

const select_category = ['스터디', '챌린지', '프로젝트'];
const people = [3, 5, 10, 15, 20 ,25, 30];
const progressPeriod = ['기간미정','1개월', '2개월', '3개월', '4개월', '5개월', '6개월 이상'];
const itmedia = ['가상현실', '인공지능 ', '데이터 분석', '사이버 보안', '모바일 앱', '웹 개발','소셜 미디어', '클라우드 컴퓨팅', '게임 개발', '블록 체인']
const sports = ['축구 ', '농구 ', '식단 ', '필라테스 ', '스포츠 심리학', '헬스 ','물리치료', '레크레이션 스포츠', '체육학', '수영']
const study = ['학교 시험', '토익 / 토플', '스피치', '기획', '한국사', '편집','자격증', '수능', '컴퓨터활용능력 ', '언어']
const art = ['시각디자인 ', '회화 ', '조소 ', '패션 ', '취미 미술', '일러스트레이션 ','캘리그라피 ', '뜨개질 ', '십자수 ', '소묘']
const project = ['비즈니스 아이디어', '코딩 대회', '연구 프로젝트', '디자인 공모전', '스타트업 창업','기획 공모전', '봉사 프로젝트', '문학 작품 공모전', '사진 공모전', '음악 경연']

function GrowRoomWritePage() {
    const navigate = useNavigate();
    
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [etcCategory, setEtcCategory] = useState('');

  const handleDateChange = ({ startDate, endDate }) => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEtcCategoryChange = (e) => {
    setEtcCategory(e.target.value);
  };
  
  const handleSubmitButtonClick = async () => {
    console.log('Submit button clicked!');
    setApiForm(title, content);

    try {
      console.log('서버에 보낼 데이터:', getDefaultBody());
      const response = await GrowRoomWriteApi.postWrite(getDefaultBody());
      const postId = response.growRoomId
      const nick_name = response.nick_name
      const view = response.view
      const recruitment_field = response.recruitment_field
      const number = response.number
      const period = response.period
      const startDate = response.startDate
      const endDate = response.endDate
      const categoryListDetail0 = response.categoryListDetail0
      const categoryListDetail1 = response.categoryListDetail1
      const categoryListDetail2 = response.categoryListDetail2
      const title = response.title
      const content = response.content
      const likedNumber = response.likedNumber




      navigate(`/growroom/${postId}`, { state: { 
        postId,nick_name,view,recruitment_field,number,period,startDate,endDate,
        categoryListDetail0,categoryListDetail1,categoryListDetail2,title,content,likedNumber
      } }); // 백틱(`)을 사용하여 수정
      console.log('메뉴 닫기');
    } catch (error) {
      console.error('서버에 선택된 값을 보내는 중 오류가 발생했습니다:', error);
    }
     //임의로 정함(서버에서 들고어가나 해야함)
  };




  const handleCancelButtonClick = () => {
    console.log('Cancel button clicked!');
    navigate('/growroom');
  };

  return (
    <All>
      <WriteForm>
        <SectionTitle>기본 정보를 입력해주세요</SectionTitle>
        <Group1>
          <CategoryForm>
            <h2>모집 구분</h2>
            <Dropdown title="스터디/챌린지/프로젝트" optionsMap={select_category} categoryType={1}/>
          </CategoryForm>
          <CategoryForm>
            <h2>모집 인원</h2>
            <Dropdown title="인원미정 ~ 10명 이상" optionsMap={people} categoryType={2}/>
          </CategoryForm>
        </Group1>
        <Group1>
          <CategoryForm>
            <h2>모집 기간</h2>
            <DateRangePicker onChangeDates={handleDateChange} />
          </CategoryForm>
          <CategoryForm>
            <h2>진행 기간</h2>
            <Dropdown title="기간미정 ~ 6개월 이상" optionsMap={progressPeriod} categoryType={3} />
          </CategoryForm>
        </Group1>
      </WriteForm>

      <WriteForm>
        <SectionTitle>카테고리를 지정 해주세요</SectionTitle>
        <Group1>
          <CategoryForm>
            <h2>IT미디어</h2>
            <Dropdown title="가상현실 / 인공지능 / 데이터분석 / 사이버보안/..." optionsMap={itmedia} categoryType={4} />
          </CategoryForm>
          <CategoryForm>
            <h2>스포츠/헬스</h2>
            <Dropdown title="축구 / 농구 / 식단 / 필라테스 / 스포츠 심리학/..." optionsMap={sports} categoryType={7} />
          </CategoryForm>
        </Group1>
        <Group1>
          <CategoryForm>
            <h2>공부/자격증</h2>
            <Dropdown title="학교 시험 / 토익 / 토플/  스피치 / 기획 /..." optionsMap={study} categoryType={5}/>
          </CategoryForm>
          <CategoryForm>
            <h2>미술/디자인</h2>
            <Dropdown title="시각디자인 / 회화 / 조소 / 패션 / 취미 미술/..." optionsMap={art} categoryType={8}/>
          </CategoryForm>
        </Group1>

        <Group1>
          <CategoryForm>
            <h2>공모전/프로젝트</h2>
            <Dropdown title="비즈니스 아이디어 / 코딩 대회 / 연구 프로젝트/..." optionsMap={project} categoryType={6} />
          </CategoryForm>
          <CategoryForm>
            <h2>기타 기입</h2>
            <input
                type="text"
                placeholder="카테고리를 직접 입력해 주세요"
                value={etcCategory}
                onChange={handleEtcCategoryChange}
            />
            </CategoryForm>

        </Group1>
      </WriteForm>
      <WriteForm>
      <SectionTitle>소개글을 작성해 주세요</SectionTitle>
      <Writecomponentcontainer>
        <Group1>
            <WriteComponent
            title={title}
            content={content}
            handleTitleChange={handleTitleChange}
            handleContentChange={handleContentChange}
            
        />
        </Group1>
        </Writecomponentcontainer>
        <SubmitCancelcontainer>
        <CancelBtn onClick={handleCancelButtonClick}>취소</CancelBtn> 
        <SubmitBtn onClick={handleSubmitButtonClick}>등록하기</SubmitBtn> 
        </SubmitCancelcontainer>
        
                  
      </WriteForm>
      
    </All>
  );
}

export default GrowRoomWritePage;
