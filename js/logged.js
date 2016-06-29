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
		url: "https://api.spotify.com/v1/artists/" + artistId + "/albums?market=ES",
		type: "GET",
		dataType: "json",
		success: function(artistAlbums) {
			for (var i = 0; i < artistAlbums.items.length; i++) {
				var albums = artistAlbums.items[i].name;
				var albumImg = artistAlbums.items[i].images[0].url;
				var html = "<div><p><strong>" + albums + "</strong></p><p><img src='" + albumImg + "'</p></div>";
				
				$('body').append(html);
				console.log(albums);
			}			
		},
		error: function(response) {
			console.log(response);
		}
	})
}
