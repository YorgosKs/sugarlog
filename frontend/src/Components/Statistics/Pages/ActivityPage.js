import './SugarPage.css';
import edit_btn from '../../../assets/edit.png';
import delete_btn from '../../../assets/delete.png';
import React, { useState } from 'react';
import NewActivityItem from './Items/NewActivityItem';

const ActivityPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // window.onresize = function (event) {
  //   console.log('x: ' + window.innerWidth + '      y: ' + window.innerHeight);
  // };
  const value = 120;
  return (
    <div className='page-container'>
      <div className='export-btn'>
        <button>Export to PDF</button>
        <button>Export to CSV</button>
      </div>
      {/* <div className='title-row hidden'>
        <input type='checkbox' id='vehicle1' name='vehicle1' value='Bike' />
        <p>Duration</p>
        <p>Date</p>
        <p>Time</p>
        <p>Type</p>
        <p>Distance</p>
        <p>Calories</p>
        <p>Note</p>
        <p>Actions</p>
      </div> */}
      <hr />
      <div className='items-row'>
        <NewActivityItem />
        <NewActivityItem />
        <NewActivityItem />
      </div>

      {/* <div className='title-row' onClick={() => setIsOpen(!isOpen)}>
        <div className='col-title'>
          <p>Duration</p>
          {isOpen && (
            <div>
              <p>Date</p>
              <p>Time</p>
              <p>Type</p>
              <p>Distance</p>
              <p>Calories</p>
              <p>Note</p>
            </div>
          )}
        </div>
        <div className='col-data'>
          <input
            type='checkbox'
            id='vehicle1'
            name='vehicle1'
            value='Bike'
            className='hidden'
          />
          <p>Duration</p>
          {isOpen && (
            <div>
              <p>Date</p>
              <p>Time</p>
              <p>Type</p>
              <p>Distance</p>
              <p>Calories</p>
              <p>Note</p>
            </div>
          )}
          <p>
            <img src={edit_btn} alt='edit' className='hidden' />
            <img src={delete_btn} alt='delete' className='hidden' />
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default ActivityPage;
