import App from './app';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import '../src/styles/css/style.css';

render(
  <AppContainer>
  <App/>
</AppContainer>, document.getElementById('app_container'));
/*
if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    render(
      <AppContainer>
      <NextApp/>
    </AppContainer>, document.getElementById('app_container'));
  });
}*/
