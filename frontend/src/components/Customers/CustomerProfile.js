import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Paper, Box, Grid, Divider } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GenderIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';

function CustomerProfile() {
  // Dummy placeholder values
  const userName = "ukoo";
  const placeholderAvatar = "path_to_default_avatar.jpg"; // Replace with actual path
  const [customer, setCustomer] = useState();
  const { id } = useParams(); // This grabs the ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/customers/${id}`)
      .then(response => response.json())
      .then(data => {
        setCustomer(data);
      })
      .catch(error => console.error("Error:", error));
  }, [id]); // Dependency array to re-fetch if ID changes

  const goBack = () => {
    navigate(`/customers`);
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ marginLeft: '250px', height:'100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontWeight: "bold" }}>
            Customer Profile
          </Typography>
          <IconButton color="disabled" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
            Welcome, {userName}
          </Typography>
          <Avatar alt="User Avatar" src={placeholderAvatar} />
        </Toolbar>
      </AppBar>

      {/* Profile Card */}
      <Paper elevation={2} sx={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
          <Avatar
            alt="Customer Avatar"
            src={customer.avatar || placeholderAvatar}
            sx={{ width: '100px', height: '100px', margin: 'auto' }}
          />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>{customer.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent'}}>
                <Grid container alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <GenderIcon sx={{ color: '#38295D', fontSize: '3rem'}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Gender</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1, color: '#001a4d' }}>{customer.gender}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <CakeIcon sx={{ color: '#38295D', fontSize: '3rem'}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Age</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1, color: '#001a4d' }}>{customer.age} years old</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <LocationOnIcon sx={{ color: '#38295D', fontSize: '3rem'}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Location</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1, color: '#001a4d' }}>{customer.origin}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent' }}>
                <Grid container alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <WorkIcon sx={{ color: '#38295D', fontSize: '3rem'}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Occupation</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1, color: '#001a4d' }}>{customer.occupation}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <MonetizationOnIcon sx={{ color: '#38295D', fontSize: '3rem'}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Household Income</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1, color: '#001a4d' }}>${customer.income}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mb: 3 }}>
                  <Grid item>
                    <FavoriteIcon sx={{ color: '#38295D', fontSize: '3rem'}}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Interests</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1 , color: '#001a4d'}}>{customer.hobby}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Past Purchases:</b> {customer.packages.map(item => item.Package).join(', ')}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Placeholder:</b> Placeholder</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Customer Review:</b> {customer.review['Review']}</Typography>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <button onClick={goBack}>Go Back</button>
      </Box>
    </div>
  )
}

export default CustomerProfile;



// ----------------------------------------------without style----------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Grid, Paper } from '@mui/material';
// import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
// import { useParams, useNavigate } from 'react-router-dom'; 


// //Merina, i think i also found dimentions. im lazy to test it out but here is the link to it:
// //https://www.npmjs.com/package/react-dimensions

// function CustomerProfile() {

//     // user's name 
//   const userName = "ukoo";

//   const [customer, setCustomer] = useState();
//   const [packages, setPackages] = useState()
//   const { id } = useParams(); // This grabs the ID from the URL
//   const navigate = useNavigate();



//     useEffect(() => {
//         fetch(`http://127.0.0.1:5000/customers/${id}`)
//             .then(response => response.json())
//             .then(data => {
//                 setCustomer(data);
//                 console.log("i am from customer profile")
//                 console.log(data)
//             })
//             .catch(error => console.error("Error:", error));

//     }, [id]); // Dependency array to re-fetch if ID changes   

    
//     const goBack = () => {
//         navigate(`/customers`);
//     };

    





//   return (
//     <div style={{ marginLeft: '250px' }}>

//     {/* -------------------------------- Header stuff start -------------------------------- */}
//       <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0 , color: "black", fontWeight: "bold" }}>
//             This is Customer {customer?.name}
//           </Typography>

         


//           <IconButton color="disabled" aria-label="notifications">
//             <NotificationsIcon />
//           </IconButton>

//           <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
//               Welcome, {userName}
//           </Typography>
//           <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
         
//         </Toolbar>
//       </AppBar>

//     {/* -------------------------------- Header stuff end -------------------------------- */}
    

//     <>
//     {customer ? (
//         <div>
//             <h1>Do i work?</h1>

//             <button onClick={()=>{goBack()}}>Go Back</button>

//             <h3>Name</h3>
//             <p>{customer?.name}</p>
//             <hr/>
//             <br/>

//             <h3>Age</h3>
//             <p>{customer?.age}</p>
//             <hr/>
//             <br/>

//             <h3>Gender</h3>
//             <p>{customer?.gender}</p>
//             <hr/>
//             <br/>

//             <h3>Origin</h3>
//             <p>{customer?.origin}</p>
//             <hr/>
//             <br/>

//             <h3>Occupation</h3>
//             <p>{customer?.occupation}</p>
//             <hr/>
//             <br/>

//             <h3>Income</h3>
//             <p>{customer?.income}</p>
//             <hr/>
//             <br/>

//             <h3>Interest</h3>
//             <p>{customer?.hobby}</p>
//             <hr/>
//             <br/>

//             <h3>Previous Purchases/Purchase History</h3>
//             <p>{customer?.packages.map(item => item.Package).join(', ')}</p>
//             <hr/>
//             <br/>

//             <h3>Review</h3>
//             <p>{customer?.review['Review']}</p>
//             <hr/>
//             <br/>

//             <h3>Avatar</h3>
//             {/* <p>{customer?.occupation}</p> */}
//             <hr/>
//             <br/>

//         </div>

//     ) : (

//         <p>Loading...</p>
//       )}
//     </>     
      
//     </div>
//   )
// }

// export default CustomerProfile
