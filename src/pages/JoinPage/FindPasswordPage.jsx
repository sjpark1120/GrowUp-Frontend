import React, { useState } from 'react'
import styled from 'styled-components'
import AuthApi from '../../apis/Auth'
import OverlayBox from '../../components/LiveUpPage/OverlayBox'

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
  border: 0;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`
const ErrorText = styled.span`
  margin: 5px;
  color: #FF4747;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`
function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [mail, setMail] = useState(false); //메일발송확인 창

  const handleAuth = async (emailData) => {
    try{
      const response = await AuthApi.findPasswordAuth(emailData);
      console.log('findPasswordAuth success: ', response);
      setMail(true)
    } catch(error){
      console.log('findPasswordAuth failed: ', error);
      if(error.response && error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
    }
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

  const onSubmit = async(e) => {
    e.preventDefault();
    const emailData ={
      email
    }
    handleAuth(emailData);
  }
  return (
    <>
    <OverlayBox
        toggle={mail}
        setToggle={setMail}
        title={"메일이 발송 되었습니다!"}
        subTitle={"닫기"}
      />
    <FindPasswordContainer>
      <FindPasswordTitle>비밀번호 찾기</FindPasswordTitle>
      <FindPasswordText>
        <div>비밀번호를 잊어버리셨나요?</div>
        <div>그로우업에 가입한 이메일을 통해</div>
        <div>비밀번호를 재설정 해주세요!</div>
      </FindPasswordText>
      <form onSubmit={onSubmit}>
        <FindPasswordLabel htmlFor='email'>
          이메일
          {emailTouched && emailError && <ErrorText>ⓘ 이메일이 올바르지 않습니다.</ErrorText>}
          </FindPasswordLabel>
        <FindPasswordInput id='email' 
        type='email' 
        placeholder='dahul4603@naver.com' 
        autoComplete="email" 
        value={email} 
        onChange={onChangeEmail}
        style={emailTouched && emailError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}}/>
        <FindPasswordLine />
        <FindPasswordSubmit type='submit' value="인증 메일 전송하기" 
        disabled={emailError} />
      </form>
    </FindPasswordContainer>
    </>
  )
}

export default FindPasswordPage