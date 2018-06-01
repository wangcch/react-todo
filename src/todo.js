import React, { Component } from 'react';
import TodoItem from './todoItem.js';
import './todo.css';

class Todo extends Component {
  render() {
    return (
      <div className="todo">
        <div className="inputBox">
          <input className="todo-input todo-item" placeholder="add Todo" autoFocus/>
        </div>
        <TodoItem/>
        <TodoItem/>
      </div>
    );
  }
}

export default Todo;
