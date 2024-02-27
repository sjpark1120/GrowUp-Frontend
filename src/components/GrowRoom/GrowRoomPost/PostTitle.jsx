import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';


const Container = styled.div`
  max-width: 1000px;
  display: flex;
  align-items: center;
  max-width: 1000px;
  padding: 10px 20px;
  margin: auto;
  border-bottom: solid 2px #B0B0B0;
  padding-bottom: 20px;
`;

const Circle = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #B0B0B0;
  margin-right: 15px;
`;
const ProfileImage = styled.img`
  width: 56px;
  border-radius:50%;
  height: 56px;
  margin-right:15px;
`;
const UserName = styled.div`
  font-weight: bold;
  color: #333;
  margin-right: 15px;
  border-right: solid 2px #B0B0B0;
  padding-right: 20px;
`;

const Deadline = styled.div`
  color: #B0B0B0;
  font-weight: 500;
`;

const Views = styled.div`
  color: #B0B0B0;
  font-weight: 600;
  font-size: 12px;
  padding-left: 550px;
  padding-right: 20px;
`;

const Like = styled.div`
  color: #B0B0B0;
  font-weight: 600;
  font-size: 12px;
`;

const WriteForm = styled.div`
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
`;

const TitleLeft = styled.div`
  max-width: 500px;
  display: flex;
  flex: 1;
  color: #B0B0B0;
  font-weight: 600;
  font-size: 15px;
  padding-left: 15px;
  p {
    margin-left: 200px;
    color: black;
  }
`;

const TitleRight = styled.div`
  max-width: 500px;
  display: flex;
  flex: 1;
  color: #B0B0B0;
  font-weight: 600;
  font-size: 15px;
  padding-left: 15px;
  p {
    margin-left: 200px;
    color: black;
  }
`;

const PostTitle = ({data}) => {
  const location = useLocation();
  const { state } = location || {};
  const {
    postId,
    nick_name,
    view,
    recruitment_field,
    number,
    period,
    startDate,
    endDate,
    categoryListDetail0,
    categoryListDetail1,
    categoryListDetail2,
    likedNumber,
  } = state || {};
  // data 비어 있으면 state 프롭을 사용
  const postData = data ? data : state;

  console.log('PostTitle.jsx파일에서 postData',postData)
  return (
    <div>
      <Container>
        <ProfileImage src={postData.photo_url} alt="Profile" />
        {postData ? (
          <>
            <UserName>{postData.nick_name}</UserName>
            <Deadline>{postData.period}</Deadline>
            <Views>조회수 : {postData.view}회</Views>
            <Like>관심등록 : {postData.likedNumber}회</Like>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </Container>
      <WriteForm>
        {postData ? (
          <>
            <TitleLeft>모집 구분<p>{postData.recruitment_field}</p></TitleLeft>
            <TitleRight>진행 기간<p>{`${postData.startDate} ~ ${postData.endDate}`}</p></TitleRight>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </WriteForm>
      <WriteForm>
        {postData ? (
          <>
            <TitleLeft>모집 인원<p>{postData.number}</p></TitleLeft>
            <TitleRight>진행 기간<p>{postData.period}</p></TitleRight>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </WriteForm>
      <WriteForm>
        {postData ? (
          <>
            <TitleLeft>진행 방식<p>{postData.recruitment_field}</p></TitleLeft>
            <TitleRight>카테고리
            <p>
              <span>{postData.categoryListDetail0}</span>{' '}
              <span>{postData.categoryListDetail1}</span>{' '}
              <span>{postData.categoryListDetail2}</span>
            </p>

            </TitleRight>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </WriteForm>
    </div>
  );
};

export default PostTitle;
