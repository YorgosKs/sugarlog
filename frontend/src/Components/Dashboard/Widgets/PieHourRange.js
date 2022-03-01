import './PieHourRange.css';
import { ResponsiveContainer, Tooltip, Pie, PieChart, Cell } from 'recharts';

const PieHourRange = () => {
  const timeRange = [
    { range: '12 -  4', avg: 80, time: 23 },
    { range: '4 -  8', avg: 70 },
    { range: '8 - 12', avg: 89 },
    { range: '12 - 16', avg: 67 },
    { range: '16 - 20', avg: 40 },
    { range: '20 - 12', avg: 90 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='item-right'>
      <ResponsiveContainer width='100%' height='90%' className='chart'>
        <PieChart>
          <Pie
            data={timeRange}
            dataKey='avg'
            // nameKey='avg'
            cx='50%'
            cy='50%'
            outerRadius={60}
            innerRadius={40}
            fill='#A7C4BC'
            label
            className='filter'
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
    </div>
  );
};

export default PieHourRange;
