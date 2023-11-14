import React from 'react';
import ReactDOM from 'react-dom/client';

import { Home } from './pages';

import './index.css';
import './fonts/Metropolis/stylesheet.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);
