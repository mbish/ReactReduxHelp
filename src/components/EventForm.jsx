import React from 'react';
import { AddPhoto } from './AddPhoto.jsx';

export class EventForm extends React.Component {
    render() {
      return (
        <div name="eventForm" className="container columns">
          <div className="field column is-3">
            <AddPhoto/>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Title</label>
              <p className="control">
                <input type="text" className="input" placeholder="Title of your event"></input>
              </p>
            </div>
            <div className="field">
              <label className="label">Start Time</label>
              <p className="control">
                <input type="text" className="input" placeholder="Time your event starts"></input>
              </p>
            </div>
            <div className="field">
              <label className="label">End Time</label>
              <p className="control">
                <input type="text" className="input" placeholder="Time your event ends"></input>
              </p>
            </div>
          </div>
        </div>
      )
    }
}
