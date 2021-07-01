module.exports.getDate = getDate;
module.exports.getDay = getDay;
module.exports.getMonth = getMonth;
module.exports.getYear = getYear;

function getDate(){
    var today = new Date();
        
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    var date = today.toLocaleDateString("en-IN", options);
    return date;
}

function getDay(){
    var today = new Date();
        
    var options = {
        weekday: "long"
    };
    var day = today.toLocaleDateString("en-IN", options);
    return day;
}

function getMonth(){
    var today = new Date();
        
    var options = {
        month: "short"
    };
    var month = today.toLocaleDateString("en-IN", options);
    return month;
}

function getYear(){
    var today = new Date();
        
    var options = {
        year: "numeric"
    };
    var year = today.toLocaleDateString("en-IN", options);
    return year;
}
