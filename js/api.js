// Whenever the page loads, the onPageLoad function will get called.
$(function onPageLoad() {

	// fetch url page size set to 1000 after trial and error of getting all results to show based off conditionals set below
	fetch('https://cors-anywhere.herokuapp.com/http://adventuretimeapi.com/api/v1/characters/?page_size=1000')
		.then(function onApiResponse(response) {
			return response.json();
		})

		.then(function onJsonParsed(charLoad) {

				console.log(charLoad);

				var characterTemplateSource = $('#character-template').html();
				var characterTemplate = Handlebars.compile(characterTemplateSource);

				var characterListTemplateSource = $('#character-list-template').html();
				var characterListTemplate = Handlebars.compile(characterListTemplateSource);
				Handlebars.registerPartial('character', characterTemplateSource);

				// extracting the relatives array to return a string followed by a comma
				for(var i = 0; i < charLoad.results.length; i++) {
					var character = charLoad.results[i];
					character.relativeNames = character.relatives_many.map(function(relative) {
					return relative.name;
					}).join(", ");
				}

				// same thing here but with a species name
				for(var i = 0; i < charLoad.results.length; i++) {
					var character = charLoad.results[i];
					character.speciesType = character.species.map(function(specie) {
					return specie.name;
					}).join(", ");
				}

				// set of conditions to ensure only results show if character has an entry for each of these items
				charLoad.results = charLoad.results.filter(function resultFilterOptions(character) {
					if (character.sex === "" || character.image === "" || character.relativeNames === "" || character.speciesType === "") {
						return false;
					} else {
						return true;
					}
				})

				var characterListHtml = characterListTemplate(charLoad);

				$('#multiple-characters').html(characterListHtml);
		})


	// todo - make above a function to eliminate repition
	// Whenever the search button is clicked, the onSearch function will get called.
	$('#search').click(function onSearch() {

		// This gets whatever the user has typed into the query textbox.
		var query = $('#query').val();
		/*
		fetch(url)
		Adding on whatever the value of the `query` variable is
		as a URL parameter, to search for whatever the user types in.

		fetch(url).then(function onApiResponse(response) { do something }), 
		we're saying that whenever the AJAX request to `url` finishes, call the `onApiResponse`
		function we passed into `then`.
		*/

		fetch('https://cors-anywhere.herokuapp.com/http://adventuretimeapi.com/api/v1/characters/?search=' + query)
			.then(function onApiResponse(response) {

				/*
				The `response` we get from `fetch` is the full HTTP response, so it includes more
				than just the raw JSON response. This will give us the API response
				as a plain old javascript object.
				*/
				return response.json();

			})
			.then(function onJsonParsed(charLoad) {

				console.log(charLoad);

				var characterTemplateSource = $('#character-template').html();
				var characterTemplate = Handlebars.compile(characterTemplateSource);

				var characterListTemplateSource = $('#character-list-template').html();
				var characterListTemplate = Handlebars.compile(characterListTemplateSource);
				Handlebars.registerPartial('character', characterTemplateSource);


				for(var i = 0; i < charLoad.results.length; i++) {
					var character = charLoad.results[i];
					character.relativeNames = character.relatives_many.map(function(relative) {
					return relative.name;
					}).join(", ");
				}

				charLoad.results[0].relatives_many.map(function(relative) {
					return relative.name;
				}).join(", ");
				var characterListHtml = characterListTemplate(charLoad);

				$('#multiple-characters').html(characterListHtml);
			});

	});

});