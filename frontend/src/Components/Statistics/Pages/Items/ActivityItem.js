import React, { useState, useRef } from 'react';
import edit_btn from '../../../../assets/edit.svg';
import delete_btn from '../../../../assets/delete.svg';
import EditActivityForm from '../../../EditForms/EditActivityForm';

import './NewItem.css';

const ActivityItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const heightRef = useRef();

  const date = new Date(props.date);
  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.toLocaleString('en-us', { day: '2-digit' });
  const formattedDate = date.toISOString().split('T')[0];

  const handleDelete = (key) => {
    props.handleDel(key);
  };

  const handleEdit = (key) => {
    props.handleEd(key);
    setOpen(true);
  };

  const openDrop = () => {
    setIsOpen(true);
    setOpen(false);
  };

  const openDrop1 = () => {
    setIsOpen(true);
    setOpen(true);
  };

  const handleEditActivity = (data) => {
    const dataActivity = { ...data };
    props.getData(dataActivity);
  };
  return (
    <div className='item-wrapper'>
      <div
        className='modal'
        style={open ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }}
      >
        <EditActivityForm
          editData={props.editData}
          setModal={openDrop}
          setModal1={openDrop1}
          getData={handleEditActivity}
          formattedDate={formattedDate}
        />
      </div>
      <div className='desktop-row hide-desk'>
        <div className='data-row'>
          <p>{props.type}</p>
          <p>{day + ' ' + month}</p>
          <p>{props.distance}</p>
          <p>{props.calories}</p>
          <p>{props.note}</p>
          <p className='actions'>
            <img
              src={edit_btn}
              alt='edit'
              onClick={() => handleEdit(props.activityId)}
            />
            <img
              src={delete_btn}
              alt='delete'
              onClick={() => handleDelete(props.activityId)}
            />
          </p>
        </div>
      </div>

      <div
        className='item-container hide-mob'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='item-header'>
          <p>{props.type}</p>
          <div>
            <p>
              {day} {month}
            </p>
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
          <p>
            <span className='span'>Distance : </span>
            {props.distance}
          </p>
          <p>
            <span className='span'>Calories : </span>
            {props.calories}
          </p>
          <p>
            <span className='span'>Notes : </span>
            {props.note}
          </p>
          <div className='btn-group1'>
            <button
              className='dropdown-btn'
              style={{
                backgroundImage: 'url(' + edit_btn + ')',
                backgroundPosition: 'left',
                backgroundPositionX: 10,
                backgroundSize: '20px',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => handleEdit(props.activityId)}
            >
              Edit
            </button>
            <button
              className='dropdown-btn'
              style={{
                backgroundImage: 'url(' + delete_btn + ')',
                backgroundPosition: 'left',
                backgroundPositionX: 10,
                backgroundSize: '20px',
                backgroundRepeat: 'no-repeat',
                width: '95px',
              }}
              onClick={() => handleDelete(props.activityId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
