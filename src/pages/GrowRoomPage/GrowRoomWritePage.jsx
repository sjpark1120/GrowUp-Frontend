import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

const WriteForm = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const Title1 = styled.div`
  width: 850px;
  font-weight: 600;
  font-size: 18px;
  border-bottom: solid 2px #B0B0B0;
  padding-bottom: 20px;
`;

const Circle = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #00D749;
  margin-right: 15px;
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
  }
  input {
    width: 380px;
    height: 30px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    placeholder {
      color: #B0B0B0;
    }
    &:focus {
      outline: none;
      border: 2px solid #00D749;
    }
  }
  
`;

const SelectInput = styled.select`
  width: 400px;
  height: 50px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #B0B0B0;
  cursor: pointer;
  background-color: white;
  color: #B0B0B0;

  &:focus {
    outline: none;
    border: 2px solid #00D749;
    color: #00D749;
  }

  /*도대체 왜 옵션에 대한 css내용이 적용이 안되는거지??!!*/
  option {
    background-color: white; 
    color: black;
    height: 30px;
  }

  option[value=""] {
    display: none;
  }
`;


const DatePickerContainer = styled.div`
  .custom-datepicker-class {
    width: 380px;
    height:30px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: white;
    color: #B0B0B0;
    &:focus {
      outline: none;
      border: 2px solid #00D749;
      color: #00D749;
    }

    .react-datepicker-wrapper {
      width: 98%;
    }

    .react-datepicker__input-container {
      width: 98%;
    }

    .react-datepicker__input-container input {
      width: 100%;
      height: 35px;
      color: #B0B0B0;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: white;
    }
  }
  .react-datepicker__portal {
    width: 100%;
  }

  .react-datepicker__header {
    background-color: white; 
    border-bottom: none; 
    margin-top:14px;
  }
  .react-datepicker__day-name {
    color: #00D749;
  }

  .react-datepicker__day {
    color: black;
    &:hover {
      background-color:#00D749;
      color: white;
      border-radius: 10px;
    }
  }

  .react-datepicker__day--selected {
    background-color: #00D749; 
    color: white; 
    border-radius: 10px; 
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    margin-bottom: 10px;
  }

  .react-datepicker__current-month::before {
    content: attr(data-test);
    margin-right: 15px;
  }

  .react-datepicker__month {
    margin: 10px;
  }

  .react-datepicker__week {
    margin-bottom: 10px;
  }

  .react-datepicker__day--outside-month {
    color: #B0B0B0;
  }

  .react-datepicker__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const Write = styled.div`
  height: 700px;
  width: 850px;
  align-items: flex-start;
`;

const TitleInput = styled.input`
  width: 835px;
  height: 30px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #B0B0B0;
  &:focus {
    outline: none;
    border: 2px solid #00D749;
  }
  &::placeholder {
    font-weight: 600;
    color: #B0B0B0;
  }

`;

const ContentInput = styled.textarea`
width: 835px;
  height: 350px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #B0B0B0;
  resize: none;
  &:focus {
    outline: none;
    border: 2px solid #00D749;
  }
  &::placeholder {
    font-weight: 600;
    color: #B0B0B0;
    font-size : 15px;
  }
`;
const CancelButton = styled.button`
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

const SubmitButton = styled.button`
  float: right;
  background-color: #00D749;
  margin-right: 9px;
  color: white;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
  border : none;
  &:hover {
    background-color: #B0B0B0;
  }
