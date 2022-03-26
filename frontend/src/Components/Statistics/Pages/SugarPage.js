import { useState, useEffect } from 'react';
import nodata from '../../../assets/data.png';
import axios from '../../../axios/axios';
import './SugarPage.css';
import SugarItem from './Items/SugarItem';

const GETSUGAR_URL = '/sugar/';
const DELETE_URL = '/sugar/delete/';
const SUGAR_URL = '/sugar/add/';
const GETEDIT_URL = '/sugar/';
const UPDATE_URL = '/sugar/update/';

const SugarPage = (props) => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [keyId, setKeyId] = useState('');
  const [success, setSuccess] = useState(false);
  const [editMsg, setEditMsg] = useState('');
  const [editErrMsg, setEditErrMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    handleSubmit();
  }, []);

  // const handleNewSugar = async (enteredSugarData) => {
  //   const sugarData = {
  //     ...enteredSugarData,
  //   };
  //   try {
  //     const response = await axios.post(SUGAR_URL, JSON.stringify(sugarData), {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     });
  //     console.log(response?.data);
  //     if (response?.data === 400) {
  //       console.log('err');
  //     }
  //   } catch (err) {
  //     if (!err) {
  //       console.log('no response');
  //     } else console.log(err);
  //   }
  //   handleSubmit();
  // };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(GETSUGAR_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setData(response?.data);
    } catch (err) {
      if (err) setErrMsg('No response');
    }
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
      setEditData([]);
      setSuccess(!success);
      setEditMsg('Sugar entry has been updated.');

      console.log(response);
      if (response?.data === 400) {
        console.log('err');
      }
    } catch (err) {
      if (err) {
        console.log('no response');
        setEditErrMsg('Something went wrong.');
      } else console.log(err);
    }

    handleSubmit();
    setTimeout(clearMsg, 3500);
  };

  const clearMsg = () => {
    setEditMsg('');
    setErrMsg('');
  };

  return (
    <div className='page-container'>
      {/* <div className='export-btn'>
        <button>Export to PDF</button>
        <button>Export to CSV</button>
      </div> */}
      <div className='items-row'>
        <div
          className='sucContainer'
          style={editMsg ? { height: 'auto' } : { height: 0 }}
        >
          <p
            className='sucmsg'
            style={
              editMsg
                ? {
                    opacity: 1,
                    height: 'auto',
                    top: '0%',
                    left: '50%',
                  }
                : { opacity: 0 }
            }
          >
            {editMsg}
          </p>
        </div>
        <div
          className='sucContainer'
          style={editErrMsg ? { height: 'auto' } : { height: 0 }}
        >
          <p
            className='errorMsg'
            style={
              editErrMsg
                ? {
                    opacity: 1,
                    height: 'auto',
                    top: '0%',
                    left: '50%',
                  }
                : { opacity: 0 }
            }
          >
            {editErrMsg}
          </p>
        </div>
        <div
          className='sucContainer'
          style={errMsg ? { height: 'auto' } : { height: 0 }}
        >
          <p
            className='errorMsg'
            style={
              errMsg
                ? {
                    opacity: 1,
                    height: 'auto',
                    top: '0%',
                    left: '50%',
                  }
                : { opacity: 0, height: 0 }
            }
          >
            {errMsg}
          </p>
        </div>
        <div className='title-row hide'>
          <p>Level</p>
          <p>Date</p>
          <p>Time</p>
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
              activity={sugar.activity}
              medication={sugar.medication}
              note={sugar.note}
              sugarId={sugar._id}
              handleDel={keyDelete}
              handleEd={keyEdit}
              // EDIT FORM PROPS
              editData={editData}
              getData={handleEditSugar}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SugarPage;
