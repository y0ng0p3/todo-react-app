import React from 'react';
import create from 'zustand';

import './App.css';

import Navbar from './components/Navbar/Navbar'
import Routes from './routes/Routes';

function App() {
  const useStore = create(set => ({
    /* id: 0,
    setId: () => set(state => ({id: state.id + 1})), */
    name: '',
    setName: () => set(state => ({name: state.name})),
    dueDate: new Date(),
    setDueDate: () => set(state => ({dueDate: state.dueDate})),
    complete: false,
    setComplete: () => set(state => ({complete: state.complete}))
  }))

  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
