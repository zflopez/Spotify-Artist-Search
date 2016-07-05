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
		} /*else {
			alert("Enter a correct Username/Password");
		}
		if (!username || !pass) {
			alert("Enter a correct Username/Password");
		}*/
	}
	$('.username').val("");	
	$('.password').val("");
}

$(document).ready(function() {
	$('.send').on('click', loadData);
})