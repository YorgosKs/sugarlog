import './SugarForm.css';
import { useState } from 'react';
import axios from '../../axios/axios';

const SUGAR_URL = '/sugar/add/';
const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const SugarForm = (props) => {
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [activity, setActivtiy] = useState('');
  const [medication, setMedication] = useState('');
  const [note, setNote] = useState('');

  const [levelMsg, setLevelMsg] = useState('');
  const [dateMsg, setDateMsg] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  const handleNewSugar = async (e) => {
    e.preventDefault();

    const levelCheck = NUM_REGEX.test(level);
    console.log(levelCheck);
    if (!levelCheck) {
      setLevelMsg('Sugar level should be a valid number.');
      console.log(levelCheck);
      return;
    } else {
      setLevelMsg('');
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

    const date1 = new Date();
    date1.setDate(date1.getDate());
    const today = date1.toISOString().split('T')[0];

    const day2 = new Date();
    day2.setDate(day2.getDate() - 1);
    const day2fix = day2.toISOString().split('T')[0];

    if (today === date) console.log(true);

    const sugarData = {
      level: level,
      date: date,
      time: time,
      activity: activity,
      medication: medication,
      note: note,
    };
    try {
      const response = await axios.post(SUGAR_URL, JSON.stringify(sugarData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
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

    setLevel('');
    setDate('');
    setTime('');
    setActivtiy('');
    setMedication('');
    setNote('');
    setLevelMsg('');
    setDateMsg('');
    setTimeMsg('');
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleNewSugar}>
        <div className='main-value'>
          <input
            type='number'
            placeholder='Sugar'
            onChange={(e) => setLevel(e.target.value)}
            value={level || ''}
            required
          />
          <label>mg/dL</label>
        </div>
        <p id='emailcheckmsg' className={levelMsg ? 'errmsg' : 'offscreen'}>
          {levelMsg}
        </p>
        <div className='form-input'>
          <label>Date</label>
          <input
            type='Date'
            onChange={(e) => setDate(e.target.value)}
            value={date || ''}
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
            onChange={(e) => setTime(e.target.value)}
            value={time || ''}
            required
          />
        </div>
        <p id='emailcheckmsg' className={timeMsg ? 'errmsg' : 'offscreen'}>
          {timeMsg}
        </p>
        <div className='form-input'>
          <label>Activity</label>
          <input
            type='text'
            onChange={(e) => setActivtiy(e.target.value)}
            value={activity || ''}
          />
        </div>
        <div className='form-input'>
          <label>Medication</label>
          <input
            type='text'
            onChange={(e) => setMedication(e.target.value)}
            value={medication || ''}
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
          <button className='button' type='submit' onClick={props.handleSumbit}>
            Add
          </button>
          <button
            className='button cancel'
            type='button'
            onClick={props.closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default SugarForm;
