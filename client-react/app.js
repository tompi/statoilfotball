import React from 'react';
import ReactDOM from 'react-dom';

import People from './people.jsx'

var people = [
  {
    displayName: 'Thomas Haukland',
    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/000/15d/1a3/17f606a.jpg',
    email: 'thomas.haukland@gmail.com',
    _id: 'abcdef'
  },
  {
    displayName: 'Nissen',
    photo: 'https://www.byoumagazine.com/wp-content/uploads/2015/12/banbury-santa.jpg',
    email: 'nissen@gmail.com',
    _id: 'nissen'
  }
]

ReactDOM.render(
  <People people={people}/>,
  document.getElementById('content'));
