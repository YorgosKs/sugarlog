import './ServiceButtons.css';
import drop from '../../assets/drop.png';
import insulin from '../../assets/insulin.png';
import meal from '../../assets/meal.png';
import activity from '../../assets/activity.png';
import weight from '../../assets/weight.png';
import pressure from '../../assets/pressure.png';

import SugarForm from '../ServicesForm/SugarForm';
import InsulinForm from '../ServicesForm/InsulinForm';
import MealForm from '../ServicesForm/MealForm';
import ActivityForm from '../ServicesForm/ActivityForm';
import WeightForm from '../ServicesForm/WeightForm';
import PressureForm from '../ServicesForm/PressureForm';

import { useState } from 'react';

const ServiceButtons = () => {
  const [isOpenSugar, setIsOpenSugar] = useState(false);
  const [isOpenInsulin, setIsOpenInsulin] = useState(false);
  const [isOpenMeal, setIsOpenMeal] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);
  const [isOpenWeight, setIsOpenWeight] = useState(false);
  const [isOpenPressure, setIsOpenPressure] = useState(false);

  const closeModalSugar = () => {
    setIsOpenSugar(false);
  };

  const closeModalInsulin = () => {
    setIsOpenInsulin(false);
  };

  const closeModalMeal = () => {
    setIsOpenMeal(false);
  };

  const closeModalActivity = () => {
    setIsOpenActivity(false);
  };

  const closeModalWeight = () => {
    setIsOpenWeight(false);
  };

  const closeModalPressure = () => {
    setIsOpenPressure(false);
  };

  return (
    <div>
      <div
        className='modal'
        style={
          isOpenSugar ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }
        }
      >
        <SugarForm closeModal={closeModalSugar} />
      </div>
      <div
        className='modal'
        style={
          isOpenInsulin
            ? { opacity: 1, left: '50%', top: '50%' }
            : { opacity: 0 }
        }
      >
        <InsulinForm closeModal={closeModalInsulin} />
      </div>
      <div
        className='modal'
        style={
          isOpenMeal ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }
        }
      >
        <MealForm closeModal={closeModalMeal} />
      </div>
      <div
        className='modal'
        style={
          isOpenActivity
            ? { opacity: 1, left: '50%', top: '50%' }
            : { opacity: 0 }
        }
      >
        <ActivityForm closeModal={closeModalActivity} />
      </div>
      <div
        className='modal'
        style={
          isOpenWeight
            ? { opacity: 1, left: '50%', top: '50%' }
            : { opacity: 0 }
        }
      >
        <WeightForm closeModal={closeModalWeight} />
      </div>
      <div
        className='modal'
        style={
          isOpenPressure
            ? { opacity: 1, left: '50%', top: '50%' }
            : { opacity: 0 }
        }
      >
        <PressureForm closeModal={closeModalPressure} />
      </div>
      <div className='row'>
        <div className='item' onClick={() => setIsOpenSugar(true)}>
          <img src={drop} alt='drop' className='img' />
          <p>Sugar</p>
        </div>

        <div className='item' onClick={() => setIsOpenInsulin(true)}>
          <img src={insulin} alt='drop' className='img' />
          <p>Insulin</p>
        </div>
        <div className='item' onClick={() => setIsOpenMeal(true)}>
          <img src={meal} alt='drop' className='img' />
          <p>Meal</p>
        </div>
      </div>
      <div className='row'>
        <div className='item' onClick={() => setIsOpenActivity(true)}>
          <img src={activity} alt='drop' className='img' />
          <p>Activity</p>
        </div>
        <div className='item' onClick={() => setIsOpenWeight(true)}>
          <img src={weight} alt='drop' className='img' />
          <p>Weight</p>
        </div>

        <div className='item' onClick={() => setIsOpenPressure(true)}>
          <img src={pressure} alt='drop' className='img' />
          <p>Pressure</p>
        </div>
      </div>
      <div className='footer'></div>
    </div>
  );
};

export default ServiceButtons;
