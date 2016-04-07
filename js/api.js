// Whenever the page loads, the onPageLoad function will get called.
$(function onPageLoad() {

	fetch('https://cors-anywhere.herokuapp.com/http://adventuretimeapi.com/api/v1/characters/?page_size=15')
		.then(function onApiResponse(response) {
			return response.json();
		})
		.then(function onJsonParsed(json) {
			console.log(json);

			/*
				This takes the properties off the object we got from the API and
				displays them on the page.
				*/
				$('#name').text(json.results[0].name);
				$('#sex').text(json.results[0].sex);

				/*
				using map and convertine results of relatives to text, joining with a comma in between each result
				*/
				$('#link').text(json.results[0].relatives_many.map(function(relative) {
					return relative.name;
				}).join(", "));

				/* populating image */
				var $img = $("#character").attr('src', json.results[0].image);
  				$('#character').empty().append($img);
		});




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
			.then(function onJsonParsed(json) {

				/*
				This `onJsonParsed` function will get called once we've completed the API call
				and have parsed out the JSON response. Now `json` is a plain javascript object with
				whatever the API returned. 
				*/
				console.log(json);

				/*
				This takes the properties off the object we got from the API and
				displays them on the page.
				*/
				$('#name').text(json.results[0].name);
				$('#sex').text(json.results[0].sex);

				/*
				using map and convertine results of relatives to text, joining with a comma in between each result
				*/
				$('#link').text(json.results[0].relatives_many.map(function(relative) {
					return relative.name;
				}).join(", "));

				/* populating image */
				var $img = $("#character").attr('src', json.results[0].image);
  				$('#character').empty().append($img);
			});

	});

});