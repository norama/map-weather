import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ExamplesApp from './components/examples/examples-app';

class App extends Component {

  state = {
    mode: 'weather'
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Map examples</h1>
        </header>
        <p className="App-intro">
          <a href="#" onClick={this.toggleExamples}>{this.state.mode === 'weather' ? 'Examples' : 'Weather'}</a>
        </p>
        <br/><br/>
          
        {this.state.mode === 'weather' ? 'TODO: Weather' : <ExamplesApp />}
        
      </div>
    );
  }

  toggleExamples = () => {
    this.setState((prevState) => ({
        mode: prevState.mode === 'weather' ? 'examples' : 'weather'
      }));
  };
}

export default App;
