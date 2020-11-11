import React from 'react';

import './App.css';

import Navbar from './components/Navbar/Navbar'
import Routes from './routes/Routes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
