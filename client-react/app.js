import React from 'react';
import ReactDOM from 'react-dom';

import People from './people.jsx'
import Event from './event.jsx'
import Feedback from './feedback.jsx'
import MostActivePeople from './mostActivePeople.jsx'

import RestClient from './restClient.js'

import moment from 'moment';

RestClient.getNextEvent((event) => {
  // Convert week to date
  var m = moment('7-' + event.week + '-' + event.year + '-19:45', 'E-WW-YYYY-HH:mm').locale('nb');
  var nextEventMetaData = {
    nextDateString: m.format('HH:mm dddd Do MMM YYYY'),
    nextDateFromNow: m.fromNow()
  }
  ReactDOM.render(
    <div className="row">
      <div className="col-md-8">
        <div className="well well-sg">
          <Event event={nextEventMetaData}/>
          <Feedback/>
          <People event={event}/>
        </div>
      </div>
      <div className="col-md-4">
        <MostActivePeople event={nextEventMetaData}/>
      </div>
    </div>,
    document.getElementById('content'));
});
