import React from 'react';
import RestClient from './restClient.js'

var MiniPerson = React.createClass({
  render: function() {
    return (
      <div className="media">
        <a className="pull-left" href={this.props.photo}>
          <img className="media-object mini-pic" src={this.props.photo}/>
        </a>
        <div className="media-body">
          <label className="media-heading">
            {this.props.displayName}
            <span className="label label-pill label-default">{this.props.count}</span>
          </label>
        </div>
      </div>
    );
  }
});

export default React.createClass({
  componentDidMount: function() {
    var component = this;
    RestClient.getMostActiveUsers((users) => {
      component.setState({users: users});
    });
  },
  getInitialState: function() {
    return { users: [] };
  },
  render: function() {
    var ppl = this.state.users.map(function(user) {
      return <MiniPerson {...user} key={user.id}/>;
    });
    return (
      <div className="well">
        <h3>Totalt antall treninger:</h3>
        {ppl}
      </div>
    );
  }
});
