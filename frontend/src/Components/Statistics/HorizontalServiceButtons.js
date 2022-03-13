import './HorizontalServiceButtons.css';
import drop from '../../assets/drop.png';
import insulin from '../../assets/insulin.png';
import meal from '../../assets/meal.png';
import activity from '../../assets/activity.png';
import weigth from '../../assets/weight.png';
import pressure from '../../assets/pressure.png';

// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// import Flickity from 'react-flickity-component';

const HorizontalServiceButtons = () => {
  return (
    <div className='horizontal-container'>
      <div className='service-row'>
        <div className='row-item active-btn'>
          <img src={drop} alt='drop' className='img' />
          <p>Sugar</p>
        </div>
        <div className='row-item'>
          <img src={insulin} alt='drop' className='img' />
          <p>Insulin</p>
        </div>
        <div className='row-item '>
          <img src={meal} alt='drop' className='img' />
          <p>Meal</p>
        </div>
        <div className='row-item'>
          <img src={activity} alt='drop' className='img' />
          <p>Activity</p>
        </div>
        <div className='row-item'>
          <img src={weigth} alt='drop' className='img' />
          <p>Weight</p>
        </div>
        <div className='row-item'>
          <img src={pressure} alt='drop' className='img' />
          <p>Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalServiceButtons;
