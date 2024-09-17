/* =============================================================================

    GENERATE CHAPTERS LIST

============================================================================= */

// Pass the page to fetch URL
var fetchURL = 'https://public-api.wordpress.com/rest/v1.1/sites/vincascalvii.wordpress.com/posts/?fields=ID,title&order_by=id';

// Fetch the data
fetch(fetchURL)

// Validate the response and return it as JSON
.then(function(response) {
    if ( !response.ok ) throw Error( response.statusText );
    return response.json();
})

// Handle the data
.then(function(data) {

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

		// The chapters order and loop index are in reverse
		// - e.g. chapter ID 5,4,3,2,1 will have these indexes: 0,1,2,3,4
		// - we will display chapters in "desc" order so latest chapter is always 1st
		// ---
		// If latest chapter, only need to get the previous chapter
		if ( i === 0 ) {
			var prevID = chapters[1]['ID'];
			var nextID = '0';

		// If middle chapters, get both next and previous chapter
		} else if ( i > 0 && i < ( chapters.length - 1 ) ) {
			var prevID = chapters[i + 1]['ID'];
			var nextID = chapters[i - 1]['ID'];

		// If first chapter, only need to get the next chapter
		} else {
			var prevID = '0';
			var nextID = chapters[i - 1]['ID'];
		}

 		// Build the chapter link element with both number and name
 		var link = document.createElement('a');
			link.classList.add('chapter-link');
			link.href = '/freedom/story/chapter?id=' + chapters[i]['ID'] + '&prev=' + prevID + '&next=' + nextID;
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
.catch(function(error) {
	console.log('Fetch error: ', error);
});

/* =============================================================================

    POPULATE YEAR

============================================================================= */

document.querySelector('#copyright-year').innerHTML = new Date().getFullYear();