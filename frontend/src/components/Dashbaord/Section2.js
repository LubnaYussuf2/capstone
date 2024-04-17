import React, { useState, useEffect } from 'react';



function Section2() {

    const [totalCustomersLastYear, setTotalCustomersLastYear] = useState(0);
    const [customerData, setCustomerData] = useState([]);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/data');
          const data = await response.json();
          setCustomerData(data)
  
          // Calculate the total customers from the last year
          const totalCustomers = data.reduce((total, customer) => {
            if (customer.Year == "2023") {
              return total + 1;
            }
            return total;
          }, 0);
  
          setTotalCustomersLastYear(totalCustomers);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    });
  
    return (
        <div style={{ }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ marginRight: '10px' }}>Total Customers</h3>
            <p style={{color:"#009E60"}}>{totalCustomersLastYear}</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2>{customerData.length}</h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ marginRight: '10px', marginBottom: "15px" }}>See Details</p>
            <img src={process.env.PUBLIC_URL + '/user.png'} alt="Logo" style={{ width: '10%', marginLeft: '10px', marginBottom: "15px"  }} />
          </div>

        </div>
      );
  }

  
  export default Section2;