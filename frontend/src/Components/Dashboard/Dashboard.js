import Nav from '../Nav';
import './Dashboard.css';

import Chart from './Widgets/Chart';
import PieInRange from './Widgets/PieInRange';
import PieHourRange from './Widgets/PieHourRange';
import ServiceButtons from './ServiceButtons';
import jwt_decode from 'jwt-decode';
import SugarForm from '../ServicesForm/SugarForm';
import InfoModal from './InfoModal';
import axios from '../../axios/axios';

import { useState, useEffect } from 'react';
const GETUSER_URL = '/';

const Dashboard = () => {
  const [infoModal, setInfoModal] = useState(true);

  useEffect(() => {
    handleInfoModal();
  });

  const handleInfoModal = async () => {
    try {
      const response = await axios.get(GETUSER_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      if (response?.data.infoComplete === false)
        setInfoModal(response?.data.infoComplete);
      else setInfoModal(true);
      console.log(infoModal);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseInfoModal = (data) => {
    if (data === true) setInfoModal(!infoModal);
    console.log(data);
  };

  const today = new Date();
  const curHr = today.getHours();
  let msg = '';

  if (curHr < 12) {
    msg = 'Good morning!';
  } else if (curHr < 18) {
    msg = 'Good afternoon!';
  } else {
    msg = 'Good evening!';
  }

  return (
    <div className='dashboard-container'>
      <Nav />

      <div className='wrapper'>
        <div
          className='modal'
          style={
            infoModal === false
              ? { opacity: 1, left: '50%', top: '50%' }
              : { opacity: 0 }
          }
        >
          <InfoModal closeInfoModal={handleCloseInfoModal} />
        </div>
        <h2 className='msg'>{msg}</h2>
        <div className='dashboard-wrapper'>
          <div className='left-col'>
            <Chart />
            <div className='horizontal-pie'>
              <PieInRange />
            </div>
            <ServiceButtons />
          </div>
          <div className='right-col'>
            <PieInRange />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
