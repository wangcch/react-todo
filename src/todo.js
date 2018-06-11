import React, { Component } from 'react';
import TodoItem from './todoItem.js';
import TodoFilter from './todoFilter.js';
import './todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: [
        {
          id: 0,
          text: 'Todo',
          done: false,
          date: ''
        }, {
          id: 1,
          text: 'Done',
          done: true,
          date: ''
        }
      ],
      todoListsSave: [
        {
          id: 0,
          text: 'Todo',
          done: false,
          date: ''
        }, {
          id: 1,
          text: 'Done',
          done: true,
          date: ''
        }
      ],
      filter: 'all'
    }
  }

  _listSort = (a, b) => {
    return b.id - a.id
  }

  isEnter = (code) => {
    return code === 13 ? 1 : 0
  }

  inputEnter = (e) => {
    if (this.isEnter(e.keyCode) || this.isEnter(e.which)) {
      if (e.target.value) {
        let list = this.state.todoListsSave;
        let item = {};
        const date = new Date()
        item.id = date.getTime();
        item.text = e.target.value;
        item.done = false;
        item.date = date;
        list.push(item)
        list = list.sort(this._listSort);
        if (this.state.filter === 'completed') {
          this.setState({ todoListsSave: list });
        } else {
          this.setState({ todoLists: list, todoListsSave: list });
        }
        e.target.value = '';
      }
    }
  }

  _foundIndex = (list, id) => {
    for (let index in list) {
      if (list[index].id === id) {
        return index;
      }
    }
    return null;
  }

  delItem = (id) => {
    // console.log('del: ' + id)
    let list1 = this.state.todoLists.concat();
    let list2 = this.state.todoListsSave.concat();
    list1.splice(this._foundIndex(list1, id), 1);
    list2.splice(this._foundIndex(list2, id), 1);
    this.setState({ todoLists: list1, todoListsSave: list2 });
  }

  toggleSelect = (id, done) => {
    // console.log('done: ' + id);
    let list1 = this.state.todoLists.concat();
    let list2 = this.state.todoListsSave.concat();
    let index1 = parseInt(this._foundIndex(list1, id), 0);
    let index2 = parseInt(this._foundIndex(list2, id), 0);
    list1[index1].done = !done;
    list2[index2].done = !done;
    this.setState({ todoLists: list1, todoListsSave: list2 });
    this.filterChange(this.state.filter);
  }

  filterChange = (item) => {
    console.log(item)
    this.setState({ filter: item });
    let list = [];
    if (item === 'active') {
      for (item of this.state.todoListsSave) {
        if (!item.done) {
          list.push(item)
        }
      }
      this.setState({ todoLists: list });
    } else if (item === 'completed') {
      for (item of this.state.todoListsSave) {
        if (item.done) {
          list.push(item)
        }
      }
      this.setState({ todoLists: list });
    } else {
      this.setState({ todoLists: this.state.todoListsSave });
    }
  }

  render() {
    let TodoList = (props) => {
      let todoList = props.list;
      return (
        <div>
          {todoList.map((item, index) =>
            <TodoItem key={item.text + index} data={item} onDel={this.delItem.bind(this, item.id)} onSelect={this.toggleSelect.bind(this, item.id, item.done)} />
          )}
        </div>
      );
    }

    const filterLIst = ['all', 'active', 'completed']

    return (
      <div className="todo">
        <div className="inputBox">
          <input className="todo-input todo-item" placeholder="Add Todo" autoFocus onKeyPress={this.inputEnter} />
        </div>
        <TodoFilter data={filterLIst} onSelect={this.filterChange.bind(this)} active={this.state.filter} />
        <TodoList list={this.state.todoLists} />
      </div>
    );
  }
}

export default Todo;
