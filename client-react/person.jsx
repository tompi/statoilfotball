import React from 'react';
import ReactDOM from 'react-dom';


export default React.createClass({
  render: function() {
    return (
      <div className="contact">
        <div className="media">
          <a className="thumbnail pull-left" href={this.props.photo}>
            <img className="media-object profile-photo" src={this.props.photo}/>
          </a>
          <div className="media-body">
            <h4 className="media-heading">{this.props.displayName}</h4>
            <p>
              <a ng-href="mailto:{this.props.email}" className="btn btn-xs btn-default">
                <i className="fa fa-envelope"></i>  {this.props.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
});
