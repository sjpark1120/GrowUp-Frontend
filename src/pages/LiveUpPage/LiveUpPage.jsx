import React from 'react'
import styled from 'styled-components'
import banner from '../../icon/Banner.png'
import PostBoxBlack from '../../components/LiveUpPage/PostBoxBlack';
import UserRanking from '../../components/LiveUpPage/UserRanking';
import LiveUpNavigation from '../../components/LiveUpPage/LiveUpNavigation';
import RankingFilterBtn from '../../components/LiveUpPage/RankingFilterBtn';
import RankingBox from '../../components/LiveUpPage/RankingBox';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #1c1c1c;
`

const BannerImg =styled.div`
  background-image: url(${banner});
  width: 1920px;
  height: 511px;
  `;

const PostBoxContainer = styled.div`
  width: 100%;
  max-width: 1220px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;
  margin-top: 50px;
`

const RankingContainer = styled.div`
  width: 1220px;
  height: 180px;
  margin-top: 160px;
`
const MyLiveUpContainer = styled.div`
  width: 1220px;
  margin-top: 150px;
`
const RankingBtn = styled.button`
  border: 0;
  background-color: transparent;
  width: 57px;
  height: 42px;
  border: 1px solid #ffffff;
  border-radius: 30px;
  color: #ffffff;
  margin-right: 10px;
  cursor: pointer;
`
const RankingTitle = styled.h1`
  color:#FFF;
  font-size: 25px;
  font-weight: 800;
  line-height: 140%;
  display: inline;
  margin-right: 10px;
`

const MyLiveUpTitle = styled.h1`
  color: #FFF;
  font-size: 25px;
  font-weight: 800;
  line-height: 140%;
  display: inline;
`

const Paginaion = styled.div`
  margin-top: 150px;
  margin-bottom: 150px;
  display: flex;
  padding: 0px 360px;
  justify-content: center;
  align-items: center;
`
function LiveUpPage() {
  return (
    <MainWrapper>
      <BannerImg />
      <RankingContainer>
        <RankingTitle>🥇LIVE UP 누적 랭킹</RankingTitle>
        <RankingFilterBtn />
        <RankingBox />
      </RankingContainer>
      <MyLiveUpContainer>
      <MyLiveUpTitle>MY LIVE UP</MyLiveUpTitle>
      <LiveUpNavigation/>
      <PostBoxContainer>
        {Array.from({ length:12 }).map((_, idx) => (
          <PostBoxBlack key={idx}
            deadline= "2023.12.05"
            maintext= "이제 막 공부 시작한 디자이너와 프론트엔드 개발자를 구합니다! 어서 오세요요용"
            views= {1500}
            status= "open" //close or open
            like= "like" //like or unlike
            popular= {true}  //인기태그 표시 여부
            study= {true} //스터디 태그 표시 여부
          />
        ))}
      </PostBoxContainer>
      <Paginaion>글 목록 번호</Paginaion>
    </MyLiveUpContainer>
    </MainWrapper>
  )
}

export default LiveUpPage