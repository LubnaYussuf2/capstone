import React, { useState, useEffect } from 'react';
// import '../components/customer.css';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';




const columns = [
    { 
        // field: 'profile', 
        headerName: 'Profile', 
        width: 70, 
        renderCell: (params) => (
            <Avatar style={{ height: 30, width: 30, fontSize: '12.5px', backgroundColor: getRandomColor() }}>
                {getInitials(params.row.name)}
            </Avatar>
        ) 
    },    {field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', width: 50 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'origin', headerName: 'Origin', width: 100 },
    { field: 'email', headerName: 'E-Mail', width: 150 },
    { field: 'phoneno', headerName: 'Phone Number', width: 130 },
    { field: 'visits', headerName: 'Status', width: 100, 
        renderCell: (params) => (
            <Chip
                label={params.row.visits > 5 ? "Inactive" : "Active"}
                color={params.row.visits > 5 ? "secondary" : "primary"}
                variant="outlined"
                size="small"
            />
        )
    }
    
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

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to get initials from name
const getInitials = (name) => {
    const nameArray = name.split(' ');
    return nameArray.map((word) => word.charAt(0)).join('');
};



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
        <div className="customer-list">
                    <div className="customer-list-content">
                    {customerData ? (
                            <div style={{ height: 400, width: '100%', margin: 15}}>
                                <DataGrid
                                    rows={customerData}
                                    columns={columns}
                                    pageSizeOptions={[5, 10]}
                                    stickyHeader
                                    // checkboxSelection
                                    onRowClick={(row) => handleViewCustomer(row.id)}
                                />
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
    );
}

export default Customer