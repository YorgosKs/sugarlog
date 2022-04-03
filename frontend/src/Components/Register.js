import { useState, useRef, useEffect } from 'react';
import './Register.css';
import logo from '../logo.svg';
import { Link, Navigate } from 'react-router-dom';
import axios from '../axios/axios';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const REGISTER_URL = '/register';
const CHECK_URL = '/check';

const Login = () => {
  // const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  // const [checkEmail, setCheckEmail] = useState(true);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');

  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

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
    // if button enabled with JS hack
    // const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    // if (!v1 || !v2) {
    //   setErrMsg('Invalid Entry');
    //   console.log('error');
    //   return;
    // }
    if (!v2) {
      setPwdErrMsg('Password is not valid.');
      console.log('error');
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
      console.log(response?.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      // setEmail('');
      // setPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Navigate to='/register-completed' />
      ) : (
        <div className='container'>
          <div className='left-side'>
            <div className='register-form'>
              <form onSubmit={handleSubmit}>
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
                <div>
                  <button className='form-button' type='submit'>
                    Register
                  </button>
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
