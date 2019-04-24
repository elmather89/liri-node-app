require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

// command line input variables
var action = process.argv[2];
var input = process.argv[3];

// switch case to initialize corresponding function
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
        console.log(response);
    });
};

function findSong() {
    //.
};

function findMovie() {
    //.
};

function doAnything() {
    //.
};