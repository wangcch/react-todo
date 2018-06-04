import React, { Component } from 'react';
import TodoItem from './todoItem.js';
import './todo.css';

let TodoList = (props) => {
  const todoList = props.list;
  console.log(props)
  return (
    <div>
      {todoList.map((item, index) =>
        <TodoItem key={item.toString() + index} data={item}/>
      )}
    </div>
  );
}

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: []
    }
  }

  inputEnter = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      console.log(e.target.value);
      let list = this.state.todoLists
      list.push(e.target.value)
      this.setState({ list })
      e.target.value = ''
    }
  }

  render() {
    return (
      <div className="todo">
        <div className="inputBox">
          <input className="todo-input todo-item" placeholder="Add Todo" autoFocus onKeyPress={this.inputEnter}/>
        </div>
        <TodoList list={this.state.todoLists}/>
      </div>
    );
  }
}

export default Todo;
