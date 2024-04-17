import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, TextField, Stack, Snackbar } from '@mui/material';
import { Notifications as NotificationsIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import axios from 'axios'; // Import axios for making HTTP requests
import { Alert } from '@mui/material'; // Import for success message alert
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar({ userName, currentPage }) {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 1000);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const markNotificationAsRead = async (event, notificationId) => {
    event.stopPropagation();
    const clickedNotification = notifications.find(notification => notification._id === notificationId);
    if (!clickedNotification) return;

    const clickCount = clickedNotification.clickCount ? clickedNotification.clickCount + 1 : 1;

    try {
      const response = await axios.post(`/notification/read/${notificationId}`, { clickCount });
      if (response.data.message) {
        console.log(response.data.message);

        setNotifications(notifications.map(notification => 
          notification._id === notificationId ? { ...notification, status: 'read', clickCount } : notification
        ));

        if (clickCount === 1) {
          navigate('/tasks');
        } else {
          navigate('/componentTwo');
          // Optionally, reset click count on the server here...
        }

        setSuccessMessage('Notification marked as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 0, color: "black", fontWeight: "bold" }}>
          {currentPage}
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

        <div ref={dropdownRef} onClick={toggleDropdown}>
          <IconButton aria-label="notifications">
            <NotificationsIcon />
            {notifications.length > 0 && (
              <span>({notifications.length})</span>
            )}
          </IconButton>
          {isDropdownVisible && (
            <div
              style={{
                position: 'absolute',
                right: '20px',
                top: '60px',
                width: '300px',
                maxHeight: '300px',
                overflowY: 'scroll',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
                backgroundColor: '#f9f9f9',
                color: '#333',
                zIndex: '1000',
                padding: '10px',
                borderRadius: '4px'
              }}
            >
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications.slice().reverse().map((notification, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      padding: '8px 12px', 
                      borderBottom: '1px solid #ddd',
                      backgroundColor: notification.status === 'unread' ? '#add8e6' : '#ffffff',
                      cursor: 'pointer'
                    }}
                    onClick={(event) => markNotificationAsRead(event, notification._id)}
                  >
                    {notification.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
          Welcome, {userName}
        </Typography>
        <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
      </Toolbar>
      {/* Display Snackbar for success message */}
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}

export default Navbar;
