import React, { useState, useEffect } from 'react';

const MonthlySales = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        console.log('Sales Data:', data); // Log the sales data
        setSalesData(data);
      })
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  // Calculate sales for the last 6 months
  const currentDate = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const month = currentDate.getMonth() - i;
    const year = currentDate.getFullYear();
    return `${year}-${(month + 12) % 12 + 1}`; // Adjust month to 1-indexed
  });

  const salesForLast6Months = salesData
    .filter(sale => last6Months.includes(sale.Month + '-' + sale.Year))
    .reduce((total, sale) => total + sale.total_profit, 0);

  return (
    <div>
      <h4>Sales for Last 6 Months: ${salesForLast6Months}</h4>
    </div>
  );
};

export default MonthlySales;
