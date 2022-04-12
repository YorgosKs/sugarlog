import './PieInRange.css';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useEffect, useState } from 'react';

const PieInRange = (props) => {
  const [data, setData] = useState(0);
  const [response, setResponse] = useState(true);

  useEffect(() => {
    setResponse(props.response);
  }, [props.response]);

  useEffect(() => {
    percentage(props.percentage);
  }, [props.percentage]);

  const percentage = (data) => {
    const num = data;
    if (num !== 0) setData(Math.round(num));
    else setData(0);
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
    </div>
  );
};

export default PieInRange;
