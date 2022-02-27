import './Nav.css';
import logo from '../logo-top.svg';
import logout from '../logout.png';

const Nav = () => {
  return (
    <div className='nav-container'>
      <div className='logo-nav'>
        <img src={logo} alt='logo' />
      </div>
      <div className='nav-browse'>
        <div>
          <p className='active'>Home</p>
        </div>
        <div>
          <p>Statistics</p>
        </div>
        <div>
          <p>Settings</p>
        </div>
        <button className='logout-button'>
          <span>
            <img src={logout} alt='logout' className='logout-img' />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
