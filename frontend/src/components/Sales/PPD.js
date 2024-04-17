import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const PPD = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        const priceCounts = {};
        data.forEach(item => {
          const price = item["per_package_price"];
          const count = item["package_sold"];
          priceCounts[Math.floor(price / 100) * 100] = (priceCounts[Math.floor(price / 100) * 100] || 0) + count;
        });
        const priceData = Object.keys(priceCounts).map(price => ({
          price: Number(price),
          count: priceCounts[price],
        }));
        setData(priceData.sort((a, b) => a.price - b.price));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const minColor = '#ABA8E3'; // Color for lowest
  const maxColor = '#514F81'; // Color for highest

  const getColor = (count, data) => {
    if (count === Math.min(...data.map(item => item.count))) return minColor;
    if (count === Math.max(...data.map(item => item.count))) return maxColor;
    return '#8884d8'; // Default color
  };

  const CustomLegend = () => {
    return (
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li><span style={{ color: maxColor }}>■ High</span></li>
        <li><span style={{ color: minColor }}>■ Low</span></li>
        <li><span style={{ color: '#8884d8' }}>■ Count</span></li>
      </ul>
    );
  };

  return (
    <div style={{width:"100%", marginTop:0}}>
      {/* <h2>Package Price Distribution</h2> */}
      <ResponsiveContainer width="100%" height={140}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="price" />
          <YAxis />
          <Tooltip />
          <Legend 
            verticalAlign="middle" // Suggests vertical alignment but doesn't work directly as expected
            align="right" // Keeps the legend on the right
            layout="vertical" // Stacks the legend items vertically
            wrapperStyle={{
              top: '30%', // Adjust this value to better fit your chart's dimensions
              right: 0, // Aligns right to the edge of the chart area
              transform: 'translateY(-50%)', // Centers the legend relative to its position
              lineHeight: '24px' // Optional: Adjusts line height for better spacing between legend items
            }}
            content={<CustomLegend />}
          />
          <Bar dataKey="count" fill="#8884d8">
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.count, data)} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PPD;
