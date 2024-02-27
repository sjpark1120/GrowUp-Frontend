import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import banner from '../../icon/banner1.png'
import LiveUpNavigation from '../../components/LiveUpPage/LiveUpNavigation';
import RankingFilterBtn from '../../components/LiveUpPage/RankingFilterBtn';
import RankingBox from '../../components/LiveUpPage/RankingBox';
import LiveUpPagination from '../../components/LiveUpPage/LiveUpPagnation';
import LiveUpApi from '../../apis/LiveUpApi';
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #1c1c1c;
`

const BannerImg =styled.img`
  width: 100%;
  height: auto;
  margin-top: 122px;
  `;

const RankingContainer = styled.div`
  width: 1220px;
  height: 180px;
  margin-top: 160px;
`
const MyLiveUpContainer = styled.div`
  width: 1220px;
  margin-top: 150px;
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


function LiveUpPage() {
  const [posts, setPosts] = useState([]);
  const [rank, setRank] = useState([]);
  const [filter, setfilter] = useState("전체");
  const [rankFilter, setrankFilter] = useState('일간');
  const handleGetPost = async (data) => {
    try{
      const response = await LiveUpApi.getPosts(data);
      //console.log("테스트", response);
      setPosts(response.result)
    }catch (error){
      console.error("post 불러오기 실패", error);
    }
  }
  const handleGetRank = async (data) => {
    try{
      const response = await LiveUpApi.getRanking(data);
      //console.log("테스트", response);
      setRank(response.result.liveRoomDateTimeResList)
      console.log(response.result.liveRoomDateTimeResList)
    }catch (error){
      console.error("Rank 불러오기 실패", error);
    }
  }

  useEffect(()=>{
    handleGetPost(filter);
  },[filter])

  useEffect(()=>{
    handleGetRank(rankFilter);
  },[rankFilter])

  return (
    <MainWrapper>
      <BannerImg src={banner} alt="banner" />
      <RankingContainer>
        <RankingTitle>🥇LIVE UP 누적 랭킹</RankingTitle>
        <RankingFilterBtn rankFilter={rankFilter} setrankFilter={setrankFilter}/>
        <RankingBox data={rank}/>
      </RankingContainer>
      <MyLiveUpContainer>
        <MyLiveUpTitle>MY LIVE UP</MyLiveUpTitle>
        <LiveUpNavigation setfilter={setfilter}/>
        <LiveUpPagination data={posts}/>
      </MyLiveUpContainer>
    </MainWrapper>
  )
}

export default LiveUpPage