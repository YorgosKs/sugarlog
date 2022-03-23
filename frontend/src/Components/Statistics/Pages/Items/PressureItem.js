import React, { useState, useRef, useEffect } from 'react';
import edit_btn from '../../../../assets/edit.png';
import delete_btn from '../../../../assets/delete.png';
import './NewItem.css';

const PressureItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const heightRef = useRef();
  // if (heightRef.current) console.log(heightRef.current.scrollHeight);

  const date = new Date(props.date);

  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.toLocaleString('en-us', { day: '2-digit' });
  const year = date.getFullYear();
  return (
    <div className='item-container' onClick={() => setIsOpen(!isOpen)}>
      <div className='item-header'>
        <p>{props.systolic}</p>
        <div>
          <p>{day}</p>
          <p>{month}</p>
          {/* <p>{year}</p> */}
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
        {/* <p>{props.date}</p> */}
        <p>{props.time}</p>
        <p>{props.systolic}</p>
        <p>{props.diastolic}</p>
        <p>{props.pulse}</p>
        <p>{props.note}</p>
      </div>
    </div>
  );
};

export default PressureItem;
