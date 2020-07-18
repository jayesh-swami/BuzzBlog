import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Header from './components/Layout/HeaderComponent';
import Footer from './components/Layout/FooterComponent';
import Landing from './components/Layout/LandingComponent';
import Login from './components/auth/LoginComponent';
import Register from './components/auth/RegisterComponent';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Footer />
    </Router>
  );
}

export default App;
