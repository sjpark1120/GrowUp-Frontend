import React, { useEffect, useState } from 'react'
import VerifyCheck from '../../components/JoinPage/VerifyCheck'
import AuthApi from '../../apis/Auth'
import { useSearchParams } from 'react-router-dom';

function EmailVerifyPage() {
  const [verifyCheck, setVerifyCheck] = useState(false); 
  const [query, setQuery] = useSearchParams();

  const title = "메일 인증이 완료 되었어요!"
  const text = `그로우업의 서비스를 마음껏 이용해 주세요!
  당신의 성장을 응원해요!`
  const btnText = "메인 페이지으로 돌아가기"
  const title_fail = "메일 인증이 실패했어요😢"
  const text_fail = `인증 시간이 만료되었어요. 
  다시 한번 인증요청을 해주세요.`

  const handleEmailVerify = async () => {
    try{
      const certificationNumber = query.get('certificationNumber');
      const email= query.get('email');
      //console.log(certificationNumber, email)
      const response = await AuthApi.emailVerify(certificationNumber, email);
      console.log('emailVerify success: ', response);
      setVerifyCheck(true);
    } catch(error){
      console.log('emailVerify failed: ', error);
      if(error.response && error.response.data && error.response.data.message){
        //alert(error.response.data.message);
      }
    }
  };

  useEffect(()=>{
    handleEmailVerify();
  }, [])
  return (
    <>{
      verifyCheck ? 
      <VerifyCheck title={title} text={text} btnText={btnText}/> 
      : <VerifyCheck title={title_fail} text={text_fail} btnText={btnText}/>
     }
    </>
  )
}

export default EmailVerifyPage