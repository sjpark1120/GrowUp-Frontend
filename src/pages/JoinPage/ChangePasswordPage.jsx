import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import eye from '../../icon/eye.png'
import eye_green from '../../icon/eye_green.png'
import AuthApi from '../../apis/Auth'
import VerifyCheck from '../../components/JoinPage/VerifyCheck'
import { useSearchParams } from 'react-router-dom'
import AxiosInstance from '../../apis/CustomAxios'

const ChangePasswordContainer = styled.div`
  margin-top: 302px;
  width: 500px;
  height: 387px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const ChangePasswordTitle = styled.h1`
  color: #090909;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  margin-bottom: 11px;
`
const ChangePasswordText = styled.div`
  color: #6A6A6A;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 40px;
`
const ChangePasswordLabel = styled.label`
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

const ChangePasswordInput = styled.input`
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
const ChangePasswordLine = styled.div`
  width: 425px;
  height: 1.333px;
  background: #EFECFF;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`

const ChangePasswordSubmit = styled.input`
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
const EyeIcon = styled.img`
  position: absolute;
  top: 17px;
  right: 55px;
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
function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [passwordError, setPasswordError] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(true);

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);

  const [verifyCheck, setVerifyCheck] = useState(false); 
  const [restoreComplete, setRestoreComplete] = useState(false);
  const [query, setQuery] = useSearchParams();

  const btnText = "메인 페이지으로 돌아가기"
  const title_fail = "메일 인증이 실패했어요😢"
  const text_fail = `인증 시간이 만료되었어요. 
  다시 한번 인증요청을 해주세요.`
  const title = "비밀번호 변경 완료!"
  const text = `비밀번호 재설정이 완료되었습니다.
  새로운 비밀번호로 로그인해주세요.`

  let Authorization ='';
  const handlePasswordVerify = async () => {
    try{
      const certificationNumber = query.get('certificationNumber');
      const email= query.get('email');
      console.log(certificationNumber, email)
      const response = await AuthApi.findPasswordVerify(certificationNumber, email);
      console.log('findPasswordVerify success: ', response);
      setVerifyCheck(true);
      if (response && response.isSuccess) {
        Authorization = `${response.result.accessToken}`;
        //console.log('인증성공 토큰저장', Authorization)
      }
    } catch(error){
      console.log('findPasswordVerify failed: ', error);
      if(error.response && error.response.data && error.response.data.message){
        //alert(error.response.data.message);
      }
    }
  };

  const handlePasswordRestore = async (passwordData) => {
    try{
      if(Authorization !== ''){
        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = Authorization;
      }
      const response = await AuthApi.passwordRestore(passwordData);
      console.log('passwordRestore success: ', response);
      setRestoreComplete(true);
    } catch(error){
      console.log('passwordRestore failed: ', error);
      if(error.response && error.response.data && error.response.data.message){
        alert(error.response.data.message);
      }
    }
  };

  useEffect(()=>{
    handlePasswordVerify();
  }, [])

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
    const passwordData = {
      password,
      passwordCheck
  }
    handlePasswordRestore(passwordData);
  }
  return (
    <>
    {restoreComplete ? <VerifyCheck title={title} text={text} btnText={btnText}/> 
     : (verifyCheck ? 
      <ChangePasswordContainer>
        <ChangePasswordTitle>비밀번호 재설정</ChangePasswordTitle>
        <ChangePasswordText>변경할 비밀번호를 정확히 입력해 주세요.</ChangePasswordText>
        <form onSubmit={onSubmit}>
        <ChangePasswordLabel htmlFor='password'>
          비밀번호
          {passwordTouched && passwordError && <ErrorText>ⓘ 최소 8자, 최대 20자, 영문자, 숫자, 특수문자(@$!%*?&)가 모두 포함되어야 합니다.</ErrorText>}
          </ChangePasswordLabel>
          <PasswordContainer>
            <ChangePasswordInput id='password' 
            type={showPassword ? 'text' : 'password'} 
            placeholder='*******' 
            autoComplete="new-password" 
            value={password} 
            onChange={onChangePassword} 
            style={passwordTouched && passwordError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}}/>
            <EyeIcon src={showPassword ? eye_green : eye} onClick={() => setShowPassword(!showPassword)} />
          </PasswordContainer>
          <ChangePasswordLabel htmlFor='passwordcheck'>
            비밀번호 확인
            {passwordCheckTouched && passwordCheckError && <ErrorText>ⓘ 비밀번호가 동일하지 않습니다.</ErrorText>}
            </ChangePasswordLabel>
          <PasswordContainer>
            <ChangePasswordInput id='passwordcheck'
            type={showPasswordCheck ? 'text' : 'password'} 
            placeholder='*******' 
            autoComplete="new-password" 
            value={passwordCheck} 
            onChange={onChangePasswordCheck}
            style={passwordCheckTouched && passwordCheckError ? {borderColor: '#FF4747'} : {borderColor: '#E7E7E7'}}/>
            <EyeIcon src={showPasswordCheck ? eye_green : eye} onClick={() => setShowPasswordCheck(!showPasswordCheck)} />
          </PasswordContainer>
          <ChangePasswordLine />
          <ChangePasswordSubmit type='submit' 
          value="비밀번호 변경" 
          disabled={passwordError || passwordCheckError} />
        </form>
      </ChangePasswordContainer>
      : <VerifyCheck title={title_fail} text={text_fail} btnText={btnText}/>)}
    </>
  )
}

export default ChangePasswordPage;