import axios from "../../axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const succesOption = {
  position: "bottom-right",
  type: "success",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const warningOption = {
  position: "bottom-right",
  type: "warning",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const errorOption = {
  position: "bottom-right",
  type: "error",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // define regex pattern for email validation
  const pattern = /^[a-z0-9._%+-]+@ajiledone\.com$/;

  function handleChange(e) {
    setEmail(e.target.value);
    setIsValid(pattern.test(e.target.value));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const registeredRes = await axios({
        method: "post",
        url: "/registerforcontractor",
        data: {
          email: email,
          password: password,
          cPassword: cPassword,
        },
      });

      if (registeredRes.data.status) {
        setLoading(false);
        toast(registeredRes.data.message, succesOption);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      toast(error.response.data.message, warningOption);
    }
    
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer />
      {/* <div className="register-header-div">
        <button className="register-header-button">Apply Jobs</button>
      </div> */}
      <div className="register-div-image">
        <img className="register-image" href="" alt="Ajiledone Technology" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="register-main-div">
          <h3 className="register-main-header">Register</h3>
          <p className="register-main-headerTwo">Access to out dashboard</p>
          <label className="register-email" htmlFor="Email">
            Email Address
          </label>
          <input
            className="register-email-input"
            id="Email"
            name="Email"
            type="text"
            onChange={handleChange}
          />
          <label className="register-password form-label" htmlFor="Password">
            Password
          </label>
          <input
            className="register-email-input"
            id="Password"
            name="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label className="register-password form-label" htmlFor="cPassword">
            Confirm Password
          </label>
          <input
            className="register-email-input"
            id="cPassword"
            name="cPassword"
            type="password"
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          />
           {isValid ? (
            loading ? (
              <div className="loading-div">
                <button className="loading"></button>
              </div>
            ) : (
              <button className="register-button" type="submit">
                Register
              </button>
            )
          ) : (
            <button className="register-button" type="submit" disabled>
              Register
            </button>
          )}

          <div className="register-footer">
            <span>Already have an account?</span>
            <a href="" onClick={handleNavigate}>
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
