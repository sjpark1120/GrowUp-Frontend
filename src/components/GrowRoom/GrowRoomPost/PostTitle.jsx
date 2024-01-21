// PostTitle.jsx
import React from 'react';
import styled from 'styled-components';

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
  margin-right : 15px;
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
  font-size:12px;
  padding-left: 550px;
  padding-right: 20px;
`;

const Like = styled.div`
color: #B0B0B0;
font-weight: 600;
font-size:12px;
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
  font-size:15px;
  padding-left: 15px;
  p{
    margin-left : 200px;
    color: black;
  }
`;
const TitleRight = styled.div`
max-width: 500px;
display: flex;
flex: 1;
  color: #B0B0B0;
  font-weight: 600;
  font-size:15px;
  padding-left: 15px;
  p{
    margin-left : 200px;
    color: black;
  }
`;
const PostTitle = ({ data, index }) => {
  
  const item = data.dummyData[index];
  const categoryItem = data.categoryDummyData[index];
  console.log(data)


  return (
    <div>
    <Container>
      <Circle></Circle>
      {item ? (
        <>
          <UserName>사용자</UserName>
          <Deadline>{item.deadline}</Deadline>
          <Views>조회수 : {item.views}회</Views>
          <Like>관심등록 : {item.like}회</Like>
          
        </>
      ) : (
        <p>No data found for the specified index</p>
      )}
    </Container>
<WriteForm>
  {categoryItem ? (
    <>
      <TitleLeft>모집 구분<p>{categoryItem.모집구분}</p></TitleLeft>
      <TitleRight>진행 기간<p>{`${categoryItem.startDate} ~ ${categoryItem.endDate}`}</p></TitleRight>
    </>
  ) : <p>No data found for the specified index</p>}
</WriteForm>
<WriteForm>
  {categoryItem ? (
    <>
      <TitleLeft>모집 인원<p>{categoryItem.모집인원}</p></TitleLeft>
      <TitleRight>진행 기간<p>{categoryItem.진행기간}</p></TitleRight>
    </>
  ) : <p>No data found for the specified index</p>}
</WriteForm>
<WriteForm>
  {categoryItem ? (
    <>
        <TitleLeft>진행 방식<p>라이브업</p></TitleLeft>
      <TitleRight>카테고리 
      <p>

    {categoryItem.IT미디어 && <span>{categoryItem.IT미디어}</span>}
    {categoryItem.스포츠헬스 && <span>{categoryItem.스포츠헬스}</span>}
    {categoryItem.공부자격증 && <span>{categoryItem.공부자격증}</span>}
    {categoryItem.미술디자인 && <span>{categoryItem.미술디자인}</span>}
    {categoryItem.공모전프로젝트 && <span>{categoryItem.공모전프로젝트}</span>}
    {categoryItem.기타기입 && <span>{categoryItem.기타기입}</span>}
  </p>
      </TitleRight>
    </>
  ) : <p>No data found for the specified index</p>}
</WriteForm>


    </div>
  );
};

export default PostTitle;
