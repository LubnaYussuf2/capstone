import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
// import '../components/customer.css';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { Padding } from '@mui/icons-material';

const columns = [
    { 
        // field: 'profile', 
        headerName: 'Profile', 
        width: 75, 
        renderCell: (params) => (
            // <Avatar style={{ height: 30, width: 30, fontSize: '12.5px', backgroundColor: getRandomColor() }}></Avatar>
            <Avatar style={{ height: 35, width: 35, fontSize: '12.5px', backgroundColor: getAvatarColor(params.row.name), color: 'black' }}>
                {getInitials(params.row.name)}
            </Avatar>
        ) 
    },    

    // {field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'age', headerName: 'Age', width: 55 },
    { field: 'gender', headerName: 'Gender', width: 80 },
    { field: 'origin', headerName: 'Origin', width: 80 },
    { field: 'email', headerName: 'E-Mail', width: 190 },
    { field: 'phoneno', headerName: 'Phone Number', width: 130 },
    { field: 'visits', headerName: 'Status', width: 90, 
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

// Define a list of colors for the profile avatars
const avatarColors = ['#bee9e8', '#62b6cb', '#ece4db', '#cae9ff', '#7ca2a6', '#b8bedd'];
// Adjust the function to use these colors
const getAvatarColor = (name) => {
    // Simple example: hash the name to get a consistent index
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return avatarColors[sum % avatarColors.length];
};

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
    const navigate = useNavigate();

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
                 // Navigate to CustomerProfile component with the customer's ID
                 navigate(`/customers/${customerId}`);
                })
            .catch(error => console.error("Error fetching customer data:", error));
    };



    return (
        <>
         {customerData ? (
        <div style={{ height: 700, width: '97%', margin: 10, paddingBottom: 25 }}>
          {/* <p style={{ fontSize: '24px', marginTop: '0px' }}>Customer List</p> */}
          <Typography variant="h5" sx={{ pb: 2 , color: "#261c33" }} > Customer List</Typography>
          <DataGrid
            rows={customerData}
            columns={columns}
            pageSizeOptions={[5, 10]}
            stickyHeader
            onRowClick={(row) => console.log(handleViewCustomer(row.id))}
            sx={{
              // Targeting the header to change its background and text color
              '& .MuiDataGrid-columnHeaders': {
                // backgroundColor: '#DFECF7',
                // color: 'white',
                // fontWeight: 'bold',
                borderBottom: 2,
              },
              // Targeting the footer to change its background and text color
              '& .MuiDataGrid-footerContainer': {
                // backgroundColor: '#E9EBF1',
                color: 'white',
              },
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )} 
        </>
                    
    );
}

export default Customer