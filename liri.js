//Include .env configuration file
require("dotenv").config();
//create resource variables
const keys = require("./keys.js");
var Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const space = " ";
// Create variable to contain text enter in command line
var newCommand = process.argv[2];
// Create functions to contain queries
var spotifyThis = function(searchType, song, thisLimit) {
        spotify.search({
                type: searchType,
                query: song,
                limit: thisLimit
            },
            function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                //
                console.log(
                    chalk.bgWhite.black(data.tracks.items[0].name) +
                    space + "by" + space +
                    chalk.bgYellow.black(data.tracks.items[0].artists[0].name)
                );
                console.log(
                    chalk.red(
                        data.tracks.items[0].album.name
                    )
                );
                console.log(
                    chalk.blue(data.tracks.items[0].preview_url)
                );
            })
    }
    //
var moviethis = function(movie) {
    //
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            // handle success
            // console.log("SUCCESS:");
            console.log(
                chalk.bgBlue(response.data.Title) + space +
                chalk.bgRed(response.data.Ratings[0].Value + space + "on IMDB") + space +
                chalk.bgGreen(response.data.Ratings[1].Value + space + "on Rotten Tomatoes")
            );
            console.log(chalk.blue(response.data.Country) + space +
                chalk.italic(response.data.Language) + space
            );
            console.log(chalk.bgWhite.black.italic(response.data.Plot) + space);
            console.log(
                response.data.Actors
            );
        })
        .catch(function(error) {
            // handle error
            console.log("ERROR: ");
            console.log(error);
        })
        .finally(function() {
            // always executed
            // console.log("Complete");
        });
};
//
var bandsInTown = function(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            // handle success
            // console.log("SUCCESS:");
            for (let i = 0; i < response.data.length; i++) {

                console.log(chalk.bgWhite.black(response.data[i].venue.name));
                console.log(response.data[i].venue.city + "," + space + response.data[i].venue.country)
                console.log(response.data[i].datetime);
                console.log("");
            }
        })
        .catch(function(error) {
            // handle error
            console.log("ERROR: ");
            console.log(error);
        })
        .finally(function() {
            // always executed
            // console.log("Complete");
        });
};
//
var querySource = function(source) {
    axios.get(source)
        .then(function(response) {
            // handle success
            // console.log("SUCCESS:");
            console.log(response);
        })
        .catch(function(error) {
            // handle error
            console.log("ERROR: ");
            console.log(error);
        })
        .finally(function() {
            // always executed
            console.log("Complete");
        });
}

switch (newCommand) {
    //
    case "concert-this":
        //
        console.log("BANDS");
        //
        var artist = process.argv[3];
        //
        bandsInTown(artist);
        //
        break;
        //
    case "spotify-this-song":
        //
        console.log("SONG");
        //
        var song = process.argv[3];
        //
        spotifyThis("track", song, 1);
        //
        // console.log(song);
        //
        break;
        //
    case "movie-this":
        //OMDB API
        console.log("MOVIES");
        //
        var movie = process.argv[3];
        //
        moviethis(movie);
        //
        break;
        //
    case "do-what-it-says":
        //
        console.log("SOMETHING");
        //
        fs.readFile('random.txt', 'utf8', function(err, contents) {
            console.log(contents);
        });
        //
        break;
        //
};