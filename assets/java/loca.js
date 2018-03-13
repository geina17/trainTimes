var config = {
    apiKey: "AIzaSyDNuhrFaKWHtYk6fHB8AONCEnh_IRgJH6I",
    authDomain: "timesheet-3dd98.firebaseapp.com",
    databaseURL: "https://timesheet-3dd98.firebaseio.com",
    storageBucket: "timesheet-3dd98.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();
//Button for adding TRain
$("#addTrnBtn").on("click", function(event) {
    event.preventDefault();
    // Grabs user input
    var name = $("#trnNameInput").val().trim();
    var dest = $("#roleInput").val().trim();

    //Go is goInput First Train (HH:mm)
    var go = moment($("#goInput").val().trim(), "HH:mm").format("X");
    // freq is the frequency (minutes)
    var freq = $("#rateInput").val().trim();
    var now = moment();
    var rightnw = moment().calendar();

    var firstTimeConverted = moment.unix(go).subtract(1, "years"); // find out more about .substract(1 ...)
    console.log("one");
      console.log("first time converted: " + firstTimeConverted);
    console.log(rightnw);
    console.log("current time : " + moment(now).format("HH:MM"));
    // Difference between the times
      var diffTime = moment().diff(firstTimeConverted, "minutes");
// lets figure out the timt appart from one train to the other 
var timeModulus = diffTime %  freq;
console.log("time Modulus" + timeModulus);



    // Creates local "temporary" object for holding train data
    var train = {
        name: name,
        role: dest,
        go: go,
        rate: freq,
    };

    // Uploads train data to the database
    database.ref().push(train);
    // Logs everything to console
    console.log(train.name);
    console.log(train.role);
    console.log(train.go);
    console.log(train.rate);
    // Alert 
    alert("train successfully added");

    // Clears all of the text-boxes
    $("#trnNameInput").val("");
    $("#roleInput").val("");
    $("#goInput").val("");
    $("#rateInput").val("");
});

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().role;
    var go = childSnapshot.val().go;
    var freq = childSnapshot.val().rate;
  //  var blue = childSnapshot.val().blue;

    // Train Info
    console.log(name);
    console.log(dest);
    console.log(go);//invalid?
    console.log(freq);

    // Prettify the train go
    var diff = moment().diff(moment.unix(go), "minutes");
    var remain = moment().diff(moment.unix(go), "minutes") % freq;
    var mins = freq - remain;

    // To calculate the arrival time, add the mins to the currrent time
    var arrive = moment().add(mins, "m").format("hh:mm A");
   
    console.log(moment().format("HH:MM"));
    console.log(arrive);
    console.log(moment().format("X"));

    var mins = freq - remain;
    console.log(mins);//nan?
    console.log(remain);//nan

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + mins + "</td><td>" + freq + 
        "</td><td>"+ arrive+"</td><td>" );
}); 