import { hydrate } from 'react-dom';
import React from '../../node_modules/react/umd/react.production.min.js';

import Overviews from './components/Overviews.jsx';

const initialState = window.__initialState__;
delete window.__initialState__;

hydrate(<Overviews initialState={initialState} />, document.getElementById('product-overviews-app'));