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
import SignOut from './components/Auth/logout';
import Tasks from './components/Tasks/tasks'; 
import CustomerProfile from './components/Customers/CustomerProfile';
import MultiFactorAuthentication from './components/Auth/mfa'; // Import the MFA component
import { Logout } from '@mui/icons-material';





function App() {
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<SignOut />} />
          {/* <Route path="/logout" element={<Logout />} /> */}

        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

const ProtectedRoutes = () => {
  
  return (
    <div style={{ display: 'flex', backgroundColor: '#f5f5fc'  }}>
      <Nav />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerProfile />} /> 
          <Route path="/sales" element={<Sales />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mfa" element={<MultiFactorAuthentication />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
 )
}

export default App;
