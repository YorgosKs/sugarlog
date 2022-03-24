import '../ServicesForm/SugarForm.css';
// import arrow from '../../assets/arrow.png';
import { useState } from 'react';
import axios from '../../axios/axios';

const EditSugarForm = (props) => {
  //   const data = props.editData;

  const [level, setLevel] = useState('');
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [period, setPeriod] = useState('');
  const [activity, setActivtiy] = useState('');
  const [medication, setMedication] = useState('');
  const [note, setNote] = useState('');
  const [datae, setData] = useState('');

  //   const [sugarEdit, setSugarEdit] = useState({
  //     level: props.editData.level,
  //     date: '',
  //     time: '',
  //     period: '',
  //     activity: '',
  //     medication: '',
  //     note: '',
  //   });

  //   addValues();

  //   const handleChangeEdit = ({ target }) => {
  //     // setSugarEdit(...props.editData);
  //     const { name, value } = target;
  //     setSugarEdit({ ...props.editData, [name]: value });
  //     console.log(sugarEdit);
  //   };

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
    props.getData(sugarData);
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
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          <label>mg/dL</label>
        </div>
        <div className='form-input'>
          <label>Date</label>
          <input
            type='Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label>Time</label>
          <input
            type='Time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label>Period</label>
          <input
            type='text'
            onChange={(e) => setPeriod(e.target.value)}
            // value={props.editData.period || ''}
            value={period}
          />
        </div>
        <div className='form-input'>
          <label>Activity</label>
          <input
            type='text'
            onChange={(e) => setActivtiy(e.target.value)}
            // value={props.editData.activity || ''}
            value={activity}
          />
        </div>
        <div className='form-input'>
          <label>Medication</label>
          <input
            type='text'
            onChange={(e) => setMedication(e.target.value)}
            // value={props.editData.medication || ''}
            value={medication}
          />
        </div>
        <div className='form-input'>
          <label>Notes</label>
          <input
            type='text'
            onChange={(e) => setNote(e.target.value)}
            // value={props.editData.note || ''}
            value={note}
          />
        </div>
        <button className='button' type='submit'>
          Update
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default EditSugarForm;
