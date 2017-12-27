import React, { Component } from 'react';
import './App.css';

import WeatherMap from './components/WeatherMap';
import ExamplesApp from './components/examples/examples-app';

class App extends Component {

  state = {
    mode: 'weather'
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Map Weather and other Leaflet Examples</h1>
        </header>
        <p className="App-intro">
          <a href="#" onClick={this.toggleExamples}>{this.state.mode === 'weather' ? 'Leaflet Examples' : 'Weather'}</a>
        </p>
        <br/><br/>
          
        {this.state.mode === 'weather' ? <WeatherMap /> : <ExamplesApp />}
        
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
