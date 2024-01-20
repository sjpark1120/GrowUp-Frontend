import React from 'react'
import styled from 'styled-components'

const SignUpcontainer = styled.div`
  margin-top: 180px;
  width: 500px;
  height: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 200px;
`

const SignUpTitle = styled.h1`
  color: #090909;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  margin-bottom: 11px;
`
const SignUpText = styled.div`
  color: #090909;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 40px;
`
const SignUpLabel = styled.label`
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
const SignUpInput = styled.input`
  width: 425px;
  height: 55px;
  padding: 0px 20px;
  border-radius: 8px;
  border: 1px solid #E7E7E7;
  margin-bottom: 30px;
`
const SignUpLine = styled.div`
  width: 425px;
  height: 1.333px;
  background: #EFECFF;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`

const SignUpSubmit = styled.input`
  border-radius: 5.333px;
  background: ${props => (props.disabled ? '#8D8D8D' : '#00D749')};
  width: 423px;
  padding: 14px 168px;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  color: white;
`
function SignUpPage() {

  return (
    <>
    <SignUpcontainer>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpText>그로우업에서 즐겁게 성장하세요!</SignUpText>
      <form>
        <SignUpLabel htmlFor='name'>이름</SignUpLabel>
        <SignUpInput id='name' type='text' placeholder='윤다희' />
        <SignUpLabel htmlFor='nickname'>닉네임</SignUpLabel>
        <SignUpInput id='nickname' type='text' placeholder='쿼카' />
        <SignUpLabel htmlFor='email'>이메일</SignUpLabel>
        <SignUpInput id='email' type='email' placeholder='dahul4603@naver.com' />
        <SignUpLabel htmlFor='password'>비밀번호</SignUpLabel>
        <SignUpInput id='password' type='password' placeholder='*******' />
        <SignUpLabel htmlFor='passwordcheck'>비밀번호 확인</SignUpLabel>
        <SignUpInput id='passwordcheck' type='password' placeholder='*******' />
        <SignUpLine />
        <SignUpSubmit type='submit' value="가입하기" disabled />
      </form>
    </SignUpcontainer>
    </>
  )
}

export default SignUpPage