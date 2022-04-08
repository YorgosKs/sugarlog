import './Chart.css';
import { ResponsiveContainer, XAxis, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';
import nodata from '../../../assets/data.png';

const Chart = (props) => {
  const [today, setToday] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [day4, setDay4] = useState([]);
  const [day5, setDay5] = useState([]);
  const [day6, setDay6] = useState([]);
  const [day7, setDay7] = useState([]);

  useEffect(() => {
    setToday(props.today);
  }, [props.today]);

  useEffect(() => {
    setDay2(props.day2);
  }, [props.day2]);

  useEffect(() => {
    setDay3(props.day3);
  }, [props.day3]);

  useEffect(() => {
    setDay4(props.day4);
  }, [props.day4]);

  useEffect(() => {
    setDay5(props.day5);
  }, [props.day5]);

  useEffect(() => {
    setDay6(props.day6);
  }, [props.day6]);

  useEffect(() => {
    setDay7(props.day7);
  }, [props.day7]);

  const reducer = (accumulator, curr) => accumulator + curr;

  const avgToday = today.map((data) => parseInt(data.level));
  const data1 = Math.round(avgToday.reduce(reducer, 0) / props.today.length);

  const avgDay2 = day2.map((data) => parseInt(data.level));
  const data2 = Math.round(avgDay2.reduce(reducer, 0) / props.day2.length);

  const avgDay3 = day3.map((data) => parseInt(data.level));
  const data3 = Math.round(avgDay3.reduce(reducer, 0) / props.day3.length);

  const avgDay4 = day4.map((data) => parseInt(data.level));
  const data4 = Math.round(avgDay4.reduce(reducer, 0) / props.day4.length);

  const avgDay5 = day5.map((data) => parseInt(data.level));
  const data5 = Math.round(avgDay5.reduce(reducer, 0) / props.day5.length);

  const avgDay6 = day6.map((data) => parseInt(data.level));
  const data6 = Math.round(avgDay6.reduce(reducer, 0) / props.day6.length);

  const avgDay7 = day7.map((data) => parseInt(data.level));
  const data7 = Math.round(avgDay7.reduce(reducer, 0) / props.day7.length);

  const date = new Date();
  date.setDate(date.getDate());

  const day2d = new Date();
  day2d.setDate(day2d.getDate() - 1);
  const month2 = day2d.toLocaleString('en-us', { month: '2-digit' });
  const date2 = day2d.toLocaleString('en-us', { day: '2-digit' });

  const day3d = new Date();
  day3d.setDate(day3d.getDate() - 2);
  const month3 = day3d.toLocaleString('en-us', { month: '2-digit' });
  const date3 = day3d.toLocaleString('en-us', { day: '2-digit' });

  const day4d = new Date();
  day4d.setDate(day4d.getDate() - 3);
  const month4 = day4d.toLocaleString('en-us', { month: '2-digit' });
  const date4 = day4d.toLocaleString('en-us', { day: '2-digit' });

  const day5d = new Date();
  day5d.setDate(day5d.getDate() - 4);
  const month5 = day5d.toLocaleString('en-us', { month: '2-digit' });
  const date5 = day5d.toLocaleString('en-us', { day: '2-digit' });

  const day6d = new Date();
  day6d.setDate(day6d.getDate() - 5);
  const month6 = day6d.toLocaleString('en-us', { month: '2-digit' });
  const date6 = day6d.toLocaleString('en-us', { day: '2-digit' });

  const day7d = new Date();
  day7d.setDate(day7d.getDate() - 6);
  const month7 = day7d.toLocaleString('en-us', { month: '2-digit' });
  const date7 = day7d.toLocaleString('en-us', { day: '2-digit' });

  const data = [
    { name: 'Today', average: isNaN(data1) ? 0 : data1 },
    { name: date2 + `/` + month2, average: isNaN(data2) ? 0 : data2 },
    { name: date3 + `/` + month3, average: isNaN(data3) ? 0 : data3 },
    { name: date4 + `/` + month4, average: isNaN(data4) ? 0 : data4 },
    { name: date5 + `/` + month5, average: isNaN(data5) ? 0 : data5 },
    { name: date6 + `/` + month6, average: isNaN(data6) ? 0 : data6 },
    { name: date7 + `/` + month7, average: isNaN(data7) ? 0 : data7 },
  ];

  return (
    <div className='graph'>
      <ResponsiveContainer width='99%' height='70%' className='chart'>
        <BarChart width={640} height={200} data={data} className='chart'>
          <XAxis
            dataKey='name'
            height={20}
            className='xaxis'
            stroke='#000'
            padding={{ left: 20, right: 10 }}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            fontSize={15}
          />
          <Bar
            dataKey='average'
            fill='#DD105E'
            maxBarSize={45}
            radius={10}
            label={{ fill: 'white', fontSize: 16 }}
            className='filter'
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
      <p>Daily sugar level average</p>
    </div>
  );
};

export default Chart;
