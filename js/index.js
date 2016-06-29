function makeRequest(spotifyurl, jsonType, successFunction) {
	$.ajax({
		url: spotifyurl,
		dataType: jsonType,
		success: successFunction,
	});
};