var eventCalculator = require('../eventCalculator');

exports.februaryEightNextEventIsWeek6 = function(test) {
  var februaryEight = new Date(2014, 1, 8, 23, 10);
  var actual = eventCalculator.getNext(februaryEight);
  delete actual.date;
  test.deepEqual(actual, {year: 2014, week: 6});
  test.done();
};
exports.december31NextEventIsWeek1 = function(test) {
  var dec31 = new Date(2014, 11, 31, 23, 10);
  var actual = eventCalculator.getNext(dec31);
  delete actual.date;
  test.deepEqual(actual, {year: 2015, week: 1});
  test.done();
};
exports.december24NextEventIsWeek52 = function(test) {
  var dec31 = new Date(2014, 11, 24, 23, 10);
  var actual = eventCalculator.getNext(dec31);
  delete actual.date;
  test.deepEqual(actual, {year: 2014, week: 52});
  test.done();
};
exports.october18Year2015NextEventIsWeek42 = function(test) {
  var oct18 = new Date(2015, 9, 18, 11, 10);
  var actual = eventCalculator.getNext(oct18);
  delete actual.date;
  test.deepEqual(actual, {year: 2015, week: 42});
  test.done();
};
