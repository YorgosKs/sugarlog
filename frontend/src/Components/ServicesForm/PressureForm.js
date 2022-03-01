import arrow from '../../assets/arrow.png';

const PressureForm = () => {
  return (
    <div className='container'>
      <div className='back'>
        <img src={arrow} alt='arrow' />
        <span>Pressure</span>
      </div>
      <form>
        <div className='main-value'>
          <input type='text' placeholder='bpm' />
          <label>Pulse</label>
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
          <label>Systolic</label>
          <input type='text' placeholder='mmHg' />
        </div>
        <div className='form-input'>
          <label>Diastolic</label>
          <input type='text' placeholder='mmHg' />
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

export default PressureForm;
