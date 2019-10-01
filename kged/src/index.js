import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import 'custom.scss'
import App from 'components/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

ReactDOM.render(<App />, document.getElementById('root'));
