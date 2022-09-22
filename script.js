

document.write();


//get the current date
var today = new Date();
var yyyy = today.getFullYear();
var mm = today.getMonth() + 1;  //months start at 0
var dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

var formattedToday = mm + '/' + dd + '/' + yyyy;
document.getElementById('currentDate').innerHTML = formattedToday;


//get the date picked

function myFunction() {
    var x = document.getElementById('Month').value;
    var y = document.getElementById('Day').value;
    var z = document.getElementById('Year').value;
    var answer = x + ' ' + y + ',' + z;

    document.getElementById('DatePicked').innerHTML = answer;
};



//localstorage for information
function saveMe() {
    document.addEventListener('DOMContentLoaded', function () {
        var input = document.getElementById('Month');
        if (localStorage['Month']) {
            input.value = localStorage['Month']; // set the value
        }
        input.onchange = function () {
            localStorage['Month'] = this.value; // change localStorage on change
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var input = document.getElementById('Day');
        if (localStorage['Day']) {
            input.value = localStorage['Day']; // set the value
        }
        input.onchange = function () {
            localStorage['Day'] = this.value; // change localStorage on change
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var input = document.getElementById('Year');
        if (localStorage['Year']) {
            input.value = localStorage['Year']; // set the value
        }
        input.onchange = function () {
            localStorage['Year'] = this.value; // change localStorage on change
        }
    });
};
saveMe();



//dropdown choices for date
var yearSelect = document.getElementById("Year");
var monthSelect = document.getElementById("Month");
var daySelect = document.getElementById("Day");

const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];


(function populateMonths() {
    for (var i = 0; i < months.length; i++) {
        const option = document.createElement('option');
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.value = "January";
})();

var previousDay;

function populateDays(month) {

    //check to see if its a leap year, 30 days or 31 in the month
    while (daySelect.firstChild) {
        daySelect.removeChild(daySelect.firstChild);
    }

    var dayNumber;
    var year = yearSelect.value;


    if (month === 'January' || month === 'March' ||
        month === 'May' || month === 'July' || month === 'August'
        || month === 'October' || month === 'December') {
        dayNumber = 31;
    } else if (month === 'April' || month === 'June'
        || month === 'September' || month === 'November') {
        dayNumber = 30;
    } else {
        //check for a leap year
        if (new Date(year, 1, 29).getMonth() === 1) {
            dayNumber = 29;
        } else {
            dayNumber = 28;
        }
    }
    //get the correct days when picking a month
    for (var i = 1; i <= dayNumber; i++) {
        const option = document.createElement("option");
        option.textContent = i;
        daySelect.appendChild(option);
    }
    if (previousDay) {
        daySelect.value = previousDay;
        if (daySelect.value === "") {
            daySelect.value = previousDay - 1;
        }
        if (daySelect.value === "") {
            daySelect.value = previousDay - 2;
        }
        if (daySelect.value === "") {
            daySelect.value = previousDay - 3;
        }
    }
};

//the result
populateDays(monthSelect.value);

yearSelect.onchange = function () {
    populateDays(monthSelect.value);
};
monthSelect.onchange = function () {
    populateDays(monthSelect.value);
};
daySelect.onchange = function () {
    previousDay = daySelect.value;
};

function date_diff_indays(formattedToday, answer) {
    dt1 = new Date(formattedToday);
    dt2 = new Date(answer);

    get = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));

    document.getElementById('DaysTill').innerHTML = get + ' days from now';
};
date_diff_indays();

//localStorage.clear();