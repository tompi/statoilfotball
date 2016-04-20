import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person.jsx'

export default React.createClass({
  render: function() {
    return (
      <div className="row ng-hide" ng-show="loggedIn">
        <div className="col-md-12">
          <div className="well well-sg">
            <div className="col-md-4">
              <Person {...this.props.person}/>
            </div>
            <div className="col-md-8">
              <a className="btn btn-default" ng-className="{disabled: coming}"
                ng-click="coming=true;notComing=false;maybeComing=false;changeStatus();">
                <i className="fa fa-thumbs-up fa-3"></i> Jeg kommer
              </a>
              <a className="btn btn-default" ng-className="{disabled: maybeComing}"
                ng-click="coming=false;notComing=false;maybeComing=true;changeStatus();">
                <i className="fa fa-question fa-3"></i> Jeg kommer kanskje
              </a>
              <a className="btn btn-default" ng-className="{disabled: notComing}"
                ng-click="coming=false;notComing=true;maybeComing=false;changeStatus();">
                <i className="fa fa-thumbs-down fa-3"></i> Jeg kommer ikke
              </a>
            </div>
            <div className="clearfix"/>
            </div>
          </div>
        </div>
    );
  }
});
