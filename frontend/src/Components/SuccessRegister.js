import done from '../assets/done.svg';
import './Register.css';
import { Link } from 'react-router-dom';

const SuccessRegister = () => {
  return (
    <div className='msg_container'>
      <div className='done'>
        <img src={done} alt='done' className='done-svg' />
        <p>Your registration have been completed!</p>
        <p>
          <Link to='/login'>Click here to login</Link>
        </p>
      </div>
    </div>
  );
};

export default SuccessRegister;
