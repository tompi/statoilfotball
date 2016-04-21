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
  coming: function() {
    RestClient.changeStatus({
        coming: true,
        maybeComing: false,
        notComing: false
    });
  },
  maybeComing: function() {
    RestClient.changeStatus({
        coming: false,
        maybeComing: true,
        notComing: false
    });
  },
  notComing: function() {
    RestClient.changeStatus({
        coming: false,
        maybeComing: false,
        notComing: true
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
                <a className="btn btn-default"
                  onClick={this.coming}>
                  <i className="fa fa-thumbs-up fa-3"></i> Jeg kommer
                </a>
                <a className="btn btn-default"
                  onClick={this.maybeComing}>
                  <i className="fa fa-question fa-3"></i> Jeg kommer kanskje
                </a>
                <a className="btn btn-default"
                  onClick={this.notComing}>
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
