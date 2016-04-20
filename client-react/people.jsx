import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person.jsx'

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
  render: function() {
    return (
      <div>
        <div className="contacts coming">
          <b>Disse kommer:</b>
          <PeopleList people={this.props.coming}/>,
          <div className="clearfix"></div>
        </div>
        <div className="contacts maybeComing">
          <b>Disse kommer KANSKJE:</b>
          <PeopleList people={this.props.maybecoming}/>,
          <div className="clearfix"></div>
        </div>
        <div className="contacts notComing">
          <b>Disse kommer IKKE:</b>
          <PeopleList people={this.props.notcoming}/>,
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
});
