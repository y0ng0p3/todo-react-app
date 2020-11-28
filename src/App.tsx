import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import './App.css';

import Navbar from './components/Navbar/Navbar'
import Routes from './routes/Routes';

function App() {
 
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
