import React, { Component } from "react";
import TodoItem from "./todoItem.js";
import TodoFilter from "./todoFilter.js";
import "./todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayList: localStorage.displayList
        ? JSON.parse(localStorage.displayList)
        : [
            {
              id: 1,
              text: "Todo",
              done: false,
              date: ""
            },
            {
              id: 0,
              text: "Done",
              done: true,
              date: ""
            }
          ],
      originalList: localStorage.originalList
        ? JSON.parse(localStorage.originalList)
        : [
            {
              id: 1,
              text: "Todo",
              done: false,
              date: ""
            },
            {
              id: 0,
              text: "Done",
              done: true,
              date: ""
            }
          ],
      filter: localStorage.filter ? localStorage.filter : "all"
    };
  }

  _listSort = (a, b) => {
    return b.id - a.id;
  };

  isEnter = code => {
    return code === 13 ? 1 : 0;
  };

  updateListData = ({ displayList, originalList }) => {
    if (displayList) {
      this.setState({ displayList: displayList });
      localStorage.displayList = JSON.stringify(displayList);
    }
    if (originalList) {
      this.setState({ originalList: originalList });
      localStorage.originalList = JSON.stringify(originalList);
    }
  };

  inputEnter = e => {
    if (this.isEnter(e.keyCode) || this.isEnter(e.which)) {
      if (e.target.value) {
        let list = this.state.originalList;
        let item = {};
        const date = new Date();
        item.id = date.getTime();
        item.text = e.target.value;
        item.done = false;
        item.date = date;
        list.push(item);
        // list = list.sort(this._listSort);
        if (this.state.filter === "completed") {
          this.updateListData({ originalList: list });
        } else {
          this.updateListData({ displayList: list, originalList: list });
        }
        e.target.value = "";
      }
    }
  };

  _foundIndex = (list, id) => {
    for (let index in list) {
      if (list[index].id === id) {
        return index;
      }
    }
    return null;
  };

  delItem = id => {
    // console.log('del: ' + id)
    let list1 = this.state.displayList.concat();
    let list2 = this.state.originalList.concat();
    list1.splice(this._foundIndex(list1, id), 1);
    list2.splice(this._foundIndex(list2, id), 1);
    this.updateListData({ displayList: list1, originalList: list2 });
  };

  editItem = (id, value) => {
    // console.log(id, value);
    let list1 = this.state.displayList.concat();
    let list2 = this.state.originalList.concat();
    let index1 = parseInt(this._foundIndex(list1, id), 0);
    let index2 = parseInt(this._foundIndex(list2, id), 0);
    list1[index1].text = value;
    list2[index2].text = value;
    this.updateListData({ displayList: list1, originalList: list2 });
  };

  toggleSelect = (id, done) => {
    // console.log('done: ' + id);
    let list1 = this.state.displayList.concat();
    let list2 = this.state.originalList.concat();
    let index1 = parseInt(this._foundIndex(list1, id), 0);
    let index2 = parseInt(this._foundIndex(list2, id), 0);
    list1[index1].done = !done;
    list2[index2].done = !done;
    this.updateListData({ displayList: list1, originalList: list2 });
    this.filterChange(this.state.filter);
  };

  filterChange = item => {
    console.log(item);
    this.setState({ filter: item });
    localStorage.filter = item;
    let list = [];
    if (item === "active") {
      for (item of this.state.originalList) {
        if (!item.done) {
          list.push(item);
        }
      }
      this.updateListData({ displayList: list });
    } else if (item === "completed") {
      for (item of this.state.originalList) {
        if (item.done) {
          list.push(item);
        }
      }
      this.updateListData({ displayList: list });
    } else {
      this.updateListData({ displayList: this.state.originalList });
    }
  };

  render() {
    let TodoList = props => {
      let todoList = props.list.concat();
      todoList.sort(this._listSort);
      return (
        <div>
          {todoList.map((item, index) => (
            <TodoItem
              key={item.text + index}
              data={item}
              onDel={() => this.delItem(item.id)}
              onSelect={() => this.toggleSelect(item.id, item.done)}
              onEdit={value => this.editItem(item.id, value)}
            />
          ))}
        </div>
      );
    };

    const filterList = ["all", "active", "completed"];

    return (
      <div className="todo">
        <div className="inputBox">
          <input
            className="todo-input todo-item"
            placeholder="Add Todo"
            autoFocus
            onKeyPress={this.inputEnter}
          />
        </div>
        <TodoFilter
          data={filterList}
          onSelect={value => this.filterChange(value)}
          active={this.state.filter}
          total={this.state.originalList.length}
        />
        <TodoList list={this.state.displayList} />
      </div>
    );
  }
}

export default Todo;
