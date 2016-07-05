/*function makeRequest(spotiurl, jsonType, successFunction) {
	$.ajax({
		url: spotiurl,
		dataType: jsonType,
		success: successFunction,
	});
};*/

$(document).ready(function(){

	function handleError(error) {
		console.log(error);
		alert("Try again");
	}

	function searchArtist() {
		var input = $(".artistSearch").val();

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=artist&query=" + input,
			type: "GET",
			dataType: "json",
			success: function(dataReceived) {
				showArtist(dataReceived);				
			},
			error: handleError
		})

		$('.artistSearch').val("");
	}

	function showArtist(artist){
		$(".artistsResults ul").empty();

		for(var i = 0; i < artist.artists.items.length; i++) {

			var	artistResults = $(".artistsResults ul");
			var artistName = artist.artists.items[i].name;
			var artistImg = artist.artists.items[i].images[0];
			var artistId = artist.artists.items[i].id;
			//console.log(artistId);
			var elementLi = $("<li class='uniqueArtist' id='" + artistId + "'>");
			var elementP = $("<p class='artistName' data-toggle='modal'>").text(artistName);

			elementLi.append(elementP);

			if(artistImg){
				elementLi.append("<p><img height='200px' width='200px' class='img-rounded' src='"
					+ artistImg.url + "'></p>");
			} else {
				elementLi.append("<p><img height='200px' width='200px' class='img-rounded' src='img/not-found.png'></p>");
			}

			artistResults.append(elementLi);
		}
	}


	$("body").on("click", ".uniqueArtist", function() {
		var artistId = $(this).attr("id");
		var albumUrl = "https://api.spotify.com/v1/artists/" + artistId + "/albums?market=ES";

		$.ajax({
			url: albumUrl,
			type: "GET",
			dataType: "json",
			success: showAlbums,
			error: handleError
		});
	});

	function showAlbums(response) {
		var albums = response.items;
		$(".album-list").empty();

		albums.forEach(function(album, index) {
			getAlbum(album);
		});

		$(".albumsModal").modal();
	}

	function getAlbum(album) {
		var albumName = album.name;
		$(".album-list").append("<li class='list-album-item' id='" + album.id + "'>" 
			+ albumName + "<p><img height='200px' width='200px' class='img-rounded' src='" 
			+ album.images[0].url + "'></p></li>");
	}


	$("body").on("click", ".list-album-item", function() {

		var albumId = $(this).attr("id");
		var tracksUrl = "https://api.spotify.com/v1/albums/" + albumId + "/tracks";

		$.ajax({
			type: "GET",
			url: tracksUrl,
			success: showTracks,
			error: handleError,
			dataType: "json"
		});
	});	

	function showTracks (data) {
		var tracks =  data.items;
		$('.tracklist').empty();

		tracks.forEach(function(track, index){
			addTrack(track);
		});
		$(".tracksModal").modal();
	}

	function addTrack(track){
		var name = track.name;
		var singleUrl = track.preview_url;
		$('.tracklist').append("<li class='list-track-item' id='"
			+ track.id + "'>" + "<a href='" + singleUrl + "'> "	
			+ name + " </a><span class='glyphicon glyphicon-plus'> </span></li>");		
	}





	
	$(".search").on("click", searchArtist);
	$(".artistSearch").on("keypress", function(e) {
		if(e.keyCode === 13){
			searchArtist();
		}
	});
});