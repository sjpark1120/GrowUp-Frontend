import React from "react";
import { Overlay } from "../../pages/LiveUpPage/LiveUpJoinPage";
import logo from "../../icon/Logo.png";
import cancel from "../../icon/cancel.png";

const OverlayBox = ({ toggle, setToggle, setShare, title, subTitle }) => {
  if (!toggle) return null;

  const isSetVideoShare = () => {
    if (setShare) {
      setShare(true);
    }
    setToggle(false);
  };

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
          <div
            className="content_title"
            style={{ fontWeight: setShare ? "" : 500 }}
          >
            {title}
          </div>
          <button className="start_btn" onClick={isSetVideoShare}>
            {subTitle}
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default OverlayBox;
