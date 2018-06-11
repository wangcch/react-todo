import React, { Component } from 'react';
import './todo.css';

class TodoItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="todo-item todo-item_panel">
        <label className="check">
          <input type="checkbox" className="check_inout" onChange={this.props.onSelect} checked={data.done} hidden/>
          <span className="check_dot"></span>
        </label>
        <p className={data.done ? 'text done' : 'text'}>{data.text}</p>
        <span className="btn_del" onClick={this.props.onDel}>Del</span>
      </div>
    );
  }
}

export default TodoItem;
