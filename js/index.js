/*function makeRequest(spotifyurl, jsonType, successFunction) {
	$.ajax({
		url: spotifyurl,
		dataType: jsonType,
		success: successFunction,
	});
}; */

function loadData() {	
	$.ajax({
		url: "js/json/data.jsonp",
		jsonpCallback: "loginData",
		crossDomain: true,
		type: "GET",
		dataType: "jsonp",
		success: function(response) {
			var userArray = [];

			for(var i = 0; i < response.users.length; i++) {
				userArray.push(response.users[i]);
			}
			checkuser(userArray);
		},
		error: function(response) {
			console.log(response)
		}
	})
}

function checkuser(userArray) {	
	var username = $('.username').val();
	var pass = $('.password').val();

	for(var i = 0; i < userArray.length; i++) {
		if(username === userArray[i].user && pass === userArray[i].password) {
			window.open("logged.html", "_self");
		}
	}	
}

$(document).ready(function() {
	$('.send').on('click', loadData);
})



