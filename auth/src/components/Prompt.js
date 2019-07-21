import React from 'react';
import { Link } from 'react-router-dom';

class Prompt extends React.Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  return (
   <div>
    <h3>Login first to see this page</h3>
    <Link to="/">Home</Link>
   </div>
  );
 }
}

export default Prompt;
