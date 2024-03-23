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
    let month = currentDate.getMonth() - i; // 0-indexed month
    let year = currentDate.getFullYear();
    if (month < 0) {
      month += 12; // Adjust for previous year
      year--; // Decrement year
    }
    return `${year}-${month < 9 ? `0${month + 1}` : month + 1}`; // Adjust month to 1-indexed with leading zero
  });

  const salesForLast6Months = salesData
    .filter(sale => last6Months.includes(`${sale.Year}-${sale.Month}`))
    .reduce((total, sale) => total + sale.total_profit, 0);

  return (
    <div>
      <h4>Sales for Last 6 Months: ${salesForLast6Months}</h4>
    </div>
  );
};

export default MonthlySales;
