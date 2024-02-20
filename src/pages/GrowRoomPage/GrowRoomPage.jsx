import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import GrowRoomNavigation from '../../components/GrowRoom/GrowRoom/GrowRoomNavigation';
import { useNavigate } from 'react-router-dom';
import GrowRoomApi from '../../apis/GrowRoomApi'
import { useLike, LikeProvider } from '../../redux/LikeContext'; 

import banner from '../../icon/banner2.png'
import Dropdown from '../../components/GrowRoom/GrowRoom/DropDown';
import SearchBar from '../../components/GrowRoom/GrowRoom/SearchBar';
import PageNavigation from '../../components/GrowRoom/GrowRoom/PageNavigation';
import PopularPosts from '../../components/GrowRoom/GrowRoom/PopolarPosts';

const TopBanner =styled.img`
min-width: 1280px;
max-width: 100%;
height: auto;
margin-top: 122px;
  `;

const MainWrapper = styled.div`
  width: 1280px; //1220 + 60
  align-items: center;
  justify-content: center;
  margin: 160px auto;
  padding: 0px 30px;
`;

const Title = styled.h2`
  color: black;
  font-size: 25px;
  font-weight: 800;
  align-items: center;
`;

const Button = styled.button`
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  cursor: pointer;
`;

export const FilterBtn = styled(Button)`
  background: #FFF;
  border: 1px solid ${({ isActive }) => (isActive === '모집중' ? '#00D749' : '#B0B0B0')};
  color: ${({ isActive }) => (isActive === '모집중' ? '#00D749' : '#3E3E3E')};
`;


export const WriteBtn = styled(Button)`
  border: 1px solid #00D749;
  background: #00D749;
  color:#FFF;
  `;

const navigation = ['전체', '✨내 모집글', '💚관심글', '📂프로젝트', '✏️스터디', '🥇챌린지'];

const dropdown_feild = {
  'IT/미디어': ['가상현실', '인공지능', '데이터분석', '사이버 보안', '모바일 앱', '웹 개발', '소셜 미디어', '클라우드 컴퓨팅', '게임 개발', '블록 체인'],
  '공부/자격증': ['학교 시험', '토익/토플', '스피치', '기획', '한국사', '편집', '자격증', '수능', '컴퓨터활용능력', '언어'],
  '공모전/프로젝트': ['비즈니스 아이디어', '코딩 대회', '연구 프로젝트', '디자인 공모전', '스타트업 창업', '기획 공모전', '봉사 프로젝트', '문학 작품 공모전', '사진 공모전', '음악 경연'],
  '스포츠/헬스': ['축구', '농구', '식단', '필라테스', '스포츠 심리학', '헬스', '물리치료', '레크레이션 스포츠', '체육학', '수영'],
  '미술/디자인': ['시각디자인', '회화', '조소', '패션', '취미 미술', '일러스트레이션', '캘리그라피', '뜨개질', '십자수', '소묘'],
};

const dropdown_period=['1개월', '2개월', '3개월', '4개월', '5개월', '6개월 이상'];


const GrowRoomPage = () => {
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체'); 
  const [selectedPeriod, setSelectedPeriod] = useState('전체');
  const [isActive, setIsActive] = useState('전체');
  const [searchQuery, setSearchQuery] = useState(''); 
  const { like, updateLikeStatus } = useLike() || {}; 

  const handleButtonClick = () => {
    setIsActive((prevIsActive) => (prevIsActive === '전체' ? '모집중' : '전체'));
  };
  
  
  const handleNavItemChange = (item) => {
    setSelectedNavItem(item);
  };

  const handleCategoryChange = (updatedTitle) => {
    setSelectedCategory(updatedTitle);
  };

  const handlePeriodChange = (updatedTitle) => {
    setSelectedPeriod(updatedTitle);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  function removeEmojis(text) {
      const emojisToRemove = [
        '\u{2728}', // ✨
        '\u{1F49A}', // 💚
        '\u{1F4C2}', // 📂
        '\u{270F}\u{FE0F}', // ✏️
        '\u{1F947}', // 🥇
      ];
    

    const emojis = new RegExp(emojisToRemove.join('|'), 'gu');
    return text.replace(emojis, '');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedItem = removeEmojis(selectedNavItem);
  
        console.log('선택된 네비게이션: ', selectedItem, '/', selectedCategory, '/', selectedPeriod, '/', isActive, '/', searchQuery);
  
        const post = await GrowRoomApi.getPosts({
          filter: encodeURIComponent(selectedItem),
          categoryDetail: encodeURIComponent(selectedCategory),
          period: encodeURIComponent(selectedPeriod),
          status: encodeURIComponent(isActive),
          search: encodeURIComponent(searchQuery),
        });
  
        setPosts(post);
        setErrorMsg(null);
      } catch (error) {
        console.error('post 데이터 불러오기 실패:', error);
        if (error.response && error.response.data && error.response.data.code === 'GROWROOM4021') {
          setErrorMsg(`'${searchQuery}'에 대한 검색결과가 없습니다.`);
        } else {
          setErrorMsg('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      }
    };
  
    fetchData();
  }, [selectedNavItem, selectedCategory, selectedPeriod, isActive, searchQuery, like]);
  

  
  const navigate = useNavigate();
  const handleWriteButtonClick = () => {
    navigate('/growroom/write');
  };


  return (
    <LikeProvider>
    <div>
    <TopBanner src={banner} alt="banner" />
    <MainWrapper>
    <PopularPosts />
      <div style={{ paddingBottom: '50px', display: 'flex'}}>
        <Title>GROW ROOM </Title>
        <GrowRoomNavigation 
        navItems={navigation}
        selectedNavItem={selectedNavItem}
        onNavItemChange={handleNavItemChange}  />
      </div>
      
      <div style={{ paddingBottom: '30px', display: 'flex', gap: '10px'}}>
      <Dropdown 
        title="분야"
        optionsMap={dropdown_feild}
        onHeaderTitleChange={handleCategoryChange}
      />
      <Dropdown 
        title="기간"
        options={dropdown_period}
        onHeaderTitleChange={handlePeriodChange}
      />

      <FilterBtn isActive={isActive} onClick={handleButtonClick}>
        👀모집 중만 보기
      </FilterBtn>

      <div style={{display: 'flex', marginLeft:'auto', gap: '10px'}} >
        <SearchBar onSearch={handleSearch} />
        <WriteBtn onClick={handleWriteButtonClick}>글쓰기</WriteBtn>
      </div>

      </div>
      <PageNavigation data={posts} error={errorMsg}/>
    </MainWrapper>
    </div>
    </LikeProvider>
  );
};

export default GrowRoomPage;
