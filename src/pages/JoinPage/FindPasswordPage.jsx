import React from 'react'
import styled from 'styled-components'

const FindPasswordContainer = styled.div`
  margin-top: 180px;
  width: 500px;
  height: 387px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const FindPasswordTitle = styled.h1`
  color: #090909;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  margin-bottom: 11px;
`
const FindPasswordText = styled.div`
  color: #6A6A6A;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 40px;
`
const FindPasswordLabel = styled.label`
  width: 425px;
  display: block;
  color: #3E3E3E;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; 
  margin-bottom: 10px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`

const FindPasswordInput = styled.input`
  width: 425px;
  height: 55px;
  padding: 0px 20px;
  border-radius: 8px;
  border: 1px solid #E7E7E7;
  margin-bottom: 30px;
  
`
const FindPasswordLine = styled.div`
  width: 425px;
  height: 1.333px;
  background: #EFECFF;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`

const FindPasswordSubmit = styled.input`
  border-radius: 5.333px;
  background: ${props => (props.disabled ? '#8D8D8D' : '#00D749')};
  width: 423px;
  padding: 14px;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  color: white;
`
function FindPasswordPage() {
  return (
    <>
    <FindPasswordContainer>
      <FindPasswordTitle>비밀번호 재설정</FindPasswordTitle>
      <FindPasswordText>
        <div>비밀번호를 잊어버리셨나요?</div>
        <div>그로우업에 가입한 이메일을 통해</div>
        <div>비밀번호를 재설정 해주세요!</div>
      </FindPasswordText>
      <FindPasswordLabel htmlFor='email'>이메일</FindPasswordLabel>
      <FindPasswordInput id='email' type='email' placeholder='dahul4603@naver.com' autoComplete="email"/>
      <FindPasswordLine />
      <FindPasswordSubmit type='submit' value="인증 메일 전송하기" disabled />
    </FindPasswordContainer>
    </>
  )
}

export default FindPasswordPage