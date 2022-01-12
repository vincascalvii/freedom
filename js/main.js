/* =============================================================================

    GENERATE CHAPTERS LIST

============================================================================= */

// Pass the page to fetch URL
var fetchURL = 
'https://public-api.wordpress.com/rest/v1.1/sites/vincascalvii.wordpress.com/posts/?fields=ID,title&order_by=id';

// Categories 2 here stands for COAU
fetch(fetchURL)

// Validate the response and return it as JSON
.then(function (response) {
    if ( !response.ok ) throw Error( response.statusText );
    return response.json();
})

// Handle the data
.then(function (data) {

	// Get the container and all the chapters
	var chapters = data['posts'];
	var container = document.querySelector('#chapter-list');

	// Loop through the list of chapters
	for ( var i = 0; i < chapters.length; i++ ) {

		// Get the chapter number and name
		var cNumber = chapters[i]['title'].split(' ')[0];
		var cName = chapters[i]['title'].split(' ')[1];

		// Build the chapter number element
		var number = document.createElement('span');
 			number.classList.add('chapter-number');
 			number.innerHTML = cNumber;

 		// Build the chapter name element
 		var name = document.createElement('span');
 			name.classList.add('chapter-name');
 			name.innerHTML = cName;

 		// Check if previous chapter exists
 		if ( typeof chapters[i - 1]['ID'] !== 'undefined' )
 			var prevID = chapters[i - 1]['ID'];
 		else
 			var prevID = '0';

 		// Check if next chapter exists
 		if ( typeof chapters[i + 1]['ID'] !== 'undefined' )
 			var prevID = chapters[i + 1]['ID'];
 		else
 			var prevID = '0';

 		// Build the chapter link element with both number and name
 		var link = document.createElement('a');
			link.classList.add('chapter-link');
			link.href = '/freedom/chapter?id=' + chapters[i]['ID'] + '&prev=' + prevID + '&next=' + nextID;
			link.setAttribute('aria-label', 'Go to');
			link.appendChild(number);
			link.appendChild(name);

		// Build the list item element with chapter link
		var item = document.createElement('li');
			item.classList.add('chapter-item');
			item.appendChild(link);

		// Add the chapter element to the list / container
		container.appendChild(item);
	}
})

// In case of error
.catch( function(error) {
	console.log('Fetch error: ', error);
});;

/* =============================================================================

    POPULATE YEAR

============================================================================= */

document.querySelector('#copyright-year').innerHTML = new Date().getFullYear();