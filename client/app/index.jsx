import React from 'react';
import {render} from 'react-dom';
import Signup from './component/signup/signup.jsx';

class App extends React.Component {
 render () {
   return <Signup  />;
 }
}

render(<App/>, document.getElementById('app'));