import './Login2.css';
import logo from '../logo.svg';

import { Link, Navigate } from 'react-router-dom';
import axios from '../axios/axios';
import { useState, useEffect, useRef } from 'react';

import ChangePwd from './ChangePwd';

const PWD_REGEX = /^$|\s*/;
const LOGIN_URL = '/login';

const Login = (props) => {
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPwdErrMsg('');
    setOpen(false);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwd = PWD_REGEX.test(password);
    if (!pwd) {
      setPwdErrMsg('Please enter your password');
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (response?.data === 401) {
        setEmailErrMsg('Email address not found');
      } else if (response?.data === 403) {
        setEmailErrMsg('');
        setPwdErrMsg('Password is wrong');
      } else {
        setSuccess(true);
        const state = true;
        props.loggedInState(state);
        window.localStorage.setItem('token', state);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <>
      {success ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className='container'>
          <div
            className='modal'
            style={
              open ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }
            }
          >
            <ChangePwd setOpen={setOpen} />
          </div>
          <div className='form-wrapper'>
            <form className='login-form' onSubmit={handleSubmit}>
              <img src={logo} alt='logo' />
              <h2>Login</h2>
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'
              >
                {errMsg}
              </p>

              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  id='email'
                  autoComplete='off'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  style={{ color: 'white' }}
                />
                <p
                  ref={errRef}
                  id='emailcheckmsg'
                  className={emailErrMsg ? 'errmsg' : 'offscreen'}
                >
                  {emailErrMsg}
                </p>
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <p
                  ref={errRef}
                  id='emailcheckmsg'
                  className={pwdErrMsg ? 'errmsg' : 'offscreen'}
                >
                  {pwdErrMsg}
                </p>
                <a
                  href='#!'
                  className='form-messages'
                  onClick={() => setOpen(true)}
                >
                  Forgot password?
                </a>
                <Link to='/register' className='form-messages'>
                  Don't have an account?
                </Link>
              </div>
              <div className='form-group'>
                <button>Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
