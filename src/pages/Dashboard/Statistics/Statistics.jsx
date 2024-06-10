import {  useQuery } from '@tanstack/react-query';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import useAxiosSecure  from '../../../Hook/useAxiosSecure';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const Statistics = () => {

  
  const axiosSecure = useAxiosSecure()

  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/admin-stats');
                const { productCount, reviewCount, userCount } = response.data;

                const chartData = [
                    { name: 'Products', value: productCount },
                    { name: 'Reviews', value: reviewCount },
                    { name: 'Users', value: userCount }
                ];

                setData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [axiosSecure]);




 


 const RADIAN = Math.PI / 180;
 const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
   return (
     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
     </text>
   );
   
 };



  

    return (
        <div className='w-[300px] h-96'>
            <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
       
        
      </ResponsiveContainer>
        </div>
    );
};

export default Statistics;