import React from 'react';
import  { render } from 'react-dom';
import { App } from './containers';

import 'bootstrap/dist/css/bootstrap.css';
let a = 0;
let root = document.getElementById('app');
render(<App />, root);
