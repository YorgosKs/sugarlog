import './SugarForm.css';
// import arrow from '../../assets/arrow.png';
import { useState } from 'react';
import axios from '../../axios/axios';

const SugarForm = (props) => {
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [period, setPeriod] = useState('');
  const [activity, setActivtiy] = useState('');
  const [medication, setMedication] = useState('');
  const [note, setNote] = useState('');

  const handleData = (e) => {
    e.preventDefault();
    const sugarData = {
      level: level,
      date: date,
      time: time,
      period: period,
      activity: activity,
      medication: medication,
      note: note,
    };
    console.log(sugarData);
    props.onAddSugar(sugarData);
    setLevel('');
    setDate('');
    setTime('');
    setPeriod('');
    setActivtiy('');
    setMedication('');
    setNote('');
  };

  return (
    <div className='form-container'>
      {/* <div className='back'>
        <img src={arrow} alt='arrow' />
        <span>Sugar</span>
      </div> */}
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='text'
            placeholder='Sugar'
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          />
          <label>mg/dL</label>
        </div>
        <div className='form-input'>
          <label>Date</label>
          <input
            type='Date'
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
        <div className='form-input'>
          <label>Time</label>
          <input
            type='Time'
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />
        </div>
        <div className='form-input'>
          <label>Period</label>
          <input
            type='text'
            onChange={(e) => setPeriod(e.target.value)}
            value={period}
          />
        </div>
        <div className='form-input'>
          <label>Activity</label>
          <input
            type='text'
            onChange={(e) => setActivtiy(e.target.value)}
            value={activity}
          />
        </div>
        <div className='form-input'>
          <label>Medication</label>
          <input
            type='text'
            onChange={(e) => setMedication(e.target.value)}
            value={medication}
          />
        </div>
        <div className='form-input'>
          <label>Notes</label>
          <input
            type='text'
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
        </div>
        <button className='button' type='submit'>
          Add
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default SugarForm;
