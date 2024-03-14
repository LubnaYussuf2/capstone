import React, { useState, useEffect } from 'react';


const Customer = () => {
    const [customerData, setCustomerData] = useState(null)
      // const [counter, setCounter] = useState(1)
    
      useEffect(() => {
        fetch("http://127.0.0.1:5000/api/mongodata")
          .then(result => result.json())
          .then(data => {
            if (data && data.customers) {
              setCustomerData(data.customers);
              console.log(data.customers);
            }
          // .then(customerData => {
          //   setCustomerData(customerData);
          //   console.log(customerData); 
          })
          .catch(error => console.error("Error fetching data:", error));
      }, []);
    
    
      return (
        <div>
          {customerData ? (
            <ul>
              {customerData.map((customer, index) => (
                <li key={index}>
                  Customer {index + 1}: <b>Name - </b>{customer.name}, <b>Age -</b> {customer.age}, <b>Gender - </b>{customer.gender}, <b>E-mail - </b>{customer.email}, <b>Phone Number - </b>{customer.phoneno}, <b>Origin - </b>{customer.origin}, <b>Frequency - </b>{customer.frequency}, <b>visits - </b>{customer.visits}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )
    }

export default Customer



