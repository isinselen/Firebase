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
  
  var database = firebase.database();

  var currentTime = moment().format();

  console.log("Current Time: " + currentTime);
				
//When the submit button is clicked, we run
$("#click-train-button").on("click", function() {
    console.log('click is working');
      // Prevent the page from refreshing
      event.preventDefault();

      // Grab user input
	  var trainNameForm = $("#name-input").val().trim();
	  var destinationForm = $("#destination-input").val().trim();
	  var trainTimeForm = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
	
      //var frequencyForm = moment($("#number-input").val().trim().format("mm"));
	  var frequencyForm = $("#number-input").val().trim();

	  // Creates local "temporary" object 
	  var newTrain = {
		train: trainNameForm,
		destination: destinationForm,
		first: trainTimeForm,
		frequency: frequencyForm
    };
	//console.log database
	database.ref().push(newTrain);
	
	console.log(newTrain.train);
  	console.log(newTrain.destination);
	console.log(newTrain.first);
	console.log(newTrain.frequency);
	
	//Clearing the inputs
	 $("#trainNameForm").val("");
  	 $("#destinationForm").val("");
	 $("#trainTimeForm").val("");
	 $("#frequencyForm").val("");
});

//Create Firebase event 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
	
  // Store everything
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;
  
  //Variable to train time
  var trainTimeConverted = moment(trainTime, "HH:mm");
	
  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
	console.log(timeDifference);
	
  var frequencyMinutes = childSnapshot.val().frequency;
	console.log("Frequency Minutes: " + frequencyMinutes);
  
  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  	console.log("Minutes Away: " + minutesAway);
  
  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
	console.log("Next Arrival: " + nextArrival);
	
	
  // Updating the schedule (?)

  $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});





