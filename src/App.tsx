import React from 'react';
import logo from './logo.svg';
import './App.css';
import MeteorsBoard from './components/MeteorsBoard/MeteorsBoard';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <MeteorsBoard/>
    </div>
  );
}

export default App;
