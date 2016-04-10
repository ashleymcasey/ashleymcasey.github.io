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

		// SEARCH FUNCTIONALITY  
  		$("#search-character").keyup(function () {
  
			var searchEntry = $("#search-character").val();    
			var searchKeyEntry = searchEntry.replace(/ /g, "'):containsi('")
    
			// making entries not case sensitive 
  			$.extend($.expr[':'], {
  			'containsi': function(elem, i, match, array)
  			{
    		return (elem.textContent || elem.innerText || '').toLowerCase()
    		.indexOf((match[3] || "").toLowerCase()) >= 0;
  			}
		});

  		// showing and hiding the character results based off entry
	    $("#multiple-characters h2").not(":containsi('" + searchKeyEntry + "')").each(function(e) {
	      $(this).parent().hide('div');
	    });
	    
	    $("#multiple-characters h2:containsi('" + searchKeyEntry + "')").each(function(e) {
	      $(this).parent().show('div');
	    });

		function searchList() {                
    	//array of list items
    	var listArray = [];
  
     	$("#multiple-characters h2").each(function() {
    	var listText = $(this).text().trim();
      	listArray.push(listText);
    	});
    
    	$('#search-character').autocomplete({
        source: listArray
    	});   
  		}
                                   
  		searchList();
		});
});
