import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginCallback, Security } from "@okta/okta-react";
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login/callback`,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Security oktaAuth={oktaAuth}>
        <Route path="/" exact component={App} />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
