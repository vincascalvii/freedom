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
		var cNumber = chapters[i]['title'].substr(0, chapters[i]['title'].indexOf(' '));
		var cName = chapters[i]['title'].substr(chapters[i]['title'].indexOf(' ') + 1);

		// Build the chapter number element
		var number = document.createElement('span');
 			number.classList.add('chapter-number');
 			number.innerHTML = cNumber;

 		// Build the chapter name element
 		var name = document.createElement('span');
 			name.classList.add('chapter-name');
 			name.innerHTML = cName;

 		// If current iteration is not the first one, get the previous chapter ID
 		var prevID = ( i > 0 ) ? chapters[i - 1]['ID'] : '0';

 		// If the current iteration not the last one, get the next chapter ID
 		var nextID = ( i < ( chapters.length - 1 ) ) ? chapters[i + 1]['ID'] : '0';

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