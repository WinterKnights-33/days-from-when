

window.onload = () => alert("Click The Date!")

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

function countdownTill() {
    var x = document.getElementById('Month').value;
    var y = document.getElementById('Day').value;
    var z = document.getElementById('Year').value;
    var answer = x + ' ' + y + ',' + z;

    document.getElementById('DatePicked').innerHTML = answer;

    var differenceInDays = date_diff_indays(formattedToday, answer);

    document.getElementById('DaysTill').innerHTML = differenceInDays + ' days from now';
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
const monthSelect = document.getElementById("Month");
const daySelect = document.getElementById("Day");
const yearSelect = document.getElementById("Year");

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

    var dayNum;
    var year = yearSelect.value;


    if (month === 'January' || month === 'March' ||
        month === 'May' || month === 'July' || month === 'August'
        || month === 'October' || month === 'December') {
        dayNum = 31;
    } else if (month === 'April' || month === 'June'
        || month === 'September' || month === 'November') {
        dayNum = 30;
    } else {
        //check for a leap year
        if (new Date(year, 1, 29).getMonth() === 1) {
            dayNum = 29;
        } else {
            dayNum = 28;
        }
    }
    //get the correct days when picking a month
    for (var i = 1; i <= dayNum; i++) {
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


function populateYears() {
//because of the input box, this function isnt for the user's end
    let year = new Date().getFullYear();
    for (var i = 0; i < 101; i++) {
        const yearOption = document.getElementById('Year');
        yearOption.value = year - i;
    }
}

//the result
populateDays(monthSelect.value);
populateYears();

/*
yearSelect.onchange = function () {
    populateDays(monthSelect.value);
};
monthSelect.onchange = function () {
    populateDays(monthSelect.value);
};
daySelect.onchange = function () {
    previousDay = daySelect.value;
};
*/

function date_diff_indays(formattedToday, answer) {
    let dt1 = new Date(formattedToday);
    let dt2 = new Date(answer);

    get = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));

    return get;

};

//localStorage.clear();
