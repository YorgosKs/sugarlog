import { useState, useEffect, useRef } from 'react';
import './EditForm.css';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const EditSugarForm = (props) => {
  const [level, setLevel] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [activity, setActivtiy] = useState('');
  const [medication, setMedication] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [levelMsg, setLevelMsg] = useState('');
  const [dateMsg, setDateMsg] = useState('');
  const [timeMsg, setTimeMsg] = useState('');

  useEffect(() => {
    setLevel(props.editData.level);
  }, [props.editData.level]);

  useEffect(() => {
    setDate(props.formattedDate);
  }, [props.formattedDate]);

  useEffect(() => {
    setTime(props.editData.time);
  }, [props.editData.time]);

  useEffect(() => {
    setActivtiy(props.editData.activity);
  }, [props.editData.activity]);

  useEffect(() => {
    setMedication(props.editData.medication);
  }, [props.editData.medication]);

  useEffect(() => {
    setNote(props.editData.note);
  }, [props.editData.note]);

  const handleData = (e) => {
    e.preventDefault();
    const levelCheck = NUM_REGEX.test(level);
    if (!levelCheck) {
      setLevelMsg('Sugar level should be a valid number.');
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

    const sugarData = {
      level: level.trim(),
      date: date,
      time: time,
      activity: activity.trim(),
      medication: medication.trim(),
      note: note.trim(),
    };
    console.log(sugarData);
    props.getData(sugarData);
    props.setModal();

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
            placeholder='Sugar'
            onChange={(e) => setLevel(e.target.value)}
            value={level || ''}
            required
          />
          <label>mg/dL</label>
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={levelMsg ? 'errmsg' : 'offscreen'}
        >
          {levelMsg}
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

export default EditSugarForm;
