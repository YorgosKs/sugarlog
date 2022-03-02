import './Settings.css';
import Nav from '../Nav';
const Settings = () => {
  return (
    <div className='settings-container'>
      <Nav />
      <div className='settings-wrapper'>
        <h2>Settings</h2>
        <div className='col-wrapper'>
          <div className='title-col'>
            <p>Email</p>
            <p>Password</p>
            <p>Diabetes type</p>
            <p>Sugar unit</p>
            <p>Weight unit</p>
            <p>Sugar level range</p>
          </div>
          <div className='prop-col'>
            <p>email</p>
            <p>password</p>
            <p>Type I</p>
            <p>mg/dL</p>
            <p>kg</p>
            <p>120 - 180</p>
          </div>
          <div className='btn-col'>
            <button className='item-button'>Change</button>
            <button className='item-button'>Change</button>
            <button className='item-button'>Change</button>
            <button className='item-button'>Change</button>
            <button className='item-button'>Change</button>
            <button className='item-button'>Change</button>
          </div>
        </div>
        <div className='btn-item'>
          <button className='item-button'>Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
