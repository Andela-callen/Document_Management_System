import React from 'react';
import {Link} from 'react-router';
// import Signup from '../signup/signup';

class Home extends React.Component {
   render() {
      return (
         <div>
            <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
            <hr />
            {this.props.children}
         </div>
      );
   }
}

export default Home;