import './Login.css';
// import './Register.css';
import logo from '../logo.svg';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from '../axios/axios';
import { useState, useEffect, useRef } from 'react';

const PWD_REGEX = /^$|\s*/;
const LOGIN_URL = '/login';

const Login = (props) => {
  const errRef = useRef();
  // const userRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setPwdErrMsg('');
  }, [password]);

  // let navigate = useNavigate();

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
      console.log(response?.data);
      if (response?.data === 401) {
        setEmailErrMsg('Email address not found');
      } else if (response?.data === 403) {
        setEmailErrMsg('');
        setPwdErrMsg('Password is wrong');
      } else {
        setSuccess(true);
        const state = true;
        props.loggedInState(state);
        window.localStorage.setItem('active', state);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className='container'>
          <div className='left-side'>
            <div className='login-form'>
              <form onSubmit={handleSubmit}>
                <div className='login-form_control title'>
                  <h2>Login</h2>
                  <p
                    ref={errRef}
                    className={errMsg ? 'errmsg' : 'offscreen'}
                    aria-live='assertive'
                  >
                    {errMsg}
                  </p>
                </div>
                <div className='login-form_control'>
                  <label>Email</label>
                  <input
                    type='text'
                    id='email'
                    // ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    // onBlur={emailCheck}
                  />
                  <p
                    ref={errRef}
                    id='emailcheckmsg'
                    className={emailErrMsg ? 'errmsg' : 'offscreen'}
                  >
                    {emailErrMsg}
                  </p>
                </div>
                <div className='login-form_control'>
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
                  <a href='#' className='form-messages'>
                    Forgot password?
                  </a>
                  <Link to='/register' className='form-messages'>
                    Don't have an account?
                  </Link>
                </div>
                <div>
                  {/* <Link to='/dashboard'> */}
                  <button className='form-button' type='submit'>
                    Login
                  </button>
                  {/* </Link> */}
                </div>
              </form>
            </div>
          </div>
          <div className='right-side'>
            <div className='message-container'>
              <div>
                <img src={logo} alt='logo' className='logo' />
              </div>
              <div className='message-content'>
                <h2>Your diabetes tracker.</h2>
              </div>
              <div className='message-content'>
                <h1>
                  all in
                  <br />
                  ONE
                  <br />
                  PLACE!
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
