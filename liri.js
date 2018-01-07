require("dotenv").config();
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys");


var client = new twitter(keys.twitter);
var spotify = new spotify(keys.spotify);

var userCommand = process.argv[2];

var search = "";
for(i = 3; i < process.argv.length; i++ ){
    search += process.argv[i] + "+" ;
}
console.log(search);

function myTweets() {
    console.log("tweet")
    var params = {screen_name: 'asheth9', count:9};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    
    for(i = 0; i < tweets.length; i++){
        console.log(tweets[i].text + "\n")
    }
    }
    });
};
    

function spotifyThisSong(search) {
    var search = process.argv[3];
    if(!search){
        search = "the+sign+ace+of+base"
    }
    params = search;
    spotify.search({ type: "track", query: params }, function(err, data) {
        if(!err){
            var Song = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (Song[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + Song[i].artists[0].name + "\n" +
                    "Song: " + Song[i].name + "\n" +
                    "Album of the song: " + Song[i].album.name + "\n" +
                    "Preview Url: " + Song[i].preview_url + "\n" + 
                    console.log(spotifyResults);
                }
            }
        }	
        
    });
};

function movieThis(){

    console.log(search)
	if(!search){
        search = "mr+nobody";
        console.log("If you haven't watched Mr. Nobody, then you should. It's on Netflix!");
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body){
	if (!error && response.statusCode == 200) {
        var Movie = JSON.parse(body);
		var movieResults =
		"Title: " + Movie.Title+"\n"+ 
		"Year: " + Movie.Year+"\n"+
        "IMDB-Rating: " + Movie.imdbRating+"\n"+
        "Rotten-Tomatoes-Rating: " + Movie.Ratings[1].Value+"\n"+
		"Country: " + Movie.Country+"\n"+
		"Language: " + Movie.Language+"\n"+
		"Plot: " + Movie.Plot+"\n"+
		"Actors/Actresses: " + Movie.Actors+"\n" ;
				
		console.log(movieResults);
				
    }
    });
};

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				dwits = data.split(",");
				spotifyThisSong(dwits[0], dwits[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});
}

switch(userCommand) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
}