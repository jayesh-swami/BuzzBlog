import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/authActions';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import Header from './components/Layout/HeaderComponent';
import Footer from './components/Layout/FooterComponent';
import Landing from './components/Layout/LandingComponent';
import Login from './components/auth/LoginComponent';
import Register from './components/auth/RegisterComponent';


// Check for token
if(localStorage.jwtToken){

  // Set Auth header
  setAuthToken(localStorage.jwtToken);

  // Decode the user
  const user = jwt_decode(localStorage.jwtToken);

  // Set state to current user
  store.dispatch(setCurrentUser(user));
  
}

function App() {

  return (
    <Provider store={ store }>
      <Router>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
