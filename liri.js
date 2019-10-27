require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
var fs = require("fs");
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const arg = process.argv[3];

function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    for (let i=0;i<response.data.length;i++){
        console.log("Venue Name: "+response.data[i].venue.name);
        console.log("Venue location: "+response.data[i].venue.city+", "+ response.data[i].venue.country);
        console.log("Date Time: "+moment(response.data[i].datetime).format('L'));
        console.log("+________________________________________________________+")
    }
  },

  function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
);


}
function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        if (data.tracks.items.length === 0) {
            console.log("Artist");

            console.log("Song Name: " + "The Sing");
            console.log("Preview URL: " + "https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
            return console.log("Album Name: " + "Happy Nation");
        }
        const track = data.tracks.items[0];

        console.log("Artist");
        for (let i = 0; i < track.artists.length; i++) {
            console.log("-" + track.artists[i].name);
        }
        console.log("Song Name: " + track.name);
        console.log("Preview URL: " + track.preview_url);
        console.log("Album Name: " + track.album.name);
    });
}
function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=e606d2fa&t=" + movie).then(
  function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response);
  },
    
  function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
);
  

}

switch (command) {
    case "concert-this":
        concertThis(arg);
        break;
    case "spotify-this-song":
        spotifyThisSong(arg);

        break;
    case "movie-this":
        movieThis(arg);

        break;
    case "do-what-it-says":


        break;
}

