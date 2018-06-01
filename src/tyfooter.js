import React, { Component } from 'react';
import './tyfooter.css';

class tyFooter extends Component {
  render() {
    const {explain, nowYear} = this.props;
    return (
      <footer className="footer">
        <p className="explain">{explain}</p>
        <p className="copyright">Copyright &copy; {nowYear} Wangcch</p>
      </footer>
    );
  }
}

export default tyFooter;
