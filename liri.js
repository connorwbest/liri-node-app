require("dotenv").config();

//requires all necessary modules
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");

//accesses the keys for spotify and twitter
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var searchType = process.argv[2];
var searchArgs = process.argv;

var searchItem = "";

//Listens for the type of search from the third user input(change to Switch later)
if (searchType == "movie-this") {
  omdbSearch();
} else if (searchType == "my-tweets") {
  twitterSearch();
} else if (searchType == "spotify-this-song") {
  spotifySearch();
} else if (searchType == "do-what-it-says") {
  doThat();
}

//Search OMDB for searchItem
function omdbSearch() {
  for (var i = 3; i < searchArgs.length; i++) {
    if (i > 3 && i < searchArgs.length) {
      searchItem = searchItem + "+" + searchArgs[i];
      //console.log(searchItem);
    } else {
      searchItem += searchArgs[i];
    }
  }

  var queryUrl =
    "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("--------------------------------------");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      //console.log("Rotten Tomatoes: " + JSON.stringify(body).Ratings);
      console.log("Filmed In: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("--------------------------------------");

      //Array that holds the response, which will be appended to log.txt
      result = [
        "\n",
        "-----------------",
        "\n",
        JSON.parse(body).Title,
        "\n",
        JSON.parse(body).Year,
        "\n",
        JSON.parse(body).imdbRating,
        "\n",
        JSON.parse(body).Country,
        "\n",
        JSON.parse(body).Language,
        "\n",
        JSON.parse(body).Plot,
        "\n",
        JSON.parse(body).Actors,
        "\n",
        "-----------------"
      ];

      //Clean up the format of result 
      resultClean = result.join(" ");

      //Add the result to the log.txt
      fs.appendFile("log.txt", resultClean, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

//runs a spotify search for the searchItem
function spotifySearch() {
  for (var i = 3; i < searchArgs.length; i++) {
    if (i > 3 && i < searchArgs.length) {
      searchItem = searchItem + "+" + searchArgs[i];
      //console.log(searchItem);
    } else {
      searchItem += searchArgs[i];
    }
  }

  spotify.search({ type: "track", query: searchItem }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return; //from spotify npm docs
    } else {
      var songInfo = data.tracks.items[0];
      //console.log(songInfo);

      console.log("--------------------------------------");
      console.log(songInfo.artists[0].name);
      console.log(songInfo.name);
      console.log(songInfo.album.name);
      console.log(songInfo.external_urls);
      console.log("--------------------------------------");
    }

    result = [
      "\n",
      "-----------------",
      "\n",
      songInfo.artists[0].name,
      "\n",
      songInfo.name,
      "\n",
      songInfo.album.name,
      "\n",
      "-----------------"
    ];

    resultClean = result.join(" ");

    fs.appendFile("log.txt", resultClean, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

//pulls the last 20 tweets from the desired screen_name
function twitterSearch() {
  client.get(
    "statuses/user_timeline",
    {
      screen_name: "TestUse05228050",
      count: 20,
      trim_user: 1,
      exclude_replies: true
    },
    function(error, tweets, response) {
      if (!error && response.statusCode === 200) {
        for (i = 0; i < tweets.length; i++) {
          console.log("--------------------------------------");
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
          console.log(tweets[i].source);
          console.log("--------------------------------------");

          result = [
            "\n",
            "-----------------",
            "\n",
            tweets[i].created_at,
            "\n",
            tweets[i].text,
            "\n",
            tweets[i].source,
            "\n",
            "-----------------"
          ];
    
          resultClean = result.join(" ");
    
          fs.appendFile("log.txt", resultClean, function(err) {
            if (err) {
              console.log(err);
            }
          });
        }
      } else {
        console.log(error);
      }
    }
  );

  
}

//takes the text in random.txt and runs a spotify search
function doThat() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var randArray = data.split(",");
    queryItem = randArray[1];
    console.log(queryItem);

    searchItem = queryItem;
    spotifySearch();
  });
}
