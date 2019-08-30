require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Spotify = new Spotify(keys.spotify);
var axios = require("axios");
//
var newCommand = process.argv[2];
//
var spotifyThisSong = function(song) {
        queryurl = ("https://api.spotify.com/v1/tracks/" + song);
        return queryurl;
    }
    //
var moviethis = function(movie) {
        queryurl = ("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy");
        return queryurl;
    }
    //
var bandsInTown = function(artist) {
    queryurl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    return queryurl;
};
//
var querySource = function(source) {
    axios.get(source)
        .then(function(response) {
            // handle success
            console.log(response);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });
}



switch (newCommand) {
    //
    case "concert-this":
        //
        var artist = process.argv[3];
        //
        console.log("BANDS");
        //
        querySource(bandsInTown(artist));
        //
        break;
    case "spotify-this-song":
        //
        console.log(newCommand);
        //
        var song = process.argv[3];
        //
        querySource(spotifyThisSong(song));
        //
        break;
    case "movie-this":
        //      OMDB API
        console.log("MOVIES");
        //
        var movie = process.argv[3];
        //
        querySource(moviethis(movie))
            //
        break;
    case "do-what-it-says":
        console.log("SOMETHING");
        break;
};