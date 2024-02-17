import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import GrowRoomPostApi from '../../../apis/GrowRoomPostApi';

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

const PostTitle = ( ) => {
  const location = useLocation();
  const { state } = location || {};
  const { postId,nick_name,view,recruitment_field,number,period,startDate,endDate,
    categoryListDetail0,categoryListDetail1,categoryListDetail2,likedNumber } = state || {};


  return (
    <div>
      <Container>
        <Circle></Circle>
        {postId ? (
          <>
            <UserName>{nick_name}</UserName>
            <Deadline>{period}</Deadline>
            <Views>조회수 : {view}회</Views>
            <Like>관심등록 : {likedNumber}회</Like>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </Container>
      <WriteForm>
        {postId ? (
          <>
            <TitleLeft>모집 구분<p>{recruitment_field}</p></TitleLeft>
            <TitleRight>진행 기간<p>{`${startDate} ~ ${endDate}`}</p></TitleRight>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </WriteForm>
      <WriteForm>
        {postId ? (
          <>
            <TitleLeft>모집 인원<p>{number}</p></TitleLeft>
            <TitleRight>진행 기간<p>{period}</p></TitleRight>
          </>
        ) : (
          <p>No data found for the specified index</p>
        )}
      </WriteForm>
      <WriteForm>
        {postId ? (
          <>
            <TitleLeft>진행 방식<p>{recruitment_field}</p></TitleLeft>
            <TitleRight>카테고리
            <p>
              <span>{categoryListDetail0}</span>{' '}
              <span>{categoryListDetail1}</span>{' '}
              <span>{categoryListDetail2}</span>
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
