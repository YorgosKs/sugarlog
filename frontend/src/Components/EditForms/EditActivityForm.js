import { useState, useEffect, useRef } from 'react';
import './EditForm.css';

const NUM_REGEX = /^[0-9]*$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const EditMealForm = (props) => {
  const [type, setType] = useState();
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [distanceMsg, setDistanceMsg] = useState('');
  const [caloriesMsg, setCaloriesMsg] = useState('');

  const [dateMsg, setDateMsg] = useState('');

  useEffect(() => {
    setType(props.editData.type);
  }, [props.editData.type]);

  useEffect(() => {
    setDate(props.formattedDate);
  }, [props.formattedDate]);

  useEffect(() => {
    setDistance(props.editData.distance);
  }, [props.editData.distance]);

  useEffect(() => {
    setCalories(props.editData.calories);
  }, [props.editData.calories]);

  useEffect(() => {
    setNote(props.editData.note);
  }, [props.editData.note]);

  const handleData = (e) => {
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
    console.log(activityData);
    props.getData(activityData);
    props.setModal();

    setType('');
    setDate('');
    setDistance('');
    setCalories('');
    setNote('');
    setCaloriesMsg('');
    setDistanceMsg('');
    setDateMsg('');
  };

  const modal = () => {
    props.setModal();
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='text'
            placeholder='Type'
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

export default EditMealForm;
