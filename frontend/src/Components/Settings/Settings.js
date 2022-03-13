import './Settings.css';
import Nav from '../Nav';
const Settings = () => {
  return (
    <div className='settings-container'>
      <Nav />
      <div className='filler'></div>
      <div className='settings-wrapper'>
        <h2>Settings</h2>
        <div className='col-wrapper'>
          <form className='settings-form'>
            <div className='settings-item'>
              <label>Email</label>
              <input type='text' value={'email@email.com'} />
            </div>
            <div className='settings-item'>
              <label>Password</label>
              <input type='password' value={'password'} />
            </div>
            <div className='settings-item'>
              <label>Diabetes type</label>
              <input type='text' value={'Type 1'} />
            </div>
            <div className='settings-item'>
              <label>Blood sugar unit</label>
              <input type='text' value={'mg/dL'} />
            </div>
            <div className='settings-item'>
              <label>Weight unit</label>
              <input type='text' value={'kg'} />
            </div>
            <div className='settings-item'>
              <label>Range</label>
              <input type='text' value={'120 - 150'} />
            </div>
          </form>
        </div>
        <div className='btn-item'>
          <button className='item-button'>Save changes</button>
        </div>
        <div className='btm-filler'></div>
      </div>
    </div>
  );
};

export default Settings;
