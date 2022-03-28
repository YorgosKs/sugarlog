import { useState, useEffect } from 'react';
import './SugarForm.css';
import axios from '../../axios/axios';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const INSULIN_URL = '/insulin/add/';

const InsulinForm = (props) => {
  const [units, setUnits] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const [unitsMsg, setUnitsMsg] = useState('');
  const [dateMsg, setDateMsg] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  const handleData = async (e) => {
    e.preventDefault();
    const unitsCheck = NUM_REGEX.test(units);
    if (!unitsCheck) {
      setUnitsMsg('Sugar level should be a valid number.');
      return;
    } else {
      setUnitsMsg('');
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

    const insulinData = {
      units: units.trim(),
      date: date,
      time: time,
      type: type.trim(),
      note: note.trim(),
    };

    try {
      const response = await axios.post(
        INSULIN_URL,
        JSON.stringify(insulinData),
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
            placeholder='Units'
            onChange={(e) => setUnits(e.target.value)}
            value={units || ''}
            required
          />
          <label></label>
        </div>
        <p id='emailcheckmsg' className={unitsMsg ? 'errmsg' : 'offscreen'}>
          {unitsMsg}
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
        <p id='emailcheckmsg' className={dateMsg ? 'errmsg' : 'offscreen'}>
          {dateMsg}
        </p>
        <div className='form-input'>
          <label>Time</label>
          <input
            type='Time'
            value={time || ''}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <p id='emailcheckmsg' className={timeMsg ? 'errmsg' : 'offscreen'}>
          {timeMsg}
        </p>
        <div className='form-input'>
          <label>Type</label>
          <input
            type='text'
            onChange={(e) => setType(e.target.value)}
            value={type || ''}
          />
        </div>
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

export default InsulinForm;
