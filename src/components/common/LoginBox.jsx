import React, { useState } from 'react'
import styled from 'styled-components'
import eye from '../../icon/eye.png'
import eye_green from '../../icon/eye_green.png'
import logo from '../../icon/Logo.png'
import x from '../../icon/cancel.png'
const LoginWindow = styled.div`
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
function LoginBox() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
  }
  return (
    <>
      <LoginWindow>
        <LoginTopBar>
          <Logo src={logo} />
          <Xicon src={x} />
        </LoginTopBar>
        <LoginContainer>
          <LoginTitle>로그인</LoginTitle>
          <LoginText>그로우업에서 즐겁게 성장하세요!</LoginText>
          <form onSubmit={onSubmit}>
            <LoginLabel htmlFor='email'>이메일</LoginLabel>
            <LoginInput id='email' type='email' placeholder='dahul4603@naver.com' autoComplete="email" value={email} onChange={onChangeEmail} />
            <LoginLabel htmlFor='passwordcheck'>비밀번호</LoginLabel>
            <PasswordContainer>
              <LoginInput id='passwordcheck' type={showPassword ? 'text' : 'password'} placeholder='*******' autoComplete="new-password" value={password} onChange={onChangePassword}/>
              <EyeIcon src={showPassword ? eye_green : eye} onClick={() => setShowPassword(!showPassword)} />
            </PasswordContainer>
            <LoginSubmit type='submit' value="로그인" disabled />
          </form>
          <Loginbottom>
            <span>비밀번호 찾기 </span>
            <span>| </span>
            <span>회원가입</span>
          </Loginbottom>
        </LoginContainer>
      </LoginWindow>
    </>
  )
}

export default LoginBox