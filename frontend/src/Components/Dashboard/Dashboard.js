import Nav from '../Nav';
import './Dashboard.css';

import Chart from './Widgets/Chart';
import PieInRange from './Widgets/PieInRange';
import PieHourRange from './Widgets/PieHourRange';
import ServiceButtons from './ServiceButtons';

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
    <div className='container'>
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
    </div>
  );
};

export default Dashboard;
