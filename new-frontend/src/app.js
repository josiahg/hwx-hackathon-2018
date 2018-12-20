import React, { Component } from 'react';
import Sidebar from './components/Site/Sidebar';

class App extends Component { 
    constructor() {
        super();
    }

    render() {
        const component = [
            <Sidebar key="sidebar"/>
        ];

        return <div>
            {component}
        </div>;
    }
}

export default App;