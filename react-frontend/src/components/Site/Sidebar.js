import React, {Component} from 'react';
import app_state from '../../app_state';
import {observer} from 'mobx-react';

//@observer
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    /*var element = document.getElementsByTagName('body')[0];
    element.classList.add('sidebar-mini');
    if (app_state.sidebar_isCollapsed) {
      element.classList.add('sidebar-collapse');
    }*/
  }
  componentDidUpdate() {
    var element = document.getElementsByTagName('body')[0];
    if (app_state.sidebar_isCollapsed) {
      element.classList.add('sidebar-collapse');
    } else {
      element.classList.remove('sidebar-collapse');
    }
  }
  toggleSidebar() {
    const alphaIcon = document.querySelector('.alpha-icon');
    app_state.sidebar_isCollapsed = !app_state.sidebar_isCollapsed;
  }
  toggleMenu() {
    if (app_state.sidebar_isCollapsed) {
      return;
    }
    app_state.sidebar_activeKey = app_state.sidebar_toggleFlag
      ? ''
      : 3;
    app_state.sidebar_toggleFlag = !app_state.sidebar_toggleFlag;
  }
  handleClick(key, e) {
    app_state.sidebar_activeKey = key;
    if (key === 3) {
      app_state.sidebar_toggleFlag = true;
    } else {
      app_state.sidebar_toggleFlag = false;
    }
  }
  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className={app_state.sidebar_activeKey === 1
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, 1)}>
              <a href="#/">
                <i className="fa fa-dashboard"></i>
                <span>Library</span>
              </a>
            </li>
            <li className={app_state.sidebar_activeKey === 2
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, 2)}>
              <a href="#/generator">
                <i className="fa fa-server"></i>
                <span>Generator</span>
              </a>
            </li>
            <li className={app_state.sidebar_activeKey === 3
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, 3)}>
              <a href="#/extras">
                <i className="fa fa-database"></i>
                <span>Add Extras</span>
              </a>
            </li>
            <li className={app_state.sidebar_activeKey === 4
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, 4)}>
              <a href="#/settings">
                <i className="fa fa-sign-out"></i>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </section>
        <a href="javascript:void(0);" className="sidebar-toggle" onClick={this.toggleSidebar.bind(this)} data-toggle="offcanvas" role="button">
          <i className={app_state.sidebar_isCollapsed
            ? "fa fa-angle-double-right"
            : "fa fa-angle-double-left"}></i>
        </a>
      </aside>
    );
  }
}
