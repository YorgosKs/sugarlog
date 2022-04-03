import Nav from '../Nav';
import './Dashboard.css';

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

const Dashboard = () => {
  const [infoModal, setInfoModal] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');
  const rangeLevel = [];

  const [dates, setDates] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const todayAVG = [];
  const day2AVG = [];
  const day3AVG = [];
  const day4AVG = [];
  const day5AVG = [];
  const day6AVG = [];
  const day7AVG = [];

  const [day2Date, setDay2Date] = useState();
  const [day3Date, setDay3Date] = useState();
  const [day4Date, setDay4Date] = useState();
  const [day5Date, setDay5Date] = useState();
  const [day6Date, setDay6Date] = useState();
  const [day7Date, setDay7Date] = useState();

  const [day2Month, setDay2Month] = useState();
  const [day3Month, setDay3Month] = useState();
  const [day4Month, setDay4Month] = useState();
  const [day5Month, setDay5Month] = useState();
  const [day6Month, setDay6Month] = useState();
  const [day7Month, setDay7Month] = useState();

  useEffect(() => {
    handleInfoModal();
  }, []);

  useEffect(() => {
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
      console.log(JSON.stringify(response?.data));
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
  };

  const pieRange = () => {
    data.forEach(range);
  };

  const range = (data) => {
    if (data.level > parseInt(minRange) && data.level < parseInt(maxRange)) {
      rangeLevel.push(data.level);
    }
    setCount(rangeLevel.length);

    // DAILY AVG

    const date = new Date();
    date.setDate(date.getDate());
    const today = date.toISOString().split('T')[0];
    const monthToday = date.toLocaleString('en-us', { month: '2-digit' });
    const dayToday = date.toLocaleString('en-us', { day: '2-digit' });

    const day2 = new Date();
    day2.setDate(day2.getDate() - 1);
    const day2fix = day2.toISOString().split('T')[0];
    const month2 = day2.toLocaleString('en-us', { month: '2-digit' });
    const date2 = day2.toLocaleString('en-us', { day: '2-digit' });
    setDay2Date(date2);
    setDay2Month(month2);

    const day3 = new Date();
    day3.setDate(day3.getDate() - 2);
    const day3fix = day3.toISOString().split('T')[0];
    const month3 = day3.toLocaleString('en-us', { month: '2-digit' });
    const date3 = day3.toLocaleString('en-us', { day: '2-digit' });
    setDay3Date(date3);
    setDay3Month(month3);

    const day4 = new Date();
    day4.setDate(day4.getDate() - 3);
    const day4fix = day4.toISOString().split('T')[0];
    const month4 = day4.toLocaleString('en-us', { month: '2-digit' });
    const date4 = day4.toLocaleString('en-us', { day: '2-digit' });
    setDay4Date(date4);
    setDay4Month(month4);

    const day5 = new Date();
    day5.setDate(day5.getDate() - 4);
    const day5fix = day5.toISOString().split('T')[0];
    const month5 = day5.toLocaleString('en-us', { month: '2-digit' });
    const date5 = day5.toLocaleString('en-us', { day: '2-digit' });
    setDay5Date(date5);
    setDay5Month(month5);

    const day6 = new Date();
    day6.setDate(day6.getDate() - 5);
    const day6fix = day6.toISOString().split('T')[0];
    const month6 = day6.toLocaleString('en-us', { month: '2-digit' });
    const date6 = day6.toLocaleString('en-us', { day: '2-digit' });

    setDay6Date(date6);
    setDay6Month(month6);

    const day7 = new Date();
    day7.setDate(day7.getDate() - 6);
    const day7fix = day7.toISOString().split('T')[0];
    const month7 = day7.toLocaleString('en-us', { month: '2-digit' });
    const date7 = day7.toLocaleString('en-us', { day: '2-digit' });

    setDay7Date(date7);
    setDay7Month(month7);

    const checkDate = new Date(data.date);
    const checkDateFormatted = checkDate.toISOString().split('T')[0];

    if (checkDateFormatted === today) {
      todayAVG.push(parseInt(data.level));
    } else if (checkDateFormatted === day2fix) {
      day2AVG.push(parseInt(data.level));
    } else if (checkDateFormatted === day3fix) {
      day3AVG.push(parseInt(data.level));
    } else if (checkDateFormatted === day4fix) {
      day4AVG.push(parseInt(data.level));
    } else if (checkDateFormatted === day5fix) {
      day5AVG.push(parseInt(data.level));
    } else if (checkDateFormatted === day6fix) {
      day6AVG.push(parseInt(data.level));
    } else if (checkDateFormatted === day7fix) {
      day7AVG.push(parseInt(data.level));
    }
  };

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
            <Chart
              todayAVG={todayAVG}
              day2AVG={day2AVG}
              day3AVG={day3AVG}
              day4AVG={day4AVG}
              day5AVG={day5AVG}
              day6AVG={day6AVG}
              day7AVG={day7AVG}
              day2Date={day2Date}
              day2Month={day2Month}
              day3Date={day3Date}
              day3Month={day3Month}
              day4Date={day4Date}
              day4Month={day4Month}
              day5Date={day5Date}
              day5Month={day5Month}
              day6Date={day6Date}
              day6Month={day6Month}
              day7Date={day7Date}
              day7Month={day7Month}
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
    </div>
  );
};

export default Dashboard;
