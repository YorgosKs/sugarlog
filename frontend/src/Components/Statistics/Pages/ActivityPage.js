import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';
import nodata from '../../../assets/data.png';
import React, { useState, useEffect } from 'react';
import ActivityItem from './Items/ActivityItem';

import axios from '../../../axios/axios';

const ACTIVITY_URL = '/activity/';
const ActivityPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(ACTIVITY_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      // const resData = response?.data;
      setData(response?.data);
    } catch (err) {}
  };

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
          data.map((activity) => (
            <div className='items-row' key={activity._id}>
              <ActivityItem
                date={activity.date}
                time={activity.time}
                type={activity.type}
                distance={activity.distance}
                calories={activity.calories}
                notes={activity.note}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityPage;