`;


function GrowRoomWritePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [recruitmentPeriod, setRecruitmentPeriod] = useState(new Date());
  const [progressPeriod, setProgressPeriod] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [itCategory, setItCategory] = useState('');
  const [sportsCategory, setSportsCategory] = useState('');
  const [studyCategory, setStudyCategory] = useState('');
  const [artCategory, setArtCategory] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [otherCategory, setOtherCategory]=useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(e.target.value);
  };

  const handleRecruitmentPeriodChange = (date) => {
    setRecruitmentPeriod(date);
  };

  const handleProgressPeriodChange = (e) => {
    setProgressPeriod(e.target.value);
  };

  const handleDatePickerButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleItCategoryChange = (e) => {
    setItCategory(e.target.value);
  };

  const handleSportsCategoryChange = (e) => {
    setSportsCategory(e.target.value);
  };

  const handleStudyCategoryChange = (e) => {
    setStudyCategory(e.target.value);
  };

  const handleArtCategoryChange = (e) => {
    setArtCategory(e.target.value);
  };

  const handleProjectCategoryChange = (e) => {
    setProjectCategory(e.target.value);
  };

  const handleOtherCategoryChange = (e) => {
    setOtherCategory(e.target.value);
  };

  const handleCancelClick = () => {
    // 취소 버튼을 눌렀을 때 실행되는 코드 작성
    console.log('Cancel button clicked!');
  };

  const handleSubmitClick = () => {
    // 등록하기 버튼을 눌렀을 때 실행되는 코드 작성
    console.log('Submit button clicked!');
  };

  return (
    <div className='all'>
      <WriteForm>
        <Title1>
          <Circle></Circle>
          기본 정보를 입력해주세요
        </Title1>

        <Group1>
          <CategoryForm>
            <h2>모집 구분</h2>
            <SelectInput value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">스터디/챌린지/프로젝트</option>
              <option value="스터디">스터디</option>
              <option value="챌린지">챌린지</option>
              <option value="프로젝트">프로젝트</option>
            </SelectInput>
          </CategoryForm>
          <CategoryForm>
            <h2>모집 인원</h2>
            <SelectInput value={numberOfPeople} onChange={handleNumberOfPeopleChange}>
              <option value="">인원미정 ~ 10명 이상</option>
              <option value="인원미정">인원미정</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10명 이상'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>
          
        </Group1>

        <Group1>
        <CategoryForm>
            <h2>모집 기간</h2>
            <DatePickerContainer>
              <div onClick={handleDatePickerButtonClick}>
                <DatePicker
                  selected={recruitmentPeriod}
                  onChange={handleRecruitmentPeriodChange}
                  className="custom-datepicker-class"
                  show={showDatePicker}
                />
              </div>
            </DatePickerContainer>
          </CategoryForm>

          <CategoryForm>
            <h2>진행 기간</h2>
            <SelectInput value={progressPeriod} onChange={handleProgressPeriodChange}>
              <option value="">기간미정 ~ 6개월 이상</option>
              <option value="기간미정">기간미정</option>
              {['1개월', '2개월', '3개월', '4개월', '5개월', '6개월 이상'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>
        </Group1>
      </WriteForm>

      <WriteForm>
        <Title1>
          <Circle></Circle>
          카테고리를 지정해주세요
        </Title1>

        <Group1>
        <CategoryForm>
            <h2>IT미디어</h2>
            <SelectInput value={itCategory} onChange={handleItCategoryChange}>
              <option value="">
              가상현실 / 인공지능 / 데이터분석 / 사이버보안/...</option>
              {['스터디', '인공지능 ', '데이터 분석', '사이버 보안', '모바일 앱', '웹 개발',
               '소셜 미디어', '클라우드 컴퓨팅', '게임 개발', '블록 체인'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>

          <CategoryForm>
            <h2>스포츠/헬스</h2>
            <SelectInput value={sportsCategory} onChange={handleSportsCategoryChange}>
              <option value="">축구 / 농구 / 식단 / 필라테스 / 스포츠 심리학/...</option>
              {['축구 ', '농구 ', '식단 ', '필라테스 ', '스포츠 심리학', '헬스 ', 
              '물리치료', '레크레이션 ', '스포츠 체육학', '수영'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>
        </Group1>

        <Group1>
        <CategoryForm>
            <h2>공부/자격증</h2>
            <SelectInput value={studyCategory} onChange={handleStudyCategoryChange}>
              <option value="">학교 시험 / 토익 / 토플/  스피치 / 기획 /...</option>
              <option value="인원미정">인원미정</option>
              {['학교 시험', '토익 / 토플', '스피치', '기획', '한국사', '편집', 
              '자격증', '수능', '컴퓨터활용능력 ', '언어'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>

          <CategoryForm>
            <h2>미술/디자인</h2>
            <SelectInput value={artCategory} onChange={handleArtCategoryChange}>
              <option value="">시각디자인 / 회화 / 조소 / 패션 / 취미 미술/...</option>
              {['시각디자인 ', '회화 ', '조소 ', '패션 ', '취미 미술', '일러스트레이션 ', 
              '캘리그라피 ', '뜨개질 ', '십자수 ', '소묘'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>
        </Group1>
        <Group1>
        <CategoryForm>
            <h2>공모전/프로젝트</h2>
            <SelectInput value={projectCategory} onChange={handleProjectCategoryChange}>
              <option value="">비즈니스 아이디어 / 코딩 대회 / 연구 프로젝트/...</option>
              {['비즈니스 아이디어', '코딩 대회', '연구 프로젝트', '디자인 공모전', '스타트업 창업',
               '기획 공모전', '봉사 프로젝트', '문학 작품 공모전', '사진 공모전', '음악 경연'].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </SelectInput>
          </CategoryForm>

          <CategoryForm>
            <h2>기타기입</h2>
            <input 
            type = "text"
            value={otherCategory} 
            onChange={handleOtherCategoryChange}
            placeholder="카테고리를 입력해 주세요"
            />
          </CategoryForm>
        </Group1>
        
      </WriteForm>
      <WriteForm>
        <Title1>
          <Circle></Circle>
          소개글을 작성해 주세요
        </Title1>
        <Write>
          <h4>제목</h4>
          <TitleInput placeholder="제목을 입력해 주세요!" />
          <ContentInput placeholder="LIVE UP에대해 소개해 주세요!" />
          <SubmitButton onClick={handleSubmitClick}>등록하기</SubmitButton>
          <CancelButton onClick={handleCancelClick}>취소</CancelButton>
          
        </Write>

      </WriteForm>

    </div>
  );
}

export default GrowRoomWritePage;
