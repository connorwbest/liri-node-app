# liri-node-app

This CLI application allows the use to search for movies, songs and pull the last 20 tweets of a set username using node.js on the command line. The user will then get back 
information related to the search item and the information will be logged to a text file(log.txt) for referencing later. 

# How To Use

This application supports 4 commands: 'movie-this', 'spotify-this-song', 'my-tweets' and 'do-what-it-says'. You can find instructions on how to use each and their responses below. Please be sure to type 'node' and the file name (liri.js) in front of each command to run them.

# OMDB: movie-this

To use the movie search functionality simply type 'movie-this' followed by your desired movie. The search will then return the following information:
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.(Needs to be fixed)
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

# Spotify: spotify-this-song

To use the Spotify search type 'spotify-this-song' followed by the name of the desired song. The search will return the following information:
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

# Twitter: my-tweets

To retrieve the last twenty tweets from the desired username, simply type 'my-tweets'. The following information will be printed to your terminal:
* Date created
* The text from the tweet
* The source

# Do What it Says

To use this command, just type 'do-what-it-says' (similar to the Twitter search, you do not need a search item). This will then take the text from random.txt and use it to run a spotify search with the song name in that file. (This will later be updated to allow different searches). To changes the search that it runs, simply erase the song title in the current file and put in your own. The command will then return the information from the spotify search.

