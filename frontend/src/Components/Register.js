import './Register.css';

import logo from '../logo.svg';

const Login = () => {
  return (
    <div className='container'>
      <div className='left-side'>
        <div className='register-form'>
          <form>
            <div className='register-form_control title'>
              <h2>Register</h2>
            </div>
            <div className='register-form_control'>
              <label>Email</label>
              <input type='text' />
            </div>
            <div className='register-form_control'>
              <label>Password</label>
              <input type='text' />
            </div>
            <div className='register-form_control'>
              <label>Repeat password</label>
              <input type='text' />
              <a href='#' className='form-messages'>
                Already have an account?
              </a>
            </div>
            <div>
              <button className='form-button'>Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className='right-side'>
        <div className='message-container'>
          <div>
            <img src={logo} alt='logo' className='logo' />
          </div>
          <div className='message-content'>
            <h2>Your diabetes tracker.</h2>
          </div>
          <div className='message-content'>
            <h1>
              all in
              <br />
              ONE
              <br />
              PLACE!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
