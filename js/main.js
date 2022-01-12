/* =============================================================================

    GENERATE CHAPTERS LIST

============================================================================= */

// Pass the page to fetch URL
var fetchURL = 
'https://public-api.wordpress.com/rest/v1.1/sites/vincascalvii.wordpress.com/posts/?fields=title&order_by=id';

// Categories 2 here stands for COAU
fetch(fetchURL)

// Validate the response and return it as JSON
.then(function (response) {
    if ( !response.ok ) throw Error( response.statusText );
    return response.json();
})

// Handle the data
.then(function (data) {

	var chapters = data['posts'];
	var container = document.querySelector('#chapter-list');

	for ( var i = 0; i < chapters.length; i++ ) {

 		var name = document.createElement('span');
 			name.classList.add('chapter-name');
 			name.innerHTML = chapters[i]['title'];

 		var link = document.createElement('a');
			link.classList.add('chapter-link');
			link.setAttribute('aria-label', 'Go to');
			link.appendChild(name);

		var item = document.createElement('li');
			item.classList.add('chapter-item');
			item.appendChild(link);

		container.appendChild(item);
	}
});