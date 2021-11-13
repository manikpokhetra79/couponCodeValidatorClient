import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/bootstrap.min.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
