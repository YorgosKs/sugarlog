import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';
import nodata from '../../../assets/data.png';
import React, { useState, useEffect } from 'react';
import WeightItem from './Items/WeightItem';

import axios from '../../../axios/axios';

const WEIGHT_URL = '/weight/';

const WeightPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(WEIGHT_URL, {
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
          data.map((weight) => (
            <div className='items-row'>
              <WeightItem
                key={weight._id}
                date={weight.date}
                time={weight.time}
                weight={weight.weightNum}
                notes={weight.note}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeightPage;
