import React, { useState, useEffect } from 'react';
import '../components/customer.css';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    // { field: 'profile', headerName: 'Profile', width: 70 },
    {field: 'id',
        headerName: 'ID',
        width: 50 },
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

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



const Customer = () => {
    const [customerData, setCustomerData] = useState(null)
    const [counter, setCounter] = useState(1)

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/mongodata")
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
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
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


    //   return (
    //     <div>
    //       {customerData ? (
    //         <ul>
    //           {customerData.map((customer, index) => (
    //             <li key={index}>
    //               Customer {index + 1}: <b>Name - </b>{customer.name}, <b>Age -</b> {customer.age}, <b>Gender - </b>{customer.gender}, <b>E-mail - </b>{customer.email}, <b>Phone Number - </b>{customer.phoneno}, <b>Origin - </b>{customer.origin}, <b>Frequency - </b>{customer.frequency}, <b>visits - </b>{customer.visits}
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p>Loading...</p>
    //       )}
    //     </div>
    //   )
}

export default Customer



