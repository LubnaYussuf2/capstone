import React, { useState, useEffect } from 'react';



function Section4() {

    const [totalCustomersLastYear, setTotalCustomersLastYear] = useState(0);
    const [customerData, setCustomerData] = useState([]);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/data');
          const data = await response.json();
        //   setCustomerData(data)
  
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
    }, []);
  
    return (
        // <div style={{ }}>

        //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        //     <h3 style={{ marginRight: '10px' }}>Tasks Remaining</h3>
        //   </div>

        //   <div style={{ textAlign: 'center' }}>
        //     <h2>12</h2>
        //   </div>
          
        //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        //     <p style={{ marginRight: '10px', marginBottom: "15px" }}>See Details</p>
        //     <img src={process.env.PUBLIC_URL + '/tasks.png'} alt="Logo" style={{ width: '10%', marginLeft: '10px', marginBottom: "15px"  }} />
        //   </div>

        // </div>

        <div style={{ }}>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ marginTop: 0 }}>TASK REMAINING</p>  
            {/* <p style={{marginTop: 0 , marginLeft:110, color:"#009E60"}}>{totalCustomersLastYear}</p> */}
          </div>

          <div style={{ textAlign: '' }}>
          <p style={{ fontSize: '24px', marginBottom: '5px', marginTop: 10  }}>2</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: '', justifyContent: 'space-between' }}>
            <p style={{ marginRight: '10px', marginBottom: "15px", color: "#5D5FEF", marginTop: 20 }}>Check tasks</p>
          </div> 

        </div>
      );
  }

  
  export default Section4;