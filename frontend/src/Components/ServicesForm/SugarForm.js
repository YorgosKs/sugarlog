import './SugarForm.css';
import arrow from '../../assets/arrow.png';
import Nav from '../Nav';

const SugarForm = () => {
  return (
    <div className='form-container'>
      <Nav />
      <div className='back'>
        <img src={arrow} alt='arrow' />
        <span>Sugar</span>
      </div>
      <form>
        <div className='main-value'>
          <input type='text' placeholder='Sugar' />
          <label>mg/dL</label>
        </div>
        <div className='form-input'>
          <label>Date</label>
          <input type='Date' />
        </div>
        <div className='form-input'>
          <label>Time</label>
          <input type='Time' />
        </div>
        <div className='form-input'>
          <label>Period</label>
          <input type='text' />
        </div>
        <div className='form-input'>
          <label>Activity</label>
          <input type='text' />
        </div>
        <div className='form-input'>
          <label>Medication</label>
          <input type='text' />
        </div>
        <div className='form-input'>
          <label>Notes</label>
          <input type='text' />
        </div>
      </form>
      <div>
        <button className='button'>Add</button>
      </div>
    </div>
  );
};

export default SugarForm;
