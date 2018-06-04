import React, { Component } from 'react';
import './todo.css';

class TodoItem extends Component {
  render() {
    const {data} = this.props;
    return (
      <div className="todo-item">
        {data}
      </div>
    );
  }
}

export default TodoItem;
