import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import Sidebar from './components/Site/Sidebar';
import Header from './components/Site/Header';
import Footer from './components/Site/Footer';

@observer
class App extends Component { 
    constructor() {
        super();

        this.state = {
            clusters: [],
            selectedCluster: {
                ambariUrl: null
            },
            identity: {},
        }
    }

    getChildContext() {
        return { App: this };
    }

    render() {
        const component = [
            <Header key="header"/>,
            <Sidebar key="sidebar"/>,
            //<Footer key="footer"/>
        ];

        return <div>
            {component}
        </div>;
    }
}

App.childContextTypes = {
    App: PropTypes.object
};

export default App;