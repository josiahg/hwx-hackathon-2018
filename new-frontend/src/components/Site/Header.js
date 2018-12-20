import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import {Switcher} from 'dps-apps';
import app_state from '../../app_state';
import {observer} from 'mobx-react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem,DropdownButton, Dropdown, Button} from 'react-bootstrap';
import _ from 'lodash';
//import Utils from '../../utils/Utils';
//import {Scrollbars} from 'react-custom-scrollbars';

@observer
export default class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      showType: 'All'
    };
  }
  componentDidMount(){
    /*Switcher.init({
      srcElement: this.SwitcherRef
    });*/
  }
  handleSelectNotificationType = (key) => {
    this.setState({showType: key});
  }
  navigateToDetail = (id) => {
    window.location.href += 'topics/'+id;
  }
  render() {
    const app = this.context.App;
    console.log(app.state); //debug
    const titleContent = (<a>{app.state.selectedCluster.name || 'none'}</a>);
    const usersIcon = <i className="fa fa-user"></i>;
    const alertsData = [
      {
        title: "Append Lag High",
        name: "OtherEvents",
        description: "ipsum dolor sit amet, consecteturing elit, sed do eiusmod tempor",
        type: "Alert",
        timestamp: 1537864293605
      },
      /*{
        title: "Re-Partition",
        name: "OtherEvents",
        description: "ipsum dolor sit amet, consecteturing elit, sed do eiusmod tempor",
        type: "Recommended",
        timestamp: 1537864293605
      },*/
      {
        title: "Replica out of sync",
        name: "T_Events",
        description: "ipsum dolor sit amet, consecteturing elit, sed do eiusmod tempor",
        timestamp: 1537866093605,
        type: "Alert"
      }
      /*{
        title: "Re-Partition",
        name: "TruckrEvents",
        description: "ipsum dolor sit amet, consecteturing elit, sed do eiusmod tempor",
        type: "Recommended",
        timestamp: 1537770162822
      }*/
    ];
    const {showType} = this.state;
    const renderData = alertsData.filter((item)=>{
      return showType === "All" || showType === item.type;
    });
    return (
      <header className="main-header">
        <div
          ref={(ref)=> {
            this.SwitcherRef = ref;
          }}
          className="logo"
        >
          <span className="logo-mini" style={{textAlign: 'center'}}>
            <img src="styles/img/icon-SMM-color.png" data-stest="logo-collapsed" width="70%"/>
          </span>
          <span className="logo-lg">
            <img src="styles/img/icon-SMMname-color.png" data-stest="logo-expanded" width="90%"/>
          </span>
        </div>
        <nav className="navbar navbar-default navbar-static-top">
          <div>
            <div className="headContentText">
              {app_state.headerContent}
            </div>
            <ul className="nav pull-right"  id="actionProfileDropdown" >
              <li className="">
                Cluster:
                <DropdownButton
                  onSelect={app.onClusterChange}
                  title={titleContent}
                  className="dropdown-toggle"
                  bsStyle="link"
                  id="cluster-dropdown"
                  pullRight
                >
                  {
                    app.state.clusters.length ?
                    app.state.clusters.map((c)=>{
                      const clusterId = c.id;
                      const clusterName = c.name;
                      return <MenuItem key={clusterId} eventKey={clusterId} className={app.state.selectedCluster.id === clusterId ? "active" : ""}>{clusterName}</MenuItem>;
                    })
                    : <MenuItem>No data</MenuItem>
                  }
                </DropdownButton>
              </li>
              {/*<li className="notifications">
                <DropdownButton
                  noCaret
                  title={<i className="fa fa-bell red-badge"></i>}
                  className="dropdown-toggle"
                  bsStyle="link"
                  id="notification-dropdown"
                  pullRight
                >
                  <div className="notifications-header">
                    <h4>Notifications ({alertsData.length})</h4><span className="pull-right"><i className="fa fa-ellipsis-v"></i></span>
                  </div>
                  <div className="select-type">
                    <label>Show:</label>
                    <Dropdown
                      id="dropdown-notification-type"
                      bsSize="xsmall"
                      bsStyle="link"
                      pullRight
                    >
                      <Dropdown.Toggle>
                        {showType}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="" onSelect={this.handleSelectNotificationType} >
                        <MenuItem eventKey="Alert" active={showType == "Alert" ? true : false}>Alert</MenuItem>
                        <MenuItem eventKey="Recommended" active={showType == "Recommended" ? true : false}>Recommended</MenuItem>
                        <MenuItem eventKey="All" active={showType == "All" ? true : false}>All</MenuItem>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <Scrollbars
                    autoHide
                    autoHeight
                    autoHeightMin={10}
                    autoHeightMax={300}
                    renderThumbHorizontal={props => <div {...props} style={{ display: "none" }}/>}
                  >
                  <div className="items">
                    {renderData.map((item, k)=>{
                      return (
                        <div className="item" key={k+1}>
                          <div>
                            <span className={item.type == "Alert" ? "hb xs danger" : "hb xs warning"}>
                              <i className={item.type == "Alert" ? "fa fa-warning" : "fa fa-lightbulb-o"}></i>
                            </span>
                            <h5 className="no-margin-top">{`${item.type}: ${item.title}`}</h5>
                            <i className="pull-right fa fa-ban unread"></i>
                            <p className="no-margin-bottom">
                              <a onClick={this.navigateToDetail.bind(this,item.name)}>{item.name}</a>  {Utils.ellipses(item.description, 50)}
                            </p>
                            <div className="pull-right time-label">{Utils.splitTimeStamp(item.timestamp)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  </Scrollbars>
                  <div className="show-btn">
                    <a className="btn-xs pull-right btn btn-success" href="#/alerts">view all</a>
                  </div>
                </DropdownButton>
              </li>*/}
              <li className="user-dropdown">
                <DropdownButton
                  title={<i className="fa fa-user"></i>}
                  className="dropdown-toggle"
                  bsStyle="link"
                  id="profile-dropdown"
                  pullRight
                >
                    <span className="username">{app.state.identity.username}</span>
                    <MenuItem className="logout" onClick={app.onLogout}>Logout</MenuItem>
                </DropdownButton>
              </li>
            </ul>
          </div>
        </nav>

      </header>
    );
  }
}

Header.contextTypes = {
  App: PropTypes.object
};
