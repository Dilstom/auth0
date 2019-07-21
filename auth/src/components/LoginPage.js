import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  console.log(this.props.auth.getProfile());
  return (
   <div>
    <div>Hello {this.props.auth.getProfile().given_name || 'User'}!</div>
    <p>
     Content: <Link to="/secret">Secret Content</Link>
    </p>
    {/* display the login button only when the user is unauthenticated*/}
    {!this.props.auth.isAuthenticated() && (
     <div>
      <h6>Please, login first to see the content</h6>
      {/* we have auth object so we can use its property */}
      <button onClick={this.props.auth.login}>Login</button>
     </div>
    )}
   </div>
  );
 }
}

export default LoginPage;
