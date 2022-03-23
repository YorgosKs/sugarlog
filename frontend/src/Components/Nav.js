import './Nav.css';
import logo from '../logo-top.svg';
import logoDrop from '../logo-drop.svg';
import logout from '../logout.svg';
import dash from '../assets/dashboard.svg';
import stats from '../assets/stats.svg';
import settings from '../assets/settings.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../axios/axios';
const LOGOUT_URL = '/logout';

const Nav = (props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(LOGOUT_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response?.data);
      // const state = false;
      // props.logOutState(state);
      localStorage.removeItem('active');
      // navigate('/');
      window.location.replace('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='nav-container'>
      <Link to='/dashboard'>
        <div className='logo-nav'>
          <img src={logo} alt='logo' className='logo-full' />
          <img src={logoDrop} alt='logo-drop' className='logo-drop' />
        </div>
      </Link>
      <div className='nav-browse'>
        <Link to='/dashboard'>
          <div className='nav-item active' aria-label='Back to the page'>
            <img src={dash} alt='dashboard' className='nav-img ' />
            <p>Dashboard</p>
          </div>
        </Link>

        <Link to='/statistics'>
          <div className='nav-item'>
            <img src={stats} alt='stats' className='nav-img' />
            <p>Statistics</p>
          </div>
        </Link>

        <Link to='/settings'>
          <div className='nav-item'>
            <img src={settings} alt='settings' className='nav-img' />
            <p>Settings</p>
          </div>
        </Link>
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
