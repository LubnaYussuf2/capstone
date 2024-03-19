import React, { useState, useEffect } from 'react';
import '../components/customer.css';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    // { field: 'profile', headerName: 'Profile', width: 70 },
    {field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', width: 50 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'origin', headerName: 'Origin', width: 100 },
    { field: 'email', headerName: 'E-Mail', width: 150 },
    { field: 'phoneno', headerName: 'Phone Number', width: 130 },
    // { field: 'status', headerName: 'Status', width: 100 },
    
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];



const Customer = () => {
    const [customerData, setCustomerData] = useState(null)

    useEffect(() => {
        fetch("http://127.0.0.1:5000/customers")
            .then(result => result.json())
            .then(data => {
                if (data && data) {
                    setCustomerData(data);
                    console.log(data);
                }
                // if (data && data.customers) {
                //     setCustomerData(data.customers);
                //     console.log(data.customers);
                // }
                // ----------------
                // .then(customerData => {
                //   setCustomerData(customerData);
                //   console.log(customerData); 
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    const handleViewCustomer = (customerId) => {
        fetch(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(result => result.json())
            .then(data => {
                // Handle the response data
                console.log(data);
                console.log("i worked")
            })
            .catch(error => console.error("Error fetching customer data:", error));
    };


    return (
        <div className="App">
            <div className="sidebar">
                <h2>CRM Menu</h2>
                <ul className="nav">
                    <li><a href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="#"><i className="fas fa-user-friends"></i> Leads</a></li>
                    <li><a href="#"><i className="fas fa-bullhorn"></i> Campaigns</a></li>
                    <li><a href="#"><i className="fas fa-calendar-alt"></i> Bookings</a></li>
                    <li><a href="#"><i className="fas fa-users"></i> Customers</a></li>
                </ul>
            </div>
            <div className="container">
                <div className="header">
                    <h1>Customers</h1>
                    <button className="add-customer-btn"><i className="fas fa-plus"></i> Add Customer</button>
                </div>
                <div className="customer-list">
                    <h2>Customer List</h2>
                    <div className="customer-list-content">
                    {customerData ? (
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={customerData}
                                    columns={columns}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                    onRowClick={(row) => handleViewCustomer(row.id)}
                                />
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer



