import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart2 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/package')
      .then(response => response.json())
      .then(data => {
        const chartData = processData(data);
        setChartData(chartData);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const determineCategory = (month, packageType) => {
    // Seasonal categorization
    if (month === 12 || month === 1 ) {
      // Winter (December - Jan)
      if (packageType.includes('Adventure Tours') || packageType.includes('Luxury and VIP Tours') || packageType.includes('Beach and Resort Tours') || packageType.includes('Cultural Tours') || packageType.includes('Sightseeing Tours') || packageType.includes('Adventure and Wellness Escape') || packageType.includes('Cultural Exploration Package')) {
        return 'Winter';
      }
    } else if (month >= 3 && month <= 4) {
      // Spring (March - April)
      if (packageType.includes('Adventure Tours') || packageType.includes('Luxury and VIP Tours') || packageType.includes('Beach and Resort Tours') || packageType.includes('Cultural Tours') || packageType.includes('Sightseeing Tours') || packageType.includes('Adventure and Wellness Escape') || packageType.includes('Cultural Exploration Package')) {
        return 'Spring';
      }
    } else if (month >= 5 && month <= 6) {
      // Late Spring (May - June)
      if (packageType.includes('Adventure Tours') || packageType.includes('Luxury and VIP Tours') || packageType.includes('Beach and Resort Tours') || packageType.includes('Cultural Tours') || packageType.includes('Sightseeing Tours') || packageType.includes('Adventure and Wellness Escape') || packageType.includes('Cultural Exploration Package')) {
        return 'Late Spring';
      }
    } else if (month >= 7 && month <= 8) {
      // Summer (July - August)
      if (packageType.includes('Adventure Tours') || packageType.includes('Luxury and VIP Tours') || packageType.includes('Beach and Resort Tours') || packageType.includes('Cultural Tours') || packageType.includes('Sightseeing Tours') || packageType.includes('Adventure and Wellness Escape') || packageType.includes('Cultural Exploration Package')) {
        return 'Summer';
      }
    }
  
    // Early Fall (September - October)
    if ((month === 9 || (month === 10 )) &&
    (packageType.includes('Adventure Tours') || packageType.includes('Luxury and VIP Tours') || packageType.includes('Beach and Resort Tours') || packageType.includes('Cultural Tours') || packageType.includes('Sightseeing Tours') || packageType.includes('Adventure and Wellness Escape') || packageType.includes('Cultural Exploration Package'))) {
      return 'Early Fall';
    }
  
    // Late Fall (November-December)
    if ((month >= 11 && month <= 12) &&
    (packageType.includes('Adventure Tours') || packageType.includes('Luxury and VIP Tours') || packageType.includes('Beach and Resort Tours') || packageType.includes('Cultural Tours') || packageType.includes('Sightseeing Tours') || packageType.includes('Adventure and Wellness Escape') || packageType.includes('Cultural Exploration Package'))) {
      return 'Late Fall';
    }
  
    // If none of the categories match
    return null;
  };
  

const processData = (data) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const yearBeforeLast = currentYear - 2;

    let results = {
      [lastYear]: {},
      [yearBeforeLast]: {}
    };

    // Define your categories (replace these with your actual categories)
    const categories = ['Winter', 'Spring', 'Late Spring', 'Summer', 'Early Fall', 'Late Fall'];

    // Initialize category counts
    categories.forEach(category => {
      results[lastYear][category] = 0;
      results[yearBeforeLast][category] = 0;
    });

    // Process data
    data.forEach(item => {
      const date = new Date(item.Date_Used);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const packageType = item.Package;
      const category = determineCategory(month, packageType);

      if (category && (year === lastYear || year === yearBeforeLast)) {
        results[year][category]++;
      }
    });

    // Convert results to chart data format
    return {
      labels: categories,
      datasets: [
        {
          label: `${lastYear}`,
          data: Object.values(results[lastYear]),
          borderColor: '#8884d8',
          backgroundColor: 'rgba(136, 132, 216, 0.2)',
          borderWidth: 1,
        },
        {
          label: `${yearBeforeLast}`,
          data: Object.values(results[yearBeforeLast]),
          borderColor: '#82ca9d',
          backgroundColor: 'rgba(130, 202, 157, 0.2)',
          borderWidth: 1,
        }
      ]
    };
  };

  return (
    // <div>
    //   <Radar data={chartData} />
    // </div>
    <div style={{paddingLeft: 12}}> 
    <h2>Seasonal Package Sales Trend</h2>
    {/* <p style={{ color: 'gray' }}>Last Year</p> */}
    <div style={{ position: 'relative', marginBottom: '20px', width: '80%', paddingLeft: 50 }}>
      <Radar data={chartData}  />
    </div>
  </div>
  );
};

export default RadarChart2;