import { useState, useRef } from 'react';
import './SugarForm.css';

import axios from '../../axios/axios';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const WEIGHT_URL = '/weight/add/';

const EditMealForm = (props) => {
  const [weightNum, setWeightNum] = useState();
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [weightMsg, setWeightMsg] = useState('');

  const [dateMsg, setDateMsg] = useState('');

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

    const weightData = {
      weightNum: weightNum.trim(),
      date: date,
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

      props.closeModal();
    } catch (err) {
      console.log(err);
    }
    setWeightNum('');
    setDate('');
    setNote('');
    setWeightMsg('');
    setDateMsg('');
  };

  const cancelHandler = () => {
    props.closeModal();

    setWeightNum('');
    setDate('');
    setNote('');
    setWeightMsg('');
    setDateMsg('');
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
            onClick={cancelHandler}
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
