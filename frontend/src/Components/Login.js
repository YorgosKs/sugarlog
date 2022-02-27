import './Login.css';

import logo from '../logo.svg';

const Login = () => {
  return (
    <div className='container'>
      <div className='left-side'>
        <div className='login-form'>
          <form>
            <div className='login-form_control title'>
              <h2>Login</h2>
            </div>
            <div className='login-form_control'>
              <label>Email</label>
              <input type='text' />
            </div>
            <div className='login-form_control'>
              <label>Password</label>
              <input type='text' />

              <a href='#' className='form-messages'>
                Forgot password?
              </a>
              <a href='#' className='form-messages'>
                Don't have an account?
              </a>
            </div>
            <div>
              <button className='form-button'>Login</button>
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
