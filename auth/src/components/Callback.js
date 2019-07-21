import React from 'react';
import Auth from '../Auth';

export default class Callback extends React.Component {
 componentDidMount() {
  // cdm runs second
  const auth = new Auth();
  auth.handleAuthentication();
 }
 render() {
  // this run first
  return <div>Loading...</div>;
 }
}
