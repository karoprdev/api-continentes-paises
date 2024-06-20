import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
