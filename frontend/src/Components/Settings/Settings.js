import './Settings.css';
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const GETINFO_URL = '/info/';
const GETUSER_URL = '/';
const UPDATEINFO_URL = '/info/update-info/';
const UPDATEEMAIL_URL = '/update-email';
const UPDATEPWD_URL = '/update-password';
const CHECK_URL = '/check';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Settings = () => {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [password, setPassword] = useState('');
  const [type, setType] = useState();
  const [sugarUnit, setSugarUnit] = useState('');
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');

  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [updateErrMsg, setUpdateErrMsg] = useState('');

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  useEffect(() => {
    handleGetUser();
    handleGetInfo();
  }, []);

  const handleGetUser = async () => {
    try {
      const response = await axios.get(GETUSER_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      setEmail(response?.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetInfo = async () => {
    try {
      const response = await axios.get(GETINFO_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      setType(response?.data.type);
      setSugarUnit(response?.data.sugarUnit);
      setMinRange(response?.data.minRange);
      setMaxRange(response?.data.maxRange);
    } catch (err) {
      console.log(err);
    }
  };

  const emailCheck = async (e) => {
    e.preventDefault();

    const emailCheck = EMAIL_REGEX.test(email);
    if (!emailCheck) {
      setEmailErrMsg('Please enter a valid email address.');
      return;
    }

    if (emailCheck === email) {
      setEmailErrMsg('');
    }
    try {
      const response = await axios.post(CHECK_URL, JSON.stringify({ email }), {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response?.data === 400) {
        setEmailErrMsg('This email address is already in use.');
      } else {
        setEmailErrMsg('');
      }
    } catch (err) {
      setEmailErrMsg('No Server Response');
    }
  };

  const checkPassword = () => {
    const pwdCheck = PWD_REGEX.test(password);
    if (!pwdCheck) {
      setPwdErrMsg('Password is not valid.');
      setPwdFocus(false);
      return;
    } else {
      setPwdErrMsg('');
      setPwdFocus(false);
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    console.log(email);

    if (sugarUnit || type || minRange || maxRange) {
      const data = {
        type: type,
        sugarUnit: sugarUnit,
        minRange: minRange.trim(),
        maxRange: maxRange.trim(),
      };

      try {
        const response = await axios.post(UPDATEINFO_URL, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response?.data);
        setUpdateMsg('Your info has been updated.');
      } catch (err) {
        console.log(err);
        setUpdateErrMsg('Something went wrong.');
      }
    }

    if (email) {
      // const emailCheck = EMAIL_REGEX.test(email);
      // if (!emailCheck) {
      //   setEmailErrMsg('Email is not valid.');
      //   return;
      // }
      const data = { email: email };
      try {
        const response = await axios.post(UPDATEEMAIL_URL, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response?.data);
        setUpdateMsg('Your info has been updated.');

        // setEmailErrMsg(false);
      } catch (err) {
        console.log(err);
        setUpdateErrMsg('Something went wrong.');
      }
    }

    if (password !== '') {
      // const pwdCheck = PWD_REGEX.test(password);
      // if (!pwdCheck) {
      //   setPwdErrMsg('Password is not valid.');
      //   return;
      // }
      // const data = { password: JSON.stringify(password) };
      const data = { password: password };

      try {
        const response = await axios.post(UPDATEPWD_URL, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response?.data);
        setUpdateMsg('Your info has been updated.');

        // setEmailErrMsg(false);
      } catch (err) {
        console.log(err);
        setUpdateErrMsg('Something went wrong.');
      }
    }
    setTimeout(clearMsg, 3500);
  };

  const clearMsg = () => {
    setUpdateMsg('');
    setUpdateErrMsg('');
  };

  return (
    <div className='settings-container'>
      <Nav />
      <div className='filler'></div>
      <div className='settings-wrapper'>
        <h2>Settings</h2>
        <div className='col-wrapper'>
          <div
            className='sucContainer'
            style={updateMsg ? { height: 'auto' } : { height: 0 }}
          >
            <p
              className='sucmsg'
              style={
                updateMsg
                  ? {
                      opacity: 1,
                      height: 'auto',
                      top: '0%',
                      left: '50%',
                    }
                  : { opacity: 0 }
              }
            >
              {updateMsg}
            </p>
          </div>
          <div
            className='sucContainer'
            style={updateErrMsg ? { height: 'auto' } : { height: 0 }}
          >
            <p
              className='errorMsg'
              style={
                updateErrMsg
                  ? {
                      opacity: 1,
                      height: 'auto',
                      top: '0%',
                      left: '50%',
                    }
                  : { opacity: 0 }
              }
            >
              {updateErrMsg}
            </p>
          </div>
          <form className='settings-form' onSubmit={handleUpdateInfo}>
            <div className='settings-item'>
              <label>Email</label>
              <input
                type='email'
                value={email || ''}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={emailCheck}
              />
              <p
                className={emailErrMsg ? 'errmsg' : 'offscreen'}
                style={{
                  margin: '0 auto 10px auto',
                  width: 'calc(100% - 100px)',
                }}
              >
                {emailErrMsg}
              </p>
            </div>
            <div className='settings-item'>
              <label>Password</label>
              <input
                placeholder='New password'
                type='password'
                value={password || ''}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => setPwdFocus(true)}
                onBlur={checkPassword}
                autocomplete='new-password'
              />
              <p
                id='pwdnote'
                className={pwdFocus && !validPwd ? 'errmsg' : 'offscreen'}
                style={{
                  margin: '0 auto 10px auto',
                  width: 'calc(100% - 100px)',
                }}
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
              </p>
              <p
                id='emailcheckmsg'
                className={pwdErrMsg ? 'errmsg' : 'offscreen'}
                style={{
                  margin: '0 auto 10px auto',
                  width: 'calc(100% - 100px)',
                }}
              >
                {pwdErrMsg}
              </p>
            </div>
            <div className='settings-item'>
              <label>Diabetes type</label>
              <select
                required
                onChange={(e) => setType(e.target.value)}
                // defaultValue={type}
                value={type}
              >
                <option value={'Type 1'}>Type 1</option>
                <option value={'Type 2'}>Type 2</option>
                <option value={`Gestational`}>Gestational Diabetes</option>
              </select>
            </div>
            <div className='settings-item'>
              <label>Blood sugar unit</label>
              <select
                required
                onChange={(e) => setSugarUnit(e.target.value)}
                value={sugarUnit}
              >
                <option value={'mg/dl'}>mg/dL</option>
                <option value={'mmol/L'}>mmol/L</option>
              </select>
            </div>
            <div className='settings-item'>
              <div className='settings-group'>
                <label>Min range</label>
                <label>Max range</label>
              </div>
              <div className='settings-group'>
                <input
                  type='number'
                  onChange={(e) => setMinRange(e.target.value)}
                  value={minRange}
                  placeholder={'Min range'}
                  required
                />

                <input
                  type='number'
                  onChange={(e) => setMaxRange(e.target.value)}
                  value={maxRange}
                  placeholder={'Max range'}
                  required
                />
              </div>
            </div>
            <div className='btn-item'>
              <button className='item-button' type='submit'>
                Save changes
              </button>
            </div>
          </form>
        </div>
        <div className='btm-filler'></div>
      </div>
    </div>
  );
};

export default Settings;
