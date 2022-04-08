import { useState, useRef } from 'react';
import axios from '../../axios/axios';
import './SugarForm.css';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const MEAL_URL = '/meal/add/';

const MealForm = (props) => {
  const [carbs, setCarbs] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [note, setNote] = useState('');

  const errRef = useRef();
  const [carbsMsg, setCarbsMsg] = useState('');
  const [proteinMsg, setProteinMsg] = useState('');
  const [fatsMsg, setFatsMsg] = useState('');

  const [dateMsg, setDateMsg] = useState('');

  const handleData = async (e) => {
    e.preventDefault();
    const carbsCheck = NUM_REGEX.test(carbs);
    if (!carbsCheck) {
      setCarbsMsg('Carbs should be a valid number.');
      return;
    } else {
      setCarbsMsg('');
    }
    const proteinCheck = NUM_REGEX.test(protein);
    if (!proteinCheck) {
      setProteinMsg('Protein should be a valid number.');
      return;
    } else {
      setProteinMsg('');
    }
    const fatsCheck = NUM_REGEX.test(fats);
    if (!fatsCheck) {
      setFatsMsg('Fats should be a valid number.');
      return;
    } else {
      setFatsMsg('');
    }
    const dateCheck = DATE_REGEX.test(date);
    if (!dateCheck) {
      setDateMsg('This should be a valid date.');
      return;
    } else {
      setDateMsg('');
    }

    const mealData = {
      carbs: carbs.trim(),
      date: date,
      time: time,
      protein: protein.trim(),
      fats: fats.trim(),
      note: note.trim(),
    };
    try {
      const response = await axios.post(MEAL_URL, JSON.stringify(mealData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      props.closeModal();
    } catch (err) {
      console.log(err);
    }

    setCarbs('');
    setDate('');
    setTime('');
    setProtein('');
    setFats('');
    setNote('');
    setCarbsMsg('');
    setProteinMsg('');
    setFatsMsg('');
    setDateMsg('');
  };

  const cancelHandler = () => {
    props.closeModal();

    setCarbs('');
    setDate('');
    setTime('');
    setProtein('');
    setFats('');
    setNote('');
    setCarbsMsg('');
    setProteinMsg('');
    setFatsMsg('');
    setDateMsg('');
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleData}>
        <div className='main-value'>
          <input
            type='number'
            placeholder='Carbs'
            onChange={(e) => setCarbs(e.target.value)}
            value={carbs || ''}
            required
          />
          <label>g</label>
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={carbsMsg ? 'errmsg' : 'offscreen'}
        >
          {carbsMsg}
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
            type='time'
            value={time || ''}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className='form-input'>
          <label>Protein</label>
          <input
            type='number'
            onChange={(e) => setProtein(e.target.value)}
            value={protein || ''}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={proteinMsg ? 'errmsg' : 'offscreen'}
        >
          {proteinMsg}
        </p>
        <div className='form-input'>
          <label>Fats</label>
          <input
            type='number'
            onChange={(e) => setFats(e.target.value)}
            value={fats || ''}
          />
        </div>
        <p
          ref={errRef}
          id='emailcheckmsg'
          className={fatsMsg ? 'errmsg' : 'offscreen'}
        >
          {fatsMsg}
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

export default MealForm;
