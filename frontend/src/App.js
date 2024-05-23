import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './home';
import Products from './products';
import Clubs from './clubs';
import MyClubs from './myclubs';
import AddClub from './AddClub';
import Inventors from './inventors';
import Cart from './cart';
import Signup from './signup'; // This includes both signup and login
import Profile from './profile';
import AddProduct from './sell'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-custom" style={{ fontFamily: 'Georgia, serif' }}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">AffinityHub</Link>
            <Link className="nav-link" to="/inventors">About Us</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/products">Marketplace</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sell">Sell</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/clubs">Clubs</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/addclub">Form Club</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/myclubs">My Clubs</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up / Log In</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signup" />} />
          <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/signup" />} />
          <Route path="/sell" element={isLoggedIn ? <AddProduct /> : <Navigate to="/signup" />} />
          <Route path="/clubs" element={isLoggedIn ? <Clubs /> : <Navigate to="/signup" />} />
          <Route path="/myclubs" element={isLoggedIn ? <MyClubs /> : <Navigate to="/signup" />} />
          <Route path="/addclub" element={isLoggedIn ? <AddClub /> : <Navigate to="/signup" />} />
          <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/signup" />} />
          <Route path="/inventors" element={<Inventors />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
