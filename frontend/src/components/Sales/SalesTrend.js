import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const SalesTrend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        processData(data);
      });
  }, []);

  const processData = (salesData) => {
    const salesByMonth = {};

    salesData.forEach(sale => {
      const month = sale.Month;
      const year = sale.Year;
      const revenue = sale["Total Package Price"];

      if (!salesByMonth[year]) {
        salesByMonth[year] = {};
      }

      if (!salesByMonth[year][month]) {
        salesByMonth[year][month] = 0;
      }

      salesByMonth[year][month] += revenue;
    });

    const sortedData = sortData(salesByMonth);
    setData(sortedData);
  };

  const sortData = (salesByMonth) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const lastTwoYears = Object.keys(salesByMonth).sort((a, b) => b - a).slice(0, 2);
    const sortedData = months.map(month => ({
      month,
      ...lastTwoYears.reduce((acc, year) => ({ ...acc, [year]: salesByMonth[year][month] || 0 }), {})
    }));

    return sortedData;
  };

  return (
    // style={{backgroundColor: '#f5f5fc'}}
    <div>
        <h2 style={{marginTop:0}}> Sales Trend </h2>
        {/* <Typography variant="h5" sx={{ pb: 2 , color: "#261c33" }} >  Sales Trend </Typography> */}
        <ResponsiveContainer width="100%" height={400}>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="transparent"/>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip cursor={false}/>
            <Legend verticalAlign="top" height={36}/>
            {Object.keys(data[0] || {}).filter(key => key !== 'month').map((year, index) => (
            <Line type="monotone" dataKey={year} stroke={index === 0 ? "#8884d8" : "#82ca9d"} strokeWidth={2} key={year} />

            ))}
        </LineChart>
    </ResponsiveContainer>
    </div>
    
    
  );
}

export default SalesTrend;
