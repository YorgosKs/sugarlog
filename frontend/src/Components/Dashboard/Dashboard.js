import Nav from '../Nav';
import './Dashboard.css';

import logo from '../../logo-top.svg';

import Chart from './Widgets/Chart';
import PieInRange from './Widgets/PieInRange';
import PieHourRange from './Widgets/PieHourRange';
import ServiceButtons from './ServiceButtons';
import SugarForm from '../ServicesForm/SugarForm';
import InfoModal from './InfoModal';
import axios from '../../axios/axios';

import { useState, useEffect } from 'react';

const GETUSER_URL = '/';
const GETSUGAR_URL = '/sugar/';
const GETINFO_URL = '/info/';

const AVGDATA_URL = '/sugar/avg-data';

const Dashboard = () => {
  const [load, setLoad] = useState(false);
  const [infoModal, setInfoModal] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');
  const rangeLevel = [];

  const [dates, setDates] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [response, setResponse] = useState(false);

  const [today, setToday] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [day4, setDay4] = useState([]);
  const [day5, setDay5] = useState([]);
  const [day6, setDay6] = useState([]);
  const [day7, setDay7] = useState([]);

  useEffect(() => {
    handleInfoModal();
  }, []);

  useEffect(() => {
    setLoad(false);
    handleSubmit();
    handleGetInfo();
  }, []);

  useEffect(() => {
    pieRange();
  });

  const handleGetInfo = async () => {
    try {
      const response = await axios.get(GETINFO_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setMinRange(response?.data.minRange);
      setMaxRange(response?.data.maxRange);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(GETSUGAR_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setData(response?.data);
    } catch (err) {
      if (err) setErrMsg('No respons');
    }

    try {
      const response = await axios.get(AVGDATA_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response?.data[0].length > 0) setToday(response?.data[0]);
      else setToday([]);
      if (response?.data[1].length > 0) setDay2(response?.data[1]);
      else setDay2([]);
      if (response?.data[2].length > 0) setDay3(response?.data[2]);
      else setDay3([]);
      if (response?.data[3].length > 0) setDay4(response?.data[3]);
      else setDay4([]);
      if (response?.data[4].length > 0) setDay5(response?.data[4]);
      else setDay5([]);
      if (response?.data[5].length > 0) setDay6(response?.data[5]);
      else setDay6([]);
      if (response?.data[6].length > 0) setDay7(response?.data[6]);
      else setDay7([]);
    } catch (err) {
      console.log(err);
    }
  };

  const pieRange = () => {
    data.forEach(range);
  };

  const range = (data) => {
    if (data.level >= parseInt(minRange) && data.level <= parseInt(maxRange)) {
      rangeLevel.push(data.level);
    }
    setCount(rangeLevel.length);
    setTimeout(() => setLoad(true), 500);
  };

  const handleInfoModal = async () => {
    try {
      const response = await axios.get(GETUSER_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response?.data.infoComplete === false)
        setInfoModal(response?.data.infoComplete);
      else setInfoModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseInfoModal = (data) => {
    if (data === true) setInfoModal(!infoModal);
    console.log(data);
  };

  const date = new Date();
  const curHr = date.getHours();
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

      {!load ? (
        <div className='loader'>
          <img src={logo} alt='logo' className='a' />
        </div>
      ) : (
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
              <Chart
                today={today}
                day2={day2}
                day3={day3}
                day4={day4}
                day5={day5}
                day6={day6}
                day7={day7}
              />
              <div className='horizontal-pie'>
                <PieInRange percentage={(count / data.length) * 100} />
              </div>
              <ServiceButtons handleSubmit={handleSubmit} pieRange={pieRange} />
            </div>
            <div className='right-col'>
              <PieInRange percentage={(count / data.length) * 100} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
