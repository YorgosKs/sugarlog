import './Settings.css';
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const GETINFO_URL = '/info/';
const GETUSER_URL = '/';
const UPDATEINFO_URL = '/update-info';
const UPDATEEMAIL_URL = '/update-email';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [data, setData] = useState('');
  const [type, setType] = useState('');
  const [sugarUnit, setSugarUnit] = useState('');
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');

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

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    console.log(email);

    const data = email.trim();

    try {
      const response = await axios.post(UPDATEEMAIL_URL, data, {
        // headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='settings-container'>
      <Nav />
      <div className='filler'></div>
      <div className='settings-wrapper'>
        <h2>Settings</h2>
        <div className='col-wrapper'>
          <form className='settings-form' onSubmit={handleUpdateInfo}>
            <div className='settings-item'>
              <label>Email</label>
              <input
                type='text'
                value={email || ''}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='settings-item'>
              <label>Password</label>
              <input
                type='password'
                value={'password'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='settings-item'>
              <label>Diabetes type</label>
              <select
                required
                onChange={(e) => setType(e.target.value)}
                defaultValue={type}
              >
                <option value={'Type 1'}>Type 1</option>
                <option value={'Type 2'}>Type 2</option>
                <option value={'Gestational'}>Gestational Diabetes</option>
              </select>
            </div>
            <div className='settings-item'>
              <label>Blood sugar unit</label>
              <select
                required
                onChange={(e) => setSugarUnit(e.target.value)}
                defaultValue={sugarUnit}
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
