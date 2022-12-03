import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarWarsProvider from './context/StarWarsProvider';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    // <BrowserRouter>
      <StarWarsProvider displayName="Context Display Name">
        <App />
      </StarWarsProvider>
    // </BrowserRouter>,
  );
  
