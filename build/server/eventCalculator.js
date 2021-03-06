var moment = require('moment');
moment.locale('nb');
var eventDay = 7;
var eventHour = 19;
var eventMinute = 45;
var eventSecond = 0;

module.exports = {
  getNext: function(todayDate) {
    var today = todayDate || new Date();
    var currentMoment = moment(today);
    var currentWeek = currentMoment.isoWeek();
    var currentYear = currentMoment.isoWeekYear();

    // Construct event date of current week:
    currentMoment.isoWeekday(eventDay);
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
