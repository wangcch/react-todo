import React, { Component } from "react";
import "./todo.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editInputShow: false
    };
  }

  editText = e => {
    if (e.keyCode === 13 || e.which === 13) {
      this.props.onEdit(e.target.value);
      this.setState({ editInputShow: false });
    }
  };

  showInput = () => {
    this.setState({ editInputShow: true });
  };

  closeInput = () => {
    this.setState({ editInputShow: false });
  };

  render() {
    const { data } = this.props;
    return (
      <div className="todo-item todo-item_panel">
        <label className="check">
          <input
            type="checkbox"
            className="check_inout"
            onChange={this.props.onSelect}
            checked={data.done}
            hidden
          />
          <span className="check_dot" />
        </label>
        <div className="text-box">
          {this.state.editInputShow ? (
            <input
              defaultValue={data.text}
              onKeyPress={this.editText}
              className="text_edit"
              autoFocus
              onBlur={this.closeInput}
            />
          ) : (
            <p
              className={data.done ? "text done" : "text"}
              onClick={this.showInput}
            >
              {data.text}
            </p>
          )}
        </div>
        <div className="btn_del" onClick={this.props.onDel}>
          <span>Del</span>
        </div>
      </div>
    );
  }
}

export default TodoItem;
