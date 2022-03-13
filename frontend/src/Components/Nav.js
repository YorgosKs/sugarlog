import './Nav.css';
import logo from '../logo-top.svg';
import logoDrop from '../logo-drop.svg';
import logout from '../logout.svg';
import dash from '../assets/dashboard.svg';
import stats from '../assets/stats.svg';
import settings from '../assets/settings.svg';

const Nav = () => {
  return (
    <div className='nav-container'>
      <div className='logo-nav'>
        <img src={logo} alt='logo' className='logo-full' />
        <img src={logoDrop} alt='logo-drop' className='logo-drop' />
      </div>
      <div className='nav-browse'>
        <div className='nav-item active'>
          <img src={dash} alt='dashboard' className='nav-img ' />
          <p>Dashboard</p>
        </div>
        <div className='nav-item'>
          <img src={stats} alt='stats' className='nav-img' />
          <p>Statistics</p>
        </div>
        <div className='nav-item'>
          <img src={settings} alt='settings' className='nav-img' />
          <p>Settings</p>
        </div>
        <button className='logout-button'>
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
