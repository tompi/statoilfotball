var moment = require('moment');
var eventDay = 1;
var eventHour = 14;
var eventMinute = 0;
var eventSecond = 0;

module.exports = {
  getNext: function(todayDate) {
    var today = todayDate || new Date();
    var currentMoment = moment(today);
    var currentWeek = currentMoment.isoWeek();
    var currentYear = currentMoment.isoWeekYear();

    // Construct event date of current week:
    currentMoment.day(eventDay);
    currentMoment.hour(eventHour);
    currentMoment.minute(eventMinute);
    currentMoment.second(eventSecond);
    if (currentMoment.isBefore(today)) {
      currentMoment.isoWeek(currentWeek + 1);
    }
    return { 
      year: currentMoment.isoWeekYear(), 
      week: currentMoment.isoWeek(),
      date: currentMoment.toDate()
    };
  }
};
