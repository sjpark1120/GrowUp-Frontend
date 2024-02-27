import React from 'react'
import styled from 'styled-components'

const RankWrapper = styled.div`
  display: flex;
  min-width: 194px;
height: 80px;
padding: 10px 24px;
align-items: center;
gap: 10px;
`

const RankingNum = styled.h1`
  color:#00D749;
font-size: 25px;
font-weight: 800;
line-height: 140%;
display: inline;
`
const ProfileImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: ${props => props.src ? 'transparent' : 'gray'};
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const RankerName = styled.div`
  color: #FFF;
font-size: 12px;
font-weight: 600;
line-height: 140%;
`
const RankerTime = styled.div`
  color: #B0B0B0;
font-size: 12px;
font-weight: 600;
line-height: 140%;
`
function UserRanking({ rankingData, rank }) {
  return (
    <RankWrapper>
    <RankingNum>{rank}</RankingNum>
    <ProfileImg src={rankingData.photoUrl}/>
    <div>
      <RankerName>{rankingData.nickName}</RankerName>
      <RankerTime>{rankingData.totalTime}</RankerTime>
    </div>
    </RankWrapper>
  )
}

export default UserRanking