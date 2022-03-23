import './Chart.css';

import { ResponsiveContainer, XAxis, BarChart, Bar } from 'recharts';

const data = [
  { name: '3/2', average: 300 },
  { name: '2/2', average: 120 },
  { name: '4/2', average: 240 },
  { name: '5/2', average: 150 },
  { name: '6/2', average: 170 },
  { name: '7/2', average: 198 },
  { name: 'Today', average: 130 },
];

const Chart = () => {
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
