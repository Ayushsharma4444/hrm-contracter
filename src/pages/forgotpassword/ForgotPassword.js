import React, { useState } from "react";

const ForgotPassword = () => {
  return (
    <div>
      <div className="forgot-header-div">
        <button className="forgot-header-button">Apply Jobs</button>
      </div>
      <div className="forgot-div-image">
        <img className="forgot-image" href="" alt="Ajiledone Technology" />
      </div>
      <div className="forgot-main-div">
        <h3 className="forgot-main-header">Forgot Password?</h3>
        <p className="forgot-main-headerTwo">Enter your email to get password reset link</p>
        <label className="forgot-email" for="Email">
          Email Address
        </label>
        <input
          className="forgot-email-input"
          id="Email"
          name="Email"
          type="text"
        />
        <button className="forgot-button">Reset Password</button>
        <div className="forgot-footer">
          <span>Remember your password?</span>
          <a href="">Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
