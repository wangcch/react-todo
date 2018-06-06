import React, { Component } from 'react';
import TodoItem from './todoItem.js';
import './todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: [{
        id: 0,
        text: 'demo01',
        done: true,
        date: ''
      }]
    }
  }

  _listSort = (a, b) => {
    return b.id - a.id
  }

  isEnter = (code) => {
    return code === 13? 1 : 0
  }

  inputEnter = (e) => {
    if (this.isEnter(e.keyCode) || this.isEnter(e.which)) {
      if (e.target.value) {
        let list = this.state.todoLists;
        let item = {};
        const date = new Date()
        item.id = date.getTime();
        item.text = e.target.value;
        item.done = false;
        item.date = date;
        list.push(item)
        list = list.sort(this._listSort);
        this.setState({ list });
        e.target.value = '';
      }
    }
  }

  delItem = (index) => {
    // console.log('del: ' + index)
    let list = this.state.todoLists;
    list.splice(index, 1);
    this.setState({ list });
  }

  toggleSelect = (index) => {
    // console.log('done: ' + index);
    let list = this.state.todoLists;
    list[index].done = !this.state.todoLists[index].done;
    this.setState({ list });
  }

  render() {
    let TodoList = (props) => {
      let todoList = props.list;
      return (
        <div>
          {todoList.map((item, index) =>
            <TodoItem key={item.text + index} data={item} onDel={this.delItem.bind(this, index)} onSelect={this.toggleSelect.bind(this, index)}/>
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
