import done from '../assets/done.svg';
import './Register.css';
import { Link } from 'react-router-dom';

const SuccessRegister = () => {
  return (
    <div
      className='form-container'
      style={{
        width: '350px',
        height: '50vh',
        marginTop: '10vh',
      }}
    >
      <div className='update-pwd'>
        <img src={done} alt='done' style={{ height: '10vh' }} />
        <p>Your account has been created.</p>
        <button
          className='button'
          type='submit'
          style={{ width: 'auto' }}
          // onClick={modal}
        >
          <Link to='/login' style={{ color: 'white' }}>
            Click here to login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SuccessRegister;
