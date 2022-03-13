import React, { useState, useRef } from 'react';
import edit_btn from '../../../../assets/edit.png';
import delete_btn from '../../../../assets/delete.png';
import './NewItem.css';

const NewActivityItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const heightRef = useRef();

  if (heightRef.current) console.log(heightRef.current.scrollHeight);

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
        <p>Time</p>
        <p>Type</p>
        <p>Distance</p>
        <p>Calories</p>
        <p>Note</p>
      </div>
    </div>
  );
};

export default NewActivityItem;
