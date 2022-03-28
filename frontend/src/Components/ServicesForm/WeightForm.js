import { useState, useEffect, useRef } from 'react';
import './SugarForm.css';

import axios from '../../axios/axios';
// import arrow from '../../assets/arrow.png';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const WEIGHT_URL = '/weight/add/';

const EditMealForm = (props) => {
  const [weightNum, setWeightNum] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [weightMsg, setWeightMsg] = useState('');

  const [dateMsg, setDateMsg] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  const handleData = async (e) => {
    e.preventDefault();
    const numCheck = NUM_REGEX.test(weightNum);
    if (!numCheck) {
      setWeightMsg('Weight should be a valid number.');
      return;
    } else {
      setWeightMsg('');
    }

    const dateCheck = DATE_REGEX.test(date);
    if (!dateCheck) {
      setDateMsg('This should be a valid date.');
      return;
    } else {
      setDateMsg('');
    }

    if (time === '') {
      setTimeMsg('Please fill time.');
      return;
    } else {
      setTimeMsg('');
    }

    const weightData = {
      weightNum: weightNum.trim(),
      date: date,
      time: time,
      note: note.trim(),
    };

    try {
      const response = await axios.post(
        WEIGHT_URL,
        JSON.stringify(weightData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      props.closeModal();
      if (response?.data === 400) {
        console.log('err');
      }
    } catch (err) {
      if (!err) {
        console.log('no response');
      } else console.log(err);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='number'
            // pattern='[0-9]+'
            placeholder='Weight'
            onChange={(e) => setWeightNum(e.target.value)}
            value={weightNum || ''}
            required
          />
          <label>Kg</label>
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={weightMsg ? 'errmsg' : 'offscreen'}
        >
          {weightMsg}
        </p>
        <div className='form-input'>
          <label>Date</label>
          <input
            type='Date'
            value={date || ''}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={dateMsg ? 'errmsg' : 'offscreen'}
        >
          {dateMsg}
        </p>
        <div className='form-input'>
          <label>Time</label>
          <input
            type='Time'
            value={time || ''}
            onChange={(e) => setTime(e.target.value)}
            // required
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={timeMsg ? 'errmsg' : 'offscreen'}
        >
          {timeMsg}
        </p>
        <div className='form-input'>
          <label>Notes</label>
          <input
            type='text'
            onChange={(e) => setNote(e.target.value)}
            value={note || ''}
          />
        </div>
        <div className='btn-group'>
          <button className='button' type='submit'>
            Add
          </button>
          <button
            className='button cancel'
            onClick={props.closeModal}
            type='button'
          >
            Cancel
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default EditMealForm;
