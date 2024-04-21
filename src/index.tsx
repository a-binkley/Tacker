import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './app/store';
import { Home } from './pages';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<Home />
	</Provider>
);
