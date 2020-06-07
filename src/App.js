import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusiion</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}
*/

class App extends Component {

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
