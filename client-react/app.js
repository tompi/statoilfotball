import React from 'react';
import ReactDOM from 'react-dom';

import People from './people.jsx'
import Event from './event.jsx'
import Feedback from './feedback.jsx'

import RestClient from './restClient.js'

import moment from 'moment';

RestClient.getNextEvent((event) => {
  // Convert week to date
  var m = moment('7-' + event.week + '-' + event.year + '-19:45', 'E-WW-YYYY-HH:mm');
  var nextEventMetaData = {
    nextDateString: m.format('HH:mm dddd Do MMM YYYY'),
    nextDateFromNow: m.fromNow()
  }
  ReactDOM.render(
    <div className="row">
      <div className="col-md-12">
        <div className="well well-sg">
          <Event event={nextEventMetaData}/>
          <Feedback/>
          <People coming={event.coming} maybecoming={event.maybeComing} notcoming={event.notComing}/>
        </div>
      </div>
    </div>,
    document.getElementById('content'));
});
