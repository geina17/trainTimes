// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDNuhrFaKWHtYk6fHB8AONCEnh_IRgJH6I",
    authDomain: "timesheet-3dd98.firebaseapp.com",
    databaseURL: "https://timesheet-3dd98.firebaseio.com",
    projectId: "timesheet-3dd98",
    storageBucket: "timesheet-3dd98.appspot.com",
    messagingSenderId: "512124187937"
};
firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding trains
$("#adddTrnBtn").on("click", function(event) {
    event.preventDefault();
    // Grabs user input
    var train = $("#trnNameinput").val().trim();
    var destination = $("#DestInput").val().trim();
    var tick = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
    var tock = $("#rateInput").val().trim();
    // Creates local "temporary" object for holding train data
    var tracks = {
        name: train,
        role: destination,
        start: tick,
        rate: tock,
    };
    // Uploads train data to the database
    database.ref().push(tracks);
    // Logs everything to console
    console.log(tracks.name);
    console.log(tracks.role);
    console.log(tracks.start);
    console.log(tracks.rate);
    // Alert
    alert("train successfully added");
    // Clears all of the text-boxes
    $("#trnNameinput").val("");
    $("#DestInput").val("");
    $("#startInput").val("");
    $("#rateInput").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var train = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var tick = childSnapshot.val().start;
    var tock = childSnapshot.val().rate;
    // train Info
    console.log(trnName);
    console.log(destination);
    console.log(tick);
    console.log(tock);
    // Prettify the train start
    var startInputPretty = moment.unix(tick).format("MM/DD/YY");
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(startInput, "X"), "months");
    console.log(empMonths);
});
//need to put in a clock
var randomDate = "02/23/1999";
var randomFormat = "MM/DD/YYYY";
var convertedDate = moment(randomDate, randomFormat);

// Using scripts from moment.js write code below to complete each of the following.
// Console.log to confirm the code changes we made worked.
console.log(moment(convertedData).format("MM/DD/YY"));
console.log(moment(convertedData).format("MMM Do,YYYY hh:mm:ss"));
console.log(moment(convertedData).format("X"));
console.log("---------------------------------------");
// 1 ...to convert the randomDate into three other date formats

// 2 ...to determine the time in years, months, days between today and the randomDate
console.log(moment(convertedData).toNow());
console.log(moment(convertedData).diff(moment(), "years"));
console.log(moment(convertedData).diff(moment(), "months"));
console.log(moment(convertedData).diff(moment(), "days"));
console.log("------------------------------------");

// 3 ...to determine the number of days between the randomDate and 02/14/2001
var newDate = moment("02/14/2001", randomFormat);
console.log(moment(convertedData).diff(moment(newDate), "days"));

// 4 ...to convert the randomDate to unix time (be sure to look up what unix time even is!!!)
console.log(moment(convertedData).format("X"));
console.log("------------------------------------");

// 5 ...to determine what day of the week and what week of the year this randomDate falls on.
console.log(moment(convertedData).format("DDD"));
console.log(moment(convertedData).format("dddd"));