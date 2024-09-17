/* =============================================================================

    GENERATE CHAPTERS LIST

============================================================================= */

// Fetch the data
fetch('/freedom/data/story/all.json')
.then( function(response) {
	if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
})
.then(function(data) {

	// Get the container
	var container = document.querySelector('#chapter-list');

	// Loop through the list of chapters
	for ( var i = 0; i < data.length; i++ ) {

		// Get the chapter number and name
		var cNumber = data[i]['id'];
		var cName = data[i]['title'];

		// Build the chapter number element
		var number = document.createElement('span');
 			number.classList.add('chapter-number');
 			number.innerHTML = 'Ch.' + cNumber;

 		// Build the chapter name element
 		var name = document.createElement('span');
 			name.classList.add('chapter-name');
 			name.innerHTML = cName;

 		// Build the chapter link element with both number and name
 		var link = document.createElement('a');
			link.classList.add('chapter-link');
			link.href = '/freedom/story/chapter?id=' + cNumber;
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