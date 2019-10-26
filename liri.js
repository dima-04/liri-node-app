require("dotenv").config();
const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
var fs = require("fs");
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const arg = process.argv[3];

function concertThis(artist) {

}
function spotifyThisSong(song) {

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

    const track = data.tracks.items[0];

    console.log("Artist");
    for(let i=0;i<track.artists.length;i++){
        console.log("-" + track.artists[i].name);
    }
    console.log("Song Name: " + track.name);
    console.log("Preview URL: " + track.preview_url);
    console.log("Album Name: " + track.album.name);
    });


}
function movieThis(movie) {

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

