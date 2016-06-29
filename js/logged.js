function makeRequest(pokeurl, jsonType, successFunction) {
	$.ajax({
		url: pokeurl,
		dataType: jsonType,
		success: successFunction,
	});
};
