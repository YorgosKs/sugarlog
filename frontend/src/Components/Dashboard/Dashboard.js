import Nav from '../Nav';
import style from './Dashboard.css';

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

  window.onresize = function (event) {
    console.log('x: ' + window.innerWidth + '      y: ' + window.innerHeight);
  };

  return (
    <div className='dashboard-container'>
      <Nav />
      <div className='wrapper'>
        <h2 className='msg'>{msg}</h2>
        <div className='dashboard-wrapper'>
          <div className='left-col'>
            <Chart />
            <div className='horizontal-pie'>
              <PieInRange />
            </div>
            <ServiceButtons />
          </div>
          <div className='right-col'>
            <PieInRange />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
