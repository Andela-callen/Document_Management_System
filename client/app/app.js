import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import Signup from './component/signup/signup.jsx';
import Home from './component/home/home.jsx';
class App extends React.Component {
 render () {
   return (
      <div className="container-fluid">
          
          {this.props.children}</div>
      );
 }
}

App.protoTypes = {
  children: PropTypes.object.isRequired
}
// render(<App/>, document.getElementById('app'));

export default App;