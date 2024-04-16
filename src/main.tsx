import CssBaseline from '@mui/material/CssBaseline';
import 'ol/ol.css'; //

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {  createTheme, ThemeProvider } from '@mui/material';
// import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
// import { history } from 'utils/history';
import { store } from './app/store';

const theme = createTheme();

import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={store}>
  
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>

  </Provider>
</React.StrictMode>,
)

