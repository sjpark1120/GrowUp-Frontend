import React from "react";

import logo from "../../icon/Logo.png";
import cancel from "../../icon/cancel.png";
import { Overlay } from "../../pages/LiveUpPage/LiveUpJoinPage";
import { Input } from "../../pages/MyPage/MyPage";

const OverlayCheck = ({ toggle, setToggle, title, subTitle, onCheck }) => {
  if (!toggle) return null;
  return (
    <Overlay>
      <div className="videoModal">
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
          <div className="rule">
            한글, 영문(대소문자), 숫자 조합 / 2~10자 이하
          </div>
          <Input style={{ width: "284px", height: "50px", marginBottom: 0 }} />
          <button className="start_btn" onClick={onCheck}>
            {subTitle}
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default OverlayCheck;
