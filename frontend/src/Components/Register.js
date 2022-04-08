import { useState, useRef, useEffect } from 'react';
import './Register.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';

import SuccessRegister from './SuccessRegister';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const REGISTER_URL = '/register';
const CHECK_URL = '/check';

const Login = () => {
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const emailCheck = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setEmailErrMsg('Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post(CHECK_URL, JSON.stringify({ email }), {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response?.data === 400) {
        setEmailErrMsg('This email address is already in use.');
      } else if (response?.data === 200) {
        setEmailErrMsg(false);
      }
    } catch (err) {
      setEmailErrMsg('No Server Response');
      errRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwdCheck = PWD_REGEX.test(password);
    if (pwdCheck) {
      setPwdErrMsg('Password is not valid.');

      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }

    setErrMsg('');
    setEmailErrMsg('');
    setPwdErrMsg('');
  };

  return (
    <div className='container'>
      <div
        className='modal'
        style={
          success ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }
        }
      >
        <SuccessRegister setOpen={success} />
      </div>
      <div className='leftSide'>
        <div className='register-form'>
          <form onSubmit={handleSubmit}>
            <div>
              <img src={logo} alt='logo' className='logo-mobile' />
            </div>
            <div className='register-form_control title'>
              <h2>Register</h2>
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'
              >
                {errMsg}
              </p>
            </div>
            <div className='register-form_control'>
              <label>Email</label>
              <input
                type='email'
                id='email'
                // ref={userRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                onBlur={emailCheck}
              />
              <p
                ref={errRef}
                id='emailcheckmsg'
                className={emailErrMsg ? 'errmsg' : 'offscreen'}
              >
                {emailErrMsg}
              </p>
            </div>
            <div className='register-form_control'>
              <label>Password</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={password}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id='pwdnote'
                className={pwdFocus && !validPwd ? 'errmsg' : 'offscreen'}
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
              </p>
              <p
                ref={errRef}
                id='emailcheckmsg'
                className={pwdErrMsg ? 'errmsg' : 'offscreen'}
              >
                {pwdErrMsg}
              </p>
              <Link to='/login' className='form-messages'>
                Already have an account?
              </Link>
            </div>
            <div className='login-form_control'>
              <button className='form-button' type='submit'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='rightSide'>
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
      }
    </div>
  );
};

export default Login;
