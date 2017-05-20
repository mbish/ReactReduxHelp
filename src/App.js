import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { EventForm } from './components/EventForm';

class App extends Component {
  render() {
    return (
      <div className="App" className="section">
        <div className="App-header tile is-ancestor is-24 is-vertical">
          <div className="tile is-parent has-text-centered">
            <article className="tile is-child notification is-primary">
              <p className="title">Eventually</p>
              <p className="subtitle">Coordinate your social events</p>
            </article>
          </div>
          <EventForm/>
        </div>
      </div>
    );
  }
}

export default App;
