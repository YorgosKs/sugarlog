import { useState, useEffect } from 'react';
import nodata from '../../../assets/data.png';
import axios from '../../../axios/axios';
import SugarForm from '../../ServicesForm/SugarForm';
import EditSugarForm from '../../EditForms/EditSugarForm';
import './SugarPage.css';
import SugarItem from './Items/SugarItem';

const ACTIVITY_URL = '/sugar/';
const DELETE_URL = '/sugar/delete/';
const SUGAR_URL = '/sugar/add/';
const GETEDIT_URL = '/sugar/';
const UPDATE_URL = '/sugar/update';

const SugarPage = (props) => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);

  const [date1, setDate] = useState();
  const [keyId, setKeyId] = useState('');

  const sugarData = [
    {
      id: 1,
      level: '200',
      date: '2022-03-24T00:00:00.000Z',
      time: '03:40',
      period: 'test',
      activity: 'test',
      medication: 'test',
      note: 'test',
    },
    {
      id: 2,
      level: '200',
      date: '2022-03-24T00:00:00.000Z',
      time: '03:40',
      period: 'test',
      activity: 'test',
      medication: 'test',
      note: 'test',
    },
  ];

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleNewSugar = async (enteredSugarData) => {
    const sugarData = {
      ...enteredSugarData,
    };
    try {
      const response = await axios.post(SUGAR_URL, JSON.stringify(sugarData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response?.data);
      if (response?.data === 400) {
        console.log('err');
      }
    } catch (err) {
      if (!err) {
        console.log('no response');
      } else console.log(err);
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(ACTIVITY_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setData(response?.data);
      // const date = new Date(response?.data.date);
      // setDate(date);
    } catch (err) {}
  };

  const keyDelete = (key) => {
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

  const keyEdit = (key) => {
    getEdit(key);
    setKeyId(key);
  };

  const getEdit = async (key) => {
    try {
      const response = await axios.get(GETEDIT_URL + key, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response?.data);
      setEditData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSugar = async (data) => {
    const sugarData = {
      ...data,
    };
    try {
      const response = await axios.post(
        UPDATE_URL + keyId,
        JSON.stringify(sugarData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(keyId);
      setKeyId('');
      console.log(response);
      if (response?.data === 400) {
        console.log('err');
      }
    } catch (err) {
      if (!err) {
        console.log('no response');
      } else console.log(err);
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
        <EditSugarForm editData={sugarData} getData={handleEditSugar} />
        <SugarForm onAddSugar={handleNewSugar} />
        {/* onEditSugar={handleEditSugar} */}
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
          sugarData.map((sugar) => (
            <SugarItem
              key={sugar.id}
              level={sugar.level}
              date={sugar.date}
              time={sugar.time}
              period={sugar.period}
              activity={sugar.activity}
              medication={sugar.medication}
              note={sugar.note}
              sugarId={sugar.id}
              handleDel={keyDelete}
              handleEd={keyEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SugarPage;
