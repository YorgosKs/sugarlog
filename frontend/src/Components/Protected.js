import { Navigate } from 'react-router-dom';

const Protected = ({ isLoggedIn, successLogin, children }) => {
  if (!isLoggedIn && !successLogin) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default Protected;
