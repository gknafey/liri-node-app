require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

console.log(process.argv);

var command = process.argv[2];

var input = process.argv[3];


var bandsInTownApi = function () {

    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=upcoming").then(

        function (response) {
            console.log("Upcoming Concerts For Your Artist!! xD")
            for (let i = 0; i < 3; i++) {
                console.log("---------------------")
                console.log("Name of Location: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log("Date of Event: " + moment(response.data[i].datetime).format("L"));
                console.log("---------------------")
            };
        })
        .catch(function (error) {
            if (error.response) {
                console.log("Error", error.message);
            }
            else {
                console.log("Sorry no upcoming concerts for that Artist :(");
            }
        });

}

var spotsearch = function () {
    spotify
    .search({ type: 'track', query: input, limit: 1 })
    .then(function(response) {
      console.log(response.tracks.items);
    })
    .catch(function(err) {
      console.log(err);
    });
}


switch (command) {
    case "concert-this":
        console.log("concert-this")
        bandsInTownApi();
        break;
    case "spotify-this-song":
        console.log("spotify-this-song");
        spotsearch();
        break;
    case "movie-this":
        console.log("movie-this");
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        break;
}

console.log(input)

