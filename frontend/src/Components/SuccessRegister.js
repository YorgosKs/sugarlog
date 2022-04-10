import done from '../assets/done.svg';
import { Link } from 'react-router-dom';
import './Login2.css';

const SuccessRegister = () => {
  return (
    <div className='regSuc'>
      <img src={done} alt='done' style={{ height: '10vh' }} />
      <p>Your account has been created.</p>
      <button className='button' type='submit' style={{ width: 'auto' }}>
        <Link to='/login' style={{ color: 'white' }}>
          Login
        </Link>
      </button>
    </div>
  );
};

export default SuccessRegister;
