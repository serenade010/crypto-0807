import React from 'react';
import './Userinfo.css';
import { FaUserCircle } from 'react-icons/fa';
function Userinfo() {
  return (
    <>
      <div className="info-container">
        <div className="info-title">
          <FaUserCircle />
          <div className="margin-left">admin</div>
        </div>
        {/* <button className="info-btn">Settings</button> */}
      </div>
    </>
  );
}

export default Userinfo;
