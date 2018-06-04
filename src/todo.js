import React, { Component } from 'react';
import TodoItem from './todoItem.js';
import './todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: ['demo01']
    }
  }

  isEnter = (code) => {
    return code === 13? 1 : 0
  }

  inputEnter = (e) => {
    if (this.isEnter(e.keyCode) || this.isEnter(e.which)) {
      if (e.target.value) {
        let list = this.state.todoLists
        list.push(e.target.value)
        this.setState({ list })
        e.target.value = ''
      }
    }
  }

  delItem = (index) => {
    console.log('del: ' + index)
    let list = this.state.todoLists
    list.splice(index, 1)
    this.setState({ list })
  }

  render() {
    let TodoList = (props) => {
      let todoList = props.list.concat();
      todoList.reverse();
      return (
        <div>
          {todoList.map((item, index) =>
            <TodoItem key={item.toString() + index} data={item} onDel={this.delItem.bind(this, index)}/>
          )}
        </div>
      );
    }

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
