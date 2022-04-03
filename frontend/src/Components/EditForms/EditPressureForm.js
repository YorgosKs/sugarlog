import { useState, useEffect, useRef } from 'react';
import './EditForm.css';
// import arrow from '../../assets/arrow.png';

const NUM_REGEX = /^[0-9]*$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const EditPressureForm = (props) => {
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

  useEffect(() => {
    setPulse(props.editData.pulse);
  }, [props.editData.pulse]);

  useEffect(() => {
    setDate(props.formattedDate);
  }, [props.formattedDate]);

  useEffect(() => {
    setTime(props.editData.time);
  }, [props.editData.time]);

  useEffect(() => {
    setSystolic(props.editData.systolic);
  }, [props.editData.systolic]);

  useEffect(() => {
    setDiastolic(props.editData.diastolic);
  }, [props.editData.diastolic]);

  useEffect(() => {
    setNote(props.editData.note);
  }, [props.editData.note]);

  const handleData = (e) => {
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
    console.log(pressureData);
    props.getData(pressureData);
    props.setModal();

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

  const modal = () => {
    props.setModal();
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='number'
            // pattern='[0-9]+'
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
            Update
          </button>
          <button className='button cancel' onClick={modal} type='button'>
            Cancel
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default EditPressureForm;
