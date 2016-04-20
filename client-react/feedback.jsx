import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person.jsx'
import RestClient from './restClient.js'

export default React.createClass({
  getInitialState: function() {
    return {user: {}};
  },
  componentDidMount: function() {
    var component = this;
    RestClient.getAccount((user) => {
      component.setState({user})
    });
  },
  render: function() {
    if (this.state.user.email) {
      // GUI to let user say if he's coming
      return (
        <div className="row ng-hide">
          <div className="col-md-12">
            <div className="well well-sg">
              <div className="col-md-4">
                <Person {...this.state.user}/>
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
    } else {
      // GUI to let user log in
      return (
        <div className="row" ng-hide="loggedIn">
          <div className="col-md-12">
            <div className="well well-sg">
              <h2>Logg inn for å si fra om du kommer eller ikke:</h2>
              <p>
                <a href="/auth/facebook" className="btn btn-lg btn-default">
                  <i className="fa fa-2x fa-facebook-square"></i> Facebook
                </a>
                <a href="/auth/google" className="btn btn-lg btn-default">
                  <i className="fa fa-2x fa-google-plus"></i> Google
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
});
