require("dotenv").config();
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys");


var client = new twitter(keys.twitter);
var spotify = new spotify(keys.spotify);


function myTweets() {
    console.log("my tweets")
}

function spotifyThisSong(){
    
}

function movieThis(){

}

function doWhatItSays(){

}