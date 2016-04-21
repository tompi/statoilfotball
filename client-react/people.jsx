import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person.jsx';
import RestClient from './restClient.js'
import socketio from './socketio.js'

var PeopleList = React.createClass({
  render: function() {
    var peopleNodes = this.props.people.map(function(person) {
      return (
        <Person {...person} key={person._id}/>
      );
    });

    return (
      <div>
        {peopleNodes}
      </div>
    );
  }
});

export default React.createClass({
  componentDidMount: function() {
    var component = this;
    RestClient.getNextEvent((event) => {
      component.setState({"event": event});
    });
    socketio.on("eventChanged", () => {
      RestClient.getNextEvent((event) => {
        component.setState({"event": event});
      });
    });
  },
  getInitialState: function() {
    return {event: {coming: [], notComing: [], maybeComing: []}};
  },
  render: function() {
    return (
      <div>
        <div className="contacts coming">
          <b>Disse kommer:</b>
          <PeopleList people={this.state.event.coming}/>
          <div className="clearfix"></div>
        </div>
        <div className="contacts maybeComing">
          <b>Disse kommer KANSKJE:</b>
          <PeopleList people={this.state.event.maybeComing}/>
          <div className="clearfix"></div>
        </div>
        <div className="contacts notComing">
          <b>Disse kommer IKKE:</b>
          <PeopleList people={this.state.event.notComing}/>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
});
