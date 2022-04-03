import { useState, useEffect, useRef } from 'react';
import axios from '../../axios/axios';
import './SugarForm.css';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const ACTIVITY_URL = '/activity/add/';

const MealForm = (props) => {
  const [type, setType] = useState();
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [distanceMsg, setDistanceMsg] = useState('');
  const [caloriesMsg, setCaloriesMsg] = useState('');

  const [dateMsg, setDateMsg] = useState('');

  const handleData = async (e) => {
    e.preventDefault();
    const distanceCheck = NUM_REGEX.test(distance);
    if (!distanceCheck) {
      setDistanceMsg('Distance should be a valid number.');
      return;
    } else {
      setDistanceMsg('');
    }
    const caloriesCheck = NUM_REGEX.test(calories);
    if (!caloriesCheck) {
      setCaloriesMsg('Calories should be a valid number.');
      return;
    } else {
      setCaloriesMsg('');
    }
    const dateCheck = DATE_REGEX.test(date);
    if (!dateCheck) {
      setDateMsg('This should be a valid date.');
      return;
    } else {
      setDateMsg('');
    }

    const activityData = {
      type: type.trim(),
      date: date,
      distance: distance.trim(),
      calories: calories.trim(),
      note: note.trim(),
    };

    try {
      const response = await axios.post(
        ACTIVITY_URL,
        JSON.stringify(activityData),
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

    setType('');
    setDate('');
    setDistance('');
    setCalories('');
    setNote('');
    setDistanceMsg('');
    setCaloriesMsg('');
    setDateMsg('');
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='text'
            // placeholder='eg running'
            onChange={(e) => setType(e.target.value)}
            value={type || ''}
            required
          />
          <label>Type</label>
        </div>
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
          <label>Distance</label>
          <input
            type='number'
            onChange={(e) => setDistance(e.target.value)}
            value={distance || ''}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={distanceMsg ? 'errmsg' : 'offscreen'}
        >
          {distanceMsg}
        </p>
        <div className='form-input'>
          <label>Calories</label>
          <input
            type='number'
            onChange={(e) => setCalories(e.target.value)}
            value={calories || ''}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={caloriesMsg ? 'errmsg' : 'offscreen'}
        >
          {caloriesMsg}
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

export default MealForm;
