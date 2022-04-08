import './Nav.css';
import logo from '../logo-top.svg';
import logoDrop from '../logo-drop.svg';
import logout from '../logout.png';
import dashFocus from '../assets/dashboard.png';
import dash from '../assets/dash.png';

import stats from '../assets/stats.png';
import statsFocus from '../assets/stats_focus.png';
import settings from '../assets/settings.svg';
import settingsFocus from '../assets/settings_focus.svg';

import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from '../axios/axios';

const LOGOUT_URL = '/logout';

const Nav = (props) => {
  const [activeDash, setActiveDash] = useState(false);
  const [activeStats, setActiveStats] = useState(false);
  const [activeSettings, setActiveSettings] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(LOGOUT_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      localStorage.removeItem('token');
      window.location.replace('/login');
      return false;
    } catch (err) {
      console.log(err);
    }
  };

  const handleActiveDash = () => {
    setActiveDash(true);
    setActiveStats(false);
    setActiveSettings(false);
  };
  const pathname = window.location.pathname;
  return (
    <div className='nav-container'>
      <Link to='/dashboard'>
        <div className='logo-nav'>
          <img src={logo} alt='logo' className='logo-full' />
          <img src={logoDrop} alt='logo-drop' className='logo-drop' />
        </div>
      </Link>
      <div className='nav-browse'>
        <NavLink to='/dashboard'>
          <div className='nav-item'>
            {pathname === '/dashboard' ? (
              <img src={dashFocus} alt='dashboard' className='nav-img' />
            ) : (
              <img
                src={dash}
                alt='dashboard'
                className='nav-img'
                onMouseOver={(e) => (e.currentTarget.src = dashFocus)}
                onMouseOut={(e) => (e.currentTarget.src = dash)}
              />
            )}
            <p>Dashboard</p>
          </div>
        </NavLink>

        <NavLink to='/statistics'>
          <div className='nav-item'>
            {pathname === '/statistics' ? (
              <img src={statsFocus} alt='statistics' className='nav-img' />
            ) : (
              <img
                src={stats}
                alt='statistics'
                className='nav-img'
                onMouseOver={(e) => (e.currentTarget.src = statsFocus)}
                onMouseOut={(e) => (e.currentTarget.src = stats)}
              />
            )}
            <p>Statistics</p>
          </div>
        </NavLink>

        <NavLink to='/settings'>
          <div className='nav-item'>
            {pathname === '/settings' ? (
              <img src={settingsFocus} alt='settings' className='nav-img' />
            ) : (
              <img
                src={settings}
                alt='settings'
                className='nav-img'
                onMouseOver={(e) => (e.currentTarget.src = settingsFocus)}
                onMouseOut={(e) => (e.currentTarget.src = settings)}
              />
            )}
            <p>Settings</p>
          </div>
        </NavLink>
        <button className='logout-button' onClick={handleLogout}>
          <span>
            <img src={logout} alt='logout' className='logout-img' />
          </span>
          <span className='btn-text'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
