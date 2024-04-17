import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { People as PeopleIcon, AttachMoney as AttachMoneyIcon, EventNote as EventNoteIcon, Campaign as CampaignIcon, Person as PersonIcon, Settings as SettingsIcon, Help as HelpIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
const Nav = () => {
  const location = useLocation();

  return (
    <nav style={{ width: '250px', borderRight: '1px solid #ccc', height: '100vh', position: 'fixed'  }}>
      <AppBar position="static" sx={{ width: '250px', backgroundColor: '#fff', height: '100vh', boxShadow: 'none' }}>
        <Toolbar sx={{ marginTop: '20px' }}>
          {/* Logo placeholder */}
          <Typography variant="h6" noWrap>
            <img src={process.env.PUBLIC_URL + '/logo4.png'} alt="Logo" style={{ width: '100%' }} />
          </Typography>
        </Toolbar>
        <List sx={{ margin: 0, padding: 0, marginTop: 2 }}>
        <ListItem
            button
            component={Link}
            to="/"
            selected={location.pathname === '/'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <DashboardIcon /> {/* Use the Dashboard icon here */}
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#001a4d' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/sales"
            selected={location.pathname === '/sales'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Sales" sx={{ color: '#001a4d' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/customers"
            selected={location.pathname === '/customers'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" sx={{ color: '#001a4d' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/packages"
            selected={location.pathname === '/packages'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Bookings & Packages" sx={{ color: '#001a4d' }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/campaigns"
            selected={location.pathname === '/campaigns'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <CampaignIcon />
            </ListItemIcon>
            <ListItemText primary="Campaigns" sx={{ color: '#001a4d' }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/tasks"
            selected={location.pathname === '/tasks'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" sx={{ color: '#001a4d' }} />
          </ListItem>

          
          {/* Add more ListItems for other sections */}

          
          {/* Other screens */}
          <div style={{ marginTop: '50px', marginBottom: '5px', color: '#808080', fontSize: '16px', paddingLeft: 18 }}>
            Others
          </div>

          <ListItem
            button
            component={Link}
            to="/profile"
            selected={location.pathname === '/profile'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ color: '#001a4d' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/settings"
            selected={location.pathname === '/settings'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: '#001a4d' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/help"
            selected={location.pathname === '/help'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" sx={{ color: '#001a4d' }} />
          </ListItem>
          

          {/* Logout placeholder */}
          <div style={{ marginTop: '70%', color: '#808080', fontSize: '12px' }}>
            
          </div>
          <ListItem button
            component={Link}
            to="/logout"
            selected={location.pathname === '/logout'}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 255, 0.1)', // Highlighted background color
              },
            }}
          >
            <ListItemIcon sx={{ color: '#001a4d' }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#001a4d' }}/>
          </ListItem>

        </List>

      </AppBar>
    </nav>
  );
};

export default Nav;
