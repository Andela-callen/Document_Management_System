import React from 'react';
// import {Link} from 'react-router';
// import Signup from '../signup/signup';

class Home extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
            {/*<Link to="signup" className="btn btn-primary btn-lg">Sign Up</Link>*/}
         </div>
      );
   }
}

class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>Content</h2>
            <p>The content text!!!</p>
         </div>
      );
   }
}

export default Home;