import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom'; 


//Merina, i think i also found dimentions. im lazy to test it out but here is the link to it:
//https://www.npmjs.com/package/react-dimensions

function CustomerProfile() {

    // user's name 
  const userName = "ukoo";

  const [customer, setCustomer] = useState();
  const [packages, setPackages] = useState()
  const { id } = useParams(); // This grabs the ID from the URL
  const navigate = useNavigate();



    useEffect(() => {
        fetch(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => response.json())
            .then(data => {
                setCustomer(data);
                console.log("i am from customer profile")
                console.log(data)
            })
            .catch(error => console.error("Error:", error));

    }, [id]); // Dependency array to re-fetch if ID changes   

    
    const goBack = () => {
        navigate(`/customers`);
    };

    





  return (
    <div style={{ marginLeft: '250px' }}>

    {/* -------------------------------- Header stuff start -------------------------------- */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0 , color: "black", fontWeight: "bold" }}>
            This is Customer {customer?.name}
          </Typography>

          <Stack direction="row" spacing={0} alignItems="center">
            <TextField
              placeholder="Search..."
              size="medium"
              variant="standard"
              sx={{ borderBottom: '1px solid', borderRadius: 0, minWidth: '30ch' }}
            />

            <IconButton color="disabled" aria-label="filter" sx={{ mr: 5 }}>
              <FilterListIcon />
            </IconButton>
          </Stack>


          <IconButton color="disabled" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>

          <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
              Welcome, {userName}
          </Typography>
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
         
        </Toolbar>
      </AppBar>

    {/* -------------------------------- Header stuff end -------------------------------- */}
    

    <>
    {customer ? (
        <div>
            <h1>Do i work?</h1>

            <button onClick={()=>{goBack()}}>Go Back</button>

            <h3>Name</h3>
            <p>{customer?.name}</p>
            <hr/>
            <br/>

            <h3>Age</h3>
            <p>{customer?.age}</p>
            <hr/>
            <br/>

            <h3>Gender</h3>
            <p>{customer?.gender}</p>
            <hr/>
            <br/>

            <h3>Origin</h3>
            <p>{customer?.origin}</p>
            <hr/>
            <br/>

            <h3>Occupation</h3>
            <p>{customer?.occupation}</p>
            <hr/>
            <br/>

            <h3>Income</h3>
            <p>{customer?.income}</p>
            <hr/>
            <br/>

            <h3>Interest</h3>
            <p>{customer?.hobby}</p>
            <hr/>
            <br/>

            <h3>Previous Purchases/Purchase History</h3>
            <p>{customer?.packages.map(item => item.Package).join(', ')}</p>
            <hr/>
            <br/>

            <h3>Review</h3>
            <p>{customer?.review['Review']}</p>
            <hr/>
            <br/>

            <h3>Avatar</h3>
            <p>{customer?.occupation}</p>
            <hr/>
            <br/>

        </div>

    ) : (

        <p>Loading...</p>
      )}
    </>     
      
    </div>
  )
}

export default CustomerProfile
