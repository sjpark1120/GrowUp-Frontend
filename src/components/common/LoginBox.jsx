import React, { useState } from 'react'
import styled from 'styled-components'
import eye from '../../icon/eye.png'
import eye_green from '../../icon/eye_green.png'
import logo from '../../icon/Logo.png'
import x from '../../icon/cancel.png'
import { Link } from 'react-router-dom'

const LoginBackGround = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  opacity: 0.8;
  backdrop-filter: blur(5px);
`
const LoginWindow = styled.div`
  position: absolute;
  width: 540px;
  height: 580px;
  box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, 0.10);
`
const LoginTopBar = styled.div`
  width: 540px;
  height: 36px;
  padding-left: 14px;
  padding-right: 14px;
  background-color: #B0B0B0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LoginContainer = styled.div`
  margin-top: 40px;
  width: 500px;
  height: 387px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const LoginTitle = styled.h1`
  color: #090909;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  margin-bottom: 11px;
`
const LoginText = styled.div`
  color: #090909;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 40px;
`
const LoginLabel = styled.label`
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

const LoginInput = styled.input`
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

const LoginSubmit = styled.input`
  border-radius: 5.333px;
  background: ${props => (props.disabled ? '#8D8D8D' : '#00D749')};
  width: 423px;
  padding: 14px;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  color: white;
  margin-bottom: 5px;
  border: 0;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`
const PasswordContainer = styled.div`
  position: relative;
`;
const EyeIcon = styled.img`
  position: absolute;
  top: 17px;
  right: 55px;
  cursor: pointer;
`
const Loginbottom = styled.div`
  padding: 5px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: #8D8D8D;
`
const Logo = styled.img`
  
`
const Xicon =styled.img`
  cursor: pointer;
`
const ErrorText = styled.span`
  margin: 5px;
  color: #FF4747;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`
function LoginBox() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [isLoginWindowVisible, setLoginWindowVisible] = useState(true);

  const handleXiconClick = () => {
    setLoginWindowVisible(false);
  };

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

  const onSubmit = async(e) => {
    e.preventDefault();
  }
  return (
    <>
    {isLoginWindowVisible && (
    <LoginBackGround>
      <LoginWindow>
        <LoginTopBar>
          <Logo src={logo} />
          <Xicon src={x} 
          onClick={handleXiconClick}/>
        </LoginTopBar>
        <LoginContainer>
          <LoginTitle>로그인</LoginTitle>
          <LoginText>그로우업에서 즐겁게 성장하세요!</LoginText>
          <form onSubmit={onSubmit}>
            <LoginLabel htmlFor='email'>
              이메일
              {emailTouched && emailError && <ErrorText>ⓘ 이메일이 올바르지 않습니다.</ErrorText>}
              </LoginLabel>
            <LoginInput id='email' 
            type='email' 
            placeholder='dahul4603@naver.com' 
            autoComplete="email" 
            value={email} 
            onChange={onChangeEmail} 
            style={emailTouched && emailError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}} />
            <LoginLabel htmlFor='password'>
              비밀번호
              {passwordTouched && passwordError && <ErrorText>ⓘ 최소 8자, 최대 20자, 영문자, 숫자 모두 포함되어야 합니다.</ErrorText>}
              </LoginLabel>
            <PasswordContainer>
              <LoginInput id='password' 
              type={showPassword ? 'text' : 'password'} 
              placeholder='*******' 
              autoComplete="new-password" 
              value={password} 
              onChange={onChangePassword}
              style={passwordTouched && passwordError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}} />
              <EyeIcon src={showPassword ? eye_green : eye} onClick={() => setShowPassword(!showPassword)} />
            </PasswordContainer>
            <LoginSubmit type='submit' value="로그인" 
            disabled={emailError || passwordError} />
          </form>
          <Loginbottom>
            <Link to='/findpassword' style={{ textDecoration: 'none' }}>
              <span>비밀번호 찾기 </span>
            </Link>
            <span>| </span>
            <Link to='/signup' style={{ textDecoration: 'none' }}>
              <span>회원가입</span>
            </Link>
          </Loginbottom>
        </LoginContainer>
      </LoginWindow>
      </LoginBackGround>
    )}
    </>
  )
}

export default LoginBox