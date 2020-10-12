// WEBPACK ENTRY FILE MAIN

// ASYNC AWAIT SUPPORT
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import 'Scss/global.scss';

// JS here
import App from 'Components/App/App';

// SCSS

const wrapper = document.getElementById('root');
ReactDOM.render(pug`App`, wrapper);

if (module.hot) {
  module.hot.accept();
}
