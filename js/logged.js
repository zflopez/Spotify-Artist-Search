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
		success: function(dataReceived) {
			var artist = dataReceived.artists.items[0].id;
			requestArtist(artist);				
		},
		error: function(response) {
			console.log(response)
		}
	})

	$('.artistSearch').val("");
}

function requestArtist(artistId) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistId + "/albums?market=ES",
		type: "GET",
		dataType: "json",
		success: function(dataReceived) {
			var albumsInfo = dataReceived.items;
			requestAlbums(albumsInfo);
		},
		error: function(response) {
			console.log(response);
		}
	})
}


function requestAlbums(artistAlbums) {
	//console.log(artistAlbums);
	for (var i = 0; i < artistAlbums.length; i++) {
		var albumId = artistAlbums[i].id;
		var albums = artistAlbums[i].name;
		var albumImg = artistAlbums[i].images[0].url;
		var elementP = $("<p>").text(albums);
		var elementAlbum = $("<div class='album'>");
		var elementImage = $("<img class='albumCover'>");
		elementImage.attr("src", albumImg);
		elementAlbum.append(elementP);
		elementAlbum.append(elementImage);

		$(".container-album").append(elementAlbum);

		//console.log(albums);
		elementAlbum.on("click", requestTracks(albumId));

	}
}



function requestTracks(albumId) {
	$.ajax({
		url: "https://api.spotify.com/v1/albums/" + albumId + "/tracks",
		type: "GET",
		dataType: "json",
		success: function (albumTracks) {
			for (var i = 0; i < albumTracks.items.length; i++) {
				var tracks = albumTracks.items[i].name;
				console.log(tracks);
				$("<div class=>")
				$(".albumCover").html("<ul><li>" + tracks + "</li></ul>");
			}
		},
		error: function(response) {
			console.log(response);
		}

	})
}

/*
function showTracks(albumTracks) {
	for (var i = 0; i < albumTracks.items.length; i++) {
		var tracks = albumTracks.items[i].name;
		console.log(tracks);
		$(".albumCover").on("click", function() {
			$(".albumCover").append("<ul><li>" + tracks + "</li></ul>");
		});
	}
}*/

$(document).ready(function() {
	$(".search").on("click", search);

})
