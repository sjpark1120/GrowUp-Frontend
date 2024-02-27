// WriteComponent.jsx
import React from 'react';
import styled from 'styled-components';
import { setApiForm } from './apiData';


const Write = styled.div`
  height: 700px;
  width: 850px;
  align-items: center;
  margin-top: 30px;
  h4 {
    font-weight: 600;
  }
`;

const TitleInput = styled.input`
  width: 835px;
  height: 60px;
  padding: 8px;
  margin-bottom: 20px;
  margin-top: 10px;
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
    font-size: 15px;
  }
`;

const WriteComponent = ({
  title,
  content,
  handleTitleChange,
  handleContentChange,
  handleSubmitClick,
  handleCancelClick,
}) => {


  return (
    <Write>
      <h4>제목</h4>
      <TitleInput
        placeholder="제목을 입력해 주세요!"
        value={title}
        onChange={handleTitleChange}
      />
      <ContentInput
        placeholder="LIVE UP에 대해 소개해 주세요!"
        value={content}
        onChange={handleContentChange}
      />

    </Write>
  );
};

export default WriteComponent;