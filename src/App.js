import React, { Component } from 'react';
import Footer from './tyfooter.js';
import Todo from './todo.js';
import './App.css';

const title = 'React Todo';
const explain = 'A simple react project exercise'
const nowYear = 2018

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{title}</h1>
        </header>
        <Todo/>
        <Footer explain={explain} nowYear={nowYear}/>
      </div>
    );
  }
}

export default App;
