import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const RadarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], 
    datasets: []
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sales')
      .then(response => response.json())
      .then(data => {
        processData(data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const processData = (data) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const months = [];
    const totalProfit = [];
    const packagesSold = [];

    const filteredData = data.filter(item => item.Year === lastYear);

    filteredData.forEach(item => {
      if (!months.includes(item.Month)) {
        months.push(item.Month);
        totalProfit.push(item['Total Profit']);
        packagesSold.push(item.package_sold * 60); // Scaling factor, adjust as needed
      }
    });

    const sortedIndices = months.map(month => monthOrder.indexOf(month)).sort((a, b) => a - b);
    const sortedMonths = sortedIndices.map(index => monthOrder[index]);
    const sortedTotalProfit = sortedIndices.map(index => totalProfit[index]);
    const sortedPackagesSold = sortedIndices.map(index => packagesSold[index]);

    setChartData({
      labels: sortedMonths,
      datasets: [
        {
          label: 'Total Profit',
          data: sortedTotalProfit,
          borderColor: '#8884d8',
          backgroundColor: 'rgba(136, 132, 216, 0.2)'
        },
        {
          label: 'Packages Sold (scaled)',
          data: sortedPackagesSold,
          borderColor: '#82ca9d',
          backgroundColor: 'rgba(130, 202, 157, 0.2)',
        }
      ]
    });
};



  const options = {
    
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
        legend: {
          position: 'top', 
          layout: {
            padding: {
              // Add padding to the chart area
              bottom: 20, // Add bottom padding after the legends
            },
          },
        },
      },
    elements: {
      line: {
        borderWidth: 2
      },
    },
    // layout: {
    //     padding: {
    //       top: 20, // Add padding at the top
    //       bottom: 20, // Add padding at the bottom
    //       left: 20, // Add padding at the left
    //       right: 20, // Add padding at the right
    //     }
    // }
  };

  return (
    <div style={{paddingLeft: 12}}> 
      <h2>Monthly Sales Performance</h2>
      <p style={{ color: 'gray' }}>Last Year</p>
      <div style={{ position: 'relative', marginBottom: '20px', width: '80%', paddingLeft: 50 }}>
        <Radar data={chartData} options={options}  />
      </div>
    </div>
  );
}

export default RadarChart;



// with year dropdown 

// import React, { useState, useEffect } from 'react';
// import { Radar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const RadarChart = () => {
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1);
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: []
//   });

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/sales`)
//       .then(response => response.json())
//       .then(data => {
//         processData(data, selectedYear);
//       })
//       .catch(error => console.error('Error fetching data: ', error));
//   }, [selectedYear]);

//   const processData = (data, year) => {
//     const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     let months = [];
//     let totalProfit = [];
//     let packagesSold = [];

//     const filteredData = data.filter(item => item.Year === year);
//     filteredData.forEach(item => {
//       const monthIndex = monthOrder.indexOf(item.Month);
//       if (monthIndex !== -1) {
//         months[monthIndex] = item.Month;
//         totalProfit[monthIndex] = item['Total Profit'];
//         packagesSold[monthIndex] = item.package_sold * 50;
//       }
//     });

//     setChartData({
//       labels: monthOrder.filter((_, index) => months[index] !== undefined),
//       datasets: [
//         {
//           label: 'Total Profit',
//           data: totalProfit,
//           borderColor: 'rgb(255, 99, 132)',
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         },
//         {
//           label: 'Packages Sold',
//           data: packagesSold,
//           borderColor: 'rgb(54, 162, 235)',
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         }
//       ]
//     });
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(parseInt(event.target.value, 10));
//   };

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [currentYear - 1, currentYear - 2, currentYear - 3].map(year => (
//     <option key={year} value={year}>{year}</option>
//   ));

//   return (
//     <div>
//       <select onChange={handleYearChange} value={selectedYear}>
//         {yearOptions}
//       </select>
//       <Radar data={chartData} />
//     </div>
//   );
// }

// export default RadarChart;
