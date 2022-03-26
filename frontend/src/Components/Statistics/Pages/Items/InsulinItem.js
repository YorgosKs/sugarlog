import React, { useState, useRef, useEffect } from 'react';
import edit_btn from '../../../../assets/edit.png';
import delete_btn from '../../../../assets/delete.png';
import EditInsulinForm from '../../../EditForms/EditInsulinForm';

import './NewItem.css';

const InsulinItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const heightRef = useRef();

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

  // ALLAGH EDW
  const handleEditInsulin = (data) => {
    const dataInsulin = { ...data };
    props.getData(dataInsulin);
  };

  return (
    <div className='item-wrapper'>
      <div
        className='modal'
        style={open ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }}
      >
        <EditInsulinForm
          editData={props.editData}
          setModal={openDrop}
          setModal1={openDrop1}
          // ALLAGH EDW
          getData={handleEditInsulin}
        />
      </div>
      <div className='desktop-row hide-desk'>
        <div className='data-row'>
          <p>{props.units}</p>
          <p>{day + ' ' + month}</p>
          <p>{time}</p>
          <p>{props.type}</p>
          <p>{props.note}</p>
          <p className='actions'>
            <img
              src={edit_btn}
              alt='edit'
              onClick={() => handleEdit(props.insulinId)}
            />
            <img
              src={delete_btn}
              alt='delete'
              onClick={() => handleDelete(props.insulinId)}
            />
          </p>
        </div>
      </div>

      <div
        className='item-container hide-mob'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='item-header'>
          <p>{props.units}</p>
          <div>
            <p>
              {day} {month}
            </p>
            {/* <p>{month}</p> */}
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
            <span className='span'>Time : </span>
            {time}
          </p>
          <p>
            <span className='span'>Type : </span>
            {props.type}
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
              onClick={() => handleEdit(props.insulinId)}
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
              onClick={() => handleDelete(props.insulinId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsulinItem;
