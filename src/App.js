import React, { Component } from 'react';
import './App.css';
//components
import Input from './components/file/input'
class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="Logo">Things To Do</p>
        <Input />
      </div>
    );
  }
}

export default App;
