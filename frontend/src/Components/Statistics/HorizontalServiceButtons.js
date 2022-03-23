import './HorizontalServiceButtons.css';
import drop from '../../assets/drop.png';
import insulin from '../../assets/insulin.png';
import meal from '../../assets/meal.png';
import activity from '../../assets/activity.png';
import weigth from '../../assets/weight.png';
import pressure from '../../assets/pressure.png';

import SugarPage from './Pages/SugarPage';
import InsulinPage from './Pages/InsulinPage';
import MealPage from './Pages/MealPage';
import ActivityPage from './Pages/ActivityPage';
import PressurePage from './Pages/Pressure';
import WeightPage from './Pages/WeightPage';

import { useState } from 'react';

const HorizontalServiceButtons = (props) => {
  const [sugarClass, setSugarClass] = useState('active-btn');
  const [insulinClass, setInsulinClass] = useState();
  const [mealClass, setMealClass] = useState();
  const [activityClass, setActivityClass] = useState();
  const [weightClass, setWeightClass] = useState();
  const [pressureClass, setPressureClass] = useState();

  const sugarHandler = () => {
    props.setPager(<SugarPage />);
    setInsulinClass('');
    setMealClass('');
    setActivityClass('');
    setWeightClass('');
    setPressureClass('');
    setSugarClass('active-btn');
  };

  const insulinHandler = () => {
    props.setPager(<InsulinPage />);
    setMealClass('');
    setActivityClass('');
    setWeightClass('');
    setPressureClass('');
    setSugarClass('');
    setInsulinClass('active-btn');
  };

  const mealHandler = () => {
    props.setPager(<MealPage />);
    setActivityClass('');
    setWeightClass('');
    setPressureClass('');
    setSugarClass('');
    setInsulinClass('');
    setMealClass('active-btn');
  };

  const activityHandler = () => {
    props.setPager(<ActivityPage />);
    setSugarClass('');
    setWeightClass('');
    setPressureClass('');
    setInsulinClass('');
    setMealClass('');
    setActivityClass('active-btn');
  };

  const weightHandler = () => {
    props.setPager(<WeightPage />);
    setActivityClass('');
    setPressureClass('');
    setSugarClass('');
    setInsulinClass('');
    setMealClass('');
    setWeightClass('active-btn');
  };

  const pressureHandler = () => {
    props.setPager(<PressurePage />);
    setActivityClass('');
    setWeightClass('');
    setSugarClass('');
    setInsulinClass('');
    setMealClass('');
    setPressureClass('active-btn');
  };

  return (
    <div className='horizontal-container'>
      <div className='service-row'>
        <div className={'row-item ' + sugarClass} onClick={sugarHandler}>
          <img src={drop} alt='drop' className='img' />
          <p>Sugar</p>
        </div>
        <div className={'row-item ' + insulinClass} onClick={insulinHandler}>
          <img src={insulin} alt='drop' className='img' />
          <p>Insulin</p>
        </div>
        <div className={'row-item ' + mealClass} onClick={mealHandler}>
          <img src={meal} alt='drop' className='img' />
          <p>Meal</p>
        </div>
        <div className={'row-item ' + activityClass} onClick={activityHandler}>
          <img src={activity} alt='drop' className='img' />
          <p>Activity</p>
        </div>
        <div className={'row-item ' + weightClass} onClick={weightHandler}>
          <img src={weigth} alt='drop' className='img' />
          <p>Weight</p>
        </div>
        <div className={'row-item ' + pressureClass} onClick={pressureHandler}>
          <img src={pressure} alt='drop' className='img' />
          <p>Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalServiceButtons;
