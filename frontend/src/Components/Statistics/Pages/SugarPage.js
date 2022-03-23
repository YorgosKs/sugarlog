import { useState, useEffect } from 'react';
import nodata from '../../../assets/data.png';
import axios from '../../../axios/axios';
import SugarForm from '../../ServicesForm/SugarForm';

import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';
import SugarItem from './Items/SugarItem';

const ACTIVITY_URL = '/sugar/';
const DELETE_URL = '/sugar/delete/';

const SugarPage = (props) => {
  const [data, setData] = useState([]);
  const [date1, setDate] = useState();

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(ACTIVITY_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      // console.log(JSON.stringify(response?.data));
      setData(response?.data);
      const date = new Date(response?.data.date);
      setDate(date);
    } catch (err) {}
  };

  const keyEdit = (key) => {
    handleDelete(key);
  };

  const handleDelete = async (key) => {
    console.log('key ' + key);
    try {
      const response = await axios.delete(DELETE_URL + key, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response?.data);
    } catch (err) {
      console.log(err);
    }

    handleSubmit();
  };
  return (
    <div className='page-container'>
      <div className='export-btn'>
        <button>Export to PDF</button>
        <button>Export to CSV</button>
      </div>
      <hr />
      <div className='items-row'>
        <SugarForm />

        <div className='title-row hide'>
          <p>Level</p>
          <p>Date</p>
          <p>Time</p>
          <p>Period</p>
          <p>Activity</p>
          <p>Medication</p>
          <p>Notes</p>
          <p>Actions</p>
        </div>
        {data.length === 0 ? (
          <div className='no-data-container'>
            <img src={nodata} className='data-img' alt='no-data' />
            <p className='data-p'>Nothing to display</p>
          </div>
        ) : (
          data.map((sugar) => (
            <SugarItem
              key={sugar._id}
              level={sugar.level}
              date={sugar.date}
              time={sugar.time}
              period={sugar.period}
              activity={sugar.activity}
              medication={sugar.medication}
              mes={sugar._id}
              handle={keyEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SugarPage;
