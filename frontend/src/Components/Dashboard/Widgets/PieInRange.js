import './PieInRange.css';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';

const PieInRange = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    percentage(props.percentage);
  }, [props.percentage]);

  const percentage = (data) => {
    setData(Math.round(data));
  };

  return (
    <div className='range'>
      <CircularProgressbarWithChildren
        value={data}
        text={`${data}%\nin range`}
        className='range-circle'
        strokeWidth='15'
        counterClockwise='true'
        styles={buildStyles({
          pathColor: `#DD105E`,
          textColor: `#DD105E`,
          textSize: '10px',
          trailColor: 'none',
          width: '150px',
        })}
      />
      {/* <CircularProgressbarWithChildren
        value={percentage}
        text={`${percentage}%\nin range`}
        className='range-circle'
        strokeWidth='15'
        counterClockwise='true'
        styles={buildStyles({
          pathColor: `#DD105E`,
          textColor: `#DD105E`,
          textSize: '10px',
          trailColor: 'none',
          width: '150px',
        })}
      /> */}
    </div>
  );
};

export default PieInRange;
