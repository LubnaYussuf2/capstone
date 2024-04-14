import React, { useState, useEffect } from 'react';
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

import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/firestore'; 

function App() {
  return (
    // <div>
    //   <CustomerScreen />
    // </div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          {/* <Route path="/logout" element={<Logout />} /> */}

        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

const ProtectedRoutes = () => {
  
  return (
    <div style={{ display: 'flex' }}>
      <Nav />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
 )
}


export default App;


