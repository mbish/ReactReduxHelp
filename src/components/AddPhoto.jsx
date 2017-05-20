import React from 'react';

export class AddPhoto extends React.Component {
  render() {
    return (
      <div className="control">
        <div className="card has-text-centered">
          <div className="card-image">
            <div className="container imagePlaceholder">
              <span className="icon is-medium">
                <i className="fa fa-camera"></i>
              </span>
            </div>
          </div>
          <div className="card-content">
            <strong>Add a photo</strong>
          </div>
        </div>
      </div>
    )
  }
}
