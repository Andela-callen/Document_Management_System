import React from 'react';
import {render} from 'react-dom';
import Signup from './component/signup/signup.jsx';
import Home from './component/home/home.jsx';
class App extends React.Component {
 render () {
   return <Home  />;
 }
}

render(<App/>, document.getElementById('app'));