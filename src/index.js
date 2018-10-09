import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import * as serviceWorker from './serviceWorker';

require('./styles/main.scss');
require('./utils/font-awesome');

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
