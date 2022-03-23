import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';
import nodata from '../../../assets/data.png';
import React, { useState, useEffect } from 'react';
import InsulinItem from './Items/InsulinItem';
import axios from '../../../axios/axios';

const INSULIN_URL = '/insulin/';
const ActivityPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(INSULIN_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      setData(response?.data);
    } catch (err) {}
  };

  const delay = 1000;

  // handleSubmit();

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
          data.map((insulin) => (
            <div className='items-row' key={insulin._id}>
              <InsulinItem
                date={insulin.date}
                time={insulin.time}
                units={insulin.units}
                type={insulin.type}
                note={insulin.note}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityPage;
