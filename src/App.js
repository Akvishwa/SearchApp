import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';

class App extends React.Component {
  render(){
  return (
    <div className="App">
    <Search></Search>
    </div>
  );
}
}

export default App;