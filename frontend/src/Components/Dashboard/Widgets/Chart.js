import './Chart.css';
import { ResponsiveContainer, XAxis, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';

const Chart = (props) => {
  const [today, setToday] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [day4, setDay4] = useState([]);
  const [day5, setDay5] = useState([]);
  const [day6, setDay6] = useState([]);
  const [day7, setDay7] = useState([]);

  const [day2Date, setDay2Date] = useState();
  const [day3Date, setDay3Date] = useState();
  const [day4Date, setDay4Date] = useState();
  const [day5Date, setDay5Date] = useState();
  const [day6Date, setDay6Date] = useState();
  const [day7Date, setDay7Date] = useState();

  const [day2Month, setDay2Month] = useState();
  const [day3Month, setDay3Month] = useState();
  const [day4Month, setDay4Month] = useState();
  const [day5Month, setDay5Month] = useState();
  const [day6Month, setDay6Month] = useState();
  const [day7Month, setDay7Month] = useState();

  useEffect(() => {
    setToday(props.todayAVG);
  }, [props.todayAVG]);

  useEffect(() => {
    setDay2(props.day2AVG);
    setDay2Date(props.day2Date);
    setDay2Month(props.day2Month);
  }, [props.day2AVG, props.day2Date, props.day2Month]);

  useEffect(() => {
    setDay3(props.day3AVG);
    setDay3Date(props.day3Date);
    setDay3Month(props.day3Month);
  }, [props.day3AVG, props.day3Date, props.day3Month]);

  useEffect(() => {
    setDay4(props.day4AVG);
    setDay4Date(props.day4Date);
    setDay4Month(props.day4Month);
  }, [props.day4AVG, props.day4Date, props.day4Month]);

  useEffect(() => {
    setDay5(props.day5AVG);
    setDay5Date(props.day5Date);
    setDay5Month(props.day5Month);
  }, [props.day5AVG, props.day5Date, props.day5Month]);

  useEffect(() => {
    setDay6(props.day6AVG);
    setDay6Date(props.day6Date);
    setDay6Month(props.day6Month);
  }, [props.day6AVG, props.day6Date, props.day6Month]);

  useEffect(() => {
    setDay7(props.day7AVG);
    setDay7Date(props.day7Date);
    setDay7Month(props.day7Month);
  }, [props.day7AVG, props.day7Date, props.day7Month]);

  const reducer = (accumulator, curr) => accumulator + curr;
  const avgToday = Math.round(today.reduce(reducer, 0) / props.todayAVG.length);
  const avgDay2 = Math.round(day2.reduce(reducer, 0) / props.day2AVG.length);
  const avgDay3 = Math.round(day3.reduce(reducer, 0) / props.day3AVG.length);
  const avgDay4 = Math.round(day4.reduce(reducer, 0) / props.day4AVG.length);
  const avgDay5 = Math.round(day5.reduce(reducer, 0) / props.day5AVG.length);
  const avgDay6 = Math.round(day6.reduce(reducer, 0) / props.day6AVG.length);
  const avgDay7 = Math.round(day7.reduce(reducer, 0) / props.day7AVG.length);

  console.log(day2Date);

  const data = [
    { name: 'Today', average: avgToday },
    { name: day2Date + `/` + day2Month, average: avgDay2 },
    { name: day3Date + `/` + day3Month, average: avgDay3 },
    { name: day4Date + `/` + day4Month, average: avgDay4 },
    { name: day5Date + `/` + day5Month, average: avgDay5 },
    { name: day6Date + `/` + day6Month, average: avgDay6 },
    { name: day7Date + `/` + day7Month, average: avgDay7 },
  ];

  return (
    <div className='graph'>
      <ResponsiveContainer width='95%' height='70%' className='chart'>
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
            fontSize={16}
          />
          <Bar
            dataKey='average'
            fill='#DD105E'
            maxBarSize={45}
            radius={10}
            label={{ fill: 'white', fontSize: 14 }}
            className='filter'
          />
        </BarChart>
      </ResponsiveContainer>
      <p>Daily sugar level average</p>
    </div>
  );
};

export default Chart;
