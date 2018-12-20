import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import {Link} from 'react-router';

export default class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="content-wrapper editorHandler">
        {this.props.children}
      </section>
    );
  }
}