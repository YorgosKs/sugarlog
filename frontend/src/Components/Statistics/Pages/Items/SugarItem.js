import React, { useState, useRef } from 'react';
import edit_btn from '../../../../assets/edit.svg';
import delete_btn from '../../../../assets/delete.svg';
import EditSugarForm from '../../../EditForms/EditSugarForm';

import './NewItem.css';

const SugarItem = (props) => {
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

  const handleEditSugar = (data) => {
    const dataSugar = { ...data };
    props.getData(dataSugar);
  };

  return (
    <div className='item-wrapper'>
      <div
        className='modal'
        style={open ? { opacity: 1, left: '50%', top: '50%' } : { opacity: 0 }}
      >
        <EditSugarForm
          editData={props.editData}
          formattedDate={formattedDate}
          setModal={openDrop}
          setModal1={openDrop1}
          getData={handleEditSugar}
        />
      </div>
      <div className='desktop-row hide-desk'>
        <div className='data-row'>
          <p>{props.level} mg/dL</p>
          <p>{day + ' ' + month}</p>

          <p>{props.time}</p>
          <p>{props.activity}</p>
          <p>{props.medication}</p>
          <p>{props.note}</p>
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
          <p>{props.level} mg/dL</p>
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
            <span className='span'>Time : </span>
            {props.time}
          </p>
          <p>
            <span className='span'>Medication : </span>
            {props.medication}
          </p>
          <p>
            <span className='span'>Activity : </span>
            {props.activity}
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
              onClick={() => handleEdit(props.sugarId)}
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
              onClick={() => handleDelete(props.sugarId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SugarItem;
