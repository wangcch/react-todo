import React, { Component } from 'react';
import './tyfooter.css';

class tyFooter extends Component {
  render() {
    const { explain } = this.props;
    return (
      <footer className="footer">
        <p className="explain">{explain}</p>
        <p className="copyright">Project maintained by <a rel="noopener noreferrer" href="https://github.com/wangcch" target="_blank">Wangcch</a>. <a rel="noopener noreferrer" href="https://github.com/wangcch/react-todo" target="_blank">View on Github</a></p>
      </footer>
    );
  }
}

export default tyFooter;
