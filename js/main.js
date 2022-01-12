/* =============================================================================

    GENERATE CHAPTERS LIST

============================================================================= */

// Pass the page to fetch URL
var fetchURL = 'https://public-api.wordpress.com/rest/v1.1/sites/vincascalvii.wordpress.com/posts/';

// Categories 2 here stands for COAU
fetch(fetchURL)

// Validate the response and return it as JSON
.then(function (response) {
    if ( !response.ok ) throw Error( response.statusText );
    return response.json();
})

// Handle the data
.then(function (data) {
	var chapters = data.length;
	var container = document.querySelector('#chapter-list');

	for ( var i = 0; i < chapters; i++ ) {

		console.log(data[i]);

		var item = document.createElement('li');
			item.classList.add('chapter-item');

		var link = document.createElement('a');
			link.classList.add('chapter-link');
			link.setAttribute('aria-label', 'Go to');

// 		var 

// <li class="chapter-item">
// 				<a href="/freedom/chapter?number=1" class="chapter-link" aria-label="Go to chapter 1">
// 					<span class="chapter-number">Chapter 1</span>
// 					<span class="chapter-name">Hellspawn</span>
// 				</a>
// 			</li>

	}
});