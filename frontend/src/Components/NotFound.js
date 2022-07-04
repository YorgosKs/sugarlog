import logo from '../assets/logo-shadow.png';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={logo} alt='logo' className='notfound-logo' />
      <h1>There is nothing here!</h1>
      <Link to='/' className='form-messages'>
        Go to homepage
      </Link>
    </div>
  );
};

export default NotFound;
