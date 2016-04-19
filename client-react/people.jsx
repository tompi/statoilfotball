import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person.jsx'

export default React.createClass({
  render: function() {
    var peopleNodes = this.props.people.map(function(person) {
      return (
        <Person {...person} key={person._id}/>
      );
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="well well-sg">
            <div className="contacts coming">
              <b>Disse kommer:</b>
              <div ng-repeat="user in event.coming">
                {peopleNodes}
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="contacts maybeComing">
              <b>Disse kommer KANSKJE:</b>
              <div ng-repeat="user in event.maybeComing">
                <div className="contact" ng-include src="'fotball/user.html'"></div>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="contacts notComing">
              <b>Disse kommer IKKE:</b>
              <div ng-repeat="user in event.notComing">
                <div className="contact" ng-include src="'fotball/user.html'"></div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
