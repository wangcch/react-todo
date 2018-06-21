import React, { Component } from "react";
import "./todo.css";

class TodoFilter extends Component {
  filterChange = e => {
    this.props.onSelect(e.target.value);
  };

  render() {
    let { data, active, total } = this.props;
    return (
      <div className="todo-item todo-filter">
        <div className="li">
          <span className="item-num">{total} items</span>
        </div>
        {data.map((item, index) => (
          <label key={item + index} className="li">
            <input
              type="radio"
              name="filter"
              id={item}
              value={item}
              hidden
              checked={active === item ? true : false}
              onChange={this.filterChange}
            />
            <span className="radio-name">{item}</span>
          </label>
        ))}
      </div>
    );
  }
}

export default TodoFilter;
