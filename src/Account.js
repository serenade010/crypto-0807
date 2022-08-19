import React from 'react';
// import { Link } from 'react-router-dom';
import './Account.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Account() {
  const [login, setLogin] = useState(true);
  const [account, setAccount] = useState('');
  const [psword, setPsword] = useState('');
  const [loginStatus, setLoginStatus] = useState('information-correct');
  let navigate = useNavigate();

  const createUser = () => {
    axios
      .post('http://localhost:8080/user', {
        Name: account,
        Password: psword,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const verifyLogin = () => {
    axios
      .get(`http://localhost:8080/user/find/${account}`)
      .then(function (response) {
        if (response.data.user.Password === psword) {
          navigate('/price', {
            state: { id: response.data.user.ID, name: response.data.user.Name },
          });
          setLoginStatus('information-correct');
        } else {
          setLoginStatus('information-incorrect');
          setAccount('');
          setPsword('');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (login)
    return (
      <div>
        {/* <Link to="/">route to home</Link> */}
        <div className="login-container">
          <div className="login-window">
            <div className="login-window-title">Log in</div>
            <div className="login-window-quote">Begin your journey here!</div>
            <input
              placeholder="Name"
              className="login-window-email"
              value={account}
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="login-window-psword"
              value={psword}
              onChange={(event) => {
                setPsword(event.target.value);
              }}
            ></input>
            <button
              className="login-window-btn"
              onClick={() => {
                verifyLogin();
              }}
            >
              Sign in
            </button>
            <div className="login-window-invalid" id={loginStatus}>
              Incorrect username or password!
            </div>
            <button
              className="login-window-signup-btn"
              onClick={() => {
                setLogin(!login);
                setLoginStatus('information-correct');
                setAccount('');
                setPsword('');
              }}
            >
              Don't have a account? Create one!
            </button>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        {/* <Link to="/">route to home</Link> */}

        <div className="signup-container">
          <div className="signup-window">
            <div className="signup-window-title">Sign up</div>
            <div className="signup-window-quote">
              Sign up for a new account!
            </div>
            <input
              placeholder="Name"
              className="signup-window-email"
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="signup-window-psword"
              onChange={(event) => {
                setPsword(event.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Confirm Password"
              className="signup-window-confirm-psword"
            ></input>
            <button
              className="signup-window-btn"
              onClick={() => {
                createUser();
                setAccount('');
                setPsword('');
                setLogin(!login);
              }}
            >
              Sign up
            </button>
            <button
              className="signup-window-signup-btn"
              onClick={() => {
                setLogin(!login);
              }}
            >
              Already have an account? Login now!
            </button>
          </div>
        </div>
      </div>
    );
}

export default Account;
