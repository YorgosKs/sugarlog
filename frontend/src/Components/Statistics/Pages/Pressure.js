import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';
import nodata from '../../../assets/data.png';
import React, { useState, useEffect } from 'react';
import PressureItem from './Items/PressureItem';

import axios from '../../../axios/axios';

const PRESSURE_URL = '/pressure/';

const PressurePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(PRESSURE_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      // const resData = response?.data;
      setData(response?.data);
    } catch (err) {}
  };
  return (
    <div className='page-container'>
      <div className='export-btn'>
        <button>Export to PDF</button>
        <button>Export to CSV</button>
      </div>
      <hr />
      <div className='items-row'>
        {data.length === 0 ? (
          <div className='no-data-container'>
            <img src={nodata} className='data-img' alt='no-data' />
            <p className='data-p'>Nothing to display</p>
          </div>
        ) : (
          data.map((pressure) => (
            <div className='items-row' key={pressure._id}>
              <PressureItem
                date={pressure.date}
                time={pressure.time}
                systolic={pressure.systolic}
                diastolic={pressure.diastolic}
                pulse={pressure.pulse}
                notes={pressure.note}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PressurePage;
