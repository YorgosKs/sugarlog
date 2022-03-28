import { useState, useEffect, useRef } from 'react';
import './EditForm.css';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const EditInsulinForm = (props) => {
  const [units, setUnits] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [unitsMsg, setUnitsMsg] = useState('');
  const [dateMsg, setDateMsg] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  useEffect(() => {
    setUnits(props.editData.units);
  }, [props.editData.units]);

  useEffect(() => {
    setDate(props.editData.date);
  }, [props.editData.date]);

  useEffect(() => {
    setTime(props.editData.time);
  }, [props.editData.time]);

  useEffect(() => {
    setType(props.editData.type);
  }, [props.editData.type]);

  useEffect(() => {
    setNote(props.editData.note);
  }, [props.editData.note]);

  const handleData = (e) => {
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
    console.log(insulinData);
    props.getData(insulinData);
    props.setModal();

    setUnits('');
    setDate('');
    setTime('');
    setType('');
    setNote('');
    setUnitsMsg('');
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
            placeholder='Units'
            onChange={(e) => setUnits(e.target.value)}
            value={units || ''}
            required
          />
          <label></label>
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={unitsMsg ? 'errmsg' : 'offscreen'}
        >
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

export default EditInsulinForm;
