import { useGraphData } from '@/app/hooks/usePlants';
import React from 'react';
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts';

interface MoistureGraphProps {
  moistureTopic: string; // Assuming this is the topic for the moisture data
}
const MoistureGraph: React.FC<MoistureGraphProps> = ({ moistureTopic }) => {
  const { data } = useGraphData(moistureTopic, 10); // Fetching the last 10 data points
  // Assuming useMoistureData is a custom hook that fetches the moisture data
  return (
    <div className='flex flex-col'>
      <div
        className='rounded-md bg-white p-4 text-green-700 shadow-lg'
        style={{ width: '100%' }}
      >
        <p className='mb-1 text-2xl font-semibold'>Moisture Development</p>
        {/* Replace the following div with your actual graph component */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="ts" />
            <YAxis dataKey="value" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoistureGraph;
