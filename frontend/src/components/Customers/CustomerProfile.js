import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);
    const { id } = useParams(); // This grabs the ID from the URL

    useEffect(() => {
        // Adjust the URL to match your API endpoint
        fetch(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => response.json())
            .then(data => {
                setCustomer(data);
            })
            .catch(error => console.error("Error:", error));
    }, [id]); // Dependency array to re-fetch if ID changes

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{customer.name}</h2>
            {/* Other customer details here */}
        </div>
    );
};

export default CustomerProfile;
