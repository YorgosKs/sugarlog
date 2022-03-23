import { useState, useEffect } from 'react';

import Login from './Components/Login';
import Nav from './Components/Nav';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import SugarForm from './Components/ServicesForm/SugarForm';
import InsulinForm from './Components/ServicesForm/InsulinForm';
import MealForm from './Components/ServicesForm/MealForm';
import ActivityForm from './Components/ServicesForm/ActivityForm';
import PressureForm from './Components/ServicesForm/PressureForm';
import WeightForm from './Components/ServicesForm/WeightForm';
import HorizontalServiceButtons from './Components/Statistics/HorizontalServiceButtons';
import Statistics from './Components/Statistics/Statistics';
import Settings from './Components/Settings/Settings';
import HomePage from './homePage';
import Protected from './Components/Protected';

import InsulinPage from './Components/Statistics/Pages/InsulinPage';
import SugarPage from './Components/Statistics/Pages/SugarPage';
import ActivityPage from './Components/Statistics/Pages/ActivityPage';
import MealPage from './Components/Statistics/Pages/MealPage';
import WeightPage from './Components/Statistics/Pages/WeightPage';
import PressurePage from './Components/Statistics/Pages/Pressure';

import { Routes, Route, Link } from 'react-router-dom';
import SuccessRegister from './Components/SuccessRegister';
import NotFound from './Components/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem('active'))
  );

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem('active'));
  // }, []);

  const logInHandler = (state) => {
    if (state === true) setIsLoggedIn(true);
    console.log(state);
  };

  // const logOutHandler = (state) => {
  //   if (state === false) setIsLoggedIn(false);
  // };

  return (
    <div className='main'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register-completed' element={<SuccessRegister />} />
        <Route
          path='/dashboard'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path='/statistics'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Statistics />
            </Protected>
          }
        />
        <Route
          path='/settings'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Settings />
            </Protected>
          }
        />
        {/* <Route path='/statistics' element={<Statistics />} /> */}
        {/* <Route path='/settings' element={<Settings />} /> */}
        <Route path='/login' element={<Login loggedInState={logInHandler} />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
