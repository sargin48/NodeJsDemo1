var moment = require('moment');

var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];

function getDays () {
    return days;
};

function getMonths () {
    return months;
};

function getDay (dayNumber) {
    return (Number.isInteger(dayNumber) && (dayNumber <= (days.length - 1))) ? days[dayNumber] : '';
};

function getMonth (monthNumber) {
    return (Number.isInteger(monthNumber) && (monthNumber <= (months.length - 1))) ? months[monthNumber] : '';
};

function max(a, b) {
    return (a > b)? a : b;
};

function lcs(X, Y, m, n) {
    var L = Array.from(Array(m+1), () => new Array(n+1));
    for (var i = 0; i <= m; i++) {
        for (var  j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                L[i, j] = 0;
            else if (X[i - 1] == Y[j - 1])
                L[i, j] = L[i - 1, j - 1] + 1;
            else
                L[i, j] = this.max(L[i - 1, j], L[i, j - 1]);
        }
    }
    return L[m, n];
}

function countWeekdayOccurrencesInMonth(date) {

    var m = moment(date),
            weekDay = m.day(),
            yearDay = m.dayOfYear(),
            count = 0;

    m.startOf('month');
    while (m.dayOfYear() <= yearDay) { 
        if (m.day() == weekDay) {
            count++; 
        }
        m.add('days', 1); 
    }

    return count;
}

// export the module
module.exports = {
    getDays: getDays,
    getMonths: getMonths,
    getDay: getDay,
    getMonth: getMonth,
    max: max,
    lcs : lcs,
    countWeekdayOccurrencesInMonth: countWeekdayOccurrencesInMonth
};