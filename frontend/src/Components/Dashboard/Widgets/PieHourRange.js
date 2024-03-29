import './PieHourRange.css';
import { ResponsiveContainer, Tooltip, Pie, PieChart, Cell } from 'recharts';
import { useEffect, useState } from 'react';

const PieHourRange = (props) => {
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);

  useEffect(() => {
    setGroup1(Math.round(props.perc1));
  }, [props.perc1]);

  useEffect(() => {
    setGroup2(Math.round(props.perc2));
  }, [props.perc2]);

  useEffect(() => {
    setGroup3(Math.round(props.perc3));
  }, [props.perc3]);

  useEffect(() => {
    setGroup4(Math.round(props.perc4));
  }, [props.perc4]);

  const timeRange = [
    { range: '12 - 6', avg: isNaN(group1) ? 0 : group1 },
    { range: '6 - 12', avg: isNaN(group2) ? 0 : group2 },
    { range: '12 - 18', avg: isNaN(group3) ? 0 : group3 },
    { range: '18 - 00', avg: isNaN(group4) ? 0 : group4 },
  ];

  const COLORS = ['#C85C5C', '#FF5959', '#FF7272', '#FFB5B5'];

  return (
    <div className='item-right'>
      <ResponsiveContainer
        width='70%'
        height='70%'
        aspect={0}
        className='chart'
      >
        <PieChart>
          <Pie
            data={timeRange}
            dataKey='avg'
            nameKey='range'
            cx='50%'
            cy='50%'
            outerRadius={60}
            innerRadius={40}
            fill='#A7C4BC'
            className='filter'
            label
            startAngle={360}
            endAngle={0}
          >
            <Tooltip />
            {COLORS.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='colors'>
        <p>Hours in range</p>
        <div className='color-p'>
          <p>00 - 06</p>
          <p>06 - 12</p>
          <p>12 - 18</p>
          <p>18 - 00</p>
        </div>
        <div className='color-span'>
          <span style={{ backgroundColor: '#C85C5C' }}></span>
          <span style={{ backgroundColor: '#FF5959' }}></span>
          <span style={{ backgroundColor: '#FF7272' }}></span>
          <span style={{ backgroundColor: '#FFB5B5' }}></span>
        </div>
      </div>
    </div>
  );
};

export default PieHourRange;
