import React, { useState } from "react";
import styled from "styled-components";
import mypageIcon from "../../icon/mypageIcon.png";

import logo from "../../icon/Logo.png";
import cancel from "../../icon/cancel.png";
import OverlayBox from "../../components/LiveUpPage/OverlayBox";
import OverlayCheck from "../../components/LiveUpPage/OverlayCheck";
import OverlayWithdraw from "../../components/LiveUpPage/OverlayWithdraw";

const Frame = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Benner = styled.div`
  width: 100%;
  height: 40px;
  background-color: #141414;
`;

const MyInfo = styled.form`
  width: 902px;
  height: 735px;
  margin: 191px;

  .title {
    width: 902px;
    height: 40px;
    padding-left: 325px;
    font-size: 25px;
    line-height: 35px;
    font-weight: 800;
    color: #090909;
    padding-bottom: 50px;
  }
  .infoBlock {
    width: 902px;
    height: 665px;
    display: flex;
    .myImageBlock {
      width: 245px;
      height: 665px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .myImage {
        padding-bottom: 20px;
      }
      .time {
        text-align: center;
        .time_title {
          line-height: 22.4px;
        }
        .time_time {
          font-size: 25px;
          font-weight: 800;
          line-height: 35px;
          color: #4f4f4f;
        }
      }
    }
    .info_changeBlock {
      width: 577px;
      height: 665px;
      margin-left: 80px;

      .nickname_email_input {
        border-top: 1px solid #e7e7e7;
        padding-bottom: 50px;
        position: relative;

        .nickname {
          .info_input_title {
            padding: 15px 0;
            font-size: 20px;
            line-height: 28px;
            font-weight: 600;
          }
          .rule {
            padding: 5px 0;
            line-height: 22.4px;
            font-size: 16px;
            color: #b0b0b0;
            font-weight: 500;
          }
        }
        .exclude_nickname {
          display: flex;
          justify-content: space-between;
          .info_input_title {
            padding: 15px 0;
            font-size: 20px;
            line-height: 28px;
            font-weight: 600;
          }
          .find_password {
            padding: 15px 0;
            line-height: 22.4px;
            color: #b0b0b0;
            cursor: pointer;
          }
          .rule {
            padding: 15px 0;
            line-height: 22.4px;
            color: #b0b0b0;
          }
        }
        .btn {
          display: flex;
          align-items: center;
          position: absolute;
          right: 10px;
          top: 68px;
          width: 69px;
          height: 34px;
          border-radius: 8px;
          padding: 0 10px;
          background-color: #f7f7f7;
          font-size: 14px;
          color: #3e3e3e;
          cursor: pointer;
        }
        .btn_nickname {
          top: 100px;
        }
        .btn_email {
          top: 234px;
        }
      }
      .withdrawAndLogoutBtn {
        display: flex;
        justify-content: end;
        color: #848484;
        div {
          padding: 8px;
          position: relative;
          cursor: pointer;
          &:first-child::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -1px;
            transform: translateY(-50%);
            height: 15.28px;
            width: 1px;
            background-color: #848484;
          }
        }
      }
    }
  }
`;

export const Input = styled.input`
  width: 577px;
  height: 55px;
  border-radius: 8px;
  padding: 0 20px;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;
  margin-bottom: 20px;
`;

const EditProfile = () => {
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [mail, setMail] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  const [formData, setFormData] = useState({
    nickname: "쿼",
    email: "dahui4603@naver.com",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Frame>
      {formData.nickname === "쿼카" ? (
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

      <OverlayCheck
        toggle={passwordToggle}
        setToggle={setPasswordToggle}
        title={"비밀번호가 틀렸습니다!"}
        subTitle={"인증하기"}
        onCheck={() => setPasswordToggle(false)}
      />

      <OverlayBox
        toggle={mail}
        setToggle={setMail}
        title={"메일이 발송 되었습니다!"}
        subTitle={"닫기"}
      />

      <OverlayWithdraw
        toggle={withdraw}
        setToggle={setWithdraw}
        title={"탈퇴 안내 사항"}
        subTitle={"탈퇴하기"}
        onCheck={() => setWithdraw(false)}
      />

      <Benner />
      <MyInfo>
        <div className="title">내 정보 변경</div>
        <div className="infoBlock">
          <div className="myImageBlock">
            <div className="myImage">
              <img src={mypageIcon} alt="mypageIcon" />
            </div>
            <div className="time">
              <div className="time_title">누적 성장 시간</div>
              <div className="time_time">123 : 50 : 35</div>
            </div>
          </div>
          <div className="info_changeBlock">
            <div className="nickname_email_input">
              <div className="nickname">
                <div className="info_input_title">닉네임</div>
                <div className="rule">
                  한글, 영문(대소문자), 숫자 조합 / 2~10자 이하
                </div>
              </div>
              <Input
                type="text"
                value={formData.nickname}
                name="nickname"
                onChange={onChange}
              />
              <div
                className="btn btn_nickname"
                onClick={() => setDoubleCheck(true)}
              >
                중복확인
              </div>
              <div className="exclude_nickname">
                <div className="info_input_title">이메일 변경</div>
                <div className="rule">* 이메일 변경 시 재인증 필요</div>
              </div>
              <Input
                type="email"
                value={formData.email}
                name="email"
                onChange={onChange}
              />
              <div className="btn btn_email" onClick={() => setMail(true)}>
                인증하기
              </div>
            </div>
            <div className="nickname_email_input">
              <div className="exclude_nickname">
                <div className="info_input_title">비밀번호 변경</div>
                <div className="find_password">비밀번호 찾기</div>
              </div>
              <div className="btn" onClick={() => setPasswordToggle(true)}>
                인증하기
              </div>

              <Input
                type="password"
                name="password"
                onChange={onChange}
                value={formData.password}
                placeholder="기존 비밀번호"
              />
              <Input type="password" placeholder="새 비밀번호" />
              <Input type="password" placeholder="새 비밀번호 확인" />
            </div>
            <div className="withdrawAndLogoutBtn">
              <div onClick={() => setWithdraw(true)}>탈퇴하기</div>
              <div>로그아웃</div>
            </div>
          </div>
        </div>
      </MyInfo>
    </Frame>
  );
};

export default EditProfile;
