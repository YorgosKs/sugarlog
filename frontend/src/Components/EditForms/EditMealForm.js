import { useState, useEffect, useRef } from 'react';
import './EditForm.css';

const NUM_REGEX = /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const EditMealForm = (props) => {
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
  const [timeMsg, setTimeMsg] = useState('');

  useEffect(() => {
    setCarbs(props.editData.carbs);
  }, [props.editData.carbs]);

  useEffect(() => {
    setDate(props.formattedDate);
  }, [props.formattedDate]);

  useEffect(() => {
    setTime(props.editData.time);
  }, [props.editData.time]);

  useEffect(() => {
    setProtein(props.editData.protein);
  }, [props.editData.protein]);

  useEffect(() => {
    setFats(props.editData.fats);
  }, [props.editData.fats]);

  useEffect(() => {
    setNote(props.editData.note);
  }, [props.editData.note]);

  const handleData = (e) => {
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
    console.log(mealData);
    props.getData(mealData);
    props.setModal();

    setCarbs('');
    setDate('');
    setTime('');
    setProtein('');
    setFats('');
    setNote('');
    setFatsMsg('');
    setProteinMsg('');
    setFatsMsg('');
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
            required
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
