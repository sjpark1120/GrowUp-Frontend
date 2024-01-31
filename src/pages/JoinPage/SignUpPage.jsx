import React, { useState } from 'react'
import styled from 'styled-components'
import eye from '../../icon/eye.png'
import eye_green from '../../icon/eye_green.png'
import OverlayBox from '../../components/LiveUpPage/OverlayBox'
import OverlayCheck from '../../components/LiveUpPage/OverlayCheck'
import AuthApi from '../../apis/Auth'
import { useNavigate } from 'react-router-dom'

const SignUpcontainer = styled.div`
  margin-top: 302px;
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
const DoubleCheckBtn = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 49px;
  top: 11px;
  width: 69px;
  height: 34px;
  border-radius: 8px;
  padding: 0 10px;
  background-color: #f7f7f7;
  font-size: 14px;
  color: #3e3e3e;
  cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`

const CompleteContainer = styled.div`
  margin-top: 302px;
  width: 500px;
  height: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 200px;
`
const GotoMainBtn = styled.div`
  border-radius: 5.333px;
  background:#00D749;
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

  const [doubleCheck, setDoubleCheck] = useState(false);

  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSignUp = async (userData) => {
    try{
      const response = await AuthApi.signUp(userData);
      console.log('signUp success: ', response);
      handleAuth({ email: userData.email });
    } catch(error){
      console.log('signUp failed: ', error);
      if(error.response && error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
    }
  };
  const handleAuth = async (emailData) => {
    try{
      const response = await AuthApi.emailAuth(emailData);
      console.log('emailAuth success: ', response);
      setIsEmailSent(true);
    } catch(error){
      console.log('emailAuth failed: ', error);
      alert(error.response.data.message);
    }
  };

  const handleMainPageNavigation = () => {
    navigate('/');
  };

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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
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
    const userData = {
      name,
      nickName: nickname,
      email,
      password,
      passwordCheck
    };
    handleSignUp(userData);
  }
  return (
    <>
    {isEmailSent ? ( //회원가입 완료창 (임시)
        <CompleteContainer>
          <div>
            <div>임시 화면입니다.</div>
            <div>입력하신 이메일 주소로 인증 메일을 보내드렸어요.</div>
            <div>인증 메일을 확인해주세요✉️</div>
          </div>
          <div>
            <div>반가워요. GROW UP🌱에 오신 것을 환영해요!</div>
            <div>아직 한 단계가 더 남았어요!</div>
            <div>가입하신 이메일을 인증해주시면, GROW UP🌱의 서비스를 이용하실 수 있습니다. 가입해주셔서 다시 한 번 감사드립니다🙇</div>
          </div>
          <GotoMainBtn onClick={handleMainPageNavigation}>메인 화면으로 이동</GotoMainBtn>
        </CompleteContainer>
      ): (
      <SignUpcontainer>
        {nickname === "쿼카" ? (
          <OverlayBox
            toggle={doubleCheck}
            setToggle={setDoubleCheck}
            title={"사용 가능한 닉네임 입니다!"}
            subTitle={"사용하기"}
          />
        ) : (
          <OverlayCheck
            toggle={doubleCheck}
            setToggle={setDoubleCheck}
            title={"중복된 닉네임 입니다!"}
            subTitle={"중복확인"}
            onCheck={() => setDoubleCheck(false)}
          />
        )}
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpText>그로우업에서 즐겁게 성장하세요!</SignUpText>
        <form onSubmit={onSubmit}>
          <SignUpLabel htmlFor='name'>이름</SignUpLabel>
          <SignUpInput id='name' type='text' placeholder='윤다희' value={name} onChange={onChangeName} />
          <SignUpLabel htmlFor='nickname'>
            닉네임
            {nicknameTouched && nicknameError && <ErrorText>ⓘ 2글자 이상 10글자 미만으로 작성해 주세요.</ErrorText>}
          </SignUpLabel>
          <PasswordContainer>
            <SignUpInput id='nickname'
              type='text'
              placeholder='쿼카'
              value={nickname}
              onChange={onChangeNickname}
              style={nicknameTouched && nicknameError ? { borderColor: '#FF4747' } : { borderColor: '#E7E7E7' }} />
            <DoubleCheckBtn
              onClick={() => setDoubleCheck(true)}
              disabled={nicknameError}>
              중복확인</DoubleCheckBtn>
          </PasswordContainer>
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
            style={emailTouched && emailError ? { borderColor: '#FF4747' } : { borderColor: '#E7E7E7' }} />
          <SignUpLabel htmlFor='password'>
            비밀번호
            {passwordTouched && passwordError && <ErrorText>ⓘ 최소 8자, 최대 20자, 영문자, 숫자, 특수문자(@$!%*?&) 모두 포함되어야 합니다.</ErrorText>}
          </SignUpLabel>
          <PasswordContainer>
            <SignUpInput id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='*******'
              autoComplete="new-password"
              value={password}
              onChange={onChangePassword}
              style={passwordTouched && passwordError ? { borderColor: '#FF4747' } : { borderColor: '#E7E7E7' }} />
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
              style={passwordCheckTouched && passwordCheckError ? { borderColor: '#FF4747' } : { borderColor: '#E7E7E7' }} />
            <EyeIcon src={showPasswordCheck ? eye_green : eye} onClick={() => setShowPasswordCheck(!showPasswordCheck)} />
          </PasswordContainer>
          <SignUpLine />
          <SignUpSubmit type='submit' value="가입하기"
            disabled={nameError || nicknameError || emailError || passwordError || passwordCheckError} />
        </form>
      </SignUpcontainer>
      )}
    </>
  )
}

export default SignUpPage