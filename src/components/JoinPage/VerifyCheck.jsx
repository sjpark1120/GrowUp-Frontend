import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const VerifyCheckContanier = styled.div`
  margin-top: 302px;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`
const VerifyCheckTitle = styled.h1`
  color: #090909;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  margin-bottom: 7px;
`

const VerifyCheckText = styled.pre`
color: #6A6A6A;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-bottom: 40px;
`
const VerifyCheckLine = styled.div`
width: 425px;
height: 1.333px;
background: #EFECFF;
margin-bottom: 30px;
margin-left: auto;
margin-right: auto;
`

const VerifyCheckBtn = styled.div`
margin-left: auto;
margin-right: auto;
border-radius: 5.333px;
background: #00D749;
width: 423px;
padding: 14px;
font-size: 25px;
font-style: normal;
font-weight: 800;
line-height: 140%;
color: white;
border: 0;
cursor: pointer;
`

function VerifyCheck({ title, text, btnText }) {
  const navigate = useNavigate()
  const onClickbtn = () => {
    navigate('/');
  }
  return (
    <VerifyCheckContanier>
      <VerifyCheckTitle>{title}</VerifyCheckTitle>
      <VerifyCheckText>{text}</VerifyCheckText>
      <VerifyCheckLine />
      <VerifyCheckBtn onClick={onClickbtn}>{btnText}</VerifyCheckBtn>
    </VerifyCheckContanier>
  )
}

export default VerifyCheck