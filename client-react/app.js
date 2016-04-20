import React from 'react';
import ReactDOM from 'react-dom';

import People from './people.jsx'
import Event from './event.jsx'
import Feedback from './feedback.jsx'

import moment from 'moment';

var event = {
   "__v":2,
   "_id":"5713f9e1be31c511005cd324",
   "week":16,
   "year":2016,
   "maybeComing":[
      {
         "provider":"google",
         "id":"108899356339387475040",
         "displayName":"Borgfrid Møen",
         "email":"borgfrid.moen@gmail.com",
         "photo":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
         "_id":"571506e5d2ea4111007fad5e",
         "__v":0,
         "name":{
            "familyName":"Møen",
            "givenName":"Borgfrid",
            "middleName":""
         }
      }
   ],
   "notComing":[

   ],
   "coming":[
      {
         "__v":0,
         "_id":"52f76d7e404a070b007409f9",
         "displayName":"Thomas Haukland",
         "email":"thomas.haukland@gmail.com",
         "id":"117491044963804474188",
         "photo":"https://lh5.googleusercontent.com/-P3bR0F6jB9o/AAAAAAAAAAI/AAAAAAAAemE/haGD_TEbvHE/photo.jpg",
         "provider":"google",
         "name":{
            "middleName":"",
            "givenName":"Thomas",
            "familyName":"Haukland"
         }
      }
   ]
};

var user = event.coming[0];

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
        <Feedback person={user}/>
        <People coming={event.coming} maybecoming={event.maybeComing} notcoming={event.notComing}/>
      </div>
    </div>
  </div>,
  document.getElementById('content'));
