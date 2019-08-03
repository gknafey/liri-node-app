require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var input = process.argv[3];

var bandsInTownApi = function () {

    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=upcoming").then(

        function (response) {
            console.log("\nUpcoming Concerts For Your Artist!! xD")
            for (let i = 0; i < 3; i++) {
                console.log("---------------------")
                console.log("Name of Location: " + response.data[i].venue.name + "\n");
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\n");
                console.log("Date of Event: " + moment(response.data[i].datetime).format("L"));
                console.log("---------------------")
            };
        })
        .catch(function (error) {
            if (error.response) {
                console.log("Error", error.message);
            }
            else {
                console.log("\nSorry no upcoming concerts for that Artist :(");
            }
        });

}

var spotsearch = function () {

    if (input === undefined) {
        input = "The Sign"
    };

    spotify
        .search({ type: 'track', query: input, limit: 3 })
        .then(function (response) {

            if (input === "The Sign") {

                console.log("\nYour search Defaulted To!");
                console.log("------------------");
                console.log("Artist: " + response.tracks.items[2]['album']['artists'][0]['name'] + "\n");
                console.log("Song Name: " + response.tracks.items[2]['name'] + "\n");
                console.log("Preview URL: " + response.tracks.items[2]['preview_url'] + "\n");
                console.log("Album Name: " + response.tracks.items[2]['album']['name']);
                console.log("------------------");


            } else {

                console.log("\nYour Search Results:")
                console.log("------------------");
                console.log("Artist: " + response.tracks.items[0]['album']['artists'][0]['name'] + "\n");
                console.log("Song Name: " + response.tracks.items[0]['name'] + "\n");
                console.log("Preview URL: " + response.tracks.items[0]['preview_url'] + "\n");
                console.log("Album Name: " + response.tracks.items[0]['album']['name']);
                console.log("------------------");
                // console.log(response.tracks.items[2]['album']['artists'][0]['name']);

            }

        })
        .catch(function (err) {
            console.log(err);
        });
}

var movieSearch = function () {

    if (input === undefined) {
        input = "Mr. Nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("\nMovie Info:");
            console.log("-------------");
            console.log("Name: " + response.data.Title + "\n");
            console.log("Release Year: " + response.data.Year + "\n");
            console.log("Rated " + response.data.imdbRating + " on IMDB\n");
            console.log("Rated " + response.data.Ratings[1].Value + " on Rotten Tomatoes \n");
            console.log("Produced in the " + response.data.Country + "\n");
            console.log("Language Spoken: " + response.data.Language + "\n");
            console.log("Plot Summary: " + response.data.Plot + "\n");
            console.log("Main Cast: " + response.data.Actors)
            console.log("-------------");
        })
        .catch(function (error) {
            if (error.response) {
                console.log("--Data--");
                console.log(error.response.data);
                console.log("--status--");
                console.log(error.response.status);
                console.log("---Status---");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log("error", error.message);
            }
            console.log(error.config);
        })
};

var makeItSo = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        input = dataArr[1];

        spotsearch();
    })
};

switch (command) {
    case "concert-this":
        // console.log("concert-this")
        bandsInTownApi();
        break;
    case "spotify-this-song":
        // console.log("spotify-this-song");
        spotsearch();
        break;
    case "movie-this":
        // console.log("movie-this");
        movieSearch();
        break;
    case "do-what-it-says":
        // console.log("do-what-it-says");
        makeItSo();
        break;
    case "list":
        console.log("\nYour list of commands are:\n")
        console.log("-------------------");
        console.log("concert-this '<artist/band name here>'\n");
        console.log("spotify-this-song '<song name here>'\n");
        console.log("movie-this '<movie name here>'\n");
        console.log("do-what-it-says\n");
        console.log("-------------------");
        break;
}