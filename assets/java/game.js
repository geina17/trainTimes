/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
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
        name:train,
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
// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case