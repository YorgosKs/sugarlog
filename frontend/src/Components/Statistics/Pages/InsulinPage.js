import React, { useState, useEffect } from 'react';
import './SugarPage.css';
import nodata from '../../../assets/data.png';
import InsulinItem from './Items/InsulinItem';
import axios from '../../../axios/axios';
import Pagination from './Pagination';

import logo from '../../../logo-top.svg';

const GETINSULIN_URL = '/insulin/';
const DELETE_URL = '/insulin/delete/';
const GETEDIT_URL = '/insulin/';
const UPDATE_URL = '/insulin/update/';

const InsulinPage = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [keyId, setKeyId] = useState('');
  const [success, setSuccess] = useState(false);
  const [editMsg, setEditMsg] = useState('');
  const [editErrMsg, setEditErrMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [load, setLoad] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [active, setActive] = useState(false);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActive(true);
  };

  useEffect(() => {
    handleSubmit();
    setLoad(false);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(GETINSULIN_URL, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setData(response?.data.reverse());
    } catch (err) {}

    setLoad(true);
  };

  const keyDelete = (key) => {
    handleDelete(key);
  };

  const handleDelete = async (key) => {
    try {
      const response = await axios.delete(DELETE_URL + key, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
    handleSubmit();
  };

  const keyEdit = (key) => {
    getEdit(key);
    setKeyId(key);
  };

  const getEdit = async (key) => {
    try {
      const response = await axios.get(GETEDIT_URL + key, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setEditData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditInsulin = async (data) => {
    const insulinData = {
      ...data,
    };
    try {
      const response = await axios.post(
        UPDATE_URL + keyId,
        JSON.stringify(insulinData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setKeyId('');
      setEditData([]);
      setSuccess(!success);
      setEditMsg('Insulin entry has been updated.');
    } catch (err) {
      if (err) {
        setEditErrMsg('Something went wrong.');
      }
    }

    handleSubmit();
    setTimeout(clearMsg, 3500);
  };

  const clearMsg = () => {
    setEditMsg('');
    setErrMsg('');
  };

  return !load ? (
    <div className='loader'>
      <img src={logo} alt='logo' className='a' />
    </div>
  ) : (
    <div className='page-container'>
      <div className='items-row'>
        <div
          className='sucContainer'
          style={editMsg ? { height: 'auto' } : { height: 0 }}
        >
          <p
            className='sucmsg'
            style={
              editMsg
                ? {
                    opacity: 1,
                    height: 'auto',
                    top: '0%',
                    left: '50%',
                  }
                : { opacity: 0 }
            }
          >
            {editMsg}
          </p>
        </div>
        <div
          className='sucContainer'
          style={editErrMsg ? { height: 'auto' } : { height: 0 }}
        >
          <p
            className='errorMsg'
            style={
              editErrMsg
                ? {
                    opacity: 1,
                    height: 'auto',
                    top: '0%',
                    left: '50%',
                  }
                : { opacity: 0 }
            }
          >
            {editErrMsg}
          </p>
        </div>
        <div
          className='sucContainer'
          style={errMsg ? { height: 'auto' } : { height: 0 }}
        >
          <p
            className='errorMsg'
            style={
              errMsg
                ? {
                    opacity: 1,
                    height: 'auto',
                    top: '0%',
                    left: '50%',
                  }
                : { opacity: 0, height: 0 }
            }
          >
            {errMsg}
          </p>
        </div>
        <div className='title-row hide'>
          <p>Units</p>
          <p>Date</p>
          <p>Time</p>
          <p>Type</p>
          <p>Notes</p>
          <p>Actions</p>
        </div>
        {data.length === 0 ? (
          <div className='no-data-container'>
            <img src={nodata} className='data-img' alt='no-data' />
            <p className='data-p'>Nothing to display</p>
          </div>
        ) : (
          data.map((insulin) => (
            <InsulinItem
              key={insulin._id}
              units={insulin.units}
              date={insulin.date}
              time={insulin.time}
              type={insulin.type}
              note={insulin.note}
              insulinId={insulin._id}
              handleDel={keyDelete}
              handleEd={keyEdit}
              // EDIT FORM PROPS
              editData={editData}
              getData={handleEditInsulin}
            />
          ))
        )}
        <Pagination
          totalData={data.length}
          postsPerPage={postsPerPage}
          paginate={paginate}
          active={active}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default InsulinPage;
