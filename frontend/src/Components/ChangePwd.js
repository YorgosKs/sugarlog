import { useState, useEffect, useRef } from 'react';
import axios from '../axios/axios';
import done from '../assets/done.svg';
// import './EditForm.css';

const PWD_REGEX = /^$|\s*/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const CHANGEPWD_URL = '/change-password';
const CHECK_URL = '/check';

const ChangePwd = (props) => {
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [emailSucMsg, setEmailSucMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [success, setSuccess] = useState(false);
  const errRef = useRef();

  useEffect(() => {
    setSuccess(false);
  }, []);

  const modal = () => {
    props.setOpen(false);
    setSuccess(false);
    setEmail('');
    setPwd('');
    setEmailErrMsg('');
    setPwdErrMsg('');
    setEmailSucMsg('');
  };

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

      console.log(response?.data);
      if (response?.data === 400) {
        setEmailSucMsg('We found your account');
        setEmailErrMsg('');
      } else if (response?.data === 200) {
        setEmailErrMsg('Wrong email');
      }
    } catch (err) {
      setEmailErrMsg('No Server Response');
      errRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwdCheck = PWD_REGEX.test(pwd);
    if (!pwdCheck) {
      setPwdErrMsg('Please enter a valid password');
      return;
    }

    const data = {
      email: email,
      password: pwd,
    };

    try {
      const response = await axios.post(CHANGEPWD_URL, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(true);
      setEmail('');
      setPwd('');
      setEmailErrMsg('');
      setPwdErrMsg('');
      setEmailSucMsg('');
    } catch (err) {
      console.log(err);
    }
  };

  return success ? (
    <div
      className='form-container'
      style={{
        width: '350px',
        height: '50vh',
        marginTop: '20vh',
      }}
    >
      <div className='update-pwd'>
        <img src={done} alt='done' style={{ height: '10vh' }} />
        <p>Your password has been updated.</p>
        <button
          className='button'
          type='submit'
          style={{ width: 'auto' }}
          onClick={modal}
        >
          Click here to login
        </button>
      </div>
    </div>
  ) : (
    <div
      className='form-container'
      style={{ height: '80vh', marginTop: '10vh' }}
    >
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: '10px auto' }}>Change password</h2>
        <div className='form-input'>
          <label>Email</label>
          <input
            type='email'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter your account email'
            onBlur={emailCheck}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={emailSucMsg ? 'sucmsg' : 'offscreen'}
          style={{ width: '80%' }}
        >
          {emailSucMsg}
        </p>

        <p
          ref={errRef}
          id='emailcheckmsg'
          className={emailErrMsg ? 'errmsg' : 'offscreen'}
          style={{ width: '80%' }}
        >
          {emailErrMsg}
        </p>
        <div className='form-input'>
          <label>New password</label>
          <input
            type='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd || ''}
            placeholder='Set new password'
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </div>
        <p
          id='pwdnote'
          className={pwdFocus && !validPwd ? 'errmsg' : 'offscreen'}
        >
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
        </p>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={pwdErrMsg ? 'errmsg' : 'offscreen'}
        >
          {pwdErrMsg}
        </p>

        <div className='btn-group'>
          <button className='button' type='submit'>
            Change
          </button>
          <button className='button cancel' onClick={modal} type='button'>
            Cancel
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default ChangePwd;
