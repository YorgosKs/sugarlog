import { useState } from 'react';
import axios from '../../axios/axios';
import './InfoModal.css';
import { useNavigate } from 'react-router-dom';

const NUM_REGEX = /^[0-9]*$/;

const POST_URL = '/info/add-info/';
const MODAL_URL = '/info-modal';

const InfoModal = (props) => {
  const [type, setType] = useState('');
  const [sugarUnit, setSugarUnit] = useState('');
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');

  const [typeErr, setTypeErr] = useState('');
  const [sugarErr, setSugarErr] = useState('');
  const [minErr, setMinErr] = useState('');
  const [maxErr, setMaxErr] = useState('');

  const handleInfoData = async (e) => {
    e.preventDefault();

    if (type === '') {
      setTypeErr('Please select your diabetes type.');
      return;
    } else {
      setTypeErr('');
    }
    if (sugarUnit === '') {
      setSugarErr('Please select your sugar unit.');
      return;
    } else {
      setSugarErr('');
    }

    if (!NUM_REGEX.test(minRange)) {
      setMinErr('Minimun range should be a number.');
      return;
    } else {
      setMinErr('');
    }

    if (!NUM_REGEX.test(maxRange)) {
      setMaxErr('Maximun range should be a number.');
      return;
    } else {
      setMaxErr('');
    }

    const infoData = {
      type: type,
      sugarUnit: sugarUnit,
      minRange: minRange,
      maxRange: maxRange,
    };

    try {
      const response = await axios.post(POST_URL, JSON.stringify(infoData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
    const modalState = { infoComplete: true };

    try {
      const response = await axios.post(MODAL_URL, modalState, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }

    props.closeInfoModal(true);
    setTypeErr('');
    setSugarErr('');
    setMinErr('');
    setMaxErr('');
  };

  return (
    <div className='info-form-container'>
      <form onSubmit={handleInfoData}>
        <h2>Complete your register info</h2>

        <div className='info-input'>
          <label>Diabetes Type</label>
          <select
            defaultValue={0}
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option value={0} disabled hidden>
              Select type:
            </option>
            <option value={'Type 1'}>Type 1</option>
            <option value={'Type 2'}>Type 2</option>
            <option value={'Gestational'}>Gestational Diabetes</option>
          </select>
        </div>
        <p id='emailcheckmsg' className={typeErr ? 'errmsg' : 'offscreen'}>
          {typeErr}
        </p>
        <div className='info-input'>
          <label>Sugar unit</label>
          <select
            defaultValue={0}
            required
            onChange={(e) => setSugarUnit(e.target.value)}
          >
            <option value={0} disabled hidden>
              Select unit:
            </option>
            <option value={'mg/dl'}>mg/dL</option>
            <option value={'mmol/L'}>mmol/L</option>
          </select>
        </div>
        <p id='emailcheckmsg' className={sugarErr ? 'errmsg' : 'offscreen'}>
          {sugarErr}
        </p>
        <div className='info-input'>
          <div className='input-group'>
            <label>Min range</label>
            <label>Max range</label>
          </div>

          <div className='input-group'>
            <input
              type='number'
              onChange={(e) => setMinRange(e.target.value)}
              value={minRange}
              placeholder={'Min range'}
              required
            />

            <input
              type='number'
              onChange={(e) => setMaxRange(e.target.value)}
              value={maxRange}
              placeholder={'Max range'}
              required
            />
          </div>
          <p id='emailcheckmsg' className={minErr ? 'errmsg' : 'offscreen'}>
            {minErr}
          </p>
          <p id='emailcheckmsg' className={maxErr ? 'errmsg' : 'offscreen'}>
            {maxErr}
          </p>
        </div>

        <div className='btn-group'>
          <button className='button' type='submit'>
            Save
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default InfoModal;
