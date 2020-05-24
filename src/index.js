import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {getApi, postApi} from './api.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App getApi={getApi} postApi={postApi} />, document.getElementById('root'));

serviceWorker.unregister();
