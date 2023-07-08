import './Landing.css';
import logo from '../assets/logo-horizontal.svg';
import landImg from '../assets/Diabetes-cuate.svg';
import card1 from '../assets/QA engineers-bro.svg';
import card2 from '../assets/Site Stats-rafiki.svg';
import card3 from '../assets/Devices-pana.svg';
import burger from '../assets/burger.svg';

import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Landing = (props) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      navigate('/dashboard');
    } else {
      return;
    }
  }, [navigate]);

  useEffect(() => {
    setOpen(false);
  }, []);

  const menu = () => {
    if (open) setOpen(!open);
    else setOpen(true);
  };

  return (
    <div className='land-container'>
      <div className='hero-section'>
        <div className='top-nav'>
          {/* <a href='#!' className='logo-img'>
            <img src={logo} alt='logo' />
          </a> */}
          <Link to='/' className='logo-img'>
            <img src={logo} alt='logo' />
          </Link>
          <img
            src={burger}
            alt='menu'
            className='burger'
            onClick={menu}
            style={!open ? { position: 'absolute' } : { position: 'fixed' }}
          />
          <div
            className='navigator'
            style={
              !open
                ? { visibility: 'hidden', opacity: '0', display: 'none' }
                : { visibility: 'inherit', opacity: '1' }
            }
          >
            <Link to='/login' className='login-btn'>
              Login
            </Link>
            <Link to='#!'>News</Link>
            <Link to='#!'>About</Link>
          </div>
          <div className='navigator-open'>
            <Link to='/login' className='login-btn'>
              Login
            </Link>
            <Link to='#!'>News</Link>
            <Link to='#!'>About</Link>
          </div>
        </div>
        <div className='hero'>
          <div className='hero-text'>
            <h2>your diabetes tracker.</h2>
            <h1 className='hero-h1'>
              all in
              <br />
              <span style={{ color: '#DD105E' }}>
                ONE <br />
                PLACE!
              </span>
            </h1>
            <button>
              <Link to='/register' style={{ color: 'white' }}>
                Join now!
              </Link>
            </button>
          </div>
          <img src={landImg} alt='hero' />
        </div>
      </div>
      <div className='section-2'>
        <div className='cards'>
          <div className='card-1'>
            <img src={card1} alt='card-1' />
            <p>Keep track of your sugar levels, insulin units and meals.</p>
          </div>
          <div className='card-2'>
            <img src={card2} alt='card-2' />
            <p>Set range levels and see if you are within range.</p>
          </div>
          <div className='card-3'>
            <img src={card3} alt='card-3' />
            <p>Access your account from any device.</p>
          </div>
        </div>
        <div className='email-input'>
          <input
            type='email'
            placeholder='Enter your email'
            onChange={(e) => props.setLandEmail(e.target.value)}
          />
          <button>
            <Link to='/register' style={{ color: 'white' }}>
              Join now!
            </Link>
          </button>
        </div>
      </div>
      <div className='section-3'>
        <div className='footer-left'>
          <a href='#!'>
            <img src={logo} alt='logo' />
          </a>
          <div className='footer-navigator'>
            <Link to='/login'>Login</Link>
            <Link to='#!'>News</Link>
            <Link to='#!'>About</Link>
          </div>
        </div>
        <div className='footer-right'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non vitae
            lectus eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Non vitae lectus eget nisl.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Non vitae lectus eget nisl.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Non vitae lectus eget
            nisl.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
