import React, { useState, useRef, useEffect } from 'react';
import edit_btn from '../../../../assets/edit.png';
import delete_btn from '../../../../assets/delete.png';
import './NewItem.css';
import axios from '../../../../axios/axios';

const WeightItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');

  const DELETE_URL = '/sugar/delete/';

  const heightRef = useRef();
  // if (heightRef.current) console.log(heightRef.current.scrollHeight);

  const date = new Date(props.date);

  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.toLocaleString('en-us', { day: '2-digit' });
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const year = date.getFullYear();

  const handleDelete = (key) => {
    console.log('edit');
    props.handleDel(key);
  };

  const handleEdit = (key) => {
    console.log(key);
    props.handleEd(key);
  };

  return (
    <div className='item-wrapper'>
      <div className='desktop-row hide-desk'>
        <div className='data-row'>
          <p>{props.level}</p>
          <p>{day + ' ' + month}</p>
          <p>{props.time}</p>
          <p>{props.period}</p>
          <p>{props.activity}</p>
          <p>{props.medication}</p>
          <p>{props.note}</p>
          {/* <input type={'text'} value={props.note} onChange={handleEdit} /> */}
          <p className='actions'>
            <img
              src={edit_btn}
              alt='edit'
              onClick={() => handleEdit(props.sugarId)}
            />
            <img
              src={delete_btn}
              alt='delete'
              onClick={() => handleDelete(props.sugarId)}
            />
          </p>
        </div>
      </div>

      <div
        className='item-container hide-mob'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='item-header'>
          <p>60 mins</p>
          <div>
            <p>{day}</p>
            <p>{month}</p>
          </div>
        </div>

        <div
          className='item-data'
          ref={heightRef}
          style={
            isOpen
              ? { height: heightRef.current.scrollHeight + 'px' }
              : { height: '0px' }
          }
        >
          <p>{props.level}</p>
          <p>{time}</p>
          <p>{props.period}</p>
          <p>{props.activity}</p>
          <p>{props.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default WeightItem;
