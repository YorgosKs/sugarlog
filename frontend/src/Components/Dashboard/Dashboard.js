import Nav from '../Nav';
import style from './Dashboard.css';

import Chart from './Widgets/Chart';
import PieInRange from './Widgets/PieInRange';
import PieHourRange from './Widgets/PieHourRange';
import ServiceButtons from './ServiceButtons';
import SugarForm from '../ServicesForm/SugarForm';

const Dashboard = () => {
  const today = new Date();
  const curHr = today.getHours();
  let msg = '';

  if (curHr < 12) {
    msg = 'Good morning!';
  } else if (curHr < 18) {
    msg = 'Good afternoon!';
  } else {
    msg = 'Good evening!';
  }

  return (
    <div className='dashboard-container'>
      <Nav />
      <div className='wrapper'>
        <h2 className='msg'>{msg}</h2>
        <div className='dashboard-wrapper'>
          <div className='left-col'>
            <Chart />
            <ServiceButtons />
          </div>
          <div className='right-col'>
            <PieInRange />
            <PieHourRange />
          </div>
        </div>
      </div>
      <div className='form-wrapper'>{/* <SugarForm /> */}</div>
    </div>
  );
};

export default Dashboard;
