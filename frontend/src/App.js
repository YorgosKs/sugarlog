import { useState, useEffect } from 'react';
import Login from './Components/Login2';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Statistics from './Components/Statistics/Statistics';
import Settings from './Components/Settings/Settings';
import HomePage from './homePage';
import Protected from './Components/Protected';
import { Routes, Route } from 'react-router-dom';
import SuccessRegister from './Components/SuccessRegister';
import NotFound from './Components/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem('token'))
  );

  const [successLogin, setSuccessLogin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token'));
    setSuccessLogin(false);
  }, []);

  const logInHandler = (state) => {
    if (state === true) setIsLoggedIn(true);
    console.log(state);
  };

  return (
    <div className='main'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/login'
          element={
            <Login
              loggedInState={logInHandler}
              successLogin={setSuccessLogin}
            />
          }
        />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <Protected isLoggedIn={isLoggedIn} successLogin={successLogin}>
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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
