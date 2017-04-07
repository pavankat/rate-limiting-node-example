var limit = require("simple-rate-limiter");
var request = require("request");
var movies = ["coffee", "monkeys", "tea"]

var callApi = limit(function(movie, callback) {
	var url = "http://www.omdbapi.com/?t=" + movie;
	request(url, callback);
}).to(1).per(1000*3); //1 requests per every 3 seconds

movies.forEach(function(movie) {
	callApi(movie, function(error, response, body) {
		/* ... Yay! Not a too-many-request-per-second error! ... */

		var bodyInJson = JSON.parse(response.body);

		console.log(`Title: ${bodyInJson.Title} Year: ${bodyInJson.Year} Plot: ${bodyInJson.Plot}`)
	});
})