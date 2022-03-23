import React, { useState, useRef, useEffect } from 'react';
import edit_btn from '../../../../assets/edit.png';
import delete_btn from '../../../../assets/delete.png';
import './NewItem.css';

const MealItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const heightRef = useRef();
  // if (heightRef.current) console.log(heightRef.current.scrollHeight);
  return (
    <div className='item-container' onClick={() => setIsOpen(!isOpen)}>
      <div className='item-header'>
        <p>60 mins</p>
        <p>11 Mar</p>
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
        <p>{props.date}</p>
        <p>{props.time}</p>
        <p>{props.carbs}</p>
        <p>{props.protein}</p>
        <p>{props.fat}</p>
        <p>{props.notes}</p>
      </div>
    </div>
  );
};

export default MealItem;
