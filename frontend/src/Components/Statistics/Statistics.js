import './Statistics.css';
import HorizontalServiceButtons from './HorizontalServiceButtons';
import Nav from '../Nav';
import SugarPage from './Pages/SugarPage';
import { useState, useEffect } from 'react';

const Statistics = (props) => {
  const [page, setPage] = useState(<SugarPage />);

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
        {page}
        <div className='btm-filler'></div>
      </div>
    </div>
  );
};

export default Statistics;
