/*function makeRequest(spotiurl, jsonType, successFunction) {
	$.ajax({
		url: spotiurl,
		dataType: jsonType,
		success: successFunction,
	});
};*/


function search() {
	var input = $('.artistSearch').val();

	$.ajax({
		url: "https://api.spotify.com/v1/search?type=artist&query=" + input,
		type: "GET",
		dataType: "json",
		success: function (dataReceived) {
			var artist = dataReceived.artists.items[0].id;
			requestArtist(artist);				
		},
		error: function(response) {
			console.log(response)
		}
	})
}

$(document).ready(function() {
	$('.search').on('click', search);
})

function requestArtist(artistId) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistId + "/albums",
		type: "GET",
		dataType: "json",
		success: function(artistAlbums) {
			var albums = dataReceived.artists.items[0].id;
			console.log();
		},
		error: function(response) {
			console.log(response);
		}
	})
}
