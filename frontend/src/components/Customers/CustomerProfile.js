import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar,Badge, Paper, Box, Grid,  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Notifications as NotificationsIcon, ArrowBack as ArrowBackIcon, Warning as WarningIcon, Star as StarIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GenderIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import StarRateIcon from '@mui/icons-material/StarRate';
import LinearProgress from '@mui/material/LinearProgress';

function CustomerProfile() {
  // Dummy placeholder values
  const userName = "ukoo";
  const placeholderAvatar = "path_to_default_avatar.jpg"; // Replace with actual path
  const [isDialogOpen, setIsDialogOpen] = useState(true); 
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

  // const handleClose = () => setOpen(false);
  const handleClose = () => setIsDialogOpen(false);

  const goBack = () => {
    navigate(`/customers`);
  };

  // Helper function to count occurrences and format the output
  const formatPackagesWithCounts = (packages) => {
    const countMap = {};
  
    // Count the occurrences of each package
    packages.forEach((item) => {
      countMap[item.Package] = (countMap[item.Package] || 0) + 1;
    });
  
    // Return a React fragment with each package and its count on a new line
    return Object.entries(countMap).map(([pkg, count], index) => (
      <React.Fragment key={pkg}>
        {index + 1}. {pkg}{count > 1 ? ` (${count})` : ''}
        <br />
      </React.Fragment>
    ));
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ marginLeft: '250px', height:'100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="go back" onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
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

      {/* <Dialog
        open={isDialogOpen} // Use the state here to control the visibility of the dialog
        onClose={handleClose} // Pass the function that will set the state to false
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"AI Package Recommendation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Based on your interests and previous purchases, we recommend the package: <strong>Cultural Tours</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog> */}
      

      {/* Profile Card */}
      <Paper elevation={2} sx={{ padding: '20px', marginTop: '20px', height:"80%" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
        <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<StarIcon sx={{ color: '#ffd700', fontSize: '40px' }} />}
            >
              <Avatar
                alt="Customer Avatar"
                src={customer.avatar || placeholderAvatar}
                sx={{ width: '100px', height: '100px', bgcolor: '#43268B' }}
              >
                {customer.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
            </Badge>
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
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small', paddingLeft:1 }}>Total Spendings</Typography>
                    <Typography variant="h4" sx={{ paddingLeft:1, color: '#001a4d' }}>{customer.income}</Typography>
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
        {/* <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Past Purchases:</b> {customer.packages.map(item => item.Package).join(', ')}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Placeholder:</b> Placeholder</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Customer Satisfaction Rate:</b> {`${(customer.review.sentiment_score * 100).toFixed(2)}%`}</Typography>
        <Typography variant="body2"><b>Customer Review:</b> {customer.review['Review']}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Cluster:</b> {customer.cluster}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2"><b>Cluster Type:</b>At-Risk Former Regulars</Typography> */}

        <Paper elevation={2} sx={{ padding: '20px', marginTop: '20px', backgroundColor: '#f4f6f8', borderRadius: '15px' }}>
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Card sx={{ marginBottom: 2, borderRadius: '15px', paddingBottom:0 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Cluster: </strong>
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  {customer.cluster} - <span style={{ color: 'red', marginLeft: '4px' }}> At-Risk </span> - Former Regulars
                  <WarningIcon sx={{ color: 'red', ml: 1, fontSize: '1.2rem' }} />
                </Typography>
                <Typography  sx={{ color:"#5D5FEF", pt:2 }}> Take Action </Typography>
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '15px' }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Past Purchases:</strong>
                  </Typography>
                  <Typography variant="body1">  {formatPackagesWithCounts(customer.packages)} </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Card sx={{ marginBottom: 2, borderRadius: '15px' }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Customer Satisfaction Rate:</strong>
                  </Typography>
                  <LinearProgress variant="determinate" value={customer.review.sentiment_score * 100} sx={{ height: '10px', borderRadius: '5px' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2">{`${(customer.review.sentiment_score * 100).toFixed(2)}%`}</Typography>
                    <StarRateIcon sx={{ color: '#ffd700' }} />
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: '15px'}}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Customer Review:</strong>
                  </Typography>
                  <Typography variant="body1">{customer.review['Review']}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>



      </Paper>

      {/* <Box sx={{ textAlign: 'center', mt: 2 }}>
        <button onClick={goBack}>Go Back</button>
      </Box> */}
      {/* AI Recommendation Card fixed at the bottom right */}
      <Card sx={{
        position: 'fixed',  // Fixed position
        bottom: 20,         // 20px from the bottom
        right: 20,          // 20px from the right
        maxWidth: '300px',  // Maximum width
        backgroundColor: '#CAF1E9', // Background color
        borderRadius: '8px', // Rounded corners
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'  // Subtle shadow
      }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Package Recommendation
          </Typography>
          {/* <Typography variant="body2">
            Based on your interests and previous purchases, we recommend:
          </Typography> */}
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Cultural Tours
          </Typography>
          <Typography variant="body1" sx={{ color: "#5D5FEF", pl:20 }}>
            send email
          </Typography>
        </CardContent>
      </Card>

    </div>
  )
}

export default CustomerProfile;
