 // Initialize Firebase

 var config = {
    apiKey: "AIzaSyDfKoBIJbpHnAdlYLJlH05T6Nw1zG8looA",
    authDomain: "fir-747ea.firebaseapp.com",
    databaseURL: "https://fir-747ea.firebaseio.com",
    projectId: "fir-747ea",
    storageBucket: "",
    messagingSenderId: "522235457301"
  };

  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

     
    //   var name = "";
    //   var destination= "";
    //   var time = "";
    //   var number = "";
      // Code in the logic for storing and retrieving the most recent user.
      var trName = $("#name-input").val().trim();
      var trDestination = $("#destination-input").val().trim();
      var trTime = moment($("#time-input").val().trim(), "HH:mm-military time").format("X");
      var trNumber = $("#number-input").val().trim();


      // Don't forget to provide initial data to your Firebase database.
      var newTrain = {
        name: trName,
        destination: trDestination,
        time: trTime,
        number: trNumber
      };
   
    // Uploads employee data to the database
    database.ref().push(newTrain)
    
    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.time)
    console.log(newTrain.number)

    alert("Train Schedule successfully added")

    // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#number-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;    
    var trTime = childSnapshot.val().time;
    var trNumber = childSnapshot.val().number;
  
    // Employee Info
    console.log(trName);
    console.log(trDestination);
    console.log(trTime);
    console.log(trNumber);


    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years"); 
    console.log(firstTimeConverted);

    // Current time using MomentJS
    var currentTime = moment(); 
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm")); 

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); 
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trNumber;
    console.log(tRemainder);

    // Minute until train arrives
    var tMinutesTillTrain = trNumber - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes"); 
    var nextTrainConverted = moment(nextTrain).format("hh:mm a"); 
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm")); 

    // Add each trains data into the HTML table
    $("#train-table > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + "Every " + trNumber + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  })






