var config = {
    apiKey: "AIzaSyDNuhrFaKWHtYk6fHB8AONCEnh_IRgJH6I",
    authDomain: "timesheet-3dd98.firebaseapp.com",
    databaseURL: "https://timesheet-3dd98.firebaseio.com",
    storageBucket: "timesheet-3dd98.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();
// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
    // Grabs user input
    var empName = $("#employee-name-input").val().trim();
    var empRole = $("#role-input").val().trim();
    var empStart = moment($("#start-input").val().trim(),"HH:MM").format("X");
    var empRate = $("#rate-input").val().trim();
    var now = moment();
    var rightnw = moment().calendar();

    console.log(rightnw);
    console.log("current time : "+ moment(now).format("HH:MM"));
    // Creates local "temporary" object for holding employee data
    var newEmp = {
        name: empName,
        role: empRole,
        start: empStart,
        rate: empRate
    };
    // Uploads employee data to the database
    database.ref().push(newEmp);
    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.role);
    console.log(newEmp.start);
    console.log(newEmp.rate);
    // Alert 
    alert("Employee successfully added");
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;
    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("HH:MM");
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(empStart, "X"), "minutes");
    console.log(empMonths);
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole  + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
var tFrequency = 3;
// Time is 3:30 AM
var firstTime = "03:30";
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);
// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));