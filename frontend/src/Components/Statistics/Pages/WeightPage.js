import './SugarPage.css';
import nodata from '../../../assets/data.png';
import React, { useState, useEffect } from 'react';
import WeightItem from './Items/WeightItem';
import Pagination from './Pagination';

import logo from '../../../logo-top.svg';

import axios from '../../../axios/axios';

const GETWEIGHT_URL = '/weight/';
const DELETE_URL = '/weight/delete/';
const GETEDIT_URL = '/weight/';
const UPDATE_URL = '/weight/update/';

const WeightPage = () => {
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
      const response = await axios.get(GETWEIGHT_URL, {
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

  const handleEditWeight = async (data) => {
    const mealData = {
      ...data,
    };
    try {
      const response = await axios.post(
        UPDATE_URL + keyId,
        JSON.stringify(mealData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setKeyId('');
      setEditData([]);
      setSuccess(!success);
      setEditMsg('Weight entry has been updated.');
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
          <p>Weight</p>
          <p>Date</p>
          <p>Notes</p>
          <p>Actions</p>
        </div>
        {data.length === 0 ? (
          <div className='no-data-container'>
            <img src={nodata} className='data-img' alt='no-data' />
            <p className='data-p'>Nothing to display</p>
          </div>
        ) : (
          data.map((weight) => (
            <WeightItem
              key={weight._id}
              weightNum={weight.weightNum}
              date={weight.date}
              note={weight.note}
              weightId={weight._id}
              handleDel={keyDelete}
              handleEd={keyEdit}
              // EDIT FORM PROPS
              editData={editData}
              getData={handleEditWeight}
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

export default WeightPage;
