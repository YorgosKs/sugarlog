import './ServiceButtons.css';
import drop from '../../assets/drop.png';
import insulin from '../../assets/insulin.png';
import meal from '../../assets/meal.png';
import activity from '../../assets/activity.png';
import weigth from '../../assets/weight.png';
import pressure from '../../assets/pressure.png';

const ServiceButtons = () => {
  return (
    <div>
      <div className='row'>
        <div className='item'>
          <img src={drop} alt='drop' className='img' />
          <p>Sugar</p>
        </div>
        <div className='item'>
          <img src={insulin} alt='drop' className='img' />
          <p>Insulin</p>
        </div>
        <div className='item'>
          <img src={meal} alt='drop' className='img' />
          <p>Meal</p>
        </div>
      </div>
      <div className='row'>
        <div className='item'>
          <img src={activity} alt='drop' className='img' />
          <p>Activity</p>
        </div>
        <div className='item'>
          <img src={weigth} alt='drop' className='img' />
          <p>Weight</p>
        </div>

        <div className='item'>
          <img src={pressure} alt='drop' className='img' />
          <p>Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceButtons;
