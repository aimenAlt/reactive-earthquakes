import React, { Component } from 'react';
import './main.css';

import Earthquake from './Earthquake';

class App extends Component {
  constructor() {
    super();
    this.state = {
      earthquakes: null
    };

    this.getData = this.getData.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  getData(period) {
    // console.log('getting data');
    const self = this;
    const endpoint = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${period}.geojson`;

    // fetch data on recent earthquakes from USGS
    fetch(endpoint)
      .then(function(blob) {
        return blob.json();
      })
      .then(function(earthquakes) {
        self.setState({ earthquakes: earthquakes.features });
      });
  }

  sortData() {
    // 1. take a copy of state
    let { earthquakes } = this.state;
    // 2. do some work on it
    earthquakes.sort((a, b) => b.properties.mag - a.properties.mag);
    // 3. call setState
    this.setState({ earthquakes });
  }

  handleClick(e) {
    const button = e.target.innerHTML;

    if (button === 'Hour') {
      this.getData('hour');
    }

    if (button === 'Day') {
      this.getData('day');
    }

    if (button === 'Sort') {
      this.sortData();
    }
  }

  componentDidMount() {
    // this.getData('day');
  }

  render() {
    const { earthquakes } = this.state;
    const quakeComponents = earthquakes
      ? earthquakes.map((quake, index) => (
          <Earthquake info={quake} key={index} />
        ))
      : null;

    return (
      <div className="app">
        <header className="app-header">
          <h1>
            <span className="app-header-react">React</span>ive Earthquakes
          </h1>
          <div className="buttons">
            <button onClick={e => this.handleClick(e)}>Hour</button>
            <button onClick={e => this.handleClick(e)}>Day</button>
            <button onClick={e => this.handleClick(e)}>Sort</button>
          </div>
        </header>
        <div className="earthquakes">{quakeComponents}</div>
      </div>
    );
  }
}

export default App;
