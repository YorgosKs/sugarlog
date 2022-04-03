import React, { useState, useRef, useEffect } from 'react';
import edit_btn from '../../../../assets/edit.png';
import delete_btn from '../../../../assets/delete.png';
import EditPressureForm from '../../../EditForms/EditPressureForm';

import './NewItem.css';

const PressureItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const heightRef = useRef();

  const date = new Date(props.date);

  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.toLocaleString('en-us', { day: '2-digit' });
  const year = date.getFullYear();
  const formattedDate = date.toISOString().split('T')[0];

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

  const handleEditPressure = (data) => {
    const dataPressure = { ...data };
    props.getData(dataPressure);
  };

  return (
    <div className='item-wrapper'>
      <div
        className='modal'
        style={open ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }}
      >
        <EditPressureForm
          editData={props.editData}
          setModal={openDrop}
          setModal1={openDrop1}
          getData={handleEditPressure}
          formattedDate={formattedDate}
        />
      </div>
      <div className='desktop-row hide-desk'>
        <div className='data-row'>
          <p>{props.pulse} bpm</p>
          <p>{day + ' ' + month}</p>
          <p>{props.time}</p>
          <p>{props.systolic}</p>
          <p>{props.diastolic}</p>
          <p>{props.note}</p>
          <p className='actions'>
            <img
              src={edit_btn}
              alt='edit'
              onClick={() => handleEdit(props.pressureId)}
            />
            <img
              src={delete_btn}
              alt='delete'
              onClick={() => handleDelete(props.pressureId)}
            />
          </p>
        </div>
      </div>

      <div
        className='item-container hide-mob'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='item-header'>
          <p>{props.pulse} bpm</p>
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
            {props.time}
          </p>
          <p>
            <span className='span'>Systolic : </span>
            {props.systolic}
          </p>
          <p>
            <span className='span'>Diastolic : </span>
            {props.diastolic}
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
              onClick={() => handleEdit(props.pressureId)}
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
              onClick={() => handleDelete(props.pressureId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressureItem;
