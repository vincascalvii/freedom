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

	var chapters = data['posts'];
	var container = document.querySelector('#chapter-list');

	for ( var i = 0; i < chapters.length; i++ ) {

		var cNumber = chapters[i]['title'].split(' ')[0];
		var cName = chapters[i]['title'].split(' ')[1];

		var number = document.createElement('span');
 			number.classList.add('chapter-number');
 			number.innerHTML = cNumber;

 		var name = document.createElement('span');
 			name.classList.add('chapter-name');
 			name.innerHTML = cName;

 		var prevID = chapters[i - 1]['ID'] || '0';
 		var nextID = chapters[i + 1]['ID'] || '0';

 		var link = document.createElement('a');
			link.classList.add('chapter-link');
			link.href = '/freedom/chapter?id=' + chapters[i]['ID'] + '&prev=' + prevID + '&next=' + nextID;
			link.setAttribute('aria-label', 'Go to');
			link.appendChild(name);

		var item = document.createElement('li');
			item.classList.add('chapter-item');
			item.appendChild(link);

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