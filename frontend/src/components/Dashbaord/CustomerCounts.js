import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const CustomerCounts = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/cap')
      .then(response => response.json())
      .then(data => setCustomerData(data))
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  const customerCounts = {};
  customerData.forEach(customer => {
    if (customer.Year === 2022 || customer.Year === 2023) {
      const key = `${customer.Month}-${customer.Year}`;
      customerCounts[key] = (customerCounts[key] || 0) + 1;
    }
  });

  // Organize data for the updated chart requirements
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels = months; // Now we only use month names as labels
  const data2022 = [];
  const data2023 = [];

  months.forEach(month => {
    const count2022 = customerCounts[`${month}-2022`] || 0;
    const count2023 = customerCounts[`${month}-2023`] || 0;
    data2022.push(count2022);
    data2023.push(count2023);
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: '2022',
        data: data2022,
        backgroundColor: '#e5d9f2',
      },
      {
        label: '2023',
        data: data2023,
        backgroundColor: '#9f86c0',
      },
    ],
  };

  return (
    <div>
      <h2>Customer Counts</h2>
      <div style={{ height: '400px', width: '600px', paddingLeft:20 }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: false, // Each month's bars will be shown side by side
                grid: {
                    display: false, // Adjust grid line display here
                },
              },
              y: {
                stacked: false,
                grid: {
                    display: false, // Adjust grid line display here
                },
              },
            },
            plugins: {
              legend: {
                display: true, // Control the display of the legend
              },
            },
            barPercentage: 1.0,
            categoryPercentage: 0.6,
          }}
        />
      </div>
    </div>
  );
};

export default CustomerCounts;
