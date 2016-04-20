import React from 'react';
import ReactDOM from 'react-dom';


export default React.createClass({
  render: function() {
    return (
      <div class="row">
        <div class="col-md-12">
          <h3>Neste trening på actionball: {this.props.event.nextDateString} <small>{this.props.event.nextDateFromNow}</small></h3>
        </div>
      </div>
    );
  }
});
