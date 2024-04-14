import React, { useState, useEffect } from 'react';

const ActiveCus = () => {
  const [customerData, setCustomerData] = useState(null)
  const [activeCustomersCount, setActiveCustomersCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/customers")
        .then(result => result.json())
        .then(data => {
            if (data && data) {
                setCustomerData(data);
                console.log(data);

                 // Count active customers
                 const activeCount = data.reduce((count, customer) => {
                    if (customer.visits <= 5) {
                        return count + 1;
                    }
                    return count;
                }, 0);
                setActiveCustomersCount(activeCount);
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}, []);

  return (
    <div>
       <p> Total Active Customers: {activeCustomersCount} </p>
    </div>
  )
}

export default ActiveCus
