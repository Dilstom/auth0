/* eslint no-restricted-globals: 0  */

// linter doesn't let us use resticted-globals

// 'auth0-js' is just a wrapper around all the auth0 API
// it provides us with some methods that we can use to login, check if user is authenticated, and etc

import auth0 from 'auth0-js';
import React from 'react';
import jwtDecode from 'jwt-decode';

const LOGIN_SUCCESS_PAGE = '/secret';
const LOGIN_FAILURE_PAGE = '/';

require('dotenv').config();

const APP_DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_CLIENTID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUDIENCE = process.env.REACT_APP_AUDIENCE;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
const SCOPE = process.env.REACT_APP_SCOPE;

class Auth extends React.Component {
 constructor(props) {
  super(props);
  this.state = {};
  this.login = this.login.bind(this); // bind new method to the right context
 }

 // 1. create auth0 property. Initialize the project
 //  Initialize:
 //   var auth0 = new auth0.WebAuth({
 //     domain: '{YOUR_AUTH0_DOMAIN}',
 //     clientID: '{YOUR_AUTH0_CLIENT_ID}'
 //   });
 //    auth0.authorize({
 //     audience: 'https://mystore.com/api/v2', // <-- is an endpoint to get some user info
 //     scope: 'read:order write:order',        // <--- what we will passing or add in the token
 //     responseType: 'token',
 //     redirectUri: 'https://example.com/auth/callback'
 //    });

 auth0 = new auth0.WebAuth({
  domain: APP_DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  audience: AUDIENCE,
  responseType: RESPONSE_TYPE,
  scope: SCOPE,
 });

 // 2. login method
 login() {
  this.auth0.authorize();
 }

 // 3. take all the info in the query and parse the data
 handleAuthentication() {
  this.auth0.parseHash((err, authResults) => {
   if (authResults && authResults.accessToken && authResults.idToken) {
    let expiresAt = JSON.stringify(
     authResults.expiresIn * 1000 + new Date().getTime()
    ); // check when it is going to expire
    localStorage.setItem(' access_token', authResults.accessToken);
    localStorage.setItem('id_token', authResults.idToken);
    localStorage.setItem('expires_at', expiresAt);
    location.hash = ''; // make sure to remove all the info from query string
    location.pathname = LOGIN_SUCCESS_PAGE; // and redirect a user to a page on success
   } else if (err) {
    location.pathname = LOGIN_FAILURE_PAGE;
    console.log(err);
   }
  });
 }

 // 4. for this method just use 'expires_at' value stored in localStorage
 isAuthenticated() {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  // and check if that value is still greater than the current time stamp
  return new Date().getTime() < expiresAt;
 }

 logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  location.pathname = LOGIN_FAILURE_PAGE;
 }

 getProfile() {
  if (localStorage.getItem('id_token')) {
   return jwtDecode(localStorage.getItem('id_token'));
  } else {
   return {};
  }
 }
}

export default Auth;
