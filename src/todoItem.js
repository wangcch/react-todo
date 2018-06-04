import React, { Component } from 'react';
import './todo.css';

class TodoItem extends Component {
  render() {
    const {data} = this.props;
    return (
      <div className="todo-item todo-item_panel">
        <input type="checkbox" className="check"/>
        <p className="text">{data}</p>
        <span className="btn_del" onClick={this.props.onDel}>Del</span>
      </div>
    );
  }
}

export default TodoItem;
