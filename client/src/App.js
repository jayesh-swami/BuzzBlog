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
import EditProfile from './components/profile/EditProfileComponent';
import AddExperience from './components/profile/AddExperienceComponent';
import AddCaughtGoss from './components/profile/AddCaughtGossComponent';
import Gossipers from './components/profile/GossipersComponent';
import ProfileDetailComponent from './components/profile/ProfileDetailComponent';
import GossipsListComponent from './components/gossips/GossipsListComponent';
import GossipDetailComponent from './components/gossips/GossipDetailComponent';


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
    window.location.assign('/login');

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
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-goss-experience" component={AddExperience}/>
        <PrivateRoute exact path="/add-caught-gossips" component={AddCaughtGoss} />
        <PrivateRoute exact path="/gossipers" component={Gossipers} />
        <PrivateRoute exact path="/gossiper/:handle" component={ProfileDetailComponent}/>
        <PrivateRoute exact path="/gossips" component={GossipsListComponent}/>
        <PrivateRoute exact path="/gossip/:id" component={GossipDetailComponent}/>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
