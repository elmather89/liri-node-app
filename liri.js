require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var Tweeter = require("ebird");
var geolocation = require("geolocation");
var inquirer = require("inquirer");


// trying to get the actions to be selectable from an initial prompt =====================================
// new search object
// function searchObject(name) {
//     this.name = name;
// };

// // printInfo method
// searchObject.prototype.printInfo = function() {
//     console.log("line 16 " + this.name);
// };

// inquirer.prompt([
//     {
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["concert-this", "find-song", "find-movie", "do-what-it-says"],
//         name: "action"
//     }.then(function(answers) {
//         var newSearchObject = new searchObject(answers.name);
//         newSearchObject.printInfo();
//     })
// ]);

// come back to this ^^^ ===========================================

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

    case "find-song":
        findSong();
        break;

    case "find-movie":
        findMovie();
        break;

    case "see-tweets":
        doAnything();
        break;
}

function findConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log("line 50 " + response.data[2].venue.name);

            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].venue.name + ", " + response.data[i].venue.city + ", " + 
                // response.data[i].venue.region + ", " + response.data[i].datetime);

                // moment js
                var initialFormat = "";
                var convert = moment(time, initialFormat);
                var reformatTime = convert.format("LLLL");
                var time = response.data[i].datetime;

                // moment.js countdown
                var fromNow = moment(reformatTime).endOf('day').fromNow();

                console.log("======================== ♩ ♬ ♩ ♬ ========================");
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log(reformatTime + " (" + fromNow + ")");
                console.log("======================== ♩ ♬ ♩ ♬ ========================");
            };
        });
};

function findSong() {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: input })
        .then(function (response) {
            var songData = response.tracks.items;

            console.log("======================== ♩ ♬ ♩ ♬ ========================");
            // console.log(songData[0]);
            console.log("Artist: " + songData[0].album.artists[0].name);
            console.log("Song: " + songData[0].name);
            console.log("From album: " + songData[0].album.name);
            console.log("Tracks on album: " + songData[0].album.total_tracks);
            console.log("Spotify URL: " + songData[0].album.external_urls.spotify);
            console.log("======================== ♩ ♬ ♩ ♬ ========================");
            // console.log(response.tracks.items[0].album.artists);
            // console.log(response.tracks.items[0].artists);
            // console.log("line 69: " + response.tracks.items[0].artists.name);
        })
        .catch(function (err) {
            console.log(err);
        });
};

function findMovie() {
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            if (!input) {
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix.");
            }
            else {
                console.log("======================== 🎬 ========================");
                // console.log(response.data);
                console.log(response.data.Title + ", " + response.data.Year);
                console.log(response.data.Plot);
                console.log("\n  IMDB rating: " + response.data.Ratings[0].Value);
                console.log("  Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("  Awards/Nominations: " + response.data.Awards);
                console.log("  Country: " + response.data.Country);
                console.log("  Language: " + response.data.Language);
                console.log("  Actors: " + response.data.Actors);
                console.log("======================== 🎬 ========================");
            }
        });
};

function doAnything() {
    // geolocation
    // geolocation.getCurrentPosition(function (err, position) {
    //     console.log(position);
    // })
    var geoLat = 39.052906;
    var geoLon = -94.60982849999999;

    var ebird = new Tweeter(keys.birds);
    // console.log(ebird);

    // working:     axios.get("https://ebird.org/ws2.0/ref/hotspot/geo?lat=" + `${geoLat}` + "&lng=" + `${geoLon}` + "&fmt=json&sort=species&key=" + `${keys.birds.secret}`)
    axios.get("https://ebird.org/ws2.0/data/obs/geo/recent?lat=" + `${geoLat}` + "&lng=" + `${geoLon}` + "&fmt=json&sort=species&key=" + `${keys.birds.secret}`)
        .then(function (response) {
            // console.log(response);
            // console.log(response.data[0]);

            for (var i = 0; i < response.data.length; i++) {
                console.log("======================== 🦆 ========================");
                console.log(response.data[i].comName + " x " + response.data[i].howMany);
                console.log("\n Scientific name: " + response.data[i].sciName);
                console.log(" Observation date: " + response.data[i].obsDt);
                console.log(" Coordinates: " + response.data[i].lat + ", " + response.data[i].lng);
                console.log(" Unauthorized/Private location: " + response.data[i].locationPrivate);
                console.log("======================== 🦆 ========================");
            }
        })
};