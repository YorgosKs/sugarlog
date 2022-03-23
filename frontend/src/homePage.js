import { Link } from 'react-router-dom';

const homePage = () => {
  return (
    <div>
      <h1>Sugarlog</h1>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  );
};

export default homePage;
