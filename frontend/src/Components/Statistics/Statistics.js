import './Statistics.css';
import HorizontalServiceButtons from './HorizontalServiceButtons';
import Nav from '../Nav';
import SugarPage from './Pages/SugarPage';
import InsulinPage from './Pages/InsulinPage';
import MealPage from './Pages/MealPage';
import ActivityPage from './Pages/ActivityPage';
import PressurePage from './Pages/Pressure';
import WeightPage from './Pages/WeightPage';

const Statistics = () => {
  return (
    <div className='stats-container'>
      <Nav />
      <div className='filler'></div>
      <div className='stats-wrapper'>
        <HorizontalServiceButtons />
        {/* <WeightPage /> */}
        <ActivityPage />
        <div className='btm-filler'></div>
      </div>
    </div>
  );
};

export default Statistics;
