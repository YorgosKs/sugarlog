import './Statistics.css';
import HorizontalServiceButtons from './HorizontalServiceButtons';
import Nav from '../Nav';
import SugarPage from './Pages/SugarPage';
import InsulinPage from './Pages/InsulinPage';
import MealPage from './Pages/MealPage';
import ActivityPage from './Pages/ActivityPage';
import PressurePage from './Pages/Pressure';
import WeightPage from './Pages/WeightPage';
import { useState, useEffect } from 'react';

import logo from '../../logo-top.svg';

const Statistics = (props) => {
  const [page, setPage] = useState(<SugarPage />);
  const [currPage, setCurrPage] = useState();

  useEffect(() => {
    setPage(page);
  }, [page, props]);

  const pageSetter = (data) => {
    setPage(data);
  };

  return (
    <div className='stats-container'>
      <Nav />
      <div className='filler'></div>

      <div className='stats-wrapper'>
        <HorizontalServiceButtons setPager={pageSetter} />
        {/* <SugarPage /> */}
        {/* <InsulinPage /> */}
        {/* <ActivityPage /> */}
        {/* <MealPage /> */}
        {/* <WeightPage /> */}
        {/* <PressurePage /> */}

        {page}

        <div className='btm-filler'></div>
      </div>
    </div>
  );
};

export default Statistics;
