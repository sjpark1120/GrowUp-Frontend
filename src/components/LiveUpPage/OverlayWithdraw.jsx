import React from "react";
import { Overlay } from "../../pages/LiveUpPage/LiveUpJoinPage";
import logo from "../../icon/Logo.png";
import cancel from "../../icon/cancel.png";
import { Input } from "../../pages/MyPage/EditProfile";

const OverlayWithdraw = ({ toggle, setToggle, title, subTitle, onCheck }) => {
  if (!toggle) return null;
  return (
    <Overlay>
      <div className="withdrawModal">
        <div className="title">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="cancel">
            <img src={cancel} onClick={() => setToggle(false)} alt="cancel" />
          </div>
        </div>
        <div className="content">
          <div className="content_title" style={{ fontWeight: 500 }}>
            {title}
          </div>
          <div className="line">유의사항</div>
          <div className="notice">
            <div className="red">계정 탈퇴 시, 그로우업에서 탈퇴됩니다.</div>
            <div>
              탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다.
              <br />
              직접 작성한 콘텐츠(동영상, 게시물, 댓글 등)는 자동으로 삭제 되지
              <br />
              않으며, 만일 삭제를 원하시면 탈퇴 이전에 삭제가 필요합니다.
              <br /> 탈퇴 후 동일한 메일로 재가입이 가능하나, 탈퇴한 계정과
              연동되지 않습니다.
              <br /> 탈퇴 후 연동된 소셜 계정 정보도 사라지며 소셜 로그인으로
              기존 계정 이용이 불가능합니다.
              <br /> 현재 비밀번호 입력하고 탈퇴하기를 누르시면 위 내용에
              동의하는것으로 간주됩니다.
            </div>
          </div>
          <div className="withdrawBox">
            <Input
              style={{ width: "338px", height: "40px", marginBottom: 0 }}
            />
            <button className="start_btn" onClick={onCheck}>
              {subTitle}
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default OverlayWithdraw;
