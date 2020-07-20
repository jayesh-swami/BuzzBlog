import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser,logoutUser } from './redux/actions/authActions';
import { clearCurrentProfile } from "./redux/actions/profileActions";
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import PrivateRoute from './components/common/PrivateRoute';

import Header from './components/Layout/HeaderComponent';
import Footer from './components/Layout/FooterComponent';
import Landing from './components/Layout/LandingComponent';
import Login from './components/auth/LoginComponent';
import Register from './components/auth/RegisterComponent';
import Dashboard from './components/dashboard/DashboardComponent';
import CreateProfile from './components/profile/CreateProfileComponent';


// Check for token
if(localStorage.jwtToken){

  // Set Auth header
  setAuthToken(localStorage.jwtToken);

  // Decode the user
  const user = jwt_decode(localStorage.jwtToken);

  // Set state to current user
  store.dispatch(setCurrentUser(user));

  // Check Token Expiry
  const currentTime = Date.now() / 1000;
  if(user.exp < currentTime){
    store.dispatch(logoutUser(false));

    // Clear current profile
    store.dispatch(clearCurrentProfile());

    // redirect to login
    window.location.href('/login');

  }
  
}

function App() {

  return (
    <Provider store={ store }>
      <Router>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
