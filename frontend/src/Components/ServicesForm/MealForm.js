import arrow from '../../assets/arrow.png';

const MealForm = () => {
  return (
    <div className='container'>
      <div className='back'>
        <img src={arrow} alt='arrow' />
        <span>Meal</span>
      </div>
      <form>
        <div className='main-value'>
          <input type='text' placeholder='g' />
          <label>Carbs</label>
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
          <label>Protein</label>
          <input type='text' />
        </div>
        <div className='form-input'>
          <label>Fats</label>
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

export default MealForm;
