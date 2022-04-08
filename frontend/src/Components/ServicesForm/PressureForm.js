import { useState, useRef } from 'react';
import './SugarForm.css';

import axios from '../../axios/axios';

const NUM_REGEX = /^[0-9]*$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const PRESSURE_URL = 'pressure/add';

const PressureForm = (props) => {
  const [pulse, setPulse] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [pulseMsg, setPulseMsg] = useState('');
  const [systolicMsg, setSystolicMsg] = useState('');
  const [diastolicMsg, setDiastolicMsg] = useState('');

  const [dateMsg, setDateMsg] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  const handleData = async (e) => {
    e.preventDefault();
    const pulseCheck = NUM_REGEX.test(pulse);
    if (!pulseCheck) {
      setPulseMsg('Pulse should be a valid number.');
      return;
    }

    const systolicCheck = NUM_REGEX.test(systolic);
    if (!systolicCheck) {
      setSystolicMsg('Systolic should be a valid number.');
      return;
    } else {
      setDiastolicMsg('');
    }
    const diastolicCheck = NUM_REGEX.test(diastolic);
    if (!diastolicCheck) {
      setDiastolicMsg('Diastolic should be a valid number.');
      return;
    } else {
      setDiastolicMsg('');
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

    const pressureData = {
      pulse: pulse.trim(),
      date: date,
      time: time,
      systolic: systolic.trim(),
      diastolic: diastolic.trim(),
      note: note.trim(),
    };

    try {
      const response = await axios.post(
        PRESSURE_URL,
        JSON.stringify(pressureData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      props.closeModal();
    } catch (err) {
      console.log(err);
    }

    setPulse('');
    setDate('');
    setTime('');
    setSystolic('');
    setDiastolic('');
    setNote('');
    setPulseMsg('');
    setSystolicMsg('');
    setDiastolicMsg('');
    setDateMsg('');
    setTimeMsg('');
  };

  const cancelHandler = () => {
    props.closeModal();

    setPulse('');
    setDate('');
    setTime('');
    setSystolic('');
    setDiastolic('');
    setNote('');
    setPulseMsg('');
    setSystolicMsg('');
    setDiastolicMsg('');
    setDateMsg('');
    setTimeMsg('');
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='number'
            placeholder='Pulse'
            onChange={(e) => setPulse(e.target.value)}
            value={pulse || ''}
            required
          />
          <label>bpm</label>
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={pulseMsg ? 'errmsg' : 'offscreen'}
        >
          {pulseMsg}
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
          <label>Systolic</label>
          <input
            type='number'
            onChange={(e) => setSystolic(e.target.value)}
            value={systolic || ''}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={systolicMsg ? 'errmsg' : 'offscreen'}
        >
          {systolicMsg}
        </p>
        <div className='form-input'>
          <label>Diastolic</label>
          <input
            type='number'
            onChange={(e) => setDiastolic(e.target.value)}
            value={diastolic || ''}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={diastolicMsg ? 'errmsg' : 'offscreen'}
        >
          {diastolicMsg}
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

export default PressureForm;
