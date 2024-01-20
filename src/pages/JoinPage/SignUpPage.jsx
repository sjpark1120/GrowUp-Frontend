import React, { useState } from 'react'
import styled from 'styled-components'
import eye from '../../icon/eye.png'
import eye_green from '../../icon/eye_green.png'

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
  color: #6A6A6A;
  width: 425px;
  height: 55px;
  padding: 0px 20px;
  border-radius: 8px;
  border: 1px solid #E7E7E7;
  margin-bottom: 30px;
  &::-webkit-input-placeholder {
    color: #E7E7E7;
  }
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
  padding: 14px;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  color: white;
  border: 0;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`
const PasswordContainer = styled.div`
  position: relative;
`;
const ErrorText = styled.span`
  margin: 5px;
  color: #FF4747;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`
const EyeIcon = styled.img`
  position: absolute;
  top: 17px;
  right: 55px;
  cursor: pointer;
`
function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [nameError, setNameError] = useState(true);
  const [nicknameError, setNicknameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(true);

  //입력하기전부터 에러문 뜨는거 방지
  const [nameTouched, setNameTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);


  const onChangeName = (e) => {
    setName(e.target.value);
    setNameTouched(true);
    // 이름이 비어있는지 검사
  if (e.target.value === '') {
    setNameError(true);
  } else {
    setNameError(false);
  }
  }

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    setNicknameTouched(true);
    // 닉네임 유효성 검사
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailTouched(true);
    // 이메일 유효성 검사
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    setPasswordCheckTouched(true);
    // 비밀번호 확인 유효성 검사
    if (e.target.value !== password) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault();
  }
  return (
    <>
    <SignUpcontainer>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpText>그로우업에서 즐겁게 성장하세요!</SignUpText>
      <form onSubmit={onSubmit}>
        <SignUpLabel htmlFor='name'>이름</SignUpLabel>
        <SignUpInput id='name' type='text' placeholder='윤다희' value={name} onChange={onChangeName} />
        <SignUpLabel htmlFor='nickname'>
          닉네임
        {nicknameTouched && nicknameError && <ErrorText>ⓘ 2글자 이상 10글자 미만으로 작성해 주세요.</ErrorText>}
        </SignUpLabel>
        <SignUpInput id='nickname' 
        type='text' 
        placeholder='쿼카' 
        value={nickname} 
        onChange={onChangeNickname}
        style={nicknameTouched && nicknameError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}} />
        <SignUpLabel htmlFor='email'>
          이메일
          {emailTouched && emailError && <ErrorText>ⓘ 이메일이 올바르지 않습니다.</ErrorText>}
          </SignUpLabel>
        <SignUpInput id='email'
         type='email' 
         placeholder='dahul4603@naver.com' 
         autoComplete="email" 
         value={email} 
         onChange={onChangeEmail}
         style={emailTouched && emailError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}} />
        <SignUpLabel htmlFor='password'>
          비밀번호
          {passwordTouched && passwordError && <ErrorText>ⓘ 최소 8자, 최대 20자, 영문자, 숫자 모두 포함되어야 합니다.</ErrorText>}
          </SignUpLabel>
        <PasswordContainer>
          <SignUpInput id='password' 
          type={showPassword ? 'text' : 'password'} 
          placeholder='*******' 
          autoComplete="new-password" 
          value={password} 
          onChange={onChangePassword}
          style={passwordTouched && passwordError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}}/>
          <EyeIcon src={showPassword ? eye_green : eye} onClick={() => setShowPassword(!showPassword)} />
        </PasswordContainer>
        <SignUpLabel htmlFor='passwordcheck'>
          비밀번호 확인
          {passwordCheckTouched && passwordCheckError && <ErrorText>ⓘ 비밀번호가 동일하지 않습니다.</ErrorText>}
          </SignUpLabel>
        <PasswordContainer>
          <SignUpInput id='passwordcheck' 
          type={showPasswordCheck ? 'text' : 'password'} 
          placeholder='*******' 
          autoComplete="new-password" 
          value={passwordCheck} 
          onChange={onChangePasswordCheck} 
          style={passwordCheckTouched && passwordCheckError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}}/>
          <EyeIcon src={showPasswordCheck ? eye_green : eye} onClick={() => setShowPasswordCheck(!showPasswordCheck)} />
        </PasswordContainer>
        <SignUpLine />
        <SignUpSubmit type='submit' value="가입하기"  
        disabled={ nameError || nicknameError || emailError || passwordError || passwordCheckError} />
      </form>
    </SignUpcontainer>
    </>
  )
}

export default SignUpPage