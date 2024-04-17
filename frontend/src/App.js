import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Routes/Nav';
import Home from './components/Dashbaord/Home';
import Customers from './components/Customers/Customers';
import Sales from './components/Sales/Sales'; 
import Packages from './components/booking & packages/Packages';
import Campaigns from './components/Campaigns/Campaigns'; 
import Profile from './components/Profile';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Tasks from './components/Tasks/tasks'; 
import CustomerProfile from './components/Customers/CustomerProfile';




function App() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoutes
              notifications={notifications}
              addNotification={addNotification}
              clearNotifications={clearNotifications}
            />
          }
        />
          {/* <Route path="/logout" element={<Logout />} /> */}

        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

const ProtectedRoutes = ({
  notifications,
  addNotification,
  clearNotifications,
}) => {
  
  return (
    <div style={{ display: 'flex', backgroundColor: '#f5f5fc'  }}>
      <Nav />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route exact path="/" element={<Home 
          notifications={notifications}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
          />} />
          <Route path="/customers" element={<Customers 
          notifications={notifications}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
          />} />
          <Route path="/customers/:id" element={<CustomerProfile />} /> 
          <Route path="/sales" element={<Sales 
          notifications={notifications}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
          />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/tasks" element={<Tasks 
          notifications={notifications}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
          />} />
          <Route path="/profile" element={<Profile 
          notifications={notifications}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
          />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
 )
}

export default App;
