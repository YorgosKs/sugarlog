import './PieInRange.css';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 80;

const PieInRange = () => {
  return (
    <div className='range'>
      <CircularProgressbarWithChildren
        value={percentage}
        text={`${percentage}%\nin range`}
        className='range-circle'
        strokeWidth='15'
        counterClockwise='true'
        styles={buildStyles({
          pathColor: `rgba(167,196,188, 1`,
          textColor: `rgba(167,196,188, 1)`,
          textSize: '10px',
          trailColor: 'none',
        })}
      />
    </div>
  );
};

export default PieInRange;
