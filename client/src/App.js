import React from 'react';
import './App.css';
import Header from './components/Layout/HeaderComponent';
import Footer from './components/Layout/FooterComponent';
import Landing from './components/Layout/LandingComponent';

function App() {
  return (
    <React.Fragment>
      <Header/>
      <Landing/>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
