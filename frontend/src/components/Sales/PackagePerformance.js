import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

const PackagePerformance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        processData(data);
      });
  }, []);

  const processData = (salesData) => {
    const salesByPackageType = {};

    salesData.forEach(({ 'Package Type': packageType, package_sold }) => {
      if (!salesByPackageType[packageType]) {
        salesByPackageType[packageType] = 0;
      }
      salesByPackageType[packageType] += package_sold;
    });

    const processedData = Object.keys(salesByPackageType).map(packageType => ({
      name: packageType,
      value: salesByPackageType[packageType],
    }));

    setData(processedData);
  };

  // Custom label component to display percentage inside the chart
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy  + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <Text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`}
      </Text>
    );
  };

  const COLORS = ['#3a405a', '#7776bc', '#2e294e'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PackagePerformance;
