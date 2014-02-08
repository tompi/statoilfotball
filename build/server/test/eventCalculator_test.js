var eventCalculator = require('../eventCalculator');

exports.februaryEightNextWeekIs7 = function(test) {
  var februaryEight = new Date(2014, 1, 8, 23, 10);
  var actual = eventCalculator.getNext(februaryEight);
  delete actual.date;
  test.deepEqual(actual, {year: 2014, week: 7});
  test.done();
};

exports.december31NextWeekIs2 = function(test) {
  var dec31 = new Date(2014, 11, 31, 23, 10);
  var actual = eventCalculator.getNext(dec31);
  delete actual.date;
  test.deepEqual(actual, {year: 2015, week: 2});
  test.done();
};

exports.december24NextWeekIs1 = function(test) {
  var dec31 = new Date(2014, 11, 24, 23, 10);
  var actual = eventCalculator.getNext(dec31);
  delete actual.date;
  test.deepEqual(actual, {year: 2015, week: 1});
  test.done();
};
