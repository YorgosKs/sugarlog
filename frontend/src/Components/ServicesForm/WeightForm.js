import arrow from '../../assets/arrow.png';

const WeightForm = () => {
  return (
    <div className='container'>
      <div className='back'>
        <img src={arrow} alt='arrow' />
        <span>Weight</span>
      </div>
      <form>
        <div className='main-value'>
          <input type='text' placeholder='kg' />
          <label>Weight</label>
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

export default WeightForm;
