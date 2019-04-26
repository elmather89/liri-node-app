require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

// command line input variables
var action = process.argv[2];
var input = "";

// push this to the input var, allows multiple words to be
// concat. into the query url.
var clString = process.argv;

for (var i = 3; i < clString.length; i++) {
    if (i > 3 && i < clString.length) {
        input = input + "+" + clString[i];
        // console.log("line 20 " + input);
    }
    else {
        // console.log("line 23 " + clString[i]);
        input = clString[i];
    }
};

// switch case to trigger corresponding function
switch (action) {
    case "concert-this":
        findConcert();
        break;

    case "spotify-this-song":
        findSong();
        break;

    case "movie-this":
        findMovie();
        break;

    case "do-what-it-says":
        doAnything();
        break;
}

function findConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function(response) {
        // console.log("line 50 " + response.data[2].venue.name);

        for (var i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].venue.name + ", " + response.data[i].venue.city + ", " + 
            // response.data[i].venue.region + ", " + response.data[i].datetime);
            console.log("=================================================================");
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log(response.data[i].datetime);
            console.log("=================================================================");
        };
    });
};

function findSong() {
    //.
};

function findMovie() {
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        console.log(response);
    });
};

function doAnything() {
    //.
};